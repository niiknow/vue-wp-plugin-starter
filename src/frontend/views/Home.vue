<template>
  <div class="app-home">
    <section class="w-full text-center">
      {{ msg }} <br />
      Plugin Url: {{ getPluginUrl() }}
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getPluginUrl } from '~src/shared/pluginHelpers'

export default defineComponent({
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Frontend App'
    }
  },
  methods: {
    getPluginUrl: getPluginUrl
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
