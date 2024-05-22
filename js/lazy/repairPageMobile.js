webpackJsonp([20,29],{

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

/***/ 1079:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seoReadMoreClick = seoReadMoreClick;
exports.seoTextAdjustHeight = seoTextAdjustHeight;
var expanded = false;

function seoReadMoreClick(event) {
  event.preventDefault();
  expand();
  window.addEventListener("resize", debounce(expand));
}

function seoTextAdjustHeight() {
  if (expanded) {
    $(".seo-wrap").css({ "max-height": 9999 });
  }
}

function expand() {
  expanded = true;
  seoTextAdjustHeight();
  var wrap = $(".seo-wrap");
  wrap.find(".read-more").fadeOut();
  wrap.addClass("expanded");
  window.scrollTo(0, document.body.scrollHeight);
}

function debounce(func) {
  var timer = void 0;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
}

/***/ }),

/***/ 1103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = undefined;

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

var _reactSimpleImg = __webpack_require__(342);

var _reactRouter = __webpack_require__(206);

var _reactRedux = __webpack_require__(313);

var _shop = __webpack_require__(873);

var shopActions = _interopRequireWildcard(_shop);

var _redux = __webpack_require__(148);

var _places = __webpack_require__(909);

var placesActions = _interopRequireWildcard(_places);

var _seoText = __webpack_require__(1079);

var _reactI18next = __webpack_require__(315);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FOOTER_SEO_CH = _react2.default.createElement(
  _react2.default.Fragment,
  null,
  _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "h1",
      null,
      "iPhone, Samsung Galaxy, iPad, MacBook gebraucht kaufen und verkaufen per Knopfdruck."
    ),
    _react2.default.createElement(
      "p",
      null,
      "Viele elektronische Ger\xE4te wie",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "Handys, Smartphones, Tablets oder Computer"
      ),
      " werden bereits nach kurzer Zeit der Nutzung durch neue Ger\xE4te ersetzt. Nicht selten landen die alten Ger\xE4te beim lokalen Entsorgungsbetrieb oder einfach in der Schublade oder im Schrank, sofern es sich um kleine Ger\xE4te wie beispielsweise ",
      _react2.default.createElement(
        "strong",
        null,
        "Smartphones"
      ),
      " handelt. Dabei ist auch gebrauchte Elektronik noch sehr gefragt. Ger\xE4te wie das",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "iPhone, iPad, ein Samsung Galaxy sowie tragbare Computer und Desktopcomputer"
      ),
      " ",
      "k\xF6nnen durchaus noch einiges an Geld bringen, wenn sie \xFCber Shops wie unserem angeboten und verkauft werden. Viele Menschen k\xF6nnen sich neue Ger\xE4te namhafter Hersteller nicht leisten und greifen deshalb auf",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "gebrauchte Ger\xE4te"
      ),
      " zur\xFCck. Anstatt nun eventuell defekte Ger\xE4te von Privatleuten ohne Garantie oder Sicherheit zu kaufen, sollten Sie gebrauchte und gepr\xFCfte",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "Computer, Smartphones oder Tablets gebraucht und gepr\xFCft kaufen"
      ),
      ", die in zahlreichen Ausf\xFChrungen auf unserer Homepage erh\xE4ltlich sind. Die Ger\xE4te werden zu deutlich g\xFCnstigeren Preisen als den ehemaligen Neupreisen angeboten, so dass sich noch jede Menge Geld sparen l\xE4sst."
    ),
    _react2.default.createElement(
      "h2",
      null,
      "Verkaufen Sie Ihre Elektronik, wenn Sie neue Ger\xE4te gekauft haben"
    ),
    _react2.default.createElement(
      "p",
      null,
      "Anstatt Ihr nicht mehr ben\xF6tigtes Smartphone, Tablet oder ein Notebook im Schrank einstauben zu lassen, bieten Sie es doch einfach \xFCber unseren",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "Onlineshop"
      ),
      " zum Verkauf an. Es funktioniert ganz einfach. Sie w\xE4hlen einfach den entsprechenden Ger\xE4tetyp wie beispielsweise Ihr",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "iPhone, MacBook oder den Apple Mac mini"
      ),
      " aus und machen weitere Angaben zu den Ausstattungsmerkmalen und den Zustand des Ger\xE4tes. Innerhalb weniger Minuten und mit nur",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "wenigen Klicks"
      ),
      " ist der aktuelle Preis f\xFCr das von Ihnen angebotene Ger\xE4t ermittelt. Sie wissen also sofort, was Sie bekommen. Einfacher geht es nicht. Der Versand ist auch unkompliziert, da Sie die Kosten daf\xFCr ersetzt bekommen. Wurde das Ger\xE4t durch uns \xFCberpr\xFCft, erhalten Sie Ihr ",
      _react2.default.createElement(
        "strong",
        null,
        "Geld innerhalb k\xFCrzester Zeit"
      ),
      " ohne weitere Abz\xFCge."
    ),
    _react2.default.createElement(
      "h2",
      null,
      "M\xF6chten Sie ein gebrauchtes Smartphone oder Notebook kaufen?"
    ),
    _react2.default.createElement(
      "p",
      null,
      "Wenn Sie auf der Suche nach einem preisg\xFCnstigen",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "iPhone, iPad, Samsung Galaxy"
      ),
      " oder einem anderen Mac-Computer sind, sollten Sie sich in unserem Onlineangebot umschauen. Sie bekommen zahlreiche Ger\xE4te namhafter Hersteller",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "g\xFCnstig gebraucht und gepr\xFCft"
      ),
      ". Falls doch etwas nicht in Ordnung sein sollte, nutzen Sie einfach die einj\xE4hrige",
      " ",
      _react2.default.createElement(
        "strong",
        null,
        "Garantie"
      ),
      ", die wir auf die Ger\xE4te aus unserem Angebot geben. Die Ger\xE4te werden ",
      _react2.default.createElement(
        "strong",
        null,
        "versandkostenfrei"
      ),
      " an Sie geliefert."
    )
  )
);

