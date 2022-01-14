<template>
  <div class="app-settings">
    <!--Container-->
    <div class="w-full flex flex-wrap mx-auto">
      <div class="w-full md:w-1/5">
        <div class="w-full sticky inset-0 max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20" style="top:6em;">

          <div style="margin-bottom: 20px;" class="w-full">
            <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mr-2" style="width: 120px">Save</button>
            <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" style="width: 120px">Primary</button>
          </div>

          <ul class="list-reset py-2 md:py-0" v-scroll-spy-active  v-scroll-spy-link>
            <li class="menu-item py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
              <a href='javascript:void(0)' class="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                  <span class="pb-1 md:pb-0 text-sm">General</span>
              </a>
            </li>
            <li class="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
              <a href='javascript:void(0)' class="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                <span class="pb-1 md:pb-0 text-sm">Debugging</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!--Section container-->
      <section class="w-full md:w-4/5">
        <div v-scroll-spy>
          <div>
            <!--Title-->
            <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pt-8 pb-1 text-xl w-full text-center">General</h2>

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
                  <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
                </div>
              </div>

            </div>
            <!--/Card-->

            <!--Title-->
            <h2 class="font-sans font-bold break-normal text-gray-700 px-2 pt-8 pb-1 text-xl w-full text-center">Debugging</h2>

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
                  <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
                </div>
              </div>

            </div>
            <!--/Card-->
          </div>
        </div>
      </section>
      <!--/Section container-->
    </div>
      <!--/container-->
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Settings',
  data () {
    return {
    };
  },
  methods: {
  }
});
</script>

<style lang="css" scoped>
.active {
  --tw-border-opacity: 1;
  border-color: rgb(202 138 4 / var(--tw-border-opacity));
  font-weight: 700;
}
</style>
