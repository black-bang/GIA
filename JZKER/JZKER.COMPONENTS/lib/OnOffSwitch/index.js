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
/******/ 	return __webpack_require__(__webpack_require__.s = 230);
/******/ })
/************************************************************************/
/******/ ({

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OnOffSwitch = __webpack_require__(231);

var _OnOffSwitch2 = _interopRequireDefault(_OnOffSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _OnOffSwitch2.default;

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _OnOffSwitch = __webpack_require__(232);

var _OnOffSwitch2 = _interopRequireDefault(_OnOffSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OnOffSwitch = (_temp = _class = function (_React$Component) {
	_inherits(OnOffSwitch, _React$Component);

	_createClass(OnOffSwitch, [{
		key: "render",
		value: function render() {
			var _classnames, _classnames2;

			var switchClass = classnames((_classnames = {}, _defineProperty(_classnames, _OnOffSwitch2.default["OnOffSwitch"], true), _defineProperty(_classnames, _OnOffSwitch2.default["OnOffSwitch-on"], this.state.status), _defineProperty(_classnames, _OnOffSwitch2.default["OnOffSwitch-off"], !this.state.status), _classnames));
			var switchPointClass = classnames((_classnames2 = {}, _defineProperty(_classnames2, _OnOffSwitch2.default["switchPoint"], true), _defineProperty(_classnames2, _OnOffSwitch2.default["switchPoint-on"], this.state.status), _defineProperty(_classnames2, _OnOffSwitch2.default["switchPoint-off"], !this.state.status), _classnames2));
			return React.createElement(
				"div",
				{ className: switchClass },
				React.createElement("div", { className: switchPointClass, onClick: this.handleClick })
			);
		}
	}]);

	function OnOffSwitch(props) {
		_classCallCheck(this, OnOffSwitch);

		var _this = _possibleConstructorReturn(this, (OnOffSwitch.__proto__ || Object.getPrototypeOf(OnOffSwitch)).call(this, props));

		_this.handleClick = function () {
			var status = !_this.state.status;
			_this.setState({ status: status });
			_this.props.onChange({ keyname: _this.props.keyname, keyvalue: status });
		};

		_this.state = { status: false };
		return _this;
	}

	_createClass(OnOffSwitch, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.forceUpdate();
		}
	}, {
		key: "componentWillUpdate",
		value: function componentWillUpdate(nextProps, nextState) {
			if (nextProps.relation == undefined) {
				return false;
			}
			if (nextProps.relation == null) {
				return false;
			}
			nextState.status = nextProps.relation;
		}
	}]);

	return OnOffSwitch;
}(React.Component), _class.propTypes = {
	relation: PropTypes.bool,
	onChange: PropTypes.func,
	keyname: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}, _class.defaultProps = {
	onChange: function onChange(statusOBJ) {
		console.log(statusOBJ);
	}
}, _temp);
exports.default = OnOffSwitch;

/***/ }),

/***/ 232:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"OnOffSwitch":"OnOffSwitch-dWe4AOf6t38ZaV8aeh-HG","switchPoint":"switchPoint-8OOe15P3ueRWPyQ7XUuLp","OnOffSwitch-on":"OnOffSwitch-on-6mWmb465sIYsxSpZ3MNqG","switchPoint-on":"switchPoint-on-2EyrQ-m9NXmABXmL4uvGDj","OnOffSwitch-off":"OnOffSwitch-off-3aRtxcPOWrTCcBpTusSkNr","switchPoint-off":"switchPoint-off-1KhuEHIUuF9JRw-U6_ii-w"};

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map