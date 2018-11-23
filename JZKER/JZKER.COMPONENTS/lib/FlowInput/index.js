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
/******/ 	return __webpack_require__(__webpack_require__.s = 214);
/******/ })
/************************************************************************/
/******/ ({

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FlowInput = __webpack_require__(215);

var _FlowInput2 = _interopRequireDefault(_FlowInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FlowInput2.default;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _FlowInput = __webpack_require__(216);

var _FlowInput2 = _interopRequireDefault(_FlowInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowInput = (_temp = _class = function (_React$Component) {
	_inherits(FlowInput, _React$Component);

	_createClass(FlowInput, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: classnames(_FlowInput2.default["FlowInput-shell"], this.props.className) },
				React.createElement("input", {
					type: "text",
					value: this.state.value,
					ref: "inputElement",
					className: _FlowInput2.default["InputElement"],
					onKeyDown: this.handleEnter,
					onFocus: this.handleFocus,
					onChange: this.handleChange,
					onBlur: this.handleBlur,
					placeholder: this.props.placeholder
				}),
				React.createElement(
					"div",
					{ className: _FlowInput2.default["ComputedSize"] },
					this.state.value || this.props.placeholder
				)
			);
		}
	}]);

	function FlowInput(props) {
		_classCallCheck(this, FlowInput);

		var _this = _possibleConstructorReturn(this, (FlowInput.__proto__ || Object.getPrototypeOf(FlowInput)).call(this, props));

		_this.handleEnter = function (e) {
			var value = e.target.value;
			if (e.keyCode == 13) {
				_this.setState({ status: "ONBLUR" });
				_this.refs["inputElement"].blur();
				_this.props.onEnter({ keyname: _this.props.keyname, keyvalue: value });
			}
		};

		_this.handleFocus = function (e) {
			var value = e.target.value;
			_this.setState({ status: "ONFOCUS" });
			_this.props.onFocus({ keyname: _this.props.keyname, keyvalue: value });
		};

		_this.handleChange = function (e) {
			var value = e.target.value;
			if (value.length > _this.props.maxLength) {
				return false;
			}
			_this.setState({ value: value, status: "ONCHANGE" });
			_this.props.onChange({ keyname: _this.props.keyname, keyvalue: value });
		};

		_this.handleBlur = function (e) {
			var value = e.target.value;
			_this.setState({ status: "ONBLUR" });
			_this.props.onBlur({ keyname: _this.props.keyname, keyvalue: value });
		};

		_this.state = { value: "", status: "ONBLUR" };
		return _this;
	}

	_createClass(FlowInput, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.forceUpdate();
		}
	}, {
		key: "componentWillUpdate",
		value: function componentWillUpdate(nextProps, nextState) {
			if (nextProps.relation == null) {
				return false;
			}
			if (nextProps.relation == undefined) {
				return false;
			}
			if (nextState.status !== "ONBLUR") {
				return false;
			}
			nextState.value = nextProps.relation;
		}
	}]);

	return FlowInput;
}(React.Component), _class.propTypes = {
	onChange: PropTypes.func,
	maxLength: PropTypes.number,
	keyname: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	relation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	placeholder: PropTypes.string
}, _class.defaultProps = {
	onFocus: function onFocus() {},
	onChange: function onChange() {},
	onBlur: function onBlur() {},
	onEnter: function onEnter() {},
	maxLength: 20,
	placeholder: "未填写"
}, _temp);
exports.default = FlowInput;

/***/ }),

/***/ 216:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"FlowInput-shell":"FlowInput-shell-2Ggrwzp3J6lnCireGztWf5","InputElement":"InputElement-1L1v0HYsKCGHRjwch4ttsC","ComputedSize":"ComputedSize-j0mjCsUinWPxiPJx246N8"};

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map