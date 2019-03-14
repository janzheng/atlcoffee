<template>
  <div>

    <div v-if="header" ref="splash" :style="{top: navHeight * -1 + 'px'}" class="_splash-container">
      <div :style="{backgroundImage: 'url('+header.url+')'}" class="Coffee-splash _splash-image" />
    </div>

    <div class="Home _section-page _margin-center _padding-left-2 _padding-right-2">
      <div class="_section-content">
        <div class="_section-article" v-html="$md.render(intro || '')" />
      </div>
      <div class="_section-content">
        <!-- <div class="_card _padding " v-html="$md.render(map || '')" /> -->
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
    tableQuery: "_content"
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
      'navHeight',
      ]),

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

