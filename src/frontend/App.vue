<template>
  <div class="main-wrapper">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// this demonstrate frontend app that utilize the router
export default defineComponent({
  name: 'AppOne'
})
</script>

<style scoped>
</style>
