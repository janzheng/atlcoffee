<template>
  <div class="Home _section-page _margin-center _padding-left-2 _padding-right-2">

    <div class="_section-content">
      <div class="_section-article" v-html="$md.render(intro || '')" />
    </div>

    <div class="_section-content">
      <!-- <div class="_section-article" v-html="map" /> -->
      <div class="_card _padding " v-html="$md.render(map || '')" />
    </div>

    <!-- 
    <div class="TestOne">
      This is yet a test. LIGHT
    </div>
    <div class="Test">
      This is yet a test
    </div>
    <div class="TestTwo">
      This also is yet a test
    </div>
     -->

 
    <!-- <div class="">
          <div class="_section-content">
            <div class="_section-article">
              <CapsidBanner />
            </div>
          </div>
          <div class="_grid-3-1">
            <div>
              <FormCapsidFeedback class=""/>
            </div>

            <div class="">
              <no-ssr>
                <Twitter />
              </no-ssr>
            </div>
          </div>
        </div>
    -->



    <div class="">
      <!-- <div class="_grid-3-1"> -->
        <!-- 
        <div class="StreamCard _grid-1-6">
          <div class="StreamCard-sidebar">
            <img class="cnt _block _left" src="/cnt.png" width="100px" alt="Capsid and Tail" />
          </div>
          <div class="StreamCard-main _margin-bottom">
            <CapsidStub :issues="latest" :is-featured="true" class="_section-article _margin-center" />
            <CapsidMicroBanner class="CapsidBanner" />
            <FormCapsidFeedback class=""/>
          </div>
        </div>
         -->
        <!-- <div class="Stream">

          <StreamCard>
            <div slot="sidebar" style="width:100px">
              <img class="cnt _block _left _margin-center" src="/phagefutures.png" width="80px" alt="Phage Futures" >
            </div>
            <div slot="main" class="_card --border-active _padding _md-p_fix" v-html="$md.render(phagefutures || '')" />
          </StreamCard>

          <StreamCard>
            <div slot="sidebar" style="width:100px">
              <img class="cnt _block _left" src="/cnt.png" width="100px" alt="Capsid and Tail" >
            </div>
            <div slot="main">
              <CapsidStub :issues="latestCapsid" :is-featured="true" class="_section-article _margin-center" />
              <CapsidMicroBanner class="CapsidBanner" />
              <FormCapsidFeedback class=""/>
            </div>
          </StreamCard>
        </div>

        <div class="">
          <no-ssr>
            <Twitter />
          </no-ssr>
        </div>
 -->
      <!-- </div> -->
    </div>

  </div>
</template>




<script>

import Twitter from '~/components/Twitter.vue'
// import FormVomFeedback from '~/forms/FormVomFeedback.vue'
// import FormCapsidFeedback from '~/forms/FormCapsidFeedback.vue'
// import SignupCapsid from '~/components/SignupCapsid.vue'
// import CapsidBanner from '~/components/CapsidBanner.vue'
// import CapsidMicroBanner from '~/components/CapsidMicroBanner.vue'
// import CapsidStub from '~/components/CapsidStub.vue'
import StreamCard from '~/components/StreamCard.vue'

import { mapState } from 'vuex'
// import Cytosis from 'cytosis'
// import Cytosis from '~/other/cytosis'
export default {

  components: {
    Twitter,
    // FormCapsidFeedback,
    // SignupCapsid,
    // CapsidStub,
    // CapsidMicroBanner,
    // CapsidBanner,
    // StreamCard
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
      intro: this.$cytosis.find('Content.home-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      map: this.$cytosis.find('Content.coffee-map', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      ]),
    latestCapsid() {
      // NOTE: this always pulls the TOP item from airtable. Make sure it's the right one!
      // console.log('latestCapsid', this['C&T'][0])
      return [this.$store.state['C&T'][0]] // return an array of the first issue only
    }

  },

  mounted () {
  },

  methods: {
    // rawContent(findStr) {
    //   // return this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : ''

    //   // return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    // },
    // content(findStr) {
    //   console.log ('cczzzzcc', this.cytosis, orange.find)
    //   // console.log ('???', this.$store.state.cytosis.get('recX0na4jnDb3ThuZ' ))
    //   if (!this.cytosis.find) { // wait for init
    //     console.log('no cytosis?', this.cytosis,)
    //     return ''
    //   }

    //   const record = this.cytosis.find(findStr)[0]
    //   if(record.fields.Markdown) {
    //     return this.$md.render( record.fields.Markdown )
    //   }

    //   return this.Content[0].fields.Markdown // if error
    // }
  },


}
</script>

<style>
</style>




  <!-- 
          <h1 class="Home-title title">
            Phage Directory is
          </h1>

          1. Goal is to make phage therapy a reality
          2. Science-backed
          3. Get phage researchers together to improve phage therapy 

          <div class="Home-tag">
            a directory of researchers 
            <s>fighting antibiotic resistance with phages.</s>

            Our antibiotics are failing. 
            People are dying of drug-resistant infections.
            But there is hope.

            Phage therapy—a way of treating infections with bacteria-killing viruses called bacteriophages—is difficult, personalized, and needs researchers, medical professionals, governments, and families to work together.

            Phage Directory connects the right people to 
            safely bring the right phages to 
            patients who need them.

            — @phagedirectory

          </div>
          <div class="Home-boxes _grid-3">
            <div>Make phage therapy a reality</div>
            <div>Towards phage research</div>

            working together to accelerate phage research towards making phage therapy a reality
          </div>

          Our mission, goals, and how we're getting there

          <div class="_card">
            Join the fight message
          </div>
           -->
