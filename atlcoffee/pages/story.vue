<template>

  <!-- <div :style="{top: navHeight * -1 + 'px'}" class="Story _splash-container" > -->
  <!-- with nav overlay, it's really hard to control legibiltiy -->

  <div class="Story" >
    <!-- <div v-if="story['Cover']" class="Story-cover" >
      <div v-lazy:background-image="story['Cover'][0]['url']" class="Story-cover-img" />
    </div> -->

    <div v-if="story['Cover']" ref="splash" :style="{minHeight: 450+'px', height: 50+'vh'}" class="Story-cover _padding-top-2">
      <div v-lazy:background-image="story['Cover'][0]['url']" class="Story-cover-img _splash-image" />
    </div>

    <div class="Story-main _section-page _margin-center _padding-left-2 _padding-right-2">
      <div class="Story-headmatter _section-content">
        <h1> {{ story['Name'] }} </h1>

        <h5 v-html="$md.render(story['Lede'] || '')" />

        <!-- author info  -->
        <div v-for="item of authors" :key="item.id" class="Author _grid-auto-1-xs">
          <div>
            <img :style="{borderRadius: '100%'}" :src="item.fields['Profile'][0]['url']" width="60" height="60" >
          </div>
          <div>
            <div class="Author-name">{{ item.fields['Name'] }}</div>
            <div class="Author-about">{{ item.fields['About'] }}</div>
          </div>
        </div>

        <!-- linked cafes -->
        <div class="Story-cafes">
          <div v-for="item of cafes" :key="item.id" class="Coffee-card _card _grid-1-3-xs">
            <div>
              <img v-lazy="item.fields['Cover'][0]['thumbnails']['large']['url']" v-if="item.fields['Cover']" class="_width-full" >
            </div>
            <div class="_padding">
              <router-link :to="`/cafe/${item.fields['Slug']}`" class="Coffee-card-title">{{ item.fields['Name'] }}</router-link>
              <div>{{ item.fields['Neighborhood'] }}</div>
              <!-- <div v-html="$md.render(item.fields['Description'] || '')" /> -->
            </div>
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

      <no-ssr>
        <div id="comment" class="disqus _section-content" >
          <div id="disqus_thread" />
        </div>
      </no-ssr>

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
import { loadQuery } from '~/other/loaders'


export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content",
    tableQueries: ["_content", "_authors"],
  },

  // CAUTION: fetching limited data sets or using matching can cause data conflicts
  // with other views, since data is pulled lazily (if an item in a table exists, we generally don't want to keep pulling them)
  // sometimes the data actually needs to be refreshed, since we sometimes only pull a couple of columns and not all of them, causing some problems
  // the best way is to pull data on async to ensure we have everything
  // runs on generation and page route (but not on first page load)
  // 
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
  mounted: async function () {
    // special header behavior
    this.$store.dispatch("updateCreate", {splashHeight: this.$refs.splash.clientHeight})
  },
  created: async function () {

    // load disqus
    if (process.client) {

      /**
      *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
      *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
      /*
      var disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      */
      (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script')
        s.src = 'https://atl-coffee.disqus.com/embed.js'
        s.setAttribute('data-timestamp', +new Date())(d.head || d.body).appendChild(s)
      })()
    }
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

