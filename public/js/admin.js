"use strict";
(self["webpackChunkPLUGIN_NAME"] = self["webpackChunkPLUGIN_NAME"] || []).push([["/js/admin"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/App.vue?vue&type=script&lang=ts":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/App.vue?vue&type=script&lang=ts ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var vue_1 = __webpack_require__(/*! vue */ "vue");

var admin_menu_fix_1 = __importDefault(__webpack_require__(/*! ./admin-menu-fix */ "./src/admin/admin-menu-fix.js"));

exports["default"] = (0, vue_1.defineComponent)({
  mounted: function mounted() {
    // fix the admin menu for the slug "vue-app"
    (0, admin_menu_fix_1.default)('vue-app');
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/App.vue?vue&type=template&id=3a030f38&ts=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/App.vue?vue&type=template&id=3a030f38&ts=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.render = void 0;

var vue_1 = __webpack_require__(/*! vue */ "vue");

var _hoisted_1 = {
  class: "main-wrapper container"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_view = (0, vue_1.resolveComponent)("router-view");

  return (0, vue_1.openBlock)(), (0, vue_1.createElementBlock)("div", _hoisted_1, [((0, vue_1.openBlock)(), (0, vue_1.createBlock)(_component_router_view, {
    key: _ctx.$route.path
  }))]);
}

exports.render = render;

/***/ }),

/***/ "./src/admin/admin.ts":
/*!****************************!*\
  !*** ./src/admin/admin.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var vue_1 = __webpack_require__(/*! vue */ "vue");

var App_vue_1 = __importDefault(__webpack_require__(/*! ./App.vue */ "./src/admin/App.vue"));

var index_1 = __importDefault(__webpack_require__(/*! ./router/index */ "./src/admin/router/index.ts"));

var vue_axios_1 = __importDefault(__webpack_require__(/*! vue-axios */ "./node_modules/vue-axios/dist/vue-axios.esm.min.js"));

var config_1 = __importDefault(__webpack_require__(/*! @/shared/config */ "./src/shared/config.ts"));

var vue3_scroll_spy_1 = __webpack_require__(/*! vue3-scroll-spy */ "./node_modules/vue3-scroll-spy/dist/index.js");

var vue_2 = __webpack_require__(/*! @variantjs/vue */ "./node_modules/@variantjs/vue/dist/index.umd.js");

var sweetalert2_1 = __importDefault(__webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js")); // @ts-ignore


var win = (0, config_1.default)(window);
var app = (0, vue_1.createApp)(App_vue_1.default); // Using default options

(0, vue3_scroll_spy_1.registerScrollSpy)(app); // allow for using this.$win/axios inside of a component

app.config.globalProperties.$win = win;
app.config.globalProperties.axios = win.$appConfig.axios;
app.config.globalProperties.$swal = sweetalert2_1.default;
app.use(index_1.default).use(vue_axios_1.default, win.$appConfig.axios);
var configuration = {
  TButton: {
    fixedClasses: "block px-4 py-2 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
    classes: "text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600",
    variants: {
      secondary: {
        classes: "text-gray-800 bg-white border border-gray-300 shadow-sm rounded hover:text-gray-600"
      },
      error: {
        classes: "text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600"
      },
      success: {
        classes: "text-white bg-green-500 border border-transparent rounded shadow-sm hover:bg-green-600"
      },
      link: {
        classes: "text-blue-500 underline hover:text-blue-600"
      }
    }
  }
};
app.use(vue_2.variantJS, configuration);
app.mount('#vue-admin-app');

/***/ }),

/***/ "./src/admin/router/index.ts":
/*!***********************************!*\
  !*** ./src/admin/router/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var vue_router_1 = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm-bundler.js");

var Dashboard_vue_1 = __importDefault(__webpack_require__(/*! @/admin/views/Dashboard.vue */ "./src/admin/views/Dashboard.vue"));

