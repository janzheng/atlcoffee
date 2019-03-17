importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0d57aec61134d7cee0ee.js",
    "revision": "627a599c1f7cfd58e979a59bc49e5630"
  },
  {
    "url": "/_nuxt/150224fd6ad05a9d4fc5.js",
    "revision": "740c6e51218cfea335d6aaf9f4e5b53b"
  },
  {
    "url": "/_nuxt/18cf4721b0c9b2cf8977.js",
    "revision": "939cfc5f6351c3c757c4a7f813c8b24f"
  },
  {
    "url": "/_nuxt/18dba26894e55ad453f1.js",
    "revision": "b8f87fa0db3b968bb4be4249ae6b0562"
  },
  {
    "url": "/_nuxt/435248903b3bff090d58.js",
    "revision": "3644b0e761e878e3e71be1f499cb883e"
  },
  {
    "url": "/_nuxt/6586109b74e5ceba6097.js",
    "revision": "b9ad0b09ada3c77667a16221dcb151cd"
  },
  {
    "url": "/_nuxt/739558a06fbba628e493.js",
    "revision": "f77a5398217b1abdadc7a1ed194d3d9b"
  },
  {
    "url": "/_nuxt/867d6ece1ec99e1dd517.js",
    "revision": "d1bb89bc84ca0f462cbfb5a05ce36e11"
  },
  {
    "url": "/_nuxt/8936c18741a50e2964c1.js",
    "revision": "a3b968b168d2081e42d20231247eafd2"
  },
  {
    "url": "/_nuxt/8a9d82ac3862b9ca0ae5.js",
    "revision": "1d4cce05b6d73333719a8116f8cef517"
  },
  {
    "url": "/_nuxt/a938b695acd6c529233d.css",
    "revision": "00b1ed6d33dca67cd7149284289d3172"
  },
  {
    "url": "/_nuxt/ae69d4588046a69a8c0b.js",
    "revision": "6223202019eb64366638a518217b8971"
  },
  {
    "url": "/_nuxt/b0a9a4de0ad466641608.js",
    "revision": "f90573a1d0b8af16834d56806301eef5"
  },
  {
    "url": "/_nuxt/b527af26a974c22b6981.js",
    "revision": "6ffdbe4dbcb69654518b38c6bf9b4ecd"
  },
  {
    "url": "/_nuxt/c0015d533e26e38f2c96.css",
    "revision": "ad73ac256f898275a4837c4728df5eee"
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
