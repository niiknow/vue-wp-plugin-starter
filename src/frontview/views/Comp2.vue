<template>
  <div class="app-home">
    <section class="w-full text-center">
      {{ msg }}
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Frontview component 2'
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
