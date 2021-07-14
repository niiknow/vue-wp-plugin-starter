<template>
  <div class="app-home">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Frontend App'
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