var Settings_vue_1 = __importDefault(__webpack_require__(/*! @/admin/views/Settings.vue */ "./src/admin/views/Settings.vue"));

var routes = [{
  path: "/",
  component: Dashboard_vue_1.default
}, {
  path: "/settings",
  component: Settings_vue_1.default
}];
var router = (0, vue_router_1.createRouter)({
  history: (0, vue_router_1.createWebHashHistory)(),
  routes: routes
});
exports["default"] = router;

/***/ }),

/***/ "./src/shared/axios.ts":
/*!*****************************!*\
  !*** ./src/shared/axios.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var Axios = axios_1.default.create({
  baseURL: '/',
  withCredentials: false,
  headers: {
    'Accept': 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
});
/* Allows Us To Authorized Api Request If Authenticated Using Web Middleware */

Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Axios.interceptors.response.use(function (response) {
  // replace old nonce
  if (response.headers['X-WP-Nonce']) {
    window.$appConfig.nonce = response.headers['X-WP-Nonce'];
  }

  return response;
});
Axios.interceptors.request.use(function (config) {
  // set nonce
  config.headers['X-WP-Nonce'] = window.$appConfig.nonce;
  return config;
});
exports["default"] = Axios;

/***/ }),

/***/ "./src/shared/config.ts":
/*!******************************!*\
  !*** ./src/shared/config.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var axios_1 = __importDefault(__webpack_require__(/*! ./axios */ "./src/shared/axios.ts"));

