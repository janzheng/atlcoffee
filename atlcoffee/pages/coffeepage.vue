<template>

  <div class="Coffee">

    <div v-if="cafe.fields['Cover']" ref="splash" :style="{minHeight: 450+'px', height: 50+'vh'}" class="Coffee-cover _padding-top">
      <div v-lazy:background-image="cafe.fields['Cover'][0]['url']" class="Coffee-cover-img _splash-image" />
    </div>

    <div class="_section-page _margin-center _padding-left-2 _padding-right-2 _margin-bottom-2">

      <div class="Coffee-head _section-content">
        <h1 class="Coffee-title">{{ cafe.fields['Name'] }}</h1>
      </div>


      <div class="Coffee-body _grid-4-1 _grid-gap-large-sm">
        <!-- <div class="_section-article" v-html="$md.render(content || '')" /> -->
        <!-- {{ Cafes }} -->
        <!-- <div class="_section-article">
          <div class="Cafe-card" v-for="cafe of Cafes" :key="cafe.id">
            {{ cafe.fields['Name'] }}
          </div>
        </div> -->
        <div class="Coffee-main">
          <div class="Coffee-description" v-html="$md.render(cafe.fields['Description'] || '')" />
          <div class="Coffee-stories">
            <div v-for="item of stories" :key="item.id" class="Coffee-story _card _padding">
              <h6 class="_padding-none-i">Story</h6>
              <router-link :to="`/stories/${item.fields['Slug']}`"><h5>{{ item.fields['Name'] }}</h5></router-link>
              <div v-html="$md.render(item.fields['Lede'] || '')" />
            </div>
          </div>

          <vue-picture-swipe :items="galleryItems" :options="{shareEl: false, captionEl: true,}" class="Coffee-gallery " />
        </div>
        <div class="Coffee-sidebar">
          <div class="Coffee-sidebar-container">
            <h6>Info</h6>
            <div v-if="cafe.fields['Website']" class="Coffee-sidebar-item" >
              <a href="cafe.fields['Website']">Website</a>
            </div>
            <div v-if="cafe.fields['Facebook']" class="Coffee-sidebar-item" >
              <a href="cafe.fields['Facebook']">Facebook</a>
            </div>
            <div v-if="cafe.fields['Instagram']" class="Coffee-sidebar-item">
              <a href="cafe.fields['Instagram']">Instagram</a>
            </div>
            <div v-if="cafe.fields['Twitter']" class="Coffee-sidebar-item" >
              <a href="cafe.fields['Twitter']">Twitter</a>
            </div>
          </div>

          <div class="Coffee-sidebar-container">
            <h6>Store</h6>
            <div v-if="cafe.fields['Phone']" class="Coffee-sidebar-item _margin-bottom-half" >
              {{ cafe.fields['Phone'] }}
            </div>
            <div v-if="cafe.fields['Address']" class="Coffee-sidebar-item" >
              {{ cafe.fields['Address'] }}
            </div>
            <div v-if="cafe.fields['Location']" class="Coffee-sidebar-item _margin-bottom-half" >
              <span class="_tag">{{ cafe.fields['Location'] }}</span>
            </div>
          </div>

          <div class="Coffee-sidebar-container">
            <h6>Amenities</h6>
            <div v-if="cafe.fields['Amenities']" class="Coffee-sidebar-item" >
              <div v-for="item of cafe.fields['Amenities']" :key="item.id" class="">
                <div><span class="_tag">{{ item }}</span></div>
              </div>
            </div>
          </div>

          <div class="Coffee-sidebar-container">
            <h6>Roasting Partner</h6>
            <div v-if="cafe.fields['RoastPartner']" class="Coffee-sidebar-item" >
              <!-- <span v-for="item of cafe.fields['RoastSource']" class="_tag">{{ item }}</span> -->
              <span v-html="$md.render(cafe.fields['RoastPartner'] || '')" />
            </div>
          </div>

        </div>
      </div>

      <!-- {{ cafe }} -->

    </div>
  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content",
    tableQueries: ["_content", "_cafes", "_stories",],
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = unescape(route.params.slug)

    const _cafe = await loadQuery(env, store, 'coffee-async', '_cafe', slug)
    console.log('matched cafes: ', _cafe)

    return {
      slug,
      cafe: _cafe.tables['Cafes'][0],
    }
  },

  data () {
    return {
    }
  },
  
  computed: {
    ...mapState([
      'Cafes',
      'Stories',
      ]),
    // cafe() {
    //   // console.log('what? ', this.slug, this.Cafes, this.$cytosis.find(this.slug, {'Cafes': this.Cafes}, ['Slug'] ))
    //   return this.$cytosis.find(this.slug, {'Cafes': this.Cafes}, ['Slug'] )
    // },
    stories() {
      // these are the cafes linked to the establishment
      // sometimes there can be more, if it's a small chain
      return this.$cytosis.getLinkedRecords(this.cafe.fields['Stories'], this.Stories, true )
    },
    galleryItems() {
      const gallery = this.cafe.fields['Gallery']
      let items = []

      gallery.map((image) => {
        console.log('gallery/image', image)
        const item = {
          src: image['url'],
          thumbnail: image['thumbnails']['large']['url'],
          w: image['thumbnails']['full']['width'],
          h: image['thumbnails']['full']['height'],
          // title: 'Test Caption ' + image['url'],
        }
        items.push(item)
      })
      /*
        [
          {src: 'http://placekitten.com/600/400',thumbnail: 'http://placekitten.com/60/90',w: 600,h: 400, title: 'Will be used for caption'},
          {src: 'http://placekitten.com/1200/900',thumbnail: 'http://placekitten.com/80/80',w: 1200,h: 900}
        ]
      */

      return items
    },
  },

  beforeCreate () {
    // special header behavior
    this.$store.dispatch("updateCreate", {diffTopHeader: true})
  },
  mounted () {
    // special header behavior
    this.$store.dispatch("updateCreate", {splashHeight: this.$refs.splash.clientHeight})
  },
  beforeDestroy() {
    this.$store.dispatch("updateCreate", {diffTopHeader: false, splashHeight: 0})
  },

  methods: {
  },


}
</script>

<style>
</style>

