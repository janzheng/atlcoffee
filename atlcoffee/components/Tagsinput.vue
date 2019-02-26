
<!-- 

  example from: https://adamwathan.me/renderless-components-in-vuejs/
  refer to: proptester.vue

 -->
<template>
  <div class="tags-input">
    <span v-for="tag in value" class="tags-input-tag _tag">
      <span>{{ tag }}</span>
      <span class="tags-input-remove _pointer" @click="removeTag(tag)">&times;</span>
    </span>
    <input class="tags-input-text" placeholder="Add tag..."
      @keydown.enter.prevent="addTag"
      v-model="newTag"
    >
    <!-- childData and sayHello are passed to the calling component -->
    <slot name="tester" :childData="childData" :sayHello="sayHello" :events="{
      click: () => sayHello()
    }"></slot>
  </div>
</template>


<script>

export default {
  props: ['value'],
  data() {
    return {
      newTag: '',
      childData: 'bananarama',
    }
  },
  methods: {
    sayHello() {
      console.log('this is a child saying hello!')
    },
    addTag() {
      if (this.newTag.trim().length === 0 || this.value.includes(this.newTag.trim())) {
        return
      }
      this.$emit('input', [...this.value, this.newTag.trim()])
      this.newTag = ''
    },
    removeTag(tag) {
      this.$emit('input', this.value.filter(t => t !== tag))
    },
  },
}
</script>

