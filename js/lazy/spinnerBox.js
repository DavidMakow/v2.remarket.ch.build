webpackJsonp([77],{

/***/ 663:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(10);

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

/***/ })

});