<template>
  <h3>Frontend App</h3>
  <div class="main-wrapper">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App1'
})
</script>

<style scoped>
</style>
