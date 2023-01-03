(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__E1990E7",
    appName: "Biu笔友",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.5",
    uniRuntimeVersion: "3.6.5",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "__UNI__E1990E7",
      appName: "Biu笔友",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);

  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initUnknownHooks(mpOptions, vueOptions) {var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {return initHook$1(mpOptions, hook, excludes);});
}

function findHooks(vueOptions) {var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}

function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Biu笔友","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ?
  event.detail.__args__ || [event.detail] :
  [event.detail];

  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }

  var extraObj = processEventExtra(vm, extra, event, __args__);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 13:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 14:
/*!*********************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/store/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 15));
var _api = _interopRequireDefault(__webpack_require__(/*! @/api/api */ 16));
var _constants = __webpack_require__(/*! @/common/util/constants */ 28);




var _configService = _interopRequireDefault(__webpack_require__(/*! @/common/service/config.service.js */ 29));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: {
    isLogin: false, //用于判断是否注册已经是合法的笔友
    isAuth: false, //用于判断，是否已经取得微信授权，也就是说是否获得了token
    token: '',
    userInfo: {
      isPenuser: -1 } },


  mutations: {
    SET_TOKEN: function SET_TOKEN(state, token) {
      state.token = token;
      console.log("==>token111111", token);
      if (token === '') {
        state.isLogin = false;
        state.isAuth = false;
        state.userInfo = {
          isPenuser: -1 };

        uni.setStorageSync("token", token);
      } else {
        _api.default.initUserinfo().then(function (response) {
          if (response.data.code === 200) {
            state.isLogin = true;
            var result = response.data;
            state.userInfo = result.data;
            if (state.userInfo.isPenuser === 1) {
              state.isAuth = true;
            } else {
              state.isAuth = false;
            }
            console.info("======SET_TOKEN======", state.userInfo);
            /*未读消息*/
            _api.default.getMsgTip().then(function (res) {
              var _result = res.data;
              // console.info("============1111======", _result.data)
              if (_result.code === 200) {
                if (_result.data.message > 0 ||
                _result.data.public > 0 ||
                _result.data.private > 0 ||
                _result.data.notice > 0) {
                  uni.showTabBarRedDot({
                    index: 2 });

                } else {
                  uni.hideTabBarRedDot({
                    index: 2 });

                }
              }
            }).catch(function (err) {
              uni.hideTabBarRedDot({
                index: 2 });

            }).finally(function () {});

            /*未读消息*/
          } else {
            state.token = '';
            state.isLogin = false;
            state.isAuth = false;
          }
        }).catch(function (error) {
          uni.hideTabBarRedDot({
            index: 2 });

          // console.log("catch==>response", response)
        });
      }
    },
    // SET_AVATAR: (state, avatar) => {
    // 	state.avatar = avatar
    // },
    setUserinfo: function setUserinfo(state, data) {
      state.isLogin = true;
      state.userInfo = data;
    }
    // setNickname(state, data) {
    // 	state.nickName = data.nickName
    // 	state.avatarUrl = data.avatarUrl
    // 	//补充
    // 	state.userInfo.nick = data.nickName
    // 	state.userInfo.image = data.avatarUrl
    // },
  },
  actions: {
    setToken: function setToken(context, data) {
      uni.setStorageSync("token", data);
      context.commit('SET_TOKEN', data);
    },
    // setNickname(context, data) {
    // 	context.commit('setNickname', data)
    // },
    setUserinfo: function setUserinfo(context, data) {
      context.commit('setUserinfo', data);
    },
    mRegister: function mRegister(context, result) {
      var userInfo = result.userInfo;
      uni.setStorageSync(_constants.ACCESS_TOKEN, result.token);
      uni.setStorageSync(_constants.USER_INFO, userInfo);
      context.commit('SET_TOKEN', result.token);
      console.info("store.js::", result);
    },
    initUserinfo: function initUserinfo(_ref)

    {var commit = _ref.commit;
      return new Promise(function (resolve, reject) {
        _api.default.initUserinfo().then(function (response) {
          if (response.data.code === 200) {
            var result = response.data.result;
            // console.info("initUserinfo::", result)
            resolve(response);
          } else {
            resolve(response);
          }
        }).catch(function (error) {
          // console.log("catch===>response", response)
          reject(error);
        });
      });
    },
    Logoff: function Logoff(_ref2)

    {var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        _api.default.logoff().then(function (response) {
          if (response.data.code === 200) {
            commit('SET_TOKEN', '');
            uni.switchTab({
              url: '/pages/index/index' });

          } else {
            resolve(response);
          }
        }).catch(function (error) {
          console.log("catch===>response", response);
          reject(error);
        });
      });
    },
    // 登出
    Logout: function Logout(_ref3)


    {var commit = _ref3.commit,state = _ref3.state;
      return new Promise(function (resolve) {
        var logoutToken = state.token;
        commit('SET_TOKEN', '');
        console.info("exiting......");
        uni.switchTab({
          url: '/pages/index/index' });

      });
    } },


  getters: {
    token: function token(state) {return state.token;},
    userid: function userid(state) {
      state.userid = uni.getStorageSync(_constants.USER_INFO).id;
      return state.userid;
    },
    userInfo: function userInfo(state) {return state.userInfo;} } });exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 16:
/*!*****************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/api/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _service = __webpack_require__(/*! @/common/service/service.js */ 17);


var _configService = _interopRequireDefault(__webpack_require__(/*! @/common/service/config.service.js */ 29));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var apiService = {

  /**
                    * 登录
                    */
  // login(params) {
  // 	return http.post('/sys/mLogin',params)	
  // },
  /**
   * 退出
   */
  // logout(params) {
  // 	return http.post('/sys/logout',params);
  // },


  /*注销*/
  logoff: function logoff() {
    return _service.http.post("/user/cancel");
  },

  initUserinfo: function initUserinfo() {
    return _service.http.post("/my/info");
  },

  getNoticeAuthList: function getNoticeAuthList() {
    return _service.http.post("/user/notice/auth/list");
  },

  /**
      * 获取文件访问路径
      * @param avatar
      * @param subStr
      * @returns {*}
      */
  getFileAccessHttpUrl: function getFileAccessHttpUrl(avatar, subStr) {
    if (!subStr) subStr = 'http';
    if (avatar && avatar.startsWith(subStr)) {
      return avatar;
    } else {
      return _configService.default.staticDomainURL + "/" + avatar;
    }
  },

  getMsgTip: function getMsgTip() {
    return _service.http.post("/user/message/tip");
  } };var _default =



apiService;exports.default = _default;

/***/ }),

/***/ 17:
/*!********************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/service/service.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.http = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 18));var _index = _interopRequireDefault(__webpack_require__(/*! @/common/luch-request/index.js */ 21));
var _constants = __webpack_require__(/*! @/common/util/constants.js */ 28);


var _configService = _interopRequireDefault(__webpack_require__(/*! ./config.service.js */ 29));
var _tip = _interopRequireDefault(__webpack_require__(/*! @/common/util/tip.js */ 30));
var _index2 = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 14));
var _vuex = __webpack_require__(/*! vuex */ 15);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




var apiUrl = _configService.default.apiUrl;

var getTokenStorage = function getTokenStorage() {
  var token = '';
  try {
    token = uni.getStorageSync(_constants.ACCESS_TOKEN);
    console.log("getTokenStorage1", token);
  } catch (e) {
    //TODO handle the exception
    console.log("getTokenStorage", token);
  }
  return token;
};



var http = new _index.default();exports.http = http;
http.setConfig(function (config) {
  /* 设置全局配置 */
  config.baseUrl = apiUrl; /* 根域名不同 */
  config.header = _objectSpread({},
  config.header);

  return config;
});

/**
     * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
     * @param { Number } statusCode - 请求响应体statusCode（只读）
     * @return { Boolean } 如果为true,则 resolve, 否则 reject
     */
// 有默认，非必写
http.validateStatus = function (statusCode) {
  return statusCode === 200;
};
// console.info("http::", http)
http.interceptor.request(function (config, cancel) {
  /* 请求之前拦截器 */
  config.header = _objectSpread(_objectSpread({},
  config.header), {}, {
    'token': getTokenStorage() });

  /*
                                   if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
                                     cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
                                   }
                                   */
  return config;
});

// 必须使用异步函数，注意
http.interceptor.response( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(response) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt("return",




            response);case 1:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}(),
function (response) {
  // 请求错误做点什么
  console.log("请求错误做点什么", response);
  if (response) {
    var data = response.data;
    // const token = uni.getStorageSync(ACCESS_TOKEN)
    // console.log("------异常响应------", token)
    console.log("------异常响应------", data.status);
    switch (data.status) {
      case 403:
        _tip.default.error('拒绝访问');
        break;
      case 501:
        // let timeout = setTimeout(() => tip.error('登录已过期'), 500);
        uni.showLoading({
          mask: true,
          title: '登录已过期' });

        setTimeout(function () {
          uni.hideLoading();
          _index2.default.commit('SET_TOKEN', '');
          uni.setStorageSync("token", '');
          uni.switchTab({
            url: '/pages/index/index' });

        }, 800);
        break;
      case 404:
        break;
      case 503:
        _tip.default.error(data.message);
        break;
      case 401:
        break;
      default:
        console.log(data.message);
        _tip.default.error({
          duration: 0,
          forbidClick: true,
          message: data.message });

        break;}

  }
  return response;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 19);

/***/ }),

/***/ 19:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 20);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 21:
/*!***********************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/luch-request/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),

/***/ 215:
/*!*************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/util/province.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var provinceData = [{
  "label": "北京市",
  "value": "11" },
{
  "label": "天津市",
  "value": "12" },
{
  "label": "河北省",
  "value": "13" },
{
  "label": "山西省",
  "value": "14" },
{
  "label": "内蒙古自治区",
  "value": "15" },
{
  "label": "辽宁省",
  "value": "21" },
{
  "label": "吉林省",
  "value": "22" },
{
  "label": "黑龙江省",
  "value": "23" },
{
  "label": "上海市",
  "value": "31" },
{
  "label": "江苏省",
  "value": "32" },
{
  "label": "浙江省",
  "value": "33" },
{
  "label": "安徽省",
  "value": "34" },
{
  "label": "福建省",
  "value": "35" },
{
  "label": "江西省",
  "value": "36" },
{
  "label": "山东省",
  "value": "37" },
{
  "label": "河南省",
  "value": "41" },
{
  "label": "湖北省",
  "value": "42" },
{
  "label": "湖南省",
  "value": "43" },
{
  "label": "广东省",
  "value": "44" },
{
  "label": "广西壮族自治区",
  "value": "45" },
{
  "label": "海南省",
  "value": "46" },
{
  "label": "重庆市",
  "value": "50" },
{
  "label": "四川省",
  "value": "51" },
{
  "label": "贵州省",
  "value": "52" },
{
  "label": "云南省",
  "value": "53" },
{
  "label": "西藏自治区",
  "value": "54" },
{
  "label": "陕西省",
  "value": "61" },
{
  "label": "甘肃省",
  "value": "62" },
{
  "label": "青海省",
  "value": "63" },
{
  "label": "宁夏回族自治区",
  "value": "64" },
{
  "label": "新疆维吾尔自治区",
  "value": "65" },
{
  "label": "台湾",
  "value": "71" },
{
  "label": "香港",
  "value": "81" },
{
  "label": "澳门",
  "value": "82" }];var _default =

provinceData;exports.default = _default;

/***/ }),

/***/ 22:
/*!******************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/luch-request/core/Request.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 18));










var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 23));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ./buildFullPath */ 25));
var _utils = __webpack_require__(/*! ../utils */ 24);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var

Request = /*#__PURE__*/function () {function Request() {var _this = this;_classCallCheck(this, Request);_defineProperty(this, "config",
    {
      baseUrl: '',
      header: {},
      method: 'GET',
      dataType: 'json',

      responseType: 'text',

      custom: {},

      timeout: 30000 });_defineProperty(this, "interceptor",














    {
      /**
       * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
       */
      request: function request(cb) {
        if (cb) {
          _this.requestBeforeFun = cb;
        }
      },
      /**
          * @param {Request~responseCallback} cb 响应拦截器，对响应数据做点什么
          * @param {Request~responseErrCallback} ecb 响应拦截器，对响应错误做点什么
          */
      response: function response(cb, ecb) {
        if (cb) {
          _this.requestComFun = cb;
        }
        if (ecb) {
          _this.requestComFail = ecb;
        }
      } });_defineProperty(this, "requestBeforeFun",


    function (config) {
      return config;
    });_defineProperty(this, "requestComFun",

    function (response) {
      return response;
    });_defineProperty(this, "requestComFail",

    function (response) {
      return response;
    });}_createClass(Request, [{ key: "validateStatus",

    /**
                                                         * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
                                                         * @param { Number } statusCode - 请求响应体statusCode（只读）
                                                         * @return { Boolean } 如果为true,则 resolve, 否则 reject
                                                         */value: function validateStatus(
    statusCode) {
      return statusCode === 200;
    }

    /**
       * @Function
       * @param {Request~setConfigCallback} f - 设置全局默认配置
       */ }, { key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    }

    /**
       * @Function
       * @param {Object} options - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this2 = this;var options,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};return _context.abrupt("return",
                new Promise(function (resolve, reject) {
                  options.baseUrl = _this2.config.baseUrl;
                  options.dataType = options.dataType || _this2.config.dataType;

                  options.responseType = options.responseType || _this2.config.responseType;


                  options.timeout = options.timeout || _this2.config.timeout;




                  options.url = options.url || '';
                  options.data = options.data || {};
                  options.params = options.params || {};
                  options.header = _objectSpread(_objectSpread({}, _this2.config.header), options.header || {});
                  options.method = options.method || _this2.config.method;
                  options.custom = _objectSpread(_objectSpread({}, _this2.config.custom), options.custom || {});



                  options.getTask = options.getTask || _this2.config.getTask;
                  var next = true;
                  var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options;
                    var err = {
                      errMsg: t,
                      config: config };

                    reject(err);
                    next = false;
                  };

                  var handleRe = _objectSpread({}, _this2.requestBeforeFun(options, cancel));
                  var _config = _objectSpread({}, handleRe);
                  if (!next) return;
                  var requestTask = uni.request({
                    url: (0, _buildURL.default)((0, _buildFullPath.default)(_config.baseUrl, _config.url), _config.params),
                    data: _config.data,
                    header: _config.header,
                    method: _config.method,

                    timeout: _config.timeout,

                    dataType: _config.dataType,

                    responseType: _config.responseType,







                    complete: function complete(response) {
                      response.config = handleRe;
                      if (_this2.validateStatus(response.statusCode)) {// 成功
                        response = _this2.requestComFun(response);
                        resolve(response);
                      } else {
                        response = _this2.requestComFail(response);
                        reject(response);
                      }
                    } });

                  if (handleRe.getTask) {
                    handleRe.getTask(requestTask, handleRe);
                  }
                }));case 2:case "end":return _context.stop();}}}, _callee);}));function request() {return _request.apply(this, arguments);}return request;}() }, { key: "get", value: function get(


    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.request(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url, _ref)
















    {var _this3 = this;var filePath = _ref.filePath,name = _ref.name,_ref$header = _ref.header,header = _ref$header === void 0 ? {} : _ref$header,_ref$formData = _ref.formData,formData = _ref$formData === void 0 ? {} : _ref$formData,_ref$custom = _ref.custom,custom = _ref$custom === void 0 ? {} : _ref$custom,_ref$params = _ref.params,params = _ref$params === void 0 ? {} : _ref$params,getTask = _ref.getTask;
      return new Promise(function (resolve, reject) {
        var next = true;
        var globalHeader = _objectSpread({}, _this3.config.header);
        delete globalHeader['content-type'];
        delete globalHeader['Content-Type'];
        var pubConfig = {
          baseUrl: _this3.config.baseUrl,
          url: url,



          filePath: filePath,
          method: 'UPLOAD',
          name: name,
          header: _objectSpread(_objectSpread({}, globalHeader), header),
          formData: formData,
          params: params,
          custom: _objectSpread(_objectSpread({}, _this3.config.custom), custom),
          getTask: getTask || _this3.config.getTask };











        var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pubConfig;
          var err = {
            errMsg: t,
            config: config };

          reject(err);
          next = false;
        };

        var handleRe = _objectSpread({}, _this3.requestBeforeFun(pubConfig, cancel));
        var _config = {
          url: (0, _buildURL.default)((0, _buildFullPath.default)(handleRe.baseUrl, handleRe.url), handleRe.params),



          filePath: handleRe.filePath,
          name: handleRe.name,
          header: handleRe.header,
          formData: handleRe.formData,
          complete: function complete(response) {
            response.config = handleRe;
            try {
              // 对可能字符串不是json 的情况容错
              if (typeof response.data === 'string') {
                response.data = JSON.parse(response.data);
              }
              // eslint-disable-next-line no-empty
            } catch (e) {
            }
            if (_this3.validateStatus(response.statusCode)) {// 成功
              response = _this3.requestComFun(response);
              resolve(response);
            } else {
              response = _this3.requestComFail(response);
              reject(response);
            }
          } };











        if (!next) return;
        var requestTask = uni.uploadFile(_config);
        if (handleRe.getTask) {
          handleRe.getTask(requestTask, handleRe);
        }
      });
    } }, { key: "download", value: function download(

    url) {var _this4 = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var next = true;
        var pubConfig = {
          baseUrl: _this4.config.baseUrl,
          url: url,
          method: 'DOWNLOAD',
          header: _objectSpread(_objectSpread({}, _this4.config.header), options.header || {}),
          params: options.params || {},
          custom: _objectSpread(_objectSpread({}, _this4.config.custom), options.custom || {}),
          getTask: options.getTask || _this4.config.getTask };

        var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pubConfig;
          var err = {
            errMsg: t,
            config: config };

          reject(err);
          next = false;
        };

        var handleRe = _objectSpread({}, _this4.requestBeforeFun(pubConfig, cancel));
        if (!next) return;
        var requestTask = uni.downloadFile({
          url: (0, _buildURL.default)((0, _buildFullPath.default)(handleRe.baseUrl, handleRe.url), handleRe.params),
          header: handleRe.header,
          complete: function complete(response) {
            response.config = handleRe;
            if (_this4.validateStatus(response.statusCode)) {// 成功
              response = _this4.requestComFun(response);
              resolve(response);
            } else {
              response = _this4.requestComFail(response);
              reject(response);
            }
          } });

        if (handleRe.getTask) {
          handleRe.getTask(requestTask, handleRe);
        }
      });
    } }]);return Request;}();



/**
                               * setConfig回调
                               * @return {Object} - 返回操作后的config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - 全局默认config
                               */
/**
                                   * 请求拦截器回调
                                   * @return {Object} - 返回操作后的config
                                   * @callback Request~requestCallback
                                   * @param {Object} config - 全局config
                                   * @param {Function} [cancel] - 取消请求钩子，调用会取消本次请求
                                   */
/**
                                       * 响应拦截器回调
                                       * @return {Object} - 返回操作后的response
                                       * @callback Request~responseCallback
                                       * @param {Object} response - 请求结果 response
                                       */
/**
                                           * 响应错误拦截器回调
                                           * @return {Object} - 返回操作后的response
                                           * @callback Request~responseErrCallback
                                           * @param {Object} response - 请求结果 response
                                           */exports.default = Request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 23:
/*!**********************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/luch-request/helpers/buildURL.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 24));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),

/***/ 24:
/*!***********************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/luch-request/utils.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;
var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}


/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}


/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * 是否为boolean 值
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/***/ }),

/***/ 25:
/*!************************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/luch-request/core/buildFullPath.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 26));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),

/***/ 26:
/*!***************************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/luch-request/helpers/isAbsoluteURL.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),

/***/ 27:
/*!*************************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/luch-request/helpers/combineURLs.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
}

/***/ }),

