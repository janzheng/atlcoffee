<template>
  <div class="Stories _section-page _margin-center _padding-left-2 _padding-right-2">

    <div class="_section-content">

      <!-- {{ Stories }} -->

      <div v-for="story of Stories" :key="story.id" class="Stories-item _card _padding">
        <router-link :to="'/stories/'+story.fields['Slug']">
          <h4>{{ story.fields['Name'] }}</h4>
        </router-link>
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

