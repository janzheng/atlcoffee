<template>
  <div :style="{top: navHeight * -1 + 'px'}" class="_splash-container">

    <div v-if="header" ref="splash" :style="{minHeight: 450+'px', height: 50+'vh'}" class=" _vh-50">
      <div :style="{backgroundImage: 'url('+header.url+')', height: '100%'}" class="Coffee-splash _splash-image" />
    </div>

    <div class="Home _section-page _margin-center">
      <div class="_section-content">
        <div class="_section-article" v-html="$md.render(intro || '')" />
      </div>
      <div class="_grid-3-2 _grid-gap-large-sm">
        <div class="Latest">
          <div class="Latest-cafes _margin-bottom-2">
            <h4>Latest Cafes</h4>
            <div class="Latest-cafes-container _margin-bottom-2 _masonry-2-sm">
              <div v-for="item of latestCafes" :key="item.id" >
                <div class="_card _padding">
                  <h5>{{ item.fields['Name'] }}</h5>
                  <div v-html="$md.render(item.fields['Description'] || '')" /> 
                </div>
              </div>
            </div>
          </div>
          <div class="Latest-stories">
            <h4>Latest Stories</h4>
            <div class="Latest-stories-container _margin-bottom-2">
              <div v-for="item of latestStories" :key="item.id">
                <div class="_card _padding">{{ item.fields['Name'] }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="_card _padding " v-html="$md.render(map || '')" /> -->
        <div class="Feed">
          <div v-for="item of Recently" :key="item.id" class="Feed-item _padding-bottom">
            <!-- {{ item }} -->
            <h6> {{ item.fields['Date'] }}</h6>
            <h5> {{ item.fields['Name'] }}</h5>
            <p> {{ item.fields['Message'] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>


import { mapState } from 'vuex'

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    tableQueries: ['_content', '_recently', '_stories-latest', '_cafes-latest']
  },

  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      intro: this.$cytosis.find('Content.home-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      header: this.$cytosis.find('Content.home-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Header'][0],
      map: this.$cytosis.find('Content.coffee-map', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      'Recently',
      'navHeight',
      ]),

    latestStories() {
      // only show first four
      return this.$store.state['Stories'].slice(0,4) 
    },

    latestCafes() {
      // only show first four
      return this.$store.state['Cafes'].slice(0,4) 
    }
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

