(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["compoents/home/tree-hole"],{"281e":function(t,e,n){"use strict";n.r(e);var i=n("cfc6"),o=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=o.a},"3c6b":function(t,e,n){"use strict";n.r(e);var i=n("d3df"),o=n("281e");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("4f91");var s,a=n("f0c5"),r=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"0d040589",null,!1,i["a"],s);e["default"]=r.exports},"4f91":function(t,e,n){"use strict";var i=n("6ef7"),o=n.n(i);o.a},"6ef7":function(t,e,n){},cfc6:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"TreeHole",components:{},props:{isLogin:{type:Boolean,default:!1},isFriend:{type:Boolean,default:!1},letter:{type:Object,default:{}},idx:{type:Number,default:0}},created:function(){this.getCommentList({mine:1,note:this.letter.id,page:1,size:this.pageSize})},computed:{labelTag:function(){return this.letter.label_tag?"#"+this.letter.label_tag+"#":""}},data:function(){return{gifCount:0,dianzanOver:!0,disabled:!1,pageSize:99,comment_num:0,is_commented:0,commentList:[],showKey:!1,focus:!1,placeholder:"",content:"",lockUrl:"../../static/treehole/biu/biu-lock.png",nimingUrl:"../../static/treehole/linjian/biu-niming.png",customStyleGrid:{margin:"-20rpx 0"},pinglunIcons:["../../../static/treehole/biu/pinglun-0.png","../../../static/treehole/biu/pinglun-1.png"],dianzanIcons:["../../../static/treehole/biu/dianzan-0.png","../../../static/treehole/biu/dianzan-1.png"],gif:"http://biuimage.juqihui.cn/baobao.gif",gifsrc:"",menuUrl:["../../../static/treehole/biu/sd-share.png","../../../static/treehole/my/wd-guanzhu.png","../../../static/treehole/biu/sd-jubao.png","../../../static/treehole/my/wd-bianji.png","../../../static/treehole/biu/biu-lahei.png","../../../static/treehole/biu/biu-lahei.png"],customStyle:{"background-color":"rgba(0, 0, 0, 0.05)",border:"1px solid rgba(174, 159, 130, 0.2)","border-radius":"16rpx"},showMenu:!1,left:0,top:0,pointUrl:"../../static/treehole/biu/point.png",menuBtnStyle:{"padding-left":"10rpx",border:"none","font-size":"32rpx",color:"#AE9F82","background-color":"#F5F5F5"}}},onShareAppMessage:function(t){return this.showMenu=!1,{title:"欢迎来到我的树洞",path:"/pages/user/biu"}},methods:{handleDianzan:function(){var t=this;this.dianzanOver?(this.dianzanOver=!1,this.gifCount++,0===this.letter.is_favor?(this.gifsrc=this.gif+"?"+(new Date).getTime(),this.$emit("handleDianzan")):(this.gifCount=0,this.$emit("handleDianzan")),setTimeout((function(){t.dianzanOver=!0}),3e3)):this.$u.toast("太快了,休息一下吧~")},handleOperate:function(t){this.showMenu||(this.left=Math.ceil(t.detail.x)-60,this.top=Math.ceil(t.touches[0].clientY)+10),this.showMenu=!0},handleFenxiang:function(){this.showMenu=!1,this.$emit("operate","share")},handleGuanzhu:function(){if(!this.isLogin)return this.$u.toast("未登录"),void(this.showMenu=!1);this.showMenu=!1,this.$emit("operate","guanzhu",this.letter.user,this.idx)},handleJubao:function(){if(!this.isLogin)return this.$u.toast("未登录"),void(this.showMenu=!1);this.showMenu=!1,this.$emit("operate","jubao",this.letter.user,this.idx)},handleLahei:function(){if(!this.isLogin)return this.$u.toast("未登录"),void(this.showMenu=!1);this.showMenu=!1,this.$emit("operate","lahei",this.letter.user,this.idx)},link2page:function(){this.$emit("link2page")},handleEdit:function(){this.showMenu=!1,t.navigateTo({url:"../../pages/forest/write?params="+encodeURIComponent(JSON.stringify(this.letter))})},handleDelete:function(){this.showMenu=!1,this.$emit("operate","delete",this.letter.id,this.idx)},handlePreImage:function(e){t.previewImage({current:e,urls:this.letter.images})},popupClose:function(){this.focus=!1},openPinglun:function(){if(!this.isLogin)return this.$u.toast("未登录"),void(this.showMenu=!1);0===this.letter.allow_comment?(this.$u.toast("对方关闭了评论"),this.placeholder="对方关闭了评论",this.disabled=!0,this.showMenu=!1):this.$emit("openPinglun")},submit:function(){if(!this.isLogin)return this.$u.toast("未登录"),void(this.showMenu=!1);var e="/hole/note/comment",n={method:"note",note:this.letter.id,content:this.content},i=this;i.disabled=!0,i.$http.post(e,n).then((function(e){var n=e.data;200===n.code?(i.letter.comment_num++,i.letter.is_commented=1,i.content="",i.getCommentList({mine:1,note:i.letter.id,page:1,size:i.pageSize}),i.showKey=!1):501===n.code&&setTimeout((function(){t.hideLoading(),i.$store.dispatch("Logout")}),800)})).catch((function(t){var e=t.message;i.$tip.error(e)})).finally((function(){i.disabled=!1}))},getCommentList:function(e){if(this.isLogin){var n=this;n.$http.post("/hole/note/comment/list",e).then((function(e){var i=e.data;200===i.code?n.commentList=i.data.list:501===i.code&&setTimeout((function(){t.hideLoading(),n.$store.dispatch("Logout")}),800)})).catch((function(t){var e=t.message;n.$tip.error(e)})).finally((function(){}))}}}};e.default=n}).call(this,n("543d")["default"])},d3df:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var i={uParse:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-parse/u-parse")]).then(n.bind(null,"c60b"))},uGrid:function(){return n.e("uview-ui/components/u-grid/u-grid").then(n.bind(null,"16cb"))},uGridItem:function(){return n.e("uview-ui/components/u-grid-item/u-grid-item").then(n.bind(null,"7f6d"))},uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"4bb9"))},uMask:function(){return n.e("uview-ui/components/u-mask/u-mask").then(n.bind(null,"5d73"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"5352"))},uGap:function(){return n.e("uview-ui/components/u-gap/u-gap").then(n.bind(null,"ffb8"))},uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"5c2c"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"7fd0"))}},o=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.showMenu=!1})},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'compoents/home/tree-hole-create-component',
    {
        'compoents/home/tree-hole-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3c6b"))
        })
    },
    [['compoents/home/tree-hole-create-component']]
]);
