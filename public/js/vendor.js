/*! For license information please see vendor.js.LICENSE.txt */
(self.webpackChunkvue_wp_plugin_starter=self.webpackChunkvue_wp_plugin_starter||[]).push([[898],{761:function(e,t,n){"use strict";n.d(t,{p7:function(){return Ke},r5:function(){return q}});var r=n(5);function o(){return"undefined"!=typeof navigator?window:void 0!==n.g?n.g:{}}function a(e,t){const n=o().__VUE_DEVTOOLS_GLOBAL_HOOK__;if(n)n.emit("devtools-plugin:setup",e,t);else{const n=o();(n.__VUE_DEVTOOLS_PLUGINS__=n.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:e,setupFn:t})}}const i="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,l=e=>i?Symbol(e):"_vr_"+e,c=l("rvlm"),s=l("rvd"),u=l("r"),f=l("rl"),p=l("rvl"),d="undefined"!=typeof window;const h=Object.assign;function m(e,t){const n={};for(const r in t){const o=t[r];n[r]=Array.isArray(o)?o.map(e):e(o)}return n}let v=()=>{};const g=/\/$/;function y(e,t,n="/"){let r,o={},a="",i="";const l=t.indexOf("?"),c=t.indexOf("#",l>-1?l:0);return l>-1&&(r=t.slice(0,l),a=t.slice(l+1,c>-1?c:t.length),o=e(a)),c>-1&&(r=r||t.slice(0,c),i=t.slice(c,t.length)),r=function(e,t){if(e.startsWith("/"))return e;0;if(!e)return t;const n=t.split("/"),r=e.split("/");let o,a,i=n.length-1;for(o=0;o<r.length;o++)if(a=r[o],1!==i&&"."!==a){if(".."!==a)break;i--}return n.slice(0,i).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+i,path:r,query:o,hash:i}}function b(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function _(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function w(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e)if(!E(e[n],t[n]))return!1;return!0}function E(e,t){return Array.isArray(e)?k(e,t):Array.isArray(t)?k(t,e):e===t}function k(e,t){return Array.isArray(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var O,R;!function(e){e.pop="pop",e.push="push"}(O||(O={})),function(e){e.back="back",e.forward="forward",e.unknown=""}(R||(R={}));function C(e){if(!e)if(d){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),e.replace(g,"")}const A=/^[^#]+#/;function x(e,t){return e.replace(A,"#")+t}const P=()=>({left:window.pageXOffset,top:window.pageYOffset});function S(e){let t;if("el"in e){let n=e.el;const r="string"==typeof n&&n.startsWith("#");0;const o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}function I(e,t){return(history.state?history.state.position-t:-1)+e}const j=new Map;let $=()=>location.protocol+"//"+location.host;function T(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let t=o.includes(e.slice(a))?e.slice(a).length:1,n=o.slice(t);return"/"!==n[0]&&(n="/"+n),b(n,"")}return b(n,e)+r+o}function L(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?P():null}}function D(e){const t=function(e){const{history:t,location:n}=window;let r={value:T(e,n)},o={value:t.state};function a(r,a,i){const l=e.indexOf("#"),c=l>-1?(n.host&&document.querySelector("base")?e:e.slice(l))+r:$()+e+r;try{t[i?"replaceState":"pushState"](a,"",c),o.value=a}catch(e){console.error(e),n[i?"replace":"assign"](c)}}return o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:o,push:function(e,n){const i=h({},o.value,t.state,{forward:e,scroll:P()});a(i.current,i,!0),a(e,h({},L(r.value,e,null),{position:i.position+1},n),!1),r.value=e},replace:function(e,n){a(e,h({},t.state,L(o.value.back,e,o.value.forward,!0),n,{position:o.value.position}),!0),r.value=e}}}(e=C(e)),n=function(e,t,n,r){let o=[],a=[],i=null;const l=({state:a})=>{const l=T(e,location),c=n.value,s=t.value;let u=0;if(a){if(n.value=l,t.value=a,i&&i===c)return void(i=null);u=s?a.position-s.position:0}else r(l);o.forEach((e=>{e(n.value,c,{delta:u,type:O.pop,direction:u?u>0?R.forward:R.back:R.unknown})}))};function c(){const{history:e}=window;e.state&&e.replaceState(h({},e.state,{scroll:P()}),"")}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",c),{pauseListeners:function(){i=n.value},listen:function(e){o.push(e);const t=()=>{const t=o.indexOf(e);t>-1&&o.splice(t,1)};return a.push(t),t},destroy:function(){for(const e of a)e();a=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",c)}}}(e,t.state,t.location,t.replace);const r=h({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e)},createHref:x.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function q(e){return(e=location.host?e||location.pathname+location.search:"").includes("#")||(e+="#"),D(e)}function V(e){return"string"==typeof e||"symbol"==typeof e}const U={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},G=l("nf");var B;!function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"}(B||(B={}));function M(e,t){return h(new Error,{type:e,[G]:!0},t)}function F(e,t){return e instanceof Error&&G in e&&(null==t||!!(e.type&t))}const N="[^/]+?",W={sensitive:!1,strict:!1,start:!0,end:!0},z=/[.+*?^${}()[\]/\\]/g;function K(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function H(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=K(r[n],o[n]);if(e)return e;n++}return o.length-r.length}const Q={type:0,value:""},X=/[a-zA-Z0-9_]/;function Y(e,t,n){const r=function(e,t){const n=h({},W,t);let r=[],o=n.start?"^":"";const a=[];for(const t of e){const e=t.length?[]:[90];n.strict&&!t.length&&(o+="/");for(let r=0;r<t.length;r++){const i=t[r];let l=40+(n.sensitive?.25:0);if(0===i.type)r||(o+="/"),o+=i.value.replace(z,"\\$&"),l+=40;else if(1===i.type){const{value:e,repeatable:n,optional:c,regexp:s}=i;a.push({name:e,repeatable:n,optional:c});const u=s||N;if(u!==N){l+=10;try{new RegExp(`(${u})`)}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let f=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(f=c&&t.length<2?`(?:/${f})`:"/"+f),c&&(f+="?"),o+=f,l+=20,c&&(l+=-8),n&&(l+=-20),".*"===u&&(l+=-50)}e.push(l)}r.push(e)}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const i=new RegExp(o,n.sensitive?"":"i");return{re:i,score:r,keys:a,parse:function(e){const t=e.match(i),n={};if(!t)return null;for(let e=1;e<t.length;e++){const r=t[e]||"",o=a[e-1];n[o.name]=r&&o.repeatable?r.split("/"):r}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:i,optional:l}=e,c=a in t?t[a]:"";if(Array.isArray(c)&&!i)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const s=Array.isArray(c)?c.join("/"):c;if(!s){if(!l)throw new Error(`Missing required param "${a}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=s}}return n}}}(function(e){if(!e)return[[]];if("/"===e)return[[Q]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${s}": ${e}`)}let n=0,r=n;const o=[];let a;function i(){a&&o.push(a),a=[]}let l,c=0,s="",u="";function f(){s&&(0===n?a.push({type:0,value:s}):1===n||2===n||3===n?(a.length>1&&("*"===l||"+"===l)&&t(`A repeatable param (${s}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:s,regexp:u,repeatable:"*"===l||"+"===l,optional:"*"===l||"?"===l})):t("Invalid state to consume buffer"),s="")}function p(){s+=l}for(;c<e.length;)if(l=e[c++],"\\"!==l||2===n)switch(n){case 0:"/"===l?(s&&f(),i()):":"===l?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===l?n=2:X.test(l)?p():(f(),n=0,"*"!==l&&"?"!==l&&"+"!==l&&c--);break;case 2:")"===l?"\\"==u[u.length-1]?u=u.slice(0,-1)+l:n=3:u+=l;break;case 3:f(),n=0,"*"!==l&&"?"!==l&&"+"!==l&&c--,u="";break;default:t("Unknown state")}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${s}"`),f(),i(),o}(e.path),n);const o=h(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Z(e,t){const n=[],r=new Map;function o(e,n,r){let l=!r,c=function(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:J(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||{}:{default:e.component}}}(e);c.aliasOf=r&&r.record;const s=ne(t,e),u=[c];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)u.push(h({},c,{components:r?r.record.components:c.components,path:e,aliasOf:r?r.record:c}))}let f,p;for(const t of u){let{path:u}=t;if(n&&"/"!==u[0]){let e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(u&&r+u)}if(f=Y(t,n,s),r?r.alias.push(f):(p=p||f,p!==f&&p.alias.push(f),l&&e.name&&!ee(f)&&a(e.name)),"children"in c){let e=c.children;for(let t=0;t<e.length;t++)o(e[t],f,r&&r.children[t])}r=r||f,i(f)}return p?()=>{a(p)}:v}function a(e){if(V(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(a),t.alias.forEach(a))}else{let t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(a),e.alias.forEach(a))}}function i(e){let t=0;for(;t<n.length&&H(e,n[t])>=0;)t++;n.splice(t,0,e),e.record.name&&!ee(e)&&r.set(e.record.name,e)}return t=ne({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>o(e))),{addRoute:o,resolve:function(e,t){let o,a,i,l={};if("name"in e&&e.name){if(o=r.get(e.name),!o)throw M(1,{location:e});i=o.record.name,l=h(function(e,t){let n={};for(let r of t)r in e&&(n[r]=e[r]);return n}(t.params,o.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params),a=o.stringify(l)}else if("path"in e)a=e.path,o=n.find((e=>e.re.test(a))),o&&(l=o.parse(a),i=o.record.name);else{if(o=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!o)throw M(1,{location:e,currentLocation:t});i=o.record.name,l=h({},t.params,e.params),a=o.stringify(l)}const c=[];let s=o;for(;s;)c.unshift(s.record),s=s.parent;return{name:i,path:a,params:l,matched:c,meta:te(c)}},removeRoute:a,getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function J(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(let r in e.components)t[r]="boolean"==typeof n?n:n[r];return t}function ee(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function te(e){return e.reduce(((e,t)=>h(e,t.meta)),{})}function ne(e,t){let n={};for(let r in e)n[r]=r in t?t[r]:e[r];return n}const re=/#/g,oe=/&/g,ae=/\//g,ie=/=/g,le=/\?/g,ce=/\+/g,se=/%5B/g,ue=/%5D/g,fe=/%5E/g,pe=/%60/g,de=/%7B/g,he=/%7C/g,me=/%7D/g,ve=/%20/g;function ge(e){return encodeURI(""+e).replace(he,"|").replace(se,"[").replace(ue,"]")}function ye(e){return ge(e).replace(ce,"%2B").replace(ve,"+").replace(re,"%23").replace(oe,"%26").replace(pe,"`").replace(de,"{").replace(me,"}").replace(fe,"^")}function be(e){return function(e){return ge(e).replace(re,"%23").replace(le,"%3F")}(e).replace(ae,"%2F")}function _e(e){try{return decodeURIComponent(""+e)}catch(e){}return""+e}function we(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let e=0;e<n.length;++e){const r=n[e].replace(ce," ");let o=r.indexOf("="),a=_e(o<0?r:r.slice(0,o)),i=o<0?null:_e(r.slice(o+1));if(a in t){let e=t[a];Array.isArray(e)||(e=t[a]=[e]),e.push(i)}else t[a]=i}return t}function Ee(e){let t="";for(let n in e){const r=e[n];if(n=ye(n).replace(ie,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(Array.isArray(r)?r.map((e=>e&&ye(e))):[r&&ye(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e))}))}return t}function ke(e){const t={};for(let n in e){let r=e[n];void 0!==r&&(t[n]=Array.isArray(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r)}return t}function Oe(){let e=[];return{add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}},list:()=>e,reset:function(){e=[]}}}function Re(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise(((i,l)=>{const c=e=>{var c;!1===e?l(M(4,{from:n,to:t})):e instanceof Error?l(e):"string"==typeof(c=e)||c&&"object"==typeof c?l(M(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),i())},s=e.call(r&&r.instances[o],t,n,c);let u=Promise.resolve(s);e.length<3&&(u=u.then(c)),u.catch((e=>l(e)))}))}function Ce(e,t,n,r){const o=[];for(const l of e)for(const e in l.components){let c=l.components[e];if("beforeRouteEnter"===t||l.instances[e])if("object"==typeof(a=c)||"displayName"in a||"props"in a||"__vccOpts"in a){const a=(c.__vccOpts||c)[t];a&&o.push(Re(a,n,r,l,e))}else{let a=c();0,o.push((()=>a.then((o=>{if(!o)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${l.path}"`));const a=(c=o).__esModule||i&&"Module"===c[Symbol.toStringTag]?o.default:o;var c;l.components[e]=a;const s=(a.__vccOpts||a)[t];return s&&Re(s,n,r,l,e)()}))))}}var a;return o}function Ae(e){const t=(0,r.inject)(u),n=(0,r.inject)(f),o=(0,r.computed)((()=>t.resolve((0,r.unref)(e.to)))),a=(0,r.computed)((()=>{let{matched:e}=o.value,{length:t}=e;const r=e[t-1];let a=n.matched;if(!r||!a.length)return-1;let i=a.findIndex(_.bind(null,r));if(i>-1)return i;let l=Pe(e[t-2]);return t>1&&Pe(r)===l&&a[a.length-1].path!==l?a.findIndex(_.bind(null,e[t-2])):i})),i=(0,r.computed)((()=>a.value>-1&&function(e,t){for(let n in t){let r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return!1}else if(!Array.isArray(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return!1}return!0}(n.params,o.value.params))),l=(0,r.computed)((()=>a.value>-1&&a.value===n.matched.length-1&&w(n.params,o.value.params)));if(__VUE_PROD_DEVTOOLS__&&d){const e=(0,r.getCurrentInstance)();if(e){const t={route:o.value,isActive:i.value,isExactActive:l.value};e.__vrl_devtools=e.__vrl_devtools||[],e.__vrl_devtools.push(t),(0,r.watchEffect)((()=>{t.route=o.value,t.isActive=i.value,t.isExactActive=l.value}),{flush:"post"})}}return{route:o,href:(0,r.computed)((()=>o.value.href)),isActive:i,isExactActive:l,navigate:function(n={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return!0}(n)?t[(0,r.unref)(e.replace)?"replace":"push"]((0,r.unref)(e.to)).catch(v):Promise.resolve()}}}const xe=(0,r.defineComponent)({name:"RouterLink",props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ae,setup(e,{slots:t}){const n=(0,r.reactive)(Ae(e)),{options:o}=(0,r.inject)(u),a=(0,r.computed)((()=>({[Se(e.activeClass,o.linkActiveClass,"router-link-active")]:n.isActive,[Se(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive})));return()=>{const o=t.default&&t.default(n);return e.custom?o:(0,r.h)("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:a.value},o)}}});function Pe(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Se=(e,t,n)=>null!=e?e:null!=t?t:n;function Ie(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const je=(0,r.defineComponent)({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},setup(e,{attrs:t,slots:n}){const o=(0,r.inject)(p),a=(0,r.computed)((()=>e.route||o.value)),i=(0,r.inject)(s,0),l=(0,r.computed)((()=>a.value.matched[i]));(0,r.provide)(s,i+1),(0,r.provide)(c,l),(0,r.provide)(p,a);const u=(0,r.ref)();return(0,r.watch)((()=>[u.value,l.value,e.name]),(([e,t,n],[r,o,a])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&_(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"}),()=>{const o=a.value,i=l.value,c=i&&i.components[e.name],s=e.name;if(!c)return Ie(n.default,{Component:c,route:o});const f=i.props[e.name],p=f?!0===f?o.params:"function"==typeof f?f(o):f:null,d=(0,r.h)(c,h({},p,t,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(i.instances[s]=null)},ref:u}));return Ie(n.default,{Component:d,route:o})||d}}});function $e(e,t){const n=h({},e,{matched:e.matched.map((e=>function(e,t){const n={};for(let r in e)t.includes(r)||(n[r]=e[r]);return n}(e,["instances","children","aliasOf"])))});return{_custom:{type:null,readOnly:!0,display:e.fullPath,tooltip:t,value:n}}}function Te(e){return{_custom:{display:e}}}let Le=0;function De(e,t,n){if(t.__hasDevtools)return;t.__hasDevtools=!0;const o=Le++;a({id:"org.vuejs.router"+(o?"."+o:""),label:"Vue Router",packageName:"vue-router",homepage:"https://next.router.vuejs.org/",logo:"https://vuejs.org/images/icons/favicon-96x96.png",componentStateTypes:["Routing"],app:e},(a=>{a.on.inspectComponent(((e,n)=>{e.instanceData&&e.instanceData.state.push({type:"Routing",key:"$route",editable:!1,value:$e(t.currentRoute.value,"Current Route")})})),a.on.visitComponentTree((({treeNode:e,componentInstance:t})=>{Array.isArray(t.__vrl_devtools)&&(t.__devtoolsApi=a,t.__vrl_devtools.forEach((t=>{let n=Ge,r="";t.isExactActive?(n=Ue,r="This is exactly active"):t.isActive&&(n=Ve,r="This link is active"),e.tags.push({label:t.route.path,textColor:0,tooltip:r,backgroundColor:n})})))})),(0,r.watch)(t.currentRoute,(()=>{s(),a.notifyComponentUpdate(),a.sendInspectorTree(c),a.sendInspectorState(c)}));const i="router:navigations:"+o;a.addTimelineLayer({id:i,label:`Router${o?" "+o:""} Navigations`,color:4237508}),t.onError(((e,t)=>{a.addTimelineEvent({layerId:i,event:{title:"Error during Navigation",subtitle:t.fullPath,logType:"error",time:Date.now(),data:{error:e},groupId:t.meta.__navigationId}})}));let l=0;t.beforeEach(((e,t)=>{const n={guard:Te("beforeEach"),from:$e(t,"Current Location during this navigation"),to:$e(e,"Target location")};Object.defineProperty(e.meta,"__navigationId",{value:l++}),a.addTimelineEvent({layerId:i,event:{time:Date.now(),title:"Start of navigation",subtitle:e.fullPath,data:n,groupId:e.meta.__navigationId}})})),t.afterEach(((e,t,n)=>{const r={guard:Te("afterEach")};n?(r.failure={_custom:{type:Error,readOnly:!0,display:n?n.message:"",tooltip:"Navigation Failure",value:n}},r.status=Te("❌")):r.status=Te("✅"),r.from=$e(t,"Current Location during this navigation"),r.to=$e(e,"Target location"),a.addTimelineEvent({layerId:i,event:{title:"End of navigation",subtitle:e.fullPath,time:Date.now(),data:r,logType:n?"warning":"default",groupId:e.meta.__navigationId}})}));const c="router-inspector:"+o;function s(){if(!u)return;const e=u;let r=n.getRoutes().filter((e=>!e.parent));r.forEach(We),e.filter&&(r=r.filter((t=>ze(t,e.filter.toLowerCase())))),r.forEach((e=>Ne(e,t.currentRoute.value))),e.rootNodes=r.map(Be)}let u;a.addInspector({id:c,label:"Routes"+(o?" "+o:""),icon:"book",treeFilterPlaceholder:"Search routes"}),a.on.getInspectorTree((t=>{u=t,t.app===e&&t.inspectorId===c&&s()})),a.on.getInspectorState((t=>{if(t.app===e&&t.inspectorId===c){const e=n.getRoutes().find((e=>e.record.__vd_id===t.nodeId));e&&(t.state={options:qe(e)})}})),a.sendInspectorTree(c),a.sendInspectorState(c)}))}function qe(e){const{record:t}=e,n=[{editable:!1,key:"path",value:t.path}];return null!=t.name&&n.push({editable:!1,key:"name",value:t.name}),n.push({editable:!1,key:"regexp",value:e.re}),e.keys.length&&n.push({editable:!1,key:"keys",value:{_custom:{type:null,readOnly:!0,display:e.keys.map((e=>`${e.name}${function(e){return e.optional?e.repeatable?"*":"?":e.repeatable?"+":""}(e)}`)).join(" "),tooltip:"Param keys",value:e.keys}}}),null!=t.redirect&&n.push({editable:!1,key:"redirect",value:t.redirect}),e.alias.length&&n.push({editable:!1,key:"aliases",value:e.alias.map((e=>e.record.path))}),n.push({key:"score",editable:!1,value:{_custom:{type:null,readOnly:!0,display:e.score.map((e=>e.join(", "))).join(" | "),tooltip:"Score used to sort routes",value:e.score}}}),n}const Ve=2450411,Ue=8702998,Ge=16486972;function Be(e){const t=[],{record:n}=e;null!=n.name&&t.push({label:String(n.name),textColor:0,backgroundColor:2282478}),n.aliasOf&&t.push({label:"alias",textColor:0,backgroundColor:Ge}),e.__vd_match&&t.push({label:"matches",textColor:0,backgroundColor:15485081}),e.__vd_exactActive&&t.push({label:"exact",textColor:0,backgroundColor:Ue}),e.__vd_active&&t.push({label:"active",textColor:0,backgroundColor:Ve}),n.redirect&&t.push({label:"redirect: "+("string"==typeof n.redirect?n.redirect:"Object"),textColor:16777215,backgroundColor:6710886});let r=n.__vd_id;return null==r&&(r=String(Me++),n.__vd_id=r),{id:r,label:n.path,tags:t,children:e.children.map(Be)}}let Me=0;const Fe=/^\/(.*)\/([a-z]*)$/;function Ne(e,t){const n=t.matched.length&&_(t.matched[t.matched.length-1],e.record);e.__vd_exactActive=e.__vd_active=n,n||(e.__vd_active=t.matched.some((t=>_(t,e.record)))),e.children.forEach((e=>Ne(e,t)))}function We(e){e.__vd_match=!1,e.children.forEach(We)}function ze(e,t){const n=String(e.re).match(Fe);if(e.__vd_match=!1,!n||n.length<3)return!1;if(new RegExp(n[1].replace(/\$$/,""),n[2]).test(t))return e.children.forEach((e=>ze(e,t))),("/"!==e.record.path||"/"===t)&&(e.__vd_match=e.re.test(t),!0);const r=e.record.path.toLowerCase(),o=_e(r);return!(t.startsWith("/")||!o.includes(t)&&!r.includes(t))||(!(!o.startsWith(t)&&!r.startsWith(t))||(!(!e.record.name||!String(e.record.name).includes(t))||e.children.some((e=>ze(e,t)))))}function Ke(e){const t=Z(e.routes,e);let n=e.parseQuery||we,o=e.stringifyQuery||Ee,a=e.history;const i=Oe(),l=Oe(),c=Oe(),s=(0,r.shallowRef)(U);let g=U;d&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=m.bind(null,(e=>""+e)),E=m.bind(null,be),k=m.bind(null,_e);function R(e,r){if(r=h({},r||s.value),"string"==typeof e){let o=y(n,e,r.path),i=t.resolve({path:o.path},r),l=a.createHref(o.fullPath);return h(o,i,{params:k(i.params),hash:_e(o.hash),redirectedFrom:void 0,href:l})}let i;"path"in e?i=h({},e,{path:y(n,e.path,r.path).path}):(i=h({},e,{params:E(e.params)}),r.params=E(r.params));let l=t.resolve(i,r);const c=e.hash||"";l.params=b(k(l.params));const u=function(e,t){let n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(o,h({},e,{hash:(f=c,ge(f).replace(de,"{").replace(me,"}").replace(fe,"^")),path:l.path}));var f;let p=a.createHref(u);return h({fullPath:u,hash:c,query:o===Ee?ke(e.query):e.query},l,{redirectedFrom:void 0,href:p})}function C(e){return"string"==typeof e?y(n,e,s.value.path):h({},e)}function A(e,t){if(g!==e)return M(8,{from:t,to:e})}function x(e){return T(e)}function $(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return"string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=C(r):{path:r},r.params={}),h({query:e.query,hash:e.hash,params:e.params},r)}}function T(e,t){const n=g=R(e),r=s.value,a=e.state,i=e.force,l=!0===e.replace,c=$(n);if(c)return T(h(C(c),{state:a,force:i,replace:l}),t||n);const u=n;let f;return u.redirectedFrom=t,!i&&function(e,t,n){let r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&_(t.matched[r],n.matched[o])&&w(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(o,r,n)&&(f=M(16,{to:u,from:r}),X(r,r,!0,!1)),(f?Promise.resolve(f):D(u,r)).catch((e=>F(e)?e:H(e,u,r))).then((e=>{if(e){if(F(e,2))return T(h(C(e.to),{state:a,force:i,replace:l}),t||u)}else e=G(u,r,!0,l,a);return q(u,r,e),e}))}function L(e,t){const n=A(e,t);return n?Promise.reject(n):Promise.resolve()}function D(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let i=0;i<a;i++){const a=t.matched[i];a&&(e.matched.find((e=>_(e,a)))?r.push(a):n.push(a));const l=e.matched[i];l&&(t.matched.find((e=>_(e,l)))||o.push(l))}return[n,r,o]}(e,t);n=Ce(r.reverse(),"beforeRouteLeave",e,t);for(const o of r)o.leaveGuards.forEach((r=>{n.push(Re(r,e,t))}));const c=L.bind(null,e,t);return n.push(c),He(n).then((()=>{n=[];for(const r of i.list())n.push(Re(r,e,t));return n.push(c),He(n)})).then((()=>{n=Ce(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(Re(r,e,t))}));return n.push(c),He(n)})).then((()=>{n=[];for(const r of e.matched)if(r.beforeEnter&&!t.matched.includes(r))if(Array.isArray(r.beforeEnter))for(const o of r.beforeEnter)n.push(Re(o,e,t));else n.push(Re(r.beforeEnter,e,t));return n.push(c),He(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Ce(a,"beforeRouteEnter",e,t),n.push(c),He(n)))).then((()=>{n=[];for(const r of l.list())n.push(Re(r,e,t));return n.push(c),He(n)})).catch((e=>F(e,8)?e:Promise.reject(e)))}function q(e,t,n){for(const r of c.list())r(e,t,n)}function G(e,t,n,r,o){const i=A(e,t);if(i)return i;const l=t===U,c=d?history.state:{};n&&(r||l?a.replace(e.fullPath,h({scroll:l&&c&&c.scroll},o)):a.push(e.fullPath,o)),s.value=e,X(e,t,n,l),Q()}let B;function N(){B=a.listen(((e,t,n)=>{let r=R(e);const o=$(r);if(o)return void T(h(o,{replace:!0}),r).catch(v);g=r;const i=s.value;var l,c;d&&(l=I(i.fullPath,n.delta),c=P(),j.set(l,c)),D(r,i).catch((e=>F(e,12)?e:F(e,2)?(T(e.to,r).then((e=>{F(e,20)&&!n.delta&&n.type===O.pop&&a.go(-1,!1)})).catch(v),Promise.reject()):(n.delta&&a.go(-n.delta,!1),H(e,r,i)))).then((e=>{(e=e||G(r,i,!1))&&(n.delta?a.go(-n.delta,!1):n.type===O.pop&&F(e,20)&&a.go(-1,!1)),q(r,i,e)})).catch(v)}))}let W,z=Oe(),K=Oe();function H(e,t,n){Q(e);const r=K.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function Q(e){W||(W=!0,N(),z.list().forEach((([t,n])=>e?n(e):t())),z.reset())}function X(t,n,o,a){const{scrollBehavior:i}=e;if(!d||!i)return Promise.resolve();let l=!o&&function(e){const t=j.get(e);return j.delete(e),t}(I(t.fullPath,0))||(a||!o)&&history.state&&history.state.scroll||null;return(0,r.nextTick)().then((()=>i(t,n,l))).then((e=>e&&S(e))).catch((e=>H(e,t,n)))}const Y=e=>a.go(e);let J;const ee=new Set;return{currentRoute:s,addRoute:function(e,n){let r,o;return V(e)?(r=t.getRecordMatcher(e),o=n):o=e,t.addRoute(o,r)},removeRoute:function(e){let n=t.getRecordMatcher(e);n&&t.removeRoute(n)},hasRoute:function(e){return!!t.getRecordMatcher(e)},getRoutes:function(){return t.getRoutes().map((e=>e.record))},resolve:R,options:e,push:x,replace:function(e){return x(h(C(e),{replace:!0}))},go:Y,back:()=>Y(-1),forward:()=>Y(1),beforeEach:i.add,beforeResolve:l.add,afterEach:c.add,onError:K.add,isReady:function(){return W&&s.value!==U?Promise.resolve():new Promise(((e,t)=>{z.add([e,t])}))},install(e){const n=this;e.component("RouterLink",xe),e.component("RouterView",je),e.config.globalProperties.$router=n,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>(0,r.unref)(s)}),d&&!J&&s.value===U&&(J=!0,x(a.location).catch((e=>{0})));const o={};for(let e in U)o[e]=(0,r.computed)((()=>s.value[e]));e.provide(u,n),e.provide(f,(0,r.reactive)(o)),e.provide(p,s);let i=e.unmount;ee.add(e),e.unmount=function(){ee.delete(e),ee.size<1&&(B(),s.value=U,J=!1,W=!1),i()},__VUE_PROD_DEVTOOLS__&&d&&De(e,n,t)}}}function He(e){return e.reduce(((e,t)=>e.then((()=>t()))),Promise.resolve())}}}]);
//# sourceMappingURL=vendor.js.map