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

var vue_1 = __webpack_require__(/*! vue */ "vue"); // this demonstrate frontend app that utilize the router


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

var shared_1 = __importDefault(__webpack_require__(/*! ../shared */ "./src/shared/index.ts"));

var app = (0, vue_1.createApp)(App_vue_1.default);
(0, shared_1.default)(app);
app.use(router_1.default);
app.mount('#vue-frontend-app');

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

var vue_router_1 = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm-bundler.js");

var Home_vue_1 = __importDefault(__webpack_require__(/*! @src/frontend/views/Home.vue */ "./src/frontend/views/Home.vue"));

var routes = [{
  path: "/",
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

var vue_i18n_1 = __webpack_require__(/*! vue-i18n */ "./node_modules/vue-i18n/dist/vue-i18n.esm-bundler.js"); // import i18n resources


var en_json_1 = __importDefault(__webpack_require__(/*! @src/../languages/en.json */ "./languages/en.json"));

var zh_CN_json_1 = __importDefault(__webpack_require__(/*! @src/../languages/zh-CN.json */ "./languages/zh-CN.json"));

var vi_json_1 = __importDefault(__webpack_require__(/*! @src/../languages/vi.json */ "./languages/vi.json"));

exports["default"] = function (app) {
  var i18n = (0, vue_i18n_1.createI18n)({
    locale: 'en',
    messages: {
      en: en_json_1.default,
      'zh-CN': zh_CN_json_1.default,
      vi: vi_json_1.default
    }
  });
  app.use(i18n);
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

var axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var debounce_1 = __importDefault(__webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js"));

var i18n_1 = __importDefault(__webpack_require__(/*! ./i18n */ "./src/shared/i18n.ts"));

var vue_axios_1 = __importDefault(__webpack_require__(/*! vue-axios */ "./node_modules/vue-axios/dist/vue-axios.esm.min.js"));

var sweetalert2_1 = __importDefault(__webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js"));

exports["default"] = function (app) {
  (0, i18n_1.default)(app);
  var win = window;
  win.$appConfig = {};
  win.$appConfig.axios = axios_1.default;
  win.$appConfig.debounce = debounce_1.default; // allow for using this.$win/axios inside of a component

  app.config.globalProperties.$win = win;
  app.config.globalProperties.axios = win.$appConfig.axios;
  app.config.globalProperties.$swal = sweetalert2_1.default;
  app.use(vue_axios_1.default, win.$appConfig.axios);
};

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

var _default = (0, _vue.defineComponent)({
  name: 'Home',
  data: function data() {
    return {
      msg: 'Welcome to Your Vue.js Frontend App'
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

/***/ "./src/frontend/App.vue":
/*!******************************!*\
  !*** ./src/frontend/App.vue ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__esModule": function() { return /* reexport safe */ _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__.__esModule; }
/* harmony export */ });
/* harmony import */ var _App_vue_vue_type_template_id_82d33a46_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=82d33a46&ts=true */ "./src/frontend/App.vue?vue&type=template&id=82d33a46&ts=true");
/* harmony import */ var _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts */ "./src/frontend/App.vue?vue&type=script&lang=ts");
/* harmony import */ var _Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Volumes_Extra_work_niiknow_vue_wp_plugin_starter_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_App_vue_vue_type_template_id_82d33a46_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/frontend/App.vue"]])
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

/***/ "./src/frontend/App.vue?vue&type=script&lang=ts":
/*!******************************************************!*\
  !*** ./src/frontend/App.vue?vue&type=script&lang=ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__.__esModule; }
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
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_82d33a46_ts_true__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_6_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_82d33a46_ts_true__WEBPACK_IMPORTED_MODULE_0__.render; }
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
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.__esModule; }
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
/* harmony export */   "__esModule": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__.__esModule; },
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Home_vue_vue_type_template_id_e2eaa958__WEBPACK_IMPORTED_MODULE_0__.render; }
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

/***/ "./languages/en.json":
/*!***************************!*\
  !*** ./languages/en.json ***!
  \***************************/
/***/ (function(module) {

module.exports = JSON.parse('{"button":{"about":"About","back":"Back","go":"GO","home":"Home","toggle_dark":"Toggle dark mode","toggle_langs":"Change languages"},"intro":{"desc":"Vue Wordpress Plugin Starter Template","dynamic-route":"Demo of dynamic route","hi":"Hi, {name}!","whats-your-name":"What\'s your name?"},"not-found":"Not found"}');

/***/ }),

/***/ "./languages/vi.json":
/*!***************************!*\
  !*** ./languages/vi.json ***!
  \***************************/
/***/ (function(module) {

module.exports = JSON.parse('{"button":{"back":"Quay lại","go":"Đi"},"intro":{"desc":"Ý kiến cá nhân Vue Wordpress Template để bắt đầu","dynamic-route":"Bản giới thiệu về dynamic route","hi":"Hi, {name}!","whats-your-name":"Tên bạn là gì?"},"not-found":"Không tìm thấy"}');

/***/ }),

/***/ "./languages/zh-CN.json":
/*!******************************!*\
  !*** ./languages/zh-CN.json ***!
  \******************************/
/***/ (function(module) {

module.exports = JSON.parse('{"button":{"back":"返回","go":"确定"},"intro":{"desc":"固执己见的 Vue Wordpress Vite 项目模板","dynamic-route":"动态路由演示","hi":"你好，{name}！","whats-your-name":"输入你的名字"},"not-found":"未找到页面"}');

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["/js/vendor"], function() { return __webpack_exec__("./src/frontend/frontend.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);