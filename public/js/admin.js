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
  class: "fixed w-full bg-white shadow-lg"
};
var _hoisted_2 = {
  class: "max-w-6xl mx-auto px-4"
};
var _hoisted_3 = {
  class: "flex justify-between"
};
var _hoisted_4 = {
  class: "flex space-x-7"
};

var _hoisted_5 = /*#__PURE__*/(0, vue_1.createElementVNode)("div", null, [/*#__PURE__*/(0, vue_1.createElementVNode)("a", {
  href: "../",
  class: "flex items-center py-4 px-2"
}, [/*#__PURE__*/(0, vue_1.createElementVNode)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, [/*#__PURE__*/(0, vue_1.createElementVNode)("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
})]), /*#__PURE__*/(0, vue_1.createElementVNode)("span", {
  class: "font-semibold text-gray-500 text-lg"
}, "Home")])], -1
/* HOISTED */
);

var _hoisted_6 = {
  class: "hidden md:flex items-center space-x-1"
};

var _hoisted_7 = /*#__PURE__*/(0, vue_1.createTextVNode)("Dashboard");

var _hoisted_8 = /*#__PURE__*/(0, vue_1.createTextVNode)("Settings");

var _hoisted_9 = /*#__PURE__*/(0, vue_1.createElementVNode)("div", {
  class: "hidden md:flex items-center space-x-3"
}, [/*#__PURE__*/(0, vue_1.createElementVNode)("iframe", {
  src: "https://ghbtns.com/github-btn.html?user=niiknow&repo=vue-wp-plugin-starter&type=star&count=true&size=large",
  frameborder: "0",
  scrolling: "0",
  width: "160px",
  height: "30px"
})], -1
/* HOISTED */
);

var _hoisted_10 = {
  class: "main-wrapper"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0, vue_1.resolveComponent)("router-link");

  var _component_router_view = (0, vue_1.resolveComponent)("router-view");

  return (0, vue_1.openBlock)(), (0, vue_1.createElementBlock)(vue_1.Fragment, null, [(0, vue_1.createElementVNode)("nav", _hoisted_1, [(0, vue_1.createElementVNode)("div", _hoisted_2, [(0, vue_1.createElementVNode)("div", _hoisted_3, [(0, vue_1.createElementVNode)("div", _hoisted_4, [(0, vue_1.createCommentVNode)(" Website Logo "), _hoisted_5, (0, vue_1.createCommentVNode)(" Primary Navbar items "), (0, vue_1.createElementVNode)("div", _hoisted_6, [(0, vue_1.createVNode)(_component_router_link, {
    to: "/",
    class: "py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
  }, {
    default: (0, vue_1.withCtx)(function () {
      return [_hoisted_7];
    }),
    _: 1
    /* STABLE */

  }), (0, vue_1.createVNode)(_component_router_link, {
    to: "/settings",
    class: "py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
  }, {
    default: (0, vue_1.withCtx)(function () {
      return [_hoisted_8];
    }),
    _: 1
    /* STABLE */

  })])]), (0, vue_1.createCommentVNode)(" Secondary Navbar items "), _hoisted_9])])]), (0, vue_1.createElementVNode)("div", _hoisted_10, [((0, vue_1.openBlock)(), (0, vue_1.createBlock)(_component_router_view, {
    key: _ctx.$route.path
  }))])], 64
  /* STABLE_FRAGMENT */
  );
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

var vue3_scroll_spy_1 = __webpack_require__(/*! vue3-scroll-spy */ "./node_modules/vue3-scroll-spy/dist/index.js"); // @ts-ignore


var win = (0, config_1.default)(window);
var app = (0, vue_1.createApp)(App_vue_1.default); // Using default options

(0, vue3_scroll_spy_1.registerScrollSpy)(app); // allow for using this.$win inside of a component

app.config.globalProperties.$win = win;
app.use(index_1.default).use(vue_axios_1.default, win.$appConfig.axios);
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



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _vue = __webpack_require__(/*! vue */ "vue");

var _default = (0, _vue.defineComponent)({
  name: 'Settings',
  data: function data() {
    return {};
  },
  methods: {}
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

var _vue = __webpack_require__(/*! vue */ "vue");

var _withScopeId = function _withScopeId(n) {
  return (0, _vue.pushScopeId)("data-v-3c95d6dd"), n = n(), (0, _vue.popScopeId)(), n;
};

var _hoisted_1 = {
  class: "app-settings"
};
var _hoisted_2 = {
  class: "w-full flex flex-wrap mx-auto"
};
var _hoisted_3 = {
  class: "w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal"
};

var _hoisted_4 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0, _vue.createElementVNode)("p", {
    class: "text-base font-bold py-2 lg:pb-6 text-gray-700"
  }, "Menu", -1
  /* HOISTED */
  );
});

