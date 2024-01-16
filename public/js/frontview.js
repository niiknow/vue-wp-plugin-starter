(self["webpackChunkPluginFileName"] = self["webpackChunkPluginFileName"] || []).push([["/js/frontview"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/App.vue?vue&type=script&lang=ts":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/App.vue?vue&type=script&lang=ts ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var vue_1 = __webpack_require__(/*! vue */ "vue"); // this demonstrate dynamic frontend app using a single view


exports["default"] = (0, vue_1.defineComponent)({
  name: 'FrontView',
  setup: function setup() {
    var hasLoaded = (0, vue_1.ref)(false);
    var componentName = (0, vue_1.ref)('');
    var comp = (0, vue_1.computed)(function () {
      // compare two objects
      return (0, vue_1.defineAsyncComponent)(function () {
        return Promise.resolve().then(function () {
          return __importStar(__webpack_require__("./src/frontview/views sync recursive ^\\.\\/.*\\.vue$")("./".concat(componentName.value, ".vue")));
        });
      });
    });
    return {
      comp: comp,
      componentName: componentName,
      hasLoaded: hasLoaded
    };
  },
  mounted: function mounted() {
    var that = this; // @ts-ignore

    if (that.$win.vue_wp_plugin_config_frontview) {
      that.doLoad();
      return;
    }

    document.onreadystatechange = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (document.readyState == 'complete') {
                that.doLoad();
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  },
  methods: {
    doLoad: function doLoad() {
      var _this = this;

      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var that, viewComponent;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this;
                _context2.next = 3;
                return (0, vue_1.nextTick)();

              case 3:
                // @ts-ignore
                viewComponent = that.$win.vue_wp_plugin_config_frontview.viewComponent;

                if (!viewComponent) {
                  viewComponent = that.$route.query.comp;
                }

                if (!viewComponent) {
                  viewComponent = 'Home';
                }

                that.componentName = viewComponent; // make sure data is loaded before ui render

                that.hasLoaded = true;
                that.$forceUpdate();

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/App.vue?vue&type=template&id=557a71b7&ts=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/App.vue?vue&type=template&id=557a71b7&ts=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.render = void 0;

var vue_1 = __webpack_require__(/*! vue */ "vue");

var _hoisted_1 = {
  key: 0,
  class: "main-wrapper"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.hasLoaded ? ((0, vue_1.openBlock)(), (0, vue_1.createElementBlock)("div", _hoisted_1, [((0, vue_1.openBlock)(), (0, vue_1.createBlock)((0, vue_1.resolveDynamicComponent)(_ctx.comp)))])) : (0, vue_1.createCommentVNode)("v-if", true);
}

exports.render = render;

/***/ }),

/***/ "./src/frontview/frontview.ts":
/*!************************************!*\
  !*** ./src/frontview/frontview.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var vue_1 = __webpack_require__(/*! vue */ "vue");

var App_vue_1 = __importDefault(__webpack_require__(/*! ./App.vue */ "./src/frontview/App.vue"));

var router_1 = __importDefault(__webpack_require__(/*! ./router */ "./src/frontview/router/index.ts"));

var shared_1 = __importDefault(__webpack_require__(/*! ../shared */ "./src/shared/index.ts"));

var app = (0, vue_1.createApp)(App_vue_1.default);
app.use(router_1.default); // delay mount so we can load configuration

setTimeout(function () {
  (0, shared_1.default)(app, 'vue_wp_plugin_config_frontview');
  app.mount('#vue-frontend-app');
}, 200);

/***/ }),

/***/ "./src/frontview/router/index.ts":
/*!***************************************!*\
  !*** ./src/frontview/router/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var vue_router_1 = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm-bundler.js");

var Home_vue_1 = __importDefault(__webpack_require__(/*! ~src/frontend/views/Home.vue */ "./src/frontend/views/Home.vue"));

var routes = [{
  path: '/',
  component: Home_vue_1.default
}];
var router = (0, vue_router_1.createRouter)({
  history: (0, vue_router_1.createWebHashHistory)(),
  routes: routes
});
exports["default"] = router;

/***/ }),

/***/ "./src/shared/i18n.ts":
/*!****************************!*\
  !*** ./src/shared/i18n.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var vue3_gettext_1 = __webpack_require__(/*! vue3-gettext */ "./node_modules/vue3-gettext/dist/cjs/index.js");

var translations_json_1 = __importDefault(__webpack_require__(/*! ~src/../languages/translations.json */ "./languages/translations.json"));
/*
Examples:

import gettext from "./gettext"

const { $gettext } = gettext

const myTest = $gettext("My translation message")

// use in *.vue template: {{ $gettext("Message to translate") }}
*/


