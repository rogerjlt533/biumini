(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/biu"],{"1b94":function(t,e,n){"use strict";(function(t){n("66ba");o(n("66fd"));var e=o(n("2ea1"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"1d8f":function(t,e,n){"use strict";n.r(e);var o=n("7f9e"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},"2ea1":function(t,e,n){"use strict";n.r(e);var o=n("45fe"),i=n("1d8f");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("38b6");var u,r=n("f0c5"),c=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=c.exports},"38b6":function(t,e,n){"use strict";var o=n("7e19"),i=n.n(o);i.a},"45fe":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var o={uNavbar:function(){return n.e("uview-ui/components/u-navbar/u-navbar").then(n.bind(null,"2122"))},uRow:function(){return n.e("uview-ui/components/u-row/u-row").then(n.bind(null,"584c"))},uCol:function(){return n.e("uview-ui/components/u-col/u-col").then(n.bind(null,"725a"))},uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"4bb9"))},uTag:function(){return n.e("uview-ui/components/u-tag/u-tag").then(n.bind(null,"8281"))},uGrid:function(){return n.e("uview-ui/components/u-grid/u-grid").then(n.bind(null,"16cb"))},uGridItem:function(){return n.e("uview-ui/components/u-grid-item/u-grid-item").then(n.bind(null,"7f6d"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"5352"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"05ad"))},uModal:function(){return n.e("uview-ui/components/u-modal/u-modal").then(n.bind(null,"82a6"))},uRadioGroup:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-radio-group/u-radio-group")]).then(n.bind(null,"591f"))},uRadio:function(){return n.e("uview-ui/components/u-radio/u-radio").then(n.bind(null,"bbab"))},uBackTop:function(){return n.e("uview-ui/components/u-back-top/u-back-top").then(n.bind(null,"3872"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"7e19":function(t,e,n){},"7f9e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("a34a")),i=n("26cb");function a(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,o,i,a,u){try{var r=t[a](u),c=r.value}catch(s){return void n(s)}r.done?e(c):Promise.resolve(c).then(o,i)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function r(t){u(a,o,i,r,c,"next",t)}function c(t){u(a,o,i,r,c,"throw",t)}r(void 0)}))}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d=function(){Promise.all([n.e("common/vendor"),n.e("compoents/home/biu-mingpian")]).then(function(){return resolve(n("8797"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("compoents/home/tree-hole").then(function(){return resolve(n("3c6b"))}.bind(null,n)).catch(n.oe)},f={components:{BiuMingpian:d,TreeHole:h},computed:s({},(0,i.mapState)({userInfo:"userInfo",isLogin:"isLogin"})),data:function(){return{disabled:!1,scrollTop:0,srcleft:"../../../static/treehole/my/back.png",imgsize:46,popup:{show:!1,title:"请选择通信方式",value:1,list:[{name:"纸邮",id:1},{name:"E-mail",di:2}]},cancelStyle:{border:"1px solid #AE9F82","background-color":"#FFFFFF","border-radius":"30rpx",color:"#AE9F82 !important",width:"200rpx","margin-left":"70rpx"},confirmStyle:{border:"1px solid #AE9F82","background-color":"#AE9F82","border-radius":"30rpx",color:"#FFFFFF !important",width:"200rpx","margin-right":"70rpx"},mingpian:{},model:{nation:"",province:"",sex:"",age:"",communicate:{tag:""}},currIdx:0,sixin:{name:"私信",icons:["../../static/bar-xinxi-0.png","../../static/bar-xinxi-1.png"]},titledata:[{name:"笔友简介",show:!0,icon:"../../../static/treehole/biu/biu-jianjie.png",url:"linjian"},{name:"笔友树洞",show:!1,icon:"../../../static/treehole/linjian/biu-shudong.png",url:"wdshudong"}],btnUrls:["../../static/treehole/my/wd-unstar.png","../../static/treehole/my/wd-guanzhu.png"],iconUrls:["../../static/treehole/biu/biu-address.png","../../static/treehole/biu/biu-sex.png","../../static/treehole/biu/biu-age.png"],btnLeftStyle:{border:"1rpx solid #AE9F82","background-color":"#FFFFFF",color:"#AE9F82 !important",width:"200rpx",padding:"0"},btnRightStyle:{border:"1rpx solid #AE9F82","background-color":"#AE9F82",color:"#FFFFFF !important",width:"200rpx"},btnRightStyleNo:{border:"1rpx solid #AE9F82!important","background-color":"#c0c0c0",color:"#FFFFFF !important",width:"200rpx"},txfsUrls:["../../static/treehole/biu/biu-xinjian.png","../../static/treehole/biu/biu-xinjian.png","../../static/treehole/biu/biu-email.png","../../static/treehole/biu/biu-email-and-xj.png"],customStyle:{margin:"-16rpx 0"},friendList:[],loadStatus2:"loadmore",page2:1,ismore2:1,lastid2:""}},watch:{},onLoad:function(t){var e=t.params||t.payload;try{var n=JSON.parse(decodeURIComponent(e))}catch(o){n=JSON.parse(e)}this.mingpian=n,this.initData(),this.reLoadData(n.friend)},methods:{copy:function(e){var n=this;1===this.model.cancelFriend&&t.setClipboardData({data:e,success:function(){n.$u.toast("复制成功")}})},initData:function(){var e=this,n="/user/home",o={id:e.mingpian.friend};e.$http.post(n,o).then((function(n){var o=n.data;200===o.code?(e.mingpian=s({},o.data),e.mingpian.communicate=o.data.communicate.value,e.mingpian.image=o.data.image,e.model=o.data,console.info("_result.data:6.1::",o.data),e.disabled=0===e.model.allowFriend):501===o.code&&setTimeout((function(){t.hideLoading(),e.$store.dispatch("Logout")}),800)})).catch((function(t){var n=t.message;e.$tip.error(n)})).finally((function(){}))},reLoadData:function(t){this.page2=1,this.loadData({method:"friend",friend:t,page:this.page2,size:9999,last:""})},loadData:function(e){var n=this,o="/hole/note/list";n.$http.post(o,e).then((function(e){var o=e.data;200===o.code?(1===n.page2?n.friendList=o.data.list:n.friendList=n.friendList.concat(o.data.list),n.ismore2=o.data.more,n.lastid2=o.data.last,1===n.ismore2?n.loadStatus2="loadmore":n.loadStatus2="nomore"):501===o.code?setTimeout((function(){t.hideLoading(),n.$store.dispatch("Logout")}),800):console.info("500::",o.message)})).catch((function(t){console.info("err::",t);t.message})).finally((function(){}))},goBack:function(){t.navigateBack({})},clickevent:function(t){t===this.currIdx||(this.currIdx=t,this.titledata[0].show=!this.titledata[0].show,this.titledata[1].show=!this.titledata[1].show)},handleOpenMenu:function(t){"guanzhu"===t&&(0===this.model.collect?this.guanzhu():this.$u.toast("已关注"))},guanzhu:function(){if(!this.isLogin)return this.$u.toast("未登录"),void setTimeout((function(){t.reLaunch({url:"../home/home"})}),600);var e="/user/collect",n={method:"collect",relate:this.model.id};this.apiMethod(e,n,"guanzhu")},unGuanzhu:function(){var t="/user/collect",e={method:"cancel",relate:this.model.id};this.apiMethod(t,e,"quguan")},haoyou:function(){var e=this;if(!this.isLogin)return this.$u.toast("未登录"),void setTimeout((function(){t.reLaunch({url:"../home/home"})}),600);if(1!==this.userInfo.isPenuser)return this.$u.toast("请完善寻友信息"),void setTimeout((function(){t.navigateTo({url:"../home/register"})}),600);if(0===this.userInfo.searchStatus)return this.$u.toast("请开启寻友开关"),void setTimeout((function(){t.reLaunch({url:"../home/home"})}),600);if(this.disabled)this.$u.toast("该笔友已关闭寻友");else{var n="/user/friend/apply",o={method:"communicate",friend:this.model.id};console.info(n,o);var i=this;i.$http.post(n,o).then((function(n){if(200===n.data.code){var o=n.data.data;o.length>1?(i.popup.list=o,i.popup.show=!0):1===o.length?(i.popup.value=o[0].id,i.applyBiyou()):i.$u.toast("无匹配的通信方式，暂时不能申请笔友！")}else 501===n.data.code?setTimeout((function(){t.hideLoading(),i.$store.dispatch("Logout")}),800):502===n.data.code?(e.$tip.error("笔友信息未完善"),setTimeout((function(){t.navigateTo({url:"../home/register"})}),1e3)):i.$u.toast(n.data.message)})).catch((function(t){var e=t.message;i.$tip.error(e)})).finally((function(){}))}},applyBiyou:function(){var t="/user/friend/apply",e={method:"apply",friend:this.model.id,communicate:this.popup.value};this.apiMethod(t,e,"jiahaoyou")},unHaoyou:function(){var e=this;t.showModal({title:"提示",content:"您确定要解除笔友吗？",success:function(){var t=r(o.default.mark((function t(n){var i,a;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n.confirm?(i="/user/friend/apply",a={method:"cancel",friend:e.model.id},e.apiMethod(i,a,"shanhaoyou")):n.cancel;case 1:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}()})},wiatfor:function(){var e=this;t.showModal({title:"提示",content:"申请中,是否要撤回申请?",success:function(){var t=r(o.default.mark((function t(n){var i,a;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n.confirm?(i="/user/friend/apply",a={method:"roll",friend:e.model.id},e.apiMethod(i,a,"cancelApply")):n.cancel;case 1:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}()})},apiMethod:function(e,n,o){var i=this;console.info(o,n);var a=this;a.$http.post(e,n).then((function(e){if(200===e.data.code)switch(o){case"guanzhu":a.model.collect=1;break;case"quguan":a.model.collect=0;break;case"jiahaoyou":a.model.friend=2;break;case"shanhaoyou":a.model.friend=0,a.$u.toast("已解除笔友");break;case"cancelApply":a.model.friend=0,a.$u.toast("已撤回申请");break;default:break}else 501===e.data.code?setTimeout((function(){t.hideLoading(),a.$store.dispatch("Logout")}),800):i.$u.toast(e.data.message)})).catch((function(t){t.message;console.info("apiMethod:",t)})).finally((function(){}))},handlePreImage:function(){t.previewImage({urls:this.model.images})},handleOperate:function(e,n){if(console.info("sttttt::",e),console.info("sttttt::",n),"delete"===e){var o="/hole/note/remove",i={id:n},a=this;a.$http.post(o,i).then((function(e){200===e.data.code?a.reLoadData(a.mingpian.friend):501===e.data.code?setTimeout((function(){t.hideLoading(),a.$store.dispatch("Logout")}),800):a.$u.toast(e.data.message)})).catch((function(t){t.message;console.info("handleDelete:",t)})).finally((function(){}))}},tosixin:function(){if(this.isLogin)if(1===this.model.priMsgStatus){var e=s(s({},this.model),{},{friend:this.model.id});t.navigateTo({url:"../../pages/msg/sixin?params="+encodeURIComponent(JSON.stringify(e))})}else this.$u.toast("对方未开启私信");else this.$u.toast("未登录"),setTimeout((function(){t.reLaunch({url:"../home/home"})}),600)}},onPageScroll:function(t){this.scrollTop=t.scrollTop}};e.default=f}).call(this,n("543d")["default"])}},[["1b94","common/runtime","common/vendor"]]]);