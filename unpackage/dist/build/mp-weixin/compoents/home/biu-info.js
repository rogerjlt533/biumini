(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["compoents/home/biu-info"],{"9e3c":function(t,e,i){"use strict";i.r(e);var n=i("fd4f"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},a205:function(t,e,i){"use strict";var n=i("f326"),a=i.n(n);a.a},c2ef:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uImage:function(){return i.e("uview-ui/components/u-image/u-image").then(i.bind(null,"4bb9"))},uButton:function(){return i.e("uview-ui/components/u-button/u-button").then(i.bind(null,"5352"))}},a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},cc19:function(t,e,i){"use strict";i.r(e);var n=i("c2ef"),a=i("9e3c");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("a205");var u,r=i("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"02287124",null,!1,n["a"],u);e["default"]=c.exports},f326:function(t,e,i){},fd4f:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t,e,i,n,a,o,u){try{var r=t[o](u),c=r.value}catch(s){return void i(s)}r.done?e(c):Promise.resolve(c).then(n,a)}function u(t){return function(){var e=this,i=arguments;return new Promise((function(n,a){var u=t.apply(e,i);function r(t){o(u,n,a,r,c,"next",t)}function c(t){o(u,n,a,r,c,"throw",t)}r(void 0)}))}}var r={name:"BiuInfo",props:{biuXinxi:{type:Object,default:function(){return{}}}},data:function(){return{arrowRightUrl:"../../../static/treehole/biu/jiantou-right.png",deleteUrl:"../../../static/treehole/hmd-delete.png",sixinUrl:["../../../static/bar-xinxi-0.png","../../../static/bar-xinxi-1.png"],imgSize:"80rpx",biuImgList:["../../../static/treehole/biu/biu-xinjian.png","../../../static/treehole/biu/biu-email-and-xj.png","../../../static/treehole/biu/biu-email.png"],tipImaList:["../../../static/treehole/biu/wd-biu-yfc-small.png","../../../static/treehole/biu/wd-biu-yfc-small.png","../../../static/treehole/biu/biu-email-and-xj.png","../../../static/treehole/biu/biu-email.png"],tipImaListIndex:0,btnImgList:["../../static/treehole/biu/wd-biu-yfc-small.png","../../static/treehole/biu/wd-biu-emal-sd.png"],letter:{logId:"",time:"",label:""}}},created:function(){this.letter.label=this.biuXinxi.communicateInfo.label,this.letter.time=this.biuXinxi.communicateInfo.logTime,this.letter.logId=this.biuXinxi.communicateInfo.logId},methods:{handleLink:function(){this.$emit("link2page")},copy:function(e){var i=this;t.setClipboardData({data:e,success:function(){i.$u.toast("复制成功")}})},deleteFriend:function(){var e=this;t.showModal({title:"提示",content:"您确定要删除笔友吗？",success:function(){var t=u(n.default.mark((function t(i){var a;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:i.confirm?(console.info("您确定要删除笔友吗",e.biuXinxi),a={method:"cancel",friend:e.biuXinxi.friend},e.deleteFriendMethod(a)):i.cancel;case 1:case"end":return t.stop()}}),t)})));function i(e){return t.apply(this,arguments)}return i}()})},sixinFriend:function(){if(console.info("biuXinxi:4.26..:",this.biuXinxi.priMsgStatus),1===this.biuXinxi.priMsgStatus){var e=this.biuXinxi;t.navigateTo({url:"../../pages/msg/sixin?params="+encodeURIComponent(JSON.stringify(e))})}else this.$u.toast("对方未开启私信")},deleteFriendMethod:function(e){var i=this,n="/user/friend/apply";i.$http.post(n,e).then((function(e){var n=e.data;console.info(n),501===n.code&&setTimeout((function(){t.hideLoading(),i.$store.dispatch("Logout")}),800)})).catch((function(t){var e=t.message;console.info("error:",e)})).finally((function(){i.$emit("reload")}))},link2HisList:function(){t.navigateTo({url:"../../pages/msg/hislist?params="+encodeURIComponent(JSON.stringify(this.biuXinxi))})},mail2send:function(){var e=this;t.showModal({title:"提示",content:"您确定已发送信件吗？",success:function(){var t=u(n.default.mark((function t(i){var a;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:i.confirm?(a={method:"send",friend:e.biuXinxi.id},e.send7receive(a)):i.cancel;case 1:case"end":return t.stop()}}),t)})));function i(e){return t.apply(this,arguments)}return i}()})},mail2receive:function(){var e=this;t.showModal({title:"提示",content:"您确定已接收信件吗？",success:function(){var t=u(n.default.mark((function t(i){var a;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:i.confirm?(a={method:"receive",friend:e.biuXinxi.id},e.send7receive(a)):i.cancel;case 1:case"end":return t.stop()}}),t)})));function i(e){return t.apply(this,arguments)}return i}()})},send7receive:function(e){var i=this,n="/user/friend/letter";t.showLoading({mask:!0,title:"send"===e.method?"正在寄送":"正在接收"}),i.$http.post(n,e).then((function(n){var a=n.data;if(t.hideLoading(),200===a.code){i.letter.logId=a.data.log,i.letter.time=a.data.time,i.letter.label=a.data.label;var o="send"===e.method?"寄送成功":"接收成功";i.$u.toast(o)}else 501===a.code?setTimeout((function(){t.hideLoading(),i.$store.dispatch("Logout")}),800):i.$u.toast(a.message)})).catch((function(e){t.hideLoading();var i=e.message;console.info("err::",i)})).finally((function(){}))}}};e.default=r}).call(this,i("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'compoents/home/biu-info-create-component',
    {
        'compoents/home/biu-info-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("cc19"))
        })
    },
    [['compoents/home/biu-info-create-component']]
]);
