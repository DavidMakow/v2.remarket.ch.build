webpackJsonp([64],{

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(316);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(334);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(206);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _basket = __webpack_require__(327);

var basketActions = _interopRequireWildcard(_basket);

var _addToBasketEffect = __webpack_require__(950);

var _addToBasketEffect2 = _interopRequireDefault(_addToBasketEffect);

var _helpersFunction = __webpack_require__(315);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WishlistPage = function WishlistPage(props) {
    var wishlistData = props.wishlistData,
        basketData = props.basketData,
        basketActions = props.basketActions;

    var _useState = (0, _react.useState)('devices'),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        activeTab = _useState2[0],
        setActiveTab = _useState2[1];

    var handleChangeTab = function handleChangeTab(e) {
        var activeNavItem = e.currentTarget.getAttribute('data-type');
        setActiveTab(activeNavItem);
    };

    var handleRemoveModelFromWishlist = function handleRemoveModelFromWishlist(e, item) {
        e.stopPropagation();
        e.preventDefault();
        var newWishlistData = wishlistData.filter(function (itemWishlist) {
            return itemWishlist.shortcode != item.shortcode;
        });
        basketActions.changeWishlisteData(newWishlistData);
    };

    var addModelToBasket = function addModelToBasket(e, item) {
        e.stopPropagation();
        e.preventDefault();
        var newBasketData = null;
        var status = '';
        if (basketData.every(function (itemBasket) {
            return itemBasket.id != item.id;
        })) {
            newBasketData = [].concat((0, _toConsumableArray3.default)(basketData), [item]);
            status = 'add';
        } else {
            newBasketData = basketData.filter(function (itemBasket) {
                return itemBasket.shortcode != item.shortcode;
            });
            status = 'remove';
        }

        basketActions.changeBasketData(newBasketData);

        var brands = void 0,
            brand = void 0,
            category = void 0;
        if (item.productTypeId !== 7) {
            brands = item.criterias.find(function (item) {
                return item.id === 'manufacturer';
            }).values, brand = brands.length ? brands[0].name : "", category = item.categoryName;
        } else {
            brand = item.deviceName, category = '';
        }

        if (status === 'add') {
            gtag('event', 'add_to_cart', {
                "items": [{
                    "id": item.shortcode,
                    "list_name": "Kaufen",
                    "quantity": 1,
                    "price": item.discountPrice || item.price,
                    "name": item.descriptionLong || item.model || '',
                    "brand": brand,
                    "category": category
                }]
            });
            if (!window.isMobile) {
                basketActions.basketAddEffect(_react2.default.createElement(_addToBasketEffect2.default, { startPosition: $(e.target).offset(),
                    image: item.deviceImages.mainImg.src,
                    basketType: 'kaufen' }));
                setTimeout(function () {
                    basketActions.basketAddEffect(null);
                }, 2000);
            }
        }
        if (status === 'remove') {
            gtag('event', 'remove_from_cart', {
                "items": [{
                    "id": item.shortcode,
                    "list_name": "Kaufen",
                    "quantity": 1,
                    "price": item.discountPrice || item.price,
                    "name": item.descriptionLong || item.model || '',
                    "brand": brand,
                    "category": category
                }]
            });
        }
        basketData.map(function (el) {
            return snaptr('track', 'ADD_CART', {
                'shortcode': el.shortcode,
                'name': el.name
            });
        });
    };

    var handleOpenDeviceDetailPage = function handleOpenDeviceDetailPage(deviceName, modelName, capacity, color, shortcode) {
        window.open('//' + window.location.host + '/kaufen/detail/' + deviceName + '/' + modelName + '/' + capacity + '/' + color + '/' + shortcode, '_self');
    };

    var handleOpenProductDetailPage = function handleOpenProductDetailPage(deviceName, modelName, shortcode) {
        window.open('//' + window.location.host + '/kaufen/detail/zubehoer/' + deviceName + '/' + modelName + '/' + shortcode, '_self');
    };

    return _react2.default.createElement(
        'div',
        { className: 'wishlist-page' },
        _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement(
                'div',
                { className: 'navigation-row' },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/house-icon.svg', alt: '' })
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    'Wunschliste'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'wishlist-wrapper' },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Meine Wunschliste'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'wishlist-tabs-button' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'offer-tab-buttons' },
                        _react2.default.createElement(
                            'li',
                            {
                                className: activeTab === 'devices' ? 'active' : '',
                                'data-type': 'devices',
                                onClick: function onClick(e) {
                                    return handleChangeTab(e);
                                }
                            },
                            'Ger\xE4te'
                        ),
                        _react2.default.createElement(
                            'li',
                            {
                                className: activeTab === 'products' ? 'active' : '',
                                'data-type': 'products',
                                onClick: function onClick(e) {
                                    return handleChangeTab(e);
                                }
                            },
                            'Produkte'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'items-bar' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'name' },
                        'Produktname'
                    ),
                    _react2.default.createElement(
                        'h3',
                        { className: 'price' },
                        'Einzelpreis'
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Verf\xFCgbarkeit'
                    ),
                    _react2.default.createElement('div', { className: 'empty' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'items' },
                    activeTab === 'devices' && wishlistData.filter(function (item) {
                        return item.productTypeId === 7;
                    }).map(function (el, i) {
                        var modelName = el.model.split(" ").join('-').toLowerCase() || 'modelName',
                            deviceName = el.deviceName.toLowerCase().replace(/ /g, '-') || 'deviceName',
                            color = el.color ? el.color.toLowerCase() : 'color',
                            capacity = el.capacity ? el.capacity.toLowerCase() : 'capacity';

                        return _react2.default.createElement(
                            'div',
                            { className: 'item', key: 'wishlist-devices-' + i, onClick: function onClick(e) {
                                    return handleOpenDeviceDetailPage(deviceName, modelName, capacity, color, el.shortcode);
                                } },
                            _react2.default.createElement(
                                'button',
                                { className: 'icon-cross' },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/icon-cross.svg', alt: '', onClick: function onClick(e) {
                                        return handleRemoveModelFromWishlist(e, el);
                                    } })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'item-img' },
                                _react2.default.createElement('img', { loading: 'lazy', src: el.deviceImages ? el.deviceImages.mainImg.src : '/images/design/Product.svg', alt: '' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'item-description' },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    el.model,
                                    ', ',
                                    el.color,
                                    ', ',
                                    el.capacity
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'price' },
                                    el.discountPrice ? (0, _helpersFunction.formatPrice)(el.discountPrice) : (0, _helpersFunction.formatPrice)(el.price),
                                    ' ',
                                    window.currencyValue
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'stock-status' },
                                    el.statusId === 1 ? 'Auf Lager' : 'Nicht auf Lager'
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn addToBasket', onClick: function onClick(e) {
                                        return addModelToBasket(e, el);
                                    } },
                                'ZUM WARENKORB HINZUF\xDCGEN'
                            )
                        );
                    }),
                    activeTab === 'products' && wishlistData.filter(function (item) {
                        return item.productTypeId !== 7;
                    }).map(function (el, i) {
                        var modelName = el.model.split(" ").join('-').toLowerCase().replace(/\//g, '--'),
                            deviceName = el.deviceName.toLowerCase().replace(/ /g, '-');
                        return _react2.default.createElement(
                            'div',
                            { className: 'item', key: 'wishlist-products-' + i, onClick: function onClick(e) {
                                    return handleOpenProductDetailPage(deviceName, modelName, el.shortcode);
                                } },
                            _react2.default.createElement(
                                'button',
                                { className: 'icon-cross' },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/icon-cross.svg', alt: '', onClick: function onClick(e) {
                                        return handleRemoveModelFromWishlist(e, el);
                                    } })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'item-img' },
                                _react2.default.createElement('img', { loading: 'lazy', src: el.deviceImages ? el.deviceImages.mainImg.src : '/images/design/Product.svg', alt: '' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'item-description' },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    el.model
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'price' },
                                    el.discountPrice ? (0, _helpersFunction.formatPrice)(el.discountPrice) : (0, _helpersFunction.formatPrice)(el.price),
                                    ' ',
                                    window.currencyValue
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'stock-status' },
                                    el.quantity > 0 ? 'Auf Lager' : 'Nicht auf Lager'
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn addToBasket', onClick: function onClick(e) {
                                        return addModelToBasket(e, el);
                                    } },
                                'ZUM WARENKORB HINZUF\xDCGEN'
                            )
                        );
                    })
                )
            )
        )
    );
};