var Footer = exports.Footer = function (_Component) {
  (0, _inherits3.default)(Footer, _Component);

  function Footer(props) {
    (0, _classCallCheck3.default)(this, Footer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

    _this.globalClick = function (e) {
      if (e.target.tagName.toLowerCase() === "a") {
        _this.props.shopActions.definedCounerForSearchInput(" ");
      }
    };

    return _this;
  }

  (0, _createClass3.default)(Footer, [{
    key: "render",
    value: function render() {
      var data = JSON.parse(window.localStorage.getItem("locationData"));
      var active = {};
      var t = this.props.t;

      if (data) {
        active.place = data.data.find(function (item) {
          return item.active === true;
        });
        if (active.place == null) {
          active.place = data.data[0];
        }
      }
      var currentPlace = this.props.places;
      var domain = window.domainName.name.split(".")[window.domainName.name.split(".").length - 1];
      return _react2.default.createElement(
        "footer",
        { id: "footer", onClick: this.globalClick },
        _react2.default.createElement(
          "div",
          { className: "container-fluid" },
          _react2.default.createElement(
            "div",
            { className: "row" },
            _react2.default.createElement(
              "div",
              { className: "col-xs-12 col-sm-5 col-lg-3" },
              _react2.default.createElement(
                "div",
                { className: "address" },
                _react2.default.createElement("img", {
                  loading: "lazy",
                  src: domain === "ch" ? "/images/design/logo_all_pages.svg" : "/images/design/logo_all_pages.svg",
                  alt: "",
                  width: "160"
                })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-xs-6 col-sm-4 col-lg-2" },
              _react2.default.createElement(
                "ul",
                null,
                _react2.default.createElement(
                  "li",
                  { className: "head" },
                  t("footerSection.mainTitle1")
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/verkaufen" },
                    t("footerSection.linkTitle1.1")
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/kaufen" },
                    t("footerSection.linkTitle1.2")
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/firmenkunden" },
                    t("footerSection.linkTitle1.3")
                  )
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-xs-6 col-sm-3 col-lg-2 text-left" },
              _react2.default.createElement(
                "ul",
                null,
                _react2.default.createElement(
                  "li",
                  { className: "head" },
                  t("footerSection.mainTitle3")
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/kontakt" },
                    t("footerSection.linkTitle3.1")
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/ueber-uns/agb/" },
                    t("footerSection.linkTitle3.2")
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/ueber-uns/widerrufsbelehrung/" },
                    t("footerSection.linkTitle3.3")
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/ueber-uns/datenschutzerklaerung/" },
                    t("footerSection.linkTitle3.4")
                  )
                ),
                _react2.default.createElement(
                  "li",
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/ueber-uns/impressum/" },
                    t("footerSection.linkTitle3.5")
                  )
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "col-xs-6 col-sm-4 col-lg-3" },
              _react2.default.createElement(
                "div",
                { className: "numPhone" },
                _react2.default.createElement("img", {
                  loading: "lazy",
                  src: "/images/design/guy-banner.svg",
                  alt: ""
                }),
                _react2.default.createElement(
                  "span",
                  null,
                  _react2.default.createElement(
                    "a",
                    { href: "tel:+41615112244" },
                    "061 511 22 44"
                  )
                )
              ),
              currentPlace ? _react2.default.createElement(
                "p",
                { className: "location" },
                _react2.default.createElement("img", { loading: "lazy", src: "/images/design/location.svg" }),
                currentPlace.descriptionBranch,
                _react2.default.createElement("br", null),
                currentPlace.address,
                _react2.default.createElement("br", null),
                currentPlace.zip + " " + currentPlace.city
              ) : active.place ? _react2.default.createElement(
                "p",
                { className: "location" },
                _react2.default.createElement("img", { loading: "lazy", src: "/images/design/location.svg" }),
                active.place.descriptionBranch,
                _react2.default.createElement("br", null),
                active.place.address,
                _react2.default.createElement("br", null),
                active.place.zip + " " + active.place.city
              ) : ""
            ),
            _react2.default.createElement(
              "div",
              { className: "col-xs-6 col-sm-4 col-lg-2 proven-text" },
              _react2.default.createElement(
                "div",
                { className: "right-part" },
                domain === "ch" && _react2.default.createElement(
                  "div",
                  { className: "provenexpert" },
                  _react2.default.createElement(
                    "a",
                    {
                      href: "https://www.provenexpert.com/de-de/ireparatur-ch-remarket-ch/?utm_source=Widget&utm_medium=Widget&utm_campaign=Widget",
                      title: "Erfahrungen & Bewertungen zu remarket.ch anzeigen",
                      rel: "noopener",
                      target: "_blank",
                      style: { textDecoration: "none" }
                    },
                    _react2.default.createElement(_reactSimpleImg.SimpleImg, {
                      src: "https://images.provenexpert.com/cb/31/0208e362264a28e99cc49dcc8520/widget_portrait_200_de_1.png",
                      srcSet: ""
                      // wrapperClassName="clearSimpleImgWrapper"
                      , alt: "Erfahrungen & Bewertungen zu remarket.ch",
                      width: "200",
                      height: "240"
                    })
                  )
                ),
                domain === "de" && _react2.default.createElement(
                  "div",
                  { className: "provenexpert" },
                  _react2.default.createElement(
                    "a",
                    {
                      href: "https://www.provenexpert.com/remarket-de-recommerce-gmbh/?utm_source=Widget&utm_medium=Widget&utm_campaign=Widget",
                      title: "Erfahrungen & Bewertungen zu remarket.de anzeigen",
                      rel: "noopener",
                      target: "_blank",
                      style: { textDecoration: "none" }
                    },
                    _react2.default.createElement(_reactSimpleImg.SimpleImg, {
                      src: "https://images.provenexpert.com/e1/69/ef4bafa499aa5b40ff5dbff9b780/widget_portrait_200_de_1.png",
                      srcSet: "",
                      alt: "Erfahrungen & Bewertungen zu remarket.de Recommerce GmbH",
                      width: "200",
                      height: "240",
                      style: { border: 0 }
                    })
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "footerBottom" },
          _react2.default.createElement(
            "div",
            { className: "container-fluid" },
            !window.isMobile && _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "col-sm-6 col-sm-push-6 text-right" },
                _react2.default.createElement(
                  "ul",
                  null,
                  _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/visa.svg",
                      alt: ""
                    })
                  ),
                  _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/mastercard.svg",
                      alt: ""
                    })
                  ),
                  _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/paypal.svg",
                      alt: ""
                    })
                  ),
                  domain !== "de" && _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/postfinance.svg",
                      alt: ""
                    })
                  ),
                  domain !== "de" && _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/twint.svg",
                      alt: ""
                    })
                  ),
                  domain !== "ch" && _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/stripe.svg",
                      alt: ""
                    })
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-6 col-sm-pull-6 text-left" },
                _react2.default.createElement(
                  "p",
                  { className: "initial-text" },
                  "Alle Rechte vorbehalten. Copyright by",
                  " ",
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/" },
                    domain === "ch" ? "remarket.ch" : "remarket.de"
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-12" },
                _react2.default.createElement(
                  "div",
                  { className: "seo-wrap" },
                  _react2.default.createElement(
                    "div",
                    { className: "seo" },
                    FOOTER_SEO_CH
                  ),
                  _react2.default.createElement("button", {
                    className: "read-more-button",
                    onClick: _seoText.seoReadMoreClick
                  })
                )
              )
            ),
            window.isMobile && _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement("hr", { color: "#D5DDE0" }),
              _react2.default.createElement(
                "div",
                {
                  className: "col-sm-6 col-sm-pull-6 d-flex justify-content-center",
                  style: { justifyContent: "center", display: "flex" }
                },
                _react2.default.createElement(
                  "p",
                  { className: "initial-text" },
                  "Alle Rechte vorbehalten. Copyright by",
                  " ",
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: "/" },
                    domain === "ch" ? "remarket.ch" : "remarket.de"
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                {
                  className: "col-sm-6 col-sm-push-6",
                  style: { justifyContent: "center", display: "flex" }
                },
                _react2.default.createElement(
                  "ul",
                  null,
                  _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/visa.svg",
                      alt: ""
                    })
                  ),
                  _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/mastercard.svg",
                      alt: ""
                    })
                  ),
                  _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/paypal.svg",
                      alt: ""
                    })
                  ),
                  domain !== "de" && _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/postfinance.svg",
                      alt: ""
                    })
                  ),
                  domain !== "de" && _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/twint.svg",
                      alt: ""
                    })
                  ),
                  domain !== "ch" && _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement("img", {
                      loading: "lazy",
                      src: "/images/design/stripe.svg",
                      alt: ""
                    })
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-12" },
                _react2.default.createElement(
                  "div",
                  { className: "seo-wrap" },
                  _react2.default.createElement(
                    "div",
                    { className: "seo" },
                    FOOTER_SEO_CH
                  ),
                  _react2.default.createElement("button", {
                    className: "read-more-button",
                    onClick: _seoText.seoReadMoreClick
                  })
                )
              )
            )
          )
        )
      );
    }
  }]);
  return Footer;
}(_react.Component);