var _hoisted_5 = {
  class: "w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20",
  style: {
    "top": "6em"
  },
  id: "menu-content"
};
var _hoisted_6 = {
  class: "list-reset py-2 md:py-0"
};

var _hoisted_7 = /*#__PURE__*/(0, _vue.createStaticVNode)("<li class=\"menu-item py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent\" data-v-3c95d6dd><a href=\"javascript:void(0)\" class=\"block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600\" data-v-3c95d6dd><span class=\"pb-1 md:pb-0 text-sm\" data-v-3c95d6dd>Section 1</span></a></li><li class=\"menu-item py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent\" data-v-3c95d6dd><a href=\"javascript:void(0)\" class=\"block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600\" data-v-3c95d6dd><span class=\"pb-1 md:pb-0 text-sm\" data-v-3c95d6dd>Section 2</span></a></li><li class=\"menu-item py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent\" data-v-3c95d6dd><a href=\"javascript:void(0)\" class=\"block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600\" data-v-3c95d6dd><span class=\"pb-1 md:pb-0 text-sm\" data-v-3c95d6dd>Section 3</span></a></li><li class=\"menu-item py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent\" data-v-3c95d6dd><a href=\"javascript:void(0)\" class=\"block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600\" data-v-3c95d6dd><span class=\"pb-1 md:pb-0 text-sm\" data-v-3c95d6dd>Section 4</span></a></li><li class=\"py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent\" data-v-3c95d6dd><a href=\"javascript:void(0)\" class=\"block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600\" data-v-3c95d6dd><span class=\"pb-1 md:pb-0 text-sm\" data-v-3c95d6dd>Section 5</span></a></li>", 5);

var _hoisted_12 = [_hoisted_7];
var _hoisted_13 = {
  class: "w-full lg:w-4/5"
};

var _hoisted_14 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0, _vue.createElementVNode)("h1", {
    class: "flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl"
  }, " Multi Section Form with Scrollspy ", -1
  /* HOISTED */
  );
});

