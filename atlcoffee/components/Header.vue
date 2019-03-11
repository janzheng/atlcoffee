
<template>
  <!-- <header class="Header _section-page _padding-top _padding-bottom _margin-center"> -->

  <div :style="{height: navHeight+'px'}" class="Header-container" >
    <!-- if using a fixed header, the header-container height maintains the original height -->
    <header ref="nav" class="Header --fixed _margin-center" >
      <div class="_grid-1-3-1 _align-vertically">
        <router-link to="/" class="Header-title" v-html="$md.render(title || '')" />
        <div>
          <router-link v-for="nav of navs" :to="'/'+$slugify(nav, {lower: true})" :key="nav" class="Header-nav _margin-right">{{ nav }}</router-link>
        </div>
        <div class="_right-sm">
          <router-link to="/contact">Contact</router-link>
        </div>
      </div>
    </header>
  </div>
</template>


<script>
export default {

  props: {
    scrollY: Number,
  },

  data () {
    return {
      title: this.$cytosis.find('Content.title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      navs: this.$cytosis.find('Content.header-nav', {'Content': this.$store.state['Content']} )[0]['fields']['List'],
      navHeight: 300,
    }
  },

  computed: {
    searchString: {
      get: function () {
        return this.$store.state.searchString
      },
      // setter
      set: function (str) {
        const url = `/search/${this.searchString}`
        this.$store.dispatch("updateCreate", {
          searchSource: "header",
          searchString: str || "",
          searchUrl: url,
        })
      }
    }
  },

  mounted() {
    this.navHeight = this.$refs.nav.clientHeight
    this.$store.dispatch('updateCreate', { 
      "navHeight": this.$refs.nav.clientHeight,
      "windowHeight": window.innerHeight,
    })
  },
  
  methods: {
    search() {
      console.log("handling search:",this.searchString)
      // const url = `/search/${this.searchString}`
      const url = `/phages`
      // console.log("search url:", url, "?", this.$router.history)
      // $router history push forces a page reload... use window to replace
      // store the searchstring into store?
      if(this.searchString != "")
        this.$router.replace(url)

      // window.location = url;
      // this.$store.dispatch("updateCreate", {
      //   search: {
      //     string: this.searchString,
      //     url: url
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>


</style>


