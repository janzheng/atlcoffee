<template>
  <div class="CoffeeList _section-page _margin-center _padding-left-2 _padding-right-2">

    <div class="_section-content">
      <div>{{ cafe.Name }}</div>
      {{ cafe.Title }}
      <!-- <div class="_section-article" v-html="$md.render(content || '')" /> -->
      <!-- {{ Cafes }} -->
      <!-- <div class="_section-article">
        <div class="Cafe-card" v-for="cafe of Cafes" :key="cafe.id">
          {{ cafe.fields['Name'] }}
        </div>
      </div> -->
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
    tableQueries: ["_content", "_cafes"],
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
      'Cafes',
      ]),
    cafe() {
      // console.log('what? ', this.slug, this.Cafes, this.$cytosis.find(this.slug, {'Cafes': this.Cafes}, ['Slug'] ))
      return this.$cytosis.find(this.slug, {'Cafes': this.Cafes}, ['Slug'] )['fields']
    },
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