var _hoisted_15 = /*#__PURE__*/(0, _vue.createStaticVNode)("<div data-v-3c95d6dd><!--divider--><hr class=\"bg-gray-300 my-12\" data-v-3c95d6dd><!--Title--><h2 id=\"section1\" class=\"font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl\" data-v-3c95d6dd>Section 1</h2><!--Card--><div class=\"p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-white\" data-v-3c95d6dd><li data-v-3c95d6dd>Using assets build of admin.css</li><li data-v-3c95d6dd>This template uses vue3-scroll-spy</li></div><!--/Card--></div><div data-v-3c95d6dd><!--divider--><hr class=\"bg-gray-300 my-12\" data-v-3c95d6dd><!--Title--><h2 class=\"font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl\" data-v-3c95d6dd>Section 2</h2><!--Card--><div id=\"section2\" class=\"p-8 mt-6 lg:mt-0 rounded shadow bg-white\" data-v-3c95d6dd><form data-v-3c95d6dd><div class=\"md:flex mb-6\" data-v-3c95d6dd><div class=\"md:w-1/3\" data-v-3c95d6dd><label class=\"block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4\" for=\"my-textfield\" data-v-3c95d6dd> Text Field </label></div><div class=\"md:w-2/3\" data-v-3c95d6dd><input class=\"form-input block w-full focus:bg-white\" id=\"my-textfield\" type=\"text\" value=\"\" data-v-3c95d6dd><p class=\"py-2 text-sm text-gray-600\" data-v-3c95d6dd>add notes about populating the field</p></div></div><div class=\"md:flex mb-6\" data-v-3c95d6dd><div class=\"md:w-1/3\" data-v-3c95d6dd><label class=\"block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4\" for=\"my-select\" data-v-3c95d6dd> Drop down field </label></div><div class=\"md:w-2/3\" data-v-3c95d6dd><select name=\"\" class=\"form-select block w-full focus:bg-white\" id=\"my-select\" data-v-3c95d6dd><option value=\"Default\" data-v-3c95d6dd>Default</option><option value=\"A\" data-v-3c95d6dd>A</option><option value=\"B\" data-v-3c95d6dd>B</option><option value=\"C\" data-v-3c95d6dd>C</option></select><p class=\"py-2 text-sm text-gray-600\" data-v-3c95d6dd>add notes about populating the field</p></div></div><div class=\"md:flex mb-6\" data-v-3c95d6dd><div class=\"md:w-1/3\" data-v-3c95d6dd><label class=\"block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4\" for=\"my-textarea\" data-v-3c95d6dd> Text Area </label></div><div class=\"md:w-2/3\" data-v-3c95d6dd><textarea class=\"form-textarea block w-full focus:bg-white\" id=\"my-textarea\" value=\"\" rows=\"8\" data-v-3c95d6dd></textarea><p class=\"py-2 text-sm text-gray-600\" data-v-3c95d6dd>add notes about populating the field</p></div></div><div class=\"md:flex md:items-center\" data-v-3c95d6dd><div class=\"md:w-1/3\" data-v-3c95d6dd></div><div class=\"md:w-2/3\" data-v-3c95d6dd><button class=\"shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded\" type=\"button\" data-v-3c95d6dd> Save </button></div></div></form></div><!--/Card--></div><div data-v-3c95d6dd><!--divider--><hr class=\"bg-gray-300 my-12\" data-v-3c95d6dd><!--Title--><h2 class=\"font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl\" data-v-3c95d6dd>Section 3</h2><!--Card--><div id=\"section3\" class=\"p-8 mt-6 lg:mt-0 rounded shadow bg-white\" data-v-3c95d6dd><form data-v-3c95d6dd><div class=\"md:flex mb-6\" data-v-3c95d6dd><div class=\"md:w-1/3\" data-v-3c95d6dd><label class=\"block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4\" for=\"my-multiselect\" data-v-3c95d6dd> Multi Select </label></div><div class=\"md:w-2/3\" data-v-3c95d6dd><select class=\"form-multiselect block w-full\" multiple id=\"my-multiselect\" data-v-3c95d6dd><option data-v-3c95d6dd>Option 1</option><option data-v-3c95d6dd>Option 2</option><option data-v-3c95d6dd>Option 3</option><option data-v-3c95d6dd>Option 4</option><option data-v-3c95d6dd>Option 5</option></select><p class=\"py-2 text-sm text-gray-600\" data-v-3c95d6dd>add notes about populating the field</p></div></div><div class=\"md:flex md:items-center\" data-v-3c95d6dd><div class=\"md:w-1/3\" data-v-3c95d6dd></div><div class=\"md:w-2/3\" data-v-3c95d6dd><button class=\"shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded\" type=\"button\" data-v-3c95d6dd> Save </button></div></div></form></div><!--/Card--></div><div data-v-3c95d6dd><!--divider--><hr class=\"bg-gray-300 my-12\" data-v-3c95d6dd><!--Title--><h2 class=\"font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl\" data-v-3c95d6dd>Section 4</h2><!--Card--><div id=\"section4\" class=\"p-8 mt-6 lg:mt-0 rounded shadow bg-white\" data-v-3c95d6dd><form data-v-3c95d6dd><div class=\"md:flex mb-6\" data-v-3c95d6dd><div class=\"md:w-1/3\" data-v-3c95d6dd><label class=\"block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4\" for=\"my-radio\" data-v-3c95d6dd> Radio Buttons </label></div><div class=\"md:w-2/3\" data-v-3c95d6dd><div class=\"mt-2\" data-v-3c95d6dd><label class=\"inline-flex items-center\" data-v-3c95d6dd><input type=\"radio\" class=\"form-radio text-indigo-600\" name=\"radioOption\" value=\"A\" data-v-3c95d6dd><span class=\"ml-2\" data-v-3c95d6dd>Radio A</span></label><label class=\"inline-flex items-center ml-6\" data-v-3c95d6dd><input type=\"radio\" class=\"form-radio\" name=\"radioOption\" value=\"B\" data-v-3c95d6dd><span class=\"ml-2\" data-v-3c95d6dd>Radio B</span></label></div><p class=\"py-2 text-sm text-gray-600\" data-v-3c95d6dd>add notes about populating the field</p></div></div><div class=\"md:flex mb-6\" data-v-3c95d6dd><div class=\"md:w-1/3\" data-v-3c95d6dd><label class=\"block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4\" for=\"my-checkbox\" data-v-3c95d6dd> Checkboxes </label></div><div class=\"md:w-2/3\" data-v-3c95d6dd><div data-v-3c95d6dd><label class=\"inline-flex items-center\" data-v-3c95d6dd><input type=\"checkbox\" class=\"form-checkbox text-indigo-600\" checked data-v-3c95d6dd><span class=\"ml-2\" data-v-3c95d6dd>Option 1</span></label></div><div data-v-3c95d6dd><label class=\"inline-flex items-center\" data-v-3c95d6dd><input type=\"checkbox\" class=\"form-checkbox text-green-500\" checked data-v-3c95d6dd><span class=\"ml-2\" data-v-3c95d6dd>Option 2</span></label></div><div data-v-3c95d6dd><label class=\"inline-flex items-center\" data-v-3c95d6dd><input type=\"checkbox\" class=\"form-checkbox text-pink-600\" checked data-v-3c95d6dd><span class=\"ml-2\" data-v-3c95d6dd>Option 3</span></label></div><p class=\"py-2 text-sm text-gray-600\" data-v-3c95d6dd>add notes about populating the field</p></div></div><div class=\"md:flex md:items-center\" data-v-3c95d6dd><div class=\"md:w-1/3\" data-v-3c95d6dd></div><div class=\"md:w-2/3\" data-v-3c95d6dd><button class=\"shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded\" type=\"button\" data-v-3c95d6dd> Save </button></div></div></form></div><!--/Card--></div><div data-v-3c95d6dd><!--divider--><hr class=\"bg-gray-300 my-12\" data-v-3c95d6dd><!--Title--><h2 class=\"font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl\" data-v-3c95d6dd>Section 5</h2><!--Card--><div id=\"section5\" class=\"p-8 mt-6 lg:mt-0 rounded shadow bg-white\" data-v-3c95d6dd><blockquote class=\"border-l-4 border-yellow-600 italic my-4 pl-8 md:pl-12\" data-v-3c95d6dd>Final confirmation disclaimer message etc</blockquote><div class=\"pt-8\" data-v-3c95d6dd><button class=\"shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-4\" type=\"button\" data-v-3c95d6dd> Save </button><button class=\"shadow bg-yellow-100 hover:bg-yellow-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded mr-4\" type=\"button\" data-v-3c95d6dd> Additional Action </button><button class=\"shadow bg-yellow-100 hover:bg-yellow-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded\" type=\"button\" data-v-3c95d6dd> Additional Action </button></div></div><!--/Card--></div>", 5);

