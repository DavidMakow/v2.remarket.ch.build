webpackJsonp([85],{

/***/ 713:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(167);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductNotFound = function ProductNotFound() {
  var loader = document.getElementById("spinner-box-load");
  if (loader) {
    loader.style.display = "none";
  }
  return _react2.default.createElement(
    "div",
    { className: "container" },
    _react2.default.createElement(
      "h1",
      null,
      "Fehler: Produkt nicht verf\xFCgbar"
    ),
    _react2.default.createElement(
      "p",
      null,
      "Leider k\xF6nnen wir das gesuchte Produkt nicht mehr anbieten. Schauen Sie sich stattdessen unsere Hauptseite an, um andere grossartige Produkte zu entdecken, die Ihren Anforderungen entsprechen k\xF6nnten."
    ),
    _react2.default.createElement(
      "p",
      { className: "not-found-main-wrapper" },
      _react2.default.createElement(
        "button",
        { className: "not-found-main-wrapper-btn" },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: "/kaufen", style: { color: "black" } },
          "Homepage besuchen"
        )
      )
    ),
    _react2.default.createElement(
      "p",
      null,
      "Vielen Dank f\xFCr Ihr Verst\xE4ndnis und z\xF6gern Sie nicht, uns bei Fragen oder Hilfe zu kontaktieren. Wir stehen Ihnen gerne zur Verf\xFCgung."
    )
  );
};

exports.default = ProductNotFound;

/***/ })

});