exports["default"] = function (app) {
  var gettext = (0, vue3_gettext_1.createGettext)({
    availableLanguages: {
      en: 'English',
      vi: 'Vietnamese',
      'zh-CN': '中文'
    },
    defaultLanguage: 'en',
    translations: translations_json_1.default
  });
  app.use(gettext);
};

/***/ }),

/***/ "./src/shared/index.ts":
/*!*****************************!*\
  !*** ./src/shared/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var debounce_1 = __importDefault(__webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js"));

var i18n_1 = __importDefault(__webpack_require__(/*! ./i18n */ "./src/shared/i18n.ts"));

var sweetalert2_1 = __importDefault(__webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js"));

exports["default"] = function (app, configName) {
  (0, i18n_1.default)(app);
  var win = window;
  win.$appConfig = {};
  win.$appConfig.debounce = debounce_1.default;
  app.config.globalProperties.$win = win;
  app.config.globalProperties.$swal = sweetalert2_1.default;
  app.provide('win', win);
  app.provide('pluginConfig', win[configName]);
};

/***/ }),

/***/ "./src/shared/pluginHelpers.ts":
/*!*************************************!*\
  !*** ./src/shared/pluginHelpers.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getPluginUrl = void 0;

var vue_1 = __webpack_require__(/*! vue */ "vue");

function getPluginUrl() {
  // @ts-ignore
  var pluginConfig = (0, vue_1.inject)('pluginConfig', {});
  return pluginConfig.pluginUrl || '';
}

exports.getPluginUrl = getPluginUrl;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _vue = __webpack_require__(/*! vue */ "vue");

var _pluginHelpers = __webpack_require__(/*! ~src/shared/pluginHelpers */ "./src/shared/pluginHelpers.ts");

var _default = (0, _vue.defineComponent)({
  name: 'Home',
  data: function data() {
    return {
      msg: 'Welcome to Your Vue.js Frontend App'
    };
  },
  methods: {
    getPluginUrl: _pluginHelpers.getPluginUrl
  }
});

exports["default"] = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Comp2.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Comp2.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _vue = __webpack_require__(/*! vue */ "vue");

var _default = (0, _vue.defineComponent)({
  name: 'Home',
  data: function data() {
    return {
      msg: 'Welcome to Your Vue.js Frontview component 2'
    };
  }
});

exports["default"] = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Home.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Home.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _vue = __webpack_require__(/*! vue */ "vue");

var _default = (0, _vue.defineComponent)({
  name: 'Home',
  data: function data() {
    return {
      msg: 'Welcome to Your Vue.js Frontview default view'
    };
  }
});

exports["default"] = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958 ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.render = render;

var _vue = __webpack_require__(/*! vue */ "vue");

var _hoisted_1 = {
  class: "app-home"
};
var _hoisted_2 = {
  class: "w-full text-center"
};

var _hoisted_3 = /*#__PURE__*/(0, _vue.createElementVNode)("br", null, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_1, [(0, _vue.createElementVNode)("section", _hoisted_2, [(0, _vue.createTextVNode)((0, _vue.toDisplayString)(_ctx.msg) + " ", 1
  /* TEXT */
  ), _hoisted_3, (0, _vue.createTextVNode)(" Plugin Url: " + (0, _vue.toDisplayString)(_ctx.getPluginUrl()), 1
  /* TEXT */
  )])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Comp2.vue?vue&type=template&id=38e3bd90":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Comp2.vue?vue&type=template&id=38e3bd90 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.render = render;

var _vue = __webpack_require__(/*! vue */ "vue");

var _hoisted_1 = {
  class: "app-home"
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Home.vue?vue&type=template&id=1549d98c":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Home.vue?vue&type=template&id=1549d98c ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.render = render;

var _vue = __webpack_require__(/*! vue */ "vue");

var _hoisted_1 = {
  class: "app-home"
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

/***/ "./src/frontend/views/Home.vue":
/*!*************************************!*\
  !*** ./src/frontend/views/Home.vue ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=e2eaa958 */ "./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958");
/* harmony import */ var _Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js */ "./src/frontend/views/Home.vue?vue&type=script&lang=js");
/* harmony import */ var _Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/frontend/views/Home.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/frontview/App.vue":
/*!*******************************!*\
  !*** ./src/frontview/App.vue ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _App_vue_vue_type_template_id_557a71b7_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=557a71b7&ts=true */ "./src/frontview/App.vue?vue&type=template&id=557a71b7&ts=true");
/* harmony import */ var _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts */ "./src/frontview/App.vue?vue&type=script&lang=ts");
/* harmony import */ var _Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_App_vue_vue_type_template_id_557a71b7_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/frontview/App.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/frontview/views/Comp2.vue":
/*!***************************************!*\
  !*** ./src/frontview/views/Comp2.vue ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _Comp2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _Comp2_vue_vue_type_template_id_38e3bd90__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comp2.vue?vue&type=template&id=38e3bd90 */ "./src/frontview/views/Comp2.vue?vue&type=template&id=38e3bd90");
