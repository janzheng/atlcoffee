<template>
  <div :style="{top: navHeight * -1 + 'px'}" class="About ">

    <div v-if="cover" ref="splash" :style="{minHeight: 250+'px', height: 30+'vh'}" class="About-cover Cover _padding-top-2 _padding-bottom-2">
      <div :style="{backgroundImage: 'url('+cover.url+')', height: '100%'}" class="_splash-image" />
    </div>


    <!-- <div class="_section-content"> -->
    <!-- <div class="_section-article"> -->
    <!-- <img :src="images[0]['thumbnails']['large']['url']" width="600" height="300" alt="about coffee header" class="Sectional-header"> -->
    <!-- </div> -->
    <div class="About-main _section-page _margin-center _margin-bottom-2">
      <div class="" v-html="$md.render(content || '')" />
    </div>
    <!-- </div> -->

    <div class="About-authors _section-page _margin-center _margin-bottom-2">
      <h3>Authors</h3>

      <div v-for="item of Authors" :key="item.id" class=" _margin-top-2 _margin-bottom-2">
        <div class="_inline-block">
          <div class="_card _padding _grid-auto-1-xs _align-vertically">
            <img :src="item.fields['Profile'][0]['thumbnails']['large']['url']" style="border-radius: 100%" width="70px" height="70px">
            <div class=" _md-p_fix">
              <h5 class="_padding-top-half _padding-bottom-half">{{ item.fields['Name'] }}</h5>
              <div class="" v-html="$md.render( item.fields['About'] || '')" />
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
    tableQueries: ["_content","_authors"]
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
      cover: this.$cytosis.findOne('about-page', this.$store.state['Content'] ).fields['Cover'][0],
      content: this.$cytosis.findOne('about-page', this.$store.state['Content'] ).fields['Markdown'],
      images: this.$cytosis.findOne('about-page', this.$store.state['Content'] ).fields['Attachments'],
    }
  },
  
  computed: {
    ...mapState([
      'Authors',
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