/***/ 28:
/*!*******************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/util/constants.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.AQ_CONTENT = exports.USER_INFO = exports.USER_NAME = exports.ACCESS_TOKEN = void 0;var ACCESS_TOKEN = 'token';exports.ACCESS_TOKEN = ACCESS_TOKEN;
var USER_NAME = 'login_username';exports.USER_NAME = USER_NAME;
var USER_INFO = 'login_user_info';exports.USER_INFO = USER_INFO;

var AQ_CONTENT = [
'<p style="line-height: 1.5em;"><span style="font-size: 18px; font-family: 宋体, SimSun;"><strong>警惕诈骗存在的事实</strong></span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">随着科技日新月异，网路诈骗的行为愈加猖獗。2020年的报告指出，诈骗的案件创下历史新高，自2019年以来上升了65%以上。越来越多人成为身份遭盗窃、网路钓鱼和线上诈骗的受害者，每年造成数十亿美元的损失。</span></p><p><br/></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">我们知道在网路上交新朋友是一件令人兴奋的事，但许多危险潜藏在你的周围，使你可能会上当受骗。因此，我们将介绍给你在网路上认识新朋友时，应需要牢记在心的一些安全提示和危险信号。</span></p><p></p><p style="line-height: 1.5em;"><strong><span style="font-size: 14px; font-family: 宋体, SimSun;">如何避免遭到诈骗？</span></strong></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">一旦你意识到诈骗的蛛丝马迹，务必采取行动保护自己。以下为我们团队整理出的一些建议，帮助你避免成为诈骗的受害者。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 永远不要汇钱给任何你在网路上认识的人 – 即使他们说是紧急情况，也永远不要转帐给他们。而且这几乎不可能追踪到钱的去向，并将钱汇回。另外，千万不要向他人分享可能被用来访问你财务帐户的资讯。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 保护你的个人资料 – 你可能知道不应与刚认识的人分享明显的个人资料，例如你的银行账号和密码。然而，即使是关于你的日常生活细节（像是你每天早上会去咖啡店）、工作经验、家庭成员的资讯或照片，若是落入不肖之人手上，那也很危险。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 留在平台上交流 – 诈骗分子经常在早期阶段就试着转移对话至讯息应用程式或是电话上。这使他们能够更轻易地接近你，而不需要在BIU上匿名通信、摆脱我们的报告系统，并避免被我们的平台禁用。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 勿点击可疑的连结 – 可疑的连结可能与试图网路钓鱼有关。当你点击它们时，这可能会开启一个附件，而将恶意软体安装在你的装置上。有些病毒会损坏你的电脑，而另一些则会窃取你的个人资讯，并最终盗窃你的身份。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 警惕异地恋和海外恋情 – 如果有人没有与你见过面或了解你就想要和你发展一段认真的感情，你就应该要小心了。诈骗分子可能会说他们被困在了某个地方，并要求你提供金钱帮助以助他回家。如果对方不愿意接电话或视讯，又或者回避你的问题时，他们可能不是他们所说的那个人。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 在网路上搜寻他们的名字、电子邮件、照片 – 诈骗分子会盗用真实人物的名字和照片创建逼真的个人资料。对个人资料上的照片进行反向图片搜索可以帮助你发现真假个人资料之间的差别，其还可以确认该图片以前是否有被用于诈骗。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 行动前停下来与你信任的人谈谈。如果你不确定是否为诈骗，请向值得信赖的朋友和家人寻求第二意见。他们可能在这方面有更多的经验，可以为你提供进一步行动的建议。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 了解更多关于网路诈骗资讯 – 学习有关诈骗分子使用的话术和方法的基本知识，以及如何保护自己，这将可以防止日后发生类似事件。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-size: 14px; font-family: 宋体, SimSun;">如何分辨假的事物?</span></strong></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">“如果某件事好得令人难以置信，那也许就是不该相信。”</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">现在你知道避免受骗的基本诀窍了，以下为不同类型诈骗的一些常见的危险征象。一旦勾选了这些方框，请记得务必小心行事，并消除这些威胁。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">&nbsp;</span></p><p style="line-height: 1.5em;"><strong><span style="font-size: 14px; font-family: 宋体, SimSun;">诈骗分子的普遍特征</span></strong></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 要求你马上离开该平台 (例如转移到 Google Hangout、WhatsApp 等)</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 忽略你的问题，用类似的措辞重复着他们的故事</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 因紧急情况向你要求金钱，通常经由电汇方式 (例如微信支付、支付宝支付等)</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">不同类型诈骗分子的共同特征或关键词</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">爱情骗子</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 离婚或丧偶且有孩子</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 多元文化背景 (例如，我来自德国，但在义大利长大)</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 在海外和专业领域工作 (例如，钻井平台工作的私人承包商、执行维和任务的军人、修建道路的土木工程师、联合国的医生等)</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 没有真正见过你就迅速表白爱意</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 计划来找你，但总在最后一刻取消</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 声称需要钱来应付紧急情况、医疗费用、旅行机票或签证</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">投资骗子</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 做小生意的老板 (例如，咖啡店、精品店、花店等)</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 声称自己经常旅行，去过很多国家</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 利用空闲时间投资 (例如，外汇交易、虚拟货币等)</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 最近从投资中赚取了一笔财富</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 提供你赚钱的机会</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">慈善骗子</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 来自贫困国家的青少年孤儿</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 独自照顾年幼的弟弟妹妹和体弱亲属的人</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 声称他们的家庭成员目前生病和失业</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 无法负担食物、学费、医疗费用等</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 使用重复的措辞或情景编造故事以获得同情</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-size: 14px; font-family: 宋体, SimSun;">如何处理诈骗</span></strong></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">当你接触的人似乎符合一些典型诈骗分子的共同特征时，请尝试采取以下措施以避免成为网路诈骗的受害者。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 向我们的平台检举该诈骗 – 这步骤很重要，因为会将你与可针对你的情况而提供建议的人联系起来。检举你遇到的骗子也能从而保护其他人，并帮助他们避免面临同样的风险。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 停止与骗子的所有联系 – 一旦你发现自己是受害者，请停止与骗子的所有对话。挂断电话、封锁该号码、不要回覆骗子发送的电子邮件或信件。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 向你信任的人寻求建议 – 诈骗分子利用受害者因易受骗，而保守秘密并不愿说出来的优势。正如谚语说的：“旁观者清，当局者迷。”与你所信任的人谈谈并寻求建议可以防止你鲁莽行事并立即采取纠正措施。</span></p><p style="line-height: 1.5em;"><span style="font-size: 12px; font-family: 宋体, SimSun;">• 联络你汇款的银行或服务机构 –如果你是金融或信用卡诈骗的受害者，请立即联络你的银行。他们有处理诈骗案件的政策。随时都能提供帮助。当你发现与你互动的诈骗分子的任何危险信号时，请谨慎行事，并立即采取防范措施。</span></p>',
'<p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 18px;"><strong>隐私条款</strong></span></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">我们如何收集和使用您的个人信息</span></strong><br/></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息，包括姓名、出生日期、身份证件号码、个人生物识别信息、住址、通信联系方式、通信记录和内容、账号密码、财产信息、征信信息、行踪轨迹、住宿信息、健康生理信息、交易信息等。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息，包括身份证件号码、个人生物识别信息、银行账号、通信记录和内容、财产信息、征信信息、行踪轨迹、住宿信息、健康生理信息、交易信息、14周岁以下（含）儿童的个人信息等。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">个人信息以及个人敏感信息包含的内容均出自于GB/T35273《个人信息安全规范》。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;"><br/></span></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">您理解并同意：</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 我们致力于打造多样的产品和服务以满足您的需求。因我们向您提供的产品和服务种类众多，且不同用户选择使用的具体产品/服务范围存在差异，相应的，收集使用的个人信息类型、范围等会有所区别，请以具体的产品/服务功能为准；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 我们可能将通过某些功能所收集的信息用于我们的其他服务。例如，我们可能将你在使用我们某一功能或服务时我们收集的信息，在另一功能或服务中用于向你提供特定内容，包括展示广告、对你阅读过的内容进行信息安全类提示、基于特征标签进行间接人群画像并提供更加精准和个性化的服务和内容等。如我们使用您的个人信息，超出了与收集时所声称的目的及具有直接或合理关联的范围，我们将在使用您的个人信息前，再次向您告知并征得您的明示同意。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 为给您带来更好的产品和服务体验，我们在持续努力改进我们的技术，随之我们可能会不时推出新的或优化后的功能，可能需要收集、使用新的个人信息或变更个人信息使用目的或方式。对此，我们将通过更新本政策、弹窗、页面提示等方式另行向您说明对应信息的收集目的、范围及使用方式，并为您提供自主选择同意的方式，且在征得您明示同意后收集、使用。在此过程中，如果您有任何疑问、意见或建议的，您可通过我们提供的各种联系方式与我们联系，我们会尽快为您作出解答。</span></p><p><br/></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们所提供产品或服务的功能分别收集的个人信息类型，以及收集、使用个人信息的规则（例如收集和使用个人信息的目的、方式）如下：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">1、当您注册BIU服务时，我们会收集您的昵称、头像、性别、出生年份、通信地址、联系方式、电子邮箱。如您同意和授权我们将您的账户信息 （头像、昵称及其他页面提示的信息）授权给第三方以使您可以便捷地实现第三方账户的注册或登录的，我们会将您同意和授权的账户信息共享给第三方。此外， 我们可能会根据您的授权从第三方处获取您在第三方平台的注册账号相关信息（头像、昵称以及您授权的其他信息），并与您的BIU账户进行绑定，使您可通过第三方账户直接登录、使用我们的产品及/或服务。我们将在您授权同意的范围内使用您的相关信息。 在注册与使用服务过程中，如果您提供以下信息补全个人资料：出生年份、性别、通信方式、所在省份，将有助于我们给您提供更好的服务和体验，我们可以为您提供与以上信息相关的个性化服务。但如果您不提供这些信息，将会仅使您无法使用或参与与此相关的个性化服务，不会影响使用BIU产品或服务的基本功能。您提供的上述信息将在您使用本服务期间持续授权我们使用。在您主动注销账号时，我们将根据适用法律法规的要求尽快使其匿名或删除您的个人信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">2、当您注册并开始使用BIU各项服务时，为保障您正常使用我们的服务，维护我们服务的正常运行，改进及优化我们的服务体验以及保障您的帐号安全，我们会收集关于您使用的服务以及使用方式的信息并将这些信息进行关联，这些信息包括：设备信息：我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息（包括设备型号、操作系统版本、设置参数、设备配置、设备标识（IMEI/Android ID/OAID/IDFA/IDFV/UDID/SIM卡IMSI信息等）、设备序列号、MAC地址、设备网络信息(运营商信息/WIFI信息)、设备环境、软件列表等软硬件特征信息）、设备所在位置相关信息（包括您授权的GPS位置以及WLAN接入点、蓝牙和基站等传感器信息）。服务日志信息：当您使用我们的客户端提供的产品或服务时，我们会自动收集您对我们服务的详细使用情况，作为有关服务日志保存。包括您的浏览、点击查看和搜索查询内容、关注分享信息、发布信息，以及IP地址、浏览器的类型、运营商信息、使用的语言、访问日期和时间。 请注意，单独的设备信息、日志信息等是无法识别特定自然人身份的信息。如果我们将这类信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将该类个人信息做匿名化、去标识化处理。为向您提供更便捷、更符合您个性化需求的信息展示及推送服务，我们会根据您的设备信息和服务日志信息，提取您的偏好特征，并基于特征标签产出间接人群画像，用于展示、推送信息和可能的商业广告。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;"><br/></span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 当您使用BIU笔友、BIU树洞及其他信息发布功能公开发布信息，包括发布图文、发表评价及问答内容时，您需要相应的开启相册、相机权限来拍摄照片。请注意，您公开发布的信息中可能会涉及您或他人的个人信息甚至个人敏感信息，如您在发布动态时选择上传包含个人信息的图片。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。您上传的评论、点赞等信息会存储在我们的服务器中，因为存储是实现这一功能所必需的。我们会以加密的方式存储，您也可以随时删除这些信息。除非经您自主选择或遵从相关法律法规要求，我们不会对外提供上述动态信息，或者将其用于该功能以外的其他用途。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 当您选择与您感兴趣的人建立关注关系、通过我们提供的功能组件向其他第三方分享信息时，我们会收集包括您的关注关系、分享历史在内的服务日志信息用于实现上述功能及其他我们明确告知的目的。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 当您与我们联系或提出争议纠纷处理申请时，为了保障您的账户及系统安全，我们需要您提供必要的个人信息以核验您的用户身份。我们可能会保存您的通信/通话记录和内容（包括账号信息、您为了证明相关事实提供的其他信息，或您留下的联系方式信息），以便与您联系或帮助您解决问题，或记录相关问题的处理方案及结果。为了提供服务及改进服务质量的合理需要，我们还可能使用的您的其他信息，包括您与客服联系时您提供的相关信息，您参与问卷调查时向我们发送的问卷答复信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 为提高您使用我们及我们关联公司、合作伙伴提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或BIU相关协议规则的情况，我们可能使用或整合您的用户信息、交易信息、设备信息、有关网络日志以及我们关联公司、合作伙伴取得您授权或依据法律共享给我们的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 您可通过BIU账号在我们提供的链接入口使用我们关联公司提供的产品或服务，为便于我们基于关联账号共同向您提供一站式服务并便于您统一进行管理。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 您理解并同意，我们提供的服务可能需要您在您的设备中开启您的位置信息（地理位置）、摄像头（相机）、相册（图片库），以实现这些权限所涉及信息的收集和使用。我们会在您使用相关服务时弹窗提示您是否要开启相应权限。请您注意，您开启任一权限即代表您授权我们可以收集和使用相关个人信息来为您提供对应服务，您一旦关闭任一权限即代表您取消了授权，我们将不再基于对应权限继续收集和使用相关个人信息，也无法为您提供该权限所对应的服务。但是，您关闭权限的决定不会影响此前基于您的授权所进行的信息收集及使用。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 您知悉并同意，对于您在使用产品及/或服务的过程中提供的您的联系方式（例如：联系电话），我们在运营中可能会向其中的一种或多种发送多类通知，用于用户消息告知、身份验证、安全验证、用户使用体验调研等用途；此外，我们也可能会以短信、电话的方式，为您提供您可能感兴趣的服务、功能或活动等商业性信息的用途。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 若你提供的信息中含有其他用户的个人信息，在向BIU提供这些个人信息之前，您需确保您已经取得合法的授权。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 若我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的，或者我们主动从第三方处获取您的个人信息，均会事先获得您的同意。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 若我们从第三方处间接获取您的信息的，我们会在收集前明确以书面形式要求该第三方在已依法取得您同意后收集个人信息，并向您告知共享的信息内容，且涉及敏感信息的在提供给我们使用前需经过您的明确确认，要求第三方对个人信息来源的合法性和合规性作出承诺，如第三方有违反行为的，我们会明确要求对方承担相应法律责任；同时，我们的专业安全团队对个人信息会进行安全防护（包括敏感信息分级分类、敏感信息使用的访问控制、敏感信息加密存储等）。我们会使用不低于我们对自身用户个人信息同等的保护手段与措施对间接获取的个人信息进行保护。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">征得授权同意的例外</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">您充分理解并同意，我们在以下情况下收集、使用您的个人信息无需您的授权同意，且我们可能不会同意您提出的更正/修改、删除、注销、撤回同意、索取信息的请求：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 与我们履行法律法规规定的义务相关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 与国家安全、国防安全有关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 与公共安全、公共卫生、重大公共利益有关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 与犯罪侦查、起诉、审判和判决执行等有关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 所收集的个人信息是您自行向社会公众公开的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 根据您的要求签订合同所必需的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 为合法的新闻报道所必需的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 法律法规规定的其他情形。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">请知悉，根据适用的法律，若我们对个人信息采取技术措施和其他必要措施进行处理，使得数据接收方无法重新识别特定个人且不能复原，或我们可能会对收集的信息进行去标识化地研究、统计分析和预测，用于改善作所的内容和布局，为商业决策提供产品或服务支撑，以及改进我们的产品和服务（包括使用匿名数据进行机器学习或模型算法训练），则此类处理后数据的使用无需另行向您通知并征得您的同意。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">如我们停止运营作所产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，对所持有的个人信息进行删除或匿名化处理。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">我们如何使用 Cookie 和同类技术</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• Cookie</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">为确保平台正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，我们会在您的计算机或移动设备上存储名为 Cookie 的小数据文件。Cookie 通常包含标识符、站点名称以及一些号码和字符。借助于 Cookie，网站能够存储您的偏好等数据。您可在浏览器中进行相应的数据清除操作。如您进行清除，您可能无法使用由我们提供的、依赖于Cookie的服务或相应功能。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• Cookie同类技术</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">除 Cookie 外，我们还会在网站上使用其他同类技术。例如，我们向您发送的站内通知可能含有链接至我们网站内容的地址链接，如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您的产品或服务偏好以便于我们主动改善客户服务体验。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">我们如何共享、转让、公开披露您的个人信息</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们已知晓对外共享、转让、公开披露个人信息所承担的相应法律责任，我们仅会在本隐私政策约定的范围内共享、转让、公开披露您的个人信息：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 共享</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们不会与BIU服务提供者以外的公司、组织和个人共享您的个人信息，但以下情况除外：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">1、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">2、在法定情形下的共享：我们可能会根据法律法规规定、诉讼争议解决需要，或按行政、司法机关依法提出的要求，对外共享您的个人信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">3、在作所公司内内共享：为便于作所公司共同向您提供服务，推荐您可能感兴趣的信息，识别账号异常或保护作所公司或其他用户或公众的人身财产安全免遭侵害，您的个人信息可能会在作所内共享。我们只会共享必要的个人信息（如为便于您使用BIU账号使用作所公司内的产品或服务，我们会在作所公司内共享您必要的账户信息）且会受本隐私权政策中所声明目的的约束，如果我们共享您的个人敏感信息或关联公司改变个人信息的使用及处理目的，将再次征求您的授权同意。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">4、与授权合作伙伴共享：我们可能委托授权合作伙伴为您提供某些服务或代表我们履行职能，我们仅会出于本隐私权政策声明的合法、正当、必要、特定、明确的目的共享您的信息，授权合作伙伴只能接触到其履行职责所需信息，且不得将此信息用于其他任何目的。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">目前，我们的授权合作伙伴包括以下类型：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">（1）广告、分析服务类的授权合作伙伴。除非得到您的许可，否则我们不会将您的个人身份信息与提供广告、分析服务的合作伙伴共享。我们会委托这些合作伙伴处理与广告覆盖面和有效性相关的信息，但不会提供您的个人身份信息，或者我们将这些信息进行去标识化处理，以便它不会识别您个人。这类合作伙伴可能将上述信息与他们合法获取的其他数据相结合，以执行我们委托的广告服务或决策建议。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">（2）供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括提供技术基础设施服务、分析我们服务的使用方式、衡量广告和服务的有效性、提供客户服务、支付便利或进行学术研究和调查。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">5、为了使您能够使用下述服务及功能，我们的应用中会接入第三方SDK：《第三方SDK目录》</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们会对授权合作伙伴获取有关信息的应用程序接口（API）、软件工具开发包（SDK）进行严格的安全检测，并与授权合作伙伴约定严格的数据保护措施，令其按照我们的委托目的、服务说明、本隐私权政策以及其他任何相关的保密和安全措施来处理个人信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 转让</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">2、在涉及合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 公开披露</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们仅会在以下情况下，公开披露您的个人信息：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">1、获得您明确同意或基于您的主动选择，我们可能会公开披露您的个人信息；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">2、如果我们确定您出现违反法律法规或严重违反BIU相关协议规则的情况，或为保护BIU及其关联公司用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或BIU相关协议规则征得您同意的情况下披露关于您的个人信息，包括相关违规行为以及BIU已对您采取的措施。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 共享、转让、公开披露个人信息时事先征得授权同意的例外</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">1、与我们履行法律法规规定的义务相关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">2、与国家安全、国防安全有关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">3、与公共安全、公共卫生、重大公共利益有关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">4、与犯罪侦查、起诉、审判和判决执行等有关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">5、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">6、您自行向社会公众公开的个人信息；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">7、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">根据法律规定， 若我们对个人信息采取技术措施和其他必要措施进行处理，使得数据接收方无法重新识别特定个人且不能复原，则此类处理后数据的共享、转让、公开披露无需另行向您通知并征得您的同意。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">我们如何保护您的个人信息</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 我们努力为用户的个人信息提供安全保障，以防止用户个人信息的非法使用、未经授权的访问和披露、泄漏、损坏和丢失。我们将在合理的安全水平内使用各种安全保护措施以保障信息的安全。例如，我们会使用加密技术、匿名化处理、加密存储等手段来保护你的个人信息；建立受信赖的保护机制防止个人信息遭到恶意攻击；建立访问控制机制，遵守最小权限原则，确保只有授权人员才可访问个人信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 围绕数据生命周期进行的数据安全管理体系，从管理机构、组织建设、制度体系、产品技术等方面多维度提升整个系统的安全性。我们建立专门的管理制度、流程和组织以保障个人信息的安全。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务，并进行审计。若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并以推送通知、公告等形式告知您。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 我们会采取合理可行的措施，尽力避免收集无关的个人信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 互联网并非绝对安全的环境，我们强烈建议您不要使用非BIU推荐的通信方式发送个人信息。您可以通过我们的服务建立联系和相互分享。当您通过我们的服务创建交流或分享时，您可以自主选择沟通或分享的对象，作为能够看到您的联络方式、交流信息或分享内容等相关信息的第三方。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">如您发现自己的个人信息尤其是您的账户或密码发生泄露，请您立即联络BIU客服，以便我们根据您的申请采取相应措施。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">请注意，您在使用我们服务时自愿共享甚至公开分享的信息，可能会涉及您或他人的个人信息甚至个人敏感信息，如您在发表动态或者在BIU笔友或BIU树洞等公众场合选择上传包含个人信息的图片。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">请使用复杂密码，协助我们保证您的账号安全。我们将尽力保障您发送给我们的任何信息的安全性。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">您如何管理您的个人信息</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">您可以通过以下方式访问及管理您的个人信息：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 查询、更正和补充您的个人信息，并获取您的个人信息副本</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">您有权访问您的个人信息，法律法规规定的例外情况除外。您可以通过以下方式自行访问您的个人信息：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">账户信息——如果您希望访问或编辑您的账户中的个人通信信息，手机号码、邮箱地址等，您可以通过登录账号通过“我的”-“编辑”执行此类操作。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">如果您无法通过上述路径访问该等个人信息，您可以随时通过BIU客服与我们取得联系。我们将在20天内回复您的访问请求。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">对于您在使用我们的产品或服务过程中产生的其他个人信息，我们将根据本条“响应您的上述请求”中的相关安排向您提供。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 删除您的个人信息</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">您可以通过本条“查询、更正或补充您的个人信息，并获得您的个人信息副本”中列明的方式删除您的部分个人信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">在以下情形中，您可以向我们提出删除个人信息的请求：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">1、如果我们处理个人信息的行为违反法律法规；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">2、如果我们收集、使用您的个人信息，却未征得您的明确同意；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">3、如果我们处理个人信息的行为严重违反了与您的约定；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">4、如果您不再使用我们的产品或服务，或您主动注销了账号；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">5、如果我们永久不再为您提供产品或服务。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">若我们决定响应您的删除请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，要求其及时删除，除非法律法规另有规定，或这些主体获得您的独立授权。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">当您或我们协助您从我们的服务中删除信息后，依据相关法律法规的规定，我们可能不会立即从备份系统中删除相应的信息，我们将安全地存储您的个人信息并将其与任何进一步处理隔离，直到备份可以清除或实现匿名。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 改变您授权同意的范围</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">每个业务功能需要一些基本的个人信息才能得以完成（见本隐私权政策“第一条”）。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 个人信息主体注销账户</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">您可以自行在“我的”页面提交账户注销申请。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">在您主动注销账户之后，我们将停止为您提供产品或服务，根据适用法律的要求删除您的个人信息，或使其匿名化处理。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 约束信息系统自动决策</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将在不侵害BIU商业秘密或其他用户权益、社会公共利益的前提下提供申诉方法。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 响应您的上述请求</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们将在20天内做出答复。如您不满意，还可以通过BIU客服发起投诉。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将酌情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">在以下情形中，按照法律法规要求，我们将无法响应您的请求：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">1、与国家安全、国防安全有关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">2、与公共安全、公共卫生、重大公共利益有关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">3、与犯罪侦查、起诉、审判和执行判决等有关的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">4、有充分证据表明个人信息主体存在主观恶意或滥用权利的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">5、响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">6、涉及商业秘密的。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">我们如何处理未成年人的个人信息</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">任何18岁以下的未成年人均不得创建自己的用户账户及/或使用我们的服务。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用或披露未成年人的个人信息。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">我们如何存储您的个人信息</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们在中华人民共和国境内运营中收集和产生的您的个人信息，存储在中国境内。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">一般而言，我们自您使用服务时获取到您个人信息之日起至您注销账户后6个月内会存储并保留您的个人信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">在您的个人信息超出保留期间后，我们会根据适用法律的要求删除您的个人信息，或使其匿名化处理。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">当我们的产品或服务发生停止运营的情形时，我们将以推送通知、公告等形式通知您，并在合理的期限内删除您的个人信息或进行匿名化处理。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">本隐私权政策如何更新</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们的隐私权政策可能变更。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">未经您明确同意，我们不会限制您按照本隐私权政策所应享有的权利。对于重大变更，我们会提供显著的通知（包括我们会通过BIU公告的方式进行通知甚至向您提供弹窗提示）。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">本政策所指的重大变更包括但不限于：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 我们在控制权等方面发生重大变化。如并购重组等引起的所有者变更等；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 个人信息共享、转让或公开披露的主要对象发生变化；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 您参与个人信息处理方面的权利及其行使方式发生重大变化；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 个人信息安全影响评估报告表明存在高风险时。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">我们还会将本隐私权政策的旧版本存档，供您查阅。</span></p><p><br/></p><p><br/></p><p><br/></p>',
'<p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 18px;"><strong>用户协议</strong></span></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">帐号注册</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户在使用本服务前需要注册一个“BIU”帐号。“BIU”帐号应当使用手机号码绑定注册，请用户使用尚未与“BIU”帐号绑定的手机号码，以及未被作所公司根据本协议封禁的手机号码注册“BIU”帐号。BIU可以根据用户需求或产品需要对帐号注册和绑定的方式进行变更，而无须事先通知用户。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 鉴于“BIU”帐号的绑定注册方式，您同意作所公司在注册时将使用您提供的手机号码及/或自动提取您的手机号码及自动提取您的手机设备识别码等信息用于注册。您同意给予运营商授权，授权运营商有权自动提取您的手机号码进行认证并用于“biu”账号注册，您保证遵守运营商的相关服务条款，如运营商对您的手机号认证成功，则您的注册即完成。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 在用户注册及使用本服务时，作所公司需要搜集能识别用户身份的个人信息以便作所可以在必要时联系用户，或为用户提供更好的使用体验。作所公司搜集的信息包括但不限于用户的姓名、性别、年龄、出生日期、身份证号、地址、学校情况、公司情况、所属行业、兴趣爱好、常出没的地方、个人说明；作所公司同意对这些信息的使用将受限于第三条用户个人隐私信息保护的约束。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">服务内容</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 本服务的具体内容由作所公司根据实际情况提供，包括但不限于授权用户通过其帐号进行即时通讯、添加好友、加入群组、关注他人、发布留言。作所公司可以对其提供的服务予以变更，且作所公司提供的服务内容可能随时变更；用户将会收到作所公司关于服务变更的通知。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">用户个人信息保护</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户在注册帐号或使用本服务的过程中，可能需要填写或提交一些必要的个人信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法规的规定，则用户可能无法使用本服务或在使用本服务的过程中受到限制。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户个人信息包括：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(1）用户自行提供的用户个人信息（如注册时填写的手机号码，电子邮件等个人信息，使用服务时提供的共享信息等）。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(2）其他方分享的用户个人信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(3）作所公司为提供服务而合法收集的用户必要个人信息（如使用服务时系统自动采集的设备或软件信息，浏览历史信息，通讯时间信息等技术信息，用户开启定位功能并使用服务时的地理位置信息等）。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">其中个人隐私信息是指涉及用户个人身份或个人隐私的信息，比如，用户真实姓名、身份证号、手机号码、手机设备识别码、IP地址、用户聊天记录。非个人隐私信息是指用户对本服务的操作状态以及使用习惯等明确且客观反映在作所公司服务器端的基本记录信息、个人隐私信息范围外的其它普通信息，以及用户同意公开的上述隐私信息。作所公司保证在取得用户书面同意的情况下收集、使用或公开用户的个人隐私信息，用户同意作所公司无需获得用户的另行确认与授权即可收集、使用或公开用户的非个人隐私信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 尊重用户个人信息的私有性是作所公司的一贯制度，作所公司将采取技术措施和其他必要措施，确保用户个人信息安全，防止在本服务中收集的用户个人信息泄露、毁损或丢失。在发生前述情形或者作所公司发现存在发生前述情形的可能时，作所公司将及时采取补救措施并告知用户，用户如发现存在前述情形亦需立即与作所公司联系。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 作所公司未经用户同意不向任何第三方公开、 透露用户个人隐私信息。但以下特定情形除外：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(1)作所公司根据法律法规规定或有权机关的指示提供用户的个人隐私信息；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(2)由于用户将其用户密码告知他人或与他人共享注册帐户与密码，由此导致的任何个人信息的泄漏，或其他非因作所公司原因导致的个人隐私信息的泄露；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(3)用户自行向第三方公开其个人隐私信息；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(4)用户与作所公司及合作单位之间就用户个人隐私信息的使用公开达成约定，作所公司因此向合作单位公开用户个人隐私信息；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(5)任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人隐私信息的泄露；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(6)用户个人信息已经经过处理无法识别特定个人且不能复原。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户同意作所公司可在以下事项中使用用户的个人隐私信息：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(1)作所公司向用户及时发送重要通知，如软件更新、本协议条款的变更；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(2)作所公司内部进行审计、数据分析和研究等，以改进作所公司的产品、服务和与用户之间的沟通；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(3)依本协议约定，作所公司管理、审查用户信息及进行处理措施；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(4)适用法律法规规定的其他事项。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">除上述事项外，如未取得用户事先同意，作所公司不会将用户个人隐私信息使用于任何其他用途。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 作所公司重视对未成年人的保护。作所公司将依赖用户提供的个人信息判断用户是否为未成年人。任何18岁以下的未成年人均不得注册帐号或使用本服务。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 因作所公司提供基于地理位置的服务，用户确认，其地理位置信息为非个人隐私信息，用户成功注册“BIU”帐号视为确认授权作所公司提取、公开及使用用户的地理位置信息。用户地理位置信息将作为用户公开资料之一，由作所公司向其他用户公开以便作所公司向用户提供基于地理位置的移动社交服务。如用户需要终止向其他用户公开其地理位置信息，可随时自行设置为隐身状态。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 为了改善作所公司的技术和服务，向用户提供更好的服务体验，作所公司或可会自行收集使用或向第三方提供用户的非个人隐私信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 作所公司保证在合法、正当与必要的原则下收集、使用或者公开用户个人信息且不会收集与提供的服务无关的用户个人信息。</span></p><p><br/></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">内容规范</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 本条所述内容是指用户使用本服务过程中所制作、上载、复制、发布、传播的任何内容，包括但不限于帐号头像、名称、用户说明等注册信息及认证资料，或文字、语音、图片、视频、图文等发送、回复或自动回复消息和相关链接页面，以及其他使用帐号或本服务所产生的内容。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户不得利用“BIU”帐号或本服务制作、上载、复制、发布、传播如下法律、法规和政策禁止的内容：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(1)反对宪法所确定的基本原则的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(3)损害国家荣誉和利益的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(4)歪曲、丑化、亵渎、否定英雄烈士事迹和精神，以侮辱、诽谤或者其他方式侵害英雄烈士的姓名、肖像、名誉、荣誉的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(5)宣扬恐怖主义、极端主义或者煽动实施恐怖活动、极端主义活动的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(6)煽动民族仇恨、民族歧视，破坏民族团结的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(7)破坏国家宗教政策，宣扬邪教和封建迷信的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(8)散布谣言，扰乱经济秩序和社会秩序的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(9)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(10)侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(11)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(12) 以非法民间组织名义活动的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(13) 不遵守法律法规底线、社会主义制度底线、国家利益底线、公民合法权益底线、社会公共秩序底线、道德风尚底线和信息真实性底线的“七条底线”要求的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(14)含有法律、行政法规、政策禁止的其他内容的信息。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户不得利用“BIU”帐号或本服务制作、上载、复制、发布、传播如下干扰“BIU”正常运营，以及侵犯其他用户或第三方合法权益，对网络生态造成不良影响的内容：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(1) 使用夸张标题，内容与标题严重不符的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(2) 炒作绯闻、丑闻、劣迹等的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(3) 不当评述自然灾害、重大事故等灾难的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(4) 带有性暗示、性挑逗等易使人产生性联想的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(5) 展现血腥、惊悚、残忍等致人身心不适的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(6) 煽动人群歧视、地域歧视等的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(7) 宣扬低俗、庸俗、媚俗内容的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(8)可能引发未成年人模仿不安全行为和违反社会公德行为、诱导未成年人不良嗜好等的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(9) 含有辱骂、恐吓、威胁内容的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(10) 含有骚扰、垃圾广告、恶意信息、诱骗信息的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(11) 侵害他人个人信息或资料的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(12) 侵害他人肖像权、知识产权、商业秘密等合法权利的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(13) 含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益内容，对网络生态造成不良影响的信息。</span></p><p><br/></p><p style="line-height: 1.5em;"><span style="font-size: 14px;"><strong><span style="font-family: 宋体, SimSun;">使用规则</span></strong></span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户在本服务中或通过本服务所传送、发布的任何内容并不反映或代表，也不得被视为反映或代表作所公司的观点、立场或政策，作所公司对此不承担任何责任。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户不得利用“BIU”帐号或本服务进行如下行为：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(1)提交、发布虚假信息，或盗用他人头像或资料，冒充、利用他人名义的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(2)强制、诱导其他用户关注、点击链接页面或分享信息的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(3)虚构事实、隐瞒真相以误导、欺骗他人的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(4)利用技术手段批量建立虚假帐号的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(5)利用“BIU”帐号或本服务从事任何违法犯罪活动的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(6)制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(7)其他违反法律法规规定、侵犯其他用户合法权益、干扰“BIU”正常运营或作所公司未明示授权的行为。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户须对利用“BIU”帐号或本服务传送信息的真实性、合法性、无害性、准确性、有效性等全权负责，与用户所传播的信息相关的任何法律责任由用户自行承担，与作所公司无关。如因此给作所公司或第三方造成损害的，用户应当依法予以赔偿。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 作所公司提供的服务中可能包括广告，用户同意在使用过程中显示作所公司和第三方供应商、合作伙伴提供的广告。除法律法规明确规定外，用户应自行对依该广告信息进行的交易负责，对用户因依该广告信息进行的交易或前述广告商提供的内容而遭受的损失或损害，作所公司不承担任何责任。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 除非作所公司技术面许可，用户不得从事下列任一行为：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(1)删除软件及其副本上关于著作权的信息；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(2)对软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现软件的源代码；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(3)对作所公司拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(4) 对软件或者软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经作所科技授权的第三方工具/服务接入软件和相关系统；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(5) 通过修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论这些行为是否为商业目的；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(6) 通过非作所公司开发、授权的第三方软件、插件、外挂、系统，登录或使用作所公司软件及服务，或制作、发布、传播非作所公司开发、授权的第三方软件、插件、外挂、系统。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;"><br/></span></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">账户管理</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• “BIU”帐号的所有权归作所公司所有，用户完成申请注册手续后，获得“BIU”帐号的使用权，该使用权仅属于初始申请注册人，禁止赠与、借用、租用、转让或售卖。作所公司因经营需要，有权回收用户的“BIU”帐号。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户可以通过“我的”页面里的“设置”页面来删除、注销“BIU”帐户上的个人资料、注册信息及传送内容等，但需注意，删除有关信息的同时也会删除用户储存在系统中的文字和图片。用户需承担该风险。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户有责任妥善保管注册帐号信息及帐号密码的安全，因用户保管不善可能导致遭受盗号或密码失窃，责任由用户自行承担。用户需要对注册帐号以及密码下的行为承担法律责任。用户同意在任何情况下不使用其他用户的帐号或密码。在用户怀疑他人使用其帐号或密码时，用户同意立即通知作所公司。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户应遵守本协议的各项条款，正确、适当地使用本服务，如因用户违反本协议中的任何条款，作所公司在通知用户后有权依据协议中断或终止对违约用户“BIU”帐号提供服务。同时，作所公司保留在任何时候收回“BIU”帐号、用户名的权利。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 如用户注册“BIU”帐号后一年不登录，通知用户后，作所公司可以收回该帐号，以免造成资源浪费，由此造成的不利后果由用户自行承担。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户可以通过“我的”页面里的“设置”页面来进行账号注销服务，用户确认注销账号是不可恢复的操作，用户应自行备份与BIU账号相关的信息和数据，用户确认操作之前与BIU账号相关的所有服务均已进行妥善处理。用户确认并同意注销账号后并不代表本BIU账号注销前的账号行为和相关责任得到豁免或减轻，如在注销期间，用户的账号被他人投诉、被国家机关调查或者正处于诉讼、仲裁程序中，作所公司自行终止用户的账号注销并无需另行得到用户的同意。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;"><br/></span></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">数据储存</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 作所公司不对用户在本服务中相关数据的删除或储存失败负责。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 作所公司可以根据实际情况自行决定用户在本服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。用户可根据自己的需要自行备份本服务中的相关数据。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 如用户停止使用本服务或本服务终止，作所公司可以从服务器上永久地删除用户的数据。本服务停止、终止后，作所公司没有义务向用户返还任何数据。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;"><br/></span></p><p style="line-height: 1.5em;"><span style="font-size: 14px;"><strong><span style="font-family: 宋体, SimSun;">风险承担</span></strong></span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户理解并同意，“BIU”仅为用户提供信息分享、传送及获取的平台，用户必须为自己注册帐号下的一切行为负责，包括用户所传送的任何内容以及由此产生的任何后果。用户应对“BIU”及本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。作所公司无法且不会对因用户行为而导致的任何损失或损害承担责任。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">如果用户发现任何人违反本协议约定或以其他不当的方式使用本服务，请立即向作所公司举报或投诉，举报或投诉邮箱为quzuosuo@163.com，作所公司将依本协议约定进行处理。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户理解并同意，因业务发展需要，作所公司保留单方面对本服务的全部或部分服务内容变更、暂停、终止或撤销的权利，用户需承担此风险。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;"><br/></span></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">知识产权声明</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 除本服务中涉及广告的知识产权由相应广告商享有外，作所公司在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权均归作所公司所有，但用户在使用本服务前对自己发布的内容已合法取得知识产权的除外。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 除另有特别声明外，作所公司提供本服务时所依托软件的著作权、专利权及其他知识产权均归作所公司所有。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 作所公司在本服务中所涉及的图形、文字或其组成，以及其他作所公司标志及产品、服务名称（以下统称“作所公司标识”），其著作权或商标权归作所公司所有。未经作所公司事先书面同意，用户不得将作所公司标识以任何方式展示或使用或作其他处理，也不得向他人表明用户有权展示、使用、或其他有权处理作所公司标识的行为。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 上述及其他任何作所公司或相关广告商依法拥有的知识产权均受到法律保护，未经作所公司或相关广告商书面许可，用户不得以任何形式进行使用或创造相关衍生作品。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户在使用BIU服务时发表上传的文字、图片、视频、音频、软件、直播内容以及表演等各种形式的内容和信息，此部分内容和信息的知识产权归用户，责任由用户承担。但用户的发表、上传行为视为对作所公司的授权，用户理解并同意授予作所公司及其关联公司全球范围内完全免费、非独家、永久、可转授权和可再许可的权利，包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及《著作权法》规定的由著作权人享有的其他著作财产权利及邻接权利。作所公司可自行选择是否使用以及使用方式，包括但不限于将前述内容和信息在作所公司旗下的服务平台上使用与传播，将上述内容和信息再次编辑后使用，以及由作所公司授权给合作方使用、编辑与传播等。为避免疑义，您理解并同意，上述授予的权利包括使用、复制和展示您拥有或被许可使用并植入内容和信息中的个人形象、肖像、姓名、商标、服务标志、品牌、名称、标识和公司标记（如有）以及任何其他品牌、营销或推广资产、物料、素材等的权利和许可。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;"><br/></span></p><p style="line-height: 1.5em;"><span style="font-size: 14px;"><strong><span style="font-family: 宋体, SimSun;">法律责任</span></strong></span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 如果作所公司发现或收到他人举报或投诉用户违反本协议约定的，作所公司有权不经通知随时对相关内容，包括但不限于用户资料、聊天记录进行审查、删除，并视情节轻重对违规帐号处以包括但不限于警告、帐号封禁 、设备封禁 、功能封禁 的处罚，且通知用户处理结果。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 因违反用户协议被封禁的用户，需联系邮箱quzuosuo@163.com查询封禁期限，并在封禁期限届满后自助解封。其中，被实施功能封禁的用户会在封禁期届满后自动恢复被封禁功能。被封禁用户可向作所公司网站相关页面提交申诉，作所公司将对申诉进行审查，并自行合理判断决定是否变更处罚措施。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户理解并同意，作所公司有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户应当赔偿作所公司与合作公司、关联公司，并使之免受损害。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">不可抗力及其他免责事由</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户理解并确认，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，作所公司将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户或第三方造成的损失，作所公司及合作单位在法律允许的范围内免责。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 本服务同大多数互联网服务一样，受包括但不限于用户原因、网络服务质量、社会环境等因素的差异影响，可能受到各种安全问题的侵扰，如他人利用用户的资料，造成现实生活中的骚扰；用户下载安装的其它软件或访问的其他网站中含有“特洛伊木马”等病毒，威胁到用户的计算机信息和数据的安全，继而影响本服务的正常使用等等。用户应加强信息安全及使用者资料的保护意识，要注意加强密码保护，以免遭致损失和骚扰。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户理解并确认，本服务存在因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险，因此导致的用户或第三方任何损失，作所科技不承担任何责任。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户理解并确认，在使用本服务过程中存在来自任何他人的包括误导性的、欺骗性的、威胁性的、诽谤性的、令人反感的或非法的信息，或侵犯他人权利的匿名或冒名的信息，以及伴随该等信息的行为，因此导致的用户或第三方的任何损失，作所公司不承担任何责任。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户理解并确认，作所公司需要定期或不定期地对“BIU”平台或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，作所公司无需为此承担任何责任，但作所公司应事先进行通告。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 作所公司依据法律法规、本协议约定获得处理违法违规或违约内容的权利，该权利不构成作所公司的义务或承诺，作所公司不能保证及时发现违法违规或违约行为或进行相应处理。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 用户理解并确认，对于作所公司向用户提供的下列产品或者服务的质量缺陷及其引发的任何损失，作所公司无需承担任何责任：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(1) 作所公司向用户免费提供的服务；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(2) 作所公司向用户赠送的任何产品或者服务。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 在任何情况下，作所公司均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，包括因用户使用“BIU”或本服务而遭受的利润损失，承担责任（即使作所公司已被告知该等损失的可能性亦然）。尽管本协议中可能含有相悖的规定，作所公司对用户承担的全部责任，无论因何原因或何种行为方式，始终不超过用户因使用作所公司提供的服务而支付给作所公司的费用(如有)。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">服务的变更、中断、终止</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 鉴于网络服务的特殊性，用户同意作所公司有权随时变更、中断或终止部分或全部的服务（包括收费服务）。作所公司变更、中断或终止的服务，作所公司应当在变更、中断或终止之前通知用户，并应向受影响的用户提供等值的替代性的服务；如用户不愿意接受替代性的服务，如果该用户已经向作所公司支付的资金，作所公司应当按照该用户实际使用服务的情况扣除相应资金之后将剩余的资金退还用户的BIU账户中。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 如发生下列任何一种情形，作所公司有权变更、中断或终止向用户提供的免费服务或收费服务，而无需对用户或任何第三方承担任何责任：</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(1)根据法律规定用户应提交真实信息，而用户提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(2) 用户违反相关法律法规或本协议的约定；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(3) 按照法律规定或有权机关的要求；</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">(4) 出于安全的原因或其他必要的情形。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;"><br/></span></p><p style="line-height: 1.5em;"><strong><span style="font-family: 宋体, SimSun; font-size: 14px;">其他</span></strong></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 作所公司郑重提醒用户注意本协议中免除作所公司责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若用户和作所公司之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交作所公司住所地有管辖权的人民法院管辖。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。</span></p><p style="line-height: 1.5em;"><span style="font-family: 宋体, SimSun; font-size: 12px;">• 由于互联网高速发展，您与作所公司签署的本协议列明的条款可能并不能完整罗列并覆盖您与BIU所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，BIU隐私权政策、BIU平台行为规范等均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用BIU平台服务，视为您同意上述补充协议。</span></p><p><br/></p><p><br/></p>'];exports.AQ_CONTENT = AQ_CONTENT;



var STORAGE_OPTIONS = {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
};var _default =

STORAGE_OPTIONS;exports.default = _default;

/***/ }),

/***/ 29:
/*!***************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/service/config.service.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // let BASE_URL = 'http://192.168.1.111:8088/api'
// let BASE_URL = 'http://biuserver.juqihui.cn/api';
var BASE_URL = 'https://biuapi.juqihui.cn/api';


var image_url = 'http://biuimage.juqihui.cn/';

var staticDomainURL = BASE_URL + '/sys/common/static';

var configService = {
  apiUrl: BASE_URL,
  imgUrl: image_url,
  staticDomainURL: staticDomainURL };var _default =


configService;exports.default = _default;

/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 30:
/*!*************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/common/util/tip.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 提示与加载工具类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */var
Tips = /*#__PURE__*/function () {
  function Tips() {_classCallCheck(this, Tips);
    this.isLoading = false;
  }
  /**
     * 弹出提示框
     */_createClass(Tips, null, [{ key: "success", value: function success(

    title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      setTimeout(function () {
        uni.showToast({
          title: title,
          icon: "success",
          mask: true,
          duration: duration });

      }, 300);
      if (duration > 0) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve();
          }, duration);
        });
      }
    }

    /**
       * 弹出确认窗口
       */ }, { key: "confirm", value: function confirm(
    text, showCancel) {var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var title = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "提示";
      return new Promise(function (resolve, reject) {
        uni.showModal({
          title: title,
          content: text,
          showCancel: showCancel,
          success: function success(res) {
            if (res.confirm) {
              resolve(payload);
            } else if (res.cancel) {
              reject(payload);
            }
          },
          fail: function fail(res) {
            reject(payload);
          } });

      });
    } }, { key: "toast", value: function toast(

    title, onHide) {var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "none";
      setTimeout(function () {
        uni.showToast({
          title: title,
          icon: icon,
          mask: true,
          duration: 1000 });

      }, 300);

      // 隐藏结束回调
      if (onHide) {
        setTimeout(function () {
          onHide();
        }, 500);
      }
    }

    /**
       * 警告框
       */ }, { key: "alert", value: function alert(
    title) {
      uni.showToast({
        title: title,
        image: "../../static/alert.png",
        mask: true,
        duration: 1500 });

    }

    /**
       * 错误框
       */ }, { key: "error", value: function error(

    title, onHide) {
      uni.showToast({
        title: title,
        image: "../../static/error.png",
        mask: true,
        duration: 1500 });

      // 隐藏结束回调
      if (onHide) {
        setTimeout(function () {
          onHide();
        }, 500);
      }
    }

    /**
       * 弹出加载提示
       */ }, { key: "loading", value: function loading()
    {var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中";
      if (Tips.isLoading) {
        return;
      }
      Tips.isLoading = true;
      uni.showLoading({
        title: title,
        mask: true });

    }

    /**
       * 加载完毕
       */ }, { key: "loaded", value: function loaded()
    {
      if (Tips.isLoading) {
        Tips.isLoading = false;
        uni.hideLoading();
      }
    } }]);return Tips;}();


/**
                            * 静态变量，是否加载中
                            */exports.default = Tips;
Tips.isLoading = false;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 31:
/*!************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 32));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 33));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 37));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 38));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 39));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 40));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 41));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 42));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 43));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 44));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 45));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 35));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 34));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 46));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 36));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 47));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 48));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 49));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 50));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 51));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 52);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 53));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 54));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 55));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 56));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 32:
/*!***********************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/mixin/mixin.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 33:
/*!*************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/request/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 34));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 34:
/*!******************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/deepMerge.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 35));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 35:
/*!******************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/deepClone.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 36:
/*!*************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/test.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 37:
/*!********************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/queryParams.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 38:
/*!**************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/route.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 39:
/*!*******************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/timeFormat.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Biu笔友","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Biu笔友","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Biu笔友","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Biu笔友","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        triggerEvent.call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        });
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 40:
/*!*****************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/timeFrom.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 41:
/*!**********************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/colorGradient.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 42:
/*!*************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/guid.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 43:
/*!**************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/color.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 44:
/*!******************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/type2icon.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 45:
/*!********************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/randomArray.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 455:
/*!************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/util/emitter.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 46:
/*!****************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/addUnit.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 47:
/*!***************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/random.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 48:
/*!*************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/trim.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 484:
/*!********************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/util/async-validator.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"NODE_ENV":"development","VUE_APP_NAME":"Biu笔友","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../develop/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 485)))

/***/ }),

/***/ 485:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 486);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 486:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 485)))

/***/ }),

/***/ 49:
/*!**************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/toast.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 5:
/*!*****************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/pages.json ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 50:
/*!******************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/getParent.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 51:
/*!****************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/$parent.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 515:
/*!*******************************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/components/u-parse/libs/MpHtmlParser.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * html 解析器
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20201029
 * @author JinYufeng
 * @listens MIT
 */
var cfg = __webpack_require__(/*! ./config.js */ 516),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 517),
windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;

