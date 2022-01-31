<template>
  <div class="main-wrapper">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import menuFix from './admin-menu-fix'

export default defineComponent({
  mounted() {
    const that = this

    setTimeout(() => {
      // fix the admin menu for the prefix slug or 'vue-app' if none is defined
      // @ts-ignore
      menuFix(that.$win.vue_wp_plugin_config_admin.prefix || 'vue-app')
    }, 1000)
  }
})
</script>

<style scoped>
</style>
