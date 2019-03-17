<template>
  <div class="CoffeeShops _section-page _margin-center">

    <div class="_section-content">
      <div class="_section-article" v-html="$md.render(content || '')" />
    </div>

    <div class="CoffeeShops-main _grid-3-2">
      <div class="_section-article _padding-bottom-2">
        <div class="CoffeeShops-filters _section-article" >
          <input id="CoffeeShops-search" ref="cafeSearch" v-model.trim="searchString" class="CoffeeShops-search _form-input " type="text" name="CoffeeShops-search" placeholder="Search (e.g. 'cafe')" @input="doSearch">

          <div>
            <div class="_form-checkbox --inline">
              <label for="searchITP">
                <input id="searchITP" v-model.trim="searchITP" type="checkbox" name="searchITP" @input="doSearch" >
                <span for="searchITP">Stay within the Perimeter!</span>
              </label>
            </div>
            <div class="_form-checkbox --inline">
              <label for="isRecommended">
                <input id="isRecommended" v-model.trim="isRecommended" type="checkbox" name="isRecommended" @input="doSearch" >
                <span for="isRecommended">Recommended</span>
              </label>
            </div>
          </div>

        </div>

        <div v-for="item of Cafes" :key="item.id" class="Coffee-card --wide _card _grid-1-3-xs" >
          <div>
            <img v-lazy="item.fields['Cover'][0]['thumbnails']['large']['url']" v-if="item.fields['Cover']" class="_width-full" >
          </div>
          <div class="_padding _padding-left-none">
            <div v-if="item.fields['Recommended']" class="Coffee-card-recommended" >🌟</div>
            <router-link :to="`/cafe/${item.fields['Slug']}`" class="Coffee-card-title">{{ item.fields['Name'] }}</router-link>
            <div class="Coffee-card-location">{{ item.fields['Neighborhood'] || item.fields['City'] }}</div>
            <!-- <div v-html="$md.render(item.fields['Description'] || '')" /> -->
          </div>
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
      searchString: null,
      searchITP: null,
      isRecommended: null,
      querySearchString: null,
      cafeResults: null, // set of results from a custom search
    }
  },
  
  computed: {
    Cafes() {
      // console.log('cafes:', this.cafeResults)
      return this.cafeResults || this.$store.state['Cafes']
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

  watch: {
    // $route (to, from){
    $route (to){
      // get search query from the parameter
      console.log('updated search query: ', this.$route.query.search, to)
      this.querySearchString = this.$route.query.search
      this.doSearch()
    }
  },

  mounted() {
  },

  methods: {
    doSearch: _.debounce(async function() {

      let filterObj = {
        'AND': [],
        'OR': [],
      }

      // manages the filter objects
      const addFilter = function(formula, type) {
        // type is 'AND' or 'OR'
        filterObj[type].push(formula) // add the pure formula to this filter type
      }

      // creates filter string w/ the filter object
      const getFilter = function() {
        console.log('getFilter from', filterObj)

        // process OR filters
        // OR(logical1, [logical2, ...])
        // Returns true if any one of the arguments is true. 
        // OR(Finished, Reviewed)
        let orFilters = undefined
        if(filterObj['OR'] && filterObj['OR'].length > 0) {
          orFilters = `OR(${filterObj['OR'].join(', ')})`
        }

        // process AND filters
        // AND(logical1, [logical2, ...])
        // Returns true if all the arguments are true, returns false otherwise.  
        // AND(Finished, Reviewed)
        let andFilters = undefined
        if(filterObj['AND'] && filterObj['AND'].length > 0) {
          andFilters = `AND(${filterObj['AND'].join(', ')})`
        }

        const filterStr = (orFilters && andFilters) ? `AND(${orFilters}, ${andFilters})`: orFilters || andFilters
        return filterStr
      }

      // let orFilterStr = '' // these are optional / OR filters
      // let andFilterStr = ''

      /* Handle Search Term / keyword search */
      const searchTerm = this.querySearchString || this.searchString
      // console.log("handling search:", searchTerm)

      if (searchTerm && searchTerm.length > 0) {
        // searchTerm is are OR results, either they can match City, Name, etc.
        // filterStr += `OR(
        //     SEARCH(LOWER("${searchTerm}"), LOWER(City)),
        //     SEARCH(LOWER("${searchTerm}"), LOWER(Name))
        //   ),
        // `
        addFilter(`SEARCH(LOWER("${searchTerm}"), LOWER({City}))`, 'OR')
        addFilter(`SEARCH(LOWER("${searchTerm}"), LOWER({Name}))`, 'OR')
      }

      // AND searches / bounding searches
      // these must be true in the results
      if(this.searchITP) {
        // console.log('search ITP!')
        addFilter(`IF({ITP},TRUE(),FALSE())`, 'AND')
        // andFilterStr = `AND(IF(ITP,TRUE(),FALSE()))`
      }
      if(this.isRecommended) {
        addFilter(`IF({Recommended},TRUE(),FALSE())`, 'AND')
      }

      // const filterText = `AND(
      //   ${filterStr}
      //   ${andFilterStr}
      // )`


      console.log('filter text: ', getFilter() )


      // if search queries are empty, we return the full list
      if (filterObj['AND'].length == 0 && filterObj['OR'].length == 0) {
        // if(searchTerm == '') {
        this.cafeResults = null
        return undefined
      } 

      // otherwise we run queries against airtable

      let cytosis = await new Cytosis({
        airKey: this.env.airtable_api, 
        airBase: this.env.airtable_base, 
        tableQuery: '_cafes', 
        options: {
          // filter: `SEARCH("${this.searchString}", Name)`
          // filter: `SEARCH(LOWER("${searchTerm}"), LOWER(Name))`,
          filter: getFilter()
        }
      })

      console.log('search results:', cytosis.tables['Cafes'])
      this.cafeResults = cytosis.tables['Cafes']

    }, 400)
  },


}
</script>

<style>
</style>

