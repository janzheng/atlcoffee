importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0d415371a22c28c95031.js",
    "revision": "4435c19f921beb4af5e790b6913418fa"
  },
  {
    "url": "/_nuxt/150224fd6ad05a9d4fc5.js",
    "revision": "740c6e51218cfea335d6aaf9f4e5b53b"
  },
  {
    "url": "/_nuxt/15bd08d68ba27dd0db22.js",
    "revision": "a9b7e19514a9c5924e3f62a8ba1e6472"
  },
  {
    "url": "/_nuxt/27d4690fad022e42090f.js",
    "revision": "d972e85b59ff09601543509fda36f001"
  },
  {
    "url": "/_nuxt/304ec2c7b7cecb14eac6.js",
    "revision": "fc2ab3ceb46ec25c22627d272a24552f"
  },
  {
    "url": "/_nuxt/34f9f0b4bb3621045b81.js",
    "revision": "1d49e23920842b8eea5552dd0ec24653"
  },
  {
    "url": "/_nuxt/3b981c8ae7dee725b1d9.js",
    "revision": "19e0082266ec61aea40c3a6998c2053e"
  },
  {
    "url": "/_nuxt/517c99fb74c355c6ea2e.js",
    "revision": "baf58d794040495dcd31ba90c4a587cc"
  },
  {
    "url": "/_nuxt/5b75a1a4319359bca8fb.css",
    "revision": "7b091fb9b5c3e21d9a9078be03c9e10f"
  },
  {
    "url": "/_nuxt/6586109b74e5ceba6097.js",
    "revision": "b9ad0b09ada3c77667a16221dcb151cd"
  },
  {
    "url": "/_nuxt/867d6ece1ec99e1dd517.js",
    "revision": "d1bb89bc84ca0f462cbfb5a05ce36e11"
  },
  {
    "url": "/_nuxt/a3ccc2b9ec8594a38b96.js",
    "revision": "84bc6a1b519dbcaeedb48acb87b7c485"
  },
  {
    "url": "/_nuxt/ae69d4588046a69a8c0b.js",
    "revision": "6223202019eb64366638a518217b8971"
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
