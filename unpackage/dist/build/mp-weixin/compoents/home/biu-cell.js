(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["compoents/home/biu-cell"],{"30ac":function(e,n,t){"use strict";t.r(n);var u=t("c6f8"),i=t("485e");for(var c in i)"default"!==c&&function(e){t.d(n,e,(function(){return i[e]}))}(c);t("d99c");var r,a=t("f0c5"),o=Object(a["a"])(i["default"],u["b"],u["c"],!1,null,"5ed4f8ef",null,!1,u["a"],r);n["default"]=o.exports},"485e":function(e,n,t){"use strict";t.r(n);var u=t("d92c"),i=t.n(u);for(var c in u)"default"!==c&&function(e){t.d(n,e,(function(){return u[e]}))}(c);n["default"]=i.a},c02f:function(e,n,t){},c6f8:function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return c})),t.d(n,"a",(function(){return u}));var u={uGrid:function(){return t.e("uview-ui/components/u-grid/u-grid").then(t.bind(null,"16cb"))},uGridItem:function(){return t.e("uview-ui/components/u-grid-item/u-grid-item").then(t.bind(null,"7f6d"))},uTag:function(){return t.e("uview-ui/components/u-tag/u-tag").then(t.bind(null,"8281"))}},i=function(){var e=this,n=e.$createElement;e._self._c},c=[]},d92c:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={name:"BiuCell",props:{idx:{type:Number,default:0},biuInfo:{type:Object,default:{}}},created:function(){},data:function(){return{customStyle:{margin:"-16rpx 0"},txfsUrls:["../../static/treehole/biu/biu-xinjian.png","../../static/treehole/biu/biu-xinjian.png","../../static/treehole/biu/biu-email.png","../../static/treehole/biu/biu-email-and-xj.png"]}},methods:{handleClick:function(){this.$emit("link2page",this.biuInfo.id)},handlePreImage:function(n){e.previewImage({current:n,urls:this.biuInfo.images})}}};n.default=t}).call(this,t("543d")["default"])},d99c:function(e,n,t){"use strict";var u=t("c02f"),i=t.n(u);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'compoents/home/biu-cell-create-component',
    {
        'compoents/home/biu-cell-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("30ac"))
        })
    },
    [['compoents/home/biu-cell-create-component']]
]);