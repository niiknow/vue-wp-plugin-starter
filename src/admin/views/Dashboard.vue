<template>
  <div class="app-dashboard">
    <section class="w-full text-center">
      {{ msg }}
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard',
  props: {
    msg: {
      type: String,
      required: false,
      default: 'Welcome to Your Vue.js Backend App'
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
