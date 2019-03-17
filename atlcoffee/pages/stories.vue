<template>
  <div class="Stories _section-page _margin-center">

    <div class="_section-content">

      <!-- {{ Stories }} -->

      <div v-for="item of Stories" :key="item.id" class="Stories-item _card _padding">
        <div class="_font-small _padding-bottom-half" >{{ item.fields['Date'] | niceDate }} </div>
        <img v-lazy="item.fields['Cover'][0]['url']" v-if="item.fields['Cover']" height="180" >
        <h4><router-link :to="'/stories/' + item.fields['Slug']">{{ item.fields['Name'] }}</router-link></h4>
        <div class="" v-html="$md.render(item.fields['Lede'] || '')" />
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
    // tableQuery: "_content",
    tableQueries: ["_content", "_stories", ],
  },

  // runs on generation and page route (but not on first page load)
  asyncData({route}) {
    const slug = unescape(route.params.slug)
    return {
      slug,
    }
  },

  data () {
    return {
    }
  },
  
  computed: {
    ...mapState([
      'Stories',
      ]),
    // cafe() {
    //   // console.log('what? ', this.slug, this.Cafes, this.$cytosis.find(this.slug, {'Cafes': this.Cafes}, ['Slug'] ))

    //   return this.$cytosis.find(this.slug, {'Cafes': this.Cafes}, ['Slug'] )['fields']
    // },
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

