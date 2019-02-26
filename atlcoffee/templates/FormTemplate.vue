<template>
  <div class="FormContact FormCard">

    <Form :intro="intro"
          :source="source"
          :cta="cta"
          :thanks="thanks"

          :privacy="privacy"
          :errorMsg="error"
          :postUrl="postUrl"
          :isAlert="true"
          
          class=""
          table="Dynamic"
    />
  </div>
</template>

<script>

import Form from '~/components/Form.vue'
import { mapState } from 'vuex'

export default {

  components: {
    Form,
  },

  props: ['src'],

  data: function () {
    
    return {
      postUrl: this.src.fields['String'] || this.$store.state.ext_handler,

      intro: this.src.fields['Markdown'],
      source: this.src.fields['JSON'],
      isPublished: this.src.fields['isPublished'],
  
      error: this.$cytosis.find('Content.form-error', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      thanks: this.$cytosis.find('Content.form-thanks', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      cta: this.$cytosis.find('Content.form-cta', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      privacy: this.$cytosis.find('Content.form-privacy', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
    ...mapState([
      'Content',
      ]),

  },


  methods: {
    // rawContent(findStr) {
    //   return this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
    // },
    // content(findStr) {
    //   return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    // },

  }

}
</script>

<style lang="scss" scoped></style>