function MpHtmlParser(data) {var _this = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.attrs = {};
  this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
  this.data = data;
  this.domain = options.domain;
  this.DOM = [];
  this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
  options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
  this.options = options;
  this.state = this.Text;
  this.STACK = [];
  // 工具函数
  this.bubble = function () {
    for (var i = _this.STACK.length, item; item = _this.STACK[--i];) {
      if (cfg.richOnlyTags[item.name]) return false;
      item.c = 1;
    }
    return true;
  };
  this.decode = function (val, amp) {
    var i = -1,
    j,en;
    while (1) {
      if ((i = val.indexOf('&', i + 1)) == -1) break;
      if ((j = val.indexOf(';', i + 2)) == -1) break;
      if (val[i + 1] == '#') {
        en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
        if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
      } else {
        en = val.substring(i + 1, j);
        if (cfg.entities[en] || en == amp)
        val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
      }
    }
    return val;
  };
  this.getUrl = function (url) {
    if (url[0] == '/') {
      if (url[1] == '/') url = _this.options.prot + ':' + url;else
      if (_this.domain) url = _this.domain + url;
    } else if (_this.domain && url.indexOf('data:') != 0 && !url.includes('://'))
    url = _this.domain + '/' + url;
    return url;
  };
  this.isClose = function () {return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';};
  this.section = function () {return _this.data.substring(_this.start, _this.i);};
  this.parent = function () {return _this.STACK[_this.STACK.length - 1];};
  this.siblings = function () {return _this.STACK.length ? _this.parent().children : _this.DOM;};
}
MpHtmlParser.prototype.parse = function () {
  if (emoji) this.data = emoji.parseEmoji(this.data);
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  if (this.state == this.Text) this.setText();
  while (this.STACK.length) {this.popNode(this.STACK.pop());}
  return this.DOM;
};
// 设置属性
MpHtmlParser.prototype.setAttr = function () {
  var name = this.attrName.toLowerCase(),
  val = this.attrVal;
  if (cfg.boolAttrs[name]) this.attrs[name] = 'T';else
  if (val) {
    if (name == 'src' || name == 'data-src' && !this.attrs.src) this.attrs.src = this.getUrl(this.decode(val, 'amp'));else
    if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else
    if (name.substr(0, 5) != 'data-') this.attrs[name] = val;
  }
  this.attrVal = '';
  while (blankChar[this.data[this.i]]) {this.i++;}
  if (this.isClose()) this.setNode();else
  {
    this.start = this.i;
    this.state = this.AttrName;
  }
};
// 设置文本节点
MpHtmlParser.prototype.setText = function () {
  var back,text = this.section();
  if (!text) return;
  text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;
  if (back) {
    this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
    var j = this.start + text.length;
    for (this.i = this.start; this.i < j; this.i++) {this.state(this.data[this.i]);}
    return;
  }
  if (!this.pre) {
    // 合并空白符
    var flag,tmp = [];
    for (var i = text.length, c; c = text[--i];) {
      if (!blankChar[c]) {
        tmp.unshift(c);
        if (!flag) flag = 1;
      } else {
        if (tmp[0] != ' ') tmp.unshift(' ');
        if (c == '\n' && flag == void 0) flag = 0;
      }}
    if (flag == 0) return;
    text = tmp.join('');
  }
  this.siblings().push({
    type: 'text',
    text: this.decode(text) });

};
// 设置元素节点
MpHtmlParser.prototype.setNode = function () {
  var node = {
    name: this.tagName.toLowerCase(),
    attrs: this.attrs },

  close = cfg.selfClosingTags[node.name];
  if (this.options.nodes.length) node.type = 'node';
  this.attrs = {};
  if (!cfg.ignoreTags[node.name]) {
    // 处理属性
    var attrs = node.attrs,
    style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
    styleObj = {};
    if (attrs.id) {
      if (this.options.compress & 1) attrs.id = void 0;else
      if (this.options.useAnchor) this.bubble();
    }
    if (this.options.compress & 2 && attrs.class) attrs.class = void 0;
    switch (node.name) {
      case 'a':
      case 'ad':


        this.bubble();
        break;
      case 'font':
        if (attrs.color) {
          styleObj['color'] = attrs.color;
          attrs.color = void 0;
        }
        if (attrs.face) {
          styleObj['font-family'] = attrs.face;
          attrs.face = void 0;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;else
          if (size > 7) size = 7;
          var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
          styleObj['font-size'] = map[size - 1];
          attrs.size = void 0;
        }
        break;
      case 'embed':

        var src = node.attrs.src || '',
        type = node.attrs.type || '';
        if (type.includes('video') || src.includes('.mp4') || src.includes('.3gp') || src.includes('.m3u8'))
        node.name = 'video';else
        if (type.includes('audio') || src.includes('.m4a') || src.includes('.wav') || src.includes('.mp3') || src.includes(
        '.aac'))
        node.name = 'audio';else
        break;
        if (node.attrs.autostart)
        node.attrs.autoplay = 'T';
        node.attrs.controls = 'T';





      case 'video':
      case 'audio':
        if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else
        this["".concat(node.name, "Num")]++;
        if (node.name == 'video') {
          if (this.videoNum > 3)
          node.lazyLoad = 1;
          if (attrs.width) {
            styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
            attrs.width = void 0;
          }
          if (attrs.height) {
            styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
            attrs.height = void 0;
          }
        }
        if (!attrs.controls && !attrs.autoplay) attrs.controls = 'T';
        attrs.source = [];
        if (attrs.src) {
          attrs.source.push(attrs.src);
          attrs.src = void 0;
        }
        this.bubble();
        break;
      case 'td':
      case 'th':
        if (attrs.colspan || attrs.rowspan)
        for (var k = this.STACK.length, item; item = this.STACK[--k];) {
          if (item.name == 'table') {
            item.flag = 1;
            break;
          }}}

    if (attrs.align) {
      if (node.name == 'table') {
        if (attrs.align == 'center') styleObj['margin-inline-start'] = styleObj['margin-inline-end'] = 'auto';else
        styleObj['float'] = attrs.align;
      } else styleObj['text-align'] = attrs.align;
      attrs.align = void 0;
    }
    // 压缩 style
    var styles = style.split(';');
    style = '';
    for (var i = 0, len = styles.length; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length < 2) continue;
      var _key = info[0].trim().toLowerCase(),
      _value = info.slice(1).join(':').trim();
      if (_value[0] == '-' || _value.includes('safe'))
      style += ";".concat(_key, ":").concat(_value);else
      if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import'))
      styleObj[_key] = _value;
    }
    if (node.name == 'img') {
      if (attrs.src && !attrs.ignore) {
        if (this.bubble())
        attrs.i = (this.imgNum++).toString();else
        attrs.ignore = 'T';
      }
      if (attrs.ignore) {
        style += ';-webkit-touch-callout:none';
        styleObj['max-width'] = '100%';
      }
      var width;
      if (styleObj.width) width = styleObj.width;else
      if (attrs.width) width = attrs.width.includes('%') ? attrs.width : parseFloat(attrs.width) + 'px';
      if (width) {
        styleObj.width = width;
        attrs.width = '100%';
        if (parseInt(width) > windowWidth) {
          styleObj.height = '';
          if (attrs.height) attrs.height = void 0;
        }
      }
      if (styleObj.height) {
        attrs.height = styleObj.height;
        styleObj.height = '';
      } else if (attrs.height && !attrs.height.includes('%'))
      attrs.height = parseFloat(attrs.height) + 'px';
    }
    for (var key in styleObj) {
      var value = styleObj[key];
      if (!value) continue;
      if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
      // 填充链接
      if (value.includes('url')) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      }
      // 转换 rpx
      else if (value.includes('rpx'))
        value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * windowWidth / 750 + 'px';});else
        if (key == 'white-space' && value.includes('pre') && !close)
        this.pre = node.pre = true;
      style += ";".concat(key, ":").concat(value);
    }
    style = style.substr(1);
    if (style) attrs.style = style;
    if (!close) {
      node.children = [];
      if (node.name == 'pre' && cfg.highlight) {
        this.remove(node);
        this.pre = node.pre = true;
      }
      this.siblings().push(node);
      this.STACK.push(node);
    } else if (!cfg.filter || cfg.filter(node, this) != false)
    this.siblings().push(node);
  } else {
    if (!close) this.remove(node);else
    if (node.name == 'source') {
      var parent = this.parent();
      if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src)
      parent.attrs.source.push(node.attrs.src);
    } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
  }
  if (this.data[this.i] == '/') this.i++;
  this.start = this.i + 1;
  this.state = this.Text;
};
// 移除标签
MpHtmlParser.prototype.remove = function (node) {var _this2 = this;
  var name = node.name,
  j = this.i;
  // 处理 svg
  var handleSvg = function handleSvg() {
    var src = _this2.data.substring(j, _this2.i + 1);
    node.attrs.xmlns = 'http://www.w3.org/2000/svg';
    for (var key in node.attrs) {
      if (key == 'viewbox') src = " viewBox=\"".concat(node.attrs.viewbox, "\"") + src;else
      if (key != 'style') src = " ".concat(key, "=\"").concat(node.attrs[key], "\"") + src;
    }
    src = '<svg' + src;
    var parent = _this2.parent();
    if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline'))
    parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
    _this2.siblings().push({
      name: 'img',
      attrs: {
        src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
        style: node.attrs.style,
        ignore: 'T' } });


  };
  if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
  while (1) {
    if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
      if (name == 'pre' || name == 'svg') this.i = j;else
      this.i = this.data.length;
      return;
    }
    this.start = this.i += 2;
    while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}
    if (this.section().toLowerCase() == name) {
      // 代码块高亮
      if (name == 'pre') {
        this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.
        substr(this.i - 5);
        return this.i = j;
      } else if (name == 'style')
      this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else
      if (name == 'title')
      this.DOM.title = this.data.substring(j + 1, this.i - 7);
      if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
      if (name == 'svg') handleSvg();
      return;
    }
  }
};
// 节点出栈处理
MpHtmlParser.prototype.popNode = function (node) {
  // 空白符处理
  if (node.pre) {
    node.pre = this.pre = void 0;
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].pre)
      this.pre = true;}
  }
  var siblings = this.siblings(),
  len = siblings.length,
  childs = node.children;
  if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false)
  return siblings.pop();
  var attrs = node.attrs;
  // 替换一些标签名
  if (cfg.blockTags[node.name]) node.name = 'div';else
  if (!cfg.trustTags[node.name]) node.name = 'span';
  // 处理列表
  if (node.c && (node.name == 'ul' || node.name == 'ol')) {
    if ((node.attrs.style || '').includes('list-style:none')) {
      for (var _i = 0, child; child = childs[_i++];) {
        if (child.name == 'li')
        child.name = 'div';}
    } else if (node.name == 'ul') {
      var floor = 1;
      for (var _i2 = this.STACK.length; _i2--;) {
        if (this.STACK[_i2].name == 'ul') floor++;}
      if (floor != 1)
      for (var _i3 = childs.length; _i3--;) {
        childs[_i3].floor = floor;}
    } else {
      for (var _i4 = 0, num = 1, _child; _child = childs[_i4++];) {
        if (_child.name == 'li') {
          _child.type = 'ol';
          _child.num = function (num, type) {
            if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
            if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
            if (type == 'i' || type == 'I') {
              num = (num - 1) % 99 + 1;
              var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
              ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
              res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
              if (type == 'i') return res.toLowerCase();
              return res;
            }
            return num;
          }(num++, attrs.type) + '.';
        }}
    }
  }
  // 处理表格
  if (node.name == 'table') {
    var padding = parseFloat(attrs.cellpadding),
    spacing = parseFloat(attrs.cellspacing),
    border = parseFloat(attrs.border);
    if (node.c) {
      if (isNaN(padding)) padding = 2;
      if (isNaN(spacing)) spacing = 2;
    }
    if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
    if (node.flag && node.c) {
      // 有 colspan 或 rowspan 且含有链接的表格转为 grid 布局实现
      attrs.style = "".concat(attrs.style || '', ";").concat(spacing ? ";grid-gap:".concat(spacing, "px") : ';border-left:0;border-top:0');
      var row = 1,
      col = 1,
      colNum,
      trs = [],
      children = [],
      map = {};
      (function f(ns) {
        for (var i = 0; i < ns.length; i++) {
          if (ns[i].name == 'tr') trs.push(ns[i]);else
          f(ns[i].children || []);
        }
      })(node.children);
      for (var _i5 = 0; _i5 < trs.length; _i5++) {
        for (var j = 0, td; td = trs[_i5].children[j]; j++) {
          if (td.name == 'td' || td.name == 'th') {
            while (map[row + '.' + col]) {col++;}
            var cell = {
              name: 'div',
              c: 1,
              attrs: {
                style: (td.attrs.style || '') + (border ? ";border:".concat(border, "px solid gray") + (spacing ? '' :
                ';border-right:0;border-bottom:0') : '') + (padding ? ";padding:".concat(padding, "px") : '') },

              children: td.children };

            if (td.attrs.colspan) {
              cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + parseInt(td.attrs.colspan));
              if (!td.attrs.rowspan) cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + 1);
              col += parseInt(td.attrs.colspan) - 1;
            }
            if (td.attrs.rowspan) {
              cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + parseInt(td.attrs.rowspan));
              if (!td.attrs.colspan) cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + 1);
              for (var k = 1; k < td.attrs.rowspan; k++) {map[row + k + '.' + col] = 1;}
            }
            children.push(cell);
            col++;
          }
        }
        if (!colNum) {
          colNum = col - 1;
          attrs.style += ";grid-template-columns:repeat(".concat(colNum, ",auto)");
        }
        col = 1;
        row++;
      }
      node.children = children;
    } else {
      attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
      if (border || padding)
      (function f(ns) {
        for (var i = 0, n; n = ns[i]; i++) {
          if (n.name == 'th' || n.name == 'td') {
            if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style || '');
            if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style || '');
          } else f(n.children || []);
        }
      })(childs);
    }
    if (this.options.autoscroll) {
      var table = Object.assign({}, node);
      node.name = 'div';
      node.attrs = {
        style: 'overflow:scroll' };

      node.children = [table];
    }
  }
  this.CssHandler.pop && this.CssHandler.pop(node);
  // 自动压缩
  if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div')
  siblings[len - 1] = childs[0];
};
// 状态机
MpHtmlParser.prototype.Text = function (c) {
  if (c == '<') {
    var next = this.data[this.i + 1],
    isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};
    if (isLetter(next)) {
      this.setText();
      this.start = this.i + 1;
      this.state = this.TagName;
    } else if (next == '/') {
      this.setText();
      if (isLetter(this.data[++this.i + 1])) {
        this.start = this.i + 1;
        this.state = this.EndTag;
      } else this.Comment();
    } else if (next == '!' || next == '?') {
      this.setText();
      this.Comment();
    }
  }
};
MpHtmlParser.prototype.Comment = function () {
  var key;
  if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
  if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
  key = '>';
  if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
  this.i += key.length - 1;
  this.start = this.i + 1;
  this.state = this.Text;
};
MpHtmlParser.prototype.TagName = function (c) {
  if (blankChar[c]) {
    this.tagName = this.section();
    while (blankChar[this.data[this.i]]) {this.i++;}
    if (this.isClose()) this.setNode();else
    {
      this.start = this.i;
      this.state = this.AttrName;
    }
  } else if (this.isClose()) {
    this.tagName = this.section();
    this.setNode();
  }
};
MpHtmlParser.prototype.AttrName = function (c) {
  if (c == '=' || blankChar[c] || this.isClose()) {
    this.attrName = this.section();
    if (blankChar[c])
    while (blankChar[this.data[++this.i]]) {;}
    if (this.data[this.i] == '=') {
      while (blankChar[this.data[++this.i]]) {;}
      this.start = this.i--;
      this.state = this.AttrValue;
    } else this.setAttr();
  }
};
MpHtmlParser.prototype.AttrValue = function (c) {
  if (c == '"' || c == "'") {
    this.start++;
    if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
    this.attrVal = this.section();
    this.i++;
  } else {
    for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
    this.attrVal = this.section();
  }
  this.setAttr();
};
MpHtmlParser.prototype.EndTag = function (c) {
  if (blankChar[c] || c == '>' || c == '/') {
    var name = this.section().toLowerCase();
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].name == name) break;}
    if (i != -1) {
      var node;
      while ((node = this.STACK.pop()).name != name) {this.popNode(node);}
      this.popNode(node);
    } else if (name == 'p' || name == 'br')
    this.siblings().push({
      name: name,
      attrs: {} });

    this.i = this.data.indexOf('>', this.i);
    this.start = this.i + 1;
    if (this.i == -1) this.i = this.data.length;else
    this.state = this.Text;
  }
};
module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 516:
/*!*************************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/components/u-parse/libs/config.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */
var cfg = {
  // 出错占位图
  errorImg: null,
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…' },

  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  boolAttrs: makeMap('allowfullscreen,autoplay,autostart,controls,ignore,loop,muted'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'),
  // 将被移除的标签
  ignoreTags: makeMap('area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr'),
  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend'),
  // 自闭合的标签
  selfClosingTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // 信任的标签
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video'),
  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = Object.create(null),
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}


if (wx.canIUse('editor')) {
  cfg.blockTags.pre = void 0;
  cfg.ignoreTags.rp = true;
  Object.assign(cfg.richOnlyTags, makeMap('bdi,bdo,caption,rt,ruby'));
  Object.assign(cfg.trustTags, makeMap('bdi,bdo,caption,pre,rt,ruby'));
}







module.exports = cfg;

/***/ }),

/***/ 517:
/*!*****************************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/components/u-parse/libs/CssHandler.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cfg = __webpack_require__(/*! ./config.js */ 516),
isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};

function CssHandler(tagStyle) {
  var styles = Object.assign(Object.create(null), cfg.userAgentStyles);
  for (var item in tagStyle) {
    styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}
  this.styles = styles;
}
CssHandler.prototype.getStyle = function (data) {
  this.styles = new parser(data, this.styles).parse();
};
CssHandler.prototype.match = function (name, attrs) {
  var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
  if (attrs.class) {
    var items = attrs.class.split(' ');
    for (var i = 0, item; item = items[i]; i++) {
      if (tmp = this.styles['.' + item])
      matched += tmp + ';';}
  }
  if (tmp = this.styles['#' + attrs.id])
  matched += tmp + ';';
  return matched;
};
module.exports = CssHandler;

function parser(data, init) {
  this.data = data;
  this.floor = 0;
  this.i = 0;
  this.list = [];
  this.res = init;
  this.state = this.Space;
}
parser.prototype.parse = function () {
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  return this.res;
};
parser.prototype.section = function () {
  return this.data.substring(this.start, this.i);
};
// 状态机
parser.prototype.Space = function (c) {
  if (c == '.' || c == '#' || isLetter(c)) {
    this.start = this.i;
    this.state = this.Name;
  } else if (c == '/' && this.data[this.i + 1] == '*')
  this.Comment();else
  if (!cfg.blankChar[c] && c != ';')
  this.state = this.Ignore;
};
parser.prototype.Comment = function () {
  this.i = this.data.indexOf('*/', this.i) + 1;
  if (!this.i) this.i = this.data.length;
  this.state = this.Space;
};
parser.prototype.Ignore = function (c) {
  if (c == '{') this.floor++;else
  if (c == '}' && ! --this.floor) {
    this.list = [];
    this.state = this.Space;
  }
};
parser.prototype.Name = function (c) {
  if (cfg.blankChar[c]) {
    this.list.push(this.section());
    this.state = this.NameSpace;
  } else if (c == '{') {
    this.list.push(this.section());
    this.Content();
  } else if (c == ',') {
    this.list.push(this.section());
    this.Comma();
  } else if (!isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
  this.state = this.Ignore;
};
parser.prototype.NameSpace = function (c) {
  if (c == '{') this.Content();else
  if (c == ',') this.Comma();else
  if (!cfg.blankChar[c]) this.state = this.Ignore;
};
parser.prototype.Comma = function () {
  while (cfg.blankChar[this.data[++this.i]]) {;}
  if (this.data[this.i] == '{') this.Content();else
  {
    this.start = this.i--;
    this.state = this.Name;
  }
};
parser.prototype.Content = function () {
  this.start = ++this.i;
  if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
  var content = this.section();
  for (var i = 0, item; item = this.list[i++];) {
    if (this.res[item]) this.res[item] += ';' + content;else
    this.res[item] = content;}
  this.list = [];
  this.state = this.Space;
};

/***/ }),

/***/ 52:
/*!************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/sys.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 53:
/*!*****************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/debounce.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 54:
/*!*****************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/function/throttle.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 55:
/*!*************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/config/config.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 56:
/*!*************************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/config/zIndex.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 567:
/*!***********************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/util/nation.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var nationData = [{
  "label": "中国",
  "value": "1" },

{
  "label": "阿尔巴尼亚",
  "value": "ALB" },

{
  "label": "阿尔及利亚",
  "value": "DZA" },

{
  "label": "阿富汗",
  "value": "AFG" },

{
  "label": "阿根廷",
  "value": "ARG" },

{
  "label": "阿拉伯联合酋长国",
  "value": "ARE" },

{
  "label": "阿鲁巴",
  "value": "ABW" },

{
  "label": "阿曼",
  "value": "OMN" },

{
  "label": "阿塞拜疆",
  "value": "AZE" },

{
  "label": "阿森松岛",
  "value": "ASC" },

{
  "label": "埃及",
  "value": "EGY" },

{
  "label": "埃塞俄比亚",
  "value": "ETH" },

{
  "label": "爱尔兰",
  "value": "IRL" },

{
  "label": "爱沙尼亚",
  "value": "EST" },

{
  "label": "安道尔",
  "value": "AND" },

{
  "label": "安哥拉",
  "value": "AGO" },

{
  "label": "安圭拉",
  "value": "AIA" },

{
  "label": "安提瓜岛和巴布达",
  "value": "ATG" },

{
  "label": "澳大利亚",
  "value": "AUS" },

{
  "label": "奥地利",
  "value": "AUT" },

{
  "label": "奥兰群岛",
  "value": "ALA" },

{
  "label": "巴巴多斯岛",
  "value": "BRB" },

{
  "label": "巴布亚新几内亚",
  "value": "PNG" },

{
  "label": "巴哈马",
  "value": "BHS" },

{
  "label": "巴基斯坦",
  "value": "PAK" },

{
  "label": "巴拉圭",
  "value": "PRY" },

{
  "label": "巴勒斯坦",
  "value": "PSE" },

{
  "label": "巴林",
  "value": "BHR" },

{
  "label": "巴拿马",
  "value": "PAN" },

{
  "label": "巴西",
  "value": "BRA" },

{
  "label": "白俄罗斯",
  "value": "BLR" },

{
  "label": "百慕大",
  "value": "BMU" },

{
  "label": "保加利亚",
  "value": "BGR" },

{
  "label": "北马里亚纳群岛",
  "value": "MNP" },

{
  "label": "贝宁",
  "value": "BEN" },

{
  "label": "比利时",
  "value": "BEL" },

{
  "label": "冰岛",
  "value": "ISL" },

{
  "label": "波多黎各",
  "value": "PRI" },

{
  "label": "波兰",
  "value": "POL" },

{
  "label": "玻利维亚",
  "value": "BOL" },

{
  "label": "波斯尼亚和黑塞哥维那",
  "value": "BIH" },

{
  "label": "博茨瓦纳",
  "value": "BWA" },

{
  "label": "伯利兹",
  "value": "BLZ" },

{
  "label": "不丹",
  "value": "BTN" },

{
  "label": "布基纳法索",
  "value": "BFA" },

{
  "label": "布隆迪",
  "value": "BDI" },

{
  "label": "布韦岛",
  "value": "BVT" },

{
  "label": "朝鲜",
  "value": "PRK" },

{
  "label": "丹麦",
  "value": "DNK" },

{
  "label": "德国",
  "value": "DEU" },

{
  "label": "东帝汶",
  "value": "TLS" },

{
  "label": "多哥",
  "value": "TGO" },

{
  "label": "多米尼加",
  "value": "DMA" },

{
  "label": "多米尼加共和国",
  "value": "DOM" },

{
  "label": "俄罗斯",
  "value": "RUS" },

{
  "label": "厄瓜多尔",
  "value": "ECU" },

{
  "label": "厄立特里亚",
  "value": "ERI" },

{
  "label": "法国",
  "value": "FRA" },

{
  "label": "法罗群岛",
  "value": "FRO" },

{
  "label": "法属波利尼西亚",
  "value": "PYF" },

{
  "label": "法属圭亚那",
  "value": "GUF" },

{
  "label": "法属南部领地",
  "value": "ATF" },

{
  "label": "梵蒂冈",
  "value": "VAT" },

{
  "label": "菲律宾",
  "value": "PHL" },

{
  "label": "斐济",
  "value": "FJI" },

{
  "label": "芬兰",
  "value": "FIN" },

{
  "label": "佛得角",
  "value": "CPV" },

{
  "label": "弗兰克群岛",
  "value": "FLK" },

{
  "label": "冈比亚",
  "value": "GMB" },

{
  "label": "刚果",
  "value": "COG" },

{
  "label": "刚果民主共和国",
  "value": "COD" },

{
  "label": "哥伦比亚",
  "value": "COL" },

{
  "label": "哥斯达黎加",
  "value": "CRI" },

{
  "label": "格恩西岛",
  "value": "GGY" },

{
  "label": "格林纳达",
  "value": "GRD" },

{
  "label": "格陵兰",
  "value": "GRL" },

{
  "label": "古巴",
  "value": "CUB" },

{
  "label": "瓜德罗普",
  "value": "GLP" },

{
  "label": "关岛",
  "value": "GUM" },

{
  "label": "圭亚那",
  "value": "GUY" },

{
  "label": "哈萨克斯坦",
  "value": "KAZ" },

{
  "label": "海地",
  "value": "HTI" },

{
  "label": "韩国",
  "value": "KOR" },

{
  "label": "荷兰",
  "value": "NLD" },

{
  "label": "荷属安地列斯",
  "value": "ANT" },

{
  "label": "赫德和麦克唐纳群岛",
  "value": "HMD" },

{
  "label": "洪都拉斯",
  "value": "HND" },

{
  "label": "基里巴斯",
  "value": "KIR" },

{
  "label": "吉布提",
  "value": "DJI" },

{
  "label": "吉尔吉斯斯坦",
  "value": "KGZ" },

{
  "label": "几内亚",
  "value": "GIN" },

{
  "label": "几内亚比绍",
  "value": "GNB" },

{
  "label": "加拿大",
  "value": "CAN" },

{
  "label": "加纳",
  "value": "GHA" },

{
  "label": "加蓬",
  "value": "GAB" },

{
  "label": "柬埔寨",
  "value": "KHM" },

{
  "label": "捷克共和国",
  "value": "CZE" },

{
  "label": "津巴布韦",
  "value": "ZWE" },

{
  "label": "喀麦隆",
  "value": "CMR" },

{
  "label": "卡塔尔",
  "value": "QAT" },

{
  "label": "开曼群岛",
  "value": "CYM" },

{
  "label": "科科斯群岛",
  "value": "CCK" },

{
  "label": "科摩罗",
  "value": "COM" },

{
  "label": "科特迪瓦",
  "value": "CIV" },

{
  "label": "科威特",
  "value": "KWT" },

{
  "label": "克罗地亚",
  "value": "HRV" },

{
  "label": "肯尼亚",
  "value": "KEN" },

{
  "label": "库克群岛",
  "value": "COK" },

{
  "label": "拉脱维亚",
  "value": "LVA" },

{
  "label": "莱索托",
  "value": "LSO" },

{
  "label": "老挝",
  "value": "LAO" },

{
  "label": "黎巴嫩",
  "value": "LBN" },

{
  "label": "利比里亚",
  "value": "LBR" },

{
  "label": "利比亚",
  "value": "LBY" },

{
  "label": "立陶宛",
  "value": "LTU" },

{
  "label": "列支敦士登",
  "value": "LIE" },

{
  "label": "留尼旺岛",
  "value": "REU" },

{
  "label": "卢森堡",
  "value": "LUX" },

{
  "label": "卢旺达",
  "value": "RWA" },

{
  "label": "罗马尼亚",
  "value": "ROU" },

{
  "label": "马达加斯加",
  "value": "MDG" },

{
  "label": "马尔代夫",
  "value": "MDV" },

{
  "label": "马耳他",
  "value": "MLT" },

{
  "label": "马拉维",
  "value": "MWI" },

{
  "label": "马来西亚",
  "value": "MYS" },

{
  "label": "马里",
  "value": "MLI" },

{
  "label": "马其顿",
  "value": "MKD" },

{
  "label": "马绍尔群岛",
  "value": "MHL" },

{
  "label": "马提尼克",
  "value": "MTQ" },

{
  "label": "马约特岛",
  "value": "MYT" },

{
  "label": "曼岛",
  "value": "IMN" },

{
  "label": "毛里求斯",
  "value": "MUS" },

{
  "label": "毛里塔尼亚",
  "value": "MRT" },

{
  "label": "美国",
  "value": "USA" },

{
  "label": "美属萨摩亚",
  "value": "ASM" },

{
  "label": "美属外岛",
  "value": "UMI" },

{
  "label": "蒙古",
  "value": "MNG" },

{
  "label": "蒙特塞拉特",
  "value": "MSR" },

{
  "label": "孟加拉",
  "value": "BGD" },

{
  "label": "密克罗尼西亚",
  "value": "FSM" },

{
  "label": "秘鲁",
  "value": "PER" },

{
  "label": "缅甸",
  "value": "MMR" },

{
  "label": "摩尔多瓦",
  "value": "MDA" },

{
  "label": "摩洛哥",
  "value": "MAR" },

{
  "label": "摩纳哥",
  "value": "MCO" },

{
  "label": "莫桑比克",
  "value": "MOZ" },

{
  "label": "墨西哥",
  "value": "MEX" },

{
  "label": "纳米比亚",
  "value": "NAM" },

{
  "label": "南非",
  "value": "ZAF" },

{
  "label": "南极洲",
  "value": "ATA" },

{
  "label": "南乔治亚和南桑德威奇群岛",
  "value": "SGS" },

{
  "label": "瑙鲁",
  "value": "NRU" },

{
  "label": "尼泊尔",
  "value": "NPL" },

{
  "label": "尼加拉瓜",
  "value": "NIC" },

{
  "label": "尼日尔",
  "value": "NER" },

{
  "label": "尼日利亚",
  "value": "NGA" },

{
  "label": "纽埃",
  "value": "NIU" },

{
  "label": "挪威",
  "value": "NOR" },

{
  "label": "诺福克",
  "value": "NFK" },

{
  "label": "帕劳群岛",
  "value": "PLW" },

{
  "label": "皮特凯恩",
  "value": "PCN" },

{
  "label": "葡萄牙",
  "value": "PRT" },

{
  "label": "乔治亚",
  "value": "GEO" },

{
  "label": "日本",
  "value": "JPN" },

{
  "label": "瑞典",
  "value": "SWE" },

{
  "label": "瑞士",
  "value": "CHE" },

{
  "label": "萨尔瓦多",
  "value": "SLV" },

{
  "label": "萨摩亚",
  "value": "WSM" },

{
  "label": "塞尔维亚,黑山",
  "value": "SCG" },

{
  "label": "塞拉利昂",
  "value": "SLE" },

{
  "label": "塞内加尔",
  "value": "SEN" },

{
  "label": "塞浦路斯",
  "value": "CYP" },

{
  "label": "塞舌尔",
  "value": "SYC" },

{
  "label": "沙特阿拉伯",
  "value": "SAU" },

{
  "label": "圣诞岛",
  "value": "CXR" },

{
  "label": "圣多美和普林西比",
  "value": "STP" },

{
  "label": "圣赫勒拿",
  "value": "SHN" },

{
  "label": "圣基茨和尼维斯",
  "value": "KNA" },

{
  "label": "圣卢西亚",
  "value": "LCA" },

{
  "label": "圣马力诺",
  "value": "SMR" },

{
  "label": "圣皮埃尔和米克隆群岛",
  "value": "SPM" },

{
  "label": "圣文森特和格林纳丁斯",
  "value": "VCT" },

{
  "label": "斯里兰卡",
  "value": "LKA" },

{
  "label": "斯洛伐克",
  "value": "SVK" },

{
  "label": "斯洛文尼亚",
  "value": "SVN" },

{
  "label": "斯瓦尔巴和扬马廷",
  "value": "SJM" },

{
  "label": "斯威士兰",
  "value": "SWZ" },

{
  "label": "苏丹",
  "value": "SDN" },

{
  "label": "苏里南",
  "value": "SUR" },

{
  "label": "所罗门群岛",
  "value": "SLB" },

{
  "label": "索马里",
  "value": "SOM" },

{
  "label": "塔吉克斯坦",
  "value": "TJK" },

{
  "label": "泰国",
  "value": "THA" },

{
  "label": "坦桑尼亚",
  "value": "TZA" },

{
  "label": "汤加",
  "value": "TON" },

{
  "label": "特克斯和凯克特斯群岛",
  "value": "TCA" },

{
  "label": "特里斯坦达昆哈",
  "value": "TAA" },

{
  "label": "特立尼达和多巴哥",
  "value": "TTO" },

{
  "label": "突尼斯",
  "value": "TUN" },

{
  "label": "图瓦卢",
  "value": "TUV" },

{
  "label": "土耳其",
  "value": "TUR" },

{
  "label": "土库曼斯坦",
  "value": "TKM" },

{
  "label": "托克劳",
  "value": "TKL" },

{
  "label": "瓦利斯和福图纳",
  "value": "WLF" },

{
  "label": "瓦努阿图",
  "value": "VUT" },

{
  "label": "危地马拉",
  "value": "GTM" },

{
  "label": "维尔京群岛，美属",
  "value": "VIR" },

{
  "label": "维尔京群岛，英属",
  "value": "VGB" },

{
  "label": "委内瑞拉",
  "value": "VEN" },

{
  "label": "文莱",
  "value": "BRN" },

{
  "label": "乌干达",
  "value": "UGA" },

{
  "label": "乌克兰",
  "value": "UKR" },

{
  "label": "乌拉圭",
  "value": "URY" },

{
  "label": "乌兹别克斯坦",
  "value": "UZB" },

{
  "label": "西班牙",
  "value": "ESP" },

{
  "label": "希腊",
  "value": "GRC" },

{
  "label": "新加坡",
  "value": "SGP" },

{
  "label": "新喀里多尼亚",
  "value": "NCL" },

{
  "label": "新西兰",
  "value": "NZL" },

{
  "label": "匈牙利",
  "value": "HUN" },

{
  "label": "叙利亚",
  "value": "SYR" },

{
  "label": "牙买加",
  "value": "JAM" },

{
  "label": "亚美尼亚",
  "value": "ARM" },

{
  "label": "也门",
  "value": "YEM" },

{
  "label": "伊拉克",
  "value": "IRQ" },

{
  "label": "伊朗",
  "value": "IRN" },

{
  "label": "以色列",
  "value": "ISR" },

{
  "label": "意大利",
  "value": "ITA" },

{
  "label": "印度",
  "value": "IND" },

{
  "label": "印度尼西亚",
  "value": "IDN" },

{
  "label": "英国",
  "value": "GBR" },

{
  "label": "英属印度洋领地",
  "value": "IOT" },

{
  "label": "约旦",
  "value": "JOR" },

{
  "label": "越南",
  "value": "VNM" },

{
  "label": "赞比亚",
  "value": "ZMB" },

{
  "label": "泽西岛",
  "value": "JEY" },

{
  "label": "乍得",
  "value": "TCD" },

{
  "label": "直布罗陀",
  "value": "GIB" },

{
  "label": "智利",
  "value": "CHL" },

{
  "label": "中非共和国",
  "value": "CAF" }];var _default =


nationData;exports.default = _default;

/***/ }),

