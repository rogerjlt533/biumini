(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/editPenName"],{"15e5":function(e,t,n){"use strict";(function(e){n("66ba");o(n("66fd"));var t=o(n("1c1f"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"1c1f":function(e,t,n){"use strict";n.r(t);var o=n("671e"),r=n("ac40");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("4726");var i,c=n("f0c5"),a=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,"450e447e",null,!1,o["a"],i);t["default"]=a.exports},"2b38":function(e,t,n){},4726:function(e,t,n){"use strict";var o=n("2b38"),r=n.n(o);r.a},"4cc2":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("26cb");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c={components:{},data:function(){return{maxlength:100,srcleft:"../../../static/treehole/my/back.png",imgsize:46,inputAlign:"right",labelPosition:"left",errorType:["message"],model:{penName:""},rules:{penName:[{required:!0,message:"请输入笔名",trigger:"blur"}]},btnLeftStyle:{border:"1rpx solid #AE9F82","background-color":"#FFFFFF",color:"#AE9F82 !important",width:"200rpx"},btnRightStyle:{border:"1rpx solid #AE9F82","background-color":"#AE9F82",color:"#FFFFFF !important",width:"200rpx"}}},onLoad:function(e){var t=e.params||e.payload;try{var n=JSON.parse(decodeURIComponent(t))}catch(o){n=JSON.parse(t)}this.model=n},onReady:function(){this.$refs.uForm.setRules(this.rules)},methods:u(u({},(0,o.mapActions)(["setUserinfo"])),{},{submit:function(){var t=this;if(t.model.penName.length>10)return t.$u.toast("笔名必须10字以内"),!1;t.$refs.uForm.validate((function(n){if(n){console.log("验证通过");var o="/my/update/info",r={method:"pen_name,nick",penName:t.model.penName,nick:t.model.penName};t.$http.post(o,r).then((function(n){var o=n.data;console.info(o),200===o.code?(t.$store.dispatch("setUserinfo",t.model),t.goBack()):501===o.code?setTimeout((function(){e.hideLoading(),t.$store.dispatch("Logout")}),800):e.showToast({icon:"error",title:data.message,duration:3e3})})).catch((function(e){var n=e.message;t.$tip.error(n)})).finally((function(){}))}else console.log("验证失败")}))},cancel:function(){this.goBack()},goBack:function(){e.navigateBack({})}})};t.default=c}).call(this,n("543d")["default"])},"671e":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));var o={uNavbar:function(){return n.e("uview-ui/components/u-navbar/u-navbar").then(n.bind(null,"2122"))},uForm:function(){return n.e("uview-ui/components/u-form/u-form").then(n.bind(null,"ab69"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"b773"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"7fd0"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"5352"))}},r=function(){var e=this,t=e.$createElement;e._self._c},u=[]},ac40:function(e,t,n){"use strict";n.r(t);var o=n("4cc2"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a}},[["15e5","common/runtime","common/vendor"]]]);