function mapStateToProps(state) {
  return {
    places: state.places.currentLocation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shopActions: (0, _redux.bindActionCreators)(shopActions, dispatch),
    placesActions: (0, _redux.bindActionCreators)(placesActions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactI18next.withTranslation)()(Footer));

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

/***/ 800:
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

var _customerAboutUs = __webpack_require__(1250);

var _customerAboutUs2 = _interopRequireDefault(_customerAboutUs);

var _banner = __webpack_require__(1249);

var _banner2 = _interopRequireDefault(_banner);

var _numbers = __webpack_require__(1501);

var _numbers2 = _interopRequireDefault(_numbers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RepairPage = function (_Component) {
    (0, _inherits3.default)(RepairPage, _Component);

    function RepairPage(props) {
        (0, _classCallCheck3.default)(this, RepairPage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RepairPage.__proto__ || Object.getPrototypeOf(RepairPage)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(RepairPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $('button.repairNow').on('click', function () {
                return $("html, body").animate({ scrollTop: $('.select-device').offset().top - 130 }, 600);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'repair-page' },
                _react2.default.createElement(
                    'section',
                    { className: 'top' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-sm-5' },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'title' },
                                    'Smartphone & Tablet'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'title' },
                                    'Express Reparatur'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'text' },
                                    'Wir reparieren Ihr Apple iPhone, Apple iPad und Samsung Galaxy in Basel Express oder senden Sie uns Ihr defektes Ger\xE4t kostenlos per Post zu.'
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement('span', { className: 'check-icon' }),
                                        'Ohne Datenverlust'
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement('span', { className: 'check-icon' }),
                                        'Verwendung von originalen Ersatzteile'
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement('span', { className: 'check-icon' }),
                                        'Ohne Terminvereinbarung'
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement('span', { className: 'check-icon' }),
                                        '1 Jahr Garantie auf die Arbeit und Ersatzteile'
                                    )
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn repairNow' },
                                    'Jetzt reparieren',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'phone' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/devices_repair.png' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'bigTriangle' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/company-triangle.svg', alt: '' })
                    ),
                    _react2.default.createElement('img', { loading: 'lazy', className: 'grayTriangle', src: '/images/design/company-triangle-gray.svg', alt: '' })
                ),
                this.props.children,
                _react2.default.createElement(
                    'section',
                    { className: 'why-we-different' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair_different_bg.png', className: 'image-phone', alt: '' }),
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair_different_bg_rect.svg', className: 'image-rect', alt: '' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-12' },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'category' },
                                    'Ihre Vorteile'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'title' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'warum wir anderst',
                                        _react2.default.createElement('br', null),
                                        ' sind'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-7' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row wrap-items' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-6 item-why' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon.svg', alt: '' }),
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon-white.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            'h4',
                                            null,
                                            'Die schnelle iPhone Reparatur in Basel'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'In unserem Repair-Center in Basel reparieren wir Ihr iPhone auch ohne Termin in k\xFCrzester Zeit fachgerecht und kosteng\xFCnstig mit Originalteilen. Nutzen Sie unsere professionelle Express Reparatur und profitieren Sie von unserem Expertenwissen zu allen iPhone Modellen. Ein Jahr Garantie auf alle Leistungen sowie eine schnelle und unkomplizierte Abwicklung unterstreichen unsere hochwertige Arbeit.'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'arrow' },
                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-6 item-why' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon.svg', alt: '' }),
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon-white.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            'h4',
                                            null,
                                            'Ihre Vorteile bei remarket.ch'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Ob Firmenkunde oder Privatkunde \u2013 bei remarket.ch profitieren Sie von einer schnellen, unkomplizierten und fachgerechten Abwicklung. Auch ohne Terminvereinbarung helfen wir Ihnen in unserer Klinik f\xFCr Smartphones in k\xFCrzester Zeit weiter. Bei allen Reparaturarbeiten legen wir gr\xF6ssten Wert darauf, dass alle Daten Ihrer Ger\xE4te erhalten bleiben.'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'arrow' },
                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-6 item-why' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon.svg', alt: '' }),
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon-white.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            'h4',
                                            null,
                                            'Attraktive Vorteile f\xFCr Firmenkunden'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Firmenkunden profitieren bei remarket.ch nicht nur von fachgerechten Reparaturen, sondern auch von einer schnellen und anwenderfreundlichen Abwicklung. In Ihrem Kundenkonto k\xF6nnen Sie jederzeit alle aktuellen Reparaturen einsehen und nachverfolgen. Dar\xFCber hinaus k\xF6nnen Sie bei uns bequem per Rechnung zahlen und m\xFCssen nicht in Vorkasse gehen.'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'arrow' },
                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-6 item-why' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon.svg', alt: '' }),
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon-white.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            'h4',
                                            null,
                                            'Ihr Spezialist bei Wassersch\xE4den'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Wassersch\xE4den am Smartphone oder Tablet sind besonders \xE4rgerlich. Die Experten von remarket.ch kennen sich dank jahrelanger Erfahrung mit Wassersch\xE4den aus und retten Ihre Daten fachgerecht und z\xFCgig, wenn das Ger\xE4t mit Wasser in Ber\xFChrung gekommen ist. Dar\xFCber hinaus erstellen wir gerne professionelle Versicherungsgutachten f\xFCr Ihren Wasserschaden.'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'arrow' },
                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-6 item-why' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon.svg', alt: '' }),
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon-white.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            'h4',
                                            null,
                                            'Wir helfen bei Batterieproblemen'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Die Batterie geh\xF6rt leider immer noch zu den Schwachstellen von Smartphones und Tablets. Bei remarket.ch haben wir uns daher darauf spezialisiert, Batterien schnell, fachgerecht und kosteng\xFCnstig auszutauschen. Wir pr\xFCfen die aktuelle Kapazit\xE4t Ihrer Batterie kostenlos und beraten Sie kompetent zu m\xF6glichen L\xF6sungen.'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'arrow' },
                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-6 item-why' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon.svg', alt: '' }),
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/time-icon-white.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            'h4',
                                            null,
                                            'Smartphone-, Tablet- und Macbook-Zubeh\xF6r'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Bei remarket.ch f\xFChren wir ein grosses Sortiment an technisch hochwertigem Zubeh\xF6r f\xFCr Smartphones, Tablets und Macbooks. Wir haben nicht nur mehr als 30.000 Etuis auf Lager, sondern bieten auch Kabel und Kopfh\xF6rer sowie Schutzh\xFCllen f\xFCr das iPhone und Taschen f\xFCr Macbooks an.'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'arrow' },
                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(_customerAboutUs2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container banner-area' },
                    _react2.default.createElement(_banner2.default, null)
                ),
                _react2.default.createElement(_numbers2.default, null)
            );
        }
    }]);
    return RepairPage;
}(_react.Component);

exports.default = RepairPage;

/***/ }),

/***/ 850:
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

var _headerMobile = __webpack_require__(932);

var _headerMobile2 = _interopRequireDefault(_headerMobile);

var _repairPage = __webpack_require__(800);

var _repairPage2 = _interopRequireDefault(_repairPage);

var _footer = __webpack_require__(1103);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RepairPageMobile = function (_Component) {
    (0, _inherits3.default)(RepairPageMobile, _Component);

    function RepairPageMobile() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RepairPageMobile);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RepairPageMobile.__proto__ || Object.getPrototypeOf(RepairPageMobile)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RepairPageMobile, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_headerMobile2.default, { menu: true,
                    title: 'repair' }),
                _react2.default.createElement(_repairPage2.default, { children: this.props.children }),
                _react2.default.createElement(_footer2.default, null)
            );
        }
    }]);
    return RepairPageMobile;
}(_react.Component);

exports.default = RepairPageMobile;

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