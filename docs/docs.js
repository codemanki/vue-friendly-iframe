/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(21)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  module.exports = __webpack_require__(6)
} else {
  module.exports = require('./vue.common.dev.js')
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

var _App = __webpack_require__(18);

var _App2 = _interopRequireDefault(_App);

var _Sidebar = __webpack_require__(24);

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _router = __webpack_require__(29);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_index2.default);

_vue2.default.component('sidebar', _Sidebar2.default);

new _vue2.default({
  template: '<App></App>',
  router: _router2.default,
  components: {
    App: _App2.default
  }
}).$mount('#app');

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.7.10
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*!
 * Vue.js v2.7.10
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
const t=Object.freeze({}),e=Array.isArray;function n(t){return null==t}function o(t){return null!=t}function r(t){return!0===t}function s(t){return"string"==typeof t||"number"==typeof t||"symbol"==typeof t||"boolean"==typeof t}function i(t){return"function"==typeof t}function c(t){return null!==t&&"object"==typeof t}const a=Object.prototype.toString;function l(t){return"[object Object]"===a.call(t)}function u(t){const e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function f(t){return o(t)&&"function"==typeof t.then&&"function"==typeof t.catch}function d(t){return null==t?"":Array.isArray(t)||l(t)&&t.toString===a?JSON.stringify(t,null,2):String(t)}function p(t){const e=parseFloat(t);return isNaN(e)?t:e}function h(t,e){const n=Object.create(null),o=t.split(",");for(let t=0;t<o.length;t++)n[o[t]]=!0;return e?t=>n[t.toLowerCase()]:t=>n[t]}const m=h("slot,component",!0),g=h("key,ref,slot,slot-scope,is");function v(t,e){if(t.length){const n=t.indexOf(e);if(n>-1)return t.splice(n,1)}}const y=Object.prototype.hasOwnProperty;function _(t,e){return y.call(t,e)}function $(t){const e=Object.create(null);return function(n){return e[n]||(e[n]=t(n))}}const b=/-(\w)/g,w=$((t=>t.replace(b,((t,e)=>e?e.toUpperCase():"")))),x=$((t=>t.charAt(0).toUpperCase()+t.slice(1))),C=/\B([A-Z])/g,k=$((t=>t.replace(C,"-$1").toLowerCase()));const S=Function.prototype.bind?function(t,e){return t.bind(e)}:function(t,e){function n(n){const o=arguments.length;return o?o>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return n._length=t.length,n};function O(t,e){e=e||0;let n=t.length-e;const o=new Array(n);for(;n--;)o[n]=t[n+e];return o}function T(t,e){for(const n in e)t[n]=e[n];return t}function A(t){const e={};for(let n=0;n<t.length;n++)t[n]&&T(e,t[n]);return e}function j(t,e,n){}const E=(t,e,n)=>!1,N=t=>t;function P(t,e){if(t===e)return!0;const n=c(t),o=c(e);if(!n||!o)return!n&&!o&&String(t)===String(e);try{const n=Array.isArray(t),o=Array.isArray(e);if(n&&o)return t.length===e.length&&t.every(((t,n)=>P(t,e[n])));if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(n||o)return!1;{const n=Object.keys(t),o=Object.keys(e);return n.length===o.length&&n.every((n=>P(t[n],e[n])))}}catch(t){return!1}}function D(t,e){for(let n=0;n<t.length;n++)if(P(t[n],e))return n;return-1}function M(t){let e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function I(t,e){return t===e?0===t&&1/t!=1/e:t==t||e==e}const L=["component","directive","filter"],R=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch","renderTracked","renderTriggered"];var F={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:E,isReservedAttr:E,isUnknownElement:E,getTagNamespace:j,parsePlatformTagName:N,mustUseProp:E,async:!0,_lifecycleHooks:R};const H=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function B(t){const e=(t+"").charCodeAt(0);return 36===e||95===e}function U(t,e,n,o){Object.defineProperty(t,e,{value:n,enumerable:!!o,writable:!0,configurable:!0})}const z=new RegExp(`[^${H.source}.$_\\d]`);const V="__proto__"in{},K="undefined"!=typeof window,J=K&&window.navigator.userAgent.toLowerCase(),q=J&&/msie|trident/.test(J),W=J&&J.indexOf("msie 9.0")>0,Z=J&&J.indexOf("edge/")>0;J&&J.indexOf("android");const G=J&&/iphone|ipad|ipod|ios/.test(J);J&&/chrome\/\d+/.test(J),J&&/phantomjs/.test(J);const X=J&&J.match(/firefox\/(\d+)/),Y={}.watch;let Q,tt=!1;if(K)try{const t={};Object.defineProperty(t,"passive",{get(){tt=!0}}),window.addEventListener("test-passive",null,t)}catch(t){}const et=()=>(void 0===Q&&(Q=!K&&"undefined"!=typeof global&&(global.process&&"server"===global.process.env.VUE_ENV)),Q),nt=K&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function ot(t){return"function"==typeof t&&/native code/.test(t.toString())}const rt="undefined"!=typeof Symbol&&ot(Symbol)&&"undefined"!=typeof Reflect&&ot(Reflect.ownKeys);let st;st="undefined"!=typeof Set&&ot(Set)?Set:class{constructor(){this.set=Object.create(null)}has(t){return!0===this.set[t]}add(t){this.set[t]=!0}clear(){this.set=Object.create(null)}};let it=null;function ct(t=null){t||it&&it._scope.off(),it=t,t&&t._scope.on()}class at{constructor(t,e,n,o,r,s,i,c){this.tag=t,this.data=e,this.children=n,this.text=o,this.elm=r,this.ns=void 0,this.context=s,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=e&&e.key,this.componentOptions=i,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=c,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1}get child(){return this.componentInstance}}const lt=(t="")=>{const e=new at;return e.text=t,e.isComment=!0,e};function ut(t){return new at(void 0,void 0,void 0,String(t))}function ft(t){const e=new at(t.tag,t.data,t.children&&t.children.slice(),t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.fnContext=t.fnContext,e.fnOptions=t.fnOptions,e.fnScopeId=t.fnScopeId,e.asyncMeta=t.asyncMeta,e.isCloned=!0,e}let dt=0;class pt{constructor(){this.id=dt++,this.subs=[]}addSub(t){this.subs.push(t)}removeSub(t){v(this.subs,t)}depend(t){pt.target&&pt.target.addDep(this)}notify(t){const e=this.subs.slice();for(let t=0,n=e.length;t<n;t++)e[t].update()}}pt.target=null;const ht=[];function mt(t){ht.push(t),pt.target=t}function gt(){ht.pop(),pt.target=ht[ht.length-1]}const vt=Array.prototype,yt=Object.create(vt);["push","pop","shift","unshift","splice","sort","reverse"].forEach((function(t){const e=vt[t];U(yt,t,(function(...n){const o=e.apply(this,n),r=this.__ob__;let s;switch(t){case"push":case"unshift":s=n;break;case"splice":s=n.slice(2)}return s&&r.observeArray(s),r.dep.notify(),o}))}));const _t=Object.getOwnPropertyNames(yt),$t={};let bt=!0;function wt(t){bt=t}const xt={notify:j,depend:j,addSub:j,removeSub:j};class Ct{constructor(t,n=!1,o=!1){if(this.value=t,this.shallow=n,this.mock=o,this.dep=o?xt:new pt,this.vmCount=0,U(t,"__ob__",this),e(t)){if(!o)if(V)t.__proto__=yt;else for(let e=0,n=_t.length;e<n;e++){const n=_t[e];U(t,n,yt[n])}n||this.observeArray(t)}else{const e=Object.keys(t);for(let r=0;r<e.length;r++){St(t,e[r],$t,void 0,n,o)}}}observeArray(t){for(let e=0,n=t.length;e<n;e++)kt(t[e],!1,this.mock)}}function kt(t,n,o){if(!c(t)||Mt(t)||t instanceof at)return;let r;return _(t,"__ob__")&&t.__ob__ instanceof Ct?r=t.__ob__:!bt||!o&&et()||!e(t)&&!l(t)||!Object.isExtensible(t)||t.__v_skip||(r=new Ct(t,n,o)),r}function St(t,n,o,r,s,i){const c=new pt,a=Object.getOwnPropertyDescriptor(t,n);if(a&&!1===a.configurable)return;const l=a&&a.get,u=a&&a.set;l&&!u||o!==$t&&2!==arguments.length||(o=t[n]);let f=!s&&kt(o,!1,i);return Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:function(){const n=l?l.call(t):o;return pt.target&&(c.depend(),f&&(f.dep.depend(),e(n)&&At(n))),Mt(n)&&!s?n.value:n},set:function(e){const n=l?l.call(t):o;if(I(n,e)){if(u)u.call(t,e);else{if(l)return;if(!s&&Mt(n)&&!Mt(e))return void(n.value=e);o=e}f=!s&&kt(e,!1,i),c.notify()}}}),c}function Ot(t,n,o){if(Dt(t))return;const r=t.__ob__;return e(t)&&u(n)?(t.length=Math.max(t.length,n),t.splice(n,1,o),r&&!r.shallow&&r.mock&&kt(o,!1,!0),o):n in t&&!(n in Object.prototype)?(t[n]=o,o):t._isVue||r&&r.vmCount?o:r?(St(r.value,n,o,void 0,r.shallow,r.mock),r.dep.notify(),o):(t[n]=o,o)}function Tt(t,n){if(e(t)&&u(n))return void t.splice(n,1);const o=t.__ob__;t._isVue||o&&o.vmCount||Dt(t)||_(t,n)&&(delete t[n],o&&o.dep.notify())}function At(t){for(let n,o=0,r=t.length;o<r;o++)n=t[o],n&&n.__ob__&&n.__ob__.dep.depend(),e(n)&&At(n)}function jt(t){return Et(t,!0),U(t,"__v_isShallow",!0),t}function Et(t,e){Dt(t)||kt(t,e,et())}function Nt(t){return Dt(t)?Nt(t.__v_raw):!(!t||!t.__ob__)}function Pt(t){return!(!t||!t.__v_isShallow)}function Dt(t){return!(!t||!t.__v_isReadonly)}function Mt(t){return!(!t||!0!==t.__v_isRef)}function It(t,e){if(Mt(t))return t;const n={};return U(n,"__v_isRef",!0),U(n,"__v_isShallow",e),U(n,"dep",St(n,"value",t,null,e,et())),n}function Lt(t,e,n){Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>{const t=e[n];if(Mt(t))return t.value;{const e=t&&t.__ob__;return e&&e.dep.depend(),t}},set:t=>{const o=e[n];Mt(o)&&!Mt(t)?o.value=t:e[n]=t}})}function Rt(t,e,n){const o=t[e];if(Mt(o))return o;const r={get value(){const o=t[e];return void 0===o?n:o},set value(n){t[e]=n}};return U(r,"__v_isRef",!0),r}function Ft(t){return Ht(t,!1)}function Ht(t,e){if(!l(t))return t;if(Dt(t))return t;const n=e?"__v_rawToShallowReadonly":"__v_rawToReadonly",o=t[n];if(o)return o;const r=Object.create(Object.getPrototypeOf(t));U(t,n,r),U(r,"__v_isReadonly",!0),U(r,"__v_raw",t),Mt(t)&&U(r,"__v_isRef",!0),(e||Pt(t))&&U(r,"__v_isShallow",!0);const s=Object.keys(t);for(let n=0;n<s.length;n++)Bt(r,t,s[n],e);return r}function Bt(t,e,n,o){Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get(){const t=e[n];return o||!l(t)?t:Ft(t)},set(){}})}const Ut=$((t=>{const e="&"===t.charAt(0),n="~"===(t=e?t.slice(1):t).charAt(0),o="!"===(t=n?t.slice(1):t).charAt(0);return{name:t=o?t.slice(1):t,once:n,capture:o,passive:e}}));function zt(t,n){function o(){const t=o.fns;if(!e(t))return nn(t,null,arguments,n,"v-on handler");{const e=t.slice();for(let t=0;t<e.length;t++)nn(e[t],null,arguments,n,"v-on handler")}}return o.fns=t,o}function Vt(t,e,o,s,i,c){let a,l,u,f;for(a in t)l=t[a],u=e[a],f=Ut(a),n(l)||(n(u)?(n(l.fns)&&(l=t[a]=zt(l,c)),r(f.once)&&(l=t[a]=i(f.name,l,f.capture)),o(f.name,l,f.capture,f.passive,f.params)):l!==u&&(u.fns=l,t[a]=u));for(a in e)n(t[a])&&(f=Ut(a),s(f.name,e[a],f.capture))}function Kt(t,e,s){let i;t instanceof at&&(t=t.data.hook||(t.data.hook={}));const c=t[e];function a(){s.apply(this,arguments),v(i.fns,a)}n(c)?i=zt([a]):o(c.fns)&&r(c.merged)?(i=c,i.fns.push(a)):i=zt([c,a]),i.merged=!0,t[e]=i}function Jt(t,e,n,r,s){if(o(e)){if(_(e,n))return t[n]=e[n],s||delete e[n],!0;if(_(e,r))return t[n]=e[r],s||delete e[r],!0}return!1}function qt(t){return s(t)?[ut(t)]:e(t)?Zt(t):void 0}function Wt(t){return o(t)&&o(t.text)&&!1===t.isComment}function Zt(t,i){const c=[];let a,l,u,f;for(a=0;a<t.length;a++)l=t[a],n(l)||"boolean"==typeof l||(u=c.length-1,f=c[u],e(l)?l.length>0&&(l=Zt(l,`${i||""}_${a}`),Wt(l[0])&&Wt(f)&&(c[u]=ut(f.text+l[0].text),l.shift()),c.push.apply(c,l)):s(l)?Wt(f)?c[u]=ut(f.text+l):""!==l&&c.push(ut(l)):Wt(l)&&Wt(f)?c[u]=ut(f.text+l.text):(r(t._isVList)&&o(l.tag)&&n(l.key)&&o(i)&&(l.key=`__vlist${i}_${a}__`),c.push(l)));return c}function Gt(t,n,a,l,u,f){return(e(a)||s(a))&&(u=l,l=a,a=void 0),r(f)&&(u=2),function(t,n,r,s,a){if(o(r)&&o(r.__ob__))return lt();o(r)&&o(r.is)&&(n=r.is);if(!n)return lt();e(s)&&i(s[0])&&((r=r||{}).scopedSlots={default:s[0]},s.length=0);2===a?s=qt(s):1===a&&(s=function(t){for(let n=0;n<t.length;n++)if(e(t[n]))return Array.prototype.concat.apply([],t);return t}(s));let l,u;if("string"==typeof n){let e;u=t.$vnode&&t.$vnode.ns||F.getTagNamespace(n),l=F.isReservedTag(n)?new at(F.parsePlatformTagName(n),r,s,void 0,void 0,t):r&&r.pre||!o(e=ro(t.$options,"components",n))?new at(n,r,s,void 0,void 0,t):Wn(e,r,t,s,n)}else l=Wn(n,r,t,s);return e(l)?l:o(l)?(o(u)&&Xt(l,u),o(r)&&function(t){c(t.style)&&On(t.style);c(t.class)&&On(t.class)}(r),l):lt()}(t,n,a,l,u)}function Xt(t,e,s){if(t.ns=e,"foreignObject"===t.tag&&(e=void 0,s=!0),o(t.children))for(let i=0,c=t.children.length;i<c;i++){const c=t.children[i];o(c.tag)&&(n(c.ns)||r(s)&&"svg"!==c.tag)&&Xt(c,e,s)}}function Yt(t,n){let r,s,i,a,l=null;if(e(t)||"string"==typeof t)for(l=new Array(t.length),r=0,s=t.length;r<s;r++)l[r]=n(t[r],r);else if("number"==typeof t)for(l=new Array(t),r=0;r<t;r++)l[r]=n(r+1,r);else if(c(t))if(rt&&t[Symbol.iterator]){l=[];const e=t[Symbol.iterator]();let o=e.next();for(;!o.done;)l.push(n(o.value,l.length)),o=e.next()}else for(i=Object.keys(t),l=new Array(i.length),r=0,s=i.length;r<s;r++)a=i[r],l[r]=n(t[a],a,r);return o(l)||(l=[]),l._isVList=!0,l}function Qt(t,e,n,o){const r=this.$scopedSlots[t];let s;r?(n=n||{},o&&(n=T(T({},o),n)),s=r(n)||(i(e)?e():e)):s=this.$slots[t]||(i(e)?e():e);const c=n&&n.slot;return c?this.$createElement("template",{slot:c},s):s}function te(t){return ro(this.$options,"filters",t)||N}function ee(t,n){return e(t)?-1===t.indexOf(n):t!==n}function ne(t,e,n,o,r){const s=F.keyCodes[e]||n;return r&&o&&!F.keyCodes[e]?ee(r,o):s?ee(s,t):o?k(o)!==e:void 0===t}function oe(t,n,o,r,s){if(o)if(c(o)){let i;e(o)&&(o=A(o));for(const e in o){if("class"===e||"style"===e||g(e))i=t;else{const o=t.attrs&&t.attrs.type;i=r||F.mustUseProp(n,o,e)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}const c=w(e),a=k(e);if(!(c in i)&&!(a in i)&&(i[e]=o[e],s)){(t.on||(t.on={}))[`update:${e}`]=function(t){o[e]=t}}}}else;return t}function re(t,e){const n=this._staticTrees||(this._staticTrees=[]);let o=n[t];return o&&!e||(o=n[t]=this.$options.staticRenderFns[t].call(this._renderProxy,this._c,this),ie(o,`__static__${t}`,!1)),o}function se(t,e,n){return ie(t,`__once__${e}${n?`_${n}`:""}`,!0),t}function ie(t,n,o){if(e(t))for(let e=0;e<t.length;e++)t[e]&&"string"!=typeof t[e]&&ce(t[e],`${n}_${e}`,o);else ce(t,n,o)}function ce(t,e,n){t.isStatic=!0,t.key=e,t.isOnce=n}function ae(t,e){if(e)if(l(e)){const n=t.on=t.on?T({},t.on):{};for(const t in e){const o=n[t],r=e[t];n[t]=o?[].concat(o,r):r}}else;return t}function le(t,n,o,r){n=n||{$stable:!o};for(let r=0;r<t.length;r++){const s=t[r];e(s)?le(s,n,o):s&&(s.proxy&&(s.fn.proxy=!0),n[s.key]=s.fn)}return r&&(n.$key=r),n}function ue(t,e){for(let n=0;n<e.length;n+=2){const o=e[n];"string"==typeof o&&o&&(t[e[n]]=e[n+1])}return t}function fe(t,e){return"string"==typeof t?e+t:t}function de(t){t._o=se,t._n=p,t._s=d,t._l=Yt,t._t=Qt,t._q=P,t._i=D,t._m=re,t._f=te,t._k=ne,t._b=oe,t._v=ut,t._e=lt,t._u=le,t._g=ae,t._d=ue,t._p=fe}function pe(t,e){if(!t||!t.length)return{};const n={};for(let o=0,r=t.length;o<r;o++){const r=t[o],s=r.data;if(s&&s.attrs&&s.attrs.slot&&delete s.attrs.slot,r.context!==e&&r.fnContext!==e||!s||null==s.slot)(n.default||(n.default=[])).push(r);else{const t=s.slot,e=n[t]||(n[t]=[]);"template"===r.tag?e.push.apply(e,r.children||[]):e.push(r)}}for(const t in n)n[t].every(he)&&delete n[t];return n}function he(t){return t.isComment&&!t.asyncFactory||" "===t.text}function me(t){return t.isComment&&t.asyncFactory}function ge(e,n,o,r){let s;const i=Object.keys(o).length>0,c=n?!!n.$stable:!i,a=n&&n.$key;if(n){if(n._normalized)return n._normalized;if(c&&r&&r!==t&&a===r.$key&&!i&&!r.$hasNormal)return r;s={};for(const t in n)n[t]&&"$"!==t[0]&&(s[t]=ve(e,o,t,n[t]))}else s={};for(const t in o)t in s||(s[t]=ye(o,t));return n&&Object.isExtensible(n)&&(n._normalized=s),U(s,"$stable",c),U(s,"$key",a),U(s,"$hasNormal",i),s}function ve(t,n,o,r){const s=function(){const n=it;ct(t);let o=arguments.length?r.apply(null,arguments):r({});o=o&&"object"==typeof o&&!e(o)?[o]:qt(o);const s=o&&o[0];return ct(n),o&&(!s||1===o.length&&s.isComment&&!me(s))?void 0:o};return r.proxy&&Object.defineProperty(n,o,{get:s,enumerable:!0,configurable:!0}),s}function ye(t,e){return()=>t[e]}function _e(e){return{get attrs(){if(!e._attrsProxy){const n=e._attrsProxy={};U(n,"_v_attr_proxy",!0),$e(n,e.$attrs,t,e,"$attrs")}return e._attrsProxy},get listeners(){if(!e._listenersProxy){$e(e._listenersProxy={},e.$listeners,t,e,"$listeners")}return e._listenersProxy},get slots(){return function(t){t._slotsProxy||we(t._slotsProxy={},t.$scopedSlots);return t._slotsProxy}(e)},emit:S(e.$emit,e),expose(t){t&&Object.keys(t).forEach((n=>Lt(e,t,n)))}}}function $e(t,e,n,o,r){let s=!1;for(const i in e)i in t?e[i]!==n[i]&&(s=!0):(s=!0,be(t,i,o,r));for(const n in t)n in e||(s=!0,delete t[n]);return s}function be(t,e,n,o){Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>n[o][e]})}function we(t,e){for(const n in e)t[n]=e[n];for(const n in t)n in e||delete t[n]}function xe(){const t=it;return t._setupContext||(t._setupContext=_e(t))}let Ce,ke=null;function Se(t,e){return(t.__esModule||rt&&"Module"===t[Symbol.toStringTag])&&(t=t.default),c(t)?e.extend(t):t}function Oe(t){if(e(t))for(let e=0;e<t.length;e++){const n=t[e];if(o(n)&&(o(n.componentOptions)||me(n)))return n}}function Te(t,e){Ce.$on(t,e)}function Ae(t,e){Ce.$off(t,e)}function je(t,e){const n=Ce;return function o(){const r=e.apply(null,arguments);null!==r&&n.$off(t,o)}}function Ee(t,e,n){Ce=t,Vt(e,n||{},Te,Ae,je,t),Ce=void 0}let Ne=null;function Pe(t){const e=Ne;return Ne=t,()=>{Ne=e}}function De(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function Me(t,e){if(e){if(t._directInactive=!1,De(t))return}else if(t._directInactive)return;if(t._inactive||null===t._inactive){t._inactive=!1;for(let e=0;e<t.$children.length;e++)Me(t.$children[e]);Le(t,"activated")}}function Ie(t,e){if(!(e&&(t._directInactive=!0,De(t))||t._inactive)){t._inactive=!0;for(let e=0;e<t.$children.length;e++)Ie(t.$children[e]);Le(t,"deactivated")}}function Le(t,e,n,o=!0){mt();const r=it;o&&ct(t);const s=t.$options[e],i=`${e} hook`;if(s)for(let e=0,o=s.length;e<o;e++)nn(s[e],t,n||null,t,i);t._hasHookEvent&&t.$emit("hook:"+e),o&&ct(r),gt()}const Re=[],Fe=[];let He={},Be=!1,Ue=!1,ze=0;let Ve=0,Ke=Date.now;if(K&&!q){const t=window.performance;t&&"function"==typeof t.now&&Ke()>document.createEvent("Event").timeStamp&&(Ke=()=>t.now())}const Je=(t,e)=>{if(t.post){if(!e.post)return 1}else if(e.post)return-1;return t.id-e.id};function qe(){let t,e;for(Ve=Ke(),Ue=!0,Re.sort(Je),ze=0;ze<Re.length;ze++)t=Re[ze],t.before&&t.before(),e=t.id,He[e]=null,t.run();const n=Fe.slice(),o=Re.slice();ze=Re.length=Fe.length=0,He={},Be=Ue=!1,function(t){for(let e=0;e<t.length;e++)t[e]._inactive=!0,Me(t[e],!0)}(n),function(t){let e=t.length;for(;e--;){const n=t[e],o=n.vm;o&&o._watcher===n&&o._isMounted&&!o._isDestroyed&&Le(o,"updated")}}(o),nt&&F.devtools&&nt.emit("flush")}function We(t){const e=t.id;if(null==He[e]&&(t!==pt.target||!t.noRecurse)){if(He[e]=!0,Ue){let e=Re.length-1;for(;e>ze&&Re[e].id>t.id;)e--;Re.splice(e+1,0,t)}else Re.push(t);Be||(Be=!0,fn(qe))}}function Ze(t,e){return Xe(t,null,{flush:"post"})}const Ge={};function Xe(n,o,{immediate:r,deep:s,flush:c="pre",onTrack:a,onTrigger:l}=t){const u=it,f=(t,e,n=null)=>nn(t,null,n,u,e);let d,p,h=!1,m=!1;if(Mt(n)?(d=()=>n.value,h=Pt(n)):Nt(n)?(d=()=>(n.__ob__.dep.depend(),n),s=!0):e(n)?(m=!0,h=n.some((t=>Nt(t)||Pt(t))),d=()=>n.map((t=>Mt(t)?t.value:Nt(t)?On(t):i(t)?f(t,"watcher getter"):void 0))):d=i(n)?o?()=>f(n,"watcher getter"):()=>{if(!u||!u._isDestroyed)return p&&p(),f(n,"watcher",[g])}:j,o&&s){const t=d;d=()=>On(t())}let g=t=>{p=v.onStop=()=>{f(t,"watcher cleanup")}};if(et())return g=j,o?r&&f(o,"watcher callback",[d(),m?[]:void 0,g]):d(),j;const v=new jn(it,d,j,{lazy:!0});v.noRecurse=!o;let y=m?[]:Ge;return v.run=()=>{if(v.active)if(o){const t=v.get();(s||h||(m?t.some(((t,e)=>I(t,y[e]))):I(t,y)))&&(p&&p(),f(o,"watcher callback",[t,y===Ge?void 0:y,g]),y=t)}else v.get()},"sync"===c?v.update=v.run:"post"===c?(v.post=!0,v.update=()=>We(v)):v.update=()=>{if(u&&u===it&&!u._isMounted){const t=u._preWatchers||(u._preWatchers=[]);t.indexOf(v)<0&&t.push(v)}else We(v)},o?r?v.run():y=v.get():"post"===c&&u?u.$once("hook:mounted",(()=>v.get())):v.get(),()=>{v.teardown()}}let Ye;class Qe{constructor(t=!1){this.active=!0,this.effects=[],this.cleanups=[],!t&&Ye&&(this.parent=Ye,this.index=(Ye.scopes||(Ye.scopes=[])).push(this)-1)}run(t){if(this.active){const e=Ye;try{return Ye=this,t()}finally{Ye=e}}}on(){Ye=this}off(){Ye=this.parent}stop(t){if(this.active){let e,n;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].teardown();for(e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);if(this.parent&&!t){const t=this.parent.scopes.pop();t&&t!==this&&(this.parent.scopes[this.index]=t,t.index=this.index)}this.active=!1}}}function tn(t){const e=t._provided,n=t.$parent&&t.$parent._provided;return n===e?t._provided=Object.create(n):e}function en(t,e,n){mt();try{if(e){let o=e;for(;o=o.$parent;){const r=o.$options.errorCaptured;if(r)for(let s=0;s<r.length;s++)try{if(!1===r[s].call(o,t,e,n))return}catch(t){on(t,o,"errorCaptured hook")}}}on(t,e,n)}finally{gt()}}function nn(t,e,n,o,r){let s;try{s=n?t.apply(e,n):t.call(e),s&&!s._isVue&&f(s)&&!s._handled&&(s.catch((t=>en(t,o,r+" (Promise/async)"))),s._handled=!0)}catch(t){en(t,o,r)}return s}function on(t,e,n){if(F.errorHandler)try{return F.errorHandler.call(null,t,e,n)}catch(e){e!==t&&rn(e)}rn(t)}function rn(t,e,n){if(!K||"undefined"==typeof console)throw t;console.error(t)}let sn=!1;const cn=[];let an,ln=!1;function un(){ln=!1;const t=cn.slice(0);cn.length=0;for(let e=0;e<t.length;e++)t[e]()}if("undefined"!=typeof Promise&&ot(Promise)){const t=Promise.resolve();an=()=>{t.then(un),G&&setTimeout(j)},sn=!0}else if(q||"undefined"==typeof MutationObserver||!ot(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())an="undefined"!=typeof setImmediate&&ot(setImmediate)?()=>{setImmediate(un)}:()=>{setTimeout(un,0)};else{let t=1;const e=new MutationObserver(un),n=document.createTextNode(String(t));e.observe(n,{characterData:!0}),an=()=>{t=(t+1)%2,n.data=String(t)},sn=!0}function fn(t,e){let n;if(cn.push((()=>{if(t)try{t.call(e)}catch(t){en(t,e,"nextTick")}else n&&n(e)})),ln||(ln=!0,an()),!t&&"undefined"!=typeof Promise)return new Promise((t=>{n=t}))}function dn(t){return(e,n=it)=>{if(n)return function(t,e,n){const o=t.$options;o[e]=to(o[e],n)}(n,t,e)}}const pn=dn("beforeMount"),hn=dn("mounted"),mn=dn("beforeUpdate"),gn=dn("updated"),vn=dn("beforeDestroy"),yn=dn("destroyed"),_n=dn("activated"),$n=dn("deactivated"),bn=dn("serverPrefetch"),wn=dn("renderTracked"),xn=dn("renderTriggered"),Cn=dn("errorCaptured");var kn=Object.freeze({__proto__:null,version:"2.7.10",defineComponent:function(t){return t},ref:function(t){return It(t,!1)},shallowRef:function(t){return It(t,!0)},isRef:Mt,toRef:Rt,toRefs:function(t){const n=e(t)?new Array(t.length):{};for(const e in t)n[e]=Rt(t,e);return n},unref:function(t){return Mt(t)?t.value:t},proxyRefs:function(t){if(Nt(t))return t;const e={},n=Object.keys(t);for(let o=0;o<n.length;o++)Lt(e,t,n[o]);return e},customRef:function(t){const e=new pt,{get:n,set:o}=t((()=>{e.depend()}),(()=>{e.notify()})),r={get value(){return n()},set value(t){o(t)}};return U(r,"__v_isRef",!0),r},triggerRef:function(t){t.dep&&t.dep.notify()},reactive:function(t){return Et(t,!1),t},isReactive:Nt,isReadonly:Dt,isShallow:Pt,isProxy:function(t){return Nt(t)||Dt(t)},shallowReactive:jt,markRaw:function(t){return U(t,"__v_skip",!0),t},toRaw:function t(e){const n=e&&e.__v_raw;return n?t(n):e},readonly:Ft,shallowReadonly:function(t){return Ht(t,!0)},computed:function(t,e){let n,o;const r=i(t);r?(n=t,o=j):(n=t.get,o=t.set);const s=et()?null:new jn(it,n,j,{lazy:!0}),c={effect:s,get value(){return s?(s.dirty&&s.evaluate(),pt.target&&s.depend(),s.value):n()},set value(t){o(t)}};return U(c,"__v_isRef",!0),U(c,"__v_isReadonly",r),c},watch:function(t,e,n){return Xe(t,e,n)},watchEffect:function(t,e){return Xe(t,null,e)},watchPostEffect:Ze,watchSyncEffect:function(t,e){return Xe(t,null,{flush:"sync"})},EffectScope:Qe,effectScope:function(t){return new Qe(t)},onScopeDispose:function(t){Ye&&Ye.cleanups.push(t)},getCurrentScope:function(){return Ye},provide:function(t,e){it&&(tn(it)[t]=e)},inject:function(t,e,n=!1){const o=it;if(o){const r=o.$parent&&o.$parent._provided;if(r&&t in r)return r[t];if(arguments.length>1)return n&&i(e)?e.call(o):e}},h:function(t,e,n){return Gt(it,t,e,n,2,!0)},getCurrentInstance:function(){return it&&{proxy:it}},useSlots:function(){return xe().slots},useAttrs:function(){return xe().attrs},useListeners:function(){return xe().listeners},mergeDefaults:function(t,n){const o=e(t)?t.reduce(((t,e)=>(t[e]={},t)),{}):t;for(const t in n){const r=o[t];r?e(r)||i(r)?o[t]={type:r,default:n[t]}:r.default=n[t]:null===r&&(o[t]={default:n[t]})}return o},nextTick:fn,set:Ot,del:Tt,useCssModule:function(e="$style"){{if(!it)return t;const n=it[e];return n||t}},useCssVars:function(t){if(!K)return;const e=it;e&&Ze((()=>{const n=e.$el,o=t(e,e._setupProxy);if(n&&1===n.nodeType){const t=n.style;for(const e in o)t.setProperty(`--${e}`,o[e])}}))},defineAsyncComponent:function(t){i(t)&&(t={loader:t});const{loader:e,loadingComponent:n,errorComponent:o,delay:r=200,timeout:s,suspensible:c=!1,onError:a}=t;let l=null,u=0;const f=()=>{let t;return l||(t=l=e().catch((t=>{if(t=t instanceof Error?t:new Error(String(t)),a)return new Promise(((e,n)=>{a(t,(()=>e((u++,l=null,f()))),(()=>n(t)),u+1)}));throw t})).then((e=>t!==l&&l?l:(e&&(e.__esModule||"Module"===e[Symbol.toStringTag])&&(e=e.default),e))))};return()=>({component:f(),delay:r,timeout:s,error:o,loading:n})},onBeforeMount:pn,onMounted:hn,onBeforeUpdate:mn,onUpdated:gn,onBeforeUnmount:vn,onUnmounted:yn,onActivated:_n,onDeactivated:$n,onServerPrefetch:bn,onRenderTracked:wn,onRenderTriggered:xn,onErrorCaptured:function(t,e=it){Cn(t,e)}});const Sn=new st;function On(t){return Tn(t,Sn),Sn.clear(),t}function Tn(t,n){let o,r;const s=e(t);if(!(!s&&!c(t)||Object.isFrozen(t)||t instanceof at)){if(t.__ob__){const e=t.__ob__.dep.id;if(n.has(e))return;n.add(e)}if(s)for(o=t.length;o--;)Tn(t[o],n);else if(Mt(t))Tn(t.value,n);else for(r=Object.keys(t),o=r.length;o--;)Tn(t[r[o]],n)}}let An=0;class jn{constructor(t,e,n,o,r){!function(t,e=Ye){e&&e.active&&e.effects.push(t)}(this,Ye&&!Ye._vm?Ye:t?t._scope:void 0),(this.vm=t)&&r&&(t._watcher=this),o?(this.deep=!!o.deep,this.user=!!o.user,this.lazy=!!o.lazy,this.sync=!!o.sync,this.before=o.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++An,this.active=!0,this.post=!1,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new st,this.newDepIds=new st,this.expression="",i(e)?this.getter=e:(this.getter=function(t){if(z.test(t))return;const e=t.split(".");return function(t){for(let n=0;n<e.length;n++){if(!t)return;t=t[e[n]]}return t}}(e),this.getter||(this.getter=j)),this.value=this.lazy?void 0:this.get()}get(){let t;mt(this);const e=this.vm;try{t=this.getter.call(e,e)}catch(t){if(!this.user)throw t;en(t,e,`getter for watcher "${this.expression}"`)}finally{this.deep&&On(t),gt(),this.cleanupDeps()}return t}addDep(t){const e=t.id;this.newDepIds.has(e)||(this.newDepIds.add(e),this.newDeps.push(t),this.depIds.has(e)||t.addSub(this))}cleanupDeps(){let t=this.deps.length;for(;t--;){const e=this.deps[t];this.newDepIds.has(e.id)||e.removeSub(this)}let e=this.depIds;this.depIds=this.newDepIds,this.newDepIds=e,this.newDepIds.clear(),e=this.deps,this.deps=this.newDeps,this.newDeps=e,this.newDeps.length=0}update(){this.lazy?this.dirty=!0:this.sync?this.run():We(this)}run(){if(this.active){const t=this.get();if(t!==this.value||c(t)||this.deep){const e=this.value;if(this.value=t,this.user){const n=`callback for watcher "${this.expression}"`;nn(this.cb,this.vm,[t,e],this.vm,n)}else this.cb.call(this.vm,t,e)}}}evaluate(){this.value=this.get(),this.dirty=!1}depend(){let t=this.deps.length;for(;t--;)this.deps[t].depend()}teardown(){if(this.vm&&!this.vm._isBeingDestroyed&&v(this.vm._scope.effects,this),this.active){let t=this.deps.length;for(;t--;)this.deps[t].removeSub(this);this.active=!1,this.onStop&&this.onStop()}}}const En={enumerable:!0,configurable:!0,get:j,set:j};function Nn(t,e,n){En.get=function(){return this[e][n]},En.set=function(t){this[e][n]=t},Object.defineProperty(t,n,En)}function Pn(t){const n=t.$options;if(n.props&&function(t,e){const n=t.$options.propsData||{},o=t._props=jt({}),r=t.$options._propKeys=[];t.$parent&&wt(!1);for(const s in e){r.push(s);St(o,s,so(s,e,n,t)),s in t||Nn(t,"_props",s)}wt(!0)}(t,n.props),function(t){const e=t.$options,n=e.setup;if(n){const o=t._setupContext=_e(t);ct(t),mt();const r=nn(n,null,[t._props||jt({}),o],t,"setup");if(gt(),ct(),i(r))e.render=r;else if(c(r))if(t._setupState=r,r.__sfc){const e=t._setupProxy={};for(const t in r)"__sfc"!==t&&Lt(e,r,t)}else for(const e in r)B(e)||Lt(t,r,e)}}(t),n.methods&&function(t,e){t.$options.props;for(const n in e)t[n]="function"!=typeof e[n]?j:S(e[n],t)}(t,n.methods),n.data)!function(t){let e=t.$options.data;e=t._data=i(e)?function(t,e){mt();try{return t.call(e,e)}catch(t){return en(t,e,"data()"),{}}finally{gt()}}(e,t):e||{},l(e)||(e={});const n=Object.keys(e),o=t.$options.props;t.$options.methods;let r=n.length;for(;r--;){const e=n[r];o&&_(o,e)||B(e)||Nn(t,"_data",e)}const s=kt(e);s&&s.vmCount++}(t);else{const e=kt(t._data={});e&&e.vmCount++}n.computed&&function(t,e){const n=t._computedWatchers=Object.create(null),o=et();for(const r in e){const s=e[r],c=i(s)?s:s.get;o||(n[r]=new jn(t,c||j,j,Dn)),r in t||Mn(t,r,s)}}(t,n.computed),n.watch&&n.watch!==Y&&function(t,n){for(const o in n){const r=n[o];if(e(r))for(let e=0;e<r.length;e++)Rn(t,o,r[e]);else Rn(t,o,r)}}(t,n.watch)}const Dn={lazy:!0};function Mn(t,e,n){const o=!et();i(n)?(En.get=o?In(e):Ln(n),En.set=j):(En.get=n.get?o&&!1!==n.cache?In(e):Ln(n.get):j,En.set=n.set||j),Object.defineProperty(t,e,En)}function In(t){return function(){const e=this._computedWatchers&&this._computedWatchers[t];if(e)return e.dirty&&e.evaluate(),pt.target&&e.depend(),e.value}}function Ln(t){return function(){return t.call(this,this)}}function Rn(t,e,n,o){return l(n)&&(o=n,n=n.handler),"string"==typeof n&&(n=t[n]),t.$watch(e,n,o)}function Fn(t,e){if(t){const n=Object.create(null),o=rt?Reflect.ownKeys(t):Object.keys(t);for(let r=0;r<o.length;r++){const s=o[r];if("__ob__"===s)continue;const c=t[s].from;if(c in e._provided)n[s]=e._provided[c];else if("default"in t[s]){const o=t[s].default;n[s]=i(o)?o.call(e):o}}return n}}let Hn=0;function Bn(t){let e=t.options;if(t.super){const n=Bn(t.super);if(n!==t.superOptions){t.superOptions=n;const o=function(t){let e;const n=t.options,o=t.sealedOptions;for(const t in n)n[t]!==o[t]&&(e||(e={}),e[t]=n[t]);return e}(t);o&&T(t.extendOptions,o),e=t.options=oo(n,t.extendOptions),e.name&&(e.components[e.name]=t)}}return e}function Un(n,o,s,i,c){const a=c.options;let l;_(i,"_uid")?(l=Object.create(i),l._original=i):(l=i,i=i._original);const u=r(a._compiled),f=!u;this.data=n,this.props=o,this.children=s,this.parent=i,this.listeners=n.on||t,this.injections=Fn(a.inject,i),this.slots=()=>(this.$slots||ge(i,n.scopedSlots,this.$slots=pe(s,i)),this.$slots),Object.defineProperty(this,"scopedSlots",{enumerable:!0,get(){return ge(i,n.scopedSlots,this.slots())}}),u&&(this.$options=a,this.$slots=this.slots(),this.$scopedSlots=ge(i,n.scopedSlots,this.$slots)),a._scopeId?this._c=(t,n,o,r)=>{const s=Gt(l,t,n,o,r,f);return s&&!e(s)&&(s.fnScopeId=a._scopeId,s.fnContext=i),s}:this._c=(t,e,n,o)=>Gt(l,t,e,n,o,f)}function zn(t,e,n,o,r){const s=ft(t);return s.fnContext=n,s.fnOptions=o,e.slot&&((s.data||(s.data={})).slot=e.slot),s}function Vn(t,e){for(const n in e)t[w(n)]=e[n]}function Kn(t){return t.name||t.__name||t._componentTag}de(Un.prototype);const Jn={init(t,e){if(t.componentInstance&&!t.componentInstance._isDestroyed&&t.data.keepAlive){const e=t;Jn.prepatch(e,e)}else{(t.componentInstance=function(t,e){const n={_isComponent:!0,_parentVnode:t,parent:e},r=t.data.inlineTemplate;o(r)&&(n.render=r.render,n.staticRenderFns=r.staticRenderFns);return new t.componentOptions.Ctor(n)}(t,Ne)).$mount(e?t.elm:void 0,e)}},prepatch(e,n){const o=n.componentOptions;!function(e,n,o,r,s){const i=r.data.scopedSlots,c=e.$scopedSlots,a=!!(i&&!i.$stable||c!==t&&!c.$stable||i&&e.$scopedSlots.$key!==i.$key||!i&&e.$scopedSlots.$key);let l=!!(s||e.$options._renderChildren||a);const u=e.$vnode;e.$options._parentVnode=r,e.$vnode=r,e._vnode&&(e._vnode.parent=r),e.$options._renderChildren=s;const f=r.data.attrs||t;e._attrsProxy&&$e(e._attrsProxy,f,u.data&&u.data.attrs||t,e,"$attrs")&&(l=!0),e.$attrs=f,o=o||t;const d=e.$options._parentListeners;if(e._listenersProxy&&$e(e._listenersProxy,o,d||t,e,"$listeners"),e.$listeners=e.$options._parentListeners=o,Ee(e,o,d),n&&e.$options.props){wt(!1);const t=e._props,o=e.$options._propKeys||[];for(let r=0;r<o.length;r++){const s=o[r],i=e.$options.props;t[s]=so(s,i,n,e)}wt(!0),e.$options.propsData=n}l&&(e.$slots=pe(s,r.context),e.$forceUpdate())}(n.componentInstance=e.componentInstance,o.propsData,o.listeners,n,o.children)},insert(t){const{context:e,componentInstance:n}=t;var o;n._isMounted||(n._isMounted=!0,Le(n,"mounted")),t.data.keepAlive&&(e._isMounted?((o=n)._inactive=!1,Fe.push(o)):Me(n,!0))},destroy(t){const{componentInstance:e}=t;e._isDestroyed||(t.data.keepAlive?Ie(e,!0):e.$destroy())}},qn=Object.keys(Jn);function Wn(s,i,a,l,u){if(n(s))return;const d=a.$options._base;if(c(s)&&(s=d.extend(s)),"function"!=typeof s)return;let p;if(n(s.cid)&&(p=s,s=function(t,e){if(r(t.error)&&o(t.errorComp))return t.errorComp;if(o(t.resolved))return t.resolved;const s=ke;if(s&&o(t.owners)&&-1===t.owners.indexOf(s)&&t.owners.push(s),r(t.loading)&&o(t.loadingComp))return t.loadingComp;if(s&&!o(t.owners)){const r=t.owners=[s];let i=!0,a=null,l=null;s.$on("hook:destroyed",(()=>v(r,s)));const u=t=>{for(let t=0,e=r.length;t<e;t++)r[t].$forceUpdate();t&&(r.length=0,null!==a&&(clearTimeout(a),a=null),null!==l&&(clearTimeout(l),l=null))},d=M((n=>{t.resolved=Se(n,e),i?r.length=0:u(!0)})),p=M((e=>{o(t.errorComp)&&(t.error=!0,u(!0))})),h=t(d,p);return c(h)&&(f(h)?n(t.resolved)&&h.then(d,p):f(h.component)&&(h.component.then(d,p),o(h.error)&&(t.errorComp=Se(h.error,e)),o(h.loading)&&(t.loadingComp=Se(h.loading,e),0===h.delay?t.loading=!0:a=setTimeout((()=>{a=null,n(t.resolved)&&n(t.error)&&(t.loading=!0,u(!1))}),h.delay||200)),o(h.timeout)&&(l=setTimeout((()=>{l=null,n(t.resolved)&&p(null)}),h.timeout)))),i=!1,t.loading?t.loadingComp:t.resolved}}(p,d),void 0===s))return function(t,e,n,o,r){const s=lt();return s.asyncFactory=t,s.asyncMeta={data:e,context:n,children:o,tag:r},s}(p,i,a,l,u);i=i||{},Bn(s),o(i.model)&&function(t,n){const r=t.model&&t.model.prop||"value",s=t.model&&t.model.event||"input";(n.attrs||(n.attrs={}))[r]=n.model.value;const i=n.on||(n.on={}),c=i[s],a=n.model.callback;o(c)?(e(c)?-1===c.indexOf(a):c!==a)&&(i[s]=[a].concat(c)):i[s]=a}(s.options,i);const h=function(t,e,r){const s=e.options.props;if(n(s))return;const i={},{attrs:c,props:a}=t;if(o(c)||o(a))for(const t in s){const e=k(t);Jt(i,a,t,e,!0)||Jt(i,c,t,e,!1)}return i}(i,s);if(r(s.options.functional))return function(n,r,s,i,c){const a=n.options,l={},u=a.props;if(o(u))for(const e in u)l[e]=so(e,u,r||t);else o(s.attrs)&&Vn(l,s.attrs),o(s.props)&&Vn(l,s.props);const f=new Un(s,l,c,i,n),d=a.render.call(null,f._c,f);if(d instanceof at)return zn(d,s,f.parent,a);if(e(d)){const t=qt(d)||[],e=new Array(t.length);for(let n=0;n<t.length;n++)e[n]=zn(t[n],s,f.parent,a);return e}}(s,h,i,a,l);const m=i.on;if(i.on=i.nativeOn,r(s.options.abstract)){const t=i.slot;i={},t&&(i.slot=t)}!function(t){const e=t.hook||(t.hook={});for(let t=0;t<qn.length;t++){const n=qn[t],o=e[n],r=Jn[n];o===r||o&&o._merged||(e[n]=o?Zn(r,o):r)}}(i);const g=Kn(s.options)||u;return new at(`vue-component-${s.cid}${g?`-${g}`:""}`,i,void 0,void 0,void 0,a,{Ctor:s,propsData:h,listeners:m,tag:u,children:l},p)}function Zn(t,e){const n=(n,o)=>{t(n,o),e(n,o)};return n._merged=!0,n}let Gn=j;const Xn=F.optionMergeStrategies;function Yn(t,e){if(!e)return t;let n,o,r;const s=rt?Reflect.ownKeys(e):Object.keys(e);for(let i=0;i<s.length;i++)n=s[i],"__ob__"!==n&&(o=t[n],r=e[n],_(t,n)?o!==r&&l(o)&&l(r)&&Yn(o,r):Ot(t,n,r));return t}function Qn(t,e,n){return n?function(){const o=i(e)?e.call(n,n):e,r=i(t)?t.call(n,n):t;return o?Yn(o,r):r}:e?t?function(){return Yn(i(e)?e.call(this,this):e,i(t)?t.call(this,this):t)}:e:t}function to(t,n){const o=n?t?t.concat(n):e(n)?n:[n]:t;return o?function(t){const e=[];for(let n=0;n<t.length;n++)-1===e.indexOf(t[n])&&e.push(t[n]);return e}(o):o}function eo(t,e,n,o){const r=Object.create(t||null);return e?T(r,e):r}Xn.data=function(t,e,n){return n?Qn(t,e,n):e&&"function"!=typeof e?t:Qn(t,e)},R.forEach((t=>{Xn[t]=to})),L.forEach((function(t){Xn[t+"s"]=eo})),Xn.watch=function(t,n,o,r){if(t===Y&&(t=void 0),n===Y&&(n=void 0),!n)return Object.create(t||null);if(!t)return n;const s={};T(s,t);for(const t in n){let o=s[t];const r=n[t];o&&!e(o)&&(o=[o]),s[t]=o?o.concat(r):e(r)?r:[r]}return s},Xn.props=Xn.methods=Xn.inject=Xn.computed=function(t,e,n,o){if(!t)return e;const r=Object.create(null);return T(r,t),e&&T(r,e),r},Xn.provide=Qn;const no=function(t,e){return void 0===e?t:e};function oo(t,n,o){if(i(n)&&(n=n.options),function(t,n){const o=t.props;if(!o)return;const r={};let s,i,c;if(e(o))for(s=o.length;s--;)i=o[s],"string"==typeof i&&(c=w(i),r[c]={type:null});else if(l(o))for(const t in o)i=o[t],c=w(t),r[c]=l(i)?i:{type:i};t.props=r}(n),function(t,n){const o=t.inject;if(!o)return;const r=t.inject={};if(e(o))for(let t=0;t<o.length;t++)r[o[t]]={from:o[t]};else if(l(o))for(const t in o){const e=o[t];r[t]=l(e)?T({from:t},e):{from:e}}}(n),function(t){const e=t.directives;if(e)for(const t in e){const n=e[t];i(n)&&(e[t]={bind:n,update:n})}}(n),!n._base&&(n.extends&&(t=oo(t,n.extends,o)),n.mixins))for(let e=0,r=n.mixins.length;e<r;e++)t=oo(t,n.mixins[e],o);const r={};let s;for(s in t)c(s);for(s in n)_(t,s)||c(s);function c(e){const s=Xn[e]||no;r[e]=s(t[e],n[e],o,e)}return r}function ro(t,e,n,o){if("string"!=typeof n)return;const r=t[e];if(_(r,n))return r[n];const s=w(n);if(_(r,s))return r[s];const i=x(s);if(_(r,i))return r[i];return r[n]||r[s]||r[i]}function so(t,e,n,o){const r=e[t],s=!_(n,t);let c=n[t];const a=lo(Boolean,r.type);if(a>-1)if(s&&!_(r,"default"))c=!1;else if(""===c||c===k(t)){const t=lo(String,r.type);(t<0||a<t)&&(c=!0)}if(void 0===c){c=function(t,e,n){if(!_(e,"default"))return;const o=e.default;if(t&&t.$options.propsData&&void 0===t.$options.propsData[n]&&void 0!==t._props[n])return t._props[n];return i(o)&&"Function"!==co(e.type)?o.call(t):o}(o,r,t);const e=bt;wt(!0),kt(c),wt(e)}return c}const io=/^\s*function (\w+)/;function co(t){const e=t&&t.toString().match(io);return e?e[1]:""}function ao(t,e){return co(t)===co(e)}function lo(t,n){if(!e(n))return ao(n,t)?0:-1;for(let e=0,o=n.length;e<o;e++)if(ao(n[e],t))return e;return-1}function uo(t){this._init(t)}function fo(t){t.cid=0;let e=1;t.extend=function(t){t=t||{};const n=this,o=n.cid,r=t._Ctor||(t._Ctor={});if(r[o])return r[o];const s=Kn(t)||Kn(n.options),i=function(t){this._init(t)};return(i.prototype=Object.create(n.prototype)).constructor=i,i.cid=e++,i.options=oo(n.options,t),i.super=n,i.options.props&&function(t){const e=t.options.props;for(const n in e)Nn(t.prototype,"_props",n)}(i),i.options.computed&&function(t){const e=t.options.computed;for(const n in e)Mn(t.prototype,n,e[n])}(i),i.extend=n.extend,i.mixin=n.mixin,i.use=n.use,L.forEach((function(t){i[t]=n[t]})),s&&(i.options.components[s]=i),i.superOptions=n.options,i.extendOptions=t,i.sealedOptions=T({},i.options),r[o]=i,i}}function po(t){return t&&(Kn(t.Ctor.options)||t.tag)}function ho(t,n){return e(t)?t.indexOf(n)>-1:"string"==typeof t?t.split(",").indexOf(n)>-1:(o=t,"[object RegExp]"===a.call(o)&&t.test(n));var o}function mo(t,e){const{cache:n,keys:o,_vnode:r}=t;for(const t in n){const s=n[t];if(s){const i=s.name;i&&!e(i)&&go(n,t,o,r)}}}function go(t,e,n,o){const r=t[e];!r||o&&r.tag===o.tag||r.componentInstance.$destroy(),t[e]=null,v(n,e)}!function(e){e.prototype._init=function(e){const n=this;n._uid=Hn++,n._isVue=!0,n.__v_skip=!0,n._scope=new Qe(!0),n._scope._vm=!0,e&&e._isComponent?function(t,e){const n=t.$options=Object.create(t.constructor.options),o=e._parentVnode;n.parent=e.parent,n._parentVnode=o;const r=o.componentOptions;n.propsData=r.propsData,n._parentListeners=r.listeners,n._renderChildren=r.children,n._componentTag=r.tag,e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns)}(n,e):n.$options=oo(Bn(n.constructor),e||{},n),n._renderProxy=n,n._self=n,function(t){const e=t.$options;let n=e.parent;if(n&&!e.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(t)}t.$parent=n,t.$root=n?n.$root:t,t.$children=[],t.$refs={},t._provided=n?n._provided:Object.create(null),t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}(n),function(t){t._events=Object.create(null),t._hasHookEvent=!1;const e=t.$options._parentListeners;e&&Ee(t,e)}(n),function(e){e._vnode=null,e._staticTrees=null;const n=e.$options,o=e.$vnode=n._parentVnode,r=o&&o.context;e.$slots=pe(n._renderChildren,r),e.$scopedSlots=o?ge(e.$parent,o.data.scopedSlots,e.$slots):t,e._c=(t,n,o,r)=>Gt(e,t,n,o,r,!1),e.$createElement=(t,n,o,r)=>Gt(e,t,n,o,r,!0);const s=o&&o.data;St(e,"$attrs",s&&s.attrs||t,null,!0),St(e,"$listeners",n._parentListeners||t,null,!0)}(n),Le(n,"beforeCreate",void 0,!1),function(t){const e=Fn(t.$options.inject,t);e&&(wt(!1),Object.keys(e).forEach((n=>{St(t,n,e[n])})),wt(!0))}(n),Pn(n),function(t){const e=t.$options.provide;if(e){const n=i(e)?e.call(t):e;if(!c(n))return;const o=tn(t),r=rt?Reflect.ownKeys(n):Object.keys(n);for(let t=0;t<r.length;t++){const e=r[t];Object.defineProperty(o,e,Object.getOwnPropertyDescriptor(n,e))}}}(n),Le(n,"created"),n.$options.el&&n.$mount(n.$options.el)}}(uo),function(t){const e={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",n),t.prototype.$set=Ot,t.prototype.$delete=Tt,t.prototype.$watch=function(t,e,n){const o=this;if(l(e))return Rn(o,t,e,n);(n=n||{}).user=!0;const r=new jn(o,t,e,n);if(n.immediate){const t=`callback for immediate watcher "${r.expression}"`;mt(),nn(e,o,[r.value],o,t),gt()}return function(){r.teardown()}}}(uo),function(t){const n=/^hook:/;t.prototype.$on=function(t,o){const r=this;if(e(t))for(let e=0,n=t.length;e<n;e++)r.$on(t[e],o);else(r._events[t]||(r._events[t]=[])).push(o),n.test(t)&&(r._hasHookEvent=!0);return r},t.prototype.$once=function(t,e){const n=this;function o(){n.$off(t,o),e.apply(n,arguments)}return o.fn=e,n.$on(t,o),n},t.prototype.$off=function(t,n){const o=this;if(!arguments.length)return o._events=Object.create(null),o;if(e(t)){for(let e=0,r=t.length;e<r;e++)o.$off(t[e],n);return o}const r=o._events[t];if(!r)return o;if(!n)return o._events[t]=null,o;let s,i=r.length;for(;i--;)if(s=r[i],s===n||s.fn===n){r.splice(i,1);break}return o},t.prototype.$emit=function(t){const e=this;let n=e._events[t];if(n){n=n.length>1?O(n):n;const o=O(arguments,1),r=`event handler for "${t}"`;for(let t=0,s=n.length;t<s;t++)nn(n[t],e,o,e,r)}return e}}(uo),function(t){t.prototype._update=function(t,e){const n=this,o=n.$el,r=n._vnode,s=Pe(n);n._vnode=t,n.$el=r?n.__patch__(r,t):n.__patch__(n.$el,t,e,!1),s(),o&&(o.__vue__=null),n.$el&&(n.$el.__vue__=n);let i=n;for(;i&&i.$vnode&&i.$parent&&i.$vnode===i.$parent._vnode;)i.$parent.$el=i.$el,i=i.$parent},t.prototype.$forceUpdate=function(){const t=this;t._watcher&&t._watcher.update()},t.prototype.$destroy=function(){const t=this;if(t._isBeingDestroyed)return;Le(t,"beforeDestroy"),t._isBeingDestroyed=!0;const e=t.$parent;!e||e._isBeingDestroyed||t.$options.abstract||v(e.$children,t),t._scope.stop(),t._data.__ob__&&t._data.__ob__.vmCount--,t._isDestroyed=!0,t.__patch__(t._vnode,null),Le(t,"destroyed"),t.$off(),t.$el&&(t.$el.__vue__=null),t.$vnode&&(t.$vnode.parent=null)}}(uo),function(t){de(t.prototype),t.prototype.$nextTick=function(t){return fn(t,this)},t.prototype._render=function(){const t=this,{render:n,_parentVnode:o}=t.$options;let r;o&&t._isMounted&&(t.$scopedSlots=ge(t.$parent,o.data.scopedSlots,t.$slots,t.$scopedSlots),t._slotsProxy&&we(t._slotsProxy,t.$scopedSlots)),t.$vnode=o;try{ct(t),ke=t,r=n.call(t._renderProxy,t.$createElement)}catch(e){en(e,t,"render"),r=t._vnode}finally{ke=null,ct()}return e(r)&&1===r.length&&(r=r[0]),r instanceof at||(r=lt()),r.parent=o,r}}(uo);const vo=[String,RegExp,Array];var yo={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:vo,exclude:vo,max:[String,Number]},methods:{cacheVNode(){const{cache:t,keys:e,vnodeToCache:n,keyToCache:o}=this;if(n){const{tag:r,componentInstance:s,componentOptions:i}=n;t[o]={name:po(i),tag:r,componentInstance:s},e.push(o),this.max&&e.length>parseInt(this.max)&&go(t,e[0],e,this._vnode),this.vnodeToCache=null}}},created(){this.cache=Object.create(null),this.keys=[]},destroyed(){for(const t in this.cache)go(this.cache,t,this.keys)},mounted(){this.cacheVNode(),this.$watch("include",(t=>{mo(this,(e=>ho(t,e)))})),this.$watch("exclude",(t=>{mo(this,(e=>!ho(t,e)))}))},updated(){this.cacheVNode()},render(){const t=this.$slots.default,e=Oe(t),n=e&&e.componentOptions;if(n){const t=po(n),{include:o,exclude:r}=this;if(o&&(!t||!ho(o,t))||r&&t&&ho(r,t))return e;const{cache:s,keys:i}=this,c=null==e.key?n.Ctor.cid+(n.tag?`::${n.tag}`:""):e.key;s[c]?(e.componentInstance=s[c].componentInstance,v(i,c),i.push(c)):(this.vnodeToCache=e,this.keyToCache=c),e.data.keepAlive=!0}return e||t&&t[0]}}};!function(t){const e={get:()=>F};Object.defineProperty(t,"config",e),t.util={warn:Gn,extend:T,mergeOptions:oo,defineReactive:St},t.set=Ot,t.delete=Tt,t.nextTick=fn,t.observable=t=>(kt(t),t),t.options=Object.create(null),L.forEach((e=>{t.options[e+"s"]=Object.create(null)})),t.options._base=t,T(t.options.components,yo),function(t){t.use=function(t){const e=this._installedPlugins||(this._installedPlugins=[]);if(e.indexOf(t)>-1)return this;const n=O(arguments,1);return n.unshift(this),i(t.install)?t.install.apply(t,n):i(t)&&t.apply(null,n),e.push(t),this}}(t),function(t){t.mixin=function(t){return this.options=oo(this.options,t),this}}(t),fo(t),function(t){L.forEach((e=>{t[e]=function(t,n){return n?("component"===e&&l(n)&&(n.name=n.name||t,n=this.options._base.extend(n)),"directive"===e&&i(n)&&(n={bind:n,update:n}),this.options[e+"s"][t]=n,n):this.options[e+"s"][t]}}))}(t)}(uo),Object.defineProperty(uo.prototype,"$isServer",{get:et}),Object.defineProperty(uo.prototype,"$ssrContext",{get(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(uo,"FunctionalRenderContext",{value:Un}),uo.version="2.7.10";const _o=h("style,class"),$o=h("input,textarea,option,select,progress"),bo=(t,e,n)=>"value"===n&&$o(t)&&"button"!==e||"selected"===n&&"option"===t||"checked"===n&&"input"===t||"muted"===n&&"video"===t,wo=h("contenteditable,draggable,spellcheck"),xo=h("events,caret,typing,plaintext-only"),Co=h("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"),ko="http://www.w3.org/1999/xlink",So=t=>":"===t.charAt(5)&&"xlink"===t.slice(0,5),Oo=t=>So(t)?t.slice(6,t.length):"",To=t=>null==t||!1===t;function Ao(t){let e=t.data,n=t,r=t;for(;o(r.componentInstance);)r=r.componentInstance._vnode,r&&r.data&&(e=jo(r.data,e));for(;o(n=n.parent);)n&&n.data&&(e=jo(e,n.data));return function(t,e){if(o(t)||o(e))return Eo(t,No(e));return""}(e.staticClass,e.class)}function jo(t,e){return{staticClass:Eo(t.staticClass,e.staticClass),class:o(t.class)?[t.class,e.class]:e.class}}function Eo(t,e){return t?e?t+" "+e:t:e||""}function No(t){return Array.isArray(t)?function(t){let e,n="";for(let r=0,s=t.length;r<s;r++)o(e=No(t[r]))&&""!==e&&(n&&(n+=" "),n+=e);return n}(t):c(t)?function(t){let e="";for(const n in t)t[n]&&(e&&(e+=" "),e+=n);return e}(t):"string"==typeof t?t:""}const Po={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},Do=h("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),Mo=h("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Io=t=>Do(t)||Mo(t);function Lo(t){return Mo(t)?"svg":"math"===t?"math":void 0}const Ro=Object.create(null);const Fo=h("text,number,password,search,email,tel,url");function Ho(t){if("string"==typeof t){const e=document.querySelector(t);return e||document.createElement("div")}return t}var Bo=Object.freeze({__proto__:null,createElement:function(t,e){const n=document.createElement(t);return"select"!==t||e.data&&e.data.attrs&&void 0!==e.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n},createElementNS:function(t,e){return document.createElementNS(Po[t],e)},createTextNode:function(t){return document.createTextNode(t)},createComment:function(t){return document.createComment(t)},insertBefore:function(t,e,n){t.insertBefore(e,n)},removeChild:function(t,e){t.removeChild(e)},appendChild:function(t,e){t.appendChild(e)},parentNode:function(t){return t.parentNode},nextSibling:function(t){return t.nextSibling},tagName:function(t){return t.tagName},setTextContent:function(t,e){t.textContent=e},setStyleScope:function(t,e){t.setAttribute(e,"")}}),Uo={create(t,e){zo(e)},update(t,e){t.data.ref!==e.data.ref&&(zo(t,!0),zo(e))},destroy(t){zo(t,!0)}};function zo(t,n){const r=t.data.ref;if(!o(r))return;const s=t.context,c=t.componentInstance||t.elm,a=n?null:c,l=n?void 0:c;if(i(r))return void nn(r,s,[a],s,"template ref function");const u=t.data.refInFor,f="string"==typeof r||"number"==typeof r,d=Mt(r),p=s.$refs;if(f||d)if(u){const t=f?p[r]:r.value;n?e(t)&&v(t,c):e(t)?t.includes(c)||t.push(c):f?(p[r]=[c],Vo(s,r,p[r])):r.value=[c]}else if(f){if(n&&p[r]!==c)return;p[r]=l,Vo(s,r,a)}else if(d){if(n&&r.value!==c)return;r.value=a}}function Vo({_setupState:t},e,n){t&&_(t,e)&&(Mt(t[e])?t[e].value=n:t[e]=n)}const Ko=new at("",{},[]),Jo=["create","activate","update","remove","destroy"];function qo(t,e){return t.key===e.key&&t.asyncFactory===e.asyncFactory&&(t.tag===e.tag&&t.isComment===e.isComment&&o(t.data)===o(e.data)&&function(t,e){if("input"!==t.tag)return!0;let n;const r=o(n=t.data)&&o(n=n.attrs)&&n.type,s=o(n=e.data)&&o(n=n.attrs)&&n.type;return r===s||Fo(r)&&Fo(s)}(t,e)||r(t.isAsyncPlaceholder)&&n(e.asyncFactory.error))}function Wo(t,e,n){let r,s;const i={};for(r=e;r<=n;++r)s=t[r].key,o(s)&&(i[s]=r);return i}var Zo={create:Go,update:Go,destroy:function(t){Go(t,Ko)}};function Go(t,e){(t.data.directives||e.data.directives)&&function(t,e){const n=t===Ko,o=e===Ko,r=Yo(t.data.directives,t.context),s=Yo(e.data.directives,e.context),i=[],c=[];let a,l,u;for(a in s)l=r[a],u=s[a],l?(u.oldValue=l.value,u.oldArg=l.arg,tr(u,"update",e,t),u.def&&u.def.componentUpdated&&c.push(u)):(tr(u,"bind",e,t),u.def&&u.def.inserted&&i.push(u));if(i.length){const o=()=>{for(let n=0;n<i.length;n++)tr(i[n],"inserted",e,t)};n?Kt(e,"insert",o):o()}c.length&&Kt(e,"postpatch",(()=>{for(let n=0;n<c.length;n++)tr(c[n],"componentUpdated",e,t)}));if(!n)for(a in r)s[a]||tr(r[a],"unbind",t,t,o)}(t,e)}const Xo=Object.create(null);function Yo(t,e){const n=Object.create(null);if(!t)return n;let o,r;for(o=0;o<t.length;o++){if(r=t[o],r.modifiers||(r.modifiers=Xo),n[Qo(r)]=r,e._setupState&&e._setupState.__sfc){const t=r.def||ro(e,"_setupState","v-"+r.name);r.def="function"==typeof t?{bind:t,update:t}:t}r.def=r.def||ro(e.$options,"directives",r.name)}return n}function Qo(t){return t.rawName||`${t.name}.${Object.keys(t.modifiers||{}).join(".")}`}function tr(t,e,n,o,r){const s=t.def&&t.def[e];if(s)try{s(n.elm,t,n,o,r)}catch(o){en(o,n.context,`directive ${t.name} ${e} hook`)}}var er=[Uo,Zo];function nr(t,e){const s=e.componentOptions;if(o(s)&&!1===s.Ctor.options.inheritAttrs)return;if(n(t.data.attrs)&&n(e.data.attrs))return;let i,c,a;const l=e.elm,u=t.data.attrs||{};let f=e.data.attrs||{};for(i in(o(f.__ob__)||r(f._v_attr_proxy))&&(f=e.data.attrs=T({},f)),f)c=f[i],a=u[i],a!==c&&or(l,i,c,e.data.pre);for(i in(q||Z)&&f.value!==u.value&&or(l,"value",f.value),u)n(f[i])&&(So(i)?l.removeAttributeNS(ko,Oo(i)):wo(i)||l.removeAttribute(i))}function or(t,e,n,o){o||t.tagName.indexOf("-")>-1?rr(t,e,n):Co(e)?To(n)?t.removeAttribute(e):(n="allowfullscreen"===e&&"EMBED"===t.tagName?"true":e,t.setAttribute(e,n)):wo(e)?t.setAttribute(e,((t,e)=>To(e)||"false"===e?"false":"contenteditable"===t&&xo(e)?e:"true")(e,n)):So(e)?To(n)?t.removeAttributeNS(ko,Oo(e)):t.setAttributeNS(ko,e,n):rr(t,e,n)}function rr(t,e,n){if(To(n))t.removeAttribute(e);else{if(q&&!W&&"TEXTAREA"===t.tagName&&"placeholder"===e&&""!==n&&!t.__ieph){const e=n=>{n.stopImmediatePropagation(),t.removeEventListener("input",e)};t.addEventListener("input",e),t.__ieph=!0}t.setAttribute(e,n)}}var sr={create:nr,update:nr};function ir(t,e){const r=e.elm,s=e.data,i=t.data;if(n(s.staticClass)&&n(s.class)&&(n(i)||n(i.staticClass)&&n(i.class)))return;let c=Ao(e);const a=r._transitionClasses;o(a)&&(c=Eo(c,No(a))),c!==r._prevClass&&(r.setAttribute("class",c),r._prevClass=c)}var cr={create:ir,update:ir};const ar=/[\w).+\-_$\]]/;function lr(t){let e,n,o,r,s,i=!1,c=!1,a=!1,l=!1,u=0,f=0,d=0,p=0;for(o=0;o<t.length;o++)if(n=e,e=t.charCodeAt(o),i)39===e&&92!==n&&(i=!1);else if(c)34===e&&92!==n&&(c=!1);else if(a)96===e&&92!==n&&(a=!1);else if(l)47===e&&92!==n&&(l=!1);else if(124!==e||124===t.charCodeAt(o+1)||124===t.charCodeAt(o-1)||u||f||d){switch(e){case 34:c=!0;break;case 39:i=!0;break;case 96:a=!0;break;case 40:d++;break;case 41:d--;break;case 91:f++;break;case 93:f--;break;case 123:u++;break;case 125:u--}if(47===e){let e,n=o-1;for(;n>=0&&(e=t.charAt(n)," "===e);n--);e&&ar.test(e)||(l=!0)}}else void 0===r?(p=o+1,r=t.slice(0,o).trim()):h();function h(){(s||(s=[])).push(t.slice(p,o).trim()),p=o+1}if(void 0===r?r=t.slice(0,o).trim():0!==p&&h(),s)for(o=0;o<s.length;o++)r=ur(r,s[o]);return r}function ur(t,e){const n=e.indexOf("(");if(n<0)return`_f("${e}")(${t})`;{const o=e.slice(0,n),r=e.slice(n+1);return`_f("${o}")(${t}${")"!==r?","+r:r}`}}function fr(t,e){console.error(`[Vue compiler]: ${t}`)}function dr(t,e){return t?t.map((t=>t[e])).filter((t=>t)):[]}function pr(t,e,n,o,r){(t.props||(t.props=[])).push(wr({name:e,value:n,dynamic:r},o)),t.plain=!1}function hr(t,e,n,o,r){(r?t.dynamicAttrs||(t.dynamicAttrs=[]):t.attrs||(t.attrs=[])).push(wr({name:e,value:n,dynamic:r},o)),t.plain=!1}function mr(t,e,n,o){t.attrsMap[e]=n,t.attrsList.push(wr({name:e,value:n},o))}function gr(t,e,n,o,r,s,i,c){(t.directives||(t.directives=[])).push(wr({name:e,rawName:n,value:o,arg:r,isDynamicArg:s,modifiers:i},c)),t.plain=!1}function vr(t,e,n){return n?`_p(${e},"${t}")`:t+e}function yr(e,n,o,r,s,i,c,a){let l;(r=r||t).right?a?n=`(${n})==='click'?'contextmenu':(${n})`:"click"===n&&(n="contextmenu",delete r.right):r.middle&&(a?n=`(${n})==='click'?'mouseup':(${n})`:"click"===n&&(n="mouseup")),r.capture&&(delete r.capture,n=vr("!",n,a)),r.once&&(delete r.once,n=vr("~",n,a)),r.passive&&(delete r.passive,n=vr("&",n,a)),r.native?(delete r.native,l=e.nativeEvents||(e.nativeEvents={})):l=e.events||(e.events={});const u=wr({value:o.trim(),dynamic:a},c);r!==t&&(u.modifiers=r);const f=l[n];Array.isArray(f)?s?f.unshift(u):f.push(u):l[n]=f?s?[u,f]:[f,u]:u,e.plain=!1}function _r(t,e,n){const o=$r(t,":"+e)||$r(t,"v-bind:"+e);if(null!=o)return lr(o);if(!1!==n){const n=$r(t,e);if(null!=n)return JSON.stringify(n)}}function $r(t,e,n){let o;if(null!=(o=t.attrsMap[e])){const n=t.attrsList;for(let t=0,o=n.length;t<o;t++)if(n[t].name===e){n.splice(t,1);break}}return n&&delete t.attrsMap[e],o}function br(t,e){const n=t.attrsList;for(let t=0,o=n.length;t<o;t++){const o=n[t];if(e.test(o.name))return n.splice(t,1),o}}function wr(t,e){return e&&(null!=e.start&&(t.start=e.start),null!=e.end&&(t.end=e.end)),t}function xr(t,e,n){const{number:o,trim:r}=n||{},s="$$v";let i=s;r&&(i="(typeof $$v === 'string'? $$v.trim(): $$v)"),o&&(i=`_n(${i})`);const c=Cr(e,i);t.model={value:`(${e})`,expression:JSON.stringify(e),callback:`function ($$v) {${c}}`}}function Cr(t,e){const n=function(t){if(t=t.trim(),kr=t.length,t.indexOf("[")<0||t.lastIndexOf("]")<kr-1)return Tr=t.lastIndexOf("."),Tr>-1?{exp:t.slice(0,Tr),key:'"'+t.slice(Tr+1)+'"'}:{exp:t,key:null};Sr=t,Tr=Ar=jr=0;for(;!Nr();)Or=Er(),Pr(Or)?Mr(Or):91===Or&&Dr(Or);return{exp:t.slice(0,Ar),key:t.slice(Ar+1,jr)}}(t);return null===n.key?`${t}=${e}`:`$set(${n.exp}, ${n.key}, ${e})`}let kr,Sr,Or,Tr,Ar,jr;function Er(){return Sr.charCodeAt(++Tr)}function Nr(){return Tr>=kr}function Pr(t){return 34===t||39===t}function Dr(t){let e=1;for(Ar=Tr;!Nr();)if(Pr(t=Er()))Mr(t);else if(91===t&&e++,93===t&&e--,0===e){jr=Tr;break}}function Mr(t){const e=t;for(;!Nr()&&(t=Er())!==e;);}let Ir;function Lr(t,e,n){const o=Ir;return function r(){const s=e.apply(null,arguments);null!==s&&Hr(t,r,n,o)}}const Rr=sn&&!(X&&Number(X[1])<=53);function Fr(t,e,n,o){if(Rr){const t=Ve,n=e;e=n._wrapper=function(e){if(e.target===e.currentTarget||e.timeStamp>=t||e.timeStamp<=0||e.target.ownerDocument!==document)return n.apply(this,arguments)}}Ir.addEventListener(t,e,tt?{capture:n,passive:o}:n)}function Hr(t,e,n,o){(o||Ir).removeEventListener(t,e._wrapper||e,n)}function Br(t,e){if(n(t.data.on)&&n(e.data.on))return;const r=e.data.on||{},s=t.data.on||{};Ir=e.elm||t.elm,function(t){if(o(t.__r)){const e=q?"change":"input";t[e]=[].concat(t.__r,t[e]||[]),delete t.__r}o(t.__c)&&(t.change=[].concat(t.__c,t.change||[]),delete t.__c)}(r),Vt(r,s,Fr,Hr,Lr,e.context),Ir=void 0}var Ur={create:Br,update:Br,destroy:t=>Br(t,Ko)};let zr;function Vr(t,e){if(n(t.data.domProps)&&n(e.data.domProps))return;let s,i;const c=e.elm,a=t.data.domProps||{};let l=e.data.domProps||{};for(s in(o(l.__ob__)||r(l._v_attr_proxy))&&(l=e.data.domProps=T({},l)),a)s in l||(c[s]="");for(s in l){if(i=l[s],"textContent"===s||"innerHTML"===s){if(e.children&&(e.children.length=0),i===a[s])continue;1===c.childNodes.length&&c.removeChild(c.childNodes[0])}if("value"===s&&"PROGRESS"!==c.tagName){c._value=i;const t=n(i)?"":String(i);Kr(c,t)&&(c.value=t)}else if("innerHTML"===s&&Mo(c.tagName)&&n(c.innerHTML)){zr=zr||document.createElement("div"),zr.innerHTML=`<svg>${i}</svg>`;const t=zr.firstChild;for(;c.firstChild;)c.removeChild(c.firstChild);for(;t.firstChild;)c.appendChild(t.firstChild)}else if(i!==a[s])try{c[s]=i}catch(t){}}}function Kr(t,e){return!t.composing&&("OPTION"===t.tagName||function(t,e){let n=!0;try{n=document.activeElement!==t}catch(t){}return n&&t.value!==e}(t,e)||function(t,e){const n=t.value,r=t._vModifiers;if(o(r)){if(r.number)return p(n)!==p(e);if(r.trim)return n.trim()!==e.trim()}return n!==e}(t,e))}var Jr={create:Vr,update:Vr};const qr=$((function(t){const e={},n=/:(.+)/;return t.split(/;(?![^(]*\))/g).forEach((function(t){if(t){const o=t.split(n);o.length>1&&(e[o[0].trim()]=o[1].trim())}})),e}));function Wr(t){const e=Zr(t.style);return t.staticStyle?T(t.staticStyle,e):e}function Zr(t){return Array.isArray(t)?A(t):"string"==typeof t?qr(t):t}const Gr=/^--/,Xr=/\s*!important$/,Yr=(t,e,n)=>{if(Gr.test(e))t.style.setProperty(e,n);else if(Xr.test(n))t.style.setProperty(k(e),n.replace(Xr,""),"important");else{const o=es(e);if(Array.isArray(n))for(let e=0,r=n.length;e<r;e++)t.style[o]=n[e];else t.style[o]=n}},Qr=["Webkit","Moz","ms"];let ts;const es=$((function(t){if(ts=ts||document.createElement("div").style,"filter"!==(t=w(t))&&t in ts)return t;const e=t.charAt(0).toUpperCase()+t.slice(1);for(let t=0;t<Qr.length;t++){const n=Qr[t]+e;if(n in ts)return n}}));function ns(t,e){const r=e.data,s=t.data;if(n(r.staticStyle)&&n(r.style)&&n(s.staticStyle)&&n(s.style))return;let i,c;const a=e.elm,l=s.staticStyle,u=s.normalizedStyle||s.style||{},f=l||u,d=Zr(e.data.style)||{};e.data.normalizedStyle=o(d.__ob__)?T({},d):d;const p=function(t,e){const n={};let o;if(e){let e=t;for(;e.componentInstance;)e=e.componentInstance._vnode,e&&e.data&&(o=Wr(e.data))&&T(n,o)}(o=Wr(t.data))&&T(n,o);let r=t;for(;r=r.parent;)r.data&&(o=Wr(r.data))&&T(n,o);return n}(e,!0);for(c in f)n(p[c])&&Yr(a,c,"");for(c in p)i=p[c],i!==f[c]&&Yr(a,c,null==i?"":i)}var os={create:ns,update:ns};const rs=/\s+/;function ss(t,e){if(e&&(e=e.trim()))if(t.classList)e.indexOf(" ")>-1?e.split(rs).forEach((e=>t.classList.add(e))):t.classList.add(e);else{const n=` ${t.getAttribute("class")||""} `;n.indexOf(" "+e+" ")<0&&t.setAttribute("class",(n+e).trim())}}function is(t,e){if(e&&(e=e.trim()))if(t.classList)e.indexOf(" ")>-1?e.split(rs).forEach((e=>t.classList.remove(e))):t.classList.remove(e),t.classList.length||t.removeAttribute("class");else{let n=` ${t.getAttribute("class")||""} `;const o=" "+e+" ";for(;n.indexOf(o)>=0;)n=n.replace(o," ");n=n.trim(),n?t.setAttribute("class",n):t.removeAttribute("class")}}function cs(t){if(t){if("object"==typeof t){const e={};return!1!==t.css&&T(e,as(t.name||"v")),T(e,t),e}return"string"==typeof t?as(t):void 0}}const as=$((t=>({enterClass:`${t}-enter`,enterToClass:`${t}-enter-to`,enterActiveClass:`${t}-enter-active`,leaveClass:`${t}-leave`,leaveToClass:`${t}-leave-to`,leaveActiveClass:`${t}-leave-active`}))),ls=K&&!W;let us="transition",fs="transitionend",ds="animation",ps="animationend";ls&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(us="WebkitTransition",fs="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(ds="WebkitAnimation",ps="webkitAnimationEnd"));const hs=K?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:t=>t();function ms(t){hs((()=>{hs(t)}))}function gs(t,e){const n=t._transitionClasses||(t._transitionClasses=[]);n.indexOf(e)<0&&(n.push(e),ss(t,e))}function vs(t,e){t._transitionClasses&&v(t._transitionClasses,e),is(t,e)}function ys(t,e,n){const{type:o,timeout:r,propCount:s}=$s(t,e);if(!o)return n();const i="transition"===o?fs:ps;let c=0;const a=()=>{t.removeEventListener(i,l),n()},l=e=>{e.target===t&&++c>=s&&a()};setTimeout((()=>{c<s&&a()}),r+1),t.addEventListener(i,l)}const _s=/\b(transform|all)(,|$)/;function $s(t,e){const n=window.getComputedStyle(t),o=(n[us+"Delay"]||"").split(", "),r=(n[us+"Duration"]||"").split(", "),s=bs(o,r),i=(n[ds+"Delay"]||"").split(", "),c=(n[ds+"Duration"]||"").split(", "),a=bs(i,c);let l,u=0,f=0;"transition"===e?s>0&&(l="transition",u=s,f=r.length):"animation"===e?a>0&&(l="animation",u=a,f=c.length):(u=Math.max(s,a),l=u>0?s>a?"transition":"animation":null,f=l?"transition"===l?r.length:c.length:0);return{type:l,timeout:u,propCount:f,hasTransform:"transition"===l&&_s.test(n[us+"Property"])}}function bs(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map(((e,n)=>ws(e)+ws(t[n]))))}function ws(t){return 1e3*Number(t.slice(0,-1).replace(",","."))}function xs(t,e){const r=t.elm;o(r._leaveCb)&&(r._leaveCb.cancelled=!0,r._leaveCb());const s=cs(t.data.transition);if(n(s))return;if(o(r._enterCb)||1!==r.nodeType)return;const{css:a,type:l,enterClass:u,enterToClass:f,enterActiveClass:d,appearClass:h,appearToClass:m,appearActiveClass:g,beforeEnter:v,enter:y,afterEnter:_,enterCancelled:$,beforeAppear:b,appear:w,afterAppear:x,appearCancelled:C,duration:k}=s;let S=Ne,O=Ne.$vnode;for(;O&&O.parent;)S=O.context,O=O.parent;const T=!S._isMounted||!t.isRootInsert;if(T&&!w&&""!==w)return;const A=T&&h?h:u,j=T&&g?g:d,E=T&&m?m:f,N=T&&b||v,P=T&&i(w)?w:y,D=T&&x||_,I=T&&C||$,L=p(c(k)?k.enter:k),R=!1!==a&&!W,F=Ss(P),H=r._enterCb=M((()=>{R&&(vs(r,E),vs(r,j)),H.cancelled?(R&&vs(r,A),I&&I(r)):D&&D(r),r._enterCb=null}));t.data.show||Kt(t,"insert",(()=>{const e=r.parentNode,n=e&&e._pending&&e._pending[t.key];n&&n.tag===t.tag&&n.elm._leaveCb&&n.elm._leaveCb(),P&&P(r,H)})),N&&N(r),R&&(gs(r,A),gs(r,j),ms((()=>{vs(r,A),H.cancelled||(gs(r,E),F||(ks(L)?setTimeout(H,L):ys(r,l,H)))}))),t.data.show&&(e&&e(),P&&P(r,H)),R||F||H()}function Cs(t,e){const r=t.elm;o(r._enterCb)&&(r._enterCb.cancelled=!0,r._enterCb());const s=cs(t.data.transition);if(n(s)||1!==r.nodeType)return e();if(o(r._leaveCb))return;const{css:i,type:a,leaveClass:l,leaveToClass:u,leaveActiveClass:f,beforeLeave:d,leave:h,afterLeave:m,leaveCancelled:g,delayLeave:v,duration:y}=s,_=!1!==i&&!W,$=Ss(h),b=p(c(y)?y.leave:y),w=r._leaveCb=M((()=>{r.parentNode&&r.parentNode._pending&&(r.parentNode._pending[t.key]=null),_&&(vs(r,u),vs(r,f)),w.cancelled?(_&&vs(r,l),g&&g(r)):(e(),m&&m(r)),r._leaveCb=null}));function x(){w.cancelled||(!t.data.show&&r.parentNode&&((r.parentNode._pending||(r.parentNode._pending={}))[t.key]=t),d&&d(r),_&&(gs(r,l),gs(r,f),ms((()=>{vs(r,l),w.cancelled||(gs(r,u),$||(ks(b)?setTimeout(w,b):ys(r,a,w)))}))),h&&h(r,w),_||$||w())}v?v(x):x()}function ks(t){return"number"==typeof t&&!isNaN(t)}function Ss(t){if(n(t))return!1;const e=t.fns;return o(e)?Ss(Array.isArray(e)?e[0]:e):(t._length||t.length)>1}function Os(t,e){!0!==e.data.show&&xs(e)}const Ts=function(t){let i,c;const a={},{modules:l,nodeOps:u}=t;for(i=0;i<Jo.length;++i)for(a[Jo[i]]=[],c=0;c<l.length;++c)o(l[c][Jo[i]])&&a[Jo[i]].push(l[c][Jo[i]]);function f(t){const e=u.parentNode(t);o(e)&&u.removeChild(e,t)}function d(t,e,n,s,i,c,l){if(o(t.elm)&&o(c)&&(t=c[l]=ft(t)),t.isRootInsert=!i,function(t,e,n,s){let i=t.data;if(o(i)){const c=o(t.componentInstance)&&i.keepAlive;if(o(i=i.hook)&&o(i=i.init)&&i(t,!1),o(t.componentInstance))return p(t,e),m(n,t.elm,s),r(c)&&function(t,e,n,r){let s,i=t;for(;i.componentInstance;)if(i=i.componentInstance._vnode,o(s=i.data)&&o(s=s.transition)){for(s=0;s<a.activate.length;++s)a.activate[s](Ko,i);e.push(i);break}m(n,t.elm,r)}(t,e,n,s),!0}}(t,e,n,s))return;const f=t.data,d=t.children,h=t.tag;o(h)?(t.elm=t.ns?u.createElementNS(t.ns,h):u.createElement(h,t),_(t),g(t,d,e),o(f)&&y(t,e),m(n,t.elm,s)):r(t.isComment)?(t.elm=u.createComment(t.text),m(n,t.elm,s)):(t.elm=u.createTextNode(t.text),m(n,t.elm,s))}function p(t,e){o(t.data.pendingInsert)&&(e.push.apply(e,t.data.pendingInsert),t.data.pendingInsert=null),t.elm=t.componentInstance.$el,v(t)?(y(t,e),_(t)):(zo(t),e.push(t))}function m(t,e,n){o(t)&&(o(n)?u.parentNode(n)===t&&u.insertBefore(t,e,n):u.appendChild(t,e))}function g(t,n,o){if(e(n))for(let e=0;e<n.length;++e)d(n[e],o,t.elm,null,!0,n,e);else s(t.text)&&u.appendChild(t.elm,u.createTextNode(String(t.text)))}function v(t){for(;t.componentInstance;)t=t.componentInstance._vnode;return o(t.tag)}function y(t,e){for(let e=0;e<a.create.length;++e)a.create[e](Ko,t);i=t.data.hook,o(i)&&(o(i.create)&&i.create(Ko,t),o(i.insert)&&e.push(t))}function _(t){let e;if(o(e=t.fnScopeId))u.setStyleScope(t.elm,e);else{let n=t;for(;n;)o(e=n.context)&&o(e=e.$options._scopeId)&&u.setStyleScope(t.elm,e),n=n.parent}o(e=Ne)&&e!==t.context&&e!==t.fnContext&&o(e=e.$options._scopeId)&&u.setStyleScope(t.elm,e)}function $(t,e,n,o,r,s){for(;o<=r;++o)d(n[o],s,t,e,!1,n,o)}function b(t){let e,n;const r=t.data;if(o(r))for(o(e=r.hook)&&o(e=e.destroy)&&e(t),e=0;e<a.destroy.length;++e)a.destroy[e](t);if(o(e=t.children))for(n=0;n<t.children.length;++n)b(t.children[n])}function w(t,e,n){for(;e<=n;++e){const n=t[e];o(n)&&(o(n.tag)?(x(n),b(n)):f(n.elm))}}function x(t,e){if(o(e)||o(t.data)){let n;const r=a.remove.length+1;for(o(e)?e.listeners+=r:e=function(t,e){function n(){0==--n.listeners&&f(t)}return n.listeners=e,n}(t.elm,r),o(n=t.componentInstance)&&o(n=n._vnode)&&o(n.data)&&x(n,e),n=0;n<a.remove.length;++n)a.remove[n](t,e);o(n=t.data.hook)&&o(n=n.remove)?n(t,e):e()}else f(t.elm)}function C(t,e,n,r){for(let s=n;s<r;s++){const n=e[s];if(o(n)&&qo(t,n))return s}}function k(t,e,s,i,c,l){if(t===e)return;o(e.elm)&&o(i)&&(e=i[c]=ft(e));const f=e.elm=t.elm;if(r(t.isAsyncPlaceholder))return void(o(e.asyncFactory.resolved)?T(t.elm,e,s):e.isAsyncPlaceholder=!0);if(r(e.isStatic)&&r(t.isStatic)&&e.key===t.key&&(r(e.isCloned)||r(e.isOnce)))return void(e.componentInstance=t.componentInstance);let p;const h=e.data;o(h)&&o(p=h.hook)&&o(p=p.prepatch)&&p(t,e);const m=t.children,g=e.children;if(o(h)&&v(e)){for(p=0;p<a.update.length;++p)a.update[p](t,e);o(p=h.hook)&&o(p=p.update)&&p(t,e)}n(e.text)?o(m)&&o(g)?m!==g&&function(t,e,r,s,i){let c,a,l,f,p=0,h=0,m=e.length-1,g=e[0],v=e[m],y=r.length-1,_=r[0],b=r[y];const x=!i;for(;p<=m&&h<=y;)n(g)?g=e[++p]:n(v)?v=e[--m]:qo(g,_)?(k(g,_,s,r,h),g=e[++p],_=r[++h]):qo(v,b)?(k(v,b,s,r,y),v=e[--m],b=r[--y]):qo(g,b)?(k(g,b,s,r,y),x&&u.insertBefore(t,g.elm,u.nextSibling(v.elm)),g=e[++p],b=r[--y]):qo(v,_)?(k(v,_,s,r,h),x&&u.insertBefore(t,v.elm,g.elm),v=e[--m],_=r[++h]):(n(c)&&(c=Wo(e,p,m)),a=o(_.key)?c[_.key]:C(_,e,p,m),n(a)?d(_,s,t,g.elm,!1,r,h):(l=e[a],qo(l,_)?(k(l,_,s,r,h),e[a]=void 0,x&&u.insertBefore(t,l.elm,g.elm)):d(_,s,t,g.elm,!1,r,h)),_=r[++h]);p>m?(f=n(r[y+1])?null:r[y+1].elm,$(t,f,r,h,y,s)):h>y&&w(e,p,m)}(f,m,g,s,l):o(g)?(o(t.text)&&u.setTextContent(f,""),$(f,null,g,0,g.length-1,s)):o(m)?w(m,0,m.length-1):o(t.text)&&u.setTextContent(f,""):t.text!==e.text&&u.setTextContent(f,e.text),o(h)&&o(p=h.hook)&&o(p=p.postpatch)&&p(t,e)}function S(t,e,n){if(r(n)&&o(t.parent))t.parent.data.pendingInsert=e;else for(let t=0;t<e.length;++t)e[t].data.hook.insert(e[t])}const O=h("attrs,class,staticClass,staticStyle,key");function T(t,e,n,s){let i;const{tag:c,data:a,children:l}=e;if(s=s||a&&a.pre,e.elm=t,r(e.isComment)&&o(e.asyncFactory))return e.isAsyncPlaceholder=!0,!0;if(o(a)&&(o(i=a.hook)&&o(i=i.init)&&i(e,!0),o(i=e.componentInstance)))return p(e,n),!0;if(o(c)){if(o(l))if(t.hasChildNodes())if(o(i=a)&&o(i=i.domProps)&&o(i=i.innerHTML)){if(i!==t.innerHTML)return!1}else{let e=!0,o=t.firstChild;for(let t=0;t<l.length;t++){if(!o||!T(o,l[t],n,s)){e=!1;break}o=o.nextSibling}if(!e||o)return!1}else g(e,l,n);if(o(a)){let t=!1;for(const o in a)if(!O(o)){t=!0,y(e,n);break}!t&&a.class&&On(a.class)}}else t.data!==e.text&&(t.data=e.text);return!0}return function(t,e,s,i){if(n(e))return void(o(t)&&b(t));let c=!1;const l=[];if(n(t))c=!0,d(e,l);else{const n=o(t.nodeType);if(!n&&qo(t,e))k(t,e,l,null,null,i);else{if(n){if(1===t.nodeType&&t.hasAttribute("data-server-rendered")&&(t.removeAttribute("data-server-rendered"),s=!0),r(s)&&T(t,e,l))return S(e,l,!0),t;f=t,t=new at(u.tagName(f).toLowerCase(),{},[],void 0,f)}const i=t.elm,c=u.parentNode(i);if(d(e,l,i._leaveCb?null:c,u.nextSibling(i)),o(e.parent)){let t=e.parent;const n=v(e);for(;t;){for(let e=0;e<a.destroy.length;++e)a.destroy[e](t);if(t.elm=e.elm,n){for(let e=0;e<a.create.length;++e)a.create[e](Ko,t);const e=t.data.hook.insert;if(e.merged)for(let t=1;t<e.fns.length;t++)e.fns[t]()}else zo(t);t=t.parent}}o(c)?w([t],0,0):o(t.tag)&&b(t)}}var f;return S(e,l,c),e.elm}}({nodeOps:Bo,modules:[sr,cr,Ur,Jr,os,K?{create:Os,activate:Os,remove(t,e){!0!==t.data.show?Cs(t,e):e()}}:{}].concat(er)});W&&document.addEventListener("selectionchange",(()=>{const t=document.activeElement;t&&t.vmodel&&Is(t,"input")}));const As={inserted(t,e,n,o){"select"===n.tag?(o.elm&&!o.elm._vOptions?Kt(n,"postpatch",(()=>{As.componentUpdated(t,e,n)})):js(t,e,n.context),t._vOptions=[].map.call(t.options,Ps)):("textarea"===n.tag||Fo(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("compositionstart",Ds),t.addEventListener("compositionend",Ms),t.addEventListener("change",Ms),W&&(t.vmodel=!0)))},componentUpdated(t,e,n){if("select"===n.tag){js(t,e,n.context);const o=t._vOptions,r=t._vOptions=[].map.call(t.options,Ps);if(r.some(((t,e)=>!P(t,o[e])))){(t.multiple?e.value.some((t=>Ns(t,r))):e.value!==e.oldValue&&Ns(e.value,r))&&Is(t,"change")}}}};function js(t,e,n){Es(t,e),(q||Z)&&setTimeout((()=>{Es(t,e)}),0)}function Es(t,e,n){const o=e.value,r=t.multiple;if(r&&!Array.isArray(o))return;let s,i;for(let e=0,n=t.options.length;e<n;e++)if(i=t.options[e],r)s=D(o,Ps(i))>-1,i.selected!==s&&(i.selected=s);else if(P(Ps(i),o))return void(t.selectedIndex!==e&&(t.selectedIndex=e));r||(t.selectedIndex=-1)}function Ns(t,e){return e.every((e=>!P(e,t)))}function Ps(t){return"_value"in t?t._value:t.value}function Ds(t){t.target.composing=!0}function Ms(t){t.target.composing&&(t.target.composing=!1,Is(t.target,"input"))}function Is(t,e){const n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)}function Ls(t){return!t.componentInstance||t.data&&t.data.transition?t:Ls(t.componentInstance._vnode)}var Rs={bind(t,{value:e},n){const o=(n=Ls(n)).data&&n.data.transition,r=t.__vOriginalDisplay="none"===t.style.display?"":t.style.display;e&&o?(n.data.show=!0,xs(n,(()=>{t.style.display=r}))):t.style.display=e?r:"none"},update(t,{value:e,oldValue:n},o){if(!e==!n)return;(o=Ls(o)).data&&o.data.transition?(o.data.show=!0,e?xs(o,(()=>{t.style.display=t.__vOriginalDisplay})):Cs(o,(()=>{t.style.display="none"}))):t.style.display=e?t.__vOriginalDisplay:"none"},unbind(t,e,n,o,r){r||(t.style.display=t.__vOriginalDisplay)}},Fs={model:As,show:Rs};const Hs={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function Bs(t){const e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?Bs(Oe(e.children)):t}function Us(t){const e={},n=t.$options;for(const o in n.propsData)e[o]=t[o];const o=n._parentListeners;for(const t in o)e[w(t)]=o[t];return e}function zs(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}const Vs=t=>t.tag||me(t),Ks=t=>"show"===t.name;var Js={name:"transition",props:Hs,abstract:!0,render(t){let e=this.$slots.default;if(!e)return;if(e=e.filter(Vs),!e.length)return;const n=this.mode,o=e[0];if(function(t){for(;t=t.parent;)if(t.data.transition)return!0}(this.$vnode))return o;const r=Bs(o);if(!r)return o;if(this._leaving)return zs(t,o);const i=`__transition-${this._uid}-`;r.key=null==r.key?r.isComment?i+"comment":i+r.tag:s(r.key)?0===String(r.key).indexOf(i)?r.key:i+r.key:r.key;const c=(r.data||(r.data={})).transition=Us(this),a=this._vnode,l=Bs(a);if(r.data.directives&&r.data.directives.some(Ks)&&(r.data.show=!0),l&&l.data&&!function(t,e){return e.key===t.key&&e.tag===t.tag}(r,l)&&!me(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){const e=l.data.transition=T({},c);if("out-in"===n)return this._leaving=!0,Kt(e,"afterLeave",(()=>{this._leaving=!1,this.$forceUpdate()})),zs(t,o);if("in-out"===n){if(me(r))return a;let t;const n=()=>{t()};Kt(c,"afterEnter",n),Kt(c,"enterCancelled",n),Kt(e,"delayLeave",(e=>{t=e}))}}return o}};const qs=T({tag:String,moveClass:String},Hs);delete qs.mode;var Ws={props:qs,beforeMount(){const t=this._update;this._update=(e,n)=>{const o=Pe(this);this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept,o(),t.call(this,e,n)}},render(t){const e=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),o=this.prevChildren=this.children,r=this.$slots.default||[],s=this.children=[],i=Us(this);for(let t=0;t<r.length;t++){const e=r[t];e.tag&&null!=e.key&&0!==String(e.key).indexOf("__vlist")&&(s.push(e),n[e.key]=e,(e.data||(e.data={})).transition=i)}if(o){const r=[],s=[];for(let t=0;t<o.length;t++){const e=o[t];e.data.transition=i,e.data.pos=e.elm.getBoundingClientRect(),n[e.key]?r.push(e):s.push(e)}this.kept=t(e,null,r),this.removed=s}return t(e,null,s)},updated(){const t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";t.length&&this.hasMove(t[0].elm,e)&&(t.forEach(Zs),t.forEach(Gs),t.forEach(Xs),this._reflow=document.body.offsetHeight,t.forEach((t=>{if(t.data.moved){const n=t.elm,o=n.style;gs(n,e),o.transform=o.WebkitTransform=o.transitionDuration="",n.addEventListener(fs,n._moveCb=function t(o){o&&o.target!==n||o&&!/transform$/.test(o.propertyName)||(n.removeEventListener(fs,t),n._moveCb=null,vs(n,e))})}})))},methods:{hasMove(t,e){if(!ls)return!1;if(this._hasMove)return this._hasMove;const n=t.cloneNode();t._transitionClasses&&t._transitionClasses.forEach((t=>{is(n,t)})),ss(n,e),n.style.display="none",this.$el.appendChild(n);const o=$s(n);return this.$el.removeChild(n),this._hasMove=o.hasTransform}}};function Zs(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function Gs(t){t.data.newPos=t.elm.getBoundingClientRect()}function Xs(t){const e=t.data.pos,n=t.data.newPos,o=e.left-n.left,r=e.top-n.top;if(o||r){t.data.moved=!0;const e=t.elm.style;e.transform=e.WebkitTransform=`translate(${o}px,${r}px)`,e.transitionDuration="0s"}}var Ys={Transition:Js,TransitionGroup:Ws};uo.config.mustUseProp=bo,uo.config.isReservedTag=Io,uo.config.isReservedAttr=_o,uo.config.getTagNamespace=Lo,uo.config.isUnknownElement=function(t){if(!K)return!0;if(Io(t))return!1;if(t=t.toLowerCase(),null!=Ro[t])return Ro[t];const e=document.createElement(t);return t.indexOf("-")>-1?Ro[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:Ro[t]=/HTMLUnknownElement/.test(e.toString())},T(uo.options.directives,Fs),T(uo.options.components,Ys),uo.prototype.__patch__=K?Ts:j,uo.prototype.$mount=function(t,e){return function(t,e,n){let o;t.$el=e,t.$options.render||(t.$options.render=lt),Le(t,"beforeMount"),o=()=>{t._update(t._render(),n)},new jn(t,o,j,{before(){t._isMounted&&!t._isDestroyed&&Le(t,"beforeUpdate")}},!0),n=!1;const r=t._preWatchers;if(r)for(let t=0;t<r.length;t++)r[t].run();return null==t.$vnode&&(t._isMounted=!0,Le(t,"mounted")),t}(this,t=t&&K?Ho(t):void 0,e)},K&&setTimeout((()=>{F.devtools&&nt&&nt.emit("init",uo)}),0);const Qs=/\{\{((?:.|\r?\n)+?)\}\}/g,ti=/[-.*+?^${}()|[\]\/\\]/g,ei=$((t=>{const e=t[0].replace(ti,"\\$&"),n=t[1].replace(ti,"\\$&");return new RegExp(e+"((?:.|\\n)+?)"+n,"g")}));var ni={staticKeys:["staticClass"],transformNode:function(t,e){e.warn;const n=$r(t,"class");n&&(t.staticClass=JSON.stringify(n.replace(/\s+/g," ").trim()));const o=_r(t,"class",!1);o&&(t.classBinding=o)},genData:function(t){let e="";return t.staticClass&&(e+=`staticClass:${t.staticClass},`),t.classBinding&&(e+=`class:${t.classBinding},`),e}};var oi={staticKeys:["staticStyle"],transformNode:function(t,e){e.warn;const n=$r(t,"style");n&&(t.staticStyle=JSON.stringify(qr(n)));const o=_r(t,"style",!1);o&&(t.styleBinding=o)},genData:function(t){let e="";return t.staticStyle&&(e+=`staticStyle:${t.staticStyle},`),t.styleBinding&&(e+=`style:(${t.styleBinding}),`),e}};let ri;var si={decode:t=>(ri=ri||document.createElement("div"),ri.innerHTML=t,ri.textContent)};const ii=h("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),ci=h("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),ai=h("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),li=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,ui=/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,fi=`[a-zA-Z_][\\-\\.0-9_a-zA-Z${H.source}]*`,di=`((?:${fi}\\:)?${fi})`,pi=new RegExp(`^<${di}`),hi=/^\s*(\/?)>/,mi=new RegExp(`^<\\/${di}[^>]*>`),gi=/^<!DOCTYPE [^>]+>/i,vi=/^<!\--/,yi=/^<!\[/,_i=h("script,style,textarea",!0),$i={},bi={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t","&#39;":"'"},wi=/&(?:lt|gt|quot|amp|#39);/g,xi=/&(?:lt|gt|quot|amp|#39|#10|#9);/g,Ci=h("pre,textarea",!0),ki=(t,e)=>t&&Ci(t)&&"\n"===e[0];function Si(t,e){const n=e?xi:wi;return t.replace(n,(t=>bi[t]))}const Oi=/^@|^v-on:/,Ti=/^v-|^@|^:|^#/,Ai=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,ji=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Ei=/^\(|\)$/g,Ni=/^\[.*\]$/,Pi=/:(.*)$/,Di=/^:|^\.|^v-bind:/,Mi=/\.[^.\]]+(?=[^\]]*$)/g,Ii=/^v-slot(:|$)|^#/,Li=/[\r\n]/,Ri=/[ \f\t\r\n]+/g,Fi=$(si.decode);let Hi,Bi,Ui,zi,Vi,Ki,Ji,qi;function Wi(t,e,n){return{type:1,tag:t,attrsList:e,attrsMap:ec(e),rawAttrsMap:{},parent:n,children:[]}}function Zi(t,e){Hi=e.warn||fr,Ki=e.isPreTag||E,Ji=e.mustUseProp||E,qi=e.getTagNamespace||E,e.isReservedTag,Ui=dr(e.modules,"transformNode"),zi=dr(e.modules,"preTransformNode"),Vi=dr(e.modules,"postTransformNode"),Bi=e.delimiters;const n=[],o=!1!==e.preserveWhitespace,r=e.whitespace;let s,i,c=!1,a=!1;function l(t){if(u(t),c||t.processed||(t=Gi(t,e)),n.length||t===s||s.if&&(t.elseif||t.else)&&Yi(s,{exp:t.elseif,block:t}),i&&!t.forbidden)if(t.elseif||t.else)!function(t,e){const n=function(t){let e=t.length;for(;e--;){if(1===t[e].type)return t[e];t.pop()}}(e.children);n&&n.if&&Yi(n,{exp:t.elseif,block:t})}(t,i);else{if(t.slotScope){const e=t.slotTarget||'"default"';(i.scopedSlots||(i.scopedSlots={}))[e]=t}i.children.push(t),t.parent=i}t.children=t.children.filter((t=>!t.slotScope)),u(t),t.pre&&(c=!1),Ki(t.tag)&&(a=!1);for(let n=0;n<Vi.length;n++)Vi[n](t,e)}function u(t){if(!a){let e;for(;(e=t.children[t.children.length-1])&&3===e.type&&" "===e.text;)t.children.pop()}}return function(t,e){const n=[],o=e.expectHTML,r=e.isUnaryTag||E,s=e.canBeLeftOpenTag||E;let i,c,a=0;for(;t;){if(i=t,c&&_i(c)){let n=0;const o=c.toLowerCase(),r=$i[o]||($i[o]=new RegExp("([\\s\\S]*?)(</"+o+"[^>]*>)","i")),s=t.replace(r,(function(t,r,s){return n=s.length,_i(o)||"noscript"===o||(r=r.replace(/<!\--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),ki(o,r)&&(r=r.slice(1)),e.chars&&e.chars(r),""}));a+=t.length-s.length,t=s,d(o,a-n,a)}else{let n,o,r,s=t.indexOf("<");if(0===s){if(vi.test(t)){const n=t.indexOf("--\x3e");if(n>=0){e.shouldKeepComment&&e.comment&&e.comment(t.substring(4,n),a,a+n+3),l(n+3);continue}}if(yi.test(t)){const e=t.indexOf("]>");if(e>=0){l(e+2);continue}}const n=t.match(gi);if(n){l(n[0].length);continue}const o=t.match(mi);if(o){const t=a;l(o[0].length),d(o[1],t,a);continue}const r=u();if(r){f(r),ki(r.tagName,t)&&l(1);continue}}if(s>=0){for(o=t.slice(s);!(mi.test(o)||pi.test(o)||vi.test(o)||yi.test(o)||(r=o.indexOf("<",1),r<0));)s+=r,o=t.slice(s);n=t.substring(0,s)}s<0&&(n=t),n&&l(n.length),e.chars&&n&&e.chars(n,a-n.length,a)}if(t===i){e.chars&&e.chars(t);break}}function l(e){a+=e,t=t.substring(e)}function u(){const e=t.match(pi);if(e){const n={tagName:e[1],attrs:[],start:a};let o,r;for(l(e[0].length);!(o=t.match(hi))&&(r=t.match(ui)||t.match(li));)r.start=a,l(r[0].length),r.end=a,n.attrs.push(r);if(o)return n.unarySlash=o[1],l(o[0].length),n.end=a,n}}function f(t){const i=t.tagName,a=t.unarySlash;o&&("p"===c&&ai(i)&&d(c),s(i)&&c===i&&d(i));const l=r(i)||!!a,u=t.attrs.length,f=new Array(u);for(let n=0;n<u;n++){const o=t.attrs[n],r=o[3]||o[4]||o[5]||"",s="a"===i&&"href"===o[1]?e.shouldDecodeNewlinesForHref:e.shouldDecodeNewlines;f[n]={name:o[1],value:Si(r,s)}}l||(n.push({tag:i,lowerCasedTag:i.toLowerCase(),attrs:f,start:t.start,end:t.end}),c=i),e.start&&e.start(i,f,l,t.start,t.end)}function d(t,o,r){let s,i;if(null==o&&(o=a),null==r&&(r=a),t)for(i=t.toLowerCase(),s=n.length-1;s>=0&&n[s].lowerCasedTag!==i;s--);else s=0;if(s>=0){for(let t=n.length-1;t>=s;t--)e.end&&e.end(n[t].tag,o,r);n.length=s,c=s&&n[s-1].tag}else"br"===i?e.start&&e.start(t,[],!0,o,r):"p"===i&&(e.start&&e.start(t,[],!1,o,r),e.end&&e.end(t,o,r))}d()}(t,{warn:Hi,expectHTML:e.expectHTML,isUnaryTag:e.isUnaryTag,canBeLeftOpenTag:e.canBeLeftOpenTag,shouldDecodeNewlines:e.shouldDecodeNewlines,shouldDecodeNewlinesForHref:e.shouldDecodeNewlinesForHref,shouldKeepComment:e.comments,outputSourceRange:e.outputSourceRange,start(t,o,r,u,f){const d=i&&i.ns||qi(t);q&&"svg"===d&&(o=function(t){const e=[];for(let n=0;n<t.length;n++){const o=t[n];nc.test(o.name)||(o.name=o.name.replace(oc,""),e.push(o))}return e}(o));let p=Wi(t,o,i);var h;d&&(p.ns=d),"style"!==(h=p).tag&&("script"!==h.tag||h.attrsMap.type&&"text/javascript"!==h.attrsMap.type)||et()||(p.forbidden=!0);for(let t=0;t<zi.length;t++)p=zi[t](p,e)||p;c||(!function(t){null!=$r(t,"v-pre")&&(t.pre=!0)}(p),p.pre&&(c=!0)),Ki(p.tag)&&(a=!0),c?function(t){const e=t.attrsList,n=e.length;if(n){const o=t.attrs=new Array(n);for(let t=0;t<n;t++)o[t]={name:e[t].name,value:JSON.stringify(e[t].value)},null!=e[t].start&&(o[t].start=e[t].start,o[t].end=e[t].end)}else t.pre||(t.plain=!0)}(p):p.processed||(Xi(p),function(t){const e=$r(t,"v-if");if(e)t.if=e,Yi(t,{exp:e,block:t});else{null!=$r(t,"v-else")&&(t.else=!0);const e=$r(t,"v-else-if");e&&(t.elseif=e)}}(p),function(t){null!=$r(t,"v-once")&&(t.once=!0)}(p)),s||(s=p),r?l(p):(i=p,n.push(p))},end(t,e,o){const r=n[n.length-1];n.length-=1,i=n[n.length-1],l(r)},chars(t,e,n){if(!i)return;if(q&&"textarea"===i.tag&&i.attrsMap.placeholder===t)return;const s=i.children;var l;if(t=a||t.trim()?"script"===(l=i).tag||"style"===l.tag?t:Fi(t):s.length?r?"condense"===r&&Li.test(t)?"":" ":o?" ":"":""){let e,n;a||"condense"!==r||(t=t.replace(Ri," ")),!c&&" "!==t&&(e=function(t,e){const n=e?ei(e):Qs;if(!n.test(t))return;const o=[],r=[];let s,i,c,a=n.lastIndex=0;for(;s=n.exec(t);){i=s.index,i>a&&(r.push(c=t.slice(a,i)),o.push(JSON.stringify(c)));const e=lr(s[1].trim());o.push(`_s(${e})`),r.push({"@binding":e}),a=i+s[0].length}return a<t.length&&(r.push(c=t.slice(a)),o.push(JSON.stringify(c))),{expression:o.join("+"),tokens:r}}(t,Bi))?n={type:2,expression:e.expression,tokens:e.tokens,text:t}:" "===t&&s.length&&" "===s[s.length-1].text||(n={type:3,text:t}),n&&s.push(n)}},comment(t,e,n){if(i){const e={type:3,text:t,isComment:!0};i.children.push(e)}}}),s}function Gi(t,e){var n;!function(t){const e=_r(t,"key");e&&(t.key=e)}(t),t.plain=!t.key&&!t.scopedSlots&&!t.attrsList.length,function(t){const e=_r(t,"ref");e&&(t.ref=e,t.refInFor=function(t){let e=t;for(;e;){if(void 0!==e.for)return!0;e=e.parent}return!1}(t))}(t),function(t){let e;"template"===t.tag?(e=$r(t,"scope"),t.slotScope=e||$r(t,"slot-scope")):(e=$r(t,"slot-scope"))&&(t.slotScope=e);const n=_r(t,"slot");n&&(t.slotTarget='""'===n?'"default"':n,t.slotTargetDynamic=!(!t.attrsMap[":slot"]&&!t.attrsMap["v-bind:slot"]),"template"===t.tag||t.slotScope||hr(t,"slot",n,function(t,e){return t.rawAttrsMap[":"+e]||t.rawAttrsMap["v-bind:"+e]||t.rawAttrsMap[e]}(t,"slot")));if("template"===t.tag){const e=br(t,Ii);if(e){const{name:n,dynamic:o}=Qi(e);t.slotTarget=n,t.slotTargetDynamic=o,t.slotScope=e.value||"_empty_"}}else{const e=br(t,Ii);if(e){const n=t.scopedSlots||(t.scopedSlots={}),{name:o,dynamic:r}=Qi(e),s=n[o]=Wi("template",[],t);s.slotTarget=o,s.slotTargetDynamic=r,s.children=t.children.filter((t=>{if(!t.slotScope)return t.parent=s,!0})),s.slotScope=e.value||"_empty_",t.children=[],t.plain=!1}}}(t),"slot"===(n=t).tag&&(n.slotName=_r(n,"name")),function(t){let e;(e=_r(t,"is"))&&(t.component=e);null!=$r(t,"inline-template")&&(t.inlineTemplate=!0)}(t);for(let n=0;n<Ui.length;n++)t=Ui[n](t,e)||t;return function(t){const e=t.attrsList;let n,o,r,s,i,c,a,l;for(n=0,o=e.length;n<o;n++)if(r=s=e[n].name,i=e[n].value,Ti.test(r))if(t.hasBindings=!0,c=tc(r.replace(Ti,"")),c&&(r=r.replace(Mi,"")),Di.test(r))r=r.replace(Di,""),i=lr(i),l=Ni.test(r),l&&(r=r.slice(1,-1)),c&&(c.prop&&!l&&(r=w(r),"innerHtml"===r&&(r="innerHTML")),c.camel&&!l&&(r=w(r)),c.sync&&(a=Cr(i,"$event"),l?yr(t,`"update:"+(${r})`,a,null,!1,0,e[n],!0):(yr(t,`update:${w(r)}`,a,null,!1,0,e[n]),k(r)!==w(r)&&yr(t,`update:${k(r)}`,a,null,!1,0,e[n])))),c&&c.prop||!t.component&&Ji(t.tag,t.attrsMap.type,r)?pr(t,r,i,e[n],l):hr(t,r,i,e[n],l);else if(Oi.test(r))r=r.replace(Oi,""),l=Ni.test(r),l&&(r=r.slice(1,-1)),yr(t,r,i,c,!1,0,e[n],l);else{r=r.replace(Ti,"");const o=r.match(Pi);let a=o&&o[1];l=!1,a&&(r=r.slice(0,-(a.length+1)),Ni.test(a)&&(a=a.slice(1,-1),l=!0)),gr(t,r,s,i,a,l,c,e[n])}else hr(t,r,JSON.stringify(i),e[n]),!t.component&&"muted"===r&&Ji(t.tag,t.attrsMap.type,r)&&pr(t,r,"true",e[n])}(t),t}function Xi(t){let e;if(e=$r(t,"v-for")){const n=function(t){const e=t.match(Ai);if(!e)return;const n={};n.for=e[2].trim();const o=e[1].trim().replace(Ei,""),r=o.match(ji);r?(n.alias=o.replace(ji,"").trim(),n.iterator1=r[1].trim(),r[2]&&(n.iterator2=r[2].trim())):n.alias=o;return n}(e);n&&T(t,n)}}function Yi(t,e){t.ifConditions||(t.ifConditions=[]),t.ifConditions.push(e)}function Qi(t){let e=t.name.replace(Ii,"");return e||"#"!==t.name[0]&&(e="default"),Ni.test(e)?{name:e.slice(1,-1),dynamic:!0}:{name:`"${e}"`,dynamic:!1}}function tc(t){const e=t.match(Mi);if(e){const t={};return e.forEach((e=>{t[e.slice(1)]=!0})),t}}function ec(t){const e={};for(let n=0,o=t.length;n<o;n++)e[t[n].name]=t[n].value;return e}const nc=/^xmlns:NS\d+/,oc=/^NS\d+:/;function rc(t){return Wi(t.tag,t.attrsList.slice(),t.parent)}var sc=[ni,oi,{preTransformNode:function(t,e){if("input"===t.tag){const n=t.attrsMap;if(!n["v-model"])return;let o;if((n[":type"]||n["v-bind:type"])&&(o=_r(t,"type")),n.type||o||!n["v-bind"]||(o=`(${n["v-bind"]}).type`),o){const n=$r(t,"v-if",!0),r=n?`&&(${n})`:"",s=null!=$r(t,"v-else",!0),i=$r(t,"v-else-if",!0),c=rc(t);Xi(c),mr(c,"type","checkbox"),Gi(c,e),c.processed=!0,c.if=`(${o})==='checkbox'`+r,Yi(c,{exp:c.if,block:c});const a=rc(t);$r(a,"v-for",!0),mr(a,"type","radio"),Gi(a,e),Yi(c,{exp:`(${o})==='radio'`+r,block:a});const l=rc(t);return $r(l,"v-for",!0),mr(l,":type",o),Gi(l,e),Yi(c,{exp:n,block:l}),s?c.else=!0:i&&(c.elseif=i),c}}}}];const ic={expectHTML:!0,modules:sc,directives:{model:function(t,e,n){const o=e.value,r=e.modifiers,s=t.tag,i=t.attrsMap.type;if(t.component)return xr(t,o,r),!1;if("select"===s)!function(t,e,n){const o=n&&n.number;let r=`var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ${o?"_n(val)":"val"}});`;r=`${r} ${Cr(e,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]")}`,yr(t,"change",r,null,!0)}(t,o,r);else if("input"===s&&"checkbox"===i)!function(t,e,n){const o=n&&n.number,r=_r(t,"value")||"null",s=_r(t,"true-value")||"true",i=_r(t,"false-value")||"false";pr(t,"checked",`Array.isArray(${e})?_i(${e},${r})>-1`+("true"===s?`:(${e})`:`:_q(${e},${s})`)),yr(t,"change",`var $$a=${e},$$el=$event.target,$$c=$$el.checked?(${s}):(${i});if(Array.isArray($$a)){var $$v=${o?"_n("+r+")":r},$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(${Cr(e,"$$a.concat([$$v])")})}else{$$i>-1&&(${Cr(e,"$$a.slice(0,$$i).concat($$a.slice($$i+1))")})}}else{${Cr(e,"$$c")}}`,null,!0)}(t,o,r);else if("input"===s&&"radio"===i)!function(t,e,n){const o=n&&n.number;let r=_r(t,"value")||"null";r=o?`_n(${r})`:r,pr(t,"checked",`_q(${e},${r})`),yr(t,"change",Cr(e,r),null,!0)}(t,o,r);else if("input"===s||"textarea"===s)!function(t,e,n){const o=t.attrsMap.type,{lazy:r,number:s,trim:i}=n||{},c=!r&&"range"!==o,a=r?"change":"range"===o?"__r":"input";let l="$event.target.value";i&&(l="$event.target.value.trim()");s&&(l=`_n(${l})`);let u=Cr(e,l);c&&(u=`if($event.target.composing)return;${u}`);pr(t,"value",`(${e})`),yr(t,a,u,null,!0),(i||s)&&yr(t,"blur","$forceUpdate()")}(t,o,r);else if(!F.isReservedTag(s))return xr(t,o,r),!1;return!0},text:function(t,e){e.value&&pr(t,"textContent",`_s(${e.value})`,e)},html:function(t,e){e.value&&pr(t,"innerHTML",`_s(${e.value})`,e)}},isPreTag:t=>"pre"===t,isUnaryTag:ii,mustUseProp:bo,canBeLeftOpenTag:ci,isReservedTag:Io,getTagNamespace:Lo,staticKeys:function(t){return t.reduce(((t,e)=>t.concat(e.staticKeys||[])),[]).join(",")}(sc)};let cc,ac;const lc=$((function(t){return h("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap"+(t?","+t:""))}));function uc(t,e){t&&(cc=lc(e.staticKeys||""),ac=e.isReservedTag||E,fc(t),dc(t,!1))}function fc(t){if(t.static=function(t){if(2===t.type)return!1;if(3===t.type)return!0;return!(!t.pre&&(t.hasBindings||t.if||t.for||m(t.tag)||!ac(t.tag)||function(t){for(;t.parent;){if("template"!==(t=t.parent).tag)return!1;if(t.for)return!0}return!1}(t)||!Object.keys(t).every(cc)))}(t),1===t.type){if(!ac(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(let e=0,n=t.children.length;e<n;e++){const n=t.children[e];fc(n),n.static||(t.static=!1)}if(t.ifConditions)for(let e=1,n=t.ifConditions.length;e<n;e++){const n=t.ifConditions[e].block;fc(n),n.static||(t.static=!1)}}}function dc(t,e){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=e),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(let n=0,o=t.children.length;n<o;n++)dc(t.children[n],e||!!t.for);if(t.ifConditions)for(let n=1,o=t.ifConditions.length;n<o;n++)dc(t.ifConditions[n].block,e)}}const pc=/^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/,hc=/\([^)]*?\);*$/,mc=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,gc={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},vc={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]},yc=t=>`if(${t})return null;`,_c={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:yc("$event.target !== $event.currentTarget"),ctrl:yc("!$event.ctrlKey"),shift:yc("!$event.shiftKey"),alt:yc("!$event.altKey"),meta:yc("!$event.metaKey"),left:yc("'button' in $event && $event.button !== 0"),middle:yc("'button' in $event && $event.button !== 1"),right:yc("'button' in $event && $event.button !== 2")};function $c(t,e){const n=e?"nativeOn:":"on:";let o="",r="";for(const e in t){const n=bc(t[e]);t[e]&&t[e].dynamic?r+=`${e},${n},`:o+=`"${e}":${n},`}return o=`{${o.slice(0,-1)}}`,r?n+`_d(${o},[${r.slice(0,-1)}])`:n+o}function bc(t){if(!t)return"function(){}";if(Array.isArray(t))return`[${t.map((t=>bc(t))).join(",")}]`;const e=mc.test(t.value),n=pc.test(t.value),o=mc.test(t.value.replace(hc,""));if(t.modifiers){let r="",s="";const i=[];for(const e in t.modifiers)if(_c[e])s+=_c[e],gc[e]&&i.push(e);else if("exact"===e){const e=t.modifiers;s+=yc(["ctrl","shift","alt","meta"].filter((t=>!e[t])).map((t=>`$event.${t}Key`)).join("||"))}else i.push(e);i.length&&(r+=function(t){return`if(!$event.type.indexOf('key')&&${t.map(wc).join("&&")})return null;`}(i)),s&&(r+=s);return`function($event){${r}${e?`return ${t.value}.apply(null, arguments)`:n?`return (${t.value}).apply(null, arguments)`:o?`return ${t.value}`:t.value}}`}return e||n?t.value:`function($event){${o?`return ${t.value}`:t.value}}`}function wc(t){const e=parseInt(t,10);if(e)return`$event.keyCode!==${e}`;const n=gc[t],o=vc[t];return`_k($event.keyCode,${JSON.stringify(t)},${JSON.stringify(n)},$event.key,${JSON.stringify(o)})`}var xc={on:function(t,e){t.wrapListeners=t=>`_g(${t},${e.value})`},bind:function(t,e){t.wrapData=n=>`_b(${n},'${t.tag}',${e.value},${e.modifiers&&e.modifiers.prop?"true":"false"}${e.modifiers&&e.modifiers.sync?",true":""})`},cloak:j};class Cc{constructor(t){this.options=t,this.warn=t.warn||fr,this.transforms=dr(t.modules,"transformCode"),this.dataGenFns=dr(t.modules,"genData"),this.directives=T(T({},xc),t.directives);const e=t.isReservedTag||E;this.maybeComponent=t=>!!t.component||!e(t.tag),this.onceId=0,this.staticRenderFns=[],this.pre=!1}}function kc(t,e){const n=new Cc(e);return{render:`with(this){return ${t?"script"===t.tag?"null":Sc(t,n):'_c("div")'}}`,staticRenderFns:n.staticRenderFns}}function Sc(t,e){if(t.parent&&(t.pre=t.pre||t.parent.pre),t.staticRoot&&!t.staticProcessed)return Oc(t,e);if(t.once&&!t.onceProcessed)return Tc(t,e);if(t.for&&!t.forProcessed)return Ec(t,e);if(t.if&&!t.ifProcessed)return Ac(t,e);if("template"!==t.tag||t.slotTarget||e.pre){if("slot"===t.tag)return function(t,e){const n=t.slotName||'"default"',o=Mc(t,e);let r=`_t(${n}${o?`,function(){return ${o}}`:""}`;const s=t.attrs||t.dynamicAttrs?Rc((t.attrs||[]).concat(t.dynamicAttrs||[]).map((t=>({name:w(t.name),value:t.value,dynamic:t.dynamic})))):null,i=t.attrsMap["v-bind"];!s&&!i||o||(r+=",null");s&&(r+=`,${s}`);i&&(r+=`${s?"":",null"},${i}`);return r+")"}(t,e);{let n;if(t.component)n=function(t,e,n){const o=e.inlineTemplate?null:Mc(e,n,!0);return`_c(${t},${Nc(e,n)}${o?`,${o}`:""})`}(t.component,t,e);else{let o;const r=e.maybeComponent(t);let s;(!t.plain||t.pre&&r)&&(o=Nc(t,e));const i=e.options.bindings;r&&i&&!1!==i.__isScriptSetup&&(s=function(t,e){const n=w(e),o=x(n),r=r=>t[e]===r?e:t[n]===r?n:t[o]===r?o:void 0,s=r("setup-const")||r("setup-reactive-const");if(s)return s;const i=r("setup-let")||r("setup-ref")||r("setup-maybe-ref");if(i)return i}(i,t.tag)),s||(s=`'${t.tag}'`);const c=t.inlineTemplate?null:Mc(t,e,!0);n=`_c(${s}${o?`,${o}`:""}${c?`,${c}`:""})`}for(let o=0;o<e.transforms.length;o++)n=e.transforms[o](t,n);return n}}return Mc(t,e)||"void 0"}function Oc(t,e){t.staticProcessed=!0;const n=e.pre;return t.pre&&(e.pre=t.pre),e.staticRenderFns.push(`with(this){return ${Sc(t,e)}}`),e.pre=n,`_m(${e.staticRenderFns.length-1}${t.staticInFor?",true":""})`}function Tc(t,e){if(t.onceProcessed=!0,t.if&&!t.ifProcessed)return Ac(t,e);if(t.staticInFor){let n="",o=t.parent;for(;o;){if(o.for){n=o.key;break}o=o.parent}return n?`_o(${Sc(t,e)},${e.onceId++},${n})`:Sc(t,e)}return Oc(t,e)}function Ac(t,e,n,o){return t.ifProcessed=!0,jc(t.ifConditions.slice(),e,n,o)}function jc(t,e,n,o){if(!t.length)return o||"_e()";const r=t.shift();return r.exp?`(${r.exp})?${s(r.block)}:${jc(t,e,n,o)}`:`${s(r.block)}`;function s(t){return n?n(t,e):t.once?Tc(t,e):Sc(t,e)}}function Ec(t,e,n,o){const r=t.for,s=t.alias,i=t.iterator1?`,${t.iterator1}`:"",c=t.iterator2?`,${t.iterator2}`:"";return t.forProcessed=!0,`${o||"_l"}((${r}),function(${s}${i}${c}){return ${(n||Sc)(t,e)}})`}function Nc(t,e){let n="{";const o=function(t,e){const n=t.directives;if(!n)return;let o,r,s,i,c="directives:[",a=!1;for(o=0,r=n.length;o<r;o++){s=n[o],i=!0;const r=e.directives[s.name];r&&(i=!!r(t,s,e.warn)),i&&(a=!0,c+=`{name:"${s.name}",rawName:"${s.rawName}"${s.value?`,value:(${s.value}),expression:${JSON.stringify(s.value)}`:""}${s.arg?`,arg:${s.isDynamicArg?s.arg:`"${s.arg}"`}`:""}${s.modifiers?`,modifiers:${JSON.stringify(s.modifiers)}`:""}},`)}if(a)return c.slice(0,-1)+"]"}(t,e);o&&(n+=o+","),t.key&&(n+=`key:${t.key},`),t.ref&&(n+=`ref:${t.ref},`),t.refInFor&&(n+="refInFor:true,"),t.pre&&(n+="pre:true,"),t.component&&(n+=`tag:"${t.tag}",`);for(let o=0;o<e.dataGenFns.length;o++)n+=e.dataGenFns[o](t);if(t.attrs&&(n+=`attrs:${Rc(t.attrs)},`),t.props&&(n+=`domProps:${Rc(t.props)},`),t.events&&(n+=`${$c(t.events,!1)},`),t.nativeEvents&&(n+=`${$c(t.nativeEvents,!0)},`),t.slotTarget&&!t.slotScope&&(n+=`slot:${t.slotTarget},`),t.scopedSlots&&(n+=`${function(t,e,n){let o=t.for||Object.keys(e).some((t=>{const n=e[t];return n.slotTargetDynamic||n.if||n.for||Pc(n)})),r=!!t.if;if(!o){let e=t.parent;for(;e;){if(e.slotScope&&"_empty_"!==e.slotScope||e.for){o=!0;break}e.if&&(r=!0),e=e.parent}}const s=Object.keys(e).map((t=>Dc(e[t],n))).join(",");return`scopedSlots:_u([${s}]${o?",null,true":""}${!o&&r?`,null,false,${function(t){let e=5381,n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e>>>0}(s)}`:""})`}(t,t.scopedSlots,e)},`),t.model&&(n+=`model:{value:${t.model.value},callback:${t.model.callback},expression:${t.model.expression}},`),t.inlineTemplate){const o=function(t,e){const n=t.children[0];if(n&&1===n.type){const t=kc(n,e.options);return`inlineTemplate:{render:function(){${t.render}},staticRenderFns:[${t.staticRenderFns.map((t=>`function(){${t}}`)).join(",")}]}`}}(t,e);o&&(n+=`${o},`)}return n=n.replace(/,$/,"")+"}",t.dynamicAttrs&&(n=`_b(${n},"${t.tag}",${Rc(t.dynamicAttrs)})`),t.wrapData&&(n=t.wrapData(n)),t.wrapListeners&&(n=t.wrapListeners(n)),n}function Pc(t){return 1===t.type&&("slot"===t.tag||t.children.some(Pc))}function Dc(t,e){const n=t.attrsMap["slot-scope"];if(t.if&&!t.ifProcessed&&!n)return Ac(t,e,Dc,"null");if(t.for&&!t.forProcessed)return Ec(t,e,Dc);const o="_empty_"===t.slotScope?"":String(t.slotScope),r=`function(${o}){return ${"template"===t.tag?t.if&&n?`(${t.if})?${Mc(t,e)||"undefined"}:undefined`:Mc(t,e)||"undefined":Sc(t,e)}}`,s=o?"":",proxy:true";return`{key:${t.slotTarget||'"default"'},fn:${r}${s}}`}function Mc(t,e,n,o,r){const s=t.children;if(s.length){const t=s[0];if(1===s.length&&t.for&&"template"!==t.tag&&"slot"!==t.tag){const r=n?e.maybeComponent(t)?",1":",0":"";return`${(o||Sc)(t,e)}${r}`}const i=n?function(t,e){let n=0;for(let o=0;o<t.length;o++){const r=t[o];if(1===r.type){if(Ic(r)||r.ifConditions&&r.ifConditions.some((t=>Ic(t.block)))){n=2;break}(e(r)||r.ifConditions&&r.ifConditions.some((t=>e(t.block))))&&(n=1)}}return n}(s,e.maybeComponent):0,c=r||Lc;return`[${s.map((t=>c(t,e))).join(",")}]${i?`,${i}`:""}`}}function Ic(t){return void 0!==t.for||"template"===t.tag||"slot"===t.tag}function Lc(t,e){return 1===t.type?Sc(t,e):3===t.type&&t.isComment?function(t){return`_e(${JSON.stringify(t.text)})`}(t):function(t){return`_v(${2===t.type?t.expression:Fc(JSON.stringify(t.text))})`}(t)}function Rc(t){let e="",n="";for(let o=0;o<t.length;o++){const r=t[o],s=Fc(r.value);r.dynamic?n+=`${r.name},${s},`:e+=`"${r.name}":${s},`}return e=`{${e.slice(0,-1)}}`,n?`_d(${e},[${n.slice(0,-1)}])`:e}function Fc(t){return t.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function Hc(t,e){try{return new Function(t)}catch(n){return e.push({err:n,code:t}),j}}function Bc(t){const e=Object.create(null);return function(n,o,r){(o=T({},o)).warn,delete o.warn;const s=o.delimiters?String(o.delimiters)+n:n;if(e[s])return e[s];const i=t(n,o),c={},a=[];return c.render=Hc(i.render,a),c.staticRenderFns=i.staticRenderFns.map((t=>Hc(t,a))),e[s]=c}}new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b"),new RegExp("\\b"+"delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b")+"\\s*\\([^\\)]*\\)");const Uc=(zc=function(t,e){const n=Zi(t.trim(),e);!1!==e.optimize&&uc(n,e);const o=kc(n,e);return{ast:n,render:o.render,staticRenderFns:o.staticRenderFns}},function(t){function e(e,n){const o=Object.create(t),r=[],s=[];if(n){n.modules&&(o.modules=(t.modules||[]).concat(n.modules)),n.directives&&(o.directives=T(Object.create(t.directives||null),n.directives));for(const t in n)"modules"!==t&&"directives"!==t&&(o[t]=n[t])}o.warn=(t,e,n)=>{(n?s:r).push(t)};const i=zc(e.trim(),o);return i.errors=r,i.tips=s,i}return{compile:e,compileToFunctions:Bc(e)}});var zc;const{compile:Vc,compileToFunctions:Kc}=Uc(ic);let Jc;function qc(t){return Jc=Jc||document.createElement("div"),Jc.innerHTML=t?'<a href="\n"/>':'<div a="\n"/>',Jc.innerHTML.indexOf("&#10;")>0}const Wc=!!K&&qc(!1),Zc=!!K&&qc(!0),Gc=$((t=>{const e=Ho(t);return e&&e.innerHTML})),Xc=uo.prototype.$mount;uo.prototype.$mount=function(t,e){if((t=t&&Ho(t))===document.body||t===document.documentElement)return this;const n=this.$options;if(!n.render){let e=n.template;if(e)if("string"==typeof e)"#"===e.charAt(0)&&(e=Gc(e));else{if(!e.nodeType)return this;e=e.innerHTML}else t&&(e=function(t){if(t.outerHTML)return t.outerHTML;{const e=document.createElement("div");return e.appendChild(t.cloneNode(!0)),e.innerHTML}}(t));if(e){const{render:t,staticRenderFns:o}=Kc(e,{outputSourceRange:!1,shouldDecodeNewlines:Wc,shouldDecodeNewlinesForHref:Zc,delimiters:n.delimiters,comments:n.comments},this);n.render=t,n.staticRenderFns=o}}return Xc.call(this,t,e)},uo.compile=Kc,T(uo,kn),uo.effect=function(t,e){const n=new jn(it,t,j,{sync:!0});e&&(n.update=()=>{e((()=>n.run()))})},module.exports=uo;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(7).setImmediate))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(8);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FriendlyIframe = __webpack_require__(11);

var _FriendlyIframe2 = _interopRequireDefault(_FriendlyIframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({
    install: function install(NewVue) {
      NewVue.component('vue-friendly-iframe', _FriendlyIframe2.default);
    }
  });
}

exports.default = {
  install: function install(NewVue) {
    NewVue.component('vue-friendly-iframe', _FriendlyIframe2.default);
  },
  VueFriendlyIframe: _FriendlyIframe2.default
};
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(17),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = __webpack_require__(13);

var _v2 = _interopRequireDefault(_v);

var _utils = __webpack_require__(16);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateGuid() {
  return (0, _v2.default)();
}

exports.default = {
  name: 'friendly-iframe',
  props: {
    src: {
      type: String,
      required: true
    },
    crossorigin: {
      type: String,
      required: false,
      default: 'anonymous'
    },
    loading: {
      type: String,
      required: false,
      default: ''
    },
    target: {
      type: String,
      required: false,
      default: '_parent'
    },
    className: {
      type: String,
      required: false
    },
    allow: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    sandbox: {
      type: String,
      required: false
    }
  },
  data: function data() {
    return {
      iframeEl: null,
      iframeLoadedMessage: 'IFRAME_LOADED_' + generateGuid(),
      iframeOnReadyStateChangeMessage: 'IFRAME_ON_READ_STATE_CHANGE_' + generateGuid()
    };
  },

  computed: {},
  watch: {
    src: function src() {
      this.reinitIframe(this);
    }
  },
  methods: {
    removeIframe: function removeIframe() {
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      }
    },
    setIframeUrl: function setIframeUrl() {
      if (this.iframeEl.contentWindow === null) {
        setTimeout(this.setIframeUrl);
        return;
      }
      var iframeDoc = this.iframeEl.contentWindow.document;
      iframeDoc.open().write('\n          <body onload="window.location.replace(\'' + this.src + '\'); parent.postMessage(\'' + this.iframeLoadedMessage + '\', \'*\')"></body>\n          <script>\n            window.document.onreadystatechange = function () {\n              if (window.document.readyState === \'complete\') {\n                parent.postMessage(\'' + this.iframeOnReadyStateChangeMessage + '\', \'*\')\n              }\n            };\n          </script>\n          ');

      iframeDoc.close();
    },

    reinitIframe: _utils2.default.debounce(function (vm) {
      vm.removeIframe();
      vm.initIframe();
    }, 200),
    initIframe: function initIframe() {
      this.iframeEl = document.createElement('iframe');
      this.iframeEl.setAttribute('style', 'visibility: hidden; position: absolute; top: -99999px; border: none;');
      if (this.src) this.iframeEl.setAttribute('iframe-src', this.src);
      if (this.className) this.iframeEl.setAttribute('class', this.className);
      if (this.class) this.iframeEl.setAttribute('class', this.class);
      if (this.crossorigin) this.iframeEl.setAttribute('crossorigin', this.crossorigin);
      if (this.target) this.iframeEl.setAttribute('target', this.target);
      if (this.allow) this.iframeEl.setAttribute('allow', this.allow);
      if (this.name) this.iframeEl.setAttribute('name', this.name);
      if (this.title) this.iframeEl.setAttribute('title', this.title);
      if (this.sandbox) this.iframeEl.setAttribute('sandbox', this.sandbox);
      if (this.loading) this.iframeEl.setAttribute('loading', this.loading);

      this.$el.appendChild(this.iframeEl);

      this.setIframeUrl();
    },
    listenForEvents: function listenForEvents() {
      var _this = this;

      var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
      var eventer = window[eventMethod];
      var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

      eventer(messageEvent, function (event) {
        if (event.data === _this.iframeLoadedMessage) {
          _this.$emit('iframe-load');

          _this.iframeEl.setAttribute('style', 'visibility: visible; border: none;');
        }

        if (event.data === _this.iframeOnReadyStateChangeMessage) {
          _this.$emit('load');
        }
      }, false);
    }
  },
  mounted: function mounted() {
    this.listenForEvents();

    this.initIframe();
  }
};
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(14);
var bytesToUuid = __webpack_require__(15);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function debounce(func, wait, immediate) {
  var timeout = void 0;

  return function () {
    var context = this;

    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

exports.default = {
  debounce: debounce
};
module.exports = exports["default"];

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vue-friendly-iframe"
  })
},staticRenderFns: []}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(19)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(23),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6b8df8ac", content, true, {});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".btn-xl{padding:20px 30px;font-size:22px}button,input[type=submit]{display:inline-block;vertical-align:middle;background-color:#0c94fd;border:1px solid #0c94fd;border-radius:4px;padding:8px 12px;font:14px/18px Arial,Helverica,sans-serif;color:#fff;margin:0;text-decoration:none;text-align:center;cursor:pointer;transition:background-color .1s linear,color .1s linear,width .2s ease}button[disabled],input[readonly],input[type=submit][disabled]{background:#a0d4de;border-color:#a0d4de;cursor:default}button .promise-btn__spinner-wrapper{display:inline-block;margin:-8px 0}button.hide-loader .hidden{display:none}.site-footer{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.form-group{margin-bottom:.75rem}.form-group label{margin-bottom:.65rem;font-weight:700;display:inline-block}.form-control{display:block;width:100%;padding:.375rem .75rem;font-size:1rem;line-height:1.5;color:#495057;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media screen and (min-width:42em) and (max-width:64em){.btn{padding:.6rem .9rem;font-size:.9rem}}@media screen and (max-width:42em){.btn{display:block;width:100%;padding:.75rem;font-size:.9rem}.btn+.btn{margin-top:1rem;margin-left:0}}.page-header{background-image:linear-gradient(120deg,#155799,#159957)}@media screen and (min-width:64em){.page-header{padding:5rem 6rem}}@media screen and (min-width:42em) and (max-width:64em){.page-header{padding:3rem 4rem}}@media screen and (max-width:42em){.page-header{padding:2rem 1rem}}.project-name{margin-top:0;margin-bottom:.1rem}@media screen and (min-width:64em){.project-name{font-size:3.25rem}}@media screen and (min-width:42em) and (max-width:64em){.project-name{font-size:2.25rem}}@media screen and (max-width:42em){.project-name{font-size:1.75rem}}.project-tagline{margin-bottom:2rem;font-weight:400;opacity:.7}@media screen and (min-width:64em){.project-tagline{font-size:1.25rem}}@media screen and (min-width:42em) and (max-width:64em){.project-tagline{font-size:1.15rem}}@media screen and (max-width:42em){.project-tagline{font-size:1rem}}.main-content{word-wrap:break-word}.main-content :first-child{margin-top:0}@media screen and (min-width:64em){.main-content{max-width:64rem;margin:0 auto;font-size:1.1rem}}@media screen and (min-width:42em) and (max-width:64em){.main-content{padding:2rem 4rem;font-size:1.1rem}}@media screen and (max-width:42em){.main-content{padding:2rem 1rem;font-size:1rem}}.main-content img{max-width:100%}.main-content p{margin-bottom:1em}code{padding:2px 4px;font-family:Consolas,Liberation Mono,Menlo,Courier,monospace;font-size:.9rem;border-radius:.3rem}code,pre{color:#567482;background-color:#f3f6fa}pre{padding:.8rem;margin-top:0;margin-bottom:1rem;font:1rem Consolas,Liberation Mono,Menlo,Courier,monospace;word-wrap:normal;border:1px solid #dce6f0;border-radius:.3rem}pre>code{padding:0;margin:0;font-size:.9rem;color:#567482;word-break:normal;white-space:pre;background:transparent;border:0}.highlight{margin-bottom:1rem}.highlight pre{margin-bottom:0;word-break:normal}.highlight pre,pre{padding:.8rem;overflow:auto;font-size:.9rem;line-height:1.45;border-radius:.3rem;-webkit-overflow-scrolling:touch}pre code,pre tt{display:inline;max-width:none;padding:0;margin:0;overflow:initial;line-height:inherit;word-wrap:normal;background-color:transparent;border:0}pre code:after,pre code:before,pre tt:after,pre tt:before{content:normal}.main-content ol,.main-content ul{margin-top:0}.main-content blockquote{padding:0 1rem;margin-left:0;color:#819198;border-left:.3rem solid #dce6f0}.main-content blockquote>:first-child{margin-top:0}.main-content blockquote>:last-child{margin-bottom:0}.main-content table{display:block;width:100%;overflow:auto;word-break:normal;word-break:keep-all;-webkit-overflow-scrolling:touch}.main-content table th{font-weight:700}.main-content table td,.main-content table th{padding:.5rem 1rem;border:1px solid #e9ebec}.main-content dl{padding:0}.main-content dl dt{padding:0;margin-top:1rem;font-size:1rem;font-weight:700}.main-content dl dd{padding:0;margin-bottom:1rem}.main-content hr{height:2px;padding:0;margin:1rem 0;background-color:#eff0f1;border:0}.site-footer{padding-top:2rem;margin-top:2rem;border-top:1px solid #eff0f1}@media screen and (min-width:64em){.site-footer{font-size:1rem}}@media screen and (min-width:42em) and (max-width:64em){.site-footer{font-size:1rem}}@media screen and (max-width:42em){.site-footer{font-size:.9rem}}.site-footer-owner{display:block;font-weight:700}.site-footer-credits{color:#819198}body{padding:0;margin:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#606c71}body h1,body h2,body h3,body h4,body h5,body h6{color:#0c94fd;margin-top:2rem;margin-bottom:1rem}a{text-decoration:none;color:#1e6bb8}.btn{display:inline-block;margin-bottom:1rem;color:hsla(0,0%,100%,.7);background-color:hsla(0,0%,100%,.08);border:1px solid hsla(0,0%,100%,.2);border-radius:.3rem;transition:color .2s,background-color .2s,border-color .2s}@media screen and (min-width:64em){.btn{padding:.75rem 1rem}}.page-header{color:#fff;text-align:center;background-color:#159957;background-image:linear-gradient(120deg,#9069fd,#0c94fd);padding-bottom:4rem}.page-header .project-name{color:#fff;margin-top:0;margin-bottom:.1rem}@media screen and (min-width:64em){.page-header .project-name{font-size:3.25rem}}.page-header .project-tagline{color:#fff;margin-bottom:2rem;font-weight:400;opacity:.7}@media screen and (min-width:64em){.page-header .project-tagline{font-size:1.25rem}}.page-header .logo{text-align:center;height:100px;width:100px;margin:0 auto;border-radius:100%;background:#fff;margin-bottom:40px}.page-header .logo img{height:60px;position:relative;top:26px}.page-header .demo-btn{margin-top:40px}.main-content{max-width:1000px;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;padding:0}.main-content .right-panel{padding:40px;-ms-flex:1;flex:1;min-height:600px}code.type{margin-left:10px;color:blue}.options-table{margin-bottom:25px}", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'app',
  computed: {
    version: function version() {
      return "0.20.0";
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "main-content"
  }, [_c('sidebar'), _vm._v(" "), _c('div', {
    staticClass: "right-panel"
  }, [_c('router-view')], 1)], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "page-header"
  }, [_c('div', {
    staticClass: "logo"
  }, [_c('img', {
    attrs: {
      "src": "https://vuejs.org/images/logo.png"
    }
  })]), _vm._v(" "), _c('h1', {
    staticClass: "project-name"
  }, [_vm._v("\n      vue-friendly-iframe\n    ")]), _vm._v(" "), _c('h2', {
    staticClass: "project-tagline"
  }, [_vm._v("\n      Vue.js component for creating dynamic async iframes.\n    ")]), _vm._v(" "), _c('div', [_c('a', {
    staticClass: "btn",
    attrs: {
      "href": "https://github.com/officert/vue-friendly-iframe"
    }
  }, [_vm._v("View on GitHub")]), _vm._v(" "), _c('a', {
    staticClass: "btn",
    attrs: {
      "href": "https://github.com/officert/vue-friendly-iframe/zipball/master"
    }
  }, [_vm._v("Download .zip")]), _vm._v(" "), _c('a', {
    staticClass: "btn",
    attrs: {
      "href": "https://github.com/officert/vue-friendly-iframe/tarball/master"
    }
  }, [_vm._v("Download .tar.gz")])]), _vm._v(" "), _c('div', {
    staticClass: "center"
  }, [_c('a', {
    staticClass: "github-button",
    attrs: {
      "href": "https://github.com/officert/vue-friendly-iframe",
      "data-icon": "octicon-star",
      "data-show-count": "true",
      "aria-label": "Star officert/vue-friendly-iframe on GitHub"
    }
  }, [_vm._v("Star")])])])
}]}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(25)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(28),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("361531cb", content, true, {});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#sidebar{min-width:200px;padding-top:20px;position:sticky;top:0;height:300px}#sidebar ul{margin:0;padding:0}#sidebar ul li{display:block}#sidebar ul li a{display:block;padding:10px;border-radius:4px}#sidebar ul li a.active{background:#f3f6fa}", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'sidebar',
  data: function data() {
    return {};
  },

  methods: {}
};
module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('aside', {
    attrs: {
      "id": "sidebar"
    }
  }, [_c('ul', [_c('li', [_c('router-link', {
    attrs: {
      "activeClass": "active",
      "to": {
        name: 'Home'
      }
    }
  }, [_vm._v("\n        Intro\n      ")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "activeClass": "active",
      "to": {
        name: 'Install'
      }
    }
  }, [_vm._v("\n        Installation & Usage\n      ")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "activeClass": "active",
      "to": {
        name: 'Options'
      }
    }
  }, [_vm._v("\n        Options\n      ")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "activeClass": "active",
      "to": {
        name: 'Events'
      }
    }
  }, [_vm._v("\n        Events\n      ")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "activeClass": "active",
      "to": {
        name: 'Examples'
      }
    }
  }, [_vm._v("\n        Example\n      ")])], 1)])])
},staticRenderFns: []}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(30);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Home = __webpack_require__(31);