/***/ 568:
/*!**********************************************************************!*\
  !*** C:/workspace/zuosuo/shudong-master/uview-ui/libs/util/state.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var stateData = [
[{
  "label": "北京市",
  "value": "11" },
{
  "label": "天津市",
  "value": "12" },
{
  "label": "河北省",
  "value": "13" },
{
  "label": "山西省",
  "value": "14" },
{
  "label": "内蒙古自治区",
  "value": "15" },
{
  "label": "辽宁省",
  "value": "21" },
{
  "label": "吉林省",
  "value": "22" },
{
  "label": "黑龙江省",
  "value": "23" },
{
  "label": "上海市",
  "value": "31" },
{
  "label": "江苏省",
  "value": "32" },
{
  "label": "浙江省",
  "value": "33" },
{
  "label": "安徽省",
  "value": "34" },
{
  "label": "福建省",
  "value": "35" },
{
  "label": "江西省",
  "value": "36" },
{
  "label": "山东省",
  "value": "37" },
{
  "label": "河南省",
  "value": "41" },
{
  "label": "湖北省",
  "value": "42" },
{
  "label": "湖南省",
  "value": "43" },
{
  "label": "广东省",
  "value": "44" },
{
  "label": "广西壮族自治区",
  "value": "45" },
{
  "label": "海南省",
  "value": "46" },
{
  "label": "重庆市",
  "value": "50" },
{
  "label": "四川省",
  "value": "51" },
{
  "label": "贵州省",
  "value": "52" },
{
  "label": "云南省",
  "value": "53" },
{
  "label": "西藏自治区",
  "value": "54" },
{
  "label": "陕西省",
  "value": "61" },
{
  "label": "甘肃省",
  "value": "62" },
{
  "label": "青海省",
  "value": "63" },
{
  "label": "宁夏回族自治区",
  "value": "64" },
{
  "label": "新疆维吾尔自治区",
  "value": "65" },
{
  "label": "台湾",
  "value": "71" },
{
  "label": "香港",
  "value": "81" },
{
  "label": "澳门",
  "value": "82" }],

[{
  "label": "爱尔巴桑",
  "value": "ALB_EL" },
{
  "label": "迪勃拉",
  "value": "ALB_DI" },
{
  "label": "地拉那",
  "value": "ALB_TR" },
{
  "label": "都拉斯",
  "value": "ALB_DR" },
{
  "label": "发罗拉",
  "value": "ALB_VL" },
{
  "label": "费里",
  "value": "ALB_FR" },
{
  "label": "吉诺卡斯特",
  "value": "ALB_GJ" },
{
  "label": "科尔察",
  "value": "ALB_KO" },
{
  "label": "库克斯",
  "value": "ALB_KU" },
{
  "label": "莱什",
  "value": "ALB_LE" },
{
  "label": "培拉特",
  "value": "ALB_BR" },
{
  "label": "斯库台",
  "value": "ALB_SH" }],

[{
  "label": "阿德拉尔",
  "value": "DZA_ADR" },
{
  "label": "阿尔及尔",
  "value": "DZA_ALG" },
{
  "label": "艾因·德夫拉",
  "value": "DZA_ADE" },
{
  "label": "艾因·蒂姆尚特",
  "value": "DZA_ATE" },
{
  "label": "安纳巴",
  "value": "DZA_AAE" },
{
  "label": "奥兰",
  "value": "DZA_ORA" },
{
  "label": "巴特纳",
  "value": "DZA_BAT" },
{
  "label": "贝贾亚",
  "value": "DZA_BJA" },
{
  "label": "贝沙尔",
  "value": "DZA_BEC" },
{
  "label": "贝伊德",
  "value": "DZA_EBA" },
{
  "label": "比斯克拉",
  "value": "DZA_BIS" },
{
  "label": "布尔吉·布阿雷里吉",
  "value": "DZA_BOR" },
{
  "label": "布利达",
  "value": "DZA_BLI" },
{
  "label": "布迈德斯",
  "value": "DZA_BOU" },
{
  "label": "布依拉",
  "value": "DZA_BOA" },
{
  "label": "蒂巴扎",
  "value": "DZA_TIP" },
{
  "label": "蒂斯姆西勒特",
  "value": "DZA_TIS" },
{
  "label": "盖尔达耶",
  "value": "DZA_GHA" },
{
  "label": "盖尔马",
  "value": "DZA_GUE" },
{
  "label": "罕西拉",
  "value": "DZA_KHE" },
{
  "label": "赫利赞",
  "value": "DZA_REL" },
{
  "label": "吉杰尔",
  "value": "DZA_JIJ" },
{
  "label": "杰勒法",
  "value": "DZA_DJE" },
{
  "label": "君士坦丁",
  "value": "DZA_CZL" },
{
  "label": "拉格瓦特",
  "value": "DZA_LAG" },
{
  "label": "马斯卡拉",
  "value": "DZA_MUA" },
{
  "label": "麦迪亚",
  "value": "DZA_MED" },
{
  "label": "密拉",
  "value": "DZA_MIL" },
{
  "label": "莫斯塔加纳姆",
  "value": "DZA_MOS" },
{
  "label": "姆西拉",
  "value": "DZA_MSI" },
{
  "label": "纳阿马",
  "value": "DZA_NAA" },
{
  "label": "塞蒂夫",
  "value": "DZA_SET" },
{
  "label": "赛伊达",
  "value": "DZA_SAI" },
{
  "label": "斯基克达",
  "value": "DZA_SKI" },
{
  "label": "苏克·阿赫拉斯",
  "value": "DZA_SAH" },
{
  "label": "塔里夫",
  "value": "DZA_ETA" },
{
  "label": "塔曼拉塞特",
  "value": "DZA_TAM" },
{
  "label": "特贝萨",
  "value": "DZA_TEB" },
{
  "label": "特莱姆森",
  "value": "DZA_TLE" },
{
  "label": "提济乌祖",
  "value": "DZA_IOU" },
{
  "label": "提亚雷特",
  "value": "DZA_TIA" },
{
  "label": "廷杜夫",
  "value": "DZA_TIN" },
{
  "label": "瓦德",
  "value": "DZA_EOU" },
{
  "label": "瓦尔格拉",
  "value": "DZA_OUA" },
{
  "label": "乌姆布阿基",
  "value": "DZA_OEB" },
{
  "label": "西迪贝勒阿贝斯",
  "value": "DZA_SBA" },
{
  "label": "谢里夫",
  "value": "DZA_CHL" },
{
  "label": "伊利齐",
  "value": "DZA_ILL" }],

[{
  "label": "赫拉特",
  "value": "AFG_HEA" },
{
  "label": "喀布尔",
  "value": "AFG_KBL" },
{
  "label": "坎大哈",
  "value": "AFG_KDH" },
{
  "label": "马扎里沙里夫",
  "value": "AFG_MZR" }],

[{
  "label": "巴拉那",
  "value": "ARG_PRA" },
{
  "label": "别德马",
  "value": "ARG_VDM" },
{
  "label": "波萨达斯",
  "value": "ARG_PSS" },
{
  "label": "布兰卡港",
  "value": "ARG_BHI" },
{
  "label": "布宜诺斯艾利斯",
  "value": "ARG_BUE" },
{
  "label": "福莫萨",
  "value": "ARG_FMA" },
{
  "label": "胡胡伊",
  "value": "ARG_JUJ" },
{
  "label": "卡塔马卡",
  "value": "ARG_CTC" },
{
  "label": "科尔多瓦",
  "value": "ARG_COR" },
{
  "label": "科连特斯",
  "value": "ARG_CNQ" },
{
  "label": "克劳斯城",
  "value": "ARG_VLK" },
{
  "label": "肯考迪娅",
  "value": "ARG_COC" },
{
  "label": "拉里奥哈",
  "value": "ARG_IRJ" },
{
  "label": "拉普拉塔",
  "value": "ARG_LPG" },
{
  "label": "雷西斯滕匹亚",
  "value": "ARG_RES" },
{
  "label": "里奥加耶戈斯",
  "value": "ARG_RGL" },
{
  "label": "里奥夸尔托",
  "value": "ARG_RCU" },
{
  "label": "里瓦达维亚海军准将城",
  "value": "ARG_CRD" },
{
  "label": "罗萨里奥",
  "value": "ARG_ROS" },
{
  "label": "罗森",
  "value": "ARG_RWO" },
{
  "label": "马德普拉塔",
  "value": "ARG_MDQ" },
{
  "label": "门多萨",
  "value": "ARG_MDZ" },
{
  "label": "内乌肯",
  "value": "ARG_NQN" },
{
  "label": "萨尔塔",
  "value": "ARG_SLA" },
{
  "label": "圣地亚哥-德尔埃斯特罗",
  "value": "ARG_SDE" },
{
  "label": "圣菲",
  "value": "ARG_SFN" },
{
  "label": "圣胡安",
  "value": "ARG_UAQ" },
{
  "label": "圣拉斐尔",
  "value": "ARG_AFA" },
{
  "label": "圣路易斯",
  "value": "ARG_LUQ" },
{
  "label": "圣罗莎",
  "value": "ARG_RSA" },
{
  "label": "圣米格尔-德图库曼",
  "value": "ARG_SMC" },
{
  "label": "圣尼古拉斯",
  "value": "ARG_SNS" },
{
  "label": "特雷利乌",
  "value": "ARG_REL" },
{
  "label": "乌斯怀亚",
  "value": "ARG_USH" }],

[{
  "label": "阿布扎比",
  "value": "ARE_AZ" },
{
  "label": "艾因",
  "value": "ARE_AL" },
{
  "label": "迪拜",
  "value": "ARE_DU" },
{
  "label": "沙迦",
  "value": "ARE_SH" }],

[{
  "label": "阿鲁巴",
  "value": "ABW_bak" }],

[{
  "label": "巴提奈地区",
  "value": "OMN_BA" },
{
  "label": "达希莱地区",
  "value": "OMN_ZA" },
{
  "label": "东部地区",
  "value": "OMN_SH" },
{
  "label": "马斯喀特省",
  "value": "OMN_MA" },
{
  "label": "穆桑达姆省",
  "value": "OMN_MU" },
{
  "label": "内地地区",
  "value": "OMN_DA" },
{
  "label": "中部地区",
  "value": "OMN_WU" },
{
  "label": "佐法尔省",
  "value": "OMN_ZU" }],

[{
  "label": "阿布歇隆",
  "value": "AZE_ABS" },
{
  "label": "哈奇马斯",
  "value": "AZE_XAC" },
{
  "label": "卡尔巴卡尔",
  "value": "AZE_KAL" },
{
  "label": "卡扎赫",
  "value": "AZE_QAZ" },
{
  "label": "连科兰",
  "value": "AZE_LAN" },
{
  "label": "密尔-卡拉巴赫",
  "value": "AZE_MQA" },
{
  "label": "穆甘-萨连",
  "value": "AZE_MSA" },
{
  "label": "纳戈尔诺－卡拉巴赫",
  "value": "AZE_NQA" },
{
  "label": "纳希切万",
  "value": "AZE_NX" },
{
  "label": "普利亚拉克斯",
  "value": "AZE_PRI" },
{
  "label": "舍基",
  "value": "AZE_SA" },
{
  "label": "苏姆盖特",
  "value": "AZE_SMC" },
{
  "label": "锡尔万",
  "value": "AZE_SIR" },
{
  "label": "占贾",
  "value": "AZE_GA" }],

[{
  "label": "阿森松岛",
  "value": "ASC_bak" }],

[{
  "label": "阿斯旺",
  "value": "EGY_ASW" },
{
  "label": "古尔代盖",
  "value": "EGY_GBY" },
{
  "label": "开罗",
  "value": "EGY_CAI" },
{
  "label": "苏布拉开马",
  "value": "EGY_SKH" },
{
  "label": "亚历山大",
  "value": "EGY_ALY" }],

[{
  "label": "阿法尔",
  "value": "ETH_AF" },
{
  "label": "阿姆哈拉",
  "value": "ETH_AH" },
{
  "label": "奥罗米亚",
  "value": "ETH_OR" },
{
  "label": "宾香古尔",
  "value": "ETH_BG" },
{
  "label": "德雷达瓦",
  "value": "ETH_DD" },
{
  "label": "甘贝拉各族",
  "value": "ETH_GB" },
{
  "label": "哈勒里民族",
  "value": "ETH_HR" },
{
  "label": "南方各族",
  "value": "ETH_SN" },
{
  "label": "索马里",
  "value": "ETH_SM" },
{
  "label": "提格雷",
  "value": "ETH_TG" },
{
  "label": "亚的斯亚贝巴",
  "value": "ETH_AA" }],

[{
  "label": "奥法利",
  "value": "IRL_OF" },
{
  "label": "蒂珀雷里",
  "value": "IRL_TP" },
{
  "label": "都柏林",
  "value": "IRL_DB" },
{
  "label": "多内加尔",
  "value": "IRL_DG" },
{
  "label": "戈尔韦",
  "value": "IRL_GW" },
{
  "label": "基尔代尔",
  "value": "IRL_KD" },
{
  "label": "基尔肯尼",
  "value": "IRL_KK" },
{
  "label": "卡范",
  "value": "IRL_CV" },
{
  "label": "卡洛",
  "value": "IRL_CW" },
{
  "label": "凯里",
  "value": "IRL_KR" },
{
  "label": "科克",
  "value": "IRL_CK" },
{
  "label": "克莱尔",
  "value": "IRL_CL" },
{
  "label": "朗福德",
  "value": "IRL_LF" },
{
  "label": "劳斯",
  "value": "IRL_LT" },
{
  "label": "崂斯",
  "value": "IRL_LA" },
{
  "label": "利默里克",
  "value": "IRL_LM" },
{
  "label": "利特里姆",
  "value": "IRL_LR" },
{
  "label": "罗斯康芒",
  "value": "IRL_RC" },
{
  "label": "梅奥",
  "value": "IRL_MY" },
{
  "label": "米斯",
  "value": "IRL_MT" },
{
  "label": "莫内根",
  "value": "IRL_MG" },
{
  "label": "斯莱戈",
  "value": "IRL_SL" },
{
  "label": "威克洛",
  "value": "IRL_WK" },
{
  "label": "韦克斯福德",
  "value": "IRL_WX" },
{
  "label": "沃特福德",
  "value": "IRL_WF" },
{
  "label": "西米斯",
  "value": "IRL_WM" }],

[{
  "label": "贝尔瓦",
  "value": "EST_65" },
{
  "label": "哈留",
  "value": "EST_37" },
{
  "label": "拉普拉",
  "value": "EST_70" },
{
  "label": "里亚内",
  "value": "EST_57" },
{
  "label": "帕尔努",
  "value": "EST_67" },
{
  "label": "萨雷",
  "value": "EST_74" },
{
  "label": "塔尔图",
  "value": "EST_78" },
{
  "label": "瓦尔加",
  "value": "EST_82" },
{
  "label": "维良地",
  "value": "EST_84" },
{
  "label": "维鲁",
  "value": "EST_59" },
{
  "label": "沃鲁",
  "value": "EST_86" },
{
  "label": "希尤",
  "value": "EST_39" },
{
  "label": "耶尔韦",
  "value": "EST_51" },
{
  "label": "耶盖瓦",
  "value": "EST_49" },
{
  "label": "依达－维鲁",
  "value": "EST_44" }],

[{
  "label": "安道尔城",
  "value": "AND_7" },
{
  "label": "奥尔迪诺",
  "value": "AND_5" },
{
  "label": "恩坎普",
  "value": "AND_3" },
{
  "label": "卡尼略",
  "value": "AND_2" },
{
  "label": "莱塞斯卡尔德－恩戈尔达",
  "value": "AND_8" },
{
  "label": "马萨纳",
  "value": "AND_4" },
{
  "label": "圣胡利娅－德洛里亚",
  "value": "AND_6" }],

[{
  "label": "北宽扎",
  "value": "AGO_CNO" },
{
  "label": "北隆达",
  "value": "AGO_LNO" },
{
  "label": "本戈",
  "value": "AGO_BGO" },
{
  "label": "本格拉",
  "value": "AGO_BGU" },
{
  "label": "比耶",
  "value": "AGO_BIE" },
{
  "label": "卡宾达",
  "value": "AGO_CAB" },
{
  "label": "库内内",
  "value": "AGO_CNN" },
{
  "label": "宽多库邦戈",
  "value": "AGO_CCU" },
{
  "label": "罗安达",
  "value": "AGO_LUA" },
{
  "label": "马兰热",
  "value": "AGO_MAL" },
{
  "label": "莫希科",
  "value": "AGO_MOX" },
{
  "label": "纳米贝",
  "value": "AGO_NAM" },
{
  "label": "南宽扎",
  "value": "AGO_CUS" },
{
  "label": "南隆达",
  "value": "AGO_LSU" },
{
  "label": "万博",
  "value": "AGO_HUA" },
{
  "label": "威拉",
  "value": "AGO_HUI" },
{
  "label": "威热",
  "value": "AGO_UIG" },
{
  "label": "扎伊尔",
  "value": "AGO_ZAI" }],

[{
  "label": "安圭拉",
  "value": "AIA_bak" }],

[{
  "label": "安提瓜岛和巴布达",
  "value": "ATG_bak" }],

[{
  "label": "澳大利亚",
  "value": "AUS_bak" }],

[{
  "label": "布尔根兰",
  "value": "AUT_BUR" },
{
  "label": "蒂罗尔",
  "value": "AUT_TYR" },
{
  "label": "福拉尔贝格",
  "value": "AUT_VOR" },
{
  "label": "克恩顿",
  "value": "AUT_CAT" },
{
  "label": "萨尔茨堡",
  "value": "AUT_SZG" },
{
  "label": "上奥地利",
  "value": "AUT_UAU" },
{
  "label": "施蒂利亚",
  "value": "AUT_STY" },
{
  "label": "维也纳",
  "value": "AUT_VDD" },
{
  "label": "下奥地利",
  "value": "AUT_LAU" }],

[{
  "label": "奥兰群岛",
  "value": "ALA_bak" }],

[{
  "label": "巴巴多斯岛",
  "value": "BRB_bak" }],

[{
  "label": "北部",
  "value": "PNG_NO" },
{
  "label": "布干维尔",
  "value": "PNG_BV" },
{
  "label": "东部高地",
  "value": "PNG_EH" },
{
  "label": "东塞皮克",
  "value": "PNG_ES" },
{
  "label": "东新不列颠",
  "value": "PNG_EB" },
{
  "label": "恩加",
  "value": "PNG_EN" },
{
  "label": "海湾",
  "value": "PNG_GU" },
{
  "label": "马当",
  "value": "PNG_MD" },
{
  "label": "马努斯",
  "value": "PNG_MN" },
{
  "label": "米尔恩湾",
  "value": "PNG_MB" },
{
  "label": "莫尔兹比港",
  "value": "PNG_NC" },
{
  "label": "莫罗贝",
  "value": "PNG_MR" },
{
  "label": "南部高地",
  "value": "PNG_SH" },
{
  "label": "钦布",
  "value": "PNG_SI" },
{
  "label": "桑道恩",
  "value": "PNG_SA" },
{
  "label": "西部",
  "value": "PNG_WE" },
{
  "label": "西部高地",
  "value": "PNG_WH" },
{
  "label": "西新不列颠",
  "value": "PNG_WB" },
{
  "label": "新爱尔兰",
  "value": "PNG_NI" }],

[{
  "label": "巴哈马",
  "value": "BHS_bak" }],

[{
  "label": "白沙瓦",
  "value": "PAK_PEW" },
{
  "label": "费萨拉巴德",
  "value": "PAK_LYP" },
{
  "label": "故吉软瓦拉",
  "value": "PAK_GUJ" },
{
  "label": "海德拉巴",
  "value": "PAK_HDD" },
{
  "label": "卡拉奇",
  "value": "PAK_KCT" },
{
  "label": "拉合尔",
  "value": "PAK_LHE" },
{
  "label": "拉瓦尔品第",
  "value": "PAK_RWP" },
{
  "label": "木尔坦",
  "value": "PAK_MUX" },
{
  "label": "伊斯兰堡",
  "value": "PAK_ISB" }],

[{
  "label": "阿曼拜",
  "value": "PRY_AM" },
{
  "label": "阿耶斯总统省",
  "value": "PRY_PH" },
{
  "label": "巴拉瓜里",
  "value": "PRY_PA" },
{
  "label": "博克龙",
  "value": "PRY_BO" },
{
  "label": "瓜伊拉",
  "value": "PRY_GU" },
{
  "label": "卡瓜苏",
  "value": "PRY_CG" },
{
  "label": "卡嫩迪尤",
  "value": "PRY_CN" },
{
  "label": "卡萨帕",
  "value": "PRY_CZ" },
{
  "label": "康塞普西翁",
  "value": "PRY_CC" },
{
  "label": "科迪勒拉",
  "value": "PRY_CD" },
{
  "label": "米西奥内斯",
  "value": "PRY_MI" },
{
  "label": "涅恩布库",
  "value": "PRY_NE" },
{
  "label": "上巴拉圭",
  "value": "PRY_AG" },
{
  "label": "上巴拉那",
  "value": "PRY_AN" },
{
  "label": "圣佩德罗",
  "value": "PRY_SP" },
{
  "label": "亚松森特别区",
  "value": "PRY_AS" },
{
  "label": "伊塔普亚",
  "value": "PRY_IT" },
{
  "label": "中央",
  "value": "PRY_CE" }],

[{
  "label": "加沙地带",
  "value": "PSE_GZ" },
{
  "label": "西岸",
  "value": "PSE_WE" }],

[{
  "label": "北部",
  "value": "BHR_5" },
{
  "label": "哈德",
  "value": "BHR_1" },
{
  "label": "哈马德",
  "value": "BHR_12" },
{
  "label": "里法",
  "value": "BHR_9" },
{
  "label": "麦纳麦",
  "value": "BHR_3" },
{
  "label": "穆哈拉格",
  "value": "BHR_2" },
{
  "label": "西部",
  "value": "BHR_10" },
{
  "label": "伊萨城",
  "value": "BHR_8" },
{
  "label": "中部",
  "value": "BHR_7" }],

[{
  "label": "巴拿马",
  "value": "PAN_bak" }],

[{
  "label": "阿克里",
  "value": "BRA_AC" },
{
  "label": "阿拉戈斯",
  "value": "BRA_AL" },
{
  "label": "阿马帕",
  "value": "BRA_AP" },
{
  "label": "巴拉那",
  "value": "BRA_PR" },
{
  "label": "巴西利亚",
  "value": "BRA_BSB" },
{
  "label": "巴伊亚",
  "value": "BRA_BA" },
{
  "label": "北里奥格兰德",
  "value": "BRA_RN" },
{
  "label": "伯南布哥",
  "value": "BRA_PE" },
{
  "label": "戈亚斯",
  "value": "BRA_GO" },
{
  "label": "朗多尼亚",
  "value": "BRA_RO" },
{
  "label": "里约热内卢",
  "value": "BRA_RJ" },
{
  "label": "罗赖马",
  "value": "BRA_RR" },
{
  "label": "马拉尼昂",
  "value": "BRA_MA" },
{
  "label": "马托格罗索",
  "value": "BRA_MT" },
{
  "label": "米纳斯吉拉斯",
  "value": "BRA_MG" },
{
  "label": "南里奥格兰德",
  "value": "BRA_RS" },
{
  "label": "南马托格罗索",
  "value": "BRA_MS" },
{
  "label": "帕拉",
  "value": "BRA_PA" },
{
  "label": "帕拉伊巴",
  "value": "BRA_PB" },
{
  "label": "皮奥伊",
  "value": "BRA_PI" },
{
  "label": "塞阿拉",
  "value": "BRA_CE" },
{
  "label": "塞尔希培",
  "value": "BRA_SE" },
{
  "label": "圣埃斯皮里图",
  "value": "BRA_ES" },
{
  "label": "圣保罗",
  "value": "BRA_SP" },
{
  "label": "圣卡塔琳娜",
  "value": "BRA_SC" },
{
  "label": "托坎廷斯",
  "value": "BRA_TO" },
{
  "label": "亚马孙",
  "value": "BRA_AM" }],

[{
  "label": "布列斯特",
  "value": "BLR_BR" },
{
  "label": "戈梅利",
  "value": "BLR_HO" },
{
  "label": "格罗德诺",
  "value": "BLR_HR" },
{
  "label": "明斯克市",
  "value": "BLR_MI" },
{
  "label": "莫吉廖夫",
  "value": "BLR_MA" },
{
  "label": "维捷布斯克",
  "value": "BLR_VI" }],

[{
  "label": "百慕大",
  "value": "BMU_bak" }],

[{
  "label": "布尔加斯",
  "value": "BGR_BOJ" },
{
  "label": "卡斯科伏",
  "value": "BGR_KHO" },
{
  "label": "鲁塞",
  "value": "BGR_ROU" },
{
  "label": "洛维奇",
  "value": "BGR_LVP" },
{
  "label": "蒙塔纳",
  "value": "BGR_OZA" },
{
  "label": "普罗夫迪夫",
  "value": "BGR_PDV" },
{
  "label": "索非亚",
  "value": "BGR_SOF" },
{
  "label": "索非亚市",
  "value": "BGR_GSO" },
{
  "label": "瓦尔纳",
  "value": "BGR_VAR" }],

[{
  "label": "北马里亚纳群岛",
  "value": "MNP_bak" }],

[{
  "label": "阿黎博里",
  "value": "BEN_AL" },
{
  "label": "阿塔科拉",
  "value": "BEN_AK" },
{
  "label": "滨海",
  "value": "BEN_LI" },
{
  "label": "波希康市",
  "value": "BEN_BOH" },
{
  "label": "博尔古",
  "value": "BEN_BO" },
{
  "label": "大西洋",
  "value": "BEN_AQ" },
{
  "label": "高原",
  "value": "BEN_PL" },
{
  "label": "库福",
  "value": "BEN_KO" },
{
  "label": "莫诺",
  "value": "BEN_MO" },
{
  "label": "丘陵",
  "value": "BEN_CO" },
{
  "label": "韦梅",
  "value": "BEN_OU" },
{
  "label": "峡谷",
  "value": "BEN_DO" },
{
  "label": "祖",
  "value": "BEN_ZO" }],

[{
  "label": "埃诺",
  "value": "BEL_WHT" },
{
  "label": "安特卫普",
  "value": "BEL_VAN" },
{
  "label": "布拉班特-瓦隆",
  "value": "BEL_WBR" },
{
  "label": "布鲁塞尔",
  "value": "BEL_BRU" },
{
  "label": "东佛兰德",
  "value": "BEL_VOV" },
{
  "label": "佛兰芒-布拉班特",
  "value": "BEL_VBR" },
{
  "label": "列日",
  "value": "BEL_WLG" },
{
  "label": "林堡",
  "value": "BEL_VLI" },
{
  "label": "卢森堡",
  "value": "BEL_WLX" },
{
  "label": "那慕尔",
  "value": "BEL_WNA" },
{
  "label": "西佛兰德",
  "value": "BEL_VWV" }],

[{
  "label": "冰岛",
  "value": "ISL_bak" }],

[{
  "label": "波多黎各",
  "value": "PRI_bak" }],

[{
  "label": "埃尔布隆格",
  "value": "POL_ELB" },
{
  "label": "奥尔什丁",
  "value": "POL_OLS" },
{
  "label": "奥斯特罗文卡",
  "value": "POL_OSS" },
{
  "label": "比得哥什",
  "value": "POL_BZG" },
{
  "label": "彼得库夫",
  "value": "POL_PIO" },
{
  "label": "比托姆",
  "value": "POL_BYT" },
{
  "label": "比亚瓦波德拉斯卡",
  "value": "POL_BAP" },
{
  "label": "比亚维斯托克",
  "value": "POL_BIA" },
{
  "label": "波莱",
  "value": "POL_OPO" },
{
  "label": "波兹南",
  "value": "POL_POZ" },
{
  "label": "达布罗瓦戈尼察",
  "value": "POL_DAB" },
{
  "label": "大波兰地区戈茹夫",
  "value": "POL_GOW" },
{
  "label": "弗罗茨瓦夫",
  "value": "POL_WRO" },
{
  "label": "弗沃茨瓦韦克",
  "value": "POL_WLO" },
{
  "label": "格但斯克",
  "value": "POL_GDN" },
{
  "label": "格丁尼亚",
  "value": "POL_GDY" },
{
  "label": "格利维采",
  "value": "POL_GWC" },
{
  "label": "格鲁琼兹",
  "value": "POL_GRU" },
{
  "label": "海乌姆",
  "value": "POL_CHO" },
{
  "label": "华沙",
  "value": "POL_WAW" },
{
  "label": "霍茹夫",
  "value": "POL_CHZ" },
{
  "label": "卡利什",
  "value": "POL_KAL" },
{
  "label": "卡托维兹",
  "value": "POL_KTW" },
{
  "label": "凯尔采",
  "value": "POL_KLC" },
{
  "label": "科宁",
  "value": "POL_KON" },
{
  "label": "科沙林",
  "value": "POL_OSZ" },
{
  "label": "克拉科夫",
  "value": "POL_KRK" },
{
  "label": "克罗斯诺",
  "value": "POL_KRO" },
{
  "label": "拉多姆",
  "value": "POL_RDM" },
{
  "label": "莱格尼察",
  "value": "POL_LEG" },
{
  "label": "莱什诺",
  "value": "POL_LEZ" },
{
  "label": "卢布林",
  "value": "POL_LUL" },
{
  "label": "鲁达",
  "value": "POL_RDS" },
{
  "label": "罗兹",
  "value": "POL_LOD" },
{
  "label": "绿山城",
  "value": "POL_IEG" },
{
  "label": "米什洛维采",
  "value": "POL_MYL" },
{
  "label": "皮瓦",
  "value": "POL_PIL" },
{
  "label": "普热梅希尔",
  "value": "POL_PRZ" },
{
  "label": "普沃茨克",
  "value": "POL_PLO" },
{
  "label": "切哈努夫",
  "value": "POL_CIE" },
{
  "label": "热舒夫",
  "value": "POL_RZE" },
{
  "label": "什切青",
  "value": "POL_SZZ" },
{
  "label": "斯凯尔涅维采",
  "value": "POL_SKI" },
{
  "label": "斯武普斯克",
  "value": "POL_SLP" },
{
  "label": "苏瓦乌基",
  "value": "POL_SWL" },
{
  "label": "索波特",
  "value": "POL_SOP" },
{
  "label": "索斯诺维茨",
  "value": "POL_SWC" },
{
  "label": "塔尔努夫",
  "value": "POL_TAR" },
{
  "label": "塔尔诺布热格",
  "value": "POL_QEP" },
{
  "label": "特切",
  "value": "POL_TYY" },
{
  "label": "托伦",
  "value": "POL_TOR" },
{
  "label": "瓦乌布日赫",
  "value": "POL_WZH" },
{
  "label": "沃姆扎",
  "value": "POL_QOY" },
{
  "label": "希米亚诺维采",
  "value": "POL_SOW" },
{
  "label": "希维诺乌伊希切",
  "value": "POL_SWI" },
{
  "label": "希维托赫洛维采",
  "value": "POL_SWT" },
{
  "label": "谢德尔采",
  "value": "POL_SDC" },
{
  "label": "谢拉兹",
  "value": "POL_SIR" },
{
  "label": "新松奇",
  "value": "POL_NOW" },
{
  "label": "雅沃兹诺",
  "value": "POL_JAW" },
{
  "label": "耶莱尼亚古拉",
  "value": "POL_JEG" },
{
  "label": "扎布热",
  "value": "POL_ZAB" },
{
  "label": "扎莫希奇",
  "value": "POL_ZAM" }],

[{
  "label": "奥尔托",
  "value": "BOL_ALT" },
{
  "label": "奥鲁罗",
  "value": "BOL_ORU" },
{
  "label": "贝尼",
  "value": "BOL_BEN" },
{
  "label": "波多西",
  "value": "BOL_POI" },
{
  "label": "基拉科洛",
  "value": "BOL_QUI" },
{
  "label": "科恰班巴",
  "value": "BOL_CBB" },
{
  "label": "拉巴斯",
  "value": "BOL_LPB" },
{
  "label": "潘多",
  "value": "BOL_PAN" },
{
  "label": "丘基萨卡",
  "value": "BOL_CHU" },
{
  "label": "萨卡巴",
  "value": "BOL_SAC" },
{
  "label": "圣克鲁斯",
  "value": "BOL_SRZ" },
{
  "label": "塔里哈",
  "value": "BOL_TJA" }],

[{
  "label": "波萨维纳",
  "value": "BIH_FPO" },
{
  "label": "波斯尼亚－波德里涅",
  "value": "BIH_FBP" },
{
  "label": "多米斯拉夫格勒",
  "value": "BIH_FTO" },
{
  "label": "黑塞哥维那－涅雷特瓦",
  "value": "BIH_FHN" },
{
  "label": "萨拉热窝",
  "value": "BIH_FSA" },
{
  "label": "图兹拉－波德里涅",
  "value": "BIH_FTU" },
{
  "label": "乌纳－萨纳",
  "value": "BIH_FUS" },
{
  "label": "西波斯尼亚",
  "value": "BIH_FHB" },
{
  "label": "西黑塞哥维那",
  "value": "BIH_FZH" },
{
  "label": "泽尼察－多博伊",
  "value": "BIH_FZE" },
{
  "label": "中波斯尼亚",
  "value": "BIH_FSB" }],

[{
  "label": "博茨瓦纳",
  "value": "BWA_bak" }],

[{
  "label": "伯利兹",
  "value": "BLZ_BZ" },
{
  "label": "橘园",
  "value": "BLZ_OW" },
{
  "label": "卡约",
  "value": "BLZ_CY" },
{
  "label": "科罗萨尔",
  "value": "BLZ_CR" },
{
  "label": "斯坦港",
  "value": "BLZ_SC" },
{
  "label": "托莱多",
  "value": "BLZ_TO" }],

[{
  "label": "不丹",
  "value": "BTN_bak" }],

[{
  "label": "巴雷",
  "value": "BFA_BAL" },
{
  "label": "巴姆",
  "value": "BFA_BAM" },
{
  "label": "巴瓦",
  "value": "BFA_BAN" },
{
  "label": "巴泽加",
  "value": "BFA_BAZ" },
{
  "label": "波尼",
  "value": "BFA_PON" },
{
  "label": "布尔古",
  "value": "BFA_BLG" },
{
  "label": "布尔基恩德",
  "value": "BFA_BOK" },
{
  "label": "布古里巴",
  "value": "BFA_BOR" },
{
  "label": "冈祖尔古",
  "value": "BFA_GAN" },
{
  "label": "古尔马",
  "value": "BFA_GOU" },
{
  "label": "济罗",
  "value": "BFA_ZIR" },
{
  "label": "卡焦戈",
  "value": "BFA_KAD" },
{
  "label": "凯内杜古",
  "value": "BFA_KEN" },
{
  "label": "科蒙加里",
  "value": "BFA_KOO" },
{
  "label": "科莫埃",
  "value": "BFA_COM" },
{
  "label": "孔皮恩加",
  "value": "BFA_KOP" },
{
  "label": "孔西",
  "value": "BFA_KOS" },
{
  "label": "库尔佩罗戈",
  "value": "BFA_KOL" },
{
  "label": "库尔维奥戈",
  "value": "BFA_KOW" },
{
  "label": "库里滕加",
  "value": "BFA_KOT" },
{
  "label": "雷拉巴",
  "value": "BFA_LER" },
{
  "label": "罗卢姆",
  "value": "BFA_LOR" },
{
  "label": "穆翁",
  "value": "BFA_MOU" },
{
  "label": "纳门滕加",
  "value": "BFA_NAM" },
{
  "label": "纳乌里",
  "value": "BFA_NAH" },
{
  "label": "纳亚拉",
  "value": "BFA_NAY" },
{
  "label": "尼亚尼亚",
  "value": "BFA_GNA" },
{
  "label": "努姆比埃尔",
  "value": "BFA_NOU" },
{
  "label": "帕索雷",
  "value": "BFA_PAS" },
{
  "label": "塞诺",
  "value": "BFA_SEN" },
{
  "label": "桑吉",
  "value": "BFA_SAG" },
{
  "label": "桑马滕加",
  "value": "BFA_SAM" },
{
  "label": "苏鲁",
  "value": "BFA_SOR" },
{
  "label": "苏姆",
  "value": "BFA_SOM" },
{
  "label": "塔波阿",
  "value": "BFA_TAP" },
{
  "label": "图伊",
  "value": "BFA_TUY" },
{
  "label": "乌埃",
  "value": "BFA_HOU" },
{
  "label": "乌布里滕加",
  "value": "BFA_OUB" },
{
  "label": "乌达兰",
  "value": "BFA_OUD" },
{
  "label": "锡西里",
  "value": "BFA_SIS" },
{
  "label": "亚加",
  "value": "BFA_YAG" },
{
  "label": "亚滕加",
  "value": "BFA_YAT" },
{
  "label": "伊奥巴",
  "value": "BFA_IOA" },
{
  "label": "宗德韦奥戈",
  "value": "BFA_ZOW" },
{
  "label": "宗多马",
  "value": "BFA_ZOD" }],

[{
  "label": "布班扎",
  "value": "BDI_BB" },
{
  "label": "布鲁里",
  "value": "BDI_BR" },
{
  "label": "布琼布拉城市",
  "value": "BDI_BM" },
{
  "label": "布琼布拉乡村",
  "value": "BDI_BU" },
{
  "label": "恩戈齐",
  "value": "BDI_NG" },
{
  "label": "基龙多",
  "value": "BDI_KI" },
{
  "label": "基特加",
  "value": "BDI_GI" },
{
  "label": "卡鲁济",
  "value": "BDI_KR" },
{
  "label": "卡扬扎",
  "value": "BDI_KY" },
{
  "label": "坎库佐",
  "value": "BDI_CA" },
{
  "label": "鲁塔纳",
  "value": "BDI_RT" },
{
  "label": "鲁伊吉",
  "value": "BDI_RY" },
{
  "label": "马坎巴",
  "value": "BDI_MA" },
{
  "label": "穆拉姆维亚",
  "value": "BDI_MU" },
{
  "label": "穆瓦洛",
  "value": "BDI_MW" },
{
  "label": "穆因加",
  "value": "BDI_MY" },
{
  "label": "锡比托凯",
  "value": "BDI_CI" }],

[{
  "label": "布韦岛",
  "value": "BVT_bak" }],

[{
  "label": "海州",
  "value": "PRK_HAE" },
{
  "label": "惠山",
  "value": "PRK_HYE" },
{
  "label": "江界",
  "value": "PRK_KAN" },
{
  "label": "开城",
  "value": "PRK_KSN" },
{
  "label": "罗先",
  "value": "PRK_NAS" },
{
  "label": "南浦",
  "value": "PRK_NAM" },
{
  "label": "平壤",
  "value": "PRK_FNJ" },
{
  "label": "清津",
  "value": "PRK_CHO" },
{
  "label": "沙里院",
  "value": "PRK_SAR" },
{
  "label": "咸兴",
  "value": "PRK_HAM" },
{
  "label": "新义州",
  "value": "PRK_SII" },
{
  "label": "元山",
  "value": "PRK_WON" }],

[{
  "label": "奥胡斯",
  "value": "DNK_AR" },
{
  "label": "北日德兰",
  "value": "DNK_VSV" },
{
  "label": "博恩霍尔姆",
  "value": "DNK_BO" },
{
  "label": "菲特烈堡",
  "value": "DNK_FRE" },
{
  "label": "菲茵",
  "value": "DNK_FY" },
{
  "label": "哥本哈根",
  "value": "DNK_CPH" },
{
  "label": "里伯",
  "value": "DNK_RIB" },
{
  "label": "灵克宾",
  "value": "DNK_RKG" },
{
  "label": "罗斯基勒",
  "value": "DNK_RKE" },
{
  "label": "南日德兰",
  "value": "DNK_VBI" },
{
  "label": "斯多斯特姆",
  "value": "DNK_ST" },
{
  "label": "维堡",
  "value": "DNK_VIB" },
{
  "label": "维厄勒",
  "value": "DNK_VEJ" },
{
  "label": "西希兰",
  "value": "DNK_VS" }],

[{
  "label": "阿恩斯贝格",
  "value": "DEU_ARN" },
{
  "label": "爱尔福特",
  "value": "DEU_ERF" },
{
  "label": "安斯巴格",
  "value": "DEU_ANS" },
{
  "label": "奥格斯堡",
  "value": "DEU_AGB" },
{
  "label": "柏林",
  "value": "DEU_BE" },
{
  "label": "拜伊罗特",
  "value": "DEU_BYU" },
{
  "label": "比勒费尔德",
  "value": "DEU_BFE" },
{
  "label": "波茨坦",
  "value": "DEU_POT" },
{
  "label": "波鸿",
  "value": "DEU_BOM" },
{
  "label": "不来梅",
  "value": "DEU_HB" },
{
  "label": "不伦瑞克",
  "value": "DEU_BRW" },
{
  "label": "达姆施塔特",
  "value": "DEU_DAR" },
{
  "label": "代特莫尔特",
  "value": "DEU_DET" },
{
  "label": "德累斯顿",
  "value": "DEU_DRS" },
{
  "label": "德绍",
  "value": "DEU_DES" },
{
  "label": "杜塞尔多夫",
  "value": "DEU_DUS" },
{
  "label": "法兰克福",
  "value": "DEU_FFO" },
{
  "label": "弗赖堡",
  "value": "DEU_FBG" },
{
  "label": "哈雷",
  "value": "DEU_HAE" },
{
  "label": "汉堡",
  "value": "DEU_HH" },
{
  "label": "汉诺威",
  "value": "DEU_HAJ" },
{
  "label": "基尔",
  "value": "DEU_KEL" },
{
  "label": "吉森",
  "value": "DEU_GBN" },
{
  "label": "卡尔斯鲁厄",
  "value": "DEU_KAE" },
{
  "label": "卡塞尔",
  "value": "DEU_KAS" },
{
  "label": "开姆尼斯",
  "value": "DEU_CHE" },
{
  "label": "科布伦次",
  "value": "DEU_KOB" },
{
  "label": "科隆",
  "value": "DEU_CGN" },
{
  "label": "莱比锡",
  "value": "DEU_LEJ" },
{
  "label": "兰茨胡特",
  "value": "DEU_LDH" },
{
  "label": "吕讷堡",
  "value": "DEU_LBG" },
{
  "label": "马格德堡",
  "value": "DEU_MAG" },
{
  "label": "曼海姆",
  "value": "DEU_MHG" },
{
  "label": "美因兹",
  "value": "DEU_MAI" },
{
  "label": "明斯特",
  "value": "DEU_MUN" },
{
  "label": "慕尼黑",
  "value": "DEU_MUC" },
{
  "label": "纽伦堡",
  "value": "DEU_NUE" },
{
  "label": "什未林",
  "value": "DEU_SWH" },
{
  "label": "斯图加特",
  "value": "DEU_STR" },
{
  "label": "特里尔",
  "value": "DEU_TRI" },
{
  "label": "威斯巴登",
  "value": "DEU_WIB" },
{
  "label": "维尔茨堡",
  "value": "DEU_WUG" }],

[{
  "label": "阿伊莱乌",
  "value": "TLS_AL" },
{
  "label": "阿伊纳罗",
  "value": "TLS_AN" },
{
  "label": "埃尔梅拉",
  "value": "TLS_ER" },
{
  "label": "安贝诺",
  "value": "TLS_AM" },
{
  "label": "包考",
  "value": "TLS_BA" },
{
  "label": "博博纳罗",
  "value": "TLS_BO" },
{
  "label": "帝力",
  "value": "TLS_DI" },
{
  "label": "科瓦利马",
  "value": "TLS_KO" },
{
  "label": "劳滕",
  "value": "TLS_LA" },
{
  "label": "利基卡",
  "value": "TLS_LI" },
{
  "label": "马纳图托",
  "value": "TLS_MT" },
{
  "label": "马努法伊",
  "value": "TLS_MF" },
{
  "label": "维克克",
  "value": "TLS_VI" }],

[{
  "label": "滨海区",
  "value": "TGO_M" },
{
  "label": "草原区",
  "value": "TGO_S" },
{
  "label": "高原区",
  "value": "TGO_P" },
{
  "label": "卡拉区",
  "value": "TGO_K" },
{
  "label": "中部区",
  "value": "TGO_C" }],

[{
  "label": "多米尼加",
  "value": "DMA_bak" }],

[{
  "label": "多米尼加共和国",
  "value": "DOM_bak" }],

[{
  "label": "阿巴坎",
  "value": "RUS_ABA" },
{
  "label": "阿尔汉格尔斯克",
  "value": "RUS_ARK" },
{
  "label": "阿金斯科耶",
  "value": "RUS_AGI" },
{
  "label": "阿纳德尔",
  "value": "RUS_DYR" },
{
  "label": "阿斯特拉罕",
  "value": "RUS_AST" },
{
  "label": "埃利斯塔",
  "value": "RUS_ESL" },
{
  "label": "奥廖尔",
  "value": "RUS_ORL" },
{
  "label": "奥伦堡",
  "value": "RUS_ORE" },
{
  "label": "巴尔瑙尔",
  "value": "RUS_BAX" },
{
  "label": "奔萨",
  "value": "RUS_PNZ" },
{
  "label": "彼得罗巴甫洛夫斯克",
  "value": "RUS_PKC" },
{
  "label": "彼得罗扎沃茨克",
  "value": "RUS_PES" },
{
  "label": "彼尔姆",
  "value": "RUS_PER" },
{
  "label": "比罗比詹",
  "value": "RUS_BBZ" },
{
  "label": "别尔哥罗德",
  "value": "RUS_BEL" },
{
  "label": "伯力",
  "value": "RUS_COK" },
{
  "label": "布拉戈维申斯克",
  "value": "RUS_BQS" },
{
  "label": "布良斯克",
  "value": "RUS_BRY" },
{
  "label": "车里雅宾斯克",
  "value": "RUS_CHE" },
{
  "label": "赤塔",
  "value": "RUS_CHI" },
{
  "label": "顿河畔罗斯托夫",
  "value": "RUS_ROS" },
{
  "label": "鄂木斯克",
  "value": "RUS_OMS" },
{
  "label": "伏尔加格勒",
  "value": "RUS_VOG" },
{
  "label": "弗拉基米尔",
  "value": "RUS_VMR" },
{
  "label": "弗拉季高加索",
  "value": "RUS_VLA" },
{
  "label": "戈尔诺－阿尔泰斯克",
  "value": "RUS_GOA" },
{
  "label": "格罗兹尼",
  "value": "RUS_GRV" },
{
  "label": "海参崴",
  "value": "RUS_VVO" },
{
  "label": "汉特－曼西斯克",
  "value": "RUS_KHM" },
{
  "label": "基洛夫",
  "value": "RUS_KIR" },
{
  "label": "加里宁格勒",
  "value": "RUS_KGD" },
{
  "label": "喀山",
  "value": "RUS_KZN" },
{
  "label": "卡卢加",
  "value": "RUS_KLF" },
{
  "label": "科斯特罗马",
  "value": "RUS_KOS" },
{
  "label": "克拉斯诺达尔",
  "value": "RUS_KRR" },
{
  "label": "克拉斯诺亚尔斯克",
  "value": "RUS_KYA" },
{
  "label": "克麦罗沃",
  "value": "RUS_KEM" },
{
  "label": "克孜勒",
  "value": "RUS_KYZ" },
{
  "label": "库德姆卡尔",
  "value": "RUS_KUD" },
{
  "label": "库尔干",
  "value": "RUS_KRO" },
{
  "label": "库尔斯克",
  "value": "RUS_URS" },
{
  "label": "利佩茨克",
  "value": "RUS_LIP" },
{
  "label": "梁赞",
  "value": "RUS_RYA" },
{
  "label": "马哈奇卡拉",
  "value": "RUS_MCX" },
{
  "label": "马加丹",
  "value": "RUS_MAG" },
{
  "label": "马加斯",
  "value": "RUS_IN" },
{
  "label": "迈科普",
  "value": "RUS_MAY" },
{
  "label": "摩尔曼斯克",
  "value": "RUS_MMK" },
{
  "label": "莫斯科",
  "value": "RUS_MOW" },
{
  "label": "纳尔奇克",
  "value": "RUS_NAL" },
{
  "label": "纳里扬马尔",
  "value": "RUS_NNM" },
{
  "label": "南萨哈林斯克",
  "value": "RUS_JSA" },
{
  "label": "诺夫哥罗德",
  "value": "RUS_VUS" },
{
  "label": "帕拉纳",
  "value": "RUS_PAL" },
{
  "label": "普斯科夫",
  "value": "RUS_PSK" },
{
  "label": "切博克萨雷",
  "value": "RUS_CSY" },
{
  "label": "切尔克斯克",
  "value": "RUS_CKS" },
{
  "label": "秋明",
  "value": "RUS_TYU" },
{
  "label": "萨拉托夫",
  "value": "RUS_SAR" },
{
  "label": "萨兰斯克",
  "value": "RUS_SKX" },
{
  "label": "萨列哈尔德",
  "value": "RUS_SLY" },
{
  "label": "萨马拉",
  "value": "RUS_SAM" },
{
  "label": "瑟克特夫卡尔",
  "value": "RUS_SCW" },
{
  "label": "圣彼得堡",
  "value": "RUS_SPE" },
{
  "label": "斯摩棱斯克",
  "value": "RUS_LNX" },
{
  "label": "斯塔夫罗波尔",
  "value": "RUS_STA" },
{
  "label": "坦波夫",
  "value": "RUS_TAM" },
{
  "label": "特维尔",
  "value": "RUS_TVE" },
{
  "label": "图拉",
  "value": "RUS_TUL" },
{
  "label": "托木斯克",
  "value": "RUS_TOM" },
{
  "label": "沃罗涅什",
  "value": "RUS_VOR" },
{
  "label": "沃洛格达",
  "value": "RUS_VLG" },
{
  "label": "乌法",
  "value": "RUS_UFA" },
{
  "label": "乌兰乌德",
  "value": "RUS_UUD" },
{
  "label": "乌里扬诺夫斯克",
  "value": "RUS_ULY" },
{
  "label": "乌斯季奥尔登斯基",
  "value": "RUS_UOB" },
{
  "label": "下诺夫哥罗德",
  "value": "RUS_GOJ" },
{
  "label": "新西伯利亚",
  "value": "RUS_NVS" },
{
  "label": "雅库茨克",
  "value": "RUS_JAK" },
{
  "label": "雅罗斯拉夫尔",
  "value": "RUS_JAR" },
{
  "label": "叶卡捷林堡",
  "value": "RUS_JEK" },
{
  "label": "伊尔库茨克",
  "value": "RUS_IKT" },
{
  "label": "伊热夫斯克",
  "value": "RUS_IJK" },
{
  "label": "伊万诺沃",
  "value": "RUS_IVO" },
{
  "label": "约什卡尔奥拉",
  "value": "RUS_YOL" }],

[{
  "label": "阿苏艾",
  "value": "ECU_A" },
{
  "label": "埃尔奥罗",
  "value": "ECU_O" },
{
  "label": "埃斯梅拉尔达斯",
  "value": "ECU_E" },
{
  "label": "玻利瓦尔",
  "value": "ECU_B" },
{
  "label": "瓜亚斯",
  "value": "ECU_G" },
{
  "label": "加拉帕戈斯",
  "value": "ECU_W" },
{
  "label": "卡尔奇",
  "value": "ECU_C" },
{
  "label": "卡尼亚尔",
  "value": "ECU_F" },
{
  "label": "科托帕希",
  "value": "ECU_X" },
{
  "label": "洛哈",
  "value": "ECU_L" },
{
  "label": "洛斯里奥斯",
  "value": "ECU_R" },
{
  "label": "马纳比",
  "value": "ECU_M" },
{
  "label": "莫罗纳－圣地亚哥",
  "value": "ECU_S" },
{
  "label": "纳波，奥雷利亚纳",
  "value": "ECU_D" },
{
  "label": "帕斯塔萨",
  "value": "ECU_Y" },
{
  "label": "皮钦查",
  "value": "ECU_P" },
{
  "label": "钦博拉索",
  "value": "ECU_H" },
{
  "label": "萨莫拉－钦奇佩",
  "value": "ECU_Z" },
{
  "label": "苏昆毕奥斯",
  "value": "ECU_U" },
{
  "label": "通古拉瓦",
  "value": "ECU_T" },
{
  "label": "因巴布拉",
  "value": "ECU_I" }],

[{
  "label": "安塞巴",
  "value": "ERI_KE" },
{
  "label": "北红海",
  "value": "ERI_SK" },
{
  "label": "加什·巴尔卡",
  "value": "ERI_BR" },
{
  "label": "南部",
  "value": "ERI_DE" },
{
  "label": "南红海",
  "value": "ERI_DK" },
{
  "label": "中部",
  "value": "ERI_MA" }],

[{
  "label": "阿尔勒",
  "value": "FRA_ARL" },
{
  "label": "阿雅克修",
  "value": "FRA_AJA" },
{
  "label": "艾克斯",
  "value": "FRA_QXB" },
{
  "label": "奥尔良",
  "value": "FRA_ORR" },
{
  "label": "巴黎",
  "value": "FRA_PAR" },
{
  "label": "贝桑松",
  "value": "FRA_BSN" },
{
  "label": "第戎",
  "value": "FRA_DIJ" },
{
  "label": "弗雷瑞斯",
  "value": "FRA_FRJ" },
{
  "label": "卡昂",
  "value": "FRA_CFR" },
{
  "label": "雷恩",
  "value": "FRA_RNS" },
{
  "label": "里昂",
  "value": "FRA_LIO" },
{
  "label": "里尔",
  "value": "FRA_LLE" },
{
  "label": "利摩日",
  "value": "FRA_LIG" },
{
  "label": "鲁昂",
  "value": "FRA_URO" },
{
  "label": "马赛",
  "value": "FRA_MRS" },
{
  "label": "梅斯",
  "value": "FRA_MZM" },
{
  "label": "蒙彼利埃",
  "value": "FRA_MPL" },
{
  "label": "南特",
  "value": "FRA_NTE" },
{
  "label": "尼斯",
  "value": "FRA_NCE" },
{
  "label": "沙隆",
  "value": "FRA_CSM" },
{
  "label": "图卢兹",
  "value": "FRA_TLS" },
{
  "label": "瓦朗斯",
  "value": "FRA_VAA" },
{
  "label": "亚眠",
  "value": "FRA_AMI" }],

[{
  "label": "法罗群岛",
  "value": "FRO_bak" }],

[{
  "label": "法属波利尼西亚",
  "value": "PYF_bak" }],

[{
  "label": "法属圭亚那",
  "value": "GUF_bak" }],

[{
  "label": "法属南部领地",
  "value": "ATF_bak" }],

[{
  "label": "梵蒂冈",
  "value": "VAT_bak" }],

[{
  "label": "达沃",
  "value": "PHL_DOR" },
{
  "label": "卡卢坎",
  "value": "PHL_CAO" },
{
  "label": "马尼拉",
  "value": "PHL_MNL" },
{
  "label": "宿务",
  "value": "PHL_CEB" }],

[{
  "label": "斐济",
  "value": "FJI_bak" }],

[{
  "label": "埃斯波",
  "value": "FIN_ESP" },
{
  "label": "奥卢",
  "value": "FIN_OLU" },
{
  "label": "波里",
  "value": "FIN_POR" },
{
  "label": "博尔沃",
  "value": "FIN_PRV" },
{
  "label": "海门林纳",
  "value": "FIN_HMY" },
{
  "label": "赫尔辛基",
  "value": "FIN_HEL" },
{
  "label": "卡亚尼",
  "value": "FIN_KAJ" },
{
  "label": "科科拉",
  "value": "FIN_KOK" },
{
  "label": "科特卡",
  "value": "FIN_KTK" },
{
  "label": "库奥皮奥",
  "value": "FIN_KUO" },
{
  "label": "拉赫蒂",
  "value": "FIN_LHI" },
{
  "label": "拉彭兰塔",
  "value": "FIN_LPP" },
{
  "label": "罗瓦涅米",
  "value": "FIN_RVN" },
{
  "label": "玛丽港",
  "value": "FIN_MHQ" },
{
  "label": "米凯利",
  "value": "FIN_MIK" },
{
  "label": "坦佩雷",
  "value": "FIN_TMP" },
{
  "label": "图尔库",
  "value": "FIN_TKU" },
{
  "label": "瓦萨",
  "value": "FIN_VAA" },
{
  "label": "万塔",
  "value": "FIN_VAT" },
{
  "label": "约恩苏",
  "value": "FIN_JOE" }],

[{
  "label": "保尔",
  "value": "CPV_PA" },
{
  "label": "波多诺伏",
  "value": "CPV_PN" },
{
  "label": "博阿维斯塔岛",
  "value": "CPV_BV" },
{
  "label": "布拉瓦岛",
  "value": "CPV_BR" },
{
  "label": "大里贝拉",
  "value": "CPV_RG" },
{
  "label": "福古岛",
  "value": "CPV_FO" },
{
  "label": "马尤岛",
  "value": "CPV_MA" },
{
  "label": "莫斯特罗",
  "value": "CPV_MO" },
{
  "label": "普拉亚",
  "value": "CPV_PR" },
{
  "label": "萨尔岛",
  "value": "CPV_SL" },
{
  "label": "圣安唐岛",
  "value": "CPV_SA" },
{
  "label": "圣地亚哥岛",
  "value": "CPV_IA" },
{
  "label": "圣多明戈",
  "value": "CPV_SD" },
{
  "label": "圣菲利普",
  "value": "CPV_SF" },
{
  "label": "圣卡塔琳娜",
  "value": "CPV_CA" },
{
  "label": "圣克鲁斯",
  "value": "CPV_CR" },
{
  "label": "圣米戈尔",
  "value": "CPV_SM" },
{
  "label": "圣尼古拉岛",
  "value": "CPV_SN" },
{
  "label": "圣维森特岛",
  "value": "CPV_SV" },
{
  "label": "塔拉法尔",
  "value": "CPV_TA" }],

[{
  "label": "弗兰克群岛",
  "value": "FLK_bak" }],

[{
  "label": "冈比亚",
  "value": "GMB_bak" }],

[{
  "label": "刚果",
  "value": "COG_bak" }],

[{
  "label": "刚果民主共和国",
  "value": "COD_bak" }],

[{
  "label": "阿劳卡",
  "value": "COL_ARA" },
{
  "label": "安提奥基亚",
  "value": "COL_ANT" },
{
  "label": "北桑坦德",
  "value": "COL_NDS" },
{
  "label": "波哥大首都区",
  "value": "COL_BDC" },
{
  "label": "博利瓦尔",
  "value": "COL_BOL" },
{
  "label": "博亚卡",
  "value": "COL_BOY" },
{
  "label": "大西洋",
  "value": "COL_ATL" },
{
  "label": "瓜维亚雷",
  "value": "COL_GVR" },
{
  "label": "瓜希拉",
  "value": "COL_GJR" },
{
  "label": "瓜伊尼亚",
  "value": "COL_GNA" },
{
  "label": "金迪奥",
  "value": "COL_QUI" },
{
  "label": "卡尔达斯",
  "value": "COL_CAL" },
{
  "label": "卡克塔",
  "value": "COL_CAQ" },
{
  "label": "卡萨纳雷",
  "value": "COL_CAS" },
{
  "label": "考卡",
  "value": "COL_CAU" },
{
  "label": "考卡山谷",
  "value": "COL_VDC" },
{
  "label": "科尔多巴",
  "value": "COL_COR" },
{
  "label": "昆迪纳马卡",
  "value": "COL_CAM" },
{
  "label": "利萨拉尔达",
  "value": "COL_RIS" },
{
  "label": "马格达雷那",
  "value": "COL_MAG" },
{
  "label": "梅塔",
  "value": "COL_MET" },
{
  "label": "纳里尼奥",
  "value": "COL_NAR" },
{
  "label": "普图马约",
  "value": "COL_PUT" },
{
  "label": "乔科",
  "value": "COL_CHO" },
{
  "label": "塞萨尔",
  "value": "COL_CES" },
{
  "label": "桑坦德",
  "value": "COL_SAN" },
{
  "label": "圣安德烈斯-普罗维登西亚",
  "value": "COL_SAP" },
{
  "label": "苏克雷",
  "value": "COL_SUC" },
{
  "label": "托利马",
  "value": "COL_TOL" },
{
  "label": "维查达",
  "value": "COL_VIC" },
{
  "label": "沃佩斯",
  "value": "COL_VAU" },
{
  "label": "乌伊拉",
  "value": "COL_HUI" },
{
  "label": "亚马孙",
  "value": "COL_AMZ" }],

[{
  "label": "阿拉胡埃拉",
  "value": "CRI_A" },
{
  "label": "埃雷迪亚",
  "value": "CRI_H" },
{
  "label": "瓜纳卡斯特",
  "value": "CRI_G" },
{
  "label": "卡塔戈",
  "value": "CRI_C" },
{
  "label": "利蒙",
  "value": "CRI_L" },
{
  "label": "蓬塔雷纳斯",
  "value": "CRI_P" },
{
  "label": "圣何塞",
  "value": "CRI_SJ" }],

[{
  "label": "格恩西岛",
  "value": "GGY_bak" }],

[{
  "label": "格林纳达",
  "value": "GRD_bak" }],

[{
  "label": "格陵兰",
  "value": "GRL_bak" }],

[{
  "label": "奥尔金",
  "value": "CUB_11" },
{
  "label": "比那尔德里奥",
  "value": "CUB_1" },
{
  "label": "比亚克拉拉",
  "value": "CUB_5" },
{
  "label": "格拉玛",
  "value": "CUB_12" },
{
  "label": "关塔那摩",
  "value": "CUB_14" },
{
  "label": "哈瓦那",
  "value": "CUB_2" },
{
  "label": "哈瓦那城",
  "value": "CUB_3" },
{
  "label": "卡马圭",
  "value": "CUB_9" },
{
  "label": "拉斯图纳斯",
  "value": "CUB_10" },
{
  "label": "马坦萨斯",
  "value": "CUB_4" },
{
  "label": "马亚里",
  "value": "CUB_MAY" },
{
  "label": "曼萨尼罗",
  "value": "CUB_MZO" },
{
  "label": "青年岛特区",
  "value": "CUB_99" },
{
  "label": "圣地亚哥",
  "value": "CUB_13" },
{
  "label": "圣斯皮里图斯",
  "value": "CUB_7" },
{
  "label": "西恩富戈斯",
  "value": "CUB_6" },
{
  "label": "谢戈德阿维拉",
  "value": "CUB_8" }],

[{
  "label": "瓜德罗普",
  "value": "GLP_bak" }],

[{
  "label": "关岛",
  "value": "GUM_bak" }],

[{
  "label": "埃塞奎博群岛-西德梅拉拉",
  "value": "GUY_EW" },
{
  "label": "巴里马-瓦伊尼",
  "value": "GUY_BW" },
{
  "label": "波默伦-苏佩纳姆",
  "value": "GUY_PM" },
{
  "label": "波塔罗-锡帕鲁尼",
  "value": "GUY_PI" },
{
  "label": "德梅拉拉-马海卡",
  "value": "GUY_DM" },
{
  "label": "东伯比斯-科兰太因",
  "value": "GUY_EC" },
{
  "label": "库尤尼-马扎鲁尼",
  "value": "GUY_CM" },
{
  "label": "马海卡-伯比斯",
  "value": "GUY_MB" },
{
  "label": "上德梅拉拉-伯比斯",
  "value": "GUY_UD" },
{
  "label": "上塔库图-上埃塞奎博",
  "value": "GUY_UT" }],

[{
  "label": "阿尔卡累克",
  "value": "KAZ_AYK" },
{
  "label": "阿克莫拉",
  "value": "KAZ_AKM" },
{
  "label": "阿克苏",
  "value": "KAZ_AKS" },
{
  "label": "阿克托别",
  "value": "KAZ_AKT" },
{
  "label": "阿拉木图",
  "value": "KAZ_ALA" },
{
  "label": "阿雷斯",
  "value": "KAZ_ARY" },
{
  "label": "阿斯塔纳市",
  "value": "KAZ_AST" },
{
  "label": "阿特劳",
  "value": "KAZ_ATY" },
{
  "label": "埃基巴斯图兹",
  "value": "KAZ_EKB" },
{
  "label": "巴尔喀什",
  "value": "KAZ_BXH" },
{
  "label": "巴甫洛达尔",
  "value": "KAZ_PAV" },
{
  "label": "北哈萨克斯坦",
  "value": "KAZ_SEV" },
{
  "label": "东哈萨克斯坦",
  "value": "KAZ_VOS" },
{
  "label": "济良诺夫斯克",
  "value": "KAZ_ZYR" },
{
  "label": "江布尔",
  "value": "KAZ_DMB" },
{
  "label": "杰兹卡兹甘",
  "value": "KAZ_DZH" },
{
  "label": "卡拉干达",
  "value": "KAZ_KAR" },
{
  "label": "卡拉扎尔",
  "value": "KAZ_KZO" },
{
  "label": "卡普恰盖",
  "value": "KAZ_KAP" },
{
  "label": "科斯塔奈",
  "value": "KAZ_KST" },
{
  "label": "克孜勒奥尔达",
  "value": "KAZ_KZY" },
{
  "label": "肯套",
  "value": "KAZ_KEN" },
{
  "label": "库尔恰托夫",
  "value": "KAZ_KUR" },
{
  "label": "利萨科夫斯克",
  "value": "KAZ_LKK" },
{
  "label": "列宁诺戈尔斯克",
  "value": "KAZ_LEN" },
{
  "label": "鲁德内",
  "value": "KAZ_RUD" },
{
  "label": "曼格斯套",
  "value": "KAZ_MAN" },
{
  "label": "南哈萨克斯坦",
  "value": "KAZ_KGT" },
{
  "label": "萨兰",
  "value": "KAZ_SAR" },
{
  "label": "塞梅伊",
  "value": "KAZ_SEM" },
{
  "label": "沙赫京斯克",
  "value": "KAZ_SAK" },
{
  "label": "斯捷普诺戈尔斯克",
  "value": "KAZ_STE" },
{
  "label": "铁克利",
  "value": "KAZ_TEK" },
{
  "label": "铁米尔套",
  "value": "KAZ_TEM" },
{
  "label": "突厥斯坦",
  "value": "KAZ_TUR" },
{
  "label": "西哈萨克斯坦",
  "value": "KAZ_ZAP" },
{
  "label": "扎纳奥津",
  "value": "KAZ_ZHA" }],

[{
  "label": "海地",
  "value": "HTI_bak" }],

[{
  "label": "韩国",
  "value": "KOR_bak" }],

[{
  "label": "阿尔梅勒",
  "value": "NLD_AER" },
{
  "label": "阿默斯福特",
  "value": "NLD_AME" },
{
  "label": "阿姆斯特丹",
  "value": "NLD_AMS" },
{
  "label": "阿纳姆",
  "value": "NLD_ARN" },
{
  "label": "阿珀尔多伦",
  "value": "NLD_APE" },
{
  "label": "阿森",
  "value": "NLD_ASS" },
{
  "label": "埃德",
  "value": "NLD_EDE" },
{
  "label": "埃门",
  "value": "NLD_EMM" },
{
  "label": "埃因霍芬",
  "value": "NLD_EIN" },
{
  "label": "布雷达",
  "value": "NLD_BRD" },
{
  "label": "蒂尔堡",
  "value": "NLD_TLB" },
{
  "label": "多德雷赫特",
  "value": "NLD_DOR" },
{
  "label": "恩斯赫德",
  "value": "NLD_ENS" },
{
  "label": "格罗宁根",
  "value": "NLD_GRQ" },
{
  "label": "哈勒姆",
  "value": "NLD_HRA" },
{
  "label": "海牙",
  "value": "NLD_HAG" },
{
  "label": "霍夫多尔普",
  "value": "NLD_HFD" },
{
  "label": "莱顿",
  "value": "NLD_LID" },
{
  "label": "莱利斯塔德",
  "value": "NLD_LEY" },
{
  "label": "鹿特丹",
  "value": "NLD_RTM" },
{
  "label": "吕伐登",
  "value": "NLD_LWR" },
{
  "label": "马斯特里赫特",
  "value": "NLD_MST" },
{
  "label": "米德尔堡",
  "value": "NLD_MDL" },
{
  "label": "奈梅亨",
  "value": "NLD_NIJ" },
{
  "label": "斯海尔托亨博思",
  "value": "NLD_HTB" },
{
  "label": "乌得勒支",
  "value": "NLD_UTC" },
{
  "label": "兹沃勒",
  "value": "NLD_ZWO" },
{
  "label": "佐特尔梅",
  "value": "NLD_ZTM" }],

[{
  "label": "荷属安地列斯",
  "value": "ANT_bak" }],

[{
  "label": "赫德和麦克唐纳群岛",
  "value": "HMD_bak" }],

[{
  "label": "阿特兰蒂达",
  "value": "HND_AT" },
{
  "label": "埃尔帕拉伊索",
  "value": "HND_PA" },
{
  "label": "奥科特佩克",
  "value": "HND_OC" },
{
  "label": "奥兰乔",
  "value": "HND_OL" },
{
  "label": "弗朗西斯科-莫拉桑",
  "value": "HND_FM" },
{
  "label": "格拉西亚斯-阿迪奥斯",
  "value": "HND_GD" },
{
  "label": "海湾群岛",
  "value": "HND_IB" },
{
  "label": "科尔特斯",
  "value": "HND_CR" },
{
  "label": "科隆",
  "value": "HND_CL" },
{
  "label": "科马亚瓜",
  "value": "HND_CM" },
{
  "label": "科潘",
  "value": "HND_CP" },
{
  "label": "拉巴斯",
  "value": "HND_PZ" },
{
  "label": "伦皮拉",
  "value": "HND_LE" },
{
  "label": "乔卢特卡",
  "value": "HND_CH" },
{
  "label": "乔罗马",
  "value": "HND_CHO" },
{
  "label": "山谷",
  "value": "HND_VA" },
{
  "label": "圣巴巴拉",
  "value": "HND_SB" },
{
  "label": "因蒂布卡",
  "value": "HND_IN" },
{
  "label": "约罗",
  "value": "HND_YO" }],

[{
  "label": "菲尼克斯群岛",
  "value": "KIR_PHO" },
{
  "label": "吉尔伯特群岛",
  "value": "KIR_GIL" },
{
  "label": "莱恩群岛",
  "value": "KIR_LIN" }],

[{
  "label": "阿里萨比赫区",
  "value": "DJI_S" },
{
  "label": "奥博克区",
  "value": "DJI_O" },
{
  "label": "迪基勒区",
  "value": "DJI_K" },
{
  "label": "塔朱拉区",
  "value": "DJI_T" }],

[{
  "label": "奥什",
  "value": "KGZ_O" },
{
  "label": "巴特肯",
  "value": "KGZ_B" },
{
  "label": "比什凯克市",
  "value": "KGZ_GB" },
{
  "label": "楚河",
  "value": "KGZ_C" },
{
  "label": "贾拉拉巴德",
  "value": "KGZ_J" },
{
  "label": "卡拉巴尔塔",
  "value": "KGZ_KBA" },
{
  "label": "卡拉库尔",
  "value": "KGZ_KKO" },
{
  "label": "坎特",
  "value": "KGZ_KAN" },
{
  "label": "科克扬加克",
  "value": "KGZ_KJ" },
{
  "label": "迈利赛",
  "value": "KGZ_MS" },
{
  "label": "纳伦",
  "value": "KGZ_N" },
{
  "label": "苏卢克图",
  "value": "KGZ_SU" },
{
  "label": "塔拉斯",
  "value": "KGZ_T" },
{
  "label": "塔什库梅尔",
  "value": "KGZ_TK" },
{
  "label": "乌兹根",
  "value": "KGZ_UG" },
{
  "label": "伊塞克湖",
  "value": "KGZ_Y" }],

[{
  "label": "博凯",
  "value": "GIN_BOK" },
{
  "label": "恩泽雷科雷",
  "value": "GIN_NZR" },
{
  "label": "法拉纳",
  "value": "GIN_FRN" },
{
  "label": "金迪亚",
  "value": "GIN_KND" },
{
  "label": "康康",
  "value": "GIN_KNK" },
{
  "label": "科纳克里",
  "value": "GIN_CNK" },
{
  "label": "拉贝",
  "value": "GIN_LAB" },
{
  "label": "玛木",
  "value": "GIN_MAM" }],

[{
  "label": "几内亚比绍",
  "value": "GNB_bak" }],

[{
  "label": "阿伯茨福",
  "value": "CAN_ABB" },
{
  "label": "埃德蒙顿",
  "value": "CAN_EDM" },
{
  "label": "奥沙瓦",
  "value": "CAN_OSH" },
{
  "label": "巴里",
  "value": "CAN_BAR" },
{
  "label": "布列塔尼角",
  "value": "CAN_CBR" },
{
  "label": "多伦多",
  "value": "CAN_TOR" },
{
  "label": "弗雷德里顿",
  "value": "CAN_FRE" },
{
  "label": "圭尔夫",
  "value": "CAN_GLP" },
{
  "label": "哈利法克斯",
  "value": "CAN_HAL" },
{
  "label": "哈密尔顿",
  "value": "CAN_HAM" },
{
  "label": "怀特霍斯",
  "value": "CAN_YXY" },
{
  "label": "基劳纳",
  "value": "CAN_KWL" },
{
  "label": "基奇纳",
  "value": "CAN_BRP" },
{
  "label": "金斯敦",
  "value": "CAN_KGN" },
{
  "label": "卡里加里",
  "value": "CAN_CAL" },
{
  "label": "魁北克",
  "value": "CAN_QUE" },
{
  "label": "里贾纳",
  "value": "CAN_REG" },
{
  "label": "伦敦",
  "value": "CAN_LOD" },
{
  "label": "蒙特利尔",
  "value": "CAN_MTR" },
{
  "label": "萨德伯里",
  "value": "CAN_SUD" },
{
  "label": "萨斯卡通",
  "value": "CAN_SAK" },
{
  "label": "三河城",
  "value": "CAN_TRR" },
{
  "label": "桑德贝",
  "value": "CAN_THU" },
{
  "label": "舍布鲁克",
  "value": "CAN_SBE" },
{
  "label": "圣卡塔琳娜",
  "value": "CAN_SCA" },
{
  "label": "圣约翰斯",
  "value": "CAN_SJB" },
{
  "label": "维多利亚",
  "value": "CAN_VIC" },
{
  "label": "温哥华",
  "value": "CAN_VAN" },
{
  "label": "温尼伯",
  "value": "CAN_WNP" },
{
  "label": "温莎",
  "value": "CAN_WDR" },
{
  "label": "渥太华",
  "value": "CAN_OTT" },
{
  "label": "夏洛特敦",
  "value": "CAN_CHA" },
{
  "label": "耶洛奈夫",
  "value": "CAN_YZF" },
{
  "label": "伊魁特",
  "value": "CAN_IQL" }],

[{
  "label": "阿散蒂",
  "value": "GHA_AS" },
{
  "label": "奥布阿西",
  "value": "GHA_OBU" },
{
  "label": "北部",
  "value": "GHA_NO" },
{
  "label": "布朗阿哈福",
  "value": "GHA_BA" },
{
  "label": "大阿克拉",
  "value": "GHA_GA" },
{
  "label": "东部",
  "value": "GHA_EA" },
{
  "label": "上东部",
  "value": "GHA_UE" },
{
  "label": "上西部",
  "value": "GHA_UW" },
{
  "label": "沃尔特",
  "value": "GHA_VO" },
{
  "label": "西部",
  "value": "GHA_WE" },
{
  "label": "中部",
  "value": "GHA_CE" }],

[{
  "label": "奥果韦-洛洛",
  "value": "GAB_OL" },
{
  "label": "奥果韦-伊温多",
  "value": "GAB_OI" },
{
  "label": "滨海奥果韦",
  "value": "GAB_OM" },
{
  "label": "恩古涅",
  "value": "GAB_NG" },
{
  "label": "河口",
  "value": "GAB_ES" },
{
  "label": "尼扬加",
  "value": "GAB_NY" },
{
  "label": "上奥果韦",
  "value": "GAB_HO" },
{
  "label": "沃勒-恩特姆",
  "value": "GAB_WN" },
{
  "label": "中奥果韦",
  "value": "GAB_MO" }],

[{
  "label": "奥多棉吉",
  "value": "KHM_OC" },
{
  "label": "白马市",
  "value": "KHM_KB" },
{
  "label": "柏威夏",
  "value": "KHM_PR" },
{
  "label": "拜林市",
  "value": "KHM_PL" },
{
  "label": "班迭棉吉",
  "value": "KHM_BM" },
{
  "label": "磅清扬",
  "value": "KHM_KZC" },
{
  "label": "磅士卑",
  "value": "KHM_KO" },
{
  "label": "磅同",
  "value": "KHM_KZK" },
{
  "label": "磅湛",
  "value": "KHM_KM" },
{
  "label": "波罗勉",
  "value": "KHM_PG" },
{
  "label": "茶胶",
  "value": "KHM_TK" },
{
  "label": "柴桢",
  "value": "KHM_SVR" },
{
  "label": "干丹",
  "value": "KHM_KL" },
{
  "label": "戈公",
  "value": "KHM_KKZ" },
{
  "label": "贡布",
  "value": "KHM_KMT" },
{
  "label": "金边市",
  "value": "KHM_PNH" },
{
  "label": "桔井",
  "value": "KHM_KH" },
{
  "label": "腊塔纳基里",
  "value": "KHM_RBE" },
{
  "label": "马德望",
  "value": "KHM_BA" },
{
  "label": "蒙多基里",
  "value": "KHM_MWV" },
{
  "label": "菩萨",
  "value": "KHM_PO" },
{
  "label": "上丁",
  "value": "KHM_TNX" },
{
  "label": "西哈努克市",
  "value": "KHM_KA" },
{
  "label": "暹粒",
  "value": "KHM_REP" }],

[{
  "label": "奥洛穆茨",
  "value": "CZE_OL" },
{
  "label": "比尔森",
  "value": "CZE_PL" },
{
  "label": "布拉格直辖市",
  "value": "CZE_PR" },
{
  "label": "赫拉德茨-克拉洛韦",
  "value": "CZE_KR" },
{
  "label": "卡罗维发利",
  "value": "CZE_KA" },
{
  "label": "利贝雷克",
  "value": "CZE_LI" },
{
  "label": "摩拉维亚-西里西亚",
  "value": "CZE_MO" },
{
  "label": "南摩拉维亚",
  "value": "CZE_JC" },
{
  "label": "帕尔杜比采",
  "value": "CZE_PA" },
{
  "label": "维索基纳",
  "value": "CZE_VY" },
{
  "label": "乌斯季",
  "value": "CZE_US" },
{
  "label": "中捷克",
  "value": "CZE_ST" },
{
  "label": "兹林",
  "value": "CZE_ZL" }],

[{
  "label": "北马塔贝莱兰",
  "value": "ZWE_MN" },
{
  "label": "布拉瓦约",
  "value": "ZWE_BU" },
{
  "label": "东马绍纳兰",
  "value": "ZWE_ME" },
{
  "label": "哈拉雷",
  "value": "ZWE_HA" },
{
  "label": "马尼卡兰",
  "value": "ZWE_ML" },
{
  "label": "马斯温戈",
  "value": "ZWE_MV" },
{
  "label": "南马塔贝莱兰",
  "value": "ZWE_MS" },
{
  "label": "西马绍纳兰",
  "value": "ZWE_MW" },
{
  "label": "中部",
  "value": "ZWE_MD" },
{
  "label": "中马绍纳兰",
  "value": "ZWE_MC" }],

[{
  "label": "阿达马瓦",
  "value": "CMR_ADA" },
{
  "label": "北部",
  "value": "CMR_NOR" },
{
  "label": "北端",
  "value": "CMR_EXN" },
{
  "label": "滨海",
  "value": "CMR_LIT" },
{
  "label": "东部",
  "value": "CMR_EST" },
{
  "label": "南部",
  "value": "CMR_SUD" },
{
  "label": "西北",
  "value": "CMR_NOT" },
{
  "label": "西部",
  "value": "CMR_OUE" },
{
  "label": "西南",
  "value": "CMR_SOU" },
{
  "label": "中央",
  "value": "CMR_CEN" }],

[{
  "label": "北部",
  "value": "QAT_MS" },
{
  "label": "多哈",
  "value": "QAT_DW" },
{
  "label": "古韦里耶",
  "value": "QAT_GW" },
{
  "label": "豪尔",
  "value": "QAT_KR" },
{
  "label": "杰里扬拜特奈",
  "value": "QAT_JB" },
{
  "label": "赖扬",
  "value": "QAT_RN" },
{
  "label": "沃克拉",
  "value": "QAT_WK" },
{
  "label": "乌姆锡拉勒",
  "value": "QAT_UL" },
{
  "label": "朱迈利耶",
  "value": "QAT_JM" }],

[{
  "label": "开曼群岛",
  "value": "CYM_bak" }],

[{
  "label": "科科斯群岛",
  "value": "CCK_bak" }],

[{
  "label": "科摩罗",
  "value": "COM_bak" }],

[{
  "label": "阿涅比",
  "value": "CIV_AG" },
{
  "label": "巴芬",
  "value": "CIV_BF" },
{
  "label": "邦达马河谷",
  "value": "CIV_VB" },
{
  "label": "登盖莱",
  "value": "CIV_DE" },
{
  "label": "恩济－科莫埃",
  "value": "CIV_NC" },
{
  "label": "弗罗马格尔",
  "value": "CIV_FR" },
{
  "label": "湖泊",
  "value": "CIV_LC" },
{
  "label": "马拉韦",
  "value": "CIV_MR" },
{
  "label": "南邦达马",
  "value": "CIV_SB" },
{
  "label": "南科莫埃",
  "value": "CIV_SC" },
{
  "label": "萨桑德拉",
  "value": "CIV_HT" },
{
  "label": "萨瓦纳",
  "value": "CIV_SV" },
{
  "label": "山地",
  "value": "CIV_DH" },
{
  "label": "沃罗杜古",
  "value": "CIV_WR" },
{
  "label": "下萨桑德拉",
  "value": "CIV_BS" },
{
  "label": "泻湖",
  "value": "CIV_LG" },
{
  "label": "赞赞",
  "value": "CIV_ZA" },
{
  "label": "中卡瓦利",
  "value": "CIV_MV" },
{
  "label": "中科莫埃",
  "value": "CIV_MC" }],

[{
  "label": "科威特",
  "value": "KWT_bak" }],

[{
  "label": "奥西耶克-巴拉尼亚",
  "value": "HRV_14" },
{
  "label": "别洛瓦尔-比洛戈拉",
  "value": "HRV_7" },
{
  "label": "滨海和山区",
  "value": "HRV_8" },
{
  "label": "波热加-斯拉沃尼亚",
  "value": "HRV_11" },
{
  "label": "布罗德-波萨维纳",
  "value": "HRV_12" },
{
  "label": "杜布罗夫斯克-内雷特瓦",
  "value": "HRV_19" },
{
  "label": "卡尔洛瓦茨",
  "value": "HRV_4" },
{
  "label": "科普里夫尼察-克里热夫齐",
  "value": "HRV_6" },
{
  "label": "克拉皮纳-扎戈列",
  "value": "HRV_2" },
{
  "label": "利卡-塞尼",
  "value": "HRV_9" },
{
  "label": "梅吉穆列",
  "value": "HRV_20" },
{
  "label": "萨格勒布",
  "value": "HRV_1" },
{
  "label": "萨格勒布市",
  "value": "HRV_21" },
{
  "label": "斯普利特-达尔马提亚",
  "value": "HRV_17" },
{
  "label": "瓦拉日丁",
  "value": "HRV_5" },
{
  "label": "维罗维蒂察-波德拉维纳",
  "value": "HRV_10" },
{
  "label": "武科瓦尔-斯里耶姆",
  "value": "HRV_16" },
{
  "label": "希贝尼克-克宁",
  "value": "HRV_15" },
{
  "label": "锡萨克-莫斯拉维纳",
  "value": "HRV_3" },
{
  "label": "伊斯特拉",
  "value": "HRV_18" },
{
  "label": "扎达尔",
  "value": "HRV_13" }],

[{
  "label": "埃尔格约-马拉奎特",
  "value": "KEN_EMA" },
{
  "label": "巴林戈",
  "value": "KEN_BAR" },
{
  "label": "邦戈马",
  "value": "KEN_BUN" },
{
  "label": "博美特",
  "value": "KEN_BOM" },
{
  "label": "布希亚",
  "value": "KEN_BUS" },
{
  "label": "恩布",
  "value": "KEN_EMB" },
{
  "label": "霍马湾",
  "value": "KEN_HOB" },
{
  "label": "基安布",
  "value": "KEN_KIA" },
{
  "label": "基里菲",
  "value": "KEN_KIL" },
{
  "label": "基里尼亚加",
  "value": "KEN_KIR" },
{
  "label": "基苏木",
  "value": "KEN_KIS" },
{
  "label": "基图伊",
  "value": "KEN_KIT" },
{
  "label": "基西",
  "value": "KEN_KII" },
{
  "label": "加里萨",
  "value": "KEN_GAS" },
{
  "label": "卡卡梅加",
  "value": "KEN_KAK" },
{
  "label": "卡耶亚多",
  "value": "KEN_KAJ" },
{
  "label": "凯里乔",
  "value": "KEN_KEY" },
{
  "label": "夸勒",
  "value": "KEN_KWA" },
{
  "label": "拉木",
  "value": "KEN_LAU" },
{
  "label": "莱基皮亚",
  "value": "KEN_LAI" },
{
  "label": "马查科斯",
  "value": "KEN_MAC" },
{
  "label": "马瓜尼",
  "value": "KEN_MAK" },
{
  "label": "马萨布布",
  "value": "KEN_RBT" },
{
  "label": "曼德拉",
  "value": "KEN_MAN" },
{
  "label": "梅鲁",
  "value": "KEN_MER" },
{
  "label": "蒙巴萨",
  "value": "KEN_MOM" },
{
  "label": "米戈利",
  "value": "KEN_MIG" },
{
  "label": "穆兰卡",
  "value": "KEN_MUR" },
{
  "label": "纳库鲁",
  "value": "KEN_NUU" },
{
  "label": "纳罗克",
  "value": "KEN_NAR" },
{
  "label": "南迪",
  "value": "KEN_NAN" },
{
  "label": "内罗毕",
  "value": "KEN_NA" },
{
  "label": "尼蒂",
  "value": "KEN_NIT" },
{
  "label": "尼亚米拉",
  "value": "KEN_NYM" },
{
  "label": "年达鲁阿",
  "value": "KEN_NYN" },
{
  "label": "涅里",
  "value": "KEN_NYE" },
{
  "label": "桑布卢",
  "value": "KEN_UAS" },
{
  "label": "塔纳河",
  "value": "KEN_TRI" },
{
  "label": "泰塔塔维塔",
  "value": "KEN_TTA" },
{
  "label": "特兰斯-恩佐亚",
  "value": "KEN_TNZ" },
{
  "label": "图尔卡纳",
  "value": "KEN_TUR" },
{
  "label": "瓦吉尔",
  "value": "KEN_WJR" },
{
  "label": "瓦辛基苏",
  "value": "KEN_UGI" },
{
  "label": "韦希加",
  "value": "KEN_VIH" },
{
  "label": "西波克特",
  "value": "KEN_WPO" },
{
  "label": "夏亚",
  "value": "KEN_SIA" },
{
  "label": "伊希约洛",
  "value": "KEN_ISI" },
{
  "label": "中央",
  "value": "KEN_CE" }],

[{
  "label": "库克群岛",
  "value": "COK_bak" }],

[{
  "label": "阿卢克斯内",
  "value": "LVA_ALU" },
{
  "label": "爱兹克劳克雷",
  "value": "LVA_AIZ" },
{
  "label": "奥格雷",
  "value": "LVA_OGR" },
{
  "label": "巴尔维",
  "value": "LVA_BAL" },
{
  "label": "包斯卡",
  "value": "LVA_BAU" },
{
  "label": "采西斯",
  "value": "LVA_CES" },
{
  "label": "多贝莱",
  "value": "LVA_DOB" },
{
  "label": "古尔贝内",
  "value": "LVA_GUL" },
{
  "label": "杰卡布皮尔斯",
  "value": "LVA_JEK" },
{
  "label": "克拉斯拉瓦",
  "value": "LVA_KRA" },
{
  "label": "库尔迪加",
  "value": "LVA_KUL" },
{
  "label": "雷泽克内",
  "value": "LVA_RZR" },
{
  "label": "里加",
  "value": "LVA_RGA" },
{
  "label": "利耶帕亚",
  "value": "LVA_LPK" },
{
  "label": "林巴济",
  "value": "LVA_LIM" },
{
  "label": "卢扎",
  "value": "LVA_LUD" },
{
  "label": "马多纳",
  "value": "LVA_MAD" },
{
  "label": "普雷利",
  "value": "LVA_PRE" },
{
  "label": "萨尔杜斯",
  "value": "LVA_SAL" },
{
  "label": "塔尔西",
  "value": "LVA_TAL" },
{
  "label": "陶格夫皮尔斯",
  "value": "LVA_DGR" },
{
  "label": "图库马",
  "value": "LVA_TUK" },
{
  "label": "瓦尔加",
  "value": "LVA_VLK" },
{
  "label": "瓦尔米耶拉",
  "value": "LVA_VLM" },
{
  "label": "文茨皮尔斯",
  "value": "LVA_VSL" },
{
  "label": "叶尔加瓦",
  "value": "LVA_JGR" }],

[{
  "label": "伯里亚",
  "value": "LSO_D" },
{
  "label": "布塔布泰",
  "value": "LSO_B" },
{
  "label": "古廷",
  "value": "LSO_G" },
{
  "label": "加查斯内克",
  "value": "LSO_H" },
{
  "label": "莱里贝",
  "value": "LSO_C" },
{
  "label": "马费滕",
  "value": "LSO_E" },
{
  "label": "马塞卢",
  "value": "LSO_A" },
{
  "label": "莫哈莱斯胡克",
  "value": "LSO_F" },
{
  "label": "莫霍特隆",
  "value": "LSO_J" },
{
  "label": "塔巴采卡",
  "value": "LSO_K" }],

[{
  "label": "阿速坡",
  "value": "LAO_AT" },
{
  "label": "波里坎赛",
  "value": "LAO_BL" },
{
  "label": "博乔",
  "value": "LAO_BK" },
{
  "label": "川圹",
  "value": "LAO_XI" },
{
  "label": "丰沙里",
  "value": "LAO_PH" },
{
  "label": "甘蒙",
  "value": "LAO_KH" },
{
  "label": "华潘",
  "value": "LAO_HO" },
{
  "label": "琅勃拉邦",
  "value": "LAO_LP" },
{
  "label": "琅南塔",
  "value": "LAO_LM" },
{
  "label": "赛宋本行政特区",
  "value": "LAO_XN" },
{
  "label": "色贡",
  "value": "LAO_XE" },
{
  "label": "沙拉湾",
  "value": "LAO_SL" },
{
  "label": "沙湾拿吉",
  "value": "LAO_SV" },
{
  "label": "沙耶武里",
  "value": "LAO_XA" },
{
  "label": "万象",
  "value": "LAO_VI" },
{
  "label": "乌多姆赛",
  "value": "LAO_OU" },
{
  "label": "占巴塞",
  "value": "LAO_CH" }],

[{
  "label": "北部",
  "value": "LBN_AS" },
{
  "label": "贝卡",
  "value": "LBN_BI" },
{
  "label": "贝鲁特",
  "value": "LBN_BA" },
{
  "label": "黎巴嫩山",
  "value": "LBN_JL" },
{
  "label": "奈拜提耶市",
  "value": "LBN_NA" },
{
  "label": "南部",
  "value": "LBN_JA" }],

[{
  "label": "巴波卢",
  "value": "LBR_GBA" },
{
  "label": "邦",
  "value": "LBR_BG" },
{
  "label": "博波卢",
  "value": "LBR_BOP" },
{
  "label": "博米",
  "value": "LBR_BM" },
{
  "label": "大巴萨",
  "value": "LBR_GB" },
{
  "label": "大吉德",
  "value": "LBR_GG" },
{
  "label": "大角山",
  "value": "LBR_CM" },
{
  "label": "大克鲁",
  "value": "LBR_GK" },
{
  "label": "菲什敦",
  "value": "LBR_FT" },
{
  "label": "吉河",
  "value": "LBR_RG" },
{
  "label": "里弗塞斯",
  "value": "LBR_RI" },
{
  "label": "洛法",
  "value": "LBR_LO" },
{
  "label": "马吉比",
  "value": "LBR_MG" },
{
  "label": "马里兰",
  "value": "LBR_MY" },
{
  "label": "蒙特塞拉多",
  "value": "LBR_MO" },
{
  "label": "宁巴",
  "value": "LBR_NI" },
{
  "label": "锡诺",
  "value": "LBR_SI" }],

[{
  "label": "利比亚",
  "value": "LBY_bak" }],

[{
  "label": "阿利图斯",
  "value": "LTU_AL" },
{
  "label": "考纳斯",
  "value": "LTU_KA" },
{
  "label": "克莱佩达",
  "value": "LTU_KL" },
{
  "label": "马里扬泊列",
  "value": "LTU_MA" },
{
  "label": "帕涅韦日斯",
  "value": "LTU_PA" },
{
  "label": "陶拉格",
  "value": "LTU_TA" },
{
  "label": "特尔希艾",
  "value": "LTU_TE" },
{
  "label": "维尔纽斯",
  "value": "LTU_VI" },
{
  "label": "乌田纳",
  "value": "LTU_UT" },
{
  "label": "希奥利艾",
  "value": "LTU_SI" },
{
  "label": "亚克曼",
  "value": "LTU_AKM" }],

[{
  "label": "列支敦士登",
  "value": "LIE_bak" }],

[{
  "label": "留尼旺岛",
  "value": "REU_bak" }],

[{
  "label": "迪基希",
  "value": "LUX_DD" },
{
  "label": "格雷文马赫",
  "value": "LUX_GG" },
{
  "label": "卢森堡",
  "value": "LUX_LL" }],

[{
  "label": "比温巴",
  "value": "RWA_BY" },
{
  "label": "布塔雷",
  "value": "RWA_BU" },
{
  "label": "恩延扎",
  "value": "RWA_NY" },
{
  "label": "基本古",
  "value": "RWA_KG" },
{
  "label": "基布耶",
  "value": "RWA_KY" },
{
  "label": "基加利-恩加利",
  "value": "RWA_KR" },
{
  "label": "基加利市",
  "value": "RWA_KV" },
{
  "label": "吉孔戈罗",
  "value": "RWA_GK" },
{
  "label": "吉塞尼",
  "value": "RWA_GS" },
{
  "label": "吉塔拉马",
  "value": "RWA_GT" },
{
  "label": "卡布加",
  "value": "RWA_KA" },
{
  "label": "卢瓦马加纳",
  "value": "RWA_RW" },
{
  "label": "鲁汉戈",
  "value": "RWA_RH" },
{
  "label": "鲁亨盖里",
  "value": "RWA_RU" },
{
  "label": "尚古古",
  "value": "RWA_CY" },
{
  "label": "乌姆塔拉",
  "value": "RWA_UM" }],

[{
  "label": "阿尔巴尤利亚",
  "value": "ROU_AL" },
{
  "label": "阿拉德",
  "value": "ROU_AR" },
{
  "label": "奥拉迪亚",
  "value": "ROU_OR" },
{
  "label": "巴克乌",
  "value": "ROU_BA" },
{
  "label": "巴亚马雷",
  "value": "ROU_BM" },
{
  "label": "比斯特里察",
  "value": "ROU_BN" },
{
  "label": "博托沙尼",
  "value": "ROU_BO" },
{
  "label": "布加勒斯特",
  "value": "ROU_BC" },
{
  "label": "布拉索夫",
  "value": "ROU_BS" },
{
  "label": "布勒伊拉",
  "value": "ROU_BL" },
{
  "label": "布泽乌",
  "value": "ROU_BZ" },
{
  "label": "德罗贝塔-塞维林堡",
  "value": "ROU_DT" },
{
  "label": "德瓦",
  "value": "ROU_DE" },
{
  "label": "蒂米什瓦拉",
  "value": "ROU_TI" },
{
  "label": "福克沙尼",
  "value": "ROU_FO" },
{
  "label": "加拉茨",
  "value": "ROU_GL" },
{
  "label": "久尔久",
  "value": "ROU_GG" },
{
  "label": "康斯坦察",
  "value": "ROU_CT" },
{
  "label": "克拉约瓦",
  "value": "ROU_DO" },
{
  "label": "克勒拉希",
  "value": "ROU_CR" },
{
  "label": "克卢日纳波卡",
  "value": "ROU_CN" },
{
  "label": "勒姆尼库沃尔恰",
  "value": "ROU_VI" },
{
  "label": "雷希察",
  "value": "ROU_RE" },
{
  "label": "梅尔库里亚丘克",
  "value": "ROU_MC" },
{
  "label": "皮特什蒂",
  "value": "ROU_PI" },
{
  "label": "皮亚特拉尼亚姆茨",
  "value": "ROU_PN" },
{
  "label": "普洛耶什蒂",
  "value": "ROU_PL" },
{
  "label": "萨图·马雷",
  "value": "ROU_SM" },
{
  "label": "圣格奥尔基",
  "value": "ROU_SG" },
{
  "label": "斯拉蒂纳",
  "value": "ROU_ST" },
{
  "label": "斯洛博齐亚",
  "value": "ROU_SB" },
{
  "label": "苏恰瓦",
  "value": "ROU_SU" },
{
  "label": "特尔戈维什泰",
  "value": "ROU_TA" },
{
  "label": "特尔古穆列什",
  "value": "ROU_TM" },
{
  "label": "特尔古日乌",
  "value": "ROU_TJ" },
{
  "label": "图尔恰",
  "value": "ROU_TU" },
{
  "label": "瓦斯卢伊",
  "value": "ROU_VA" },
{
  "label": "锡比乌",
  "value": "ROU_SO" },
{
  "label": "雅西",
  "value": "ROU_IS" },
{
  "label": "亚厉山德里亚",
  "value": "ROU_AD" },
{
  "label": "扎勒乌",
  "value": "ROU_ZA" }],

[{
  "label": "安齐拉纳纳",
  "value": "MDG_AS" },
{
  "label": "菲亚纳兰楚阿",
  "value": "MDG_FN" },
{
  "label": "马哈赞加",
  "value": "MDG_MJ" },
{
  "label": "塔那那利佛",
  "value": "MDG_AN" },
{
  "label": "图阿马西拉",
  "value": "MDG_TM" },
{
  "label": "图利亚拉",
  "value": "MDG_TL" }],

[{
  "label": "阿杜",
  "value": "MDV_ADD" },
{
  "label": "北阿里",
  "value": "MDV_AAD" },
{
  "label": "北蒂拉杜马蒂",
  "value": "MDV_THD" },
{
  "label": "北马洛斯马杜卢",
  "value": "MDV_MAD" },
{
  "label": "北米拉杜马杜卢",
  "value": "MDV_MLD" },
{
  "label": "北尼兰杜",
  "value": "MDV_NAD" },
{
  "label": "北苏瓦迪瓦",
  "value": "MDV_HAD" },
{
  "label": "法迪福卢",
  "value": "MDV_FAA" },
{
  "label": "费利杜",
  "value": "MDV_FEA" },
{
  "label": "福阿穆拉库",
  "value": "MDV_FMU" },
{
  "label": "哈杜马蒂",
  "value": "MDV_HDH" },
{
  "label": "科卢马杜卢",
  "value": "MDV_KLH" },
{
  "label": "马累",
  "value": "MDV_MAL" },
{
  "label": "马累岛",
  "value": "MDV_MAA" },
{
  "label": "穆拉库",
  "value": "MDV_MUA" },
{
  "label": "南阿里",
  "value": "MDV_AAU" },
{
  "label": "南蒂拉杜马蒂",
  "value": "MDV_THU" },
{
  "label": "南马洛斯马杜卢",
  "value": "MDV_MAU" },
{
  "label": "南米拉杜马杜卢",
  "value": "MDV_MLU" },
{
  "label": "南尼兰杜",
  "value": "MDV_NAU" },
{
  "label": "南苏瓦迪瓦",
  "value": "MDV_HAU" }],

[{
  "label": "马耳他",
  "value": "MLT_bak" }],

[{
  "label": "北部区",
  "value": "MWI_N" },
{
  "label": "南部区",
  "value": "MWI_S" },
{
  "label": "中央区",
  "value": "MWI_C" }],

[{
  "label": "马来西亚",
  "value": "MYS_bak" }],

[{
  "label": "巴马科首都区",
  "value": "MLI_CD" },
{
  "label": "基达尔",
  "value": "MLI_KD" },
{
  "label": "加奥",
  "value": "MLI_GA" },
{
  "label": "卡伊",
  "value": "MLI_KY" },
{
  "label": "库利科罗",
  "value": "MLI_KL" },
{
  "label": "莫普提",
  "value": "MLI_MP" },
{
  "label": "塞古",
  "value": "MLI_SG" },
{
  "label": "通布图",
  "value": "MLI_TB" },
{
  "label": "锡卡索",
  "value": "MLI_SK" }],

[{
  "label": "马其顿",
  "value": "MKD_bak" }],

[{
  "label": "马绍尔群岛",
  "value": "MHL_bak" }],

[{
  "label": "马提尼克",
  "value": "MTQ_bak" }],

[{
  "label": "马约特岛",
  "value": "MYT_bak" }],

[{
  "label": "曼岛",
  "value": "IMN_bak" }],

[{
  "label": "毛里求斯",
  "value": "MUS_bak" }],

[{
  "label": "阿德拉尔",
  "value": "MRT_AD" },
{
  "label": "阿萨巴",
  "value": "MRT_AS" },
{
  "label": "卜拉克纳",
  "value": "MRT_BR" },
{
  "label": "东胡德",
  "value": "MRT_HG" },
{
  "label": "戈尔戈勒",
  "value": "MRT_GO" },
{
  "label": "吉迪马卡",
  "value": "MRT_GM" },
{
  "label": "努瓦迪布湾",
  "value": "MRT_DN" },
{
  "label": "努瓦克肖特特区",
  "value": "MRT_NO" },
{
  "label": "塔甘特",
  "value": "MRT_TA" },
{
  "label": "特拉扎",
  "value": "MRT_TR" },
{
  "label": "提里斯-宰穆尔",
  "value": "MRT_TZ" },
{
  "label": "西胡德",
  "value": "MRT_HC" },
{
  "label": "因希里",
  "value": "MRT_IN" }],

[{
  "label": "美国",
  "value": "USA_bak" }],

[{
  "label": "阿纳",
  "value": "ASM_AAN" },
{
  "label": "阿图阿",
  "value": "ASM_ATU" },
{
  "label": "艾加伊勒泰",
  "value": "ASM_AIT" },
{
  "label": "法塞莱莱阿加",
  "value": "ASM_FAA" },
{
  "label": "加盖福毛加",
  "value": "ASM_GFG" },
{
  "label": "加加埃毛加",
  "value": "ASM_GMG" },
{
  "label": "帕劳利",
  "value": "ASM_PAL" },
{
  "label": "萨图帕伊泰阿",
  "value": "ASM_SAT" },
{
  "label": "萨瓦伊岛",
  "value": "ASM_SAV" },
{
  "label": "图阿马萨加",
  "value": "ASM_TUA" },
{
  "label": "瓦奥福诺蒂",
  "value": "ASM_VAF" },
{
  "label": "韦西加诺",
  "value": "ASM_VAI" },
{
  "label": "乌波卢岛",
  "value": "ASM_UPO" }],

[{
  "label": "美属外岛",
  "value": "UMI_bak" }],

[{
  "label": "巴彦洪格尔",
  "value": "MNG_69" },
{
  "label": "巴彦乌勒盖",
  "value": "MNG_71" },
{
  "label": "布尔干",
  "value": "MNG_67" },
{
  "label": "达尔汗乌勒",
  "value": "MNG_37" },
{
  "label": "东方",
  "value": "MNG_61" },
{
  "label": "东戈壁",
  "value": "MNG_63" },
{
  "label": "鄂尔浑",
  "value": "MNG_35" },
{
  "label": "戈壁阿尔泰",
  "value": "MNG_65" },
{
  "label": "戈壁苏木贝尔",
  "value": "MNG_64" },
{
  "label": "后杭爱",
  "value": "MNG_73" },
{
  "label": "科布多",
  "value": "MNG_43" },
{
  "label": "肯特",
  "value": "MNG_39" },
{
  "label": "库苏古尔",
  "value": "MNG_41" },
{
  "label": "南戈壁",
  "value": "MNG_UMN" },
{
  "label": "前杭爱",
  "value": "MNG_UVO" },
{
  "label": "色楞格",
  "value": "MNG_49" },
{
  "label": "苏赫巴托尔",
  "value": "MNG_51" },
{
  "label": "乌布苏",
  "value": "MNG_46" },
{
  "label": "乌兰巴托市",
  "value": "MNG_1" },
{
  "label": "扎布汗",
  "value": "MNG_57" },
{
  "label": "中戈壁",
  "value": "MNG_59" },
{
  "label": "中央",
  "value": "MNG_47" }],

[{
  "label": "蒙特塞拉特",
  "value": "MSR_bak" }],

[{
  "label": "达卡",
  "value": "BGD_DAC" },
{
  "label": "吉大港",
  "value": "BGD_CGP" },
{
  "label": "库尔纳",
  "value": "BGD_KHL" }],

[{
  "label": "密克罗尼西亚",
  "value": "FSM_bak" }],

[{
  "label": "阿雷基帕",
  "value": "PER_AR" },
{
  "label": "阿普里马克",
  "value": "PER_AP" },
{
  "label": "阿亚库乔",
  "value": "PER_AY" },
{
  "label": "安卡什",
  "value": "PER_AN" },
{
  "label": "胡利亚卡",
  "value": "PER_JUL" },
{
  "label": "胡宁",
  "value": "PER_JU" },
{
  "label": "卡哈马卡",
  "value": "PER_CJ" },
{
  "label": "卡亚俄",
  "value": "PER_CL" },
{
  "label": "库斯科",
  "value": "PER_CU" },
{
  "label": "拉利伯塔德",
  "value": "PER_LD" },
{
  "label": "兰巴耶克",
  "value": "PER_LY" },
{
  "label": "利马",
  "value": "PER_LI" },
{
  "label": "洛雷托",
  "value": "PER_LO" },
{
  "label": "马德雷德迪奥斯",
  "value": "PER_MD" },
{
  "label": "莫克瓜",
  "value": "PER_MO" },
{
  "label": "帕斯科",
  "value": "PER_PA" },
{
  "label": "皮乌拉",
  "value": "PER_PI" },
{
  "label": "普诺",
  "value": "PER_PU" },
{
  "label": "钦博特",
  "value": "PER_CHM" },
{
  "label": "钦查阿尔塔",
  "value": "PER_CHI" },
{
  "label": "圣马丁",
  "value": "PER_SM" },
{
  "label": "苏拉纳",
  "value": "PER_SUL" },
{
  "label": "塔克纳",
  "value": "PER_TA" },
{
  "label": "通贝斯",
  "value": "PER_TU" },
{
  "label": "瓦努科",
  "value": "PER_HO" },
{
  "label": "万卡维利卡",
  "value": "PER_HV" },
{
  "label": "乌卡亚利",
  "value": "PER_UC" },
{
  "label": "亚马孙",
  "value": "PER_AM" },
{
  "label": "伊卡",
  "value": "PER_IC" }],

[{
  "label": "勃固省",
  "value": "MMR_BG" },
{
  "label": "掸邦",
  "value": "MMR_SH" },
{
  "label": "德林达依省",
  "value": "MMR_TN" },
{
  "label": "克伦邦",
  "value": "MMR_KN" },
{
  "label": "克钦邦",
  "value": "MMR_KC" },
{
  "label": "克耶邦",
  "value": "MMR_KH" },
{
  "label": "马圭省",
  "value": "MMR_MG" },
{
  "label": "曼德勒省",
  "value": "MMR_MD" },
{
  "label": "孟邦",
  "value": "MMR_MN" },
{
  "label": "钦邦",
  "value": "MMR_CH" },
{
  "label": "若开邦",
  "value": "MMR_RK" },
{
  "label": "实皆省",
  "value": "MMR_SG" },
{
  "label": "仰光省",
  "value": "MMR_YG" },
{
  "label": "伊洛瓦底省",
  "value": "MMR_AY" }],

[{
  "label": "摩尔多瓦",
  "value": "MDA_bak" }],

[{
  "label": "丹吉尔",
  "value": "MAR_TGR" },
{
  "label": "得土安",
  "value": "MAR_TET" },
{
  "label": "非斯",
  "value": "MAR_FES" },
{
  "label": "卡萨布兰卡",
  "value": "MAR_CBL" },
{
  "label": "拉巴特",
  "value": "MAR_RSA" },
{
  "label": "马拉喀什",
  "value": "MAR_MRK" },
{
  "label": "梅克内斯",
  "value": "MAR_MKN" },
{
  "label": "乌季达",
  "value": "MAR_OUJ" },
{
  "label": "西撒哈拉",
  "value": "MAR_WSH" }],

[{
  "label": "摩纳哥",
  "value": "MCO_bak" }],

[{
  "label": "莫桑比克",
  "value": "MOZ_bak" }],

[{
  "label": "阿瓜斯卡连斯特",
  "value": "MEX_AGU" },
{
  "label": "阿卡普尔科",
  "value": "MEX_ACA" },
{
  "label": "埃莫西约",
  "value": "MEX_HMO" },
{
  "label": "埃佩切",
  "value": "MEX_CAM" },
{
  "label": "奥夫雷贡城",
  "value": "MEX_OBR" },
{
  "label": "奥里萨巴",
  "value": "MEX_ORI" },
{
  "label": "巴利城",
  "value": "MEX_VHM" },
{
  "label": "巴亚尔塔港",
  "value": "MEX_PVR" },
{
  "label": "比利亚埃尔莫萨",
  "value": "MEX_VSA" },
{
  "label": "波萨里卡",
  "value": "MEX_PRH" },
{
  "label": "蒂华纳",
  "value": "MEX_TIJ" },
{
  "label": "杜兰戈",
  "value": "MEX_DUR" },
{
  "label": "恩塞纳达",
  "value": "MEX_ESE" },
{
  "label": "瓜达拉哈拉",
  "value": "MEX_GDL" },
{
  "label": "瓜纳华托",
  "value": "MEX_GUA" },
{
  "label": "哈拉帕",
  "value": "MEX_JAL" },
{
  "label": "华雷斯",
  "value": "MEX_JUZ" },
{
  "label": "华雷斯港",
  "value": "MEX_BJU" },
{
  "label": "卡门",
  "value": "MEX_CAR" },
{
  "label": "科利马",
  "value": "MEX_COL" },
{
  "label": "克雷塔罗",
  "value": "MEX_QUE" },
{
  "label": "库埃纳瓦卡",
  "value": "MEX_CVC" },
{
  "label": "库利阿坎",
  "value": "MEX_CUL" },
{
  "label": "夸察夸拉克斯",
  "value": "MEX_COA" },
{
  "label": "拉巴斯",
  "value": "MEX_LAP" },
{
  "label": "莱昂",
  "value": "MEX_LEN" },
{
  "label": "雷诺萨",
  "value": "MEX_REX" },
{
  "label": "洛斯莫奇斯",
  "value": "MEX_LMM" },
{
  "label": "马萨特兰",
  "value": "MEX_MZT" },
{
  "label": "马塔莫罗斯",
  "value": "MEX_MAM" },
{
  "label": "梅里达",
  "value": "MEX_MID" },
{
  "label": "蒙克洛瓦",
  "value": "MEX_LOV" },
{
  "label": "蒙特雷",
  "value": "MEX_MTY" },
{
  "label": "莫雷利亚",
  "value": "MEX_MLM" },
{
  "label": "墨西哥城",
  "value": "MEX_MEX" },
{
  "label": "墨西卡利",
  "value": "MEX_MXL" },
{
  "label": "诺加莱斯",
  "value": "MEX_NOG" },
{
  "label": "帕丘卡",
  "value": "MEX_PAC" },
{
  "label": "普埃布拉",
  "value": "MEX_PUE" },
{
  "label": "奇尔潘辛戈",
  "value": "MEX_CHI" },
{
  "label": "奇瓦瓦",
  "value": "MEX_CHH" },
{
  "label": "切图马尔",
  "value": "MEX_CTM" },
{
  "label": "萨尔蒂约",
  "value": "MEX_SLW" },
{
  "label": "萨卡特卡斯",
  "value": "MEX_ZAC" },
{
  "label": "塞拉亚",
  "value": "MEX_CLY" },
{
  "label": "圣路易斯波托亚",
  "value": "MEX_SLP" },
{
  "label": "塔帕丘拉",
  "value": "MEX_TAP" },
{
  "label": "坦皮科",
  "value": "MEX_TAM" },
{
  "label": "特拉斯卡拉",
  "value": "MEX_TLA" },
{
  "label": "特皮克",
  "value": "MEX_TPQ" },
{
  "label": "特瓦坎",
  "value": "MEX_TCN" },
{
  "label": "图斯特拉-古铁雷斯",
  "value": "MEX_TGZ" },
{
  "label": "托雷翁",
  "value": "MEX_TRC" },
{
  "label": "托卢卡",
  "value": "MEX_TLC" },
{
  "label": "瓦哈卡",
  "value": "MEX_OAX" },
{
  "label": "维多利亚城",
  "value": "MEX_VIC" },
{
  "label": "韦拉克鲁斯",
  "value": "MEX_VER" },
{
  "label": "乌鲁阿潘",
  "value": "MEX_UPN" },
{
  "label": "新拉雷多",
  "value": "MEX_NLE" },
{
  "label": "伊拉普阿托",
  "value": "MEX_IRP" }],

[{
  "label": "埃龙戈",
  "value": "NAM_ER" },
{
  "label": "奥汉圭纳",
  "value": "NAM_OW" },
{
  "label": "奥卡万戈",
  "value": "NAM_KV" },
{
  "label": "奥马赫科",
  "value": "NAM_OK" },
{
  "label": "奥姆沙蒂",
  "value": "NAM_OT" },
{
  "label": "奥乔宗蒂约巴",
  "value": "NAM_OJ" },
{
  "label": "奥沙纳",
  "value": "NAM_ON" },
{
  "label": "奥希科托",
  "value": "NAM_OO" },
{
  "label": "哈达普",
  "value": "NAM_HA" },
{
  "label": "霍马斯",
  "value": "NAM_KH" },
{
  "label": "卡拉斯",
  "value": "NAM_KR" },
{
  "label": "卡普里维",
  "value": "NAM_CA" },
{
  "label": "库内内",
  "value": "NAM_KU" }],

[{
  "label": "阿平顿",
  "value": "ZAF_UTN" },
{
  "label": "艾利弗山",
  "value": "ZAF_MAY" },
{
  "label": "彼德马里茨堡",
  "value": "ZAF_PZB" },
{
  "label": "彼德斯堡",
  "value": "ZAF_PTG" },
{
  "label": "比勒陀利亚",
  "value": "ZAF_PRY" },
{
  "label": "比索",
  "value": "ZAF_BIY" },
{
  "label": "布雷达斯多普",
  "value": "ZAF_BDD" },
{
  "label": "布隆方丹",
  "value": "ZAF_BFN" },
{
  "label": "布隆克斯特斯普利特",
  "value": "ZAF_BHT" },
{
  "label": "德阿尔",
  "value": "ZAF_DAA" },
{
  "label": "德班",
  "value": "ZAF_DUR" },
{
  "label": "邓迪",
  "value": "ZAF_DUN" },
{
  "label": "东巴克利",
  "value": "ZAF_BAE" },
{
  "label": "东伦敦",
  "value": "ZAF_ELS" },
{
  "label": "弗雷堡",
  "value": "ZAF_VRU" },
{
  "label": "弗里尼欣",
  "value": "ZAF_VGG" },
{
  "label": "格罗布莱斯达尔",
  "value": "ZAF_GBD" },
{
  "label": "基雅尼",
  "value": "ZAF_GIY" },
{
  "label": "金伯利",
  "value": "ZAF_KIM" },
{
  "label": "开普敦",
  "value": "ZAF_CPT" },
{
  "label": "克莱克斯多普",
  "value": "ZAF_KXE" },
{
  "label": "库鲁曼",
  "value": "ZAF_KMH" },
{
  "label": "昆士敦",
  "value": "ZAF_UTW" },
{
  "label": "莱迪史密斯",
  "value": "ZAF_LAY" },
{
  "label": "兰德方丹",
  "value": "ZAF_RFT" },
{
  "label": "理查兹湾",
  "value": "ZAF_RCB" },
{
  "label": "利斯滕堡",
  "value": "ZAF_RSB" },
{
  "label": "米德尔堡",
  "value": "ZAF_MDB" },
{
  "label": "姆库泽",
  "value": "ZAF_MZQ" },
{
  "label": "穆里斯堡",
  "value": "ZAF_MOO" },
{
  "label": "内尔斯普雷特",
  "value": "ZAF_NLP" },
{
  "label": "尼尔斯特隆",
  "value": "ZAF_NYL" },
{
  "label": "纽卡斯尔",
  "value": "ZAF_NCS" },
{
  "label": "乔治",
  "value": "ZAF_GRJ" },
{
  "label": "萨索尔堡",
  "value": "ZAF_SAS" },
{
  "label": "瑟孔达",
  "value": "ZAF_ZEC" },
{
  "label": "特克索波",
  "value": "ZAF_IXO" },
{
  "label": "特隆普斯堡",
  "value": "ZAF_TPB" },
{
  "label": "跳羚",
  "value": "ZAF_SBU" },
{
  "label": "图拉马哈谢",
  "value": "ZAF_TLH" },
{
  "label": "托霍延杜",
  "value": "ZAF_THY" },
{
  "label": "韦茨肖克",
  "value": "ZAF_WSH" },
{
  "label": "韦尔科姆",
  "value": "ZAF_WEL" },
{
  "label": "乌伦迪",
  "value": "ZAF_ULD" },
{
  "label": "乌姆塔塔",
  "value": "ZAF_UTT" },
{
  "label": "伍斯特",
  "value": "ZAF_WOR" },
{
  "label": "西博福特",
  "value": "ZAF_BEW" },
{
  "label": "谢普斯通港",
  "value": "ZAF_PSS" },
{
  "label": "伊丽莎白港",
  "value": "ZAF_PLZ" },
{
  "label": "约翰内斯堡",
  "value": "ZAF_JNB" }],

[{
  "label": "南极洲",
  "value": "ATA_bak" }],

[{
  "label": "南乔治亚和南桑德威奇群岛",
  "value": "SGS_bak" }],

[{
  "label": "瑙鲁",
  "value": "NRU_bak" }],

[{
  "label": "巴格马蒂",
  "value": "NPL_BA" },
{
  "label": "道拉吉里",
  "value": "NPL_DH" },
{
  "label": "甘达基",
  "value": "NPL_GA" },
{
  "label": "戈西",
  "value": "NPL_KO" },
{
  "label": "格尔纳利",
  "value": "NPL_KA" },
{
  "label": "贾纳克布尔",
  "value": "NPL_JA" },
{
  "label": "拉布蒂",
  "value": "NPL_RA" },
{
  "label": "蓝毗尼",
  "value": "NPL_LU" },
{
  "label": "马哈卡利",
  "value": "NPL_MA" },
{
  "label": "梅吉",
  "value": "NPL_ME" },
{
  "label": "纳拉亚尼",
  "value": "NPL_NA" },
{
  "label": "佩里",
  "value": "NPL_BH" },
{
  "label": "萨加玛塔",
  "value": "NPL_SA" },
{
  "label": "塞蒂",
  "value": "NPL_SE" }],

[{
  "label": "埃斯特利",
  "value": "NIC_ES" },
{
  "label": "北大西洋",
  "value": "NIC_AN" },
{
  "label": "博阿科",
  "value": "NIC_BO" },
{
  "label": "格拉纳达",
  "value": "NIC_GR" },
{
  "label": "卡拉索",
  "value": "NIC_CA" },
{
  "label": "莱昂",
  "value": "NIC_LE" },
{
  "label": "里瓦斯",
  "value": "NIC_RV" },
{
  "label": "马德里斯",
  "value": "NIC_MD" },
{
  "label": "马那瓜",
  "value": "NIC_MN" },
{
  "label": "马萨亚",
  "value": "NIC_MS" },
{
  "label": "马塔加尔帕",
  "value": "NIC_MT" },
{
  "label": "南大西洋",
  "value": "NIC_AS" },
{
  "label": "奇南德加",
  "value": "NIC_CD" },
{
  "label": "琼塔莱斯",
  "value": "NIC_CT" },
{
  "label": "圣胡安河",
  "value": "NIC_SJ" },
{
  "label": "希诺特加",
  "value": "NIC_JI" },
{
  "label": "新塞哥维亚",
  "value": "NIC_NS" }],

[{
  "label": "阿加德兹",
  "value": "NER_AJY" },
{
  "label": "迪法",
  "value": "NER_DIF" },
{
  "label": "蒂拉贝里",
  "value": "NER_TIL" },
{
  "label": "多索",
  "value": "NER_DSS" },
{
  "label": "津德尔",
  "value": "NER_ZND" },
{
  "label": "马拉迪",
  "value": "NER_MFQ" },
{
  "label": "尼亚美市",
  "value": "NER_NIM" },
{
  "label": "塔瓦",
  "value": "NER_THZ" }],

[{
  "label": "阿比亚",
  "value": "NGA_ABV" },
{
  "label": "奥博莫绍",
  "value": "NGA_OGB" },
{
  "label": "卡诺",
  "value": "NGA_KAN" },
{
  "label": "拉各斯",
  "value": "NGA_LOS" },
{
  "label": "伊巴丹",
  "value": "NGA_IBA" }],

[{
  "label": "纽埃",
  "value": "NIU_bak" }],

[{
  "label": "阿克什胡斯",
  "value": "NOR_2" },
{
  "label": "奥普兰",
  "value": "NOR_5" },
{
  "label": "奥斯陆市",
  "value": "NOR_3" },
{
  "label": "北特伦德拉格",
  "value": "NOR_17" },
{
  "label": "布斯克吕",
  "value": "NOR_6" },
{
  "label": "东阿格德尔",
  "value": "NOR_9" },
{
  "label": "东福尔",
  "value": "NOR_1" },
{
  "label": "芬马克",
  "value": "NOR_20" },
{
  "label": "海德马克",
  "value": "NOR_4" },
{
  "label": "霍达兰",
  "value": "NOR_12" },
{
  "label": "罗加兰",
  "value": "NOR_11" },
{
  "label": "默勒－鲁姆斯达尔",
  "value": "NOR_15" },
{
  "label": "南特伦德拉格",
  "value": "NOR_16" },
{
  "label": "诺尔兰",
  "value": "NOR_18" },
{
  "label": "松恩－菲尤拉讷",
  "value": "NOR_14" },
{
  "label": "泰勒马克",
  "value": "NOR_8" },
{
  "label": "特罗姆斯",
  "value": "NOR_19" },
{
  "label": "西阿格德尔",
  "value": "NOR_10" },
{
  "label": "西福尔",
  "value": "NOR_7" }],

[{
  "label": "诺福克",
  "value": "NFK_bak" }],

[{
  "label": "帕劳群岛",
  "value": "PLW_bak" }],

[{
  "label": "皮特凯恩",
  "value": "PCN_bak" }],

[{
  "label": "滨海阿连特茹",
  "value": "PRT_ALL" },
{
  "label": "滨海皮尼亚尔",
  "value": "PRT_PLT" },
{
  "label": "波尔图",
  "value": "PRT_VDP" },
{
  "label": "杜罗",
  "value": "PRT_MDR" },
{
  "label": "恩特拉杜罗伏日",
  "value": "PRT_EDV" },
{
  "label": "法鲁",
  "value": "PRT_FAO" },
{
  "label": "丰沙尔",
  "value": "PRT_FUN" },
{
  "label": "卡瓦多",
  "value": "PRT_CAV" },
{
  "label": "科瓦贝拉",
  "value": "PRT_CLB" },
{
  "label": "里斯本",
  "value": "PRT_LIS" },
{
  "label": "利巴特茹",
  "value": "PRT_LTE" },
{
  "label": "梅地奥特茹",
  "value": "PRT_MTE" },
{
  "label": "米尼奥-利马",
  "value": "PRT_MLI" },
{
  "label": "内贝拉北",
  "value": "PRT_BIN" },
{
  "label": "内贝拉南",
  "value": "PRT_BIS" },
{
  "label": "内皮尼亚尔北",
  "value": "PRT_PIN" },
{
  "label": "内皮尼亚尔南",
  "value": "PRT_PIS" },
{
  "label": "蓬塔德尔加达",
  "value": "PRT_PDL" },
{
  "label": "塞图巴尔半岛",
  "value": "PRT_PSE" },
{
  "label": "山后",
  "value": "PRT_SES" },
{
  "label": "上阿连特茹",
  "value": "PRT_AAT" },
{
  "label": "上特拉斯山",
  "value": "PRT_ATM" },
{
  "label": "塔梅加",
  "value": "PRT_TAM" },
{
  "label": "万福",
  "value": "PRT_AES" },
{
  "label": "西部",
  "value": "PRT_OES" },
{
  "label": "下阿连特茹",
  "value": "PRT_BAL" },
{
  "label": "下伏日",
  "value": "PRT_BVO" },
{
  "label": "下蒙德古",
  "value": "PRT_BMO" },
{
  "label": "中阿连特茹",
  "value": "PRT_ALC" }],

[{
  "label": "乔治亚",
  "value": "GEO_bak" }],

[{
  "label": "爱媛",
  "value": "JPN_38" },
{
  "label": "爱知",
  "value": "JPN_23" },
{
  "label": "北海道",
  "value": "JPN_1" },
{
  "label": "兵库",
  "value": "JPN_28" },
{
  "label": "冲绳",
  "value": "JPN_47" },
{
  "label": "茨城",
  "value": "JPN_8" },
{
  "label": "大阪",
  "value": "JPN_27" },
{
  "label": "大分",
  "value": "JPN_44" },
{
  "label": "岛根",
  "value": "JPN_32" },
{
  "label": "徳岛",
  "value": "JPN_36" },
{
  "label": "东京",
  "value": "JPN_13" },
{
  "label": "福岛",
  "value": "JPN_7" },
{
  "label": "福冈",
  "value": "JPN_40" },
{
  "label": "福井",
  "value": "JPN_18" },
{
  "label": "富山",
  "value": "JPN_16" },
{
  "label": "冈山",
  "value": "JPN_33" },
{
  "label": "高知",
  "value": "JPN_39" },
{
  "label": "宮城",
  "value": "JPN_4" },
{
  "label": "宫崎",
  "value": "JPN_45" },
{
  "label": "广岛",
  "value": "JPN_34" },
{
  "label": "和歌山",
  "value": "JPN_30" },
{
  "label": "京都",
  "value": "JPN_26" },
{
  "label": "静冈",
  "value": "JPN_22" },
{
  "label": "枥木",
  "value": "JPN_9" },
{
  "label": "鹿儿岛",
  "value": "JPN_46" },
{
  "label": "奈良",
  "value": "JPN_29" },
{
  "label": "鸟取",
  "value": "JPN_31" },
{
  "label": "岐阜",
  "value": "JPN_21" },
{
  "label": "埼玉",
  "value": "JPN_11" },
{
  "label": "千叶",
  "value": "JPN_12" },
{
  "label": "青森",
  "value": "JPN_2" },
{
  "label": "秋田",
  "value": "JPN_5" },
{
  "label": "群马",
  "value": "JPN_10" },
{
  "label": "三重",
  "value": "JPN_24" },
{
  "label": "山口",
  "value": "JPN_35" },
{
  "label": "山梨",
  "value": "JPN_19" },
{
  "label": "山形",
  "value": "JPN_6" },
{
  "label": "神奈川",
  "value": "JPN_14" },
{
  "label": "石川",
  "value": "JPN_17" },
{
  "label": "香川",
  "value": "JPN_37" },
{
  "label": "新潟",
  "value": "JPN_15" },
{
  "label": "熊本",
  "value": "JPN_43" },
{
  "label": "岩手",
  "value": "JPN_3" },
{
  "label": "长崎",
  "value": "JPN_42" },
{
  "label": "长野",
  "value": "JPN_20" },
{
  "label": "滋贺",
  "value": "JPN_25" },
{
  "label": "佐贺",
  "value": "JPN_41" }],

[{
  "label": "北博滕",
  "value": "SWE_BD" },
{
  "label": "布莱金厄",
  "value": "SWE_K" },
{
  "label": "达拉纳",
  "value": "SWE_DLN" },
{
  "label": "东约特兰",
  "value": "SWE_UGL" },
{
  "label": "厄勒布鲁",
  "value": "SWE_T" },
{
  "label": "哥得兰",
  "value": "SWE_I" },
{
  "label": "哈兰",
  "value": "SWE_N" },
{
  "label": "卡尔马",
  "value": "SWE_H" },
{
  "label": "克鲁努贝里",
  "value": "SWE_G" },
{
  "label": "南曼兰",
  "value": "SWE_D" },
{
  "label": "斯德哥尔摩",
  "value": "SWE_AB" },
{
  "label": "斯科耐",
  "value": "SWE_M" },
{
  "label": "韦姆兰",
  "value": "SWE_S" },
{
  "label": "乌普萨拉",
  "value": "SWE_C" },
{
  "label": "西博滕",
  "value": "SWE_AC" },
{
  "label": "西曼兰",
  "value": "SWE_U" },
{
  "label": "西诺尔兰",
  "value": "SWE_Y" },
{
  "label": "西约特兰",
  "value": "SWE_O" },
{
  "label": "延雪平",
  "value": "SWE_F" },
{
  "label": "耶夫勒堡",
  "value": "SWE_X" },
{
  "label": "耶姆特兰",
  "value": "SWE_Z" }],

[{
  "label": "阿尔高",
  "value": "CHE_AG" },
{
  "label": "巴塞尔城市",
  "value": "CHE_BS" },
{
  "label": "巴塞尔乡村",
  "value": "CHE_BL" },
{
  "label": "伯尔尼",
  "value": "CHE_BE" },
{
  "label": "楚格",
  "value": "CHE_ZG" },
{
  "label": "弗里堡",
  "value": "CHE_FR" },
{
  "label": "格拉鲁斯",
  "value": "CHE_GL" },
{
  "label": "格劳宾登",
  "value": "CHE_GR" },
{
  "label": "卢塞恩",
  "value": "CHE_LU" },
{
  "label": "洛桑",
  "value": "CHE_LA" },
{
  "label": "纳沙泰尔",
  "value": "CHE_NE" },
{
  "label": "内阿彭策尔",
  "value": "CHE_AI" },
{
  "label": "日内瓦",
  "value": "CHE_GE" },
{
  "label": "汝拉",
  "value": "CHE_JU" },
{
  "label": "沙夫豪森",
  "value": "CHE_SH" },
{
  "label": "上瓦尔登",
  "value": "CHE_OW" },
{
  "label": "圣加仑",
  "value": "CHE_SG" },
{
  "label": "施维茨",
  "value": "CHE_SZ" },
{
  "label": "苏黎世",
  "value": "CHE_ZH" },
{
  "label": "索洛图恩",
  "value": "CHE_SO" },
{
  "label": "提契诺",
  "value": "CHE_TI" },
{
  "label": "图尔高",
  "value": "CHE_TG" },
{
  "label": "瓦莱",
  "value": "CHE_VS" },
{
  "label": "外阿彭策尔",
  "value": "CHE_AR" },
{
  "label": "沃",
  "value": "CHE_VD" },
{
  "label": "乌里",
  "value": "CHE_UR" },
{
  "label": "下瓦尔登",
  "value": "CHE_NW" }],

[{
  "label": "阿波帕",
  "value": "SLV_APO" },
{
  "label": "阿瓦查潘",
  "value": "SLV_AH" },
{
  "label": "滨海",
  "value": "SLV_LI" },
{
  "label": "查拉特南戈",
  "value": "SLV_CH" },
{
  "label": "德尔加多",
  "value": "SLV_DE" },
{
  "label": "基埃-恩特姆",
  "value": "SLV_KN" },
{
  "label": "卡瓦尼亚斯",
  "value": "SLV_CA" },
{
  "label": "库斯卡特兰",
  "value": "SLV_CU" },
{
  "label": "拉巴斯",
  "value": "SLV_PZ" },
{
  "label": "拉利伯塔德",
  "value": "SLV_LB" },
{
  "label": "拉乌尼翁",
  "value": "SLV_UN" },
{
  "label": "梅基卡诺斯",
  "value": "SLV_MEJ" },
{
  "label": "莫拉桑",
  "value": "SLV_MO" },
{
  "label": "圣安娜",
  "value": "SLV_SA" },
{
  "label": "圣米格尔",
  "value": "SLV_SM" },
{
  "label": "圣萨尔瓦多",
  "value": "SLV_SS" },
{
  "label": "圣维森特",
  "value": "SLV_SV" },
{
  "label": "松索纳特",
  "value": "SLV_SO" },
{
  "label": "索亚潘戈",
  "value": "SLV_SOY" },
{
  "label": "韦莱-恩萨斯",
  "value": "SLV_WN" },
{
  "label": "乌苏卢坦",
  "value": "SLV_US" },
{
  "label": "伊洛潘戈",
  "value": "SLV_IL" },
{
  "label": "中南",
  "value": "SLV_CS" }],

[{
  "label": "萨摩亚",
  "value": "WSM_bak" }],

[{
  "label": "贝尔格莱德",
  "value": "SCG_BEG" },
{
  "label": "波德戈里察",
  "value": "SCG_POD" },
{
  "label": "克拉古涅瓦茨",
  "value": "SCG_KGV" },
{
  "label": "尼什",
  "value": "SCG_INI" },
{
  "label": "诺维萨德",
  "value": "SCG_NVS" },
{
  "label": "普里什蒂纳",
  "value": "SCG_PRN" },
{
  "label": "苏博蒂察",
  "value": "SCG_SUB" },
{
  "label": "泽蒙",
  "value": "SCG_ZEM" }],

[{
  "label": "北部",
  "value": "SLE_N" },
{
  "label": "东部",
  "value": "SLE_E" },
{
  "label": "南部",
  "value": "SLE_S" },
{
  "label": "西部区",
  "value": "SLE_W" }],

[{
  "label": "达喀尔",
  "value": "SEN_DA" },
{
  "label": "法蒂克",
  "value": "SEN_FA" },
{
  "label": "济金绍尔",
  "value": "SEN_ZI" },
{
  "label": "捷斯",
  "value": "SEN_TH" },
{
  "label": "久尔贝勒",
  "value": "SEN_DI" },
{
  "label": "考拉克",
  "value": "SEN_KA" },
{
  "label": "科尔达",
  "value": "SEN_KO" },
{
  "label": "卢加",
  "value": "SEN_LO" },
{
  "label": "马塔姆",
  "value": "SEN_MA" },
{
  "label": "圣路易",
  "value": "SEN_SL" },
{
  "label": "坦巴昆达",
  "value": "SEN_TA" }],

[{
  "label": "法马古斯塔",
  "value": "CYP_4" },
{
  "label": "凯里尼亚",
  "value": "CYP_6" },
{
  "label": "拉纳卡",
  "value": "CYP_3" },
{
  "label": "利马索尔",
  "value": "CYP_2" },
{
  "label": "尼科西亚",
  "value": "CYP_1" },
{
  "label": "帕福斯",
  "value": "CYP_5" }],

[{
  "label": "塞舌尔",
  "value": "SYC_bak" }],

[{
  "label": "阿尔阿尔",
  "value": "SAU_ARA" },
{
  "label": "艾卜哈",
  "value": "SAU_AHB" },
{
  "label": "巴哈",
  "value": "SAU_BH" },
{
  "label": "布赖代",
  "value": "SAU_BUR" },
{
  "label": "达曼",
  "value": "SAU_DAM" },
{
  "label": "哈费尔巴廷",
  "value": "SAU_HBT" },
{
  "label": "哈伊勒",
  "value": "SAU_HL" },
{
  "label": "海米斯穆谢特",
  "value": "SAU_KMX" },
{
  "label": "海耶",
  "value": "SAU_AKH" },
{
  "label": "胡富夫",
  "value": "SAU_HFF" },
{
  "label": "吉达",
  "value": "SAU_JED" },
{
  "label": "吉赞",
  "value": "SAU_JZ" },
{
  "label": "利雅得",
  "value": "SAU_RD" },
{
  "label": "麦地那",
  "value": "SAU_MED" },
{
  "label": "麦加",
  "value": "SAU_ML" },
{
  "label": "姆巴拉兹",
  "value": "SAU_MBR" },
{
  "label": "纳季兰",
  "value": "SAU_NR" },
{
  "label": "塞卡卡",
  "value": "SAU_SAK" },
{
  "label": "塔布克",
  "value": "SAU_TB" },
{
  "label": "塔伊夫",
  "value": "SAU_TAR" },
{
  "label": "延布",
  "value": "SAU_YNB" },
{
  "label": "朱拜勒",
  "value": "SAU_JBI" }],

[{
  "label": "圣诞岛",
  "value": "CXR_bak" }],

[{
  "label": "圣多美和普林西比",
  "value": "STP_bak" }],

[{
  "label": "圣赫勒拿",
  "value": "SHN_bak" }],

[{
  "label": "圣基茨和尼维斯",
  "value": "KNA_bak" }],

[{
  "label": "圣卢西亚",
  "value": "LCA_bak" }],

[{
  "label": "圣马力诺",
  "value": "SMR_bak" }],

[{
  "label": "圣皮埃尔和米克隆群岛",
  "value": "SPM_bak" }],

[{
  "label": "圣文森特和格林纳丁斯",
  "value": "VCT_bak" }],

[{
  "label": "阿努拉德普勒",
  "value": "LKA_ADP" },
{
  "label": "安帕赖",
  "value": "LKA_AMP" },
{
  "label": "巴杜勒",
  "value": "LKA_BAD" },
{
  "label": "拜蒂克洛",
  "value": "LKA_BTC" },
{
  "label": "波隆纳鲁沃",
  "value": "LKA_POL" },
{
  "label": "汉班托特",
  "value": "LKA_HBA" },
{
  "label": "基里诺奇",
  "value": "LKA_KIL" },
{
  "label": "加勒",
  "value": "LKA_GAL" },
{
  "label": "加姆珀哈",
  "value": "LKA_GAM" },
{
  "label": "贾夫纳",
  "value": "LKA_JAF" },
{
  "label": "卡卢特勒",
  "value": "LKA_KLT" },
{
  "label": "凯格勒",
  "value": "LKA_KEG" },
{
  "label": "康提",
  "value": "LKA_KAN" },
{
  "label": "科伦坡",
  "value": "LKA_CMB" },
{
  "label": "库鲁内格勒",
  "value": "LKA_KUR" },
{
  "label": "拉特纳普勒",
  "value": "LKA_RAT" },
{
  "label": "马纳尔",
  "value": "LKA_MAN" },
{
  "label": "马特莱",
  "value": "LKA_MAT" },
{
  "label": "马特勒",
  "value": "LKA_MAA" },
{
  "label": "莫讷勒格勒",
  "value": "LKA_MON" },
{
  "label": "穆莱蒂武",
  "value": "LKA_MUL" },
{
  "label": "努沃勒埃利耶",
  "value": "LKA_NUE" },
{
  "label": "普塔勒姆",
  "value": "LKA_PUT" },
{
  "label": "亭可马里",
  "value": "LKA_TRR" },
{
  "label": "瓦武尼亚",
  "value": "LKA_VAV" }],

[{
  "label": "班斯卡-比斯特里察",
  "value": "SVK_BBY" },
{
  "label": "布拉迪斯拉发",
  "value": "SVK_BTS" },
{
  "label": "科希策",
  "value": "SVK_KOR" },
{
  "label": "尼特拉",
  "value": "SVK_NRA" },
{
  "label": "普雷绍夫",
  "value": "SVK_POV" },
{
  "label": "日利纳",
  "value": "SVK_RIL" },
{
  "label": "特尔纳瓦",
  "value": "SVK_TNA" },
{
  "label": "特伦钦",
  "value": "SVK_TRE" }],

[{
  "label": "奥巴尔诺-克拉",
  "value": "SVN_OKR" },
{
  "label": "奥斯雷德涅斯洛文",
  "value": "SVN_OSR" },
{
  "label": "波德拉夫",
  "value": "SVN_POD" },
{
  "label": "波穆尔",
  "value": "SVN_POM" },
{
  "label": "多雷尼",
  "value": "SVN_DLJ" },
{
  "label": "戈雷尼",
  "value": "SVN_GSZ" },
{
  "label": "戈里",
  "value": "SVN_GSK" },
{
  "label": "科洛",
  "value": "SVN_KOR" },
{
  "label": "诺特拉尼",
  "value": "SVN_NKR" },
{
  "label": "萨维尼",
  "value": "SVN_SAV" },
{
  "label": "斯波德涅波萨夫",
  "value": "SVN_SPO" },
{
  "label": "扎萨夫",
  "value": "SVN_ZAS" }],

[{
  "label": "斯瓦尔巴和扬马廷",
  "value": "SJM_bak" }],

[{
  "label": "斯威士兰",
  "value": "SWZ_bak" }],

[{
  "label": "北部",
  "value": "SDN_ASH" },
{
  "label": "赤道",
  "value": "SDN_SIS" },
{
  "label": "达尔富尔",
  "value": "SDN_SDA" },
{
  "label": "东部",
  "value": "SDN_SHA" },
{
  "label": "加扎勒河",
  "value": "SDN_SBG" },
{
  "label": "喀土穆",
  "value": "SDN_KRT" },
{
  "label": "科尔多凡",
  "value": "SDN_GKU" },
{
  "label": "上尼罗",
  "value": "SDN_ANB" },
{
  "label": "中部",
  "value": "SDN_WDH" }],

[{
  "label": "布罗科蓬多",
  "value": "SUR_BR" },
{
  "label": "科罗尼",
  "value": "SUR_CR" },
{
  "label": "科默韦讷",
  "value": "SUR_CM" },
{
  "label": "马罗韦讷",
  "value": "SUR_MA" },
{
  "label": "尼克里",
  "value": "SUR_NI" },
{
  "label": "帕拉",
  "value": "SUR_PA" },
{
  "label": "帕拉马里博",
  "value": "SUR_PM" },
{
  "label": "萨拉马卡",
  "value": "SUR_SA" },
{
  "label": "瓦尼卡",
  "value": "SUR_WA" },
{
  "label": "西帕里韦尼",
  "value": "SUR_SI" }],

[{
  "label": "瓜达尔卡纳尔",
  "value": "SLB_GC" },
{
  "label": "霍尼亚拉",
  "value": "SLB_HO" },
{
  "label": "拉纳尔和贝罗纳",
  "value": "SLB_RB" },
{
  "label": "马基拉",
  "value": "SLB_MK" },
{
  "label": "马莱塔",
  "value": "SLB_ML" },
{
  "label": "乔伊索",
  "value": "SLB_CH" },
{
  "label": "泰莫图",
  "value": "SLB_TM" },
{
  "label": "西部",
  "value": "SLB_WE" },
{
  "label": "伊萨贝尔",
  "value": "SLB_IS" },
{
  "label": "中部群岛",
  "value": "SLB_CE" }],

[{
  "label": "索马里",
  "value": "SOM_bak" }],

[{
  "label": "杜尚别",
  "value": "TJK_DYU" },
{
  "label": "霍罗格",
  "value": "TJK_KHO" },
{
  "label": "卡尼巴达姆",
  "value": "TJK_KAN" },
{
  "label": "科法尔尼洪",
  "value": "TJK_KOF" },
{
  "label": "苦盏",
  "value": "TJK_KHU" },
{
  "label": "库尔干-秋别",
  "value": "TJK_KTJ" },
{
  "label": "库洛布",
  "value": "TJK_KLB" },
{
  "label": "洛贡",
  "value": "TJK_RGU" },
{
  "label": "努雷克",
  "value": "TJK_NUR" },
{
  "label": "彭吉肯特",
  "value": "TJK_PJK" },
{
  "label": "萨班特",
  "value": "TJK_SBA" },
{
  "label": "塔博沙尔",
  "value": "TJK_TBS" },
{
  "label": "图尔孙扎德",
  "value": "TJK_TSZ" },
{
  "label": "乌拉秋别",
  "value": "TJK_UTJ" },
{
  "label": "伊斯法拉",
  "value": "TJK_ISF" }],

[{
  "label": "安纳乍能",
  "value": "THA_37" },
{
  "label": "巴蜀",
  "value": "THA_77" },
{
  "label": "巴吞他尼",
  "value": "THA_13" },
{
  "label": "巴真",
  "value": "THA_25" },
{
  "label": "北碧",
  "value": "THA_71" },
{
  "label": "北标",
  "value": "THA_19" },
{
  "label": "北大年",
  "value": "THA_94" },
{
  "label": "北揽",
  "value": "THA_11" },
{
  "label": "北榄坡",
  "value": "THA_60" },
{
  "label": "北柳",
  "value": "THA_24" },
{
  "label": "碧差汶",
  "value": "THA_76" },
{
  "label": "博达伦",
  "value": "THA_93" },
{
  "label": "猜那",
  "value": "THA_18" },
{
  "label": "猜也奔",
  "value": "THA_36" },
{
  "label": "程逸",
  "value": "THA_53" },
{
  "label": "春蓬",
  "value": "THA_86" },
{
  "label": "春武里",
  "value": "THA_20" },
{
  "label": "达",
  "value": "THA_63" },
{
  "label": "达叻",
  "value": "THA_23" },
{
  "label": "大城",
  "value": "THA_14" },
{
  "label": "董里",
  "value": "THA_92" },
{
  "label": "佛丕",
  "value": "THA_78" },
{
  "label": "佛统",
  "value": "THA_73" },
{
  "label": "甘烹碧",
  "value": "THA_62" },
{
  "label": "红统",
  "value": "THA_15" },
{
  "label": "华富里",
  "value": "THA_16" },
{
  "label": "加拉信",
  "value": "THA_46" },
{
  "label": "甲米",
  "value": "THA_81" },
{
  "label": "尖竹汶",
  "value": "THA_22" },
{
  "label": "孔敬",
  "value": "THA_40" },
{
  "label": "拉农",
  "value": "THA_21" },
{
  "label": "廊开",
  "value": "THA_43" },
{
  "label": "廊莫那浦",
  "value": "THA_39" },
{
  "label": "叻丕",
  "value": "THA_70" },
{
  "label": "黎",
  "value": "THA_42" },
{
  "label": "黎逸",
  "value": "THA_45" },
{
  "label": "龙仔厝",
  "value": "THA_74" },
{
  "label": "罗勇",
  "value": "THA_85" },
{
  "label": "洛坤",
  "value": "THA_80" },
{
  "label": "玛哈沙拉堪",
  "value": "THA_44" },
{
  "label": "曼谷",
  "value": "THA_10" },
{
  "label": "莫达汉",
  "value": "THA_49" },
{
  "label": "那空那育",
  "value": "THA_26" },
{
  "label": "那空帕农",
  "value": "THA_48" },
{
  "label": "难",
  "value": "THA_55" },
{
  "label": "南奔",
  "value": "THA_51" },
{
  "label": "暖武里",
  "value": "THA_12" },
{
  "label": "帕",
  "value": "THA_54" },
{
  "label": "帕尧",
  "value": "THA_56" },
{
  "label": "攀牙",
  "value": "THA_82" },
{
  "label": "彭世洛",
  "value": "THA_65" },
{
  "label": "披集",
  "value": "THA_66" },
{
  "label": "普吉",
  "value": "THA_83" },
{
  "label": "清莱",
  "value": "THA_57" },
{
  "label": "清迈",
  "value": "THA_50" },
{
  "label": "色军",
  "value": "THA_47" },
{
  "label": "沙敦",
  "value": "THA_91" },
{
  "label": "沙缴",
  "value": "THA_27" },
{
  "label": "四色菊",
  "value": "THA_33" },
{
  "label": "宋卡",
  "value": "THA_90" },
{
  "label": "素可泰",
  "value": "THA_64" },
{
  "label": "素叻",
  "value": "THA_84" },
{
  "label": "素林",
  "value": "THA_32" },
{
  "label": "素攀武里",
  "value": "THA_72" },
{
  "label": "陶公",
  "value": "THA_96" },
{
  "label": "乌隆",
  "value": "THA_41" },
{
  "label": "乌泰他尼",
  "value": "THA_61" },
{
  "label": "乌汶",
  "value": "THA_34" },
{
  "label": "武里南",
  "value": "THA_31" },
{
  "label": "信武里",
  "value": "THA_17" },
{
  "label": "耶梭通",
  "value": "THA_35" },
{
  "label": "也拉",
  "value": "THA_95" },
{
  "label": "夜丰颂",
  "value": "THA_58" },
{
  "label": "夜功",
  "value": "THA_75" }],

[{
  "label": "阿鲁沙",
  "value": "TZA_AR" },
{
  "label": "奔巴北",
  "value": "TZA_PN" },
{
  "label": "奔巴南",
  "value": "TZA_PS" },
{
  "label": "滨海",
  "value": "TZA_PW" },
{
  "label": "达累斯萨拉姆",
  "value": "TZA_DS" },
{
  "label": "多多马",
  "value": "TZA_DO" },
{
  "label": "基戈马",
  "value": "TZA_KI" },
{
  "label": "卡盖拉",
  "value": "TZA_KA" },
{
  "label": "林迪",
  "value": "TZA_LN" },
{
  "label": "鲁夸",
  "value": "TZA_RK" },
{
  "label": "鲁伍马",
  "value": "TZA_RV" },
{
  "label": "马腊",
  "value": "TZA_MR" },
{
  "label": "曼亚拉",
  "value": "TZA_MY" },
{
  "label": "莫洛戈罗",
  "value": "TZA_MO" },
{
  "label": "姆贝亚",
  "value": "TZA_MB" },
{
  "label": "姆特瓦拉",
  "value": "TZA_MT" },
{
  "label": "姆万扎",
  "value": "TZA_MW" },
{
  "label": "乞力马扎罗",
  "value": "TZA_KJ" },
{
  "label": "桑给巴尔",
  "value": "TZA_ZN" },
{
  "label": "桑给巴尔北",
  "value": "TZA_UN" },
{
  "label": "桑给巴尔南",
  "value": "TZA_US" },
{
  "label": "桑给巴尔市和西",
  "value": "TZA_MM" },
{
  "label": "塔波拉",
  "value": "TZA_TB" },
{
  "label": "坦噶",
  "value": "TZA_TN" },
{
  "label": "辛吉达",
  "value": "TZA_SI" },
{
  "label": "欣延加",
  "value": "TZA_SH" },
{
  "label": "伊林加",
  "value": "TZA_IR" }],

[{
  "label": "埃瓦",
  "value": "TON_E" },
{
  "label": "哈派",
  "value": "TON_H" },
{
  "label": "纽阿斯",
  "value": "TON_N" },
{
  "label": "汤加塔布",
  "value": "TON_T" },
{
  "label": "瓦瓦乌",
  "value": "TON_V" }],

[{
  "label": "特克斯和凯克特斯群岛",
  "value": "TCA_bak" }],

[{
  "label": "特里斯坦达昆哈",
  "value": "TAA_bak" }],

[{
  "label": "特立尼达和多巴哥",
  "value": "TTO_bak" }],

[{
  "label": "艾尔亚奈",
  "value": "TUN_AR" },
{
  "label": "巴杰",
  "value": "TUN_BJ" },
{
  "label": "本阿鲁斯",
  "value": "TUN_BA" },
{
  "label": "比塞大",
  "value": "TUN_BI" },
{
  "label": "吉比利",
  "value": "TUN_KB" },
{
  "label": "加贝斯",
  "value": "TUN_GB" },
{
  "label": "加夫萨",
  "value": "TUN_GF" },
{
  "label": "坚杜拜",
  "value": "TUN_JE" },
{
  "label": "卡夫",
  "value": "TUN_LK" },
{
  "label": "卡塞林",
  "value": "TUN_KS" },
{
  "label": "凯鲁万",
  "value": "TUN_KR" },
{
  "label": "马赫迪耶",
  "value": "TUN_MH" },
{
  "label": "马努巴",
  "value": "TUN_MN" },
{
  "label": "梅德宁",
  "value": "TUN_ME" },
{
  "label": "莫纳斯提尔",
  "value": "TUN_MO" },
{
  "label": "纳布勒",
  "value": "TUN_NA" },
{
  "label": "斯法克斯",
  "value": "TUN_SF" },
{
  "label": "苏塞",
  "value": "TUN_SO" },
{
  "label": "泰塔温",
  "value": "TUN_TA" },
{
  "label": "突尼斯",
  "value": "TUN_TU" },
{
  "label": "托泽尔",
  "value": "TUN_TO" },
{
  "label": "西迪布济德",
  "value": "TUN_SD" },
{
  "label": "锡勒亚奈",
  "value": "TUN_SL" },
{
  "label": "宰格万",
  "value": "TUN_ZA" }],

[{
  "label": "图瓦卢",
  "value": "TUV_bak" }],

[{
  "label": "阿达纳",
  "value": "TUR_ADA" },
{
  "label": "阿德亚曼",
  "value": "TUR_ADI" },
{
  "label": "阿尔达罕",
  "value": "TUR_ARD" },
{
  "label": "阿尔特温",
  "value": "TUR_ART" },
{
  "label": "阿菲永",
  "value": "TUR_AFY" },
{
  "label": "阿克萨赖",
  "value": "TUR_AKS" },
{
  "label": "阿勒",
  "value": "TUR_AGR" },
{
  "label": "阿马西亚",
  "value": "TUR_AMA" },
{
  "label": "埃迪尔内",
  "value": "TUR_EDI" },
{
  "label": "埃尔津詹",
  "value": "TUR_EZC" },
{
  "label": "埃尔祖鲁姆",
  "value": "TUR_EZR" },
{
  "label": "埃拉泽",
  "value": "TUR_ELA" },
{
  "label": "埃斯基谢希尔",
  "value": "TUR_ESK" },
{
  "label": "艾登",
  "value": "TUR_AYI" },
{
  "label": "安卡拉",
  "value": "TUR_ANK" },
{
  "label": "安塔利亚",
  "value": "TUR_ANT" },
{
  "label": "奥尔杜",
  "value": "TUR_ORD" },
{
  "label": "巴尔腾",
  "value": "TUR_BAR" },
{
  "label": "巴勒克埃西尔",
  "value": "TUR_BAL" },
{
  "label": "巴特曼",
  "value": "TUR_BAT" },
{
  "label": "巴伊布尔特",
  "value": "TUR_BAY" },
{
  "label": "比莱吉克",
  "value": "TUR_BIL" },
{
  "label": "比特利斯",
  "value": "TUR_BIT" },
{
  "label": "宾格尔",
  "value": "TUR_BIN" },
{
  "label": "博卢",
  "value": "TUR_BOL" },
{
  "label": "布尔杜尔",
  "value": "TUR_BRD" },
{
  "label": "布尔萨",
  "value": "TUR_BRS" },
{
  "label": "昌克勒",
  "value": "TUR_CKR" },
{
  "label": "代尼兹利",
  "value": "TUR_DEN" },
{
  "label": "迪亚巴克尔",
  "value": "TUR_DIY" },
{
  "label": "凡",
  "value": "TUR_VAN" },
{
  "label": "哈卡里",
  "value": "TUR_HKR" },
{
  "label": "哈塔伊",
  "value": "TUR_HTY" },
{
  "label": "基利斯",
  "value": "TUR_KLS" },
{
  "label": "吉雷松",
  "value": "TUR_GIR" },
{
  "label": "加济安泰普",
  "value": "TUR_GAZ" },
{
  "label": "居米什哈内",
  "value": "TUR_GMS" },
{
  "label": "卡尔斯",
  "value": "TUR_KRS" },
{
  "label": "卡赫拉曼马拉什",
  "value": "TUR_KAH" },
{
  "label": "卡拉比克",
  "value": "TUR_KRB" },
{
  "label": "卡拉曼",
  "value": "TUR_KRM" },
{
  "label": "卡斯塔莫努",
  "value": "TUR_KAS" },
{
  "label": "开塞利",
  "value": "TUR_KAY" },
{
  "label": "科贾埃利",
  "value": "TUR_KOC" },
{
  "label": "柯克拉雷利",
  "value": "TUR_KLR" },
{
  "label": "科尼亚",
  "value": "TUR_KON" },
{
  "label": "克尔谢希尔",
  "value": "TUR_KRH" },
{
  "label": "克勒克卡莱",
  "value": "TUR_KRK" },
{
  "label": "拉飞",
  "value": "TUR_URF" },
{
  "label": "里泽",
  "value": "TUR_RIZ" },
{
  "label": "马尔丁",
  "value": "TUR_MAR" },
{
  "label": "马拉蒂亚",
  "value": "TUR_MAL" },
{
  "label": "马尼萨",
  "value": "TUR_MAN" },
{
  "label": "穆拉",
  "value": "TUR_MUG" },
{
  "label": "穆什",
  "value": "TUR_MUS" },
{
  "label": "内夫谢希尔",
  "value": "TUR_NEV" },
{
  "label": "尼代",
  "value": "TUR_NIG" },
{
  "label": "恰纳卡莱",
  "value": "TUR_CKL" },
{
  "label": "乔鲁姆",
  "value": "TUR_COR" },
{
  "label": "屈塔希亚",
  "value": "TUR_KUT" },
{
  "label": "萨卡里亚",
  "value": "TUR_SAK" },
{
  "label": "萨姆松",
  "value": "TUR_SAM" },
{
  "label": "泰基尔达",
  "value": "TUR_TEL" },
{
  "label": "特拉布宗",
  "value": "TUR_TRA" },
{
  "label": "通杰利",
  "value": "TUR_TUN" },
{
  "label": "托卡特",
  "value": "TUR_TOK" },
{
  "label": "乌萨克",
  "value": "TUR_USK" },
{
  "label": "锡尔纳克",
  "value": "TUR_SIR" },
{
  "label": "锡尔特",
  "value": "TUR_SII" },
{
  "label": "锡诺普",
  "value": "TUR_SIN" },
{
  "label": "锡瓦斯",
  "value": "TUR_SIV" },
{
  "label": "伊迪尔",
  "value": "TUR_IGD" },
{
  "label": "伊切尔",
  "value": "TUR_ICE" },
{
  "label": "伊斯帕尔塔",
  "value": "TUR_ISP" },
{
  "label": "伊斯坦布尔",
  "value": "TUR_IST" },
{
  "label": "伊兹密尔",
  "value": "TUR_IZM" },
{
  "label": "约兹加特",
  "value": "TUR_YOZ" },
{
  "label": "宗古尔达克",
  "value": "TUR_ZON" }],

[{
  "label": "阿哈尔",
  "value": "TKM_A" },
{
  "label": "阿什哈巴德市",
  "value": "TKM_ASB" },
{
  "label": "巴尔坎",
  "value": "TKM_B" },
{
  "label": "达沙古兹",
  "value": "TKM_D" },
{
  "label": "列巴普",
  "value": "TKM_L" },
{
  "label": "马雷",
  "value": "TKM_M" },
{
  "label": "涅比特达格",
  "value": "TKM_NEB" }],

[{
  "label": "托克劳",
  "value": "TKL_bak" }],

[{
  "label": "瓦利斯和福图纳",
  "value": "WLF_bak" }],

[{
  "label": "马朗帕",
  "value": "VUT_MA" },
{
  "label": "彭纳马",
  "value": "VUT_PE" },
{
  "label": "桑马",
  "value": "VUT_SA" },
{
  "label": "塔菲阿",
  "value": "VUT_TA" },
{
  "label": "托尔巴",
  "value": "VUT_TO" },
{
  "label": "谢法",
  "value": "VUT_SH" }],

[{
  "label": "埃尔普罗格雷索",
  "value": "GTM_PR" },
{
  "label": "埃斯昆特拉",
  "value": "GTM_ES" },
{
  "label": "哈拉帕",
  "value": "GTM_JA" },
{
  "label": "胡蒂亚帕",
  "value": "GTM_JU" },
{
  "label": "基切",
  "value": "GTM_QC" },
{
  "label": "克萨尔特南戈",
  "value": "GTM_QZ" },
{
  "label": "雷塔卢莱乌",
  "value": "GTM_RE" },
{
  "label": "米克斯科",
  "value": "GTM_MIX" },
{
  "label": "佩滕",
  "value": "GTM_PE" },
{
  "label": "奇基穆拉",
  "value": "GTM_CQ" },
{
  "label": "奇马尔特南戈",
  "value": "GTM_CM" },
{
  "label": "萨卡帕",
  "value": "GTM_ZA" },
{
  "label": "萨卡特佩克斯",
  "value": "GTM_ST" },
{
  "label": "上韦拉帕斯",
  "value": "GTM_AV" },
{
  "label": "圣罗莎",
  "value": "GTM_SR" },
{
  "label": "圣马科斯",
  "value": "GTM_SM" },
{
  "label": "苏奇特佩克斯",
  "value": "GTM_SU" },
{
  "label": "索洛拉",
  "value": "GTM_SO" },
{
  "label": "托托尼卡潘",
  "value": "GTM_TO" },
{
  "label": "危地马拉",
  "value": "GTM_GU" },
{
  "label": "韦韦特南戈",
  "value": "GTM_HU" },
{
  "label": "下韦拉帕斯",
  "value": "GTM_BV" },
{
  "label": "新城",
  "value": "GTM_VIN" },
{
  "label": "伊萨瓦尔",
  "value": "GTM_IZ" }],

[{
  "label": "维尔京群岛，美属",
  "value": "VIR_bak" }],

[{
  "label": "维尔京群岛，英属",
  "value": "VGB_bak" }],

[{
  "label": "阿拉瓜",
  "value": "VEN_D" },
{
  "label": "阿马库罗三角洲",
  "value": "VEN_Y" },
{
  "label": "阿普雷",
  "value": "VEN_C" },
{
  "label": "安索阿特吉",
  "value": "VEN_B" },
{
  "label": "巴里纳斯",
  "value": "VEN_E" },
{
  "label": "玻利瓦尔",
  "value": "VEN_F" },
{
  "label": "波图格萨",
  "value": "VEN_P" },
{
  "label": "法尔孔",
  "value": "VEN_I" },
{
  "label": "瓜里科",
  "value": "VEN_J" },
{
  "label": "加拉加斯",
  "value": "VEN_A" },
{
  "label": "卡拉沃沃",
  "value": "VEN_G" },
{
  "label": "科赫德斯",
  "value": "VEN_H" },
{
  "label": "拉腊",
  "value": "VEN_K" },
{
  "label": "联邦属地",
  "value": "VEN_W" },
{
  "label": "梅里达",
  "value": "VEN_L" },
{
  "label": "米兰达",
  "value": "VEN_M" },
{
  "label": "莫纳加斯",
  "value": "VEN_N" },
{
  "label": "苏克雷",
  "value": "VEN_R" },
{
  "label": "苏利亚",
  "value": "VEN_V" },
{
  "label": "塔奇拉",
  "value": "VEN_S" },
{
  "label": "特鲁希略",
  "value": "VEN_T" },
{
  "label": "新埃斯帕塔",
  "value": "VEN_O" },
{
  "label": "亚拉奎",
  "value": "VEN_U" },
{
  "label": "亚马孙",
  "value": "VEN_Z" }],

[{
  "label": "文莱",
  "value": "BRN_bak" }],

[{
  "label": "阿鲁阿",
  "value": "UGA_ARU" },
{
  "label": "阿帕克",
  "value": "UGA_APC" },
{
  "label": "阿朱马尼",
  "value": "UGA_ADJ" },
{
  "label": "本迪布焦",
  "value": "UGA_BUN" },
{
  "label": "布吉里",
  "value": "UGA_BUG" },
{
  "label": "布西亚",
  "value": "UGA_BUS" },
{
  "label": "布谢尼",
  "value": "UGA_BSH" },
{
  "label": "恩通加莫",
  "value": "UGA_NTU" },
{
  "label": "古卢",
  "value": "UGA_GUL" },
{
  "label": "霍伊马",
  "value": "UGA_HOI" },
{
  "label": "基巴莱",
  "value": "UGA_KBA" },
{
  "label": "基博加",
  "value": "UGA_KIB" },
{
  "label": "基恩乔乔",
  "value": "UGA_KYE" },
{
  "label": "基索罗",
  "value": "UGA_KIS" },
{
  "label": "基特古姆",
  "value": "UGA_KIT" },
{
  "label": "金贾",
  "value": "UGA_JIN" },
{
  "label": "卡巴莱",
  "value": "UGA_KBL" },
{
  "label": "卡巴罗莱",
  "value": "UGA_KAR" },
{
  "label": "卡贝拉马伊多",
  "value": "UGA_KAB" },
{
  "label": "卡兰加拉",
  "value": "UGA_KAL" },
{
  "label": "卡姆文盖",
  "value": "UGA_KAM" },
{
  "label": "卡穆利",
  "value": "UGA_KML" },
{
  "label": "卡农古",
  "value": "UGA_KAN" },
{
  "label": "卡普乔鲁瓦",
  "value": "UGA_KPC" },
{
  "label": "卡塞塞",
  "value": "UGA_KAS" },
{
  "label": "卡塔奎",
  "value": "UGA_KTK" },
{
  "label": "卡永加",
  "value": "UGA_KAY" },
{
  "label": "坎帕拉",
  "value": "UGA_KMP" },
{
  "label": "科蒂多",
  "value": "UGA_KOT" },
{
  "label": "库米",
  "value": "UGA_KUM" },
{
  "label": "拉卡伊",
  "value": "UGA_RAK" },
{
  "label": "利拉",
  "value": "UGA_LIR" },
{
  "label": "卢韦罗",
  "value": "UGA_LUW" },
{
  "label": "鲁昆吉里",
  "value": "UGA_RUK" },
{
  "label": "马萨卡",
  "value": "UGA_MAS" },
{
  "label": "马辛迪",
  "value": "UGA_MSN" },
{
  "label": "马尤盖",
  "value": "UGA_MAY" },
{
  "label": "莫罗托",
  "value": "UGA_MRT" },
{
  "label": "莫约",
  "value": "UGA_MOY" },
{
  "label": "姆巴拉拉",
  "value": "UGA_MBR" },
{
  "label": "姆巴莱",
  "value": "UGA_MBA" },
{
  "label": "姆皮吉",
  "value": "UGA_MPI" },
{
  "label": "穆本德",
  "value": "UGA_MUB" },
{
  "label": "穆科诺",
  "value": "UGA_MUK" },
{
  "label": "纳卡皮里皮里特",
  "value": "UGA_NAK" },
{
  "label": "纳卡松戈拉",
  "value": "UGA_NKS" },
{
  "label": "内比",
  "value": "UGA_NEB" },
{
  "label": "帕德尔",
  "value": "UGA_PAD" },
{
  "label": "帕利萨",
  "value": "UGA_PAL" },
{
  "label": "森巴布莱",
  "value": "UGA_SEM" },
{
  "label": "索罗提",
  "value": "UGA_SOR" },
{
  "label": "托罗罗",
  "value": "UGA_TOR" },
{
  "label": "瓦基索",
  "value": "UGA_WAK" },
{
  "label": "锡龙科",
  "value": "UGA_SIR" },
{
  "label": "伊甘加",
  "value": "UGA_IGA" },
{
  "label": "永贝",
  "value": "UGA_YUM" }],

[{
  "label": "敖德萨",
  "value": "UKR_51" },
{
  "label": "波尔塔瓦",
  "value": "UKR_53" },
{
  "label": "第聂伯罗波得罗夫斯克",
  "value": "UKR_12" },
{
  "label": "顿涅茨克",
  "value": "UKR_14" },
{
  "label": "哈尔科夫",
  "value": "UKR_63" },
{
  "label": "赫尔松州",
  "value": "UKR_65" },
{
  "label": "赫梅利尼茨基",
  "value": "UKR_68" },
{
  "label": "基辅",
  "value": "UKR_30" },
{
  "label": "基洛夫格勒",
  "value": "UKR_35" },
{
  "label": "捷尔诺波尔",
  "value": "UKR_61" },
{
  "label": "克里米亚自治共和国",
  "value": "UKR_43" },
{
  "label": "利沃夫",
  "value": "UKR_46" },
{
  "label": "卢甘斯克",
  "value": "UKR_9" },
{
  "label": "罗夫诺",
  "value": "UKR_56" },
{
  "label": "尼古拉耶夫",
  "value": "UKR_48" },
{
  "label": "切尔卡瑟",
  "value": "UKR_71" },
{
  "label": "切尔尼戈夫",
  "value": "UKR_74" },
{
  "label": "切尔诺夫策",
  "value": "UKR_77" },
{
  "label": "日托米尔",
  "value": "UKR_18" },
{
  "label": "苏梅",
  "value": "UKR_59" },
{
  "label": "外喀尔巴阡",
  "value": "UKR_21" },
{
  "label": "文尼察",
  "value": "UKR_5" },
{
  "label": "沃伦",
  "value": "UKR_7" },
{
  "label": "伊万－弗兰科夫州",
  "value": "UKR_26" },
{
  "label": "扎波罗热",
  "value": "UKR_23" }],

[{
  "label": "阿蒂加斯",
  "value": "URY_AR" },
{
  "label": "杜拉斯诺",
  "value": "URY_DU" },
{
  "label": "佛罗里达",
  "value": "URY_FA" },
{
  "label": "弗洛雷斯",
  "value": "URY_FS" },
{
  "label": "卡内洛内斯",
  "value": "URY_CA" },
{
  "label": "科洛尼亚",
  "value": "URY_CO" },
{
  "label": "拉瓦耶哈",
  "value": "URY_LA" },
{
  "label": "里韦拉",
  "value": "URY_RV" },
{
  "label": "罗恰",
  "value": "URY_RO" },
{
  "label": "马尔多纳多",
  "value": "URY_MA" },
{
  "label": "蒙得维的亚",
  "value": "URY_MO" },
{
  "label": "内格罗河",
  "value": "URY_RN" },
{
  "label": "派桑杜",
  "value": "URY_PA" },
{
  "label": "萨尔托",
  "value": "URY_SL" },
{
  "label": "塞罗拉尔戈",
  "value": "URY_CL" },
{
  "label": "三十三人",
  "value": "URY_TT" },
{
  "label": "圣何塞",
  "value": "URY_SJ" },
{
  "label": "索里亚诺",
  "value": "URY_SO" },
{
  "label": "塔夸伦博",
  "value": "URY_TAW" }],

[{
  "label": "安集延",
  "value": "UZB_AN" },
{
  "label": "布哈拉",
  "value": "UZB_BU" },
{
  "label": "费尔干纳",
  "value": "UZB_FA" },
{
  "label": "花拉子模",
  "value": "UZB_XO" },
{
  "label": "吉扎克",
  "value": "UZB_JI" },
{
  "label": "卡拉卡尔帕克斯坦共和国",
  "value": "UZB_QR" },
{
  "label": "卡什卡达里亚",
  "value": "UZB_QA" },
{
  "label": "纳曼干",
  "value": "UZB_NG" },
{
  "label": "纳沃伊",
  "value": "UZB_NW" },
{
  "label": "撒马尔罕",
  "value": "UZB_SA" },
{
  "label": "苏尔汉河",
  "value": "UZB_SU" },
{
  "label": "塔什干",
  "value": "UZB_TK" },
{
  "label": "塔什干市",
  "value": "UZB_TO" },
{
  "label": "锡尔河",
  "value": "UZB_SI" }],

[{
  "label": "阿尔梅里亚",
  "value": "ESP_LEI" },
{
  "label": "阿尔瓦塞特",
  "value": "ESP_ALB" },
{
  "label": "阿拉瓦",
  "value": "ESP_ALA" },
{
  "label": "阿利坎特",
  "value": "ESP_ALC" },
{
  "label": "阿斯图利亚斯",
  "value": "ESP_AST" },
{
  "label": "阿维拉",
  "value": "ESP_AVI" },
{
  "label": "奥伦塞",
  "value": "ESP_ORE" },
{
  "label": "巴达霍斯",
  "value": "ESP_BJZ" },
{
  "label": "巴利阿里",
  "value": "ESP_BLR" },
{
  "label": "巴利亚多利德",
  "value": "ESP_VLL" },
{
  "label": "巴伦西亚",
  "value": "ESP_VLC" },
{
  "label": "巴塞罗那",
  "value": "ESP_BCN" },
{
  "label": "比斯开",
  "value": "ESP_VSE" },
{
  "label": "布尔戈斯",
  "value": "ESP_BUR" },
{
  "label": "格拉纳达",
  "value": "ESP_GRX" },
{
  "label": "瓜达拉哈拉",
  "value": "ESP_GUA" },
{
  "label": "哈恩",
  "value": "ESP_JAE" },
{
  "label": "赫罗纳",
  "value": "ESP_GRO" },
{
  "label": "吉普斯夸",
  "value": "ESP_GUI" },
{
  "label": "加的斯",
  "value": "ESP_CAD" },
{
  "label": "卡塞雷斯",
  "value": "ESP_CCS" },
{
  "label": "卡斯蒂利亚",
  "value": "ESP_CIR" },
{
  "label": "卡斯特利翁",
  "value": "ESP_CAS" },
{
  "label": "科尔多瓦",
  "value": "ESP_ODB" },
{
  "label": "昆卡",
  "value": "ESP_CUE" },
{
  "label": "拉科鲁尼亚",
  "value": "ESP_LCG" },
{
  "label": "拉里奥哈",
  "value": "ESP_ARL" },
{
  "label": "拉斯帕尔马斯",
  "value": "ESP_LPA" },
{
  "label": "莱昂",
  "value": "ESP_LEN" },
{
  "label": "莱里达",
  "value": "ESP_LLE" },
{
  "label": "卢戈",
  "value": "ESP_LGO" },
{
  "label": "马德里",
  "value": "ESP_MAD" },
{
  "label": "马拉加",
  "value": "ESP_AGP" },
{
  "label": "穆尔西亚",
  "value": "ESP_MJV" },
{
  "label": "纳瓦拉",
  "value": "ESP_NVV" },
{
  "label": "帕伦西亚",
  "value": "ESP_PAC" },
{
  "label": "蓬特韦德拉",
  "value": "ESP_PEV" },
{
  "label": "萨拉戈萨",
  "value": "ESP_ZAZ" },
{
  "label": "萨拉曼卡",
  "value": "ESP_SLM" },
{
  "label": "萨莫拉",
  "value": "ESP_ZMR" },
{
  "label": "塞哥维亚",
  "value": "ESP_SEG" },
{
  "label": "塞维利亚",
  "value": "ESP_SVQ" },
{
  "label": "桑坦德",
  "value": "ESP_SDR" },
{
  "label": "圣克鲁斯-德特内里费",
  "value": "ESP_SCT" },
{
  "label": "索里亚",
  "value": "ESP_SOR" },
{
  "label": "塔拉戈纳",
  "value": "ESP_TAR" },
{
  "label": "特鲁埃尔",
  "value": "ESP_TER" },
{
  "label": "托莱多",
  "value": "ESP_TOL" },
{
  "label": "韦尔瓦",
  "value": "ESP_HUV" },
{
  "label": "韦斯卡",
  "value": "ESP_HUC" }],

[{
  "label": "比雷埃夫斯",
  "value": "GRC_PRI" },
{
  "label": "多德卡尼斯",
  "value": "GRC_DO" },
{
  "label": "干尼亚",
  "value": "GRC_CHQ" },
{
  "label": "基克拉迪",
  "value": "GRC_CY" },
{
  "label": "拉西锡",
  "value": "GRC_LST" },
{
  "label": "莱斯博斯",
  "value": "GRC_LES" },
{
  "label": "雷西姆农",
  "value": "GRC_RET" },
{
  "label": "萨摩斯",
  "value": "GRC_SMI" },
{
  "label": "雅典",
  "value": "GRC_ATH" },
{
  "label": "伊拉克里翁",
  "value": "GRC_HER" }],

[{
  "label": "新加坡",
  "value": "SGP_bak" }],

[{
  "label": "新喀里多尼亚",
  "value": "NCL_bak" }],

[{
  "label": "奥克兰",
  "value": "NZL_AUK" },
{
  "label": "北岸",
  "value": "NZL_NSH" },
{
  "label": "北帕默斯顿",
  "value": "NZL_PMR" },
{
  "label": "北远",
  "value": "NZL_FNR" },
{
  "label": "布莱尼姆",
  "value": "NZL_BHE" },
{
  "label": "达尼丁",
  "value": "NZL_DUD" },
{
  "label": "格雷茅斯",
  "value": "NZL_GMN" },
{
  "label": "哈密尔顿",
  "value": "NZL_HLZ" },
{
  "label": "黑斯廷斯",
  "value": "NZL_HAS" },
{
  "label": "怀塔科拉",
  "value": "NZL_WAE" },
{
  "label": "吉斯伯恩",
  "value": "NZL_GIS" },
{
  "label": "凯帕拉",
  "value": "NZL_KAI" },
{
  "label": "克赖斯特彻奇",
  "value": "NZL_CHC" },
{
  "label": "里士满",
  "value": "NZL_RMD" },
{
  "label": "马努考",
  "value": "NZL_MNK" },
{
  "label": "纳尔逊",
  "value": "NZL_NSN" },
{
  "label": "内皮尔",
  "value": "NZL_NPE" },
{
  "label": "斯特拉特福德",
  "value": "NZL_STR" },
{
  "label": "陶马鲁努伊",
  "value": "NZL_TAU" },
{
  "label": "瓦卡塔尼",
  "value": "NZL_WHK" },
{
  "label": "旺阿雷",
  "value": "NZL_WRE" },
{
  "label": "旺格努伊",
  "value": "NZL_WAG" },
{
  "label": "新普利茅斯",
  "value": "NZL_NPL" },
{
  "label": "因弗卡吉尔",
  "value": "NZL_IVC" }],

[{
  "label": "巴兰尼亚",
  "value": "HUN_BA" },
{
  "label": "巴奇-基什孔",
  "value": "HUN_BK" },
{
  "label": "包尔绍德-奥包乌伊-曾普伦",
  "value": "HUN_BZ" },
{
  "label": "贝凯什",
  "value": "HUN_BE" },
{
  "label": "布达佩斯",
  "value": "HUN_BU" },
{
  "label": "费耶尔",
  "value": "HUN_FE" },
{
  "label": "豪伊杜-比豪尔",
  "value": "HUN_HB" },
{
  "label": "赫维什",
  "value": "HUN_HE" },
{
  "label": "加兹-纳杰孔-索尔诺克",
  "value": "HUN_JN" },
{
  "label": "杰尔-莫松-肖普朗",
  "value": "HUN_GS" },
{
  "label": "科马罗姆",
  "value": "HUN_KE" },
{
  "label": "诺格拉德",
  "value": "HUN_NO" },
{
  "label": "佩斯",
  "value": "HUN_PE" },
{
  "label": "琼格拉德",
  "value": "HUN_CS" },
{
  "label": "绍莫吉",
  "value": "HUN_SO" },
{
  "label": "索博尔奇-索特马尔-贝拉格",
  "value": "HUN_SZ" },
{
  "label": "托尔瑙",
  "value": "HUN_TO" },
{
  "label": "维斯普雷姆",
  "value": "HUN_VE" },
{
  "label": "沃什",
  "value": "HUN_VA" },
{
  "label": "佐洛",
  "value": "HUN_ZA" }],

[{
  "label": "阿勒颇",
  "value": "SYR_HL" },
{
  "label": "大马士革",
  "value": "SYR_RD" },
{
  "label": "大马士革市",
  "value": "SYR_DI" },
{
  "label": "代尔祖尔",
  "value": "SYR_DZ" },
{
  "label": "德拉",
  "value": "SYR_DA" },
{
  "label": "哈马",
  "value": "SYR_HM" },
{
  "label": "哈塞克",
  "value": "SYR_HA" },
{
  "label": "霍姆斯",
  "value": "SYR_HI" },
{
  "label": "加布",
  "value": "SYR_GH" },
{
  "label": "卡米什利",
  "value": "SYR_QA" },
{
  "label": "库奈特拉",
  "value": "SYR_QU" },
{
  "label": "拉卡",
  "value": "SYR_RQ" },
{
  "label": "拉塔基亚",
  "value": "SYR_LA" },
{
  "label": "苏韦达",
  "value": "SYR_SU" },
{
  "label": "塔尔图斯",
  "value": "SYR_TA" },
{
  "label": "伊德利卜",
  "value": "SYR_ID" }],

[{
  "label": "波特兰",
  "value": "JAM_POR" },
{
  "label": "汉诺威",
  "value": "JAM_HAN" },
{
  "label": "金斯敦",
  "value": "JAM_KIN" },
{
  "label": "克拉伦登",
  "value": "JAM_CLA" },
{
  "label": "曼彻斯特",
  "value": "JAM_MAN" },
{
  "label": "圣安德鲁斯",
  "value": "JAM_AND" },
{
  "label": "圣安娜",
  "value": "JAM_ANN" },
{
  "label": "圣凯瑟琳",
  "value": "JAM_CAT" },
{
  "label": "圣玛丽",
  "value": "JAM_MAR" },
{
  "label": "圣托马斯",
  "value": "JAM_THO" },
{
  "label": "圣伊丽莎白",
  "value": "JAM_ELI" },
{
  "label": "圣詹姆斯",
  "value": "JAM_JAM" },
{
  "label": "特里洛尼",
  "value": "JAM_TRL" },
{
  "label": "西摩兰",
  "value": "JAM_WML" }],

[{
  "label": "阿尔马维尔",
  "value": "ARM_ARM" },
{
  "label": "阿拉加措特恩",
  "value": "ARM_AGT" },
{
  "label": "阿拉拉特",
  "value": "ARM_ARA" },
{
  "label": "埃里温市",
  "value": "ARM_EVN" },
{
  "label": "格加尔库尼克",
  "value": "ARM_GEG" },
{
  "label": "科泰克",
  "value": "ARM_KOT" },
{
  "label": "洛里",
  "value": "ARM_LOR" },
{
  "label": "塔武什",
  "value": "ARM_TAV" },
{
  "label": "瓦约茨·佐尔",
  "value": "ARM_VAY" },
{
  "label": "希拉克",
  "value": "ARM_SHI" },
{
  "label": "休尼克",
  "value": "ARM_SYU" }],

[{
  "label": "阿比扬",
  "value": "YEM_AB" },
{
  "label": "阿姆兰",
  "value": "YEM_AM" },
{
  "label": "贝达",
  "value": "YEM_BA" },
{
  "label": "达利",
  "value": "YEM_DA" },
{
  "label": "哈德拉毛",
  "value": "YEM_HD" },
{
  "label": "哈杰",
  "value": "YEM_HJ" },
{
  "label": "荷台达",
  "value": "YEM_HU" },
{
  "label": "焦夫",
  "value": "YEM_JA" },
{
  "label": "拉赫季",
  "value": "YEM_LA" },
{
  "label": "马里卜",
  "value": "YEM_MA" },
{
  "label": "迈赫拉",
  "value": "YEM_MR" },
{
  "label": "迈赫维特",
  "value": "YEM_MW" },
{
  "label": "萨达",
  "value": "YEM_SD" },
{
  "label": "萨那",
  "value": "YEM_SN" },
{
  "label": "赛文",
  "value": "YEM_GXF" },
{
  "label": "舍卜沃",
  "value": "YEM_SH" },
{
  "label": "塔伊兹",
  "value": "YEM_TA" },
{
  "label": "希赫尔",
  "value": "YEM_ASR" },
{
  "label": "亚丁",
  "value": "YEM_AD" },
{
  "label": "伊卜",
  "value": "YEM_IB" },
{
  "label": "扎玛尔",
  "value": "YEM_DH" }],

[{
  "label": "伊拉克",
  "value": "IRQ_bak" }],

[{
  "label": "伊朗",
  "value": "IRN_bak" }],

[{
  "label": "阿什杜德",
  "value": "ISR_ASH" },
{
  "label": "贝尔谢巴",
  "value": "ISR_BEV" },
{
  "label": "贝特雁",
  "value": "ISR_BAT" },
{
  "label": "海法",
  "value": "ISR_HFA" },
{
  "label": "霍隆",
  "value": "ISR_HOL" },
{
  "label": "内坦亚",
  "value": "ISR_NAT" },
{
  "label": "特拉维夫",
  "value": "ISR_TLV" },
{
  "label": "耶路撒冷",
  "value": "ISR_J" }],

[{
  "label": "阿斯蒂",
  "value": "ITA_AST" },
{
  "label": "阿斯科利皮切诺",
  "value": "ITA_ASP" },
{
  "label": "安科纳",
  "value": "ITA_AOI" },
{
  "label": "奥尔比亚",
  "value": "ITA_OLB" },
{
  "label": "奥里斯塔诺",
  "value": "ITA_QOS" },
{
  "label": "奥斯塔",
  "value": "ITA_AOT" },
{
  "label": "巴勒莫",
  "value": "ITA_PMO" },
{
  "label": "巴里",
  "value": "ITA_BRI" },
{
  "label": "贝加莫",
  "value": "ITA_BGO" },
{
  "label": "贝内文托",
  "value": "ITA_BEN" },
{
  "label": "比萨",
  "value": "ITA_PSA" },
{
  "label": "波代诺内",
  "value": "ITA_PRD" },
{
  "label": "波坦察",
  "value": "ITA_QPO" },
{
  "label": "博洛尼亚",
  "value": "ITA_BLQ" },
{
  "label": "布拉",
  "value": "ITA_BIE" },
{
  "label": "布雷西亚",
  "value": "ITA_BRC" },
{
  "label": "布林迪西",
  "value": "ITA_BDS" },
{
  "label": "的里雅斯特",
  "value": "ITA_TRS" },
{
  "label": "都灵",
  "value": "ITA_TRN" },
{
  "label": "费拉拉",
  "value": "ITA_FRR" },
{
  "label": "佛罗伦萨",
  "value": "ITA_FLR" },
{
  "label": "福贾",
  "value": "ITA_FOG" },
{
  "label": "卡利亚里",
  "value": "ITA_CAG" },
{
  "label": "卡塞塔",
  "value": "ITA_CST" },
{
  "label": "卡塔尼亚",
  "value": "ITA_CTA" },
{
  "label": "卡坦扎罗",
  "value": "ITA_QCZ" },
{
  "label": "坎波巴索",
  "value": "ITA_COB" },
{
  "label": "科摩",
  "value": "ITA_CIY" },
{
  "label": "科森扎",
  "value": "ITA_QCS" },
{
  "label": "克罗托内",
  "value": "ITA_CRV" },
{
  "label": "库内奥",
  "value": "ITA_CUN" },
{
  "label": "拉奎拉",
  "value": "ITA_LAQ" },
{
  "label": "拉斯佩齐亚",
  "value": "ITA_SPE" },
{
  "label": "莱科",
  "value": "ITA_LCO" },
{
  "label": "莱切",
  "value": "ITA_LCC" },
{
  "label": "雷焦艾米利亚",
  "value": "ITA_RNE" },
{
  "label": "雷焦卡拉布里亚",
  "value": "ITA_REG" },
{
  "label": "里窝那",
  "value": "ITA_LIV" },
{
  "label": "罗马",
  "value": "ITA_ROM" },
{
  "label": "马萨",
  "value": "ITA_MCR" },
{
  "label": "马泰拉",
  "value": "ITA_MTR" },
{
  "label": "蒙扎",
  "value": "ITA_MZA" },
{
  "label": "米兰",
  "value": "ITA_MIL" },
{
  "label": "摩德纳",
  "value": "ITA_MOD" },
{
  "label": "墨西拿",
  "value": "ITA_MSN" },
{
  "label": "那不勒斯",
  "value": "ITA_NAP" },
{
  "label": "努奥罗",
  "value": "ITA_QNU" },
{
  "label": "诺瓦拉",
  "value": "ITA_NVR" },
{
  "label": "帕尔马",
  "value": "ITA_PMF" },
{
  "label": "帕维亚",
  "value": "ITA_PAV" },
{
  "label": "佩鲁贾",
  "value": "ITA_PEG" },
{
  "label": "热那亚",
  "value": "ITA_CAX" },
{
  "label": "萨莱诺",
  "value": "ITA_SAL" },
{
  "label": "萨萨里",
  "value": "ITA_QSS" },
{
  "label": "萨沃纳",
  "value": "ITA_SVN" },
{
  "label": "塔兰托",
  "value": "ITA_TAR" },
{
  "label": "特拉帕尼",
  "value": "ITA_TPS" },
{
  "label": "特伦托",
  "value": "ITA_TRT" },
{
  "label": "威尼斯",
  "value": "ITA_VCE" },
{
  "label": "韦尔切利",
  "value": "ITA_VRL" },
{
  "label": "维泰博",
  "value": "ITA_VIT" },
{
  "label": "乌迪内",
  "value": "ITA_UDN" },
{
  "label": "锡拉库扎",
  "value": "ITA_SYR" },
{
  "label": "锡耶纳",
  "value": "ITA_SNA" },
{
  "label": "亚历山德里亚",
  "value": "ITA_ALE" },
{
  "label": "伊塞尔尼亚",
  "value": "ITA_ISE" }],

[{
  "label": "艾藻尔",
  "value": "IND_AJL" },
{
  "label": "班加罗尔",
  "value": "IND_BLR" },
{
  "label": "本地治里",
  "value": "IND_PNY" },
{
  "label": "博帕尔",
  "value": "IND_BHO" },
{
  "label": "布巴内斯瓦尔",
  "value": "IND_BBI" },
{
  "label": "昌迪加尔",
  "value": "IND_IXC" },
{
  "label": "达曼",
  "value": "IND_DAM" },
{
  "label": "第乌",
  "value": "IND_DIU" },
{
  "label": "甘托克",
  "value": "IND_GTO" },
{
  "label": "哥印拜陀",
  "value": "IND_CJB" },
{
  "label": "加尔各答",
  "value": "IND_CCU" },
{
  "label": "加里加尔",
  "value": "IND_KRK" },
{
  "label": "贾巴尔普尔",
  "value": "IND_JLR" },
{
  "label": "贾朗达尔",
  "value": "IND_JUC" },
{
  "label": "焦特布尔",
  "value": "IND_JDH" },
{
  "label": "金奈",
  "value": "IND_MAA" },
{
  "label": "卡瓦拉蒂",
  "value": "IND_KVA" },
{
  "label": "科希马",
  "value": "IND_KOM" },
{
  "label": "马埃",
  "value": "IND_MAH" },
{
  "label": "马杜赖",
  "value": "IND_IXM" },
{
  "label": "森伯尔布尔",
  "value": "IND_SLR" },
{
  "label": "特里凡得琅",
  "value": "IND_TRV" },
{
  "label": "乌代布尔",
  "value": "IND_UDR" },
{
  "label": "西隆",
  "value": "IND_SHL" },
{
  "label": "锡尔萨瓦",
  "value": "IND_SIL" },
{
  "label": "新德里",
  "value": "IND_ICD" },
{
  "label": "亚南",
  "value": "IND_SRV" },
{
  "label": "因帕尔",
  "value": "IND_IMF" },
{
  "label": "印多尔",
  "value": "IND_IDR" },
{
  "label": "斋普尔",
  "value": "IND_JAI" }],

[{
  "label": "巴厘",
  "value": "IDN_BA" },
{
  "label": "邦加－勿里洞群岛",
  "value": "IDN_BB" },
{
  "label": "北苏拉威西",
  "value": "IDN_SA" },
{
  "label": "北苏门答腊",
  "value": "IDN_SU" },
{
  "label": "大雅加达首都特区",
  "value": "IDN_KB" },
{
  "label": "东加里曼丹",
  "value": "IDN_KI" },
{
  "label": "东南苏拉威西",
  "value": "IDN_SG" },
{
  "label": "东努沙登加拉",
  "value": "IDN_NT" },
{
  "label": "东爪哇",
  "value": "IDN_JI" },
{
  "label": "廖内",
  "value": "IDN_RI" },
{
  "label": "马鲁古",
  "value": "IDN_MA" },
{
  "label": "明古鲁",
  "value": "IDN_BE" },
{
  "label": "楠榜",
  "value": "IDN_LA" },
{
  "label": "南加里曼丹",
  "value": "IDN_KS" },
{
  "label": "南苏拉威西",
  "value": "IDN_SN" },
{
  "label": "南苏门答腊",
  "value": "IDN_SS" },
{
  "label": "日惹特区",
  "value": "IDN_YO" },
{
  "label": "万丹",
  "value": "IDN_BT" },
{
  "label": "西努沙登加拉",
  "value": "IDN_NB" },
{
  "label": "西苏门答腊",
  "value": "IDN_SR" },
{
  "label": "西爪哇",
  "value": "IDN_JB" },
{
  "label": "雅加达",
  "value": "IDN_JK" },
{
  "label": "亚齐",
  "value": "IDN_AC" },
{
  "label": "伊里安查亚",
  "value": "IDN_IJ" },
{
  "label": "占碑",
  "value": "IDN_JA" },
{
  "label": "中加里曼丹",
  "value": "IDN_KT" },
{
  "label": "中苏拉威西",
  "value": "IDN_ST" },
{
  "label": "中爪哇",
  "value": "IDN_JT" }],

[{
  "label": "英国",
  "value": "GBR_bak" }],

[{
  "label": "英属印度洋领地",
  "value": "IOT_bak" }],

[{
  "label": "阿吉隆",
  "value": "JOR_AJ" },
{
  "label": "安曼",
  "value": "JOR_AM" },
{
  "label": "拜勒加",
  "value": "JOR_BA" },
{
  "label": "杰拉什",
  "value": "JOR_JA" },
{
  "label": "卡拉克",
  "value": "JOR_KA" },
{
  "label": "鲁赛法",
  "value": "JOR_RU" },
{
  "label": "马安",
  "value": "JOR_MN" },
{
  "label": "马德巴",
  "value": "JOR_MD" },
{
  "label": "马夫拉克",
  "value": "JOR_MF" },
{
  "label": "塔菲拉",
  "value": "JOR_TA" },
{
  "label": "亚喀巴",
  "value": "JOR_AQ" },
{
  "label": "伊尔比德",
  "value": "JOR_IR" },
{
  "label": "扎尔卡",
  "value": "JOR_ZA" }],

[{
  "label": "海防",
  "value": "VNM_HP" },
{
  "label": "河内",
  "value": "VNM_HI" },
{
  "label": "胡志明市",
  "value": "VNM_HC" }],

[{
  "label": "北方",
  "value": "ZMB_NO" },
{
  "label": "东方",
  "value": "ZMB_EA" },
{
  "label": "卢阿普拉",
  "value": "ZMB_LP" },
{
  "label": "卢萨卡",
  "value": "ZMB_LK" },
{
  "label": "南方",
  "value": "ZMB_SO" },
{
  "label": "铜带",
  "value": "ZMB_CB" },
{
  "label": "西北",
  "value": "ZMB_NW" },
{
  "label": "西方",
  "value": "ZMB_WE" },
{
  "label": "中央",
  "value": "ZMB_CE" }],

[{
  "label": "泽西岛",
  "value": "JEY_bak" }],

[{
  "label": "乍得",
  "value": "TCD_bak" }],

[{
  "label": "直布罗陀",
  "value": "GIB_bak" }],

[{
  "label": "阿劳卡尼亚大区",
  "value": "CHL_AR" },
{
  "label": "阿塔卡马大区",
  "value": "CHL_AT" },
{
  "label": "安托法加斯塔大区",
  "value": "CHL_AN" },
{
  "label": "比奥比奥大区",
  "value": "CHL_BI" },
{
  "label": "复活节岛",
  "value": "CHL_LI" },
{
  "label": "湖大区",
  "value": "CHL_LL" },
{
  "label": "科金博大区",
  "value": "CHL_CO" },
{
  "label": "马乌莱大区",
  "value": "CHL_ML" },
{
  "label": "麦哲伦-智利南极大区",
  "value": "CHL_MA" },
{
  "label": "圣地亚哥",
  "value": "CHL_RM" },
{
  "label": "塔拉帕卡大区",
  "value": "CHL_TA" },
{
  "label": "瓦尔帕莱索大区",
  "value": "CHL_VS" },
{
  "label": "伊瓦涅斯将军的艾森大区",
  "value": "CHL_AI" }],

[{
  "label": "巴明吉-班戈兰",
  "value": "CAF_BB" },
{
  "label": "班吉直辖市",
  "value": "CAF_BGF" },
{
  "label": "宾博",
  "value": "CAF_BI" },
{
  "label": "凯莫",
  "value": "CAF_KG" },
{
  "label": "洛巴伊",
  "value": "CAF_LB" },
{
  "label": "曼贝雷-卡代",
  "value": "CAF_HS" },
{
  "label": "姆博穆",
  "value": "CAF_MB" },
{
  "label": "纳纳-格里比齐",
  "value": "CAF_KB" },
{
  "label": "纳纳-曼贝雷",
  "value": "CAF_NM" },
{
  "label": "桑加-姆巴埃雷",
  "value": "CAF_SE" },
{
  "label": "上科托",
  "value": "CAF_HK" },
{
  "label": "上姆博穆",
  "value": "CAF_HM" },
{
  "label": "瓦卡",
  "value": "CAF_UK" },
{
  "label": "瓦卡加",
  "value": "CAF_VK" },
{
  "label": "瓦姆",
  "value": "CAF_AC" },
{
  "label": "瓦姆-彭代",
  "value": "CAF_OP" },
{
  "label": "翁贝拉-姆波科",
  "value": "CAF_MP" },
{
  "label": "下科托",
  "value": "CAF_BK" }]];var _default =


stateData;exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map