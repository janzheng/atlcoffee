importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/07b54232d8a04bb9308e.js",
    "revision": "0bf0cde172245d73669b988448d975c3"
  },
  {
    "url": "/_nuxt/0d415371a22c28c95031.js",
    "revision": "4435c19f921beb4af5e790b6913418fa"
  },
  {
    "url": "/_nuxt/138db4470dccab97d31e.css",
    "revision": "87411ec871a7ec745f463678c22b1021"
  },
  {
    "url": "/_nuxt/150224fd6ad05a9d4fc5.js",
    "revision": "740c6e51218cfea335d6aaf9f4e5b53b"
  },
  {
    "url": "/_nuxt/27d4690fad022e42090f.js",
    "revision": "d972e85b59ff09601543509fda36f001"
  },
  {
    "url": "/_nuxt/357754a86b02df77879b.js",
    "revision": "656b345a7ef1c6c3f77191f11e7c1ed8"
  },
  {
    "url": "/_nuxt/434779e185fafc70ae65.js",
    "revision": "1c1f9730b12b62cc684997974a381609"
  },
  {
    "url": "/_nuxt/517c99fb74c355c6ea2e.js",
    "revision": "baf58d794040495dcd31ba90c4a587cc"
  },
  {
    "url": "/_nuxt/6586109b74e5ceba6097.js",
    "revision": "b9ad0b09ada3c77667a16221dcb151cd"
  },
  {
    "url": "/_nuxt/6a309a32760c89e382a7.js",
    "revision": "6b6a9665cfbd1e1f5b738d340f8be2f8"
  },
  {
    "url": "/_nuxt/7ccd0b3f1e4750003e96.js",
    "revision": "d25b6079f4c776e391621dedc1e2d958"
  },
  {
    "url": "/_nuxt/867d6ece1ec99e1dd517.js",
    "revision": "d1bb89bc84ca0f462cbfb5a05ce36e11"
  },
  {
    "url": "/_nuxt/96917279644e312e14bc.js",
    "revision": "1a076f4e86a5b159d76479f956b67209"
  },
  {
    "url": "/_nuxt/c0015d533e26e38f2c96.css",
    "revision": "ad73ac256f898275a4837c4728df5eee"
  },
  {
    "url": "/_nuxt/dcd1a60d40e7f180e46d.js",
    "revision": "8f2b3e75d66778a6629fefa5e9f3b107"
  },
  {
    "url": "/_nuxt/e1ce76a676394b13f209.js",
    "revision": "b5f0c585ec88e6d9fb362c5624d33da1"
  },
  {
    "url": "/_nuxt/e8c48f5669642ee3d2e5.js",
    "revision": "b237c0c0b54e5792d8072f6caacea7fe"
  },
  {
    "url": "/_nuxt/fdff123442be5c7e8dea.js",
    "revision": "cffecb7af212f337620be3d8e2ae9736"
  },
  {
    "url": "/_nuxt/img/b257fa9.svg",
    "revision": "b257fa9c5ac8c515ac4d77a667ce2943"
  }
], {
  "cacheId": "atlcoffee",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.precaching.precacheAndRoute(['/404.html'])

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

// offlinePage support
const strategy = workbox.strategies.networkOnly()
workbox.routing.registerRoute(new RegExp('/.*'), ({event}) => {
  return strategy.handle({event})
    .catch(() => caches.match('/404.html'))
})
