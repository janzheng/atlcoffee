<template>

  <div class="Story">
    <div v-if="story['Cover']" class="Story-cover" >
      <div v-lazy:background-image="story['Cover'][0]['url']" class="Story-cover-img" />
    </div>

    <div class="Story _section-page _margin-center _padding-left-2 _padding-right-2">
      <div class="Story-headmatter _section-content">
        <h1> {{ story['Name'] }} </h1>
        <h5 v-html="$md.render(story['Lede'] || '')" />

        <!-- linked cafes -->
        <div class="Story-cafes">
          <div v-for="item of cafes" :key="item.id" class="Story-cafe">
            <router-link :to="`/cafe/${item.fields['Slug']}`">{{ item.fields['Name'] }}</router-link>
          </div>
        </div>


        <!-- author info?  -->
      </div>

      <div v-lazy-container="{ selector: 'img' }" class="Story-content _section-content" >
        <div class="" v-html="$md.render(story['Article'] || '')" />
        <!-- <div>{{ cafe.Name }}</div> -->
        <!-- {{ cafe.Title }} -->
        <!-- <div class="_section-article" v-html="$md.render(content || '')" /> -->
        <!-- {{ Cafes }} -->
        <!-- <div class="_section-article">
          <div class="Cafe-card" v-for="cafe of Cafes" :key="cafe.id">
            {{ cafe.fields['Name'] }}
          </div>
        </div> -->
      </div>


      <div v-if="story['Footer']" class="Story-footer _section-content" >
        <div class="" v-html="$md.render(story['Footer'] || '')" />
      </div>

      {{ story }}


    </div>
  </div>
</template>
<!-- 
<no-ssr>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.9/jquery.lazy.min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.9/jquery.lazy.plugins.min.js"></script>
</no-ssr>
 -->


<script>

import { mapState } from 'vuex'


export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content",
    tableQueries: ["_content", "_story", "_cafes-short"],
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
      'Cafes'
      ]),
    story() {
      // console.log('what? ', this.slug, this.Cafes, this.$cytosis.find(this.slug, {'Cafes': this.Cafes}, ['Slug'] ))
      return this.$cytosis.find(this.slug, {'Stories': this.Stories}, ['Slug'] )['fields']
    },
    cafes() {
      // these are the cafes linked to the establishment
      // sometimes there can be more, if it's a small chain
      return this.$cytosis.getLinkedRecords(this.story['Cafes'], this.Cafes, true )
    },
  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style lang="scss" scoped>

</style>