var debounce_1 = __importDefault(__webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js"));

function default_1(win) {
  win.$appConfig = {};
  win.$appConfig.axios = axios_1.default;
  win.$appConfig.debounce = debounce_1.default;
  return win;
}

exports["default"] = default_1;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Dashboard.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Dashboard.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _vue = __webpack_require__(/*! vue */ "vue");

var _default = (0, _vue.defineComponent)({
  name: 'Dashboard',
  props: {
    msg: {
      type: String,
      required: false,
      default: 'Welcome to Your Vue.js Backend App'
    }
  }
});

exports["default"] = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Settings.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Settings.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");

__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _vue = __webpack_require__(/*! vue */ "vue");

var _vue2 = __webpack_require__(/*! @variantjs/vue */ "./node_modules/@variantjs/vue/dist/index.umd.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// TODO: Generate setting page from config/settings.php
var _default = (0, _vue.defineComponent)({
  components: {
    TToggle: _vue2.TToggle,
    TButton: _vue2.TButton,
    TRichSelect: _vue2.TRichSelect
  },
  name: 'Settings',
  setup: function setup() {
    var oldSettings = {
      enable_debug_messages: false,
      cleanup_db_on_plugin_uninstall: false,
      include_post_types: []
    };
    var settings = (0, _vue.reactive)(_objectSpread({}, oldSettings));
    var ui = (0, _vue.reactive)({
      actionKey: 0,
      loaded: false
    });
    var structure = (0, _vue.reactive)({
      sections: {},
      options: {}
    });
    var hasLoaded = (0, _vue.ref)(false);
    var hasChanged = (0, _vue.computed)(function () {
      // compare two objects
      var a = JSON.stringify(settings);
      var b = JSON.stringify(oldSettings);
      ui.actionKey = ui.actionKey + 1;
      return a === b;
    });
    return {
      settings: settings,
      oldSettings: oldSettings,
      hasChanged: hasChanged,
      endpoints: {
        settings: ''
      },
      ui: ui,
      structure: structure,
      hasLoaded: hasLoaded,
      options: [{
        value: 'post',
        text: 'Post'
      }, {
        value: 'page',
        text: 'Page'
      }, {
        value: 'wprm_recipe',
        text: 'Recipes'
      }]
    };
  },
  methods: {
    doSave: function doSave() {
      var _this = this;

      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var rst, settings;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.axios.post(_this.endpoints.settings, _objectSpread({}, _this.settings));

              case 2:
                rst = _context.sent;

                // const rst = { success: true }
                if (rst.success) {
                  _this.$swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your settings has been saved.',
                    showConfirmButton: false,
                    timer: 1500
                  });

                  settings = _objectSpread({}, _this.settings);
                  Object.keys(settings).forEach(function (key) {
                    _this.oldSettings[key] = settings[key];
                  }); // force rerendered

                  _this.ui.actionKey = _this.ui.actionKey + 1;
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getOptions: function getOptions(section) {
      var options = _objectSpread({}, this.structure.options);

      var result = [];
      Object.keys(options).forEach(function (key) {
        var item = options[key];

        if (item.section === section) {
          item.id = key;
          result.push(item);
        }
      });
      return result;
    },
    doCancel: function doCancel() {
      var _this2 = this;

      var settings = this.oldSettings;
      Object.keys(settings).forEach(function (key) {
        _this2.oldSettings[key] = settings[key];
        _this2.settings[key] = settings[key];
      });
    },
    doLoad: function doLoad() {
      var _this3 = this;

      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var structure, settings;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _vue.nextTick)();

              case 2:
                structure = _this3.$win.vue_wp_plugin_config.settingStructure;
                _this3.structure['sections'] = structure['sections'];
                _this3.structure['options'] = structure['options'];
                settings = _this3.$win.vue_wp_plugin_config.settings || {};
                _this3.endpoints = _this3.$win.vue_wp_plugin_config.rest.endpoints; // copy settings from server output

                Object.keys(settings).forEach(function (key) {
                  _this3.oldSettings[key] = settings[key];
                  _this3.settings[key] = settings[key];
                }); // make sure data is loaded before ui render

                _this3.hasLoaded = true;

                _this3.$forceUpdate();

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  beforeMount: function beforeMount() {
    var _this4 = this;

    var that = this;

    if (that.$win.vue_wp_plugin_config) {
      that.doLoad();
      return;
    }

    document.onreadystatechange = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (document.readyState == "complete") {
                _this4.doLoad();
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  }
});

exports["default"] = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Dashboard.vue?vue&type=template&id=531b35ca":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Dashboard.vue?vue&type=template&id=531b35ca ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.render = render;

var _vue = __webpack_require__(/*! vue */ "vue");

var _hoisted_1 = {
  class: "app-dashboard"
};
var _hoisted_2 = {
  class: "w-full text-center"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_1, [(0, _vue.createElementVNode)("section", _hoisted_2, (0, _vue.toDisplayString)(_ctx.msg), 1
  /* TEXT */
  )]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Settings.vue?vue&type=template&id=3c95d6dd&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Settings.vue?vue&type=template&id=3c95d6dd&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.render = render;

__webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

var _vue = __webpack_require__(/*! vue */ "vue");

var _withScopeId = function _withScopeId(n) {
  return (0, _vue.pushScopeId)("data-v-3c95d6dd"), n = n(), (0, _vue.popScopeId)(), n;
};

var _hoisted_1 = {
  key: 0,
  class: "app-settings w-full flex flex-wrap mx-auto"
};
var _hoisted_2 = {
  class: "w-full md:w-1/5"
};
var _hoisted_3 = {
  class: "w-full sticky inset-0 max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20",
  style: {
    "top": "6em"
  }
};
var _hoisted_4 = {
  class: "space-x-3 flex justify-end pr-4 pt-2"
};

var _hoisted_5 = /*#__PURE__*/(0, _vue.createTextVNode)("Save");

var _hoisted_6 = /*#__PURE__*/(0, _vue.createTextVNode)("Cancel");

var _hoisted_7 = {
  class: "list-reset py-2 md:py-0 mt-4"
};
var _hoisted_8 = {
  class: "py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent"
};
var _hoisted_9 = {
  href: "javascript:void(0)",
  class: "block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600"
};
var _hoisted_10 = {
  class: "pb-1 md:pb-0 text-sm"
};
var _hoisted_11 = {
  class: "w-full md:w-4/5 min-h-screen"
};
var _hoisted_12 = {
  class: "pt-4"
};
var _hoisted_13 = {
  class: "font-sans font-bold break-normal text-gray-700 px-2 pb-1 text-xl w-full text-center"
};
var _hoisted_14 = {
  class: "p-8 mt-6 lg:mt-0 rounded shadow bg-white"
};
var _hoisted_15 = {
  class: "md:flex mb-6"
};
var _hoisted_16 = {
  class: "md:w-3/5"
};
var _hoisted_17 = {
  class: "block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4",
  for: "my-checkbox"
};
var _hoisted_18 = {
  class: "py-2 text-sm text-gray-600"
};
var _hoisted_19 = {
  class: "md:w-2/5"
};
var _hoisted_20 = {
  key: 0
};
var _hoisted_21 = {
  key: 1
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_t_button = (0, _vue.resolveComponent)("t-button");

  var _component_t_toggle = (0, _vue.resolveComponent)("t-toggle");

  var _component_t_rich_select = (0, _vue.resolveComponent)("t-rich-select");

  var _directive_scroll_spy_active = (0, _vue.resolveDirective)("scroll-spy-active");

  var _directive_scroll_spy_link = (0, _vue.resolveDirective)("scroll-spy-link");

  var _directive_scroll_spy = (0, _vue.resolveDirective)("scroll-spy");

  return _ctx.hasLoaded ? ((0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_1, [(0, _vue.createElementVNode)("aside", _hoisted_2, [(0, _vue.createElementVNode)("div", _hoisted_3, [(0, _vue.createElementVNode)("div", _hoisted_4, [(0, _vue.createVNode)(_component_t_button, {
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.doSave();
    }),
    style: {
      "width": "100px"
    },
    disabled: _ctx.hasChanged,
    "data-rerendered": _ctx.ui.actionKey
  }, {
    default: (0, _vue.withCtx)(function () {
      return [_hoisted_5];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["disabled", "data-rerendered"]), (0, _vue.createVNode)(_component_t_button, {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.doCancel();
    }),
    variant: "secondary",
    style: {
      "width": "100px"
    },
    disabled: _ctx.hasChanged,
    "data-rerendered": _ctx.ui.actionKey
  }, {
    default: (0, _vue.withCtx)(function () {
      return [_hoisted_6];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["disabled", "data-rerendered"])]), (0, _vue.withDirectives)(((0, _vue.openBlock)(), (0, _vue.createElementBlock)("ul", _hoisted_7, [((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(_ctx.structure.sections, function (value, name) {
    return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("li", _hoisted_8, [(0, _vue.createElementVNode)("a", _hoisted_9, [(0, _vue.createElementVNode)("span", _hoisted_10, (0, _vue.toDisplayString)(value), 1
    /* TEXT */
    )])]);
  }), 256
  /* UNKEYED_FRAGMENT */
  ))])), [[_directive_scroll_spy_active, {
    selector: 'li',
    class: 'active'
  }], [_directive_scroll_spy_link]])])]), (0, _vue.createCommentVNode)("Section container"), (0, _vue.createElementVNode)("section", _hoisted_11, [(0, _vue.withDirectives)(((0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", null, [((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(_ctx.structure.sections, function (value, name) {
    return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_12, [(0, _vue.createCommentVNode)("Title"), (0, _vue.createElementVNode)("h2", _hoisted_13, (0, _vue.toDisplayString)(value), 1
    /* TEXT */
    ), (0, _vue.createCommentVNode)("Card"), (0, _vue.createElementVNode)("div", _hoisted_14, [((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(_ctx.getOptions(name), function (item) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_15, [(0, _vue.createElementVNode)("div", _hoisted_16, [(0, _vue.createElementVNode)("label", _hoisted_17, (0, _vue.toDisplayString)(item.name), 1
      /* TEXT */
      ), (0, _vue.createElementVNode)("p", _hoisted_18, (0, _vue.toDisplayString)(item.description), 1
      /* TEXT */
      )]), (0, _vue.createElementVNode)("div", _hoisted_19, [item.type === 'toggle' ? ((0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_20, [(0, _vue.createVNode)(_component_t_toggle, {
        modelValue: _ctx.settings[item.id],
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return _ctx.settings[item.id] = $event;
        }
      }, null, 8
      /* PROPS */
      , ["modelValue", "onUpdate:modelValue"])])) : (0, _vue.createCommentVNode)("v-if", true), item.type === 'dropdownMultiselect' ? ((0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_21, [(0, _vue.createVNode)(_component_t_rich_select, {
        modelValue: _ctx.settings[item.id],
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return _ctx.settings[item.id] = $event;
        },
        placeholder: "select an option",
        options: item.options,
        multiple: "",
        tags: ""
      }, null, 8
      /* PROPS */
      , ["modelValue", "onUpdate:modelValue", "options"])])) : (0, _vue.createCommentVNode)("v-if", true)])]);
    }), 256
    /* UNKEYED_FRAGMENT */
    ))]), (0, _vue.createCommentVNode)("/Card")]);
  }), 256
  /* UNKEYED_FRAGMENT */
  ))])), [[_directive_scroll_spy]])])])) : (0, _vue.createCommentVNode)("v-if", true);
}

