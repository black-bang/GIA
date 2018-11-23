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
/******/ 	return __webpack_require__(__webpack_require__.s = 275);
/******/ })
/************************************************************************/
/******/ ({

/***/ 208:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"TopBar":"TopBar-BZvEO71ugmKz8eGY5PrMl","TopBar-top":"TopBar-top-3_Z_eAweSvPqBmHEGpakWd","TopBar_Left":"TopBar_Left-eUKcLguC9HbFLrw9K_RY-","TopBar_Left_comp":"TopBar_Left_comp-V3iNLFq_GF_sQIjAVxdvx","TopBarBack":"TopBarBack-3rOVnz5e-ZotK3fmg_cz-x","TopBar_Middle":"TopBar_Middle-3tgAuoRG8oIBeRjEREjBCH","TopBar_Middle_comp":"TopBar_Middle_comp-20-G77EOd23YNG3OQaT43W","TopBar_Right":"TopBar_Right-2RSxsOzmaqyxhDp78nFhUz","TopBar_Right_comp":"TopBar_Right_comp-6uFzlgPT7JqOd0YtOXKgR","TopBar-hide":"TopBar-hide-2e3qie-4E-02io35sDZNfT"};

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TopBar = __webpack_require__(276);

var _TopBar2 = _interopRequireDefault(_TopBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TopBar2.default;

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _TopBar = __webpack_require__(208);

var _TopBar2 = _interopRequireDefault(_TopBar);

var _TopBarOther = __webpack_require__(277);

var TopBarOther = _interopRequireWildcard(_TopBarOther);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import WeiChatWebView from "publicApi/WeiChatWebView.js"

var TopBar = (_temp = _class = function (_React$PureComponent) {
	_inherits(TopBar, _React$PureComponent);

	function TopBar() {
		_classCallCheck(this, TopBar);

		return _possibleConstructorReturn(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).apply(this, arguments));
	}

	_createClass(TopBar, [{
		key: "render",
		value: function render() {
			var TopBar = classnames(_TopBar2.default["TopBar"], this.props.className);
			return React.createElement(
				"div",
				{ className: TopBar, style: this.props.style },
				React.createElement(
					"div",
					{ className: _TopBar2.default["TopBar-top"] },
					React.createElement(
						"div",
						{ className: _TopBar2.default["TopBar_Left"] },
						this.LeftChild
					),
					React.createElement(
						"div",
						{ className: _TopBar2.default["TopBar_Middle"] },
						this.MiddleChild
					),
					React.createElement(
						"div",
						{ className: _TopBar2.default["TopBar_Right"] },
						this.RightChild
					)
				),
				React.createElement(
					"div",
					{ className: _TopBar2.default["TopBar-extendTool"] },
					this.ExtendChild
				)
			);
		}
	}, {
		key: "isPureTitle",
		get: function get() {
			//是否是纯粹的标题栏
			return !React.Children.map(this.props.children, function (child, index) {
				return child.type.componentName === "TopBarMiddle";
			}).includes(false);
		}
	}, {
		key: "LeftChild",
		get: function get() {
			return React.Children.map(this.props.children, function (child, index) {
				if (child.type.componentName === "TopBarLeft") {
					return child;
				};
			});
		}
	}, {
		key: "MiddleChild",
		get: function get() {
			return React.Children.map(this.props.children, function (child, index) {
				if (child.type.componentName === "TopBarMiddle") {
					return child;
				};
			});
		}
	}, {
		key: "RightChild",
		get: function get() {
			return React.Children.map(this.props.children, function (child, index) {
				if (child.type.componentName === "TopBarRight") {
					return child;
				};
			});
		}
	}, {
		key: "ExtendChild",
		get: function get() {
			return React.Children.map(this.props.children, function (child, index) {
				if (child.type.componentName === "TopBarExtendTool") {
					return child;
				};
			});
		}
	}]);

	return TopBar;
}(React.PureComponent), _class.componentName = "TopBar", _class.Left = TopBarOther.TopBarLeft, _class.Middle = TopBarOther.TopBarMiddle, _class.Right = TopBarOther.TopBarRight, _class.Extend = TopBarOther.TopBarExtendTool, _class.Back = TopBarOther.TopBarBack, _temp);
exports.default = TopBar;

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TopBarBack = exports.TopBarExtendTool = exports.TopBarRight = exports.TopBarMiddle = exports.TopBarLeft = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TopBar = __webpack_require__(208);

var _TopBar2 = _interopRequireDefault(_TopBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopBarLeft = function (_React$PureComponent) {
	_inherits(TopBarLeft, _React$PureComponent);

	function TopBarLeft() {
		_classCallCheck(this, TopBarLeft);

		return _possibleConstructorReturn(this, (TopBarLeft.__proto__ || Object.getPrototypeOf(TopBarLeft)).apply(this, arguments));
	}

	_createClass(TopBarLeft, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: _TopBar2.default["TopBar_Left_comp"] },
				this.props.children
			);
		}
	}]);

	return TopBarLeft;
}(React.PureComponent);

