(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 233);
/******/ })
/************************************************************************/
/******/ ({

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Page = __webpack_require__(234);

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Page2.default;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _Page = __webpack_require__(235);

var _Page2 = _interopRequireDefault(_Page);

var _PageOther = __webpack_require__(236);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = (_temp = _class = function (_React$PureComponent) {
	_inherits(Page, _React$PureComponent);

	_createClass(Page, [{
		key: "render",
		value: function render() {
			var Page = classnames(_Page2.default["Page"], this.props.className);
			return React.createElement(
				"div",
				{ className: Page },
				React.createElement(
					"div",
					{ className: _Page2.default["Page_Top"] },
					this.TopChild
				),
				React.createElement(
					"div",
					{
						//ref="PageMiddle" 
						className: _Page2.default["Page_Middle"]
					},
					this.MiddleChild
				),
				React.createElement(
					"div",
					{ className: _Page2.default["Page_Bottom"] },
					this.BottomChild
				)
			);
		}
	}]);

	function Page(props) {
		_classCallCheck(this, Page);

		var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

		_this.scroll = function () {
			var PageMiddle = _this.PageMiddle.current;
			document.body.scrollIntoView(false);
			if (PageMiddle) {
				PageMiddle.scrollIntoView(false);
			} else {
				return false;
			}
		};

		_this.PageMiddle = React.createRef();
		return _this;
	}
	//以下代码是为了解决ios键盘兼容性的问题
	/*	stopContextMenu(e){
 		e.preventDefault()
 	}*/


	_createClass(Page, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			//document.addEventListener("contextmenu",this.stopContextMenu,true)
			window.addEventListener("resize", this.scroll, true);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("resize", this.scroll, true);
		}
	}, {
		key: "TopChild",
		get: function get() {
			return React.Children.map(this.props.children, function (child, index) {
				if (!child) {
					return false;
				};
				switch (child.type.componentName) {
					case "TopBar":
						return child;
						break;
					case "PageTop":
						return child;
						break;
					case "PageTopSplit":
						return child;
						break;
					default:
						return null;
				}
			});
		}
	}, {
		key: "MiddleChild",
		get: function get() {
			return React.Children.map(this.props.children, function (child, index) {
				if (!child) {
					return false;
				};
				switch (child.type.componentName) {
					case "NavBar":
						return null;
						break;
					case "TopBar":
						return null;
						break;
					case "PageTop":
						return null;
						break;
					case "PageBottom":
						return null;
						break;
					case "PageTopSplit":
						return null;
						break;
					default:
						return child;
				}
			});
		}
	}, {
		key: "BottomChild",
		get: function get() {
			return React.Children.map(this.props.children, function (child, index) {
				if (!child) {
					return false;
				};
				switch (child.type.componentName) {
					case "NavBar":
						return child;
						break;
					case "PageBottom":
						return child;
						break;
					default:
						return null;
				}
			});
		}
	}]);

	return Page;
}(React.PureComponent), _class.Top = _PageOther.PageTop, _class.Bottom = _PageOther.PageBottom, _class.Split = _PageOther.PageTopSplit, _class.componentName = "Page", _temp);
exports.default = Page;

/***/ }),

/***/ 235:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"Page":"Page-3kiKVrGU7Nxj-Yto2Fw36V","Page_Middle":"Page_Middle-2-uvZQX9W8NXZTTA87lVRC","PageTransition-appear":"PageTransition-appear-zmwTq0ER3CF8YhDbTDGbB","PageTransition-appear-active":"PageTransition-appear-active-1Ot3wR3xCnmmXb5vQr4mk3"};

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PageBottom = exports.PageTopSplit = exports.PageTop = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _class2, _temp2;

var _PageOther = __webpack_require__(237);

var _PageOther2 = _interopRequireDefault(_PageOther);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageTop = (_temp = _class = function (_React$PureComponent) {
	_inherits(PageTop, _React$PureComponent);

	function PageTop() {
		_classCallCheck(this, PageTop);

		return _possibleConstructorReturn(this, (PageTop.__proto__ || Object.getPrototypeOf(PageTop)).apply(this, arguments));
	}

	_createClass(PageTop, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: classnames(_PageOther2.default["Page_top_comp"], this.props.className), style: this.props.style },
				this.props.children
			);
		}
	}]);

	return PageTop;
}(React.PureComponent), _class.componentName = "PageTop", _temp);
exports.PageTop = PageTop;


var PageTopSplit = function PageTopSplit(props) {
	return React.createElement("div", { className: _PageOther2.default["PageTopSplit"] });
};
PageTopSplit.componentName = "PageTopSplit";
exports.PageTopSplit = PageTopSplit;
var PageBottom = (_temp2 = _class2 = function (_React$PureComponent2) {
	_inherits(PageBottom, _React$PureComponent2);

	function PageBottom() {
		_classCallCheck(this, PageBottom);

		return _possibleConstructorReturn(this, (PageBottom.__proto__ || Object.getPrototypeOf(PageBottom)).apply(this, arguments));
	}

	_createClass(PageBottom, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: classnames(_PageOther2.default["Page_bottom_comp"], this.props.className), style: this.props.style },
				this.props.children
			);
		}
	}]);

	return PageBottom;
}(React.PureComponent), _class2.componentName = "PageBottom", _temp2);
exports.PageBottom = PageBottom;

/***/ }),

/***/ 237:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"Page_top_comp":"Page_top_comp-35n6QQhkJroW9ybq51B0Kg","PageTopSplit":"PageTopSplit-3z1tL-fI_ahS92wXM4_DzN"};

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map