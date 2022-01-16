<template>
  <div class="app-settings w-full flex flex-wrap mx-auto">
    <aside class="w-full md:w-1/5">
      <div class="w-full sticky inset-0 max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20" style="top:6em;">

        <div class="space-x-3 flex justify-end pr-4 pt-2">
          <t-button @click="doSave()" style="width: 100px" :disabled="hasChanged" :data-rerendered="ui.actionKey">Save</t-button>
          <t-button variant="secondary" style="width: 100px" :disabled="hasChanged" :data-rerendered="ui.actionKey">Cancel</t-button>
        </div>

        <ul class="list-reset py-2 md:py-0 mt-4" v-scroll-spy-active="{selector: 'li', class: 'active'}" v-scroll-spy-link>
          <li class="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
            <a href='javascript:void(0)' class="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                <span class="pb-1 md:pb-0 text-sm">General</span>
            </a>
          </li>

          <li class="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
            <a href='javascript:void(0)' class="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                <span class="pb-1 md:pb-0 text-sm">Advanced</span>
            </a>
          </li>

          <li class="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
            <a href='javascript:void(0)' class="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
              <span class="pb-1 md:pb-0 text-sm">Debugging</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <!--Section container-->
    <section class="w-full md:w-4/5 min-h-screen">
      <div v-scroll-spy>
        <div class="pt-2">
          <!--Title-->
          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-1 text-xl w-full text-center">General</h2>

          <!--Card-->
          <div class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <div class="md:flex mb-6">
              <div class="md:w-3/5">
                <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-checkbox">
                  Post Types
                </label>
                <p class="py-2 text-sm text-gray-600">Which post types do you want to index?</p>
              </div>
              <div class="md:w-2/5">
                <t-rich-select
                  v-model="settings.include_post_types"
                  placeholder="select an option"
                  :options="options"
                  multiple
                  tags
                />
              </div>
            </div>

          </div>
          <!--/Card-->
        </div>

        <div class="pt-2">
          <!--Title-->
          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-1 text-xl w-full text-center">Advanced</h2>

          <!--Card-->
          <div class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <div class="md:flex mb-6">
              <div class="md:w-3/5">
                <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-checkbox">
                  Cleanup database upon plugin uninstall.
                </label>
                <p class="py-2 text-sm text-gray-600">When enabled the plugin will remove any database data upon plugin uninstall.</p>
              </div>
              <div class="md:w-2/5">
                <t-toggle v-model="settings.cleanup_db_on_plugin_uninstall" />
              </div>
            </div>

          </div>
          <!--/Card-->
        </div>

        <div class="pt-2">
          <!--Title-->
          <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pb-1 text-xl w-full text-center">Debugging</h2>

          <!--Card-->
          <div class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <div class="md:flex mb-6">
              <div class="md:w-3/5">
                <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-checkbox">
                  Enable Debug Messages
                </label>
                <p class="py-2 text-sm text-gray-600">When enabled the plugin will output debug messages in the JavaScript console.</p>
              </div>
              <div class="md:w-2/5">
                <t-toggle v-model="settings.enable_debug_messages" />
              </div>
            </div>

          </div>
          <!--/Card-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, ref } from 'vue'
import { TToggle, TButton, TRichSelect } from '@variantjs/vue'

export default defineComponent({
  components: {
    TToggle,
    TButton,
    TRichSelect
  },
  name: 'Settings',
  setup () {
    const oldSettings = {
      enable_debug_messages: false,
      cleanup_db_on_plugin_uninstall: false,
      include_post_types: []
    }
    const settings = reactive({...oldSettings})
    const ui = reactive({ actionKey: 0 })

    const hasChanged = computed(() => {
      // compare two objects
      const a = JSON.stringify(settings)
      const b = JSON.stringify(oldSettings)
      ui.actionKey = ui.actionKey + 1
      return (a === b)
    });

    return {
      settings,
      oldSettings,
      hasChanged,
      endpoints: { settings: '' },
      ui,
      options: [{
          value: 'post',
          text: 'Post',
        },
        {
          value: 'page',
          text: 'Page',
        },
        {
          value: 'wprm_recipe',
          text: 'Recipes',
        }
      ]
    }
  },
  methods: {
    async doSave() {
      const rst = await this.axios.post(this.endpoints.settings, {...this.settings})
      // const rst = { success: true }
      if (rst.success) {
        this.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your settings has been saved.',
          showConfirmButton: false,
          timer: 1500
        })

        const settings = {...this.settings}
        Object.keys(settings).forEach((key) => {
          this.oldSettings[key] = settings[key]
        })

        // force rerendered
        this.ui.actionKey = this.ui.actionKey + 1
      }
    }
  },
  beforeCreate() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        const settings = this.$win.vue_wp_plugin_config.settings || {}
        this.endpoints = this.$win.vue_wp_plugin_config.rest.endpoints

        // copy settings from server output
        Object.keys(settings).forEach((key) => {
          this.oldSettings[key] = settings[key]
          this.settings[key] = settings[key]
        })
      }
    }
  }
})
</script>

<style lang="css" scoped>
.active {
  --tw-border-opacity: 1;
  border-color: rgb(202 138 4 / var(--tw-border-opacity));
  font-weight: 700;
}
/* CHECKBOX TOGGLE SWITCH */
/* @apply rules for documentation, these do not work as inline style */
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68D391;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68D391;
}
</style>