var _Home2 = _interopRequireDefault(_Home);

var _Install = __webpack_require__(36);

var _Install2 = _interopRequireDefault(_Install);

var _Options = __webpack_require__(39);

var _Options2 = _interopRequireDefault(_Options);

var _Events = __webpack_require__(44);

var _Events2 = _interopRequireDefault(_Events);

var _Examples = __webpack_require__(47);

var _Examples2 = _interopRequireDefault(_Examples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

var routes = [{
  name: 'Home',
  path: '*',
  redirect: '/home'
}, {
  name: 'Home',
  path: '/',
  redirect: '/home'
}, {
  name: 'Home',
  path: '/home',
  component: _Home2.default
}, {
  name: 'Install',
  path: '/install',
  component: _Install2.default
}, {
  name: 'Options',
  path: '/options',
  component: _Options2.default
}, {
  name: 'Events',
  path: '/events',
  component: _Events2.default
}, {
  name: 'Examples',
  path: '/examples',
  component: _Examples2.default
}];

exports.default = new _vueRouter2.default({
  base: '/vue-friendly-iframe/',
  routes: routes,
  scrollBehavior: function scrollBehavior(to) {
    if (to.name === 'Home') {
      return {
        x: 0,
        y: 0
      };
    }

    return {
      x: 0,
      y: 550
    };
  }
});
module.exports = exports['default'];

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
  * vue-router v2.8.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (false) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (false) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "production" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (false) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (false) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (false) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (false) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (false) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (false) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (false) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (false) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (false) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (false) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (false) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (false) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "production" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (false) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "production" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.8.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(32)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(35),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("8406f268", content, true, {});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'home',
  data: function data() {
    return {};
  },

  methods: {}
};
module.exports = exports['default'];

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "home"
    }
  }, [_c('h2', [_vm._v("Intro")]), _vm._v(" "), _c('div', [_c('p', [_vm._v("\n      Dynamic asnyc iframes are a technique for creating non-blocking, super fast loading iframes. Fast loading iframes are essential for building embedded widgets.\n    ")]), _vm._v(" "), _c('p', [_vm._v("\n      For a full description of dynamic asnyc iframes take a look at this article written by Aaron Peters:\n      "), _c('a', {
    attrs: {
      "href": "https://www.aaronpeters.nl/blog/iframe-loading-techniques-and-performance/",
      "target": "_blank"
    }
  }, [_vm._v("https://www.aaronpeters.nl/blog/iframe-loading-techniques-and-performance/")])])])])
}]}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(38),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'install',
  data: function data() {
    return {};
  },

  methods: {}
};
module.exports = exports['default'];

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "install"
    }
  }, [_c('h2', [_vm._v("Installation")]), _vm._v(" "), _c('div', [_c('pre', {
    staticClass: "highlight"
  }, [_vm._v("npm install vue-friendly-iframe --save-dev")])]), _vm._v(" "), _c('h2', [_vm._v("Usage")]), _vm._v(" "), _c('p', [_vm._v("\n    1) Install the Vue Friendly Iframe plugin:\n  ")]), _vm._v(" "), _c('div', [_c('pre', {
    staticClass: "highlight"
  }, [_vm._v("import Vue from 'vue';\nimport VueFriendlyIframe from 'vue-friendly-iframe';\n\nVue.use(VueFriendlyIframe);")]), _vm._v(" "), _c('p', [_vm._v("\n      2) In your HTML add the component:\n    ")]), _vm._v(" "), _c('div', [_c('pre', {
    staticClass: "highlight"
  }, [_vm._v("<vue-friendly-iframe :src=\"example1Form.src\" @load=\"onLoad\"></vue-friendly-iframe>")])])])])
}]}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(40)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(42),
  /* template */
  __webpack_require__(43),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("44a07420", content, true, {});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'options',
  data: function data() {
    return {
      params: [{
        name: 'src',
        type: 'String',
        desc: 'Iframe\'s url',
        default: null
      }, {
        name: 'className',
        type: 'String',
        desc: 'Iframe\'s class attribute',
        default: null
      }, {
        name: 'crossorigin',
        type: 'String',
        desc: 'Iframe\'s crossorigin attribute',
        default: 'anonymous'
      }, {
        name: 'target',
        type: 'String',
        desc: 'Iframe\'s target attribute',
        default: '_parent'
      }, {
        name: 'allow',
        type: 'String',
        desc: 'Iframe\'s allow attribute',
        default: null
      }, {
        name: 'name',
        type: 'String',
        desc: 'Iframe\'s name attribute',
        default: null
      }, {
        name: 'title',
        type: 'String',
        desc: 'Iframe\'s title attribute',
        default: null
      }, {
        name: 'sandbox',
        type: 'String',
        desc: 'Iframe\'s sandbox attribute',
        default: null
      }]
    };
  },

  methods: {}
};
module.exports = exports['default'];

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "options"
    }
  }, [_c('h2', [_vm._v("Options")]), _vm._v(" "), _c('table', {
    staticClass: "options-table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.params), function(param) {
    return _c('tr', [_c('td', [_c('code', [_vm._v(_vm._s(param.name))])]), _vm._v(" "), _c('td', [_c('code', {
      staticClass: "type"
    }, [_vm._v(_vm._s(param.type))])]), _vm._v(" "), _c('td', {
      domProps: {
        "innerHTML": _vm._s(param.desc)
      }
    }), _vm._v(" "), _c('td', [(param.default !== null && param.default !== undefined) ? _c('code', [_vm._v(_vm._s(param.default))]) : _vm._e()])])
  }), 0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("\n          Param\n        ")]), _vm._v(" "), _c('th', [_vm._v("\n          Type\n        ")]), _vm._v(" "), _c('th', [_vm._v("\n          Description\n        ")]), _vm._v(" "), _c('th', [_vm._v("\n          Default\n        ")])])])
}]}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(46),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'events',
  data: function data() {
    return {
      events: [{
        name: 'iframe-load',
        description: 'Triggered when the iframe\'s body <code>onload</code> event is triggered'
      }, {
        name: 'load',
        description: 'Triggered after the iframe\'s <code>document.onreadystatechange</code> triggers and the document\s <code>readyState</code> is <code>complete</code>'
      }]
    };
  },

  methods: {}
};
module.exports = exports['default'];

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "events"
    }
  }, [_c('h2', [_vm._v("Events")]), _vm._v(" "), _c('table', {
    staticClass: "options-table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.events), function(event) {
    return _c('tr', [_c('td', [_c('code', [_vm._v(_vm._s(event.name))])]), _vm._v(" "), _c('td', {
      domProps: {
        "innerHTML": _vm._s(event.description)
      }
    })])
  }), 0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("\n          Event\n        ")]), _vm._v(" "), _c('th', [_vm._v("\n          Description\n        ")])])])
}]}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(48)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(50),
  /* template */
  __webpack_require__(51),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(49);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ef226b20", content, true, {});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#examples .iframe-wrapper{border:1px solid gray;height:600px}#examples .iframe-wrapper .vue-friendly-iframe,#examples .iframe-wrapper .vue-friendly-iframe iframe{height:100%;width:100%}", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'examples',
  data: function data() {
    return {
      example1Form: {
        src: 'https://www.pexels.com/search',
        searchTerm: 'tiger'
      },
      iframeLoading: true
    };
  },

  methods: {
    onLoad: function onLoad() {
      console.log('iframe loaded');

      this.iframeLoading = false;
    },
    onIframeLoad: function onIframeLoad() {
      console.log('iframe loaded');
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "examples"
    }
  }, [_c('h2', [_vm._v("Example")]), _vm._v(" "), _c('div', {
    staticClass: "example-1"
  }, [_c('form', [_c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Enter a search term:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.example1Form.searchTerm),
      expression: "example1Form.searchTerm"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.example1Form.searchTerm)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.example1Form, "searchTerm", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Iframe URL:")]), _vm._v(" "), _c('input', {
    staticClass: "form-control",
    attrs: {
      "readonly": "readonly"
    },
    domProps: {
      "value": _vm.example1Form.src + '/' + _vm.example1Form.searchTerm
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "iframe-wrapper"
  }, [(_vm.iframeLoading) ? _c('div', {
    staticClass: "iframe-loading"
  }, [_vm._v("\n        iframe loading...\n      ")]) : _vm._e(), _vm._v(" "), _c('vue-friendly-iframe', {
    ref: "iframeEl",
    style: ({
      'display': _vm.iframeLoading ? 'none' : 'block'
    }),
    attrs: {
      "src": _vm.example1Form.src + '/' + _vm.example1Form.searchTerm,
      "frameborder": "0",
      "gesture": "media",
      "allow": "encrypted-media",
      "sandbox": "allow-same-origin allow-scripts"
    },
    on: {
      "load": _vm.onLoad,
      "iframe-load": _vm.onIframeLoad
    }
  })], 1)])])
},staticRenderFns: []}

/***/ })
/******/ ]);