webpackJsonp([23],{

/***/ 1040:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 *
 * The decorator may be used on classes or methods
 * ```
 * @autobind
 * class FullBound {}
 *
 * class PartBound {
 *   @autobind
 *   method () {}
 * }
 * ```
 */


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = autobind;

function autobind() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 1) {
    return boundClass.apply(undefined, args);
  } else {
    return boundMethod.apply(undefined, args);
  }
}

/**
 * Use boundMethod to bind all methods on the target.prototype
 */
function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys = undefined;
  // Use Reflect if exists
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype);
    // use symbols if support is provided
    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error('@autobind decorator can only be applied to methods not: ' + typeof fn);
  }

  // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.
  var definingProperty = false;

  return {
    configurable: true,
    get: function get() {
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
        return fn;
      }

      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      definingProperty = false;
      return boundFn;
    }
  };
}
module.exports = exports['default'];


/***/ }),

/***/ 1069:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalThankYou = function ModalThankYou() {
    return _react2.default.createElement(
        "div",
        { className: "thankYou" },
        _react2.default.createElement(
            "div",
            { className: "wrap" },
            _react2.default.createElement("img", { loading: "lazy", src: "/images/design/heart.png", alt: "" }),
            _react2.default.createElement(
                "p",
                null,
                "Vielen Dank f\xFCr Ihr wertvolles Feedback!"
            )
        )
    );
};

ModalThankYou.propTypes = {};
ModalThankYou.defaultProps = {};

exports.default = ModalThankYou;

/***/ }),

/***/ 1070:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Label;

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ignore
 * @param {Object} props
 * @param {InputRangeClassNames} props.classNames
 * @param {Function} props.formatLabel
 * @param {string} props.type
 */
function Label(props) {
  var labelValue = props.formatLabel ? props.formatLabel(props.children, props.type) : props.children;

  return _react2.default.createElement(
    'span',
    { className: props.classNames[props.type + 'Label'] },
    _react2.default.createElement(
      'span',
      { className: props.classNames.labelContainer },
      labelValue
    )
  );
}

/**
 * @type {Object}
 * @property {Function} children
 * @property {Function} classNames
 * @property {Function} formatLabel
 * @property {Function} type
 */
Label.propTypes = {
  children: _propTypes2.default.node.isRequired,
  classNames: _propTypes2.default.objectOf(_propTypes2.default.string).isRequired,
  formatLabel: _propTypes2.default.func,
  type: _propTypes2.default.string.isRequired
};
module.exports = exports['default'];
//# sourceMappingURL=label.js.map

/***/ }),

/***/ 1104:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1105);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(768)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./Slick-theme.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./Slick-theme.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1105:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(767)(false);
// imports


// module
exports.push([module.i, "/* Arrows */\r\n.slick-prev,\r\n.slick-next\r\n{\r\n    font-size: 0;\r\n    line-height: 0;\r\n\r\n    position: absolute;\r\n    top: 50%;\r\n\r\n    display: block;\r\n\r\n    width: 20px;\r\n    height: 20px;\r\n    padding: 0;\r\n    -webkit-transform: translate(0, -50%);\r\n    -ms-transform: translate(0, -50%);\r\n    transform: translate(0, -50%);\r\n\r\n    cursor: pointer;\r\n\r\n    color: transparent;\r\n    border: none;\r\n    outline: none;\r\n    background: transparent;\r\n}\r\n.slick-prev:hover,\r\n.slick-prev:focus,\r\n.slick-next:hover,\r\n.slick-next:focus\r\n{\r\n    color: transparent;\r\n    outline: none;\r\n    background: transparent;\r\n}\r\n.slick-prev:hover:before,\r\n.slick-prev:focus:before,\r\n.slick-next:hover:before,\r\n.slick-next:focus:before\r\n{\r\n    opacity: 1;\r\n}\r\n.slick-prev.slick-disabled:before,\r\n.slick-next.slick-disabled:before\r\n{\r\n    opacity: .25;\r\n}\r\n\r\n.slick-prev:before,\r\n.slick-next:before\r\n{\r\n    font-family: 'slick';\r\n    font-size: 20px;\r\n    line-height: 1;\r\n\r\n    opacity: .75;\r\n    color: white;\r\n\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.slick-prev\r\n{\r\n    left: -25px;\r\n}\r\n[dir='rtl'] .slick-prev\r\n{\r\n    right: -25px;\r\n    left: auto;\r\n}\r\n.slick-prev:before\r\n{\r\n    content: '\\2190';\r\n}\r\n[dir='rtl'] .slick-prev:before\r\n{\r\n    content: '\\2192';\r\n}\r\n\r\n.slick-next\r\n{\r\n    right: -25px;\r\n}\r\n[dir='rtl'] .slick-next\r\n{\r\n    right: auto;\r\n    left: -25px;\r\n}\r\n.slick-next:before\r\n{\r\n    content: '\\2192';\r\n}\r\n[dir='rtl'] .slick-next:before\r\n{\r\n    content: '\\2190';\r\n}\r\n\r\n/* Dots */\r\n.slick-dotted.slick-slider\r\n{\r\n    margin-bottom: 30px;\r\n}\r\n\r\n.slick-dots\r\n{\r\n    position: absolute;\r\n    bottom: -25px;\r\n\r\n    display: block;\r\n\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n\r\n    list-style: none;\r\n\r\n    text-align: center;\r\n}\r\n.slick-dots li\r\n{\r\n    position: relative;\r\n\r\n    display: inline-block;\r\n\r\n    width: 20px;\r\n    height: 20px;\r\n    margin: 0 5px;\r\n    padding: 0;\r\n\r\n    cursor: pointer;\r\n}\r\n.slick-dots li button\r\n{\r\n    font-size: 0;\r\n    line-height: 0;\r\n\r\n    display: block;\r\n\r\n    width: 20px;\r\n    height: 20px;\r\n    padding: 5px;\r\n\r\n    cursor: pointer;\r\n\r\n    color: transparent;\r\n    border: 0;\r\n    outline: none;\r\n    background: transparent;\r\n}\r\n.slick-dots li button:hover,\r\n.slick-dots li button:focus\r\n{\r\n    outline: none;\r\n}\r\n.slick-dots li button:hover:before,\r\n.slick-dots li button:focus:before\r\n{\r\n    opacity: 1;\r\n}\r\n.slick-dots li button:before\r\n{\r\n    font-family: 'slick';\r\n    font-size: 6px;\r\n    line-height: 20px;\r\n\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n\r\n    width: 20px;\r\n    height: 20px;\r\n\r\n    content: '\\2022';\r\n    text-align: center;\r\n\r\n    opacity: .25;\r\n    color: black;\r\n\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\r\n}\r\n.slick-dots li.slick-active button:before\r\n{\r\n    opacity: .75;\r\n    color: black;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 1106:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1107);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(768)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./Slick.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./Slick.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1107:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(767)(false);
// imports


// module
exports.push([module.i, "/* Slider */\r\n.slick-slider\r\n{\r\n    position: relative;\r\n\r\n    display: block;\r\n    box-sizing: border-box;\r\n\r\n    -webkit-user-select: none;\r\n       -moz-user-select: none;\r\n        -ms-user-select: none;\r\n            user-select: none;\r\n\r\n    -webkit-touch-callout: none;\r\n    -khtml-user-select: none;\r\n    -ms-touch-action: pan-y;\r\n        touch-action: pan-y;\r\n    -webkit-tap-highlight-color: transparent;\r\n}\r\n\r\n.slick-list\r\n{\r\n    position: relative;\r\n\r\n    display: block;\r\n    overflow: hidden;\r\n\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n.slick-list:focus\r\n{\r\n    outline: none;\r\n}\r\n.slick-list.dragging\r\n{\r\n    cursor: pointer;\r\n    cursor: hand;\r\n}\r\n\r\n.slick-slider .slick-track,\r\n.slick-slider .slick-list\r\n{\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n       -moz-transform: translate3d(0, 0, 0);\r\n        -ms-transform: translate3d(0, 0, 0);\r\n         -o-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.slick-track\r\n{\r\n    position: relative;\r\n    top: 0;\r\n    left: 0;\r\n\r\n    display: block;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n}\r\n.slick-track:before,\r\n.slick-track:after\r\n{\r\n    display: table;\r\n\r\n    content: '';\r\n}\r\n.slick-track:after\r\n{\r\n    clear: both;\r\n}\r\n.slick-loading .slick-track\r\n{\r\n    visibility: hidden;\r\n}\r\n\r\n.slick-slide\r\n{\r\n    display: none;\r\n    float: left;\r\n\r\n    height: 100%;\r\n    min-height: 1px;\r\n}\r\n[dir='rtl'] .slick-slide\r\n{\r\n    float: right;\r\n}\r\n.slick-slide img\r\n{\r\n    display: block;\r\n}\r\n.slick-slide.slick-loading img\r\n{\r\n    display: none;\r\n}\r\n.slick-slide.dragging img\r\n{\r\n    pointer-events: none;\r\n}\r\n.slick-initialized .slick-slide\r\n{\r\n    display: block;\r\n}\r\n.slick-loading .slick-slide\r\n{\r\n    visibility: hidden;\r\n}\r\n.slick-vertical .slick-slide\r\n{\r\n    display: block;\r\n\r\n    height: auto;\r\n\r\n    border: 1px solid transparent;\r\n}\r\n.slick-arrow.slick-hidden {\r\n    display: none;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 1120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inputRange = __webpack_require__(1165);

var _inputRange2 = _interopRequireDefault(_inputRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ignore
 * @typedef {Object} ClientRect
 * @property {number} height
 * @property {number} left
 * @property {number} top
 * @property {number} width
 */

/**
 * @typedef {Object} InputRangeClassNames
 * @property {string} activeTrack
 * @property {string} disabledInputRange
 * @property {string} inputRange
 * @property {string} labelContainer
 * @property {string} maxLabel
 * @property {string} minLabel
 * @property {string} slider
 * @property {string} sliderContainer
 * @property {string} track
 * @property {string} valueLabel
 */

/**
 * @typedef {Function} LabelFormatter
 * @param {number} value
 * @param {string} type
 * @return {string}
 */

/**
 * @ignore
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Range
 * @property {number} min - Min value
 * @property {number} max - Max value
 */

exports.default = _inputRange2.default;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactRecaptcha = __webpack_require__(992);

var _reactRecaptcha2 = _interopRequireDefault(_reactRecaptcha);

var _apiCookie = __webpack_require__(941);

var _modalThankYou = __webpack_require__(1069);

var _modalThankYou2 = _interopRequireDefault(_modalThankYou);

var _modalIfBadRating = __webpack_require__(1163);

var _modalIfBadRating2 = _interopRequireDefault(_modalIfBadRating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WriteRatingModal = function (_Component) {
    (0, _inherits3.default)(WriteRatingModal, _Component);

    function WriteRatingModal(props) {
        (0, _classCallCheck3.default)(this, WriteRatingModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WriteRatingModal.__proto__ || Object.getPrototypeOf(WriteRatingModal)).call(this, props));

        _this.state = {
            isAnonymous: false,
            starTitle: '',
            captcha: {
                isCheckCaptcha: false,
                errorCaptcha: false
            },
            errorStars: false,
            userData: {
                firstname: '',
                lastname: '',
                email: ''
            },
            ratingText: '',
            errorMaxLength: false,
            showModalWriteRating: false,
            showModalIfBadRating: false
        };

        _this.changeAnonymous = _this.changeAnonymous.bind(_this);
        _this.changeStarsValue = _this.changeStarsValue.bind(_this);
        _this.mouseOverStar = _this.mouseOverStar.bind(_this);
        _this.publishRating = _this.publishRating.bind(_this);
        _this.publishIsBadRating = _this.publishIsBadRating.bind(_this);
        _this.verifyCaptchaCallback = _this.verifyCaptchaCallback.bind(_this);
        _this.handleChangeUserData = _this.handleChangeUserData.bind(_this);
        _this.changeRatingText = _this.changeRatingText.bind(_this);
        _this.writeRating = _this.writeRating.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        _this.closeModalIfBadRating = _this.closeModalIfBadRating.bind(_this);
        _this.showThankYou = _this.showThankYou.bind(_this);
        _this._checkIsLogin = _this._checkIsLogin.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(WriteRatingModal, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.showModalWriteRating !== this.props.showModalWriteRating && nextProps.showModalWriteRating === true) {
                this.writeRating();
            }
        }
    }, {
        key: '_checkIsLogin',
        value: function _checkIsLogin() {
            if (this.props.user.isLogin && this.props.user.data) {
                this.setState({ userData: (0, _extends3.default)({}, this.state.userData, {
                        firstname: this.props.user.data.systemAddress.first_name,
                        lastname: this.props.user.data.systemAddress.last_name,
                        email: this.props.user.data.systemAddress.email
                    })
                });
            }
        }
    }, {
        key: 'changeRatingText',
        value: function changeRatingText(e) {
            if (e.target.value.length > 500) {
                this.setState({ errorMaxLength: true });
            } else this.setState({ ratingText: e.target.value, errorMaxLength: false });
        }
    }, {
        key: 'handleChangeUserData',
        value: function handleChangeUserData(e) {
            var _e$target = e.target,
                value = _e$target.value,
                name = _e$target.name,
                userData = this.state.userData;

            userData[name] = value;
            this.setState({ userData: userData });
        }
    }, {
        key: 'verifyCaptchaCallback',
        value: function verifyCaptchaCallback(res) {
            this.setState({ captcha: (0, _extends3.default)({}, this.state.captcha, { isCheckCaptcha: true, errorCaptcha: false }) });
        }
    }, {
        key: 'changeAnonymous',
        value: function changeAnonymous(e) {
            var checked = e.target.checked;

            this.setState({ isAnonymous: checked });
            this.setState({ captcha: (0, _extends3.default)({}, this.state.captcha, { isCheckCaptcha: false }) });
        }
    }, {
        key: 'mouseOverStar',
        value: function mouseOverStar() {
            var values = ['Ungenügend', 'Befriedigend', 'Gut', 'Sehr gut', 'Ausgezeichnet'],
                element = document.querySelector('input[name="stars"]:checked');
            if (element) this.setState({ starTitle: values[element.value - 1] });else this.setState({ starTitle: '' });
        }
    }, {
        key: 'changeStarsValue',
        value: function changeStarsValue(e) {
            var values = ['Ungenügend', 'Befriedigend', 'Gut', 'Sehr gut', 'Ausgezeichnet'],
                value = e.target.value,
                starHover = e.target.getAttribute('data-star');

            if (starHover) {
                this.setState({ starTitle: values[starHover - 1], errorStars: false });
            } else this.setState({ starTitle: values[value - 1], errorStars: false });
        }
    }, {
        key: 'closeModal',
        value: function closeModal(data) {
            if (data) {
                this.setState({ formData: data,
                    captcha: {
                        isCheckCaptcha: false,
                        errorCaptcha: false
                    },
                    isAnonymous: false,
                    starTitle: '',
                    ratingText: '',
                    errorMaxLength: false,
                    errorStars: false,
                    userData: {
                        firstname: '',
                        lastname: '',
                        email: ''
                    },
                    showModalWriteRating: false,
                    showModalIfBadRating: true }, function () {
                    return $('#modalBadRating').modal();
                });
            } else {
                this.setState({ captcha: {
                        isCheckCaptcha: false,
                        errorCaptcha: false
                    },
                    userData: {
                        firstname: '',
                        lastname: '',
                        email: ''
                    },
                    showModalWriteRating: false,
                    isAnonymous: false,
                    starTitle: '',
                    ratingText: '',
                    errorMaxLength: false,
                    errorStars: false });
            }
            if (this.props.closeShowModalWriteRating) this.props.closeShowModalWriteRating();
        }
    }, {
        key: 'showThankYou',
        value: function showThankYou() {
            var selector = window.isMobile ? '.thankYou' : '.thankYou .wrap';
            $('.thankYou').css({ display: 'block' });
            setTimeout(function () {
                return $(selector).css({ opacity: '1' });
            }, 500);

            setTimeout(function () {
                $(selector).css({ opacity: '0' });
                setTimeout(function () {
                    return $('.thankYou').css({ display: 'none' });
                }, 2500);
            }, 5000);
        }
    }, {
        key: 'publishRating',
        value: function publishRating(e) {
            var _this2 = this;

            e.preventDefault();
            var isStarsChecked = document.querySelector('input[name="stars"]:checked'),
                captcha = this.state.captcha;

            if (isStarsChecked && captcha.isCheckCaptcha) {
                var data = new FormData(document.forms.formWriteRating);
                data.append('anonym', this.state.isAnonymous ? 1 : 0);
                if (isStarsChecked.value > 3) {
                    document.getElementById('spinner-box-load').style.display = 'block';
                    axios.post('/api/addRating', data).then(function (result) {
                        document.getElementById('spinner-box-load').style.display = 'none';
                        if (result.status === 200) {
                            $('#modalWriteRating').modal('toggle');
                            _this2.closeModal();
                            _this2.showThankYou();
                            _apiCookie.cookieApi.setCookie('writeRating', 'true', { path: '/', expires: window.expireTimeWriteRating });
                        }
                    });
                } else {
                    $('#modalWriteRating').modal('toggle');
                    this.closeModal(data);
                }
            } else {
                if (!isStarsChecked) this.setState({ errorStars: 'Bitte Sterne auswählen' });
                if (!window.isGoogleConnection) {
                    this.setState({ captcha: (0, _extends3.default)({}, this.state.captcha, { isCheckCaptcha: true }) });
                } else if (!captcha.isCheckCaptcha) this.setState({ captcha: (0, _extends3.default)({}, this.state.captcha, { errorCaptcha: true }) });
            }
        }
    }, {
        key: 'writeRating',
        value: function writeRating() {
            var _this3 = this;

            if (!_apiCookie.cookieApi.getCookie('writeRating')) {
                this._checkIsLogin();
                this.setState({ showModalWriteRating: true }, function () {
                    return $('#modalWriteRating').modal();
                });
            } else {
                this.setState({ writeRatingToday: true });
                setTimeout(function () {
                    return _this3.setState({ writeRatingToday: false });
                }, 3000);
            }
        }
    }, {
        key: 'closeModalIfBadRating',
        value: function closeModalIfBadRating() {
            this.setState({ formData: null, showModalIfBadRating: false });
        }
    }, {
        key: 'publishIsBadRating',
        value: function publishIsBadRating(e) {
            var _this4 = this;

            e.preventDefault();
            var formData = this.state.formData,
                feedback = {
                type: document.forms.formIfBadRating.feedbackStatus.value,
                message: document.forms.formIfBadRating.feedbackText.value
            };

            formData.append('feedback', JSON.stringify(feedback));

            document.getElementById('spinner-box-load').style.display = 'block';
            axios.post('/api/addRating', formData).then(function (result) {
                document.getElementById('spinner-box-load').style.display = 'none';
                if (result.status === 200) {
                    $('#modalBadRating').modal('toggle');
                    _this4.closeModalIfBadRating();
                    _this4.showThankYou();
                    _apiCookie.cookieApi.setCookie('writeRating', 'true', { path: '/', expires: window.expireTimeWriteRating });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _state = this.state,
                isAnonymous = _state.isAnonymous,
                starTitle = _state.starTitle,
                captcha = _state.captcha,
                errorStars = _state.errorStars,
                userData = _state.userData,
                ratingText = _state.ratingText,
                errorMaxLength = _state.errorMaxLength,
                writeRatingToday = _state.writeRatingToday,
                showModalIfBadRating = _state.showModalIfBadRating,
                showModalWriteRating = _state.showModalWriteRating;

            return _react2.default.createElement(
                'div',
                { className: 'add-rating' },
                showModalWriteRating && _react2.default.createElement(
                    'div',
                    { className: 'modal',
                        id: 'modalWriteRating',
                        tabIndex: '-1',
                        role: 'dialog',
                        'data-keyboard': 'false',
                        'aria-labelledby': 'modalWriteRating' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-dialog', role: 'document' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-content' },
                            _react2.default.createElement(
                                'div',
                                { className: 'modal-header' },
                                _react2.default.createElement(
                                    'button',
                                    { onClick: function onClick() {
                                            return _this5.closeModal(false);
                                        }, type: 'button', className: 'close',
                                        'data-dismiss': 'modal', 'aria-label': 'Close' },
                                    _react2.default.createElement(
                                        'span',
                                        { 'aria-hidden': 'true' },
                                        '\xD7'
                                    )
                                ),
                                _react2.default.createElement(
                                    'h4',
                                    { className: 'modal-title', id: 'modalWriteRating' },
                                    'Neue Bewertung'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'modal-body' },
                                _react2.default.createElement(
                                    'form',
                                    { name: 'formWriteRating', onSubmit: this.publishRating },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'stars' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'wrapStars' },
                                            _react2.default.createElement('input', { type: 'radio', value: '5', id: 'star-5', name: 'stars' }),
                                            _react2.default.createElement('label', { onMouseOut: this.mouseOverStar,
                                                onMouseOver: this.changeStarsValue, 'data-star': '5', htmlFor: 'star-5' }),
                                            _react2.default.createElement('input', { type: 'radio', value: '4', id: 'star-4', name: 'stars' }),
                                            _react2.default.createElement('label', { onMouseOut: this.mouseOverStar,
                                                onMouseOver: this.changeStarsValue, 'data-star': '4', htmlFor: 'star-4' }),
                                            _react2.default.createElement('input', { type: 'radio', value: '3', id: 'star-3', name: 'stars' }),
                                            _react2.default.createElement('label', { onMouseOut: this.mouseOverStar,
                                                onMouseOver: this.changeStarsValue, 'data-star': '3', htmlFor: 'star-3' }),
                                            _react2.default.createElement('input', { type: 'radio', value: '2', id: 'star-2', name: 'stars' }),
                                            _react2.default.createElement('label', { onMouseOut: this.mouseOverStar,
                                                onMouseOver: this.changeStarsValue, 'data-star': '2', htmlFor: 'star-2' }),
                                            _react2.default.createElement('input', { type: 'radio', value: '1', id: 'star-1', name: 'stars' }),
                                            _react2.default.createElement('label', { onMouseOut: this.mouseOverStar,
                                                onMouseOver: this.changeStarsValue, 'data-star': '1', htmlFor: 'star-1' })
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            starTitle
                                        )
                                    ),
                                    errorStars && _react2.default.createElement(
                                        'p',
                                        { className: 'errorText' },
                                        errorStars
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'commentField' },
                                        errorMaxLength && _react2.default.createElement(
                                            'p',
                                            { className: 'error' },
                                            'Der Bewertungstext darf maximal aus 500 Zeichen bestehen'
                                        ),
                                        _react2.default.createElement('textarea', { name: 'message',
                                            value: ratingText,
                                            onChange: this.changeRatingText,
                                            required: true })
                                    ),
                                    !isAnonymous && _react2.default.createElement(
                                        'div',
                                        { className: 'userInfo' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'rowInput' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: userData.firstname,
                                                onChange: this.handleChangeUserData,
                                                required: true,
                                                name: 'firstname',
                                                placeholder: 'Vorname' }),
                                            _react2.default.createElement('input', { type: 'text',
                                                value: userData.lastname,
                                                onChange: this.handleChangeUserData,
                                                required: true,
                                                name: 'lastname',
                                                placeholder: 'Nachname' })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'rowInput' },
                                            _react2.default.createElement('input', { type: 'email',
                                                value: userData.email,
                                                onChange: this.handleChangeUserData,
                                                required: true,
                                                name: 'email',
                                                placeholder: 'E-Mail' }),
                                            _react2.default.createElement(_reactRecaptcha2.default, {
                                                sitekey: window.captchaSitekey.key,
                                                render: 'explicit',
                                                hl: "de",
                                                verifyCallback: this.verifyCaptchaCallback,
                                                onloadCallback: function onloadCallback() {
                                                    return false;
                                                }
                                            })
                                        ),
                                        captcha.errorCaptcha && _react2.default.createElement(
                                            'div',
                                            { className: 'wrapErrorCaptcha' },
                                            _react2.default.createElement(
                                                'p',
                                                { style: { color: 'red' } },
                                                'Bitte best\xE4tigen Sie, dass Sie kein Roboter sind.'
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'buttons' },
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { onChange: this.changeAnonymous, type: 'checkbox', name: 'anonymous' }),
                                            _react2.default.createElement('span', { className: 'check' }),
                                            'Anonym ver\xF6ffentlichen'
                                        ),
                                        isAnonymous && window.isGoogleConnection && _react2.default.createElement(
                                            'div',
                                            { className: 'wrapCaptcha' },
                                            _react2.default.createElement(_reactRecaptcha2.default, {
                                                sitekey: window.captchaSitekey.key,
                                                render: 'explicit',
                                                hl: "de",
                                                verifyCallback: this.verifyCaptchaCallback,
                                                onloadCallback: function onloadCallback() {
                                                    return false;
                                                } }),
                                            captcha.errorCaptcha && _react2.default.createElement(
                                                'p',
                                                { style: { color: 'red' } },
                                                'Bitte best\xE4tigen Sie, dass Sie kein Roboter sind.'
                                            )
                                        ),
                                        !isAnonymous && _react2.default.createElement(
                                            'button',
                                            { className: 'btn', onSubmit: this.publishRating },
                                            'Ver\xF6ffentlichen'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'text-right' },
                                        isAnonymous && _react2.default.createElement(
                                            'button',
                                            { className: 'btn', onSubmit: this.publishRating },
                                            'Ver\xF6ffentlichen'
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                showModalIfBadRating && _react2.default.createElement(_modalIfBadRating2.default, { closeModal: this.closeModalIfBadRating,
                    publishIfBadRating: this.publishIsBadRating }),
                _react2.default.createElement(_modalThankYou2.default, null)
            );
        }
    }]);
    return WriteRatingModal;
}(_react.Component);

WriteRatingModal.propTypes = {};
WriteRatingModal.defaultProps = {};

exports.default = WriteRatingModal;

/***/ }),

/***/ 1163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalIfBadRating = function ModalIfBadRating(_ref) {
    var publishIfBadRating = _ref.publishIfBadRating,
        closeModal = _ref.closeModal;

    return _react2.default.createElement(
        "div",
        { className: "modal fade",
            id: "modalBadRating",
            tabIndex: "-1",
            role: "dialog",
            "aria-labelledby": "modalBadRating" },
        _react2.default.createElement(
            "div",
            { className: "modal-dialog", role: "document" },
            _react2.default.createElement(
                "div",
                { className: "modal-content" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-header" },
                    _react2.default.createElement(
                        "button",
                        { onClick: closeModal, type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                        _react2.default.createElement(
                            "span",
                            { "aria-hidden": "true" },
                            "\xD7"
                        )
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "modal-title" },
                        _react2.default.createElement("img", { loading: "lazy", src: "/images/design/sad.svg", alt: "" })
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "modal-body" },
                    _react2.default.createElement(
                        "p",
                        { className: "head" },
                        "Das tut uns Leid zu h\xF6ren, wie k\xF6nnen wir uns verbessern?"
                    ),
                    _react2.default.createElement(
                        "form",
                        { name: "formIfBadRating", onSubmit: publishIfBadRating },
                        _react2.default.createElement(
                            "label",
                            null,
                            _react2.default.createElement("input", { type: "radio", name: "feedbackStatus", value: "1", required: true }),
                            _react2.default.createElement("span", null),
                            "Support-Dienstleistung (Ladenlokal, E-Mail, Telefon etc.)"
                        ),
                        _react2.default.createElement(
                            "label",
                            null,
                            _react2.default.createElement("input", { type: "radio", name: "feedbackStatus", value: "2", required: true }),
                            _react2.default.createElement("span", null),
                            "Lieferzeiten (Zu lange Lieferzeiten oder \xE4hnliches)"
                        ),
                        _react2.default.createElement(
                            "label",
                            null,
                            _react2.default.createElement("input", { type: "radio", name: "feedbackStatus", value: "3", required: true }),
                            _react2.default.createElement("span", null),
                            "Zustandsbeschreibung (nicht wie online beschrieben, Garantiefall etc.)"
                        ),
                        _react2.default.createElement(
                            "label",
                            null,
                            _react2.default.createElement("input", { type: "radio", name: "feedbackStatus", value: "4", required: true }),
                            _react2.default.createElement("span", null),
                            "Zahlungsm\xF6glichkeiten (Probleme bei der Zahlung, Preisgestaltung etc.)"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "message" },
                            _react2.default.createElement(
                                "p",
                                null,
                                "Zus\xE4tzliches Feedback"
                            ),
                            _react2.default.createElement("textarea", { name: "feedbackText", placeholder: "Optional..." })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "text-right" },
                            _react2.default.createElement(
                                "button",
                                { className: "btn", onSubmit: publishIfBadRating },
                                "Ver\xF6ffentlichen"
                            )
                        )
                    )
                )
            )
        )
    );
};

ModalIfBadRating.propTypes = {};
ModalIfBadRating.defaultProps = {};

exports.default = ModalIfBadRating;

/***/ }),

/***/ 1164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(317);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactRecaptcha = __webpack_require__(992);

var _reactRecaptcha2 = _interopRequireDefault(_reactRecaptcha);

var _reactInputRange = __webpack_require__(1120);

var _reactInputRange2 = _interopRequireDefault(_reactInputRange);

var _modalThankYou = __webpack_require__(1069);

var _modalThankYou2 = _interopRequireDefault(_modalThankYou);

var _modalIfBadRatingMobile = __webpack_require__(1180);

var _modalIfBadRatingMobile2 = _interopRequireDefault(_modalIfBadRatingMobile);

var _apiCookie = __webpack_require__(941);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WriteRatingModalMobile = function (_Component) {
    (0, _inherits3.default)(WriteRatingModalMobile, _Component);

    function WriteRatingModalMobile(props) {
        (0, _classCallCheck3.default)(this, WriteRatingModalMobile);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WriteRatingModalMobile.__proto__ || Object.getPrototypeOf(WriteRatingModalMobile)).call(this, props));

        _this.state = {
            isAnonymous: false,
            starTitle: '',
            captcha: {
                isCheckCaptcha: false,
                errorCaptcha: false
            },
            errorStars: false,
            starsCount: 0,
            userData: {
                firstname: '',
                lastname: '',
                email: ''
            },
            ratingText: '',
            errorMaxLength: false,
            writeRatingToday: false,
            showModalWriteRating: false,
            showModalIfBadRating: false
        };

        _this.publishRating = _this.publishRating.bind(_this);
        _this.changeAnonymous = _this.changeAnonymous.bind(_this);
        _this.changeStarsInput = _this.changeStarsInput.bind(_this);
        _this.verifyCaptchaCallback = _this.verifyCaptchaCallback.bind(_this);
        _this.handleChangeUserData = _this.handleChangeUserData.bind(_this);
        _this.changeRatingText = _this.changeRatingText.bind(_this);
        _this.publishIsBadRating = _this.publishIsBadRating.bind(_this);
        _this.writeRating = _this.writeRating.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        _this.closeModalIfBadRating = _this.closeModalIfBadRating.bind(_this);
        _this.showThankYou = _this.showThankYou.bind(_this);
        _this._checkIsLogin = _this._checkIsLogin.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(WriteRatingModalMobile, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.showModalWriteRating !== this.props.showModalWriteRating && nextProps.showModalWriteRating === true) {
                this.writeRating();
            }
        }
    }, {
        key: '_checkIsLogin',
        value: function _checkIsLogin() {
            if (this.props.user.isLogin && this.props.user.data) {
                this.setState({
                    userData: (0, _extends3.default)({}, this.state.userData, {
                        firstname: this.props.user.data.systemAddress.first_name,
                        lastname: this.props.user.data.systemAddress.last_name,
                        email: this.props.user.data.systemAddress.email
                    })
                });
            }
        }
    }, {
        key: 'changeRatingText',
        value: function changeRatingText(e) {
            if (e.target.value.length > 500) {
                this.setState({ errorMaxLength: true });
            } else this.setState({ ratingText: e.target.value, errorMaxLength: false });
        }
    }, {
        key: 'handleChangeUserData',
        value: function handleChangeUserData(e) {
            var _e$target = e.target,
                value = _e$target.value,
                name = _e$target.name,
                userData = this.state.userData;

            userData[name] = value;
            this.setState({ userData: userData });
        }
    }, {
        key: 'verifyCaptchaCallback',
        value: function verifyCaptchaCallback(res) {
            this.setState({ captcha: (0, _extends3.default)({}, this.state.captcha, { isCheckCaptcha: true, errorCaptcha: false }) });
        }
    }, {
        key: 'changeStarsInput',
        value: function changeStarsInput(value) {
            var values = ['Ungenügend', 'Befriedigend', 'Gut', 'Sehr gut', 'Ausgezeichnet'];
            if (value > 0) {
                document.querySelector('#star-' + value).checked = true;
                this.setState({ starTitle: values[value - 1], errorStars: false, starsCount: value });
            } else {
                [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('input[name="stars"]'))).forEach(function (item) {
                    return item.checked = false;
                });
                this.setState({ starTitle: '', errorStars: false, starsCount: value });
            }
        }
    }, {
        key: 'closeModal',
        value: function closeModal(data) {
            if (data) {
                this.setState({
                    formData: data,
                    captcha: {
                        isCheckCaptcha: false,
                        errorCaptcha: false
                    },
                    isAnonymous: false,
                    starTitle: '',
                    ratingText: '',
                    errorMaxLength: false,
                    errorStars: false,
                    starsCount: 0,
                    userData: {
                        firstname: '',
                        lastname: '',
                        email: ''
                    },
                    showModalWriteRating: false,
                    showModalIfBadRating: true
                }, function () {
                    return $('#modalBadRating').modal();
                });
            } else {
                this.setState({
                    captcha: {
                        isCheckCaptcha: false,
                        errorCaptcha: false
                    },
                    userData: {
                        firstname: '',
                        lastname: '',
                        email: ''
                    },
                    showModalWriteRating: false,
                    isAnonymous: false,
                    starTitle: '',
                    ratingText: '',
                    starsCount: 0,
                    errorMaxLength: false,
                    errorStars: false
                });
            }

            if (this.props.closeShowModalWriteRating) this.props.closeShowModalWriteRating();
        }
    }, {
        key: 'showThankYou',
        value: function showThankYou() {
            var selector = window.isMobile ? '.thankYou' : '.thankYou .wrap';
            $('.thankYou').css({ display: 'block' });
            setTimeout(function () {
                return $(selector).css({ opacity: '1' });
            }, 500);

            setTimeout(function () {
                $(selector).css({ opacity: '0' });
                setTimeout(function () {
                    return $('.thankYou').css({ display: 'none' });
                }, 2500);
            }, 5000);
        }
    }, {
        key: 'changeAnonymous',
        value: function changeAnonymous(e) {
            var checked = e.target.checked;

            this.setState({ isAnonymous: checked });
        }
    }, {
        key: 'publishRating',
        value: function publishRating(e) {
            var _this2 = this;

            e.preventDefault();
            var isStarsChecked = document.querySelector('input[name="stars"]:checked'),
                captcha = this.state.captcha;

            if (isStarsChecked && captcha.isCheckCaptcha) {
                var data = new FormData(document.forms.formWriteRating);
                data.append('anonym', this.state.isAnonymous ? 1 : 0);
                if (isStarsChecked.value > 3) {
                    document.getElementById('spinner-box-load').style.display = 'block';
                    axios.post('/api/addRating', data).then(function (result) {
                        document.getElementById('spinner-box-load').style.display = 'none';
                        if (result.status === 200) {
                            $('#modalWriteRating').modal('toggle');
                            _this2.closeModal();
                            _this2.showThankYou();
                            _apiCookie.cookieApi.setCookie('writeRating', 'true', { path: '/', expires: window.expireTimeWriteRating });
                        }
                    });
                } else {
                    $('#modalWriteRating').modal('toggle');
                    this.closeModal(data);
                }
            } else {
                if (!isStarsChecked) this.setState({ errorStars: 'Bitte Sterne auswählen' });
                if (!window.isGoogleConnection) {
                    this.setState({ captcha: (0, _extends3.default)({}, this.state.captcha, { isCheckCaptcha: true }) });
                } else if (!captcha.isCheckCaptcha) this.setState({ captcha: (0, _extends3.default)({}, this.state.captcha, { errorCaptcha: true }) });
            }
        }
    }, {
        key: 'writeRating',
        value: function writeRating() {
            var _this3 = this;

            if (!_apiCookie.cookieApi.getCookie('writeRating')) {
                this._checkIsLogin();
                this.setState({ showModalWriteRating: true }, function () {
                    return $('#modalWriteRating').modal();
                });
            } else {
                this.setState({ writeRatingToday: true });
                setTimeout(function () {
                    return _this3.setState({ writeRatingToday: false });
                }, 3000);
            }
        }
    }, {
        key: 'closeModalIfBadRating',
        value: function closeModalIfBadRating() {
            this.setState({ formData: null, showModalIfBadRating: false });
        }
    }, {
        key: 'publishIsBadRating',
        value: function publishIsBadRating(e) {
            var _this4 = this;

            e.preventDefault();
            var formData = this.state.formData,
                feedback = {
                type: document.forms.formIfBadRating.feedbackStatus.value,
                message: document.forms.formIfBadRating.feedbackText.value
            };

            formData.append('feedback', JSON.stringify(feedback));

            document.getElementById('spinner-box-load').style.display = 'block';
            axios.post('/api/addRating', formData).then(function (result) {
                document.getElementById('spinner-box-load').style.display = 'none';
                if (result.status === 200) {
                    $('#modalBadRating').modal('toggle');
                    _this4.closeModalIfBadRating();
                    _this4.showThankYou();
                    _apiCookie.cookieApi.setCookie('writeRating', 'true', { path: '/', expires: window.expireTimeWriteRating });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _state = this.state,
                isAnonymous = _state.isAnonymous,
                starTitle = _state.starTitle,
                captcha = _state.captcha,
                errorStars = _state.errorStars,
                userData = _state.userData,
                ratingText = _state.ratingText,
                errorMaxLength = _state.errorMaxLength,
                showModalIfBadRating = _state.showModalIfBadRating,
                showModalWriteRating = _state.showModalWriteRating;

            return _react2.default.createElement(
                'div',
                null,
                showModalIfBadRating && _react2.default.createElement(_modalIfBadRatingMobile2.default, { closeModal: this.closeModalIfBadRating,
                    publishIfBadRating: this.publishIsBadRating }),
                _react2.default.createElement(_modalThankYou2.default, null),
                showModalWriteRating && _react2.default.createElement(
                    'div',
                    { className: 'modal',
                        id: 'modalWriteRating',
                        tabIndex: '-1',
                        role: 'dialog',
                        'aria-labelledby': 'modalWriteRating' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-dialog', role: 'document' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-content' },
                            _react2.default.createElement(
                                'div',
                                { className: 'modal-header' },
                                _react2.default.createElement(
                                    'button',
                                    { onClick: function onClick() {
                                            return _this5.closeModal(false);
                                        }, type: 'button', className: 'close',
                                        'data-dismiss': 'modal', 'aria-label': 'Close' },
                                    _react2.default.createElement(
                                        'span',
                                        { 'aria-hidden': 'true' },
                                        '\xD7'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'modal-body' },
                                _react2.default.createElement(
                                    'form',
                                    { name: 'formWriteRating', onSubmit: this.publishRating },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'wrapForm' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'stars' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                starTitle
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wrapStars' },
                                                _react2.default.createElement('input', { type: 'radio', value: '5', id: 'star-5', name: 'stars' }),
                                                _react2.default.createElement('span', null),
                                                _react2.default.createElement('input', { type: 'radio', value: '4', id: 'star-4', name: 'stars' }),
                                                _react2.default.createElement('span', null),
                                                _react2.default.createElement('input', { type: 'radio', value: '3', id: 'star-3', name: 'stars' }),
                                                _react2.default.createElement('span', null),
                                                _react2.default.createElement('input', { type: 'radio', value: '2', id: 'star-2', name: 'stars' }),
                                                _react2.default.createElement('span', null),
                                                _react2.default.createElement('input', { type: 'radio', value: '1', id: 'star-1', name: 'stars' }),
                                                _react2.default.createElement('span', null)
                                            ),
                                            errorStars && _react2.default.createElement(
                                                'p',
                                                { className: 'errorText' },
                                                errorStars
                                            ),
                                            _react2.default.createElement(
                                                'h3',
                                                null,
                                                'Neue Bewertung'
                                            ),
                                            _react2.default.createElement(_reactInputRange2.default, {
                                                maxValue: 5,
                                                minValue: 0,
                                                value: this.state.starsCount,
                                                onChange: this.changeStarsInput })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'commentField' },
                                            errorMaxLength && _react2.default.createElement(
                                                'p',
                                                { className: 'error' },
                                                'Der Bewertungstext darf maximal aus 500 Zeichen bestehen'
                                            ),
                                            _react2.default.createElement('textarea', { name: 'message',
                                                value: ratingText,
                                                onChange: this.changeRatingText,
                                                required: true })
                                        ),
                                        !isAnonymous && _react2.default.createElement(
                                            'div',
                                            { className: 'userInfo' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: userData.firstname,
                                                onChange: this.handleChangeUserData,
                                                required: true,
                                                name: 'firstname',
                                                placeholder: 'Vorname' }),
                                            _react2.default.createElement('input', { type: 'text',
                                                value: userData.lastname,
                                                onChange: this.handleChangeUserData,
                                                required: true,
                                                name: 'lastname',
                                                placeholder: 'Nachname' }),
                                            _react2.default.createElement('input', { type: 'email',
                                                value: userData.email,
                                                onChange: this.handleChangeUserData,
                                                required: true,
                                                name: 'email',
                                                placeholder: 'E-Mail' })
                                        ),
                                        _react2.default.createElement(_reactRecaptcha2.default, {
                                            sitekey: window.captchaSitekey.key,
                                            render: 'explicit',
                                            hl: "de",
                                            verifyCallback: this.verifyCaptchaCallback,
                                            onloadCallback: function onloadCallback() {
                                                return false;
                                            }
                                        }),
                                        captcha.errorCaptcha && _react2.default.createElement(
                                            'p',
                                            { style: { color: 'red' } },
                                            'Bitte best\xE4tigen Sie, dass Sie kein Roboter sind.'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(
                                                'label',
                                                null,
                                                'Anonym ver\xF6ffentlichen',
                                                _react2.default.createElement('input', { onChange: this.changeAnonymous, type: 'checkbox', name: 'anonymous' }),
                                                _react2.default.createElement('span', { className: 'slider' })
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'buttons' },
                                        _react2.default.createElement(
                                            'button',
                                            { onClick: function onClick() {
                                                    return _this5.closeModal(false);
                                                },
                                                type: 'button',
                                                className: 'btn closeBtn',
                                                'data-dismiss': 'modal',
                                                'aria-label': 'Close' },
                                            'Abbrechen'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'btn', onSubmit: this.publishRating },
                                            'Ver\xF6ffentlichen'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return WriteRatingModalMobile;
}(_react.Component);

WriteRatingModalMobile.propTypes = {};
WriteRatingModalMobile.defaultProps = {};

exports.default = WriteRatingModalMobile;

/***/ }),

/***/ 1165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autobindDecorator = __webpack_require__(1040);

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _valueTransformer = __webpack_require__(1166);

var valueTransformer = _interopRequireWildcard(_valueTransformer);

var _defaultClassNames = __webpack_require__(1174);

var _defaultClassNames2 = _interopRequireDefault(_defaultClassNames);

var _label = __webpack_require__(1070);

var _label2 = _interopRequireDefault(_label);

var _rangePropType = __webpack_require__(1175);

var _rangePropType2 = _interopRequireDefault(_rangePropType);

var _valuePropType = __webpack_require__(1176);

var _valuePropType2 = _interopRequireDefault(_valuePropType);

var _slider = __webpack_require__(1177);

var _slider2 = _interopRequireDefault(_slider);

var _track = __webpack_require__(1178);

var _track2 = _interopRequireDefault(_track);

var _utils = __webpack_require__(987);

var _keyCodes = __webpack_require__(1179);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * A React component that allows users to input numeric values within a range
 * by dragging its sliders.
 */
var InputRange = (_class = function (_React$Component) {
  _inherits(InputRange, _React$Component);

  _createClass(InputRange, null, [{
    key: 'propTypes',

    /**
     * @ignore
     * @override
     * @return {Object}
     */
    get: function get() {
      return {
        allowSameValues: _propTypes2.default.bool,
        ariaLabelledby: _propTypes2.default.string,
        ariaControls: _propTypes2.default.string,
        classNames: _propTypes2.default.objectOf(_propTypes2.default.string),
        disabled: _propTypes2.default.bool,
        draggableTrack: _propTypes2.default.bool,
        formatLabel: _propTypes2.default.func,
        maxValue: _rangePropType2.default,
        minValue: _rangePropType2.default,
        name: _propTypes2.default.string,
        onChangeStart: _propTypes2.default.func,
        onChange: _propTypes2.default.func.isRequired,
        onChangeComplete: _propTypes2.default.func,
        step: _propTypes2.default.number,
        value: _valuePropType2.default
      };
    }

    /**
     * @ignore
     * @override
     * @return {Object}
     */

  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        allowSameValues: false,
        classNames: _defaultClassNames2.default,
        disabled: false,
        maxValue: 10,
        minValue: 0,
        step: 1
      };
    }

    /**
     * @param {Object} props
     * @param {boolean} [props.allowSameValues]
     * @param {string} [props.ariaLabelledby]
     * @param {string} [props.ariaControls]
     * @param {InputRangeClassNames} [props.classNames]
     * @param {boolean} [props.disabled = false]
     * @param {Function} [props.formatLabel]
     * @param {number|Range} [props.maxValue = 10]
     * @param {number|Range} [props.minValue = 0]
     * @param {string} [props.name]
     * @param {string} props.onChange
     * @param {Function} [props.onChangeComplete]
     * @param {Function} [props.onChangeStart]
     * @param {number} [props.step = 1]
     * @param {number|Range} props.value
     */

  }]);

  function InputRange(props) {
    _classCallCheck(this, InputRange);

    /**
     * @private
     * @type {?number}
     */
    var _this = _possibleConstructorReturn(this, (InputRange.__proto__ || Object.getPrototypeOf(InputRange)).call(this, props));

    _this.startValue = null;

    /**
     * @private
     * @type {?Component}
     */
    _this.node = null;

    /**
     * @private
     * @type {?Component}
     */
    _this.trackNode = null;

    /**
     * @private
     * @type {bool}
     */
    _this.isSliderDragging = false;

    /**
     * @private
     * @type {?string}
     */
    _this.lastKeyMoved = null;
    return _this;
  }

  /**
   * @ignore
   * @override
   * @return {void}
   */


  _createClass(InputRange, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeDocumentMouseUpListener();
      this.removeDocumentTouchEndListener();
    }

    /**
     * Return the CSS class name of the component
     * @private
     * @return {string}
     */

  }, {
    key: 'getComponentClassName',
    value: function getComponentClassName() {
      if (!this.props.disabled) {
        return this.props.classNames.inputRange;
      }

      return this.props.classNames.disabledInputRange;
    }

    /**
     * Return the bounding rect of the track
     * @private
     * @return {ClientRect}
     */

  }, {
    key: 'getTrackClientRect',
    value: function getTrackClientRect() {
      return this.trackNode.getClientRect();
    }

    /**
     * Return the slider key closest to a point
     * @private
     * @param {Point} position
     * @return {string}
     */

  }, {
    key: 'getKeyByPosition',
    value: function getKeyByPosition(position) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var positions = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.props.maxValue, this.getTrackClientRect());

      if (this.isMultiValue()) {
        var distanceToMin = (0, _utils.distanceTo)(position, positions.min);
        var distanceToMax = (0, _utils.distanceTo)(position, positions.max);

        if (distanceToMin < distanceToMax) {
          return 'min';
        }
      }

      return 'max';
    }

    /**
     * Return all the slider keys
     * @private
     * @return {string[]}
     */

  }, {
    key: 'getKeys',
    value: function getKeys() {
      if (this.isMultiValue()) {
        return ['min', 'max'];
      }

      return ['max'];
    }

    /**
     * Return true if the difference between the new and the current value is
     * greater or equal to the step amount of the component
     * @private
     * @param {Range} values
     * @return {boolean}
     */

  }, {
    key: 'hasStepDifference',
    value: function hasStepDifference(values) {
      var currentValues = valueTransformer.getValueFromProps(this.props, this.isMultiValue());

      return (0, _utils.length)(values.min, currentValues.min) >= this.props.step || (0, _utils.length)(values.max, currentValues.max) >= this.props.step;
    }

    /**
     * Return true if the component accepts a min and max value
     * @private
     * @return {boolean}
     */

  }, {
    key: 'isMultiValue',
    value: function isMultiValue() {
      return (0, _utils.isObject)(this.props.value);
    }

    /**
     * Return true if the range is within the max and min value of the component
     * @private
     * @param {Range} values
     * @return {boolean}
     */

  }, {
    key: 'isWithinRange',
    value: function isWithinRange(values) {
      if (this.isMultiValue()) {
        return values.min >= this.props.minValue && values.max <= this.props.maxValue && this.props.allowSameValues ? values.min <= values.max : values.min < values.max;
      }

      return values.max >= this.props.minValue && values.max <= this.props.maxValue;
    }

    /**
     * Return true if the new value should trigger a render
     * @private
     * @param {Range} values
     * @return {boolean}
     */

  }, {
    key: 'shouldUpdate',
    value: function shouldUpdate(values) {
      return this.isWithinRange(values) && this.hasStepDifference(values);
    }

    /**
     * Update the position of a slider
     * @private
     * @param {string} key
     * @param {Point} position
     * @return {void}
     */

  }, {
    key: 'updatePosition',
    value: function updatePosition(key, position) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var positions = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.props.maxValue, this.getTrackClientRect());

      positions[key] = position;
      this.lastKeyMoved = key;

      this.updatePositions(positions);
    }

    /**
     * Update the positions of multiple sliders
     * @private
     * @param {Object} positions
     * @param {Point} positions.min
     * @param {Point} positions.max
     * @return {void}
     */

  }, {
    key: 'updatePositions',
    value: function updatePositions(positions) {
      var values = {
        min: valueTransformer.getValueFromPosition(positions.min, this.props.minValue, this.props.maxValue, this.getTrackClientRect()),
        max: valueTransformer.getValueFromPosition(positions.max, this.props.minValue, this.props.maxValue, this.getTrackClientRect())
      };

      var transformedValues = {
        min: valueTransformer.getStepValueFromValue(values.min, this.props.step),
        max: valueTransformer.getStepValueFromValue(values.max, this.props.step)
      };

      this.updateValues(transformedValues);
    }

    /**
     * Update the value of a slider
     * @private
     * @param {string} key
     * @param {number} value
     * @return {void}
     */

  }, {
    key: 'updateValue',
    value: function updateValue(key, value) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());

      values[key] = value;

      this.updateValues(values);
    }

    /**
     * Update the values of multiple sliders
     * @private
     * @param {Range|number} values
     * @return {void}
     */

  }, {
    key: 'updateValues',
    value: function updateValues(values) {
      if (!this.shouldUpdate(values)) {
        return;
      }

      this.props.onChange(this.isMultiValue() ? values : values.max);
    }

    /**
     * Increment the value of a slider by key name
     * @private
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'incrementValue',
    value: function incrementValue(key) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var value = values[key] + this.props.step;

      this.updateValue(key, value);
    }

    /**
     * Decrement the value of a slider by key name
     * @private
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'decrementValue',
    value: function decrementValue(key) {
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var value = values[key] - this.props.step;

      this.updateValue(key, value);
    }

    /**
     * Listen to mouseup event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentMouseUpListener',
    value: function addDocumentMouseUpListener() {
      this.removeDocumentMouseUpListener();
      this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Listen to touchend event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentTouchEndListener',
    value: function addDocumentTouchEndListener() {
      this.removeDocumentTouchEndListener();
      this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * Stop listening to mouseup event
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentMouseUpListener',
    value: function removeDocumentMouseUpListener() {
      this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Stop listening to touchend event
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentTouchEndListener',
    value: function removeDocumentTouchEndListener() {
      this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * Handle any "mousemove" event received by the slider
     * @private
     * @param {SyntheticEvent} event
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'handleSliderDrag',
    value: function handleSliderDrag(event, key) {
      var _this2 = this;

      if (this.props.disabled) {
        return;
      }

      var position = valueTransformer.getPositionFromEvent(event, this.getTrackClientRect());
      this.isSliderDragging = true;
      requestAnimationFrame(function () {
        return _this2.updatePosition(key, position);
      });
    }

    /**
     * Handle any "mousemove" event received by the track
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleTrackDrag',
    value: function handleTrackDrag(event, prevEvent) {
      if (this.props.disabled || !this.props.draggableTrack || this.isSliderDragging) {
        return;
      }

      var _props = this.props,
          maxValue = _props.maxValue,
          minValue = _props.minValue,
          _props$value = _props.value,
          max = _props$value.max,
          min = _props$value.min;


      var position = valueTransformer.getPositionFromEvent(event, this.getTrackClientRect());
      var value = valueTransformer.getValueFromPosition(position, minValue, maxValue, this.getTrackClientRect());
      var stepValue = valueTransformer.getStepValueFromValue(value, this.props.step);

      var prevPosition = valueTransformer.getPositionFromEvent(prevEvent, this.getTrackClientRect());
      var prevValue = valueTransformer.getValueFromPosition(prevPosition, minValue, maxValue, this.getTrackClientRect());
      var prevStepValue = valueTransformer.getStepValueFromValue(prevValue, this.props.step);

      var offset = prevStepValue - stepValue;

      var transformedValues = {
        min: min - offset,
        max: max - offset
      };

      this.updateValues(transformedValues);
    }

    /**
     * Handle any "keydown" event received by the slider
     * @private
     * @param {SyntheticEvent} event
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'handleSliderKeyDown',
    value: function handleSliderKeyDown(event, key) {
      if (this.props.disabled) {
        return;
      }

      switch (event.keyCode) {
        case _keyCodes.LEFT_ARROW:
        case _keyCodes.DOWN_ARROW:
          event.preventDefault();
          this.decrementValue(key);
          break;

        case _keyCodes.RIGHT_ARROW:
        case _keyCodes.UP_ARROW:
          event.preventDefault();
          this.incrementValue(key);
          break;

        default:
          break;
      }
    }

    /**
     * Handle any "mousedown" event received by the track
     * @private
     * @param {SyntheticEvent} event
     * @param {Point} position
     * @return {void}
     */

  }, {
    key: 'handleTrackMouseDown',
    value: function handleTrackMouseDown(event, position) {
      if (this.props.disabled) {
        return;
      }

      var _props2 = this.props,
          maxValue = _props2.maxValue,
          minValue = _props2.minValue,
          _props2$value = _props2.value,
          max = _props2$value.max,
          min = _props2$value.min;


      event.preventDefault();

      var value = valueTransformer.getValueFromPosition(position, minValue, maxValue, this.getTrackClientRect());
      var stepValue = valueTransformer.getStepValueFromValue(value, this.props.step);

      if (!this.props.draggableTrack || stepValue > max || stepValue < min) {
        this.updatePosition(this.getKeyByPosition(position), position);
      }
    }

    /**
     * Handle the start of any mouse/touch event
     * @private
     * @return {void}
     */

  }, {
    key: 'handleInteractionStart',
    value: function handleInteractionStart() {
      if (this.props.onChangeStart) {
        this.props.onChangeStart(this.props.value);
      }

      if (this.props.onChangeComplete && !(0, _utils.isDefined)(this.startValue)) {
        this.startValue = this.props.value;
      }
    }

    /**
     * Handle the end of any mouse/touch event
     * @private
     * @return {void}
     */

  }, {
    key: 'handleInteractionEnd',
    value: function handleInteractionEnd() {
      if (this.isSliderDragging) {
        this.isSliderDragging = false;
      }

      if (!this.props.onChangeComplete || !(0, _utils.isDefined)(this.startValue)) {
        return;
      }

      if (this.startValue !== this.props.value) {
        this.props.onChangeComplete(this.props.value);
      }

      this.startValue = null;
    }

    /**
     * Handle any "keydown" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.handleInteractionStart(event);
    }

    /**
     * Handle any "keyup" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(event) {
      this.handleInteractionEnd(event);
    }

    /**
     * Handle any "mousedown" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      this.handleInteractionStart(event);
      this.addDocumentMouseUpListener();
    }

    /**
     * Handle any "mouseup" event received by the component
     * @private
     * @param {SyntheticEvent} event
     */

  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      this.handleInteractionEnd(event);
      this.removeDocumentMouseUpListener();
    }

    /**
     * Handle any "touchstart" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      this.handleInteractionStart(event);
      this.addDocumentTouchEndListener();
    }

    /**
     * Handle any "touchend" event received by the component
     * @private
     * @param {SyntheticEvent} event
     */

  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      this.handleInteractionEnd(event);
      this.removeDocumentTouchEndListener();
    }

    /**
     * Return JSX of sliders
     * @private
     * @return {JSX.Element}
     */

  }, {
    key: 'renderSliders',
    value: function renderSliders() {
      var _this3 = this;

      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var percentages = valueTransformer.getPercentagesFromValues(values, this.props.minValue, this.props.maxValue);
      var keys = this.props.allowSameValues && this.lastKeyMoved === 'min' ? this.getKeys().reverse() : this.getKeys();

      return keys.map(function (key) {
        var value = values[key];
        var percentage = percentages[key];

        var _props3 = _this3.props,
            maxValue = _props3.maxValue,
            minValue = _props3.minValue;


        if (key === 'min') {
          maxValue = values.max;
        } else {
          minValue = values.min;
        }

        var slider = _react2.default.createElement(_slider2.default, {
          ariaLabelledby: _this3.props.ariaLabelledby,
          ariaControls: _this3.props.ariaControls,
          classNames: _this3.props.classNames,
          formatLabel: _this3.props.formatLabel,
          key: key,
          maxValue: maxValue,
          minValue: minValue,
          onSliderDrag: _this3.handleSliderDrag,
          onSliderKeyDown: _this3.handleSliderKeyDown,
          percentage: percentage,
          type: key,
          value: value });

        return slider;
      });
    }

    /**
     * Return JSX of hidden inputs
     * @private
     * @return {JSX.Element}
     */

  }, {
    key: 'renderHiddenInputs',
    value: function renderHiddenInputs() {
      var _this4 = this;

      if (!this.props.name) {
        return [];
      }

      var isMultiValue = this.isMultiValue();
      var values = valueTransformer.getValueFromProps(this.props, isMultiValue);

      return this.getKeys().map(function (key) {
        var value = values[key];
        var name = isMultiValue ? '' + _this4.props.name + (0, _utils.captialize)(key) : _this4.props.name;

        return _react2.default.createElement('input', { key: key, type: 'hidden', name: name, value: value });
      });
    }

    /**
     * @ignore
     * @override
     * @return {JSX.Element}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var componentClassName = this.getComponentClassName();
      var values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
      var percentages = valueTransformer.getPercentagesFromValues(values, this.props.minValue, this.props.maxValue);

      return _react2.default.createElement(
        'div',
        {
          'aria-disabled': this.props.disabled,
          ref: function ref(node) {
            _this5.node = node;
          },
          className: componentClassName,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart },
        _react2.default.createElement(
          _label2.default,
          {
            classNames: this.props.classNames,
            formatLabel: this.props.formatLabel,
            type: 'min' },
          this.props.minValue
        ),
        _react2.default.createElement(
          _track2.default,
          {
            classNames: this.props.classNames,
            draggableTrack: this.props.draggableTrack,
            ref: function ref(trackNode) {
              _this5.trackNode = trackNode;
            },
            percentages: percentages,
            onTrackDrag: this.handleTrackDrag,
            onTrackMouseDown: this.handleTrackMouseDown },
          this.renderSliders()
        ),
        _react2.default.createElement(
          _label2.default,
          {
            classNames: this.props.classNames,
            formatLabel: this.props.formatLabel,
            type: 'max' },
          this.props.maxValue
        ),
        this.renderHiddenInputs()
      );
    }
  }]);

  return InputRange;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'handleSliderDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleSliderDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTrackDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTrackDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleSliderKeyDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleSliderKeyDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTrackMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTrackMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleInteractionStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleInteractionStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleInteractionEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleInteractionEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleKeyDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleKeyDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleKeyUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleKeyUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchEnd'), _class.prototype)), _class);
exports.default = InputRange;
module.exports = exports['default'];
//# sourceMappingURL=input-range.js.map

/***/ }),

/***/ 1166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getPercentageFromPosition = getPercentageFromPosition;
exports.getValueFromPosition = getValueFromPosition;
exports.getValueFromProps = getValueFromProps;
exports.getPercentageFromValue = getPercentageFromValue;
exports.getPercentagesFromValues = getPercentagesFromValues;
exports.getPositionFromValue = getPositionFromValue;
exports.getPositionsFromValues = getPositionsFromValues;
exports.getPositionFromEvent = getPositionFromEvent;
exports.getStepValueFromValue = getStepValueFromValue;

var _utils = __webpack_require__(987);

/**
 * Convert a point into a percentage value
 * @ignore
 * @param {Point} position
 * @param {ClientRect} clientRect
 * @return {number} Percentage value
 */
function getPercentageFromPosition(position, clientRect) {
  var length = clientRect.width;
  var sizePerc = position.x / length;

  return sizePerc || 0;
}

/**
 * Convert a point into a model value
 * @ignore
 * @param {Point} position
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} clientRect
 * @return {number}
 */
function getValueFromPosition(position, minValue, maxValue, clientRect) {
  var sizePerc = getPercentageFromPosition(position, clientRect);
  var valueDiff = maxValue - minValue;

  return minValue + valueDiff * sizePerc;
}

/**
 * Convert props into a range value
 * @ignore
 * @param {Object} props
 * @param {boolean} isMultiValue
 * @return {Range}
 */
function getValueFromProps(props, isMultiValue) {
  if (isMultiValue) {
    return _extends({}, props.value);
  }

  return {
    min: props.minValue,
    max: props.value
  };
}

/**
 * Convert a model value into a percentage value
 * @ignore
 * @param {number} value
 * @param {number} minValue
 * @param {number} maxValue
 * @return {number}
 */
function getPercentageFromValue(value, minValue, maxValue) {
  var validValue = (0, _utils.clamp)(value, minValue, maxValue);
  var valueDiff = maxValue - minValue;
  var valuePerc = (validValue - minValue) / valueDiff;

  return valuePerc || 0;
}

/**
 * Convert model values into percentage values
 * @ignore
 * @param {Range} values
 * @param {number} minValue
 * @param {number} maxValue
 * @return {Range}
 */
function getPercentagesFromValues(values, minValue, maxValue) {
  return {
    min: getPercentageFromValue(values.min, minValue, maxValue),
    max: getPercentageFromValue(values.max, minValue, maxValue)
  };
}

/**
 * Convert a value into a point
 * @ignore
 * @param {number} value
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} clientRect
 * @return {Point} Position
 */
function getPositionFromValue(value, minValue, maxValue, clientRect) {
  var length = clientRect.width;
  var valuePerc = getPercentageFromValue(value, minValue, maxValue);
  var positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0
  };
}

/**
 * Convert a range of values into points
 * @ignore
 * @param {Range} values
 * @param {number} minValue
 * @param {number} maxValue
 * @param {ClientRect} clientRect
 * @return {Range}
 */
function getPositionsFromValues(values, minValue, maxValue, clientRect) {
  return {
    min: getPositionFromValue(values.min, minValue, maxValue, clientRect),
    max: getPositionFromValue(values.max, minValue, maxValue, clientRect)
  };
}

/**
 * Convert an event into a point
 * @ignore
 * @param {Event} event
 * @param {ClientRect} clientRect
 * @return {Point}
 */
function getPositionFromEvent(event, clientRect) {
  var length = clientRect.width;

  var _ref = event.touches ? event.touches[0] : event,
      clientX = _ref.clientX;

  return {
    x: (0, _utils.clamp)(clientX - clientRect.left, 0, length),
    y: 0
  };
}

/**
 * Convert a value into a step value
 * @ignore
 * @param {number} value
 * @param {number} valuePerStep
 * @return {number}
 */
function getStepValueFromValue(value, valuePerStep) {
  return Math.round(value / valuePerStep) * valuePerStep;
}
//# sourceMappingURL=value-transformer.js.map

/***/ }),

/***/ 1167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = captialize;
/**
 * Captialize a string
 * @ignore
 * @param {string} string
 * @return {string}
 */
function captialize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = exports["default"];
//# sourceMappingURL=captialize.js.map

/***/ }),

/***/ 1168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clamp;
/**
 * Clamp a value between a min and max value
 * @ignore
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
module.exports = exports["default"];
//# sourceMappingURL=clamp.js.map

/***/ }),

/***/ 1169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = distanceTo;
/**
 * Calculate the distance between pointA and pointB
 * @ignore
 * @param {Point} pointA
 * @param {Point} pointB
 * @return {number} Distance
 */
function distanceTo(pointA, pointB) {
  var xDiff = Math.pow(pointB.x - pointA.x, 2);
  var yDiff = Math.pow(pointB.y - pointA.y, 2);

  return Math.sqrt(xDiff + yDiff);
}
module.exports = exports["default"];
//# sourceMappingURL=distance-to.js.map

/***/ }),

/***/ 1170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDefined;
/**
 * Check if a value is defined
 * @ignore
 * @param {*} value
 * @return {boolean}
 */
function isDefined(value) {
  return value !== undefined && value !== null;
}
module.exports = exports["default"];
//# sourceMappingURL=is-defined.js.map

/***/ }),

/***/ 1171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;
/**
 * Check if a value is a number
 * @ignore
 * @param {*} value
 * @return {boolean}
 */
function isNumber(value) {
  return typeof value === 'number';
}
module.exports = exports['default'];
//# sourceMappingURL=is-number.js.map

/***/ }),

/***/ 1172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isObject;
/**
 * Check if a value is an object
 * @ignore
 * @param {*} value
 * @return {boolean}
 */
function isObject(value) {
  return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}
module.exports = exports['default'];
//# sourceMappingURL=is-object.js.map

/***/ }),

/***/ 1173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = length;
/**
 * Calculate the absolute difference between two numbers
 * @ignore
 * @param {number} numA
 * @param {number} numB
 * @return {number}
 */
function length(numA, numB) {
  return Math.abs(numA - numB);
}
module.exports = exports["default"];
//# sourceMappingURL=length.js.map

/***/ }),

/***/ 1174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Default CSS class names
 * @ignore
 * @type {InputRangeClassNames}
 */
var DEFAULT_CLASS_NAMES = {
  activeTrack: 'input-range__track input-range__track--active',
  disabledInputRange: 'input-range input-range--disabled',
  inputRange: 'input-range',
  labelContainer: 'input-range__label-container',
  maxLabel: 'input-range__label input-range__label--max',
  minLabel: 'input-range__label input-range__label--min',
  slider: 'input-range__slider',
  sliderContainer: 'input-range__slider-container',
  track: 'input-range__track input-range__track--background',
  valueLabel: 'input-range__label input-range__label--value'
};

exports.default = DEFAULT_CLASS_NAMES;
module.exports = exports['default'];
//# sourceMappingURL=default-class-names.js.map

/***/ }),

/***/ 1175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rangePropType;

var _utils = __webpack_require__(987);

/**
 * @ignore
 * @param {Object} props - React component props
 * @return {?Error} Return Error if validation fails
 */
function rangePropType(props) {
  var maxValue = props.maxValue,
      minValue = props.minValue;


  if (!(0, _utils.isNumber)(minValue) || !(0, _utils.isNumber)(maxValue)) {
    return new Error('"minValue" and "maxValue" must be a number');
  }

  if (minValue >= maxValue) {
    return new Error('"minValue" must be smaller than "maxValue"');
  }
}
module.exports = exports['default'];
//# sourceMappingURL=range-prop-type.js.map

/***/ }),

/***/ 1176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = valuePropType;

var _utils = __webpack_require__(987);

/**
 * @ignore
 * @param {Object} props
 * @return {?Error} Return Error if validation fails
 */
function valuePropType(props, propName) {
  var maxValue = props.maxValue,
      minValue = props.minValue;

  var value = props[propName];

  if (!(0, _utils.isNumber)(value) && (!(0, _utils.isObject)(value) || !(0, _utils.isNumber)(value.min) || !(0, _utils.isNumber)(value.max))) {
    return new Error('"' + propName + '" must be a number or a range object');
  }

  if ((0, _utils.isNumber)(value) && (value < minValue || value > maxValue)) {
    return new Error('"' + propName + '" must be in between "minValue" and "maxValue"');
  }

  if ((0, _utils.isObject)(value) && (value.min < minValue || value.min > maxValue || value.max < minValue || value.max > maxValue)) {
    return new Error('"' + propName + '" must be in between "minValue" and "maxValue"');
  }
}
module.exports = exports['default'];
//# sourceMappingURL=value-prop-type.js.map

/***/ }),

/***/ 1177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autobindDecorator = __webpack_require__(1040);

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _label = __webpack_require__(1070);

var _label2 = _interopRequireDefault(_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * @ignore
 */
var Slider = (_class = function (_React$Component) {
  _inherits(Slider, _React$Component);

  _createClass(Slider, null, [{
    key: 'propTypes',

    /**
     * Accepted propTypes of Slider
     * @override
     * @return {Object}
     * @property {Function} ariaLabelledby
     * @property {Function} ariaControls
     * @property {Function} className
     * @property {Function} formatLabel
     * @property {Function} maxValue
     * @property {Function} minValue
     * @property {Function} onSliderDrag
     * @property {Function} onSliderKeyDown
     * @property {Function} percentage
     * @property {Function} type
     * @property {Function} value
     */
    get: function get() {
      return {
        ariaLabelledby: _propTypes2.default.string,
        ariaControls: _propTypes2.default.string,
        classNames: _propTypes2.default.objectOf(_propTypes2.default.string).isRequired,
        formatLabel: _propTypes2.default.func,
        maxValue: _propTypes2.default.number,
        minValue: _propTypes2.default.number,
        onSliderDrag: _propTypes2.default.func.isRequired,
        onSliderKeyDown: _propTypes2.default.func.isRequired,
        percentage: _propTypes2.default.number.isRequired,
        type: _propTypes2.default.string.isRequired,
        value: _propTypes2.default.number.isRequired
      };
    }

    /**
     * @param {Object} props
     * @param {string} [props.ariaLabelledby]
     * @param {string} [props.ariaControls]
     * @param {InputRangeClassNames} props.classNames
     * @param {Function} [props.formatLabel]
     * @param {number} [props.maxValue]
     * @param {number} [props.minValue]
     * @param {Function} props.onSliderKeyDown
     * @param {Function} props.onSliderDrag
     * @param {number} props.percentage
     * @param {number} props.type
     * @param {number} props.value
     */

  }]);

  function Slider(props) {
    _classCallCheck(this, Slider);

    /**
     * @private
     * @type {?Component}
     */
    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.node = null;
    return _this;
  }

  /**
   * @ignore
   * @override
   * @return {void}
   */


  _createClass(Slider, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeDocumentMouseMoveListener();
      this.removeDocumentMouseUpListener();
      this.removeDocumentTouchEndListener();
      this.removeDocumentTouchMoveListener();
    }

    /**
     * @private
     * @return {Object}
     */

  }, {
    key: 'getStyle',
    value: function getStyle() {
      var perc = (this.props.percentage || 0) * 100;
      var style = {
        position: 'absolute',
        left: perc + '%'
      };

      return style;
    }

    /**
     * Listen to mousemove event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentMouseMoveListener',
    value: function addDocumentMouseMoveListener() {
      this.removeDocumentMouseMoveListener();
      this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
    }

    /**
     * Listen to mouseup event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentMouseUpListener',
    value: function addDocumentMouseUpListener() {
      this.removeDocumentMouseUpListener();
      this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * Listen to touchmove event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentTouchMoveListener',
    value: function addDocumentTouchMoveListener() {
      this.removeDocumentTouchMoveListener();
      this.node.ownerDocument.addEventListener('touchmove', this.handleTouchMove);
    }

    /**
     * Listen to touchend event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentTouchEndListener',
    value: function addDocumentTouchEndListener() {
      this.removeDocumentTouchEndListener();
      this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentMouseMoveListener',
    value: function removeDocumentMouseMoveListener() {
      this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentMouseUpListener',
    value: function removeDocumentMouseUpListener() {
      this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentTouchMoveListener',
    value: function removeDocumentTouchMoveListener() {
      this.node.ownerDocument.removeEventListener('touchmove', this.handleTouchMove);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentTouchEndListener',
    value: function removeDocumentTouchEndListener() {
      this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {
      this.addDocumentMouseMoveListener();
      this.addDocumentMouseUpListener();
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      this.removeDocumentMouseMoveListener();
      this.removeDocumentMouseUpListener();
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      this.props.onSliderDrag(event, this.props.type);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart() {
      this.addDocumentTouchEndListener();
      this.addDocumentTouchMoveListener();
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      this.props.onSliderDrag(event, this.props.type);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      this.removeDocumentTouchMoveListener();
      this.removeDocumentTouchEndListener();
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      this.props.onSliderKeyDown(event, this.props.type);
    }

    /**
     * @override
     * @return {JSX.Element}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = this.getStyle();

      return _react2.default.createElement(
        'span',
        {
          className: this.props.classNames.sliderContainer,
          ref: function ref(node) {
            _this2.node = node;
          },
          style: style },
        _react2.default.createElement(
          _label2.default,
          {
            classNames: this.props.classNames,
            formatLabel: this.props.formatLabel,
            type: 'value' },
          this.props.value
        ),
        _react2.default.createElement('div', {
          'aria-labelledby': this.props.ariaLabelledby,
          'aria-controls': this.props.ariaControls,
          'aria-valuemax': this.props.maxValue,
          'aria-valuemin': this.props.minValue,
          'aria-valuenow': this.props.value,
          className: this.props.classNames.slider,
          draggable: 'false',
          onKeyDown: this.handleKeyDown,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          role: 'slider',
          tabIndex: '0' })
      );
    }
  }]);

  return Slider;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'handleMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleKeyDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleKeyDown'), _class.prototype)), _class);
exports.default = Slider;
module.exports = exports['default'];
//# sourceMappingURL=slider.js.map

/***/ }),

/***/ 1178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autobindDecorator = __webpack_require__(1040);

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * @ignore
 */
var Track = (_class = function (_React$Component) {
  _inherits(Track, _React$Component);

  _createClass(Track, null, [{
    key: 'propTypes',

    /**
     * @override
     * @return {Object}
     * @property {Function} children
     * @property {Function} classNames
     * @property {Boolean} draggableTrack
     * @property {Function} onTrackDrag
     * @property {Function} onTrackMouseDown
     * @property {Function} percentages
     */
    get: function get() {
      return {
        children: _propTypes2.default.node.isRequired,
        classNames: _propTypes2.default.objectOf(_propTypes2.default.string).isRequired,
        draggableTrack: _propTypes2.default.bool,
        onTrackDrag: _propTypes2.default.func,
        onTrackMouseDown: _propTypes2.default.func.isRequired,
        percentages: _propTypes2.default.objectOf(_propTypes2.default.number).isRequired
      };
    }

    /**
     * @param {Object} props
     * @param {InputRangeClassNames} props.classNames
     * @param {Boolean} props.draggableTrack
     * @param {Function} props.onTrackDrag
     * @param {Function} props.onTrackMouseDown
     * @param {number} props.percentages
     */

  }]);

  function Track(props) {
    _classCallCheck(this, Track);

    /**
     * @private
     * @type {?Component}
     */
    var _this = _possibleConstructorReturn(this, (Track.__proto__ || Object.getPrototypeOf(Track)).call(this, props));

    _this.node = null;
    _this.trackDragEvent = null;
    return _this;
  }

  /**
   * @private
   * @return {ClientRect}
   */


  _createClass(Track, [{
    key: 'getClientRect',
    value: function getClientRect() {
      return this.node.getBoundingClientRect();
    }

    /**
     * @private
     * @return {Object} CSS styles
     */

  }, {
    key: 'getActiveTrackStyle',
    value: function getActiveTrackStyle() {
      var width = (this.props.percentages.max - this.props.percentages.min) * 100 + '%';
      var left = this.props.percentages.min * 100 + '%';

      return { left: left, width: width };
    }

    /**
     * Listen to mousemove event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentMouseMoveListener',
    value: function addDocumentMouseMoveListener() {
      this.removeDocumentMouseMoveListener();
      this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
    }

    /**
     * Listen to mouseup event
     * @private
     * @return {void}
     */

  }, {
    key: 'addDocumentMouseUpListener',
    value: function addDocumentMouseUpListener() {
      this.removeDocumentMouseUpListener();
      this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentMouseMoveListener',
    value: function removeDocumentMouseMoveListener() {
      this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'removeDocumentMouseUpListener',
    value: function removeDocumentMouseUpListener() {
      this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */

  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      if (!this.props.draggableTrack) {
        return;
      }

      if (this.trackDragEvent !== null) {
        this.props.onTrackDrag(event, this.trackDragEvent);
      }

      this.trackDragEvent = event;
    }

    /**
     * @private
     * @return {void}
     */

  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      if (!this.props.draggableTrack) {
        return;
      }

      this.removeDocumentMouseMoveListener();
      this.removeDocumentMouseUpListener();
      this.trackDragEvent = null;
    }

    /**
     * @private
     * @param {SyntheticEvent} event - User event
     */

  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var clientX = event.touches ? event.touches[0].clientX : event.clientX;
      var trackClientRect = this.getClientRect();
      var position = {
        x: clientX - trackClientRect.left,
        y: 0
      };

      this.props.onTrackMouseDown(event, position);

      if (this.props.draggableTrack) {
        this.addDocumentMouseMoveListener();
        this.addDocumentMouseUpListener();
      }
    }

    /**
     * @private
     * @param {SyntheticEvent} event - User event
     */

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      event.preventDefault();

      this.handleMouseDown(event);
    }

    /**
     * @override
     * @return {JSX.Element}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var activeTrackStyle = this.getActiveTrackStyle();

      return _react2.default.createElement(
        'div',
        {
          className: this.props.classNames.track,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          ref: function ref(node) {
            _this2.node = node;
          } },
        _react2.default.createElement('div', {
          style: activeTrackStyle,
          className: this.props.classNames.activeTrack }),
        this.props.children
      );
    }
  }]);

  return Track;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'handleMouseMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTouchStart'), _class.prototype)), _class);
exports.default = Track;
module.exports = exports['default'];
//# sourceMappingURL=track.js.map

/***/ }),

/***/ 1179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @ignore */
var DOWN_ARROW = exports.DOWN_ARROW = 40;

/** @ignore */
var LEFT_ARROW = exports.LEFT_ARROW = 37;

/** @ignore */
var RIGHT_ARROW = exports.RIGHT_ARROW = 39;

/** @ignore */
var UP_ARROW = exports.UP_ARROW = 38;
//# sourceMappingURL=key-codes.js.map

/***/ }),

/***/ 1180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalIfBadRatingMobile = function ModalIfBadRatingMobile(_ref) {
    var publishIfBadRating = _ref.publishIfBadRating,
        closeModal = _ref.closeModal;

    return _react2.default.createElement(
        "div",
        { className: "modal fade",
            id: "modalBadRating",
            tabIndex: "-1",
            role: "dialog",
            "aria-labelledby": "modalBadRating" },
        _react2.default.createElement(
            "div",
            { className: "modal-dialog", role: "document" },
            _react2.default.createElement(
                "div",
                { className: "modal-content" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-body" },
                    _react2.default.createElement(
                        "form",
                        { name: "formIfBadRating", onSubmit: publishIfBadRating },
                        _react2.default.createElement(
                            "div",
                            { className: "wrapForm" },
                            _react2.default.createElement(
                                "div",
                                { className: "modal-title" },
                                _react2.default.createElement("img", { loading: "lazy", src: "/images/design/sad.svg", alt: "" })
                            ),
                            _react2.default.createElement(
                                "p",
                                { className: "head" },
                                "We are sorry to hear that, what could we change to do better?"
                            ),
                            _react2.default.createElement(
                                "label",
                                null,
                                _react2.default.createElement("input", { type: "radio", name: "feedbackStatus", value: "1", required: true }),
                                _react2.default.createElement("span", null),
                                "support (in store, mail or phone)"
                            ),
                            _react2.default.createElement(
                                "label",
                                null,
                                _react2.default.createElement("input", { type: "radio", name: "feedbackStatus", value: "2", required: true }),
                                _react2.default.createElement("span", null),
                                "Delivery (long waiting time or else)"
                            ),
                            _react2.default.createElement(
                                "label",
                                null,
                                _react2.default.createElement("input", { type: "radio", name: "feedbackStatus", value: "3", required: true }),
                                _react2.default.createElement("span", null),
                                "Condition (not as online stated, doa)"
                            ),
                            _react2.default.createElement(
                                "label",
                                null,
                                _react2.default.createElement("input", { type: "radio", name: "feedbackStatus", value: "4", required: true }),
                                _react2.default.createElement("span", null),
                                "Payment (pricing, problems with payment)"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "message" },
                                _react2.default.createElement("input", { type: "text", name: "feedbackText", placeholder: "Additional Feedback..." })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "buttons" },
                            _react2.default.createElement(
                                "button",
                                { onClick: closeModal,
                                    type: "button",
                                    className: "btn closeBtn",
                                    "data-dismiss": "modal",
                                    "aria-label": "Close" },
                                "Dismiss"
                            ),
                            _react2.default.createElement(
                                "button",
                                { className: "btn", onSubmit: publishIfBadRating },
                                "Publish"
                            )
                        )
                    )
                )
            )
        )
    );
};

ModalIfBadRatingMobile.propTypes = {};
ModalIfBadRatingMobile.defaultProps = {};

exports.default = ModalIfBadRatingMobile;

/***/ }),

/***/ 1249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(149);

var _axios2 = _interopRequireDefault(_axios);

var _reactI18next = __webpack_require__(315);

var _i18next = __webpack_require__(209);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Banner = function (_Component) {
  (0, _inherits3.default)(Banner, _Component);

  function Banner(props) {
    (0, _classCallCheck3.default)(this, Banner);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).call(this, props));

    _this.state = {
      inputField: "",
      errorInputData: "",
      showInput: true,
      showOkMessage: false
    };

    _this.send = _this.send.bind(_this);
    _this.changeInput = _this.changeInput.bind(_this);
    _this.handleNoEmail = _this.handleNoEmail.bind(_this);
    _this._validateInput = _this._validateInput.bind(_this);
    _this._gtag_report_conversion = _this._gtag_report_conversion.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Banner, [{
    key: "_validateInput",
    value: function _validateInput(value) {
      var error = "",
          domain = window.domainName.name.split(".")[window.domainName.name.split(".").length - 1],
          phonenoCh = /^\(?([0-9]{4})\)?[ ]?([0-9]{2})\)?[ ]?([0-9]{3})[ ]?([0-9]{2})\)?[ ]?([0-9]{2})$/,
          phoneno2Ch = /^\+([0-9]{2})\)?[ ]?([0-9]{2})\)?[ ]?([0-9]{3})[ ]?([0-9]{2})\)?[ ]?([0-9]{2})$/,
          phoneno3Ch = /^\(?([0-9]{3})\)?[ ]?([0-9]{3})\)?[ ]?([0-9]{2})[ ]?([0-9]{2})$/,
          phonenoDe = /^\(?([0-9]{4})\)?[ ]?([0-9]{3})\)?[ ]?([0-9]{2})[ ]?([0-9]{2})$/,
          phoneno2De = /^\(?([0-9]{5})\)?[ ]?([0-9]{3})\)?[ ]?([0-9]{2})[ ]?([0-9]{2})$/;

      if (value === "") {
        error = "Sie haben keine Telefonnummer bzw. E-Mail eingegeben.";
      } else if (isNaN(+value.replace(/ /g, ""))) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          return true;
        } else {
          error = "Telefonnummer bzw. E-Mail enthält unzulässige Zeichen";
          document.forms.coupon.email.value = "";
        }
      } else if (domain === "ch" && !phonenoCh.test(value) && !phoneno2Ch.test(value) && !phoneno3Ch.test(value) || domain === "de" && !phonenoDe.test(value) && !phoneno2De.test(value)) {
        document.forms.coupon.email.value = "";
        error = domain === "ch" ? "Die Telefonnummer muss aus mindestens 10 Zeichen bestehen, z.B. 079 123 45 67" : "Die Telefonnummer muss aus mindestens 11 Zeichen bestehen, z.B. 0150 123 45 67";
      }
      if (error) {
        this.setState({ errorInputData: error });
        return false;
      } else return true;
    }
  }, {
    key: "handleNoEmail",
    value: function handleNoEmail(e) {
      e.preventDefault();
      this.setState({ showOkMessage: false, showInput: true });
    }
  }, {
    key: "changeInput",
    value: function changeInput() {
      this.setState({ errorInputData: "" });
    }
  }, {
    key: "_gtag_report_conversion",
    value: function _gtag_report_conversion(url) {
      var callback = function callback() {
        if (typeof url != "undefined") {
          window.location = url;
        }
      };
      gtag("event", "conversion", {
        send_to: "AW-827036726/3tyqCJ_ayXsQtqiuigM",
        event_callback: callback
      });
      return false;
    }
  }, {
    key: "send",
    value: function send(e) {
      var _this2 = this;

      e.preventDefault();
      var domain = window.domainName.name.split(".")[window.domainName.name.split(".").length - 1];

      var inputValue = document.forms.coupon.email.value,
          inputAntiSpam = document.forms.coupon.email2.value;
      document.forms.coupon.email.value = "";
      if (this._validateInput(inputValue) && !inputAntiSpam) {
        document.getElementById("spinner-box-load").style.display = "block";
        _axios2.default.get("/api/generateCoupons?phoneOrEmail=" + inputValue.replace(/\+/g, "%2B")).then(function (result) {
          document.getElementById("spinner-box-load").style.display = "none";
          if (window.isGoogleConnection) {
            _this2._gtag_report_conversion();
          }
          _this2.setState({ showInput: false, showOkMessage: true });
          if (window.isFBConnection) {
            if (domain === "ch") {
              fbq("track", "Lead", { value: 1 }); // facebook pixel
            }
          }
        });
      } else document.forms.coupon.email.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      var couponDate = new Date(new Date().getTime() + 1209600000).toJSON().slice(0, 10).split("-").reverse().join(".");
      var t = this.props.t;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          "div",
          { className: "row banner" },
          _react2.default.createElement(
            "div",
            { className: "guy" },
            _react2.default.createElement("img", { loading: "lazy", src: "/images/design/Guy.svg", alt: "" })
          ),
          _react2.default.createElement(
            "div",
            { className: "price" },
            _react2.default.createElement(
              "span",
              { className: "price-amount" },
              t("newsLetterBox.circleBannerTop")
            ),
            _react2.default.createElement(
              "span",
              { className: "price-title" },
              t("newsLetterBox.circleBannerBottom")
            )
          ),
          _react2.default.createElement("div", { className: "visible-md visible-lg visible-xl col-sm-2 col-md-2" }),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-md-5 text-left" },
            _react2.default.createElement(
              "div",
              { className: "flex-column" },
              _react2.default.createElement("h3", {
                dangerouslySetInnerHTML: {
                  __html: t("newsLetterBox.mainTitle")
                }
              }),
              _react2.default.createElement(
                "p",
                null,
                t("newsLetterBox.descriptionPart1"),
                window.currencyValue,
                " ",
                t("newsLetterBox.descriptionPart2"),
                window.currencyValue,
                " ",
                t("newsLetterBox.descriptionPart3"),
                " ",
                couponDate,
                t("newsLetterBox.descriptionPart4")
              )
            )
          ),
          this.state.showInput && _react2.default.createElement(
            "div",
            { className: "col-sm-3 col-md-4 text-right" },
            _react2.default.createElement(
              "div",
              { className: "flex-column" },
              _react2.default.createElement(
                "span",
                { className: "error" },
                this.state.errorInputData
              ),
              _react2.default.createElement(
                "form",
                { className: "form", name: "coupon", onSubmit: this.send },
                _react2.default.createElement(
                  "label",
                  {
                    style: {
                      display: "inline",
                      float: "none",
                      lineHeight: "inherit"
                    }
                  },
                  _react2.default.createElement("input", {
                    type: "text",
                    name: "email",
                    id: "couponEmail",
                    onChange: this.changeInput,
                    placeholder: t("newsLetterBox.input")
                  }),
                  _react2.default.createElement("button", { "aria-label": "Submit", type: "submit" }),
                  _react2.default.createElement("input", {
                    type: "text",
                    name: "email2",
                    style: { display: "none" }
                  }),
                  _react2.default.createElement(
                    "p",
                    { className: "info-text" },
                    t("newsLetterBox.subtitle")
                  )
                )
              )
            )
          ),
          this.state.showOkMessage && _react2.default.createElement(
            "div",
            {
              className: "col-sm-4 col-md-5 text-right",
              style: { margin: "0 20px" }
            },
            _react2.default.createElement(
              "p",
              null,
              "Vielen Dank! Sie erhalten den Gutschein innerhalb von 15 Minuten per E-Mail bzw. SMS zugesendet.\xA0",
              _react2.default.createElement(
                "a",
                { href: "#", className: "noEmail", onClick: this.handleNoEmail },
                "Gutschein nicht erhalten"
              ),
              "?"
            )
          )
        ),
        _react2.default.createElement(
          "p",
          { className: "couponDescr-mobile" },
          "Auf alle Ank\xE4ufe ab 99.- ",
          window.currencyValue,
          " mit diesem Gutschein, g\xFCltig bis ",
          couponDate,
          ". Dieser Gutschein ist nicht mit anderen Aktionen / Rabatten kumulierbar."
        )
      );
    }
  }]);
  return Banner;
}(_react.Component);

Banner.propTypes = {};
Banner.defaultProps = {};

exports.default = (0, _reactI18next.withTranslation)()(Banner);

/***/ }),

/***/ 1250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerAboutUs = undefined;

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(206);

var _reactSlickMin = __webpack_require__(1251);

var _reactSlickMin2 = _interopRequireDefault(_reactSlickMin);

var _writeRatingModal = __webpack_require__(1162);

var _writeRatingModal2 = _interopRequireDefault(_writeRatingModal);

var _writeRatingModalMobile = __webpack_require__(1164);

var _writeRatingModalMobile2 = _interopRequireDefault(_writeRatingModalMobile);

var _apiCookie = __webpack_require__(941);

var _reactRedux = __webpack_require__(313);

var _reactI18next = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomerAboutUs = exports.CustomerAboutUs = function (_Component) {
  (0, _inherits3.default)(CustomerAboutUs, _Component);

  function CustomerAboutUs(props) {
    (0, _classCallCheck3.default)(this, CustomerAboutUs);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (CustomerAboutUs.__proto__ || Object.getPrototypeOf(CustomerAboutUs)).call(this, props));

    _this2.state = {
      data: [],
      hideNavArrowsPrev: true,
      hideNavArrowsNext: true,
      infoRatings: {
        total: 0,
        average: 0,
        statistics: [{ stars: 5, count: 0 }, { stars: 4, count: 0 }, { stars: 3, count: 0 }, { stars: 2, count: 0 }, { stars: 1, count: 0 }]
      },
      showModalWriteRating: false,
      writeRatingToday: false
    };

    _this2.mapItemReview = _this2.mapItemReview.bind(_this2);
    _this2.prevReview = _this2.prevReview.bind(_this2);
    _this2.nextReview = _this2.nextReview.bind(_this2);
    _this2.beforeChange = _this2.beforeChange.bind(_this2);
    _this2.showReview = _this2.showReview.bind(_this2);
    _this2._loadRatingData = _this2._loadRatingData.bind(_this2);
    _this2.closeShowModalWriteRating = _this2.closeShowModalWriteRating.bind(_this2);
    _this2.writeRating = _this2.writeRating.bind(_this2);
    return _this2;
  }

  (0, _createClass3.default)(CustomerAboutUs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadRatingData();
    }
  }, {
    key: '_loadRatingData',
    value: function _loadRatingData() {
      var _this3 = this;

      if (!this.props.notShowLoader) document.getElementById('spinner-box-load').style.display = 'block';
      axios.get('/api/getRatings?page=1&&sort=newest').then(function (result) {
        if (!_this3.props.notShowLoader) document.getElementById('spinner-box-load').style.display = 'none';
        _this3.setState({
          infoRatings: result.data.info,
          hideNavArrowsNext: result.data.items.length < 3,
          data: result.data.items
        });
      });
    }
  }, {
    key: 'closeShowModalWriteRating',
    value: function closeShowModalWriteRating() {
      this.setState({ showModalWriteRating: false });
    }
  }, {
    key: 'writeRating',
    value: function writeRating() {
      var _this4 = this;

      if (!_apiCookie.cookieApi.getCookie('writeRating')) {
        this.setState({ showModalWriteRating: true });
      } else {
        this.setState({ writeRatingToday: true });
        setTimeout(function () {
          return _this4.setState({ writeRatingToday: false });
        }, 3000);
      }
    }
  }, {
    key: 'mapItemReview',
    value: function mapItemReview(item, index) {
      function mapStars(count) {
        var starsArray = [];
        for (var i = 1; i <= 5; ++i) {
          var className = count >= i ? 'fa fa-star active' : 'fa fa-star';
          starsArray.push(_react2.default.createElement('i', { className: className, key: 'ItemReviewStar-' + i, 'aria-hidden': 'true' }));
        }
        return starsArray;
      }
      return _react2.default.createElement(
        'div',
        { className: 'col-xs-12 itemCustomer', key: 'ItemReview-' + index },
        _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement(
            'div',
            { className: 'avatar' },
            item.googleRating && _react2.default.createElement('img', { loading: 'lazy', src: item.photo, alt: '' }),
            !item.googleRating && item.anonym === 1 && _react2.default.createElement(
              'span',
              null,
              item.name
            ),
            !item.googleRating && item.anonym === 0 && _react2.default.createElement(
              'span',
              null,
              item.firstname.slice(0, 1).toUpperCase() + item.lastname.slice(0, 1).toUpperCase()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'name' },
            (item.googleRating || item.anonym === 1) && _react2.default.createElement(
              'span',
              null,
              item.name
            ),
            !item.googleRating && item.anonym === 0 && _react2.default.createElement(
              'span',
              null,
              item.firstname + ' ' + item.lastname
            ),
            _react2.default.createElement(
              'div',
              { className: 'stars' },
              mapStars(item.stars)
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'text' },
            item.message.length > 150 && _react2.default.createElement(
              'p',
              null,
              item.message.substr(0, 150),
              _react2.default.createElement(
                'span',
                null,
                '...'
              ),
              _react2.default.createElement('i', { onClick: this.showReview, className: 'fa fa-angle-down', 'aria-hidden': 'true' }),
              _react2.default.createElement(
                'span',
                { style: { display: 'none' } },
                item.message.substr(150, item.message.length),
                _react2.default.createElement('i', { onClick: this.showReview, className: 'fa fa-angle-up', 'aria-hidden': 'true' })
              )
            ),
            item.message.length <= 150 && _react2.default.createElement(
              'p',
              null,
              item.message
            )
          )
        )
      );
    }
  }, {
    key: 'showReview',
    value: function showReview(e) {
      if ($(e.target).hasClass('fa-angle-down')) {
        $(e.target).hide().prev().hide();
        $(e.target).closest('.itemCustomer').css({ 'height': 'auto' });
        $(e.target).next().show('fast');
      } else {
        $(e.target).parent().hide('fast').prev().show().prev().show();
        $(e.target).closest('.itemCustomer').css({ 'height': '400px' });
      }
    }
  }, {
    key: 'prevReview',
    value: function prevReview() {
      !this.state.hideNavArrowsPrev && this.refs.slider.slickPrev();
    }
  }, {
    key: 'nextReview',
    value: function nextReview() {
      !this.state.hideNavArrowsNext && this.refs.slider.slickNext();
    }
  }, {
    key: 'beforeChange',
    value: function beforeChange(oldIndex, newIndex) {
      var hideNavArrowsNext = newIndex + 3 == this.state.data.length,
          hideNavArrowsPrev = newIndex === 0;
      this.setState({ hideNavArrowsNext: hideNavArrowsNext, hideNavArrowsPrev: hideNavArrowsPrev });
    }
  }, {
    key: 'loopRender',
    value: function loopRender() {
      var indents = [];
      for (var i = 0; i < this.state.infoRatings.average; i++) {
        indents.push(_react2.default.createElement('i', { className: 'fa fa-star', 'aria-hidden': 'true', key: 'front-stars-' + i }));
      }
      return indents;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          data = _state.data,
          infoRatings = _state.infoRatings,
          showModalWriteRating = _state.showModalWriteRating,
          writeRatingToday = _state.writeRatingToday,
          _this = this,
          slidesToShow = window.isMobile ? 1 : 3,
          settings = {
        dots: false,
        arrows: false,
        infinite: window.isMobile,
        draggable: false,
        adaptiveHeight: data.length > 0 && window.isMobile,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        beforeChange: _this.beforeChange,
        useTransform: false,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      },
          classNameArrowsPrev = this.state.hideNavArrowsPrev ? 'navArrows disabled' : 'navArrows',
          classNameArrowsNext = this.state.hideNavArrowsNext ? 'navArrows disabled' : 'navArrows';

      var t = this.props.t;


      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'head' },
            _react2.default.createElement(
              'p',
              null,
              t('customerAboutUs.subTitle')
            ),
            _react2.default.createElement(
              'h1',
              null,
              t('customerAboutUs.mainTItle')
            )
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'link-to-ratings' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/bewertungen' },
            t('customerAboutUs.rightTopLinkText')
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row rating-section' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 col-sm-6 col-md-3 pr-0 mobile-border' },
            _react2.default.createElement(
              'div',
              { className: 'ratings-info' },
              writeRatingToday && _react2.default.createElement(
                'span',
                { className: 'error' },
                'Sie k\xF6nnen nur eine Bewertung pro Tag abgeben'
              ),
              _react2.default.createElement(
                'div',
                { className: 'wrap-info' },
                _react2.default.createElement(
                  'div',
                  { className: 'average' },
                  infoRatings.average,
                  '/5'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'back-stars' },
                  _react2.default.createElement('i', { className: 'fa fa-star active', 'aria-hidden': 'true', key: 'back-starts-1' }),
                  _react2.default.createElement('i', { className: 'fa fa-star active', 'aria-hidden': 'true', key: 'back-starts-2' }),
                  _react2.default.createElement('i', { className: 'fa fa-star active', 'aria-hidden': 'true', key: 'back-starts-3' }),
                  _react2.default.createElement('i', { className: 'fa fa-star active', 'aria-hidden': 'true', key: 'back-starts-4' }),
                  _react2.default.createElement('i', { className: 'fa fa-star active', 'aria-hidden': 'true', key: 'back-starts-5' }),
                  _react2.default.createElement(
                    'div',
                    { className: 'front-stars' },
                    this.loopRender()
                  )
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'title' },
                  t('customerAboutUs.leftMainTitle')
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'write', onClick: this.writeRating },
                  _react2.default.createElement(
                    'span',
                    null,
                    t('customerAboutUs.leftLinkText')
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 col-sm-6 col-md-9 pl-0' },
            _react2.default.createElement(
              'div',
              { className: 'row wrapCustomers' },
              _react2.default.createElement(
                'div',
                { className: 'col-xs-12 col-md-12' },
                data.length > 0 && _react2.default.createElement(
                  _reactSlickMin2.default,
                  (0, _extends3.default)({ ref: 'slider'
                  }, settings),
                  data.map(this.mapItemReview)
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row text-right' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-12' },
                _react2.default.createElement(
                  'span',
                  { className: classNameArrowsPrev, onClick: this.prevReview },
                  _react2.default.createElement('i', { className: 'fa fa-chevron-left', 'aria-hidden': 'true' })
                ),
                _react2.default.createElement(
                  'span',
                  { className: classNameArrowsNext, onClick: this.nextReview },
                  _react2.default.createElement('i', { className: 'fa fa-chevron-right', 'aria-hidden': 'true' })
                )
              )
            )
          )
        ),
        !window.isMobile && _react2.default.createElement(_writeRatingModal2.default, { showModalWriteRating: showModalWriteRating,
          closeShowModalWriteRating: this.closeShowModalWriteRating,
          user: this.props.user }),
        window.isMobile && _react2.default.createElement(_writeRatingModalMobile2.default, { user: this.props.user,
          showModalWriteRating: showModalWriteRating,
          closeShowModalWriteRating: this.closeShowModalWriteRating })
      );
    }
  }]);
  return CustomerAboutUs;
}(_react.Component);

CustomerAboutUs.propTypes = {};
CustomerAboutUs.defaultProps = {};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.withTranslation)()(CustomerAboutUs));

/***/ }),

/***/ 1251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = __webpack_require__(866);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

!function (t, e) {
	"object" == ( false ? "undefined" : (0, _typeof3.default)(exports)) && "object" == ( false ? "undefined" : (0, _typeof3.default)(module)) ? module.exports = e(__webpack_require__(16), __webpack_require__(322)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(16), __webpack_require__(322)], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : (0, _typeof3.default)(exports)) ? exports.Slider = e(require("react"), require("react-dom")) : t.Slider = e(t.React, t.ReactDOM);
}(undefined, function (t, e) {
	return function (t) {
		function e(s) {
			if (i[s]) return i[s].exports;var n = i[s] = { exports: {}, id: s, loaded: !1 };return t[s].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports;
		}var i = {};return e.m = t, e.c = i, e.p = "", e(0);
	}([function (t, e, i) {
		"use strict";
		t.exports = i(1);
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : { default: t };
		}function n(t, e) {
			if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
		}function r(t, e) {
			if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) && "function" != typeof e ? t : e;
		}function o(t, e) {
			if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
		}e.__esModule = !0;var a = Object.assign || function (t) {
			for (var e = 1; e < arguments.length; e++) {
				var i = arguments[e];for (var s in i) {
					Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
				}
			}return t;
		},
		    l = i(2),
		    c = s(l),
		    d = i(3),
		    u = i(7),
		    p = s(u),
		    h = i(21),
		    f = s(h),
		    g = i(10),
		    y = s(g),
		    v = i(23),
		    m = s(v),
		    S = m.default && i(24),
		    w = function (t) {
			function e(i) {
				n(this, e);var s = r(this, t.call(this, i));return s.state = { breakpoint: null }, s._responsiveMediaHandlers = [], s.innerSliderRefHandler = s.innerSliderRefHandler.bind(s), s;
			}return o(e, t), e.prototype.innerSliderRefHandler = function (t) {
				this.innerSlider = t;
			}, e.prototype.media = function (t, e) {
				S.register(t, e), this._responsiveMediaHandlers.push({ query: t, handler: e });
			}, e.prototype.componentWillMount = function () {
				var t = this;if (this.props.responsive) {
					var e = this.props.responsive.map(function (t) {
						return t.breakpoint;
					});e.sort(function (t, e) {
						return t - e;
					}), e.forEach(function (i, s) {
						var n;n = 0 === s ? (0, f.default)({ minWidth: 0, maxWidth: i }) : (0, f.default)({ minWidth: e[s - 1], maxWidth: i }), m.default && t.media(n, function () {
							t.setState({ breakpoint: i });
						});
					});var i = (0, f.default)({ minWidth: e.slice(-1)[0] });m.default && this.media(i, function () {
						t.setState({ breakpoint: null });
					});
				}
			}, e.prototype.componentWillUnmount = function () {
				this._responsiveMediaHandlers.forEach(function (t) {
					S.unregister(t.query, t.handler);
				});
			}, e.prototype.slickPrev = function () {
				this.innerSlider.slickPrev();
			}, e.prototype.slickNext = function () {
				this.innerSlider.slickNext();
			}, e.prototype.slickGoTo = function (t) {
				this.innerSlider.slickGoTo(t);
			}, e.prototype.render = function () {
				var t,
				    e,
				    i = this;this.state.breakpoint ? (e = this.props.responsive.filter(function (t) {
					return t.breakpoint === i.state.breakpoint;
				}), t = "unslick" === e[0].settings ? "unslick" : (0, p.default)({}, this.props, e[0].settings)) : t = (0, p.default)({}, y.default, this.props);var s = this.props.children;return Array.isArray(s) || (s = [s]), s = s.filter(function (t) {
					return !!t;
				}), "unslick" === t ? c.default.createElement("div", { className: this.props.className + " unslicked" }, s) : c.default.createElement(d.InnerSlider, a({ ref: this.innerSliderRefHandler }, t), s);
			}, e;
		}(c.default.Component);e.default = w;
	}, function (e, i) {
		e.exports = t;
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : { default: t };
		}e.__esModule = !0, e.InnerSlider = void 0;var n = Object.assign || function (t) {
			for (var e = 1; e < arguments.length; e++) {
				var i = arguments[e];for (var s in i) {
					Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
				}
			}return t;
		},
		    r = i(2),
		    o = s(r),
		    a = i(4),
		    l = s(a),
		    c = i(8),
		    d = s(c),
		    u = i(9),
		    p = s(u),
		    h = i(10),
		    f = s(h),
		    g = i(11),
		    y = s(g),
		    v = i(17),
		    m = s(v),
		    S = i(7),
		    w = s(S),
		    b = i(18),
		    T = i(19),
		    k = i(20);e.InnerSlider = (0, y.default)({ displayName: "InnerSlider", mixins: [d.default, l.default], list: null, track: null, listRefHandler: function listRefHandler(t) {
				this.list = t;
			}, trackRefHandler: function trackRefHandler(t) {
				this.track = t;
			}, getInitialState: function getInitialState() {
				return n({}, p.default, { currentSlide: this.props.initialSlide });
			}, getDefaultProps: function getDefaultProps() {
				return f.default;
			}, componentWillMount: function componentWillMount() {
				this.props.init && this.props.init(), this.setState({ mounted: !0 });for (var t = [], e = 0; e < o.default.Children.count(this.props.children); e++) {
					e >= this.state.currentSlide && e < this.state.currentSlide + this.props.slidesToShow && t.push(e);
				}this.props.lazyLoad && 0 === this.state.lazyLoadedList.length && this.setState({ lazyLoadedList: t });
			}, componentDidMount: function componentDidMount() {
				this.initialize(this.props), this.adaptHeight(), window && (window.addEventListener ? window.addEventListener("resize", this.onWindowResized) : window.attachEvent("onresize", this.onWindowResized));
			}, componentWillUnmount: function componentWillUnmount() {
				this.animationEndCallback && clearTimeout(this.animationEndCallback), window.addEventListener ? window.removeEventListener("resize", this.onWindowResized) : window.detachEvent("onresize", this.onWindowResized), this.state.autoPlayTimer && clearInterval(this.state.autoPlayTimer);
			}, componentWillReceiveProps: function componentWillReceiveProps(t) {
				this.props.slickGoTo != t.slickGoTo ? (console.warn("react-slick deprecation warning: slickGoTo prop is deprecated and it will be removed in next release. Use slickGoTo method instead"), this.changeSlide({ message: "index", index: t.slickGoTo, currentSlide: this.state.currentSlide })) : this.state.currentSlide >= t.children.length ? (this.update(t), this.changeSlide({ message: "index", index: t.children.length - t.slidesToShow, currentSlide: this.state.currentSlide })) : this.update(t);
			}, componentDidUpdate: function componentDidUpdate() {
				this.adaptHeight();
			}, onWindowResized: function onWindowResized() {
				this.update(this.props), this.setState({ animating: !1 }), clearTimeout(this.animationEndCallback), delete this.animationEndCallback;
			}, slickPrev: function slickPrev() {
				this.changeSlide({ message: "previous" });
			}, slickNext: function slickNext() {
				this.changeSlide({ message: "next" });
			}, slickGoTo: function slickGoTo(t) {
				t = Number(t), !isNaN(t) && this.changeSlide({ message: "index", index: t, currentSlide: this.state.currentSlide });
			}, render: function render() {
				var t,
				    e = (0, m.default)("slick-initialized", "slick-slider", this.props.className, { "slick-vertical": this.props.vertical }),
				    i = { fade: this.props.fade, cssEase: this.props.cssEase, speed: this.props.speed, infinite: this.props.infinite, centerMode: this.props.centerMode, focusOnSelect: this.props.focusOnSelect ? this.selectHandler : null, currentSlide: this.state.currentSlide, lazyLoad: this.props.lazyLoad, lazyLoadedList: this.state.lazyLoadedList, rtl: this.props.rtl, slideWidth: this.state.slideWidth, slidesToShow: this.props.slidesToShow, slidesToScroll: this.props.slidesToScroll, slideCount: this.state.slideCount, trackStyle: this.state.trackStyle, variableWidth: this.props.variableWidth };if (this.props.dots === !0 && this.state.slideCount >= this.props.slidesToShow) {
					var s = { dotsClass: this.props.dotsClass, slideCount: this.state.slideCount, slidesToShow: this.props.slidesToShow, currentSlide: this.state.currentSlide, slidesToScroll: this.props.slidesToScroll, clickHandler: this.changeSlide, children: this.props.children, customPaging: this.props.customPaging };t = o.default.createElement(T.Dots, s);
				}var r,
				    a,
				    l = { infinite: this.props.infinite, centerMode: this.props.centerMode, currentSlide: this.state.currentSlide, slideCount: this.state.slideCount, slidesToShow: this.props.slidesToShow, prevArrow: this.props.prevArrow, nextArrow: this.props.nextArrow, clickHandler: this.changeSlide };this.props.arrows && (r = o.default.createElement(k.PrevArrow, l), a = o.default.createElement(k.NextArrow, l));var c = null;this.props.vertical && (c = { height: this.state.listHeight });var d = null;this.props.vertical === !1 ? this.props.centerMode === !0 && (d = { padding: "0px " + this.props.centerPadding }) : this.props.centerMode === !0 && (d = { padding: this.props.centerPadding + " 0px" });var u = (0, w.default)({}, c, d);return o.default.createElement("div", { className: e, onMouseEnter: this.onInnerSliderEnter, onMouseLeave: this.onInnerSliderLeave, onMouseOver: this.onInnerSliderOver }, r, o.default.createElement("div", { ref: this.listRefHandler, className: "slick-list", style: u, onMouseDown: this.swipeStart, onMouseMove: this.state.dragging ? this.swipeMove : null, onMouseUp: this.swipeEnd, onMouseLeave: this.state.dragging ? this.swipeEnd : null, onTouchStart: this.swipeStart, onTouchMove: this.state.dragging ? this.swipeMove : null, onTouchEnd: this.swipeEnd, onTouchCancel: this.state.dragging ? this.swipeEnd : null, onKeyDown: this.props.accessibility ? this.keyHandler : null }, o.default.createElement(b.Track, n({ ref: this.trackRefHandler }, i), this.props.children)), a, t);
			} });
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : { default: t };
		}e.__esModule = !0;var n = i(5),
		    r = i(8),
		    o = (s(r), i(7)),
		    a = s(o),
		    l = i(6),
		    c = s(l),
		    d = { changeSlide: function changeSlide(t) {
				var e,
				    i,
				    s,
				    n,
				    r,
				    o = this.props,
				    a = o.slidesToScroll,
				    l = o.slidesToShow,
				    c = this.state,
				    d = c.slideCount,
				    u = c.currentSlide;if (n = d % a !== 0, e = n ? 0 : (d - u) % a, "previous" === t.message) s = 0 === e ? a : l - e, r = u - s, this.props.lazyLoad && (i = u - s, r = i === -1 ? d - 1 : i);else if ("next" === t.message) s = 0 === e ? a : e, r = u + s, this.props.lazyLoad && (r = (u + a) % d + e);else if ("dots" === t.message || "children" === t.message) {
					if (r = t.index * t.slidesToScroll, r === t.currentSlide) return;
				} else if ("index" === t.message && (r = Number(t.index), r === t.currentSlide)) return;this.slideHandler(r);
			}, keyHandler: function keyHandler(t) {
				t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && this.props.accessibility === !0 ? this.changeSlide({ message: this.props.rtl === !0 ? "next" : "previous" }) : 39 === t.keyCode && this.props.accessibility === !0 && this.changeSlide({ message: this.props.rtl === !0 ? "previous" : "next" }));
			}, selectHandler: function selectHandler(t) {
				this.changeSlide(t);
			}, swipeStart: function swipeStart(t) {
				var e, i;this.props.swipe === !1 || "ontouchend" in document && this.props.swipe === !1 || this.props.draggable === !1 && t.type.indexOf("mouse") !== -1 || (e = void 0 !== t.touches ? t.touches[0].pageX : t.clientX, i = void 0 !== t.touches ? t.touches[0].pageY : t.clientY, this.setState({ dragging: !0, touchObject: { startX: e, startY: i, curX: e, curY: i } }));
			}, swipeMove: function swipeMove(t) {
				if (!this.state.dragging) return void t.preventDefault();if (!this.state.scrolling) {
					if (this.state.animating) return void t.preventDefault();this.props.vertical && this.props.swipeToSlide && this.props.verticalSwiping && t.preventDefault();var e,
					    i,
					    s,
					    r = this.state.touchObject;i = (0, n.getTrackLeft)((0, a.default)({ slideIndex: this.state.currentSlide, trackRef: this.track }, this.props, this.state)), r.curX = t.touches ? t.touches[0].pageX : t.clientX, r.curY = t.touches ? t.touches[0].pageY : t.clientY, r.swipeLength = Math.round(Math.sqrt(Math.pow(r.curX - r.startX, 2)));var o = Math.round(Math.sqrt(Math.pow(r.curY - r.startY, 2)));if (!this.props.verticalSwiping && !this.state.swiping && o > 4) return void this.setState({ scrolling: !0 });this.props.verticalSwiping && (r.swipeLength = o), s = (this.props.rtl === !1 ? 1 : -1) * (r.curX > r.startX ? 1 : -1), this.props.verticalSwiping && (s = r.curY > r.startY ? 1 : -1);var l = this.state.currentSlide,
					    c = Math.ceil(this.state.slideCount / this.props.slidesToScroll),
					    d = this.swipeDirection(this.state.touchObject),
					    u = r.swipeLength;this.props.infinite === !1 && (0 === l && "right" === d || l + 1 >= c && "left" === d) && (u = r.swipeLength * this.props.edgeFriction, this.state.edgeDragged === !1 && this.props.edgeEvent && (this.props.edgeEvent(d), this.setState({ edgeDragged: !0 }))), this.state.swiped === !1 && this.props.swipeEvent && (this.props.swipeEvent(d), this.setState({ swiped: !0 })), e = this.props.vertical ? i + u * (this.state.listHeight / this.state.listWidth) * s : i + u * s, this.props.verticalSwiping && (e = i + u * s), this.setState({ touchObject: r, swipeLeft: e, trackStyle: (0, n.getTrackCSS)((0, a.default)({ left: e }, this.props, this.state)) }), Math.abs(r.curX - r.startX) < .8 * Math.abs(r.curY - r.startY) || r.swipeLength > 4 && (this.setState({ swiping: !0 }), t.preventDefault());
				}
			}, getNavigableIndexes: function getNavigableIndexes() {
				var t = void 0,
				    e = 0,
				    i = 0,
				    s = [];for (this.props.infinite ? (e = this.props.slidesToShow * -1, i = this.props.slidesToShow * -1, t = 2 * this.state.slideCount) : t = this.state.slideCount; e < t;) {
					s.push(e), e = i + this.props.slidesToScroll, i += this.props.slidesToScroll <= this.props.slidesToShow ? this.props.slidesToScroll : this.props.slidesToShow;
				}return s;
			}, checkNavigable: function checkNavigable(t) {
				var e = this.getNavigableIndexes(),
				    i = 0;if (t > e[e.length - 1]) t = e[e.length - 1];else for (var s in e) {
					if (t < e[s]) {
						t = i;break;
					}i = e[s];
				}return t;
			}, getSlideCount: function getSlideCount() {
				var t = this,
				    e = this.props.centerMode ? this.state.slideWidth * Math.floor(this.props.slidesToShow / 2) : 0;if (this.props.swipeToSlide) {
					var i = void 0,
					    s = c.default.findDOMNode(this.list),
					    n = s.querySelectorAll(".slick-slide");Array.from(n).every(function (s) {
						if (t.props.vertical) {
							if (s.offsetTop + t.getHeight(s) / 2 > t.state.swipeLeft * -1) return i = s, !1;
						} else if (s.offsetLeft - e + t.getWidth(s) / 2 > t.state.swipeLeft * -1) return i = s, !1;return !0;
					});var r = Math.abs(i.dataset.index - this.state.currentSlide) || 1;return r;
				}return this.props.slidesToScroll;
			}, swipeEnd: function swipeEnd(t) {
				if (!this.state.dragging) return void (this.props.swipe && t.preventDefault());var e = this.state.touchObject,
				    i = this.state.listWidth / this.props.touchThreshold,
				    s = this.swipeDirection(e);this.props.verticalSwiping && (i = this.state.listHeight / this.props.touchThreshold);var r = this.state.scrolling;if (this.setState({ dragging: !1, edgeDragged: !1, scrolling: !1, swiping: !1, swiped: !1, swipeLeft: null, touchObject: {} }), !r && e.swipeLength) if (e.swipeLength > i) {
					t.preventDefault();var o = void 0,
					    l = void 0;switch (s) {case "left":case "down":
							l = this.state.currentSlide + this.getSlideCount(), o = this.props.swipeToSlide ? this.checkNavigable(l) : l, this.state.currentDirection = 0;break;case "right":case "up":
							l = this.state.currentSlide - this.getSlideCount(), o = this.props.swipeToSlide ? this.checkNavigable(l) : l, this.state.currentDirection = 1;break;default:
							o = this.state.currentSlide;}this.slideHandler(o);
				} else {
					var c = (0, n.getTrackLeft)((0, a.default)({ slideIndex: this.state.currentSlide, trackRef: this.track }, this.props, this.state));this.setState({ trackStyle: (0, n.getTrackAnimateCSS)((0, a.default)({ left: c }, this.props, this.state)) });
				}
			}, onInnerSliderEnter: function onInnerSliderEnter(t) {
				this.props.autoplay && this.props.pauseOnHover && this.pause();
			}, onInnerSliderOver: function onInnerSliderOver(t) {
				this.props.autoplay && this.props.pauseOnHover && this.pause();
			}, onInnerSliderLeave: function onInnerSliderLeave(t) {
				this.props.autoplay && this.props.pauseOnHover && this.autoPlay();
			} };e.default = d;
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : { default: t };
		}e.__esModule = !0, e.getTrackLeft = e.getTrackAnimateCSS = e.getTrackCSS = void 0;var n = i(6),
		    r = s(n),
		    o = i(7),
		    a = s(o),
		    l = function l(t, e) {
			return e.reduce(function (e, i) {
				return e && t.hasOwnProperty(i);
			}, !0) ? null : console.error("Keys Missing", t);
		},
		    c = e.getTrackCSS = function (t) {
			l(t, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth"]);var e,
			    i,
			    s = t.slideCount + 2 * t.slidesToShow;t.vertical ? i = s * t.slideHeight : e = t.variableWidth ? (t.slideCount + 2 * t.slidesToShow) * t.slideWidth : t.centerMode ? (t.slideCount + 2 * (t.slidesToShow + 1)) * t.slideWidth : (t.slideCount + 2 * t.slidesToShow) * t.slideWidth;var n = { opacity: 1, WebkitTransform: t.vertical ? "translate(0px, " + t.left + "px)" : "translate(" + t.left + "px, 0px)", transform: t.vertical ? "translate(0px, " + t.left + "px)" : "translate(" + t.left + "px, 0px)", transition: "", WebkitTransition: "", msTransform: t.vertical ? "translateY(" + t.left + "px)" : "translateX(" + t.left + "px)" };return e && (0, a.default)(n, { width: e }), i && (0, a.default)(n, { height: i }), window && !window.addEventListener && window.attachEvent && (t.vertical ? n.marginTop = t.left + "px" : n.marginLeft = t.left + "px"), n;
		};e.getTrackAnimateCSS = function (t) {
			l(t, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth", "speed", "cssEase"]);var e = c(t);return e.WebkitTransition = "-webkit-transform " + t.speed + "ms " + t.cssEase, e.transition = "transform " + t.speed + "ms " + t.cssEase, e;
		}, e.getTrackLeft = function (t) {
			l(t, ["slideIndex", "trackRef", "infinite", "centerMode", "slideCount", "slidesToShow", "slidesToScroll", "slideWidth", "listWidth", "variableWidth", "slideHeight"]);var e,
			    i,
			    s = 0,
			    n = 0;if (t.fade) return 0;if (t.infinite) t.slideCount >= t.slidesToShow && (s = t.slideWidth * t.slidesToShow * -1, n = t.slideHeight * t.slidesToShow * -1), t.slideCount % t.slidesToScroll !== 0 && t.slideIndex + t.slidesToScroll > t.slideCount && t.slideCount > t.slidesToShow && (t.slideIndex > t.slideCount ? (s = (t.slidesToShow - (t.slideIndex - t.slideCount)) * t.slideWidth * -1, n = (t.slidesToShow - (t.slideIndex - t.slideCount)) * t.slideHeight * -1) : (s = t.slideCount % t.slidesToScroll * t.slideWidth * -1, n = t.slideCount % t.slidesToScroll * t.slideHeight * -1));else if (t.slideCount % t.slidesToScroll !== 0 && t.slideIndex + t.slidesToScroll > t.slideCount && t.slideCount > t.slidesToShow) {
				var o = t.slidesToShow - t.slideCount % t.slidesToScroll;s = o * t.slideWidth;
			}if (t.centerMode && (t.infinite ? s += t.slideWidth * Math.floor(t.slidesToShow / 2) : s = t.slideWidth * Math.floor(t.slidesToShow / 2)), e = t.vertical ? t.slideIndex * t.slideHeight * -1 + n : t.slideIndex * t.slideWidth * -1 + s, t.variableWidth === !0) {
				var a;t.slideCount <= t.slidesToShow || t.infinite === !1 ? i = r.default.findDOMNode(t.trackRef).childNodes[t.slideIndex] : (a = t.slideIndex + t.slidesToShow, i = r.default.findDOMNode(t.trackRef).childNodes[a]), e = i ? i.offsetLeft * -1 : 0, t.centerMode === !0 && (i = t.infinite === !1 ? r.default.findDOMNode(t.trackRef).children[t.slideIndex] : r.default.findDOMNode(t.trackRef).children[t.slideIndex + t.slidesToShow + 1], i && (e = i.offsetLeft * -1 + (t.listWidth - i.offsetWidth) / 2));
			}return e;
		};
	}, function (t, i) {
		t.exports = e;
	}, function (t, e) {
		/*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
		"use strict";
		function i(t) {
			if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t);
		}function s() {
			try {
				if (!Object.assign) return !1;var t = new String("abc");if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;for (var e = {}, i = 0; i < 10; i++) {
					e["_" + String.fromCharCode(i)] = i;
				}var s = Object.getOwnPropertyNames(e).map(function (t) {
					return e[t];
				});if ("0123456789" !== s.join("")) return !1;var n = {};return "abcdefghijklmnopqrst".split("").forEach(function (t) {
					n[t] = t;
				}), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("");
			} catch (t) {
				return !1;
			}
		}var n = Object.getOwnPropertySymbols,
		    r = Object.prototype.hasOwnProperty,
		    o = Object.prototype.propertyIsEnumerable;t.exports = s() ? Object.assign : function (t, e) {
			for (var s, a, l = i(t), c = 1; c < arguments.length; c++) {
				s = Object(arguments[c]);for (var d in s) {
					r.call(s, d) && (l[d] = s[d]);
				}if (n) {
					a = n(s);for (var u = 0; u < a.length; u++) {
						o.call(s, a[u]) && (l[a[u]] = s[a[u]]);
					}
				}
			}return l;
		};
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : { default: t };
		}e.__esModule = !0;var n = Object.assign || function (t) {
			for (var e = 1; e < arguments.length; e++) {
				var i = arguments[e];for (var s in i) {
					Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
				}
			}return t;
		},
		    r = i(2),
		    o = s(r),
		    a = i(6),
		    l = s(a),
		    c = i(5),
		    d = i(7),
		    u = s(d),
		    p = { initialize: function initialize(t) {
				var e,
				    i = l.default.findDOMNode(this.list),
				    s = o.default.Children.count(t.children),
				    n = this.getWidth(i),
				    r = this.getWidth(l.default.findDOMNode(this.track));if (t.vertical) e = this.getWidth(l.default.findDOMNode(this));else {
					var a = t.centerMode && 2 * parseInt(t.centerPadding);e = (this.getWidth(l.default.findDOMNode(this)) - a) / t.slidesToShow;
				}var d = this.getHeight(i.querySelector('[data-index="0"]')),
				    p = d * t.slidesToShow,
				    h = t.rtl ? s - 1 - t.initialSlide : t.initialSlide;this.setState({ slideCount: s, slideWidth: e, listWidth: n, trackWidth: r, currentSlide: h, slideHeight: d, listHeight: p }, function () {
					var e = (0, c.getTrackLeft)((0, u.default)({ slideIndex: this.state.currentSlide, trackRef: this.track }, t, this.state)),
					    i = (0, c.getTrackCSS)((0, u.default)({ left: e }, t, this.state));this.setState({ trackStyle: i }), this.autoPlay();
				});
			}, update: function update(t) {
				var e,
				    i = l.default.findDOMNode(this.list),
				    s = o.default.Children.count(t.children),
				    n = this.getWidth(i),
				    r = this.getWidth(l.default.findDOMNode(this.track));if (t.vertical) e = this.getWidth(l.default.findDOMNode(this));else {
					var a = t.centerMode && 2 * parseInt(t.centerPadding);e = (this.getWidth(l.default.findDOMNode(this)) - a) / t.slidesToShow;
				}var d = this.getHeight(i.querySelector('[data-index="0"]')),
				    p = d * t.slidesToShow;t.autoplay ? this.autoPlay() : this.pause(), this.setState({ slideCount: s, slideWidth: e, listWidth: n, trackWidth: r, slideHeight: d, listHeight: p }, function () {
					var e = (0, c.getTrackLeft)((0, u.default)({ slideIndex: this.state.currentSlide, trackRef: this.track }, t, this.state)),
					    i = (0, c.getTrackCSS)((0, u.default)({ left: e }, t, this.state));this.setState({ trackStyle: i });
				});
			}, getWidth: function getWidth(t) {
				return t && (t.getBoundingClientRect().width || t.offsetWidth) || 0;
			}, getHeight: function getHeight(t) {
				return t && (t.getBoundingClientRect().height || t.offsetHeight) || 0;
			}, adaptHeight: function adaptHeight() {
				if (this.props.adaptiveHeight) {
					var t = '[data-index="' + this.state.currentSlide + '"]';if (this.list) {
						var e = l.default.findDOMNode(this.list);e.style.height = e.querySelector(t).offsetHeight + "px";
					}
				}
			}, canGoNext: function canGoNext(t) {
				var e = !0;return t.infinite || (t.centerMode ? t.currentSlide >= t.slideCount - 1 && (e = !1) : (t.slideCount <= t.slidesToShow || t.currentSlide >= t.slideCount - t.slidesToShow) && (e = !1)), e;
			}, slideHandler: function slideHandler(t) {
				var e,
				    i,
				    s,
				    n,
				    r,
				    o = this;if (!this.props.waitForAnimate || !this.state.animating) {
					if (this.props.fade) {
						if (i = this.state.currentSlide, this.props.infinite === !1 && (t < 0 || t >= this.state.slideCount)) return;return e = t < 0 ? t + this.state.slideCount : t >= this.state.slideCount ? t - this.state.slideCount : t, this.props.lazyLoad && this.state.lazyLoadedList.indexOf(e) < 0 && this.setState({ lazyLoadedList: this.state.lazyLoadedList.concat(e) }), r = function r() {
							o.setState({ animating: !1 }), o.props.afterChange && o.props.afterChange(e), delete o.animationEndCallback;
						}, this.setState({ animating: !0, currentSlide: e }, function () {
							this.animationEndCallback = setTimeout(r, this.props.speed);
						}), this.props.beforeChange && this.props.beforeChange(this.state.currentSlide, e), void this.autoPlay();
					}if (e = t, i = e < 0 ? this.props.infinite === !1 ? 0 : this.state.slideCount % this.props.slidesToScroll !== 0 ? this.state.slideCount - this.state.slideCount % this.props.slidesToScroll : this.state.slideCount + e : e >= this.state.slideCount ? this.props.infinite === !1 ? this.state.slideCount - this.props.slidesToShow : this.state.slideCount % this.props.slidesToScroll !== 0 ? 0 : e - this.state.slideCount : e, s = (0, c.getTrackLeft)((0, u.default)({ slideIndex: e, trackRef: this.track }, this.props, this.state)), n = (0, c.getTrackLeft)((0, u.default)({ slideIndex: i, trackRef: this.track }, this.props, this.state)), this.props.infinite === !1 && (s = n), this.props.beforeChange && this.props.beforeChange(this.state.currentSlide, i), this.props.lazyLoad) {
						for (var a = !0, l = [], d = e; d < e + this.props.slidesToShow; d++) {
							a = a && this.state.lazyLoadedList.indexOf(d) >= 0, a || l.push(d);
						}a || this.setState({ lazyLoadedList: this.state.lazyLoadedList.concat(l) });
					}if (this.props.useCSS === !1) this.setState({ currentSlide: i, trackStyle: (0, c.getTrackCSS)((0, u.default)({ left: n }, this.props, this.state)) }, function () {
						this.props.afterChange && this.props.afterChange(i);
					});else {
						var p = { animating: !1, currentSlide: i, trackStyle: (0, c.getTrackCSS)((0, u.default)({ left: n }, this.props, this.state)), swipeLeft: null };r = function r() {
							o.setState(p), o.props.afterChange && o.props.afterChange(i), delete o.animationEndCallback;
						}, this.setState({ animating: !0, currentSlide: i, trackStyle: (0, c.getTrackAnimateCSS)((0, u.default)({ left: s }, this.props, this.state)) }, function () {
							this.animationEndCallback = setTimeout(r, this.props.speed);
						});
					}this.autoPlay();
				}
			}, swipeDirection: function swipeDirection(t) {
				var e, i, s, n;return e = t.startX - t.curX, i = t.startY - t.curY, s = Math.atan2(i, e), n = Math.round(180 * s / Math.PI), n < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 || n <= 360 && n >= 315 ? this.props.rtl === !1 ? "left" : "right" : n >= 135 && n <= 225 ? this.props.rtl === !1 ? "right" : "left" : this.props.verticalSwiping === !0 ? n >= 35 && n <= 135 ? "down" : "up" : "vertical";
			}, play: function play() {
				var t;if (!this.state.mounted) return !1;if (this.props.rtl) t = this.state.currentSlide - this.props.slidesToScroll;else {
					if (!this.canGoNext(n({}, this.props, this.state))) return !1;t = this.state.currentSlide + this.props.slidesToScroll;
				}this.slideHandler(t);
			}, autoPlay: function autoPlay() {
				this.state.autoPlayTimer && clearTimeout(this.state.autoPlayTimer), this.props.autoplay && this.setState({ autoPlayTimer: setTimeout(this.play, this.props.autoplaySpeed) });
			}, pause: function pause() {
				this.state.autoPlayTimer && (clearTimeout(this.state.autoPlayTimer), this.setState({ autoPlayTimer: null }));
			} };e.default = p;
	}, function (t, e) {
		"use strict";
		var i = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, listWidth: null, listHeight: null, scrolling: !1, slideCount: null, slideWidth: null, slideHeight: null, swiping: !1, swipeLeft: null, touchObject: { startX: 0, startY: 0, curX: 0, curY: 0 }, lazyLoadedList: [], initialized: !1, edgeDragged: !1, swiped: !1, trackStyle: {}, trackWidth: 0 };t.exports = i;
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : { default: t };
		}var n = i(2),
		    r = s(n),
		    o = { className: "", accessibility: !0, adaptiveHeight: !1, arrows: !0, autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function customPaging(t) {
				return r.default.createElement("button", null, t + 1);
			}, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: !1, pauseOnHover: !0, responsive: null, rtl: !1, slide: "div", slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, variableWidth: !1, vertical: !1, waitForAnimate: !0, afterChange: null, beforeChange: null, edgeEvent: null, init: null, swipeEvent: null, nextArrow: null, prevArrow: null };t.exports = o;
	}, function (t, e, i) {
		"use strict";
		var s = i(2),
		    n = i(12);if ("undefined" == typeof s) throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");var r = new s.Component().updater;t.exports = n(s.Component, s.isValidElement, r);
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t;
		}function n(t, e, i) {
			function n(t, e, i) {
				for (var s in e) {
					e.hasOwnProperty(s) && c("function" == typeof e[s], "%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.", t.displayName || "ReactClass", r[i], s);
				}
			}function u(t, e) {
				var i = b.hasOwnProperty(e) ? b[e] : null;C.hasOwnProperty(e) && l("OVERRIDE_BASE" === i, "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.", e), t && l("DEFINE_MANY" === i || "DEFINE_MANY_MERGED" === i, "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", e);
			}function p(t, i) {
				if (!i) {
					var s = typeof i === "undefined" ? "undefined" : (0, _typeof3.default)(i),
					    n = "object" === s && null !== i;return void c(n, "%s: You're attempting to include a mixin that is either null or not an object. Check the mixins included by the component, as well as any mixins they include themselves. Expected object but got %s.", t.displayName || "ReactClass", null === i ? null : s);
				}l("function" != typeof i, "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."), l(!e(i), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");var r = t.prototype,
				    o = r.__reactAutoBindPairs;i.hasOwnProperty(d) && T.mixins(t, i.mixins);for (var a in i) {
					if (i.hasOwnProperty(a) && a !== d) {
						var p = i[a],
						    h = r.hasOwnProperty(a);if (u(h, a), T.hasOwnProperty(a)) T[a](t, p);else {
							var f = b.hasOwnProperty(a),
							    v = "function" == typeof p,
							    m = v && !f && !h && i.autobind !== !1;if (m) o.push(a, p), r[a] = p;else if (h) {
								var S = b[a];l(f && ("DEFINE_MANY_MERGED" === S || "DEFINE_MANY" === S), "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.", S, a), "DEFINE_MANY_MERGED" === S ? r[a] = g(r[a], p) : "DEFINE_MANY" === S && (r[a] = y(r[a], p));
							} else r[a] = p, "function" == typeof p && i.displayName && (r[a].displayName = i.displayName + "_" + a);
						}
					}
				}
			}function h(t, e) {
				if (e) for (var i in e) {
					var s = e[i];if (e.hasOwnProperty(i)) {
						var n = i in T;l(!n, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', i);var r = i in t;l(!r, "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", i), t[i] = s;
					}
				}
			}function f(t, e) {
				l(t && e && "object" == (typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t)) && "object" == (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)), "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");for (var i in e) {
					e.hasOwnProperty(i) && (l(void 0 === t[i], "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.", i), t[i] = e[i]);
				}return t;
			}function g(t, e) {
				return function () {
					var i = t.apply(this, arguments),
					    s = e.apply(this, arguments);if (null == i) return s;if (null == s) return i;var n = {};return f(n, i), f(n, s), n;
				};
			}function y(t, e) {
				return function () {
					t.apply(this, arguments), e.apply(this, arguments);
				};
			}function v(t, e) {
				var i = e.bind(t);i.__reactBoundContext = t, i.__reactBoundMethod = e, i.__reactBoundArguments = null;var s = t.constructor.displayName,
				    n = i.bind;return i.bind = function (r) {
					for (var o = arguments.length, a = Array(o > 1 ? o - 1 : 0), l = 1; l < o; l++) {
						a[l - 1] = arguments[l];
					}if (r !== t && null !== r) c(!1, "bind(): React component methods may only be bound to the component instance. See %s", s);else if (!a.length) return c(!1, "bind(): You are binding a component method to the component. React does this for you automatically in a high-performance way, so you can safely remove this call. See %s", s), i;var d = n.apply(i, arguments);return d.__reactBoundContext = t, d.__reactBoundMethod = e, d.__reactBoundArguments = a, d;
				}, i;
			}function m(t) {
				for (var e = t.__reactAutoBindPairs, i = 0; i < e.length; i += 2) {
					var s = e[i],
					    n = e[i + 1];t[s] = v(t, n);
				}
			}function S(t) {
				var e = s(function (t, s, n) {
					c(this instanceof e, "Something is calling a React component directly. Use a factory or JSX instead. See: https://fb.me/react-legacyfactory"), this.__reactAutoBindPairs.length && m(this), this.props = t, this.context = s, this.refs = a, this.updater = n || i, this.state = null;var r = this.getInitialState ? this.getInitialState() : null;void 0 === r && this.getInitialState._isMockFunction && (r = null), l("object" == (typeof r === "undefined" ? "undefined" : (0, _typeof3.default)(r)) && !Array.isArray(r), "%s.getInitialState(): must return an object or null", e.displayName || "ReactCompositeComponent"), this.state = r;
				});e.prototype = new E(), e.prototype.constructor = e, e.prototype.__reactAutoBindPairs = [], w.forEach(p.bind(null, e)), p(e, k), p(e, t), p(e, x), e.getDefaultProps && (e.defaultProps = e.getDefaultProps()), e.getDefaultProps && (e.getDefaultProps.isReactClassApproved = {}), e.prototype.getInitialState && (e.prototype.getInitialState.isReactClassApproved = {}), l(e.prototype.render, "createClass(...): Class specification must implement a `render` method."), c(!e.prototype.componentShouldUpdate, "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", t.displayName || "A component"), c(!e.prototype.componentWillRecieveProps, "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", t.displayName || "A component");for (var n in b) {
					e.prototype[n] || (e.prototype[n] = null);
				}return e;
			}var w = [],
			    b = { mixins: "DEFINE_MANY", statics: "DEFINE_MANY", propTypes: "DEFINE_MANY", contextTypes: "DEFINE_MANY", childContextTypes: "DEFINE_MANY", getDefaultProps: "DEFINE_MANY_MERGED", getInitialState: "DEFINE_MANY_MERGED", getChildContext: "DEFINE_MANY_MERGED", render: "DEFINE_ONCE", componentWillMount: "DEFINE_MANY", componentDidMount: "DEFINE_MANY", componentWillReceiveProps: "DEFINE_MANY", shouldComponentUpdate: "DEFINE_ONCE", componentWillUpdate: "DEFINE_MANY", componentDidUpdate: "DEFINE_MANY", componentWillUnmount: "DEFINE_MANY", updateComponent: "OVERRIDE_BASE" },
			    T = { displayName: function displayName(t, e) {
					t.displayName = e;
				}, mixins: function mixins(t, e) {
					if (e) for (var i = 0; i < e.length; i++) {
						p(t, e[i]);
					}
				}, childContextTypes: function childContextTypes(t, e) {
					n(t, e, "childContext"), t.childContextTypes = o({}, t.childContextTypes, e);
				}, contextTypes: function contextTypes(t, e) {
					n(t, e, "context"), t.contextTypes = o({}, t.contextTypes, e);
				}, getDefaultProps: function getDefaultProps(t, e) {
					t.getDefaultProps ? t.getDefaultProps = g(t.getDefaultProps, e) : t.getDefaultProps = e;
				}, propTypes: function propTypes(t, e) {
					n(t, e, "prop"), t.propTypes = o({}, t.propTypes, e);
				}, statics: function statics(t, e) {
					h(t, e);
				}, autobind: function autobind() {} },
			    k = { componentDidMount: function componentDidMount() {
					this.__isMounted = !0;
				} },
			    x = { componentWillUnmount: function componentWillUnmount() {
					this.__isMounted = !1;
				} },
			    C = { replaceState: function replaceState(t, e) {
					this.updater.enqueueReplaceState(this, t, e);
				}, isMounted: function isMounted() {
					return c(this.__didWarnIsMounted, "%s: isMounted is deprecated. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.", this.constructor && this.constructor.displayName || this.name || "Component"), this.__didWarnIsMounted = !0, !!this.__isMounted;
				} },
			    E = function E() {};return o(E.prototype, t.prototype, C), S;
		}var r,
		    o = i(7),
		    a = i(13),
		    l = i(14),
		    c = i(15),
		    d = "mixins";r = { prop: "prop", context: "context", childContext: "child context" }, t.exports = n;
	}, function (t, e, i) {
		"use strict";
		var s = {};Object.freeze(s), t.exports = s;
	}, function (t, e, i) {
		"use strict";
		function s(t, e, i, s, r, o, a, l) {
			if (n(e), !t) {
				var c;if (void 0 === e) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
					var d = [i, s, r, o, a, l],
					    u = 0;c = new Error(e.replace(/%s/g, function () {
						return d[u++];
					})), c.name = "Invariant Violation";
				}throw c.framesToPop = 1, c;
			}
		}var n = function n(t) {};n = function n(t) {
			if (void 0 === t) throw new Error("invariant requires an error message argument");
		}, t.exports = s;
	}, function (t, e, i) {
		"use strict";
		var s = i(16),
		    n = s,
		    r = function r(t) {
			for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) {
				i[s - 1] = arguments[s];
			}var n = 0,
			    r = "Warning: " + t.replace(/%s/g, function () {
				return i[n++];
			});"undefined" != typeof console && console.error(r);try {
				throw new Error(r);
			} catch (t) {}
		};n = function n(t, e) {
			if (void 0 === e) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if (0 !== e.indexOf("Failed Composite propType: ") && !t) {
				for (var i = arguments.length, s = Array(i > 2 ? i - 2 : 0), n = 2; n < i; n++) {
					s[n - 2] = arguments[n];
				}r.apply(void 0, [e].concat(s));
			}
		}, t.exports = n;
	}, function (t, e) {
		"use strict";
		function i(t) {
			return function () {
				return t;
			};
		}var s = function s() {};s.thatReturns = i, s.thatReturnsFalse = i(!1), s.thatReturnsTrue = i(!0), s.thatReturnsNull = i(null), s.thatReturnsThis = function () {
			return this;
		}, s.thatReturnsArgument = function (t) {
			return t;
		}, t.exports = s;
	}, function (t, e, i) {
		var s, n; /*!
            Copyright (c) 2016 Jed Watson.
            Licensed under the MIT License (MIT), see
            http://jedwatson.github.io/classnames
            */
		!function () {
			"use strict";
			function i() {
				for (var t = [], e = 0; e < arguments.length; e++) {
					var s = arguments[e];if (s) {
						var n = typeof s === "undefined" ? "undefined" : (0, _typeof3.default)(s);if ("string" === n || "number" === n) t.push(s);else if (Array.isArray(s)) t.push(i.apply(null, s));else if ("object" === n) for (var o in s) {
							r.call(s, o) && s[o] && t.push(o);
						}
					}
				}return t.join(" ");
			}var r = {}.hasOwnProperty;"undefined" != typeof t && t.exports ? t.exports = i : (s = [], n = function () {
				return i;
			}.apply(e, s), !(void 0 !== n && (t.exports = n)));
		}();
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : { default: t };
		}function n(t, e) {
			if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
		}function r(t, e) {
			if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) && "function" != typeof e ? t : e;
		}function o(t, e) {
			if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
		}e.__esModule = !0, e.Track = void 0;var a = i(2),
		    l = s(a),
		    c = i(7),
		    d = s(c),
		    u = i(17),
		    p = s(u),
		    h = function h(t) {
			var e, i, s, n, r;return r = t.rtl ? t.slideCount - 1 - t.index : t.index, s = r < 0 || r >= t.slideCount, t.centerMode ? (n = Math.floor(t.slidesToShow / 2), i = (r - t.currentSlide) % t.slideCount === 0, r > t.currentSlide - n - 1 && r <= t.currentSlide + n && (e = !0)) : e = t.currentSlide <= r && r < t.currentSlide + t.slidesToShow, (0, p.default)({ "slick-slide": !0, "slick-active": e, "slick-center": i, "slick-cloned": s });
		},
		    f = function f(t) {
			var e = {};return void 0 !== t.variableWidth && t.variableWidth !== !1 || (e.width = t.slideWidth), t.fade && (e.position = "relative", e.left = -t.index * t.slideWidth, e.opacity = t.currentSlide === t.index ? 1 : 0, e.transition = "opacity " + t.speed + "ms " + t.cssEase, e.WebkitTransition = "opacity " + t.speed + "ms " + t.cssEase), e;
		},
		    g = function g(t, e) {
			return null === t.key || void 0 === t.key ? e : t.key;
		},
		    y = function y(t) {
			var e,
			    i = [],
			    s = [],
			    n = [],
			    r = l.default.Children.count(t.children);return l.default.Children.forEach(t.children, function (o, a) {
				var c = void 0,
				    u = { message: "children", index: a, slidesToScroll: t.slidesToScroll, currentSlide: t.currentSlide };c = !t.lazyLoad | (t.lazyLoad && t.lazyLoadedList.indexOf(a) >= 0) ? o : l.default.createElement("div", null);var y = f((0, d.default)({}, t, { index: a })),
				    v = c.props.className || "",
				    m = function m(e) {
					c.props && c.props.onClick && c.props.onClick(e), t.focusOnSelect && t.focusOnSelect(u);
				};if (i.push(l.default.cloneElement(c, { key: "original" + g(c, a), "data-index": a, className: (0, p.default)(h((0, d.default)({ index: a }, t)), v), tabIndex: "-1", style: (0, d.default)({ outline: "none" }, c.props.style || {}, y), onClick: m })), t.infinite && t.fade === !1) {
					var S = t.variableWidth ? t.slidesToShow + 1 : t.slidesToShow;a >= r - S && (e = -(r - a), s.push(l.default.cloneElement(c, { key: "precloned" + g(c, e), "data-index": e, className: (0, p.default)(h((0, d.default)({ index: e }, t)), v), style: (0, d.default)({}, c.props.style || {}, y), onClick: m }))), a < S && (e = r + a, n.push(l.default.cloneElement(c, { key: "postcloned" + g(c, e), "data-index": e, className: (0, p.default)(h((0, d.default)({ index: e }, t)), v), style: (0, d.default)({}, c.props.style || {}, y), onClick: m })));
				}
			}), t.rtl ? s.concat(i, n).reverse() : s.concat(i, n);
		};e.Track = function (t) {
			function e() {
				return n(this, e), r(this, t.apply(this, arguments));
			}return o(e, t), e.prototype.render = function () {
				var t = y.call(this, this.props);return l.default.createElement("div", { className: "slick-track", style: this.props.trackStyle }, t);
			}, e;
		}(l.default.Component);
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : { default: t };
		}function n(t, e) {
			if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
		}function r(t, e) {
			if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) && "function" != typeof e ? t : e;
		}function o(t, e) {
			if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
		}e.__esModule = !0, e.Dots = void 0;var a = i(2),
		    l = s(a),
		    c = i(17),
		    d = s(c),
		    u = function u(t) {
			var e;return e = Math.ceil(t.slideCount / t.slidesToScroll);
		};e.Dots = function (t) {
			function e() {
				return n(this, e), r(this, t.apply(this, arguments));
			}return o(e, t), e.prototype.clickHandler = function (t, e) {
				e.preventDefault(), this.props.clickHandler(t);
			}, e.prototype.render = function () {
				var t = this,
				    e = u({ slideCount: this.props.slideCount, slidesToScroll: this.props.slidesToScroll }),
				    i = Array.apply(null, Array(e + 1).join("0").split("")).map(function (e, i) {
					var s = i * t.props.slidesToScroll,
					    n = i * t.props.slidesToScroll + (t.props.slidesToScroll - 1),
					    r = (0, d.default)({ "slick-active": t.props.currentSlide >= s && t.props.currentSlide <= n }),
					    o = { message: "dots", index: i, slidesToScroll: t.props.slidesToScroll, currentSlide: t.props.currentSlide },
					    a = t.clickHandler.bind(t, o);return l.default.createElement("li", { key: i, className: r }, l.default.cloneElement(t.props.customPaging(i), { onClick: a }));
				});return l.default.createElement("ul", { className: this.props.dotsClass, style: { display: "block" } }, i);
			}, e;
		}(l.default.Component);
	}, function (t, e, i) {
		"use strict";
		function s(t) {
			return t && t.__esModule ? t : { default: t };
		}function n(t, e) {
			if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
		}function r(t, e) {
			if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) && "function" != typeof e ? t : e;
		}function o(t, e) {
			if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
		}e.__esModule = !0, e.NextArrow = e.PrevArrow = void 0;var a = Object.assign || function (t) {
			for (var e = 1; e < arguments.length; e++) {
				var i = arguments[e];for (var s in i) {
					Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
				}
			}return t;
		},
		    l = i(2),
		    c = s(l),
		    d = i(17),
		    u = s(d),
		    p = i(8),
		    h = s(p);e.PrevArrow = function (t) {
			function e() {
				return n(this, e), r(this, t.apply(this, arguments));
			}return o(e, t), e.prototype.clickHandler = function (t, e) {
				e && e.preventDefault(), this.props.clickHandler(t, e);
			}, e.prototype.render = function () {
				var t = { "slick-arrow": !0, "slick-prev": !0 },
				    e = this.clickHandler.bind(this, { message: "previous" });!this.props.infinite && (0 === this.props.currentSlide || this.props.slideCount <= this.props.slidesToShow) && (t["slick-disabled"] = !0, e = null);var i,
				    s = { key: "0", "data-role": "none", className: (0, u.default)(t), style: { display: "block" }, onClick: e },
				    n = { currentSlide: this.props.currentSlide, slideCount: this.props.slideCount };return i = this.props.prevArrow ? c.default.cloneElement(this.props.prevArrow, a({}, s, n)) : c.default.createElement("button", a({ key: "0", type: "button" }, s), " Previous");
			}, e;
		}(c.default.Component), e.NextArrow = function (t) {
			function e() {
				return n(this, e), r(this, t.apply(this, arguments));
			}return o(e, t), e.prototype.clickHandler = function (t, e) {
				e && e.preventDefault(), this.props.clickHandler(t, e);
			}, e.prototype.render = function () {
				var t = { "slick-arrow": !0, "slick-next": !0 },
				    e = this.clickHandler.bind(this, { message: "next" });h.default.canGoNext(this.props) || (t["slick-disabled"] = !0, e = null);var i,
				    s = { key: "1", "data-role": "none", className: (0, u.default)(t), style: { display: "block" }, onClick: e },
				    n = { currentSlide: this.props.currentSlide, slideCount: this.props.slideCount };return i = this.props.nextArrow ? c.default.cloneElement(this.props.nextArrow, a({}, s, n)) : c.default.createElement("button", a({ key: "1", type: "button" }, s), " Next");
			}, e;
		}(c.default.Component);
	}, function (t, e, i) {
		var s = i(22),
		    n = function n(t) {
			var e = /[height|width]$/;return e.test(t);
		},
		    r = function r(t) {
			var e = "",
			    i = Object.keys(t);return i.forEach(function (r, o) {
				var a = t[r];r = s(r), n(r) && "number" == typeof a && (a += "px"), e += a === !0 ? r : a === !1 ? "not " + r : "(" + r + ": " + a + ")", o < i.length - 1 && (e += " and ");
			}), e;
		},
		    o = function o(t) {
			var e = "";return "string" == typeof t ? t : t instanceof Array ? (t.forEach(function (i, s) {
				e += r(i), s < t.length - 1 && (e += ", ");
			}), e) : r(t);
		};t.exports = o;
	}, function (t, e) {
		var i = function i(t) {
			return t.replace(/[A-Z]/g, function (t) {
				return "-" + t.toLowerCase();
			}).toLowerCase();
		};t.exports = i;
	}, function (t, e) {
		var i = !("undefined" == typeof window || !window.document || !window.document.createElement);t.exports = i;
	}, function (t, e, i) {
		var s = i(25);t.exports = new s();
	}, function (t, e, i) {
		function s() {
			if (!window.matchMedia) throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries = {}, this.browserIsIncapable = !window.matchMedia("only all").matches;
		}var n = i(26),
		    r = i(28),
		    o = r.each,
		    a = r.isFunction,
		    l = r.isArray;s.prototype = { constructor: s, register: function register(t, e, i) {
				var s = this.queries,
				    r = i && this.browserIsIncapable;return s[t] || (s[t] = new n(t, r)), a(e) && (e = { match: e }), l(e) || (e = [e]), o(e, function (e) {
					a(e) && (e = { match: e }), s[t].addHandler(e);
				}), this;
			}, unregister: function unregister(t, e) {
				var i = this.queries[t];return i && (e ? i.removeHandler(e) : (i.clear(), delete this.queries[t])), this;
			} }, t.exports = s;
	}, function (t, e, i) {
		function s(t, e) {
			this.query = t, this.isUnconditional = e, this.handlers = [], this.mql = window.matchMedia(t);var i = this;this.listener = function (t) {
				i.mql = t.currentTarget || t, i.assess();
			}, this.mql.addListener(this.listener);
		}var n = i(27),
		    r = i(28).each;s.prototype = { constuctor: s, addHandler: function addHandler(t) {
				var e = new n(t);this.handlers.push(e), this.matches() && e.on();
			}, removeHandler: function removeHandler(t) {
				var e = this.handlers;r(e, function (i, s) {
					if (i.equals(t)) return i.destroy(), !e.splice(s, 1);
				});
			}, matches: function matches() {
				return this.mql.matches || this.isUnconditional;
			}, clear: function clear() {
				r(this.handlers, function (t) {
					t.destroy();
				}), this.mql.removeListener(this.listener), this.handlers.length = 0;
			}, assess: function assess() {
				var t = this.matches() ? "on" : "off";r(this.handlers, function (e) {
					e[t]();
				});
			} }, t.exports = s;
	}, function (t, e) {
		function i(t) {
			this.options = t, !t.deferSetup && this.setup();
		}i.prototype = { constructor: i, setup: function setup() {
				this.options.setup && this.options.setup(), this.initialised = !0;
			}, on: function on() {
				!this.initialised && this.setup(), this.options.match && this.options.match();
			}, off: function off() {
				this.options.unmatch && this.options.unmatch();
			}, destroy: function destroy() {
				this.options.destroy ? this.options.destroy() : this.off();
			}, equals: function equals(t) {
				return this.options === t || this.options.match === t;
			} }, t.exports = i;
	}, function (t, e) {
		function i(t, e) {
			var i,
			    s = 0,
			    n = t.length;for (s; s < n && (i = e(t[s], s), i !== !1); s++) {}
		}function s(t) {
			return "[object Array]" === Object.prototype.toString.apply(t);
		}function n(t) {
			return "function" == typeof t;
		}t.exports = { isFunction: n, isArray: s, each: i };
	}]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1252)(module)))

/***/ }),

/***/ 1252:
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 1501:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _reactCountTo = __webpack_require__(1502);

var _reactCountTo2 = _interopRequireDefault(_reactCountTo);

var _reactI18next = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Numbers = function (_Component) {
  (0, _inherits3.default)(Numbers, _Component);

  function Numbers(props) {
    (0, _classCallCheck3.default)(this, Numbers);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Numbers.__proto__ || Object.getPrototypeOf(Numbers)).call(this, props));

    _this2.state = {
      countNumbers: false
    };

    _this2._mapNumbers = _this2._mapNumbers.bind(_this2);
    _this2.animateOnScroll = _this2.animateOnScroll.bind(_this2);
    _this2.animateOnScroll.passive = false;
    return _this2;
  }

  (0, _createClass3.default)(Numbers, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.animateOnScroll();
    }
  }, {
    key: 'animateOnScroll',
    value: function animateOnScroll() {
      var _this = this,
          hT = $('.numbers').offset().top,
          hH = $('.numbers').outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop();
      if (wS - hH - 40 > hT + hH - wH) {
        _this.setState({ countNumbers: true });
      }
      $(window).scroll(function () {
        wS = $(this).scrollTop();
        if (wS - hH - 40 > hT + hH - wH) {
          _this.setState({ countNumbers: true });
        }
      });
    }
  }, {
    key: '_mapNumbers',
    value: function _mapNumbers() {
      if (!window.isMobile) {} else {
        var settings = {
          dots: true,
          arrows: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };
        return _react2.default.createElement(
          _reactSlick2.default,
          settings,
          _react2.default.createElement(
            'div',
            { className: 'col-sm-4' },
            _react2.default.createElement(
              'p',
              { className: 'big' },
              '+11'
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.sliderYears')
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.sliderExperience')
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-sm-4' },
            _react2.default.createElement(
              'p',
              { className: 'big' },
              '30 ',
              _react2.default.createElement(
                'span',
                { className: 'value' },
                'min.'
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.sliderEverage')
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.sliderEstimate'),
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              'Smartphone: 30-60 ',
              this.props.t('numbers.sliderMinutes'),
              _react2.default.createElement('br', null),
              'Tablet: 30-60 ',
              this.props.t('numbers.sliderMinutes'),
              _react2.default.createElement('br', null),
              'Computer: 2-48 ',
              this.props.t('numbers.sliderHours')
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-sm-4' },
            _react2.default.createElement(
              'p',
              { className: 'big' },
              '24 ',
              _react2.default.createElement(
                'span',
                { className: 'value' },
                this.props.t('numbers.hours')
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.duration')
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.payout')
            )
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'div',
          { className: 'row numbers text-center hidden-xs' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6 col-sm-6 col-md-3 itemNumber' },
            _react2.default.createElement(
              'span',
              { className: 'big' },
              '5/5'
            ),
            _react2.default.createElement(
              'div',
              { className: 'back-stars' },
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement(
                'div',
                { className: 'front-stars' },
                _react2.default.createElement('i', { className: 'fa fa-star' }),
                _react2.default.createElement('i', { className: 'fa fa-star' }),
                _react2.default.createElement('i', { className: 'fa fa-star' }),
                _react2.default.createElement('i', { className: 'fa fa-star' }),
                _react2.default.createElement('i', { className: 'fa fa-star' })
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.rating')
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6 col-sm-6 col-md-3 itemNumber' },
            _react2.default.createElement(
              'span',
              { className: 'big' },
              _react2.default.createElement(
                'span',
                { className: 'sybmol' },
                '+'
              ),
              ' ',
              !this.state.countNumbers && 0,
              this.state.countNumbers && _react2.default.createElement(_reactCountTo2.default, { to: 11, speed: 2000 })
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.experience')
            )
          ),
          _react2.default.createElement('div', { className: 'clearfix visible-xs-block visible-sm-block' }),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6 col-sm-6 col-md-3 itemNumber' },
            _react2.default.createElement(
              'span',
              { className: 'big' },
              !this.state.countNumbers && 0,
              this.state.countNumbers && _react2.default.createElement(_reactCountTo2.default, { to: 30, speed: 2000 }),
              _react2.default.createElement(
                'sub',
                null,
                'min.'
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.estimate')
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              _react2.default.createElement(
                'span',
                { className: 'smartphone' },
                this.props.t('numbers.smartphone')
              ),
              _react2.default.createElement(
                'span',
                { className: 'television' },
                this.props.t('numbers.television')
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6 col-sm-6 col-md-3 itemNumber' },
            _react2.default.createElement(
              'span',
              { className: 'big' },
              !this.state.countNumbers && 0,
              this.state.countNumbers && _react2.default.createElement(_reactCountTo2.default, { to: 24, speed: 2000 }),
              _react2.default.createElement(
                'sub',
                null,
                this.props.t('numbers.hours')
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.duration')
            ),
            _react2.default.createElement(
              'p',
              { className: 'small pt-0' },
              this.props.t('numbers.payout')
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row numbers text-center visible-xs' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6 col-sm-6 col-md-3 itemNumber' },
            _react2.default.createElement(
              'span',
              { className: 'big' },
              '5/5'
            ),
            _react2.default.createElement(
              'div',
              { className: 'back-stars' },
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement('i', { className: 'fa fa-star active' }),
              _react2.default.createElement(
                'div',
                { className: 'front-stars' },
                _react2.default.createElement('i', { className: 'fa fa-star' }),
                _react2.default.createElement('i', { className: 'fa fa-star' }),
                _react2.default.createElement('i', { className: 'fa fa-star' }),
                _react2.default.createElement('i', { className: 'fa fa-star' }),
                _react2.default.createElement('i', { className: 'fa fa-star' })
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.rating')
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6 col-sm-6 col-md-3 itemNumber' },
            _react2.default.createElement(
              'span',
              { className: 'big' },
              !this.state.countNumbers && 0,
              this.state.countNumbers && _react2.default.createElement(_reactCountTo2.default, { to: 30, speed: 2000 }),
              _react2.default.createElement(
                'sub',
                null,
                'min.'
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              _react2.default.createElement(
                'span',
                { className: 'smartphone' },
                this.props.t('numbers.smartphone')
              ),
              _react2.default.createElement(
                'span',
                { className: 'television' },
                this.props.t('numbers.television')
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.estimate')
            )
          ),
          _react2.default.createElement('div', { className: 'clearfix visible-xs-block visible-sm-block' }),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6 col-sm-6 col-md-3 itemNumber' },
            _react2.default.createElement(
              'span',
              { className: 'big' },
              _react2.default.createElement(
                'span',
                { className: 'sybmol' },
                '+'
              ),
              ' ',
              !this.state.countNumbers && 0,
              this.state.countNumbers && _react2.default.createElement(_reactCountTo2.default, { to: 11, speed: 2000 })
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.experience')
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-6 col-sm-6 col-md-3 itemNumber' },
            _react2.default.createElement(
              'span',
              { className: 'big' },
              !this.state.countNumbers && 0,
              this.state.countNumbers && _react2.default.createElement(_reactCountTo2.default, { to: 24, speed: 2000 }),
              _react2.default.createElement(
                'sub',
                null,
                this.props.t('numbers.hours')
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'small' },
              this.props.t('numbers.duration')
            ),
            _react2.default.createElement(
              'p',
              { className: 'small pt-0' },
              this.props.t('numbers.payout')
            )
          )
        )
      );
    }
  }]);
  return Numbers;
}(_react.Component);

exports.default = (0, _reactI18next.withTranslation)()(Numbers);

/***/ }),

/***/ 1502:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  from: _propTypes2.default.number,
  to: _propTypes2.default.number.isRequired,
  speed: _propTypes2.default.number.isRequired,
  delay: _propTypes2.default.number,
  onComplete: _propTypes2.default.func,
  digits: _propTypes2.default.number,
  className: _propTypes2.default.string,
  tagName: _propTypes2.default.string,
  children: _propTypes2.default.func
};

var defaultProps = {
  from: 0,
  delay: 100,
  digits: 0,
  tagName: 'span'
};

var CountTo = function (_PureComponent) {
  _inherits(CountTo, _PureComponent);

  function CountTo(props) {
    _classCallCheck(this, CountTo);

    var _this = _possibleConstructorReturn(this, (CountTo.__proto__ || Object.getPrototypeOf(CountTo)).call(this));

    var from = props.from;


    _this.state = {
      counter: from
    };

    _this.start = _this.start.bind(_this);
    _this.clear = _this.clear.bind(_this);
    _this.next = _this.next.bind(_this);
    return _this;
  }

  _createClass(CountTo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.start();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          from = _props.from,
          to = _props.to;


      if (nextProps.to !== to || nextProps.from !== from) {
        this.start(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clear();
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      this.clear();
      var from = props.from;

      this.setState({
        counter: from
      }, function () {
        var _props2 = _this2.props,
            delay = _props2.delay,
            speed = _props2.speed,
            to = _props2.to;
        var counter = _this2.state.counter;

        _this2.loopsCounter = 0;
        _this2.loops = Math.ceil(speed / delay);
        _this2.increment = (to - counter) / _this2.loops;
        _this2.interval = setInterval(_this2.next, delay);
      });
    }
  }, {
    key: 'next',
    value: function next() {
      var _this3 = this;

      if (this.loopsCounter < this.loops) {
        this.loopsCounter++;
        this.setState(function (_ref) {
          var counter = _ref.counter;
          return {
            counter: counter + _this3.increment
          };
        });
      } else {
        var onComplete = this.props.onComplete;

        this.clear();

        if (onComplete) {
          onComplete();
        }
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      clearInterval(this.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          className = _props3.className,
          digits = _props3.digits,
          Tag = _props3.tagName,
          fn = _props3.children;
      var counter = this.state.counter;

      var value = counter.toFixed(digits);

      if (fn) {
        return fn(value);
      }

      return _react2.default.createElement(
        Tag,
        { className: className },
        value
      );
    }
  }]);

  return CountTo;
}(_react.PureComponent);

CountTo.propTypes = propTypes;
CountTo.defaultProps = defaultProps;

exports.default = CountTo;

/***/ }),

/***/ 1824:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(317);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _Slick = __webpack_require__(1825);

var _Slick2 = _interopRequireDefault(_Slick);

var _reactI18next = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OurStores = function (_Component) {
  (0, _inherits3.default)(OurStores, _Component);

  function OurStores() {
    (0, _classCallCheck3.default)(this, OurStores);
    return (0, _possibleConstructorReturn3.default)(this, (OurStores.__proto__ || Object.getPrototypeOf(OurStores)).apply(this, arguments));
  }

  (0, _createClass3.default)(OurStores, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.encryptedEmail();
    }
  }, {
    key: 'encryptedEmail',
    value: function encryptedEmail() {
      [].concat((0, _toConsumableArray3.default)(document.querySelectorAll(".email-rot-13"))).map(function (elem) {
        return elem.innerHTML = "<n uers=\"znvygb:vasb@erznexrg.pu\" >vasb@erznexrg.pu</n>".replace(/[a-zA-Z]/g, function (c) {
          return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _JSON$parse = JSON.parse(window.localStorage.getItem("locationData")),
          data = _JSON$parse.data;

      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      };
      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'div',
          { className: 'modal fade bs-example-modal-lg',
            id: 'modalMap',
            tabIndex: '-1',
            'data-keyboard': 'false',
            role: 'dialog',
            'aria-labelledby': 'myLargeModalLabeAgb' },
          _react2.default.createElement(
            'div',
            { className: 'modal-dialog modal-lg modal-dialog-centered', role: 'document' },
            _react2.default.createElement('button', { type: 'button', className: 'closeModal',
              onClick: function onClick() {
                return $('#modalMap').modal('hide');
              },
              'data-dismiss': 'modal',
              'aria-label': 'Close' }),
            _react2.default.createElement(
              'div',
              { className: 'modal-content' },
              _react2.default.createElement('div', { className: 'mapContainer' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row head' },
          _react2.default.createElement(
            'p',
            null,
            'Besuchen Sie uns vor Ort'
          ),
          _react2.default.createElement(
            'h1',
            null,
            'Unsere Standorte'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row buttons' },
          _react2.default.createElement(
            'ul',
            { className: 'listing', role: 'tablist' },
            _react2.default.createElement(
              'li',
              { role: 'presentation', className: 'active placeDescription tab-first-li' },
              _react2.default.createElement(
                'a',
                { href: '#location-1', className: '', role: 'tab', 'data-toggle': 'tab', 'aria-expanded': 'false' },
                'Filiale Basel Barf\xFCsserplatz'
              )
            ),
            _react2.default.createElement(
              'li',
              { role: 'presentation', className: 'placeDescription tab-second-li' },
              _react2.default.createElement(
                'a',
                { href: '#location-5', className: '', role: 'tab', 'data-toggle': 'tab', 'aria-expanded': 'false' },
                'Filiale Basel Sankt Jakob-Park'
              )
            ),
            _react2.default.createElement(
              'li',
              { role: 'presentation', className: 'placeDescription tab-third-li' },
              _react2.default.createElement(
                'a',
                { href: '#location-6', className: '', role: 'tab', 'data-toggle': 'tab', 'aria-expanded': 'false' },
                'Filiale Bern Shoppyland'
              )
            ),
            _react2.default.createElement(
              'li',
              { role: 'presentation', className: 'placeDescription tab-fourth-li' },
              _react2.default.createElement(
                'a',
                { href: '#location-7', className: '', role: 'tab', 'data-toggle': 'tab', 'aria-expanded': 'false' },
                'Filiale Solothurn G\xE4upark'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row tab-content' },
          data && data.map(function (item, i) {
            return _react2.default.createElement(
              'div',
              { role: 'tabpanel', className: 'tab-pane ' + (i == 0 ? 'active' : ''), id: 'location-' + item.id, key: 'location-' + i },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-md-4 information' },
                  _react2.default.createElement(
                    'div',
                    { className: 'hidden-sm' },
                    _react2.default.createElement(
                      'div',
                      { className: 'item adress' },
                      _react2.default.createElement('img', { loading: 'lazy', className: 'store-info', src: '/images/design/location.svg', alt: '' }),
                      item.address + ', ' + item.zip + ' ' + item.city
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'item phone' },
                      _react2.default.createElement('img', { loading: 'lazy', className: 'store-info', src: '/images/design/callphone.svg', alt: '' }),
                      _react2.default.createElement(
                        'a',
                        { href: 'tel:' + item.phoneFull },
                        item.phone
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'item' },
                      _react2.default.createElement('img', { loading: 'lazy', className: 'store-info', src: '/images/design/mailto.svg', alt: '' }),
                      _react2.default.createElement('span', { className: 'email-rot-13' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'item adress weeks' },
                      _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('img', { loading: 'lazy', className: 'store-info', src: '/images/design/clock.svg', alt: '' })
                      ),
                      _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'timing-info' },
                          _react2.default.createElement(
                            'span',
                            null,
                            'Mo:'
                          ),
                          ' ',
                          item.openingHours.mon ? '' + item.openingHours.mon : 'geschlossen'
                        ),
                        _react2.default.createElement(
                          'span',
                          { className: 'timing-info' },
                          _react2.default.createElement(
                            'span',
                            null,
                            'Di:'
                          ),
                          ' ',
                          item.openingHours.tue ? '' + item.openingHours.tue : 'geschlossen'
                        ),
                        _react2.default.createElement(
                          'span',
                          { className: 'timing-info' },
                          _react2.default.createElement(
                            'span',
                            null,
                            'Mi:'
                          ),
                          ' ',
                          item.openingHours.wed ? '' + item.openingHours.wed : 'geschlossen'
                        ),
                        _react2.default.createElement(
                          'span',
                          { className: 'timing-info' },
                          _react2.default.createElement(
                            'span',
                            null,
                            'Do:'
                          ),
                          ' ',
                          item.openingHours.thu ? '' + item.openingHours.thu : 'geschlossen'
                        ),
                        _react2.default.createElement(
                          'span',
                          { className: 'timing-info' },
                          _react2.default.createElement(
                            'span',
                            null,
                            'Fr:'
                          ),
                          ' ',
                          item.openingHours.fri ? '' + item.openingHours.fri : 'geschlossen'
                        ),
                        _react2.default.createElement(
                          'span',
                          { className: 'timing-info' },
                          _react2.default.createElement(
                            'span',
                            null,
                            'Sa:'
                          ),
                          ' ',
                          item.openingHours.sat ? '' + item.openingHours.sat : 'geschlossen'
                        ),
                        _react2.default.createElement(
                          'span',
                          { className: 'timing-info' },
                          _react2.default.createElement(
                            'span',
                            null,
                            'So:'
                          ),
                          ' ',
                          item.openingHours.sun ? '' + item.openingHours.sun : 'geschlossen'
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row visible-sm hidden-xs hidden-md' },
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-6 information' },
                      _react2.default.createElement(
                        'div',
                        { className: 'item adress' },
                        _react2.default.createElement('img', { loading: 'lazy', className: 'store-info', src: '/images/design/location.svg', alt: '' }),
                        item.address + ', ' + item.zip + ' ' + item.city
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'phone' },
                        _react2.default.createElement('img', { loading: 'lazy', className: 'store-info', src: '/images/design/callphone.svg', alt: '' }),
                        _react2.default.createElement(
                          'a',
                          { href: 'tel:' + item.phoneFull },
                          item.phone
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement('img', { loading: 'lazy', className: 'store-info', src: '/images/design/mailto.svg', alt: '' }),
                        _react2.default.createElement('span', { className: 'email-rot-13' })
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-6 information' },
                      _react2.default.createElement(
                        'div',
                        { className: 'item adress weeks' },
                        _react2.default.createElement(
                          'div',
                          null,
                          _react2.default.createElement('img', { loading: 'lazy', className: 'store-info', src: '/images/design/clock.svg', alt: '' })
                        ),
                        _react2.default.createElement(
                          'div',
                          null,
                          _react2.default.createElement(
                            'span',
                            { className: 'timing-info' },
                            _react2.default.createElement(
                              'span',
                              null,
                              'Mo:'
                            ),
                            ' ',
                            item.openingHours.mon ? '' + item.openingHours.mon : 'geschlossen'
                          ),
                          _react2.default.createElement(
                            'span',
                            { className: 'timing-info' },
                            _react2.default.createElement(
                              'span',
                              null,
                              'Di:'
                            ),
                            ' ',
                            item.openingHours.tue ? '' + item.openingHours.tue : 'geschlossen'
                          ),
                          _react2.default.createElement(
                            'span',
                            { className: 'timing-info' },
                            _react2.default.createElement(
                              'span',
                              null,
                              'Mi:'
                            ),
                            ' ',
                            item.openingHours.wed ? '' + item.openingHours.wed : 'geschlossen'
                          ),
                          _react2.default.createElement(
                            'span',
                            { className: 'timing-info' },
                            _react2.default.createElement(
                              'span',
                              null,
                              'Do:'
                            ),
                            ' ',
                            item.openingHours.thu ? '' + item.openingHours.thu : 'geschlossen'
                          ),
                          _react2.default.createElement(
                            'span',
                            { className: 'timing-info' },
                            _react2.default.createElement(
                              'span',
                              null,
                              'Fr:'
                            ),
                            ' ',
                            item.openingHours.fri ? '' + item.openingHours.fri : 'geschlossen'
                          ),
                          _react2.default.createElement(
                            'span',
                            { className: 'timing-info' },
                            _react2.default.createElement(
                              'span',
                              null,
                              'Sa:'
                            ),
                            ' ',
                            item.openingHours.sat ? '' + item.openingHours.sat : 'geschlossen'
                          ),
                          _react2.default.createElement(
                            'span',
                            { className: 'timing-info' },
                            _react2.default.createElement(
                              'span',
                              null,
                              'So:'
                            ),
                            ' ',
                            item.openingHours.sun ? '' + item.openingHours.sun : 'geschlossen'
                          )
                        )
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-md-8 slick-carousel' },
                  _react2.default.createElement(
                    'div',
                    { className: 'visible-sm visible-xs' },
                    _react2.default.createElement(
                      _reactSlick2.default,
                      settings,
                      _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/store.jpg' })
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/slick3.jpg' })
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/slick2.jpg' })
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/slick1.jpg' })
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/store.jpg' })
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'hidden-sm hidden-xs' },
                    _react2.default.createElement(_Slick2.default, null)
                  )
                )
              )
            );
          })
        )
      );
    }
  }]);
  return OurStores;
}(_react.Component);

exports.default = (0, _reactI18next.withTranslation)()(OurStores);

/***/ }),

/***/ 1825:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slick = undefined;

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

__webpack_require__(1104);

__webpack_require__(1106);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slick = exports.Slick = function (_Component) {
  (0, _inherits3.default)(Slick, _Component);

  function Slick(props) {
    (0, _classCallCheck3.default)(this, Slick);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Slick.__proto__ || Object.getPrototypeOf(Slick)).call(this, props));

    _this.state = {
      nav1: null,
      nav2: null
    };
    return _this;
  }

  (0, _createClass3.default)(Slick, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        nav1: this.slider1,
        nav2: this.slider2
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactSlick2.default,
          {
            arrows: true,
            asNavFor: this.state.nav2,
            ref: function ref(slider) {
              return _this2.slider1 = slider;
            },
            className: 'big-slick',
            infinite: true
          },
          _react2.default.createElement(
            'div',
            { className: 'big-slick-item first-item' },
            _react2.default.createElement(
              'a',
              { className: 'lightBoxVideoLink', href: "/images/design/store.png" },
              _react2.default.createElement('div', { className: 'magnifier' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'big-slick-item second-item' },
            _react2.default.createElement(
              'a',
              { className: 'lightBoxVideoLink', href: "/images/design/slick3.png" },
              _react2.default.createElement('div', { className: 'magnifier' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'big-slick-item third-item' },
            _react2.default.createElement(
              'a',
              { className: 'lightBoxVideoLink', href: "/images/design/slick2.png" },
              _react2.default.createElement('div', { className: 'magnifier' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'big-slick-item fourth-item' },
            _react2.default.createElement(
              'a',
              { className: 'lightBoxVideoLink', href: "/images/design/slick1.png" },
              _react2.default.createElement('div', { className: 'magnifier' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'big-slick-item second-item' },
            _react2.default.createElement(
              'a',
              { className: 'lightBoxVideoLink', href: "/images/design/slick3.png" },
              _react2.default.createElement('div', { className: 'magnifier' })
            )
          )
        ),
        _react2.default.createElement(
          _reactSlick2.default,
          {
            asNavFor: this.state.nav1,
            ref: function ref(slider) {
              return _this2.slider2 = slider;
            },
            slidesToShow: 4,
            swipeToSlide: true,
            focusOnSelect: true,
            infinite: true,
            className: 'small-slick'
          },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/store.png' })
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/slick3.png' })
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/slick2.png' })
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/slick1.png' })
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/slick3.png' })
            )
          )
        )
      );
    }
  }]);
  return Slick;
}(_react.Component);

exports.default = Slick;

/***/ }),

/***/ 1826:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactI18next = __webpack_require__(315);

var _reactSimpleImg = __webpack_require__(342);

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HowItWorks = function (_Component) {
  (0, _inherits3.default)(HowItWorks, _Component);

  function HowItWorks() {
    (0, _classCallCheck3.default)(this, HowItWorks);
    return (0, _possibleConstructorReturn3.default)(this, (HowItWorks.__proto__ || Object.getPrototypeOf(HowItWorks)).apply(this, arguments));
  }

  (0, _createClass3.default)(HowItWorks, [{
    key: "render",
    value: function render() {
      var url = window.domainName.name === "remarket.ch" ? "https://www.youtube.com/embed/JfIWohNjpjk?autoplay=true" : "https://www.youtube.com/embed/PH7pguELBlg?autoplay=true",
          url2 = window.domainName.name === "remarket.ch" ? "https://www.youtube.com/embed/JfIWohNjpjk?autoplay=true&amp;rel=0&amp;showinfo=0" : "https://www.youtube.com/embed/PH7pguELBlg?autoplay=true&amp;rel=0&amp;showinfo=0";

      function mapPeriodsVerkaufen(t) {
        if (!window.isMobile) {
          return _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
              "div",
              { className: "col-sm-6 col-md-3 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/1.svg", alt: "" })
                ),
                _react2.default.createElement("img", {
                  loading: "lazy",
                  src: "images/design/estimate-icon.svg",
                  alt: ""
                })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title1')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc1')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-6 col-md-3 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/2.svg", alt: "" })
                ),
                _react2.default.createElement("img", { loading: "lazy", src: "images/design/send-icon.svg", alt: "" })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title2')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc2')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-6 col-md-3 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/3.svg", alt: "" })
                ),
                _react2.default.createElement("img", { loading: "lazy", src: "images/design/get-icon.svg", alt: "" })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title3')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc3')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-6 col-md-3 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "mac-right" },
                _react2.default.createElement(
                  "a",
                  {
                    className: "lightBoxVideoLink",
                    "aria-label": "macbook-upd",
                    href: url2,
                    style: { display: "block", position: "relative" }
                  },
                  _react2.default.createElement(
                    "span",
                    { className: "pulse-btn-on-mac" },
                    _react2.default.createElement("span", { className: "content" })
                  ),
                  _react2.default.createElement(_reactSimpleImg.SimpleImg, {
                    src: "/images/design/video-image.jpg",
                    className: "image-section",
                    width: "100%",
                    style: { justifyContent: "end" }
                  })
                )
              )
            )
          );
        } else {
          return _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/1.svg", alt: "" })
                ),
                _react2.default.createElement("img", {
                  loading: "lazy",
                  src: "images/design/estimate-icon.svg",
                  alt: ""
                })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title1')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc1')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/2.svg", alt: "" })
                ),
                _react2.default.createElement("img", { loading: "lazy", src: "images/design/send-icon.svg", alt: "" })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title2')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc2')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/3.svg", alt: "" })
                ),
                _react2.default.createElement("img", { loading: "lazy", src: "images/design/get-icon.svg", alt: "" })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title3')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc3')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "mac" },
                _react2.default.createElement(
                  "a",
                  {
                    className: "lightBoxVideoLink",
                    href: url,
                    "aria-label": "macbook-upd"
                  },
                  _react2.default.createElement(
                    "span",
                    { className: "pulse-btn-on-mac" },
                    _react2.default.createElement("span", { className: "content" })
                  ),
                  _react2.default.createElement(_reactSimpleImg.SimpleImg, {
                    alt: "macbook-upd",
                    src: "/images/design/video-image.jpg",
                    height: "350px",
                    width: "100%"
                  })
                )
              )
            )
          );
        }
      }

      function mapPeriodsKaufen(t) {
        if (!window.isMobile) {
          return _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
              "div",
              { className: "col-sm-6 col-md-3 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/1.svg", alt: "" })
                ),
                _react2.default.createElement("img", {
                  loading: "lazy",
                  src: "images/design/estimate-icon.svg",
                  alt: ""
                })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title4')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc4')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-6 col-md-3 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/2.svg", alt: "" })
                ),
                _react2.default.createElement("img", { loading: "lazy", src: "images/design/shipment.svg", alt: "" })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title5')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc5')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-6 col-md-3 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/3.svg", alt: "" })
                ),
                _react2.default.createElement("img", { loading: "lazy", src: "images/design/warranty.svg", alt: "" })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title6')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc6')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-6 col-md-3 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "mac-right" },
                _react2.default.createElement(
                  "a",
                  {
                    className: "lightBoxVideoLink",
                    "aria-label": "macbook-upd",
                    href: url2,
                    style: { display: "block", position: "relative" }
                  },
                  _react2.default.createElement(
                    "span",
                    { className: "pulse-btn-on-mac" },
                    _react2.default.createElement("span", { className: "content" })
                  ),
                  _react2.default.createElement(_reactSimpleImg.SimpleImg, {
                    src: "/images/design/video-image.jpg",
                    className: "image-section",
                    style: { justifyContent: "end" }
                  })
                )
              )
            )
          );
        } else {
          return _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/1.svg", alt: "" })
                ),
                _react2.default.createElement("img", {
                  loading: "lazy",
                  src: "images/design/estimate-icon.svg",
                  alt: ""
                })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title4')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc4')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/2.svg", alt: "" })
                ),
                _react2.default.createElement("img", { loading: "lazy", src: "images/design/shipment.svg", alt: "" })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title5')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc5')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "image" },
                _react2.default.createElement(
                  "div",
                  { className: "num" },
                  _react2.default.createElement("img", { loading: "lazy", src: "images/design/3.svg", alt: "" })
                ),
                _react2.default.createElement("img", { loading: "lazy", src: "images/design/warranty.svg", alt: "" })
              ),
              _react2.default.createElement(
                "h4",
                null,
                t('howItWorks.title6')
              ),
              _react2.default.createElement(
                "p",
                null,
                t('howItWorks.desc6')
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-12 itemPeriod" },
              _react2.default.createElement(
                "div",
                { className: "mac" },
                _react2.default.createElement(
                  "a",
                  {
                    className: "lightBoxVideoLink",
                    "aria-label": "macbook-upd",
                    href: url2,
                    style: { display: "block", position: "relative" }
                  },
                  _react2.default.createElement(
                    "span",
                    { className: "pulse-btn-on-mac" },
                    _react2.default.createElement("span", { className: "content" })
                  ),
                  _react2.default.createElement(_reactSimpleImg.SimpleImg, {
                    src: "/images/design/video-image.jpg",
                    height: "350px",
                    width: "100%",
                    style: { justifyContent: "end" }
                  })
                )
              )
            )
          );
        }
      }

      var t = this.props.t;


      return _react2.default.createElement(
        "div",
        { className: "head row" },
        _react2.default.createElement(
          "div",
          { className: "col-xs-12 col-md-5 pl-0" },
          _react2.default.createElement(
            "p",
            null,
            t('howItWorks.subTitle')
          ),
          _react2.default.createElement(
            "h1",
            null,
            t('howItWorks.mainTitle')
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "col-xs-12 col-md-7 buttons pl-0" },
          _react2.default.createElement(
            "ul",
            { className: "", role: "tablist" },
            _react2.default.createElement(
              "li",
              { role: "presentation", className: "active" },
              _react2.default.createElement(
                "a",
                {
                  href: "#verkaufen",
                  className: "sell text-decoration-none",
                  style: { borderRight: "none" },
                  role: "tab",
                  "data-toggle": "tab"
                },
                t('howItWorks.switchButtonLeft')
              )
            ),
            _react2.default.createElement(
              "li",
              { role: "presentation" },
              _react2.default.createElement(
                "a",
                {
                  href: "#kaufen",
                  className: "buy text-decoration-none",
                  style: { borderLeft: "none" },
                  role: "tab",
                  "data-toggle": "tab"
                },
                t('howItWorks.switchButtonRight')
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "col-xs-12 tab-content" },
          _react2.default.createElement(
            "div",
            { role: "tabpanel", className: "tab-pane active", id: "verkaufen" },
            _react2.default.createElement(
              "div",
              { className: "row periods" },
              mapPeriodsVerkaufen(t)
            ),
            _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "col-xs-12 estimate-button" },
                _react2.default.createElement(
                  "a",
                  { href: "/verkaufen", className: "estimatePrice btn" },
                  " ",
                  t('howItWorks.sellButton')
                )
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { role: "tabpanel", className: "tab-pane", id: "kaufen" },
            _react2.default.createElement(
              "div",
              { className: "row periods" },
              mapPeriodsKaufen(t)
            ),
            _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "col-xs-12 estimate-button" },
                _react2.default.createElement(
                  "a",
                  { href: "/kaufen", className: "estimatePrice btn" },
                  " ",
                  t('howItWorks.selectButton')
                )
              )
            )
          )
        )
      );
    }
  }]);
  return HowItWorks;
}(_react.Component);

HowItWorks.propTypes = {};
HowItWorks.defaultProps = {};

exports.default = (0, _reactI18next.withTranslation)()(HowItWorks);

/***/ }),

/***/ 1827:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactI18next = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WhyWeAreDifferent = function (_Component) {
  (0, _inherits3.default)(WhyWeAreDifferent, _Component);

  function WhyWeAreDifferent() {
    (0, _classCallCheck3.default)(this, WhyWeAreDifferent);
    return (0, _possibleConstructorReturn3.default)(this, (WhyWeAreDifferent.__proto__ || Object.getPrototypeOf(WhyWeAreDifferent)).apply(this, arguments));
  }

  (0, _createClass3.default)(WhyWeAreDifferent, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'whyWeAre' },
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-3 col-sm-12' },
              _react2.default.createElement(
                'div',
                { className: 'head' },
                _react2.default.createElement(
                  'p',
                  null,
                  this.props.t('whyWeAre.subTitle')
                ),
                _react2.default.createElement(
                  'h1',
                  null,
                  this.props.t('whyWeAre.mainTitle')
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-md-9 col-sm-12 wrap' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-md-6 col-sm-6' },
                  _react2.default.createElement(
                    'div',
                    { className: 'itemWhy top-l' },
                    _react2.default.createElement(
                      'div',
                      { className: 'img' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon.svg', alt: '' }),
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon-white.svg', alt: '' })
                    ),
                    _react2.default.createElement(
                      'h4',
                      null,
                      this.props.t('whyWeAre.title1')
                    ),
                    _react2.default.createElement('p', {
                      dangerouslySetInnerHTML: {
                        __html: this.props.t('whyWeAre.desc1')
                      } })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-md-6 col-sm-6' },
                  _react2.default.createElement(
                    'div',
                    { className: 'itemWhy top-r' },
                    _react2.default.createElement(
                      'div',
                      { className: 'img' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/headphones-icon.svg', alt: '' }),
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/headphones-icon-white.svg', alt: '' })
                    ),
                    _react2.default.createElement(
                      'h4',
                      null,
                      this.props.t('whyWeAre.title2')
                    ),
                    _react2.default.createElement('p', {
                      dangerouslySetInnerHTML: {
                        __html: this.props.t('whyWeAre.desc2')
                      } })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-md-6 col-sm-6' },
                  _react2.default.createElement(
                    'div',
                    { className: 'itemWhy bl' },
                    _react2.default.createElement(
                      'div',
                      { className: 'img' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/assistant-icon.svg', alt: '' }),
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/assistant_icon-white.svg', alt: '' })
                    ),
                    _react2.default.createElement(
                      'h4',
                      null,
                      this.props.t('whyWeAre.title3')
                    ),
                    _react2.default.createElement('p', {
                      dangerouslySetInnerHTML: {
                        __html: this.props.t('whyWeAre.desc3')
                      } })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-md-6 col-sm-6' },
                  _react2.default.createElement(
                    'div',
                    { className: 'itemWhy br' },
                    _react2.default.createElement(
                      'div',
                      { className: 'img' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/devices-icon.svg', alt: '' }),
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/devices-icon-white.svg', alt: '' })
                    ),
                    _react2.default.createElement(
                      'h4',
                      null,
                      this.props.t('whyWeAre.title4')
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      this.props.t('whyWeAre.desc4')
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);
  return WhyWeAreDifferent;
}(_react.Component);

WhyWeAreDifferent.propTypes = {};
WhyWeAreDifferent.defaultProps = {};

exports.default = (0, _reactI18next.withTranslation)()(WhyWeAreDifferent);

/***/ }),

/***/ 1828:
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? module.exports = factory(__webpack_require__(16)) :
    typeof define === 'function' && define.amd ? define(['react'], factory) :
    (global.ReactOwlCarousel = factory(global.React));
}(this, (function (React) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    /**
     * Owl Carousel v2.3.4
     * Copyright 2013-2018 David Deutsch
     * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
     */
    (function($, window, document, undefined) {

    	/**
    	 * Creates a carousel.
    	 * @class The Owl Carousel.
    	 * @public
    	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
    	 * @param {Object} [options] - The options
    	 */
    	function Owl(element, options) {

    		/**
    		 * Current settings for the carousel.
    		 * @public
    		 */
    		this.settings = null;

    		/**
    		 * Current options set by the caller including defaults.
    		 * @public
    		 */
    		this.options = $.extend({}, Owl.Defaults, options);

    		/**
    		 * Plugin element.
    		 * @public
    		 */
    		this.$element = $(element);

    		/**
    		 * Proxied event handlers.
    		 * @protected
    		 */
    		this._handlers = {};

    		/**
    		 * References to the running plugins of this carousel.
    		 * @protected
    		 */
    		this._plugins = {};

    		/**
    		 * Currently suppressed events to prevent them from being retriggered.
    		 * @protected
    		 */
    		this._supress = {};

    		/**
    		 * Absolute current position.
    		 * @protected
    		 */
    		this._current = null;

    		/**
    		 * Animation speed in milliseconds.
    		 * @protected
    		 */
    		this._speed = null;

    		/**
    		 * Coordinates of all items in pixel.
    		 * @todo The name of this member is missleading.
    		 * @protected
    		 */
    		this._coordinates = [];

    		/**
    		 * Current breakpoint.
    		 * @todo Real media queries would be nice.
    		 * @protected
    		 */
    		this._breakpoint = null;

    		/**
    		 * Current width of the plugin element.
    		 */
    		this._width = null;

    		/**
    		 * All real items.
    		 * @protected
    		 */
    		this._items = [];

    		/**
    		 * All cloned items.
    		 * @protected
    		 */
    		this._clones = [];

    		/**
    		 * Merge values of all items.
    		 * @todo Maybe this could be part of a plugin.
    		 * @protected
    		 */
    		this._mergers = [];

    		/**
    		 * Widths of all items.
    		 */
    		this._widths = [];

    		/**
    		 * Invalidated parts within the update process.
    		 * @protected
    		 */
    		this._invalidated = {};

    		/**
    		 * Ordered list of workers for the update process.
    		 * @protected
    		 */
    		this._pipe = [];

    		/**
    		 * Current state information for the drag operation.
    		 * @todo #261
    		 * @protected
    		 */
    		this._drag = {
    			time: null,
    			target: null,
    			pointer: null,
    			stage: {
    				start: null,
    				current: null
    			},
    			direction: null
    		};

    		/**
    		 * Current state information and their tags.
    		 * @type {Object}
    		 * @protected
    		 */
    		this._states = {
    			current: {},
    			tags: {
    				'initializing': [ 'busy' ],
    				'animating': [ 'busy' ],
    				'dragging': [ 'interacting' ]
    			}
    		};

    		$.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
    			this._handlers[handler] = $.proxy(this[handler], this);
    		}, this));

    		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
    			this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
    				= new plugin(this);
    		}, this));

    		$.each(Owl.Workers, $.proxy(function(priority, worker) {
    			this._pipe.push({
    				'filter': worker.filter,
    				'run': $.proxy(worker.run, this)
    			});
    		}, this));

    		this.setup();
    		this.initialize();
    	}

    	/**
    	 * Default options for the carousel.
    	 * @public
    	 */
    	Owl.Defaults = {
    		items: 3,
    		loop: false,
    		center: false,
    		rewind: false,
    		checkVisibility: true,

    		mouseDrag: true,
    		touchDrag: true,
    		pullDrag: true,
    		freeDrag: false,

    		margin: 0,
    		stagePadding: 0,

    		merge: false,
    		mergeFit: true,
    		autoWidth: false,

    		startPosition: 0,
    		rtl: false,

    		smartSpeed: 250,
    		fluidSpeed: false,
    		dragEndSpeed: false,

    		responsive: {},
    		responsiveRefreshRate: 200,
    		responsiveBaseElement: window,

    		fallbackEasing: 'swing',
    		slideTransition: '',

    		info: false,

    		nestedItemSelector: false,
    		itemElement: 'div',
    		stageElement: 'div',

    		refreshClass: 'owl-refresh',
    		loadedClass: 'owl-loaded',
    		loadingClass: 'owl-loading',
    		rtlClass: 'owl-rtl',
    		responsiveClass: 'owl-responsive',
    		dragClass: 'owl-drag',
    		itemClass: 'owl-item',
    		stageClass: 'owl-stage',
    		stageOuterClass: 'owl-stage-outer',
    		grabClass: 'owl-grab'
    	};

    	/**
    	 * Enumeration for width.
    	 * @public
    	 * @readonly
    	 * @enum {String}
    	 */
    	Owl.Width = {
    		Default: 'default',
    		Inner: 'inner',
    		Outer: 'outer'
    	};

    	/**
    	 * Enumeration for types.
    	 * @public
    	 * @readonly
    	 * @enum {String}
    	 */
    	Owl.Type = {
    		Event: 'event',
    		State: 'state'
    	};

    	/**
    	 * Contains all registered plugins.
    	 * @public
    	 */
    	Owl.Plugins = {};

    	/**
    	 * List of workers involved in the update process.
    	 */
    	Owl.Workers = [ {
    		filter: [ 'width', 'settings' ],
    		run: function() {
    			this._width = this.$element.width();
    		}
    	}, {
    		filter: [ 'width', 'items', 'settings' ],
    		run: function(cache) {
    			cache.current = this._items && this._items[this.relative(this._current)];
    		}
    	}, {
    		filter: [ 'items', 'settings' ],
    		run: function() {
    			this.$stage.children('.cloned').remove();
    		}
    	}, {
    		filter: [ 'width', 'items', 'settings' ],
    		run: function(cache) {
    			var margin = this.settings.margin || '',
    				grid = !this.settings.autoWidth,
    				rtl = this.settings.rtl,
    				css = {
    					'width': 'auto',
    					'margin-left': rtl ? margin : '',
    					'margin-right': rtl ? '' : margin
    				};

    			!grid && this.$stage.children().css(css);

    			cache.css = css;
    		}
    	}, {
    		filter: [ 'width', 'items', 'settings' ],
    		run: function(cache) {
    			var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
    				merge = null,
    				iterator = this._items.length,
    				grid = !this.settings.autoWidth,
    				widths = [];

    			cache.items = {
    				merge: false,
    				width: width
    			};

    			while (iterator--) {
    				merge = this._mergers[iterator];
    				merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

    				cache.items.merge = merge > 1 || cache.items.merge;

    				widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
    			}

    			this._widths = widths;
    		}
    	}, {
    		filter: [ 'items', 'settings' ],
    		run: function() {
    			var clones = [],
    				items = this._items,
    				settings = this.settings,
    				// TODO: Should be computed from number of min width items in stage
    				view = Math.max(settings.items * 2, 4),
    				size = Math.ceil(items.length / 2) * 2,
    				repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
    				append = '',
    				prepend = '';

    			repeat /= 2;

    			while (repeat > 0) {
    				// Switch to only using appended clones
    				clones.push(this.normalize(clones.length / 2, true));
    				append = append + items[clones[clones.length - 1]][0].outerHTML;
    				clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
    				prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
    				repeat -= 1;
    			}

    			this._clones = clones;

    			$(append).addClass('cloned').appendTo(this.$stage);
    			$(prepend).addClass('cloned').prependTo(this.$stage);
    		}
    	}, {
    		filter: [ 'width', 'items', 'settings' ],
    		run: function() {
    			var rtl = this.settings.rtl ? 1 : -1,
    				size = this._clones.length + this._items.length,
    				iterator = -1,
    				previous = 0,
    				current = 0,
    				coordinates = [];

    			while (++iterator < size) {
    				previous = coordinates[iterator - 1] || 0;
    				current = this._widths[this.relative(iterator)] + this.settings.margin;
    				coordinates.push(previous + current * rtl);
    			}

    			this._coordinates = coordinates;
    		}
    	}, {
    		filter: [ 'width', 'items', 'settings' ],
    		run: function() {
    			var padding = this.settings.stagePadding,
    				coordinates = this._coordinates,
    				css = {
    					'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
    					'padding-left': padding || '',
    					'padding-right': padding || ''
    				};

    			this.$stage.css(css);
    		}
    	}, {
    		filter: [ 'width', 'items', 'settings' ],
    		run: function(cache) {
    			var iterator = this._coordinates.length,
    				grid = !this.settings.autoWidth,
    				items = this.$stage.children();

    			if (grid && cache.items.merge) {
    				while (iterator--) {
    					cache.css.width = this._widths[this.relative(iterator)];
    					items.eq(iterator).css(cache.css);
    				}
    			} else if (grid) {
    				cache.css.width = cache.items.width;
    				items.css(cache.css);
    			}
    		}
    	}, {
    		filter: [ 'items' ],
    		run: function() {
    			this._coordinates.length < 1 && this.$stage.removeAttr('style');
    		}
    	}, {
    		filter: [ 'width', 'items', 'settings' ],
    		run: function(cache) {
    			cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
    			cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
    			this.reset(cache.current);
    		}
    	}, {
    		filter: [ 'position' ],
    		run: function() {
    			this.animate(this.coordinates(this._current));
    		}
    	}, {
    		filter: [ 'width', 'position', 'items', 'settings' ],
    		run: function() {
    			var rtl = this.settings.rtl ? 1 : -1,
    				padding = this.settings.stagePadding * 2,
    				begin = this.coordinates(this.current()) + padding,
    				end = begin + this.width() * rtl,
    				inner, outer, matches = [], i, n;

    			for (i = 0, n = this._coordinates.length; i < n; i++) {
    				inner = this._coordinates[i - 1] || 0;
    				outer = Math.abs(this._coordinates[i]) + padding * rtl;

    				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
    					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
    					matches.push(i);
    				}
    			}

    			this.$stage.children('.active').removeClass('active');
    			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

    			this.$stage.children('.center').removeClass('center');
    			if (this.settings.center) {
    				this.$stage.children().eq(this.current()).addClass('center');
    			}
    		}
    	} ];

    	/**
    	 * Create the stage DOM element
    	 */
    	Owl.prototype.initializeStage = function() {
    		this.$stage = this.$element.find('.' + this.settings.stageClass);

    		// if the stage is already in the DOM, grab it and skip stage initialization
    		if (this.$stage.length) {
    			return;
    		}

    		this.$element.addClass(this.options.loadingClass);

    		// create stage
    		this.$stage = $('<' + this.settings.stageElement + '>', {
    			"class": this.settings.stageClass
    		}).wrap( $( '<div/>', {
    			"class": this.settings.stageOuterClass
    		}));

    		// append stage
    		this.$element.append(this.$stage.parent());
    	};

    	/**
    	 * Create item DOM elements
    	 */
    	Owl.prototype.initializeItems = function() {
    		var $items = this.$element.find('.owl-item');

    		// if the items are already in the DOM, grab them and skip item initialization
    		if ($items.length) {
    			this._items = $items.get().map(function(item) {
    				return $(item);
    			});

    			this._mergers = this._items.map(function() {
    				return 1;
    			});

    			this.refresh();

    			return;
    		}

    		// append content
    		this.replace(this.$element.children().not(this.$stage.parent()));

    		// check visibility
    		if (this.isVisible()) {
    			// update view
    			this.refresh();
    		} else {
    			// invalidate width
    			this.invalidate('width');
    		}

    		this.$element
    			.removeClass(this.options.loadingClass)
    			.addClass(this.options.loadedClass);
    	};

    	/**
    	 * Initializes the carousel.
    	 * @protected
    	 */
    	Owl.prototype.initialize = function() {
    		this.enter('initializing');
    		this.trigger('initialize');

    		this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

    		if (this.settings.autoWidth && !this.is('pre-loading')) {
    			var imgs, nestedSelector, width;
    			imgs = this.$element.find('img');
    			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
    			width = this.$element.children(nestedSelector).width();

    			if (imgs.length && width <= 0) {
    				this.preloadAutoWidthImages(imgs);
    			}
    		}

    		this.initializeStage();
    		this.initializeItems();

    		// register event handlers
    		this.registerEventHandlers();

    		this.leave('initializing');
    		this.trigger('initialized');
    	};

    	/**
    	 * @returns {Boolean} visibility of $element
    	 *                    if you know the carousel will always be visible you can set `checkVisibility` to `false` to
    	 *                    prevent the expensive browser layout forced reflow the $element.is(':visible') does
    	 */
    	Owl.prototype.isVisible = function() {
    		return this.settings.checkVisibility
    			? this.$element.is(':visible')
    			: true;
    	};

    	/**
    	 * Setups the current settings.
    	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
    	 * @todo Support for media queries by using `matchMedia` would be nice.
    	 * @public
    	 */
    	Owl.prototype.setup = function() {
    		var viewport = this.viewport(),
    			overwrites = this.options.responsive,
    			match = -1,
    			settings = null;

    		if (!overwrites) {
    			settings = $.extend({}, this.options);
    		} else {
    			$.each(overwrites, function(breakpoint) {
    				if (breakpoint <= viewport && breakpoint > match) {
    					match = Number(breakpoint);
    				}
    			});

    			settings = $.extend({}, this.options, overwrites[match]);
    			if (typeof settings.stagePadding === 'function') {
    				settings.stagePadding = settings.stagePadding();
    			}
    			delete settings.responsive;

    			// responsive class
    			if (settings.responsiveClass) {
    				this.$element.attr('class',
    					this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
    				);
    			}
    		}

    		this.trigger('change', { property: { name: 'settings', value: settings } });
    		this._breakpoint = match;
    		this.settings = settings;
    		this.invalidate('settings');
    		this.trigger('changed', { property: { name: 'settings', value: this.settings } });
    	};

    	/**
    	 * Updates option logic if necessery.
    	 * @protected
    	 */
    	Owl.prototype.optionsLogic = function() {
    		if (this.settings.autoWidth) {
    			this.settings.stagePadding = false;
    			this.settings.merge = false;
    		}
    	};

    	/**
    	 * Prepares an item before add.
    	 * @todo Rename event parameter `content` to `item`.
    	 * @protected
    	 * @returns {jQuery|HTMLElement} - The item container.
    	 */
    	Owl.prototype.prepare = function(item) {
    		var event = this.trigger('prepare', { content: item });

    		if (!event.data) {
    			event.data = $('<' + this.settings.itemElement + '/>')
    				.addClass(this.options.itemClass).append(item);
    		}

    		this.trigger('prepared', { content: event.data });

    		return event.data;
    	};

    	/**
    	 * Updates the view.
    	 * @public
    	 */
    	Owl.prototype.update = function() {
    		var i = 0,
    			n = this._pipe.length,
    			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
    			cache = {};

    		while (i < n) {
    			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
    				this._pipe[i].run(cache);
    			}
    			i++;
    		}

    		this._invalidated = {};

    		!this.is('valid') && this.enter('valid');
    	};

    	/**
    	 * Gets the width of the view.
    	 * @public
    	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
    	 * @returns {Number} - The width of the view in pixel.
    	 */
    	Owl.prototype.width = function(dimension) {
    		dimension = dimension || Owl.Width.Default;
    		switch (dimension) {
    			case Owl.Width.Inner:
    			case Owl.Width.Outer:
    				return this._width;
    			default:
    				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
    		}
    	};

    	/**
    	 * Refreshes the carousel primarily for adaptive purposes.
    	 * @public
    	 */
    	Owl.prototype.refresh = function() {
    		this.enter('refreshing');
    		this.trigger('refresh');

    		this.setup();

    		this.optionsLogic();

    		this.$element.addClass(this.options.refreshClass);

    		this.update();

    		this.$element.removeClass(this.options.refreshClass);

    		this.leave('refreshing');
    		this.trigger('refreshed');
    	};

    	/**
    	 * Checks window `resize` event.
    	 * @protected
    	 */
    	Owl.prototype.onThrottledResize = function() {
    		window.clearTimeout(this.resizeTimer);
    		this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
    	};

    	/**
    	 * Checks window `resize` event.
    	 * @protected
    	 */
    	Owl.prototype.onResize = function() {
    		if (!this._items.length) {
    			return false;
    		}

    		if (this._width === this.$element.width()) {
    			return false;
    		}

    		if (!this.isVisible()) {
    			return false;
    		}

    		this.enter('resizing');

    		if (this.trigger('resize').isDefaultPrevented()) {
    			this.leave('resizing');
    			return false;
    		}

    		this.invalidate('width');

    		this.refresh();

    		this.leave('resizing');
    		this.trigger('resized');
    	};

    	/**
    	 * Registers event handlers.
    	 * @todo Check `msPointerEnabled`
    	 * @todo #261
    	 * @protected
    	 */
    	Owl.prototype.registerEventHandlers = function() {
    		if ($.support.transition) {
    			this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
    		}

    		if (this.settings.responsive !== false) {
    			this.on(window, 'resize', this._handlers.onThrottledResize);
    		}

    		if (this.settings.mouseDrag) {
    			this.$element.addClass(this.options.dragClass);
    			this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
    			this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
    		}

    		if (this.settings.touchDrag){
    			this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
    			this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
    		}
    	};

    	/**
    	 * Handles `touchstart` and `mousedown` events.
    	 * @todo Horizontal swipe threshold as option
    	 * @todo #261
    	 * @protected
    	 * @param {Event} event - The event arguments.
    	 */
    	Owl.prototype.onDragStart = function(event) {
    		var stage = null;

    		if (event.which === 3) {
    			return;
    		}

    		if ($.support.transform) {
    			stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
    			stage = {
    				x: stage[stage.length === 16 ? 12 : 4],
    				y: stage[stage.length === 16 ? 13 : 5]
    			};
    		} else {
    			stage = this.$stage.position();
    			stage = {
    				x: this.settings.rtl ?
    					stage.left + this.$stage.width() - this.width() + this.settings.margin :
    					stage.left,
    				y: stage.top
    			};
    		}

    		if (this.is('animating')) {
    			$.support.transform ? this.animate(stage.x) : this.$stage.stop();
    			this.invalidate('position');
    		}

    		this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

    		this.speed(0);

    		this._drag.time = new Date().getTime();
    		this._drag.target = $(event.target);
    		this._drag.stage.start = stage;
    		this._drag.stage.current = stage;
    		this._drag.pointer = this.pointer(event);

    		$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

    		$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
    			var delta = this.difference(this._drag.pointer, this.pointer(event));

    			$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

    			if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
    				return;
    			}

    			event.preventDefault();

    			this.enter('dragging');
    			this.trigger('drag');
    		}, this));
    	};

    	/**
    	 * Handles the `touchmove` and `mousemove` events.
    	 * @todo #261
    	 * @protected
    	 * @param {Event} event - The event arguments.
    	 */
    	Owl.prototype.onDragMove = function(event) {
    		var minimum = null,
    			maximum = null,
    			pull = null,
    			delta = this.difference(this._drag.pointer, this.pointer(event)),
    			stage = this.difference(this._drag.stage.start, delta);

    		if (!this.is('dragging')) {
    			return;
    		}

    		event.preventDefault();

    		if (this.settings.loop) {
    			minimum = this.coordinates(this.minimum());
    			maximum = this.coordinates(this.maximum() + 1) - minimum;
    			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
    		} else {
    			minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
    			maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
    			pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
    			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
    		}

    		this._drag.stage.current = stage;

    		this.animate(stage.x);
    	};

    	/**
    	 * Handles the `touchend` and `mouseup` events.
    	 * @todo #261
    	 * @todo Threshold for click event
    	 * @protected
    	 * @param {Event} event - The event arguments.
    	 */
    	Owl.prototype.onDragEnd = function(event) {
    		var delta = this.difference(this._drag.pointer, this.pointer(event)),
    			stage = this._drag.stage.current,
    			direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

    		$(document).off('.owl.core');

    		this.$element.removeClass(this.options.grabClass);

    		if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
    			this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
    			this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
    			this.invalidate('position');
    			this.update();

    			this._drag.direction = direction;

    			if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
    				this._drag.target.one('click.owl.core', function() { return false; });
    			}
    		}

    		if (!this.is('dragging')) {
    			return;
    		}

    		this.leave('dragging');
    		this.trigger('dragged');
    	};

    	/**
    	 * Gets absolute position of the closest item for a coordinate.
    	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
    	 * @protected
    	 * @param {Number} coordinate - The coordinate in pixel.
    	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
    	 * @return {Number} - The absolute position of the closest item.
    	 */
    	Owl.prototype.closest = function(coordinate, direction) {
    		var position = -1,
    			pull = 30,
    			width = this.width(),
    			coordinates = this.coordinates();

    		if (!this.settings.freeDrag) {
    			// check closest item
    			$.each(coordinates, $.proxy(function(index, value) {
    				// on a left pull, check on current index
    				if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
    					position = index;
    				// on a right pull, check on previous index
    				// to do so, subtract width from value and set position = index + 1
    				} else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
    					position = index + 1;
    				} else if (this.op(coordinate, '<', value)
    					&& this.op(coordinate, '>', coordinates[index + 1] !== undefined ? coordinates[index + 1] : value - width)) {
    					position = direction === 'left' ? index + 1 : index;
    				}
    				return position === -1;
    			}, this));
    		}

    		if (!this.settings.loop) {
    			// non loop boundries
    			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
    				position = coordinate = this.minimum();
    			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
    				position = coordinate = this.maximum();
    			}
    		}

    		return position;
    	};

    	/**
    	 * Animates the stage.
    	 * @todo #270
    	 * @public
    	 * @param {Number} coordinate - The coordinate in pixels.
    	 */
    	Owl.prototype.animate = function(coordinate) {
    		var animate = this.speed() > 0;

    		this.is('animating') && this.onTransitionEnd();

    		if (animate) {
    			this.enter('animating');
    			this.trigger('translate');
    		}

    		if ($.support.transform3d && $.support.transition) {
    			this.$stage.css({
    				transform: 'translate3d(' + coordinate + 'px,0px,0px)',
    				transition: (this.speed() / 1000) + 's' + (
    					this.settings.slideTransition ? ' ' + this.settings.slideTransition : ''
    				)
    			});
    		} else if (animate) {
    			this.$stage.animate({
    				left: coordinate + 'px'
    			}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
    		} else {
    			this.$stage.css({
    				left: coordinate + 'px'
    			});
    		}
    	};

    	/**
    	 * Checks whether the carousel is in a specific state or not.
    	 * @param {String} state - The state to check.
    	 * @returns {Boolean} - The flag which indicates if the carousel is busy.
    	 */
    	Owl.prototype.is = function(state) {
    		return this._states.current[state] && this._states.current[state] > 0;
    	};

    	/**
    	 * Sets the absolute position of the current item.
    	 * @public
    	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
    	 * @returns {Number} - The absolute position of the current item.
    	 */
    	Owl.prototype.current = function(position) {
    		if (position === undefined) {
    			return this._current;
    		}

    		if (this._items.length === 0) {
    			return undefined;
    		}

    		position = this.normalize(position);

    		if (this._current !== position) {
    			var event = this.trigger('change', { property: { name: 'position', value: position } });

    			if (event.data !== undefined) {
    				position = this.normalize(event.data);
    			}

    			this._current = position;

    			this.invalidate('position');

    			this.trigger('changed', { property: { name: 'position', value: this._current } });
    		}

    		return this._current;
    	};

    	/**
    	 * Invalidates the given part of the update routine.
    	 * @param {String} [part] - The part to invalidate.
    	 * @returns {Array.<String>} - The invalidated parts.
    	 */
    	Owl.prototype.invalidate = function(part) {
    		if ($.type(part) === 'string') {
    			this._invalidated[part] = true;
    			this.is('valid') && this.leave('valid');
    		}
    		return $.map(this._invalidated, function(v, i) { return i });
    	};

    	/**
    	 * Resets the absolute position of the current item.
    	 * @public
    	 * @param {Number} position - The absolute position of the new item.
    	 */
    	Owl.prototype.reset = function(position) {
    		position = this.normalize(position);

    		if (position === undefined) {
    			return;
    		}

    		this._speed = 0;
    		this._current = position;

    		this.suppress([ 'translate', 'translated' ]);

    		this.animate(this.coordinates(position));

    		this.release([ 'translate', 'translated' ]);
    	};

    	/**
    	 * Normalizes an absolute or a relative position of an item.
    	 * @public
    	 * @param {Number} position - The absolute or relative position to normalize.
    	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
    	 * @returns {Number} - The normalized position.
    	 */
    	Owl.prototype.normalize = function(position, relative) {
    		var n = this._items.length,
    			m = relative ? 0 : this._clones.length;

    		if (!this.isNumeric(position) || n < 1) {
    			position = undefined;
    		} else if (position < 0 || position >= n + m) {
    			position = ((position - m / 2) % n + n) % n + m / 2;
    		}

    		return position;
    	};

    	/**
    	 * Converts an absolute position of an item into a relative one.
    	 * @public
    	 * @param {Number} position - The absolute position to convert.
    	 * @returns {Number} - The converted position.
    	 */
    	Owl.prototype.relative = function(position) {
    		position -= this._clones.length / 2;
    		return this.normalize(position, true);
    	};

    	/**
    	 * Gets the maximum position for the current item.
    	 * @public
    	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
    	 * @returns {Number}
    	 */
    	Owl.prototype.maximum = function(relative) {
    		var settings = this.settings,
    			maximum = this._coordinates.length,
    			iterator,
    			reciprocalItemsWidth,
    			elementWidth;

    		if (settings.loop) {
    			maximum = this._clones.length / 2 + this._items.length - 1;
    		} else if (settings.autoWidth || settings.merge) {
    			iterator = this._items.length;
    			if (iterator) {
    				reciprocalItemsWidth = this._items[--iterator].width();
    				elementWidth = this.$element.width();
    				while (iterator--) {
    					reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
    					if (reciprocalItemsWidth > elementWidth) {
    						break;
    					}
    				}
    			}
    			maximum = iterator + 1;
    		} else if (settings.center) {
    			maximum = this._items.length - 1;
    		} else {
    			maximum = this._items.length - settings.items;
    		}

    		if (relative) {
    			maximum -= this._clones.length / 2;
    		}

    		return Math.max(maximum, 0);
    	};

    	/**
    	 * Gets the minimum position for the current item.
    	 * @public
    	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
    	 * @returns {Number}
    	 */
    	Owl.prototype.minimum = function(relative) {
    		return relative ? 0 : this._clones.length / 2;
    	};

    	/**
    	 * Gets an item at the specified relative position.
    	 * @public
    	 * @param {Number} [position] - The relative position of the item.
    	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
    	 */
    	Owl.prototype.items = function(position) {
    		if (position === undefined) {
    			return this._items.slice();
    		}

    		position = this.normalize(position, true);
    		return this._items[position];
    	};

    	/**
    	 * Gets an item at the specified relative position.
    	 * @public
    	 * @param {Number} [position] - The relative position of the item.
    	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
    	 */
    	Owl.prototype.mergers = function(position) {
    		if (position === undefined) {
    			return this._mergers.slice();
    		}

    		position = this.normalize(position, true);
    		return this._mergers[position];
    	};

    	/**
    	 * Gets the absolute positions of clones for an item.
    	 * @public
    	 * @param {Number} [position] - The relative position of the item.
    	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
    	 */
    	Owl.prototype.clones = function(position) {
    		var odd = this._clones.length / 2,
    			even = odd + this._items.length,
    			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

    		if (position === undefined) {
    			return $.map(this._clones, function(v, i) { return map(i) });
    		}

    		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
    	};

    	/**
    	 * Sets the current animation speed.
    	 * @public
    	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
    	 * @returns {Number} - The current animation speed in milliseconds.
    	 */
    	Owl.prototype.speed = function(speed) {
    		if (speed !== undefined) {
    			this._speed = speed;
    		}

    		return this._speed;
    	};

    	/**
    	 * Gets the coordinate of an item.
    	 * @todo The name of this method is missleanding.
    	 * @public
    	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
    	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
    	 */
    	Owl.prototype.coordinates = function(position) {
    		var multiplier = 1,
    			newPosition = position - 1,
    			coordinate;

    		if (position === undefined) {
    			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
    				return this.coordinates(index);
    			}, this));
    		}

    		if (this.settings.center) {
    			if (this.settings.rtl) {
    				multiplier = -1;
    				newPosition = position + 1;
    			}

    			coordinate = this._coordinates[position];
    			coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
    		} else {
    			coordinate = this._coordinates[newPosition] || 0;
    		}

    		coordinate = Math.ceil(coordinate);

    		return coordinate;
    	};

    	/**
    	 * Calculates the speed for a translation.
    	 * @protected
    	 * @param {Number} from - The absolute position of the start item.
    	 * @param {Number} to - The absolute position of the target item.
    	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
    	 * @returns {Number} - The time in milliseconds for the translation.
    	 */
    	Owl.prototype.duration = function(from, to, factor) {
    		if (factor === 0) {
    			return 0;
    		}

    		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
    	};

    	/**
    	 * Slides to the specified item.
    	 * @public
    	 * @param {Number} position - The position of the item.
    	 * @param {Number} [speed] - The time in milliseconds for the transition.
    	 */
    	Owl.prototype.to = function(position, speed) {
    		var current = this.current(),
    			revert = null,
    			distance = position - this.relative(current),
    			direction = (distance > 0) - (distance < 0),
    			items = this._items.length,
    			minimum = this.minimum(),
    			maximum = this.maximum();

    		if (this.settings.loop) {
    			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
    				distance += direction * -1 * items;
    			}

    			position = current + distance;
    			revert = ((position - minimum) % items + items) % items + minimum;

    			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
    				current = revert - distance;
    				position = revert;
    				this.reset(current);
    			}
    		} else if (this.settings.rewind) {
    			maximum += 1;
    			position = (position % maximum + maximum) % maximum;
    		} else {
    			position = Math.max(minimum, Math.min(maximum, position));
    		}

    		this.speed(this.duration(current, position, speed));
    		this.current(position);

    		if (this.isVisible()) {
    			this.update();
    		}
    	};

    	/**
    	 * Slides to the next item.
    	 * @public
    	 * @param {Number} [speed] - The time in milliseconds for the transition.
    	 */
    	Owl.prototype.next = function(speed) {
    		speed = speed || false;
    		this.to(this.relative(this.current()) + 1, speed);
    	};

    	/**
    	 * Slides to the previous item.
    	 * @public
    	 * @param {Number} [speed] - The time in milliseconds for the transition.
    	 */
    	Owl.prototype.prev = function(speed) {
    		speed = speed || false;
    		this.to(this.relative(this.current()) - 1, speed);
    	};

    	/**
    	 * Handles the end of an animation.
    	 * @protected
    	 * @param {Event} event - The event arguments.
    	 */
    	Owl.prototype.onTransitionEnd = function(event) {

    		// if css2 animation then event object is undefined
    		if (event !== undefined) {
    			event.stopPropagation();

    			// Catch only owl-stage transitionEnd event
    			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
    				return false;
    			}
    		}

    		this.leave('animating');
    		this.trigger('translated');
    	};

    	/**
    	 * Gets viewport width.
    	 * @protected
    	 * @return {Number} - The width in pixel.
    	 */
    	Owl.prototype.viewport = function() {
    		var width;
    		if (this.options.responsiveBaseElement !== window) {
    			width = $(this.options.responsiveBaseElement).width();
    		} else if (window.innerWidth) {
    			width = window.innerWidth;
    		} else if (document.documentElement && document.documentElement.clientWidth) {
    			width = document.documentElement.clientWidth;
    		} else {
    			console.warn('Can not detect viewport width.');
    		}
    		return width;
    	};

    	/**
    	 * Replaces the current content.
    	 * @public
    	 * @param {HTMLElement|jQuery|String} content - The new content.
    	 */
    	Owl.prototype.replace = function(content) {
    		this.$stage.empty();
    		this._items = [];

    		if (content) {
    			content = (content instanceof jQuery) ? content : $(content);
    		}

    		if (this.settings.nestedItemSelector) {
    			content = content.find('.' + this.settings.nestedItemSelector);
    		}

    		content.filter(function() {
    			return this.nodeType === 1;
    		}).each($.proxy(function(index, item) {
    			item = this.prepare(item);
    			this.$stage.append(item);
    			this._items.push(item);
    			this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    		}, this));

    		this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

    		this.invalidate('items');
    	};

    	/**
    	 * Adds an item.
    	 * @todo Use `item` instead of `content` for the event arguments.
    	 * @public
    	 * @param {HTMLElement|jQuery|String} content - The item content to add.
    	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
    	 */
    	Owl.prototype.add = function(content, position) {
    		var current = this.relative(this._current);

    		position = position === undefined ? this._items.length : this.normalize(position, true);
    		content = content instanceof jQuery ? content : $(content);

    		this.trigger('add', { content: content, position: position });

    		content = this.prepare(content);

    		if (this._items.length === 0 || position === this._items.length) {
    			this._items.length === 0 && this.$stage.append(content);
    			this._items.length !== 0 && this._items[position - 1].after(content);
    			this._items.push(content);
    			this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    		} else {
    			this._items[position].before(content);
    			this._items.splice(position, 0, content);
    			this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    		}

    		this._items[current] && this.reset(this._items[current].index());

    		this.invalidate('items');

    		this.trigger('added', { content: content, position: position });
    	};

    	/**
    	 * Removes an item by its position.
    	 * @todo Use `item` instead of `content` for the event arguments.
    	 * @public
    	 * @param {Number} position - The relative position of the item to remove.
    	 */
    	Owl.prototype.remove = function(position) {
    		position = this.normalize(position, true);

    		if (position === undefined) {
    			return;
    		}

    		this.trigger('remove', { content: this._items[position], position: position });

    		this._items[position].remove();
    		this._items.splice(position, 1);
    		this._mergers.splice(position, 1);

    		this.invalidate('items');

    		this.trigger('removed', { content: null, position: position });
    	};

    	/**
    	 * Preloads images with auto width.
    	 * @todo Replace by a more generic approach
    	 * @protected
    	 */
    	Owl.prototype.preloadAutoWidthImages = function(images) {
    		images.each($.proxy(function(i, element) {
    			this.enter('pre-loading');
    			element = $(element);
    			$(new Image()).one('load', $.proxy(function(e) {
    				element.attr('src', e.target.src);
    				element.css('opacity', 1);
    				this.leave('pre-loading');
    				!this.is('pre-loading') && !this.is('initializing') && this.refresh();
    			}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
    		}, this));
    	};

    	/**
    	 * Destroys the carousel.
    	 * @public
    	 */
    	Owl.prototype.destroy = function() {

    		this.$element.off('.owl.core');
    		this.$stage.off('.owl.core');
    		$(document).off('.owl.core');

    		if (this.settings.responsive !== false) {
    			window.clearTimeout(this.resizeTimer);
    			this.off(window, 'resize', this._handlers.onThrottledResize);
    		}

    		for (var i in this._plugins) {
    			this._plugins[i].destroy();
    		}

    		this.$stage.children('.cloned').remove();

    		this.$stage.unwrap();
    		this.$stage.children().contents().unwrap();
    		this.$stage.children().unwrap();
    		this.$stage.remove();
    		this.$element
    			.removeClass(this.options.refreshClass)
    			.removeClass(this.options.loadingClass)
    			.removeClass(this.options.loadedClass)
    			.removeClass(this.options.rtlClass)
    			.removeClass(this.options.dragClass)
    			.removeClass(this.options.grabClass)
    			.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
    			.removeData('owl.carousel');
    	};

    	/**
    	 * Operators to calculate right-to-left and left-to-right.
    	 * @protected
    	 * @param {Number} [a] - The left side operand.
    	 * @param {String} [o] - The operator.
    	 * @param {Number} [b] - The right side operand.
    	 */
    	Owl.prototype.op = function(a, o, b) {
    		var rtl = this.settings.rtl;
    		switch (o) {
    			case '<':
    				return rtl ? a > b : a < b;
    			case '>':
    				return rtl ? a < b : a > b;
    			case '>=':
    				return rtl ? a <= b : a >= b;
    			case '<=':
    				return rtl ? a >= b : a <= b;
    			default:
    				break;
    		}
    	};

    	/**
    	 * Attaches to an internal event.
    	 * @protected
    	 * @param {HTMLElement} element - The event source.
    	 * @param {String} event - The event name.
    	 * @param {Function} listener - The event handler to attach.
    	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
    	 */
    	Owl.prototype.on = function(element, event, listener, capture) {
    		if (element.addEventListener) {
    			element.addEventListener(event, listener, capture);
    		} else if (element.attachEvent) {
    			element.attachEvent('on' + event, listener);
    		}
    	};

    	/**
    	 * Detaches from an internal event.
    	 * @protected
    	 * @param {HTMLElement} element - The event source.
    	 * @param {String} event - The event name.
    	 * @param {Function} listener - The attached event handler to detach.
    	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
    	 */
    	Owl.prototype.off = function(element, event, listener, capture) {
    		if (element.removeEventListener) {
    			element.removeEventListener(event, listener, capture);
    		} else if (element.detachEvent) {
    			element.detachEvent('on' + event, listener);
    		}
    	};

    	/**
    	 * Triggers a public event.
    	 * @todo Remove `status`, `relatedTarget` should be used instead.
    	 * @protected
    	 * @param {String} name - The event name.
    	 * @param {*} [data=null] - The event data.
    	 * @param {String} [namespace=carousel] - The event namespace.
    	 * @param {String} [state] - The state which is associated with the event.
    	 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
    	 * @returns {Event} - The event arguments.
    	 */
    	Owl.prototype.trigger = function(name, data, namespace, state, enter) {
    		var status = {
    			item: { count: this._items.length, index: this.current() }
    		}, handler = $.camelCase(
    			$.grep([ 'on', name, namespace ], function(v) { return v })
    				.join('-').toLowerCase()
    		), event = $.Event(
    			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
    			$.extend({ relatedTarget: this }, status, data)
    		);

    		if (!this._supress[name]) {
    			$.each(this._plugins, function(name, plugin) {
    				if (plugin.onTrigger) {
    					plugin.onTrigger(event);
    				}
    			});

    			this.register({ type: Owl.Type.Event, name: name });
    			this.$element.trigger(event);

    			if (this.settings && typeof this.settings[handler] === 'function') {
    				this.settings[handler].call(this, event);
    			}
    		}

    		return event;
    	};

    	/**
    	 * Enters a state.
    	 * @param name - The state name.
    	 */
    	Owl.prototype.enter = function(name) {
    		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
    			if (this._states.current[name] === undefined) {
    				this._states.current[name] = 0;
    			}

    			this._states.current[name]++;
    		}, this));
    	};

    	/**
    	 * Leaves a state.
    	 * @param name - The state name.
    	 */
    	Owl.prototype.leave = function(name) {
    		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
    			this._states.current[name]--;
    		}, this));
    	};

    	/**
    	 * Registers an event or state.
    	 * @public
    	 * @param {Object} object - The event or state to register.
    	 */
    	Owl.prototype.register = function(object) {
    		if (object.type === Owl.Type.Event) {
    			if (!$.event.special[object.name]) {
    				$.event.special[object.name] = {};
    			}

    			if (!$.event.special[object.name].owl) {
    				var _default = $.event.special[object.name]._default;
    				$.event.special[object.name]._default = function(e) {
    					if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
    						return _default.apply(this, arguments);
    					}
    					return e.namespace && e.namespace.indexOf('owl') > -1;
    				};
    				$.event.special[object.name].owl = true;
    			}
    		} else if (object.type === Owl.Type.State) {
    			if (!this._states.tags[object.name]) {
    				this._states.tags[object.name] = object.tags;
    			} else {
    				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
    			}

    			this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
    				return $.inArray(tag, this._states.tags[object.name]) === i;
    			}, this));
    		}
    	};

    	/**
    	 * Suppresses events.
    	 * @protected
    	 * @param {Array.<String>} events - The events to suppress.
    	 */
    	Owl.prototype.suppress = function(events) {
    		$.each(events, $.proxy(function(index, event) {
    			this._supress[event] = true;
    		}, this));
    	};

    	/**
    	 * Releases suppressed events.
    	 * @protected
    	 * @param {Array.<String>} events - The events to release.
    	 */
    	Owl.prototype.release = function(events) {
    		$.each(events, $.proxy(function(index, event) {
    			delete this._supress[event];
    		}, this));
    	};

    	/**
    	 * Gets unified pointer coordinates from event.
    	 * @todo #261
    	 * @protected
    	 * @param {Event} - The `mousedown` or `touchstart` event.
    	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
    	 */
    	Owl.prototype.pointer = function(event) {
    		var result = { x: null, y: null };

    		event = event.originalEvent || event || window.event;

    		event = event.touches && event.touches.length ?
    			event.touches[0] : event.changedTouches && event.changedTouches.length ?
    				event.changedTouches[0] : event;

    		if (event.pageX) {
    			result.x = event.pageX;
    			result.y = event.pageY;
    		} else {
    			result.x = event.clientX;
    			result.y = event.clientY;
    		}

    		return result;
    	};

    	/**
    	 * Determines if the input is a Number or something that can be coerced to a Number
    	 * @protected
    	 * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
    	 * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
    	 */
    	Owl.prototype.isNumeric = function(number) {
    		return !isNaN(parseFloat(number));
    	};

    	/**
    	 * Gets the difference of two vectors.
    	 * @todo #261
    	 * @protected
    	 * @param {Object} - The first vector.
    	 * @param {Object} - The second vector.
    	 * @returns {Object} - The difference.
    	 */
    	Owl.prototype.difference = function(first, second) {
    		return {
    			x: first.x - second.x,
    			y: first.y - second.y
    		};
    	};

    	/**
    	 * The jQuery Plugin for the Owl Carousel
    	 * @todo Navigation plugin `next` and `prev`
    	 * @public
    	 */
    	$.fn.owlCarousel = function(option) {
    		var args = Array.prototype.slice.call(arguments, 1);

    		return this.each(function() {
    			var $this = $(this),
    				data = $this.data('owl.carousel');

    			if (!data) {
    				data = new Owl(this, typeof option == 'object' && option);
    				$this.data('owl.carousel', data);

    				$.each([
    					'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
    				], function(i, event) {
    					data.register({ type: Owl.Type.Event, name: event });
    					data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
    						if (e.namespace && e.relatedTarget !== this) {
    							this.suppress([ event ]);
    							data[event].apply(this, [].slice.call(arguments, 1));
    							this.release([ event ]);
    						}
    					}, data));
    				});
    			}

    			if (typeof option == 'string' && option.charAt(0) !== '_') {
    				data[option].apply(data, args);
    			}
    		});
    	};

    	/**
    	 * The constructor for the jQuery Plugin
    	 * @public
    	 */
    	$.fn.owlCarousel.Constructor = Owl;

    })(window.Zepto || window.jQuery, window, document);
    (function($, window, document, undefined) {

    	/**
    	 * Creates the auto refresh plugin.
    	 * @class The Auto Refresh Plugin
    	 * @param {Owl} carousel - The Owl Carousel
    	 */
    	var AutoRefresh = function(carousel) {
    		/**
    		 * Reference to the core.
    		 * @protected
    		 * @type {Owl}
    		 */
    		this._core = carousel;

    		/**
    		 * Refresh interval.
    		 * @protected
    		 * @type {number}
    		 */
    		this._interval = null;

    		/**
    		 * Whether the element is currently visible or not.
    		 * @protected
    		 * @type {Boolean}
    		 */
    		this._visible = null;

    		/**
    		 * All event handlers.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._handlers = {
    			'initialized.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.autoRefresh) {
    					this.watch();
    				}
    			}, this)
    		};

    		// set default options
    		this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

    		// register event handlers
    		this._core.$element.on(this._handlers);
    	};

    	/**
    	 * Default options.
    	 * @public
    	 */
    	AutoRefresh.Defaults = {
    		autoRefresh: true,
    		autoRefreshInterval: 500
    	};

    	/**
    	 * Watches the element.
    	 */
    	AutoRefresh.prototype.watch = function() {
    		if (this._interval) {
    			return;
    		}

    		this._visible = this._core.isVisible();
    		this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
    	};

    	/**
    	 * Refreshes the element.
    	 */
    	AutoRefresh.prototype.refresh = function() {
    		if (this._core.isVisible() === this._visible) {
    			return;
    		}

    		this._visible = !this._visible;

    		this._core.$element.toggleClass('owl-hidden', !this._visible);

    		this._visible && (this._core.invalidate('width') && this._core.refresh());
    	};

    	/**
    	 * Destroys the plugin.
    	 */
    	AutoRefresh.prototype.destroy = function() {
    		var handler, property;

    		window.clearInterval(this._interval);

    		for (handler in this._handlers) {
    			this._core.$element.off(handler, this._handlers[handler]);
    		}
    		for (property in Object.getOwnPropertyNames(this)) {
    			typeof this[property] != 'function' && (this[property] = null);
    		}
    	};

    	$.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

    })(window.Zepto || window.jQuery, window, document);
    (function($, window, document, undefined) {

    	/**
    	 * Creates the lazy plugin.
    	 * @class The Lazy Plugin
    	 * @param {Owl} carousel - The Owl Carousel
    	 */
    	var Lazy = function(carousel) {

    		/**
    		 * Reference to the core.
    		 * @protected
    		 * @type {Owl}
    		 */
    		this._core = carousel;

    		/**
    		 * Already loaded items.
    		 * @protected
    		 * @type {Array.<jQuery>}
    		 */
    		this._loaded = [];

    		/**
    		 * Event handlers.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._handlers = {
    			'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
    				if (!e.namespace) {
    					return;
    				}

    				if (!this._core.settings || !this._core.settings.lazyLoad) {
    					return;
    				}

    				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
    					var settings = this._core.settings,
    						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
    						i = ((settings.center && n * -1) || 0),
    						position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
    						clones = this._core.clones().length,
    						load = $.proxy(function(i, v) { this.load(v); }, this);
    					//TODO: Need documentation for this new option
    					if (settings.lazyLoadEager > 0) {
    						n += settings.lazyLoadEager;
    						// If the carousel is looping also preload images that are to the "left"
    						if (settings.loop) {
                  position -= settings.lazyLoadEager;
                  n++;
                }
    					}

    					while (i++ < n) {
    						this.load(clones / 2 + this._core.relative(position));
    						clones && $.each(this._core.clones(this._core.relative(position)), load);
    						position++;
    					}
    				}
    			}, this)
    		};

    		// set the default options
    		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

    		// register event handler
    		this._core.$element.on(this._handlers);
    	};

    	/**
    	 * Default options.
    	 * @public
    	 */
    	Lazy.Defaults = {
    		lazyLoad: false,
    		lazyLoadEager: 0
    	};

    	/**
    	 * Loads all resources of an item at the specified position.
    	 * @param {Number} position - The absolute position of the item.
    	 * @protected
    	 */
    	Lazy.prototype.load = function(position) {
    		var $item = this._core.$stage.children().eq(position),
    			$elements = $item && $item.find('.owl-lazy');

    		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
    			return;
    		}

    		$elements.each($.proxy(function(index, element) {
    			var $element = $(element), image,
                    url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src') || $element.attr('data-srcset');

    			this._core.trigger('load', { element: $element, url: url }, 'lazy');

    			if ($element.is('img')) {
    				$element.one('load.owl.lazy', $.proxy(function() {
    					$element.css('opacity', 1);
    					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
    				}, this)).attr('src', url);
                } else if ($element.is('source')) {
                    $element.one('load.owl.lazy', $.proxy(function() {
                        this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
                    }, this)).attr('srcset', url);
    			} else {
    				image = new Image();
    				image.onload = $.proxy(function() {
    					$element.css({
    						'background-image': 'url("' + url + '")',
    						'opacity': '1'
    					});
    					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
    				}, this);
    				image.src = url;
    			}
    		}, this));

    		this._loaded.push($item.get(0));
    	};

    	/**
    	 * Destroys the plugin.
    	 * @public
    	 */
    	Lazy.prototype.destroy = function() {
    		var handler, property;

    		for (handler in this.handlers) {
    			this._core.$element.off(handler, this.handlers[handler]);
    		}
    		for (property in Object.getOwnPropertyNames(this)) {
    			typeof this[property] != 'function' && (this[property] = null);
    		}
    	};

    	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

    })(window.Zepto || window.jQuery, window, document);
    (function($, window, document, undefined) {

    	/**
    	 * Creates the auto height plugin.
    	 * @class The Auto Height Plugin
    	 * @param {Owl} carousel - The Owl Carousel
    	 */
    	var AutoHeight = function(carousel) {
    		/**
    		 * Reference to the core.
    		 * @protected
    		 * @type {Owl}
    		 */
    		this._core = carousel;

    		this._previousHeight = null;

    		/**
    		 * All event handlers.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._handlers = {
    			'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.autoHeight) {
    					this.update();
    				}
    			}, this),
    			'changed.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.autoHeight && e.property.name === 'position'){
    					this.update();
    				}
    			}, this),
    			'loaded.owl.lazy': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.autoHeight
    					&& e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
    					this.update();
    				}
    			}, this)
    		};

    		// set default options
    		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

    		// register event handlers
    		this._core.$element.on(this._handlers);
    		this._intervalId = null;
    		var refThis = this;

    		// These changes have been taken from a PR by gavrochelegnou proposed in #1575
    		// and have been made compatible with the latest jQuery version
    		$(window).on('load', function() {
    			if (refThis._core.settings.autoHeight) {
    				refThis.update();
    			}
    		});

    		// Autoresize the height of the carousel when window is resized
    		// When carousel has images, the height is dependent on the width
    		// and should also change on resize
    		$(window).resize(function() {
    			if (refThis._core.settings.autoHeight) {
    				if (refThis._intervalId != null) {
    					clearTimeout(refThis._intervalId);
    				}

    				refThis._intervalId = setTimeout(function() {
    					refThis.update();
    				}, 250);
    			}
    		});

    	};

    	/**
    	 * Default options.
    	 * @public
    	 */
    	AutoHeight.Defaults = {
    		autoHeight: false,
    		autoHeightClass: 'owl-height'
    	};

    	/**
    	 * Updates the view.
    	 */
    	AutoHeight.prototype.update = function() {
    		var start = this._core._current,
    			end = start + this._core.settings.items,
    			lazyLoadEnabled = this._core.settings.lazyLoad,
    			visible = this._core.$stage.children().toArray().slice(start, end),
    			heights = [],
    			maxheight = 0;

    		$.each(visible, function(index, item) {
    			heights.push($(item).height());
    		});

    		maxheight = Math.max.apply(null, heights);

    		if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) {
    			maxheight = this._previousHeight;
    		}

    		this._previousHeight = maxheight;

    		this._core.$stage.parent()
    			.height(maxheight)
    			.addClass(this._core.settings.autoHeightClass);
    	};

    	AutoHeight.prototype.destroy = function() {
    		var handler, property;

    		for (handler in this._handlers) {
    			this._core.$element.off(handler, this._handlers[handler]);
    		}
    		for (property in Object.getOwnPropertyNames(this)) {
    			typeof this[property] !== 'function' && (this[property] = null);
    		}
    	};

    	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

    })(window.Zepto || window.jQuery, window, document);
    (function($, window, document, undefined) {

    	/**
    	 * Creates the video plugin.
    	 * @class The Video Plugin
    	 * @param {Owl} carousel - The Owl Carousel
    	 */
    	var Video = function(carousel) {
    		/**
    		 * Reference to the core.
    		 * @protected
    		 * @type {Owl}
    		 */
    		this._core = carousel;

    		/**
    		 * Cache all video URLs.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._videos = {};

    		/**
    		 * Current playing item.
    		 * @protected
    		 * @type {jQuery}
    		 */
    		this._playing = null;

    		/**
    		 * All event handlers.
    		 * @todo The cloned content removale is too late
    		 * @protected
    		 * @type {Object}
    		 */
    		this._handlers = {
    			'initialized.owl.carousel': $.proxy(function(e) {
    				if (e.namespace) {
    					this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
    				}
    			}, this),
    			'resize.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
    					e.preventDefault();
    				}
    			}, this),
    			'refreshed.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.is('resizing')) {
    					this._core.$stage.find('.cloned .owl-video-frame').remove();
    				}
    			}, this),
    			'changed.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && e.property.name === 'position' && this._playing) {
    					this.stop();
    				}
    			}, this),
    			'prepared.owl.carousel': $.proxy(function(e) {
    				if (!e.namespace) {
    					return;
    				}

    				var $element = $(e.content).find('.owl-video');

    				if ($element.length) {
    					$element.css('display', 'none');
    					this.fetch($element, $(e.content));
    				}
    			}, this)
    		};

    		// set default options
    		this._core.options = $.extend({}, Video.Defaults, this._core.options);

    		// register event handlers
    		this._core.$element.on(this._handlers);

    		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
    			this.play(e);
    		}, this));
    	};

    	/**
    	 * Default options.
    	 * @public
    	 */
    	Video.Defaults = {
    		video: false,
    		videoHeight: false,
    		videoWidth: false
    	};

    	/**
    	 * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
    	 * @protected
    	 * @param {jQuery} target - The target containing the video data.
    	 * @param {jQuery} item - The item containing the video.
    	 */
    	Video.prototype.fetch = function(target, item) {
    			var type = (function() {
    					if (target.attr('data-vimeo-id')) {
    						return 'vimeo';
    					} else if (target.attr('data-vzaar-id')) {
    						return 'vzaar'
    					} else {
    						return 'youtube';
    					}
    				})(),
    				id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
    				width = target.attr('data-width') || this._core.settings.videoWidth,
    				height = target.attr('data-height') || this._core.settings.videoHeight,
    				url = target.attr('href');

    		if (url) {

    			/*
    					Parses the id's out of the following urls (and probably more):
    					https://www.youtube.com/watch?v=:id
    					https://youtu.be/:id
    					https://vimeo.com/:id
    					https://vimeo.com/channels/:channel/:id
    					https://vimeo.com/groups/:group/videos/:id
    					https://app.vzaar.com/videos/:id

    					Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
    			*/

    			id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

    			if (id[3].indexOf('youtu') > -1) {
    				type = 'youtube';
    			} else if (id[3].indexOf('vimeo') > -1) {
    				type = 'vimeo';
    			} else if (id[3].indexOf('vzaar') > -1) {
    				type = 'vzaar';
    			} else {
    				throw new Error('Video URL not supported.');
    			}
    			id = id[6];
    		} else {
    			throw new Error('Missing video URL.');
    		}

    		this._videos[url] = {
    			type: type,
    			id: id,
    			width: width,
    			height: height
    		};

    		item.attr('data-video', url);

    		this.thumbnail(target, this._videos[url]);
    	};

    	/**
    	 * Creates video thumbnail.
    	 * @protected
    	 * @param {jQuery} target - The target containing the video data.
    	 * @param {Object} info - The video info object.
    	 * @see `fetch`
    	 */
    	Video.prototype.thumbnail = function(target, video) {
    		var tnLink,
    			icon,
    			path,
    			dimensions = video.width && video.height ? 'width:' + video.width + 'px;height:' + video.height + 'px;' : '',
    			customTn = target.find('img'),
    			srcType = 'src',
    			lazyClass = '',
    			settings = this._core.settings,
    			create = function(path) {
    				icon = '<div class="owl-video-play-icon"></div>';

    				if (settings.lazyLoad) {
    					tnLink = $('<div/>',{
    						"class": 'owl-video-tn ' + lazyClass,
    						"srcType": path
    					});
    				} else {
    					tnLink = $( '<div/>', {
    						"class": "owl-video-tn",
    						"style": 'opacity:1;background-image:url(' + path + ')'
    					});
    				}
    				target.after(tnLink);
    				target.after(icon);
    			};

    		// wrap video content into owl-video-wrapper div
    		target.wrap( $( '<div/>', {
    			"class": "owl-video-wrapper",
    			"style": dimensions
    		}));

    		if (this._core.settings.lazyLoad) {
    			srcType = 'data-src';
    			lazyClass = 'owl-lazy';
    		}

    		// custom thumbnail
    		if (customTn.length) {
    			create(customTn.attr(srcType));
    			customTn.remove();
    			return false;
    		}

    		if (video.type === 'youtube') {
    			path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
    			create(path);
    		} else if (video.type === 'vimeo') {
    			$.ajax({
    				type: 'GET',
    				url: '//vimeo.com/api/v2/video/' + video.id + '.json',
    				jsonp: 'callback',
    				dataType: 'jsonp',
    				success: function(data) {
    					path = data[0].thumbnail_large;
    					create(path);
    				}
    			});
    		} else if (video.type === 'vzaar') {
    			$.ajax({
    				type: 'GET',
    				url: '//vzaar.com/api/videos/' + video.id + '.json',
    				jsonp: 'callback',
    				dataType: 'jsonp',
    				success: function(data) {
    					path = data.framegrab_url;
    					create(path);
    				}
    			});
    		}
    	};

    	/**
    	 * Stops the current video.
    	 * @public
    	 */
    	Video.prototype.stop = function() {
    		this._core.trigger('stop', null, 'video');
    		this._playing.find('.owl-video-frame').remove();
    		this._playing.removeClass('owl-video-playing');
    		this._playing = null;
    		this._core.leave('playing');
    		this._core.trigger('stopped', null, 'video');
    	};

    	/**
    	 * Starts the current video.
    	 * @public
    	 * @param {Event} event - The event arguments.
    	 */
    	Video.prototype.play = function(event) {
    		var target = $(event.target),
    			item = target.closest('.' + this._core.settings.itemClass),
    			video = this._videos[item.attr('data-video')],
    			width = video.width || '100%',
    			height = video.height || this._core.$stage.height(),
    			html,
    			iframe;

    		if (this._playing) {
    			return;
    		}

    		this._core.enter('playing');
    		this._core.trigger('play', null, 'video');

    		item = this._core.items(this._core.relative(item.index()));

    		this._core.reset(item.index());

    		html = $( '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>' );
    		html.attr( 'height', height );
    		html.attr( 'width', width );
    		if (video.type === 'youtube') {
    			html.attr( 'src', '//www.youtube.com/embed/' + video.id + '?autoplay=1&rel=0&v=' + video.id );
    		} else if (video.type === 'vimeo') {
    			html.attr( 'src', '//player.vimeo.com/video/' + video.id + '?autoplay=1' );
    		} else if (video.type === 'vzaar') {
    			html.attr( 'src', '//view.vzaar.com/' + video.id + '/player?autoplay=true' );
    		}

    		iframe = $(html).wrap( '<div class="owl-video-frame" />' ).insertAfter(item.find('.owl-video'));

    		this._playing = item.addClass('owl-video-playing');
    	};

    	/**
    	 * Checks whether an video is currently in full screen mode or not.
    	 * @todo Bad style because looks like a readonly method but changes members.
    	 * @protected
    	 * @returns {Boolean}
    	 */
    	Video.prototype.isInFullScreen = function() {
    		var element = document.fullscreenElement || document.mozFullScreenElement ||
    				document.webkitFullscreenElement;

    		return element && $(element).parent().hasClass('owl-video-frame');
    	};

    	/**
    	 * Destroys the plugin.
    	 */
    	Video.prototype.destroy = function() {
    		var handler, property;

    		this._core.$element.off('click.owl.video');

    		for (handler in this._handlers) {
    			this._core.$element.off(handler, this._handlers[handler]);
    		}
    		for (property in Object.getOwnPropertyNames(this)) {
    			typeof this[property] != 'function' && (this[property] = null);
    		}
    	};

    	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

    })(window.Zepto || window.jQuery, window, document);
    (function($, window, document, undefined) {

    	/**
    	 * Creates the animate plugin.
    	 * @class The Navigation Plugin
    	 * @param {Owl} scope - The Owl Carousel
    	 */
    	var Animate = function(scope) {
    		this.core = scope;
    		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
    		this.swapping = true;
    		this.previous = undefined;
    		this.next = undefined;

    		this.handlers = {
    			'change.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && e.property.name == 'position') {
    					this.previous = this.core.current();
    					this.next = e.property.value;
    				}
    			}, this),
    			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
    				if (e.namespace) {
    					this.swapping = e.type == 'translated';
    				}
    			}, this),
    			'translate.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
    					this.swap();
    				}
    			}, this)
    		};

    		this.core.$element.on(this.handlers);
    	};

    	/**
    	 * Default options.
    	 * @public
    	 */
    	Animate.Defaults = {
    		animateOut: false,
    		animateIn: false
    	};

    	/**
    	 * Toggles the animation classes whenever an translations starts.
    	 * @protected
    	 * @returns {Boolean|undefined}
    	 */
    	Animate.prototype.swap = function() {

    		if (this.core.settings.items !== 1) {
    			return;
    		}

    		if (!$.support.animation || !$.support.transition) {
    			return;
    		}

    		this.core.speed(0);

    		var left,
    			clear = $.proxy(this.clear, this),
    			previous = this.core.$stage.children().eq(this.previous),
    			next = this.core.$stage.children().eq(this.next),
    			incoming = this.core.settings.animateIn,
    			outgoing = this.core.settings.animateOut;

    		if (this.core.current() === this.previous) {
    			return;
    		}

    		if (outgoing) {
    			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
    			previous.one($.support.animation.end, clear)
    				.css( { 'left': left + 'px' } )
    				.addClass('animated owl-animated-out')
    				.addClass(outgoing);
    		}

    		if (incoming) {
    			next.one($.support.animation.end, clear)
    				.addClass('animated owl-animated-in')
    				.addClass(incoming);
    		}
    	};

    	Animate.prototype.clear = function(e) {
    		$(e.target).css( { 'left': '' } )
    			.removeClass('animated owl-animated-out owl-animated-in')
    			.removeClass(this.core.settings.animateIn)
    			.removeClass(this.core.settings.animateOut);
    		this.core.onTransitionEnd();
    	};

    	/**
    	 * Destroys the plugin.
    	 * @public
    	 */
    	Animate.prototype.destroy = function() {
    		var handler, property;

    		for (handler in this.handlers) {
    			this.core.$element.off(handler, this.handlers[handler]);
    		}
    		for (property in Object.getOwnPropertyNames(this)) {
    			typeof this[property] != 'function' && (this[property] = null);
    		}
    	};

    	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

    })(window.Zepto || window.jQuery, window, document);
    (function($, window, document, undefined) {

    	/**
    	 * Creates the autoplay plugin.
    	 * @class The Autoplay Plugin
    	 * @param {Owl} scope - The Owl Carousel
    	 */
    	var Autoplay = function(carousel) {
    		/**
    		 * Reference to the core.
    		 * @protected
    		 * @type {Owl}
    		 */
    		this._core = carousel;

    		/**
    		 * The autoplay timeout id.
    		 * @type {Number}
    		 */
    		this._call = null;

    		/**
    		 * Depending on the state of the plugin, this variable contains either
    		 * the start time of the timer or the current timer value if it's
    		 * paused. Since we start in a paused state we initialize the timer
    		 * value.
    		 * @type {Number}
    		 */
    		this._time = 0;

    		/**
    		 * Stores the timeout currently used.
    		 * @type {Number}
    		 */
    		this._timeout = 0;

    		/**
    		 * Indicates whenever the autoplay is paused.
    		 * @type {Boolean}
    		 */
    		this._paused = true;

    		/**
    		 * All event handlers.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._handlers = {
    			'changed.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && e.property.name === 'settings') {
    					if (this._core.settings.autoplay) {
    						this.play();
    					} else {
    						this.stop();
    					}
    				} else if (e.namespace && e.property.name === 'position' && this._paused) {
    					// Reset the timer. This code is triggered when the position
    					// of the carousel was changed through user interaction.
    					this._time = 0;
    				}
    			}, this),
    			'initialized.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.autoplay) {
    					this.play();
    				}
    			}, this),
    			'play.owl.autoplay': $.proxy(function(e, t, s) {
    				if (e.namespace) {
    					this.play(t, s);
    				}
    			}, this),
    			'stop.owl.autoplay': $.proxy(function(e) {
    				if (e.namespace) {
    					this.stop();
    				}
    			}, this),
    			'mouseover.owl.autoplay': $.proxy(function() {
    				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
    					this.pause();
    				}
    			}, this),
    			'mouseleave.owl.autoplay': $.proxy(function() {
    				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
    					this.play();
    				}
    			}, this),
    			'touchstart.owl.core': $.proxy(function() {
    				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
    					this.pause();
    				}
    			}, this),
    			'touchend.owl.core': $.proxy(function() {
    				if (this._core.settings.autoplayHoverPause) {
    					this.play();
    				}
    			}, this)
    		};

    		// register event handlers
    		this._core.$element.on(this._handlers);

    		// set default options
    		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
    	};

    	/**
    	 * Default options.
    	 * @public
    	 */
    	Autoplay.Defaults = {
    		autoplay: false,
    		autoplayTimeout: 5000,
    		autoplayHoverPause: false,
    		autoplaySpeed: false
    	};

    	/**
    	 * Transition to the next slide and set a timeout for the next transition.
    	 * @private
    	 * @param {Number} [speed] - The animation speed for the animations.
    	 */
    	Autoplay.prototype._next = function(speed) {
    		this._call = window.setTimeout(
    			$.proxy(this._next, this, speed),
    			this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()
    		);

    		if (this._core.is('interacting') || document.hidden) {
    			return;
    		}
    		this._core.next(speed || this._core.settings.autoplaySpeed);
    	};

    	/**
    	 * Reads the current timer value when the timer is playing.
    	 * @public
    	 */
    	Autoplay.prototype.read = function() {
    		return new Date().getTime() - this._time;
    	};

    	/**
    	 * Starts the autoplay.
    	 * @public
    	 * @param {Number} [timeout] - The interval before the next animation starts.
    	 * @param {Number} [speed] - The animation speed for the animations.
    	 */
    	Autoplay.prototype.play = function(timeout, speed) {
    		var elapsed;

    		if (!this._core.is('rotating')) {
    			this._core.enter('rotating');
    		}

    		timeout = timeout || this._core.settings.autoplayTimeout;

    		// Calculate the elapsed time since the last transition. If the carousel
    		// wasn't playing this calculation will yield zero.
    		elapsed = Math.min(this._time % (this._timeout || timeout), timeout);

    		if (this._paused) {
    			// Start the clock.
    			this._time = this.read();
    			this._paused = false;
    		} else {
    			// Clear the active timeout to allow replacement.
    			window.clearTimeout(this._call);
    		}

    		// Adjust the origin of the timer to match the new timeout value.
    		this._time += this.read() % timeout - elapsed;

    		this._timeout = timeout;
    		this._call = window.setTimeout($.proxy(this._next, this, speed), timeout - elapsed);
    	};

    	/**
    	 * Stops the autoplay.
    	 * @public
    	 */
    	Autoplay.prototype.stop = function() {
    		if (this._core.is('rotating')) {
    			// Reset the clock.
    			this._time = 0;
    			this._paused = true;

    			window.clearTimeout(this._call);
    			this._core.leave('rotating');
    		}
    	};

    	/**
    	 * Pauses the autoplay.
    	 * @public
    	 */
    	Autoplay.prototype.pause = function() {
    		if (this._core.is('rotating') && !this._paused) {
    			// Pause the clock.
    			this._time = this.read();
    			this._paused = true;

    			window.clearTimeout(this._call);
    		}
    	};

    	/**
    	 * Destroys the plugin.
    	 */
    	Autoplay.prototype.destroy = function() {
    		var handler, property;

    		this.stop();

    		for (handler in this._handlers) {
    			this._core.$element.off(handler, this._handlers[handler]);
    		}
    		for (property in Object.getOwnPropertyNames(this)) {
    			typeof this[property] != 'function' && (this[property] = null);
    		}
    	};

    	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

    })(window.Zepto || window.jQuery, window, document);
    (function($, window, document, undefined) {

    	/**
    	 * Creates the navigation plugin.
    	 * @class The Navigation Plugin
    	 * @param {Owl} carousel - The Owl Carousel.
    	 */
    	var Navigation = function(carousel) {
    		/**
    		 * Reference to the core.
    		 * @protected
    		 * @type {Owl}
    		 */
    		this._core = carousel;

    		/**
    		 * Indicates whether the plugin is initialized or not.
    		 * @protected
    		 * @type {Boolean}
    		 */
    		this._initialized = false;

    		/**
    		 * The current paging indexes.
    		 * @protected
    		 * @type {Array}
    		 */
    		this._pages = [];

    		/**
    		 * All DOM elements of the user interface.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._controls = {};

    		/**
    		 * Markup for an indicator.
    		 * @protected
    		 * @type {Array.<String>}
    		 */
    		this._templates = [];

    		/**
    		 * The carousel element.
    		 * @type {jQuery}
    		 */
    		this.$element = this._core.$element;

    		/**
    		 * Overridden methods of the carousel.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._overrides = {
    			next: this._core.next,
    			prev: this._core.prev,
    			to: this._core.to
    		};

    		/**
    		 * All event handlers.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._handlers = {
    			'prepared.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.dotsData) {
    					this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
    						$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
    				}
    			}, this),
    			'added.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.dotsData) {
    					this._templates.splice(e.position, 0, this._templates.pop());
    				}
    			}, this),
    			'remove.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.dotsData) {
    					this._templates.splice(e.position, 1);
    				}
    			}, this),
    			'changed.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && e.property.name == 'position') {
    					this.draw();
    				}
    			}, this),
    			'initialized.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && !this._initialized) {
    					this._core.trigger('initialize', null, 'navigation');
    					this.initialize();
    					this.update();
    					this.draw();
    					this._initialized = true;
    					this._core.trigger('initialized', null, 'navigation');
    				}
    			}, this),
    			'refreshed.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._initialized) {
    					this._core.trigger('refresh', null, 'navigation');
    					this.update();
    					this.draw();
    					this._core.trigger('refreshed', null, 'navigation');
    				}
    			}, this)
    		};

    		// set default options
    		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

    		// register event handlers
    		this.$element.on(this._handlers);
    	};

    	/**
    	 * Default options.
    	 * @public
    	 * @todo Rename `slideBy` to `navBy`
    	 */
    	Navigation.Defaults = {
    		nav: false,
    		navText: [
    			'<span aria-label="' + 'Previous' + '">&#x2039;</span>',
    			'<span aria-label="' + 'Next' + '">&#x203a;</span>'
    		],
    		navSpeed: false,
    		navElement: 'button type="button" role="presentation"',
    		navContainer: false,
    		navContainerClass: 'owl-nav',
    		navClass: [
    			'owl-prev',
    			'owl-next'
    		],
    		slideBy: 1,
    		dotClass: 'owl-dot',
    		dotsClass: 'owl-dots',
    		dots: true,
    		dotsEach: false,
    		dotsData: false,
    		dotsSpeed: false,
    		dotsContainer: false
    	};

    	/**
    	 * Initializes the layout of the plugin and extends the carousel.
    	 * @protected
    	 */
    	Navigation.prototype.initialize = function() {
    		var override,
    			settings = this._core.settings;

    		// create DOM structure for relative navigation
    		this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
    			: $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

    		this._controls.$previous = $('<' + settings.navElement + '>')
    			.addClass(settings.navClass[0])
    			.html(settings.navText[0])
    			.prependTo(this._controls.$relative)
    			.on('click', $.proxy(function(e) {
    				this.prev(settings.navSpeed);
    			}, this));
    		this._controls.$next = $('<' + settings.navElement + '>')
    			.addClass(settings.navClass[1])
    			.html(settings.navText[1])
    			.appendTo(this._controls.$relative)
    			.on('click', $.proxy(function(e) {
    				this.next(settings.navSpeed);
    			}, this));

    		// create DOM structure for absolute navigation
    		if (!settings.dotsData) {
    			this._templates = [ $('<button role="button">')
    				.addClass(settings.dotClass)
    				.append($('<span>'))
    				.prop('outerHTML') ];
    		}

    		this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
    			: $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

    		this._controls.$absolute.on('click', 'button', $.proxy(function(e) {
    			var index = $(e.target).parent().is(this._controls.$absolute)
    				? $(e.target).index() : $(e.target).parent().index();

    			e.preventDefault();

    			this.to(index, settings.dotsSpeed);
    		}, this));

    		/*$el.on('focusin', function() {
    			$(document).off(".carousel");

    			$(document).on('keydown.carousel', function(e) {
    				if(e.keyCode == 37) {
    					$el.trigger('prev.owl')
    				}
    				if(e.keyCode == 39) {
    					$el.trigger('next.owl')
    				}
    			});
    		});*/

    		// override public methods of the carousel
    		for (override in this._overrides) {
    			this._core[override] = $.proxy(this[override], this);
    		}
    	};

    	/**
    	 * Destroys the plugin.
    	 * @protected
    	 */
    	Navigation.prototype.destroy = function() {
    		var handler, control, property, override, settings;
    		settings = this._core.settings;

    		for (handler in this._handlers) {
    			this.$element.off(handler, this._handlers[handler]);
    		}
    		for (control in this._controls) {
    			if (control === '$relative' && settings.navContainer) {
    				this._controls[control].html('');
    			} else {
    				this._controls[control].remove();
    			}
    		}
    		for (override in this.overides) {
    			this._core[override] = this._overrides[override];
    		}
    		for (property in Object.getOwnPropertyNames(this)) {
    			typeof this[property] != 'function' && (this[property] = null);
    		}
    	};

    	/**
    	 * Updates the internal state.
    	 * @protected
    	 */
    	Navigation.prototype.update = function() {
    		var i, j, k,
    			lower = this._core.clones().length / 2,
    			upper = lower + this._core.items().length,
    			maximum = this._core.maximum(true),
    			settings = this._core.settings,
    			size = settings.center || settings.autoWidth || settings.dotsData
    				? 1 : settings.dotsEach || settings.items;

    		if (settings.slideBy !== 'page') {
    			settings.slideBy = Math.min(settings.slideBy, settings.items);
    		}

    		if (settings.dots || settings.slideBy == 'page') {
    			this._pages = [];

    			for (i = lower, j = 0, k = 0; i < upper; i++) {
    				if (j >= size || j === 0) {
    					this._pages.push({
    						start: Math.min(maximum, i - lower),
    						end: i - lower + size - 1
    					});
    					if (Math.min(maximum, i - lower) === maximum) {
    						break;
    					}
    					j = 0, ++k;
    				}
    				j += this._core.mergers(this._core.relative(i));
    			}
    		}
    	};

    	/**
    	 * Draws the user interface.
    	 * @todo The option `dotsData` wont work.
    	 * @protected
    	 */
    	Navigation.prototype.draw = function() {
    		var difference,
    			settings = this._core.settings,
    			disabled = this._core.items().length <= settings.items,
    			index = this._core.relative(this._core.current()),
    			loop = settings.loop || settings.rewind;

    		this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

    		if (settings.nav) {
    			this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
    			this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
    		}

    		this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

    		if (settings.dots) {
    			difference = this._pages.length - this._controls.$absolute.children().length;

    			if (settings.dotsData && difference !== 0) {
    				this._controls.$absolute.html(this._templates.join(''));
    			} else if (difference > 0) {
    				this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
    			} else if (difference < 0) {
    				this._controls.$absolute.children().slice(difference).remove();
    			}

    			this._controls.$absolute.find('.active').removeClass('active');
    			this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
    		}
    	};

    	/**
    	 * Extends event data.
    	 * @protected
    	 * @param {Event} event - The event object which gets thrown.
    	 */
    	Navigation.prototype.onTrigger = function(event) {
    		var settings = this._core.settings;

    		event.page = {
    			index: $.inArray(this.current(), this._pages),
    			count: this._pages.length,
    			size: settings && (settings.center || settings.autoWidth || settings.dotsData
    				? 1 : settings.dotsEach || settings.items)
    		};
    	};

    	/**
    	 * Gets the current page position of the carousel.
    	 * @protected
    	 * @returns {Number}
    	 */
    	Navigation.prototype.current = function() {
    		var current = this._core.relative(this._core.current());
    		return $.grep(this._pages, $.proxy(function(page, index) {
    			return page.start <= current && page.end >= current;
    		}, this)).pop();
    	};

    	/**
    	 * Gets the current succesor/predecessor position.
    	 * @protected
    	 * @returns {Number}
    	 */
    	Navigation.prototype.getPosition = function(successor) {
    		var position, length,
    			settings = this._core.settings;

    		if (settings.slideBy == 'page') {
    			position = $.inArray(this.current(), this._pages);
    			length = this._pages.length;
    			successor ? ++position : --position;
    			position = this._pages[((position % length) + length) % length].start;
    		} else {
    			position = this._core.relative(this._core.current());
    			length = this._core.items().length;
    			successor ? position += settings.slideBy : position -= settings.slideBy;
    		}

    		return position;
    	};

    	/**
    	 * Slides to the next item or page.
    	 * @public
    	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
    	 */
    	Navigation.prototype.next = function(speed) {
    		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
    	};

    	/**
    	 * Slides to the previous item or page.
    	 * @public
    	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
    	 */
    	Navigation.prototype.prev = function(speed) {
    		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
    	};

    	/**
    	 * Slides to the specified item or page.
    	 * @public
    	 * @param {Number} position - The position of the item or page.
    	 * @param {Number} [speed] - The time in milliseconds for the transition.
    	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
    	 */
    	Navigation.prototype.to = function(position, speed, standard) {
    		var length;

    		if (!standard && this._pages.length) {
    			length = this._pages.length;
    			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
    		} else {
    			$.proxy(this._overrides.to, this._core)(position, speed);
    		}
    	};

    	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

    })(window.Zepto || window.jQuery, window, document);
    (function($, window, document, undefined) {

    	/**
    	 * Creates the hash plugin.
    	 * @class The Hash Plugin
    	 * @param {Owl} carousel - The Owl Carousel
    	 */
    	var Hash = function(carousel) {
    		/**
    		 * Reference to the core.
    		 * @protected
    		 * @type {Owl}
    		 */
    		this._core = carousel;

    		/**
    		 * Hash index for the items.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._hashes = {};

    		/**
    		 * The carousel element.
    		 * @type {jQuery}
    		 */
    		this.$element = this._core.$element;

    		/**
    		 * All event handlers.
    		 * @protected
    		 * @type {Object}
    		 */
    		this._handlers = {
    			'initialized.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && this._core.settings.startPosition === 'URLHash') {
    					$(window).trigger('hashchange.owl.navigation');
    				}
    			}, this),
    			'prepared.owl.carousel': $.proxy(function(e) {
    				if (e.namespace) {
    					var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

    					if (!hash) {
    						return;
    					}

    					this._hashes[hash] = e.content;
    				}
    			}, this),
    			'changed.owl.carousel': $.proxy(function(e) {
    				if (e.namespace && e.property.name === 'position') {
    					var current = this._core.items(this._core.relative(this._core.current())),
    						hash = $.map(this._hashes, function(item, hash) {
    							return item === current ? hash : null;
    						}).join();

    					if (!hash || window.location.hash.slice(1) === hash) {
    						return;
    					}

    					window.location.hash = hash;
    				}
    			}, this)
    		};

    		// set default options
    		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

    		// register the event handlers
    		this.$element.on(this._handlers);

    		// register event listener for hash navigation
    		$(window).on('hashchange.owl.navigation', $.proxy(function(e) {
    			var hash = window.location.hash.substring(1),
    				items = this._core.$stage.children(),
    				position = this._hashes[hash] && items.index(this._hashes[hash]);

    			if (position === undefined || position === this._core.current()) {
    				return;
    			}

    			this._core.to(this._core.relative(position), false, true);
    		}, this));
    	};

    	/**
    	 * Default options.
    	 * @public
    	 */
    	Hash.Defaults = {
    		URLhashListener: false
    	};

    	/**
    	 * Destroys the plugin.
    	 * @public
    	 */
    	Hash.prototype.destroy = function() {
    		var handler, property;

    		$(window).off('hashchange.owl.navigation');

    		for (handler in this._handlers) {
    			this._core.$element.off(handler, this._handlers[handler]);
    		}
    		for (property in Object.getOwnPropertyNames(this)) {
    			typeof this[property] != 'function' && (this[property] = null);
    		}
    	};

    	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

    })(window.Zepto || window.jQuery, window, document);
    (function($, window, document, undefined) {

    	var style = $('<support>').get(0).style,
    		prefixes = 'Webkit Moz O ms'.split(' '),
    		events = {
    			transition: {
    				end: {
    					WebkitTransition: 'webkitTransitionEnd',
    					MozTransition: 'transitionend',
    					OTransition: 'oTransitionEnd',
    					transition: 'transitionend'
    				}
    			},
    			animation: {
    				end: {
    					WebkitAnimation: 'webkitAnimationEnd',
    					MozAnimation: 'animationend',
    					OAnimation: 'oAnimationEnd',
    					animation: 'animationend'
    				}
    			}
    		},
    		tests = {
    			csstransforms: function() {
    				return !!test('transform');
    			},
    			csstransforms3d: function() {
    				return !!test('perspective');
    			},
    			csstransitions: function() {
    				return !!test('transition');
    			},
    			cssanimations: function() {
    				return !!test('animation');
    			}
    		};

    	function test(property, prefixed) {
    		var result = false,
    			upper = property.charAt(0).toUpperCase() + property.slice(1);

    		$.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
    			if (style[property] !== undefined) {
    				result = prefixed ? property : true;
    				return false;
    			}
    		});

    		return result;
    	}

    	function prefixed(property) {
    		return test(property, true);
    	}

    	if (tests.csstransitions()) {
    		/* jshint -W053 */
    		$.support.transition = new String(prefixed('transition'));
    		$.support.transition.end = events.transition.end[ $.support.transition ];
    	}

    	if (tests.cssanimations()) {
    		/* jshint -W053 */
    		$.support.animation = new String(prefixed('animation'));
    		$.support.animation.end = events.animation.end[ $.support.animation ];
    	}

    	if (tests.csstransforms()) {
    		/* jshint -W053 */
    		$.support.transform = new String(prefixed('transform'));
    		$.support.transform3d = tests.csstransforms3d();
    	}

    })(window.Zepto || window.jQuery, window, document);

    var $ = window.jQuery;
    var ReactOwlCarousel = /** @class */ (function (_super) {
        __extends(ReactOwlCarousel, _super);
        function ReactOwlCarousel(props) {
            var _this = _super.call(this, props) || this;
            _this.containerRef = function (inst) {
                _this.container = inst;
            };
            var _a = filterOptions(_this.props), options = _a[0], propsWithoutOptions = _a[1];
            _this.options = options;
            _this.propsWithoutOptions = propsWithoutOptions;
            return _this;
        }
        ReactOwlCarousel.prototype.componentDidMount = function () {
            this.$ele = $(this.container);
            this.create();
        };
        ReactOwlCarousel.prototype.UNSAFE_componentWillReceiveProps = function () {
            this.destory();
        };
        ReactOwlCarousel.prototype.componentDidUpdate = function () {
            var _a = filterOptions(this.props), options = _a[0], propsWithoutOptions = _a[1];
            this.options = options;
            this.propsWithoutOptions = propsWithoutOptions;
            this.create();
        };
        ReactOwlCarousel.prototype.next = function (speed) {
            if (!this.$ele)
                throw new Error('OwlCarousel is not created');
            if (typeof speed === 'number') {
                this.$ele.trigger('next.owl.carousel', [speed]);
            }
            else {
                this.$ele.trigger('next.owl.carousel', speed);
            }
        };
        ReactOwlCarousel.prototype.prev = function (speed) {
            if (!this.$ele)
                throw new Error('OwlCarousel is not created');
            if (typeof speed === 'number') {
                this.$ele.trigger('prev.owl.carousel', [speed]);
            }
            else {
                this.$ele.trigger('prev.owl.carousel', speed);
            }
        };
        ReactOwlCarousel.prototype.to = function (position, speed) {
            if (!this.$ele)
                throw new Error('OwlCarousel is not created');
            if (typeof position === 'number' && typeof speed === 'number') {
                this.$ele.trigger('to.owl.carousel', [position, speed]);
            }
            else {
                this.$ele.trigger('to.owl.carousel');
            }
        };
        ReactOwlCarousel.prototype.create = function (options) {
            if (!this.$ele)
                throw new Error('OwlCarousel is not created');
            this.$ele.owlCarousel(options || this.options);
        };
        ReactOwlCarousel.prototype.destory = function () {
            if (!this.$ele)
                throw new Error('OwlCarousel is not created');
            this.$ele.trigger('destroy.owl.carousel');
        };
        ReactOwlCarousel.prototype.play = function (timeout, speed) {
            if (!this.$ele)
                throw new Error('OwlCarousel is not created');
            if (typeof timeout === 'number' && typeof speed === 'number') {
                this.$ele.trigger('play.owl.autoplay', [timeout, speed]);
            }
            else {
                this.$ele.trigger('play.owl.autoplay');
            }
        };
        ReactOwlCarousel.prototype.stop = function () {
            if (!this.$ele)
                throw new Error('OwlCarousel is not created');
            this.$ele.trigger('stop.owl.autoplay');
        };
        ReactOwlCarousel.prototype.render = function () {
            var _a = this.propsWithoutOptions, className = _a.className, props = __rest(_a, ["className"]);
            return (React__default.createElement("div", __assign({ className: "owl-carousel " + className, ref: this.containerRef }, props)));
        };
        return ReactOwlCarousel;
    }(React.Component));
    var OPTIONS = new Set([
        'items',
        'margin',
        'loop',
        'center',
        'mouseDrag',
        'touchDrag',
        'pullDrag',
        'freeDrag',
        'stagePadding',
        'merge',
        'mergeFit',
        'autoWidth',
        'startPosition',
        'URLhashListener',
        'nav',
        'rewind',
        'navText',
        'navElement',
        'slideBy',
        'dots',
        'dotsEach',
        'dotData',
        'lazyLoad',
        'lazyContent',
        'autoplay',
        'autoplayTimeout',
        'autoplayHoverPause',
        'smartSpeed',
        'fluidSpeed',
        'autoplaySpeed',
        'navSpeed',
        'dotsSpeed',
        'dragEndSpeed',
        'callbacks',
        'responsive',
        'responsiveRefreshRate',
        'responsiveBaseElement',
        'video',
        'videoHeight',
        'videoWidth',
        'animateOut',
        'animateIn',
        'fallbackEasing',
        'info',
        'nestedItemSelector',
        'itemElement',
        'stageElement',
        'navContainer',
        'dotsContainer',
        // 'CLASSES'
        'refreshClass',
        'loadingClass',
        'loadedClass',
        'rtlClass',
        'dragClass',
        'grabClass',
        'stageClass',
        'stageOuterClass',
        'navContainerClass',
        'navClass',
        'controlsClass',
        'dotClass',
        'dotsClass',
        'autoHeightClass',
        'responsiveClass',
        // 'EVENTS'
        'onInitialize',
        'onInitialized',
        'onResize',
        'onResized',
        'onRefresh',
        'onRefreshed',
        'onDrag',
        'onDragged',
        'onTranslate',
        'onTranslated',
        'onChange',
        'onChanged',
        'onLoadLazy',
        'onLoadedLazy',
        'onStopVideo',
        'onPlayVideo',
    ]);
    function filterOptions(item) {
        var options = {};
        var propsWithoutOptions = {};
        Object.keys(item).forEach(function (key) {
            if (OPTIONS.has(key)) {
                options[key] = item[key];
            }
            else {
                propsWithoutOptions[key] = item[key];
            }
        });
        return [options, propsWithoutOptions];
    }

    return ReactOwlCarousel;

})));


/***/ }),

/***/ 1829:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1830);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(768)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./owl.carousel.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./owl.carousel.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1830:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(802);
exports = module.exports = __webpack_require__(767)(false);
// imports


// module
exports.push([module.i, "/**\n * Owl Carousel v2.3.4\n * Copyright 2013-2018 David Deutsch\n * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE\n */\n/*\n *  Owl Carousel - Core\n */\n.owl-carousel {\n  display: none;\n  width: 100%;\n  -webkit-tap-highlight-color: transparent;\n  /* position relative and z-index fix webkit rendering fonts issue */\n  position: relative;\n  z-index: 1; }\n  .owl-carousel .owl-stage {\n    position: relative;\n    -ms-touch-action: pan-Y;\n    touch-action: manipulation;\n    -moz-backface-visibility: hidden;\n    /* fix firefox animation glitch */ }\n  .owl-carousel .owl-stage:after {\n    content: \".\";\n    display: block;\n    clear: both;\n    visibility: hidden;\n    line-height: 0;\n    height: 0; }\n  .owl-carousel .owl-stage-outer {\n    position: relative;\n    overflow: hidden;\n    /* fix for flashing background */\n    -webkit-transform: translate3d(0px, 0px, 0px); }\n  .owl-carousel .owl-wrapper,\n  .owl-carousel .owl-item {\n    -webkit-backface-visibility: hidden;\n    -moz-backface-visibility: hidden;\n    -ms-backface-visibility: hidden;\n    -webkit-transform: translate3d(0, 0, 0);\n    -moz-transform: translate3d(0, 0, 0);\n    -ms-transform: translate3d(0, 0, 0); }\n  .owl-carousel .owl-item {\n    position: relative;\n    min-height: 1px;\n    float: left;\n    -webkit-backface-visibility: hidden;\n    -webkit-tap-highlight-color: transparent;\n    -webkit-touch-callout: none; }\n  .owl-carousel .owl-item img {\n    display: block;\n    width: 100%; }\n  .owl-carousel .owl-nav.disabled,\n  .owl-carousel .owl-dots.disabled {\n    display: none; }\n  .owl-carousel .owl-nav .owl-prev,\n  .owl-carousel .owl-nav .owl-next,\n  .owl-carousel .owl-dot {\n    cursor: pointer;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  .owl-carousel .owl-nav button.owl-prev,\n  .owl-carousel .owl-nav button.owl-next,\n  .owl-carousel button.owl-dot {\n    background: none;\n    color: inherit;\n    border: none;\n    padding: 0 !important;\n    font: inherit; }\n  .owl-carousel.owl-loaded {\n    display: block; }\n  .owl-carousel.owl-loading {\n    opacity: 0;\n    display: block; }\n  .owl-carousel.owl-hidden {\n    opacity: 0; }\n  .owl-carousel.owl-refresh .owl-item {\n    visibility: hidden; }\n  .owl-carousel.owl-drag .owl-item {\n    -ms-touch-action: pan-y;\n        touch-action: pan-y;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  .owl-carousel.owl-grab {\n    cursor: move;\n    cursor: grab; }\n  .owl-carousel.owl-rtl {\n    direction: rtl; }\n  .owl-carousel.owl-rtl .owl-item {\n    float: right; }\n\n/* No Js */\n.no-js .owl-carousel {\n  display: block; }\n\n/*\n *  Owl Carousel - Animate Plugin\n */\n.owl-carousel .animated {\n  animation-duration: 1000ms;\n  animation-fill-mode: both; }\n\n.owl-carousel .owl-animated-in {\n  z-index: 0; }\n\n.owl-carousel .owl-animated-out {\n  z-index: 1; }\n\n.owl-carousel .fadeOut {\n  animation-name: fadeOut; }\n\n@keyframes fadeOut {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n/*\n * \tOwl Carousel - Auto Height Plugin\n */\n.owl-height {\n  transition: height 500ms ease-in-out; }\n\n/*\n * \tOwl Carousel - Lazy Load Plugin\n */\n.owl-carousel .owl-item {\n  /**\n\t\t\tThis is introduced due to a bug in IE11 where lazy loading combined with autoheight plugin causes a wrong\n\t\t\tcalculation of the height of the owl-item that breaks page layouts\n\t\t */ }\n  .owl-carousel .owl-item .owl-lazy {\n    opacity: 0;\n    transition: opacity 400ms ease; }\n  .owl-carousel .owl-item .owl-lazy[src^=\"\"], .owl-carousel .owl-item .owl-lazy:not([src]) {\n    max-height: 0; }\n  .owl-carousel .owl-item img.owl-lazy {\n    transform-style: preserve-3d; }\n\n/*\n * \tOwl Carousel - Video Plugin\n */\n.owl-carousel .owl-video-wrapper {\n  position: relative;\n  height: 100%;\n  background: #000; }\n\n.owl-carousel .owl-video-play-icon {\n  position: absolute;\n  height: 80px;\n  width: 80px;\n  left: 50%;\n  top: 50%;\n  margin-left: -40px;\n  margin-top: -40px;\n  background: url(" + escape(__webpack_require__(1831)) + ") no-repeat;\n  cursor: pointer;\n  z-index: 1;\n  -webkit-backface-visibility: hidden;\n  transition: transform 100ms ease; }\n\n.owl-carousel .owl-video-play-icon:hover {\n  -ms-transform: scale(1.3, 1.3);\n      transform: scale(1.3, 1.3); }\n\n.owl-carousel .owl-video-playing .owl-video-tn,\n.owl-carousel .owl-video-playing .owl-video-play-icon {\n  display: none; }\n\n.owl-carousel .owl-video-tn {\n  opacity: 0;\n  height: 100%;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-size: contain;\n  transition: opacity 400ms ease; }\n\n.owl-carousel .owl-video-frame {\n  position: relative;\n  z-index: 1;\n  height: 100%;\n  width: 100%; }\n", ""]);

// exports


/***/ }),

/***/ 1831:
/***/ (function(module, exports) {

module.exports = "/images/vendor/owl.carousel/dist/owl.video.play.png?4a37f8008959c75f619bf0a3a4e2d7a2";

/***/ }),

/***/ 1832:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1833);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(768)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./owl.theme.default.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./owl.theme.default.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1833:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(767)(false);
// imports


// module
exports.push([module.i, "/**\n * Owl Carousel v2.3.4\n * Copyright 2013-2018 David Deutsch\n * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE\n */\n/*\n * \tDefault theme - Owl Carousel CSS File\n */\n.owl-theme .owl-nav {\n  margin-top: 10px;\n  text-align: center;\n  -webkit-tap-highlight-color: transparent; }\n  .owl-theme .owl-nav [class*='owl-'] {\n    color: #FFF;\n    font-size: 14px;\n    margin: 5px;\n    padding: 4px 7px;\n    background: #D6D6D6;\n    display: inline-block;\n    cursor: pointer;\n    border-radius: 3px; }\n    .owl-theme .owl-nav [class*='owl-']:hover {\n      background: #869791;\n      color: #FFF;\n      text-decoration: none; }\n  .owl-theme .owl-nav .disabled {\n    opacity: 0.5;\n    cursor: default; }\n\n.owl-theme .owl-nav.disabled + .owl-dots {\n  margin-top: 10px; }\n\n.owl-theme .owl-dots {\n  text-align: center;\n  -webkit-tap-highlight-color: transparent; }\n  .owl-theme .owl-dots .owl-dot {\n    display: inline-block;\n    zoom: 1;\n    *display: inline; }\n    .owl-theme .owl-dots .owl-dot span {\n      width: 10px;\n      height: 10px;\n      margin: 5px 7px;\n      background: #D6D6D6;\n      display: block;\n      -webkit-backface-visibility: visible;\n      transition: opacity 200ms ease;\n      border-radius: 30px; }\n    .owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span {\n      background: #869791; }\n", ""]);

// exports


/***/ }),

/***/ 765:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 767:
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

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(765);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _ourStores = __webpack_require__(1824);

var _ourStores2 = _interopRequireDefault(_ourStores);

var _howItWorks = __webpack_require__(1826);

var _howItWorks2 = _interopRequireDefault(_howItWorks);

var _whyWeAre = __webpack_require__(1827);

var _whyWeAre2 = _interopRequireDefault(_whyWeAre);

var _customerAboutUs = __webpack_require__(1250);

var _customerAboutUs2 = _interopRequireDefault(_customerAboutUs);

var _banner = __webpack_require__(1249);

var _banner2 = _interopRequireDefault(_banner);

var _numbers = __webpack_require__(1501);

var _numbers2 = _interopRequireDefault(_numbers);

var _reactOwlCarousel = __webpack_require__(1828);

var _reactOwlCarousel2 = _interopRequireDefault(_reactOwlCarousel);

__webpack_require__(1829);

__webpack_require__(1832);

var _reactI18next = __webpack_require__(315);

var _helpersFunction = __webpack_require__(316);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import OurShop from "./ourShop"
var MainPage = function (_Component) {
  (0, _inherits3.default)(MainPage, _Component);

  function MainPage(props) {
    (0, _classCallCheck3.default)(this, MainPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).call(this, props));

    _this.state = {
      recommendations: []
    };
    _this._recommendation = _this._recommendation.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MainPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1],
          footerText = domain === 'ch' ? FOOTER_SEO_CH : FOOTER_SEO_DE;
      // this._recommendation();
      $('.footerBottom p.seo').html(footerText);
      $('.lightBoxVideoLink').simpleLightbox();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      $('.footerBottom p.seo').empty();
    }
  }, {
    key: '_recommendation',
    value: function _recommendation() {
      var _this2 = this;

      document.getElementById('spinner-box-load').style.display = 'block';
      axios.get('/api/getRecommendation').then(function (_ref) {
        var data = _ref.data;

        document.getElementById('spinner-box-load').style.display = 'none';
        _this2.setState({ recommendations: data.data });
      }).catch(function (error) {
        document.getElementById('spinner-box-load').style.display = 'none';
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1];
      var recommendations = this.state.recommendations;


      var options = {
        margin: 25,
        responsiveClass: true,
        nav: true,
        dots: true,
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 1
          },
          600: {
            items: 2
          },
          700: {
            items: 2
          },
          1000: {
            items: 4
          }
        }
      };
      return _react2.default.createElement(
        'div',
        { className: 'mainPage' },
        _react2.default.createElement(
          'section',
          { className: 'sustainability container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'sustainability-preheader' },
            this.props.t('mainPage.section1.subTitle')
          ),
          _react2.default.createElement(
            'div',
            { className: 'sustainability-header' },
            this.props.t('mainPage.section1.mainTitle')
          ),
          _react2.default.createElement('div', { className: 'sustainability-underline' }),
          _react2.default.createElement(
            'div',
            { className: 'sustainability-cards' },
            _react2.default.createElement(
              'div',
              { className: 'sustainability-card' },
              _react2.default.createElement('img', { loading: 'lazy', className: 'sustainability-img', src: '/images/container.svg' }),
              _react2.default.createElement(
                'div',
                { className: 'sustainability-card-title' },
                this.props.t('mainPage.section1.icon1')
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'sustainability-card' },
              _react2.default.createElement('img', { loading: 'lazy', className: 'sustainability-img', src: '/images/ecology.svg' }),
              _react2.default.createElement(
                'div',
                { className: 'sustainability-card-title' },
                this.props.t('mainPage.section1.icon2')
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'sustainability-card' },
              _react2.default.createElement('img', { loading: 'lazy', className: 'sustainability-img', src: '/images/guarantee.svg' }),
              _react2.default.createElement(
                'div',
                { className: 'sustainability-card-title' },
                this.props.t('mainPage.section1.icon3')
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'sustainability-card' },
              _react2.default.createElement('img', { loading: 'lazy', className: 'sustainability-img', src: '/images/free-delivery.svg' }),
              _react2.default.createElement(
                'div',
                { className: 'sustainability-card-title' },
                this.props.t('mainPage.section1.icon4')
              )
            )
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'produts container-fluid show-desktop' },
          _react2.default.createElement(
            'a',
            { className: 'products iphone-showcase hover-section col-md-3 common', style: { height: '514px', width: '30%' }, href: '/kaufen/smartphone/apple-iphone/filter' },
            _react2.default.createElement(
              'p',
              { className: 'title' },
              this.props.t('mainPage.section2.title1')
            ),
            _react2.default.createElement(
              'p',
              { className: 'link' },
              _react2.default.createElement(
                'a',
                null,
                this.props.t('mainPage.section2.linkText')
              ),
              ' >'
            ),
            _react2.default.createElement(
              'p',
              { className: 'iphoneImage' },
              _react2.default.createElement('img', { loading: 'lazy', className: 'd3-move-up', src: '/images/design/iphone12.png', alt: 'iPhone kaufen' }),
              _react2.default.createElement('div', { className: 'image-panel-mask-div' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'products col-md-5', style: { background: 'none' } },
            _react2.default.createElement(
              'div',
              { className: 'row second-section bg-grey hover-section', style: { width: '100%', marginLeft: 0, marginBottom: '20px' } },
              _react2.default.createElement(
                'a',
                { className: 'col-md-12 common', href: '/kaufen/macbook/filter', style: { height: '100%' } },
                _react2.default.createElement(
                  'p',
                  { className: 'title' },
                  this.props.t('mainPage.section2.title2')
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'link' },
                  _react2.default.createElement(
                    'a',
                    null,
                    this.props.t('mainPage.section2.linkText')
                  ),
                  ' >'
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'macbook' },
                  _react2.default.createElement('img', { loading: 'lazy', className: 'd3-move-up', src: '/images/design/macbook.png', alt: 'Macbook kaufen' })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row second-section second-row', style: { display: 'flex', width: '100%', marginLeft: 0 } },
              _react2.default.createElement(
                'a',
                { className: 'col-md-6 bg-grey  hover-section common', style: { marginLeft: 0 }, href: '/kaufen/smartphone/samsung-galaxy/filter' },
                _react2.default.createElement(
                  'p',
                  { className: 'title' },
                  this.props.t('mainPage.section2.title4')
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'link' },
                  _react2.default.createElement(
                    'a',
                    null,
                    this.props.t('mainPage.section2.linkText')
                  ),
                  ' >'
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'phones' },
                  _react2.default.createElement('img', { loading: 'lazy', className: 'd3-move-up', src: '/images/design/galaxy.png', alt: 'Samsung Galaxy online kaufen' }),
                  _react2.default.createElement('div', { className: 'image-panel-mask-div' })
                )
              ),
              _react2.default.createElement(
                'a',
                { className: 'col-md-6 bg-grey hover-section common', href: '/kaufen/zubeh%C3%B6r/audio/filter' },
                _react2.default.createElement(
                  'p',
                  { className: 'title' },
                  this.props.t('mainPage.section2.title5')
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'link' },
                  _react2.default.createElement(
                    'a',
                    null,
                    this.props.t('mainPage.section2.linkText')
                  ),
                  ' >'
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'accessory' },
                  _react2.default.createElement('img', { loading: 'lazy', className: 'd3-move-up', src: '/images/design/accessories1.png', alt: 'Zubeh\xF6r online kaufen' }),
                  _react2.default.createElement('div', { className: 'image-panel-mask-div' })
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'products col-md-3', style: { background: 'none', paddingLeft: 0 } },
            _react2.default.createElement(
              'div',
              { className: 'row second-section' },
              _react2.default.createElement(
                'a',
                { className: 'col-md-12  hover-section bg-grey common', style: { marginBottom: '20px', height: '247px' }, href: '/kaufen/tablet/filter' },
                _react2.default.createElement(
                  'p',
                  { className: 'title' },
                  this.props.t('mainPage.section2.title3')
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'link' },
                  _react2.default.createElement(
                    'a',
                    null,
                    this.props.t('mainPage.section2.linkText')
                  ),
                  ' >'
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'tablets' },
                  _react2.default.createElement('img', { loading: 'lazy', className: 'd3-move-up', src: '/images/design/tablet.png', alt: 'Tablets kaufen' }),
                  _react2.default.createElement('div', { className: 'image-panel-mask-div' })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row second-section' },
              _react2.default.createElement(
                'a',
                { className: 'col-md-12  hover-section bg-grey common', style: { height: '247px' }, href: '/kaufen/imac/filter' },
                _react2.default.createElement(
                  'p',
                  { className: 'title' },
                  this.props.t('mainPage.section2.title6')
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'link' },
                  _react2.default.createElement(
                    'a',
                    null,
                    this.props.t('mainPage.section2.linkText')
                  ),
                  ' >'
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'mac-mini' },
                  _react2.default.createElement('img', { loading: 'lazy', className: 'd3-move-up', src: '/images/design/mac-mini.png', alt: 'Mac-Computer kaufen' }),
                  _react2.default.createElement('div', { className: 'image-panel-mask-div' })
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'd-none container-fluid show-ipad' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-sm-6 hover-section' },
              _react2.default.createElement(
                'div',
                { className: 'products iphone-showcase col-md-3' },
                _react2.default.createElement(
                  'p',
                  { className: 'title' },
                  this.props.t('mainPage.section2.title1')
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'link' },
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    this.props.t('mainPage.section2.linkText')
                  ),
                  ' >'
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'iphoneImage' },
                  _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/iphone12.png', alt: 'iPhone kaufen' })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-6 pl-0' },
              _react2.default.createElement(
                'div',
                { className: 'row products tablet' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-12 hover-section' },
                  _react2.default.createElement(
                    'p',
                    { className: 'title' },
                    this.props.t('mainPage.section2.title3')
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: 'link' },
                    _react2.default.createElement(
                      'a',
                      { href: '#' },
                      this.props.t('mainPage.section2.linkText')
                    ),
                    ' >'
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: 'tablets' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/tablet.png', alt: 'Tablet / iPad kaufen' })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row products accessory' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-12 hover-section' },
                  _react2.default.createElement(
                    'p',
                    { className: 'title' },
                    this.props.t('mainPage.section2.title5')
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: 'link' },
                    _react2.default.createElement(
                      'a',
                      { href: '#' },
                      this.props.t('mainPage.section2.linkText')
                    ),
                    ' >'
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: 'accessorie' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/accessories1.png', alt: 'Zubeh\xF6r online kaufen' })
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'd-none container-fluid show-iMobile' },
          _react2.default.createElement(
            _reactOwlCarousel2.default,
            { items: 1, className: 'owl-theme' },
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 show-item' },
                  _react2.default.createElement(
                    'div',
                    { className: 'products iphone-showcase col-md-3' },
                    _react2.default.createElement(
                      'p',
                      { className: 'title' },
                      this.props.t('mainPage.section2.title1')
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'link' },
                      _react2.default.createElement(
                        'a',
                        { href: '#' },
                        this.props.t('mainPage.section2.linkText')
                      ),
                      ' >'
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'iphoneImage' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/iphone12.png', alt: 'iPhone kaufen' })
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 show-item' },
                  _react2.default.createElement(
                    'div',
                    { className: 'products iphone-showcase col-md-3' },
                    _react2.default.createElement(
                      'p',
                      { className: 'title' },
                      this.props.t('mainPage.section2.title2')
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'link' },
                      _react2.default.createElement(
                        'a',
                        { href: '#' },
                        this.props.t('mainPage.section2.linkText')
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'macbook' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/macbook.png', alt: 'Macbook kaufen' })
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 show-item' },
                  _react2.default.createElement(
                    'div',
                    { className: 'products iphone-showcase col-md-3' },
                    _react2.default.createElement(
                      'p',
                      { className: 'title' },
                      this.props.t('mainPage.section2.title4')
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'link' },
                      _react2.default.createElement(
                        'a',
                        { href: '#' },
                        this.props.t('mainPage.section2.linkText')
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'phones' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/galaxy.png', alt: 'Galaxy online kaufen' })
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 show-item' },
                  _react2.default.createElement(
                    'div',
                    { className: 'products iphone-showcase col-md-3' },
                    _react2.default.createElement(
                      'p',
                      { className: 'title' },
                      this.props.t('mainPage.section2.title5')
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'link' },
                      _react2.default.createElement(
                        'a',
                        { href: '#' },
                        this.props.t('mainPage.section2.linkText')
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'accessory' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/accessories1.png', alt: 'Zubeh\xF6r online kaufen' })
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 show-item' },
                  _react2.default.createElement(
                    'div',
                    { className: 'products iphone-showcase col-md-3' },
                    _react2.default.createElement(
                      'p',
                      { className: 'title' },
                      this.props.t('mainPage.section2.title3')
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'link' },
                      _react2.default.createElement(
                        'a',
                        { href: '#' },
                        this.props.t('mainPage.section2.linkText')
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'tablets' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/tablet.png', alt: 'Tablet / iPad kaufen' })
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'item' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 show-item' },
                  _react2.default.createElement(
                    'div',
                    { className: 'products iphone-showcase col-md-3' },
                    _react2.default.createElement(
                      'p',
                      { className: 'title' },
                      this.props.t('mainPage.section2.title6')
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'link' },
                      _react2.default.createElement(
                        'a',
                        { href: '#' },
                        this.props.t('mainPage.section2.linkText')
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'mac-mini' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/mac-mini.png', alt: 'Mac Computer kaufen' })
                    )
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'container titleContainer show-desktop show-ipad' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement('div', { className: 'col-lg-offset-0 col-sm-offset-1' }),
            _react2.default.createElement(
              'div',
              { className: 'col-lg-8 col-sm-5' },
              _react2.default.createElement(
                'p',
                { className: 'title' },
                this.props.t('mainPage.section2.bottomTitle')
              ),
              _react2.default.createElement(
                'p',
                { className: 'description' },
                this.props.t('mainPage.section2.bottomDesc')
              ),
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'btn btn-default section-button', style: { fontSize: '14px' } },
                this.props.t('mainPage.section2.bottomButtonText')
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-lg-4 col-sm-6' },
              _react2.default.createElement('img', { loading: 'lazy', className: 'titlerightimg', src: '/images/design/mob-tab.svg', alt: 'mob-tab' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'container title-mobile show-iMobile d-none' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs-12' },
              _react2.default.createElement(
                'p',
                { className: 'title' },
                this.props.t('mainPage.section2.bottomTitle')
              ),
              _react2.default.createElement('img', { loading: 'lazy', className: 'titlerightimg', src: '/images/design/mob-tab.png', width: '170', alt: 'mob-tab' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row title-mobile__bg' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs-12' },
              _react2.default.createElement(
                'p',
                { className: 'description' },
                this.props.t('mainPage.section2.bottomDesc')
              ),
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'btn btn-default section-button', style: { fontSize: '14px' } },
                this.props.t('mainPage.section2.bottomButtonText')
              )
            )
          )
        ),
        recommendations.length > 0 && _react2.default.createElement(
          'div',
          { className: 'container-fluid UnsereAuswahlf\xFCrdichsection' },
          _react2.default.createElement(
            'p',
            { className: 'firstpara' },
            'Das wird dir gefallen'
          ),
          _react2.default.createElement(
            'p',
            { className: 'secondpara' },
            'Unsere Auswahl f\xFCr dich '
          ),
          _react2.default.createElement(
            'div',
            { className: 'container-fluid card-carousel-section' },
            _react2.default.createElement(
              _reactOwlCarousel2.default,
              (0, _extends3.default)({ className: 'owl-theme' }, options),
              recommendations.map(function (item, i) {
                return _react2.default.createElement(
                  'div',
                  { className: 'item cardSec', key: 'cardSec-' + i },
                  _react2.default.createElement(
                    'div',
                    { className: 'row m-0' },
                    _react2.default.createElement(
                      'div',
                      { className: 'col-md-8 col-sm-8 col-xs-8 cardPara' },
                      _react2.default.createElement(
                        'p',
                        { className: 'cardParafi' },
                        item.model
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: 'cardParas' },
                        item.placeDescription
                      ),
                      item.discountPrice && _react2.default.createElement(
                        'p',
                        { className: 'cardParat' },
                        item.discountPrice,
                        ' CHF ',
                        _react2.default.createElement(
                          'span',
                          null,
                          (0, _helpersFunction.formatPrice)(item.price),
                          ' CHF'
                        ),
                        ' '
                      ),
                      item.discountPrice === false && _react2.default.createElement(
                        'p',
                        { className: 'cardParat' },
                        (0, _helpersFunction.formatPrice)(item.price),
                        ' CHF'
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: 'cardParaf' },
                        'ab ',
                        item.discountPrice ? (item.discountPrice / 12).toFixed(2) : (item.price / 12).toFixed(2),
                        ' CHF/Monat'
                      )
                    ),
                    item.discountPrice && _react2.default.createElement('div', { className: 'col-md-4 col-sm-4 col-xs-4 cardhanger' })
                  ),
                  _react2.default.createElement('img', { loading: 'lazy', className: 'cardBottomImage first-card-styling', src: item.deviceImages.mainImg.src, alt: 'mob-tab' })
                );
              })
            )
          )
        ),
        _react2.default.createElement(_numbers2.default, null),
        _react2.default.createElement(_whyWeAre2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'container-fluid howItWorks' },
          _react2.default.createElement(_howItWorks2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'container-fluid customersAboutUs' },
          _react2.default.createElement(_customerAboutUs2.default, null)
        ),
        domain === 'ch' || domain === 'loc' && _react2.default.createElement(
          'div',
          { className: 'container-fluid ourStores' },
          _react2.default.createElement(_ourStores2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'container-fluid banner-area' },
          _react2.default.createElement(_banner2.default, null)
        )
      );
    }
  }]);
  return MainPage;
}(_react.Component);

MainPage.propTypes = {};
MainPage.defaultProps = {};

exports.default = (0, _reactI18next.withTranslation)()(MainPage);


var TITLE_CH = 'ᐅ Smartphone, Tablet und Mac-Computer per Knopfdruck kaufen und verkaufen auf remarket.ch';
var TITLE_DE = 'Gebrauchte Smartphone, Tablets und Mac-Computer online kaufen und verkaufen';
var DESCRIPTION_CH = 'Verkaufen und kaufen Sie Ihr neues und gebrauchtes iPhone, Samsung Galaxy, iPad, Macbook und iMac zu fairen Preisen. Express Auszahlung auch in der Filiale Basel möglich.';
var DESCRIPTION_DE = 'Verkaufen und kaufen Sie neue und gebrauchte Tablets, Smartphones oder Macbooks schnell und unkompliziert auf remarket.de';
var FOOTER_SEO_CH = '<div>\n        <h1>iPhone, Samsung Galaxy, iPad, MacBook gebraucht kaufen und verkaufen per Knopfdruck.</h1>\n        <p>Viele elektronische Ger\xE4te wie <strong>Handys, Smartphones, Tablets oder Computer</strong> werden bereits nach kurzer Zeit der Nutzung durch neue Ger\xE4te ersetzt. Nicht selten landen die alten Ger\xE4te beim lokalen Entsorgungsbetrieb oder einfach in der Schublade oder im Schrank, sofern es sich um kleine Ger\xE4te wie beispielsweise <strong>Smartphones</strong> handelt. Dabei ist auch gebrauchte Elektronik noch sehr gefragt. Ger\xE4te wie das <strong>iPhone, iPad, ein Samsung Galaxy sowie tragbare Computer und Desktopcomputer</strong> k\xF6nnen durchaus noch einiges an Geld bringen, wenn sie \xFCber Shops wie unserem angeboten und verkauft werden. Viele Menschen k\xF6nnen sich neue Ger\xE4te namhafter Hersteller nicht leisten und greifen deshalb auf <strong>gebrauchte Ger\xE4te</strong> zur\xFCck. Anstatt nun eventuell defekte Ger\xE4te von Privatleuten ohne Garantie oder Sicherheit zu kaufen, sollten Sie gebrauchte und gepr\xFCfte <strong>Computer, Smartphones oder Tablets gebraucht und gepr\xFCft kaufen</strong>, die in zahlreichen Ausf\xFChrungen auf unserer Homepage erh\xE4ltlich sind. Die Ger\xE4te werden zu deutlich g\xFCnstigeren Preisen als den ehemaligen Neupreisen angeboten, so dass sich noch jede Menge Geld sparen l\xE4sst.</p>\n        <h2>Verkaufen Sie Ihre Elektronik, wenn Sie neue Ger\xE4te gekauft haben</h2>\n        <p>Anstatt Ihr nicht mehr ben\xF6tigtes Smartphone, Tablet oder ein Notebook im Schrank einstauben zu lassen, bieten Sie es doch einfach \xFCber unseren <strong>Onlineshop</strong> zum Verkauf an. Es funktioniert ganz einfach. Sie w\xE4hlen einfach den entsprechenden Ger\xE4tetyp wie beispielsweise Ihr <strong>iPhone, MacBook oder den Apple Mac mini</strong> aus und machen weitere Angaben zu den Ausstattungsmerkmalen und den Zustand des Ger\xE4tes. Innerhalb weniger Minuten und mit nur <strong>wenigen Klicks</strong> ist der aktuelle Preis f\xFCr das von Ihnen angebotene Ger\xE4t ermittelt. Sie wissen also sofort, was Sie bekommen. Einfacher geht es nicht. Der Versand ist auch unkompliziert, da Sie die Kosten daf\xFCr ersetzt bekommen. Wurde das Ger\xE4t durch uns \xFCberpr\xFCft, erhalten Sie Ihr <strong>Geld innerhalb k\xFCrzester Zeit</strong> ohne weitere Abz\xFCge.</p>\n        <h2>M\xF6chten Sie ein gebrauchtes Smartphone oder Notebook kaufen?</h2>\n        <p>Wenn Sie auf der Suche nach einem preisg\xFCnstigen <strong>iPhone, iPad, Samsung Galaxy</strong> oder einem anderen Mac-Computer sind, sollten Sie sich in unserem Onlineangebot umschauen. Sie bekommen zahlreiche Ger\xE4te namhafter Hersteller <strong>g\xFCnstig gebraucht und gepr\xFCft</strong>. Falls doch etwas nicht in Ordnung sein sollte, nutzen Sie einfach die einj\xE4hrige <strong>Garantie</strong>, die wir auf die Ger\xE4te aus unserem Angebot geben. Die Ger\xE4te werden <strong>versandkostenfrei</strong> an Sie geliefert.</p>\n    </div>';
var FOOTER_SEO_DE = '<div>\n        <h1>So einfach kaufen und verkaufen Sie gebrauchte Elektronik</h1>\n        <p>Der Handel mit gebrauchter Elektronik ist ein durchaus eintr\xE4gliches Gesch\xE4ft. <strong>Gebrauchte Elektronik</strong> ist sowohl bei den Verk\xE4ufern als auch bei den K\xE4ufern beliebt. Sicher besitzen Sie noch einige elektronische Ger\xE4te wie beispielsweise ein nicht mehr ben\xF6tigtes Tablet, ein Smartphone oder vielleicht sogar ein Macbook. Warum sollten diese Ger\xE4te in einer Schublade ihr Dasein fristen, wenn Sie diese ebenso zu Geld machen k\xF6nnten? Statt sich nun mit privaten K\xE4ufern herum zu \xE4rgern, <strong>verkaufen Sie Ihr iPhone, iPad, MacBook</strong> oder Ihre anderen Ger\xE4te einfach \xFCber unsere Homepage. Wir sind auf den <strong>An- und Verkauf gebrauchter Elektronik</strong> spezialisiert. Wir bieten Ihnen einen einfachen und unkomplizierten Ablauf des Ankaufs an. Ebenso sind wir Ihr Ansprechpartner, m\xF6chten Sie bares Geld sparen und auf gebrauchte Elektronik statt entsprechender Neuwaren zur\xFCckgreifen. Ihre Vorteile durch den Kauf gebrauchter Elektronik in unserem Onlineshop sind vielf\xE4ltig. Sie erhalten ausschlie\xDFlich <strong>gepr\xFCfte Ware</strong> statt eventuell defekte Ger\xE4te, wie diese h\xE4ufig von privaten Verk\xE4ufern unter Vorspiegelung falscher Tatsachen angeboten werden. Au\xDFerdem k\xF6nnen Sie sich jederzeit an uns wenden, sollte etwas mit Ihrer Lieferung nicht stimmen.</p>\n        <h2>Verkaufen Sie gebrauchte und nicht mehr ben\xF6tigte Elektronik</h2>\n        <p>Der Verkauf Ihrer gebrauchten Ger\xE4te \xFCber unsere Webseite ist sehr einfach f\xFCr Sie. Sie w\xE4hlen einfach das Ger\xE4t aus. Der sp\xE4tere Versand erfolgt selbstverst\xE4ndlich <strong>kostenfrei</strong> f\xFCr Sie. Nachdem Sie das entsprechende Ger\xE4t, beispielsweise ein <strong>iPhone</strong> oder Smartphone, ausgew\xE4hlt haben, w\xE4hlen Sie die Artikelmerkmale aus, die auf Ihr angebotenes Ger\xE4t am besten zutreffen. Die Berechnung des Verkaufspreises erfolgt mit nur wenigen Klicks, so dass Sie sofort wissen, was Ihr Ger\xE4t noch wert ist. \xDCber den Versand m\xFCssen Sie sich keine Sorgen machen, da dieser f\xFCr Sie <strong>gratis</strong> erfolgt. Auf Ihr Geld m\xFCssen Sie keineswegs lange warten. Die Zahlung des ermittelten Kaufbetrages erfolgt <strong>per Express</strong> und ohne weitere Abz\xFCge an Sie.</p>\n        <h2>Der Kauf gebrauchter und gepr\xFCfter Elektronik in unserem Onlineshop</h2>\n        <p>Sind Sie auf der Suche nach einem preisg\xFCnstigen und <strong>gebrauchten Smartphone, MacBook, iMac, iPad</strong>, einem anderen Tablet oder tragbaren Computer, so sind Sie hier ebenfalls gut aufgehoben. Sie erhalten <strong>gebrauchte und gepr\xFCfte Elektronik</strong>, auf die wir eine <strong>einj\xE4hrige Garantie</strong> geben. Sie gehen \xFCberhaupt kein Risiko ein, wenn Sie gebrauchte Elektronik \xFCber unseren Onlineshop kaufen. Der Versand erfolgt kostenlos, ebenso der R\xFCckversand, sollte wider Erwarten etwas nicht mit dem neu erworbenen Ger\xE4t stimmen.</p>\n    </div>';

/***/ }),

/***/ 802:
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ 856:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(871);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ 858:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(866);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),

/***/ 859:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(889);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(893);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(866);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ 863:
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(43);

/***/ }),

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(67)
  , core           = __webpack_require__(65)
  , LIBRARY        = __webpack_require__(318)
  , wksExt         = __webpack_require__(863)
  , defineProperty = __webpack_require__(110).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),

/***/ 866:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(877);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(879);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(326)
  , hiddenKeys = __webpack_require__(216).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(314)
  , createDesc     = __webpack_require__(152)
  , toIObject      = __webpack_require__(147)
  , toPrimitive    = __webpack_require__(319)
  , has            = __webpack_require__(112)
  , IE8_DOM_DEFINE = __webpack_require__(324)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(111) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(875), __esModule: true };

/***/ }),

/***/ 874:
/***/ (function(module, exports) {



/***/ }),

/***/ 875:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(876);
var $Object = __webpack_require__(65).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(146);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(111), 'Object', {defineProperty: __webpack_require__(110).f});

/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(878), __esModule: true };

/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(154);
__webpack_require__(213);
module.exports = __webpack_require__(863).f('iterator');

/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(880), __esModule: true };

/***/ }),

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(881);
__webpack_require__(874);
__webpack_require__(887);
__webpack_require__(888);
module.exports = __webpack_require__(65).Symbol;

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(67)
  , has            = __webpack_require__(112)
  , DESCRIPTORS    = __webpack_require__(111)
  , $export        = __webpack_require__(146)
  , redefine       = __webpack_require__(325)
  , META           = __webpack_require__(882).KEY
  , $fails         = __webpack_require__(151)
  , shared         = __webpack_require__(215)
  , setToStringTag = __webpack_require__(214)
  , uid            = __webpack_require__(208)
  , wks            = __webpack_require__(43)
  , wksExt         = __webpack_require__(863)
  , wksDefine      = __webpack_require__(864)
  , keyOf          = __webpack_require__(883)
  , enumKeys       = __webpack_require__(884)
  , isArray        = __webpack_require__(885)
  , anObject       = __webpack_require__(84)
  , toIObject      = __webpack_require__(147)
  , toPrimitive    = __webpack_require__(319)
  , createDesc     = __webpack_require__(152)
  , _create        = __webpack_require__(320)
  , gOPNExt        = __webpack_require__(886)
  , $GOPD          = __webpack_require__(868)
  , $DP            = __webpack_require__(110)
  , $keys          = __webpack_require__(207)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(867).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(314).f  = $propertyIsEnumerable;
  __webpack_require__(321).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(318)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(85)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(208)('meta')
  , isObject = __webpack_require__(150)
  , has      = __webpack_require__(112)
  , setDesc  = __webpack_require__(110).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(151)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(207)
  , toIObject = __webpack_require__(147);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(207)
  , gOPS    = __webpack_require__(321)
  , pIE     = __webpack_require__(314);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(212);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),

/***/ 886:
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(147)
  , gOPN      = __webpack_require__(867).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ 887:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(864)('asyncIterator');

/***/ }),

/***/ 888:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(864)('observable');

/***/ }),

/***/ 889:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(890), __esModule: true };

/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(891);
module.exports = __webpack_require__(65).Object.setPrototypeOf;

/***/ }),

/***/ 891:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(146);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(892).set});

/***/ }),

/***/ 892:
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(150)
  , anObject = __webpack_require__(84);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(211)(Function.call, __webpack_require__(868).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),

/***/ 893:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(894), __esModule: true };

/***/ }),

/***/ 894:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(895);
var $Object = __webpack_require__(65).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),

/***/ 895:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(146)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(320)});

/***/ }),

/***/ 898:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSpecKeys = exports.checkNavigable = exports.changeSlide = exports.canUseDOM = exports.canGoNext = void 0;
exports.clamp = clamp;
exports.swipeStart = exports.swipeMove = exports.swipeEnd = exports.slidesOnRight = exports.slidesOnLeft = exports.slideHandler = exports.siblingDirection = exports.safePreventDefault = exports.lazyStartIndex = exports.lazySlidesOnRight = exports.lazySlidesOnLeft = exports.lazyEndIndex = exports.keyHandler = exports.initializedState = exports.getWidth = exports.getTrackLeft = exports.getTrackCSS = exports.getTrackAnimateCSS = exports.getTotalSlides = exports.getSwipeDirection = exports.getSlideCount = exports.getRequiredLazySlides = exports.getPreClones = exports.getPostClones = exports.getOnDemandLazySlides = exports.getNavigableIndexes = exports.getHeight = exports.extractObject = void 0;

var _react = _interopRequireDefault(__webpack_require__(16));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function clamp(number, lowerBound, upperBound) {
  return Math.max(lowerBound, Math.min(number, upperBound));
}

var safePreventDefault = function safePreventDefault(event) {
  var passiveEvents = ["onTouchStart", "onTouchMove", "onWheel"];

  if (!passiveEvents.includes(event._reactName)) {
    event.preventDefault();
  }
};

exports.safePreventDefault = safePreventDefault;

var getOnDemandLazySlides = function getOnDemandLazySlides(spec) {
  var onDemandSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);

  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    if (spec.lazyLoadedList.indexOf(slideIndex) < 0) {
      onDemandSlides.push(slideIndex);
    }
  }

  return onDemandSlides;
}; // return list of slides that need to be present


exports.getOnDemandLazySlides = getOnDemandLazySlides;

var getRequiredLazySlides = function getRequiredLazySlides(spec) {
  var requiredSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);

  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    requiredSlides.push(slideIndex);
  }

  return requiredSlides;
}; // startIndex that needs to be present


exports.getRequiredLazySlides = getRequiredLazySlides;

var lazyStartIndex = function lazyStartIndex(spec) {
  return spec.currentSlide - lazySlidesOnLeft(spec);
};

exports.lazyStartIndex = lazyStartIndex;

var lazyEndIndex = function lazyEndIndex(spec) {
  return spec.currentSlide + lazySlidesOnRight(spec);
};

exports.lazyEndIndex = lazyEndIndex;

var lazySlidesOnLeft = function lazySlidesOnLeft(spec) {
  return spec.centerMode ? Math.floor(spec.slidesToShow / 2) + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : 0;
};

exports.lazySlidesOnLeft = lazySlidesOnLeft;

var lazySlidesOnRight = function lazySlidesOnRight(spec) {
  return spec.centerMode ? Math.floor((spec.slidesToShow - 1) / 2) + 1 + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : spec.slidesToShow;
}; // get width of an element


exports.lazySlidesOnRight = lazySlidesOnRight;

var getWidth = function getWidth(elem) {
  return elem && elem.offsetWidth || 0;
};

exports.getWidth = getWidth;

var getHeight = function getHeight(elem) {
  return elem && elem.offsetHeight || 0;
};

exports.getHeight = getHeight;

var getSwipeDirection = function getSwipeDirection(touchObject) {
  var verticalSwiping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var xDist, yDist, r, swipeAngle;
  xDist = touchObject.startX - touchObject.curX;
  yDist = touchObject.startY - touchObject.curY;
  r = Math.atan2(yDist, xDist);
  swipeAngle = Math.round(r * 180 / Math.PI);

  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle);
  }

  if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
    return "left";
  }

  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return "right";
  }

  if (verticalSwiping === true) {
    if (swipeAngle >= 35 && swipeAngle <= 135) {
      return "up";
    } else {
      return "down";
    }
  }

  return "vertical";
}; // whether or not we can go next


exports.getSwipeDirection = getSwipeDirection;

var canGoNext = function canGoNext(spec) {
  var canGo = true;

  if (!spec.infinite) {
    if (spec.centerMode && spec.currentSlide >= spec.slideCount - 1) {
      canGo = false;
    } else if (spec.slideCount <= spec.slidesToShow || spec.currentSlide >= spec.slideCount - spec.slidesToShow) {
      canGo = false;
    }
  }

  return canGo;
}; // given an object and a list of keys, return new object with given keys


exports.canGoNext = canGoNext;

var extractObject = function extractObject(spec, keys) {
  var newObject = {};
  keys.forEach(function (key) {
    return newObject[key] = spec[key];
  });
  return newObject;
}; // get initialized state


exports.extractObject = extractObject;

var initializedState = function initializedState(spec) {
  // spec also contains listRef, trackRef
  var slideCount = _react["default"].Children.count(spec.children);

  var listNode = spec.listRef;
  var listWidth = Math.ceil(getWidth(listNode));
  var trackNode = spec.trackRef && spec.trackRef.node;
  var trackWidth = Math.ceil(getWidth(trackNode));
  var slideWidth;

  if (!spec.vertical) {
    var centerPaddingAdj = spec.centerMode && parseInt(spec.centerPadding) * 2;

    if (typeof spec.centerPadding === "string" && spec.centerPadding.slice(-1) === "%") {
      centerPaddingAdj *= listWidth / 100;
    }

    slideWidth = Math.ceil((listWidth - centerPaddingAdj) / spec.slidesToShow);
  } else {
    slideWidth = listWidth;
  }

  var slideHeight = listNode && getHeight(listNode.querySelector('[data-index="0"]'));
  var listHeight = slideHeight * spec.slidesToShow;
  var currentSlide = spec.currentSlide === undefined ? spec.initialSlide : spec.currentSlide;

  if (spec.rtl && spec.currentSlide === undefined) {
    currentSlide = slideCount - 1 - spec.initialSlide;
  }

  var lazyLoadedList = spec.lazyLoadedList || [];
  var slidesToLoad = getOnDemandLazySlides(_objectSpread(_objectSpread({}, spec), {}, {
    currentSlide: currentSlide,
    lazyLoadedList: lazyLoadedList
  }));
  lazyLoadedList = lazyLoadedList.concat(slidesToLoad);
  var state = {
    slideCount: slideCount,
    slideWidth: slideWidth,
    listWidth: listWidth,
    trackWidth: trackWidth,
    currentSlide: currentSlide,
    slideHeight: slideHeight,
    listHeight: listHeight,
    lazyLoadedList: lazyLoadedList
  };

  if (spec.autoplaying === null && spec.autoplay) {
    state["autoplaying"] = "playing";
  }

  return state;
};

exports.initializedState = initializedState;

var slideHandler = function slideHandler(spec) {
  var waitForAnimate = spec.waitForAnimate,
      animating = spec.animating,
      fade = spec.fade,
      infinite = spec.infinite,
      index = spec.index,
      slideCount = spec.slideCount,
      lazyLoad = spec.lazyLoad,
      currentSlide = spec.currentSlide,
      centerMode = spec.centerMode,
      slidesToScroll = spec.slidesToScroll,
      slidesToShow = spec.slidesToShow,
      useCSS = spec.useCSS;
  var lazyLoadedList = spec.lazyLoadedList;
  if (waitForAnimate && animating) return {};
  var animationSlide = index,
      finalSlide,
      animationLeft,
      finalLeft;
  var state = {},
      nextState = {};
  var targetSlide = infinite ? index : clamp(index, 0, slideCount - 1);

  if (fade) {
    if (!infinite && (index < 0 || index >= slideCount)) return {};

    if (index < 0) {
      animationSlide = index + slideCount;
    } else if (index >= slideCount) {
      animationSlide = index - slideCount;
    }

    if (lazyLoad && lazyLoadedList.indexOf(animationSlide) < 0) {
      lazyLoadedList = lazyLoadedList.concat(animationSlide);
    }

    state = {
      animating: true,
      currentSlide: animationSlide,
      lazyLoadedList: lazyLoadedList,
      targetSlide: animationSlide
    };
    nextState = {
      animating: false,
      targetSlide: animationSlide
    };
  } else {
    finalSlide = animationSlide;

    if (animationSlide < 0) {
      finalSlide = animationSlide + slideCount;
      if (!infinite) finalSlide = 0;else if (slideCount % slidesToScroll !== 0) finalSlide = slideCount - slideCount % slidesToScroll;
    } else if (!canGoNext(spec) && animationSlide > currentSlide) {
      animationSlide = finalSlide = currentSlide;
    } else if (centerMode && animationSlide >= slideCount) {
      animationSlide = infinite ? slideCount : slideCount - 1;
      finalSlide = infinite ? 0 : slideCount - 1;
    } else if (animationSlide >= slideCount) {
      finalSlide = animationSlide - slideCount;
      if (!infinite) finalSlide = slideCount - slidesToShow;else if (slideCount % slidesToScroll !== 0) finalSlide = 0;
    }

    if (!infinite && animationSlide + slidesToShow >= slideCount) {
      finalSlide = slideCount - slidesToShow;
    }

    animationLeft = getTrackLeft(_objectSpread(_objectSpread({}, spec), {}, {
      slideIndex: animationSlide
    }));
    finalLeft = getTrackLeft(_objectSpread(_objectSpread({}, spec), {}, {
      slideIndex: finalSlide
    }));

    if (!infinite) {
      if (animationLeft === finalLeft) animationSlide = finalSlide;
      animationLeft = finalLeft;
    }

    if (lazyLoad) {
      lazyLoadedList = lazyLoadedList.concat(getOnDemandLazySlides(_objectSpread(_objectSpread({}, spec), {}, {
        currentSlide: animationSlide
      })));
    }

    if (!useCSS) {
      state = {
        currentSlide: finalSlide,
        trackStyle: getTrackCSS(_objectSpread(_objectSpread({}, spec), {}, {
          left: finalLeft
        })),
        lazyLoadedList: lazyLoadedList,
        targetSlide: targetSlide
      };
    } else {
      state = {
        animating: true,
        currentSlide: finalSlide,
        trackStyle: getTrackAnimateCSS(_objectSpread(_objectSpread({}, spec), {}, {
          left: animationLeft
        })),
        lazyLoadedList: lazyLoadedList,
        targetSlide: targetSlide
      };
      nextState = {
        animating: false,
        currentSlide: finalSlide,
        trackStyle: getTrackCSS(_objectSpread(_objectSpread({}, spec), {}, {
          left: finalLeft
        })),
        swipeLeft: null,
        targetSlide: targetSlide
      };
    }
  }

  return {
    state: state,
    nextState: nextState
  };
};

exports.slideHandler = slideHandler;

var changeSlide = function changeSlide(spec, options) {
  var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
  var slidesToScroll = spec.slidesToScroll,
      slidesToShow = spec.slidesToShow,
      slideCount = spec.slideCount,
      currentSlide = spec.currentSlide,
      previousTargetSlide = spec.targetSlide,
      lazyLoad = spec.lazyLoad,
      infinite = spec.infinite;
  unevenOffset = slideCount % slidesToScroll !== 0;
  indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;

  if (options.message === "previous") {
    slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
    targetSlide = currentSlide - slideOffset;

    if (lazyLoad && !infinite) {
      previousInt = currentSlide - slideOffset;
      targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
    }

    if (!infinite) {
      targetSlide = previousTargetSlide - slidesToScroll;
    }
  } else if (options.message === "next") {
    slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
    targetSlide = currentSlide + slideOffset;

    if (lazyLoad && !infinite) {
      targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
    }

    if (!infinite) {
      targetSlide = previousTargetSlide + slidesToScroll;
    }
  } else if (options.message === "dots") {
    // Click on dots
    targetSlide = options.index * options.slidesToScroll;
  } else if (options.message === "children") {
    // Click on the slides
    targetSlide = options.index;

    if (infinite) {
      var direction = siblingDirection(_objectSpread(_objectSpread({}, spec), {}, {
        targetSlide: targetSlide
      }));

      if (targetSlide > options.currentSlide && direction === "left") {
        targetSlide = targetSlide - slideCount;
      } else if (targetSlide < options.currentSlide && direction === "right") {
        targetSlide = targetSlide + slideCount;
      }
    }
  } else if (options.message === "index") {
    targetSlide = Number(options.index);
  }

  return targetSlide;
};

exports.changeSlide = changeSlide;

var keyHandler = function keyHandler(e, accessibility, rtl) {
  if (e.target.tagName.match("TEXTAREA|INPUT|SELECT") || !accessibility) return "";
  if (e.keyCode === 37) return rtl ? "next" : "previous";
  if (e.keyCode === 39) return rtl ? "previous" : "next";
  return "";
};

exports.keyHandler = keyHandler;

var swipeStart = function swipeStart(e, swipe, draggable) {
  e.target.tagName === "IMG" && safePreventDefault(e);
  if (!swipe || !draggable && e.type.indexOf("mouse") !== -1) return "";
  return {
    dragging: true,
    touchObject: {
      startX: e.touches ? e.touches[0].pageX : e.clientX,
      startY: e.touches ? e.touches[0].pageY : e.clientY,
      curX: e.touches ? e.touches[0].pageX : e.clientX,
      curY: e.touches ? e.touches[0].pageY : e.clientY
    }
  };
};

exports.swipeStart = swipeStart;

var swipeMove = function swipeMove(e, spec) {
  // spec also contains, trackRef and slideIndex
  var scrolling = spec.scrolling,
      animating = spec.animating,
      vertical = spec.vertical,
      swipeToSlide = spec.swipeToSlide,
      verticalSwiping = spec.verticalSwiping,
      rtl = spec.rtl,
      currentSlide = spec.currentSlide,
      edgeFriction = spec.edgeFriction,
      edgeDragged = spec.edgeDragged,
      onEdge = spec.onEdge,
      swiped = spec.swiped,
      swiping = spec.swiping,
      slideCount = spec.slideCount,
      slidesToScroll = spec.slidesToScroll,
      infinite = spec.infinite,
      touchObject = spec.touchObject,
      swipeEvent = spec.swipeEvent,
      listHeight = spec.listHeight,
      listWidth = spec.listWidth;
  if (scrolling) return;
  if (animating) return safePreventDefault(e);
  if (vertical && swipeToSlide && verticalSwiping) safePreventDefault(e);
  var swipeLeft,
      state = {};
  var curLeft = getTrackLeft(spec);
  touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
  touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
  touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));
  var verticalSwipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2)));

  if (!verticalSwiping && !swiping && verticalSwipeLength > 10) {
    return {
      scrolling: true
    };
  }

  if (verticalSwiping) touchObject.swipeLength = verticalSwipeLength;
  var positionOffset = (!rtl ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
  if (verticalSwiping) positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;
  var dotCount = Math.ceil(slideCount / slidesToScroll);
  var swipeDirection = getSwipeDirection(spec.touchObject, verticalSwiping);
  var touchSwipeLength = touchObject.swipeLength;

  if (!infinite) {
    if (currentSlide === 0 && (swipeDirection === "right" || swipeDirection === "down") || currentSlide + 1 >= dotCount && (swipeDirection === "left" || swipeDirection === "up") || !canGoNext(spec) && (swipeDirection === "left" || swipeDirection === "up")) {
      touchSwipeLength = touchObject.swipeLength * edgeFriction;

      if (edgeDragged === false && onEdge) {
        onEdge(swipeDirection);
        state["edgeDragged"] = true;
      }
    }
  }

  if (!swiped && swipeEvent) {
    swipeEvent(swipeDirection);
    state["swiped"] = true;
  }

  if (!vertical) {
    if (!rtl) {
      swipeLeft = curLeft + touchSwipeLength * positionOffset;
    } else {
      swipeLeft = curLeft - touchSwipeLength * positionOffset;
    }
  } else {
    swipeLeft = curLeft + touchSwipeLength * (listHeight / listWidth) * positionOffset;
  }

  if (verticalSwiping) {
    swipeLeft = curLeft + touchSwipeLength * positionOffset;
  }

  state = _objectSpread(_objectSpread({}, state), {}, {
    touchObject: touchObject,
    swipeLeft: swipeLeft,
    trackStyle: getTrackCSS(_objectSpread(_objectSpread({}, spec), {}, {
      left: swipeLeft
    }))
  });

  if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
    return state;
  }

  if (touchObject.swipeLength > 10) {
    state["swiping"] = true;
    safePreventDefault(e);
  }

  return state;
};

exports.swipeMove = swipeMove;

var swipeEnd = function swipeEnd(e, spec) {
  var dragging = spec.dragging,
      swipe = spec.swipe,
      touchObject = spec.touchObject,
      listWidth = spec.listWidth,
      touchThreshold = spec.touchThreshold,
      verticalSwiping = spec.verticalSwiping,
      listHeight = spec.listHeight,
      swipeToSlide = spec.swipeToSlide,
      scrolling = spec.scrolling,
      onSwipe = spec.onSwipe,
      targetSlide = spec.targetSlide,
      currentSlide = spec.currentSlide,
      infinite = spec.infinite;

  if (!dragging) {
    if (swipe) safePreventDefault(e);
    return {};
  }

  var minSwipe = verticalSwiping ? listHeight / touchThreshold : listWidth / touchThreshold;
  var swipeDirection = getSwipeDirection(touchObject, verticalSwiping); // reset the state of touch related state variables.

  var state = {
    dragging: false,
    edgeDragged: false,
    scrolling: false,
    swiping: false,
    swiped: false,
    swipeLeft: null,
    touchObject: {}
  };

  if (scrolling) {
    return state;
  }

  if (!touchObject.swipeLength) {
    return state;
  }

  if (touchObject.swipeLength > minSwipe) {
    safePreventDefault(e);

    if (onSwipe) {
      onSwipe(swipeDirection);
    }

    var slideCount, newSlide;
    var activeSlide = infinite ? currentSlide : targetSlide;

    switch (swipeDirection) {
      case "left":
      case "up":
        newSlide = activeSlide + getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 0;
        break;

      case "right":
      case "down":
        newSlide = activeSlide - getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 1;
        break;

      default:
        slideCount = activeSlide;
    }

    state["triggerSlideHandler"] = slideCount;
  } else {
    // Adjust the track back to it's original position.
    var currentLeft = getTrackLeft(spec);
    state["trackStyle"] = getTrackAnimateCSS(_objectSpread(_objectSpread({}, spec), {}, {
      left: currentLeft
    }));
  }

  return state;
};

exports.swipeEnd = swipeEnd;

var getNavigableIndexes = function getNavigableIndexes(spec) {
  var max = spec.infinite ? spec.slideCount * 2 : spec.slideCount;
  var breakpoint = spec.infinite ? spec.slidesToShow * -1 : 0;
  var counter = spec.infinite ? spec.slidesToShow * -1 : 0;
  var indexes = [];

  while (breakpoint < max) {
    indexes.push(breakpoint);
    breakpoint = counter + spec.slidesToScroll;
    counter += Math.min(spec.slidesToScroll, spec.slidesToShow);
  }

  return indexes;
};

exports.getNavigableIndexes = getNavigableIndexes;

var checkNavigable = function checkNavigable(spec, index) {
  var navigables = getNavigableIndexes(spec);
  var prevNavigable = 0;

  if (index > navigables[navigables.length - 1]) {
    index = navigables[navigables.length - 1];
  } else {
    for (var n in navigables) {
      if (index < navigables[n]) {
        index = prevNavigable;
        break;
      }

      prevNavigable = navigables[n];
    }
  }

  return index;
};

exports.checkNavigable = checkNavigable;

var getSlideCount = function getSlideCount(spec) {
  var centerOffset = spec.centerMode ? spec.slideWidth * Math.floor(spec.slidesToShow / 2) : 0;

  if (spec.swipeToSlide) {
    var swipedSlide;
    var slickList = spec.listRef;
    var slides = slickList.querySelectorAll && slickList.querySelectorAll(".slick-slide") || [];
    Array.from(slides).every(function (slide) {
      if (!spec.vertical) {
        if (slide.offsetLeft - centerOffset + getWidth(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      } else {
        if (slide.offsetTop + getHeight(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      }

      return true;
    });

    if (!swipedSlide) {
      return 0;
    }

    var currentIndex = spec.rtl === true ? spec.slideCount - spec.currentSlide : spec.currentSlide;
    var slidesTraversed = Math.abs(swipedSlide.dataset.index - currentIndex) || 1;
    return slidesTraversed;
  } else {
    return spec.slidesToScroll;
  }
};

exports.getSlideCount = getSlideCount;

var checkSpecKeys = function checkSpecKeys(spec, keysArray) {
  return keysArray.reduce(function (value, key) {
    return value && spec.hasOwnProperty(key);
  }, true) ? null : console.error("Keys Missing:", spec);
};

exports.checkSpecKeys = checkSpecKeys;

var getTrackCSS = function getTrackCSS(spec) {
  checkSpecKeys(spec, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth"]);
  var trackWidth, trackHeight;
  var trackChildren = spec.slideCount + 2 * spec.slidesToShow;

  if (!spec.vertical) {
    trackWidth = getTotalSlides(spec) * spec.slideWidth;
  } else {
    trackHeight = trackChildren * spec.slideHeight;
  }

  var style = {
    opacity: 1,
    transition: "",
    WebkitTransition: ""
  };

  if (spec.useTransform) {
    var WebkitTransform = !spec.vertical ? "translate3d(" + spec.left + "px, 0px, 0px)" : "translate3d(0px, " + spec.left + "px, 0px)";
    var transform = !spec.vertical ? "translate3d(" + spec.left + "px, 0px, 0px)" : "translate3d(0px, " + spec.left + "px, 0px)";
    var msTransform = !spec.vertical ? "translateX(" + spec.left + "px)" : "translateY(" + spec.left + "px)";
    style = _objectSpread(_objectSpread({}, style), {}, {
      WebkitTransform: WebkitTransform,
      transform: transform,
      msTransform: msTransform
    });
  } else {
    if (spec.vertical) {
      style["top"] = spec.left;
    } else {
      style["left"] = spec.left;
    }
  }

  if (spec.fade) style = {
    opacity: 1
  };
  if (trackWidth) style.width = trackWidth;
  if (trackHeight) style.height = trackHeight; // Fallback for IE8

  if (window && !window.addEventListener && window.attachEvent) {
    if (!spec.vertical) {
      style.marginLeft = spec.left + "px";
    } else {
      style.marginTop = spec.left + "px";
    }
  }

  return style;
};

exports.getTrackCSS = getTrackCSS;

var getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
  checkSpecKeys(spec, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth", "speed", "cssEase"]);
  var style = getTrackCSS(spec); // useCSS is true by default so it can be undefined

  if (spec.useTransform) {
    style.WebkitTransition = "-webkit-transform " + spec.speed + "ms " + spec.cssEase;
    style.transition = "transform " + spec.speed + "ms " + spec.cssEase;
  } else {
    if (spec.vertical) {
      style.transition = "top " + spec.speed + "ms " + spec.cssEase;
    } else {
      style.transition = "left " + spec.speed + "ms " + spec.cssEase;
    }
  }

  return style;
};

exports.getTrackAnimateCSS = getTrackAnimateCSS;

var getTrackLeft = function getTrackLeft(spec) {
  if (spec.unslick) {
    return 0;
  }

  checkSpecKeys(spec, ["slideIndex", "trackRef", "infinite", "centerMode", "slideCount", "slidesToShow", "slidesToScroll", "slideWidth", "listWidth", "variableWidth", "slideHeight"]);
  var slideIndex = spec.slideIndex,
      trackRef = spec.trackRef,
      infinite = spec.infinite,
      centerMode = spec.centerMode,
      slideCount = spec.slideCount,
      slidesToShow = spec.slidesToShow,
      slidesToScroll = spec.slidesToScroll,
      slideWidth = spec.slideWidth,
      listWidth = spec.listWidth,
      variableWidth = spec.variableWidth,
      slideHeight = spec.slideHeight,
      fade = spec.fade,
      vertical = spec.vertical;
  var slideOffset = 0;
  var targetLeft;
  var targetSlide;
  var verticalOffset = 0;

  if (fade || spec.slideCount === 1) {
    return 0;
  }

  var slidesToOffset = 0;

  if (infinite) {
    slidesToOffset = -getPreClones(spec); // bring active slide to the beginning of visual area
    // if next scroll doesn't have enough children, just reach till the end of original slides instead of shifting slidesToScroll children

    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = -(slideIndex > slideCount ? slidesToShow - (slideIndex - slideCount) : slideCount % slidesToScroll);
    } // shift current slide to center of the frame


    if (centerMode) {
      slidesToOffset += parseInt(slidesToShow / 2);
    }
  } else {
    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = slidesToShow - slideCount % slidesToScroll;
    }

    if (centerMode) {
      slidesToOffset = parseInt(slidesToShow / 2);
    }
  }

  slideOffset = slidesToOffset * slideWidth;
  verticalOffset = slidesToOffset * slideHeight;

  if (!vertical) {
    targetLeft = slideIndex * slideWidth * -1 + slideOffset;
  } else {
    targetLeft = slideIndex * slideHeight * -1 + verticalOffset;
  }

  if (variableWidth === true) {
    var targetSlideIndex;
    var trackElem = trackRef && trackRef.node;
    targetSlideIndex = slideIndex + getPreClones(spec);
    targetSlide = trackElem && trackElem.childNodes[targetSlideIndex];
    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;

    if (centerMode === true) {
      targetSlideIndex = infinite ? slideIndex + getPreClones(spec) : slideIndex;
      targetSlide = trackElem && trackElem.children[targetSlideIndex];
      targetLeft = 0;

      for (var slide = 0; slide < targetSlideIndex; slide++) {
        targetLeft -= trackElem && trackElem.children[slide] && trackElem.children[slide].offsetWidth;
      }

      targetLeft -= parseInt(spec.centerPadding);
      targetLeft += targetSlide && (listWidth - targetSlide.offsetWidth) / 2;
    }
  }

  return targetLeft;
};

exports.getTrackLeft = getTrackLeft;

var getPreClones = function getPreClones(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }

  if (spec.variableWidth) {
    return spec.slideCount;
  }

  return spec.slidesToShow + (spec.centerMode ? 1 : 0);
};

exports.getPreClones = getPreClones;

var getPostClones = function getPostClones(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }

  return spec.slideCount;
};

exports.getPostClones = getPostClones;

var getTotalSlides = function getTotalSlides(spec) {
  return spec.slideCount === 1 ? 1 : getPreClones(spec) + spec.slideCount + getPostClones(spec);
};

exports.getTotalSlides = getTotalSlides;

var siblingDirection = function siblingDirection(spec) {
  if (spec.targetSlide > spec.currentSlide) {
    if (spec.targetSlide > spec.currentSlide + slidesOnRight(spec)) {
      return "left";
    }

    return "right";
  } else {
    if (spec.targetSlide < spec.currentSlide - slidesOnLeft(spec)) {
      return "right";
    }

    return "left";
  }
};

exports.siblingDirection = siblingDirection;

var slidesOnRight = function slidesOnRight(_ref) {
  var slidesToShow = _ref.slidesToShow,
      centerMode = _ref.centerMode,
      rtl = _ref.rtl,
      centerPadding = _ref.centerPadding;

  // returns no of slides on the right of active slide
  if (centerMode) {
    var right = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) right += 1;
    if (rtl && slidesToShow % 2 === 0) right += 1;
    return right;
  }

  if (rtl) {
    return 0;
  }

  return slidesToShow - 1;
};

exports.slidesOnRight = slidesOnRight;

var slidesOnLeft = function slidesOnLeft(_ref2) {
  var slidesToShow = _ref2.slidesToShow,
      centerMode = _ref2.centerMode,
      rtl = _ref2.rtl,
      centerPadding = _ref2.centerPadding;

  // returns no of slides on the left of active slide
  if (centerMode) {
    var left = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) left += 1;
    if (!rtl && slidesToShow % 2 === 0) left += 1;
    return left;
  }

  if (rtl) {
    return slidesToShow - 1;
  }

  return 0;
};

exports.slidesOnLeft = slidesOnLeft;

var canUseDOM = function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
};

exports.canUseDOM = canUseDOM;

/***/ }),

/***/ 929:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slider = _interopRequireDefault(__webpack_require__(960));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _slider["default"];
exports["default"] = _default;

/***/ }),

/***/ 938:
/***/ (function(module, exports) {

/**
 * Helper function for iterating over a collection
 *
 * @param collection
 * @param fn
 */
function each(collection, fn) {
    var i      = 0,
        length = collection.length,
        cont;

    for(i; i < length; i++) {
        cont = fn(collection[i], i);
        if(cont === false) {
            break; //allow early exit
        }
    }
}

/**
 * Helper function for determining whether target object is an array
 *
 * @param target the object under test
 * @return {Boolean} true if array, false otherwise
 */
function isArray(target) {
    return Object.prototype.toString.apply(target) === '[object Array]';
}

/**
 * Helper function for determining whether target object is a function
 *
 * @param target the object under test
 * @return {Boolean} true if function, false otherwise
 */
function isFunction(target) {
    return typeof target === 'function';
}

module.exports = {
    isFunction : isFunction,
    isArray : isArray,
    each : each
};


/***/ }),

/***/ 941:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var cookieApi = exports.cookieApi = {
    getCookie: function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    setCookie: function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    },
    deleteCookie: function deleteCookie(name) {
        this.setCookie(name, "", {
            expires: -1
        });
    }
};

/***/ }),

/***/ 955:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(153)))

/***/ }),

/***/ 960:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(16));

var _innerSlider = __webpack_require__(961);

var _json2mq = _interopRequireDefault(__webpack_require__(339));

var _defaultProps = _interopRequireDefault(__webpack_require__(967));

var _innerSliderUtils = __webpack_require__(898);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var enquire = (0, _innerSliderUtils.canUseDOM)() && __webpack_require__(968);

var Slider = /*#__PURE__*/function (_React$Component) {
  _inherits(Slider, _React$Component);

  var _super = _createSuper(Slider);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "innerSliderRefHandler", function (ref) {
      return _this.innerSlider = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "slickPrev", function () {
      return _this.innerSlider.slickPrev();
    });

    _defineProperty(_assertThisInitialized(_this), "slickNext", function () {
      return _this.innerSlider.slickNext();
    });

    _defineProperty(_assertThisInitialized(_this), "slickGoTo", function (slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return _this.innerSlider.slickGoTo(slide, dontAnimate);
    });

    _defineProperty(_assertThisInitialized(_this), "slickPause", function () {
      return _this.innerSlider.pause("paused");
    });

    _defineProperty(_assertThisInitialized(_this), "slickPlay", function () {
      return _this.innerSlider.autoPlay("play");
    });

    _this.state = {
      breakpoint: null
    };
    _this._responsiveMediaHandlers = [];
    return _this;
  }

  _createClass(Slider, [{
    key: "media",
    value: function media(query, handler) {
      // javascript handler for  css media query
      enquire.register(query, handler);

      this._responsiveMediaHandlers.push({
        query: query,
        handler: handler
      });
    } // handles responsive breakpoints

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // performance monitoring
      //if (process.env.NODE_ENV !== 'production') {
      //const { whyDidYouUpdate } = require('why-did-you-update')
      //whyDidYouUpdate(React)
      //}
      if (this.props.responsive) {
        var breakpoints = this.props.responsive.map(function (breakpt) {
          return breakpt.breakpoint;
        }); // sort them in increasing order of their numerical value

        breakpoints.sort(function (x, y) {
          return x - y;
        });
        breakpoints.forEach(function (breakpoint, index) {
          // media query for each breakpoint
          var bQuery;

          if (index === 0) {
            bQuery = (0, _json2mq["default"])({
              minWidth: 0,
              maxWidth: breakpoint
            });
          } else {
            bQuery = (0, _json2mq["default"])({
              minWidth: breakpoints[index - 1] + 1,
              maxWidth: breakpoint
            });
          } // when not using server side rendering


          (0, _innerSliderUtils.canUseDOM)() && _this2.media(bQuery, function () {
            _this2.setState({
              breakpoint: breakpoint
            });
          });
        }); // Register media query for full screen. Need to support resize from small to large
        // convert javascript object to media query string

        var query = (0, _json2mq["default"])({
          minWidth: breakpoints.slice(-1)[0]
        });
        (0, _innerSliderUtils.canUseDOM)() && this.media(query, function () {
          _this2.setState({
            breakpoint: null
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._responsiveMediaHandlers.forEach(function (obj) {
        enquire.unregister(obj.query, obj.handler);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var settings;
      var newProps;

      if (this.state.breakpoint) {
        newProps = this.props.responsive.filter(function (resp) {
          return resp.breakpoint === _this3.state.breakpoint;
        });
        settings = newProps[0].settings === "unslick" ? "unslick" : _objectSpread(_objectSpread(_objectSpread({}, _defaultProps["default"]), this.props), newProps[0].settings);
      } else {
        settings = _objectSpread(_objectSpread({}, _defaultProps["default"]), this.props);
      } // force scrolling by one if centerMode is on


      if (settings.centerMode) {
        if (settings.slidesToScroll > 1 && "development" !== "production") {
          console.warn("slidesToScroll should be equal to 1 in centerMode, you are using ".concat(settings.slidesToScroll));
        }

        settings.slidesToScroll = 1;
      } // force showing one slide and scrolling by one if the fade mode is on


      if (settings.fade) {
        if (settings.slidesToShow > 1 && "development" !== "production") {
          console.warn("slidesToShow should be equal to 1 when fade is true, you're using ".concat(settings.slidesToShow));
        }

        if (settings.slidesToScroll > 1 && "development" !== "production") {
          console.warn("slidesToScroll should be equal to 1 when fade is true, you're using ".concat(settings.slidesToScroll));
        }

        settings.slidesToShow = 1;
        settings.slidesToScroll = 1;
      } // makes sure that children is an array, even when there is only 1 child


      var children = _react["default"].Children.toArray(this.props.children); // Children may contain false or null, so we should filter them
      // children may also contain string filled with spaces (in certain cases where we use jsx strings)


      children = children.filter(function (child) {
        if (typeof child === "string") {
          return !!child.trim();
        }

        return !!child;
      }); // rows and slidesPerRow logic is handled here

      if (settings.variableWidth && (settings.rows > 1 || settings.slidesPerRow > 1)) {
        console.warn("variableWidth is not supported in case of rows > 1 or slidesPerRow > 1");
        settings.variableWidth = false;
      }

      var newChildren = [];
      var currentWidth = null;

      for (var i = 0; i < children.length; i += settings.rows * settings.slidesPerRow) {
        var newSlide = [];

        for (var j = i; j < i + settings.rows * settings.slidesPerRow; j += settings.slidesPerRow) {
          var row = [];

          for (var k = j; k < j + settings.slidesPerRow; k += 1) {
            if (settings.variableWidth && children[k].props.style) {
              currentWidth = children[k].props.style.width;
            }

            if (k >= children.length) break;
            row.push( /*#__PURE__*/_react["default"].cloneElement(children[k], {
              key: 100 * i + 10 * j + k,
              tabIndex: -1,
              style: {
                width: "".concat(100 / settings.slidesPerRow, "%"),
                display: "inline-block"
              }
            }));
          }

          newSlide.push( /*#__PURE__*/_react["default"].createElement("div", {
            key: 10 * i + j
          }, row));
        }

        if (settings.variableWidth) {
          newChildren.push( /*#__PURE__*/_react["default"].createElement("div", {
            key: i,
            style: {
              width: currentWidth
            }
          }, newSlide));
        } else {
          newChildren.push( /*#__PURE__*/_react["default"].createElement("div", {
            key: i
          }, newSlide));
        }
      }

      if (settings === "unslick") {
        var className = "regular slider " + (this.props.className || "");
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: className
        }, children);
      } else if (newChildren.length <= settings.slidesToShow) {
        settings.unslick = true;
      }

      return /*#__PURE__*/_react["default"].createElement(_innerSlider.InnerSlider, _extends({
        style: this.props.style,
        ref: this.innerSliderRefHandler
      }, settings), newChildren);
    }
  }]);

  return Slider;
}(_react["default"].Component);

exports["default"] = Slider;

/***/ }),

/***/ 961:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnerSlider = void 0;

var _react = _interopRequireDefault(__webpack_require__(16));

var _initialState = _interopRequireDefault(__webpack_require__(962));

var _lodash = _interopRequireDefault(__webpack_require__(955));

var _classnames = _interopRequireDefault(__webpack_require__(869));

var _innerSliderUtils = __webpack_require__(898);

var _track = __webpack_require__(963);

var _dots = __webpack_require__(964);

var _arrows = __webpack_require__(965);

var _resizeObserverPolyfill = _interopRequireDefault(__webpack_require__(966));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InnerSlider = /*#__PURE__*/function (_React$Component) {
  _inherits(InnerSlider, _React$Component);

  var _super = _createSuper(InnerSlider);

  function InnerSlider(props) {
    var _this;

    _classCallCheck(this, InnerSlider);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "listRefHandler", function (ref) {
      return _this.list = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "trackRefHandler", function (ref) {
      return _this.track = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "adaptHeight", function () {
      if (_this.props.adaptiveHeight && _this.list) {
        var elem = _this.list.querySelector("[data-index=\"".concat(_this.state.currentSlide, "\"]"));

        _this.list.style.height = (0, _innerSliderUtils.getHeight)(elem) + "px";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.props.onInit && _this.props.onInit();

      if (_this.props.lazyLoad) {
        var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_objectSpread(_objectSpread({}, _this.props), _this.state));

        if (slidesToLoad.length > 0) {
          _this.setState(function (prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });

          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      }

      var spec = _objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props);

      _this.updateState(spec, true, function () {
        _this.adaptHeight();

        _this.props.autoplay && _this.autoPlay("update");
      });

      if (_this.props.lazyLoad === "progressive") {
        _this.lazyLoadTimer = setInterval(_this.progressiveLazyLoad, 1000);
      }

      _this.ro = new _resizeObserverPolyfill["default"](function () {
        if (_this.state.animating) {
          _this.onWindowResized(false); // don't set trackStyle hence don't break animation


          _this.callbackTimers.push(setTimeout(function () {
            return _this.onWindowResized();
          }, _this.props.speed));
        } else {
          _this.onWindowResized();
        }
      });

      _this.ro.observe(_this.list);

      document.querySelectorAll && Array.prototype.forEach.call(document.querySelectorAll(".slick-slide"), function (slide) {
        slide.onfocus = _this.props.pauseOnFocus ? _this.onSlideFocus : null;
        slide.onblur = _this.props.pauseOnFocus ? _this.onSlideBlur : null;
      });

      if (window.addEventListener) {
        window.addEventListener("resize", _this.onWindowResized);
      } else {
        window.attachEvent("onresize", _this.onWindowResized);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      if (_this.animationEndCallback) {
        clearTimeout(_this.animationEndCallback);
      }

      if (_this.lazyLoadTimer) {
        clearInterval(_this.lazyLoadTimer);
      }

      if (_this.callbackTimers.length) {
        _this.callbackTimers.forEach(function (timer) {
          return clearTimeout(timer);
        });

        _this.callbackTimers = [];
      }

      if (window.addEventListener) {
        window.removeEventListener("resize", _this.onWindowResized);
      } else {
        window.detachEvent("onresize", _this.onWindowResized);
      }

      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }

      _this.ro.disconnect();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      _this.checkImagesLoad();

      _this.props.onReInit && _this.props.onReInit();

      if (_this.props.lazyLoad) {
        var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_objectSpread(_objectSpread({}, _this.props), _this.state));

        if (slidesToLoad.length > 0) {
          _this.setState(function (prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });

          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      } // if (this.props.onLazyLoad) {
      //   this.props.onLazyLoad([leftMostSlide])
      // }


      _this.adaptHeight();

      var spec = _objectSpread(_objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props), _this.state);

      var setTrackStyle = _this.didPropsChange(prevProps);

      setTrackStyle && _this.updateState(spec, setTrackStyle, function () {
        if (_this.state.currentSlide >= _react["default"].Children.count(_this.props.children)) {
          _this.changeSlide({
            message: "index",
            index: _react["default"].Children.count(_this.props.children) - _this.props.slidesToShow,
            currentSlide: _this.state.currentSlide
          });
        }

        if (_this.props.autoplay) {
          _this.autoPlay("update");
        } else {
          _this.pause("paused");
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onWindowResized", function (setTrackStyle) {
      if (_this.debouncedResize) _this.debouncedResize.cancel();
      _this.debouncedResize = (0, _lodash["default"])(function () {
        return _this.resizeWindow(setTrackStyle);
      }, 50);

      _this.debouncedResize();
    });

    _defineProperty(_assertThisInitialized(_this), "resizeWindow", function () {
      var setTrackStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var isTrackMounted = Boolean(_this.track && _this.track.node); // prevent warning: setting state on unmounted component (server side rendering)

      if (!isTrackMounted) return;

      var spec = _objectSpread(_objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props), _this.state);

      _this.updateState(spec, setTrackStyle, function () {
        if (_this.props.autoplay) _this.autoPlay("update");else _this.pause("paused");
      }); // animating state should be cleared while resizing, otherwise autoplay stops working


      _this.setState({
        animating: false
      });

      clearTimeout(_this.animationEndCallback);
      delete _this.animationEndCallback;
    });

    _defineProperty(_assertThisInitialized(_this), "updateState", function (spec, setTrackStyle, callback) {
      var updatedState = (0, _innerSliderUtils.initializedState)(spec);
      spec = _objectSpread(_objectSpread(_objectSpread({}, spec), updatedState), {}, {
        slideIndex: updatedState.currentSlide
      });
      var targetLeft = (0, _innerSliderUtils.getTrackLeft)(spec);
      spec = _objectSpread(_objectSpread({}, spec), {}, {
        left: targetLeft
      });
      var trackStyle = (0, _innerSliderUtils.getTrackCSS)(spec);

      if (setTrackStyle || _react["default"].Children.count(_this.props.children) !== _react["default"].Children.count(spec.children)) {
        updatedState["trackStyle"] = trackStyle;
      }

      _this.setState(updatedState, callback);
    });

    _defineProperty(_assertThisInitialized(_this), "ssrInit", function () {
      if (_this.props.variableWidth) {
        var _trackWidth = 0,
            _trackLeft = 0;
        var childrenWidths = [];
        var preClones = (0, _innerSliderUtils.getPreClones)(_objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
          slideCount: _this.props.children.length
        }));
        var postClones = (0, _innerSliderUtils.getPostClones)(_objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
          slideCount: _this.props.children.length
        }));

        _this.props.children.forEach(function (child) {
          childrenWidths.push(child.props.style.width);
          _trackWidth += child.props.style.width;
        });

        for (var i = 0; i < preClones; i++) {
          _trackLeft += childrenWidths[childrenWidths.length - 1 - i];
          _trackWidth += childrenWidths[childrenWidths.length - 1 - i];
        }

        for (var _i = 0; _i < postClones; _i++) {
          _trackWidth += childrenWidths[_i];
        }

        for (var _i2 = 0; _i2 < _this.state.currentSlide; _i2++) {
          _trackLeft += childrenWidths[_i2];
        }

        var _trackStyle = {
          width: _trackWidth + "px",
          left: -_trackLeft + "px"
        };

        if (_this.props.centerMode) {
          var currentWidth = "".concat(childrenWidths[_this.state.currentSlide], "px");
          _trackStyle.left = "calc(".concat(_trackStyle.left, " + (100% - ").concat(currentWidth, ") / 2 ) ");
        }

        return {
          trackStyle: _trackStyle
        };
      }

      var childrenCount = _react["default"].Children.count(_this.props.children);

      var spec = _objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
        slideCount: childrenCount
      });

      var slideCount = (0, _innerSliderUtils.getPreClones)(spec) + (0, _innerSliderUtils.getPostClones)(spec) + childrenCount;
      var trackWidth = 100 / _this.props.slidesToShow * slideCount;
      var slideWidth = 100 / slideCount;
      var trackLeft = -slideWidth * ((0, _innerSliderUtils.getPreClones)(spec) + _this.state.currentSlide) * trackWidth / 100;

      if (_this.props.centerMode) {
        trackLeft += (100 - slideWidth * trackWidth / 100) / 2;
      }

      var trackStyle = {
        width: trackWidth + "%",
        left: trackLeft + "%"
      };
      return {
        slideWidth: slideWidth + "%",
        trackStyle: trackStyle
      };
    });

    _defineProperty(_assertThisInitialized(_this), "checkImagesLoad", function () {
      var images = _this.list && _this.list.querySelectorAll && _this.list.querySelectorAll(".slick-slide img") || [];
      var imagesCount = images.length,
          loadedCount = 0;
      Array.prototype.forEach.call(images, function (image) {
        var handler = function handler() {
          return ++loadedCount && loadedCount >= imagesCount && _this.onWindowResized();
        };

        if (!image.onclick) {
          image.onclick = function () {
            return image.parentNode.focus();
          };
        } else {
          var prevClickHandler = image.onclick;

          image.onclick = function () {
            prevClickHandler();
            image.parentNode.focus();
          };
        }

        if (!image.onload) {
          if (_this.props.lazyLoad) {
            image.onload = function () {
              _this.adaptHeight();

              _this.callbackTimers.push(setTimeout(_this.onWindowResized, _this.props.speed));
            };
          } else {
            image.onload = handler;

            image.onerror = function () {
              handler();
              _this.props.onLazyLoadError && _this.props.onLazyLoadError();
            };
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "progressiveLazyLoad", function () {
      var slidesToLoad = [];

      var spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      for (var index = _this.state.currentSlide; index < _this.state.slideCount + (0, _innerSliderUtils.getPostClones)(spec); index++) {
        if (_this.state.lazyLoadedList.indexOf(index) < 0) {
          slidesToLoad.push(index);
          break;
        }
      }

      for (var _index = _this.state.currentSlide - 1; _index >= -(0, _innerSliderUtils.getPreClones)(spec); _index--) {
        if (_this.state.lazyLoadedList.indexOf(_index) < 0) {
          slidesToLoad.push(_index);
          break;
        }
      }

      if (slidesToLoad.length > 0) {
        _this.setState(function (state) {
          return {
            lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad)
          };
        });

        if (_this.props.onLazyLoad) {
          _this.props.onLazyLoad(slidesToLoad);
        }
      } else {
        if (_this.lazyLoadTimer) {
          clearInterval(_this.lazyLoadTimer);
          delete _this.lazyLoadTimer;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "slideHandler", function (index) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$props = _this.props,
          asNavFor = _this$props.asNavFor,
          beforeChange = _this$props.beforeChange,
          onLazyLoad = _this$props.onLazyLoad,
          speed = _this$props.speed,
          afterChange = _this$props.afterChange; // capture currentslide before state is updated

      var currentSlide = _this.state.currentSlide;

      var _slideHandler = (0, _innerSliderUtils.slideHandler)(_objectSpread(_objectSpread(_objectSpread({
        index: index
      }, _this.props), _this.state), {}, {
        trackRef: _this.track,
        useCSS: _this.props.useCSS && !dontAnimate
      })),
          state = _slideHandler.state,
          nextState = _slideHandler.nextState;

      if (!state) return;
      beforeChange && beforeChange(currentSlide, state.currentSlide);
      var slidesToLoad = state.lazyLoadedList.filter(function (value) {
        return _this.state.lazyLoadedList.indexOf(value) < 0;
      });
      onLazyLoad && slidesToLoad.length > 0 && onLazyLoad(slidesToLoad);

      if (!_this.props.waitForAnimate && _this.animationEndCallback) {
        clearTimeout(_this.animationEndCallback);
        afterChange && afterChange(currentSlide);
        delete _this.animationEndCallback;
      }

      _this.setState(state, function () {
        // asNavForIndex check is to avoid recursive calls of slideHandler in waitForAnimate=false mode
        if (asNavFor && _this.asNavForIndex !== index) {
          _this.asNavForIndex = index;
          asNavFor.innerSlider.slideHandler(index);
        }

        if (!nextState) return;
        _this.animationEndCallback = setTimeout(function () {
          var animating = nextState.animating,
              firstBatch = _objectWithoutProperties(nextState, ["animating"]);

          _this.setState(firstBatch, function () {
            _this.callbackTimers.push(setTimeout(function () {
              return _this.setState({
                animating: animating
              });
            }, 10));

            afterChange && afterChange(state.currentSlide);
            delete _this.animationEndCallback;
          });
        }, speed);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeSlide", function (options) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      var targetSlide = (0, _innerSliderUtils.changeSlide)(spec, options);
      if (targetSlide !== 0 && !targetSlide) return;

      if (dontAnimate === true) {
        _this.slideHandler(targetSlide, dontAnimate);
      } else {
        _this.slideHandler(targetSlide);
      }

      _this.props.autoplay && _this.autoPlay("update");

      if (_this.props.focusOnSelect) {
        var nodes = _this.list.querySelectorAll(".slick-current");

        nodes[0] && nodes[0].focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (e) {
      if (_this.clickable === false) {
        e.stopPropagation();
        e.preventDefault();
      }

      _this.clickable = true;
    });

    _defineProperty(_assertThisInitialized(_this), "keyHandler", function (e) {
      var dir = (0, _innerSliderUtils.keyHandler)(e, _this.props.accessibility, _this.props.rtl);
      dir !== "" && _this.changeSlide({
        message: dir
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectHandler", function (options) {
      _this.changeSlide(options);
    });

    _defineProperty(_assertThisInitialized(_this), "disableBodyScroll", function () {
      var preventDefault = function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
      };

      window.ontouchmove = preventDefault;
    });

    _defineProperty(_assertThisInitialized(_this), "enableBodyScroll", function () {
      window.ontouchmove = null;
    });

    _defineProperty(_assertThisInitialized(_this), "swipeStart", function (e) {
      if (_this.props.verticalSwiping) {
        _this.disableBodyScroll();
      }

      var state = (0, _innerSliderUtils.swipeStart)(e, _this.props.swipe, _this.props.draggable);
      state !== "" && _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), "swipeMove", function (e) {
      var state = (0, _innerSliderUtils.swipeMove)(e, _objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;

      if (state["swiping"]) {
        _this.clickable = false;
      }

      _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), "swipeEnd", function (e) {
      var state = (0, _innerSliderUtils.swipeEnd)(e, _objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;
      var triggerSlideHandler = state["triggerSlideHandler"];
      delete state["triggerSlideHandler"];

      _this.setState(state);

      if (triggerSlideHandler === undefined) return;

      _this.slideHandler(triggerSlideHandler);

      if (_this.props.verticalSwiping) {
        _this.enableBodyScroll();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "touchEnd", function (e) {
      _this.swipeEnd(e);

      _this.clickable = true;
    });

    _defineProperty(_assertThisInitialized(_this), "slickPrev", function () {
      // this and fellow methods are wrapped in setTimeout
      // to make sure initialize setState has happened before
      // any of such methods are called
      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: "previous"
        });
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), "slickNext", function () {
      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: "next"
        });
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), "slickGoTo", function (slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      slide = Number(slide);
      if (isNaN(slide)) return "";

      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: "index",
          index: slide,
          currentSlide: _this.state.currentSlide
        }, dontAnimate);
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      var nextIndex;

      if (_this.props.rtl) {
        nextIndex = _this.state.currentSlide - _this.props.slidesToScroll;
      } else {
        if ((0, _innerSliderUtils.canGoNext)(_objectSpread(_objectSpread({}, _this.props), _this.state))) {
          nextIndex = _this.state.currentSlide + _this.props.slidesToScroll;
        } else {
          return false;
        }
      }

      _this.slideHandler(nextIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "autoPlay", function (playType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }

      var autoplaying = _this.state.autoplaying;

      if (playType === "update") {
        if (autoplaying === "hovered" || autoplaying === "focused" || autoplaying === "paused") {
          return;
        }
      } else if (playType === "leave") {
        if (autoplaying === "paused" || autoplaying === "focused") {
          return;
        }
      } else if (playType === "blur") {
        if (autoplaying === "paused" || autoplaying === "hovered") {
          return;
        }
      }

      _this.autoplayTimer = setInterval(_this.play, _this.props.autoplaySpeed + 50);

      _this.setState({
        autoplaying: "playing"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pause", function (pauseType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
        _this.autoplayTimer = null;
      }

      var autoplaying = _this.state.autoplaying;

      if (pauseType === "paused") {
        _this.setState({
          autoplaying: "paused"
        });
      } else if (pauseType === "focused") {
        if (autoplaying === "hovered" || autoplaying === "playing") {
          _this.setState({
            autoplaying: "focused"
          });
        }
      } else {
        // pauseType  is 'hovered'
        if (autoplaying === "playing") {
          _this.setState({
            autoplaying: "hovered"
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDotsOver", function () {
      return _this.props.autoplay && _this.pause("hovered");
    });

    _defineProperty(_assertThisInitialized(_this), "onDotsLeave", function () {
      return _this.props.autoplay && _this.state.autoplaying === "hovered" && _this.autoPlay("leave");
    });

    _defineProperty(_assertThisInitialized(_this), "onTrackOver", function () {
      return _this.props.autoplay && _this.pause("hovered");
    });

    _defineProperty(_assertThisInitialized(_this), "onTrackLeave", function () {
      return _this.props.autoplay && _this.state.autoplaying === "hovered" && _this.autoPlay("leave");
    });

    _defineProperty(_assertThisInitialized(_this), "onSlideFocus", function () {
      return _this.props.autoplay && _this.pause("focused");
    });

    _defineProperty(_assertThisInitialized(_this), "onSlideBlur", function () {
      return _this.props.autoplay && _this.state.autoplaying === "focused" && _this.autoPlay("blur");
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var className = (0, _classnames["default"])("slick-slider", _this.props.className, {
        "slick-vertical": _this.props.vertical,
        "slick-initialized": true
      });

      var spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      var trackProps = (0, _innerSliderUtils.extractObject)(spec, ["fade", "cssEase", "speed", "infinite", "centerMode", "focusOnSelect", "currentSlide", "lazyLoad", "lazyLoadedList", "rtl", "slideWidth", "slideHeight", "listHeight", "vertical", "slidesToShow", "slidesToScroll", "slideCount", "trackStyle", "variableWidth", "unslick", "centerPadding", "targetSlide", "useCSS"]);
      var pauseOnHover = _this.props.pauseOnHover;
      trackProps = _objectSpread(_objectSpread({}, trackProps), {}, {
        onMouseEnter: pauseOnHover ? _this.onTrackOver : null,
        onMouseLeave: pauseOnHover ? _this.onTrackLeave : null,
        onMouseOver: pauseOnHover ? _this.onTrackOver : null,
        focusOnSelect: _this.props.focusOnSelect && _this.clickable ? _this.selectHandler : null
      });
      var dots;

      if (_this.props.dots === true && _this.state.slideCount >= _this.props.slidesToShow) {
        var dotProps = (0, _innerSliderUtils.extractObject)(spec, ["dotsClass", "slideCount", "slidesToShow", "currentSlide", "slidesToScroll", "clickHandler", "children", "customPaging", "infinite", "appendDots"]);
        var pauseOnDotsHover = _this.props.pauseOnDotsHover;
        dotProps = _objectSpread(_objectSpread({}, dotProps), {}, {
          clickHandler: _this.changeSlide,
          onMouseEnter: pauseOnDotsHover ? _this.onDotsLeave : null,
          onMouseOver: pauseOnDotsHover ? _this.onDotsOver : null,
          onMouseLeave: pauseOnDotsHover ? _this.onDotsLeave : null
        });
        dots = /*#__PURE__*/_react["default"].createElement(_dots.Dots, dotProps);
      }

      var prevArrow, nextArrow;
      var arrowProps = (0, _innerSliderUtils.extractObject)(spec, ["infinite", "centerMode", "currentSlide", "slideCount", "slidesToShow", "prevArrow", "nextArrow"]);
      arrowProps.clickHandler = _this.changeSlide;

      if (_this.props.arrows) {
        prevArrow = /*#__PURE__*/_react["default"].createElement(_arrows.PrevArrow, arrowProps);
        nextArrow = /*#__PURE__*/_react["default"].createElement(_arrows.NextArrow, arrowProps);
      }

      var verticalHeightStyle = null;

      if (_this.props.vertical) {
        verticalHeightStyle = {
          height: _this.state.listHeight
        };
      }

      var centerPaddingStyle = null;

      if (_this.props.vertical === false) {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: "0px " + _this.props.centerPadding
          };
        }
      } else {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: _this.props.centerPadding + " 0px"
          };
        }
      }

      var listStyle = _objectSpread(_objectSpread({}, verticalHeightStyle), centerPaddingStyle);

      var touchMove = _this.props.touchMove;
      var listProps = {
        className: "slick-list",
        style: listStyle,
        onClick: _this.clickHandler,
        onMouseDown: touchMove ? _this.swipeStart : null,
        onMouseMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onMouseUp: touchMove ? _this.swipeEnd : null,
        onMouseLeave: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onTouchStart: touchMove ? _this.swipeStart : null,
        onTouchMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onTouchEnd: touchMove ? _this.touchEnd : null,
        onTouchCancel: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onKeyDown: _this.props.accessibility ? _this.keyHandler : null
      };
      var innerSliderProps = {
        className: className,
        dir: "ltr",
        style: _this.props.style
      };

      if (_this.props.unslick) {
        listProps = {
          className: "slick-list"
        };
        innerSliderProps = {
          className: className
        };
      }

      return /*#__PURE__*/_react["default"].createElement("div", innerSliderProps, !_this.props.unslick ? prevArrow : "", /*#__PURE__*/_react["default"].createElement("div", _extends({
        ref: _this.listRefHandler
      }, listProps), /*#__PURE__*/_react["default"].createElement(_track.Track, _extends({
        ref: _this.trackRefHandler
      }, trackProps), _this.props.children)), !_this.props.unslick ? nextArrow : "", !_this.props.unslick ? dots : "");
    });

    _this.list = null;
    _this.track = null;
    _this.state = _objectSpread(_objectSpread({}, _initialState["default"]), {}, {
      currentSlide: _this.props.initialSlide,
      slideCount: _react["default"].Children.count(_this.props.children)
    });
    _this.callbackTimers = [];
    _this.clickable = true;
    _this.debouncedResize = null;

    var ssrState = _this.ssrInit();

    _this.state = _objectSpread(_objectSpread({}, _this.state), ssrState);
    return _this;
  }

  _createClass(InnerSlider, [{
    key: "didPropsChange",
    value: function didPropsChange(prevProps) {
      var setTrackStyle = false;

      for (var _i3 = 0, _Object$keys = Object.keys(this.props); _i3 < _Object$keys.length; _i3++) {
        var key = _Object$keys[_i3];

        if (!prevProps.hasOwnProperty(key)) {
          setTrackStyle = true;
          break;
        }

        if (_typeof(prevProps[key]) === "object" || typeof prevProps[key] === "function") {
          continue;
        }

        if (prevProps[key] !== this.props[key]) {
          setTrackStyle = true;
          break;
        }
      }

      return setTrackStyle || _react["default"].Children.count(this.props.children) !== _react["default"].Children.count(prevProps.children);
    }
  }]);

  return InnerSlider;
}(_react["default"].Component);

exports.InnerSlider = InnerSlider;

/***/ }),

/***/ 962:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var initialState = {
  animating: false,
  autoplaying: null,
  currentDirection: 0,
  currentLeft: null,
  currentSlide: 0,
  direction: 1,
  dragging: false,
  edgeDragged: false,
  initialized: false,
  lazyLoadedList: [],
  listHeight: null,
  listWidth: null,
  scrolling: false,
  slideCount: null,
  slideHeight: null,
  slideWidth: null,
  swipeLeft: null,
  swiped: false,
  // used by swipeEvent. differentites between touch and swipe.
  swiping: false,
  touchObject: {
    startX: 0,
    startY: 0,
    curX: 0,
    curY: 0
  },
  trackStyle: {},
  trackWidth: 0,
  targetSlide: 0
};
var _default = initialState;
exports["default"] = _default;

/***/ }),

/***/ 963:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Track = void 0;

var _react = _interopRequireDefault(__webpack_require__(16));

var _classnames = _interopRequireDefault(__webpack_require__(869));

var _innerSliderUtils = __webpack_require__(898);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// given specifications/props for a slide, fetch all the classes that need to be applied to the slide
var getSlideClasses = function getSlideClasses(spec) {
  var slickActive, slickCenter, slickCloned;
  var centerOffset, index;

  if (spec.rtl) {
    index = spec.slideCount - 1 - spec.index;
  } else {
    index = spec.index;
  }

  slickCloned = index < 0 || index >= spec.slideCount;

  if (spec.centerMode) {
    centerOffset = Math.floor(spec.slidesToShow / 2);
    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;

    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
      slickActive = true;
    }
  } else {
    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
  }

  var focusedSlide;

  if (spec.targetSlide < 0) {
    focusedSlide = spec.targetSlide + spec.slideCount;
  } else if (spec.targetSlide >= spec.slideCount) {
    focusedSlide = spec.targetSlide - spec.slideCount;
  } else {
    focusedSlide = spec.targetSlide;
  }

  var slickCurrent = index === focusedSlide;
  return {
    "slick-slide": true,
    "slick-active": slickActive,
    "slick-center": slickCenter,
    "slick-cloned": slickCloned,
    "slick-current": slickCurrent // dubious in case of RTL

  };
};

var getSlideStyle = function getSlideStyle(spec) {
  var style = {};

  if (spec.variableWidth === undefined || spec.variableWidth === false) {
    style.width = spec.slideWidth;
  }

  if (spec.fade) {
    style.position = "relative";

    if (spec.vertical) {
      style.top = -spec.index * parseInt(spec.slideHeight);
    } else {
      style.left = -spec.index * parseInt(spec.slideWidth);
    }

    style.opacity = spec.currentSlide === spec.index ? 1 : 0;

    if (spec.useCSS) {
      style.transition = "opacity " + spec.speed + "ms " + spec.cssEase + ", " + "visibility " + spec.speed + "ms " + spec.cssEase;
    }
  }

  return style;
};

var getKey = function getKey(child, fallbackKey) {
  return child.key || fallbackKey;
};

var renderSlides = function renderSlides(spec) {
  var key;
  var slides = [];
  var preCloneSlides = [];
  var postCloneSlides = [];

  var childrenCount = _react["default"].Children.count(spec.children);

  var startIndex = (0, _innerSliderUtils.lazyStartIndex)(spec);
  var endIndex = (0, _innerSliderUtils.lazyEndIndex)(spec);

  _react["default"].Children.forEach(spec.children, function (elem, index) {
    var child;
    var childOnClickOptions = {
      message: "children",
      index: index,
      slidesToScroll: spec.slidesToScroll,
      currentSlide: spec.currentSlide
    }; // in case of lazyLoad, whether or not we want to fetch the slide

    if (!spec.lazyLoad || spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0) {
      child = elem;
    } else {
      child = /*#__PURE__*/_react["default"].createElement("div", null);
    }

    var childStyle = getSlideStyle(_objectSpread(_objectSpread({}, spec), {}, {
      index: index
    }));
    var slideClass = child.props.className || "";
    var slideClasses = getSlideClasses(_objectSpread(_objectSpread({}, spec), {}, {
      index: index
    })); // push a cloned element of the desired slide

    slides.push( /*#__PURE__*/_react["default"].cloneElement(child, {
      key: "original" + getKey(child, index),
      "data-index": index,
      className: (0, _classnames["default"])(slideClasses, slideClass),
      tabIndex: "-1",
      "aria-hidden": !slideClasses["slick-active"],
      style: _objectSpread(_objectSpread({
        outline: "none"
      }, child.props.style || {}), childStyle),
      onClick: function onClick(e) {
        child.props && child.props.onClick && child.props.onClick(e);

        if (spec.focusOnSelect) {
          spec.focusOnSelect(childOnClickOptions);
        }
      }
    })); // if slide needs to be precloned or postcloned

    if (spec.infinite && spec.fade === false) {
      var preCloneNo = childrenCount - index;

      if (preCloneNo <= (0, _innerSliderUtils.getPreClones)(spec) && childrenCount !== spec.slidesToShow) {
        key = -preCloneNo;

        if (key >= startIndex) {
          child = elem;
        }

        slideClasses = getSlideClasses(_objectSpread(_objectSpread({}, spec), {}, {
          index: key
        }));
        preCloneSlides.push( /*#__PURE__*/_react["default"].cloneElement(child, {
          key: "precloned" + getKey(child, key),
          "data-index": key,
          tabIndex: "-1",
          className: (0, _classnames["default"])(slideClasses, slideClass),
          "aria-hidden": !slideClasses["slick-active"],
          style: _objectSpread(_objectSpread({}, child.props.style || {}), childStyle),
          onClick: function onClick(e) {
            child.props && child.props.onClick && child.props.onClick(e);

            if (spec.focusOnSelect) {
              spec.focusOnSelect(childOnClickOptions);
            }
          }
        }));
      }

      if (childrenCount !== spec.slidesToShow) {
        key = childrenCount + index;

        if (key < endIndex) {
          child = elem;
        }

        slideClasses = getSlideClasses(_objectSpread(_objectSpread({}, spec), {}, {
          index: key
        }));
        postCloneSlides.push( /*#__PURE__*/_react["default"].cloneElement(child, {
          key: "postcloned" + getKey(child, key),
          "data-index": key,
          tabIndex: "-1",
          className: (0, _classnames["default"])(slideClasses, slideClass),
          "aria-hidden": !slideClasses["slick-active"],
          style: _objectSpread(_objectSpread({}, child.props.style || {}), childStyle),
          onClick: function onClick(e) {
            child.props && child.props.onClick && child.props.onClick(e);

            if (spec.focusOnSelect) {
              spec.focusOnSelect(childOnClickOptions);
            }
          }
        }));
      }
    }
  });

  if (spec.rtl) {
    return preCloneSlides.concat(slides, postCloneSlides).reverse();
  } else {
    return preCloneSlides.concat(slides, postCloneSlides);
  }
};

var Track = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Track, _React$PureComponent);

  var _super = _createSuper(Track);

  function Track() {
    var _this;

    _classCallCheck(this, Track);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "node", null);

    _defineProperty(_assertThisInitialized(_this), "handleRef", function (ref) {
      _this.node = ref;
    });

    return _this;
  }

  _createClass(Track, [{
    key: "render",
    value: function render() {
      var slides = renderSlides(this.props);
      var _this$props = this.props,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseOver = _this$props.onMouseOver,
          onMouseLeave = _this$props.onMouseLeave;
      var mouseEvents = {
        onMouseEnter: onMouseEnter,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave
      };
      return /*#__PURE__*/_react["default"].createElement("div", _extends({
        ref: this.handleRef,
        className: "slick-track",
        style: this.props.trackStyle
      }, mouseEvents), slides);
    }
  }]);

  return Track;
}(_react["default"].PureComponent);

exports.Track = Track;

/***/ }),

/***/ 964:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dots = void 0;

var _react = _interopRequireDefault(__webpack_require__(16));

var _classnames = _interopRequireDefault(__webpack_require__(869));

var _innerSliderUtils = __webpack_require__(898);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var getDotCount = function getDotCount(spec) {
  var dots;

  if (spec.infinite) {
    dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
  } else {
    dots = Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1;
  }

  return dots;
};

var Dots = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Dots, _React$PureComponent);

  var _super = _createSuper(Dots);

  function Dots() {
    _classCallCheck(this, Dots);

    return _super.apply(this, arguments);
  }

  _createClass(Dots, [{
    key: "clickHandler",
    value: function clickHandler(options, e) {
      // In Autoplay the focus stays on clicked button even after transition
      // to next slide. That only goes away by click somewhere outside
      e.preventDefault();
      this.props.clickHandler(options);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseOver = _this$props.onMouseOver,
          onMouseLeave = _this$props.onMouseLeave,
          infinite = _this$props.infinite,
          slidesToScroll = _this$props.slidesToScroll,
          slidesToShow = _this$props.slidesToShow,
          slideCount = _this$props.slideCount,
          currentSlide = _this$props.currentSlide;
      var dotCount = getDotCount({
        slideCount: slideCount,
        slidesToScroll: slidesToScroll,
        slidesToShow: slidesToShow,
        infinite: infinite
      });
      var mouseEvents = {
        onMouseEnter: onMouseEnter,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave
      };
      var dots = [];

      for (var i = 0; i < dotCount; i++) {
        var _rightBound = (i + 1) * slidesToScroll - 1;

        var rightBound = infinite ? _rightBound : (0, _innerSliderUtils.clamp)(_rightBound, 0, slideCount - 1);

        var _leftBound = rightBound - (slidesToScroll - 1);

        var leftBound = infinite ? _leftBound : (0, _innerSliderUtils.clamp)(_leftBound, 0, slideCount - 1);
        var className = (0, _classnames["default"])({
          "slick-active": infinite ? currentSlide >= leftBound && currentSlide <= rightBound : currentSlide === leftBound
        });
        var dotOptions = {
          message: "dots",
          index: i,
          slidesToScroll: slidesToScroll,
          currentSlide: currentSlide
        };
        var onClick = this.clickHandler.bind(this, dotOptions);
        dots = dots.concat( /*#__PURE__*/_react["default"].createElement("li", {
          key: i,
          className: className
        }, /*#__PURE__*/_react["default"].cloneElement(this.props.customPaging(i), {
          onClick: onClick
        })));
      }

      return /*#__PURE__*/_react["default"].cloneElement(this.props.appendDots(dots), _objectSpread({
        className: this.props.dotsClass
      }, mouseEvents));
    }
  }]);

  return Dots;
}(_react["default"].PureComponent);

exports.Dots = Dots;

/***/ }),

/***/ 965:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrevArrow = exports.NextArrow = void 0;

var _react = _interopRequireDefault(__webpack_require__(16));

var _classnames = _interopRequireDefault(__webpack_require__(869));

var _innerSliderUtils = __webpack_require__(898);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PrevArrow = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PrevArrow, _React$PureComponent);

  var _super = _createSuper(PrevArrow);

  function PrevArrow() {
    _classCallCheck(this, PrevArrow);

    return _super.apply(this, arguments);
  }

  _createClass(PrevArrow, [{
    key: "clickHandler",
    value: function clickHandler(options, e) {
      if (e) {
        e.preventDefault();
      }

      this.props.clickHandler(options, e);
    }
  }, {
    key: "render",
    value: function render() {
      var prevClasses = {
        "slick-arrow": true,
        "slick-prev": true
      };
      var prevHandler = this.clickHandler.bind(this, {
        message: "previous"
      });

      if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
        prevClasses["slick-disabled"] = true;
        prevHandler = null;
      }

      var prevArrowProps = {
        key: "0",
        "data-role": "none",
        className: (0, _classnames["default"])(prevClasses),
        style: {
          display: "block"
        },
        onClick: prevHandler
      };
      var customProps = {
        currentSlide: this.props.currentSlide,
        slideCount: this.props.slideCount
      };
      var prevArrow;

      if (this.props.prevArrow) {
        prevArrow = /*#__PURE__*/_react["default"].cloneElement(this.props.prevArrow, _objectSpread(_objectSpread({}, prevArrowProps), customProps));
      } else {
        prevArrow = /*#__PURE__*/_react["default"].createElement("button", _extends({
          key: "0",
          type: "button"
        }, prevArrowProps), " ", "Previous");
      }

      return prevArrow;
    }
  }]);

  return PrevArrow;
}(_react["default"].PureComponent);

exports.PrevArrow = PrevArrow;

var NextArrow = /*#__PURE__*/function (_React$PureComponent2) {
  _inherits(NextArrow, _React$PureComponent2);

  var _super2 = _createSuper(NextArrow);

  function NextArrow() {
    _classCallCheck(this, NextArrow);

    return _super2.apply(this, arguments);
  }

  _createClass(NextArrow, [{
    key: "clickHandler",
    value: function clickHandler(options, e) {
      if (e) {
        e.preventDefault();
      }

      this.props.clickHandler(options, e);
    }
  }, {
    key: "render",
    value: function render() {
      var nextClasses = {
        "slick-arrow": true,
        "slick-next": true
      };
      var nextHandler = this.clickHandler.bind(this, {
        message: "next"
      });

      if (!(0, _innerSliderUtils.canGoNext)(this.props)) {
        nextClasses["slick-disabled"] = true;
        nextHandler = null;
      }

      var nextArrowProps = {
        key: "1",
        "data-role": "none",
        className: (0, _classnames["default"])(nextClasses),
        style: {
          display: "block"
        },
        onClick: nextHandler
      };
      var customProps = {
        currentSlide: this.props.currentSlide,
        slideCount: this.props.slideCount
      };
      var nextArrow;

      if (this.props.nextArrow) {
        nextArrow = /*#__PURE__*/_react["default"].cloneElement(this.props.nextArrow, _objectSpread(_objectSpread({}, nextArrowProps), customProps));
      } else {
        nextArrow = /*#__PURE__*/_react["default"].createElement("button", _extends({
          key: "1",
          type: "button"
        }, nextArrowProps), " ", "Next");
      }

      return nextArrow;
    }
  }]);

  return NextArrow;
}(_react["default"].PureComponent);

exports.NextArrow = NextArrow;

/***/ }),

/***/ 966:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["default"] = (index);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(153)))

/***/ }),

/***/ 967:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(16));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultProps = {
  accessibility: true,
  adaptiveHeight: false,
  afterChange: null,
  appendDots: function appendDots(dots) {
    return /*#__PURE__*/_react["default"].createElement("ul", {
      style: {
        display: "block"
      }
    }, dots);
  },
  arrows: true,
  autoplay: false,
  autoplaySpeed: 3000,
  beforeChange: null,
  centerMode: false,
  centerPadding: "50px",
  className: "",
  cssEase: "ease",
  customPaging: function customPaging(i) {
    return /*#__PURE__*/_react["default"].createElement("button", null, i + 1);
  },
  dots: false,
  dotsClass: "slick-dots",
  draggable: true,
  easing: "linear",
  edgeFriction: 0.35,
  fade: false,
  focusOnSelect: false,
  infinite: true,
  initialSlide: 0,
  lazyLoad: null,
  nextArrow: null,
  onEdge: null,
  onInit: null,
  onLazyLoadError: null,
  onReInit: null,
  pauseOnDotsHover: false,
  pauseOnFocus: false,
  pauseOnHover: true,
  prevArrow: null,
  responsive: null,
  rows: 1,
  rtl: false,
  slide: "div",
  slidesPerRow: 1,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipe: true,
  swipeEvent: null,
  swipeToSlide: false,
  touchMove: true,
  touchThreshold: 5,
  useCSS: true,
  useTransform: true,
  variableWidth: false,
  vertical: false,
  waitForAnimate: true
};
var _default = defaultProps;
exports["default"] = _default;

/***/ }),

/***/ 968:
/***/ (function(module, exports, __webpack_require__) {

var MediaQueryDispatch = __webpack_require__(969);
module.exports = new MediaQueryDispatch();


/***/ }),

/***/ 969:
/***/ (function(module, exports, __webpack_require__) {

var MediaQuery = __webpack_require__(970);
var Util = __webpack_require__(938);
var each = Util.each;
var isFunction = Util.isFunction;
var isArray = Util.isArray;

/**
 * Allows for registration of query handlers.
 * Manages the query handler's state and is responsible for wiring up browser events
 *
 * @constructor
 */
function MediaQueryDispatch () {
    if(!window.matchMedia) {
        throw new Error('matchMedia not present, legacy browsers require a polyfill');
    }

    this.queries = {};
    this.browserIsIncapable = !window.matchMedia('only all').matches;
}

MediaQueryDispatch.prototype = {

    constructor : MediaQueryDispatch,

    /**
     * Registers a handler for the given media query
     *
     * @param {string} q the media query
     * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
     * @param {function} options.match fired when query matched
     * @param {function} [options.unmatch] fired when a query is no longer matched
     * @param {function} [options.setup] fired when handler first triggered
     * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
     * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
     */
    register : function(q, options, shouldDegrade) {
        var queries         = this.queries,
            isUnconditional = shouldDegrade && this.browserIsIncapable;

        if(!queries[q]) {
            queries[q] = new MediaQuery(q, isUnconditional);
        }

        //normalise to object in an array
        if(isFunction(options)) {
            options = { match : options };
        }
        if(!isArray(options)) {
            options = [options];
        }
        each(options, function(handler) {
            if (isFunction(handler)) {
                handler = { match : handler };
            }
            queries[q].addHandler(handler);
        });

        return this;
    },

    /**
     * unregisters a query and all it's handlers, or a specific handler for a query
     *
     * @param {string} q the media query to target
     * @param {object || function} [handler] specific handler to unregister
     */
    unregister : function(q, handler) {
        var query = this.queries[q];

        if(query) {
            if(handler) {
                query.removeHandler(handler);
            }
            else {
                query.clear();
                delete this.queries[q];
            }
        }

        return this;
    }
};

module.exports = MediaQueryDispatch;


/***/ }),

/***/ 970:
/***/ (function(module, exports, __webpack_require__) {

var QueryHandler = __webpack_require__(971);
var each = __webpack_require__(938).each;

/**
 * Represents a single media query, manages it's state and registered handlers for this query
 *
 * @constructor
 * @param {string} query the media query string
 * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
 */
function MediaQuery(query, isUnconditional) {
    this.query = query;
    this.isUnconditional = isUnconditional;
    this.handlers = [];
    this.mql = window.matchMedia(query);

    var self = this;
    this.listener = function(mql) {
        // Chrome passes an MediaQueryListEvent object, while other browsers pass MediaQueryList directly
        self.mql = mql.currentTarget || mql;
        self.assess();
    };
    this.mql.addListener(this.listener);
}

MediaQuery.prototype = {

    constuctor : MediaQuery,

    /**
     * add a handler for this query, triggering if already active
     *
     * @param {object} handler
     * @param {function} handler.match callback for when query is activated
     * @param {function} [handler.unmatch] callback for when query is deactivated
     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
     */
    addHandler : function(handler) {
        var qh = new QueryHandler(handler);
        this.handlers.push(qh);

        this.matches() && qh.on();
    },

    /**
     * removes the given handler from the collection, and calls it's destroy methods
     *
     * @param {object || function} handler the handler to remove
     */
    removeHandler : function(handler) {
        var handlers = this.handlers;
        each(handlers, function(h, i) {
            if(h.equals(handler)) {
                h.destroy();
                return !handlers.splice(i,1); //remove from array and exit each early
            }
        });
    },

    /**
     * Determine whether the media query should be considered a match
     *
     * @return {Boolean} true if media query can be considered a match, false otherwise
     */
    matches : function() {
        return this.mql.matches || this.isUnconditional;
    },

    /**
     * Clears all handlers and unbinds events
     */
    clear : function() {
        each(this.handlers, function(handler) {
            handler.destroy();
        });
        this.mql.removeListener(this.listener);
        this.handlers.length = 0; //clear array
    },

    /*
        * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
        */
    assess : function() {
        var action = this.matches() ? 'on' : 'off';

        each(this.handlers, function(handler) {
            handler[action]();
        });
    }
};

module.exports = MediaQuery;


/***/ }),

/***/ 971:
/***/ (function(module, exports) {

/**
 * Delegate to handle a media query being matched and unmatched.
 *
 * @param {object} options
 * @param {function} options.match callback for when the media query is matched
 * @param {function} [options.unmatch] callback for when the media query is unmatched
 * @param {function} [options.setup] one-time callback triggered the first time a query is matched
 * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
 * @constructor
 */
function QueryHandler(options) {
    this.options = options;
    !options.deferSetup && this.setup();
}

QueryHandler.prototype = {

    constructor : QueryHandler,

    /**
     * coordinates setup of the handler
     *
     * @function
     */
    setup : function() {
        if(this.options.setup) {
            this.options.setup();
        }
        this.initialised = true;
    },

    /**
     * coordinates setup and triggering of the handler
     *
     * @function
     */
    on : function() {
        !this.initialised && this.setup();
        this.options.match && this.options.match();
    },

    /**
     * coordinates the unmatch event for the handler
     *
     * @function
     */
    off : function() {
        this.options.unmatch && this.options.unmatch();
    },

    /**
     * called when a handler is to be destroyed.
     * delegates to the destroy or unmatch callbacks, depending on availability.
     *
     * @function
     */
    destroy : function() {
        this.options.destroy ? this.options.destroy() : this.off();
    },

    /**
     * determines equality by reference.
     * if object is supplied compare options, if function, compare match callback
     *
     * @function
     * @param {object || function} [target] the target for comparison
     */
    equals : function(target) {
        return this.options === target || this.options.match === target;
    }

};

module.exports = QueryHandler;


/***/ }),

/***/ 987:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _captialize = __webpack_require__(1167);

Object.defineProperty(exports, 'captialize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_captialize).default;
  }
});

var _clamp = __webpack_require__(1168);

Object.defineProperty(exports, 'clamp', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_clamp).default;
  }
});

var _distanceTo = __webpack_require__(1169);

Object.defineProperty(exports, 'distanceTo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_distanceTo).default;
  }
});

var _isDefined = __webpack_require__(1170);

Object.defineProperty(exports, 'isDefined', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isDefined).default;
  }
});

var _isNumber = __webpack_require__(1171);

Object.defineProperty(exports, 'isNumber', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isNumber).default;
  }
});

var _isObject = __webpack_require__(1172);

Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isObject).default;
  }
});

var _length = __webpack_require__(1173);

Object.defineProperty(exports, 'length', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_length).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 992:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(16)):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.ReactRecaptcha=t(require("react")):e.ReactRecaptcha=t(e.React)}(this,function(e){return function(e){function t(r){if(a[r])return a[r].exports;var n=a[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),s=a(6),c=r(s),p=a(4),u=r(p),d={className:u.default.string,onloadCallbackName:u.default.string,elementID:u.default.string,onloadCallback:u.default.func,verifyCallback:u.default.func,expiredCallback:u.default.func,render:u.default.oneOf(["onload","explicit"]),sitekey:u.default.string,theme:u.default.oneOf(["light","dark"]),type:u.default.string,verifyCallbackName:u.default.string,expiredCallbackName:u.default.string,size:u.default.oneOf(["invisible","compact","normal"]),tabindex:u.default.string,hl:u.default.string,badge:u.default.oneOf(["bottomright","bottomleft","inline"])},f={elementID:"g-recaptcha",className:"g-recaptcha",onloadCallback:void 0,onloadCallbackName:"onloadCallback",verifyCallback:void 0,verifyCallbackName:"verifyCallback",expiredCallback:void 0,expiredCallbackName:"expiredCallback",render:"onload",theme:"light",type:"image",size:"normal",tabindex:"0",hl:"en",badge:"bottomright"},h=function(){return"undefined"!=typeof window&&"undefined"!=typeof window.grecaptcha&&"function"==typeof window.grecaptcha.render},y=void 0,b=function(e){function t(e){n(this,t);var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a._renderGrecaptcha=a._renderGrecaptcha.bind(a),a.reset=a.reset.bind(a),a.state={ready:h(),widget:null},a.state.ready||"undefined"==typeof window||(y=setInterval(a._updateReadyState.bind(a),1e3)),a}return i(t,e),l(t,[{key:"componentDidMount",value:function(){this.state.ready&&this._renderGrecaptcha()}},{key:"componentDidUpdate",value:function(e,t){var a=this.props,r=a.render,n=a.onloadCallback;"explicit"===r&&n&&this.state.ready&&!t.ready&&this._renderGrecaptcha()}},{key:"componentWillUnmount",value:function(){clearInterval(y)}},{key:"reset",value:function(){var e=this.state,t=e.ready,a=e.widget;t&&null!==a&&grecaptcha.reset(a)}},{key:"execute",value:function(){var e=this.state,t=e.ready,a=e.widget;t&&null!==a&&grecaptcha.execute(a)}},{key:"_updateReadyState",value:function(){h()&&(this.setState({ready:!0}),clearInterval(y))}},{key:"_renderGrecaptcha",value:function(){this.state.widget=grecaptcha.render(this.props.elementID,{sitekey:this.props.sitekey,callback:this.props.verifyCallback?this.props.verifyCallback:void 0,theme:this.props.theme,type:this.props.type,size:this.props.size,tabindex:this.props.tabindex,hl:this.props.hl,badge:this.props.badge,"expired-callback":this.props.expiredCallback?this.props.expiredCallback:void 0}),this.props.onloadCallback&&this.props.onloadCallback()}},{key:"render",value:function(){return"explicit"===this.props.render&&this.props.onloadCallback?c.default.createElement("div",{id:this.props.elementID,"data-onloadcallbackname":this.props.onloadCallbackName,"data-verifycallbackname":this.props.verifyCallbackName}):c.default.createElement("div",{id:this.props.elementID,className:this.props.className,"data-sitekey":this.props.sitekey,"data-theme":this.props.theme,"data-type":this.props.type,"data-size":this.props.size,"data-badge":this.props.badge,"data-tabindex":this.props.tabindex})}}]),t}(s.Component);t.default=b,b.propTypes=d,b.defaultProps=f,e.exports=t.default},function(e,t){"use strict";function a(e){return function(){return e}}var r=function(){};r.thatReturns=a,r.thatReturnsFalse=a(!1),r.thatReturnsTrue=a(!0),r.thatReturnsNull=a(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,a){"use strict";function r(e,t,a,r,o,i,l,s){if(n(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var p=[a,r,o,i,l,s],u=0;c=new Error(t.replace(/%s/g,function(){return p[u++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}}var n=function(e){};e.exports=r},function(e,t,a){"use strict";var r=a(1),n=a(2),o=a(5);e.exports=function(){function e(e,t,a,r,i,l){l!==o&&n(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return a.checkPropTypes=r,a.PropTypes=a,a}},function(e,t,a){e.exports=a(3)()},function(e,t){"use strict";var a="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=a},function(t,a){t.exports=e}])});

/***/ })

});