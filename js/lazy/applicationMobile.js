webpackJsonp([25,78],{

/***/ 1042:
/***/ (function(module, exports) {

exports.__esModule = true;
var ATTRIBUTE_NAMES = exports.ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = exports.TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = exports.VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src"
};

var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex"
};

var HELMET_PROPS = exports.HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = exports.HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = exports.SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = exports.HELMET_ATTRIBUTE = "data-react-helmet";

/***/ }),

/***/ 1057:
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.Helmet = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSideEffect = __webpack_require__(1099);

var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

var _reactFastCompare = __webpack_require__(1101);

var _reactFastCompare2 = _interopRequireDefault(_reactFastCompare);

var _HelmetUtils = __webpack_require__(1102);

var _HelmetConstants = __webpack_require__(1042);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _reactFastCompare2.default)(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.SCRIPT:
                case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case _HelmetConstants.TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _extends2;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_extends2 = {}, _extends2[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _extends2));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _extends3, _extends4;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_extends3 = {}, _extends3[child.type] = nestedChildren, _extends3.titleAttributes = _extends({}, newChildProps), _extends3));

                case _HelmetConstants.TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case _HelmetConstants.TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_extends4 = {}, _extends4[child.type] = _extends({}, newChildProps), _extends4));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _extends5;

                newFlattenedProps = _extends({}, newFlattenedProps, (_extends5 = {}, _extends5[arrayChildName] = arrayTypeChildren[arrayChildName], _extends5));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (true) {
                if (!_HelmetConstants.VALID_TAG_NAMES.some(function (name) {
                    return child.type === name;
                })) {
                    if (typeof child.type === "function") {
                        return (0, _HelmetUtils.warn)("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
                    }

                    return (0, _HelmetUtils.warn)("Only elements types " + _HelmetConstants.VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
                }

                if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
                    return typeof nestedChild !== "string";
                }))) {
                    throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
                }
            }

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            _react2.default.Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = _objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = (0, _HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case _HelmetConstants.TAG_NAMES.LINK:
                    case _HelmetConstants.TAG_NAMES.META:
                    case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    case _HelmetConstants.TAG_NAMES.SCRIPT:
                    case _HelmetConstants.TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = _objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return _react2.default.createElement(Component, newProps);
        };

        _createClass(HelmetWrapper, null, [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
             * @param {Object} bodyAttributes: {"className": "root"}
             * @param {String} defaultTitle: "Default Title"
             * @param {Boolean} defer: true
             * @param {Boolean} encodeSpecialCharacters: true
             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
             * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
             * @param {String} title: "Title"
             * @param {Object} titleAttributes: {"itemprop": "name"}
             * @param {String} titleTemplate: "MySite.com - %s"
             */
            set: function set(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_react2.default.Component), _class.propTypes = {
        base: _propTypes2.default.object,
        bodyAttributes: _propTypes2.default.object,
        children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
        defaultTitle: _propTypes2.default.string,
        defer: _propTypes2.default.bool,
        encodeSpecialCharacters: _propTypes2.default.bool,
        htmlAttributes: _propTypes2.default.object,
        link: _propTypes2.default.arrayOf(_propTypes2.default.object),
        meta: _propTypes2.default.arrayOf(_propTypes2.default.object),
        noscript: _propTypes2.default.arrayOf(_propTypes2.default.object),
        onChangeClientState: _propTypes2.default.func,
        script: _propTypes2.default.arrayOf(_propTypes2.default.object),
        style: _propTypes2.default.arrayOf(_propTypes2.default.object),
        title: _propTypes2.default.string,
        titleAttributes: _propTypes2.default.object,
        titleTemplate: _propTypes2.default.string
    }, _class.defaultProps = {
        defer: true,
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = (0, _HelmetUtils.mapStateOnServer)({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _reactSideEffect2.default)(_HelmetUtils.reducePropsToState, _HelmetUtils.handleClientStateChange, _HelmetUtils.mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

exports.Helmet = HelmetExport;
exports.default = HelmetExport;

/***/ }),

/***/ 1061:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(334);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputForm = function InputForm(_ref) {
  var error = _ref.error,
      label = _ref.label,
      id = _ref.id,
      name = _ref.name,
      type = _ref.type,
      handleChange = _ref.handleChange,
      successResend = _ref.successResend,
      resendActivationLink = _ref.resendActivationLink,
      resendActivationEmail = _ref.resendActivationEmail;

  var _useState = (0, _react.useState)({ showPassword: false }),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  return _react2.default.createElement(
    "div",
    { className: "form__group" },
    _react2.default.createElement("input", {
      className: error ? "errorInput string optional form__field" : "string optional form__field",
      onChange: handleChange,
      name: name,
      maxLength: "255",
      id: id,
      placeholder: " ",
      type: type !== "password" ? type : state.showPassword ? "text" : "password",
      size: "50"
    }),
    type === "password" && _react2.default.createElement("i", {
      className: state.showPassword ? "eye eye-opened" : "eye eye-closed",
      onClick: function onClick() {
        return setState((0, _extends3.default)({}, state, { showPassword: !state.showPassword }));
      }
    }),
    _react2.default.createElement(
      "label",
      { className: "string optional form__label", htmlFor: id },
      label
    ),
    error && _react2.default.createElement(
      "span",
      { className: "errorText" },
      " ",
      error,
      ".",
      resendActivationLink && _react2.default.createElement(
        "span",
        {
          onClick: resendActivationEmail,
          className: "resendActivationLink"
        },
        resendActivationLink
      )
    ),
    successResend && !error && _react2.default.createElement(
      "span",
      { className: "success" },
      successResend
    )
  );
};

InputForm.propTypes = {};
InputForm.defaultProps = {};

exports.default = InputForm;

/***/ }),

/***/ 1099:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(16);
var React__default = _interopDefault(React);
var shallowEqual = _interopDefault(__webpack_require__(1100));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(SideEffect, _Component);

      function SideEffect() {
        return _Component.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it
      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      var _proto = SideEffect.prototype;

      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
      };

      _proto.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.Component);

    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

    _defineProperty(SideEffect, "canUseDOM", canUseDOM);

    return SideEffect;
  };
}

module.exports = withSideEffect;


/***/ }),

/***/ 1100:
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ 1101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
var hasElementType = typeof Element !== 'undefined';

function equal(a, b) {
  // fast-deep-equal index.js 2.0.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;
    // end fast-deep-equal

    // start react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element && b instanceof Element)
      return a === b;

    // custom handling for React
    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a react element
        continue;
      } else {
        // all other properties should be traversed as usual
        if (!equal(a[key], b[key])) return false;
      }
    }
    // end react-fast-compare

    // fast-deep-equal index.js 2.0.1
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function exportedEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message && error.message.match(/stack|recursion/i)) || (error.number === -2146828260)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};


/***/ }),

/***/ 1102:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.__esModule = true;
exports.warn = exports.requestAnimationFrame = exports.reducePropsToState = exports.mapStateOnServer = exports.handleClientStateChange = exports.convertReactPropstoHtmlAttributes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _objectAssign = __webpack_require__(86);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__(1042);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, _HelmetConstants.TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        bodyAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY, propsList),
        defer: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFER),
        encode: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var rafPolyfill = function () {
    var clock = Date.now();

    return function (callback) {
        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                rafPolyfill(callback);
            }, 0);
        }
    };
}();

var cafPolyfill = function cafPolyfill(id) {
    return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;

var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;

    updateAttributes(_HelmetConstants.TAG_NAMES.BODY, bodyAttributes);
    updateAttributes(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;


        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = flattenArray(title);
    }

    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(_HelmetConstants.TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + _HelmetConstants.HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    var flattenedTitle = flattenArray(title);
    return attributeString ? "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = _HelmetConstants.SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[_HelmetConstants.HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[_HelmetConstants.HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[_HelmetConstants.HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || mappedAttribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return _react2.default.createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case _HelmetConstants.ATTRIBUTE_NAMES.BODY:
        case _HelmetConstants.ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

exports.convertReactPropstoHtmlAttributes = convertReactPropstoHtmlAttributes;
exports.handleClientStateChange = handleClientStateChange;
exports.mapStateOnServer = mapStateOnServer;
exports.reducePropsToState = reducePropsToState;
exports.requestAnimationFrame = requestAnimationFrame;
exports.warn = warn;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(153)))

/***/ }),

/***/ 1205:
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

var _reactRouter = __webpack_require__(206);

var _debounce2 = __webpack_require__(899);

var _debounce3 = _interopRequireDefault(_debounce2);

var _reactAutosuggest = __webpack_require__(907);

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _reactI18next = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchBar = function (_Component) {
    (0, _inherits3.default)(SearchBar, _Component);

    function SearchBar(props) {
        (0, _classCallCheck3.default)(this, SearchBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this.renderSuggestion = function (suggestion) {
            var pathname = _this.props.location.pathname,
                value = _this.state.value;

            var cssClass = '';
            if (suggestion.modelName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                var name = suggestion.modelName.toLowerCase().trim(),
                    index = name.indexOf(value.trim().toLowerCase()),
                    text = suggestion.modelName.slice(0, index);

                if (value && value.split('')[value.length - 1].charCodeAt() === 32) {
                    cssClass = 'addPadding';
                }

                text += '<span class="searchText">' + suggestion.modelName.slice(index, index + value.length) + '</span>';
                text += suggestion.modelName.slice(index + value.length);

                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    pathname === '/' ? _react2.default.createElement('img', { loading: 'lazy', className: 'verkaufen-search-img', src: suggestion.image, alt: suggestion.modelName }) : null,
                    _react2.default.createElement('span', { className: cssClass, dangerouslySetInnerHTML: { __html: text } })
                );
            }
        };

        _this.onChange = function (event, _ref) {
            var newValue = _ref.newValue;

            _this.setState({
                value: newValue
            });
        };

        _this.onSuggestionsFetchRequested = function (_ref2) {
            var value = _ref2.value;

            _this.debouncedLoadSuggestions(value);
        };

        _this.onSuggestionSelected = function (event, _ref3) {
            var suggestion = _ref3.suggestion;

            axios.get('/api/searchSellModelsInfo?modelId=' + suggestion.modelId).then(function (result) {
                _this.props.setResults(result.data);
            }).catch(function (error) {
                if (error.response.status === 404) {
                    var selector = window.isMobile ? '.invalidModel' : '.invalidModel .wrap';
                    $('.invalidModel').css({ display: 'block' });
                    setTimeout(function () {
                        return $(selector).css({ opacity: '1' });
                    }, 500);
                    setTimeout(function () {
                        $(selector).css({ opacity: '0' });
                        setTimeout(function () {
                            return $('.invalidModel').css({ display: 'none' });
                        }, 2500);
                    }, 5000);
                }
            });
        };

        _this.onSuggestionsClearRequested = function () {};

        _this.state = {
            value: '',
            suggestions: []
        };
        _this.debouncedLoadSuggestions = (0, _debounce3.default)(_this.loadSuggestions, 1000);
        return _this;
    }

    (0, _createClass3.default)(SearchBar, [{
        key: 'loadSuggestions',
        value: function loadSuggestions(value) {
            var _this2 = this;

            axios.get('/api/searchSellModels?needle=' + value).then(function (result) {
                _this2.setState({
                    suggestions: result.data.results
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                value = _state.value,
                suggestions = _state.suggestions;
            var pathname = this.props.location.pathname;


            var suggestion = {};
            if (this.state.suggestions.length > 0) {
                suggestion = this.state.suggestions[0];
            }

            var inputProps = {
                placeholder: this.props.placeHolder || 'Modell suchen',
                value: value,
                onChange: this.onChange
            };
            var name = this.props.option.name,
                showButton = this.props.showButton,
                style = { right: window.isMobile ? '' : '45%' };
            if (window.isMobile) return _react2.default.createElement(
                'section',
                { className: 'row search-input-block phone-search-section d-none', style: { display: 'flex', justifyContent: 'space-around' } },
                _react2.default.createElement(
                    'div',
                    { className: 'searchBarBeta', style: name && name === "Model" ? style : {} },
                    pathname === '/' ? null : null,
                    _react2.default.createElement(_reactAutosuggest2.default, {
                        suggestions: suggestions,
                        onSuggestionSelected: this.onSuggestionSelected,
                        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
                        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
                        getSuggestionValue: getSuggestionValue,
                        renderSuggestion: this.renderSuggestion,
                        highlightFirstSuggestion: true,
                        inputProps: inputProps
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'invalidModel' },
                        _react2.default.createElement(
                            'div',
                            { className: 'wrap' },
                            pathname === '/' ? _react2.default.createElement(
                                'p',
                                null,
                                'Dieses Modell konnte nicht gefunden werden'
                            ) : _react2.default.createElement(
                                'p',
                                null,
                                'Leider kaufen wir dieses Modell nicht mehr an'
                            )
                        )
                    )
                ),
                showButton && _react2.default.createElement('div', { className: 'lable verkaufen-search', onClick: function onClick(e) {
                        return _this3.onSuggestionSelected(e, { suggestion: suggestion });
                    } })
            );else return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'searchBarBeta', style: name && name === "Model" ? style : {} },
                    pathname === '/' ? null : null,
                    _react2.default.createElement(_reactAutosuggest2.default, {
                        suggestions: suggestions,
                        onSuggestionSelected: this.onSuggestionSelected,
                        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
                        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
                        getSuggestionValue: getSuggestionValue,
                        renderSuggestion: this.renderSuggestion,
                        highlightFirstSuggestion: true,
                        inputProps: inputProps
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'invalidModel' },
                        _react2.default.createElement(
                            'div',
                            { className: 'wrap' },
                            pathname === '/' ? _react2.default.createElement(
                                'p',
                                null,
                                'Dieses Modell konnte nicht gefunden werden'
                            ) : _react2.default.createElement(
                                'p',
                                null,
                                'Leider kaufen wir dieses Modell nicht mehr an'
                            )
                        )
                    )
                ),
                showButton && _react2.default.createElement(
                    'div',
                    { className: 'lable verkaufen-search', onClick: function onClick(e) {
                            return _this3.onSuggestionSelected(e, { suggestion: suggestion });
                        } },
                    this.props.t('searchBar.leftSearchButton')
                )
            );
        }
    }]);
    return SearchBar;
}(_react.Component);

SearchBar.propTypes = {};
SearchBar.defaultProps = {};

exports.default = (0, _reactRouter.withRouter)((0, _reactI18next.withTranslation)(SearchBar));


var getSuggestionValue = function getSuggestionValue(suggestion) {
    return suggestion.modelName;
};

/***/ }),

/***/ 1229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchBarKaufen = undefined;

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

var _debounce2 = __webpack_require__(899);

var _debounce3 = _interopRequireDefault(_debounce2);

var _reactRouter = __webpack_require__(206);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _shop = __webpack_require__(873);

var shopActions = _interopRequireWildcard(_shop);

var _reactAutosuggest = __webpack_require__(907);

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _reactI18next = __webpack_require__(315);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchBarKaufen = exports.SearchBarKaufen = function (_Component) {
    (0, _inherits3.default)(SearchBarKaufen, _Component);

    function SearchBarKaufen(props) {
        (0, _classCallCheck3.default)(this, SearchBarKaufen);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBarKaufen.__proto__ || Object.getPrototypeOf(SearchBarKaufen)).call(this, props));

        _this.renderSuggestion = function (suggestion) {
            //suggestion.title for produsts
            var value = _this.state.value,
                pathname = _this.props.location.pathname,
                suggestionName = suggestion.name || suggestion.model || suggestion.title,
                suggestionCount = suggestion.count || 1,
                cssClass = '';


            if (suggestionName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                var name = suggestionName.toLowerCase().trim(),
                    index = name.indexOf(value.trim().toLowerCase()),
                    text = suggestionName.slice(0, index);

                if (value && value.split('')[value.length - 1].charCodeAt() === 32) {
                    cssClass = 'addPadding';
                }

                text += '<span class="searchText">' + suggestionName.slice(index, index + value.length) + '</span>';
                text += suggestionName.slice(index + value.length);

                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    pathname === '/' ? _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        suggestion.deviceImages && _react2.default.createElement('img', { loading: 'lazy', className: 'verkaufen-search-img', src: suggestion.deviceImages.mainImg.src, alt: suggestion.modelName }),
                        _react2.default.createElement('span', { className: cssClass, dangerouslySetInnerHTML: { __html: text } })
                    ) : _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _this.props.params.deviceCategory1 === "zubehör" ? _react2.default.createElement('span', { className: cssClass, dangerouslySetInnerHTML: { __html: text } }) : _react2.default.createElement('span', { className: cssClass, dangerouslySetInnerHTML: { __html: text + (' (Resultate: ' + suggestionCount + ')') } })
                    )
                );
            }
        };

        _this.onChange = function (event, _ref) {
            var newValue = _ref.newValue;

            _this.setState({
                value: newValue
            });
        };

        _this.pressEnterOnInput = function (e) {
            if (e.key === "Enter") {
                _this.setState({ pressSearch: true });
                _reactRouter.browserHistory.push('/kaufen/search/' + _this.state.value);
            }
        };

        _this.getSearchResults = function (value, page) {
            document.getElementById('spinner-box-load').style.display = 'block';
            axios.get('/api/searchShopAccessories?search=' + value + '&page=' + page).then(function (result) {
                document.getElementById('spinner-box-load').style.display = 'none';
                _this.setState({
                    suggestions: result.data.accessories
                });
            });
        };

        _this.onSuggestionsFetchRequested = function (_ref2) {
            var value = _ref2.value;

            _this.debouncedLoadSuggestions(value);
        };

        _this.onSuggestionSelected = function (event, _ref3) {
            var suggestion = _ref3.suggestion;
            var filteredByShortcode = _this.state.filteredByShortcode;

            if (filteredByShortcode) {
                var modelName = suggestion.model.split(" ").join('-').toLowerCase(),
                    color = suggestion.color.toLowerCase() || 'color',
                    capacity = suggestion.capacity.toLowerCase() || 'capacity',
                    deviceName = suggestion.deviceName.replace(/ /g, '-').toLowerCase();

                _reactRouter.browserHistory.push('/kaufen/detail/' + deviceName + '/' + modelName + '/' + capacity + '/' + color + '/' + suggestion.shortcode);
            }
            if (_this.props.params.deviceCategory1 === "zubehör") {
                var _modelName = suggestion.title.split(" ").join('-').toLowerCase();
                _modelName = _modelName.split('/');
                _reactRouter.browserHistory.push('/kaufen/detail/zubehoer/' + suggestion.categoryName + '/' + _modelName[_modelName.length - 1] + '/' + suggestion.shortcode);
            } else _reactRouter.browserHistory.push('/kaufen/search/' + suggestion.name);
        };

        _this.onSuggestionsClearRequested = function () {
            _this.setState({
                suggestions: []
            });
        };

        _this.pressSearchBtn = function () {
            if (_this.state.value) {
                _reactRouter.browserHistory.push('/kaufen/search/' + _this.state.value);
            }
        };

        _this.state = {
            value: '',
            suggestions: [],
            filteredByShortcode: false
        };

        _this.debouncedLoadSuggestions = (0, _debounce3.default)(_this.loadSuggestions, 100);
        return _this;
    }

    (0, _createClass3.default)(SearchBarKaufen, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.debouncedLoadSuggestions.cancel();
        }
    }, {
        key: 'loadSuggestions',
        value: function loadSuggestions(value) {
            var _this2 = this;

            var objForRequest = {
                search: value
            };
            //for products
            if (this.props.params && this.props.params.deviceCategory1 === "zubehör") {
                this.getSearchResults(value, 'all');
            }

            //for devices
            else {
                    axios.post('/api/models', objForRequest).then(function (result) {
                        if (result.data.meta.filteredByShortcode) {
                            _this2.setState({ suggestions: result.data.data, filteredByShortcode: true });
                        } else _this2.setState({ suggestions: result.data.meta.namesList.values, filteredByShortcode: false });
                    });
                }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                value = _state.value,
                suggestions = _state.suggestions;
            var pathname = this.props.location.pathname;
            var showBtn = this.props.showBtn;

            var inputProps = {
                placeholder: this.props.placeholder || '',
                value: value,
                onChange: this.onChange,
                onKeyUp: this.pressEnterOnInput
            };
            if (window.isMobile) return _react2.default.createElement(
                'section',
                { className: 'row search-input-block phone-search-section d-none', style: { display: 'flex', justifyContent: 'space-around' } },
                _react2.default.createElement(
                    'div',
                    { className: 'searchBarBeta' },
                    pathname === '/' ? null : null,
                    _react2.default.createElement(_reactAutosuggest2.default, {
                        suggestions: suggestions,
                        onSuggestionSelected: this.onSuggestionSelected,
                        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
                        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
                        getSuggestionValue: getSuggestionValue,
                        renderSuggestion: this.renderSuggestion,
                        inputProps: inputProps
                    })
                ),
                showBtn && _react2.default.createElement('div', { className: 'lable verkaufen-search', onClick: function onClick() {
                        return _this3.pressSearchBtn();
                    } })
            );else return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'searchBar' },
                    pathname === '/' ? null : null,
                    _react2.default.createElement(_reactAutosuggest2.default, {
                        suggestions: suggestions,
                        onSuggestionSelected: this.onSuggestionSelected,
                        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
                        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
                        getSuggestionValue: getSuggestionValue,
                        renderSuggestion: this.renderSuggestion,
                        inputProps: inputProps
                    })
                ),
                showBtn && _react2.default.createElement(
                    'div',
                    { className: 'lable verkaufen-search', onClick: function onClick() {
                            return _this3.pressSearchBtn();
                        } },
                    this.props.t('searchBarKaufen.rightSearchButton')
                )
            );
        }
    }]);
    return SearchBarKaufen;
}(_react.Component);

SearchBarKaufen.propTypes = {};
SearchBarKaufen.defaultProps = {};

function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        shopActions: (0, _redux.bindActionCreators)(shopActions, dispatch)
    };
}

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactI18next.withTranslation)()(SearchBarKaufen)));


var getSuggestionValue = function getSuggestionValue(suggestion) {
    return suggestion.name || suggestion.model;
};

/***/ }),

/***/ 1478:
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

var _reactRedux = __webpack_require__(313);

var _reactRouter = __webpack_require__(206);

var _redux = __webpack_require__(148);

var _places = __webpack_require__(909);

var placesActions = _interopRequireWildcard(_places);

var _searchBarKaufen = __webpack_require__(1229);

var _searchBarKaufen2 = _interopRequireDefault(_searchBarKaufen);

var _searchBar = __webpack_require__(1205);

var _searchBar2 = _interopRequireDefault(_searchBar);

var _reactI18next = __webpack_require__(315);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderBottomMainPage = function (_Component) {
  (0, _inherits3.default)(HeaderBottomMainPage, _Component);

  function HeaderBottomMainPage(props) {
    (0, _classCallCheck3.default)(this, HeaderBottomMainPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderBottomMainPage.__proto__ || Object.getPrototypeOf(HeaderBottomMainPage)).call(this, props));

    _this.handleChangePlace = function (selectedOption) {
      _this.setState({ selectedOption: selectedOption });

      var _JSON$parse = JSON.parse(window.localStorage.getItem("locationData")),
          data = _JSON$parse.data;

      data.forEach(function (item) {
        if (item.id === selectedOption.id) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      var setLocation = _this.props.placesActions.setLocation;

      setLocation(selectedOption);
      window.localStorage.setItem("locationData", JSON.stringify({ data: data }));
    };

    _this.setResultsFromSearchBar = function (data) {
      var selectedAnswers = {};
      selectedAnswers.Device = [data.brand[0]];

      if (data.brand[0].submodels[0].submodels) {
        selectedAnswers.Brand = [data.brand[0].submodels[0]];
        selectedAnswers.Submodel = [data.brand[0].submodels[0].submodels[0]];
        selectedAnswers.Model = [data.device];
      } else {
        selectedAnswers.Brand = [data.brand[0].submodels[0]];
        selectedAnswers.Model = [data.device];
      }

      _reactRouter.browserHistory.push("/verkaufen/" + getUrlStrSearch(selectedAnswers));
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(HeaderBottomMainPage, [{
    key: "optionRenderer",
    value: function optionRenderer(item) {
      return _react2.default.createElement(
        "div",
        { className: "img-item item-" + item.id },
        _react2.default.createElement("img", { loading: "lazy", alt: "", src: "/images/" + item.id + ".svg" }),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "strong",
            null,
            item.city
          ),
          _react2.default.createElement("br", null),
          item.descriptionBranch
        )
      );
    }
  }, {
    key: "valueSelected",
    value: function valueSelected(item) {
      return _react2.default.createElement(
        "div",
        { className: "valueSelected", style: { fontWeight: "400" } },
        _react2.default.createElement("img", {
          loading: "lazy",
          src: "/images/" + item.id + ".svg",
          alt: "",
          style: { marginRight: "5px" }
        }),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "span",
            null,
            item.city
          ),
          _react2.default.createElement(
            "p",
            { style: { margin: "0px", padding: "0px" } },
            item.descriptionBranch
          ),
          _react2.default.createElement("span", null)
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var data = JSON.parse(window.localStorage.getItem("locationData"));
      var active = {};
      if (data) {
        active.place = data.data.find(function (item) {
          return item.active === true;
        });
        if (active.place == null) {
          active.place = data.data[0];
        }
      }
      var t = this.props.t;


      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          "div",
          { className: "container-fluid header-bottom-inner m-0" },
          _react2.default.createElement(
            "div",
            { className: "row" },
            _react2.default.createElement(
              "div",
              { className: "col-md-6 header-verkaufen" },
              _react2.default.createElement(
                "div",
                { className: "left-section" },
                _react2.default.createElement(
                  "section",
                  { className: "row title" },
                  _react2.default.createElement("h2", {
                    className: "col-md-9 col-sm-10 title-heading",
                    dangerouslySetInnerHTML: {
                      __html: t("headerTop.leftMainTitle")
                    }
                  }),
                  _react2.default.createElement(
                    "p",
                    { className: "col-md-3 col-sm-2  title-image" },
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/handout.svg",
                      alt: "Online einfach Smartphone, Tablet, Computer verkaufen"
                    })
                  )
                ),
                _react2.default.createElement(
                  "p",
                  { className: "row m-0 description" },
                  t("headerTop.leftMainDesc")
                ),
                _react2.default.createElement(
                  "section",
                  { className: "star" },
                  _react2.default.createElement(
                    "div",
                    { className: "star-div" },
                    _react2.default.createElement(
                      "div",
                      { className: "google-marker" },
                      _react2.default.createElement("img", {
                        loading: "lazy",
                        src: "/images/design/google.svg",
                        alt: ""
                      }),
                      _react2.default.createElement(
                        "span",
                        null,
                        "4.9"
                      )
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "star-marker" },
                      _react2.default.createElement("img", {
                        loading: "lazy",
                        src: "/images/design/mark-star.svg",
                        alt: "",
                        key: "mark-stars-1"
                      }),
                      _react2.default.createElement("img", {
                        loading: "lazy",
                        src: "/images/design/mark-star.svg",
                        alt: "",
                        key: "mark-stars-2"
                      }),
                      _react2.default.createElement("img", {
                        loading: "lazy",
                        src: "/images/design/mark-star.svg",
                        alt: "",
                        key: "mark-stars-3"
                      }),
                      _react2.default.createElement("img", {
                        loading: "lazy",
                        src: "/images/design/mark-star.svg",
                        alt: "",
                        key: "mark-stars-4"
                      }),
                      _react2.default.createElement("img", {
                        loading: "lazy",
                        src: "/images/design/mark-star-half.svg",
                        alt: "",
                        key: "mark-stars-5"
                      })
                    )
                  ),
                  _react2.default.createElement("div", {
                    className: "satisfied-custormers",
                    dangerouslySetInnerHTML: {
                      __html: t("homepageGoogleRatingText")
                    }
                  })
                ),
                _react2.default.createElement(
                  "section",
                  {
                    className: "row search-input-block",
                    style: { marginTop: "3%" }
                  },
                  _react2.default.createElement(
                    "label",
                    null,
                    _react2.default.createElement(_searchBar2.default, {
                      setResults: this.setResultsFromSearchBar,
                      showButton: true,
                      option: { name: "header-search" },
                      placeHolder: t("headerTop.leftSearchText")
                    })
                  )
                ),
                _react2.default.createElement(
                  "section",
                  { className: "row list m-0" },
                  _react2.default.createElement(
                    _reactRouter.Link,
                    {
                      to: "/verkaufen/smartphone-23",
                      className: "list-item smartphone-bg"
                    },
                    _react2.default.createElement(
                      "span",
                      null,
                      t("headerTop.smartphone")
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    {
                      to: "/verkaufen/tablet-24/",
                      className: "list-item tablet-bg"
                    },
                    _react2.default.createElement(
                      "span",
                      null,
                      t("headerTop.tablet")
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    {
                      to: "/verkaufen/computer-26/",
                      className: "list-item computer-bg"
                    },
                    _react2.default.createElement(
                      "span",
                      null,
                      t("headerTop.computer")
                    )
                  )
                ),
                window.isMobile && _react2.default.createElement(_searchBar2.default, {
                  setResults: this.setResultsFromSearchBar,
                  showButton: true,
                  option: { name: "header-search" },
                  placeHolder: t("headerTop.leftSearchText")
                })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-md-6 header-kaufen" },
              _react2.default.createElement(
                "div",
                { className: "right-section" },
                _react2.default.createElement(
                  "section",
                  { className: "row title", style: { marginTop: 0 } },
                  _react2.default.createElement("h2", {
                    className: "col-md-9 col-sm-8 title-heading",
                    style: { paddingTop: "15px" },
                    dangerouslySetInnerHTML: {
                      __html: t("headerTop.rightMainTitle")
                    }
                  }),
                  _react2.default.createElement(
                    "p",
                    {
                      className: "col-md-3 col-sm-4 title-image",
                      style: { paddingTop: "15px" }
                    },
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/tophand.svg",
                      alt: "Kaufen"
                    })
                  )
                ),
                _react2.default.createElement(
                  "p",
                  { className: "row m-0 color-black" },
                  t("headerTop.rightMainDesc")
                ),
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: "/kaufen", title: "Ger\xE4t kaufen" },
                  _react2.default.createElement(
                    "div",
                    { id: "discount-on-header" },
                    _react2.default.createElement("div", {
                      className: "content",
                      dangerouslySetInnerHTML: {
                        __html: t("headerTop.circle")
                      }
                    }),
                    _react2.default.createElement("div", { className: "circle" }),
                    _react2.default.createElement("div", { className: "circle-2" })
                  )
                ),
                _react2.default.createElement(
                  "section",
                  { className: "row search-input-block" },
                  _react2.default.createElement(
                    "label",
                    null,
                    _react2.default.createElement(_searchBarKaufen2.default, {
                      placeholder: t("headerTop.rightSearchText"),
                      showBtn: true
                    })
                  )
                ),
                window.isMobile && _react2.default.createElement(
                  "section",
                  { className: "row list m-0" },
                  _react2.default.createElement(
                    "div",
                    { className: "sub-list" },
                    _react2.default.createElement(
                      _reactRouter.Link,
                      {
                        to: "/kaufen/smartphone/filter",
                        className: "list-item top-right-section-anchor rightsec-smartphone"
                      },
                      _react2.default.createElement(
                        "span",
                        null,
                        t("headerTop.smartphone")
                      )
                    ),
                    _react2.default.createElement(
                      _reactRouter.Link,
                      {
                        to: "/kaufen/tablet/filter",
                        className: "list-item top-right-section-anchor rightsec-tablet"
                      },
                      _react2.default.createElement(
                        "span",
                        null,
                        t("headerTop.tablet")
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "sub-list" },
                    _react2.default.createElement(
                      _reactRouter.Link,
                      {
                        to: "/kaufen/macbook/filter",
                        className: "list-item top-right-section-anchor rightsec-computer"
                      },
                      _react2.default.createElement(
                        "span",
                        null,
                        t("headerTop.computer")
                      )
                    ),
                    _react2.default.createElement(
                      _reactRouter.Link,
                      {
                        to: "kaufen/zubeh%c3%b6r",
                        className: "list-item top-right-section-anchor rightsec-zubehor"
                      },
                      _react2.default.createElement(
                        "span",
                        null,
                        t("headerTop.accessories")
                      )
                    )
                  )
                ),
                !window.isMobile && _react2.default.createElement(
                  "section",
                  { className: "row list m-0" },
                  _react2.default.createElement(
                    _reactRouter.Link,
                    {
                      to: "/kaufen/smartphone/filter",
                      className: "list-item top-right-section-anchor rightsec-smartphone"
                    },
                    _react2.default.createElement(
                      "span",
                      null,
                      t("headerTop.smartphone")
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    {
                      to: "/kaufen/tablet/filter",
                      className: "list-item top-right-section-anchor rightsec-tablet"
                    },
                    _react2.default.createElement(
                      "span",
                      null,
                      t("headerTop.tablet")
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    {
                      to: "/kaufen/macbook/filter",
                      className: "list-item top-right-section-anchor rightsec-computer"
                    },
                    _react2.default.createElement(
                      "span",
                      null,
                      t("headerTop.computer")
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    {
                      to: "kaufen/zubeh%c3%b6r",
                      className: "list-item top-right-section-anchor rightsec-zubehor"
                    },
                    _react2.default.createElement(
                      "span",
                      null,
                      t("headerTop.accessories")
                    )
                  )
                ),
                window.isMobile && _react2.default.createElement(_searchBarKaufen2.default, {
                  placeholder: t("headerTop.rightSearchText"),
                  showBtn: true
                })
              )
            )
          )
        )
      );
    }
  }]);
  return HeaderBottomMainPage;
}(_react.Component);

function mapStateToProps(state) {
  return {
    user: state.user,
    msgInfo: state.user.msgInfo,
    devices: state.shop.devices,
    basket: state.basket,
    shop: state.shop,
    places: state.places.currentLocation
  };
}
function mapDispatchToProps(dispatch) {
  return {
    placesActions: (0, _redux.bindActionCreators)(placesActions, dispatch)
  };
}

function getUrlStrSearch(answers) {
  var str = "";
  //clone object userAnswers
  var userAnswers = (0, _extends3.default)({}, answers);

  var _loop = function _loop(key) {
    if (key !== "image") {
      userAnswers[key] = [].concat((0, _toConsumableArray3.default)(userAnswers[key]));
      userAnswers[key].forEach(function (item, i) {
        return userAnswers[key][i] = (0, _extends3.default)({}, item);
      });
    }
  };

  for (var key in userAnswers) {
    _loop(key);
  }

  var _loop2 = function _loop2(key) {
    var nameParam = "";
    switch (key) {
      case "Model":
        nameParam = userAnswers[key][0].name;
        break;
      case "Device":
        nameParam = userAnswers[key][0].name;
        break;
      case "Brand":
        nameParam = userAnswers[key][0].name;
        break;
      case "Submodel":
        nameParam = "sub-" + userAnswers[key][0].name;
        break;
      default:
        nameParam = key;
    }
    if (key !== "image") {
      if (userAnswers[key].length > 0) {
        userAnswers[key].forEach(function (item, i) {
          if (i === 0) {
            if (userAnswers[key].length === 1) {
              str += nameParam.replace(/ /g, "-").toLowerCase() + "-" + item.id + "/";
            } else str += nameParam.replace(/ /g, "-").toLowerCase() + "-" + item.id;
          } else if (i === userAnswers[key].length - 1) {
            str += "," + item.id + "/";
          } else str += "," + item.id;
        });
      }
    }
  };

  for (var key in userAnswers) {
    _loop2(key);
  }
  return str;
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactI18next.withTranslation)()(HeaderBottomMainPage));

/***/ }),

/***/ 1479:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _loginFormLog = __webpack_require__(1480);

var _loginFormLog2 = _interopRequireDefault(_loginFormLog);

var _loginFormRegistration = __webpack_require__(1481);

var _loginFormRegistration2 = _interopRequireDefault(_loginFormRegistration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginForm = function LoginForm(_ref) {
  var registerUser = _ref.registerUser,
      loginUser = _ref.loginUser,
      errorRegistration = _ref.errorRegistration,
      errorLogin = _ref.errorLogin,
      handleChangeRegistration = _ref.handleChangeRegistration,
      resendActivationEmail = _ref.resendActivationEmail,
      handleChangeLogin = _ref.handleChangeLogin,
      closeLoginForm = _ref.closeLoginForm,
      loginFacebook = _ref.loginFacebook,
      loginGoogle = _ref.loginGoogle,
      showInputCode = _ref.showInputCode;

  document.onkeyup = function (e) {
    if (e.keyCode == 27) {
      if (($("#modalAGBReg").data("bs.modal") || {}).isShown) {
        $("#modalAGBReg").modal("hide");
      } else {
        document.getElementById("op").checked = false;
      }
    }
  };
  return _react2.default.createElement(
    "div",
    { className: "login-overlay login-overlay-outer" },
    _react2.default.createElement(
      "div",
      { className: "login-box" },
      _react2.default.createElement(
        "div",
        { className: "login-box-wrapper" },
        _react2.default.createElement("label", { className: "close", htmlFor: "op", onClick: closeLoginForm }),
        _react2.default.createElement(
          "div",
          { className: "login-box-container" },
          _react2.default.createElement(
            "div",
            { className: "login-box-tab-wrapper" },
            _react2.default.createElement(_loginFormRegistration2.default, {
              registerUser: registerUser,
              error: errorRegistration,
              handleChangeRegistration: handleChangeRegistration,
              loginFacebook: loginFacebook,
              loginGoogle: loginGoogle,
              showInputCode: showInputCode
            }),
            _react2.default.createElement(_loginFormLog2.default, {
              error: errorLogin,
              handleChangeLogin: handleChangeLogin,
              resendActivationEmail: resendActivationEmail,
              loginUser: loginUser,
              loginFacebook: loginFacebook,
              loginGoogle: loginGoogle,
              closeLoginForm: closeLoginForm
            })
          ),
          _react2.default.createElement(
            "ul",
            { className: "login-box-tabs" },
            _react2.default.createElement(
              "li",
              { className: "tab", "data-tabtar": "lgm-2" },
              _react2.default.createElement(
                "span",
                { className: "text" },
                "Sie haben bereits ein Konto?"
              ),
              _react2.default.createElement(
                "a",
                { href: "#", className: "link" },
                "Einloggen"
              )
            ),
            _react2.default.createElement(
              "li",
              { className: "tab", "data-tabtar": "lgm-1" },
              _react2.default.createElement(
                "span",
                { className: "text" },
                "Sie haben kein Konto?"
              ),
              _react2.default.createElement(
                "a",
                { href: "#", className: "link" },
                "Registrieren"
              )
            )
          )
        )
      )
    )
  );
};

exports.default = LoginForm;

/***/ }),

/***/ 1480:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _itemInput = __webpack_require__(1061);

var _itemInput2 = _interopRequireDefault(_itemInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginFormLog = function LoginFormLog(_ref) {
  var error = _ref.error,
      handleChangeLogin = _ref.handleChangeLogin,
      loginUser = _ref.loginUser,
      loginFacebook = _ref.loginFacebook,
      loginGoogle = _ref.loginGoogle,
      closeLoginForm = _ref.closeLoginForm,
      resendActivationEmail = _ref.resendActivationEmail;
  var login = error.login,
      password = error.password,
      infoMsg = error.infoMsg,
      socialNoEmail = error.socialNoEmail,
      resendActivationLink = error.resendActivationLink,
      successResend = error.successResend;


  function clickForgotPassword() {
    document.getElementById("op").checked = false;
    closeLoginForm();
  }
  return _react2.default.createElement(
    "div",
    { className: "login-box-tab lgm-2" },
    _react2.default.createElement(
      "div",
      { className: "login-box-form" },
      _react2.default.createElement(
        "form",
        {
          acceptCharset: "utf-8",
          action: "#",
          className: "simform",
          name: "loginForm",
          onSubmit: loginUser
        },
        _react2.default.createElement(
          "div",
          { className: "heading" },
          "Einloggen"
        ),
        _react2.default.createElement(
          "p",
          { className: "errorInfo" },
          infoMsg
        ),
        _react2.default.createElement(
          "div",
          { className: "sminputs" },
          _react2.default.createElement(
            "div",
            { className: "input full" },
            _react2.default.createElement(_itemInput2.default, {
              error: login,
              resendActivationLink: resendActivationLink,
              successResend: successResend,
              resendActivationEmail: resendActivationEmail,
              id: "customer-email-login",
              name: "login",
              type: "text",
              label: "Email",
              handleChange: handleChangeLogin
            })
          )
        ),
        _react2.default.createElement("div", { className: "spacer-24" }),
        _react2.default.createElement(
          "div",
          { className: "sminputs" },
          _react2.default.createElement(
            "div",
            { className: "input full" },
            _react2.default.createElement(_itemInput2.default, {
              error: password,
              id: "customer-pw-login",
              name: "password",
              type: "password",
              label: "Passwort",
              handleChange: handleChangeLogin
            })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "forgot-password" },
          _react2.default.createElement(
            "label",
            { htmlFor: "forgotPassword", onClick: clickForgotPassword },
            "Passwort vergessen?"
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "alternative-separator" },
          _react2.default.createElement("div", { className: "separator-line" }),
          _react2.default.createElement(
            "div",
            { className: "separator-text" },
            "oder Melden Sie sich mit Social Media an"
          ),
          _react2.default.createElement("div", { className: "separator-line" })
        ),
        _react2.default.createElement(
          "div",
          { className: "social-buttons" },
          socialNoEmail && _react2.default.createElement(
            "span",
            { className: "errorText" },
            " ",
            socialNoEmail
          ),
          _react2.default.createElement(
            "button",
            { className: "connect googleplus", onClick: loginGoogle },
            _react2.default.createElement("div", { className: "connect-icon icon-google" }),
            _react2.default.createElement(
              "div",
              { className: "connect-context" },
              "Einloggen Sie sich mit Google an"
            )
          ),
          _react2.default.createElement(
            "button",
            { className: "connect facebook", onClick: loginFacebook },
            _react2.default.createElement("div", { className: "connect-icon icon-facebook" }),
            _react2.default.createElement(
              "div",
              { className: "connect-context" },
              "Mit Facebook einloggen"
            )
          )
        ),
        _react2.default.createElement(
          "button",
          { name: "commit", type: "submit", className: "commit" },
          "Einloggen"
        )
      )
    )
  );
};
exports.default = LoginFormLog;

/***/ }),

/***/ 1481:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _itemInput = __webpack_require__(1061);

var _itemInput2 = _interopRequireDefault(_itemInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginFormRegistration = function LoginFormRegistration(_ref) {
  var registerUser = _ref.registerUser,
      error = _ref.error,
      handleChangeRegistration = _ref.handleChangeRegistration,
      loginFacebook = _ref.loginFacebook,
      loginGoogle = _ref.loginGoogle,
      showInputCode = _ref.showInputCode;
  var email = error.email,
      phone = error.phone,
      password = error.password,
      password_confirmation = error.password_confirmation,
      code = error.code,
      socialNoEmail = error.socialNoEmail;

  return _react2.default.createElement(
    "div",
    { className: "login-box-tab lgm-1" },
    _react2.default.createElement(
      "div",
      { className: "login-box-form" },
      _react2.default.createElement(
        "form",
        {
          acceptCharset: "utf-8",
          action: "#",
          className: "simform",
          onSubmit: registerUser,
          name: "registrationForm"
        },
        _react2.default.createElement(
          "div",
          { className: "heading" },
          "Registrieren"
        ),
        _react2.default.createElement(
          "p",
          { className: "errorInfo" },
          " "
        ),
        _react2.default.createElement(
          "div",
          { className: "sminputs" },
          _react2.default.createElement(
            "div",
            { className: "input full" },
            _react2.default.createElement(_itemInput2.default, {
              error: email,
              id: "customer-email",
              name: "email",
              type: "email",
              label: "Email",
              handleChange: handleChangeRegistration
            })
          )
        ),
        _react2.default.createElement("div", { className: "spacer-24" }),
        _react2.default.createElement(
          "div",
          { className: "sminputs" },
          _react2.default.createElement(
            "div",
            { className: "input string optional" },
            _react2.default.createElement(_itemInput2.default, {
              error: password,
              id: "customer-pw",
              name: "password",
              type: "password",
              label: "Passwort",
              handleChange: handleChangeRegistration
            }),
            _react2.default.createElement("div", { className: "statusBarPassword" })
          ),
          _react2.default.createElement(
            "div",
            { className: "password-criteria" },
            "Ihr Passwort muss aus mindestens 8 Zeichen (bis zu 32) bestehen und mindestens eine Zahl und einen grossen Buchstaben enthalten."
          ),
          _react2.default.createElement("div", { className: "spacer-24" }),
          _react2.default.createElement(
            "div",
            { className: "input string optional" },
            _react2.default.createElement(_itemInput2.default, {
              error: password_confirmation,
              id: "customer-pw-repeat",
              name: "password_confirmation",
              type: "password",
              label: "Passwort",
              handleChange: handleChangeRegistration
            }),
            _react2.default.createElement("div", { className: "statusBarPassword" })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "sminputs" },
          _react2.default.createElement(
            "div",
            { className: "input-full" },
            showInputCode && _react2.default.createElement(
              "div",
              { className: "input string optional" },
              _react2.default.createElement(_itemInput2.default, {
                error: code,
                id: "code",
                name: "code",
                type: "text",
                placeholder: "Code",
                label: "Code",
                handleChange: handleChangeRegistration
              })
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "alternative-separator" },
          _react2.default.createElement("div", { className: "separator-line" }),
          _react2.default.createElement(
            "div",
            { className: "separator-text" },
            "oder Registrieren Sie sich bei Social Media"
          ),
          _react2.default.createElement("div", { className: "separator-line" })
        ),
        _react2.default.createElement(
          "div",
          { className: "social-buttons" },
          socialNoEmail && _react2.default.createElement(
            "span",
            { className: "errorText" },
            " ",
            socialNoEmail
          ),
          _react2.default.createElement(
            "button",
            { className: "connect googleplus", onClick: loginGoogle },
            _react2.default.createElement("div", { className: "connect-icon icon-google" }),
            _react2.default.createElement(
              "div",
              { className: "connect-context" },
              "Registrieren Sie sich bei Google"
            )
          ),
          _react2.default.createElement(
            "button",
            { className: "connect facebook", onClick: loginFacebook },
            _react2.default.createElement("div", { className: "connect-icon icon-facebook" }),
            _react2.default.createElement(
              "div",
              { className: "connect-context" },
              "Registrieren Sie sich bei Facebook"
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "simform-actions-sidetext" },
          "Mit der Registrierung erkl\xE4re ich mich mit den\xA0",
          _react2.default.createElement(
            "a",
            { href: "/ueber-uns/agb", target: "_blank" },
            "AGB"
          ),
          " ",
          "und",
          " ",
          _react2.default.createElement(
            "a",
            { href: "/ueber-uns/datenschutzerklaerung", target: "_blank" },
            "Datenschutz"
          ),
          " ",
          "einverstanden."
        ),
        _react2.default.createElement(
          "button",
          { name: "commit", type: "submit", className: "commit" },
          "Registrieren"
        )
      )
    )
  );
};

exports.default = LoginFormRegistration;

/***/ }),

/***/ 1482:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoginFormForgotPassword = undefined;

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

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(206);

var _axios = __webpack_require__(149);

var _axios2 = _interopRequireDefault(_axios);

var _itemInput = __webpack_require__(1061);

var _itemInput2 = _interopRequireDefault(_itemInput);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _user = __webpack_require__(217);

var userActions = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginFormForgotPassword = exports.LoginFormForgotPassword = function (_Component) {
    (0, _inherits3.default)(LoginFormForgotPassword, _Component);

    function LoginFormForgotPassword(props) {
        (0, _classCallCheck3.default)(this, LoginFormForgotPassword);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LoginFormForgotPassword.__proto__ || Object.getPrototypeOf(LoginFormForgotPassword)).call(this, props));

        _this.state = {
            errorForgotPassword: {
                login: '',
                error: '',
                trueMsg: ''
            },
            showInputForCode: false
        };

        _this.forgotPasswordSend = _this.forgotPasswordSend.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.closeLoginForm = _this.closeLoginForm.bind(_this);

        return _this;
    }

    (0, _createClass3.default)(LoginFormForgotPassword, [{
        key: 'closeLoginForm',
        value: function closeLoginForm() {
            document.querySelectorAll('.simform input:not([type=submit])').forEach(function (item) {
                return item.value = '';
            });
            this.setState({ errorForgotPassword: (0, _extends3.default)({}, this.state.errorForgotPassword, { errorEmail: '', error: '', trueMsg: '' }) });
            _reactRouter.browserHistory.push('/');
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var name = e.target.name,
                errorForgotPassword = this.state.errorForgotPassword;

            errorForgotPassword[name] = null;
            this.setState({ errorForgotPassword: errorForgotPassword });
        }
    }, {
        key: 'forgotPasswordSend',
        value: function forgotPasswordSend(e) {
            var _this2 = this;

            e.preventDefault();
            if (!this.state.showInputForCode) {
                var url = '/api/forgot';
                var data = new FormData(document.forms.forgotPasswordForm);
                document.getElementById('spinner-box-load').style.display = 'block';
                _axios2.default.post(url, data).then(function (response) {
                    document.getElementById('spinner-box-load').style.display = 'none';
                    if (response.data.status === 'false') {
                        if (response.data.message) {
                            var login = response.data.message;
                            _this2.setState({ errorForgotPassword: (0, _extends3.default)({}, _this2.state.errorForgotPassword, { login: login }) });
                        }
                    } else {
                        if (response.data.smsWasSent) {
                            _this2.setState({ showInputForCode: true });
                        } else {
                            document.querySelectorAll('.simform input:not([type=submit])').forEach(function (item) {
                                return item.value = '';
                            });
                            _this2.setState({ errorForgotPassword: (0, _extends3.default)({}, _this2.state.errorForgotPassword, { errorEmail: '', error: '' }), showInputForCode: false });
                            document.getElementById("forgotPassword").checked = false;
                            _reactRouter.browserHistory.push('/');
                            _this2.props.userActions.setMsgInfo(_react2.default.createElement(
                                'div',
                                { className: 'msgBlock' },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    response.data.message
                                )
                            ));
                            setTimeout(function () {
                                return _this2.props.userActions.setMsgInfo(null);
                            }, 3000);
                        }
                    }
                }).catch(function (error) {});
            } else {
                var _url = '/api/checkCode?code=' + document.forms.forgotPasswordForm.code.value;
                document.getElementById('spinner-box-load').style.display = 'block';
                _axios2.default.get(_url).then(function (_ref) {
                    var data = _ref.data;

                    document.getElementById('spinner-box-load').style.display = 'none';
                    document.getElementById("forgotPassword").checked = false;
                    _this2.closeLoginForm();
                    _reactRouter.browserHistory.push(data.redirectUrl);
                }).catch(function (response) {
                    document.getElementById('spinner-box-load').style.display = 'none';
                    var error = response.response.data.message;
                    if (error) {
                        _this2.setState({ errorForgotPassword: (0, _extends3.default)({}, _this2.state.errorForgotPassword, { error: error }) });
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state$errorForgotPas = this.state.errorForgotPassword,
                login = _state$errorForgotPas.login,
                error = _state$errorForgotPas.error;

            return _react2.default.createElement(
                'div',
                { className: 'forgotPasswordOverlay' },
                _react2.default.createElement(
                    'div',
                    { className: 'forgotPasswordBox' },
                    _react2.default.createElement(
                        'div',
                        { className: 'forgotPasswordBoxWrapper' },
                        _react2.default.createElement('label', { className: 'close', htmlFor: 'forgotPassword', onClick: this.closeLoginForm }),
                        _react2.default.createElement(
                            'div',
                            { className: 'forgotPasswordBoxContainer' },
                            _react2.default.createElement(
                                'div',
                                { className: 'login-box-form' },
                                _react2.default.createElement(
                                    'form',
                                    { acceptCharset: 'utf-8', action: '#', className: 'simform', name: 'forgotPasswordForm', onSubmit: this.forgotPasswordSend },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'heading' },
                                        'Passwort vergessen'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'sminputs' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input full' },
                                            _react2.default.createElement(_itemInput2.default, { error: login,
                                                id: 'forgot-form-email',
                                                name: 'login',
                                                type: 'text',
                                                label: 'E-Mail',
                                                handleChange: this.handleChange })
                                        ),
                                        this.state.showInputForCode && _react2.default.createElement(
                                            'div',
                                            { className: 'input full' },
                                            _react2.default.createElement(_itemInput2.default, { error: error,
                                                id: 'code',
                                                name: 'error',
                                                type: 'text',
                                                label: 'Code',
                                                handleChange: this.handleChange })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'commit', name: 'commit', type: 'submit' },
                                        'Senden'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return LoginFormForgotPassword;
}(_react.Component);

LoginFormForgotPassword.propTypes = {};
LoginFormForgotPassword.defaultProps = {};

function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        userActions: (0, _redux.bindActionCreators)(userActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, { pure: false })(LoginFormForgotPassword);

/***/ }),

/***/ 1508:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderTop = undefined;

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

var _axios = __webpack_require__(149);

var _axios2 = _interopRequireDefault(_axios);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(313);

var _reactRouter = __webpack_require__(206);

var _reactSelect = __webpack_require__(902);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _redux = __webpack_require__(148);

var _places = __webpack_require__(909);

var placesActions = _interopRequireWildcard(_places);

var _shop = __webpack_require__(873);

var shopActions = _interopRequireWildcard(_shop);

var _user = __webpack_require__(217);

var userActions = _interopRequireWildcard(_user);

var _helpersFunction = __webpack_require__(316);

var _headerBottomFaqPage = __webpack_require__(1509);

var _headerBottomFaqPage2 = _interopRequireDefault(_headerBottomFaqPage);

var _headerBottomJobsPage = __webpack_require__(1510);

var _headerBottomJobsPage2 = _interopRequireDefault(_headerBottomJobsPage);

var _couponFromAds = __webpack_require__(927);

var _couponFromAds2 = _interopRequireDefault(_couponFromAds);

var _headerBottomMainPage = __webpack_require__(1478);

var _headerBottomMainPage2 = _interopRequireDefault(_headerBottomMainPage);

var _loginForm = __webpack_require__(1479);

var _loginForm2 = _interopRequireDefault(_loginForm);

var _loginFormForgotPassword = __webpack_require__(1482);

var _loginFormForgotPassword2 = _interopRequireDefault(_loginFormForgotPassword);

var _menuMobile = __webpack_require__(930);

var _menuMobile2 = _interopRequireDefault(_menuMobile);

var _searchBarKaufenV = __webpack_require__(931);

var _searchBarKaufenV2 = _interopRequireDefault(_searchBarKaufenV);

var _searchBarKaufenV3 = __webpack_require__(1511);

var _searchBarKaufenV4 = _interopRequireDefault(_searchBarKaufenV3);

var _headerMobile = __webpack_require__(932);

var _headerMobile2 = _interopRequireDefault(_headerMobile);

__webpack_require__(323);

var _i18next = __webpack_require__(209);

var _i18next2 = _interopRequireDefault(_i18next);

var _reactI18next = __webpack_require__(315);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderTop = exports.HeaderTop = function (_Component) {
  (0, _inherits3.default)(HeaderTop, _Component);

  function HeaderTop(props) {
    (0, _classCallCheck3.default)(this, HeaderTop);

    var lang = window.localStorage.getItem('lang');
    if (typeof lang == 'undefined' || !lang || lang == '') lang = 'de';

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderTop.__proto__ || Object.getPrototypeOf(HeaderTop)).call(this, props));

    _this.globalClick = function (e) {
      if (e.target.tagName.toLowerCase() === 'a') {
        _this.props.shopActions.definedCounerForSearchInput(' ');
      }
    };

    _this.handleChangePlace = function (selectedOption) {
      _this.setState({ selectedOption: selectedOption });

      var _JSON$parse = JSON.parse(window.localStorage.getItem('locationData')),
          data = _JSON$parse.data;

      data.forEach(function (item) {
        item.active = item.id === selectedOption.id;
      });
      var setLocation = _this.props.placesActions.setLocation;

      setLocation(selectedOption);
      window.localStorage.setItem('locationData', JSON.stringify({ data: data }));
    };

    _this.optionRenderer = function (item) {
      return _react2.default.createElement(
        'div',
        { className: 'img-item item-' + item.id },
        _react2.default.createElement('img', { loading: 'lazy', alt: '', src: '/images/' + item.id + '.png', marginBottom: 10 }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'strong',
            { className: 'hover-green' },
            item.descriptionBranch
          ),
          _react2.default.createElement('br', null),
          item.address,
          ',',
          item.zip,
          ' ',
          item.city
        )
      );
    };

    _this.valueSelected = function (item) {
      return _react2.default.createElement(
        'div',
        { className: 'valueSelected' },
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement('img', { loading: 'lazy', src: '/images/location.svg', width: 14, height: 18, alt: 'Standort', style: { marginRight: '5px' } })
        ),
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement('img', { loading: 'lazy', src: '/images/store-' + item.id + '-black.svg', width: 18, height: 18, alt: '' })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { style: { borderBottom: '1px dashed #9D9D9D', fontWeight: '400' } },
            item.descriptionBranch
          ),
          _react2.default.createElement('span', null)
        )
      );
    };

    _this.handleChangeLang = function (selectedOption) {
      // let urlPathName = window.location.pathname
      _this.setState({ lang: selectedOption });
      window.localStorage.setItem('lang', selectedOption.value);
      _i18next2.default.changeLanguage(selectedOption.value);
      // browserHistory.push(urlPathName);
    };

    _this.langOptionRenderer = function (item) {
      return _react2.default.createElement(
        'div',
        { className: 'img-item item-' + item.value },
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement('img', { loading: 'lazy', src: item.image })
        ),
        _react2.default.createElement(
          'div',
          { style: { marginLeft: '0px' } },
          _react2.default.createElement(
            'span',
            { style: { fontWeight: '400' } },
            item.title
          )
        )
      );
    };

    _this.langValueSelected = function (item) {
      return _react2.default.createElement(
        'div',
        { className: 'valueSelected' },
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement('img', { loading: 'lazy', src: item.image })
        ),
        _react2.default.createElement(
          'div',
          { style: { marginLeft: '8px' } },
          _react2.default.createElement(
            'span',
            { style: { fontWeight: '400' } },
            item.title
          )
        ),
        _react2.default.createElement('div', { id: 'lang-menu-arrow' })
      );
    };

    _this.state = {
      errorRegistration: {
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        code: ''
      },
      errorLogin: {
        infoMsg: '',
        login: '',
        password: '',
        resendActivationLink: '',
        successResend: ''
      },
      showInputCode: false,
      spinner: null,
      selectedOption: null,
      showCouponFromAds: false,
      lang: {
        title: lang.toUpperCase(),
        value: lang,
        image: '/images/design/lang/' + lang + '.svg'
      },
      langOptions: [{
        title: 'DE',
        value: 'de',
        image: '/images/design/lang/de.svg'
      }, {
        title: 'FR',
        value: 'fr',
        image: '/images/design/lang/fr.svg'
      }, {
        title: 'IT',
        value: 'it',
        image: '/images/design/lang/it.svg'
      }, {
        title: 'EN',
        value: 'en',
        image: '/images/design/lang/en.svg'
      }]
    };

    _this.loginFacebook = _this.loginFacebook.bind(_this);
    _this.loginGoogle = _this.loginGoogle.bind(_this);
    _this.initFb = _this.initFb.bind(_this);
    _this.initGoogle = _this.initGoogle.bind(_this);

    _this.registerUser = _this.registerUser.bind(_this);
    _this.loginUser = _this.loginUser.bind(_this);
    _this.handleChangeRegistration = _this.handleChangeRegistration.bind(_this);
    _this.handleChangeLogin = _this.handleChangeLogin.bind(_this);
    _this.resendActivationEmail = _this.resendActivationEmail.bind(_this);
    _this.closeLoginForm = _this.closeLoginForm.bind(_this);
    _this.logOut = _this.logOut.bind(_this);
    _this.mapSubcategories = _this.mapSubcategories.bind(_this);
    _this.mapAccessories = _this.mapAccessories.bind(_this);
    _this.toggleCouponFromAds = _this.toggleCouponFromAds.bind(_this);
    _this.handleChangeLang = _this.handleChangeLang.bind(_this);
    _this.langOptionRenderer = _this.langOptionRenderer.bind(_this);
    _this.langValueSelected = _this.langValueSelected.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(HeaderTop, [{
    key: 'showMenu',
    value: function showMenu(e) {
      var headerHeight = $('.header-mobile.scrolling-header').innerHeight();
      if ($(e.currentTarget).hasClass('open')) {

        $('.menuMobile').css({ top: 0, transform: 'translateY(-100%)' });
        $('#mobile > .mainPage > .headerBottom-mobile .header-bottom').css('display', 'block');
        $('#mobile > .mainPage > .mainPage').css('display', 'block');
        $('#mobile footer').css('display', 'block');
      } else {
        $('.menuMobile').css({
          top: headerHeight + 'px',
          maxHeight: 'calc( 100vh - ' + headerHeight + 'px',
          transform: 'translateY(0)'
        });

        setTimeout(function () {
          $('#mobile > .mainPage > .headerBottom-mobile .header-bottom').css('display', 'none');
          $('#mobile > .mainPage > .mainPage').css('display', 'none');
          $('#mobile footer').css('display', 'none');
        }, 1000);
      }
      $(e.currentTarget).toggleClass('open');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var user = this.props.user;

      if (window.isFBConnection) {
        this.initFb();
      }
      if (window.isGoogleConnection) {
        this.initGoogle();
      }

      this.checkAdsSource();

      _helpersFunction.LoginModalController.initialize();
      _helpersFunction.headerController.initialize();
      if (user.redirectTo) {
        document.getElementById('op').checked = true;
      }
      // headerScrollFixed();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var user = this.props.user;

      if (nextProps.user.redirectTo !== user.redirectTo && !user.redirectTo) {
        document.getElementById('op').checked = true;
      }

      if (nextProps.user.isLogin !== user.isLogin && nextProps.user.isLogin === false) {
        this.setState({
          formData: {
            firstName: '', lastName: '', email: '', phone: '', colorValue: ''
          }
        });
      }
    }
  }, {
    key: 'checkAdsSource',


    /* global FB gapi gapiAuth2 */

    value: function checkAdsSource() {
      var _this2 = this;

      var search_params = new URL(document.URL).searchParams;

      if (search_params.has('coupon') && !window.localStorage.hasOwnProperty("coupon")) {
        var coupon = search_params.get('coupon');

        _axios2.default.get('/api/checkAdsCoupon?coupon=' + coupon).then(function (data) {
          if (data.data.status == "ok") {
            _this2.toggleCouponFromAds();
            document.getElementById('coupon_text').innerHTML = coupon;
            window.localStorage.setItem('coupon', coupon);
          }
        }).catch(function (error) {});
      }
    }
  }, {
    key: 'toggleCouponFromAds',
    value: function toggleCouponFromAds() {
      this.setState({ showCouponFromAds: !this.state.showCouponFromAds });
    }
  }, {
    key: 'loginFacebook',
    value: function loginFacebook(e) {
      var _this3 = this;

      e.preventDefault();
      var _state = this.state,
          errorLogin = _state.errorLogin,
          errorRegistration = _state.errorRegistration;

      document.getElementById('op').checked = false;
      this.setState({
        errorLogin: (0, _extends3.default)({}, errorLogin, { socialNoEmail: '' }),
        errorRegistration: (0, _extends3.default)({}, errorRegistration, { socialNoEmail: '' })
      });
      FB.login(function (response) {
        var token = response.authResponse.accessToken;
        var body = {
          token: token,
          provider: 'facebook'
        };
        document.getElementById('spinner-box-load').style.display = 'block';
        _axios2.default.post('/api/socialAuth', body).then(function (result) {
          window.localStorage.setItem('token', result.data.token);
          window.axios.defaults.headers.common['Authorization-Token'] = result.data.token;
          _this3.loadPersonalData(result.data.token);
        }).catch(function (error) {
          if (error.response.status === 404) {
            document.getElementById('spinner-box-load').style.display = 'none';
            document.getElementById('op').checked = true;
            _this3.setState({
              errorLogin: (0, _extends3.default)({}, errorLogin, { socialNoEmail: error.response.data }),
              errorRegistration: (0, _extends3.default)({}, errorRegistration, { socialNoEmail: error.response.data })
            });
          }
        });
      }, { scope: 'email' });
    }
  }, {
    key: 'initFb',
    value: function initFb() {
      window.fbAsyncInit = function () {
        FB.init({
          appId: window.oauthIds.facebookId,
          xfbml: true,
          version: 'v2.9'
        });
      };
      (function (d, s, id) {
        var js = void 0,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
  }, {
    key: 'initGoogle',
    value: function initGoogle() {
      window.gapiAuth2 = null;
      if (typeof gapi !== 'undefined') {
        gapi.load('auth2', function () {
          gapi.auth2.init({
            client_id: window.oauthIds.googleId
          }).then(function (data) {
            window.gapiAuth2 = data;
          });
        });
      }
    }
  }, {
    key: 'loginGoogle',
    value: function loginGoogle(e) {
      var _this4 = this;

      e.preventDefault();
      var _state2 = this.state,
          errorLogin = _state2.errorLogin,
          errorRegistration = _state2.errorRegistration;

      this.setState({
        errorLogin: (0, _extends3.default)({}, errorLogin, { socialNoEmail: '' }),
        errorRegistration: (0, _extends3.default)({}, errorRegistration, { socialNoEmail: '' })
      });
      document.getElementById('op').checked = false;
      window.gapiAuth2.signIn().then(function (data) {
        var token = data.Zi.access_token;
        var body = {
          token: token,
          provider: 'google'
        };
        document.getElementById('spinner-box-load').style.display = 'block';
        _axios2.default.post('/api/socialAuth', body).then(function (result) {
          window.localStorage.setItem('token', result.data.token);
          window.axios.defaults.headers.common['Authorization-Token'] = result.data.token;
          _this4.loadPersonalData(result.data.token);
        }).catch(function (error) {
          if (error.response.status === 404) {
            document.getElementById('spinner-box-load').style.display = 'none';
            document.getElementById('op').checked = true;
            _this4.setState({
              errorLogin: (0, _extends3.default)({}, errorLogin, { socialNoEmail: error.response.data }),
              errorRegistration: (0, _extends3.default)({}, errorRegistration, { socialNoEmail: error.response.data })
            });
          }
        });
      });
    }
  }, {
    key: 'closeLoginForm',
    value: function closeLoginForm() {
      var _props$userActions = this.props.userActions,
          setRedirectTo = _props$userActions.setRedirectTo,
          cancelRedirectToMyAccount = _props$userActions.cancelRedirectToMyAccount;

      [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('.simform input:not([type=submit])'))).forEach(function (item) {
        item.value = '';
      });
      this.setState({
        errorRegistration: {
          email: '', phone: '', password: '', password_confirmation: '', socialNoEmail: ''
        },
        errorLogin: {
          infoMsg: '', login: '', password: '', socialNoEmail: '', resendActivationLink: '', successResend: ''
        },
        showInputCode: false,
        spinner: null
      });
      setRedirectTo(false);
      cancelRedirectToMyAccount(false);
      $('.login-box-wrapper').css({ display: 'none' });
    }
  }, {
    key: 'handleChangeRegistration',
    value: function handleChangeRegistration(e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value,
          errorRegistration = this.state.errorRegistration;

      if (name === 'password' || name === 'password_confirmation') {
        var regular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        var isValid = regular.test(value.trim());
        var isSame = name !== "password_confirmation" || $("#customer-pw").val() === $("#customer-pw-repeat").val();
        if (isValid && isSame) {
          $(e.target).parents('.input').find('.statusBarPassword').css({ background: '#00cb94' });
        } else {
          $(e.target).parents('.input').find('.statusBarPassword').css({ background: '#ff0000' });
        }
      }
      errorRegistration[name] = null;
      this.setState({ errorRegistration: errorRegistration });
    }
  }, {
    key: 'handleChangeLogin',
    value: function handleChangeLogin(e) {
      var name = e.target.name,
          errorLogin = this.state.errorLogin;

      errorLogin.infoMsg = '';
      errorLogin[name] = null;
      if (name === 'login') {
        errorLogin.successResend = null;
        errorLogin.resendActivationLink = null;
      }
      this.setState({ errorLogin: errorLogin });
    }
  }, {
    key: 'registerUser',
    value: function registerUser(e) {
      var _this5 = this;

      e.preventDefault();
      var _state3 = this.state,
          showInputCode = _state3.showInputCode,
          errorRegistration = _state3.errorRegistration;

      if (!showInputCode) {
        var url = '/api/register';
        var data = new FormData(document.forms.registrationForm);
        document.getElementById('spinner-box-load').style.display = 'block';
        _axios2.default.post(url, data).then(function (result) {
          document.getElementById('spinner-box-load').style.display = 'none';
          if (result.data.status === 'false') {
            if (result.data.errorType === 'phone') {
              var phone = result.data.message;
              _this5.setState({
                errorRegistration: (0, _extends3.default)({}, errorRegistration, { email: '', phone: phone, password: '', password_confirmation: '', code: ''
                }),
                spinner: null
              });
            }
            if (result.data.errorType === 'email') {
              var email = result.data.message;
              _this5.setState({
                errorRegistration: (0, _extends3.default)({}, errorRegistration, { email: email, phone: '', password: '', password_confirmation: '', code: ''
                }),
                spinner: null
              });
            }
          } else if (result.data.smsWasSent) {
            _this5.setState({ showInputCode: true, spinner: null });
          } else {
            document.getElementById('op').checked = false;
            _this5.closeLoginForm();
            _reactRouter.browserHistory.push('/confirm-email');
          }
        }).catch(function (error) {
          document.getElementById('spinner-box-load').style.display = 'none';
          var errors = error.response.data.errors;

          var email = void 0,
              phone = void 0,
              password = void 0,
              passwordConfirmation = void 0;
          if (errors) {
            errors.email ? phone = errors.email[0] : '';
            errors.phone ? phone = errors.phone[0] : '';
            errors.password ? password = passwordConfirmation = errors.password[0] : '';
          }
          _this5.setState({
            errorRegistration: (0, _extends3.default)({}, errorRegistration, { email: email, phone: phone, password: password, passwordConfirmation: passwordConfirmation
            }),
            spinner: null
          });
        });
      } else {
        var _url = '/api/confirm/phone';
        var _data = new FormData(document.forms.registrationForm);
        document.getElementById('spinner-box-load').style.display = 'block';
        _axios2.default.post(_url, _data).then(function (response) {
          window.localStorage.setItem('token', response.data.token);
          window.axios.defaults.headers.common['Authorization-Token'] = response.data.token;
          _this5.loadPersonalData(response.data.token);
        }).catch(function (error) {
          document.getElementById('spinner-box-load').style.display = 'none';
          if (error.response.status === 404) {
            var err = error.response.data;
            var code = void 0;
            if (err) {
              code = err;
            }
            _this5.setState({ errorRegistration: (0, _extends3.default)({}, errorRegistration, { code: code }), spinner: null });
          } else {
            var _err = error.response.data.message;
            var _code = void 0;
            if (_err) {
              _code = _err;
            }
            _this5.setState({ errorRegistration: (0, _extends3.default)({}, errorRegistration, { code: _code }), spinner: null });
          }
        });
      }
    }
  }, {
    key: 'loginUser',
    value: function loginUser(e) {
      var _this6 = this;

      e.preventDefault();
      var errorLogin = this.state.errorLogin;

      var url = '/api/login';
      var data = new FormData(document.forms.loginForm);
      document.getElementById('spinner-box-load').style.display = 'block';
      _axios2.default.post(url, data).then(function (result) {
        if (result.data.status === 'false') {
          document.getElementById('spinner-box-load').style.display = 'none';
          errorLogin[result.data.field] = result.data.message;
          if (result.data.resendActivationLink) {
            errorLogin.resendActivationLink = result.data.resendActivationLink;
          }
          _this6.setState({ errorLogin: errorLogin });
        } else {
          window.localStorage.setItem('token', result.data.token);
          window.axios.defaults.headers.common['Authorization-Token'] = result.data.token;
          _this6.loadPersonalData(result.data.token);
        }
      }).catch(function (error) {
        document.getElementById('spinner-box-load').style.display = 'none';
        var err = error.response.data.errors;
        var login = void 0,
            password = void 0;
        if (err) {
          err.login ? login = err.login[0] : '';
          err.password ? password = err.password[0] : '';
        }
        _this6.setState({ errorLogin: (0, _extends3.default)({}, errorLogin, { login: login, password: password }), spinner: null });
      });
    }
  }, {
    key: 'logOut',
    value: function logOut() {
      if (window.gapiAuth2) window.gapiAuth2.disconnect();
      window.localStorage.removeItem('token');
      delete window.axios.defaults.headers.common['Authorization-Token'];
      var logOut = this.props.userActions.logOut;

      logOut();
    }
  }, {
    key: 'mapSubcategories',
    value: function mapSubcategories(device) {
      if (device.name === 'Zubehör') return '';
      var params = this.props.params,
          currentDeviceName = params.deviceCategory1 && params.deviceCategory1.replace(/-/g, ' '),
          deviceCategories = [device.name.replace(/ /g, '-').toLowerCase()],
          computerIds = [8, 15, 23, 24];

      var className = '';
      function mapSubmodels(submodels) {
        deviceCategories.push(submodels[0].name.replace(/ /g, '-').toLowerCase());
        if (submodels[0].submodels) mapSubmodels(submodels[0].submodels);
      }
      if (device.submodels && computerIds.every(function (item) {
        return item !== device.id;
      })) {
        mapSubmodels(device.submodels);
      }
      var strUrl = deviceCategories.join('/') + '/filter';

      device.name.toLowerCase() === currentDeviceName ? className = 'current item-sub-menu' : className = 'item-sub-menu';

      return _react2.default.createElement(
        _reactRouter.Link,
        {
          to: '/kaufen/' + strUrl,
          className: className,
          key: device.id
        },
        _react2.default.createElement(
          'span',
          { className: 'image' },
          _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/' + device.id + 'device.svg', alt: '' })
        ),
        _react2.default.createElement(
          'span',
          { className: 'image' },
          _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/' + device.id + 'activeDevice.svg', alt: '' })
        ),
        _react2.default.createElement(
          'span',
          { className: 'name' },
          device.name
        )
      );
    }
  }, {
    key: 'mapAccessories',
    value: function mapAccessories(item, i) {
      var params = this.props.params,
          index = 2,
          className = '',
          strPrevUrl = '';
      /*get prev url*/
      for (var key in params) {
        var paramKeyIndex = key.slice(14);
        if (key.includes('deviceCategory') && params[key] && +paramKeyIndex < index) strPrevUrl += params[key] + '/';
      }
      /*add current name*/
      strPrevUrl += item.name.toLowerCase().replace(/ /g, '-') + '/';
      /*add submodels url*/
      function mapSubmodels(submodels) {
        strPrevUrl += submodels[0].name.replace(/ /g, '-').toLowerCase() + '/';
        if (submodels[0].submodels) mapSubmodels(submodels[0].submodels);
      }
      if (item.submodels) mapSubmodels(item.submodels);

      if (params['deviceCategory' + index] && params['deviceCategory' + index].replace(/-/g, ' ') === item.name.toLowerCase()) className = 'current item-sub-menu';else className = 'item-sub-menu';
      return _react2.default.createElement(
        _reactRouter.Link,
        { to: '/kaufen/zubeh\xF6r/' + strPrevUrl + 'filter',
          className: className,
          key: item.id },
        item.image && _react2.default.createElement(
          'span',
          { className: 'image' },
          _react2.default.createElement('img', { loading: 'lazy', src: item.image, className: 'deviceIcon', alt: '' })
        ),
        item.image && _react2.default.createElement(
          'span',
          { className: 'image' },
          _react2.default.createElement('img', { loading: 'lazy', src: item.image, className: 'deviceIcon', alt: '' })
        ),
        _react2.default.createElement(
          'span',
          { className: 'name' },
          item.name
        )
      );
    }
  }, {
    key: 'loadPersonalData',
    value: function loadPersonalData(token) {
      var _this7 = this;

      if (token) {
        _axios2.default.get('/api/customerAgileData').then(function (data) {
          document.getElementById('spinner-box-load').style.display = 'none';
          document.getElementById('op').checked = false;
          if (data.status === 200) {
            var _props = _this7.props,
                loginSuccess = _props.userActions.loginSuccess,
                _props$user = _props.user,
                redirectUrl = _props$user.redirectUrl,
                cancelRedirectToMyAccount = _props$user.cancelRedirectToMyAccount;

            _this7.closeLoginForm();
            loginSuccess(data.data);
            if (redirectUrl) {
              _reactRouter.browserHistory.push(redirectUrl);
            } else if (!cancelRedirectToMyAccount) _reactRouter.browserHistory.push('/kundenkonto');
          }
        }).catch(function (error) {});
      }
    }
  }, {
    key: 'resendActivationEmail',
    value: function resendActivationEmail() {
      var _this8 = this;

      var email = $('#customer-email-login').val(),
          errorLogin = this.state.errorLogin;

      document.getElementById('spinner-box-load').style.display = 'block';
      _axios2.default.get('/api/resendActivationLink?login=' + email).then(function (result) {
        document.getElementById('spinner-box-load').style.display = 'none';
        _this8.setState({
          errorLogin: (0, _extends3.default)({}, errorLogin, {
            successResend: result.data,
            login: '',
            resendActivationLink: ''
          })
        });
      }).catch(function (error) {
        document.getElementById('spinner-box-load').style.display = 'none';
        _this8.setState({
          errorLogin: (0, _extends3.default)({}, errorLogin, {
            resendActivationLink: '',
            login: error.response.data.errors.login[0]
          })
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state4 = this.state,
          spinner = _state4.spinner,
          errorRegistration = _state4.errorRegistration,
          errorLogin = _state4.errorLogin,
          showInputCode = _state4.showInputCode,
          selectedOption = _state4.selectedOption,
          lang = _state4.lang,
          langOptions = _state4.langOptions,
          _props2 = this.props,
          pageNotFound = _props2.pageNotFound,
          user = _props2.user,
          basket = _props2.basket,
          msgInfo = _props2.msgInfo,
          devices = _props2.shop.devices,
          pathname = _props2.location.pathname,
          zubenhor = devices.find(function (item) {
        return item.name === "Zubehör";
      }),
          domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1],
          urlPathName = window.location.pathname,
          data = JSON.parse(window.localStorage.getItem('locationData')),
          webshopDiscountData = JSON.parse(window.localStorage.getItem('webshopDiscountData')),
          active = {};


      if (data) {
        active.place = data.data.find(function (item) {
          return item.active === true;
        });
        if (active.place == null) {
          active.place = data.data[0];
        }
      }

      var headerClassName = void 0;
      var logoSrc = domain === 'ch' ? '/images/design/logo_all_pages.svg' : '/images/design/logo_de.svg';
      var logoSrcAllPages = domain === 'ch' ? '/images/design/logo_all_pages.svg' : '/images/design/logo_all_pages_de.svg';
      var backBtnUrl = this.props.backColorGreen ? "/images/design/mobile/back-btn-green.svg" : "/images/design/mobile/back-btn.svg";

      if (urlPathName === '/') {
        headerClassName = 'headerMainPage';
      } else if (urlPathName === '/jobs') {
        headerClassName = 'headerMainPage jobs';
      } else if (urlPathName === '/ueber-uns/qualitaet') {
        headerClassName = 'headerMainPage jobs qualitaet_header';
      } else if (urlPathName === '/versichern') {
        logoSrc = '/images/logo/remarket-care.jpg';
        logoSrcAllPages = '/images/logo/remarket-care.jpg';
        headerClassName = 'headerMainPage';
      } else {
        headerClassName = 'headerMainPage ';
      }

      headerClassName = webshopDiscountData.desktop_topbar_active == 1 ? headerClassName + ' desktop-topbar-activate' : headerClassName;

      var customStyles = {};
      var t = this.props.t;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'nav',
          { id: 'top_1', className: webshopDiscountData.desktop_topbar_active == 1 ? "top-header navbar navbar-default navbar-fixed-top visible-md-block visible-lg-block desktop-topbar-activate" : "top-header navbar navbar-default navbar-fixed-top visible-md-block visible-lg-block" },
          webshopDiscountData.desktop_topbar_active == 1 && _react2.default.createElement(
            'div',
            { style: { position: "relative" }, className: 'notification-top-bar' },
            _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: (0, _helpersFunction.discountCode)(webshopDiscountData.desktop_topbar_text, 'discount-code') } })
          ),
          _react2.default.createElement(
            'div',
            { className: 'container-fluid header-desktop-style d-flex', style: { display: 'flex', justifyContent: 'end' } },
            _react2.default.createElement('div', { className: 'col-xs-none col-md-5' }),
            _react2.default.createElement(
              'div',
              { className: 'col-xs-none col-md-7' },
              _react2.default.createElement(
                'div',
                { className: 'top-header scrolling-header' },
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'headerMainPage-container', style: { display: 'flex', alignItems: 'center', justifyContent: 'end' } },
                    _react2.default.createElement(
                      'div',
                      { className: 'select-input-place d-xs-none d-sm-none d-md-none d-lg-block' },
                      data && _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement(_reactSelect2.default, {
                          value: selectedOption || active.place,
                          onChange: this.handleChangePlace,
                          options: data.data,
                          classNamePrefix: 'Select-input-place',
                          optionRenderer: this.optionRenderer,
                          valueRenderer: this.valueSelected,
                          styles: customStyles,
                          isSearchable: false
                        })
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'place-open d-sm-none d-md-none d-lg-block', style: { background: 'transparent', color: 'black' } },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/time-clock.svg', width: 16, height: 16, alt: '\xD6ffnungszeiten' })
                      ),
                      _react2.default.createElement(
                        'span',
                        { className: 'place-open-menu', style: { color: 'black', background: 'transparent', cursor: 'pointer', borderBottom: '1px dashed #9D9D9D' } },
                        this.props.t('headerTop.openinghours')
                      ),
                      active.place ? _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'place-open-title' },
                          active.place.address,
                          _react2.default.createElement('br', null),
                          active.place.zip,
                          ' ',
                          active.place.city
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'green-hover' },
                          _react2.default.createElement(
                            'span',
                            null,
                            t('openingHoursHover.Mon'),
                            ' :'
                          ),
                          _react2.default.createElement(
                            'span',
                            null,
                            active.place.openingHours.mon
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'green-hover' },
                          _react2.default.createElement(
                            'span',
                            null,
                            t('openingHoursHover.Tue'),
                            ' :'
                          ),
                          _react2.default.createElement(
                            'span',
                            null,
                            active.place.openingHours.tue
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'green-hover' },
                          _react2.default.createElement(
                            'span',
                            null,
                            t('openingHoursHover.Wed'),
                            ' :'
                          ),
                          _react2.default.createElement(
                            'span',
                            null,
                            active.place.openingHours.wed
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'green-hover' },
                          _react2.default.createElement(
                            'span',
                            null,
                            t('openingHoursHover.Thu'),
                            ' :'
                          ),
                          _react2.default.createElement(
                            'span',
                            null,
                            active.place.openingHours.thu
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'green-hover' },
                          _react2.default.createElement(
                            'span',
                            null,
                            t('openingHoursHover.Fri'),
                            ' :'
                          ),
                          _react2.default.createElement(
                            'span',
                            null,
                            active.place.openingHours.fri
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'green-hover' },
                          _react2.default.createElement(
                            'span',
                            null,
                            t('openingHoursHover.Sat'),
                            ' :'
                          ),
                          _react2.default.createElement(
                            'span',
                            null,
                            active.place.openingHours.sat ? active.place.openingHours.sat : t('openingHoursHover.Closed')
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'green-hover' },
                          _react2.default.createElement(
                            'span',
                            null,
                            t('openingHoursHover.Sun'),
                            ' :'
                          ),
                          _react2.default.createElement(
                            'span',
                            null,
                            active.place.openingHours.sun ? active.place.openingHours.sun : t('openingHoursHover.Closed')
                          )
                        )
                      ) : ''
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: active.place ? 'tel:' + active.place.phoneFull : '', className: 'place-mobile d-sm-none d-md-none d-lg-block text-decoration-none',
                        style: { background: 'transparent', color: 'black' } },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/phone.svg', width: 21, height: 16, alt: 'Telefon' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        active.place ? active.place.phone : ''
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'select-input-lang d-xs-none d-sm-none d-md-none d-lg-block' },
                      _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement(_reactSelect2.default, {
                          value: lang,
                          onChange: this.handleChangeLang,
                          options: langOptions,
                          classNamePrefix: 'Select-input-lang',
                          optionRenderer: this.langOptionRenderer,
                          valueRenderer: this.langValueSelected,
                          styles: customStyles,
                          isSearchable: false
                        })
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: headerClassName, onClick: this.props.forClearingSearchInput },
          _react2.default.createElement(
            'nav',
            { id: 'top_2', className: webshopDiscountData.desktop_topbar_active == 1 ? "main-header navbar navbar-default desktop-topbar-activate" : "main-header navbar navbar-default" },
            _react2.default.createElement(
              'div',
              { className: 'container-fluid' },
              _react2.default.createElement(
                'div',
                { className: 'show-desktop navbar-header col-md-2 allign-section' },
                _react2.default.createElement('button', { type: 'button', className: 'collapsed navbar-toggle', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-6', 'aria-expanded': 'false' }),
                _react2.default.createElement(
                  'div',
                  { className: 'header-logo navbar-brand', style: { height: '79px' } },
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/' },
                    _react2.default.createElement('span', { className: domain === 'ch' ? "header-image" : "header-image-de" })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'show-desktop col-md-5 menu-section', style: { height: '80px', display: 'flex', alignItems: 'center' } },
                _react2.default.createElement(
                  'div',
                  { className: 'collapse navbar-collapse header-collapse-style', id: 'bs-example-navbar-collapse-6' },
                  _react2.default.createElement(
                    'ul',
                    { className: 'nav navbar-nav header-ul' },
                    _react2.default.createElement(
                      'li',
                      { className: 'header-li' },
                      _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/verkaufen', activeClassName: 'active' },
                        this.props.t('headerTop.sell')
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      { className: 'header-li' },
                      _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/kaufen', activeClassName: 'active', className: 'kaufen-icon-tag' },
                        this.props.t('headerTop.buy'),
                        ' ',
                        _react2.default.createElement('i', { className: 'fa fa-chevron-down', 'aria-hidden': 'true' })
                      ),
                      !window.isMobile && _react2.default.createElement(
                        'div',
                        { className: 'wrap-sub-category main-page' },
                        _react2.default.createElement(
                          'div',
                          { className: 'sub-category' },
                          _react2.default.createElement(
                            'div',
                            { className: 'title' },
                            _react2.default.createElement(
                              'span',
                              null,
                              'Ger\xE4te'
                            ),
                            _react2.default.createElement('div', { className: 'line' })
                          ),
                          _react2.default.createElement(
                            'div',
                            { className: 'devices' },
                            devices.map(this.mapSubcategories)
                          ),
                          _react2.default.createElement(
                            'div',
                            { className: 'title' },
                            _react2.default.createElement(
                              'span',
                              null,
                              'Zubeh\xF6r'
                            ),
                            _react2.default.createElement('div', { className: 'line' })
                          ),
                          _react2.default.createElement(
                            'div',
                            { className: 'devices' },
                            zubenhor ? zubenhor.submodels.map(this.mapAccessories) : ''
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      { className: 'header-li' },
                      _react2.default.createElement(
                        'a',
                        { href: 'https://www.ireparatur.ch/', className: 'active', target: '_blank', style: { cursor: 'pointer' } },
                        this.props.t('headerTop.repair')
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      { className: 'header-li' },
                      _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/kontakt', activeClassName: 'active' },
                        this.props.t('headerTop.contact')
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'show-desktop col-md-3 search-section' },
                _react2.default.createElement(_searchBarKaufenV4.default, { placeholder: t('expandedSearchFieldTitle') })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-2 user-section' },
                urlPathName === '/versichern' ? null : _react2.default.createElement(
                  'div',
                  { className: 'row fr allign-section' },
                  !user.isLogin ? _react2.default.createElement('span', { className: 'show-desktop lower' }) : _react2.default.createElement(
                    'span',
                    { className: 'show-desktop userButtons lower' },
                    _react2.default.createElement(
                      'span',
                      { className: 'image' },
                      user.data && user.data.systemAddress.first_name && user.data.systemAddress.first_name.slice(0, 1).toUpperCase()
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'userHello' },
                      domain === 'de' ? 'Hallo' : 'Grüezi',
                      user.data && user.data.systemAddress.first_name ? ', ' : '',
                      _react2.default.createElement(
                        'span',
                        { className: 'user-name' },
                        user.data && user.data.systemAddress.first_name,
                        '!'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'userLinks' },
                        _react2.default.createElement(
                          _reactRouter.Link,
                          { to: '/kundenkonto' },
                          'Mein Konto'
                        ),
                        _react2.default.createElement(
                          'span',
                          { onClick: this.logOut },
                          'Ausloggen'
                        )
                      )
                    )
                  ),
                  _react2.default.createElement('input', { type: 'checkbox', id: 'op', className: 'op' }),
                  _react2.default.createElement(_loginForm2.default, {
                    registerUser: this.registerUser,
                    showInputCode: showInputCode,
                    loginUser: this.loginUser,
                    errorRegistration: errorRegistration,
                    errorLogin: errorLogin,
                    resendActivationEmail: this.resendActivationEmail,
                    handleChangeRegistration: this.handleChangeRegistration,
                    handleChangeLogin: this.handleChangeLogin,
                    closeLoginForm: this.closeLoginForm,
                    loginFacebook: this.loginFacebook,
                    loginGoogle: this.loginGoogle
                  }),
                  _react2.default.createElement('input', { type: 'checkbox', id: 'forgotPassword' }),
                  _react2.default.createElement(_loginFormForgotPassword2.default, null),
                  !user.isLogin && _react2.default.createElement(
                    'label',
                    { onClick: function onClick() {
                        return $('.login-box-wrapper').css({ display: 'block' });
                      }, className: pageNotFound ? 'show-desktop login-page404 basket' : 'show-desktop login basket', htmlFor: 'op' },
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/person-top.svg', alt: '' })
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: pageNotFound ? 'show-desktop basketButtons-page404' : 'show-desktop basketButtons' },
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { to: '/warenkorb' },
                      _react2.default.createElement(
                        'span',
                        { className: 'basket cart-icon' },
                        _react2.default.createElement(
                          'span',
                          null,
                          _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/cart-new.svg', alt: '' })
                        ),
                        basket.countVerkaufen + basket.count > 0 && _react2.default.createElement(
                          'span',
                          { className: 'count cart-total-kaufen' },
                          basket.countVerkaufen + basket.count
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: pageNotFound ? 'show-desktop wishButton-page404' : 'show-desktop wishButtons' },
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { to: '/wunschliste' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/wishIcon.svg', alt: '' }),
                        basket.wishlistCount > 0 && _react2.default.createElement(
                          'span',
                          { className: 'count wish-total-kaufen' },
                          basket.wishlistCount
                        )
                      )
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(_headerMobile2.default, { menu: true, title: '<img loading="lazy" alt="Logo" src="/images/design/logo_all_pages.svg"/>' }),
          false && _react2.default.createElement(
            'div',
            { className: 'row d-none header-mobile scrolling-header show-ipad' },
            _react2.default.createElement(
              'div',
              { className: 'wrap-header' },
              _react2.default.createElement(
                'div',
                { className: 'col-xs-2' },
                _react2.default.createElement(
                  'div',
                  { className: 'hamburger', onClick: this.showMenu },
                  _react2.default.createElement(
                    'svg',
                    { viewBox: '0 0 64 48' },
                    _react2.default.createElement('path', { d: 'M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37' }),
                    _react2.default.createElement('path', { d: 'M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24' }),
                    _react2.default.createElement('path', { d: 'M45,33 L19,33 C-8,33 6,-2 22,14 L45,37' })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-xs-8 text-center' },
                _react2.default.createElement(
                  'p',
                  { className: 'title' },
                  _react2.default.createElement('img', { loading: 'lazy', alt: 'Logo', src: '/images/design/logo_all_pages.svg' })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-xs-2 text-right' },
                _react2.default.createElement(
                  'span',
                  { className: 'basketButtons' },
                  _react2.default.createElement(
                    'span',
                    { className: 'basket' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/cart-new.svg' })
                  ),
                  basket.countVerkaufen + basket.count > 0 && _react2.default.createElement(
                    'span',
                    { className: 'count cart-total-kaufen' },
                    basket.countVerkaufen + basket.count
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'basketLinks' },
                    _react2.default.createElement(
                      'a',
                      { href: '/warenkorb' },
                      'Warenkorb'
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '/verkaufen/warenkorb' },
                      'Verkaufskorb'
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(_menuMobile2.default, { showLangMenu: null })
          ),
          urlPathName === '/' && !window.isMobile && _react2.default.createElement(_headerBottomMainPage2.default, null),
          urlPathName === '/jobs' && _react2.default.createElement(_headerBottomJobsPage2.default, null),
          urlPathName === '/faq' && _react2.default.createElement(_headerBottomFaqPage2.default, null),
          spinner,
          msgInfo,
          this.state.showCouponFromAds && _react2.default.createElement(_couponFromAds2.default, { toggleLightbox: this.toggleCouponFromAds })
        )
      );
    }
  }]);
  return HeaderTop;
}(_react.Component);

function mapStateToProps(state) {
  return {
    user: state.user,
    msgInfo: state.user.msgInfo,
    basket: state.basket,
    shop: state.shop
  };
}
function mapDispatchToProps(dispatch) {
  return {
    userActions: (0, _redux.bindActionCreators)(userActions, dispatch),
    shopActions: (0, _redux.bindActionCreators)(shopActions, dispatch),
    placesActions: (0, _redux.bindActionCreators)(placesActions, dispatch)
  };
}

exports.default = (0, _reactI18next.withTranslation)()((0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, { pure: false })((0, _reactI18next.withTranslation)()(HeaderTop))));

/***/ }),

/***/ 1509:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderBottomFaqPage = function HeaderBottomFaqPage() {
    return _react2.default.createElement(
        'div',
        { className: 'faq-header-content' },
        _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Faq'
                        )
                    )
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'assistant' },
            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/Guy.svg', alt: '' }),
            _react2.default.createElement(
                'div',
                { className: 'say' },
                _react2.default.createElement(
                    'p',
                    null,
                    'Guten Tag.'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Wie k\xF6nnen wir dir helfen?'
                )
            )
        )
    );
};

HeaderBottomFaqPage.propTypes = {};
HeaderBottomFaqPage.defaultProps = {};

exports.default = HeaderBottomFaqPage;

/***/ }),

/***/ 1510:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderBottomJobsPage = function HeaderBottomJobsPage() {
    return _react2.default.createElement(
        'div',
        { className: 'jobs-header-content' },
        _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Jobs'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Du hast Interesse an der neusten Technik und m\xF6chtest in einem motivierten und wachsenden Team mitarbeiten?'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'remarket.ch bietet dir hier die richtige Herausforderung.'
                        )
                    )
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'assistant' },
            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/Guy.svg', alt: '' }),
            _react2.default.createElement(
                'div',
                { className: 'say' },
                _react2.default.createElement(
                    'p',
                    null,
                    'Wir suchen DICH!'
                )
            )
        )
    );
};

HeaderBottomJobsPage.propTypes = {};
HeaderBottomJobsPage.defaultProps = {};

exports.default = HeaderBottomJobsPage;

/***/ }),

/***/ 1511:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchBarKaufenV3 = undefined;

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

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

var _axios = __webpack_require__(149);

var _axios2 = _interopRequireDefault(_axios);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _debounce2 = __webpack_require__(899);

var _debounce3 = _interopRequireDefault(_debounce2);

var _reactRouter = __webpack_require__(206);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _shop = __webpack_require__(873);

var shopActions = _interopRequireWildcard(_shop);

var _helpersFunction = __webpack_require__(316);

var _reactAutosuggest = __webpack_require__(907);

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moreCount = 5;

var SearchBarKaufenV3 = exports.SearchBarKaufenV3 = function (_Component) {
    (0, _inherits3.default)(SearchBarKaufenV3, _Component);

    function SearchBarKaufenV3(props) {
        (0, _classCallCheck3.default)(this, SearchBarKaufenV3);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBarKaufenV3.__proto__ || Object.getPrototypeOf(SearchBarKaufenV3)).call(this, props));

        _this.getSuggestionValue = function (suggestion) {
            return suggestion.name;
        };

        _this.getSectionSuggestions = function (section) {
            return section.item;
        };

        _this.renderSectionTitle = function (suggestion) {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'searchResultSection' },
                    _react2.default.createElement(
                        'div',
                        { className: 'searchResultSectionTitle' },
                        suggestion.section.name
                    ),
                    suggestion.section.count > moreCount && _react2.default.createElement(
                        'div',
                        { className: 'searchResultSectionnMore', onClick: function onClick(e) {
                                return _this._clickViewmore(e, suggestion.section.id);
                            } },
                        'Mehr anzeigen'
                    )
                )
            );
        };

        _this.renderSuggestion = function (suggestion) {
            var value = _this.state.value,
                suggestionName = suggestion.name;
            var lang = (0, _helpersFunction.getLang)();
            if (lang == 'en') {
                suggestionName = suggestion.name_en;
            } else if (lang == 'fr') {
                suggestionName = suggestion.name_fr;
            } else if (lang == 'it') {
                suggestionName = suggestion.name_it;
            }
            if (suggestion.searchType == 'device') {
                var capacity = suggestion.capacity;
                var color = suggestion.color;
                if (lang == 'en') {
                    capacity = suggestion.capacity_en;
                    color = suggestion.color_en;
                } else if (lang == 'fr') {
                    capacity = suggestion.capacity_fr;
                    color = suggestion.color_fr;
                } else if (lang == 'it') {
                    capacity = suggestion.capacity_it;
                    color = suggestion.color_it;
                }
                suggestionName = capacity && capacity.length != '' ? suggestionName + ", " + capacity : suggestionName;
                suggestionName = color && color.length != '' ? suggestionName + ", " + color : suggestionName;
            }

            var searshStrings = value.split(" ");
            var result = searshStrings.some(function (searshString) {
                return suggestionName.toLowerCase().includes(searshString.toLocaleLowerCase());
            });
            var text = '',
                name = suggestionName.toLowerCase().trim();
            if (result) {
                var searchResults = [];
                var searchStartIndex = 0;
                searshStrings.forEach(function (searshString) {
                    var index = name.indexOf(searshString.trim().toLowerCase(), searchStartIndex);
                    var len = searshString.trim().length;
                    searchResults = [].concat((0, _toConsumableArray3.default)(searchResults), [{
                        start: index,
                        len: len
                    }]);
                    searchStartIndex = index + len;
                });

                var getIndex = 0;
                var formatText = '';
                var lastText = '';
                for (var i = 0; i < searchResults.length; i++) {
                    text = suggestionName.slice(getIndex, searchResults[i].start);
                    var orgText = suggestionName.slice(searchResults[i].start, searchResults[i].start + searchResults[i].len);
                    formatText += text + '<span class="searchText">' + orgText + '</span>';
                    getIndex = searchResults[i].start + searchResults[i].len;
                    lastText = suggestionName.slice(getIndex, suggestionName.length);
                }
                formatText += lastText;

                var cssClass = 'searchResultItem';
                if (suggestion.hide) {
                    cssClass = 'searchResultItem hide';
                }
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: cssClass },
                        _react2.default.createElement(
                            'div',
                            { className: 'searchResultItemTitle' },
                            _react2.default.createElement(
                                'div',
                                { className: 'verkaufen-search-img' },
                                _react2.default.createElement('img', { loading: 'lazy', className: 'verkaufen-search-img', src: suggestion.image })
                            ),
                            _react2.default.createElement('div', { className: 'searchResultItemName', dangerouslySetInnerHTML: { __html: formatText } })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'searchResultItemPrice', style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '5px',
                                    marginLeft: '20px'
                                } },
                            _react2.default.createElement(
                                'span',
                                null,
                                (0, _helpersFunction.formatPrice)(suggestion.price)
                            ),
                            ' ',
                            _react2.default.createElement(
                                'span',
                                null,
                                'CHF'
                            )
                        )
                    )
                );
            }
        };

        _this.pressEnterOnInput = function (e) {
            if (e.key === "Enter") {
                _this.setState({ pressSearch: true });
                _reactRouter.browserHistory.push('/kaufen/search/' + _this.state.value);
            }
        };

        _this.onSuggestionsFetchRequested = function (_ref) {
            var value = _ref.value;

            _this.debouncedLoadSuggestions(value);
        };

        _this.onSuggestionSelected = function (event, _ref2) {
            var suggestion = _ref2.suggestion;

            _this.onSuggestionsClearRequested();
            _this.setState({
                value: ''
            });
            if (suggestion.searchType === "product") {
                var modelName = suggestion.name.split(" ").join('-').toLowerCase();
                modelName = modelName.split('/');
                _reactRouter.browserHistory.push('/kaufen/detail/zubehoer/' + suggestion.categoryName + '/' + modelName[modelName.length - 1] + '/' + suggestion.shortcode);
            } else if (suggestion.searchType === "device") {
                var _modelName = suggestion.name.replace(/ /g, '-').toLowerCase(),
                    color = suggestion.color.toLowerCase(),
                    capacity = suggestion.capacity.toLowerCase(),
                    deviceName = suggestion.deviceName;
                var url = '/kaufen/detail/' + deviceName + '/' + _modelName + '/' + capacity + '/' + color + '/' + suggestion.shortcode;
                _reactRouter.browserHistory.push(url);
            }
        };

        _this.onSuggestionsClearRequested = function () {
            _this.setState({
                suggestions: []
            });
        };

        _this.onClickSearchIcon = function () {
            $(".top-search-bar").addClass("searchBar-open");
            setTimeout(function () {
                $("#searchInput").focus();
            }, 1000);
        };

        _this.onChange = function (event, _ref3) {
            var newValue = _ref3.newValue;

            if (newValue === '') $(".top-search-bar").removeClass("searchBar-loading");
            _this.setState({
                value: newValue
            });
        };

        _this.onBlur = function (event) {
            $(".top-search-bar").removeClass("searchBar-open searchBar-loading");
            _this.setState({
                value: ''
            });
            setTimeout(function () {
                $("#searchInput").val('');
            }, 400);
        };

        _this.state = {
            value: '',
            suggestions: [],
            filteredByShortcode: false
        };

        _this._parseUrl = _this._parseUrl.bind(_this);
        _this._clickViewmore = _this._clickViewmore.bind(_this);
        _this._getObjForRequest = _this._getObjForRequest.bind(_this);
        _this._getProductSuggestions = _this._getProductSuggestions.bind(_this);
        _this._setProductSuggestions = _this._setProductSuggestions.bind(_this);
        _this._getDeviceSuggestions = _this._getDeviceSuggestions.bind(_this);
        _this._setDeviceSuggestions = _this._setDeviceSuggestions.bind(_this);
        _this._setBothSuggestions = _this._setBothSuggestions.bind(_this);
        _this.debouncedLoadSuggestions = (0, _debounce3.default)(_this.loadSuggestions, 1000);
        _this.onClickSearchIcon = _this.onClickSearchIcon.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(SearchBarKaufenV3, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var placeholder = this.props.placeholder || '';
            var placeholderArr = placeholder.split(/ +/);
            if (placeholderArr.length) {
                var spans = $('<div id="placeHolderDiv" />');
                $.each(placeholderArr, function (index, value) {
                    spans.append($('<span />').html(value + '&nbsp;'));
                });
                $("#searchInput").parent().append(spans);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.debouncedLoadSuggestions.cancel();
        }
    }, {
        key: '_clickViewmore',
        value: function _clickViewmore(e, sectionId) {
            var suggestions = this.state.suggestions;

            var newSuggestions = suggestions.map(function (suggestion) {
                if (suggestion.section.id === sectionId) {
                    var hideItems = suggestion.item.find(function (item) {
                        return item.hide === true;
                    });
                    var newItem = [];
                    if (typeof hideItems !== 'undefined') {
                        newItem = suggestion.item.map(function (item) {
                            return (0, _extends3.default)({}, item, {
                                hide: false
                            });
                        });
                    } else {
                        newItem = suggestion.item.map(function (item, index) {
                            if (index + 1 > moreCount) {
                                return (0, _extends3.default)({}, item, {
                                    hide: true
                                });
                            } else {
                                return item;
                            }
                        });
                    }
                    return (0, _extends3.default)({}, suggestion, {
                        item: newItem
                    });
                } else {
                    return suggestion;
                }
            });

            this.setState({
                suggestions: newSuggestions
            });
        }
    }, {
        key: '_parseUrl',
        value: function _parseUrl(nextPropsParams) {
            var urlParams = nextPropsParams,
                selectedFilterOptions = {
                page: 1,
                price: {
                    min: 0,
                    max: 1,
                    maxSearch: 0,
                    minSearch: 0
                },
                lagerort: { values: [] },
                modell: { values: [] },
                zustand: { values: [] },
                sort: nextPropsParams.deviceCategory1 === 'zubehör' ? 'popular' : 'popular'

            },
                storageLocationData = JSON.parse(window.localStorage.getItem("locationData")),
                currentLocationData = {};
            this.props.places ? currentLocationData = this.props.places : storageLocationData ? storageLocationData.data.forEach(function (item) {
                if (item.active === true) {
                    currentLocationData = item;
                }
            }) : currentLocationData = null;
            for (var key in urlParams) {
                if (key.includes('param') && urlParams[key]) {
                    (function () {
                        var name = urlParams[key].slice(0, urlParams[key].indexOf('=')),
                            paramsArr = [];

                        if (name === "preis") {
                            paramsArr = urlParams[key].slice(urlParams[key].indexOf('=') + 1).split('-');
                            selectedFilterOptions.price.minSearch = paramsArr[0];
                            selectedFilterOptions.price.maxSearch = paramsArr[1];
                        } else if (name === "sort" || name === "page") {
                            paramsArr = urlParams[key].slice(urlParams[key].indexOf('=') + 1);
                            selectedFilterOptions[name] = paramsArr;
                        } else {
                            paramsArr = urlParams[key].slice(urlParams[key].indexOf('=') + 1).split(',');
                            paramsArr.forEach(function (item, i) {
                                return paramsArr[i] = item.replace(/-/g, ' ').replace(/\|/g, '/');
                            });
                            selectedFilterOptions[name] = paramsArr;
                        }
                    })();
                }
            }
            return selectedFilterOptions;
        }
    }, {
        key: '_getObjForRequest',
        value: function _getObjForRequest(selectedFilterOptions, devices, searchType, value, deviceName) {
            var objForRequest = (0, _extends3.default)({}, selectedFilterOptions);

            for (var key in objForRequest) {
                if (key !== 'price' && key !== 'sort' && key !== 'page') objForRequest[key] = [].concat((0, _toConsumableArray3.default)(selectedFilterOptions[key]));
            }

            var lang = (0, _helpersFunction.getLang)();

            objForRequest['criterias'] = {};
            objForRequest['specifications'] = {};
            objForRequest['page'] = 1;
            objForRequest['deviceName'] = deviceName;
            objForRequest['searchQuery'] = value;
            objForRequest['webShopCategoryIds'] = [];
            objForRequest['modelCategoryIds'] = [];
            objForRequest['lang'] = lang;
            if (searchType === 'product') {
                var productCategories = devices.filter(function (item) {
                    return item.name.toLowerCase() === 'zubehör';
                });
                if (productCategories.length > 0 && deviceName !== '') {
                    objForRequest['webShopCategoryIds'] = productCategories[0].submodels.filter(function (item) {
                        return item.name.toLowerCase() === deviceName;
                    }).map(function (item1) {
                        return item1.id;
                    });
                }
            } else if (searchType === 'device') {
                // use search by deviceName
            } else if (searchType === 'both') {
                var _productCategories = devices.filter(function (item) {
                    return item.name.toLowerCase() === 'zubehör';
                });
                if (_productCategories.length > 0) {
                    objForRequest['webShopCategoryIds'] = _productCategories[0].submodels.map(function (item1) {
                        return item1.id;
                    });
                }
                var deviceModels = devices.filter(function (item) {
                    return item.name.toLowerCase() !== 'zubehör';
                });
                if (deviceModels.length > 0) {
                    objForRequest['modelCategoryIds'] = deviceModels.map(function (item1) {
                        return item1.id;
                    });
                }
            }

            var arrKeys = ['lagerort', 'modell', 'deviceName', 'webShopCategoryIds', 'modelCategoryIds', 'price', 'zustand', 'garantie', 'sort', 'page', 'criterias', 'specifications', 'searchQuery', 'lang'];

            var _loop = function _loop(_key) {
                if (arrKeys.every(function (item) {
                    return item !== _key;
                })) {
                    var name = _key.slice(_key.lastIndexOf('-') + 1),
                        currentFilterName = _key.slice(0, _key.lastIndexOf('-')),
                        filterType = currentFilterName === 'kategorie' ? 'criterias' : 'specifications';

                    objForRequest[filterType][name] = [].concat((0, _toConsumableArray3.default)(objForRequest[_key]));
                    delete objForRequest[_key];
                }
            };

            for (var _key in objForRequest) {
                _loop(_key);
            }

            return objForRequest;
        }
    }, {
        key: '_getProductSuggestions',
        value: function _getProductSuggestions(data) {
            var productCategories = this.props.devices.filter(function (item) {
                return item.name.toLowerCase() === 'zubehör';
            });
            if (productCategories.length > 0) {
                var productItems = data.map(function (item, i) {
                    return {
                        id: item.id,
                        name: item.descriptionSearch,
                        name_en: item.descriptionSearch_en,
                        name_fr: item.descriptionSearch_fr,
                        name_it: item.descriptionSearch_it,
                        price: item.price,
                        image: item.deviceImages ? item.deviceImages.mainImg.src : '/images/design/' + productCategories[0].id + 'device.svg',
                        categoryName: item.categoryName,
                        shortcode: item.shortcode,
                        searchType: 'product',
                        categoryId: productCategories[0].id,
                        index: i,
                        hide: i + 1 > moreCount ? true : false
                    };
                });

                var productSection = {
                    id: productCategories[0].id,
                    name: productCategories[0].name,
                    count: productItems.length
                };
                return [{
                    section: productSection,
                    item: productItems
                }];
            } else {
                return [];
            }
        }
    }, {
        key: '_setProductSuggestions',
        value: function _setProductSuggestions(data) {
            this.setState({
                suggestions: this._getProductSuggestions(data)
            });
        }
    }, {
        key: '_getDeviceSuggestions',
        value: function _getDeviceSuggestions(data) {
            var deviceCategories = this.props.devices.filter(function (item) {
                return item.name.toLowerCase() !== 'zubehör';
            });
            if (deviceCategories.length > 0) {
                var deviceSuggestions = [];
                deviceCategories.map(function (deviceCategory) {
                    var deviceDatas = data.filter(function (item) {
                        return item.mainDeviceId === deviceCategory.id;
                    });
                    if (deviceDatas.length > 0) {
                        var deviceSection = {
                            id: deviceCategory.id,
                            name: deviceCategory.name,
                            count: deviceDatas.length
                        };

                        var deviceItems = deviceDatas.map(function (item, i) {
                            return {
                                id: item.id,
                                name: item.model,
                                name_en: item.model_en,
                                name_fr: item.model_fr,
                                name_it: item.model_it,
                                price: item.price,
                                color: item.color ? item.color : 'color',
                                color_en: item.color_en ? item.color_en : 'color',
                                color_fr: item.color_fr ? item.color_fr : 'color',
                                color_it: item.color_it ? item.color_it : 'color',
                                capacity: item.capacity ? item.capacity : 'capacity',
                                capacity_en: item.capacity_en ? item.capacity_en : 'capacity',
                                capacity_fr: item.capacity_fr ? item.capacity_fr : 'capacity',
                                capacity_it: item.capacity_it ? item.capacity_it : 'capacity',
                                deviceName: item.deviceName.replace(/ /g, '-').toLowerCase(),
                                image: item.deviceImages ? item.deviceImages.mainImg.src : '/images/design/' + deviceCategory.id + 'device.svg',
                                categoryName: item.deviceName,
                                shortcode: item.shortcode,
                                searchType: 'device',
                                categoryId: item.DeviceId,
                                index: i,
                                hide: i + 1 > moreCount ? true : false
                            };
                        });

                        deviceSuggestions = [].concat((0, _toConsumableArray3.default)(deviceSuggestions), [{
                            section: deviceSection,
                            item: deviceItems
                        }]);
                    }
                });
                return deviceSuggestions;
            } else {
                return [];
            }
        }
    }, {
        key: '_setDeviceSuggestions',
        value: function _setDeviceSuggestions(data) {
            this.setState({
                suggestions: this._getDeviceSuggestions(data)
            });
        }
    }, {
        key: '_setBothSuggestions',
        value: function _setBothSuggestions(productData, deviceData) {
            var deviceDatas = this._getDeviceSuggestions(deviceData);
            var productDatas = this._getProductSuggestions(productData);
            var suggestions = [];
            suggestions = [].concat((0, _toConsumableArray3.default)(suggestions), (0, _toConsumableArray3.default)(deviceDatas), (0, _toConsumableArray3.default)(productDatas));
            this.setState({
                suggestions: suggestions
            });
        }
    }, {
        key: 'loadSuggestions',
        value: function loadSuggestions(value) {
            var _this2 = this;

            if (value.length < 5) {
                $(".top-search-bar").toggleClass('searchBar-loading', false);
                return;
            }

            $(".top-search-bar").toggleClass('searchBar-loading', value.length >= 5);

            var params = this.props.params,
                selectedFilterOptions = this._parseUrl(this.props.params),
                deviceName = '';


            var searchType = 'both';

            var objForRequest = this._getObjForRequest(selectedFilterOptions, this.props.devices, searchType, value, deviceName);

            this.onSuggestionsClearRequested();
            if (searchType === 'product') {
                _axios2.default.post('/api/searchShopCategoryProducts', objForRequest).then(function (_ref4) {
                    var data = _ref4.data;

                    _this2._setProductSuggestions(data.data);
                    $(".top-search-bar").toggleClass('searchBar-loading', false);
                }).catch(function (error) {});
            } else if (searchType === 'device') {
                _axios2.default.post('/api/searchModels', objForRequest).then(function (_ref5) {
                    var data = _ref5.data;

                    _this2._setDeviceSuggestions(data.data);
                    $(".top-search-bar").toggleClass('searchBar-loading', false);
                }).catch(function (error) {});
            } else if (searchType === 'both') {
                var promise1 = _axios2.default.post('/api/searchShopCategoryProducts', objForRequest);
                var promise2 = _axios2.default.post('/api/searchModels', objForRequest);
                Promise.all([promise1, promise2]).then(function (values) {
                    var productData = [],
                        deviceData = [];
                    values.forEach(function (item) {
                        if (item.config.url === '/api/searchShopCategoryProducts') {
                            productData = item.data.data;
                        } else if (item.config.url === '/api/searchModels') {
                            deviceData = item.data.data;
                        }
                    });

                    _this2._setBothSuggestions(productData, deviceData);
                    $(".top-search-bar").toggleClass('searchBar-loading', false);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                value = _state.value,
                suggestions = _state.suggestions;
            var pathname = this.props.location.pathname;

            var inputProps = {
                placeholder: this.props.placeholder || '',
                value: value,
                onChange: this.onChange,
                onBlur: this.onBlur,
                id: 'searchInput',
                autoFocus: true
            };
            return _react2.default.createElement(
                'div',
                { className: 'top-search-bar', onClick: this.onClickSearchIcon },
                pathname === '/' ? null : null,
                _react2.default.createElement(
                    'div',
                    { className: 'searchBar-icon' },
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'svg',
                            { viewBox: '0 0 40 40' },
                            _react2.default.createElement('path', { d: 'M3,3 L37,37' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'searchBar-field' },
                    _react2.default.createElement(_reactAutosuggest2.default, {
                        multiSection: true,
                        suggestions: suggestions,
                        onSuggestionSelected: this.onSuggestionSelected,
                        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
                        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
                        getSuggestionValue: this.getSuggestionValue,
                        renderSuggestion: this.renderSuggestion,
                        renderSectionTitle: this.renderSectionTitle,
                        getSectionSuggestions: this.getSectionSuggestions,
                        inputProps: inputProps
                    })
                ),
                (window.isMobile || window.isTablet) && _react2.default.createElement(
                    'div',
                    { className: 'closeDiv', onClick: this.props.hideSearchBar },
                    _react2.default.createElement('img', { loading: 'lazy', src: "/images/design/closeBtn.svg" })
                )
            );
        }
    }]);
    return SearchBarKaufenV3;
}(_react.Component);

SearchBarKaufenV3.propTypes = {};
SearchBarKaufenV3.defaultProps = {};

function mapStateToProps(state) {
    return {
        devices: state.shop.devices
    };
}
function mapDispatchToProps(dispatch) {
    return {
        shopActions: (0, _redux.bindActionCreators)(shopActions, dispatch)
    };
}

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchBarKaufenV3));

/***/ }),

/***/ 1693:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var META = exports.META = {
    'title_ch': 'ᐅ Neues oder gebrauchtes iPhone, Samsung Galaxy, Macbook oder iMac online kaufen oder verkaufen auf remarket.ch - Basel, Bern, Solothurn',
    'title_de': 'Gebrauchte Smartphones, Tablets und Mac-Computer online kaufen und verkaufen',
    'description_ch': 'Verkaufen und kaufen Sie Ihr neues und gebrauchtes iPhone, Samsung Galaxy, Huawei, iPad, Macbook und iMac zu fairen Preisen. Express Auszahlung auch in der Filiale Basel, Solothurn und Bern möglich.',
    'description_de': 'Verkaufen und kaufen Sie neue und gebrauchte Tablets, Smartphones oder Macbooks schnell und unkompliziert auf remarket.de'
};

/***/ }),

/***/ 1694:
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

var _reactRouter = __webpack_require__(206);

var _apiCookie = __webpack_require__(941);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CookieBanner = function (_Component) {
    (0, _inherits3.default)(CookieBanner, _Component);

    function CookieBanner(props) {
        (0, _classCallCheck3.default)(this, CookieBanner);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CookieBanner.__proto__ || Object.getPrototypeOf(CookieBanner)).call(this, props));

        _this.state = {
            showBanner: true
        };

        _this.closeBanner = _this.closeBanner.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(CookieBanner, [{
        key: 'closeBanner',
        value: function closeBanner() {
            _apiCookie.cookieApi.setCookie('cookieBannerHasBeenClosed', 'true', { path: '/', expires: window.expireTimeWriteRating });
            this.setState({ showBanner: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var showBanner = this.state.showBanner;

            if (showBanner) {
                return _react2.default.createElement(
                    'div',
                    { className: 'cookie-banner' },
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'image' },
                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/cookies.svg', alt: '' })
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Wir verwenden Cookies, um Ihre Nutzererfahrung auf unserer Webseite zu verbessern. Sie akzeptieren, indem Sie auf unserer Webseite weitersurfen, dass wir Cookies einsetzen und verwenden. F\xFCr weitere Informationen \xFCber Cookies besuchen Sie bitte unsere ',
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/ueber-uns/datenschutzerklaerung/' },
                                'Datenschutzrichtlinie'
                            ),
                            '.'
                        )
                    ),
                    _react2.default.createElement('div', { className: 'close-btn', onClick: this.closeBanner })
                );
            } else return null;
        }
    }]);
    return CookieBanner;
}(_react.Component);

CookieBanner.propTypes = {};
CookieBanner.defaultProps = {};
exports.default = CookieBanner;

/***/ }),

/***/ 1695:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _headerTop = __webpack_require__(1508);

var _headerTop2 = _interopRequireDefault(_headerTop);

var _headerMobile = __webpack_require__(932);

var _headerMobile2 = _interopRequireDefault(_headerMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderMainPage = function HeaderMainPage(_ref) {
        var params = _ref.params,
            isJobPage = _ref.isJobPage;

        return _react2.default.createElement(
                'header',
                null,
                _react2.default.createElement(_headerTop2.default, { params: params, isJobPage: isJobPage }),
                window.isMobile && !window.isTablet && _react2.default.createElement(_headerMobile2.default, { menu: true, title: '<img loading="lazy" alt="Logo" src="/images/design/logo_all_pages.svg"/>' })
        );
};

exports.default = HeaderMainPage;

/***/ }),

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpinnerBox = function SpinnerBox(_ref) {
    var _ref$id = _ref.id,
        id = _ref$id === undefined ? "spinner-box-load" : _ref$id;


    return _react2.default.createElement(
        "div",
        { id: id, className: "dn" },
        _react2.default.createElement(
            "div",
            { className: "animation" },
            _react2.default.createElement("div", { className: "circle" }),
            _react2.default.createElement("img", { loading: "lazy", src: "/images/design/logo_animation-spinner.svg", alt: "Logo" })
        )
    );
};
exports.default = SpinnerBox;

/***/ }),

/***/ 820:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ApplicationMobile = undefined;

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

var _reactHelmet = __webpack_require__(1057);

var _spinnerBox = __webpack_require__(769);

var _spinnerBox2 = _interopRequireDefault(_spinnerBox);

var _headerMainPage = __webpack_require__(1695);

var _headerMainPage2 = _interopRequireDefault(_headerMainPage);

var _cookieBanner = __webpack_require__(1694);

var _cookieBanner2 = _interopRequireDefault(_cookieBanner);

var _meta = __webpack_require__(1693);

var _reactRouter = __webpack_require__(206);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApplicationMobile = exports.ApplicationMobile = function (_Component) {
    (0, _inherits3.default)(ApplicationMobile, _Component);

    function ApplicationMobile(props) {
        (0, _classCallCheck3.default)(this, ApplicationMobile);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ApplicationMobile.__proto__ || Object.getPrototypeOf(ApplicationMobile)).call(this, props));

        var reactRedirect = document.body.dataset.reactRedirect;

        if (reactRedirect) {
            _reactRouter.browserHistory.push(reactRedirect);
            return (0, _possibleConstructorReturn3.default)(_this);
        }
        return _this;
    }

    (0, _createClass3.default)(ApplicationMobile, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {
            var domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1];

            return _react2.default.createElement(
                "div",
                { id: "mobile" },
                _react2.default.createElement(_reactHelmet.Helmet, {
                    title: window.domainName.name === 'remarket.ch' ? _meta.META.title_ch : _meta.META.title_de,
                    meta: [{ "name": "description", "content": window.domainName.name === 'remarket.ch' ? _meta.META.description_ch : _meta.META.description_de }]
                }),
                this.props.children,
                _react2.default.createElement(_spinnerBox2.default, { id: "spinner-box-load" }),
                _react2.default.createElement(
                    "div",
                    { className: "hiddenHeader" },
                    _react2.default.createElement(_headerMainPage2.default, null)
                ),
                domain === 'de' && _react2.default.createElement(_cookieBanner2.default, null)
            );
        }
    }]);
    return ApplicationMobile;
}(_react.Component);

exports.default = ApplicationMobile;

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

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = compareObjects;
function compareObjects(objA, objB) {
  var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (objA === objB) {
    return false;
  }

  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);

  if (aKeys.length !== bKeys.length) {
    return true;
  }

  var keysMap = {};
  var i = void 0,
      len = void 0;

  for (i = 0, len = keys.length; i < len; i++) {
    keysMap[keys[i]] = true;
  }

  for (i = 0, len = aKeys.length; i < len; i++) {
    var key = aKeys[i];
    var aValue = objA[key];
    var bValue = objB[key];

    if (aValue === bValue) {
      continue;
    }

    if (!keysMap[key] || aValue === null || bValue === null || (typeof aValue === 'undefined' ? 'undefined' : _typeof(aValue)) !== 'object' || (typeof bValue === 'undefined' ? 'undefined' : _typeof(bValue)) !== 'object') {
      return true;
    }

    var aValueKeys = Object.keys(aValue);
    var bValueKeys = Object.keys(bValue);

    if (aValueKeys.length !== bValueKeys.length) {
      return true;
    }

    for (var n = 0, length = aValueKeys.length; n < length; n++) {
      var aValueKey = aValueKeys[n];

      if (aValue[aValueKey] !== bValue[aValueKey]) {
        return true;
      }
    }
  }

  return false;
}

/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(875), __esModule: true };

/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(317);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.loadDevices = loadDevices;
exports.loadModels = loadModels;
exports.setFilterOptions = setFilterOptions;
exports.setSearchResult = setSearchResult;
exports.definedCounerForSearchInput = definedCounerForSearchInput;

var _shop = __webpack_require__(332);

var types = _interopRequireWildcard(_shop);

var _index = __webpack_require__(330);

var _index2 = _interopRequireDefault(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadDevices(url, type) {
    return function (dispatch) {
        if (type === 'verkaufen') {
            var devicesForPurchaseWithParams = window.localStorage.getItem("devicesForPurchaseWithParams") && window.localStorage.getItem("devicesForPurchaseWithParams") !== '' ? JSON.parse(window.localStorage.getItem("devicesForPurchaseWithParams")) : null;
            if (devicesForPurchaseWithParams) {
                dispatch({
                    type: types.LOAD_DEVICES_FOR_SELL_SUCCESS,
                    payload: devicesForPurchaseWithParams
                });
            } else {
                _index2.default.loadDevices(url).then(function (_ref) {
                    var data = _ref.data.data;

                    window.localStorage.setItem('devicesForPurchaseWithParams', JSON.stringify(data));
                    dispatch({
                        type: types.LOAD_DEVICES_FOR_SELL_SUCCESS,
                        payload: data
                    });
                });
            }
        } else {
            var devicesData = window.localStorage.getItem("devicesData") && window.localStorage.getItem("devicesData") !== '' ? JSON.parse(window.localStorage.getItem("devicesData")) : null;
            var devicesForPurchase = window.localStorage.getItem("devicesForPurchase") && window.localStorage.getItem("devicesForPurchase") !== '' ? JSON.parse(window.localStorage.getItem("devicesForPurchase")) : null;
            if (url === '/api/devices' && devicesData) {
                dispatch({
                    type: types.LOAD_DEVICES_SUCCESS,
                    payload: devicesData
                });
            } else if (url === '/api/devicesForPurchase' && devicesForPurchase) {
                dispatch({
                    type: types.LOAD_DEVICES_SUCCESS,
                    payload: devicesForPurchase
                });
            } else {
                _index2.default.loadDevices(url).then(function (_ref2) {
                    var data = _ref2.data.data;

                    axios.get('/api/getShopCategories').then(function (result) {
                        var newData = [].concat((0, _toConsumableArray3.default)(data));
                        if (result.data.length > 0) newData = [].concat((0, _toConsumableArray3.default)(data), [{ id: 11, name: 'Zubehör', submodels: result.data }]);
                        if (url === '/api/devices') window.localStorage.setItem('devicesData', JSON.stringify(newData));
                        if (url === '/api/devicesForPurchase') window.localStorage.setItem('devicesForPurchase', JSON.stringify(newData));
                        dispatch({
                            type: types.LOAD_DEVICES_SUCCESS,
                            payload: newData
                        });
                    });
                });
            }
        }
    };
}

function loadModels(models, categoriesList) {
    return function (dispatch) {
        dispatch({
            type: types.LOAD_MODELS_SUCCESS,
            payload: {
                models: models,
                categoriesList: categoriesList
            }
        });
    };
}
function setFilterOptions(data) {
    return function (dispatch) {
        dispatch({
            type: types.SET_FILTER_OPTIONS_SUCCESS,
            payload: data
        });
    };
}
function setSearchResult(data, searchValue) {
    return {
        type: types.SET_SEARCH_RESULTS,
        payload: { data: data.data, total: data.meta.totalCount, searchValue: searchValue }
    };
}

function definedCounerForSearchInput(data) {
    return {
        type: types.RETURN_SEARCH_RESULTS_TO_PREV_ROUTE,
        payload: data
    };
}

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

/***/ 897:
/***/ (function(module, exports) {

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
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 899:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(897),
    now = __webpack_require__(910),
    toNumber = __webpack_require__(911);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

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
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
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
        clearTimeout(timerId);
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

module.exports = debounce;


/***/ }),

/***/ 902:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return Async; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncCreatable", function() { return AsyncCreatableSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Creatable", function() { return CreatableSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Value", function() { return Value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Option", function() { return Option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMenuRenderer", function() { return menuRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultArrowRenderer", function() { return arrowRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultClearRenderer", function() { return clearRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultFilterOptions", function() { return filterOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_input_autosize__ = __webpack_require__(908);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_input_autosize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_input_autosize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(869);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom__);






var arrowRenderer = function arrowRenderer(_ref) {
	var onMouseDown = _ref.onMouseDown;

	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', {
		className: 'Select-arrow',
		onMouseDown: onMouseDown
	});
};

arrowRenderer.propTypes = {
	onMouseDown: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

var clearRenderer = function clearRenderer() {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
};

var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

var stripDiacritics = function stripDiacritics(str) {
	for (var i = 0; i < map.length; i++) {
		str = str.replace(map[i].letters, map[i].base);
	}
	return str;
};

var trim = function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
};

var isValid = function isValid(value) {
	return typeof value !== 'undefined' && value !== null && value !== '';
};

var filterOptions = function filterOptions(options, filterValue, excludeOptions, props) {
	if (props.ignoreAccents) {
		filterValue = stripDiacritics(filterValue);
	}

	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (props.trimFilter) {
		filterValue = trim(filterValue);
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(undefined, option, filterValue);
		if (!filterValue) return true;

		var value = option[props.valueKey];
		var label = option[props.labelKey];
		var hasValue = isValid(value);
		var hasLabel = isValid(label);

		if (!hasValue && !hasLabel) {
			return false;
		}

		var valueTest = hasValue ? String(value) : null;
		var labelTest = hasLabel ? String(label) : null;

		if (props.ignoreAccents) {
			if (valueTest && props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
			if (labelTest && props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
		}

		if (props.ignoreCase) {
			if (valueTest && props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (labelTest && props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}

		return props.matchPos === 'start' ? valueTest && props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || labelTest && props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : valueTest && props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || labelTest && props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
	});
};

var menuRenderer = function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption,
	    focusOption = _ref.focusOption,
	    inputValue = _ref.inputValue,
	    instancePrefix = _ref.instancePrefix,
	    onFocus = _ref.onFocus,
	    onOptionRef = _ref.onOptionRef,
	    onSelect = _ref.onSelect,
	    optionClassName = _ref.optionClassName,
	    optionComponent = _ref.optionComponent,
	    optionRenderer = _ref.optionRenderer,
	    options = _ref.options,
	    removeValue = _ref.removeValue,
	    selectValue = _ref.selectValue,
	    valueArray = _ref.valueArray,
	    valueKey = _ref.valueKey;

	var Option = optionComponent;

	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.some(function (x) {
			return x[valueKey] === option[valueKey];
		});
		var isFocused = option === focusedOption;
		var optionClass = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
			Option,
			{
				className: optionClass,
				focusOption: focusOption,
				inputValue: inputValue,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function ref(_ref2) {
					onOptionRef(_ref2, isFocused);
				},
				removeValue: removeValue,
				selectValue: selectValue
			},
			optionRenderer(option, i, inputValue)
		);
	});
};

menuRenderer.propTypes = {
	focusOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	focusedOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
	inputValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
	instancePrefix: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
	onFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	onOptionRef: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	onSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	optionClassName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
	optionComponent: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	optionRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,
	removeValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	selectValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	valueArray: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,
	valueKey: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string
};

var blockEvent = (function (event) {
	event.preventDefault();
	event.stopPropagation();
	if (event.target.tagName !== 'A' || !('href' in event.target)) {
		return;
	}
	if (event.target.target) {
		window.open(event.target.href, event.target.target);
	} else {
		window.location.href = event.target.href;
	}
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
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



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Option = function (_React$Component) {
	inherits(Option, _React$Component);

	function Option(props) {
		classCallCheck(this, Option);

		var _this = possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
		_this.handleMouseMove = _this.handleMouseMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.onFocus = _this.onFocus.bind(_this);
		return _this;
	}

	createClass(Option, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		}
	}, {
		key: 'handleMouseEnter',
		value: function handleMouseEnter(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'onFocus',
		value: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    option = _props.option,
			    instancePrefix = _props.instancePrefix,
			    optionIndex = _props.optionIndex;

			var className = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(this.props.className, option.className);

			return option.disabled ? __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: className,
					onMouseDown: blockEvent,
					onClick: blockEvent },
				this.props.children
			) : __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					'aria-label': option.label,
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	}]);
	return Option;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Option.propTypes = {
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node,
	className: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // className (based on mouse position)
	instancePrefix: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string.isRequired, // unique prefix for the ids (used for aria)
	isDisabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // the option is disabled
	isFocused: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // the option is focused
	isSelected: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // the option is selected
	onFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle mouseEnter on option element
	onSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle click on option element
	onUnfocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle mouseLeave on option element
	option: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired, // object that is base for that option
	optionIndex: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number // index of the option, used to generate unique ids for aria
};

var Value = function (_React$Component) {
	inherits(Value, _React$Component);

	function Value(props) {
		classCallCheck(this, Value);

		var _this = possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.onRemove = _this.onRemove.bind(_this);
		_this.handleTouchEndRemove = _this.handleTouchEndRemove.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		return _this;
	}

	createClass(Value, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		}
	}, {
		key: 'onRemove',
		value: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		}
	}, {
		key: 'handleTouchEndRemove',
		value: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'renderRemoveIcon',
		value: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'\xD7'
			);
		}
	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('Select-value', this.props.value.disabled ? 'Select-value-disabled' : '', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}
	}]);
	return Value;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Value.propTypes = {
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node,
	disabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // disabled prop passed to ReactSelect
	id: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // Unique id for the value - used for aria
	onClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle click on value label
	onRemove: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle removal of the value
	value: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired // the option object for this value
};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/
var stringifyValue = function stringifyValue(value) {
	return typeof value === 'string' ? value : value !== null && JSON.stringify(value) || '';
};

var stringOrNode = __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]);
var stringOrNumber = __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number]);

var instanceId = 1;

var shouldShowValue = function shouldShowValue(state, props) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	if (!inputValue) return true;

	if (!onSelectResetsInput) {
		return !(!isFocused && isPseudoFocused || isFocused && !isPseudoFocused);
	}

	return false;
};

var shouldShowPlaceholder = function shouldShowPlaceholder(state, props, isOpen) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	return !inputValue || !onSelectResetsInput && !isOpen && !isPseudoFocused && !isFocused;
};

/**
 * Retrieve a value from the given options and valueKey
 * @param {String|Number|Array} value	- the selected value(s)
 * @param {Object}		 props	- the Select component's props (or nextProps)
 */
var expandValue = function expandValue(value, props) {
	var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
	var options = props.options,
	    valueKey = props.valueKey;

	if (!options) return;
	for (var i = 0; i < options.length; i++) {
		if (String(options[i][valueKey]) === String(value)) return options[i];
	}
};

var handleRequired = function handleRequired(value, multi) {
	if (!value) return true;
	return multi ? value.length === 0 : Object.keys(value).length === 0;
};

var Select$1 = function (_React$Component) {
	inherits(Select, _React$Component);

	function Select(props) {
		classCallCheck(this, Select);

		var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		['clearValue', 'focusOption', 'getOptionLabel', 'handleInputBlur', 'handleInputChange', 'handleInputFocus', 'handleInputValueChange', 'handleKeyDown', 'handleMenuScroll', 'handleMouseDown', 'handleMouseDownOnArrow', 'handleMouseDownOnMenu', 'handleTouchEnd', 'handleTouchEndClearValue', 'handleTouchMove', 'handleTouchOutside', 'handleTouchStart', 'handleValueClick', 'onOptionRef', 'removeValue', 'selectValue'].forEach(function (fn) {
			return _this[fn] = _this[fn].bind(_this);
		});

		_this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false
		};
		return _this;
	}

	createClass(Select, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: handleRequired(valueArray[0], this.props.multi)
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (typeof this.props.autofocus !== 'undefined' && typeof console !== 'undefined') {
				console.warn('Warning: The autofocus prop has changed to autoFocus, support will be removed after react-select@1.0');
			}
			if (this.props.autoFocus || this.props.autofocus) {
				this.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: handleRequired(valueArray[0], nextProps.multi)
				});
			} else if (this.props.required) {
				// Used to be required but it's not any more
				this.setState({ required: false });
			}

			if (this.state.inputValue && this.props.value !== nextProps.value && nextProps.onSelectResetsInput) {
				this.setState({ inputValue: this.handleInputValueChange('') });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.focused);
				var menuNode = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.menu);

				var scrollTop = menuNode.scrollTop;
				var scrollBottom = scrollTop + menuNode.offsetHeight;
				var optionTop = focusedOptionNode.offsetTop;
				var optionBottom = optionTop + focusedOptionNode.offsetHeight;

				if (scrollTop > optionTop || scrollBottom < optionBottom) {
					menuNode.scrollTop = focusedOptionNode.offsetTop;
				}

				// We still set hasScrolledToOption to true even if we didn't
				// actually need to scroll, as we've still confirmed that the
				// option is in view.
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.focused);
				var menuDOM = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				} else if (focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
			if (prevState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(this.state.isOpen);
				var handler = this.state.isOpen ? this.props.onOpen : this.props.onClose;
				handler && handler();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.toggleTouchOutsideEvent(false);
		}
	}, {
		key: 'toggleTouchOutsideEvent',
		value: function toggleTouchOutsideEvent(enabled) {
			var eventTogglerName = enabled ? document.addEventListener ? 'addEventListener' : 'attachEvent' : document.removeEventListener ? 'removeEventListener' : 'detachEvent';
			var pref = document.addEventListener ? '' : 'on';

			document[eventTogglerName](pref + 'touchstart', this.handleTouchOutside);
			document[eventTogglerName](pref + 'mousedown', this.handleTouchOutside);
		}
	}, {
		key: 'handleTouchOutside',
		value: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			if (!this.input) return;
			this.input.focus();
		}
	}, {
		key: 'blurInput',
		value: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchEndClearValue',
		value: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
				if (!this.state.isFocused) {
					this._openAfterFocus = this.props.openOnClick;
					this.focus();
				} else if (!this.state.isOpen) {
					this.setState({
						isOpen: true,
						isPseudoFocused: false,
						focusedOption: null
					});
				}

				return;
			}

			// prevent default event handlers
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				// This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen,
					focusedOption: null
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				var toOpen = true;

				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				if (this._focusAfterClear) {
					toOpen = false;
					this._focusAfterClear = false;
				}

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: toOpen,
					isPseudoFocused: false,
					focusedOption: null
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = this.props.openOnClick;
				this.focus();
				this.setState({ focusedOption: null });
			}
		}
	}, {
		key: 'handleMouseDownOnArrow',
		value: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (this.state.isOpen) {
				// prevent default event handlers
				event.stopPropagation();
				event.preventDefault();
				// close the menu
				this.closeMenu();
			} else {
				// If the menu isn't open, let the event bubble to the main handleMouseDown
				this.setState({
					isOpen: true
				});
			}
		}
	}, {
		key: 'handleMouseDownOnMenu',
		value: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					inputValue: this.handleInputValueChange(''),
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			}
			this.hasScrolledToOption = false;
		}
	}, {
		key: 'handleInputFocus',
		value: function handleInputFocus(event) {
			if (this.props.disabled) return;

			var toOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			toOpen = this._focusAfterClear ? false : toOpen; //if focus happens after clear values, don't open dropdown yet.

			if (this.props.onFocus) {
				this.props.onFocus(event);
			}

			this.setState({
				isFocused: true,
				isOpen: !!toOpen
			});

			this._focusAfterClear = false;
			this._openAfterFocus = false;
		}
	}, {
		key: 'handleInputBlur',
		value: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = this.handleInputValueChange('');
			}
			this.setState(onBlurredState);
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value) {
				newInputValue = this.handleInputValueChange(newInputValue);
			}

			this.setState({
				inputValue: newInputValue,
				isOpen: true,
				isPseudoFocused: false
			});
		}
	}, {
		key: 'setInputValue',
		value: function setInputValue(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			this.setState({
				inputValue: newValue
			});
		}
	}, {
		key: 'handleInputValueChange',
		value: function handleInputValueChange(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			return newValue;
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						break;
					}
					event.preventDefault();
					this.selectFocusedOption();
					break;
				case 13:
					// enter
					event.preventDefault();
					event.stopPropagation();
					if (this.state.isOpen) {
						this.selectFocusedOption();
					} else {
						this.focusNextOption();
					}
					break;
				case 27:
					// escape
					event.preventDefault();
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 32:
					// space
					if (this.props.searchable) {
						break;
					}
					event.preventDefault();
					if (!this.state.isOpen) {
						this.focusNextOption();
						break;
					}
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 38:
					// up
					event.preventDefault();
					this.focusPreviousOption();
					break;
				case 40:
					// down
					event.preventDefault();
					this.focusNextOption();
					break;
				case 33:
					// page up
					event.preventDefault();
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					event.preventDefault();
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusStartOption();
					break;
				case 46:
					// delete
					if (!this.state.inputValue && this.props.deleteRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
			}
		}
	}, {
		key: 'handleValueClick',
		value: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		}
	}, {
		key: 'handleMenuScroll',
		value: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && target.scrollHeight - target.offsetHeight - target.scrollTop <= 0) {
				this.props.onMenuScrollToBottom();
			}
		}
	}, {
		key: 'getOptionLabel',
		value: function getOptionLabel(op) {
			return op[this.props.labelKey];
		}

		/**
   * Turns a value into an array from the given options
   * @param {String|Number|Array} value		- the value of the select input
   * @param {Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
   * @returns	{Array}	the value of the select represented in an array
   */

	}, {
		key: 'getValueArray',
		value: function getValueArray(value) {
			var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') {
					value = value.split(props.delimiter);
				}
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		}
	}, {
		key: 'setValue',
		value: function setValue(value) {
			var _this2 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (this.props.required) {
				var required = handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		}
	}, {
		key: 'selectValue',
		value: function selectValue(value) {
			var _this3 = this;

			// NOTE: we actually add/set the value in a callback to make sure the
			// input value is empty to avoid styling issues in Chrome
			if (this.props.closeOnSelect) {
				this.hasScrolledToOption = false;
			}
			var updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
			if (this.props.multi) {
				this.setState({
					focusedIndex: null,
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect
				}, function () {
					var valueArray = _this3.getValueArray(_this3.props.value);
					if (valueArray.some(function (i) {
						return i[_this3.props.valueKey] === value[_this3.props.valueKey];
					})) {
						_this3.removeValue(value);
					} else {
						_this3.addValue(value);
					}
				});
			} else {
				this.setState({
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect,
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		}
	}, {
		key: 'addValue',
		value: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			var visibleOptions = this._visibleOptions.filter(function (val) {
				return !val.disabled;
			});
			var lastValueIndex = visibleOptions.indexOf(value);
			this.setValue(valueArray.concat(value));
			if (!this.props.closeOnSelect) {
				return;
			}
			if (visibleOptions.length - 1 === lastValueIndex) {
				// the last option was selected; focus the second-last one
				this.focusOption(visibleOptions[lastValueIndex - 1]);
			} else if (visibleOptions.length > lastValueIndex) {
				// focus the option below the selected one
				this.focusOption(visibleOptions[lastValueIndex + 1]);
			}
		}
	}, {
		key: 'popValue',
		value: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
		}
	}, {
		key: 'removeValue',
		value: function removeValue(value) {
			var _this4 = this;

			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i[_this4.props.valueKey] !== value[_this4.props.valueKey];
			}));
			this.focus();
		}
	}, {
		key: 'clearValue',
		value: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.preventDefault();

			this.setValue(this.getResetValue());
			this.setState({
				inputValue: this.handleInputValueChange(''),
				isOpen: false
			}, this.focus);

			this._focusAfterClear = true;
		}
	}, {
		key: 'getResetValue',
		value: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
		}
	}, {
		key: 'focusOption',
		value: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		}
	}, {
		key: 'focusNextOption',
		value: function focusNextOption() {
			this.focusAdjacentOption('next');
		}
	}, {
		key: 'focusPreviousOption',
		value: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		}
	}, {
		key: 'focusPageUpOption',
		value: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		}
	}, {
		key: 'focusPageDownOption',
		value: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		}
	}, {
		key: 'focusStartOption',
		value: function focusStartOption() {
			this.focusAdjacentOption('start');
		}
	}, {
		key: 'focusEndOption',
		value: function focusEndOption() {
			this.focusAdjacentOption('end');
		}
	}, {
		key: 'focusAdjacentOption',
		value: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				var newState = {
					focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null),
					isOpen: true
				};
				if (this.props.onSelectResetsInput) {
					newState.inputValue = '';
				}
				this.setState(newState);
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var _potentialIndex = focusedIndex + this.props.pageSize;
				if (_potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = _potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		}
	}, {
		key: 'getFocusedOption',
		value: function getFocusedOption() {
			return this._focusedOption;
		}
	}, {
		key: 'selectFocusedOption',
		value: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		}
	}, {
		key: 'renderLoading',
		value: function renderLoading() {
			if (!this.props.isLoading) return;
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', { className: 'Select-loading' })
			);
		}
	}, {
		key: 'renderValue',
		value: function renderValue(valueArray, isOpen) {
			var _this5 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				var showPlaceholder = shouldShowPlaceholder(this.state, this.props, isOpen);
				return showPlaceholder ? __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
						ValueComponent,
						{
							disabled: _this5.props.disabled || value.clearableValue === false,
							id: _this5._instancePrefix + '-value-' + i,
							instancePrefix: _this5._instancePrefix,
							key: 'value-' + i + '-' + value[_this5.props.valueKey],
							onClick: onClick,
							onRemove: _this5.removeValue,
							placeholder: _this5.props.placeholder,
							value: value,
							values: valueArray
						},
						renderLabel(value, i),
						__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
							'span',
							{ className: 'Select-aria-only' },
							'\xA0'
						)
					);
				});
			} else if (shouldShowValue(this.state, this.props)) {
				if (isOpen) onClick = null;
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					ValueComponent,
					{
						disabled: this.props.disabled,
						id: this._instancePrefix + '-value-item',
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						placeholder: this.props.placeholder,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput(valueArray, focusedOptionIndex) {
			var _classNames,
			    _this6 = this;

			var className = __WEBPACK_IMPORTED_MODULE_1_classnames___default()('Select-input', this.props.inputProps.className);
			var isOpen = this.state.isOpen;

			var ariaOwns = __WEBPACK_IMPORTED_MODULE_1_classnames___default()((_classNames = {}, defineProperty(_classNames, this._instancePrefix + '-list', isOpen), defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

			var value = this.state.inputValue;
			if (value && !this.props.onSelectResetsInput && !this.state.isFocused) {
				// it hides input value when it is not focused and was not reset on select
				value = '';
			}

			var inputProps = _extends({}, this.props.inputProps, {
				'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
				'aria-describedby': this.props['aria-describedby'],
				'aria-expanded': '' + isOpen,
				'aria-haspopup': '' + isOpen,
				'aria-label': this.props['aria-label'],
				'aria-labelledby': this.props['aria-labelledby'],
				'aria-owns': ariaOwns,
				onBlur: this.handleInputBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleInputFocus,
				ref: function ref(_ref) {
					return _this6.input = _ref;
				},
				role: 'combobox',
				required: this.state.required,
				tabIndex: this.props.tabIndex,
				value: value
			});

			if (this.props.inputRenderer) {
				return this.props.inputRenderer(inputProps);
			}

			if (this.props.disabled || !this.props.searchable) {
				var divProps = objectWithoutProperties(this.props.inputProps, []);


				var _ariaOwns = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(defineProperty({}, this._instancePrefix + '-list', isOpen));
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div', _extends({}, divProps, {
					'aria-expanded': isOpen,
					'aria-owns': _ariaOwns,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-disabled': '' + this.props.disabled,
					'aria-label': this.props['aria-label'],
					'aria-labelledby': this.props['aria-labelledby'],
					className: className,
					onBlur: this.handleInputBlur,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref2) {
						return _this6.input = _ref2;
					},
					role: 'combobox',
					style: { border: 0, width: 1, display: 'inline-block' },
					tabIndex: this.props.tabIndex || 0
				}));
			}

			if (this.props.autosize) {
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react_input_autosize___default.a, _extends({ id: this.props.id }, inputProps, { className: className, minWidth: '5' }));
			}
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: className, key: 'input-wrap', style: { display: 'inline-block' } },
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('input', _extends({ id: this.props.id }, inputProps))
			);
		}
	}, {
		key: 'renderClear',
		value: function renderClear() {
			var valueArray = this.getValueArray(this.props.value);
			if (!this.props.clearable || !valueArray.length || this.props.disabled || this.props.isLoading) return;
			var ariaLabel = this.props.multi ? this.props.clearAllText : this.props.clearValueText;
			var clear = this.props.clearRenderer();

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{
					'aria-label': ariaLabel,
					className: 'Select-clear-zone',
					onMouseDown: this.clearValue,
					onTouchEnd: this.handleTouchEndClearValue,
					onTouchMove: this.handleTouchMove,
					onTouchStart: this.handleTouchStart,
					title: ariaLabel
				},
				clear
			);
		}
	}, {
		key: 'renderArrow',
		value: function renderArrow() {
			if (!this.props.arrowRenderer) return;

			var onMouseDown = this.handleMouseDownOnArrow;
			var isOpen = this.state.isOpen;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

			if (!arrow) {
				return null;
			}

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{
					className: 'Select-arrow-zone',
					onMouseDown: onMouseDown
				},
				arrow
			);
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions$$1 = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : filterOptions;

				return filterOptions$$1(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					trimFilter: this.props.trimFilter,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		}
	}, {
		key: 'onOptionRef',
		value: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		}
	}, {
		key: 'renderMenu',
		value: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					inputValue: this.state.inputValue,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onOptionRef: this.onOptionRef,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					removeValue: this.removeValue,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey
				});
			} else if (this.props.noResultsText) {
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		}
	}, {
		key: 'renderHiddenField',
		value: function renderHiddenField(valueArray) {
			var _this7 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this7.props.valueKey]);
				}).join(this.props.delimiter);
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('input', {
					disabled: this.props.disabled,
					name: this.props.name,
					ref: function ref(_ref3) {
						return _this7.value = _ref3;
					},
					type: 'hidden',
					value: value
				});
			}
			return valueArray.map(function (item, index) {
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('input', {
					disabled: _this7.props.disabled,
					key: 'hidden.' + index,
					name: _this7.props.name,
					ref: 'value' + index,
					type: 'hidden',
					value: stringifyValue(item[_this7.props.valueKey])
				});
			});
		}
	}, {
		key: 'getFocusableOptionIndex',
		value: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var valueKey = this.props.valueKey;
			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = -1;
				options.some(function (option, index) {
					var isOptionEqual = option[valueKey] === focusedOption[valueKey];
					if (isOptionEqual) {
						focusedOptionIndex = index;
					}
					return isOptionEqual;
				});
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		}
	}, {
		key: 'renderOuter',
		value: function renderOuter(options, valueArray, focusedOption) {
			var _this8 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ ref: function ref(_ref5) {
						return _this8.menuContainer = _ref5;
					}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{
						className: 'Select-menu',
						id: this._instancePrefix + '-list',
						onMouseDown: this.handleMouseDownOnMenu,
						onScroll: this.handleMenuScroll,
						ref: function ref(_ref4) {
							return _this8.menu = _ref4;
						},
						role: 'listbox',
						style: this.props.menuStyle,
						tabIndex: -1
					},
					menu
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this9 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi && this.props.removeSelected ? valueArray : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = __WEBPACK_IMPORTED_MODULE_1_classnames___default()('Select', this.props.className, {
				'has-value': valueArray.length,
				'is-clearable': this.props.clearable,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'Select--multi': this.props.multi,
				'Select--rtl': this.props.rtl,
				'Select--single': !this.props.multi
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ ref: function ref(_ref7) {
						return _this9.wrapper = _ref7;
					},
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{ ref: function ref(_ref6) {
							return _this9.control = _ref6;
						},
						className: 'Select-control',
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchMove: this.handleTouchMove,
						onTouchStart: this.handleTouchStart,
						style: this.props.style
					},
					__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
						'div',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, valueArray, focusedOption) : null
			);
		}
	}]);
	return Select;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Select$1.propTypes = {
	'aria-describedby': __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // html id(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // aria label (for assistive tech)
	'aria-labelledby': __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // html id of an element that should be used as the label (for assistive tech)
	arrowRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // create the drop-down caret element
	autoBlur: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // automatically blur the component when an option is selected
	autoFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // autofocus the component on mount
	autofocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // deprecated; use autoFocus instead
	autosize: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to enable autosizing or not
	backspaceRemoves: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether backspace removes an item if there is no text input
	backspaceToRemoveMessage: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	className: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // className for the outer element
	clearAllText: stringOrNode, // title for the "clear" control when multi: true
	clearRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // create clearable x element
	clearValueText: stringOrNode, // title for the "clear" control
	clearable: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // should it be possible to reset value
	closeOnSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to close the menu when a value is selected
	deleteRemoves: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether delete removes an item if there is no text input
	delimiter: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // delimiter to use to join multiple values for the hidden field value
	disabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether the Select is disabled or not
	escapeClearsValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether escape clears the value when the menu is closed
	filterOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to filter a single option (option, filterString)
	filterOptions: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
	id: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // html id to set on the input element for accessibility or tests
	ignoreAccents: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to strip diacritics when filtering
	ignoreCase: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to perform case-insensitive filtering
	inputProps: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // custom attributes for the Input
	inputRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // returns a custom input component
	instanceId: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // set the components instanceId
	isLoading: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether the Select is loading externally or not (such as options being loaded)
	joinValues: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
	labelKey: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // path of the label value in option objects
	matchPos: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // (any|start) match the start or entire string when filtering
	matchProp: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // (any|label|value) which option property to filter on
	menuBuffer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
	menuContainerStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // optional style to apply to the menu container
	menuRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // renders a custom menu with options
	menuStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // optional style to apply to the menu
	multi: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // multi-value input
	name: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // generates a hidden <input /> tag with this field name for html forms
	noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
	onBlur: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onBlur handler: function (event) {}
	onBlurResetsInput: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether input is cleared on blur
	onChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onChange handler: function (newValue) {}
	onClose: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // fires when the menu is closed
	onCloseResetsInput: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether input is cleared when menu is closed through the arrow
	onFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onFocus handler: function (event) {}
	onInputChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onInputChange handler: function (inputValue) {}
	onInputKeyDown: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // input keyDown handler: function (event) {}
	onMenuScrollToBottom: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
	onOpen: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // fires when the menu is opened
	onSelectResetsInput: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether input is cleared on select (works only for multiselect)
	onValueClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onClick handler for value labels: function (value, event) {}
	openOnClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // boolean to control opening the menu when the control is clicked
	openOnFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // always open options menu on focus
	optionClassName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // additional class(es) to apply to the <Option /> elements
	optionComponent: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // option component to render in dropdown
	optionRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // optionRenderer: function (option) {}
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array, // array of options
	pageSize: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number, // number of entries to page when using page up/down keys
	placeholder: stringOrNode, // field placeholder, displayed when there's no value
	removeSelected: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether the selected option is removed from the dropdown on multi selects
	required: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // applies HTML5 required attribute when needed
	resetValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // value to use when you clear the control
	rtl: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // set to true in order to use react-select in right-to-left direction
	scrollMenuIntoView: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	searchable: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to enable searching feature or not
	simpleValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	style: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // optional style to apply to the control
	tabIndex: stringOrNumber, // optional tab index of the control
	tabSelectsValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to treat tabbing out while focused to be value selection
	trimFilter: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to trim whitespace around filter value
	value: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // initial field value
	valueComponent: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // value component to render
	valueKey: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // path of the label value in option objects
	valueRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // valueRenderer: function (option) {}
	wrapperStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object // optional style to apply to the component wrapper
};

Select$1.defaultProps = {
	arrowRenderer: arrowRenderer,
	autosize: true,
	backspaceRemoves: true,
	backspaceToRemoveMessage: 'Press backspace to remove {label}',
	clearable: true,
	clearAllText: 'Clear all',
	clearRenderer: clearRenderer,
	clearValueText: 'Clear value',
	closeOnSelect: true,
	deleteRemoves: true,
	delimiter: ',',
	disabled: false,
	escapeClearsValue: true,
	filterOptions: filterOptions,
	ignoreAccents: true,
	ignoreCase: true,
	inputProps: {},
	isLoading: false,
	joinValues: false,
	labelKey: 'label',
	matchPos: 'any',
	matchProp: 'any',
	menuBuffer: 0,
	menuRenderer: menuRenderer,
	multi: false,
	noResultsText: 'No results found',
	onBlurResetsInput: true,
	onCloseResetsInput: true,
	onSelectResetsInput: true,
	openOnClick: true,
	optionComponent: Option,
	pageSize: 5,
	placeholder: 'Select...',
	removeSelected: true,
	required: false,
	rtl: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	trimFilter: true,
	valueComponent: Value,
	valueKey: 'value'
};

var propTypes = {
	autoload: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // object to use to cache results; set to null/false to disable caching
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // strip diacritics when filtering; defaults to true
	ignoreCase: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // perform case-insensitive filtering; defaults to true
	loadOptions: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	loadingPlaceholder: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// replaces the placeholder while options are loading
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	multi: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // multi-value input
	noResultsText: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// field noResultsText, displayed when no options come back from the server
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	onChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onChange handler: function (newValue) {}
	onInputChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // optional for keeping track of what is being typed
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array.isRequired, // array of options
	placeholder: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	searchPromptText: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// label to prompt for search input
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	value: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any // initial field value
};

var defaultCache = {};

var defaultChildren = function defaultChildren(props) {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Select$1, props);
};

var defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search'
};

var Async = function (_Component) {
	inherits(Async, _Component);

	function Async(props, context) {
		classCallCheck(this, Async);

		var _this = possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).call(this, props, context));

		_this._cache = props.cache === defaultCache ? {} : props.cache;

		_this.state = {
			inputValue: '',
			isLoading: false,
			options: props.options
		};

		_this.onInputChange = _this.onInputChange.bind(_this);
		return _this;
	}

	createClass(Async, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoload = this.props.autoload;


			if (autoload) {
				this.loadOptions('');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.options !== this.props.options) {
				this.setState({
					options: nextProps.options
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._callback = null;
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(inputValue) {
			var _this2 = this;

			var loadOptions = this.props.loadOptions;

			var cache = this._cache;

			if (cache && Object.prototype.hasOwnProperty.call(cache, inputValue)) {
				this._callback = null;

				this.setState({
					isLoading: false,
					options: cache[inputValue]
				});

				return;
			}

			var callback = function callback(error, data) {
				var options = data && data.options || [];

				if (cache) {
					cache[inputValue] = options;
				}

				if (callback === _this2._callback) {
					_this2._callback = null;

					_this2.setState({
						isLoading: false,
						options: options
					});
				}
			};

			// Ignore all but the most recent request
			this._callback = callback;

			var promise = loadOptions(inputValue, callback);
			if (promise) {
				promise.then(function (data) {
					return callback(null, data);
				}, function (error) {
					return callback(error);
				});
			}

			if (this._callback && !this.state.isLoading) {
				this.setState({
					isLoading: true
				});
			}
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(inputValue) {
			var _props = this.props,
			    ignoreAccents = _props.ignoreAccents,
			    ignoreCase = _props.ignoreCase,
			    onInputChange = _props.onInputChange;

			var newInputValue = inputValue;

			if (onInputChange) {
				var value = onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
					newInputValue = '' + value;
				}
			}

			var transformedInputValue = newInputValue;

			if (ignoreAccents) {
				transformedInputValue = stripDiacritics(transformedInputValue);
			}

			if (ignoreCase) {
				transformedInputValue = transformedInputValue.toLowerCase();
			}

			this.setState({ inputValue: newInputValue });
			this.loadOptions(transformedInputValue);

			// Return new input value, but without applying toLowerCase() to avoid modifying the user's view case of the input while typing.
			return newInputValue;
		}
	}, {
		key: 'noResultsText',
		value: function noResultsText() {
			var _props2 = this.props,
			    loadingPlaceholder = _props2.loadingPlaceholder,
			    noResultsText = _props2.noResultsText,
			    searchPromptText = _props2.searchPromptText;
			var _state = this.state,
			    inputValue = _state.inputValue,
			    isLoading = _state.isLoading;


			if (isLoading) {
				return loadingPlaceholder;
			}
			if (inputValue && noResultsText) {
				return noResultsText;
			}
			return searchPromptText;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props3 = this.props,
			    children = _props3.children,
			    loadingPlaceholder = _props3.loadingPlaceholder,
			    placeholder = _props3.placeholder;
			var _state2 = this.state,
			    isLoading = _state2.isLoading,
			    options = _state2.options;


			var props = {
				noResultsText: this.noResultsText(),
				placeholder: isLoading ? loadingPlaceholder : placeholder,
				options: isLoading && loadingPlaceholder ? [] : options,
				ref: function ref(_ref) {
					return _this3.select = _ref;
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this.onInputChange
			}));
		}
	}]);
	return Async;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

var CreatableSelect = function (_React$Component) {
	inherits(CreatableSelect, _React$Component);

	function CreatableSelect(props, context) {
		classCallCheck(this, CreatableSelect);

		var _this = possibleConstructorReturn(this, (CreatableSelect.__proto__ || Object.getPrototypeOf(CreatableSelect)).call(this, props, context));

		_this.filterOptions = _this.filterOptions.bind(_this);
		_this.menuRenderer = _this.menuRenderer.bind(_this);
		_this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
		_this.onInputChange = _this.onInputChange.bind(_this);
		_this.onOptionSelect = _this.onOptionSelect.bind(_this);
		return _this;
	}

	createClass(CreatableSelect, [{
		key: 'createNewOption',
		value: function createNewOption() {
			var _props = this.props,
			    isValidNewOption = _props.isValidNewOption,
			    newOptionCreator = _props.newOptionCreator,
			    onNewOptionClick = _props.onNewOptionClick,
			    _props$options = _props.options,
			    options = _props$options === undefined ? [] : _props$options;


			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var _isOptionUnique = this.isOptionUnique({ option: option, options: options });

				// Don't add the same option twice.
				if (_isOptionUnique) {
					if (onNewOptionClick) {
						onNewOptionClick(option);
					} else {
						options.unshift(option);

						this.select.selectValue(option);
					}
				}
			}
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1() {
			var _props2 = this.props,
			    filterOptions$$1 = _props2.filterOptions,
			    isValidNewOption = _props2.isValidNewOption,
			    promptTextCreator = _props2.promptTextCreator,
			    showNewOptionAtTop = _props2.showNewOptionAtTop;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.

			var excludeOptions = (arguments.length <= 2 ? undefined : arguments[2]) || [];

			var filteredOptions = filterOptions$$1.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var _newOptionCreator = this.props.newOptionCreator;


				var option = _newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var _isOptionUnique2 = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (_isOptionUnique2) {
					var prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = _newOptionCreator({
						label: prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					if (showNewOptionAtTop) {
						filteredOptions.unshift(this._createPlaceholderOption);
					} else {
						filteredOptions.push(this._createPlaceholderOption);
					}
				}
			}

			return filteredOptions;
		}
	}, {
		key: 'isOptionUnique',
		value: function isOptionUnique(_ref) {
			var option = _ref.option,
			    options = _ref.options;
			var isOptionUnique = this.props.isOptionUnique;


			options = options || this.props.options;

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: options,
				valueKey: this.valueKey
			});
		}
	}, {
		key: 'menuRenderer',
		value: function menuRenderer$$1(params) {
			var menuRenderer$$1 = this.props.menuRenderer;


			return menuRenderer$$1(_extends({}, params, {
				onSelect: this.onOptionSelect,
				selectValue: this.onOptionSelect
			}));
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(input) {
			var onInputChange = this.props.onInputChange;

			// This value may be needed in between Select mounts (when this.select is null)

			this.inputValue = input;

			if (onInputChange) {
				this.inputValue = onInputChange(input);
			}

			return this.inputValue;
		}
	}, {
		key: 'onInputKeyDown',
		value: function onInputKeyDown(event) {
			var _props3 = this.props,
			    shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption,
			    onInputKeyDown = _props3.onInputKeyDown;

			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption(event)) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			} else if (onInputKeyDown) {
				onInputKeyDown(event);
			}
		}
	}, {
		key: 'onOptionSelect',
		value: function onOptionSelect(option) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props4 = this.props,
			    refProp = _props4.ref,
			    restProps = objectWithoutProperties(_props4, ['ref']);
			var children = this.props.children;

			// We can't use destructuring default values to set the children,
			// because it won't apply work if `children` is null. A falsy check is
			// more reliable in real world use-cases.

			if (!children) {
				children = defaultChildren$2;
			}

			var props = _extends({}, restProps, {
				allowCreate: true,
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				ref: function ref(_ref2) {
					_this2.select = _ref2;

					// These values may be needed in between Select mounts (when this.select is null)
					if (_ref2) {
						_this2.labelKey = _ref2.props.labelKey;
						_this2.valueKey = _ref2.props.valueKey;
					}
					if (refProp) {
						refProp(_ref2);
					}
				}
			});

			return children(props);
		}
	}]);
	return CreatableSelect;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

var defaultChildren$2 = function defaultChildren(props) {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Select$1, props);
};

var isOptionUnique = function isOptionUnique(_ref3) {
	var option = _ref3.option,
	    options = _ref3.options,
	    labelKey = _ref3.labelKey,
	    valueKey = _ref3.valueKey;

	if (!options || !options.length) {
		return true;
	}

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
};

var isValidNewOption = function isValidNewOption(_ref4) {
	var label = _ref4.label;
	return !!label;
};

var newOptionCreator = function newOptionCreator(_ref5) {
	var label = _ref5.label,
	    labelKey = _ref5.labelKey,
	    valueKey = _ref5.valueKey;

	var option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';

	return option;
};

var promptTextCreator = function promptTextCreator(label) {
	return 'Create option "' + label + '"';
};

var shouldKeyDownEventCreateNewOption = function shouldKeyDownEventCreateNewOption(_ref6) {
	var keyCode = _ref6.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;
		default:
			return false;
	}
};

// Default prop methods
CreatableSelect.isOptionUnique = isOptionUnique;
CreatableSelect.isValidNewOption = isValidNewOption;
CreatableSelect.newOptionCreator = newOptionCreator;
CreatableSelect.promptTextCreator = promptTextCreator;
CreatableSelect.shouldKeyDownEventCreateNewOption = shouldKeyDownEventCreateNewOption;

CreatableSelect.defaultProps = {
	filterOptions: filterOptions,
	isOptionUnique: isOptionUnique,
	isValidNewOption: isValidNewOption,
	menuRenderer: menuRenderer,
	newOptionCreator: newOptionCreator,
	promptTextCreator: promptTextCreator,
	shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption,
	showNewOptionAtTop: true
};

CreatableSelect.propTypes = {
	// Child function responsible for creating the inner Select component
	// This component can be used to compose HOCs (eg Creatable and Async)
	// (props: Object): PropTypes.element
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// See Select.propTypes.filterOptions
	filterOptions: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,

	// Searches for any matching option within the set of options.
	// This function prevents duplicate options from being created.
	// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
	isOptionUnique: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// Determines if the current input text represents a valid option.
	// ({ label: string }): boolean
	isValidNewOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// See Select.propTypes.menuRenderer
	menuRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,

	// Factory to create new option.
	// ({ label: string, labelKey: string, valueKey: string }): Object
	newOptionCreator: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// input change handler: function (inputValue) {}
	onInputChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// input keyDown handler: function (event) {}
	onInputKeyDown: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// new option click handler: function (option) {}
	onNewOptionClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// See Select.propTypes.options
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,

	// Creates prompt/placeholder option text.
	// (filterText: string): string
	promptTextCreator: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	ref: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
	shouldKeyDownEventCreateNewOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// Where to show prompt/placeholder option text.
	// true: new option prompt at top of list (default)
	// false: new option prompt at bottom of list
	showNewOptionAtTop: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
};

var AsyncCreatableSelect = function (_React$Component) {
	inherits(AsyncCreatableSelect, _React$Component);

	function AsyncCreatableSelect() {
		classCallCheck(this, AsyncCreatableSelect);
		return possibleConstructorReturn(this, (AsyncCreatableSelect.__proto__ || Object.getPrototypeOf(AsyncCreatableSelect)).apply(this, arguments));
	}

	createClass(AsyncCreatableSelect, [{
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				Async,
				this.props,
				function (_ref) {
					var ref = _ref.ref,
					    asyncProps = objectWithoutProperties(_ref, ['ref']);

					var asyncRef = ref;
					return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
						CreatableSelect,
						asyncProps,
						function (_ref2) {
							var ref = _ref2.ref,
							    creatableProps = objectWithoutProperties(_ref2, ['ref']);

							var creatableRef = ref;
							return _this2.props.children(_extends({}, creatableProps, {
								ref: function ref(select) {
									creatableRef(select);
									asyncRef(select);
									_this2.select = select;
								}
							}));
						}
					);
				}
			);
		}
	}]);
	return AsyncCreatableSelect;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

var defaultChildren$1 = function defaultChildren(props) {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Select$1, props);
};

AsyncCreatableSelect.propTypes = {
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
};

AsyncCreatableSelect.defaultProps = {
	children: defaultChildren$1
};

Select$1.Async = Async;
Select$1.AsyncCreatable = AsyncCreatableSelect;
Select$1.Creatable = CreatableSelect;
Select$1.Value = Value;
Select$1.Option = Option;


/* harmony default export */ __webpack_exports__["default"] = (Select$1);


/***/ }),

/***/ 903:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(328),
    isObjectLike = __webpack_require__(329);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

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
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 907:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(915).default;

/***/ }),

/***/ 908:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizerStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
};

var INPUT_PROPS_BLACKLIST = ['extraWidth', 'injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

var cleanInputProps = function cleanInputProps(inputProps) {
	INPUT_PROPS_BLACKLIST.forEach(function (field) {
		return delete inputProps[field];
	});
	return inputProps;
};

var copyStyles = function copyStyles(styles, node) {
	node.style.fontSize = styles.fontSize;
	node.style.fontFamily = styles.fontFamily;
	node.style.fontWeight = styles.fontWeight;
	node.style.fontStyle = styles.fontStyle;
	node.style.letterSpacing = styles.letterSpacing;
	node.style.textTransform = styles.textTransform;
};

var isIE = typeof window !== 'undefined' && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;

var generateId = function generateId() {
	// we only need an auto-generated ID for stylesheet injection, which is only
	// used for IE. so if the browser is not IE, this should return undefined.
	return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
};

var AutosizeInput = function (_Component) {
	_inherits(AutosizeInput, _Component);

	function AutosizeInput(props) {
		_classCallCheck(this, AutosizeInput);

		var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

		_this.inputRef = function (el) {
			_this.input = el;
			if (typeof _this.props.inputRef === 'function') {
				_this.props.inputRef(el);
			}
		};

		_this.placeHolderSizerRef = function (el) {
			_this.placeHolderSizer = el;
		};

		_this.sizerRef = function (el) {
			_this.sizer = el;
		};

		_this.state = {
			inputWidth: props.minWidth,
			inputId: props.id || generateId()
		};
		return _this;
	}

	_createClass(AutosizeInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.mounted = true;
			this.copyInputStyles();
			this.updateInputWidth();
		}
	}, {
		key: 'UNSAFE_componentWillReceiveProps',
		value: function UNSAFE_componentWillReceiveProps(nextProps) {
			var id = nextProps.id;

			if (id !== this.props.id) {
				this.setState({ inputId: id || generateId() });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.inputWidth !== this.state.inputWidth) {
				if (typeof this.props.onAutosize === 'function') {
					this.props.onAutosize(this.state.inputWidth);
				}
			}
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'copyInputStyles',
		value: function copyInputStyles() {
			if (!this.mounted || !window.getComputedStyle) {
				return;
			}
			var inputStyles = this.input && window.getComputedStyle(this.input);
			if (!inputStyles) {
				return;
			}
			copyStyles(inputStyles, this.sizer);
			if (this.placeHolderSizer) {
				copyStyles(inputStyles, this.placeHolderSizer);
			}
		}
	}, {
		key: 'updateInputWidth',
		value: function updateInputWidth() {
			if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = void 0;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.sizer.scrollWidth + 2;
			}
			// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
			var extraWidth = this.props.type === 'number' && this.props.extraWidth === undefined ? 16 : parseInt(this.props.extraWidth) || 0;
			newInputWidth += extraWidth;
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		}
	}, {
		key: 'getInput',
		value: function getInput() {
			return this.input;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.input.focus();
		}
	}, {
		key: 'blur',
		value: function blur() {
			this.input.blur();
		}
	}, {
		key: 'select',
		value: function select() {
			this.input.select();
		}
	}, {
		key: 'renderStyles',
		value: function renderStyles() {
			// this method injects styles to hide IE's clear indicator, which messes
			// with input size detection. the stylesheet is only injected when the
			// browser is IE, and can also be disabled by the `injectStyles` prop.
			var injectStyles = this.props.injectStyles;

			return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
					__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
				} }) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
				if (previousValue !== null && previousValue !== undefined) {
					return previousValue;
				}
				return currentValue;
			});

			var wrapperStyle = _extends({}, this.props.style);
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

			var inputStyle = _extends({
				boxSizing: 'content-box',
				width: this.state.inputWidth + 'px'
			}, this.props.inputStyle);

			var inputProps = _objectWithoutProperties(this.props, []);

			cleanInputProps(inputProps);
			inputProps.className = this.props.inputClassName;
			inputProps.id = this.state.inputId;
			inputProps.style = inputStyle;

			return _react2.default.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				this.renderStyles(),
				_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
				_react2.default.createElement(
					'div',
					{ ref: this.sizerRef, style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? _react2.default.createElement(
					'div',
					{ ref: this.placeHolderSizerRef, style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	}]);

	return AutosizeInput;
}(_react.Component);

AutosizeInput.propTypes = {
	className: _propTypes2.default.string, // className for the outer element
	defaultValue: _propTypes2.default.any, // default field value
	extraWidth: _propTypes2.default.oneOfType([// additional width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
	injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
	inputClassName: _propTypes2.default.string, // className for the input element
	inputRef: _propTypes2.default.func, // ref callback for the input element
	inputStyle: _propTypes2.default.object, // css styles for the input element
	minWidth: _propTypes2.default.oneOfType([// minimum width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
	onChange: _propTypes2.default.func, // onChange handler: function(event) {}
	placeholder: _propTypes2.default.string, // placeholder text
	placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
	style: _propTypes2.default.object, // css styles for the outer element
	value: _propTypes2.default.any // field value
};
AutosizeInput.defaultProps = {
	minWidth: 1,
	injectStyles: true
};

exports.default = AutosizeInput;

/***/ }),

/***/ 909:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLocation = setLocation;

var _places = __webpack_require__(333);

var types = _interopRequireWildcard(_places);

var _axios = __webpack_require__(149);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setLocation(data) {
    return {
        type: types.SET_LOCATION,
        payload: data
    };
}

/***/ }),

/***/ 910:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(331);

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

module.exports = now;


/***/ }),

/***/ 911:
/***/ (function(module, exports, __webpack_require__) {

var baseTrim = __webpack_require__(912),
    isObject = __webpack_require__(897),
    isSymbol = __webpack_require__(903);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

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
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 912:
/***/ (function(module, exports, __webpack_require__) {

var trimmedEndIndex = __webpack_require__(913);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ 913:
/***/ (function(module, exports) {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ 915:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _arrays = __webpack_require__(916);

var _arrays2 = _interopRequireDefault(_arrays);

var _reactAutowhatever = __webpack_require__(917);

var _reactAutowhatever2 = _interopRequireDefault(_reactAutowhatever);

var _theme = __webpack_require__(925);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var alwaysTrue = function alwaysTrue() {
  return true;
};
var defaultShouldRenderSuggestions = function defaultShouldRenderSuggestions(value) {
  return value.trim().length > 0;
};
var defaultRenderSuggestionsContainer = function defaultRenderSuggestionsContainer(_ref) {
  var containerProps = _ref.containerProps,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    containerProps,
    children
  );
};

var Autosuggest = function (_Component) {
  _inherits(Autosuggest, _Component);

  function Autosuggest(_ref2) {
    var alwaysRenderSuggestions = _ref2.alwaysRenderSuggestions;

    _classCallCheck(this, Autosuggest);

    var _this = _possibleConstructorReturn(this, (Autosuggest.__proto__ || Object.getPrototypeOf(Autosuggest)).call(this));

    _initialiseProps.call(_this);

    _this.state = {
      isFocused: false,
      isCollapsed: !alwaysRenderSuggestions,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      highlightedSuggestion: null,
      valueBeforeUpDown: null
    };

    _this.justPressedUpDown = false;
    _this.justMouseEntered = false;

    _this.pressedSuggestion = null;
    return _this;
  }

  _createClass(Autosuggest, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mousedown', this.onDocumentMouseDown);
      document.addEventListener('mouseup', this.onDocumentMouseUp);

      this.input = this.autowhatever.input;
      this.suggestionsContainer = this.autowhatever.itemsContainer;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((0, _arrays2.default)(nextProps.suggestions, this.props.suggestions)) {
        if (nextProps.highlightFirstSuggestion && nextProps.suggestions.length > 0 && this.justPressedUpDown === false && this.justMouseEntered === false) {
          this.highlightFirstSuggestion();
        }
      } else {
        if (this.willRenderSuggestions(nextProps)) {
          if (this.state.isCollapsed && !this.justSelectedSuggestion) {
            this.revealSuggestions();
          }
        } else {
          this.resetHighlightedSuggestion();
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props,
          suggestions = _props.suggestions,
          onSuggestionHighlighted = _props.onSuggestionHighlighted,
          highlightFirstSuggestion = _props.highlightFirstSuggestion;


      if (!(0, _arrays2.default)(suggestions, prevProps.suggestions) && suggestions.length > 0 && highlightFirstSuggestion) {
        this.highlightFirstSuggestion();
        return;
      }

      if (onSuggestionHighlighted) {
        var highlightedSuggestion = this.getHighlightedSuggestion();
        var prevHighlightedSuggestion = prevState.highlightedSuggestion;

        if (highlightedSuggestion != prevHighlightedSuggestion) {
          onSuggestionHighlighted({
            suggestion: highlightedSuggestion
          });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.onDocumentMouseDown);
      document.removeEventListener('mouseup', this.onDocumentMouseUp);
    }
  }, {
    key: 'updateHighlightedSuggestion',
    value: function updateHighlightedSuggestion(sectionIndex, suggestionIndex, prevValue) {
      var _this2 = this;

      this.setState(function (state) {
        var valueBeforeUpDown = state.valueBeforeUpDown;


        if (suggestionIndex === null) {
          valueBeforeUpDown = null;
        } else if (valueBeforeUpDown === null && typeof prevValue !== 'undefined') {
          valueBeforeUpDown = prevValue;
        }

        return {
          highlightedSectionIndex: sectionIndex,
          highlightedSuggestionIndex: suggestionIndex,
          highlightedSuggestion: suggestionIndex === null ? null : _this2.getSuggestion(sectionIndex, suggestionIndex),
          valueBeforeUpDown: valueBeforeUpDown
        };
      });
    }
  }, {
    key: 'resetHighlightedSuggestion',
    value: function resetHighlightedSuggestion() {
      var shouldResetValueBeforeUpDown = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.setState(function (state) {
        var valueBeforeUpDown = state.valueBeforeUpDown;


        return {
          highlightedSectionIndex: null,
          highlightedSuggestionIndex: null,
          highlightedSuggestion: null,
          valueBeforeUpDown: shouldResetValueBeforeUpDown ? null : valueBeforeUpDown
        };
      });
    }
  }, {
    key: 'revealSuggestions',
    value: function revealSuggestions() {
      this.setState({
        isCollapsed: false
      });
    }
  }, {
    key: 'closeSuggestions',
    value: function closeSuggestions() {
      this.setState({
        highlightedSectionIndex: null,
        highlightedSuggestionIndex: null,
        highlightedSuggestion: null,
        valueBeforeUpDown: null,
        isCollapsed: true
      });
    }
  }, {
    key: 'getSuggestion',
    value: function getSuggestion(sectionIndex, suggestionIndex) {
      var _props2 = this.props,
          suggestions = _props2.suggestions,
          multiSection = _props2.multiSection,
          getSectionSuggestions = _props2.getSectionSuggestions;


      if (multiSection) {
        return getSectionSuggestions(suggestions[sectionIndex])[suggestionIndex];
      }

      return suggestions[suggestionIndex];
    }
  }, {
    key: 'getHighlightedSuggestion',
    value: function getHighlightedSuggestion() {
      var _state = this.state,
          highlightedSectionIndex = _state.highlightedSectionIndex,
          highlightedSuggestionIndex = _state.highlightedSuggestionIndex;


      if (highlightedSuggestionIndex === null) {
        return null;
      }

      return this.getSuggestion(highlightedSectionIndex, highlightedSuggestionIndex);
    }
  }, {
    key: 'getSuggestionValueByIndex',
    value: function getSuggestionValueByIndex(sectionIndex, suggestionIndex) {
      var getSuggestionValue = this.props.getSuggestionValue;


      return getSuggestionValue(this.getSuggestion(sectionIndex, suggestionIndex));
    }
  }, {
    key: 'getSuggestionIndices',
    value: function getSuggestionIndices(suggestionElement) {
      var sectionIndex = suggestionElement.getAttribute('data-section-index');
      var suggestionIndex = suggestionElement.getAttribute('data-suggestion-index');

      return {
        sectionIndex: typeof sectionIndex === 'string' ? parseInt(sectionIndex, 10) : null,
        suggestionIndex: parseInt(suggestionIndex, 10)
      };
    }
  }, {
    key: 'findSuggestionElement',
    value: function findSuggestionElement(startNode) {
      var node = startNode;

      do {
        if (node.getAttribute('data-suggestion-index') !== null) {
          return node;
        }

        node = node.parentNode;
      } while (node !== null);

      console.error('Clicked element:', startNode); // eslint-disable-line no-console
      throw new Error("Couldn't find suggestion element");
    }
  }, {
    key: 'maybeCallOnChange',
    value: function maybeCallOnChange(event, newValue, method) {
      var _props$inputProps = this.props.inputProps,
          value = _props$inputProps.value,
          onChange = _props$inputProps.onChange;


      if (newValue !== value) {
        onChange(event, { newValue: newValue, method: method });
      }
    }
  }, {
    key: 'willRenderSuggestions',
    value: function willRenderSuggestions(props) {
      var suggestions = props.suggestions,
          inputProps = props.inputProps,
          shouldRenderSuggestions = props.shouldRenderSuggestions;
      var value = inputProps.value;


      return suggestions.length > 0 && shouldRenderSuggestions(value);
    }
  }, {
    key: 'getQuery',
    value: function getQuery() {
      var inputProps = this.props.inputProps;
      var value = inputProps.value;
      var valueBeforeUpDown = this.state.valueBeforeUpDown;


      return (valueBeforeUpDown === null ? value : valueBeforeUpDown).trim();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          suggestions = _props3.suggestions,
          renderInputComponent = _props3.renderInputComponent,
          onSuggestionsFetchRequested = _props3.onSuggestionsFetchRequested,
          renderSuggestion = _props3.renderSuggestion,
          inputProps = _props3.inputProps,
          multiSection = _props3.multiSection,
          renderSectionTitle = _props3.renderSectionTitle,
          id = _props3.id,
          getSectionSuggestions = _props3.getSectionSuggestions,
          theme = _props3.theme,
          getSuggestionValue = _props3.getSuggestionValue,
          alwaysRenderSuggestions = _props3.alwaysRenderSuggestions,
          highlightFirstSuggestion = _props3.highlightFirstSuggestion;
      var _state2 = this.state,
          isFocused = _state2.isFocused,
          isCollapsed = _state2.isCollapsed,
          highlightedSectionIndex = _state2.highlightedSectionIndex,
          highlightedSuggestionIndex = _state2.highlightedSuggestionIndex,
          valueBeforeUpDown = _state2.valueBeforeUpDown;

      var shouldRenderSuggestions = alwaysRenderSuggestions ? alwaysTrue : this.props.shouldRenderSuggestions;
      var value = inputProps.value,
          _onFocus = inputProps.onFocus,
          _onKeyDown = inputProps.onKeyDown;

      var willRenderSuggestions = this.willRenderSuggestions(this.props);
      var isOpen = alwaysRenderSuggestions || isFocused && !isCollapsed && willRenderSuggestions;
      var items = isOpen ? suggestions : [];
      var autowhateverInputProps = _extends({}, inputProps, {
        onFocus: function onFocus(event) {
          if (!_this3.justSelectedSuggestion && !_this3.justClickedOnSuggestionsContainer) {
            var shouldRender = shouldRenderSuggestions(value);

            _this3.setState({
              isFocused: true,
              isCollapsed: !shouldRender
            });

            _onFocus && _onFocus(event);

            if (shouldRender) {
              onSuggestionsFetchRequested({ value: value, reason: 'input-focused' });
            }
          }
        },
        onBlur: function onBlur(event) {
          if (_this3.justClickedOnSuggestionsContainer) {
            _this3.input.focus();
            return;
          }

          _this3.blurEvent = event;

          if (!_this3.justSelectedSuggestion) {
            _this3.onBlur();
            _this3.onSuggestionsClearRequested();
          }
        },
        onChange: function onChange(event) {
          var value = event.target.value;

          var shouldRender = shouldRenderSuggestions(value);

          _this3.maybeCallOnChange(event, value, 'type');

          if (_this3.suggestionsContainer) {
            _this3.suggestionsContainer.scrollTop = 0;
          }

          _this3.setState(_extends({}, highlightFirstSuggestion ? {} : {
            highlightedSectionIndex: null,
            highlightedSuggestionIndex: null,
            highlightedSuggestion: null
          }, {
            valueBeforeUpDown: null,
            isCollapsed: !shouldRender
          }));

          if (shouldRender) {
            onSuggestionsFetchRequested({ value: value, reason: 'input-changed' });
          } else {
            _this3.onSuggestionsClearRequested();
          }
        },
        onKeyDown: function onKeyDown(event, data) {
          var keyCode = event.keyCode;


          switch (keyCode) {
            case 40: // ArrowDown
            case 38:
              // ArrowUp
              if (isCollapsed) {
                if (shouldRenderSuggestions(value)) {
                  onSuggestionsFetchRequested({
                    value: value,
                    reason: 'suggestions-revealed'
                  });
                  _this3.revealSuggestions();
                }
              } else if (suggestions.length > 0) {
                var newHighlightedSectionIndex = data.newHighlightedSectionIndex,
                    newHighlightedItemIndex = data.newHighlightedItemIndex;


                var newValue = void 0;

                if (newHighlightedItemIndex === null) {
                  // valueBeforeUpDown can be null if, for example, user
                  // hovers on the first suggestion and then pressed Up.
                  // If that happens, use the original input value.
                  newValue = valueBeforeUpDown === null ? value : valueBeforeUpDown;
                } else {
                  newValue = _this3.getSuggestionValueByIndex(newHighlightedSectionIndex, newHighlightedItemIndex);
                }

                _this3.updateHighlightedSuggestion(newHighlightedSectionIndex, newHighlightedItemIndex, value);
                _this3.maybeCallOnChange(event, newValue, keyCode === 40 ? 'down' : 'up');
              }

              event.preventDefault(); // Prevents the cursor from moving

              _this3.justPressedUpDown = true;

              setTimeout(function () {
                _this3.justPressedUpDown = false;
              });

              break;

            // Enter
            case 13:
              {
                // See #388
                if (event.keyCode === 229) {
                  break;
                }

                var highlightedSuggestion = _this3.getHighlightedSuggestion();

                if (isOpen && !alwaysRenderSuggestions) {
                  _this3.closeSuggestions();
                }

                if (highlightedSuggestion != null) {
                  var _newValue = getSuggestionValue(highlightedSuggestion);

                  _this3.maybeCallOnChange(event, _newValue, 'enter');

                  _this3.onSuggestionSelected(event, {
                    suggestion: highlightedSuggestion,
                    suggestionValue: _newValue,
                    suggestionIndex: highlightedSuggestionIndex,
                    sectionIndex: highlightedSectionIndex,
                    method: 'enter'
                  });

                  _this3.justSelectedSuggestion = true;

                  setTimeout(function () {
                    _this3.justSelectedSuggestion = false;
                  });
                }

                break;
              }

            // Escape
            case 27:
              {
                if (isOpen) {
                  // If input.type === 'search', the browser clears the input
                  // when Escape is pressed. We want to disable this default
                  // behaviour so that, when suggestions are shown, we just hide
                  // them, without clearing the input.
                  event.preventDefault();
                }

                var willCloseSuggestions = isOpen && !alwaysRenderSuggestions;

                if (valueBeforeUpDown === null) {
                  // Didn't interact with Up/Down
                  if (!willCloseSuggestions) {
                    var _newValue2 = '';

                    _this3.maybeCallOnChange(event, _newValue2, 'escape');

                    if (shouldRenderSuggestions(_newValue2)) {
                      onSuggestionsFetchRequested({
                        value: _newValue2,
                        reason: 'escape-pressed'
                      });
                    } else {
                      _this3.onSuggestionsClearRequested();
                    }
                  }
                } else {
                  // Interacted with Up/Down
                  _this3.maybeCallOnChange(event, valueBeforeUpDown, 'escape');
                }

                if (willCloseSuggestions) {
                  _this3.onSuggestionsClearRequested();
                  _this3.closeSuggestions();
                } else {
                  _this3.resetHighlightedSuggestion();
                }

                break;
              }
          }

          _onKeyDown && _onKeyDown(event);
        }
      });
      var renderSuggestionData = {
        query: this.getQuery()
      };

      return _react2.default.createElement(_reactAutowhatever2.default, {
        multiSection: multiSection,
        items: items,
        renderInputComponent: renderInputComponent,
        renderItemsContainer: this.renderSuggestionsContainer,
        renderItem: renderSuggestion,
        renderItemData: renderSuggestionData,
        renderSectionTitle: renderSectionTitle,
        getSectionItems: getSectionSuggestions,
        highlightedSectionIndex: highlightedSectionIndex,
        highlightedItemIndex: highlightedSuggestionIndex,
        inputProps: autowhateverInputProps,
        itemProps: this.itemProps,
        theme: (0, _theme.mapToAutowhateverTheme)(theme),
        id: id,
        ref: this.storeAutowhateverRef
      });
    }
  }]);

  return Autosuggest;
}(_react.Component);

Autosuggest.propTypes = {
  suggestions: _propTypes2.default.array.isRequired,
  onSuggestionsFetchRequested: function onSuggestionsFetchRequested(props, propName) {
    var onSuggestionsFetchRequested = props[propName];

    if (typeof onSuggestionsFetchRequested !== 'function') {
      throw new Error("'onSuggestionsFetchRequested' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsFetchRequestedProp");
    }
  },
  onSuggestionsClearRequested: function onSuggestionsClearRequested(props, propName) {
    var onSuggestionsClearRequested = props[propName];

    if (props.alwaysRenderSuggestions === false && typeof onSuggestionsClearRequested !== 'function') {
      throw new Error("'onSuggestionsClearRequested' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsClearRequestedProp");
    }
  },
  onSuggestionSelected: _propTypes2.default.func,
  onSuggestionHighlighted: _propTypes2.default.func,
  renderInputComponent: _propTypes2.default.func,
  renderSuggestionsContainer: _propTypes2.default.func,
  getSuggestionValue: _propTypes2.default.func.isRequired,
  renderSuggestion: _propTypes2.default.func.isRequired,
  inputProps: function inputProps(props, propName) {
    var inputProps = props[propName];

    if (!inputProps.hasOwnProperty('value')) {
      throw new Error("'inputProps' must have 'value'.");
    }

    if (!inputProps.hasOwnProperty('onChange')) {
      throw new Error("'inputProps' must have 'onChange'.");
    }
  },
  shouldRenderSuggestions: _propTypes2.default.func,
  alwaysRenderSuggestions: _propTypes2.default.bool,
  multiSection: _propTypes2.default.bool,
  renderSectionTitle: function renderSectionTitle(props, propName) {
    var renderSectionTitle = props[propName];

    if (props.multiSection === true && typeof renderSectionTitle !== 'function') {
      throw new Error("'renderSectionTitle' must be implemented. See: https://github.com/moroshko/react-autosuggest#renderSectionTitleProp");
    }
  },
  getSectionSuggestions: function getSectionSuggestions(props, propName) {
    var getSectionSuggestions = props[propName];

    if (props.multiSection === true && typeof getSectionSuggestions !== 'function') {
      throw new Error("'getSectionSuggestions' must be implemented. See: https://github.com/moroshko/react-autosuggest#getSectionSuggestionsProp");
    }
  },
  focusInputOnSuggestionClick: _propTypes2.default.bool,
  highlightFirstSuggestion: _propTypes2.default.bool,
  theme: _propTypes2.default.object,
  id: _propTypes2.default.string
};
Autosuggest.defaultProps = {
  renderSuggestionsContainer: defaultRenderSuggestionsContainer,
  shouldRenderSuggestions: defaultShouldRenderSuggestions,
  alwaysRenderSuggestions: false,
  multiSection: false,
  focusInputOnSuggestionClick: true,
  highlightFirstSuggestion: false,
  theme: _theme.defaultTheme,
  id: '1'
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onDocumentMouseDown = function (event) {
    _this4.justClickedOnSuggestionsContainer = false;

    var node = event.detail && event.detail.target || // This is for testing only. Please show me a better way to emulate this.
    event.target;

    while (node !== null && node !== document) {
      if (node.getAttribute('data-suggestion-index') !== null) {
        // Suggestion was clicked
        return;
      }

      if (node === _this4.suggestionsContainer) {
        // Something else inside suggestions container was clicked
        _this4.justClickedOnSuggestionsContainer = true;
        return;
      }

      node = node.parentNode;
    }
  };

  this.storeAutowhateverRef = function (autowhatever) {
    if (autowhatever !== null) {
      _this4.autowhatever = autowhatever;
    }
  };

  this.onSuggestionMouseEnter = function (event, _ref3) {
    var sectionIndex = _ref3.sectionIndex,
        itemIndex = _ref3.itemIndex;

    _this4.updateHighlightedSuggestion(sectionIndex, itemIndex);

    if (event.target === _this4.pressedSuggestion) {
      _this4.justSelectedSuggestion = true;
    }

    _this4.justMouseEntered = true;

    setTimeout(function () {
      _this4.justMouseEntered = false;
    });
  };

  this.highlightFirstSuggestion = function () {
    _this4.updateHighlightedSuggestion(_this4.props.multiSection ? 0 : null, 0);
  };

  this.onDocumentMouseUp = function () {
    if (_this4.pressedSuggestion && !_this4.justSelectedSuggestion) {
      _this4.input.focus();
    }
    _this4.pressedSuggestion = null;
  };

  this.onSuggestionMouseDown = function (event) {
    // Checking if this.justSelectedSuggestion is already true to not duplicate touch events in chrome
    // See: https://github.com/facebook/react/issues/9809#issuecomment-413978405
    if (!_this4.justSelectedSuggestion) {
      _this4.justSelectedSuggestion = true;
      _this4.pressedSuggestion = event.target;
    }
  };

  this.onSuggestionsClearRequested = function () {
    var onSuggestionsClearRequested = _this4.props.onSuggestionsClearRequested;


    onSuggestionsClearRequested && onSuggestionsClearRequested();
  };

  this.onSuggestionSelected = function (event, data) {
    var _props4 = _this4.props,
        alwaysRenderSuggestions = _props4.alwaysRenderSuggestions,
        onSuggestionSelected = _props4.onSuggestionSelected,
        onSuggestionsFetchRequested = _props4.onSuggestionsFetchRequested;


    onSuggestionSelected && onSuggestionSelected(event, data);

    if (alwaysRenderSuggestions) {
      onSuggestionsFetchRequested({
        value: data.suggestionValue,
        reason: 'suggestion-selected'
      });
    } else {
      _this4.onSuggestionsClearRequested();
    }

    _this4.resetHighlightedSuggestion();
  };

  this.onSuggestionClick = function (event) {
    var _props5 = _this4.props,
        alwaysRenderSuggestions = _props5.alwaysRenderSuggestions,
        focusInputOnSuggestionClick = _props5.focusInputOnSuggestionClick;

    var _getSuggestionIndices = _this4.getSuggestionIndices(_this4.findSuggestionElement(event.target)),
        sectionIndex = _getSuggestionIndices.sectionIndex,
        suggestionIndex = _getSuggestionIndices.suggestionIndex;

    var clickedSuggestion = _this4.getSuggestion(sectionIndex, suggestionIndex);
    var clickedSuggestionValue = _this4.props.getSuggestionValue(clickedSuggestion);

    _this4.maybeCallOnChange(event, clickedSuggestionValue, 'click');
    _this4.onSuggestionSelected(event, {
      suggestion: clickedSuggestion,
      suggestionValue: clickedSuggestionValue,
      suggestionIndex: suggestionIndex,
      sectionIndex: sectionIndex,
      method: 'click'
    });

    if (!alwaysRenderSuggestions) {
      _this4.closeSuggestions();
    }

    if (focusInputOnSuggestionClick === true) {
      _this4.input.focus();
    } else {
      _this4.onBlur();
    }

    setTimeout(function () {
      _this4.justSelectedSuggestion = false;
    });
  };

  this.onBlur = function () {
    var _props6 = _this4.props,
        inputProps = _props6.inputProps,
        shouldRenderSuggestions = _props6.shouldRenderSuggestions;
    var value = inputProps.value,
        onBlur = inputProps.onBlur;

    var highlightedSuggestion = _this4.getHighlightedSuggestion();
    var shouldRender = shouldRenderSuggestions(value);

    _this4.setState({
      isFocused: false,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      highlightedSuggestion: null,
      valueBeforeUpDown: null,
      isCollapsed: !shouldRender
    });

    onBlur && onBlur(_this4.blurEvent, { highlightedSuggestion: highlightedSuggestion });
  };

  this.onSuggestionMouseLeave = function (event) {
    _this4.resetHighlightedSuggestion(false); // shouldResetValueBeforeUpDown

    if (_this4.justSelectedSuggestion && event.target === _this4.pressedSuggestion) {
      _this4.justSelectedSuggestion = false;
    }
  };

  this.onSuggestionTouchStart = function () {
    _this4.justSelectedSuggestion = true;
    // todo: event.preventDefault when https://github.com/facebook/react/issues/2043
    // todo: gets released so onSuggestionMouseDown won't fire in chrome
  };

  this.onSuggestionTouchMove = function () {
    _this4.justSelectedSuggestion = false;
    _this4.pressedSuggestion = null;
    _this4.input.focus();
  };

  this.itemProps = function (_ref4) {
    var sectionIndex = _ref4.sectionIndex,
        itemIndex = _ref4.itemIndex;

    return {
      'data-section-index': sectionIndex,
      'data-suggestion-index': itemIndex,
      onMouseEnter: _this4.onSuggestionMouseEnter,
      onMouseLeave: _this4.onSuggestionMouseLeave,
      onMouseDown: _this4.onSuggestionMouseDown,
      onTouchStart: _this4.onSuggestionTouchStart,
      onTouchMove: _this4.onSuggestionTouchMove,
      onClick: _this4.onSuggestionClick
    };
  };

  this.renderSuggestionsContainer = function (_ref5) {
    var containerProps = _ref5.containerProps,
        children = _ref5.children;
    var renderSuggestionsContainer = _this4.props.renderSuggestionsContainer;


    return renderSuggestionsContainer({
      containerProps: containerProps,
      children: children,
      query: _this4.getQuery()
    });
  };
};

exports.default = Autosuggest;

/***/ }),

/***/ 916:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function shallowEqualArrays(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqualArrays;


/***/ }),

/***/ 917:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(918).default;

/***/ }),

/***/ 918:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sectionIterator = __webpack_require__(919);

var _sectionIterator2 = _interopRequireDefault(_sectionIterator);

var _reactThemeable = __webpack_require__(920);

var _reactThemeable2 = _interopRequireDefault(_reactThemeable);

var _SectionTitle = __webpack_require__(922);

var _SectionTitle2 = _interopRequireDefault(_SectionTitle);

var _ItemsList = __webpack_require__(923);

var _ItemsList2 = _interopRequireDefault(_ItemsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var emptyObject = {};
var defaultRenderInputComponent = function defaultRenderInputComponent(props) {
  return _react2.default.createElement('input', props);
};
var defaultRenderItemsContainer = function defaultRenderItemsContainer(_ref) {
  var containerProps = _ref.containerProps,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    containerProps,
    children
  );
};
var defaultTheme = {
  container: 'react-autowhatever__container',
  containerOpen: 'react-autowhatever__container--open',
  input: 'react-autowhatever__input',
  inputOpen: 'react-autowhatever__input--open',
  inputFocused: 'react-autowhatever__input--focused',
  itemsContainer: 'react-autowhatever__items-container',
  itemsContainerOpen: 'react-autowhatever__items-container--open',
  itemsList: 'react-autowhatever__items-list',
  item: 'react-autowhatever__item',
  itemFirst: 'react-autowhatever__item--first',
  itemHighlighted: 'react-autowhatever__item--highlighted',
  sectionContainer: 'react-autowhatever__section-container',
  sectionContainerFirst: 'react-autowhatever__section-container--first',
  sectionTitle: 'react-autowhatever__section-title'
};

var Autowhatever = function (_Component) {
  _inherits(Autowhatever, _Component);

  function Autowhatever(props) {
    _classCallCheck(this, Autowhatever);

    var _this = _possibleConstructorReturn(this, (Autowhatever.__proto__ || Object.getPrototypeOf(Autowhatever)).call(this, props));

    _this.storeInputReference = function (input) {
      if (input !== null) {
        _this.input = input;
      }
    };

    _this.storeItemsContainerReference = function (itemsContainer) {
      if (itemsContainer !== null) {
        _this.itemsContainer = itemsContainer;
      }
    };

    _this.onHighlightedItemChange = function (highlightedItem) {
      _this.highlightedItem = highlightedItem;
    };

    _this.getItemId = function (sectionIndex, itemIndex) {
      if (itemIndex === null) {
        return null;
      }

      var id = _this.props.id;

      var section = sectionIndex === null ? '' : 'section-' + sectionIndex;

      return 'react-autowhatever-' + id + '-' + section + '-item-' + itemIndex;
    };

    _this.onFocus = function (event) {
      var inputProps = _this.props.inputProps;


      _this.setState({
        isInputFocused: true
      });

      inputProps.onFocus && inputProps.onFocus(event);
    };

    _this.onBlur = function (event) {
      var inputProps = _this.props.inputProps;


      _this.setState({
        isInputFocused: false
      });

      inputProps.onBlur && inputProps.onBlur(event);
    };

    _this.onKeyDown = function (event) {
      var _this$props = _this.props,
          inputProps = _this$props.inputProps,
          highlightedSectionIndex = _this$props.highlightedSectionIndex,
          highlightedItemIndex = _this$props.highlightedItemIndex;


      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          {
            var nextPrev = event.key === 'ArrowDown' ? 'next' : 'prev';

            var _this$sectionIterator = _this.sectionIterator[nextPrev]([highlightedSectionIndex, highlightedItemIndex]),
                _this$sectionIterator2 = _slicedToArray(_this$sectionIterator, 2),
                newHighlightedSectionIndex = _this$sectionIterator2[0],
                newHighlightedItemIndex = _this$sectionIterator2[1];

            inputProps.onKeyDown(event, { newHighlightedSectionIndex: newHighlightedSectionIndex, newHighlightedItemIndex: newHighlightedItemIndex });
            break;
          }

        default:
          inputProps.onKeyDown(event, { highlightedSectionIndex: highlightedSectionIndex, highlightedItemIndex: highlightedItemIndex });
      }
    };

    _this.highlightedItem = null;

    _this.state = {
      isInputFocused: false
    };

    _this.setSectionsItems(props);
    _this.setSectionIterator(props);
    _this.setTheme(props);
    return _this;
  }

  _createClass(Autowhatever, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ensureHighlightedItemIsVisible();
    }

    // eslint-disable-next-line camelcase, react/sort-comp

  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.items !== this.props.items) {
        this.setSectionsItems(nextProps);
      }

      if (nextProps.items !== this.props.items || nextProps.multiSection !== this.props.multiSection) {
        this.setSectionIterator(nextProps);
      }

      if (nextProps.theme !== this.props.theme) {
        this.setTheme(nextProps);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.ensureHighlightedItemIsVisible();
    }
  }, {
    key: 'setSectionsItems',
    value: function setSectionsItems(props) {
      if (props.multiSection) {
        this.sectionsItems = props.items.map(function (section) {
          return props.getSectionItems(section);
        });
        this.sectionsLengths = this.sectionsItems.map(function (items) {
          return items.length;
        });
        this.allSectionsAreEmpty = this.sectionsLengths.every(function (itemsCount) {
          return itemsCount === 0;
        });
      }
    }
  }, {
    key: 'setSectionIterator',
    value: function setSectionIterator(props) {
      this.sectionIterator = (0, _sectionIterator2.default)({
        multiSection: props.multiSection,
        data: props.multiSection ? this.sectionsLengths : props.items.length
      });
    }
  }, {
    key: 'setTheme',
    value: function setTheme(props) {
      this.theme = (0, _reactThemeable2.default)(props.theme);
    }
  }, {
    key: 'renderSections',
    value: function renderSections() {
      var _this2 = this;

      if (this.allSectionsAreEmpty) {
        return null;
      }

      var theme = this.theme;
      var _props = this.props,
          id = _props.id,
          items = _props.items,
          renderItem = _props.renderItem,
          renderItemData = _props.renderItemData,
          renderSectionTitle = _props.renderSectionTitle,
          highlightedSectionIndex = _props.highlightedSectionIndex,
          highlightedItemIndex = _props.highlightedItemIndex,
          itemProps = _props.itemProps;


      return items.map(function (section, sectionIndex) {
        var keyPrefix = 'react-autowhatever-' + id + '-';
        var sectionKeyPrefix = keyPrefix + 'section-' + sectionIndex + '-';
        var isFirstSection = sectionIndex === 0;

        // `key` is provided by theme()
        /* eslint-disable react/jsx-key */
        return _react2.default.createElement(
          'div',
          theme(sectionKeyPrefix + 'container', 'sectionContainer', isFirstSection && 'sectionContainerFirst'),
          _react2.default.createElement(_SectionTitle2.default, {
            section: section,
            renderSectionTitle: renderSectionTitle,
            theme: theme,
            sectionKeyPrefix: sectionKeyPrefix
          }),
          _react2.default.createElement(_ItemsList2.default, {
            items: _this2.sectionsItems[sectionIndex],
            itemProps: itemProps,
            renderItem: renderItem,
            renderItemData: renderItemData,
            sectionIndex: sectionIndex,
            highlightedItemIndex: highlightedSectionIndex === sectionIndex ? highlightedItemIndex : null,
            onHighlightedItemChange: _this2.onHighlightedItemChange,
            getItemId: _this2.getItemId,
            theme: theme,
            keyPrefix: keyPrefix,
            ref: _this2.storeItemsListReference
          })
        );
        /* eslint-enable react/jsx-key */
      });
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var items = this.props.items;


      if (items.length === 0) {
        return null;
      }

      var theme = this.theme;
      var _props2 = this.props,
          id = _props2.id,
          renderItem = _props2.renderItem,
          renderItemData = _props2.renderItemData,
          highlightedSectionIndex = _props2.highlightedSectionIndex,
          highlightedItemIndex = _props2.highlightedItemIndex,
          itemProps = _props2.itemProps;


      return _react2.default.createElement(_ItemsList2.default, {
        items: items,
        itemProps: itemProps,
        renderItem: renderItem,
        renderItemData: renderItemData,
        highlightedItemIndex: highlightedSectionIndex === null ? highlightedItemIndex : null,
        onHighlightedItemChange: this.onHighlightedItemChange,
        getItemId: this.getItemId,
        theme: theme,
        keyPrefix: 'react-autowhatever-' + id + '-'
      });
    }
  }, {
    key: 'ensureHighlightedItemIsVisible',
    value: function ensureHighlightedItemIsVisible() {
      var highlightedItem = this.highlightedItem;


      if (!highlightedItem) {
        return;
      }

      var itemsContainer = this.itemsContainer;

      var itemOffsetRelativeToContainer = highlightedItem.offsetParent === itemsContainer ? highlightedItem.offsetTop : highlightedItem.offsetTop - itemsContainer.offsetTop;

      var scrollTop = itemsContainer.scrollTop; // Top of the visible area

      if (itemOffsetRelativeToContainer < scrollTop) {
        // Item is off the top of the visible area
        scrollTop = itemOffsetRelativeToContainer;
      } else if (itemOffsetRelativeToContainer + highlightedItem.offsetHeight > scrollTop + itemsContainer.offsetHeight) {
        // Item is off the bottom of the visible area
        scrollTop = itemOffsetRelativeToContainer + highlightedItem.offsetHeight - itemsContainer.offsetHeight;
      }

      if (scrollTop !== itemsContainer.scrollTop) {
        itemsContainer.scrollTop = scrollTop;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var theme = this.theme;
      var _props3 = this.props,
          id = _props3.id,
          multiSection = _props3.multiSection,
          renderInputComponent = _props3.renderInputComponent,
          renderItemsContainer = _props3.renderItemsContainer,
          highlightedSectionIndex = _props3.highlightedSectionIndex,
          highlightedItemIndex = _props3.highlightedItemIndex;
      var isInputFocused = this.state.isInputFocused;

      var renderedItems = multiSection ? this.renderSections() : this.renderItems();
      var isOpen = renderedItems !== null;
      var ariaActivedescendant = this.getItemId(highlightedSectionIndex, highlightedItemIndex);
      var itemsContainerId = 'react-autowhatever-' + id;
      var containerProps = _extends({
        role: 'combobox',
        'aria-haspopup': 'listbox',
        'aria-owns': itemsContainerId,
        'aria-expanded': isOpen
      }, theme('react-autowhatever-' + id + '-container', 'container', isOpen && 'containerOpen'), this.props.containerProps);
      var inputComponent = renderInputComponent(_extends({
        type: 'text',
        value: '',
        autoComplete: 'off',
        'aria-autocomplete': 'list',
        'aria-controls': itemsContainerId,
        'aria-activedescendant': ariaActivedescendant
      }, theme('react-autowhatever-' + id + '-input', 'input', isOpen && 'inputOpen', isInputFocused && 'inputFocused'), this.props.inputProps, {
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown,
        ref: this.storeInputReference
      }));
      var itemsContainer = renderItemsContainer({
        containerProps: _extends({
          id: itemsContainerId,
          role: 'listbox'
        }, theme('react-autowhatever-' + id + '-items-container', 'itemsContainer', isOpen && 'itemsContainerOpen'), {
          ref: this.storeItemsContainerReference
        }),
        children: renderedItems
      });

      return _react2.default.createElement(
        'div',
        containerProps,
        inputComponent,
        itemsContainer
      );
    }
  }]);

  return Autowhatever;
}(_react.Component);

Autowhatever.propTypes = {
  id: _propTypes2.default.string, // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
  multiSection: _propTypes2.default.bool, // Indicates whether a multi section layout should be rendered.
  renderInputComponent: _propTypes2.default.func, // When specified, it is used to render the input element.
  renderItemsContainer: _propTypes2.default.func, // Renders the items container.
  items: _propTypes2.default.array.isRequired, // Array of items or sections to render.
  renderItem: _propTypes2.default.func, // This function renders a single item.
  renderItemData: _propTypes2.default.object, // Arbitrary data that will be passed to renderItem()
  renderSectionTitle: _propTypes2.default.func, // This function gets a section and renders its title.
  getSectionItems: _propTypes2.default.func, // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
  containerProps: _propTypes2.default.object, // Arbitrary container props
  inputProps: _propTypes2.default.object, // Arbitrary input props
  itemProps: _propTypes2.default.oneOfType([// Arbitrary item props
  _propTypes2.default.object, _propTypes2.default.func]),
  highlightedSectionIndex: _propTypes2.default.number, // Section index of the highlighted item
  highlightedItemIndex: _propTypes2.default.number, // Highlighted item index (within a section)
  theme: _propTypes2.default.oneOfType([// Styles. See: https://github.com/markdalgleish/react-themeable
  _propTypes2.default.object, _propTypes2.default.array])
};
Autowhatever.defaultProps = {
  id: '1',
  multiSection: false,
  renderInputComponent: defaultRenderInputComponent,
  renderItemsContainer: defaultRenderItemsContainer,
  renderItem: function renderItem() {
    throw new Error('`renderItem` must be provided');
  },
  renderItemData: emptyObject,
  renderSectionTitle: function renderSectionTitle() {
    throw new Error('`renderSectionTitle` must be provided');
  },
  getSectionItems: function getSectionItems() {
    throw new Error('`getSectionItems` must be provided');
  },
  containerProps: emptyObject,
  inputProps: emptyObject,
  itemProps: emptyObject,
  highlightedSectionIndex: null,
  highlightedItemIndex: null,
  theme: defaultTheme
};
exports.default = Autowhatever;

/***/ }),

/***/ 919:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function (_ref) {
  var data = _ref.data;
  var multiSection = _ref.multiSection;

  function nextNonEmptySectionIndex(sectionIndex) {
    if (sectionIndex === null) {
      sectionIndex = 0;
    } else {
      sectionIndex++;
    }

    while (sectionIndex < data.length && data[sectionIndex] === 0) {
      sectionIndex++;
    }

    return sectionIndex === data.length ? null : sectionIndex;
  }

  function prevNonEmptySectionIndex(sectionIndex) {
    if (sectionIndex === null) {
      sectionIndex = data.length - 1;
    } else {
      sectionIndex--;
    }

    while (sectionIndex >= 0 && data[sectionIndex] === 0) {
      sectionIndex--;
    }

    return sectionIndex === -1 ? null : sectionIndex;
  }

  function next(position) {
    var _position = _slicedToArray(position, 2);

    var sectionIndex = _position[0];
    var itemIndex = _position[1];


    if (multiSection) {
      if (itemIndex === null || itemIndex === data[sectionIndex] - 1) {
        sectionIndex = nextNonEmptySectionIndex(sectionIndex);

        if (sectionIndex === null) {
          return [null, null];
        }

        return [sectionIndex, 0];
      }

      return [sectionIndex, itemIndex + 1];
    }

    if (data === 0 || itemIndex === data - 1) {
      return [null, null];
    }

    if (itemIndex === null) {
      return [null, 0];
    }

    return [null, itemIndex + 1];
  }

  function prev(position) {
    var _position2 = _slicedToArray(position, 2);

    var sectionIndex = _position2[0];
    var itemIndex = _position2[1];


    if (multiSection) {
      if (itemIndex === null || itemIndex === 0) {
        sectionIndex = prevNonEmptySectionIndex(sectionIndex);

        if (sectionIndex === null) {
          return [null, null];
        }

        return [sectionIndex, data[sectionIndex] - 1];
      }

      return [sectionIndex, itemIndex - 1];
    }

    if (data === 0 || itemIndex === 0) {
      return [null, null];
    }

    if (itemIndex === null) {
      return [null, data - 1];
    }

    return [null, itemIndex - 1];
  }

  function isLast(position) {
    return next(position)[1] === null;
  }

  return {
    next: next,
    prev: prev,
    isLast: isLast
  };
};


/***/ }),

/***/ 920:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _objectAssign = __webpack_require__(921);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var truthy = function truthy(x) {
  return x;
};

exports['default'] = function (input) {
  var _ref = Array.isArray(input) && input.length === 2 ? input : [input, null];

  var _ref2 = _slicedToArray(_ref, 2);

  var theme = _ref2[0];
  var classNameDecorator = _ref2[1];

  return function (key) {
    for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      names[_key - 1] = arguments[_key];
    }

    var styles = names.map(function (name) {
      return theme[name];
    }).filter(truthy);

    return typeof styles[0] === 'string' || typeof classNameDecorator === 'function' ? { key: key, className: classNameDecorator ? classNameDecorator.apply(undefined, _toConsumableArray(styles)) : styles.join(' ') } : { key: key, style: _objectAssign2['default'].apply(undefined, [{}].concat(_toConsumableArray(styles))) };
  };
};

module.exports = exports['default'];

/***/ }),

/***/ 921:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable.call(obj, key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};


/***/ }),

/***/ 922:
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

var _compareObjects = __webpack_require__(870);

var _compareObjects2 = _interopRequireDefault(_compareObjects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SectionTitle = function (_Component) {
  _inherits(SectionTitle, _Component);

  function SectionTitle() {
    _classCallCheck(this, SectionTitle);

    return _possibleConstructorReturn(this, (SectionTitle.__proto__ || Object.getPrototypeOf(SectionTitle)).apply(this, arguments));
  }

  _createClass(SectionTitle, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return (0, _compareObjects2.default)(nextProps, this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          section = _props.section,
          renderSectionTitle = _props.renderSectionTitle,
          theme = _props.theme,
          sectionKeyPrefix = _props.sectionKeyPrefix;

      var sectionTitle = renderSectionTitle(section);

      if (!sectionTitle) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        theme(sectionKeyPrefix + 'title', 'sectionTitle'),
        sectionTitle
      );
    }
  }]);

  return SectionTitle;
}(_react.Component);

SectionTitle.propTypes = {
  section: _propTypes2.default.any.isRequired,
  renderSectionTitle: _propTypes2.default.func.isRequired,
  theme: _propTypes2.default.func.isRequired,
  sectionKeyPrefix: _propTypes2.default.string.isRequired
};
exports.default = SectionTitle;

/***/ }),

/***/ 923:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Item = __webpack_require__(924);

var _Item2 = _interopRequireDefault(_Item);

var _compareObjects = __webpack_require__(870);

var _compareObjects2 = _interopRequireDefault(_compareObjects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemsList = function (_Component) {
  _inherits(ItemsList, _Component);

  function ItemsList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ItemsList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).call.apply(_ref, [this].concat(args))), _this), _this.storeHighlightedItemReference = function (highlightedItem) {
      _this.props.onHighlightedItemChange(highlightedItem === null ? null : highlightedItem.item);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ItemsList, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return (0, _compareObjects2.default)(nextProps, this.props, ['itemProps']);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          items = _props.items,
          itemProps = _props.itemProps,
          renderItem = _props.renderItem,
          renderItemData = _props.renderItemData,
          sectionIndex = _props.sectionIndex,
          highlightedItemIndex = _props.highlightedItemIndex,
          getItemId = _props.getItemId,
          theme = _props.theme,
          keyPrefix = _props.keyPrefix;

      var sectionPrefix = sectionIndex === null ? keyPrefix : keyPrefix + 'section-' + sectionIndex + '-';
      var isItemPropsFunction = typeof itemProps === 'function';

      return _react2.default.createElement(
        'ul',
        _extends({ role: 'listbox' }, theme(sectionPrefix + 'items-list', 'itemsList')),
        items.map(function (item, itemIndex) {
          var isFirst = itemIndex === 0;
          var isHighlighted = itemIndex === highlightedItemIndex;
          var itemKey = sectionPrefix + 'item-' + itemIndex;
          var itemPropsObj = isItemPropsFunction ? itemProps({ sectionIndex: sectionIndex, itemIndex: itemIndex }) : itemProps;
          var allItemProps = _extends({
            id: getItemId(sectionIndex, itemIndex),
            'aria-selected': isHighlighted
          }, theme(itemKey, 'item', isFirst && 'itemFirst', isHighlighted && 'itemHighlighted'), itemPropsObj);

          if (isHighlighted) {
            allItemProps.ref = _this2.storeHighlightedItemReference;
          }

          // `key` is provided by theme()
          /* eslint-disable react/jsx-key */
          return _react2.default.createElement(_Item2.default, _extends({}, allItemProps, {
            sectionIndex: sectionIndex,
            isHighlighted: isHighlighted,
            itemIndex: itemIndex,
            item: item,
            renderItem: renderItem,
            renderItemData: renderItemData
          }));
          /* eslint-enable react/jsx-key */
        })
      );
    }
  }]);

  return ItemsList;
}(_react.Component);

ItemsList.propTypes = {
  items: _propTypes2.default.array.isRequired,
  itemProps: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
  renderItem: _propTypes2.default.func.isRequired,
  renderItemData: _propTypes2.default.object.isRequired,
  sectionIndex: _propTypes2.default.number,
  highlightedItemIndex: _propTypes2.default.number,
  onHighlightedItemChange: _propTypes2.default.func.isRequired,
  getItemId: _propTypes2.default.func.isRequired,
  theme: _propTypes2.default.func.isRequired,
  keyPrefix: _propTypes2.default.string.isRequired
};
ItemsList.defaultProps = {
  sectionIndex: null
};
exports.default = ItemsList;

/***/ }),

/***/ 924:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compareObjects = __webpack_require__(870);

var _compareObjects2 = _interopRequireDefault(_compareObjects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_Component) {
  _inherits(Item, _Component);

  function Item() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.storeItemReference = function (item) {
      if (item !== null) {
        _this.item = item;
      }
    }, _this.onMouseEnter = function (event) {
      var _this$props = _this.props,
          sectionIndex = _this$props.sectionIndex,
          itemIndex = _this$props.itemIndex;


      _this.props.onMouseEnter(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
    }, _this.onMouseLeave = function (event) {
      var _this$props2 = _this.props,
          sectionIndex = _this$props2.sectionIndex,
          itemIndex = _this$props2.itemIndex;


      _this.props.onMouseLeave(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
    }, _this.onMouseDown = function (event) {
      var _this$props3 = _this.props,
          sectionIndex = _this$props3.sectionIndex,
          itemIndex = _this$props3.itemIndex;


      _this.props.onMouseDown(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
    }, _this.onClick = function (event) {
      var _this$props4 = _this.props,
          sectionIndex = _this$props4.sectionIndex,
          itemIndex = _this$props4.itemIndex;


      _this.props.onClick(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Item, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return (0, _compareObjects2.default)(nextProps, this.props, ['renderItemData']);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isHighlighted = _props.isHighlighted,
          item = _props.item,
          renderItem = _props.renderItem,
          renderItemData = _props.renderItemData,
          restProps = _objectWithoutProperties(_props, ['isHighlighted', 'item', 'renderItem', 'renderItemData']);

      delete restProps.sectionIndex;
      delete restProps.itemIndex;

      if (typeof restProps.onMouseEnter === 'function') {
        restProps.onMouseEnter = this.onMouseEnter;
      }

      if (typeof restProps.onMouseLeave === 'function') {
        restProps.onMouseLeave = this.onMouseLeave;
      }

      if (typeof restProps.onMouseDown === 'function') {
        restProps.onMouseDown = this.onMouseDown;
      }

      if (typeof restProps.onClick === 'function') {
        restProps.onClick = this.onClick;
      }

      return _react2.default.createElement(
        'li',
        _extends({ role: 'option' }, restProps, { ref: this.storeItemReference }),
        renderItem(item, _extends({ isHighlighted: isHighlighted }, renderItemData))
      );
    }
  }]);

  return Item;
}(_react.Component);

Item.propTypes = {
  sectionIndex: _propTypes2.default.number,
  isHighlighted: _propTypes2.default.bool.isRequired,
  itemIndex: _propTypes2.default.number.isRequired,
  item: _propTypes2.default.any.isRequired,
  renderItem: _propTypes2.default.func.isRequired,
  renderItemData: _propTypes2.default.object.isRequired,
  onMouseEnter: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onClick: _propTypes2.default.func
};
exports.default = Item;

/***/ }),

/***/ 925:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultTheme = exports.defaultTheme = {
  container: 'react-autosuggest__container',
  containerOpen: 'react-autosuggest__container--open',
  input: 'react-autosuggest__input',
  inputOpen: 'react-autosuggest__input--open',
  inputFocused: 'react-autosuggest__input--focused',
  suggestionsContainer: 'react-autosuggest__suggestions-container',
  suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
  suggestionsList: 'react-autosuggest__suggestions-list',
  suggestion: 'react-autosuggest__suggestion',
  suggestionFirst: 'react-autosuggest__suggestion--first',
  suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
  sectionContainer: 'react-autosuggest__section-container',
  sectionContainerFirst: 'react-autosuggest__section-container--first',
  sectionTitle: 'react-autosuggest__section-title'
};

var mapToAutowhateverTheme = exports.mapToAutowhateverTheme = function mapToAutowhateverTheme(theme) {
  var result = {};

  for (var key in theme) {
    switch (key) {
      case 'suggestionsContainer':
        result['itemsContainer'] = theme[key];
        break;

      case 'suggestionsContainerOpen':
        result['itemsContainerOpen'] = theme[key];
        break;

      case 'suggestion':
        result['item'] = theme[key];
        break;

      case 'suggestionFirst':
        result['itemFirst'] = theme[key];
        break;

      case 'suggestionHighlighted':
        result['itemHighlighted'] = theme[key];
        break;

      case 'suggestionsList':
        result['itemsList'] = theme[key];
        break;

      default:
        result[key] = theme[key];
    }
  }

  return result;
};

/***/ }),

/***/ 926:
/***/ (function(module, exports, __webpack_require__) {

// THIS FILE IS GENERATED - DO NOT EDIT!
/*!mobile-detect v1.4.5 2021-03-13*/
/*global module:false, define:false*/
/*jshint latedef:false*/
/*!@license Copyright 2013, Heinrich Goebl, License: MIT, see https://github.com/hgoebl/mobile-detect.js*/
(function (define, undefined) {
define(function () {
    'use strict';

    var impl = {};

    impl.mobileDetectRules = {
    "phones": {
        "iPhone": "\\biPhone\\b|\\biPod\\b",
        "BlackBerry": "BlackBerry|\\bBB10\\b|rim[0-9]+|\\b(BBA100|BBB100|BBD100|BBE100|BBF100|STH100)\\b-[0-9]+",
        "Pixel": "; \\bPixel\\b",
        "HTC": "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m|Android [0-9.]+; Pixel",
        "Nexus": "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 5X|Nexus 6",
        "Dell": "Dell[;]? (Streak|Aero|Venue|Venue Pro|Flash|Smoke|Mini 3iX)|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
        "Motorola": "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b|XT1068|XT1092|XT1052",
        "Samsung": "\\bSamsung\\b|SM-G950F|SM-G955F|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F|SM-G920F|SM-G920V|SM-G930F|SM-N910C|SM-A310F|GT-I9190|SM-J500FN|SM-G903F|SM-J330F|SM-G610F|SM-G981B|SM-G892A|SM-A530F",
        "LG": "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323|M257)|LM-G710",
        "Sony": "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533|SOV34|601SO|F8332",
        "Asus": "Asus.*Galaxy|PadFone.*Mobile",
        "Xiaomi": "^(?!.*\\bx11\\b).*xiaomi.*$|POCOPHONE F1|MI 8|Redmi Note 9S|Redmi Note 5A Prime|N2G47H|M2001J2G|M2001J2I|M1805E10A|M2004J11G|M1902F1G|M2002J9G|M2004J19G|M2003J6A1G",
        "NokiaLumia": "Lumia [0-9]{3,4}",
        "Micromax": "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
        "Palm": "PalmSource|Palm",
        "Vertu": "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
        "Pantech": "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
        "Fly": "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
        "Wiko": "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
        "iMobile": "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
        "SimValley": "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
        "Wolfgang": "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
        "Alcatel": "Alcatel",
        "Nintendo": "Nintendo (3DS|Switch)",
        "Amoi": "Amoi",
        "INQ": "INQ",
        "OnePlus": "ONEPLUS",
        "GenericPhone": "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
    },
    "tablets": {
        "iPad": "iPad|iPad.*Mobile",
        "NexusTablet": "Android.*Nexus[\\s]+(7|9|10)",
        "GoogleTablet": "Android.*Pixel C",
        "SamsungTablet": "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-T116BU|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y?|SM-T280|SM-T817A|SM-T820|SM-W700|SM-P580|SM-T587|SM-P350|SM-P555M|SM-P355M|SM-T113NU|SM-T815Y|SM-T585|SM-T285|SM-T825|SM-W708|SM-T835|SM-T830|SM-T837V|SM-T720|SM-T510|SM-T387V|SM-P610|SM-T290|SM-T515|SM-T590|SM-T595|SM-T725|SM-T817P|SM-P585N0|SM-T395|SM-T295|SM-T865|SM-P610N|SM-P615|SM-T970|SM-T380|SM-T5950|SM-T905|SM-T231|SM-T500|SM-T860",
        "Kindle": "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI|KFFOWI|KFGIWI|KFMEWI)\\b|Android.*Silk\/[0-9.]+ like Chrome\/[0-9.]+ (?!Mobile)",
        "SurfaceTablet": "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
        "HPTablet": "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
        "AsusTablet": "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z|\\bP027\\b|\\bP024\\b|\\bP00C\\b",
        "BlackBerryTablet": "PlayBook|RIM Tablet",
        "HTCtablet": "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
        "MotorolaTablet": "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
        "NookTablet": "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
        "AcerTablet": "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30|A3-A40",
        "ToshibaTablet": "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
        "LGTablet": "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
        "FujitsuTablet": "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
        "PrestigioTablet": "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
        "LenovoTablet": "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-850M|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)|TB-X103F|TB-X304X|TB-X304F|TB-X304L|TB-X505F|TB-X505L|TB-X505X|TB-X605F|TB-X605L|TB-8703F|TB-8703X|TB-8703N|TB-8704N|TB-8704F|TB-8704X|TB-8704V|TB-7304F|TB-7304I|TB-7304X|Tab2A7-10F|Tab2A7-20F|TB2-X30L|YT3-X50L|YT3-X50F|YT3-X50M|YT-X705F|YT-X703F|YT-X703L|YT-X705L|YT-X705X|TB2-X30F|TB2-X30L|TB2-X30M|A2107A-F|A2107A-H|TB3-730F|TB3-730M|TB3-730X|TB-7504F|TB-7504X|TB-X704F|TB-X104F|TB3-X70F|TB-X705F|TB-8504F|TB3-X70L|TB3-710F|TB-X704L",
        "DellTablet": "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
        "YarvikTablet": "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
        "MedionTablet": "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
        "ArnovaTablet": "97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
        "IntensoTablet": "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
        "IRUTablet": "M702pro",
        "MegafonTablet": "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
        "EbodaTablet": "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
        "AllViewTablet": "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
        "ArchosTablet": "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|c|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
        "AinolTablet": "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
        "NokiaLumiaTablet": "Lumia 2520",
        "SonyTablet": "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP641|SGP612|SOT31|SGP771|SGP611|SGP612|SGP712",
        "PhilipsTablet": "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
        "CubeTablet": "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
        "CobyTablet": "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
        "MIDTablet": "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
        "MSITablet": "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
        "SMiTTablet": "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
        "RockChipTablet": "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
        "FlyTablet": "IQ310|Fly Vision",
        "bqTablet": "Android.*(bq)?.*\\b(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris ([E|M]10|M8))\\b|Maxwell.*Lite|Maxwell.*Plus",
        "HuaweiTablet": "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim|M2-A01L|BAH-L09|BAH-W09|AGS-L09|CMR-AL19",
        "NecTablet": "\\bN-06D|\\bN-08D",
        "PantechTablet": "Pantech.*P4100",
        "BronchoTablet": "Broncho.*(N701|N708|N802|a710)",
        "VersusTablet": "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
        "ZyncTablet": "z1000|Z99 2G|z930|z990|z909|Z919|z900",
        "PositivoTablet": "TB07STA|TB10STA|TB07FTA|TB10FTA",
        "NabiTablet": "Android.*\\bNabi",
        "KoboTablet": "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
        "DanewTablet": "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
        "TexetTablet": "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
        "PlaystationTablet": "Playstation.*(Portable|Vita)",
        "TrekstorTablet": "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
        "PyleAudioTablet": "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
        "AdvanTablet": "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
        "DanyTechTablet": "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
        "GalapadTablet": "Android [0-9.]+; [a-z-]+; \\bG1\\b",
        "MicromaxTablet": "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
        "KarbonnTablet": "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
        "AllFineTablet": "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
        "PROSCANTablet": "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
        "YONESTablet": "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
        "ChangJiaTablet": "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
        "GUTablet": "TX-A1301|TX-M9002|Q702|kf026",
        "PointOfViewTablet": "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
        "OvermaxTablet": "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)|Qualcore 1027",
        "HCLTablet": "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
        "DPSTablet": "DPS Dream 9|DPS Dual 7",
        "VistureTablet": "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
        "CrestaTablet": "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
        "MediatekTablet": "\\bMT8125|MT8389|MT8135|MT8377\\b",
        "ConcordeTablet": "Concorde([ ]+)?Tab|ConCorde ReadMan",
        "GoCleverTablet": "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
        "ModecomTablet": "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
        "VoninoTablet": "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
        "ECSTablet": "V07OT2|TM105A|S10OT1|TR10CS1",
        "StorexTablet": "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
        "VodafoneTablet": "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497|VFD 1400",
        "EssentielBTablet": "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
        "RossMoorTablet": "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
        "iMobileTablet": "i-mobile i-note",
        "TolinoTablet": "tolino tab [0-9.]+|tolino shine",
        "AudioSonicTablet": "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
        "AMPETablet": "Android.* A78 ",
        "SkkTablet": "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
        "TecnoTablet": "TECNO P9|TECNO DP8D",
        "JXDTablet": "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
        "iJoyTablet": "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
        "FX2Tablet": "FX2 PAD7|FX2 PAD10",
        "XoroTablet": "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
        "ViewsonicTablet": "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
        "VerizonTablet": "QTAQZ3|QTAIR7|QTAQTZ3|QTASUN1|QTASUN2|QTAXIA1",
        "OdysTablet": "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
        "CaptivaTablet": "CAPTIVA PAD",
        "IconbitTablet": "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
        "TeclastTablet": "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
        "OndaTablet": "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+|V10 \\b4G\\b",
        "JaytechTablet": "TPC-PA762",
        "BlaupunktTablet": "Endeavour 800NG|Endeavour 1010",
        "DigmaTablet": "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
        "EvolioTablet": "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
        "LavaTablet": "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
        "AocTablet": "MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",
        "MpmanTablet": "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
        "CelkonTablet": "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
        "WolderTablet": "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
        "MediacomTablet": "M-MPI10C3G|M-SP10EG|M-SP10EGP|M-SP10HXAH|M-SP7HXAH|M-SP10HXBH|M-SP8HXAH|M-SP8MXA",
        "MiTablet": "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
        "NibiruTablet": "Nibiru M1|Nibiru Jupiter One",
        "NexoTablet": "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
        "LeaderTablet": "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
        "UbislateTablet": "UbiSlate[\\s]?7C",
        "PocketBookTablet": "Pocketbook",
        "KocasoTablet": "\\b(TB-1207)\\b",
        "HisenseTablet": "\\b(F5281|E2371)\\b",
        "Hudl": "Hudl HT7S3|Hudl 2",
        "TelstraTablet": "T-Hub2",
        "GenericTablet": "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b|\\bQTAQZ3\\b|WVT101|TM1088|KT107"
    },
    "oss": {
        "AndroidOS": "Android",
        "BlackBerryOS": "blackberry|\\bBB10\\b|rim tablet os",
        "PalmOS": "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
        "SymbianOS": "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
        "WindowsMobileOS": "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Windows Mobile|Windows Phone [0-9.]+|WCE;",
        "WindowsPhoneOS": "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
        "iOS": "\\biPhone.*Mobile|\\biPod|\\biPad|AppleCoreMedia",
        "iPadOS": "CPU OS 13",
        "SailfishOS": "Sailfish",
        "MeeGoOS": "MeeGo",
        "MaemoOS": "Maemo",
        "JavaOS": "J2ME\/|\\bMIDP\\b|\\bCLDC\\b",
        "webOS": "webOS|hpwOS",
        "badaOS": "\\bBada\\b",
        "BREWOS": "BREW"
    },
    "uas": {
        "Chrome": "\\bCrMo\\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?",
        "Dolfin": "\\bDolfin\\b",
        "Opera": "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR\/[0-9.]+$|Coast\/[0-9.]+",
        "Skyfire": "Skyfire",
        "Edge": "\\bEdgiOS\\b|Mobile Safari\/[.0-9]* Edge",
        "IE": "IEMobile|MSIEMobile",
        "Firefox": "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS",
        "Bolt": "bolt",
        "TeaShark": "teashark",
        "Blazer": "Blazer",
        "Safari": "Version((?!\\bEdgiOS\\b).)*Mobile.*Safari|Safari.*Mobile|MobileSafari",
        "WeChat": "\\bMicroMessenger\\b",
        "UCBrowser": "UC.*Browser|UCWEB",
        "baiduboxapp": "baiduboxapp",
        "baidubrowser": "baidubrowser",
        "DiigoBrowser": "DiigoBrowser",
        "Mercury": "\\bMercury\\b",
        "ObigoBrowser": "Obigo",
        "NetFront": "NF-Browser",
        "GenericBrowser": "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
        "PaleMoon": "Android.*PaleMoon|Mobile.*PaleMoon"
    },
    "props": {
        "Mobile": "Mobile\/[VER]",
        "Build": "Build\/[VER]",
        "Version": "Version\/[VER]",
        "VendorID": "VendorID\/[VER]",
        "iPad": "iPad.*CPU[a-z ]+[VER]",
        "iPhone": "iPhone.*CPU[a-z ]+[VER]",
        "iPod": "iPod.*CPU[a-z ]+[VER]",
        "Kindle": "Kindle\/[VER]",
        "Chrome": [
            "Chrome\/[VER]",
            "CriOS\/[VER]",
            "CrMo\/[VER]"
        ],
        "Coast": [
            "Coast\/[VER]"
        ],
        "Dolfin": "Dolfin\/[VER]",
        "Firefox": [
            "Firefox\/[VER]",
            "FxiOS\/[VER]"
        ],
        "Fennec": "Fennec\/[VER]",
        "Edge": "Edge\/[VER]",
        "IE": [
            "IEMobile\/[VER];",
            "IEMobile [VER]",
            "MSIE [VER];",
            "Trident\/[0-9.]+;.*rv:[VER]"
        ],
        "NetFront": "NetFront\/[VER]",
        "NokiaBrowser": "NokiaBrowser\/[VER]",
        "Opera": [
            " OPR\/[VER]",
            "Opera Mini\/[VER]",
            "Version\/[VER]"
        ],
        "Opera Mini": "Opera Mini\/[VER]",
        "Opera Mobi": "Version\/[VER]",
        "UCBrowser": [
            "UCWEB[VER]",
            "UC.*Browser\/[VER]"
        ],
        "MQQBrowser": "MQQBrowser\/[VER]",
        "MicroMessenger": "MicroMessenger\/[VER]",
        "baiduboxapp": "baiduboxapp\/[VER]",
        "baidubrowser": "baidubrowser\/[VER]",
        "SamsungBrowser": "SamsungBrowser\/[VER]",
        "Iron": "Iron\/[VER]",
        "Safari": [
            "Version\/[VER]",
            "Safari\/[VER]"
        ],
        "Skyfire": "Skyfire\/[VER]",
        "Tizen": "Tizen\/[VER]",
        "Webkit": "webkit[ \/][VER]",
        "PaleMoon": "PaleMoon\/[VER]",
        "SailfishBrowser": "SailfishBrowser\/[VER]",
        "Gecko": "Gecko\/[VER]",
        "Trident": "Trident\/[VER]",
        "Presto": "Presto\/[VER]",
        "Goanna": "Goanna\/[VER]",
        "iOS": " \\bi?OS\\b [VER][ ;]{1}",
        "Android": "Android [VER]",
        "Sailfish": "Sailfish [VER]",
        "BlackBerry": [
            "BlackBerry[\\w]+\/[VER]",
            "BlackBerry.*Version\/[VER]",
            "Version\/[VER]"
        ],
        "BREW": "BREW [VER]",
        "Java": "Java\/[VER]",
        "Windows Phone OS": [
            "Windows Phone OS [VER]",
            "Windows Phone [VER]"
        ],
        "Windows Phone": "Windows Phone [VER]",
        "Windows CE": "Windows CE\/[VER]",
        "Windows NT": "Windows NT [VER]",
        "Symbian": [
            "SymbianOS\/[VER]",
            "Symbian\/[VER]"
        ],
        "webOS": [
            "webOS\/[VER]",
            "hpwOS\/[VER];"
        ]
    },
    "utils": {
        "Bot": "Googlebot|facebookexternalhit|Google-AMPHTML|s~amp-validator|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom|contentkingapp|AspiegelBot",
        "MobileBot": "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker\/M1A1-R2D2",
        "DesktopMode": "WPDesktop",
        "TV": "SonyDTV|HbbTV",
        "WebKit": "(webkit)[ \/]([\\w.]+)",
        "Console": "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|Nintendo Switch|PLAYSTATION|Xbox)\\b",
        "Watch": "SM-V700"
    }
};

    // following patterns come from http://detectmobilebrowsers.com/
    impl.detectMobileBrowsers = {
        fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        tabletPattern: /android|ipad|playbook|silk/i
    };

    var hasOwnProp = Object.prototype.hasOwnProperty,
        isArray;

    impl.FALLBACK_PHONE = 'UnknownPhone';
    impl.FALLBACK_TABLET = 'UnknownTablet';
    impl.FALLBACK_MOBILE = 'UnknownMobile';

    isArray = ('isArray' in Array) ?
        Array.isArray : function (value) { return Object.prototype.toString.call(value) === '[object Array]'; };

    function equalIC(a, b) {
        return a != null && b != null && a.toLowerCase() === b.toLowerCase();
    }

    function containsIC(array, value) {
        var valueLC, i, len = array.length;
        if (!len || !value) {
            return false;
        }
        valueLC = value.toLowerCase();
        for (i = 0; i < len; ++i) {
            if (valueLC === array[i].toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    function convertPropsToRegExp(object) {
        for (var key in object) {
            if (hasOwnProp.call(object, key)) {
                object[key] = new RegExp(object[key], 'i');
            }
        }
    }

    function prepareUserAgent(userAgent) {
        return (userAgent || '').substr(0, 500); // mitigate vulnerable to ReDoS
    }

    (function init() {
        var key, values, value, i, len, verPos, mobileDetectRules = impl.mobileDetectRules;
        for (key in mobileDetectRules.props) {
            if (hasOwnProp.call(mobileDetectRules.props, key)) {
                values = mobileDetectRules.props[key];
                if (!isArray(values)) {
                    values = [values];
                }
                len = values.length;
                for (i = 0; i < len; ++i) {
                    value = values[i];
                    verPos = value.indexOf('[VER]');
                    if (verPos >= 0) {
                        value = value.substring(0, verPos) + '([\\w._\\+]+)' + value.substring(verPos + 5);
                    }
                    values[i] = new RegExp(value, 'i');
                }
                mobileDetectRules.props[key] = values;
            }
        }
        convertPropsToRegExp(mobileDetectRules.oss);
        convertPropsToRegExp(mobileDetectRules.phones);
        convertPropsToRegExp(mobileDetectRules.tablets);
        convertPropsToRegExp(mobileDetectRules.uas);
        convertPropsToRegExp(mobileDetectRules.utils);

        // copy some patterns to oss0 which are tested first (see issue#15)
        mobileDetectRules.oss0 = {
            WindowsPhoneOS: mobileDetectRules.oss.WindowsPhoneOS,
            WindowsMobileOS: mobileDetectRules.oss.WindowsMobileOS
        };
    }());

    /**
     * Test userAgent string against a set of rules and find the first matched key.
     * @param {Object} rules (key is String, value is RegExp)
     * @param {String} userAgent the navigator.userAgent (or HTTP-Header 'User-Agent').
     * @returns {String|null} the matched key if found, otherwise <tt>null</tt>
     * @private
     */
    impl.findMatch = function(rules, userAgent) {
        for (var key in rules) {
            if (hasOwnProp.call(rules, key)) {
                if (rules[key].test(userAgent)) {
                    return key;
                }
            }
        }
        return null;
    };

    /**
     * Test userAgent string against a set of rules and return an array of matched keys.
     * @param {Object} rules (key is String, value is RegExp)
     * @param {String} userAgent the navigator.userAgent (or HTTP-Header 'User-Agent').
     * @returns {Array} an array of matched keys, may be empty when there is no match, but not <tt>null</tt>
     * @private
     */
    impl.findMatches = function(rules, userAgent) {
        var result = [];
        for (var key in rules) {
            if (hasOwnProp.call(rules, key)) {
                if (rules[key].test(userAgent)) {
                    result.push(key);
                }
            }
        }
        return result;
    };

    /**
     * Check the version of the given property in the User-Agent.
     *
     * @param {String} propertyName
     * @param {String} userAgent
     * @return {String} version or <tt>null</tt> if version not found
     * @private
     */
    impl.getVersionStr = function (propertyName, userAgent) {
        var props = impl.mobileDetectRules.props, patterns, i, len, match;
        if (hasOwnProp.call(props, propertyName)) {
            patterns = props[propertyName];
            len = patterns.length;
            for (i = 0; i < len; ++i) {
                match = patterns[i].exec(userAgent);
                if (match !== null) {
                    return match[1];
                }
            }
        }
        return null;
    };

    /**
     * Check the version of the given property in the User-Agent.
     * Will return a float number. (eg. 2_0 will return 2.0, 4.3.1 will return 4.31)
     *
     * @param {String} propertyName
     * @param {String} userAgent
     * @return {Number} version or <tt>NaN</tt> if version not found
     * @private
     */
    impl.getVersion = function (propertyName, userAgent) {
        var version = impl.getVersionStr(propertyName, userAgent);
        return version ? impl.prepareVersionNo(version) : NaN;
    };

    /**
     * Prepare the version number.
     *
     * @param {String} version
     * @return {Number} the version number as a floating number
     * @private
     */
    impl.prepareVersionNo = function (version) {
        var numbers;

        numbers = version.split(/[a-z._ \/\-]/i);
        if (numbers.length === 1) {
            version = numbers[0];
        }
        if (numbers.length > 1) {
            version = numbers[0] + '.';
            numbers.shift();
            version += numbers.join('');
        }
        return Number(version);
    };

    impl.isMobileFallback = function (userAgent) {
        return impl.detectMobileBrowsers.fullPattern.test(userAgent) ||
            impl.detectMobileBrowsers.shortPattern.test(userAgent.substr(0,4));
    };

    impl.isTabletFallback = function (userAgent) {
        return impl.detectMobileBrowsers.tabletPattern.test(userAgent);
    };

    impl.prepareDetectionCache = function (cache, userAgent, maxPhoneWidth) {
        if (cache.mobile !== undefined) {
            return;
        }
        var phone, tablet, phoneSized;

        // first check for stronger tablet rules, then phone (see issue#5)
        tablet = impl.findMatch(impl.mobileDetectRules.tablets, userAgent);
        if (tablet) {
            cache.mobile = cache.tablet = tablet;
            cache.phone = null;
            return; // unambiguously identified as tablet
        }

        phone = impl.findMatch(impl.mobileDetectRules.phones, userAgent);
        if (phone) {
            cache.mobile = cache.phone = phone;
            cache.tablet = null;
            return; // unambiguously identified as phone
        }

        // our rules haven't found a match -> try more general fallback rules
        if (impl.isMobileFallback(userAgent)) {
            phoneSized = MobileDetect.isPhoneSized(maxPhoneWidth);
            if (phoneSized === undefined) {
                cache.mobile = impl.FALLBACK_MOBILE;
                cache.tablet = cache.phone = null;
            } else if (phoneSized) {
                cache.mobile = cache.phone = impl.FALLBACK_PHONE;
                cache.tablet = null;
            } else {
                cache.mobile = cache.tablet = impl.FALLBACK_TABLET;
                cache.phone = null;
            }
        } else if (impl.isTabletFallback(userAgent)) {
            cache.mobile = cache.tablet = impl.FALLBACK_TABLET;
            cache.phone = null;
        } else {
            // not mobile at all!
            cache.mobile = cache.tablet = cache.phone = null;
        }
    };

    // t is a reference to a MobileDetect instance
    impl.mobileGrade = function (t) {
        // impl note:
        // To keep in sync w/ Mobile_Detect.php easily, the following code is tightly aligned to the PHP version.
        // When changes are made in Mobile_Detect.php, copy this method and replace:
        //     $this-> / t.
        //     self::MOBILE_GRADE_(.) / '$1'
        //     , self::VERSION_TYPE_FLOAT / (nothing)
        //     isIOS() / os('iOS')
        //     [reg] / (nothing)   <-- jsdelivr complaining about unescaped unicode character U+00AE
        var $isMobile = t.mobile() !== null;

        if (
            // Apple iOS 3.2-5.1 - Tested on the original iPad (4.3 / 5.0), iPad 2 (4.3), iPad 3 (5.1), original iPhone (3.1), iPhone 3 (3.2), 3GS (4.3), 4 (4.3 / 5.0), and 4S (5.1)
            t.os('iOS') && t.version('iPad')>=4.3 ||
            t.os('iOS') && t.version('iPhone')>=3.1 ||
            t.os('iOS') && t.version('iPod')>=3.1 ||

            // Android 2.1-2.3 - Tested on the HTC Incredible (2.2), original Droid (2.2), HTC Aria (2.1), Google Nexus S (2.3). Functional on 1.5 & 1.6 but performance may be sluggish, tested on Google G1 (1.5)
            // Android 3.1 (Honeycomb)  - Tested on the Samsung Galaxy Tab 10.1 and Motorola XOOM
            // Android 4.0 (ICS)  - Tested on a Galaxy Nexus. Note: transition performance can be poor on upgraded devices
            // Android 4.1 (Jelly Bean)  - Tested on a Galaxy Nexus and Galaxy 7
            ( t.version('Android')>2.1 && t.is('Webkit') ) ||

            // Windows Phone 7-7.5 - Tested on the HTC Surround (7.0) HTC Trophy (7.5), LG-E900 (7.5), Nokia Lumia 800
            t.version('Windows Phone OS')>=7.0 ||

            // Blackberry 7 - Tested on BlackBerry Torch 9810
            // Blackberry 6.0 - Tested on the Torch 9800 and Style 9670
            t.is('BlackBerry') && t.version('BlackBerry')>=6.0 ||
            // Blackberry Playbook (1.0-2.0) - Tested on PlayBook
            t.match('Playbook.*Tablet') ||

            // Palm WebOS (1.4-2.0) - Tested on the Palm Pixi (1.4), Pre (1.4), Pre 2 (2.0)
            ( t.version('webOS')>=1.4 && t.match('Palm|Pre|Pixi') ) ||
            // Palm WebOS 3.0  - Tested on HP TouchPad
            t.match('hp.*TouchPad') ||

            // Firefox Mobile (12 Beta) - Tested on Android 2.3 device
            ( t.is('Firefox') && t.version('Firefox')>=12 ) ||

            // Chrome for Android - Tested on Android 4.0, 4.1 device
            ( t.is('Chrome') && t.is('AndroidOS') && t.version('Android')>=4.0 ) ||

            // Skyfire 4.1 - Tested on Android 2.3 device
            ( t.is('Skyfire') && t.version('Skyfire')>=4.1 && t.is('AndroidOS') && t.version('Android')>=2.3 ) ||

            // Opera Mobile 11.5-12: Tested on Android 2.3
            ( t.is('Opera') && t.version('Opera Mobi')>11 && t.is('AndroidOS') ) ||

            // Meego 1.2 - Tested on Nokia 950 and N9
            t.is('MeeGoOS') ||

            // Tizen (pre-release) - Tested on early hardware
            t.is('Tizen') ||

            // Samsung Bada 2.0 - Tested on a Samsung Wave 3, Dolphin browser
            // @todo: more tests here!
            t.is('Dolfin') && t.version('Bada')>=2.0 ||

            // UC Browser - Tested on Android 2.3 device
            ( (t.is('UC Browser') || t.is('Dolfin')) && t.version('Android')>=2.3 ) ||

            // Kindle 3 and Fire  - Tested on the built-in WebKit browser for each
            ( t.match('Kindle Fire') ||
                t.is('Kindle') && t.version('Kindle')>=3.0 ) ||

            // Nook Color 1.4.1 - Tested on original Nook Color, not Nook Tablet
            t.is('AndroidOS') && t.is('NookTablet') ||

            // Chrome Desktop 11-21 - Tested on OS X 10.7 and Windows 7
            t.version('Chrome')>=11 && !$isMobile ||

            // Safari Desktop 4-5 - Tested on OS X 10.7 and Windows 7
            t.version('Safari')>=5.0 && !$isMobile ||

            // Firefox Desktop 4-13 - Tested on OS X 10.7 and Windows 7
            t.version('Firefox')>=4.0 && !$isMobile ||

            // Internet Explorer 7-9 - Tested on Windows XP, Vista and 7
            t.version('MSIE')>=7.0 && !$isMobile ||

            // Opera Desktop 10-12 - Tested on OS X 10.7 and Windows 7
            // @reference: http://my.opera.com/community/openweb/idopera/
            t.version('Opera')>=10 && !$isMobile

            ){
            return 'A';
        }

        if (
            t.os('iOS') && t.version('iPad')<4.3 ||
            t.os('iOS') && t.version('iPhone')<3.1 ||
            t.os('iOS') && t.version('iPod')<3.1 ||

            // Blackberry 5.0: Tested on the Storm 2 9550, Bold 9770
            t.is('Blackberry') && t.version('BlackBerry')>=5 && t.version('BlackBerry')<6 ||

            //Opera Mini (5.0-6.5) - Tested on iOS 3.2/4.3 and Android 2.3
            ( t.version('Opera Mini')>=5.0 && t.version('Opera Mini')<=6.5 &&
                (t.version('Android')>=2.3 || t.is('iOS')) ) ||

            // Nokia Symbian^3 - Tested on Nokia N8 (Symbian^3), C7 (Symbian^3), also works on N97 (Symbian^1)
            t.match('NokiaN8|NokiaC7|N97.*Series60|Symbian/3') ||

            // @todo: report this (tested on Nokia N71)
            t.version('Opera Mobi')>=11 && t.is('SymbianOS')
            ){
            return 'B';
        }

        if (
        // Blackberry 4.x - Tested on the Curve 8330
            t.version('BlackBerry')<5.0 ||
            // Windows Mobile - Tested on the HTC Leo (WinMo 5.2)
            t.match('MSIEMobile|Windows CE.*Mobile') || t.version('Windows Mobile')<=5.2

            ){
            return 'C';
        }

        //All older smartphone platforms and featurephones - Any device that doesn't support media queries
        //will receive the basic, C grade experience.
        return 'C';
    };

    impl.detectOS = function (ua) {
        return impl.findMatch(impl.mobileDetectRules.oss0, ua) ||
            impl.findMatch(impl.mobileDetectRules.oss, ua);
    };

    impl.getDeviceSmallerSide = function () {
        return window.screen.width < window.screen.height ?
            window.screen.width :
            window.screen.height;
    };

    /**
     * Constructor for MobileDetect object.
     * <br>
     * Such an object will keep a reference to the given user-agent string and cache most of the detect queries.<br>
     * <div style="background-color: #d9edf7; border: 1px solid #bce8f1; color: #3a87ad; padding: 14px; border-radius: 2px; margin-top: 20px">
     *     <strong>Find information how to download and install:</strong>
     *     <a href="https://github.com/hgoebl/mobile-detect.js/">github.com/hgoebl/mobile-detect.js/</a>
     * </div>
     *
     * @example <pre>
     *     var md = new MobileDetect(window.navigator.userAgent);
     *     if (md.mobile()) {
     *         location.href = (md.mobileGrade() === 'A') ? '/mobile/' : '/lynx/';
     *     }
     * </pre>
     *
     * @param {string} userAgent typically taken from window.navigator.userAgent or http_header['User-Agent']
     * @param {number} [maxPhoneWidth=600] <strong>only for browsers</strong> specify a value for the maximum
     *        width of smallest device side (in logical "CSS" pixels) until a device detected as mobile will be handled
     *        as phone.
     *        This is only used in cases where the device cannot be classified as phone or tablet.<br>
     *        See <a href="http://developer.android.com/guide/practices/screens_support.html">Declaring Tablet Layouts
     *        for Android</a>.<br>
     *        If you provide a value < 0, then this "fuzzy" check is disabled.
     * @constructor
     * @global
     */
    function MobileDetect(userAgent, maxPhoneWidth) {
        this.ua = prepareUserAgent(userAgent);
        this._cache = {};
        //600dp is typical 7" tablet minimum width
        this.maxPhoneWidth = maxPhoneWidth || 600;
    }

    MobileDetect.prototype = {
        constructor: MobileDetect,

        /**
         * Returns the detected phone or tablet type or <tt>null</tt> if it is not a mobile device.
         * <br>
         * For a list of possible return values see {@link MobileDetect#phone} and {@link MobileDetect#tablet}.<br>
         * <br>
         * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
         * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
         * is positive, a value of <code>UnknownPhone</code>, <code>UnknownTablet</code> or
         * <code>UnknownMobile</code> is returned.<br>
         * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
         * <br>
         * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
         * and <code>UnknownMobile</code>, so you will get <code>UnknownMobile</code> here.<br>
         * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
         * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
         * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
         * <br>
         * In most cases you will use the return value just as a boolean.
         *
         * @returns {String} the key for the phone family or tablet family, e.g. "Nexus".
         * @function MobileDetect#mobile
         */
        mobile: function () {
            impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
            return this._cache.mobile;
        },

        /**
         * Returns the detected phone type/family string or <tt>null</tt>.
         * <br>
         * The returned tablet (family or producer) is one of following keys:<br>
         * <br><tt>iPhone, BlackBerry, Pixel, HTC, Nexus, Dell, Motorola, Samsung, LG, Sony, Asus,
         * Xiaomi, NokiaLumia, Micromax, Palm, Vertu, Pantech, Fly, Wiko, iMobile,
         * SimValley, Wolfgang, Alcatel, Nintendo, Amoi, INQ, OnePlus, GenericPhone</tt><br>
         * <br>
         * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
         * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
         * is positive, a value of <code>UnknownPhone</code> or <code>UnknownMobile</code> is returned.<br>
         * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
         * <br>
         * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
         * and <code>UnknownMobile</code>, so you will get <code>null</code> here, while {@link MobileDetect#mobile}
         * will return <code>UnknownMobile</code>.<br>
         * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
         * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
         * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
         * <br>
         * In most cases you will use the return value just as a boolean.
         *
         * @returns {String} the key of the phone family or producer, e.g. "iPhone"
         * @function MobileDetect#phone
         */
        phone: function () {
            impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
            return this._cache.phone;
        },

        /**
         * Returns the detected tablet type/family string or <tt>null</tt>.
         * <br>
         * The returned tablet (family or producer) is one of following keys:<br>
         * <br><tt>iPad, NexusTablet, GoogleTablet, SamsungTablet, Kindle, SurfaceTablet,
         * HPTablet, AsusTablet, BlackBerryTablet, HTCtablet, MotorolaTablet, NookTablet,
         * AcerTablet, ToshibaTablet, LGTablet, FujitsuTablet, PrestigioTablet,
         * LenovoTablet, DellTablet, YarvikTablet, MedionTablet, ArnovaTablet,
         * IntensoTablet, IRUTablet, MegafonTablet, EbodaTablet, AllViewTablet,
         * ArchosTablet, AinolTablet, NokiaLumiaTablet, SonyTablet, PhilipsTablet,
         * CubeTablet, CobyTablet, MIDTablet, MSITablet, SMiTTablet, RockChipTablet,
         * FlyTablet, bqTablet, HuaweiTablet, NecTablet, PantechTablet, BronchoTablet,
         * VersusTablet, ZyncTablet, PositivoTablet, NabiTablet, KoboTablet, DanewTablet,
         * TexetTablet, PlaystationTablet, TrekstorTablet, PyleAudioTablet, AdvanTablet,
         * DanyTechTablet, GalapadTablet, MicromaxTablet, KarbonnTablet, AllFineTablet,
         * PROSCANTablet, YONESTablet, ChangJiaTablet, GUTablet, PointOfViewTablet,
         * OvermaxTablet, HCLTablet, DPSTablet, VistureTablet, CrestaTablet,
         * MediatekTablet, ConcordeTablet, GoCleverTablet, ModecomTablet, VoninoTablet,
         * ECSTablet, StorexTablet, VodafoneTablet, EssentielBTablet, RossMoorTablet,
         * iMobileTablet, TolinoTablet, AudioSonicTablet, AMPETablet, SkkTablet,
         * TecnoTablet, JXDTablet, iJoyTablet, FX2Tablet, XoroTablet, ViewsonicTablet,
         * VerizonTablet, OdysTablet, CaptivaTablet, IconbitTablet, TeclastTablet,
         * OndaTablet, JaytechTablet, BlaupunktTablet, DigmaTablet, EvolioTablet,
         * LavaTablet, AocTablet, MpmanTablet, CelkonTablet, WolderTablet, MediacomTablet,
         * MiTablet, NibiruTablet, NexoTablet, LeaderTablet, UbislateTablet,
         * PocketBookTablet, KocasoTablet, HisenseTablet, Hudl, TelstraTablet,
         * GenericTablet</tt><br>
         * <br>
         * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
         * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
         * is positive, a value of <code>UnknownTablet</code> or <code>UnknownMobile</code> is returned.<br>
         * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
         * <br>
         * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
         * and <code>UnknownMobile</code>, so you will get <code>null</code> here, while {@link MobileDetect#mobile}
         * will return <code>UnknownMobile</code>.<br>
         * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
         * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
         * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
         * <br>
         * In most cases you will use the return value just as a boolean.
         *
         * @returns {String} the key of the tablet family or producer, e.g. "SamsungTablet"
         * @function MobileDetect#tablet
         */
        tablet: function () {
            impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
            return this._cache.tablet;
        },

        /**
         * Returns the (first) detected user-agent string or <tt>null</tt>.
         * <br>
         * The returned user-agent is one of following keys:<br>
         * <br><tt>Chrome, Dolfin, Opera, Skyfire, Edge, IE, Firefox, Bolt, TeaShark, Blazer,
         * Safari, WeChat, UCBrowser, baiduboxapp, baidubrowser, DiigoBrowser, Mercury,
         * ObigoBrowser, NetFront, GenericBrowser, PaleMoon</tt><br>
         * <br>
         * In most cases calling {@link MobileDetect#userAgent} will be sufficient. But there are rare
         * cases where a mobile device pretends to be more than one particular browser. You can get the
         * list of all matches with {@link MobileDetect#userAgents} or check for a particular value by
         * providing one of the defined keys as first argument to {@link MobileDetect#is}.
         *
         * @returns {String} the key for the detected user-agent or <tt>null</tt>
         * @function MobileDetect#userAgent
         */
        userAgent: function () {
            if (this._cache.userAgent === undefined) {
                this._cache.userAgent = impl.findMatch(impl.mobileDetectRules.uas, this.ua);
            }
            return this._cache.userAgent;
        },

        /**
         * Returns all detected user-agent strings.
         * <br>
         * The array is empty or contains one or more of following keys:<br>
         * <br><tt>Chrome, Dolfin, Opera, Skyfire, Edge, IE, Firefox, Bolt, TeaShark, Blazer,
         * Safari, WeChat, UCBrowser, baiduboxapp, baidubrowser, DiigoBrowser, Mercury,
         * ObigoBrowser, NetFront, GenericBrowser, PaleMoon</tt><br>
         * <br>
         * In most cases calling {@link MobileDetect#userAgent} will be sufficient. But there are rare
         * cases where a mobile device pretends to be more than one particular browser. You can get the
         * list of all matches with {@link MobileDetect#userAgents} or check for a particular value by
         * providing one of the defined keys as first argument to {@link MobileDetect#is}.
         *
         * @returns {Array} the array of detected user-agent keys or <tt>[]</tt>
         * @function MobileDetect#userAgents
         */
        userAgents: function () {
            if (this._cache.userAgents === undefined) {
                this._cache.userAgents = impl.findMatches(impl.mobileDetectRules.uas, this.ua);
            }
            return this._cache.userAgents;
        },

        /**
         * Returns the detected operating system string or <tt>null</tt>.
         * <br>
         * The operating system is one of following keys:<br>
         * <br><tt>AndroidOS, BlackBerryOS, PalmOS, SymbianOS, WindowsMobileOS, WindowsPhoneOS,
         * iOS, iPadOS, SailfishOS, MeeGoOS, MaemoOS, JavaOS, webOS, badaOS, BREWOS</tt><br>
         *
         * @returns {String} the key for the detected operating system.
         * @function MobileDetect#os
         */
        os: function () {
            if (this._cache.os === undefined) {
                this._cache.os = impl.detectOS(this.ua);
            }
            return this._cache.os;
        },

        /**
         * Get the version (as Number) of the given property in the User-Agent.
         * <br>
         * Will return a float number. (eg. 2_0 will return 2.0, 4.3.1 will return 4.31)
         *
         * @param {String} key a key defining a thing which has a version.<br>
         *        You can use one of following keys:<br>
         * <br><tt>Mobile, Build, Version, VendorID, iPad, iPhone, iPod, Kindle, Chrome, Coast,
         * Dolfin, Firefox, Fennec, Edge, IE, NetFront, NokiaBrowser, Opera, Opera Mini,
         * Opera Mobi, UCBrowser, MQQBrowser, MicroMessenger, baiduboxapp, baidubrowser,
         * SamsungBrowser, Iron, Safari, Skyfire, Tizen, Webkit, PaleMoon,
         * SailfishBrowser, Gecko, Trident, Presto, Goanna, iOS, Android, Sailfish,
         * BlackBerry, BREW, Java, Windows Phone OS, Windows Phone, Windows CE, Windows
         * NT, Symbian, webOS</tt><br>
         *
         * @returns {Number} the version as float or <tt>NaN</tt> if User-Agent doesn't contain this version.
         *          Be careful when comparing this value with '==' operator!
         * @function MobileDetect#version
         */
        version: function (key) {
            return impl.getVersion(key, this.ua);
        },

        /**
         * Get the version (as String) of the given property in the User-Agent.
         * <br>
         *
         * @param {String} key a key defining a thing which has a version.<br>
         *        You can use one of following keys:<br>
         * <br><tt>Mobile, Build, Version, VendorID, iPad, iPhone, iPod, Kindle, Chrome, Coast,
         * Dolfin, Firefox, Fennec, Edge, IE, NetFront, NokiaBrowser, Opera, Opera Mini,
         * Opera Mobi, UCBrowser, MQQBrowser, MicroMessenger, baiduboxapp, baidubrowser,
         * SamsungBrowser, Iron, Safari, Skyfire, Tizen, Webkit, PaleMoon,
         * SailfishBrowser, Gecko, Trident, Presto, Goanna, iOS, Android, Sailfish,
         * BlackBerry, BREW, Java, Windows Phone OS, Windows Phone, Windows CE, Windows
         * NT, Symbian, webOS</tt><br>
         *
         * @returns {String} the "raw" version as String or <tt>null</tt> if User-Agent doesn't contain this version.
         *
         * @function MobileDetect#versionStr
         */
        versionStr: function (key) {
            return impl.getVersionStr(key, this.ua);
        },

        /**
         * Global test key against userAgent, os, phone, tablet and some other properties of userAgent string.
         *
         * @param {String} key the key (case-insensitive) of a userAgent, an operating system, phone or
         *        tablet family.<br>
         *        For a complete list of possible values, see {@link MobileDetect#userAgent},
         *        {@link MobileDetect#os}, {@link MobileDetect#phone}, {@link MobileDetect#tablet}.<br>
         *        Additionally you have following keys:<br>
         * <br><tt>Bot, MobileBot, DesktopMode, TV, WebKit, Console, Watch</tt><br>
         *
         * @returns {boolean} <tt>true</tt> when the given key is one of the defined keys of userAgent, os, phone,
         *                    tablet or one of the listed additional keys, otherwise <tt>false</tt>
         * @function MobileDetect#is
         */
        is: function (key) {
            return containsIC(this.userAgents(), key) ||
                   equalIC(key, this.os()) ||
                   equalIC(key, this.phone()) ||
                   equalIC(key, this.tablet()) ||
                   containsIC(impl.findMatches(impl.mobileDetectRules.utils, this.ua), key);
        },

        /**
         * Do a quick test against navigator::userAgent.
         *
         * @param {String|RegExp} pattern the pattern, either as String or RegExp
         *                        (a string will be converted to a case-insensitive RegExp).
         * @returns {boolean} <tt>true</tt> when the pattern matches, otherwise <tt>false</tt>
         * @function MobileDetect#match
         */
        match: function (pattern) {
            if (!(pattern instanceof RegExp)) {
                pattern = new RegExp(pattern, 'i');
            }
            return pattern.test(this.ua);
        },

        /**
         * Checks whether the mobile device can be considered as phone regarding <code>screen.width</code>.
         * <br>
         * Obviously this method makes sense in browser environments only (not for Node.js)!
         * @param {number} [maxPhoneWidth] the maximum logical pixels (aka. CSS-pixels) to be considered as phone.<br>
         *        The argument is optional and if not present or falsy, the value of the constructor is taken.
         * @returns {boolean|undefined} <code>undefined</code> if screen size wasn't detectable, else <code>true</code>
         *          when screen.width is less or equal to maxPhoneWidth, otherwise <code>false</code>.<br>
         *          Will always return <code>undefined</code> server-side.
         */
        isPhoneSized: function (maxPhoneWidth) {
            return MobileDetect.isPhoneSized(maxPhoneWidth || this.maxPhoneWidth);
        },

        /**
         * Returns the mobile grade ('A', 'B', 'C').
         *
         * @returns {String} one of the mobile grades ('A', 'B', 'C').
         * @function MobileDetect#mobileGrade
         */
        mobileGrade: function () {
            if (this._cache.grade === undefined) {
                this._cache.grade = impl.mobileGrade(this);
            }
            return this._cache.grade;
        }
    };

    // environment-dependent
    if (typeof window !== 'undefined' && window.screen) {
        MobileDetect.isPhoneSized = function (maxPhoneWidth) {
            return maxPhoneWidth < 0 ? undefined : impl.getDeviceSmallerSide() <= maxPhoneWidth;
        };
    } else {
        MobileDetect.isPhoneSized = function () {};
    }

    // should not be replaced by a completely new object - just overwrite existing methods
    MobileDetect._impl = impl;
    
    MobileDetect.version = '1.4.5 2021-03-13';

    return MobileDetect;
}); // end of call of define()
})((function (undefined) {
    if (typeof module !== 'undefined' && module.exports) {
        return function (factory) { module.exports = factory(); };
    } else if (true) {
        return __webpack_require__(928);
    } else if (typeof window !== 'undefined') {
        return function (factory) { window.MobileDetect = factory(); };
    } else {
        // please file a bug if you get this error!
        throw new Error('unknown environment');
    }
})());

/***/ }),

/***/ 927:
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

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CouponFromAds = function (_Component) {
    (0, _inherits3.default)(CouponFromAds, _Component);

    function CouponFromAds(props) {
        (0, _classCallCheck3.default)(this, CouponFromAds);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CouponFromAds.__proto__ || Object.getPrototypeOf(CouponFromAds)).call(this, props));

        _this.state = {};

        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        _this.setEqualHeight = _this.setEqualHeight.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(CouponFromAds, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setEqualHeight();
            document.addEventListener("keyup", this.handleKeyPress, { passive: true });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener("keyup", this.handleKeyPress);
        }
    }, {
        key: 'setEqualHeight',
        value: function setEqualHeight() {
            setTimeout(function () {
                $('.horizontal.first').height() > $('.horizontal.last').height() ? $('.horizontal.last').height($('.horizontal.first').height()) : $('.horizontal.first').height($('.horizontal.last').height());
            }, 10);
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(e) {
            if (e.key === "Escape") {
                this.props.toggleLightbox();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'coupon-light-box light-box' },
                _react2.default.createElement(
                    'div',
                    { className: 'light-box-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'top text-right' },
                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/simple-close-logForm.svg',
                                onClick: this.props.toggleLightbox,
                                alt: '' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'body' },
                            _react2.default.createElement(
                                'p',
                                { style: { width: '100%', textAlign: '-webkit-center' } },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'Oval-2' },
                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/cut.svg', className: 'cut' })
                                )
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'title' },
                                'The coupon is added'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'description' },
                                'Dein pers\xF6nlicher Rabattcode ',
                                _react2.default.createElement('span', { style: { color: 'black', fontWeight: 'bold' }, id: 'coupon_text' }),
                                ' wurde hinzugef\xFCgt und wir beim Checkout verrechnet.'
                            ),
                            _react2.default.createElement(
                                'p',
                                { style: { width: '100%', textAlign: '-webkit-center' } },
                                _react2.default.createElement(
                                    'button',
                                    { 'class': 'btn', onClick: this.props.toggleLightbox, style: { width: '60%' } },
                                    'ok'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return CouponFromAds;
}(_react.Component);

CouponFromAds.propTypes = {};
CouponFromAds.defaultProps = {};

exports.default = CouponFromAds;

/***/ }),

/***/ 928:
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ 930:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuMobile = undefined;

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

var _reactRedux = __webpack_require__(313);

var _reactRouter = __webpack_require__(206);

var _reactSelect = __webpack_require__(902);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _redux = __webpack_require__(148);

var _places = __webpack_require__(909);

var placesActions = _interopRequireWildcard(_places);

var _shop = __webpack_require__(873);

var shopActions = _interopRequireWildcard(_shop);

var _user = __webpack_require__(217);

var userActions = _interopRequireWildcard(_user);

var _mobileDetect = __webpack_require__(926);

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

__webpack_require__(323);

var _i18next = __webpack_require__(209);

var _i18next2 = _interopRequireDefault(_i18next);

var _reactI18next = __webpack_require__(315);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuMobile = exports.MenuMobile = function (_Component) {
  (0, _inherits3.default)(MenuMobile, _Component);

  function MenuMobile(props) {
    (0, _classCallCheck3.default)(this, MenuMobile);

    var lang = window.localStorage.getItem('lang');
    if (typeof lang == 'undefined' || !lang || lang == '') lang = 'de';

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuMobile.__proto__ || Object.getPrototypeOf(MenuMobile)).call(this, props));

    _this.state = {
      isToggle: false,
      lang: lang
    };
    _this.mapSubmodels = _this.mapSubmodels.bind(_this);
    _this.logOut = _this.logOut.bind(_this);
    _this.initFb = _this.initFb.bind(_this);
    _this.initGoogle = _this.initGoogle.bind(_this);
    _this.hideMenu = _this.hideMenu.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MenuMobile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (window.isFBConnection) {
        this.initFb();
      }
      if (window.isGoogleConnection) {
        this.initGoogle();
      }
      if (!window.isMobile) this.props.shopActions.loadDevices('/api/devices');
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      $('.menuMobile').css({ top: 0, transform: 'translateY(-100%)' });
      $('.hamburger').toggleClass('open');
    }
  }, {
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      var isToggle = this.state.isToggle;
      this.setState({ isToggle: !isToggle });
    }
  }, {
    key: 'showLangMenu',
    value: function showLangMenu() {
      if (this.props.showLangMenu) {
        this.props.showLangMenu();
      }
    }
  }, {
    key: 'mapSubmodels',
    value: function mapSubmodels(device, i) {
      var deviceCategories = [device.name.replace(/ /g, '-').toLowerCase()];

      if (device.submodels) mapSubmodels(device.submodels);
      var strUrl = deviceCategories.join('/') + '/filter';

      function mapSubmodels(submodels) {
        deviceCategories.push(submodels[0].name.replace(/ /g, '-').toLowerCase());
        if (submodels[0].submodels) mapSubmodels(submodels[0].submodels);
      }
    }
  }, {
    key: 'initFb',
    value: function initFb() {
      window.fbAsyncInit = function () {
        FB.init({
          appId: window.oauthIds.facebookId,
          xfbml: true,
          version: 'v2.9'
        });
      };
      (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
  }, {
    key: 'initGoogle',
    value: function initGoogle() {
      window.gapiAuth2 = null;
      if (typeof gapi !== 'undefined') {
        gapi.load('auth2', function () {
          gapi.auth2.init({
            client_id: window.oauthIds.googleId
          }).then(function (data) {
            window.gapiAuth2 = data;
          });
        });
      }
    }
  }, {
    key: 'logOut',
    value: function logOut() {
      if (FB.getAccessToken() != null) {
        FB.logout(function (response) {
          FB.Auth.setAuthResponse(null, 'unknown');
        });
      }
      if (window.gapiAuth2) window.gapiAuth2.disconnect();
      window.localStorage.removeItem("token");
      this.props.userActions.logOut();
    }

    // handleChangePlace = (selectedOption) => {
    //   this.setState({ selectedOption });
    //   const { data } = JSON.parse(window.localStorage.getItem("locationData"))
    //   data.forEach((item) => {
    //     if (item.id === selectedOption.id) {
    //       item.active = true
    //     }
    //     else {
    //       item.active = false
    //     }
    //   })
    //   const { setLocation } = this.props.placesActions
    //   setLocation(selectedOption);
    //   window.localStorage.setItem("locationData", JSON.stringify({ data }))
    //   this.hideMenu();
    // }

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          selectedOption = _state.selectedOption,
          lang = _state.lang,
          isToggle = _state.isToggle,
          domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1];

      var data = JSON.parse(window.localStorage.getItem("locationData"));
      var md = new _mobileDetect2.default(window.navigator.userAgent);
      var active = {};
      if (data) {
        active.place = data.data.find(function (item) {
          return item.active === true;
        });
        if (active.place == null) {
          active.place = data.data[0];
        }
      }
      var t = this.props.t;

      return _react2.default.createElement(
        'div',
        { className: 'menuMobile' },
        _react2.default.createElement(
          'nav',
          { className: md.mobile() === 'iPhone' && md.userAgent() === 'Safari' && isToggle ? 'is-toggle' : null },
          _react2.default.createElement(
            'ul',
            null,
            this.props.user.isLogin && _react2.default.createElement(
              'li',
              { style: { fontWeigh: '500', fontSize: '14px', color: '#161616', display: 'flex', paddingBottom: '30px' } },
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/mobile_menu/user.svg' }),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/kundenkonto', activeClassName: 'active', onClick: this.hideMenu, style: { paddingBottom: '0px' } },
                _react2.default.createElement(
                  'div',
                  { style: { display: 'flex', flexDirection: 'column' } },
                  _react2.default.createElement(
                    'span',
                    { className: 'username' },
                    'Kundenkonto: ',
                    this.props.user.data && this.props.user.data.systemAddress.first_name + ' ' + this.props.user.data.systemAddress.last_name
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'email', style: { fontSize: '12px', color: '#707070' } },
                    this.props.user.data && this.props.user.data.systemAddress.email
                  )
                )
              )
            ),
            !this.props.user.isLogin && _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/mobile_menu/user.svg' }),
              _react2.default.createElement(
                'a',
                { href: '#', onClick: function onClick() {
                    _this2.hideMenu();
                    $('.login-box-wrapper').css({ display: 'block' });
                    $('#op').trigger('click');
                    return false;
                  } },
                'Login/Registrieren'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/mobile_menu/wunschliste.svg' }),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/wunschliste', activeClassName: 'active', onClick: this.hideMenu },
                'Wunschliste'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/mobile_menu/Verkaufen.svg' }),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/verkaufen', activeClassName: 'active', onClick: this.hideMenu },
                this.props.t('headerTop.sell')
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/mobile_menu/Reparieren.svg' }),
              _react2.default.createElement(
                'a',
                { href: 'https://www.ireparatur.ch/', rel: 'noopener', target: '_blank', onClick: this.hideMenu },
                this.props.t('headerTop.repair')
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/mobile_menu/Kaufen.svg' }),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/kaufen', activeClassName: 'active', onClick: this.hideMenu },
                this.props.t('headerTop.buy')
              ),
              _react2.default.createElement(
                'ul',
                { className: 'submenu' },
                this.props.devices.map(this.mapSubmodels)
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/mobile_menu/Kontakt.svg' }),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/kontakt', activeClassName: 'active', onClick: this.hideMenu },
                this.props.t('headerTop.contact')
              )
            ),
            _react2.default.createElement(
              'li',
              { onClick: function onClick() {
                  return _this2.toggleDropdown();
                } },
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/location.png' }),
              _react2.default.createElement(
                'a',
                { style: { textDecoration: 'none' } },
                'Unsere Standorte'
              ),
              this.state.isToggle && _react2.default.createElement('img', { loading: 'lazy', style: { float: 'right', marginRight: '18px' }, src: '/images/caret-up.png' }),
              !this.state.isToggle && _react2.default.createElement('img', { loading: 'lazy', style: { float: 'right', marginRight: '18px' }, src: '/images/caret-down.png' }),
              data && this.state.isToggle && data.data.map(function (item) {
                return _react2.default.createElement(
                  'div',
                  { key: 'img-item-' + item.id, className: 'img-item item-' + item.id, style: { display: 'flex', marginBottom: '10px' } },
                  console.log('item', item),
                  _react2.default.createElement('img', { loading: 'lazy', alt: 'alt', width: 10, height: 13, src: '/images/' + item.id + '.png', style: { marginTop: '5px' } }),
                  _react2.default.createElement(
                    'div',
                    { style: { width: '300px' } },
                    _react2.default.createElement(
                      'span',
                      { style: { fontWeight: '700', color: '#0F0F0F', fontSize: '16px', display: 'block' } },
                      item.descriptionBranch
                    ),
                    _react2.default.createElement(
                      'span',
                      { style: { fontSize: '13px', color: '#949494', marginBottom: '12px', display: 'block' } },
                      item.address,
                      ',\xA0',
                      item.zip,
                      '\xA0',
                      item.city
                    ),
                    _react2.default.createElement(
                      'p',
                      { style: { fontSize: '13px', display: 'flex', padding: 0 } },
                      _react2.default.createElement(
                        'div',
                        { className: 'col-sm-3', style: { paddingLeft: 0, width: '20px' } },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#8B8B8B' } },
                          t("openingHoursHover.Mon"),
                          ':'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-md-9' },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#0F0F0F' } },
                          item.openingHours.mon
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { style: { fontSize: '13px', display: 'flex', padding: 0 } },
                      _react2.default.createElement(
                        'div',
                        { className: 'col-sm-3', style: { paddingLeft: 0, width: '20px' } },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#8B8B8B' } },
                          t("openingHoursHover.Tue"),
                          ':'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-md-9' },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#0F0F0F' } },
                          item.openingHours.tue
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { style: { fontSize: '13px', display: 'flex', padding: 0 } },
                      _react2.default.createElement(
                        'div',
                        { className: 'col-sm-3', style: { paddingLeft: 0, width: '20px' } },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#8B8B8B' } },
                          t("openingHoursHover.Wed"),
                          ':'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-md-9' },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#0F0F0F' } },
                          item.openingHours.wed
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { style: { fontSize: '13px', display: 'flex', padding: 0 } },
                      _react2.default.createElement(
                        'div',
                        { className: 'col-sm-3', style: { paddingLeft: 0, width: '20px' } },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#8B8B8B' } },
                          t("openingHoursHover.Thu"),
                          ':'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-md-9' },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#0F0F0F' } },
                          item.openingHours.thu
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { style: { fontSize: '13px', display: 'flex', padding: 0 } },
                      _react2.default.createElement(
                        'div',
                        { className: 'col-sm-3', style: { paddingLeft: 0, width: '20px' } },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#8B8B8B' } },
                          t("openingHoursHover.Fri"),
                          ':'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-md-9' },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#0F0F0F' } },
                          item.openingHours.fri
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      { style: { fontSize: '13px', display: 'flex', padding: 0 } },
                      _react2.default.createElement(
                        'div',
                        { className: 'col-sm-3', style: { paddingLeft: 0, width: '20px' } },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#8B8B8B' } },
                          t("openingHoursHover.Sat"),
                          ':'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'col-md-9' },
                        _react2.default.createElement(
                          'span',
                          { style: { color: '#0F0F0F' } },
                          item.openingHours.sat
                        )
                      )
                    )
                  )
                );
              })
            ),
            _react2.default.createElement(
              'li',
              { onClick: function onClick() {
                  return _this2.showLangMenu();
                } },
              _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/lang/' + lang + '.svg' }),
              _react2.default.createElement(
                'a',
                { style: { textDecoration: 'none' } },
                lang.toUpperCase()
              ),
              _react2.default.createElement('img', { loading: 'lazy', style: { float: 'right', marginRight: '18px' }, src: '/images/caret-down.png' })
            )
          )
        )
      );
    }
  }]);
  return MenuMobile;
}(_react.Component);

MenuMobile.propTypes = {};
MenuMobile.defaultProps = {};

function mapStateToProps(state) {
  return {
    user: state.user,
    devices: state.shop.devices,
    places: state.places.currentLocation
  };
}
function mapDispatchToProps(dispatch) {
  return {
    shopActions: (0, _redux.bindActionCreators)(shopActions, dispatch),
    userActions: (0, _redux.bindActionCreators)(userActions, dispatch),
    placesActions: (0, _redux.bindActionCreators)(placesActions, dispatch)
  };
}

exports.default = (0, _reactI18next.withTranslation)()((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactI18next.withTranslation)()(MenuMobile)));

/***/ }),

/***/ 931:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchBarKaufenV2 = undefined;

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

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

var _axios = __webpack_require__(149);

var _axios2 = _interopRequireDefault(_axios);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _debounce2 = __webpack_require__(899);

var _debounce3 = _interopRequireDefault(_debounce2);

var _reactRouter = __webpack_require__(206);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _shop = __webpack_require__(873);

var shopActions = _interopRequireWildcard(_shop);

var _reactAutosuggest = __webpack_require__(907);

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _helpersFunction = __webpack_require__(316);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moreCount = 5;

var SearchBarKaufenV2 = exports.SearchBarKaufenV2 = function (_Component) {
    (0, _inherits3.default)(SearchBarKaufenV2, _Component);

    function SearchBarKaufenV2(props) {
        (0, _classCallCheck3.default)(this, SearchBarKaufenV2);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBarKaufenV2.__proto__ || Object.getPrototypeOf(SearchBarKaufenV2)).call(this, props));

        _this.getSuggestionValue = function (suggestion) {
            return suggestion.name;
        };

        _this.getSectionSuggestions = function (section) {
            return section.item;
        };

        _this.renderSectionTitle = function (suggestion) {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'searchResultSection' },
                    _react2.default.createElement(
                        'div',
                        { className: 'searchResultSectionTitle' },
                        suggestion.section.name
                    ),
                    suggestion.section.count > moreCount && _react2.default.createElement(
                        'div',
                        { className: 'searchResultSectionnMore', onClick: function onClick(e) {
                                return _this._clickViewmore(e, suggestion.section.id);
                            } },
                        'Mehr anzeigen'
                    )
                )
            );
        };

        _this.renderSuggestion = function (suggestion) {
            var value = _this.state.value,
                suggestionName = suggestion.name;
            var searshStrings = value.split(" ");
            var result = searshStrings.some(function (searshString) {
                return suggestionName.toLowerCase().includes(searshString.toLocaleLowerCase());
            });
            var text = '',
                name = suggestionName.toLowerCase().trim();
            if (result) {
                var searchResults = [];
                var searchStartIndex = 0;
                searshStrings.forEach(function (searshString) {
                    var index = name.indexOf(searshString.trim().toLowerCase(), searchStartIndex);
                    var len = searshString.trim().length;
                    searchResults = [].concat((0, _toConsumableArray3.default)(searchResults), [{
                        start: index,
                        len: len
                    }]);
                    searchStartIndex = index + len;
                });

                var getIndex = 0;
                var formatText = '';
                var lastText = '';
                for (var i = 0; i < searchResults.length; i++) {
                    text = suggestionName.slice(getIndex, searchResults[i].start);
                    var orgText = suggestionName.slice(searchResults[i].start, searchResults[i].start + searchResults[i].len);
                    formatText += text + '<span class="searchText">' + orgText + '</span>';
                    getIndex = searchResults[i].start + searchResults[i].len;
                    lastText = suggestionName.slice(getIndex, suggestionName.length);
                }
                formatText += lastText;

                var cssClass = 'searchResultItem';
                if (suggestion.hide) {
                    cssClass = 'searchResultItem hide';
                }
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: cssClass },
                        _react2.default.createElement(
                            'div',
                            { className: 'searchResultItemTitle' },
                            _react2.default.createElement(
                                'div',
                                { className: 'verkaufen-search-img' },
                                _react2.default.createElement('img', { loading: 'lazy', className: 'verkaufen-search-img', src: suggestion.image })
                            ),
                            _react2.default.createElement('div', { className: 'searchResultItemName', dangerouslySetInnerHTML: { __html: formatText } })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'searchResultItemPrice' },
                            (0, _helpersFunction.formatPrice)(suggestion.price),
                            'CHF'
                        )
                    )
                );
            }
        };

        _this.onChange = function (event, _ref) {
            var newValue = _ref.newValue;

            _this.setState({
                value: newValue
            });
        };

        _this.pressEnterOnInput = function (e) {
            if (e.key === "Enter") {
                _this.setState({ pressSearch: true });
                _reactRouter.browserHistory.push('/kaufen/search/' + _this.state.value);
            }
        };

        _this.onSuggestionsFetchRequested = function (_ref2) {
            var value = _ref2.value;

            _this.debouncedLoadSuggestions(value);
        };

        _this.onSuggestionSelected = function (event, _ref3) {
            var suggestion = _ref3.suggestion;

            _this.onSuggestionsClearRequested();
            _this.setState({
                value: ''
            });
            if (suggestion.searchType === "product") {
                var modelName = suggestion.name.split(" ").join('-').toLowerCase();
                modelName = modelName.split('/');
                _reactRouter.browserHistory.push('/kaufen/detail/zubehoer/' + suggestion.categoryName + '/' + modelName[modelName.length - 1] + '/' + suggestion.shortcode);
            } else if (suggestion.searchType === "device") {
                var _modelName = suggestion.name.replace(/ /g, '-').toLowerCase(),
                    color = suggestion.color,
                    capacity = suggestion.capacity,
                    deviceName = suggestion.deviceName;
                var url = '/kaufen/detail/' + deviceName + '/' + _modelName + '/' + capacity + '/' + color + '/' + suggestion.shortcode;
                _reactRouter.browserHistory.push(url);
            }
        };

        _this.onSuggestionsClearRequested = function () {
            _this.setState({
                suggestions: []
            });
        };

        _this.state = {
            value: '',
            suggestions: [],
            filteredByShortcode: false
        };

        _this._parseUrl = _this._parseUrl.bind(_this);
        _this._clickViewmore = _this._clickViewmore.bind(_this);
        _this._getObjForRequest = _this._getObjForRequest.bind(_this);
        _this._getProductSuggestions = _this._getProductSuggestions.bind(_this);
        _this._setProductSuggestions = _this._setProductSuggestions.bind(_this);
        _this._getDeviceSuggestions = _this._getDeviceSuggestions.bind(_this);
        _this._setDeviceSuggestions = _this._setDeviceSuggestions.bind(_this);
        _this._setBothSuggestions = _this._setBothSuggestions.bind(_this);
        _this.debouncedLoadSuggestions = (0, _debounce3.default)(_this.loadSuggestions, 500);
        return _this;
    }

    (0, _createClass3.default)(SearchBarKaufenV2, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.debouncedLoadSuggestions.cancel();
        }
    }, {
        key: '_clickViewmore',
        value: function _clickViewmore(e, sectionId) {
            var suggestions = this.state.suggestions;

            var newSuggestions = suggestions.map(function (suggestion) {
                if (suggestion.section.id === sectionId) {
                    var hideItems = suggestion.item.find(function (item) {
                        return item.hide === true;
                    });
                    var newItem = [];
                    if (typeof hideItems !== 'undefined') {
                        newItem = suggestion.item.map(function (item) {
                            return (0, _extends3.default)({}, item, {
                                hide: false
                            });
                        });
                    } else {
                        newItem = suggestion.item.map(function (item, index) {
                            if (index + 1 > moreCount) {
                                return (0, _extends3.default)({}, item, {
                                    hide: true
                                });
                            } else {
                                return item;
                            }
                        });
                    }
                    return (0, _extends3.default)({}, suggestion, {
                        item: newItem
                    });
                } else {
                    return suggestion;
                }
            });

            this.setState({
                suggestions: newSuggestions
            });
        }
    }, {
        key: '_parseUrl',
        value: function _parseUrl(nextPropsParams) {
            var urlParams = nextPropsParams,
                selectedFilterOptions = {
                page: 1,
                price: {
                    min: 0,
                    max: 1,
                    maxSearch: 0,
                    minSearch: 0
                },
                lagerort: { values: [] },
                modell: { values: [] },
                zustand: { values: [] },
                sort: nextPropsParams.deviceCategory1 === 'zubehör' ? 'popular' : 'popular'

            },
                storageLocationData = JSON.parse(window.localStorage.getItem("locationData")),
                currentLocationData = {};
            this.props.places ? currentLocationData = this.props.places : storageLocationData ? storageLocationData.data.forEach(function (item) {
                if (item.active === true) {
                    currentLocationData = item;
                }
            }) : currentLocationData = null;
            for (var key in urlParams) {
                if (key.includes('param') && urlParams[key]) {
                    (function () {
                        var name = urlParams[key].slice(0, urlParams[key].indexOf('=')),
                            paramsArr = [];

                        if (name === "preis") {
                            paramsArr = urlParams[key].slice(urlParams[key].indexOf('=') + 1).split('-');
                            selectedFilterOptions.price.minSearch = paramsArr[0];
                            selectedFilterOptions.price.maxSearch = paramsArr[1];
                        } else if (name === "sort" || name === "page") {
                            paramsArr = urlParams[key].slice(urlParams[key].indexOf('=') + 1);
                            selectedFilterOptions[name] = paramsArr;
                        } else {
                            paramsArr = urlParams[key].slice(urlParams[key].indexOf('=') + 1).split(',');
                            paramsArr.forEach(function (item, i) {
                                return paramsArr[i] = item.replace(/-/g, ' ').replace(/\|/g, '/');
                            });
                            selectedFilterOptions[name] = paramsArr;
                        }
                    })();
                }
            }
            return selectedFilterOptions;
        }
    }, {
        key: '_getObjForRequest',
        value: function _getObjForRequest(selectedFilterOptions, devices, searchType, value, deviceName) {
            var objForRequest = (0, _extends3.default)({}, selectedFilterOptions);

            for (var key in objForRequest) {
                if (key !== 'price' && key !== 'sort' && key !== 'page') objForRequest[key] = [].concat((0, _toConsumableArray3.default)(selectedFilterOptions[key]));
            }

            objForRequest['criterias'] = {};
            objForRequest['specifications'] = {};
            objForRequest['page'] = 1;
            objForRequest['deviceName'] = deviceName;
            objForRequest['searchQuery'] = value;
            objForRequest['webShopCategoryIds'] = [];
            objForRequest['modelCategoryIds'] = [];
            if (searchType === 'product') {
                var productCategories = devices.filter(function (item) {
                    return item.name.toLowerCase() === 'zubehör';
                });
                if (productCategories.length > 0 && deviceName !== '') {
                    objForRequest['webShopCategoryIds'] = productCategories[0].submodels.filter(function (item) {
                        return item.name.toLowerCase() === deviceName;
                    }).map(function (item1) {
                        return item1.id;
                    });
                }
            } else if (searchType === 'device') {
                // use search by deviceName
            } else if (searchType === 'both') {
                var _productCategories = devices.filter(function (item) {
                    return item.name.toLowerCase() === 'zubehör';
                });
                if (_productCategories.length > 0) {
                    objForRequest['webShopCategoryIds'] = _productCategories[0].submodels.map(function (item1) {
                        return item1.id;
                    });
                }
                var deviceModels = devices.filter(function (item) {
                    return item.name.toLowerCase() !== 'zubehör';
                });
                if (deviceModels.length > 0) {
                    objForRequest['modelCategoryIds'] = deviceModels.map(function (item1) {
                        return item1.id;
                    });
                }
            }

            var arrKeys = ['lagerort', 'modell', 'deviceName', 'webShopCategoryIds', 'modelCategoryIds', 'price', 'zustand', 'garantie', 'sort', 'page', 'criterias', 'specifications', 'searchQuery'];

            var _loop = function _loop(_key) {
                if (arrKeys.every(function (item) {
                    return item !== _key;
                })) {
                    var name = _key.slice(_key.lastIndexOf('-') + 1),
                        currentFilterName = _key.slice(0, _key.lastIndexOf('-')),
                        filterType = currentFilterName === 'kategorie' ? 'criterias' : 'specifications';

                    objForRequest[filterType][name] = [].concat((0, _toConsumableArray3.default)(objForRequest[_key]));
                    delete objForRequest[_key];
                }
            };

            for (var _key in objForRequest) {
                _loop(_key);
            }

            return objForRequest;
        }
    }, {
        key: '_getProductSuggestions',
        value: function _getProductSuggestions(data) {
            var productCategories = this.props.devices.filter(function (item) {
                return item.name.toLowerCase() === 'zubehör';
            });
            if (productCategories.length > 0) {
                var productItems = data.map(function (item, i) {
                    return {
                        id: item.id,
                        name: item.descriptionSearch,
                        price: item.price,
                        image: item.deviceImages ? item.deviceImages.mainImg.src : '/images/design/' + productCategories[0].id + 'device.svg',
                        categoryName: item.categoryName,
                        shortcode: item.shortcode,
                        searchType: 'product',
                        categoryId: productCategories[0].id,
                        index: i,
                        hide: i + 1 > moreCount ? true : false
                    };
                });

                var productSection = {
                    id: productCategories[0].id,
                    name: productCategories[0].name,
                    count: productItems.length
                };
                return [{
                    section: productSection,
                    item: productItems
                }];
            } else {
                return [];
            }
        }
    }, {
        key: '_setProductSuggestions',
        value: function _setProductSuggestions(data) {
            this.setState({
                suggestions: this._getProductSuggestions(data)
            });
        }
    }, {
        key: '_getDeviceSuggestions',
        value: function _getDeviceSuggestions(data) {
            var deviceCategories = this.props.devices.filter(function (item) {
                return item.name.toLowerCase() !== 'zubehör';
            });
            if (deviceCategories.length > 0) {
                var deviceSuggestions = [];
                deviceCategories.map(function (deviceCategory) {
                    var deviceDatas = data.filter(function (item) {
                        return item.mainDeviceId === deviceCategory.id;
                    });
                    if (deviceDatas.length > 0) {
                        var deviceSection = {
                            id: deviceCategory.id,
                            name: deviceCategory.name,
                            count: deviceDatas.length
                        };

                        var deviceItems = deviceDatas.map(function (item, i) {
                            return {
                                id: item.id,
                                name: item.model,
                                price: item.price,
                                color: item.color ? item.color.toLowerCase() : 'color',
                                capacity: item.capacity ? item.capacity.toLowerCase() : 'capacity',
                                deviceName: item.deviceName.replace(/ /g, '-').toLowerCase(),
                                image: item.deviceImages ? item.deviceImages.mainImg.src : '/images/design/' + deviceCategory.id + 'device.svg',
                                categoryName: item.deviceName,
                                shortcode: item.shortcode,
                                searchType: 'device',
                                categoryId: item.DeviceId,
                                index: i,
                                hide: i + 1 > moreCount ? true : false
                            };
                        });

                        deviceSuggestions = [].concat((0, _toConsumableArray3.default)(deviceSuggestions), [{
                            section: deviceSection,
                            item: deviceItems
                        }]);
                    }
                });
                return deviceSuggestions;
            } else {
                return [];
            }
        }
    }, {
        key: '_setDeviceSuggestions',
        value: function _setDeviceSuggestions(data) {
            this.setState({
                suggestions: this._getDeviceSuggestions(data)
            });
        }
    }, {
        key: '_setBothSuggestions',
        value: function _setBothSuggestions(productData, deviceData) {
            var deviceDatas = this._getDeviceSuggestions(deviceData);
            var productDatas = this._getProductSuggestions(productData);
            var suggestions = [];
            suggestions = [].concat((0, _toConsumableArray3.default)(suggestions), (0, _toConsumableArray3.default)(deviceDatas), (0, _toConsumableArray3.default)(productDatas));
            this.setState({
                suggestions: suggestions
            });
        }
    }, {
        key: 'loadSuggestions',
        value: function loadSuggestions(value) {
            var _this2 = this;

            if (value.length < 5) return;

            var params = this.props.params,
                selectedFilterOptions = this._parseUrl(this.props.params),
                deviceName = '';


            var searchType = 'both';

            var objForRequest = this._getObjForRequest(selectedFilterOptions, this.props.devices, searchType, value, deviceName);

            this.onSuggestionsClearRequested();
            if (searchType === 'product') {
                _axios2.default.post('/api/searchShopCategoryProducts', objForRequest).then(function (_ref4) {
                    var data = _ref4.data;

                    _this2._setProductSuggestions(data.data);
                }).catch(function (error) {});
            } else if (searchType === 'device') {
                _axios2.default.post('/api/searchModels', objForRequest).then(function (_ref5) {
                    var data = _ref5.data;

                    _this2._setDeviceSuggestions(data.data);
                }).catch(function (error) {});
            } else if (searchType === 'both') {
                var promise1 = _axios2.default.post('/api/searchShopCategoryProducts', objForRequest);
                var promise2 = _axios2.default.post('/api/searchModels', objForRequest);
                Promise.all([promise1, promise2]).then(function (values) {
                    var productData = [],
                        deviceData = [];
                    values.forEach(function (item) {
                        if (item.config.url === '/api/searchShopCategoryProducts') {
                            productData = item.data.data;
                        } else if (item.config.url === '/api/searchModels') {
                            deviceData = item.data.data;
                        }
                    });

                    _this2._setBothSuggestions(productData, deviceData);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                value = _state.value,
                suggestions = _state.suggestions;
            var pathname = this.props.location.pathname;

            var inputProps = {
                placeholder: this.props.placeholder || '',
                value: value,
                onChange: this.onChange
            };
            return _react2.default.createElement(
                'div',
                { className: 'searchBar' },
                pathname === '/' ? null : null,
                _react2.default.createElement(_reactAutosuggest2.default, {
                    multiSection: true,
                    suggestions: suggestions,
                    onSuggestionSelected: this.onSuggestionSelected,
                    onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
                    onSuggestionsClearRequested: this.onSuggestionsClearRequested,
                    getSuggestionValue: this.getSuggestionValue,
                    renderSuggestion: this.renderSuggestion,
                    renderSectionTitle: this.renderSectionTitle,
                    getSectionSuggestions: this.getSectionSuggestions,
                    inputProps: inputProps
                }),
                (window.isMobile || window.isTablet) && _react2.default.createElement(
                    'div',
                    { className: 'closeDiv', onClick: this.props.hideSearchBar },
                    _react2.default.createElement('img', { loading: 'lazy', src: "/images/design/closeBtn.svg" })
                )
            );
        }
    }]);
    return SearchBarKaufenV2;
}(_react.Component);

SearchBarKaufenV2.propTypes = {};
SearchBarKaufenV2.defaultProps = {};

function mapStateToProps(state) {
    return {
        devices: state.shop.devices
    };
}
function mapDispatchToProps(dispatch) {
    return {
        shopActions: (0, _redux.bindActionCreators)(shopActions, dispatch)
    };
}

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchBarKaufenV2));

/***/ }),

/***/ 932:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderMobile = undefined;

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

var _reactRedux = __webpack_require__(313);

var _menuMobile = __webpack_require__(930);

var _menuMobile2 = _interopRequireDefault(_menuMobile);

var _menuMobileLang = __webpack_require__(933);

var _menuMobileLang2 = _interopRequireDefault(_menuMobileLang);

var _couponFromAds = __webpack_require__(927);

var _couponFromAds2 = _interopRequireDefault(_couponFromAds);

var _helpersFunction = __webpack_require__(316);

var _searchBarKaufenV = __webpack_require__(931);

var _searchBarKaufenV2 = _interopRequireDefault(_searchBarKaufenV);

var _reactI18next = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderMobile = exports.HeaderMobile = function (_Component) {
  (0, _inherits3.default)(HeaderMobile, _Component);

  function HeaderMobile(props) {
    (0, _classCallCheck3.default)(this, HeaderMobile);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderMobile.__proto__ || Object.getPrototypeOf(HeaderMobile)).call(this, props));

    _this.state = {
      showCouponFromAds: false,
      showSearch: window.localStorage.getItem("mobileSearchBar") === 1 ? true : false,
      showMobileMenu: window.localStorage.getItem("mobileShowMenu") === 1 ? true : false,
      showLang: false
    };

    _this.showMenu = _this.showMenu.bind(_this);
    _this.showSearchBar = _this.showSearchBar.bind(_this);
    _this.hideSearchBar = _this.hideSearchBar.bind(_this);
    _this.showLangMenu = _this.showLangMenu.bind(_this);
    _this.hideLangMenu = _this.hideLangMenu.bind(_this);
    _this.toggleCouponFromAds = _this.toggleCouponFromAds.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(HeaderMobile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkAdsSource();
      _helpersFunction.headerController.initialize();
    }
  }, {
    key: 'checkAdsSource',
    value: function checkAdsSource() {
      var _this2 = this;

      var search_params = new URL(document.URL).searchParams;

      if (search_params.has('coupon') && !window.localStorage.hasOwnProperty("coupon")) {
        var coupon = search_params.get('coupon');

        axios.get('/api/checkAdsCoupon?coupon=' + coupon).then(function (data) {
          if (data.data.status == "ok") {
            _this2.toggleCouponFromAds();
            document.getElementById('coupon_text').innerHTML = coupon;
            window.localStorage.setItem('coupon', coupon);
          }
        }).catch(function (error) {});
      }
    }
  }, {
    key: 'toggleCouponFromAds',
    value: function toggleCouponFromAds() {
      this.setState({ showCouponFromAds: !this.state.showCouponFromAds });
    }
  }, {
    key: 'showMenu',
    value: function showMenu(e) {
      var headerHeight = $('.header-mobile.scrolling-header').innerHeight();
      if ($('.header-mobile.scrolling-header').hasClass('scroll')) {
        headerHeight += 40;
      }
      var showMobileMenu = this.state.showMobileMenu;


      if (showMobileMenu === true) {
        $('.menuMobile').css({ top: 0, transform: 'translateY(-100%)' });
        $('#mobile > .mainPage > .headerBottom-mobile .header-bottom').css('display', 'block');
        $('#mobile > .mainPage > .mainPage').css('display', 'block');
        // $('#mobile footer').css('display', 'block');
        window.localStorage.setItem("mobileShowMenu", 0);
        this.setState({ showMobileMenu: false });
        $(e.currentTarget).removeClass('open');
      } else {
        $('.menuMobile').css({
          top: headerHeight + 'px',
          maxHeight: 'calc( 100vh - ' + headerHeight + 'px',
          transform: 'translateY(0)'
        });
        setTimeout(function () {
          $('#mobile > .mainPage > .headerBottom-mobile .header-bottom').css('display', 'none');
          $('#mobile > .mainPage > .mainPage').css('display', 'none');
          // $('#mobile footer').css('display', 'none')
        }, 1000);
        window.localStorage.setItem("mobileShowMenu", 1);
        this.setState({ showMobileMenu: true });
        $(e.currentTarget).addClass('open');
      }
    }
  }, {
    key: 'showSearchBar',
    value: function showSearchBar() {
      this.setState({ showSearch: true });
      window.localStorage.setItem("mobileSearchBar", 1);
      this.setState({ showMobileMenu: false });
      window.localStorage.setItem("mobileShowMenu", 0);
    }
  }, {
    key: 'hideSearchBar',
    value: function hideSearchBar() {
      this.setState({ showSearch: false });
      window.localStorage.setItem("mobileSearchBar", 0);
    }
  }, {
    key: 'showLangMenu',
    value: function showLangMenu() {
      $('.menuMobile').css({ top: 0, transform: 'translateY(-100%)' });
      $('#mobile > .mainPage > .headerBottom-mobile .header-bottom').css('display', 'block');
      $('#mobile > .mainPage > .mainPage').css('display', 'block');
      window.localStorage.setItem("mobileShowMenu", 0);
      this.setState({ showMobileMenu: false });
      this.setState({ showLang: true });
    }
  }, {
    key: 'hideLangMenu',
    value: function hideLangMenu() {
      $('.hamburgerLang').toggleClass('open');
      $('.menuMobile').css({ top: 0, transform: 'translateY(-100%)' });
      $('#mobile > .mainPage > .headerBottom-mobile .header-bottom').css('display', 'block');
      $('#mobile > .mainPage > .mainPage').css('display', 'block');
      setTimeout(function () {
        this.setState({ showLang: false });
      }.bind(this), 700);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          showSearch = _state.showSearch,
          showCouponFromAds = _state.showCouponFromAds,
          showLang = _state.showLang;

      var backBtnUrl = this.props.backColorGreen ? "/images/design/mobile/back-btn-green.svg" : "/images/design/mobile/back-btn.svg";
      var webshopDiscountData = JSON.parse(window.localStorage.getItem('webshopDiscountData'));
      var t = this.props.t;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        showSearch && !showLang && _react2.default.createElement(
          'div',
          { className: 'row header-mobile scrolling-header' },
          _react2.default.createElement(
            'div',
            { className: 'wrap-header' },
            _react2.default.createElement(
              'div',
              { className: 'mobile-search-section' },
              _react2.default.createElement(_searchBarKaufenV2.default, { placeholder: t('expandedSearchFieldTitle'), hideSearchBar: this.hideSearchBar })
            )
          )
        ),
        !showSearch && !showLang && _react2.default.createElement(
          'div',
          { className: 'row header-mobile scrolling-header' },
          webshopDiscountData.mobile_topbar_active == 1 && _react2.default.createElement(
            'div',
            { style: { position: "relative" }, className: 'notification-top-bar' },
            _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: (0, _helpersFunction.discountCode)(webshopDiscountData.mobile_topbar_text, 'discount-code') } })
          ),
          _react2.default.createElement(
            'div',
            { className: 'wrap-header' },
            _react2.default.createElement(
              'div',
              { className: window.isTablet ? "col-xs-2 mobile-header" : "col-xs-3 mobile-header" },
              this.props.back && _react2.default.createElement('img', { loading: 'lazy', src: backBtnUrl,
                onClick: this.props.handlerBack,
                alt: '' }),
              this.props.menu && _react2.default.createElement(
                'div',
                { className: 'hamburger', onClick: this.showMenu },
                window.isTablet ? _react2.default.createElement(
                  'svg',
                  { viewBox: '0 0 64 48' },
                  _react2.default.createElement('path', { d: 'M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37' }),
                  _react2.default.createElement('path', { d: 'M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24' }),
                  _react2.default.createElement('path', { d: 'M45,33 L19,33 C-8,33 6,-2 22,14 L45,37' })
                ) : _react2.default.createElement(
                  'svg',
                  { viewBox: '0 0 64 48' },
                  _react2.default.createElement('path', { d: 'M16,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37' }),
                  _react2.default.createElement('path', { d: 'M16,24 L45,24 C61.2371586,24 57,49 41,33 L32,24' }),
                  _react2.default.createElement('path', { d: 'M42,33 L19,33 C-8,33 6,-2 22,14 L45,37' })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: window.isTablet ? "col-xs-8 text-center" : "col-xs-6 text-center" },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' },
                _react2.default.createElement('p', { className: 'title', dangerouslySetInnerHTML: { __html: this.props.title } })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: window.isTablet ? "col-xs-2 text-right" : "col-xs-3 text-right", style: { paddingLeft: '0px' } },
              !this.props.btnWriteReview && _react2.default.createElement(
                'span',
                { className: 'basketButtons' },
                _react2.default.createElement(
                  'span',
                  { className: 'search', onClick: this.showSearchBar },
                  _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/searchBtn.svg', alt: '' })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'basketArea' },
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/warenkorb' },
                    _react2.default.createElement(
                      'span',
                      { className: 'basket' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/cart-new.svg', alt: '' }),
                      this.props.basket.countVerkaufen + this.props.basket.count > 0 && _react2.default.createElement(
                        'span',
                        { className: 'count cart-total-kaufen' },
                        this.props.basket.countVerkaufen + this.props.basket.count
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'wishButtons' },
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/wunschliste' },
                    _react2.default.createElement(
                      'span',
                      { className: 'basket' },
                      _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/wishIcon.svg', alt: '' }),
                      this.props.basket.wishlistCount > 0 && _react2.default.createElement(
                        'span',
                        { className: 'count wish-total-kaufen' },
                        this.props.basket.wishlistCount
                      )
                    )
                  )
                )
              ),
              this.props.btnWriteReview && _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/edit-green.png', onClick: this.props.handlerWrite })
            )
          ),
          _react2.default.createElement(_menuMobile2.default, { showLangMenu: this.showLangMenu })
        ),
        showLang && !showSearch && _react2.default.createElement(
          'div',
          { className: 'row header-mobile scrolling-header' },
          _react2.default.createElement(
            'div',
            { className: 'wrap-header' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs-3 mobile-header' },
              _react2.default.createElement(
                'div',
                { className: 'hamburgerLang open', onClick: this.hideLangMenu },
                window.isTablet ? _react2.default.createElement(
                  'svg',
                  { viewBox: '0 0 64 48' },
                  _react2.default.createElement('path', { d: 'M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37' }),
                  _react2.default.createElement('path', { d: 'M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24' }),
                  _react2.default.createElement('path', { d: 'M45,33 L19,33 C-8,33 6,-2 22,14 L45,37' })
                ) : _react2.default.createElement(
                  'svg',
                  { viewBox: '0 0 64 48' },
                  _react2.default.createElement('path', { d: 'M16,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37' }),
                  _react2.default.createElement('path', { d: 'M16,24 L45,24 C61.2371586,24 57,49 41,33 L32,24' }),
                  _react2.default.createElement('path', { d: 'M42,33 L19,33 C-8,33 6,-2 22,14 L45,37' })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-xs-6 text-center' },
              _react2.default.createElement(
                'p',
                { className: 'title' },
                'Sprache auswählen'
              )
            )
          ),
          _react2.default.createElement(_menuMobileLang2.default, { hideLangMenu: this.hideLangMenu })
        ),
        !showSearch && !showLang && showCouponFromAds && _react2.default.createElement(_couponFromAds2.default, { toggleLightbox: this.toggleCouponFromAds })
      );
    }
  }]);
  return HeaderMobile;
}(_react.Component);

HeaderMobile.propTypes = {};
HeaderMobile.defaultProps = {};

function mapStateToProps(state) {
  return {
    basket: state.basket
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.withTranslation)()(HeaderMobile));

/***/ }),

/***/ 933:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuMobileLang = undefined;

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

__webpack_require__(323);

var _i18next = __webpack_require__(209);

var _i18next2 = _interopRequireDefault(_i18next);

var _reactI18next = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuMobileLang = exports.MenuMobileLang = function (_Component) {
  (0, _inherits3.default)(MenuMobileLang, _Component);

  function MenuMobileLang(props) {
    (0, _classCallCheck3.default)(this, MenuMobileLang);

    var lang = window.localStorage.getItem('lang');
    if (typeof lang == 'undefined' || !lang || lang == '') lang = 'de';

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuMobileLang.__proto__ || Object.getPrototypeOf(MenuMobileLang)).call(this, props));

    _this.state = {
      lang: lang,
      langOptions: [{
        title: 'DE',
        value: 'de',
        image: '/images/design/lang/de.svg'
      }, {
        title: 'FR',
        value: 'fr',
        image: '/images/design/lang/fr.svg'
      }, {
        title: 'IT',
        value: 'it',
        image: '/images/design/lang/it.svg'
      }, {
        title: 'EN',
        value: 'en',
        image: '/images/design/lang/en.svg'
      }]
    };

    _this.selLang = _this.selLang.bind(_this);
    _this.applyLang = _this.applyLang.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MenuMobileLang, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var headerHeight = $('.header-mobile.scrolling-header').innerHeight();
      $('.menuMobile').css({
        top: headerHeight + 'px',
        maxHeight: 'calc( 100vh - ' + headerHeight + 'px',
        transform: 'translateY(0)'
      });
    }
  }, {
    key: 'selLang',
    value: function selLang(e, item) {
      this.setState({
        lang: item.value
      });
    }
  }, {
    key: 'applyLang',
    value: function applyLang() {
      var lang = this.state.lang;
      var hideLangMenu = this.props.hideLangMenu;

      window.localStorage.setItem('lang', lang);
      _i18next2.default.changeLanguage(lang);
      if (hideLangMenu) {
        hideLangMenu();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          lang = _state.lang,
          langOptions = _state.langOptions;

      return _react2.default.createElement(
        'div',
        { className: 'menuMobile langUse' },
        _react2.default.createElement(
          'nav',
          null,
          _react2.default.createElement(
            'ul',
            null,
            langOptions.map(function (item, i) {
              return _react2.default.createElement(
                'li',
                { key: 'lang-' + i, className: item.value === lang ? "acitve" : null, onClick: function onClick(e) {
                    return _this2.selLang(e, item);
                  } },
                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/lang/' + item.value + '.svg' }),
                _react2.default.createElement(
                  'a',
                  { style: { textDecoration: 'none' } },
                  item.title
                )
              );
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'langUseBtn', onClick: this.applyLang },
          'anwenden'
        )
      );
    }
  }]);
  return MenuMobileLang;
}(_react.Component);

MenuMobileLang.propTypes = {};
MenuMobileLang.defaultProps = {};

exports.default = (0, _reactI18next.withTranslation)()(MenuMobileLang);

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

/***/ })

});