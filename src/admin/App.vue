<template>
  <div class="main-wrapper">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import menuFix from './admin-menu-fix'

export default defineComponent({
  mounted() {

    // @ts-ignore
    menuFix(inject('pluginConfig', {}).prefix || 'vue-app')
  }
})
</script>

<style scoped>
</style>