/***/ }),

/***/ "./src/admin/admin-menu-fix.js":
/*!*************************************!*\
  !*** ./src/admin/admin-menu-fix.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

// @ts-ignore
function menuFix(slug) {
  var currentUrl = window.location.href;
  var isLocal = currentUrl.indexOf('admin.html') > 0;
  var currentPath = currentUrl.substr(currentUrl.indexOf(isLocal ? '#/' : 'admin.php'));
  var menuRoot = document.querySelector(isLocal ? '.wp-menu-open' : "#toplevel_page_".concat(slug));

  if (menuRoot) {
    menuRoot.addEventListener('click', function (e) {
      var target = e.target;
      var items = this.querySelectorAll('li');

      for (var i = 0; i < items.length; i++) {
        var node = items[i];

        if (node !== e.target.parentElement) {
          node.classList.remove('current');
        } else {
          target.parentElement.classList.add('current');
        }
      }
    });
    var menu = menuRoot.querySelector(".wp-submenu a[href=\"".concat(currentPath, "\""));

    if (menu) {
      menu.parentElement.classList.add('current');
    }
  }
}

var _default = menuFix;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Settings.vue?vue&type=style&index=0&id=3c95d6dd&lang=css&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Settings.vue?vue&type=style&index=0&id=3c95d6dd&lang=css&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/admin.css":
/*!**************************!*\
  !*** ./assets/admin.css ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/frontend.css":
/*!*****************************!*\
  !*** ./assets/frontend.css ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/admin/App.vue":
/*!***************************!*\
  !*** ./src/admin/App.vue ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _App_vue_vue_type_template_id_3a030f38_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=3a030f38&ts=true */ "./src/admin/App.vue?vue&type=template&id=3a030f38&ts=true");
