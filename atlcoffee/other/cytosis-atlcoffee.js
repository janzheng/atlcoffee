/*

  This writes content to airtable and/or sends an email
  
  ## todo
  - paypal & square callback / hook integration w/ using _uuid to update _callback field
  - add a cytosis proxy so api and base don't have to be revealed

  ## future
  - add an airtable-graphql endpoint 



*/

// const _ = require('lodash');
// const url = require('url');
// const http = require('http');
// const https = require('https');
const Mailgun = require('mailgun.js');

// https://github.com/auth0/webtask-tools
const Express = require('express');
const Webtask = require('webtask-tools');
const Cytosis = require('cytosis');
const uuid = require('uuid-by-string');

const server = new Express();
server.use(Express.json());

// parse object to string and write the respose
const writeJSON = function( res, obj ) {
  let objJSON;
  if(typeof obj === 'object') 
    objJSON = JSON.stringify(obj);
  else 
    objJSON = '{}';

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write( objJSON );
};

function loadCytosis(req) {
  console.log('cytosis loading... ');

  const _cytosis = new Cytosis({
    airKey: req.webtaskContext.secrets.AIRTABLE_API,
    airBase: req.webtaskContext.secrets.AIRTABLE_BASE,
    tableQuery: req.body.target,
    options: {
      maxRecords: 1, // this gets the sample row so we can know what fields exist on the table
    }
  });
  console.log('cytosis loaded... ');
  return _cytosis;
}

// main entry
server.post('/', function(req, res) {
  const request = req.body; // object that contains the form and payload data
  console.log('Incoming request:', request)
  // console.log('payload:', req.body, ' > ', Express.json())
  // res.end();
  // var body = unescape(req.body.data)

  if(request.type && request.type === 'cytosis') {
    loadCytosis(req).then((cytosis) => {
      const mg = Mailgun.client({username: 'api', key: req.webtaskContext.secrets.MAILGUN_API_KEY});
      const requestJSON = JSON.stringify(request);
      const targetTable = cytosis.tables[req.body.target]; // get the target table
      let targetData = {}; // object to be inserted into an airtable row

      console.log('Cytosis Loaded.', ' Processing data object:', request);

      // fill in the target data w/ the keys that exist, if they exist (e.g. Email, Message or whatever) — these keep the results clean
      // and they correspond to whatever's in the input's Name field
      if(targetTable[0]) {
        const fields = targetTable[0].fields;
        Object.keys(fields).map((fieldKey) => {
          if(request.form[fieldKey]) { // if the key exists in the form submission
            console.log('Setting field:', fieldKey, ' with ', request.form[fieldKey])
            targetData[fieldKey] = request.form[fieldKey]; // we then add it to the target
          }
        });
      }

      const _target = request.target || '_dynamic'; // airtable table to save into; default is a table named "_dynamic"
      // note: the target table NEEDS at least these fields: ['_data','_payload'] to store output into
      const _subject = request.source ? `Form: ${request.source}` : `Form submitted from atlcoffee`;

      const form = request.form;
      let formString = "", formHtml = "";
      // console.log('objJSON key data text:', obj.data, Object.keys(obj.data))
      if(form) {
        // generate the human-readable data
        // console.log('objJSON key data text:', data)
        Object.keys(form).map((key) => {
          const data = form[key];
          // console.log(key, dataitem)
          formString = formString + `${key}: ${data} \n`;
          formHtml = formHtml + `<div><strong>${key}:</strong> ${data}</div> <br /><br />`;
        });

        targetData['_message'] = formString;
        targetData['_payload'] = requestJSON;
        targetData['_uuid'] = uuid(Object.keys(form)[0].toString()); // use the first form item to generate a uuid

        if(request.source)
          targetData['_source'] = request.source; // add a source message if it exists / where did the request come from?
      }

      console.log('Form string:', formString);
      const _html = `<div><div>Form Content:</div>${formHtml}</div> <br /><br /><div>${requestJSON}</div>`;

      // console.log('JSON mode?', obj['json'], 'Send email alert?', obj['alert'], 'Saving:', objData, ' from ', obj);
      console.log('Saving to Airtable...');

      // SPLIT THESE UP INTO PARALLEL TASKS! THEY SHOULDN'T RELY ON EACH OTHER

      cytosis.save(targetData, _target, cytosis).then(() => {
        if(request.sendEmail) {
          mg.messages.create(req.webtaskContext.secrets.MAILGUN_DOMAIN, {
            from: "ATL Coffee Form <coffee.wt@phage.directory>",
            to: ["janeazy@gmail.com"],
            subject: _subject,
            html: _html
          })
          .then(msg => {
            console.log("emailed:", msg);
            writeJSON(res, {
              success: true
              }
            );
            res.end();
          }) // logs response data
          .catch(err => {
            console.log(err);
            res.end();
          }); // logs any error
        } else {
          writeJSON(res, {success: true});
          res.end();
        }
      });
    });
  }
});

module.exports = Webtask.fromExpress(server);
