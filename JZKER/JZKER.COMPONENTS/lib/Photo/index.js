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
/******/ 	return __webpack_require__(__webpack_require__.s = 238);
/******/ })
/************************************************************************/
/******/ ({

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Photo = __webpack_require__(239);

var _Photo2 = _interopRequireDefault(_Photo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Photo2.default;

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _Photo = __webpack_require__(240);

var _Photo2 = _interopRequireDefault(_Photo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = (_temp2 = _class = function (_React$PureComponent) {
	_inherits(Photo, _React$PureComponent);

	function Photo() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Photo);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Photo.__proto__ || Object.getPrototypeOf(Photo)).call.apply(_ref, [this].concat(args))), _this), _this.lookPic = function () {
			if (window.WeixinJSBridge) {
				WeixinJSBridge.invoke('imagePreview', {
					"current": _this.props.src,
					"urls": [_this.props.src]
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Photo, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: classnames(_Photo2.default["Photo"], this.props.className), style: this.PhotoStyle, onClick: this.props.zoom ? this.lookPic : null },
				this.TipsComponent
			);
		}
	}, {
		key: "PhotoStyle",
		get: function get() {
			var _props = this.props,
			    src = _props.src,
			    size = _props.size,
			    shape = _props.shape,
			    style = _props.style,
			    borderColor = _props.borderColor,
			    borderWidth = _props.borderWidth;

			var BaseStyle = Object.assign({
				backgroundImage: "url(" + src + ")"
			}, {
				width: size + "px",
				height: size + "px",
				border: borderColor + " " + borderWidth + " solid"
			}, style);
			if (shape == "fang") {
				return BaseStyle;
			}
			if (shape == "yuan") {
				return Object.assign(BaseStyle, {
					borderRadius: size + "px"
				});
			}
		}
	}, {
		key: "TipsComponent",
		get: function get() {
			if (this.props.tip) {
				return React.createElement(
					"div",
					{ className: _Photo2.default["Photo-tip"] },
					this.props.tip
				);
			} else {
				return null;
			}
		}
	}]);

	return Photo;
}(React.PureComponent), _class.defaultProps = {
	size: 50,
	zoom: false,
	shape: "yuan",
	borderColor: "#ffffff",
	borderWidth: "3px"
}, _class.propTypes = {
	tip: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	src: PropTypes.string,
	size: PropTypes.number,
	zoom: PropTypes.bool,
	shape: PropTypes.oneOf(["yuan", "fang"])
}, _temp2);
exports.default = Photo;

/***/ }),

/***/ 240:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"Photo":"Photo-2wuomX8D066b_2mekTN0Ve","Photo-tip":"Photo-tip-3fUda62fUyeDAnliiwwYdI"};

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map