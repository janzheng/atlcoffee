<template>
  <div class="About _section-page _margin-center">

    <!-- <div class="_section-content"> -->
    <!-- <div class="_section-article"> -->
    <!-- <img :src="images[0]['thumbnails']['large']['url']" width="600" height="300" alt="about coffee header" class="Sectional-header"> -->
    <!-- </div> -->
    <div class="" v-html="$md.render(content || '')" />
    <!-- </div> -->

  </div>
</template>




<script>
  

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content"
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
      content: this.$cytosis.findOne('about-page', this.$store.state['Content'] ).fields['Markdown'],
      images: this.$cytosis.findOne('about-page', this.$store.state['Content'] ).fields['Attachments'],
    }
  },
  
  computed: {

  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