var _hoisted_20 = [_hoisted_15];

var _hoisted_21 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0, _vue.createElementVNode)("div", {
    class: "w-full lg:w-4/5 lg:ml-auto text-base md:text-sm text-gray-600 px-4 py-24 mb-12"
  }, [/*#__PURE__*/(0, _vue.createElementVNode)("span", {
    class: "text-base text-yellow-600 font-bold"
  }, "<"), /*#__PURE__*/(0, _vue.createTextVNode)(), /*#__PURE__*/(0, _vue.createElementVNode)("a", {
    href: "javascript:void(0)",
    class: "text-base md:text-sm text-yellow-600 font-bold no-underline hover:underline"
  }, "Back link")], -1
  /* HOISTED */
  );
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_scroll_spy_active = (0, _vue.resolveDirective)("scroll-spy-active");

  var _directive_scroll_spy_link = (0, _vue.resolveDirective)("scroll-spy-link");

  var _directive_scroll_spy = (0, _vue.resolveDirective)("scroll-spy");

  return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_1, [(0, _vue.createCommentVNode)("Container"), (0, _vue.createElementVNode)("div", _hoisted_2, [(0, _vue.createElementVNode)("div", _hoisted_3, [_hoisted_4, (0, _vue.createElementVNode)("div", _hoisted_5, [(0, _vue.withDirectives)(((0, _vue.openBlock)(), (0, _vue.createElementBlock)("ul", _hoisted_6, _hoisted_12)), [[_directive_scroll_spy_active], [_directive_scroll_spy_link]])])]), (0, _vue.createCommentVNode)("Section container"), (0, _vue.createElementVNode)("section", _hoisted_13, [(0, _vue.createCommentVNode)("Title"), _hoisted_14, (0, _vue.withDirectives)(((0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", null, _hoisted_20)), [[_directive_scroll_spy]])]), (0, _vue.createCommentVNode)("/Section container"), (0, _vue.createCommentVNode)("Back link "), _hoisted_21]), (0, _vue.createCommentVNode)("/container")]);
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
  var menuRoot = document.querySelector("#toplevel_page_".concat(slug));
  var currentUrl = window.location.href;
  var currentPath = currentUrl.substr(currentUrl.indexOf('admin.php'));

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