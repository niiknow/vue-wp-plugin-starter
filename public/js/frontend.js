"use strict";
(self["webpackChunkPluginFileName"] = self["webpackChunkPluginFileName"] || []).push([["/js/frontend"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/App.vue?vue&type=script&lang=ts":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/App.vue?vue&type=script&lang=ts ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var vue_1 = __webpack_require__(/*! vue */ "vue");
// this demonstrate frontend app that utilize the router
exports["default"] = (0, vue_1.defineComponent)({
  name: 'AppOne'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/App.vue?vue&type=template&id=82d33a46&ts=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/App.vue?vue&type=template&id=82d33a46&ts=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.render = void 0;
var vue_1 = __webpack_require__(/*! vue */ "vue");
var _hoisted_1 = {
  class: "main-wrapper"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_view = (0, vue_1.resolveComponent)("router-view");
  return (0, vue_1.openBlock)(), (0, vue_1.createElementBlock)("div", _hoisted_1, [((0, vue_1.openBlock)(), (0, vue_1.createBlock)(_component_router_view, {
    key: _ctx.$route.path
  }))]);
}
exports.render = render;

/***/ }),

/***/ "./src/frontend/frontend.ts":
/*!**********************************!*\
  !*** ./src/frontend/frontend.ts ***!
  \**********************************/
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
var App_vue_1 = __importDefault(__webpack_require__(/*! ./App.vue */ "./src/frontend/App.vue"));
var router_1 = __importDefault(__webpack_require__(/*! ./router */ "./src/frontend/router/index.ts"));
var shared_1 = __importDefault(__webpack_require__(/*! ~src/shared */ "./src/shared/index.ts"));
var app = (0, vue_1.createApp)(App_vue_1.default);
app.use(router_1.default);
// delay mount so we can load configuration
setTimeout(function () {
  (0, shared_1.default)(app, 'vue_wp_plugin_config_frontend');
  app.mount('#vue-frontend-app');
}, 200);

/***/ }),

/***/ "./src/frontend/router/index.ts":
/*!**************************************!*\
  !*** ./src/frontend/router/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var vue_router_1 = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/index.js");
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



var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var i18n_1 = __importDefault(__webpack_require__(/*! ./i18n */ "./src/shared/i18n.ts"));
var sweetalert2_1 = __importDefault(__webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js"));
exports["default"] = function (app, configName) {
  (0, i18n_1.default)(app);
  var win = window;
  win.$appConfig = {};
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958 ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



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
var _hoisted_3 = /*#__PURE__*/(0, _vue.createElementVNode)("br", null, null, -1 /* HOISTED */);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_1, [(0, _vue.createElementVNode)("section", _hoisted_2, [(0, _vue.createTextVNode)((0, _vue.toDisplayString)(_ctx.msg) + " ", 1 /* TEXT */), _hoisted_3, (0, _vue.createTextVNode)(" Plugin Url: " + (0, _vue.toDisplayString)(_ctx.getPluginUrl()), 1 /* TEXT */)])]);
}

/***/ }),

/***/ "./src/frontend/App.vue":
/*!******************************!*\
  !*** ./src/frontend/App.vue ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __esModule: function() { return /* reexport safe */ _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _App_vue_vue_type_template_id_82d33a46_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=82d33a46&ts=true */ "./src/frontend/App.vue?vue&type=template&id=82d33a46&ts=true");
/* harmony import */ var _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts */ "./src/frontend/App.vue?vue&type=script&lang=ts");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_App_vue_vue_type_template_id_82d33a46_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/frontend/App.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/frontend/views/Home.vue":
/*!*************************************!*\
  !*** ./src/frontend/views/Home.vue ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __esModule: function() { return /* reexport safe */ _Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=e2eaa958 */ "./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958");
/* harmony import */ var _Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js */ "./src/frontend/views/Home.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/frontend/views/Home.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/frontend/App.vue?vue&type=script&lang=ts":
/*!******************************************************!*\
  !*** ./src/frontend/App.vue?vue&type=script&lang=ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __esModule: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../node_modules/ts-loader/index.js??clonedRuleSet-6!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/App.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./src/frontend/App.vue?vue&type=template&id=82d33a46&ts=true":
/*!********************************************************************!*\
  !*** ./src/frontend/App.vue?vue&type=template&id=82d33a46&ts=true ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __esModule: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_82d33a46_ts_true__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_82d33a46_ts_true__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_82d33a46_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../node_modules/ts-loader/index.js??clonedRuleSet-6!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=template&id=82d33a46&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-6!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/App.vue?vue&type=template&id=82d33a46&ts=true");


/***/ }),

/***/ "./src/frontend/views/Home.vue?vue&type=script&lang=js":
/*!*************************************************************!*\
  !*** ./src/frontend/views/Home.vue?vue&type=script&lang=js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __esModule: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Home.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958":
/*!*******************************************************************!*\
  !*** ./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958 ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __esModule: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Home.vue?vue&type=template&id=e2eaa958 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/frontend/views/Home.vue?vue&type=template&id=e2eaa958");


/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/***/ (function(module) {

module.exports = Vue;

/***/ }),

/***/ "./languages/translations.json":
/*!*************************************!*\
  !*** ./languages/translations.json ***!
  \*************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"en":{},"zh-CN":{},"vi":{}}');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["/js/vendor"], function() { return __webpack_exec__("./src/frontend/frontend.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);