<template>
  <div class="app-settings w-full flex flex-wrap mx-auto" v-if="hasLoaded">
    <aside class="w-full md:w-1/5">
      <div class="w-full sticky inset-0 max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20">

        <div class="space-x-3 flex justify-end pr-4 pt-2">
          <t-button
            @click="doSave()"
            style="width: 100px"
            :disabled="hasChanged"
            :data-rerendered="ui.actionKey"
          >Save</t-button>
          <t-button
            @click="doCancel()"
            variant="secondary"
            style="width: 100px"
            :disabled="hasChanged"
            :data-rerendered="ui.actionKey"
          >Cancel</t-button>
        </div>

        <ul
          class="list-reset py-2 md:py-0 mt-4"
          v-scroll-spy-active="{selector: 'li', class: 'active'}"
          v-scroll-spy-link>
          <li
            class="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent"
            v-for="(value, name) in structure.sections"
          >
            <a
              href='javascript:void(0)'
              class="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600"
            >
              <span class="pb-1 md:pb-0 text-sm">{{value}}</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <!--Section container-->
    <section class="w-full md:w-4/5 min-h-screen">
      <div class="ml-3" v-scroll-spy>
        <div class="pt-4" v-for="(value, name) in structure.sections">
          <!--Title-->
          <h2
            class="font-sans font-bold break-normal text-gray-700 px-2 pb-1 text-xl w-full text-center"
          >{{value}}</h2>

          <!--Card-->
          <div class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
            <div class="md:flex mb-6" v-for="item in getOptions(name)">
              <div class="md:w-3/5">
                <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-checkbox">
                  {{item.name}}
                </label>
                <p class="py-2 text-sm text-gray-600">{{item.description}}</p>
              </div>
              <div class="md:w-2/5">
                <div v-if="item.type === 'toggle'">
                   <t-toggle v-model="settings[item.id]" />
                </div>
                <div v-else-if="item.type === 'dropdownMultiselect'">
                  <t-rich-select
                    v-model="settings[item.id]"
                    :options="item.options"
                    multiple
                    tags
                  />
                </div>
                <div v-else-if="item.type === 'dropdown'">
                  <t-select
                    v-model="settings[item.id]"
                    :options="item.options"
                  />
                </div>
                <div v-else-if="['textarea'].indexOf(item.type) > -1">
                  <t-textarea
                    v-model="settings[item.id]"
                  />
                </div>
                <div v-else-if="item.type === 'code'">
                  <v-ace-editor
                    v-model="settings[item.id]"
                    lang="html"
                    theme="chrome"
                    style="height: 300px" />
                </div>
                <div v-else-if="item.type === 'color'">
                  <color-input v-model="settings[item.id]" format="hex" />
                </div>
                <div v-else>
                  <t-input
                    v-model="settings[item.id]"
                    :type="item.type"
                  />
                </div>
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
import { defineComponent, reactive, computed, ref, nextTick, toRaw } from 'vue'
import { TToggle, TButton, TRichSelect, TTextarea, TInput, TSelect } from '@variantjs/vue'
import { VAceEditor } from 'vue3-ace-editor'
import ColorInput from 'vue-color-input'
import ace from 'ace-builds'
ace.config.set(
  'basePath',
  'https://cdn.jsdelivr.net/npm/ace-builds@' + require('ace-builds').version + '/src-noconflict/',
)

export default defineComponent({
  components: {
    TToggle, TButton, TRichSelect, TTextarea, TInput, TSelect, VAceEditor, ColorInput
  },
  name: 'Settings',
  setup () {
    const oldSettings = {}
    const settings = reactive({...oldSettings})
    const ui = reactive({ actionKey: 0, loaded: false })
    const structure = reactive({sections: {}, options: {}})
    const hasLoaded = ref(false)

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
      structure,
      hasLoaded
    }
  },
  methods: {
    async doSave() {
      try {
        let data = toRaw(this.settings)
        const rst = await this.axios.post(this.endpoints.settings, data)
        // const rst = { success: true }
        if (rst.status == 200) {
          this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your settings has been saved.',
            showConfirmButton: false,
            timer: 1500
          })

          // @ts-ignore
          const config      = this.$win.vue_wp_plugin_config_admin
          const oldSettings = config.settings || {}
          const settings    = {...this.settings}

          Object.keys(settings).forEach((key) => {
            this.oldSettings[key] = settings[key]
            oldSettings[key] = settings[key]
          })

          // force rerendered
          this.ui.actionKey = this.ui.actionKey + 1
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wordpress response with error.',
            footer: '<div class="overflow-footer w-full">' + JSON.stringify(rst, null, 2) + '</div>'
          })
        }
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Server response with error.',
          footer: '<div class="overflow-footer w-full">' + err.message + '</div>'
        })
      }
    },
    getOptions(section) {
      const options = {...this.structure.options}
      const result  = []

      Object.keys(options).forEach((key) => {
        const item = options[key]
        if (item.section === section) {
          item.id = key
          result.push(item)
        }
      })

      return result
    },
    doCancel() {
      const settings = this.oldSettings
      Object.keys(settings).forEach((key) => {
        this.oldSettings[key] = settings[key]
        this.settings[key] = settings[key]
      })
    },
    async doLoad() {
      await nextTick()

      // @ts-ignore
      const config = this.$win.vue_wp_plugin_config_admin

      // @ts-ignore
      if (! this.$win.$appConfig.nonce) {
        this.$win.$appConfig.nonce = config.rest.nonce
      }

      const structure = config.settingStructure
      this.structure['sections'] = structure['sections']
      this.structure['options'] = structure['options']

      const settings = config.settings || {}
      this.endpoints = config.rest.endpoints

      // copy settings from server output
      Object.keys(settings).forEach((key) => {
        this.oldSettings[key] = settings[key]
        this.settings[key] = settings[key]
      })

      // make sure data is loaded before ui render
      this.hasLoaded = true
      this.$forceUpdate()
    }
  },
  beforeMount() {
    var that = this

    // @ts-ignore
    if (that.$win && that.$win.vue_wp_plugin_config_admin) {
      that.doLoad()
      return
    }

    document.onreadystatechange = async () => {
      if (document.readyState == "complete") {
        this.doLoad()
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

.overflow-footer {
  height: 100px;
  overflow-y: wrap;
}
</style>
