<template>
  <div :style="{top: navHeight * -1 + 'px'}" class="Roasters ">

    <div v-if="cover" ref="splash" :style="{minHeight: 250+'px', height: 30+'vh'}" class="Roasters-cover Cover _padding-top-2 _padding-bottom-2">
      <div :style="{backgroundImage: 'url('+cover.url+')', height: '100%'}" class="_splash-image" />
    </div>

    <div class="Roasters-main _section-page _margin-center _margin-bottom-2">
      <div class="" v-html="$md.render(content || '')" />

      <div v-for="item of Roasters" :key="item.id" class=" _margin-top-2 _margin-bottom-2">
        <div class="">
          <div class="_card --transparent _padding _grid-auto-1-xs _grid-gap-none _align-vertically">
            <img v-if="item.fields['Cover']" :src="item.fields['Cover'][0]['thumbnails']['large']['url']" class="_img-fit-cover" width="200px" height="150px">
            <div class=" _md-p_fix _padding">
              <h5 class="_padding-top-half _padding-bottom-half">{{ item.fields['Name'] }}</h5>
              <div class="" v-html="$md.render( item.fields['Markdown'] || '')" />
            </div>
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
    tableQueries: ["_content","_roasters"]
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
      cover: this.$cytosis.findOne('roasters-page', this.$store.state['Content'] ).fields['Cover'][0],
      content: this.$cytosis.findOne('roasters-page', this.$store.state['Content'] ).fields['Markdown'],
      images: this.$cytosis.findOne('roasters-page', this.$store.state['Content'] ).fields['Attachments'],
    }
  },
  
  computed: {
    ...mapState([
      'Roasters',
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
    // special header behavior
    this.$store.dispatch("updateCreate", {diffTopHeader: false, splashHeight: 0})
  },

  methods: {
  },


}
</script>

<style>
</style>

