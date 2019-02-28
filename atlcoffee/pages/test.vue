<template>
  <div class="Home _section-page _margin-center _padding-left-2 _padding-right-2">

    <div class="_section-content">
      <div class="_section-article">
        <img :src="images[0]['thumbnails']['large']['url']" width="600" alt="about coffee header">
      </div>
      <div class="_section-article" v-html="$md.render(content || '')" />
    </div>

    Paypal test:

    <!-- <h3>Programmatically button</h3> -->
    <!-- <button class="_button" @click="pay" >Pay here</button> -->

    <h3>Paypal button</h3>

    <no-ssr>

      <paypal-checkout
        env="sandbox"
        amount="10000"
        locale="en_US"
        currency="USD"
        :client="paypal"
        :invoice-number="'99999'"
        @click="onPaypalClick"
        v-on:payment-authorized="onPaypalAuthorized"
        v-on:payment-completed="onPaypalCompleted"
        v-on:payment-cancelled="onPaypalCanceled"
        >
      </paypal-checkout>

      <paypal-checkout
        env="sandbox"
        :client="paypal"
        :amount="paypalData.amount"
        :currency="paypalData.currency"
        :items="paypalData.items"
        :invoice-number="paypalData.invoice_number"
        :buttonStyle="paypalStyle"
        @click="onPaypalClick"
        v-on:payment-authorized="onPaypalAuthorized"
        v-on:payment-completed="onPaypalCompleted"
        v-on:payment-cancelled="onPaypalCanceled"
        />
    </no-ssr>

  </div>
</template>




<script>

import axios from 'axios'

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content"
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      // content: this.$cytosis.find('Content.about-page', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // images: this.$cytosis.find('Content.about-page', {'Content': this.$store.state['Content']} )[0]['fields']['Attachments'],
      content: this.$cytosis.findOne('about-page', this.$store.state['Content'] ).fields['Markdown'],
      images: this.$cytosis.findOne('about-page', this.$store.state['Content'] ).fields['Attachments'],
      paypal: {
        sandbox: 'AVNUDgQjuk616kcCDp2XWaYyKaq_U3-9o89WIj1_NyjzcMpHP9U9q0CckMGOSUEgolBI-autOwH3_Wvp',
        production: '12345'
      },
      paypalData: {
        // dev: true, // this.$store.state.payPalEnv == 'production' ? false : true,      // 'true' if sandbox
        amount: '5.00', // must total those of items
        currency: 'USD',
        invoice_number: '5554444',
        items: [
          {
            "name": "hat",
            "description": "Brown hat.",
            "quantity": "1",
            "price": "5",
            "currency": "USD"
          },
        ]
      },
      paypalStyle: {
        label: 'paypal',
        size:  'responsive', // small | medium | large | responsive
        shape: 'rect', // pill | rect
        color: 'gold', // gold | blue | silver | black
        tagline: false
      }
    }
  },
  
  computed: {

  },

  created () {

  },

  mounted () {
  },

  methods: {

    pay() {
      console.log('using axios to pay')

      const options = {
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        data: qs.stringify(data),
        auth: {
          username: 'AVNUDgQjuk616kcCDp2XWaYyKaq_U3-9o89WIj1_NyjzcMpHP9U9q0CckMGOSUEgolBI-autOwH3_Wvp', // paypal client ID 
          password: 'EB7hLrMyC3tM-idsj-vhHtvfKu8gawWoRA7tW4vp9vw5HPFkEkwGYyvUWq_k7TUFL88y1-bSNVMCGngh', // paypal secret
        },
        url: "https://api.sandbox.paypal.com/v1/oauth2/token",
      }

      axios(options).then((response) => {
        console.log('axios response:' ,response);
      }).catch((err) => {console.error('axios error:' , err);});

    },
    onPaypalClick() {
      console.log('paypal click')
    },
    onPaypalAuthorized(arg) {
      /*  
        {  
          "intent": "sale",
          "payerID": "UVGR8M6W9V7ZA",
          "paymentID": "PAY-3L661344P7749433KLD2R5ZQ",
          "paymentToken": "EC-0H346145A8442392H",
          "returnUrl" :"https://www.sandbox.paypal.com/?paymentId=PAY-3L661344P7749433KLD2R5ZQ&token=EC-0H346145A8442392H&PayerID=UVGR8M6W9V7ZA"
        }
      */

      console.log('Payment Authorized: ', arg)
    },

    onPaypalCompleted(arg) {
      /*
        {
          "id": "PAY-4N746561P0587231SKQQK6MY",
          "create_time": "2014-09-22T23:22:27Z",
          "update_time": "2014-09-22T23:31:13Z",
          "state": "approved",
          "intent": "sale",
          "payer": {
            "payment_method": "paypal",
            "status": "VERIFIED",
            "payer_info": {
              "email": "npurayil-uspr-60@paypal.com",
              "country_code":"US"
              "first_name": "Brian",
              "last_name": "Robinson",
              "payer_id": "JMKDKJ4D7DG7G",
              "shipping_address": {
                "line1": "4thFloor",
                "line2": "unit#34",
                "city": "SAn Jose",
                "state": "CA",
                "postal_code": "95131",
                "country_code": "US",
                "phone": "011862212345678",
                "recipient_name": "HelloWorld"
              }
            }
          },
          "transactions": [{
            "amount": {
              "currency": "USD",
              "total": "20.00",
            },
            "invoice_number": (same as passed in)
            "item_list": (same as passed in)
            "related_resources": [{
              sale: {
                amount: {
                  currency: "USD",
                  details: {
                    subtotal: "20.00"
                  },
                  total: "20.00",
                  create_time: "2018-02-06T22:17:32Z",
                  id: "3BL53681JK6050900",
                  parent_payment: "PAY-5M707766UD6669431LJ5CSQY",
                  payment_mode: "INSTANT_TRANSFER",
                  protection_eligibility: "ELIGIBLE",
                  state: "completed",
                  update_time: "2018-02-06T22:17:32Z"
              }
            }]
          }]
        }
      */
      // This is better handled on a webhook than here (more secure)

      /*
          Highlight:
          - First Name
          - Last Name
          - Email (esp. if different from signup email)
          - 
      */
      console.log('Payment Completed: ', arg)

      // this.dbState = CONNECTION_STATES.LOADING

      // const transaction = {
      //         id: arg.id,
      //         first_name: arg.payer.payer_info.first_name,
      //         last_name: arg.payer.payer_info.last_name,
      //         email: arg.payer.payer_info.email,
      //         service: arg, // paypal obj
      //         state: arg.state,
      //         invoice_number: this.invoiceId
      //       }

      // this.debug(
      //   'cartItems:',this.cartItems,
      //   'paymentEmail:',this.paymentEmail,
      //   'basicId:',this.dance.basicId,
      //   'invoiceId:', this.invoiceId,
      //   'transaction:', transaction,
      // )

      // this.processPayments(transaction)
    },
    onPaypalCanceled(arg) {
      // for listening to payPal emitters
      // this.dbState = CONNECTION_STATES.READY
      console.error('Payment Cancelled: ', arg)
    },
  },


}
</script>

<style>
</style>

