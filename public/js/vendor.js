(self["webpackChunkvue_wp_plugin_starter"] = self["webpackChunkvue_wp_plugin_starter"] || []).push([["/js/vendor"],{

/***/ "./node_modules/vue-next-masonry/lib.es.js":
/*!*************************************************!*\
  !*** ./node_modules/vue-next-masonry/lib.es.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function n(t,e){if(parseInt(t,10)>-1)return t;if("object"!=typeof t)return 0;let n=1/0,r=t.default||0;return Object.entries(t).forEach((([t,i])=>{const s=parseInt(t,10),l=i,a=parseInt(l,10);if(Number.isNaN(s)||Number.isNaN(a))return;e<=s&&s<n&&(n=s,r=l)})),r}var r=(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({props:{tag:{type:[String],default:"div"},cols:{type:[Object,Number,String],default:2},gutter:{type:[Object,Number,String],default:0},css:{type:[Boolean],default:!0},columnTag:{type:[String],default:"div"},columnClass:{type:[String,Array,Object],default:()=>[]},columnAttr:{type:[Object],default:()=>{}}},data:()=>({wrapperWidth:0,displayColumns:2,displayGutter:0}),activated(){this.$nextTick(this.render)},mounted(){window.addEventListener("resize",this.render),this.$nextTick(this.render)},updated(){this.$nextTick(this.render)},unmounted(){window.removeEventListener("resize",this.render)},methods:{render(){const t=(null==window?void 0:window.innerWidth)||1/0,{wrapperWidth:e}=this;e!==t&&(this.wrapperWidth=t,this.calculateColumnCount(this.wrapperWidth),this.calculateGutterSize(this.wrapperWidth))},calculateGutterSize(t){this.displayGutter=n(this.gutter,t)},calculateColumnCount(t){let e=n(this.cols,t)||0;e=Math.max(1,Number(e)),this.displayColumns=e},getColumnsWithChildItems(){var t,e,n;const r=[],i=null==(e=(t=this.$slots).default)?void 0:e.call(t)[0];let s=(null==i?void 0:i.children)||[];if(i&&"TransitionGroup"===i.type.name&&(console.warn("This component does not support <transition-group />. Using child elements."),s=(null==(n=i.children)?void 0:n.default()[0].children)||[]),0===s.length)return[];for(let l=0,a=0;l<s.length;l++,a++){s[l].type||a--;const t=a%this.displayColumns;r[t]||(r[t]=[]),r[t].push(s[l])}return r}},render(){const{displayGutter:t}=this,n=this.getColumnsWithChildItems(),r=parseInt(t.toString(),10)===1*t?`${t}px`:t,i={style:{display:["-webkit-box","-ms-flexbox","flex"],marginLeft:`-${r}`}},s={boxSizing:"border-box",backgroundClip:"padding-box",width:100/this.displayColumns+"%",border:"0px solid transparent",borderLeftWidth:r},l=n.map(((t,r)=>{const i={key:`${r}-${n.length}`,style:this.css?s:null,class:this.columnClass,attrs:this.columnAttr};return (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(this.columnTag,i,t)}));return (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(this.tag,this.css&&i,l)}});var i={install(t,e){e&&e.name?t.component(e.name||"masonry",r):t.component("masonry",r)}};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (i);


/***/ })

}]);