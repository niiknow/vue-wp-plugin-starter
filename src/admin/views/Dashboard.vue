<template>
  <div class="app-dashboard">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: 'Dashboard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Admin App'
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
