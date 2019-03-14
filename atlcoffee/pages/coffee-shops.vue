<template>
  <div class="CoffeeShops _section-page _margin-center _padding-left-2 _padding-right-2">

    <div class="_section-content">
      <div class="_section-article" v-html="$md.render(content || '')" />
    </div>

    <div class="CoffeeShops-main _grid-3-2">
      <div class="_section-article _padding-bottom-2">
        <div class="CoffeeShops-filters _section-article" >
          <input id="CoffeeShops-search" ref="cafeSearch" v-model.trim="searchString" class="CoffeeShops-search _form-input " type="text" name="CoffeeShops-search" placeholder="Search (e.g. 'cafe')" @input="doSearch">
        </div>

        <div v-for="cafe of Cafes" :key="cafe.id" class="CoffeeShops-card" >
          <router-link v-if="cafe.fields['Slug']" :to="'/cafe/'+cafe.fields['Slug']" >{{ cafe.fields['Name'] }}</router-link>
          <div v-else>{{ cafe.fields['Name'] }}</div>
        </div>
      </div>

      <div class="CoffeeShops-map">
        <div class="_card _padding " v-html="$md.render(map || '')" />
      </div>

    </div>

  </div>
</template>





<script>

// import { mapState } from 'vuex'
import Cytosis from '~/other/cytosis'
import _ from 'lodash'

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
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
      env,
    }
  },

  data () {
    return {
      content: this.$cytosis.find('Content.coffee-page', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      map: this.$cytosis.find('Content.coffee-map', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      searchString: '',
      searchCafe: false,
    }
  },
  
  computed: {
    Cafes() {
      // console.log('cafes:', this.searchCafe)
      return this.searchCafe || this.$store.state['Cafes']
    }
    // ...mapState([
    //   'Cafes',
    //   ]),
    // cafeSearch: _.throttle(async function() {

    //   console.log("handling search:",this.searchString)

    //   let cytosis = await new Cytosis({
    //     airKey: this.env.airtable_api, 
    //     airBase: this.env.airtable_base, 
    //     tableQuery: '_cafes', 
    //     options: {
    //       filter: `SEARCH("${this.searchString}", Name)`
    //     }
    //   })

    //   console.log('search results:', cytosis.tables['Cafes'])
    //   // this.searchCafe = cytosis.tables['Cafes']
    //   return cytosis.tables['Cafes']
    // }, 4000)


  },

  mounted () {
  },

  methods: {
    doSearch: _.debounce(async function() {

      // if(this.searchString != "") {
      console.log("handling search:",this.searchString)

      let cytosis = await new Cytosis({
        airKey: this.env.airtable_api, 
        airBase: this.env.airtable_base, 
        tableQuery: '_cafes', 
        options: {
          // filter: `SEARCH("${this.searchString}", Name)`
          filter: `SEARCH(LOWER("${this.searchString}"), LOWER(Name))`,
        }
      })

      console.log('search results:', cytosis.tables['Cafes'])
      this.searchCafe = cytosis.tables['Cafes']
      // }

    }, 400)
  },


}
</script>

<style>
</style>

