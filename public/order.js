/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/base-page.js":
/*!************************************!*\
  !*** ./src/assets/js/base-page.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/classCallCheck'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/createClass'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\nvar BasePage = /*#__PURE__*/function () {\n  function BasePage() {\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/classCallCheck'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this, BasePage);\n  }\n  return Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/createClass'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(BasePage, [{\n    key: \"onReady\",\n    value: function onReady() {\n      //\n    }\n  }, {\n    key: \"registerEvents\",\n    value: function registerEvents() {\n      //\n    }\n\n    /**\n     * To avoid loading unwanted classes, unless it's wanted page\n     * @param {null|string[]} allowedPages\n     * @return {*}\n     */\n  }, {\n    key: \"initiate\",\n    value: function initiate(allowedPages) {\n      if (allowedPages && !allowedPages.includes(salla.config.get('page.slug'))) {\n        return app.log(\"The Class For (\".concat(allowedPages.join(','), \") Skipped.\"));\n      }\n      this.onReady();\n      this.registerEvents();\n      app.log(\"The Class For (\".concat((allowedPages === null || allowedPages === void 0 ? void 0 : allowedPages.join(',')) || '*', \") Loaded\\uD83C\\uDF89\"));\n    }\n  }]);\n}();\n/**\n * Because we merged multi classes into one file, there is no need to initiate all of them\n */\nBasePage.initiateWhenReady = function () {\n  var _window$app,\n    _this = this;\n  var allowedPages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n  if (((_window$app = window.app) === null || _window$app === void 0 ? void 0 : _window$app.status) === 'ready') {\n    new this().initiate(allowedPages);\n  } else {\n    document.addEventListener('theme::ready', function () {\n      return new _this().initiate(allowedPages);\n    });\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasePage);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/base-page.js?");

/***/ }),

/***/ "./src/assets/js/order.js":
/*!********************************!*\
  !*** ./src/assets/js/order.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/classCallCheck'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/createClass'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/possibleConstructorReturn'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/getPrototypeOf'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/inherits'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-page */ \"./src/assets/js/base-page.js\");\n\n\n\n\n\nfunction _callSuper(t, o, e) { return o = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/getPrototypeOf'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(o), Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/possibleConstructorReturn'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/getPrototypeOf'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(t).constructor) : o.apply(t, e)); }\nfunction _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }\n\nvar Order = /*#__PURE__*/function (_BasePage) {\n  function Order() {\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/classCallCheck'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this, Order);\n    return _callSuper(this, Order, arguments);\n  }\n  Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/inherits'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(Order, _BasePage);\n  return Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@babel/runtime/helpers/createClass'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(Order, [{\n    key: \"onReady\",\n    value: function onReady() {\n      app.onClick('salla-button#btn-reorder', function (_ref) {\n        var btn = _ref.currentTarget;\n        return btn.load().then(function () {\n          return salla.order.createCartFromOrder();\n        }).then(function () {\n          return btn.stop();\n        }).then(function () {\n          return app.element('#reorder-modal').hide();\n        });\n      });\n      app.onClick('salla-button#confirm-cancel', function (_ref2) {\n        var btn = _ref2.currentTarget;\n        return btn.load().then(function () {\n          return salla.order.cancel();\n        }).then(function () {\n          return btn.stop() && app.element('#modal-order-cancel').hide();\n        }).then(function () {\n          return window.location.reload();\n        })[\"catch\"](function () {\n          return btn.stop() && app.element('#modal-order-cancel').hide();\n        });\n      });\n    }\n  }]);\n}(_base_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nOrder.initiateWhenReady(['customer.orders.single']);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/order.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/order.js");
/******/ 	
/******/ })()
;