/* harmony import */ var _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts */ "./src/admin/App.vue?vue&type=script&lang=ts");
/* harmony import */ var _Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_App_vue_vue_type_template_id_3a030f38_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/admin/App.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/admin/views/Dashboard.vue":
/*!***************************************!*\
  !*** ./src/admin/views/Dashboard.vue ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _Dashboard_vue_vue_type_template_id_531b35ca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=531b35ca */ "./src/admin/views/Dashboard.vue?vue&type=template&id=531b35ca");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js */ "./src/admin/views/Dashboard.vue?vue&type=script&lang=js");
/* harmony import */ var _Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Dashboard_vue_vue_type_template_id_531b35ca__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/admin/views/Dashboard.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/admin/views/Settings.vue":
/*!**************************************!*\
  !*** ./src/admin/views/Settings.vue ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _Settings_vue_vue_type_template_id_3c95d6dd_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=3c95d6dd&scoped=true */ "./src/admin/views/Settings.vue?vue&type=template&id=3c95d6dd&scoped=true");
/* harmony import */ var _Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js */ "./src/admin/views/Settings.vue?vue&type=script&lang=js");
/* harmony import */ var _Settings_vue_vue_type_style_index_0_id_3c95d6dd_lang_css_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Settings.vue?vue&type=style&index=0&id=3c95d6dd&lang=css&scoped=true */ "./src/admin/views/Settings.vue?vue&type=style&index=0&id=3c95d6dd&lang=css&scoped=true");
/* harmony import */ var _Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Settings_vue_vue_type_template_id_3c95d6dd_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3c95d6dd"],['__file',"src/admin/views/Settings.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/admin/App.vue?vue&type=script&lang=ts":
/*!***************************************************!*\
  !*** ./src/admin/App.vue?vue&type=script&lang=ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__.__esModule; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../node_modules/ts-loader/index.js??clonedRuleSet-6!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/App.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./src/admin/App.vue?vue&type=template&id=3a030f38&ts=true":
/*!*****************************************************************!*\
  !*** ./src/admin/App.vue?vue&type=template&id=3a030f38&ts=true ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_3a030f38_ts_true__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_3a030f38_ts_true__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_3a030f38_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../node_modules/ts-loader/index.js??clonedRuleSet-6!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=template&id=3a030f38&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/App.vue?vue&type=template&id=3a030f38&ts=true");


/***/ }),

