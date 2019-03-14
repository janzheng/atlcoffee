<template>
  <div class="Footer --antialiased">
    <div class="_section-page _margin-center _padding-2">
      <div class="_grid-1-3 _align-vertically">
        <div class="_font-coffee">ATL <br> Coffee </div>
        <div class="_right">
          <a class="_margin-right-sm _block-xs _left-xs" target="_blank" href="mailto:hello@atlantacoffeeshops">hello@atlantacoffeeshops</a>
          <a class="_margin-right-sm _block-xs _left-xs" target="_blank" href="https://www.instagram.com/atlantacoffeeshops/">Instagram</a>
          <a class="_block-xs _left-xs" target="_blank" href="https://www.facebook.com/atlantacoffeeshops/">Facebook</a>
        </div>
      </div>
    </div>
    
  </div>
</template>


<script>


export default {

  components: {
  },

  computed: {
    thisYear() {
      let date = new Date
      return date.getFullYear()
    }
  },


}
</script>

<style lang="scss" scoped>
</style>
