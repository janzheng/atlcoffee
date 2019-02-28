
<template>
  <!-- <header class="Header _section-page _padding-top _padding-bottom _margin-center"> -->
  <header class="Header _padding-top _padding-bottom _margin-center">
    <router-link to="/" class="Header-title" v-html="$md.render(title || '')" />
    <router-link v-for="nav of navs" :to="'/'+$slugify(nav, {lower: true})" :key="nav" class="_margin-right">{{ nav }}</router-link>
  </header>
</template>


<script>
export default {
  data () {
    return {
      title: this.$cytosis.find('Content.title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      navs: this.$cytosis.find('Content.header-nav', {'Content': this.$store.state['Content']} )[0]['fields']['List'],
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

.logo {
  position: relative;
  width: 45px;
  top: 3px;
}

.logo-xs {
  position: relative;
  width: 45px; //34px;
  // top: 3px;
  // margin-right: 16px;
  vertical-align: bottom;
}

</style>


