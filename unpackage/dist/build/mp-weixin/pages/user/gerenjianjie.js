(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/gerenjianjie"],{"0959":function(t,e,n){"use strict";(function(t){n("66ba");o(n("66fd"));var e=o(n("4b2f"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},1279:function(t,e,n){"use strict";var o=n("d956"),i=n.n(o);i.a},"263a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n("26cb");var o=i(n("3ea0"));function i(t){return t&&t.__esModule?t:{default:t}}var u={components:{},data:function(){return{titleWords:0,introduceWords:0,height:200,srcleft:"../../../static/treehole/my/back.png",imgsize:46,labelWidth:180,labelPosition:"top",errorType:["toast"],model:{},header:{token:t.getStorageSync("token")},fileList:[],action:o.default.apiUrl+"/upload",rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],introduce:[{required:!0,message:"请输入内容",trigger:"blur"}]},btnLeftStyle:{border:"1rpx solid #AE9F82","background-color":"#FFFFFF",color:"#AE9F82 !important",width:"200rpx"},btnRightStyle:{border:"1rpx solid #AE9F82","background-color":"#AE9F82",color:"#FFFFFF !important",width:"200rpx"},customStyleTitle:{"font-size":"36rpx",color:"#363D50"}}},created:function(){},onLoad:function(t){var e=this,n=t.params||t.payload;try{var o=JSON.parse(decodeURIComponent(n))}catch(i){o=JSON.parse(n)}this.model=o,this.model.title&&(this.titleWords=this.model.title.length),this.model.introduce&&(this.introduceWords=this.model.introduce.length),this.model.images.length>0&&this.model.images.map((function(t){var n={url:t};e.fileList.push(n)}))},onReady:function(){this.$refs.uForm.setRules(this.rules)},methods:{titleInput:function(t){this.titleWords=t.length},introduceInput:function(t){this.introduceWords=t.length},submit:function(){var e=this;e.titleWords>20?e.$u.toast("寻友标题不能超过20个字"):e.introduceWords>200?e.$u.toast("寻友详情不能超过200个字"):e.$refs.uForm.validate((function(n){if(n){var o=[];e.fileList.map((function(t){o.push(t.url)}));var i="/my/update/info",u={method:"title, introduce, images",title:e.model.title,introduce:e.model.introduce,images:o.join(",")};if(u.images.indexOf("wxfile://")>-1)return e.$u.toast("图片正在上传，请稍后"),!1;console.info("=======:",e.fileList),e.$http.post(i,u).then((function(n){var i=n.data;200===i.code?(e.model.images=o,e.$store.dispatch("setUserinfo",e.model),e.goBack()):501===i.code?setTimeout((function(){t.hideLoading(),e.$store.dispatch("Logout")}),800):e.$u.toast(i.message)})).catch((function(t){var n=t.message;e.$tip.error(n)})).finally((function(){}))}else console.log("验证失败")}))},uploadSuccess:function(t,e,n,o){200===t.code&&(n[e].url=t.data.url,this.fileList=n,console.log("this.fileList::",this.fileList))},uploadError:function(t,e,n,o){console.log("data: "+JSON.stringify(t)),console.log("index: "+JSON.stringify(e)),console.log("lists: "+JSON.stringify(n)),console.log("name: "+JSON.stringify(o))},uploadRemove:function(t,e,n){this.fileList=e},cancel:function(){this.goBack()},goBack:function(){t.navigateBack({})}}};e.default=u}).call(this,n("543d")["default"])},"3efc":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}));var o={uNavbar:function(){return n.e("uview-ui/components/u-navbar/u-navbar").then(n.bind(null,"2122"))},uForm:function(){return n.e("uview-ui/components/u-form/u-form").then(n.bind(null,"ab69"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"b773"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"7fd0"))},uUpload:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-upload/u-upload")]).then(n.bind(null,"5045"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"5352"))}},i=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"4b2f":function(t,e,n){"use strict";n.r(e);var o=n("3efc"),i=n("dd92");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("1279");var r,l=n("f0c5"),s=Object(l["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=s.exports},d956:function(t,e,n){},dd92:function(t,e,n){"use strict";n.r(e);var o=n("263a"),i=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=i.a}},[["0959","common/runtime","common/vendor"]]]);