TopBarLeft.componentName = "TopBarLeft";
exports.TopBarLeft = TopBarLeft;

var TopBarMiddle = function (_React$PureComponent2) {
	_inherits(TopBarMiddle, _React$PureComponent2);

	function TopBarMiddle() {
		_classCallCheck(this, TopBarMiddle);

		return _possibleConstructorReturn(this, (TopBarMiddle.__proto__ || Object.getPrototypeOf(TopBarMiddle)).apply(this, arguments));
	}

	_createClass(TopBarMiddle, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: _TopBar2.default["TopBar_Middle_comp"] },
				this.props.children
			);
		}
	}]);

	return TopBarMiddle;
}(React.PureComponent);

TopBarMiddle.componentName = "TopBarMiddle";
exports.TopBarMiddle = TopBarMiddle;

var TopBarRight = function (_React$PureComponent3) {
	_inherits(TopBarRight, _React$PureComponent3);

	function TopBarRight() {
		_classCallCheck(this, TopBarRight);

		return _possibleConstructorReturn(this, (TopBarRight.__proto__ || Object.getPrototypeOf(TopBarRight)).apply(this, arguments));
	}

	_createClass(TopBarRight, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: _TopBar2.default["TopBar_Right_comp"] },
				this.props.children
			);
		}
	}]);

	return TopBarRight;
}(React.PureComponent);

TopBarRight.componentName = "TopBarRight";
exports.TopBarRight = TopBarRight;

var TopBarExtendTool = function (_React$PureComponent4) {
	_inherits(TopBarExtendTool, _React$PureComponent4);

	function TopBarExtendTool() {
		_classCallCheck(this, TopBarExtendTool);

		return _possibleConstructorReturn(this, (TopBarExtendTool.__proto__ || Object.getPrototypeOf(TopBarExtendTool)).apply(this, arguments));
	}

	_createClass(TopBarExtendTool, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: _TopBar2.default["TopBarExtendTool"] },
				this.props.children
			);
		}
	}]);

	return TopBarExtendTool;
}(React.PureComponent);

TopBarExtendTool.componentName = "TopBarExtendTool";
exports.TopBarExtendTool = TopBarExtendTool;

var TopBarBack = function (_React$PureComponent5) {
	_inherits(TopBarBack, _React$PureComponent5);

	function TopBarBack() {
		_classCallCheck(this, TopBarBack);

		return _possibleConstructorReturn(this, (TopBarBack.__proto__ || Object.getPrototypeOf(TopBarBack)).apply(this, arguments));
	}

	_createClass(TopBarBack, [{
		key: "render",
		value: function render() {
			var Back = classnames({
				TopBarBack: true
			});
			return (
				/*	if(props.to){
    		return (
    			<NavLink className={Back} to={props.to} >
    				<Icon icon={props.icon?props.icon:"tabber_icon_2"}/>
    			</NavLink>
    		)		
    	}else{
    		return (
    			<div className={Back} onClick={function(){
    				history.goBack()
    			}}>
    				<Icon icon={props.icon?props.icon:"tabber_icon_2"}/>
    			</div>		
    		)
    	}*/
				React.createElement("div", null)
			);
		}
	}]);

	return TopBarBack;
}(React.PureComponent);
//const TopBarBack=function(props){
//const Back=classnames({
//TopBarBack:true
//})
/*	if(props.to){
		return (
			<NavLink className={Back} to={props.to} >
				<Icon icon={props.icon?props.icon:"tabber_icon_2"}/>
			</NavLink>
		)		
	}else{
		return (
			<div className={Back} onClick={function(){
				history.goBack()
			}}>
				<Icon icon={props.icon?props.icon:"tabber_icon_2"}/>
			</div>		
		)
	}*/
//return <div></div>
//}


TopBarBack.componentName = "TopBarBack";
exports.TopBarBack = TopBarBack;

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map