/***/ "./src/admin/views/Dashboard.vue?vue&type=script&lang=js":
/*!***************************************************************!*\
  !*** ./src/admin/views/Dashboard.vue?vue&type=script&lang=js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.__esModule; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dashboard.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Dashboard.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/admin/views/Settings.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/admin/views/Settings.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.__esModule; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Settings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Settings.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/admin/views/Dashboard.vue?vue&type=template&id=531b35ca":
/*!*********************************************************************!*\
  !*** ./src/admin/views/Dashboard.vue?vue&type=template&id=531b35ca ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_template_id_531b35ca__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_template_id_531b35ca__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dashboard_vue_vue_type_template_id_531b35ca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dashboard.vue?vue&type=template&id=531b35ca */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Dashboard.vue?vue&type=template&id=531b35ca");


/***/ }),

/***/ "./src/admin/views/Settings.vue?vue&type=template&id=3c95d6dd&scoped=true":
/*!********************************************************************************!*\
  !*** ./src/admin/views/Settings.vue?vue&type=template&id=3c95d6dd&scoped=true ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Settings_vue_vue_type_template_id_3c95d6dd_scoped_true__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Settings_vue_vue_type_template_id_3c95d6dd_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Settings_vue_vue_type_template_id_3c95d6dd_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Settings.vue?vue&type=template&id=3c95d6dd&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Settings.vue?vue&type=template&id=3c95d6dd&scoped=true");


/***/ }),

/***/ "./src/admin/views/Settings.vue?vue&type=style&index=0&id=3c95d6dd&lang=css&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./src/admin/views/Settings.vue?vue&type=style&index=0&id=3c95d6dd&lang=css&scoped=true ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Settings_vue_vue_type_style_index_0_id_3c95d6dd_lang_css_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Settings.vue?vue&type=style&index=0&id=3c95d6dd&lang=css&scoped=true */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/admin/views/Settings.vue?vue&type=style&index=0&id=3c95d6dd&lang=css&scoped=true");


/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/***/ (function(module) {

module.exports = Vue;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["css/frontend","css/admin","/js/vendor"], function() { return __webpack_exec__("./src/admin/admin.ts"), __webpack_exec__("./assets/admin.css"), __webpack_exec__("./assets/frontend.css"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);