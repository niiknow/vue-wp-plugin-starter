<template>
  <h3>Backend App</h3>
  <div class="main-wrapper">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import menuFix from './admin-menu-fix'
import jQuery from 'jquery'

export default defineComponent({
  mounted() {
    // fix the admin menu for the slug "vue-app"
    menuFix('vue-app', jQuery)
  }
})
</script>

<style scoped>
</style>
