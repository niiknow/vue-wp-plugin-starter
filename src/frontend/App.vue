<template>
  <nav class="fixed w-full bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-7">
          <!-- Website Logo -->
          <div>
            <a href="../" class="flex items-center py-4 px-2">
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>
              <span class="font-semibold text-gray-500 text-lg"
                >Home</span
              >
            </a>
          </div>
        </div>

        <!-- Secondary Navbar items -->
        <div class="hidden md:flex items-center space-x-3 ">
           <iframe src="https://ghbtns.com/github-btn.html?user=niiknow&repo=vue-wp-plugin-starter&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
        </div>
      </div>
    </div>
  </nav>
  <div class="main-wrapper">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppOne'
})
</script>

<style scoped>
</style>