/* harmony import */ var _Comp2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comp2.vue?vue&type=script&lang=js */ "./src/frontview/views/Comp2.vue?vue&type=script&lang=js");
/* harmony import */ var _Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Comp2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Comp2_vue_vue_type_template_id_38e3bd90__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/frontview/views/Comp2.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/frontview/views/Home.vue":
/*!**************************************!*\
  !*** ./src/frontview/views/Home.vue ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _Home_vue_vue_type_template_id_1549d98c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=1549d98c */ "./src/frontview/views/Home.vue?vue&type=template&id=1549d98c");
/* harmony import */ var _Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js */ "./src/frontview/views/Home.vue?vue&type=script&lang=js");
/* harmony import */ var _Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Home_vue_vue_type_template_id_1549d98c__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/frontview/views/Home.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/frontview/App.vue?vue&type=script&lang=ts":
/*!*******************************************************!*\
  !*** ./src/frontview/App.vue?vue&type=script&lang=ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../node_modules/ts-loader/index.js??clonedRuleSet-6!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/App.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./src/frontview/App.vue?vue&type=template&id=557a71b7&ts=true":
/*!*********************************************************************!*\
  !*** ./src/frontview/App.vue?vue&type=template&id=557a71b7&ts=true ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_557a71b7_ts_true__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_557a71b7_ts_true__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_557a71b7_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../node_modules/ts-loader/index.js??clonedRuleSet-6!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=template&id=557a71b7&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/App.vue?vue&type=template&id=557a71b7&ts=true");


/***/ }),

/***/ "./src/frontend/views/Home.vue?vue&type=script&lang=js":
/*!*************************************************************!*\
  !*** ./src/frontend/views/Home.vue?vue&type=script&lang=js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Home.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/frontview/views/Comp2.vue?vue&type=script&lang=js":
/*!***************************************************************!*\
  !*** ./src/frontview/views/Comp2.vue?vue&type=script&lang=js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comp2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comp2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comp2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Comp2.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Comp2.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/frontview/views/Home.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/frontview/views/Home.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Home.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Home.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958":
/*!*******************************************************************!*\
  !*** ./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958 ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Home.vue?vue&type=template&id=e2eaa958 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958");


/***/ }),

/***/ "./src/frontview/views/Comp2.vue?vue&type=template&id=38e3bd90":
/*!*********************************************************************!*\
  !*** ./src/frontview/views/Comp2.vue?vue&type=template&id=38e3bd90 ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comp2_vue_vue_type_template_id_38e3bd90__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comp2_vue_vue_type_template_id_38e3bd90__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comp2_vue_vue_type_template_id_38e3bd90__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Comp2.vue?vue&type=template&id=38e3bd90 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Comp2.vue?vue&type=template&id=38e3bd90");


/***/ }),

/***/ "./src/frontview/views/Home.vue?vue&type=template&id=1549d98c":
/*!********************************************************************!*\
  !*** ./src/frontview/views/Home.vue?vue&type=template&id=1549d98c ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_1549d98c__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_1549d98c__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_1549d98c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Home.vue?vue&type=template&id=1549d98c */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontview/views/Home.vue?vue&type=template&id=1549d98c");


/***/ }),

/***/ "./src/frontview/views sync recursive ^\\.\\/.*\\.vue$":
/*!*************************************************!*\
  !*** ./src/frontview/views/ sync ^\.\/.*\.vue$ ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./Comp2.vue": "./src/frontview/views/Comp2.vue",
	"./Home.vue": "./src/frontview/views/Home.vue"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/frontview/views sync recursive ^\\.\\/.*\\.vue$";

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/***/ (function(module) {

"use strict";
module.exports = Vue;

/***/ }),

/***/ "./languages/translations.json":
/*!*************************************!*\
  !*** ./languages/translations.json ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"en":{},"zh-CN":{},"vi":{}}');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["/js/vendor"], function() { return __webpack_exec__("./src/frontview/frontview.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);