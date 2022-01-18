<template>
  <div v-if="hasLoaded" class="main-wrapper">
    <component :is="comp"></component>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent, ref, nextTick, inject } from 'vue'

// this demonstrate dynamic frontend app using a single view
export default defineComponent({
  name: 'FrontView',
  setup () {
    const hasLoaded = ref(false)
    const componentName = ref('')

    const comp = computed(() => {
      // compare two objects
      return defineAsyncComponent(() => import(`./views/${componentName.value}.vue`))
    })

    return {
      comp,
      componentName,
      hasLoaded
    }
  },
  mounted() {
    const that = this

    // @ts-ignore
    if (that.$win.vue_wp_plugin_config_frontview) {
      that.doLoad()
      return
    }

    document.onreadystatechange = async () => {
      if (document.readyState == 'complete') {
        that.doLoad()
      }
    }

  },
  methods: {
    async doLoad() {
      const that = this

      await nextTick()

      // @ts-ignore
      let viewComponent = that.$win.vue_wp_plugin_config_frontview.viewComponent

      if (!viewComponent) {
        viewComponent = that.$route.query.comp
      }

      if (!viewComponent) {
        viewComponent = 'Home'
      }

      that.componentName = viewComponent

      // make sure data is loaded before ui render
      that.hasLoaded = true
      that.$forceUpdate()
    }
  }
})
</script>

<style scoped>
</style>
