(self.webpackChunkvue_wp_plugin_starter=self.webpackChunkvue_wp_plugin_starter||[]).push([[467],{501:function(e,t,a){"use strict";var n=a(5),r=(0,n.withScopeId)("data-v-26848a2f");(0,n.pushScopeId)("data-v-26848a2f");var o=(0,n.createVNode)("h3",null,"Backend App",-1),p={class:"main-wrapper"};(0,n.popScopeId)();var c=r((function(e,t,a,r,c,u){var s=(0,n.resolveComponent)("router-view");return(0,n.openBlock)(),(0,n.createBlock)(n.Fragment,null,[o,(0,n.createVNode)("div",p,[(0,n.createVNode)(s,{key:e.$route.path})])],64)}));var u=function(e,t){var a=t,n=a("#toplevel_page_"+e),r=window.location.href,o=r.substr(r.indexOf("admin.php"));n.on("click","a",(function(){var e=a(this);a("ul.wp-submenu li",n).removeClass("current"),e.hasClass("wp-has-submenu")?a("li.wp-first-item",n).addClass("current"):e.parents("li").addClass("current")})),a("ul.wp-submenu a",n).each((function(e,t){a(t).attr("href")!==o||a(t).parent().addClass("current")}))},s=jQuery,d=a.n(s),i=(0,n.defineComponent)({mounted:function(){u("vue-app",d())}});i.render=c,i.__scopeId="data-v-26848a2f";var l=i,v=a(761),f=(0,n.withScopeId)("data-v-7187ce99");(0,n.pushScopeId)("data-v-7187ce99");var h={class:"app-dashboard"};(0,n.popScopeId)();var m=f((function(e,t,a,r,o,p){return(0,n.openBlock)(),(0,n.createBlock)("div",h,[(0,n.createVNode)("span",null,(0,n.toDisplayString)(e.msg),1)])})),w=(0,n.defineComponent)({name:"Dashboard",props:{msg:{type:String,required:!1,default:"Welcome to Your Vue.js Backend App"}}});w.render=m,w.__scopeId="data-v-7187ce99";var k=w,_=(0,n.withScopeId)("data-v-18c63862");(0,n.pushScopeId)("data-v-18c63862");var g={class:"app-settings"};(0,n.popScopeId)();var S=_((function(e,t,a,r,o,p){return(0,n.openBlock)(),(0,n.createBlock)("div",g," The Settings Page ")})),I=(0,n.defineComponent)({name:"Settings",data:function(){return{}}});I.render=S,I.__scopeId="data-v-18c63862";var C=[{path:"/",component:k},{path:"/settings",component:I}],b=(0,v.p7)({history:(0,v.r5)(),routes:C});(0,n.createApp)(l).use(b).mount("#vue-admin-app")},766:function(){},591:function(){},5:function(e){"use strict";e.exports=Vue}},function(e){"use strict";var t=function(t){return e(e.s=t)};e.O(0,[582,703,898],(function(){return t(501),t(766),t(591)}));e.O()}]);
//# sourceMappingURL=admin.js.map