function mapStateToProps(state) {
    return {
        wishlistData: state.basket.wishlistData,
        basketData: state.basket.basketData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        basketActions: (0, _redux.bindActionCreators)(basketActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WishlistPage);

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
  , LIBRARY        = __webpack_require__(317)
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
  , toPrimitive    = __webpack_require__(318)
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
  , toPrimitive    = __webpack_require__(318)
  , createDesc     = __webpack_require__(152)
  , _create        = __webpack_require__(319)
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
  __webpack_require__(320).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(317)){
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
  , gOPS    = __webpack_require__(320)
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
$export($export.S, 'Object', {create: __webpack_require__(319)});

/***/ }),

/***/ 950:
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

var AddToBasketEffect = function (_Component) {
    (0, _inherits3.default)(AddToBasketEffect, _Component);

    function AddToBasketEffect(props) {
        (0, _classCallCheck3.default)(this, AddToBasketEffect);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AddToBasketEffect.__proto__ || Object.getPrototypeOf(AddToBasketEffect)).call(this, props));

        _this.state = {};

        return _this;
    }

    (0, _createClass3.default)(AddToBasketEffect, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var elem = document.querySelector('.addToBasketEffect');
            var startPosition = this.props.startPosition;

            var endPosition = this.getEndPosition();

            elem.style.top = startPosition.top + 'px';
            elem.style.left = startPosition.left + 'px';
            setTimeout(function () {
                elem.style.transition = 'all 2s';
                elem.style.top = endPosition.top - 20 + 'px';
                elem.style.left = endPosition.left - 19 + 'px';
                elem.style.transform = 'scale(.3)';
            }, 0);
        }
    }, {
        key: 'getEndPosition',
        value: function getEndPosition() {
            if (this.props.basketType !== 'kaufen') {
                return $('.cart-total-verkaufen').offset();
            }
            var end = $('.cart-total-kaufen');
            var endPosition = end.offset();
            if (endPosition.top == 0 && endPosition.left == 0) {
                var otherEnd = $($('.cart-total-kaufen')[1]);
                endPosition = otherEnd.offset();
            }
            return endPosition;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'addToBasketEffect' },
                _react2.default.createElement('img', { loading: 'lazy', src: this.props.image, alt: '' })
            );
        }
    }]);
    return AddToBasketEffect;
}(_react.Component);

AddToBasketEffect.propTypes = {};
AddToBasketEffect.defaultProps = {};

exports.default = AddToBasketEffect;

/***/ })

});