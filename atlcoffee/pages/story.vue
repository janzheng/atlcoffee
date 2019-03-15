<template>

  <!-- <div :style="{top: navHeight * -1 + 'px'}" class="Story _splash-container" > -->
  <!-- with nav overlay, it's really hard to control legibiltiy -->

  <div class="Story" >
    <!-- <div v-if="story['Cover']" class="Story-cover" >
      <div v-lazy:background-image="story['Cover'][0]['url']" class="Story-cover-img" />
    </div> -->

    <div v-if="story['Cover']" ref="splash" :style="{minHeight: 450+'px', height: 50+'vh'}" class="Story-cover _padding-top">
      <div v-lazy:background-image="story['Cover'][0]['url']" class="Story-cover-img _splash-image" />
    </div>

    <div class="Story _section-page _margin-center _padding-left-2 _padding-right-2">
      <div class="Story-headmatter _section-content">
        <h1> {{ story['Name'] }} </h1>

        <!-- BANANA
        <div>{{ story }}</div>
        <div>{{ Cafes }}</div> -->


        <h5 v-html="$md.render(story['Lede'] || '')" />

        <!-- author info  -->
        <div v-for="item of authors" :key="item.id" class="Author-card ">
          <div>
            <img :style="{borderRadius: '100%'}" :src="item.fields['Profile'][0]['url']" width="60" height="60" >
          </div>
          {{ item.fields['Name'] }}
        </div>

        <!-- linked cafes -->
        <div class="Story-cafes">
          <div v-for="item of cafes" :key="item.id" class="Story-cafe">
            <router-link :to="`/cafe/${item.fields['Slug']}`">{{ item.fields['Name'] }}</router-link>
          </div>
        </div>

      </div>

      <div v-lazy-container="{ selector: 'img' }" class="Story-content _section-content" >
        <div class="" v-html="$md.render(story['Article'] || '')" />
        <!-- <div>{{ cafe.Name }}</div> -->
        <!-- {{ cafe.Title }} -->
        <!-- <div class="_section-article" v-html="$md.render(content || '')" /> -->
        <!-- {{ Cafes }} -->
        <!-- <div class="_section-article">
          <div class="Cafe-card" v-for="cafe of Cafes" :key="cafe.id">
            {{ cafe.fields['Name'] }}
          </div>
        </div> -->
      </div>

      <div v-if="story['Footer']" class="Story-footer _section-content" >
        <div class="" v-html="$md.render(story['Footer'] || '')" />
      </div>

      <!-- {{ story }} -->
    </div>
  </div>
</template>
<!-- 
<no-ssr>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.9/jquery.lazy.min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.9/jquery.lazy.plugins.min.js"></script>
</no-ssr>
 -->


<script>

import { mapState } from 'vuex'
import {loadQuery} from '~/other/loaders'


export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content",
    tableQueries: ["_content", "_authors"],
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = unescape(route.params.slug)

    // load story and cafes on every subsequent page load
    const _story = await loadQuery(env, store, 'story-async', '_story', slug)
    const _cafes = await loadQuery(env, store, 'story-async', '_cafes-short')

    console.log('_story:', _story.tables['Stories'])
    return {
      slug,
      story: _story.tables['Stories'][0]['fields'],
      Cafes: _cafes.tables['Cafes'],
    }
  },

  data () {
    return {
    }
  },
  
  computed: {
    ...mapState([
      'Stories',
      // 'Cafes', // load from async
      'Authors',
      'navHeight',
      ]),
    // story() {
      // console.log('what? ', this.slug, this.Cafes, this.$cytosis.find(this.slug, {'Cafes': this.Cafes}, ['Slug'] ))
      // return this.$cytosis.find(this.slug, {'Stories': this.Stories}, ['Slug'] )['fields']
    // },
    cafes() {
      // these are the cafes linked to the establishment
      // sometimes there can be more, if it's a small chain
      return this.$cytosis.getLinkedRecords(this.story['Cafes'], this.Cafes, true )
    },
    authors() {
      // these are the authors linked to the story
      return this.$cytosis.getLinkedRecords(this.story['Authors'], this.Authors, true )
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

<style lang="scss" scoped>

</style>

