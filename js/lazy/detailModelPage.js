webpackJsonp([10],{

/***/ 1000:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _prodInvariant = __webpack_require__(906);

var ReactCurrentOwner = __webpack_require__(935);
var REACT_ELEMENT_TYPE = __webpack_require__(975);

var getIteratorFn = __webpack_require__(976);
var invariant = __webpack_require__(905);
var KeyEscapeUtils = __webpack_require__(1001);
var warning = __webpack_require__(904);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (true) {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
           true ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (true) {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = " It looks like you're using an element created by a different " + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ?  true ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;

/***/ }),

/***/ 1001:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),

/***/ 1002:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var ReactElement = __webpack_require__(900);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (true) {
  var ReactElementValidator = __webpack_require__(977);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;

/***/ }),

/***/ 1003:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _prodInvariant = __webpack_require__(906);

var ReactPropTypeLocationNames = __webpack_require__(1004);
var ReactPropTypesSecret = __webpack_require__(1005);

var invariant = __webpack_require__(905);
var warning = __webpack_require__(904);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && Object({"MIX_IS_BUY_COUPON":"false","MIX_IS_SELL_COUPON":"true","NODE_ENV":"development"}) && "development" === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(948);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ?  true ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
       true ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (true) {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(948);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

         true ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(335)))

/***/ }),

/***/ 1004:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (true) {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;

/***/ }),

/***/ 1005:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ 1006:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _require = __webpack_require__(900),
    isValidElement = _require.isValidElement;

var factory = __webpack_require__(1007);

module.exports = factory(isValidElement);

/***/ }),

/***/ 1007:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.
var factory = __webpack_require__(341);
module.exports = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factory(isValidElement, throwOnDirectAccess);
};


/***/ }),

/***/ 1008:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



module.exports = '15.7.0';


/***/ }),

/***/ 1009:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _require = __webpack_require__(973),
    Component = _require.Component;

var _require2 = __webpack_require__(900),
    isValidElement = _require2.isValidElement;

var ReactNoopUpdateQueue = __webpack_require__(974);
var factory = __webpack_require__(340);

module.exports = factory(Component, isValidElement, ReactNoopUpdateQueue);

/***/ }),

/***/ 1010:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


var _prodInvariant = __webpack_require__(906);

var ReactElement = __webpack_require__(900);

var invariant = __webpack_require__(905);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ?  true ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;

/***/ }),

/***/ 1011:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isPlainObject = __webpack_require__(220);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _prefix = __webpack_require__(1012);

var _prefix2 = _interopRequireDefault(_prefix);

var _supports = __webpack_require__(1013);

var _supports2 = _interopRequireDefault(_supports);

var _constants = __webpack_require__(1035);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toKebabCase = function toKebabCase(string) {
  return string.replace(/([A-Z])/g, function ($1) {
    return '-' + $1.toLowerCase();
  });
};

var applyPrefixes = function applyPrefixes(object) {
  if (!(0, _isPlainObject2.default)(object)) {
    return object;
  }

  var value = void 0;

  return Object.keys(object).reduce(function (styleObject, originalKey) {
    var key = originalKey;

    value = object[key];

    if ((0, _isPlainObject2.default)(value)) {
      return _extends({}, styleObject, _defineProperty({}, key, applyPrefixes(value)));
    }

    if (_constants.CSS_PROPERTIES.indexOf(key) !== -1 && !(0, _supports2.default)(toKebabCase(key), value)) {
      key = '' + _prefix2.default.js + key.charAt(0).toUpperCase() + key.slice(1);
    }

    if (originalKey === 'display' && object[originalKey] === 'flex' && !(0, _supports2.default)('display', 'flex')) {
      return _extends({}, styleObject, _defineProperty({}, key, _prefix2.default.js === 'ms' ? '-ms-flexbox' : _prefix2.default.css + 'flex'));
    }

    if (originalKey === 'transition') {
      var animatableValuesObject = _constants.ANIMATABLE_VALUES.reduce(function (animatableValues, animatableValue) {
        var kebabValue = toKebabCase(animatableValue);
        var re = new RegExp(kebabValue, 'g');

        if (re.test(object[originalKey]) && !(0, _supports2.default)(kebabValue)) {
          var cleanValue = object[originalKey].replace(re, '' + _prefix2.default.css + kebabValue);

          return _extends({}, animatableValues, _defineProperty({}, key, cleanValue));
        }

        return animatableValues;
      }, {});

      return _extends({}, styleObject, animatableValuesObject);
    }

    return _extends({}, styleObject, _defineProperty({}, key, value));
  }, {});
};

exports.default = applyPrefixes;

/***/ }),

/***/ 1012:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _browserOrNode = __webpack_require__(949);

var prefixObject = {
  css: '',
  js: ''
};

if (_browserOrNode.isBrowser) {
  var styles = window.getComputedStyle(document.documentElement);
  var prefixString = Array.prototype.slice.call(styles).join('');
  var standardPrefixString = prefixString.match(/-(moz|webkit|ms)-/);
  var operaPrefixString = prefixString.match(styles.OLink === '' && ['', 'o']);
  var prefixMatch = standardPrefixString || operaPrefixString;

  var prefix = prefixMatch ? prefixMatch[1] : '';

  prefixObject = {
    css: '-' + prefix + '-',
    js: prefix
  };

  if (prefixObject.js !== 'ms') {
    prefixObject = _extends({}, prefixObject, {
      js: '' + prefixObject.js.charAt(0).toUpperCase() + prefixObject.js.slice(1)
    });
  }
}

exports.default = prefixObject;

/***/ }),

/***/ 1013:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browserOrNode = __webpack_require__(949);

var _camelCase = __webpack_require__(1014);

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isSupported = function isSupported(property, value) {
  if (_browserOrNode.isBrowser) {
    if ('CSS' in window && 'supports' in window.CSS) {
      return window.CSS.supports(property, value);
    }

    if ('supportsCSS' in window) {
      return window.supportsCSS(property, value);
    }

    var camelCaseProperty = (0, _camelCase2.default)(property);

    var element = document.createElement('div');
    var support = camelCaseProperty in element.style;

    element.style.cssText = property + ':' + value;

    return support && element.style[camelCaseProperty] !== '';
  }
  return false;
};

exports.default = isSupported;

/***/ }),

/***/ 1014:
/***/ (function(module, exports, __webpack_require__) {

var capitalize = __webpack_require__(1015),
    createCompounder = __webpack_require__(1026);

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

module.exports = camelCase;


/***/ }),

/***/ 1015:
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(936),
    upperFirst = __webpack_require__(1019);

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;


/***/ }),

/***/ 1016:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(221),
    arrayMap = __webpack_require__(1017),
    isArray = __webpack_require__(1018),
    isSymbol = __webpack_require__(903);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ 1017:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ 1018:
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ 1019:
/***/ (function(module, exports, __webpack_require__) {

var createCaseFirst = __webpack_require__(1020);

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = upperFirst;


/***/ }),

/***/ 1020:
/***/ (function(module, exports, __webpack_require__) {

var castSlice = __webpack_require__(1021),
    hasUnicode = __webpack_require__(978),
    stringToArray = __webpack_require__(1023),
    toString = __webpack_require__(936);

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

module.exports = createCaseFirst;


/***/ }),

/***/ 1021:
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(1022);

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;


/***/ }),

/***/ 1022:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),

/***/ 1023:
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(1024),
    hasUnicode = __webpack_require__(978),
    unicodeToArray = __webpack_require__(1025);

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;


/***/ }),

/***/ 1024:
/***/ (function(module, exports) {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;


/***/ }),

/***/ 1025:
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;


/***/ }),

/***/ 1026:
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(1027),
    deburr = __webpack_require__(1028),
    words = __webpack_require__(1031);

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;


/***/ }),

/***/ 1027:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),

/***/ 1028:
/***/ (function(module, exports, __webpack_require__) {

var deburrLetter = __webpack_require__(1029),
    toString = __webpack_require__(936);

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;


/***/ }),

/***/ 1029:
/***/ (function(module, exports, __webpack_require__) {

var basePropertyOf = __webpack_require__(1030);

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

module.exports = deburrLetter;


/***/ }),

/***/ 1030:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;


/***/ }),

/***/ 1031:
/***/ (function(module, exports, __webpack_require__) {

var asciiWords = __webpack_require__(1032),
    hasUnicodeWord = __webpack_require__(1033),
    toString = __webpack_require__(936),
    unicodeWords = __webpack_require__(1034);

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = words;


/***/ }),

/***/ 1032:
/***/ (function(module, exports) {

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;


/***/ }),

/***/ 1033:
/***/ (function(module, exports) {

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;


/***/ }),

/***/ 1034:
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;


/***/ }),

/***/ 1035:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ANIMATABLE_VALUES = exports.ANIMATABLE_VALUES = ['columnCount', 'columnGap', 'columnRule', 'columnRuleColor', 'columnRuleWidth', 'columns', 'flex', 'flexBasis', 'flexGrow', 'flexShrink', 'order', 'perspective', 'perspectiveOrigin', 'perspectiveOriginX', 'perspectiveOriginY', 'scrollSnapCoordinate', 'scrollSnapDirection', 'textDecoration', 'textDecorationColor', 'transform', 'transformOrigin', 'transformOriginX', 'transformOriginY', 'transformOriginZ', 'transformStyle'];

var CSS_PROPERTIES = exports.CSS_PROPERTIES = ['alignContent', 'alignItems', 'alignSelf', 'animation', 'animationDelay', 'animationDirection', 'animationDuration', 'animationFillMode', 'animationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'appearance', 'aspectRatio', 'backfaceVisibility', 'backgroundClip', 'borderImage', 'borderImageSlice', 'boxShadow', 'columnCount', 'columnFill', 'columnGap', 'columnRule', 'columnRuleColor', 'columnRuleStyle', 'columnRuleWidth', 'columnSpan', 'columnWidth', 'columns', 'flex', 'flexBasis', 'flexDirection', 'flexFlow', 'flexGrow', 'flexShrink', 'flexWrap', 'fontFeatureSettings', 'fontKearning', 'fontVariantLigatures', 'justifyContent', 'grid', 'gridArea', 'gridAutoColumns', 'gridAutoFlow', 'gridAutoRows', 'gridColumn', 'gridColumnEnd', 'gridColumnStart', 'gridRow', 'gridRowEnd', 'gridRowStart', 'gridTemplate', 'gridTemplateAreas', 'gridTemplateColumns', 'gridTemplateRows', 'hyphens', 'lineBreak', 'perspective', 'perspectiveOrigin', 'perspectiveOriginX', 'perspectiveOriginY', 'rubyPosition', 'scrollSnapCoordinate', 'scrollSnapDestination', 'scrollSnapPoints', 'scrollSnapPointsX', 'scrollSnapPointsY', 'scrollSnapType', 'tabSize', 'textDecoration', 'textDecorationColor', 'textDecorationLine', 'textDecorationStyle', 'textOrientation', 'textSizeAdjust', 'transform', 'transition', 'transformOrigin', 'transformOriginX', 'transformOriginY', 'transformOriginZ', 'transformStyle', 'transitionProperty', 'transitionDuration', 'transitionTimingFunction', 'transitionDelay', 'userModify', 'userSelect'];

/***/ }),

/***/ 1037:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(871);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
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

/***/ }),

/***/ 1041:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListSimilarItems = undefined;

var _toConsumableArray2 = __webpack_require__(316);

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

var _reactRedux = __webpack_require__(313);

var _reactRouter = __webpack_require__(206);

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _redux = __webpack_require__(148);

var _basket = __webpack_require__(327);

var basketActions = _interopRequireWildcard(_basket);

var _addToBasketEffect = __webpack_require__(950);

var _addToBasketEffect2 = _interopRequireDefault(_addToBasketEffect);

var _helpersFunction = __webpack_require__(315);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListSimilarItems = exports.ListSimilarItems = function (_Component) {
    (0, _inherits3.default)(ListSimilarItems, _Component);

    function ListSimilarItems(props) {
        (0, _classCallCheck3.default)(this, ListSimilarItems);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ListSimilarItems.__proto__ || Object.getPrototypeOf(ListSimilarItems)).call(this, props));

        _this.gtagEnhancedEcommerce = function (item, tag) {
            var brands = item.criterias.find(function (item) {
                return item.id === 'manufacturer';
            }).values,
                brand = brands.length ? brands[0].name : "",
                items = [{
                "id": item.shortcode,
                "name": item.descriptionLong || item.model || '',
                "list_name": "Kaufen",
                "quantity": 1,
                "brand": brand,
                "price": item.discountPrice || item.price,
                "category": item.categoryName
            }];

            if (tag == 'select_content') {
                gtag('event', tag, {
                    "content_type": "product",
                    "items": items
                });

                var gtagData = { "category": item.categoryName };
                window.localStorage.setItem('gtag', JSON.stringify(gtagData));
            } else {
                gtag('event', tag, {
                    "items": items
                });
            }
        };

        _this.clickOnLink = function (e, item) {
            if (e.target.tagName === "BUTTON") {
                e.preventDefault();
            } else {
                if (window.isGoogleConnection) _this.gtagEnhancedEcommerce(item, 'select_content');
            }
        };

        _this.state = {};
        _this.mapSimilarItems = _this.mapSimilarItems.bind(_this);
        _this.addModelToBasket = _this.addModelToBasket.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ListSimilarItems, [{
        key: 'addModelToBasket',
        value: function addModelToBasket(e, model) {
            var _this2 = this;

            var status = e.target.getAttribute('data-status'),
                basketData = this.props.basketData,
                newBasketData = null,
                accessoriesDetailPage = this.props.accessoriesDetailPage,
                productTypeId = accessoriesDetailPage ? 3 : 7;


            if (basketData.every(function (item) {
                return item.id != model.id;
            })) {
                newBasketData = [].concat((0, _toConsumableArray3.default)(basketData), [model]);
            } else {
                newBasketData = basketData.filter(function (item) {
                    return item.shortcode != model.shortcode && item.productTypeId == productTypeId;
                });
            }

            this.props.basketActions.changeBasketData(newBasketData);

            if (status === 'out') {
                if (window.isGoogleConnection) this.gtagEnhancedEcommerce(model, 'add_to_cart');
                if (!window.isMobile) {
                    this.props.basketActions.basketAddEffect(_react2.default.createElement(_addToBasketEffect2.default, { startPosition: $(e.target).offset(),
                        image: model.colorImage,
                        basketType: 'kaufen' }));
                    setTimeout(function () {
                        _reactRouter.browserHistory.push('/warenkorb');
                        _this2.props.basketActions.basketAddEffect(null);
                    }, 2000);
                } else _reactRouter.browserHistory.push('/warenkorb');
            }
        }
    }, {
        key: 'mapSimilarItems',
        value: function mapSimilarItems(model, i) {
            var _this3 = this;

            var url = '',
                accessoriesDetailPage = this.props.accessoriesDetailPage;


            if (accessoriesDetailPage) {
                var modelName = model.model.split(" ").join('-').toLowerCase().replace(/\//g, '--'),
                    deviceName = model.deviceName.toLowerCase().replace(/ /g, '-');

                url = '/kaufen/detail/zubehoer/' + deviceName + '/' + modelName + '/' + model.shortcode;
            } else {
                var _modelName = model.model.split(" ").join('-').toLowerCase(),
                    color = model.color.toLowerCase() || 'color',
                    capacity = model.capacity.toLowerCase() || 'capacity',
                    _deviceName = model.deviceName.replace(/ /g, '-').toLowerCase();
                url = '/kaufen/detail/' + _deviceName + '/' + _modelName + '/' + capacity + '/' + color + '/' + model.shortcode;
            }

            return _react2.default.createElement(
                'div',
                { className: 'col-md-3 col-sm-6', key: i },
                _react2.default.createElement(
                    'div',
                    { className: 'itemModelWrap' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: url,
                            onClick: function onClick(e) {
                                return _this3.clickOnLink(e, model);
                            },
                            key: i },
                        _react2.default.createElement(
                            'div',
                            { style: { width: '100%' } },
                            _react2.default.createElement(
                                'div',
                                { className: 'image' },
                                _react2.default.createElement('img', { loading: 'lazy', src: model.colorImage || model.deviceImages.mainImg.src, alt: '' })
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'modelName' },
                                model.model,
                                model.extendedTitle && ' (' + model.extendedTitle + ')'
                            ),
                            !accessoriesDetailPage && _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    { className: 'modelValues' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        model.capacity,
                                        model.capacityImage && _react2.default.createElement('img', { loading: 'lazy', src: model.capacityImage, alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        model.color,
                                        '\xA0',
                                        model.colorCode && _react2.default.createElement('span', { className: 'colorPic',
                                            style: { backgroundColor: model.colorCode } })
                                    )
                                )
                            ),
                            !accessoriesDetailPage && _react2.default.createElement(
                                'p',
                                { className: 'condition' },
                                'Zustand: ',
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    model.condition
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'bottomRow' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'col-xs-6 price' },
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'price-head' },
                                        'Preis'
                                    ),
                                    model.discountPrice && _react2.default.createElement(
                                        'p',
                                        { className: 'price-value discount-price' },
                                        (0, _helpersFunction.formatPrice)(model.discountPrice),
                                        ' ',
                                        window.currencyValue
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: model.discountPrice ? 'price-value old-price' : 'price-value' },
                                        (0, _helpersFunction.formatPrice)(model.price),
                                        ' ',
                                        window.currencyValue
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'col-xs-6 text-right' },
                                    _react2.default.createElement('button', { 'data-status': this.props.basketData.some(function (item) {
                                            return item.id === model.id;
                                        }) ? 'in' : 'out',
                                        className: 'btn addToBasket',
                                        onClick: function onClick(e) {
                                            return _this3.addModelToBasket(e, model);
                                        } })
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var similarItems = this.props.similarItems,
                settings = {
                dots: true,
                arrows: false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            };

            return _react2.default.createElement(
                'div',
                null,
                similarItems.length > 0 && _react2.default.createElement(
                    'div',
                    { className: 'listSimilarItems' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'tag' },
                        'Weitere Produkte'
                    ),
                    _react2.default.createElement(
                        'h2',
                        { className: 'head' },
                        'Folgendes k\xF6nnte Sie auch interessieren'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row wrapItems' },
                        !window.isMobile ? similarItems.map(this.mapSimilarItems) : _react2.default.createElement(
                            _reactSlick2.default,
                            settings,
                            similarItems.map(this.mapSimilarItems)
                        )
                    )
                )
            );
        }
    }]);
    return ListSimilarItems;
}(_react.Component);

ListSimilarItems.propTypes = {};
ListSimilarItems.defaultProps = {
    accessoriesDetailPage: false
};

function mapStateToProps(state) {
    return {
        basketData: state.basket.basketData
    };
}
function mapDispatchToProps(dispatch) {
    return {
        basketActions: (0, _redux.bindActionCreators)(basketActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ListSimilarItems);

/***/ }),

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

/***/ 1058:
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddToWishlistEffect = function (_Component) {
    (0, _inherits3.default)(AddToWishlistEffect, _Component);

    function AddToWishlistEffect(props) {
        (0, _classCallCheck3.default)(this, AddToWishlistEffect);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AddToWishlistEffect.__proto__ || Object.getPrototypeOf(AddToWishlistEffect)).call(this, props));

        _this.state = {};

        return _this;
    }

    (0, _createClass3.default)(AddToWishlistEffect, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var elem = document.querySelector('.addToWishlistEffect'),
                startPosition = this.props.startPosition,
                endPosition = $('.wish-total-kaufen').offset();


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
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'addToWishlistEffect' },
                _react2.default.createElement('img', { loading: 'lazy', src: this.props.image, alt: '' })
            );
        }
    }]);
    return AddToWishlistEffect;
}(_react.Component);

AddToWishlistEffect.propTypes = {};
AddToWishlistEffect.defaultProps = {};

exports.default = AddToWishlistEffect;

/***/ }),

/***/ 1062:
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

var MAGNIFY = null;

var LightboxImage = function (_Component) {
    (0, _inherits3.default)(LightboxImage, _Component);

    function LightboxImage(props) {
        (0, _classCallCheck3.default)(this, LightboxImage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LightboxImage.__proto__ || Object.getPrototypeOf(LightboxImage)).call(this, props));

        _this.state = {
            currentSrc: _this.props.src
        };

        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        _this.next = _this.next.bind(_this);
        _this.prev = _this.prev.bind(_this);
        _this.clickThumb = _this.clickThumb.bind(_this);
        _this.enableMagnify = _this.enableMagnify.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(LightboxImage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.enableMagnify();
            document.querySelector('body').addEventListener("keyup", this.handleKeyPress, { passive: true });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.querySelector('body').removeEventListener("keyup", this.handleKeyPress);
            if (MAGNIFY) MAGNIFY.destroy();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.enableMagnify();
        }
    }, {
        key: 'enableMagnify',
        value: function enableMagnify() {
            if (MAGNIFY) MAGNIFY.destroy();
            var currentImg = document.querySelector('.imgPopup'),
                width = currentImg.naturalWidth,
                height = currentImg.naturalHeight;
            if (width <= 900) {
                width = width * 3;
                height = height * 3;
                document.querySelector('.imgPopup').setAttribute('data-magnify-magnifiedwidth', width.toString());
                document.querySelector('.imgPopup').setAttribute('data-magnify-magnifiedheight', height.toString());
            }
            if (this.props.showFirstImage) MAGNIFY = $('.popup .popupContainer .mainImg .imgPopup').magnify();else if (currentImg.getAttribute('src') !== this.props.array[0].src) MAGNIFY = $('.popup .popupContainer .mainImg .imgPopup').magnify();
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(e) {
            if (e.key === "Escape") {
                this.props.close();
                e.stopPropagation();
            } else if (e.key === 'ArrowRight') {
                this.next();
                e.stopPropagation();
            } else if (e.key === 'ArrowLeft') {
                this.prev();
                e.stopPropagation();
            }
        }
    }, {
        key: 'next',
        value: function next() {
            var currentSrc = this.state.currentSrc,
                indexSrc = null;

            this.props.array.forEach(function (item, i) {
                if (item.src === currentSrc) indexSrc = i;
            });
            if (indexSrc == this.props.array.length - 1) this.setState({ currentSrc: this.props.array[0].src });else this.setState({ currentSrc: this.props.array[indexSrc + 1].src });
        }
    }, {
        key: 'prev',
        value: function prev() {
            var currentSrc = this.state.currentSrc;
            var indexSrc = null;
            this.props.array.forEach(function (item, i) {
                if (item.src === currentSrc) indexSrc = i;
            });
            if (indexSrc == 0) this.setState({ currentSrc: this.props.array[this.props.array.length - 1].src });else this.setState({ currentSrc: this.props.array[indexSrc - 1].src });
        }
    }, {
        key: 'clickThumb',
        value: function clickThumb(e) {
            var currentSrc = $(e.currentTarget).find('img').attr('src');
            this.setState({ currentSrc: currentSrc });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var currentSrc = this.state.currentSrc,
                showTextRealImage = this.props.showRealImageText && currentSrc !== this.props.array[0].src ? true : undefined;

            return _react2.default.createElement(
                'div',
                { className: 'popup' },
                _react2.default.createElement(
                    'div',
                    { className: 'popupContainer' },
                    _react2.default.createElement(
                        'span',
                        { className: 'closeLightbox', onClick: this.props.close },
                        _react2.default.createElement('i', { className: 'fa fa-times', 'aria-hidden': 'true' })
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'next', onClick: this.next },
                        _react2.default.createElement('i', { className: 'fa fa-angle-right', 'aria-hidden': 'true' })
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'prev', onClick: this.prev },
                        _react2.default.createElement('i', { className: 'fa fa-angle-left', 'aria-hidden': 'true' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'mainImg' },
                        _react2.default.createElement('img', { loading: 'lazy', className: 'imgPopup',
                            'data-magnify-src': currentSrc,
                            src: currentSrc, onClick: this.next, alt: '' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'smallPic text-right' },
                        _react2.default.createElement('div', { className: 'real-image' }),
                        _react2.default.createElement(
                            'div',
                            null,
                            this.props.array.map(function (item, i) {
                                var className = item.src == currentSrc ? "itemSmallPic current" : "itemSmallPic";
                                return _react2.default.createElement(
                                    'div',
                                    { className: className,
                                        onClick: _this2.clickThumb,
                                        key: i },
                                    _react2.default.createElement('img', { loading: 'lazy', src: item.src, alt: '' })
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);
    return LightboxImage;
}(_react.Component);

exports.default = LightboxImage;


LightboxImage.propTypes = {
    showFirstImage: _propTypes2.default.bool
};
LightboxImage.defaultProps = {
    showFirstImage: true,
    showRealImageText: false
};

/***/ }),

/***/ 1081:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ }),

/***/ 1082:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});


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

/***/ 1121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports = {};

/**
 * Loops through the collection and calls the callback for each element. if the callback returns truthy, the loop is broken and returns the same value.
 * @public
 * @param {*} collection The collection to loop through. Needs to have a length property set and have indices set from 0 to length - 1.
 * @param {function} callback The callback to be called for each element. The element will be given as a parameter to the callback. If this callback returns truthy, the loop is broken and the same value is returned.
 * @returns {*} The value that a callback has returned (if truthy). Otherwise nothing.
 */
utils.forEach = function(collection, callback) {
    for(var i = 0; i < collection.length; i++) {
        var result = callback(collection[i]);
        if(result) {
            return result;
        }
    }
};


/***/ }),

/***/ 1122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var detector = module.exports = {};

detector.isIE = function(version) {
    function isAnyIeVersion() {
        var agent = navigator.userAgent.toLowerCase();
        return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
    }

    if(!isAnyIeVersion()) {
        return false;
    }

    if(!version) {
        return true;
    }

    //Shamelessly stolen from https://gist.github.com/padolsey/527683
    var ieVersion = (function(){
        var undef,
            v = 3,
            div = document.createElement("div"),
            all = div.getElementsByTagName("i");

        do {
            div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->";
        }
        while (all[0]);

        return v > 4 ? v : undef;
    }());

    return version === ieVersion;
};

detector.isLegacyOpera = function() {
    return !!window.opera;
};


/***/ }),

/***/ 1181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__(334);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactAnimatedCss = __webpack_require__(953);

var _reactRouter = __webpack_require__(206);

var _helpersFunction = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdditionalInfoBlock = function AdditionalInfoBlock(_ref) {
    var model = _ref.model,
        deviceStatus = _ref.deviceStatus,
        basketData = _ref.basketData,
        addModelToBasket = _ref.addModelToBasket,
        domain = _ref.domain,
        warranty = _ref.warranty,
        isAccessory = _ref.isAccessory,
        deadline = _ref.deadline,
        activateCountDownCoupon = _ref.activateCountDownCoupon,
        deadlineIsActive = _ref.deadlineIsActive,
        deadlineExpired = _ref.deadlineExpired,
        deadlineTimer = _ref.deadlineTimer,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className;

    var _useState = (0, _react.useState)(3),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        month = _useState2[0],
        setMonth = _useState2[1];

    var _useState3 = (0, _react.useState)(1),
        _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
        rentMonth = _useState4[0],
        setRentMonth = _useState4[1];

    var _useState5 = (0, _react.useState)(20),
        _useState6 = (0, _slicedToArray3.default)(_useState5, 2),
        positionSlide = _useState6[0],
        setPositionSlide = _useState6[1];

    var _useState7 = (0, _react.useState)(10),
        _useState8 = (0, _slicedToArray3.default)(_useState7, 2),
        positionSlideRent = _useState8[0],
        setPositionSlideRent = _useState8[1];

    var _useState9 = (0, _react.useState)('00.00'),
        _useState10 = (0, _slicedToArray3.default)(_useState9, 2),
        monthPrice = _useState10[0],
        setMonthPrice = _useState10[1];

    var _useState11 = (0, _react.useState)(true),
        _useState12 = (0, _slicedToArray3.default)(_useState11, 2),
        firstLoaded = _useState12[0],
        setFirstLoaded = _useState12[1];

    var sellPrice = model.price;
    if (model.discountPrice) sellPrice = model.discountPrice;

    /*
    // disable this rule for swissbilling
    let showLevel = 0
    if (parseFloat(sellPrice) < 150 ) {
        showLevel = 0
    } else if (parseFloat(sellPrice) >= 150 && parseFloat(sellPrice) < 300) {
        showLevel = 1
    } else if (parseFloat(sellPrice) >= 300 && parseFloat(sellPrice) < 600) {
        showLevel = 2
    } else if (parseFloat(sellPrice) >= 600) {
        showLevel = 3
    }
    */

    var showLevel = 3;

    (0, _react.useEffect)(function () {
        setMonthPrice((sellPrice / showLevel).toFixed(2));
    }, [showLevel, sellPrice]);

    // This is for hedipay

    // if not device, use original logic
    // if (model.productTypeId !== 7 && model.productTypeId !== 4) {
    //     showLevel = 0
    // }


    function _calculateDeliveryDateShop() {
        var nowDate = new Date(),
            dayOfWeek = nowDate.getDay(),
            hour = nowDate.getHours(),
            minutes = nowDate.getMinutes(),
            deliveryDate = null,
            formatter = new Intl.DateTimeFormat("ru");
        switch (dayOfWeek) {
            case 6:
                if (hour < 18 || hour === 18 && minutes === 0) {
                    deliveryDate = formatter.format(nowDate);
                } else {
                    deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 2));
                }
                break;
            case 0:
                deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 1));
                break;
            default:
                if (hour < 18 || hour === 18 && minutes <= 30) {
                    deliveryDate = formatter.format(nowDate);
                } else {
                    deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 1));
                }

        }
        return deliveryDate;
    }
    function _calculateDeliveryDateHome() {
        var nowDate = new Date(),
            dayOfWeek = nowDate.getDay(),
            hour = nowDate.getHours(),
            minutes = nowDate.getMinutes(),
            deliveryDate = null,
            formatter = new Intl.DateTimeFormat("ru");
        if (dayOfWeek >= 1 && dayOfWeek <= 4 && hour < 15) {
            deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 1));
        }
        if (dayOfWeek >= 1 && dayOfWeek <= 3) {
            if (hour >= 15) {
                deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 2));
            }
        }
        if (dayOfWeek === 4 && hour >= 15) {
            deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 4));
        }
        if (dayOfWeek === 5) {
            if (hour < 15) deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 3));
            if (hour >= 15) deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 4));
        }
        if (dayOfWeek === 6) {
            deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 3));
        }
        if (dayOfWeek === 0) {
            deliveryDate = formatter.format(new Date(nowDate).setDate(nowDate.getDate() + 2));
        }
        return deliveryDate;
    }
    var shopDeliveryDate = _calculateDeliveryDateShop(),
        homeDeliveryDate = _calculateDeliveryDateHome();

    var handleChangeMonth = function handleChangeMonth(month) {
        setMonth(month);
        setMonthPrice((sellPrice / month).toFixed(2));
        if (parseFloat(showLevel) === 2) {
            if (month === 3) {
                setPositionSlide(20);
            } else {
                setPositionSlide(175);
            }
        } else if (parseFloat(showLevel) === 3) {
            if (month === 3) {
                setPositionSlide(20);
            } else if (month === 6) {
                setPositionSlide(95);
            } else {
                setPositionSlide(175);
            }
        }
    };

    var handleChangeRentMonth = function handleChangeRentMonth(month) {
        setRentMonth(month);
        if (month == 1) setPositionSlideRent(10);else if (month == 12) setPositionSlideRent(60 * 3);else setPositionSlideRent(60 * month / 3);
    };

    var handleAddProductToBasket = function handleAddProductToBasket(e, model) {
        addModelToBasket(e, model);
        $("#addProductToBasket").addClass('added');
        setTimeout(function () {
            $("#addProductToBasket").removeClass('added');
        }, 1800);
    };

    var handleAddModelToBasket = function handleAddModelToBasket(e, model) {
        setFirstLoaded(false);
        addModelToBasket(e, model);
    };

    return _react2.default.createElement(
        'div',
        { className: 'col-md-3 additionalInfo ' + className },
        _react2.default.createElement(
            'div',
            { className: 'additionalInfoWrapper' },
            parseFloat(showLevel) <= 0 && _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    { className: 'head head-price' },
                    'preis'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'price-wrap' },
                    model.discountPrice && _react2.default.createElement(
                        'p',
                        { className: 'price discount-price' },
                        (0, _helpersFunction.formatPrice)(model.discountPrice),
                        ' ',
                        window.currencyValue
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: model.discountPrice ? 'price old-price' : 'price', 'data-price-amount': (0, _helpersFunction.formatPrice)(model.price) },
                        (0, _helpersFunction.formatPrice)(model.price),
                        ' ',
                        window.currencyValue
                    )
                )
            ),
            parseFloat(showLevel) > 0 && _react2.default.createElement(
                'div',
                { className: 'priceInfo' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'installment-payment' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'title' },
                            'Ratenzahlung / per Rechnung',
                            _react2.default.createElement(
                                'div',
                                { className: 'question-sign' },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/bi_question-circle.svg', alt: '' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'info-icon-text' },
                                    'Sie k\xF6nnen den Kaufpreis in mehreren Monatsraten bezahlen ohne zus\xE4tzliche Zinskosten!'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            { className: 'description' },
                            'bezahlen Sie bequem monatlich'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'cost' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            (0, _helpersFunction.formatPrice)(monthPrice),
                            ' CHF'
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            'x ',
                            month,
                            ' Monate'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Sie k\xF6nnen diesen Betrag ganz einfach per Einzahlungschein oder Kreditkarte bezahlen. ',
                            _react2.default.createElement(
                                'strong',
                                null,
                                'Jetzt mit 0%-Zinszahlung!'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'per-month-tab' },
                        _react2.default.createElement(
                            'div',
                            { className: 'slide-toggle', style: { transform: 'translate(' + positionSlide + 'px, 0)' } },
                            month,
                            ' ',
                            _react2.default.createElement(
                                'span',
                                null,
                                'Monate'
                            )
                        ),
                        parseFloat(showLevel) >= 1 && _react2.default.createElement(
                            'div',
                            { className: 'month-panel', onClick: function onClick() {
                                    return handleChangeMonth(3);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'month-desc' },
                                '3'
                            )
                        ),
                        parseFloat(showLevel) >= 2 && _react2.default.createElement(
                            'div',
                            { className: 'month-panel', onClick: function onClick() {
                                    return handleChangeMonth(6);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'month-desc' },
                                '6'
                            )
                        ),
                        parseFloat(showLevel) >= 3 && _react2.default.createElement(
                            'div',
                            { className: 'month-panel', onClick: function onClick() {
                                    return handleChangeMonth(12);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'month-desc' },
                                '12'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'or-panel' },
                        _react2.default.createElement('div', { className: 'vector-3' }),
                        _react2.default.createElement(
                            'span',
                            { className: 'or' },
                            'oder'
                        ),
                        _react2.default.createElement('div', { className: 'vector-4' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'one-time-price' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'title' },
                            'Sofort-Kaufen Preis'
                        ),
                        _react2.default.createElement(
                            'h3',
                            { className: 'description' },
                            'ohne Ratenzahlung'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'price-wrap' },
                        model.discountPrice && _react2.default.createElement(
                            'p',
                            { className: 'price discount-price' },
                            (0, _helpersFunction.formatPrice)(model.discountPrice),
                            ' ',
                            window.currencyValue
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: model.discountPrice ? 'price old-price' : 'price', 'data-price-amount': (0, _helpersFunction.formatPrice)(model.price) },
                            (0, _helpersFunction.formatPrice)(model.price),
                            ' ',
                            window.currencyValue
                        )
                    )
                )
            ),
            !window.isMobile && deviceStatus.statusId === 1 && isAccessory && model.quantity > 0 && _react2.default.createElement(
                'button',
                {
                    'data-status': 'out',
                    'data-source': 'accessoryDetailPage',
                    className: 'btn addToBasket pulsing add-to-cart add-Product-To-Basket',
                    onClick: function onClick(e) {
                        return handleAddProductToBasket(e, model);
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'default' },
                    'Zum Warenkorb hinzuf\xFCgen'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'success' },
                    'Zum Warenkorb hinzuf\xFCgen'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'cart' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', null),
                        _react2.default.createElement('div', null)
                    )
                ),
                _react2.default.createElement('div', { className: 'dots' })
            ),
            !window.isMobile && deviceStatus.statusId === 1 && !isAccessory && _react2.default.createElement(
                'button',
                { 'data-status': basketData.some(function (item) {
                        return item.shortcode === model.shortcode;
                    }) ? 'in' : 'out',
                    'data-source': 'quickViewPage',
                    className: !basketData.some(function (item) {
                        return item.shortcode === model.shortcode;
                    }) ? 'btn addToBasket pulsing add-to-cart' : !firstLoaded ? 'btn addToBasket pulsing add-to-cart added' : 'btn addToBasket pulsing add-to-cart added noEffect',
                    onClick: function onClick(e) {
                        return handleAddModelToBasket(e, model);
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'default' },
                    'Zum Warenkorb hinzuf\xFCgen'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'success' },
                    'Vom Warenkorb entfernen'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'cart' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', null),
                        _react2.default.createElement('div', null)
                    )
                ),
                _react2.default.createElement('div', { className: 'dots' })
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'additionalInfoWrapper renting' },
            parseFloat(showLevel) > 0 && model.productTypeId !== 4 && _react2.default.createElement(
                'div',
                { className: 'priceInfo' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'installment-payment' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'title' },
                            'Mieten',
                            _react2.default.createElement(
                                'div',
                                { className: 'question-sign' },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/bi_question-circle.svg', alt: '' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'cost' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            '69.00 CHF'
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            'pro Monat'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Mietdauer f\xFCr 3 Monate, danach monatlich k\xFCndbar'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'W\xE4hle deine ',
                            _react2.default.createElement(
                                'strong',
                                null,
                                'deine Mindestmietdauer'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'per-month-tab' },
                        _react2.default.createElement(
                            'div',
                            { className: 'slide-toggle', style: { transform: 'translate(' + positionSlideRent + 'px, 0)' } },
                            rentMonth,
                            ' ',
                            _react2.default.createElement(
                                'span',
                                null,
                                'Monate'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'month-panel', onClick: function onClick() {
                                    return handleChangeRentMonth(1);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'month-desc' },
                                '1 ',
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Monate'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'month-panel', onClick: function onClick() {
                                    return handleChangeRentMonth(3);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'month-desc' },
                                '3 ',
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Monate'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'month-panel', onClick: function onClick() {
                                    return handleChangeRentMonth(6);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'month-desc' },
                                '6 ',
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Monate'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'month-panel', onClick: function onClick() {
                                    return handleChangeRentMonth(12);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'month-desc' },
                                '12 ',
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Monate'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'rent-details' },
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/rent-icon1.svg', alt: '' }),
                        _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'strong',
                                null,
                                'GRATIS'
                            ),
                            ' ',
                            _react2.default.createElement(
                                'span',
                                null,
                                'remarket Care'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/rent-icon2.svg', alt: '' }),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Beinhaltet ',
                            _react2.default.createElement(
                                'span',
                                null,
                                'Kaufoption'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/rent-icon3.svg', alt: '' }),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Lieferug 1-3 Werktage'
                        )
                    )
                )
            ),
            parseFloat(showLevel) > 0 && model.productTypeId !== 4 && _react2.default.createElement(
                'div',
                {
                    'data-status': 'out',
                    'data-source': 'accessoryDetailPage',
                    className: 'btn addToRent pulsing'
                },
                'JETZT MIETEN F\xDCR 3 MONATE'
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'delivery-pay-blocks' },
            (isAccessory && model.quantity > 0 || !isAccessory) && _react2.default.createElement(
                'div',
                { className: 'deliveryBlock' },
                _react2.default.createElement(
                    'h3',
                    { className: 'title' },
                    'Voraussichtliche Lieferung',
                    _react2.default.createElement(
                        'div',
                        { className: 'question-sign' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/bi_question-circle.svg', alt: '' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'info-icon-text' },
                            'Die voraussichtlichen Lieferzeiten beziehen sich auf sofortige Zahlungsmethoden wie Kreditkarte, E-Payment (Postfinance), PayPal und kann bei der Zahlungsmethode Vorauskasse nicht angewendet werden.'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'date-item' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/delivery-icon1.svg', alt: '' }),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'p',
                            { className: 'date' },
                            shopDeliveryDate
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'title' },
                            _react2.default.createElement(
                                'strong',
                                null,
                                'bei Abholung in der Filiale ',
                                model.placeDescription
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'speedy' },
                                'EXPRESS'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'date-item' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/delivery-icon2.svg', alt: '' }),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'p',
                            { className: 'date delivery-date' },
                            'ca. ',
                            homeDeliveryDate
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'title' },
                            _react2.default.createElement(
                                'strong',
                                null,
                                'bei Postversand'
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement('span', { className: 'separator-line' }),
            _react2.default.createElement(
                'div',
                { className: 'pays' },
                _react2.default.createElement(
                    'ul',
                    { className: 'pay-icons' },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/visa.svg', alt: '' })
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/mastercard.svg', alt: '' })
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/paypal.svg', alt: '' })
                    ),
                    domain !== 'de' && _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/postfinance.svg', alt: '' })
                    ),
                    domain !== 'de' && _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/twint.svg', alt: '' })
                    ),
                    domain !== 'ch' && _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/stripe.svg', alt: '' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'pay-services' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/swissbilling.png' }),
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/heidipay.svg' })
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'installments-block' },
            _react2.default.createElement(
                'div',
                { className: 'installments-block-badge' },
                'NEU'
            ),
            _react2.default.createElement(
                'h3',
                null,
                'Rechnung und Ratenzahlung',
                _react2.default.createElement(
                    'strong',
                    null,
                    'Jetzt mit 0% Zinszahlung'
                )
            )
        ),
        deviceStatus.boughtCurrentUser && deviceStatus.statusId != 1 && deviceStatus.statusId != null && _react2.default.createElement(
            'p',
            { className: 'boughtDevice' },
            'Sie haben diesen Artikel am ',
            deviceStatus.dateOfBought,
            ' erworben'
        ),
        !deviceStatus.boughtCurrentUser && deviceStatus.statusId != 1 && deviceStatus.statusId !== null && _react2.default.createElement(
            'p',
            { className: 'boughtDevice' },
            'Dieser Artikel ist leider nicht mehr verf\xFCgbar, da dieser schon verkauft wurde'
        )
    );
};

AdditionalInfoBlock.propTypes = {};
AdditionalInfoBlock.defaultProps = {};

exports.default = AdditionalInfoBlock;

/***/ }),

/***/ 1182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SoldoutInfoBlock = function SoldoutInfoBlock(_ref) {
    var _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className;

    return _react2.default.createElement(
        'div',
        { className: 'col-md-3 additionalInfo ' + className },
        _react2.default.createElement(
            'div',
            { className: 'additionalInfoWrapper' },
            _react2.default.createElement(
                'div',
                { className: 'soldoutInfo' },
                _react2.default.createElement(
                    'div',
                    { className: 'title' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/soldout.png', alt: '' }),
                    _react2.default.createElement(
                        'span',
                        null,
                        'Ausverkauft'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'desc' },
                    'Leider ist dieser Artikel in der Zwischenzeit verkauft worden'
                )
            )
        )
    );
};

SoldoutInfoBlock.propTypes = {};
SoldoutInfoBlock.defaultProps = {};

exports.default = SoldoutInfoBlock;

/***/ }),

/***/ 1183:
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

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(1057);

var _lightboxImg = __webpack_require__(1062);

var _lightboxImg2 = _interopRequireDefault(_lightboxImg);

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

__webpack_require__(1104);

__webpack_require__(1106);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SampleNextArrow(props) {
  var className = props.className,
      style = props.style,
      onClick = props.onClick;

  return _react2.default.createElement(
    'div',
    {
      className: className,
      style: (0, _extends3.default)({}, style),
      onClick: onClick
    },
    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/slick-arrow.svg', alt: '' })
  );
}

function SamplePrevArrow(props) {
  var className = props.className,
      style = props.style,
      onClick = props.onClick;

  return _react2.default.createElement(
    'div',
    {
      className: className,
      style: (0, _extends3.default)({}, style),
      onClick: onClick
    },
    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/slick-arrow.svg', alt: '' })
  );
}

var ModelInfoBlockImage = function (_Component) {
  (0, _inherits3.default)(ModelInfoBlockImage, _Component);

  function ModelInfoBlockImage(props) {
    (0, _classCallCheck3.default)(this, ModelInfoBlockImage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModelInfoBlockImage.__proto__ || Object.getPrototypeOf(ModelInfoBlockImage)).call(this, props));

    _this.state = {
      dimensions: {},
      nav1: null,
      nav2: null
    };
    _this.onImgLoad = _this.onImgLoad.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ModelInfoBlockImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.zoomContainer').remove();
      $('#zoom_01').elevateZoom({ zoomType: "inner" });
      if (this.props.quickPreview) $('#app').addClass('quickPreview');
      this.setState({
        nav1: this.slider1,
        nav2: this.slider2
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      $('.zoomContainer').remove();
      $('#app').removeClass('quickPreview');
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps) {
      if (nextProps.blockImageState.currentMainImage !== this.props.blockImageState.currentMainImage) {
        $('.zoomContainer').remove();
        $('#zoom_01').elevateZoom({ zoomType: "inner" });
      }
    }
  }, {
    key: 'mapRealImg',
    value: function mapRealImg(item, i) {
      var altTitle = this.props.altTitle;

      var className = this.props.blockImageState.currentMainImage === item.src ? "col-xs-3 modelInfoBlock-img-small active" : "col-xs-3 modelInfoBlock-img-small";
      return _react2.default.createElement(
        'div',
        { className: className, key: i },
        _react2.default.createElement('img', { loading: 'lazy', src: item.src, onClick: this.props.clickSmallImg, alt: altTitle + ' - Teil ' + (i + 2) })
      );
    }
  }, {
    key: 'onImgLoad',
    value: function onImgLoad(_ref) {
      var img = _ref.target;

      this.setState({ dimensions: { imgHeight: img.naturalHeight,
          imgWidth: img.naturalWidth } });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: true,
        nextArrow: _react2.default.createElement(SampleNextArrow, null),
        prevArrow: _react2.default.createElement(SamplePrevArrow, null),
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            infinite: true
          }
        }]
      };
      var settingsSmallImg = {
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: true,
        nextArrow: _react2.default.createElement(SampleNextArrow, null),
        prevArrow: _react2.default.createElement(SamplePrevArrow, null),
        focusOnSelect: true,
        variableWidth: true,
        responsive: [{
          breakpoint: 768,
          settings: {
            infinite: true
          }
        }]
      };
      var _props = this.props,
          image = _props.image,
          clickSmallImg = _props.clickSmallImg,
          openLightBox = _props.openLightBox,
          closeLightBox = _props.closeLightBox,
          blockImageState = _props.blockImageState,
          showDescription = _props.showDescription,
          altTitle = _props.altTitle,
          addModelToWishlist = _props.addModelToWishlist,
          productIsAddedToWishlist = _props.productIsAddedToWishlist;
      var _state$dimensions = this.state.dimensions,
          imgHeight = _state$dimensions.imgHeight,
          imgWidth = _state$dimensions.imgWidth;

      var className = blockImageState.currentMainImage === image.mainImg.src ? "col-xs-3 modelInfoBlock-img-small" : "col-xs-3 modelInfoBlock-img-small";

      return _react2.default.createElement(
        'div',
        { className: 'col-md-6 modelInfoBlock-img ' },
        _react2.default.createElement(_reactHelmet.Helmet, {
          meta: [{ "property": "og:image:width", "content": imgWidth }, { "property": "og:image:height", "content": imgHeight }]
        }),
        _react2.default.createElement(
          'div',
          { className: 'row imageDetailOnly' },
          image.realImg.length ? _react2.default.createElement(
            _reactSlick2.default,
            (0, _extends3.default)({ asNavFor: this.state.nav2,
              ref: function ref(slider) {
                return _this2.slider1 = slider;
              }
            }, settings),
            image.realImg.length > 0 && image.realImg.map(function (el, i) {
              return _react2.default.createElement(
                'div',
                { className: 'item', key: 'slider-item' + i },
                _react2.default.createElement(
                  'div',
                  { className: 'col-md-12 modelInfoBlock-img-big' },
                  _react2.default.createElement('img', { loading: 'lazy', onLoad: _this2.onImgLoad,
                    onClick: openLightBox,
                    src: el.src, alt: altTitle }),
                  _react2.default.createElement(
                    'i',
                    { className: 'modelInfoBlock-img-big-searchBtn',
                      onClick: openLightBox,
                      'aria-hidden': 'true' },
                    _react2.default.createElement(
                      'svg',
                      { width: '30', height: '30', viewBox: '0 0 30 30', fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg' },
                      _react2.default.createElement('path', {
                        d: 'M27.8527 26.5212L20.1089 18.7493C21.8011 16.7076 22.6417 14.0926 22.4562 11.4473C22.2707 8.80207 21.0733 6.32994 19.1128 4.54439C17.1523 2.75885 14.5793 1.79714 11.9283 1.85901C9.27729 1.92089 6.75198 3.0016 4.87691 4.87667C3.00184 6.75173 1.92113 9.27704 1.85926 11.9281C1.79738 14.5791 2.75909 17.1521 4.54464 19.1126C6.33018 21.0731 8.80232 22.2704 11.4476 22.4559C14.0928 22.6414 16.7079 21.8008 18.7496 20.1087L26.4933 27.8524C26.6698 28.029 26.9093 28.1281 27.1589 28.1281C27.4086 28.1281 27.648 28.029 27.8246 27.8524C28.0011 27.6759 28.1003 27.4365 28.1003 27.1868C28.1003 26.9372 28.0011 26.6977 27.8246 26.5212H27.8527ZM3.74955 12.1868C3.74955 10.518 4.2444 8.88672 5.17153 7.49919C6.09865 6.11165 7.41641 5.03019 8.95816 4.39158C10.4999 3.75296 12.1964 3.58587 13.8331 3.91143C15.4698 4.237 16.9733 5.04059 18.1533 6.2206C19.3333 7.4006 20.1369 8.90402 20.4624 10.5407C20.788 12.1774 20.6209 13.8739 19.9823 15.4157C19.3437 16.9575 18.2622 18.2752 16.8747 19.2023C15.4871 20.1295 13.8558 20.6243 12.1871 20.6243C9.94929 20.6243 7.80318 19.7354 6.22084 18.153C4.6385 16.5707 3.74955 14.4246 3.74955 12.1868Z',
                        fill: '#BED3CB' }),
                      _react2.default.createElement('path', {
                        d: 'M15.9375 11.25H13.125V8.4375C13.125 8.18886 13.0262 7.9504 12.8504 7.77459C12.6746 7.59877 12.4361 7.5 12.1875 7.5C11.9389 7.5 11.7004 7.59877 11.5246 7.77459C11.3488 7.9504 11.25 8.18886 11.25 8.4375V11.25H8.4375C8.18886 11.25 7.9504 11.3488 7.77459 11.5246C7.59877 11.7004 7.5 11.9389 7.5 12.1875C7.5 12.4361 7.59877 12.6746 7.77459 12.8504C7.9504 13.0262 8.18886 13.125 8.4375 13.125H11.25V15.9375C11.25 16.1861 11.3488 16.4246 11.5246 16.6004C11.7004 16.7762 11.9389 16.875 12.1875 16.875C12.4361 16.875 12.6746 16.7762 12.8504 16.6004C13.0262 16.4246 13.125 16.1861 13.125 15.9375V13.125H15.9375C16.1861 13.125 16.4246 13.0262 16.6004 12.8504C16.7762 12.6746 16.875 12.4361 16.875 12.1875C16.875 11.9389 16.7762 11.7004 16.6004 11.5246C16.4246 11.3488 16.1861 11.25 15.9375 11.25Z',
                        fill: '#BED3CB' })
                    )
                  ),
                  _react2.default.createElement(
                    'i',
                    { className: productIsAddedToWishlist ? 'modelInfoBlock-img-big-wishBtn on' : 'modelInfoBlock-img-big-wishBtn',
                      onClick: function onClick(e) {
                        return addModelToWishlist(e);
                      } },
                    _react2.default.createElement(
                      'svg',
                      { viewBox: '0 0 24 24' },
                      _react2.default.createElement('use', { href: '#heart' }),
                      _react2.default.createElement('use', { href: '#heart' })
                    ),
                    _react2.default.createElement(
                      'svg',
                      { className: 'hide', viewBox: '0 0 24 24' },
                      _react2.default.createElement(
                        'defs',
                        null,
                        _react2.default.createElement('path', { id: 'heart', d: 'M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z' })
                      )
                    )
                  )
                )
              );
            })
          ) : _react2.default.createElement(
            'div',
            { className: 'col-md-12 modelInfoBlock-img-big' },
            _react2.default.createElement('img', { loading: 'lazy', onLoad: this.onImgLoad,
              onClick: openLightBox,
              src: image.mainImg.src, alt: altTitle }),
            _react2.default.createElement(
              'i',
              { className: 'modelInfoBlock-img-big-searchBtn',
                onClick: openLightBox,
                'aria-hidden': 'true' },
              _react2.default.createElement(
                'svg',
                { width: '30', height: '30', viewBox: '0 0 30 30', fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg' },
                _react2.default.createElement('path', {
                  d: 'M27.8527 26.5212L20.1089 18.7493C21.8011 16.7076 22.6417 14.0926 22.4562 11.4473C22.2707 8.80207 21.0733 6.32994 19.1128 4.54439C17.1523 2.75885 14.5793 1.79714 11.9283 1.85901C9.27729 1.92089 6.75198 3.0016 4.87691 4.87667C3.00184 6.75173 1.92113 9.27704 1.85926 11.9281C1.79738 14.5791 2.75909 17.1521 4.54464 19.1126C6.33018 21.0731 8.80232 22.2704 11.4476 22.4559C14.0928 22.6414 16.7079 21.8008 18.7496 20.1087L26.4933 27.8524C26.6698 28.029 26.9093 28.1281 27.1589 28.1281C27.4086 28.1281 27.648 28.029 27.8246 27.8524C28.0011 27.6759 28.1003 27.4365 28.1003 27.1868C28.1003 26.9372 28.0011 26.6977 27.8246 26.5212H27.8527ZM3.74955 12.1868C3.74955 10.518 4.2444 8.88672 5.17153 7.49919C6.09865 6.11165 7.41641 5.03019 8.95816 4.39158C10.4999 3.75296 12.1964 3.58587 13.8331 3.91143C15.4698 4.237 16.9733 5.04059 18.1533 6.2206C19.3333 7.4006 20.1369 8.90402 20.4624 10.5407C20.788 12.1774 20.6209 13.8739 19.9823 15.4157C19.3437 16.9575 18.2622 18.2752 16.8747 19.2023C15.4871 20.1295 13.8558 20.6243 12.1871 20.6243C9.94929 20.6243 7.80318 19.7354 6.22084 18.153C4.6385 16.5707 3.74955 14.4246 3.74955 12.1868Z',
                  fill: '#BED3CB' }),
                _react2.default.createElement('path', {
                  d: 'M15.9375 11.25H13.125V8.4375C13.125 8.18886 13.0262 7.9504 12.8504 7.77459C12.6746 7.59877 12.4361 7.5 12.1875 7.5C11.9389 7.5 11.7004 7.59877 11.5246 7.77459C11.3488 7.9504 11.25 8.18886 11.25 8.4375V11.25H8.4375C8.18886 11.25 7.9504 11.3488 7.77459 11.5246C7.59877 11.7004 7.5 11.9389 7.5 12.1875C7.5 12.4361 7.59877 12.6746 7.77459 12.8504C7.9504 13.0262 8.18886 13.125 8.4375 13.125H11.25V15.9375C11.25 16.1861 11.3488 16.4246 11.5246 16.6004C11.7004 16.7762 11.9389 16.875 12.1875 16.875C12.4361 16.875 12.6746 16.7762 12.8504 16.6004C13.0262 16.4246 13.125 16.1861 13.125 15.9375V13.125H15.9375C16.1861 13.125 16.4246 13.0262 16.6004 12.8504C16.7762 12.6746 16.875 12.4361 16.875 12.1875C16.875 11.9389 16.7762 11.7004 16.6004 11.5246C16.4246 11.3488 16.1861 11.25 15.9375 11.25Z',
                  fill: '#BED3CB' })
              )
            ),
            _react2.default.createElement(
              'i',
              { className: productIsAddedToWishlist ? 'modelInfoBlock-img-big-wishBtn on' : 'modelInfoBlock-img-big-wishBtn',
                onClick: function onClick(e) {
                  return addModelToWishlist(e);
                } },
              _react2.default.createElement(
                'svg',
                { viewBox: '0 0 24 24' },
                _react2.default.createElement('use', { href: '#heart' }),
                _react2.default.createElement('use', { href: '#heart' })
              ),
              _react2.default.createElement(
                'svg',
                { className: 'hide', viewBox: '0 0 24 24' },
                _react2.default.createElement(
                  'defs',
                  null,
                  _react2.default.createElement('path', { id: 'heart', d: 'M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z' })
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row smallImageWrapper' },
          image.realImg.length ? _react2.default.createElement(
            _reactSlick2.default,
            (0, _extends3.default)({
              asNavFor: this.state.nav1,
              ref: function ref(slider) {
                return _this2.slider2 = slider;
              }
            }, settingsSmallImg),
            image.realImg.map(function (el, i) {
              return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'div',
                  { className: className, key: i },
                  _react2.default.createElement('img', { loading: 'lazy', src: el.src, alt: '', onClick: _this2.props.clickSmallImg })
                )
              );
            })
          ) : ''
        ),
        blockImageState.isOpenLightBox && _react2.default.createElement(_lightboxImg2.default, { src: blockImageState.currentMainImage,
          showFirstImage: false,
          showRealImageText: true,
          close: closeLightBox,
          array: [].concat(image.mainImg, image.realImg) })
      );
    }
  }]);
  return ModelInfoBlockImage;
}(_react.Component);

exports.default = ModelInfoBlockImage;


ModelInfoBlockImage.propTypes = {};
ModelInfoBlockImage.defaultProps = {
  showDescription: false
};

/***/ }),

/***/ 1253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModelInfoBlock = undefined;

var _toConsumableArray2 = __webpack_require__(316);

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

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _basket = __webpack_require__(327);

var basketActions = _interopRequireWildcard(_basket);

var _addToBasketEffect = __webpack_require__(950);

var _addToBasketEffect2 = _interopRequireDefault(_addToBasketEffect);

var _addToWishlistEffect = __webpack_require__(1058);

var _addToWishlistEffect2 = _interopRequireDefault(_addToWishlistEffect);

var _additionalInfoBlock = __webpack_require__(1181);

var _additionalInfoBlock2 = _interopRequireDefault(_additionalInfoBlock);

var _soldoutInfoBlock = __webpack_require__(1182);

var _soldoutInfoBlock2 = _interopRequireDefault(_soldoutInfoBlock);

var _modelInfoBlockImage = __webpack_require__(1183);

var _modelInfoBlockImage2 = _interopRequireDefault(_modelInfoBlockImage);

var _warrantyLightbox = __webpack_require__(1254);

var _warrantyLightbox2 = _interopRequireDefault(_warrantyLightbox);

var _specificationsBlock = __webpack_require__(1255);

var _specificationsBlock2 = _interopRequireDefault(_specificationsBlock);

var _usefullProductItem = __webpack_require__(1278);

var _usefullProductItem2 = _interopRequireDefault(_usefullProductItem);

var _helpersFunction = __webpack_require__(315);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usefulProducts = [{ id: 1, text: '3D Tempered Glas (Panzerglas) schwarz für iPhone 12', img: '/images/usefull2.png', cost: 39, toggle: true }, { id: 2, text: 'Apple Lightning auf USB-Kabel, 2 Meter, weiss, original', img: '/images/usefull1.png', cost: 29, toggle: false }, { id: 3, text: '3D Tempered Glas (Panzerglas) schwarz für iPhone 12', img: '/images/usefull2.png', cost: 39, toggle: true }, { id: 4, text: 'Apple Lightning auf USB-Kabel, 2 Meter, weiss, original', img: '/images/usefull1.png', cost: 29, toggle: false }, { id: 5, text: 'Apple Lightning auf USB-Kabel, 2 Meter, weiss, original', img: '/images/usefull1.png', cost: 29, toggle: false }, { id: 6, text: 'Apple Lightning auf USB-Kabel, 2 Meter, weiss, original', img: '/images/usefull1.png', cost: 29, toggle: false }];

var ModelInfoBlock = exports.ModelInfoBlock = function (_Component) {
    (0, _inherits3.default)(ModelInfoBlock, _Component);

    function ModelInfoBlock(props) {
        (0, _classCallCheck3.default)(this, ModelInfoBlock);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ModelInfoBlock.__proto__ || Object.getPrototypeOf(ModelInfoBlock)).call(this, props));

        _this.countdown = null;
        _this.state = {
            blockImage: {
                currentMainImage: '',
                isOpenLightBox: false,
                currentImageLightBox: 0
            },
            showWarrantyLightbox: false,
            isRemarketingCampaign: false,
            deadline: "false" || _this.props.isRemarketingCampaign,
            deadlineIsActive: false,
            deadlineExpired: false,
            deadlineTimer: '',
            activeNavItem: 'purchase',
            productIsAddedToWishlist: false,
            bottomActive: 'buy',
            firstLoaded: true
        };

        _this.clickSmallImg = _this.clickSmallImg.bind(_this);
        _this.openLightBox = _this.openLightBox.bind(_this);
        _this.closeLightBox = _this.closeLightBox.bind(_this);
        _this.addModelToBasket = _this.addModelToBasket.bind(_this);
        _this.handleAddModelToBasket = _this.handleAddModelToBasket.bind(_this);
        _this.addUpsellingModelToBasket = _this.addUpsellingModelToBasket.bind(_this);
        _this.toggleWarrantyLightbox = _this.toggleWarrantyLightbox.bind(_this);
        _this.updateCountDown = _this.updateCountDown.bind(_this);
        _this.activateCountDownCoupon = _this.activateCountDownCoupon.bind(_this);
        _this.clickNavItem = _this.clickNavItem.bind(_this);
        _this.clickBottomItem = _this.clickBottomItem.bind(_this);
        _this.addModelToWishlist = _this.addModelToWishlist.bind(_this);
        _this.slideItem = _this.slideItem.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ModelInfoBlock, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            $('#intercom-container .intercom-launcher-frame').attr('style', 'bottom:20px !important');
            $('#tidio-chat #tidio-chat-iframe').css({
                bottom: "-10px",
                right: "10px"
            });
            $('body .fixedBtnDetail').remove();
            clearInterval(this.countdown);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            if (window.isMobile) {
                if ($('#intercom-container').length > 0) {
                    $('#intercom-container .intercom-launcher-frame').removeAttr('style');
                    $('#intercom-container').before('<div class="fixedBtnDetail"></div>');
                }
                if ($('#tidio-chat').length > 0) {
                    $('#tidio-chat').before('<div class="fixedBtnDetail"></div>');
                } else $('body').append('<div class="fixedBtnDetail"></div>');
            }
            var deadline = JSON.parse(window.localStorage.getItem('deadline'));
            if (true) {
                if (!document.getElementById("numeric-timer")) {
                    setTimeout(function () {
                        _this2.setState({ deadline: false });
                        _this2.updateCountDown();
                    }, 1000);
                } else {
                    this.setState({ deadline: false });
                    this.updateCountDown();
                }

                // Update the count down every 1 min
                this.countdown = setInterval(function () {
                    _this2.setState({ deadline: false });
                    _this2.updateCountDown();
                }, 60000);
            } else {
                window.localStorage.removeItem("deadline");
            }
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            if (this.props.currentModel.length > 0) {
                this.setState({ blockImage: (0, _extends3.default)({}, this.state.blockImage, { currentMainImage: this.props.currentModel[0].deviceImages.mainImg.src }) });
            }
            var deadline = JSON.parse(window.localStorage.getItem('deadline')),
                isRemarketingCampaign = this.props.isRemarketingCampaign;
            if (isRemarketingCampaign) {
                this.setState({ deadline: true });
                if (deadline) {
                    this.setState({ isRemarketingCampaign: true });
                    deadline.isRemarketingCampaign = true;
                    window.localStorage.setItem('deadline', JSON.stringify(deadline));
                } else {
                    var countDownDate = new Date();
                    countDownDate.setHours(countDownDate.getHours() + 3);
                    deadline = { countDownDate: countDownDate, isActive: 0, deadlineExpired: 0, couponShortcode: '', isRemarketingCampaign: true };
                    window.localStorage.setItem('deadline', JSON.stringify(deadline));
                }
            }
            if (deadline && deadline.isActive) {
                this.setState({ deadlineIsActive: true });
            }
            if (deadline && deadline.deadlineExpired) {
                this.setState({ deadlineExpired: true });
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.currentModel !== this.props.currentModel) {
                this.setState({ blockImage: (0, _extends3.default)({}, this.state.blockImage, { currentMainImage: nextProps.currentModel[0].deviceImages.mainImg.src }) });
            }
        }
    }, {
        key: "updateCountDown",
        value: function updateCountDown() {
            this.setState({ deadline: true });
            var deadline = JSON.parse(window.localStorage.getItem('deadline')),
                numericTimer = document.getElementById("numeric-timer");
            if (deadline && deadline.deadlineExpired) {
                this.setState({ deadlineExpired: true });
                clearInterval(this.countdown);
                return;
            }
            if (deadline && deadline.isActive) {
                this.setState({ deadlineIsActive: true });
            }
            if (!deadline) {
                var countDownDate = new Date();
                countDownDate.setHours(countDownDate.getHours() + 3);
                deadline = { countDownDate: countDownDate, isActive: 0, deadlineExpired: 0, couponShortcode: '' };
                window.localStorage.setItem('deadline', JSON.stringify(deadline));
            }

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = new Date(deadline.countDownDate).getTime() - now;
            // Time calculations for days, hours, minutes and seconds
            var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            var seconds = Math.floor(distance % (1000 * 60) / 1000);
            // Display the result in the element with id="numericTimer"
            var deadlineTimer = hours + "Std. " + minutes + "Min. verbleiben";
            this.setState({ deadlineTimer: deadlineTimer });
            // if(numericTimer){
            //     numericTimer.innerHTML = hours + "Std. " + minutes + "Min. verbleiben"
            // }
            // If the count down is finished
            if (distance <= 0) {
                deadline.deadlineExpired = 1;
                window.localStorage.setItem('deadline', JSON.stringify(deadline));
                clearInterval(this.countdown);
                this.setState({ deadlineExpired: true });
            }
        }
    }, {
        key: "activateCountDownCoupon",
        value: function activateCountDownCoupon(e) {
            var deadline = JSON.parse(window.localStorage.getItem('deadline'));
            if (deadline) {
                deadline.isActive = 1;
                this.setState({ deadlineIsActive: true });
                window.localStorage.setItem('deadline', JSON.stringify(deadline));

                if (!deadline.couponShortcode) {
                    _axios2.default.get("/api/generateCountDownCoupon").then(function (result) {
                        deadline.couponShortcode = result.data.shortcode;
                        window.localStorage.setItem('deadline', JSON.stringify(deadline));
                    }).catch(function (error) {
                        console.log('error', error.response.data);
                    });
                }
            }

            var currentModel = this.props.currentModel,
                basketData = this.props.basketData;

            if (!basketData.find(function (item) {
                return item.shortcode == currentModel[0].shortcode;
            })) {
                this.addModelToBasket(e);
            }
        }
    }, {
        key: "toggleWarrantyLightbox",
        value: function toggleWarrantyLightbox() {
            this.setState({ showWarrantyLightbox: !this.state.showWarrantyLightbox });
        }
    }, {
        key: "clickSmallImg",
        value: function clickSmallImg(e) {
            this.setState({ blockImage: (0, _extends3.default)({}, this.state.blockImage, { currentMainImage: e.target.getAttribute('src') }) });
        }
    }, {
        key: "openLightBox",
        value: function openLightBox() {
            var _this3 = this;

            $('.zoomContainer').remove();
            var position = null;
            [].concat(this.props.currentModel[0].deviceImages.mainImg, this.props.currentModel[0].deviceImages.realImg).forEach(function (item, i) {
                // find current image position, for LightBox
                if (item.src === _this3.state.blockImage.currentMainImage) position = i;
            });
            this.setState({ blockImage: (0, _extends3.default)({}, this.state.blockImage, { isOpenLightBox: true, currentImageLightBox: position }) });
        }
    }, {
        key: "closeLightBox",
        value: function closeLightBox() {
            $('#zoom_01').elevateZoom({ zoomType: "inner" });
            this.setState({ blockImage: (0, _extends3.default)({}, this.state.blockImage, { isOpenLightBox: false }) });
        }
    }, {
        key: "mapCriterias",
        value: function mapCriterias() {
            var _this4 = this;

            var _props$currentModel$ = this.props.currentModel[0],
                criterias = _props$currentModel$.criterias,
                conditionId = _props$currentModel$.conditionId,
                dataArr = [];

            criterias.forEach(function (item) {
                if (conditionId === 1) return false;
                if (item.name !== _this4.props.capacityName) {
                    dataArr.push(_react2.default.createElement(
                        "span",
                        { key: item.id, className: "modelValues-small criteria-" + item.id + " col-xs-4" },
                        _react2.default.createElement(
                            "span",
                            null,
                            item.name,
                            ":"
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "span",
                            null,
                            item.values.map(function (item, i) {
                                return _react2.default.createElement(
                                    "b",
                                    { key: "mapCriteriasValue-" + i },
                                    item.name,
                                    i < item.length - 1 ? ',' : ''
                                );
                            })
                        )
                    ));
                }
            });
            return dataArr;
        }
    }, {
        key: "addModelToBasket",
        value: function addModelToBasket(e) {
            var _this5 = this;

            var status = e.target.getAttribute('data-status'),
                source = e.target.getAttribute('data-source'),
                _props = this.props,
                currentModel = _props.currentModel,
                basketData = _props.basketData,
                bottomActive = this.state.bottomActive,
                newBasketData = null;


            if (!status) {
                status = basketData.some(function (item) {
                    return item.shortcode === currentModel[0].shortcode;
                }) ? 'in' : 'out';
            }

            if (!source) {
                source = 'quickViewPage';
            }

            if (basketData.every(function (item) {
                return item.id != currentModel[0].id;
            })) {
                newBasketData = [].concat((0, _toConsumableArray3.default)(basketData), [currentModel[0]]);
            } else {
                newBasketData = basketData.filter(function (item) {
                    return item.shortcode != currentModel[0].shortcode;
                });
            }

            this.props.basketActions.changeBasketData(newBasketData);
            var gtagData = JSON.parse(window.localStorage.getItem("gtag"));
            if (status === 'out') {
                gtag('event', 'add_to_cart', {
                    "items": [{
                        "id": currentModel[0].shortcode,
                        "name": currentModel[0].descriptionLong,
                        "list_name": "Kaufen",
                        "quantity": 1,
                        "price": currentModel[0].discountPrice || currentModel[0].price,
                        "category": gtagData.category || '',
                        "brand": currentModel[0].deviceName
                    }]
                });
                if (!window.isMobile) {
                    this.props.basketActions.basketAddEffect(_react2.default.createElement(_addToBasketEffect2.default, { startPosition: $(e.target).offset(),
                        image: currentModel[0].deviceImages.mainImg.src,
                        basketType: "kaufen" }));
                    setTimeout(function () {
                        if (_this5.props.quickPreview) {
                            _this5.props.handleCloseQuickView();
                        }
                        _this5.props.openSuccessAddToBasket(currentModel[0], _this5.props.quickPreview ? source : 'detailPage');
                        _this5.props.basketActions.basketAddEffect(null);
                    }, 2000);
                } else {
                    if (bottomActive === 'buy') {
                        $("#buyAddBasket").addClass("sendtocart");
                        setTimeout(function () {
                            $("#buyAddBasket").removeClass('sendtocart');
                        }, 1500);
                    }
                    if (bottomActive === 'installment') {
                        $("#installmentAddBasket").addClass("sendtocart");
                        setTimeout(function () {
                            $("#installmentAddBasket").removeClass('sendtocart');
                        }, 1500);
                    }
                    // browserHistory.push('/warenkorb')
                }
            }
            if (status === 'in') {
                gtag('event', 'remove_from_cart', {
                    "items": [{
                        "id": currentModel[0].shortcode,
                        "name": currentModel[0].descriptionLong,
                        "list_name": "Kaufen",
                        "quantity": 1,
                        "price": currentModel[0].discountPrice || currentModel[0].price,
                        "category": gtagData.category || '',
                        "brand": currentModel[0].deviceName
                    }]
                });
                if (!newBasketData.length || !newBasketData.filter(function (item) {
                    return item.productTypeId == 7;
                }).length) {
                    var deadline = JSON.parse(window.localStorage.getItem('deadline'));
                    if (deadline) {
                        deadline.isActive = 0;
                        window.localStorage.setItem('deadline', JSON.stringify(deadline));
                        newBasketData = newBasketData.filter(function (item) {
                            return item.shortcode != deadline.couponShortcode;
                        });
                        this.setState({ deadlineIsActive: false });
                        this.props.basketActions.changeBasketData(newBasketData);
                    }
                    if (true) {
                        if (!document.getElementById("numeric-timer")) {
                            setTimeout(function () {
                                _this5.setState({ deadline: false });
                                _this5.updateCountDown();
                            }, 1000);
                        } else {
                            this.setState({ deadline: false });
                            this.updateCountDown();
                        }
                    }
                }
            }
        }
    }, {
        key: "addUpsellingModelToBasket",
        value: function addUpsellingModelToBasket(e, model) {
            var _this6 = this;

            var status = e.target.getAttribute('data-status'),
                basketData = this.props.basketData,
                newBasketData = null;


            if (basketData.every(function (item) {
                return item.id != model.id;
            })) {
                newBasketData = [].concat((0, _toConsumableArray3.default)(basketData), [model]);
            } else {
                newBasketData = basketData.filter(function (item) {
                    return item.shortcode != model.shortcode;
                });
            }

            this.props.basketActions.changeBasketData(newBasketData);
            var gtagData = JSON.parse(window.localStorage.getItem("gtag"));
            if (status === 'out') {
                gtag('event', 'add_to_cart', {
                    "items": [{
                        "id": model.shortcode,
                        "name": model.descriptionLong,
                        "list_name": "Kaufen",
                        "quantity": 1,
                        "price": model.discountPrice || model.price,
                        "category": gtagData.category || '',
                        "brand": model.deviceName
                    }]
                });
                if (!window.isMobile) {
                    this.props.basketActions.basketAddEffect(_react2.default.createElement(_addToBasketEffect2.default, { startPosition: $(e.target).offset(),
                        image: model.deviceImages.mainImg.src,
                        basketType: "kaufen" }));
                    setTimeout(function () {
                        _this6.props.basketActions.basketAddEffect(null);
                    }, 2000);
                }
            }
            if (status === 'in') {
                gtag('event', 'remove_from_cart', {
                    "items": [{
                        "id": model.shortcode,
                        "name": model.descriptionLong,
                        "list_name": "Kaufen",
                        "quantity": 1,
                        "price": model.discountPrice || model.price,
                        "category": gtagData.category || '',
                        "brand": model.deviceName
                    }]
                });
            }
        }
    }, {
        key: "addModelToWishlist",
        value: function addModelToWishlist(e, item) {
            var _this7 = this;

            e.stopPropagation();
            e.preventDefault();
            var wishlistData = this.props.wishlistData,
                newWishlistData = null;
            var status = '';
            if (wishlistData.every(function (itemWishlist) {
                return itemWishlist.id != item.id;
            })) {
                newWishlistData = [].concat((0, _toConsumableArray3.default)(wishlistData), [item]);
                status = 'add';
            } else {
                newWishlistData = wishlistData.filter(function (itemWishlist) {
                    return itemWishlist.shortcode != item.shortcode;
                });
                status = 'remove';
            }
            this.props.basketActions.changeWishlisteData(newWishlistData);
            this.setState({ productIsAddedToWishlist: !this.state.productIsAddedToWishlist });
            if (!window.isMobile && status === 'add') {
                this.props.basketActions.wishlistAddEffect(_react2.default.createElement(_addToWishlistEffect2.default, { startPosition: $(e.target).offset(),
                    image: item.deviceImages.mainImg.src }));
                setTimeout(function () {
                    _this7.props.basketActions.wishlistAddEffect(null);
                }, 2000);
            }
        }
    }, {
        key: "mapRealImg",
        value: function mapRealImg(item, i) {
            var className = this.state.blockImage.currentMainImage === item.src ? "col-xs-3 modelInfoBlock-img-small active" : "col-xs-3 modelInfoBlock-img-small";
            return _react2.default.createElement(
                "div",
                { className: className, key: "mapRealImg-" + i },
                _react2.default.createElement("img", { loading: "lazy", src: item.src, alt: "", onClick: this.clickSmallImg })
            );
        }
    }, {
        key: "clickNavItem",
        value: function clickNavItem(e) {
            var activeNavItem = e.currentTarget.getAttribute('data-type');
            this.setState({ activeNavItem: activeNavItem });
        }
    }, {
        key: "clickBottomItem",
        value: function clickBottomItem(bottomActive) {
            this.setState({ bottomActive: bottomActive });
        }
    }, {
        key: "slideItem",
        value: function slideItem(monthPrice, month) {
            return _react2.default.createElement(
                "span",
                { key: "slideItem-" + month, className: "priceRow" },
                _react2.default.createElement(
                    "span",
                    { className: 'monthPrice' },
                    (0, _helpersFunction.formatPrice)(monthPrice),
                    " ",
                    window.currencyValue
                ),
                _react2.default.createElement(
                    "span",
                    { className: 'monthDesc' },
                    "x ",
                    month,
                    " Monate"
                )
            );
        }
    }, {
        key: "handleAddModelToBasket",
        value: function handleAddModelToBasket(e, model) {
            this.setState({ firstLoaded: false });
            this.addModelToBasket(e, model);
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            var settings = {
                dots: true,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 1000,
                autoplay: true
            };

            var _props2 = this.props,
                currentModel = _props2.currentModel,
                basketData = _props2.basketData,
                wishlistData = _props2.wishlistData,
                capacityName = _props2.capacityName,
                deviceStatus = _props2.deviceStatus,
                upsellingItems = _props2.upsellingItems,
                domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1],
                _state = this.state,
                blockImage = _state.blockImage,
                activeNavItem = _state.activeNavItem,
                bottomActive = _state.bottomActive,
                month = _state.month,
                firstLoaded = _state.firstLoaded,
                notShowBatteryInfo = false;


            var month3 = 0,
                month6 = 0,
                month12 = 0;
            if (currentModel[0]) {
                notShowBatteryInfo = currentModel[0].batteryLoadcycle == 0 && currentModel[0].batteryCapacity == 0 || currentModel[0].conditionId == 1 || currentModel[0].conditionId == 2;
                wishlistData.map(function (el) {
                    if (el.shortcode === currentModel[0].shortcode && !_this8.state.productIsAddedToWishlist) {
                        _this8.setState({ productIsAddedToWishlist: true });
                    }
                });
                var sellPrice = currentModel[0].price;
                if (currentModel[0].discountPrice) sellPrice = currentModel[0].discountPrice;
                month3 = (sellPrice / 3).toFixed(2);
                month6 = (sellPrice / 6).toFixed(2);
                month12 = (sellPrice / 12).toFixed(2);
            }

            return _react2.default.createElement(
                "div",
                { style: { marginTop: 10 } },
                currentModel.map(function (model, i) {
                    var conection = model.criterias.find(function (item) {
                        return item.name == 'Verbindungsart';
                    }) ? model.criterias.find(function (item) {
                        return item.name == 'Verbindungsart';
                    }).values[0].name : '',
                        prozessor = model.criterias.find(function (item) {
                        return item.name == 'Prozessor';
                    }) ? model.criterias.find(function (item) {
                        return item.name == 'Prozessor';
                    }).values[0].name : '',
                        ram = model.criterias.find(function (item) {
                        return item.name == 'Arbeitsspeicher';
                    }) ? model.criterias.find(function (item) {
                        return item.name == 'Arbeitsspeicher';
                    }).values[0].name : '';
                    return _react2.default.createElement(
                        "div",
                        { className: model.discountPrice ? "modelInfoBlock discount-label col-xs-12" : "modelInfoBlock col-xs-12", key: "modelInfoBlock-" + i },
                        _react2.default.createElement(
                            "div",
                            { className: "col-xs-12 modelInfo for-mobile" },
                            _react2.default.createElement(
                                "p",
                                { className: "modelName" },
                                model.model,
                                " ",
                                model.extendedTitle && " (" + model.extendedTitle + ")"
                            ),
                            _react2.default.createElement(
                                "p",
                                { className: "shortcode" },
                                "ID: ",
                                model.shortcode
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "fixedRow mobileFixedBottom" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "tabs" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: bottomActive === 'buy' ? "tab-item active" : "tab-item", onClick: function onClick() {
                                                return _this8.clickBottomItem('buy');
                                            } },
                                        "Sofort-Kaufen"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: bottomActive === 'installment' ? "tab-item active" : "tab-item", onClick: function onClick() {
                                                return _this8.clickBottomItem('installment');
                                            } },
                                        "Ratenzahlung"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: bottomActive === 'rent' ? "tab-item hidden active" : "tab-item hidden", onClick: function onClick() {
                                                return _this8.clickBottomItem('rent');
                                            } },
                                        "Mieten"
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "bottomContent" },
                                    bottomActive === 'buy' && _react2.default.createElement(
                                        "div",
                                        { className: "buyArea" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "priceRow" },
                                            model.discountPrice && _react2.default.createElement(
                                                "p",
                                                { className: 'price old-price' },
                                                (0, _helpersFunction.formatPrice)(model.price),
                                                " ",
                                                window.currencyValue
                                            ),
                                            _react2.default.createElement(
                                                "p",
                                                { className: 'price' },
                                                (0, _helpersFunction.formatPrice)(model.discountPrice ? +model.discountPrice : +model.price),
                                                " ",
                                                window.currencyValue
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "addBasket", id: "buyAddBasket" },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "addToBasketEffectMobile" },
                                                _react2.default.createElement("img", { loading: "lazy", src: model.deviceImages.mainImg.src, alt: "" })
                                            ),
                                            deviceStatus.statusId == 1 || deviceStatus.statusId === null ? _react2.default.createElement(
                                                "button",
                                                { "data-status": basketData.some(function (item) {
                                                        return item.id === model.id;
                                                    }) ? 'in' : 'out',
                                                    className: !basketData.some(function (item) {
                                                        return item.shortcode === model.shortcode;
                                                    }) ? 'btn addToBasket pulsing add-to-cart-mobile' : !firstLoaded ? 'btn addToBasket pulsing add-to-cart-mobile added' : 'btn addToBasket pulsing add-to-cart-mobile added noEffect',
                                                    onClick: function onClick(e) {
                                                        return _this8.handleAddModelToBasket(e, model);
                                                    } },
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "default" },
                                                    "Zum Warenkorb"
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "success" },
                                                    "Vom Warenkorb"
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "cart" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        null,
                                                        _react2.default.createElement("div", null),
                                                        _react2.default.createElement("div", null)
                                                    )
                                                ),
                                                _react2.default.createElement("div", { className: "dots" })
                                            ) : deviceStatus.boughtCurrentUser && deviceStatus.statusId != 1 ? _react2.default.createElement(
                                                "p",
                                                { className: "boughtDevice" },
                                                "Sie haben diesen Artikel am ",
                                                deviceStatus.dateOfBought,
                                                " erworben"
                                            ) : !deviceStatus.boughtCurrentUser && deviceStatus.statusId != 1 ? _react2.default.createElement(
                                                "p",
                                                { className: "boughtDevice" },
                                                "Dieser Artikel ist leider nicht mehr verf\xFCgbar, da dieser schon verkauft wurde"
                                            ) : _react2.default.createElement("div", null)
                                        )
                                    ),
                                    bottomActive === 'installment' && _react2.default.createElement(
                                        "div",
                                        { className: "installmentArea" },
                                        _react2.default.createElement(
                                            _react.Fragment,
                                            null,
                                            _react2.default.createElement(
                                                _reactSlick2.default,
                                                settings,
                                                _this8.slideItem(month3, 3),
                                                _this8.slideItem(month6, 6),
                                                _this8.slideItem(month12, 12)
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "addBasket", id: "installmentAddBasket" },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "addToBasketEffectMobile" },
                                                _react2.default.createElement("img", { loading: "lazy", src: model.deviceImages.mainImg.src, alt: "" })
                                            ),
                                            deviceStatus.statusId == 1 || deviceStatus.statusId === null ? _react2.default.createElement("button", { "data-status": basketData.some(function (item) {
                                                    return item.id === model.id;
                                                }) ? 'in' : 'out',
                                                className: "btn addToBasket pulsing",
                                                onClick: _this8.addModelToBasket }) : deviceStatus.boughtCurrentUser && deviceStatus.statusId != 1 ? _react2.default.createElement(
                                                "p",
                                                { className: "boughtDevice" },
                                                "Sie haben diesen Artikel am ",
                                                deviceStatus.dateOfBought,
                                                " erworben"
                                            ) : !deviceStatus.boughtCurrentUser && deviceStatus.statusId != 1 ? _react2.default.createElement(
                                                "p",
                                                { className: "boughtDevice" },
                                                "Dieser Artikel ist leider nicht mehr verf\xFCgbar, da dieser schon verkauft wurde"
                                            ) : _react2.default.createElement("div", null)
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                null,
                                _react2.default.createElement(
                                    "span",
                                    { className: "modelValues" },
                                    _react2.default.createElement(
                                        "span",
                                        null,
                                        model.capacity,
                                        model.capacityImage && _react2.default.createElement("img", { loading: "lazy", src: model.capacityImage })
                                    ),
                                    _react2.default.createElement(
                                        "span",
                                        { style: { marginBottom: 4 } },
                                        model.color,
                                        "\xA0",
                                        model.colorCode && _react2.default.createElement("span", { className: model.colorCode.toLowerCase() == '#ffffff' ? "colorPic whiteColor" : "colorPic",
                                            style: { backgroundColor: model.colorCode } })
                                    )
                                ),
                                _react2.default.createElement(
                                    "span",
                                    { className: "modelPlace" },
                                    _react2.default.createElement(
                                        "span",
                                        null,
                                        _react2.default.createElement("img", { loading: "lazy", src: "/images/design/aside_filter_category_icons/lagerort.svg", alt: "", style: { width: 16, marginRight: 11 } }),
                                        model.placeDescription
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "row row-flex" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-9 left-part" },
                                _react2.default.createElement(
                                    "div",
                                    null,
                                    _react2.default.createElement(
                                        "div",
                                        { className: "row" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "col-md-12 row-flex" },
                                            _react2.default.createElement(_modelInfoBlockImage2.default, { image: model.deviceImages,
                                                altTitle: model.model + ', ' + model.capacity + ', ' + model.color + ', ' + model.condition + ', ' + model.placeDescription,
                                                blockImageState: blockImage,
                                                openLightBox: _this8.openLightBox,
                                                clickThumbnailLightBox: _this8.clickThumbnailLightBox,
                                                closeLightBox: _this8.closeLightBox,
                                                nextLightBox: _this8.nextLightBox,
                                                prevLightBox: _this8.prevLightBox,
                                                quickPreview: _this8.props.quickPreview,
                                                clickSmallImg: _this8.clickSmallImg,
                                                productIsAddedToWishlist: _this8.state.productIsAddedToWishlist,
                                                addModelToWishlist: function addModelToWishlist(e) {
                                                    return _this8.addModelToWishlist(e, model);
                                                } }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "col-md-6 modelInfo" },
                                                _react2.default.createElement(
                                                    "p",
                                                    { className: "modelName" },
                                                    model.model,
                                                    model.extendedTitle && " (" + model.extendedTitle + ")"
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "modelStars" },
                                                    _react2.default.createElement(
                                                        "a",
                                                        { href: "#footer" },
                                                        _react2.default.createElement("img", { loading: "lazy", src: "/images/stars.svg" })
                                                    ),
                                                    _react2.default.createElement(
                                                        "span",
                                                        null,
                                                        "(1602)"
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "span",
                                                    { className: "modelCriterias" },
                                                    conection,
                                                    " ",
                                                    prozessor,
                                                    " ",
                                                    ram
                                                ),
                                                _react2.default.createElement(
                                                    "p",
                                                    { className: "shortcode" },
                                                    "ID: ",
                                                    model.shortcode
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "modelLocationBanner" },
                                                    _react2.default.createElement("img", { loading: "lazy", src: "/images/location-icon.svg", alt: "location icon" }),
                                                    _react2.default.createElement("div", { className: "separator-line" }),
                                                    model.placeDescription
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    null,
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "modelValues" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "value" },
                                                            _react2.default.createElement(
                                                                "h4",
                                                                null,
                                                                "Farbe"
                                                            ),
                                                            _react2.default.createElement(
                                                                "span",
                                                                null,
                                                                model.colorCode && _react2.default.createElement("span", { className: model.colorCode == '#FFFFFF' ? "colorPic whiteColor" : "colorPic",
                                                                    style: { backgroundColor: model.colorCode } }),
                                                                model.color
                                                            )
                                                        ),
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "value" },
                                                            _react2.default.createElement(
                                                                "h4",
                                                                null,
                                                                "Kapazit\xE4t"
                                                            ),
                                                            _react2.default.createElement(
                                                                "span",
                                                                null,
                                                                model.capacity,
                                                                model.capacityImage && _react2.default.createElement("img", { loading: "lazy", src: model.capacityImage })
                                                            )
                                                        )
                                                    )
                                                ),
                                                _this8.props.currentModel[0].criterias.length === 5 ? _react2.default.createElement(
                                                    "div",
                                                    { className: "allCriterias mobile-none" },
                                                    _react2.default.createElement(
                                                        "span",
                                                        { className: "modelValues-small condition col-xs-6" },
                                                        _react2.default.createElement(
                                                            "span",
                                                            null,
                                                            "Allgemeiner Zustand:"
                                                        ),
                                                        _react2.default.createElement("br", null),
                                                        _react2.default.createElement(
                                                            "span",
                                                            null,
                                                            _react2.default.createElement(
                                                                "b",
                                                                null,
                                                                model.condition
                                                            )
                                                        )
                                                    ),
                                                    _this8.mapCriterias.call(_this8)
                                                ) : '',
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "main-info-boxes mobile-none" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box" },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Zustand"
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "item-info-img" },
                                                                _react2.default.createElement("img", { loading: "lazy", className: "detailInfoImg", src: "/images/design/zustand" + model.conditionId + "-detail-info.svg", alt: "" })
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "description-wrapper" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    model.condition
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box warranty",
                                                                onClick: _this8.toggleWarrantyLightbox },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Garantie"
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "item-info-img" },
                                                                _react2.default.createElement("img", { loading: "lazy", className: "detailInfoImg", src: "/images/design/warranty-detail-info.svg", alt: "" })
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "description-wrapper" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    _react2.default.createElement(
                                                                        "span",
                                                                        { className: "green" },
                                                                        model.warranty
                                                                    ),
                                                                    " Garantie"
                                                                )
                                                            )
                                                        ),
                                                        _this8.state.showWarrantyLightbox && _react2.default.createElement(_warrantyLightbox2.default, { toggleLightbox: _this8.toggleWarrantyLightbox })
                                                    ),
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box" },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Kapazit\xE4t"
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "item-info-img" },
                                                                _react2.default.createElement("img", { loading: "lazy", className: "detailInfoImg", src: "/images/design/capacity-detail-info.svg", alt: "" })
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "description-wrapper" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    _react2.default.createElement(
                                                                        "span",
                                                                        { className: "green" },
                                                                        model.capacity.slice(0, model.capacity.indexOf('G'))
                                                                    ),
                                                                    " GB"
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    !notShowBatteryInfo && _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box" },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Batterie"
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "item-info-img" },
                                                                _react2.default.createElement("img", { loading: "lazy", className: "detailInfoImg", src: "/images/design/battery-detail-info.svg", alt: "" })
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "description-wrapper" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    "Ladezyklen: ",
                                                                    _react2.default.createElement(
                                                                        "span",
                                                                        { className: "green" },
                                                                        model.batteryLoadcycle == -1 ? "n.v." : model.batteryLoadcycle
                                                                    )
                                                                ),
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    "Kapazitat: ",
                                                                    _react2.default.createElement(
                                                                        "span",
                                                                        { className: "green" },
                                                                        model.batteryCapacity == -1 ? "n.v." : model.batteryCapacity + "%"
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    notShowBatteryInfo && _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box" },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Farbe"
                                                            ),
                                                            _react2.default.createElement("span", { className: model.colorCode == '#FFFFFF' ? "color-img whiteColor" : "color-img", style: { backgroundColor: model.colorCode } }),
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "description" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "green" },
                                                                    model.color
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "col-xs-12 details mobile-block" },
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "allCriterias " },
                                                    _react2.default.createElement(
                                                        "span",
                                                        { className: "modelValues-small condition col-xs-6" },
                                                        _react2.default.createElement(
                                                            "span",
                                                            null,
                                                            "Allgemeiner Zustand:"
                                                        ),
                                                        _react2.default.createElement("br", null),
                                                        _react2.default.createElement(
                                                            "span",
                                                            null,
                                                            _react2.default.createElement(
                                                                "b",
                                                                null,
                                                                model.condition
                                                            )
                                                        )
                                                    ),
                                                    _this8.mapCriterias.call(_this8)
                                                ),
                                                model.note && window.isMobile && _react2.default.createElement(
                                                    "div",
                                                    { className: "row", style: { marginBottom: '15px' } },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "col-md-12" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "extra-info-block" },
                                                            _react2.default.createElement("img", { loading: "lazy", src: "/images/design/attention-mark.svg", alt: "" }),
                                                            _react2.default.createElement(
                                                                "p",
                                                                null,
                                                                model.note
                                                            )
                                                        )
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "main-info-boxes" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box" },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Zustand"
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "item-info-img" },
                                                                _react2.default.createElement("img", { loading: "lazy", className: "detailInfoImg", src: "/images/design/zustand" + model.conditionId + "-detail-info.svg", alt: "" })
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "description-wrapper" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    model.condition
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box warranty",
                                                                onClick: _this8.toggleWarrantyLightbox },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Garantie"
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "item-info-img" },
                                                                _react2.default.createElement("img", { loading: "lazy", className: "detailInfoImg", src: "/images/design/warranty-detail-info.svg", alt: "" })
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "description-wrapper" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    _react2.default.createElement(
                                                                        "span",
                                                                        { className: "green" },
                                                                        model.warranty
                                                                    ),
                                                                    " Garantie"
                                                                )
                                                            )
                                                        ),
                                                        _this8.state.showWarrantyLightbox && _react2.default.createElement(_warrantyLightbox2.default, { toggleLightbox: _this8.toggleWarrantyLightbox })
                                                    ),
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box" },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Kapazit\xE4t"
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "item-info-img" },
                                                                _react2.default.createElement("img", { loading: "lazy", className: "detailInfoImg", src: "/images/design/capacity-detail-info.svg", alt: "" })
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "description-wrapper" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    _react2.default.createElement(
                                                                        "span",
                                                                        { className: "green" },
                                                                        model.capacity.slice(0, model.capacity.indexOf('G'))
                                                                    ),
                                                                    " GB"
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    !notShowBatteryInfo && _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box" },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Batterie"
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "item-info-img" },
                                                                _react2.default.createElement("img", { loading: "lazy", className: "detailInfoImg", src: "/images/design/battery-detail-info.svg", alt: "" })
                                                            ),
                                                            _react2.default.createElement(
                                                                "div",
                                                                { className: "description-wrapper" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    "Ladezyklen: ",
                                                                    _react2.default.createElement(
                                                                        "span",
                                                                        { className: "green" },
                                                                        model.batteryLoadcycle == -1 ? "n.v." : model.batteryLoadcycle
                                                                    )
                                                                ),
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "description" },
                                                                    "Kapazitat: ",
                                                                    _react2.default.createElement(
                                                                        "span",
                                                                        { className: "green" },
                                                                        model.batteryCapacity == -1 ? "n.v." : model.batteryCapacity + "%"
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    notShowBatteryInfo && _react2.default.createElement(
                                                        "div",
                                                        { className: "item" },
                                                        _react2.default.createElement(
                                                            "div",
                                                            { className: "item-info-box" },
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "title" },
                                                                "Farbe"
                                                            ),
                                                            _react2.default.createElement("span", { className: model.colorCode == '#FFFFFF' ? "color-img whiteColor" : "color-img", style: { backgroundColor: model.colorCode } }),
                                                            _react2.default.createElement(
                                                                "span",
                                                                { className: "description" },
                                                                _react2.default.createElement(
                                                                    "span",
                                                                    { className: "green" },
                                                                    model.color
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "col-xs-12 mobile-block" },
                                            !deviceStatus.boughtCurrentUser && deviceStatus.statusId != 1 ? _react2.default.createElement(_soldoutInfoBlock2.default, null) : _react2.default.createElement(_additionalInfoBlock2.default, { model: model,
                                                domain: domain,
                                                basketData: basketData,
                                                addModelToBasket: _this8.addModelToBasket,
                                                deviceStatus: deviceStatus,
                                                deadline: _this8.state.deadline,
                                                activateCountDownCoupon: _this8.activateCountDownCoupon,
                                                deadlineIsActive: _this8.state.deadlineIsActive,
                                                deadlineExpired: _this8.state.deadlineExpired,
                                                deadlineTimer: _this8.state.deadlineTimer
                                            })
                                        ),
                                        model.note && !window.isMobile && _react2.default.createElement(
                                            "div",
                                            { className: "col-md-12 row-flex", style: { marginTop: '30px' } },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "extra-info-block" },
                                                _react2.default.createElement("img", { loading: "lazy", src: "/images/design/attention-mark.svg", alt: "" }),
                                                _react2.default.createElement(
                                                    "p",
                                                    null,
                                                    model.note
                                                )
                                            )
                                        ),
                                        _this8.props.currentModel[0].criterias.length >= 6 ? _react2.default.createElement(
                                            "div",
                                            { className: "col-md-12 criteriaTabLaptop" },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "allCriterias mobile-none" },
                                                _react2.default.createElement(
                                                    "span",
                                                    { className: "modelValues-small condition col-xs-6" },
                                                    _react2.default.createElement(
                                                        "span",
                                                        null,
                                                        "Allgemeiner Zustand:"
                                                    ),
                                                    _react2.default.createElement("br", null),
                                                    _react2.default.createElement(
                                                        "span",
                                                        null,
                                                        _react2.default.createElement(
                                                            "b",
                                                            null,
                                                            model.condition
                                                        )
                                                    )
                                                ),
                                                _this8.mapCriterias.call(_this8)
                                            )
                                        ) : '',
                                        _react2.default.createElement(
                                            "div",
                                            { className: "col-md-12" },
                                            _react2.default.createElement(
                                                "ul",
                                                { className: "offer-tab-buttons" },
                                                _react2.default.createElement(
                                                    "li",
                                                    {
                                                        "data-type": "purchase",
                                                        onClick: _this8.clickNavItem,
                                                        className: activeNavItem === 'purchase' ? 'active' : '' },
                                                    "Kaufen"
                                                ),
                                                _react2.default.createElement(
                                                    "li",
                                                    {
                                                        "data-type": "rent",
                                                        onClick: _this8.clickNavItem,
                                                        className: activeNavItem === 'rent' ? 'active' : '' },
                                                    "Mieten"
                                                )
                                            ),
                                            activeNavItem === 'rent' && _react2.default.createElement(
                                                "div",
                                                { className: "offer-tab rent" },
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "item" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "img" },
                                                        _react2.default.createElement("img", { loading: "lazy", src: '/images/offer1.svg', alt: "" })
                                                    ),
                                                    _react2.default.createElement(
                                                        "p",
                                                        null,
                                                        "Keine Kaution, keine versteckten Kosten"
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "item" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "img" },
                                                        _react2.default.createElement("img", { loading: "lazy", src: '/images/offer2.svg', alt: "" })
                                                    ),
                                                    _react2.default.createElement(
                                                        "p",
                                                        null,
                                                        "Sch\xE4den sind abgedeckt durch remarket.care"
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "item" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "img" },
                                                        _react2.default.createElement("img", { loading: "lazy", src: '/images/offer3.svg', alt: "" })
                                                    ),
                                                    _react2.default.createElement(
                                                        "p",
                                                        null,
                                                        "Flexible Mietdauer mit Kaufoption"
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "item" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "img" },
                                                        _react2.default.createElement("img", { loading: "lazy", src: '/images/offer4.svg', alt: "" })
                                                    ),
                                                    _react2.default.createElement(
                                                        "p",
                                                        null,
                                                        "Kostenloser Hin- und R\xFCckversand"
                                                    )
                                                )
                                            ),
                                            activeNavItem === 'purchase' && _react2.default.createElement(
                                                "div",
                                                { className: "offer-tab purchase" },
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "item" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "img" },
                                                        _react2.default.createElement("img", { loading: "lazy", src: '/images/offer5.svg', alt: "" })
                                                    ),
                                                    _react2.default.createElement(
                                                        "p",
                                                        null,
                                                        "Gepr\xFCfte Ger\xE4te mit Garantie"
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "item" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "img" },
                                                        _react2.default.createElement("img", { loading: "lazy", src: '/images/offer6.svg', alt: "" })
                                                    ),
                                                    _react2.default.createElement(
                                                        "p",
                                                        null,
                                                        "14 Tage R\xFCckgaberecht"
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "item" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "img" },
                                                        _react2.default.createElement("img", { loading: "lazy", src: '/images/offer7.svg', alt: "" })
                                                    ),
                                                    _react2.default.createElement(
                                                        "p",
                                                        null,
                                                        "Bequeme Ratenzahlung mit 0%-Zins"
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "item" },
                                                    _react2.default.createElement(
                                                        "div",
                                                        { className: "img" },
                                                        _react2.default.createElement("img", { loading: "lazy", src: '/images/offer8.svg', alt: "" })
                                                    ),
                                                    _react2.default.createElement(
                                                        "p",
                                                        null,
                                                        "Kostenloser A-Post Versand"
                                                    )
                                                )
                                            )
                                        ),
                                        upsellingItems.length > 0 && _react2.default.createElement(
                                            "div",
                                            { className: "col-md-12 " },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "usefull-things-block" },
                                                _react2.default.createElement(
                                                    "h3",
                                                    null,
                                                    "N\xFCtzliche Produkte"
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "usefull-items" },
                                                    _react2.default.createElement(_usefullProductItem2.default, { items: upsellingItems, basketData: basketData, addModelToBasket: _this8.addUpsellingModelToBasket })
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "col-md-12" },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "specifications" },
                                                _react2.default.createElement(
                                                    "h3",
                                                    null,
                                                    "Technische Daten"
                                                ),
                                                _react2.default.createElement(_specificationsBlock2.default, { specifications: _this8.props.specifications,
                                                    additionalSpecifications: _this8.props.additionalSpecifications })
                                            )
                                        )
                                    )
                                )
                            ),
                            !deviceStatus.boughtCurrentUser && deviceStatus.statusId != 1 ? _react2.default.createElement(_soldoutInfoBlock2.default, { className: 'mobile-none' }) : _react2.default.createElement(_additionalInfoBlock2.default, { model: model,
                                domain: domain,
                                basketData: basketData,
                                addModelToBasket: _this8.addModelToBasket,
                                deviceStatus: deviceStatus,
                                deadline: _this8.state.deadline,
                                activateCountDownCoupon: _this8.activateCountDownCoupon,
                                deadlineIsActive: _this8.state.deadlineIsActive,
                                deadlineExpired: _this8.state.deadlineExpired,
                                deadlineTimer: _this8.state.deadlineTimer,
                                className: 'mobile-none' })
                        ),
                        _react2.default.createElement("div", { className: "msgAddToBasket" })
                    );
                })
            );
        }
    }]);
    return ModelInfoBlock;
}(_react.Component);

ModelInfoBlock.propTypes = {};
ModelInfoBlock.defaultProps = {
    deviceStatus: {
        statusId: 1,
        dateOfBought: null,
        boughtCurrentUser: false
    }
};

function mapStateToProps(state) {
    return {
        basketData: state.basket.basketData,
        wishlistData: state.basket.wishlistData
    };
}
function mapDispatchToProps(dispatch) {
    return {
        basketActions: (0, _redux.bindActionCreators)(basketActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModelInfoBlock);

/***/ }),

/***/ 1254:
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

var WarrantyLightbox = function (_Component) {
    (0, _inherits3.default)(WarrantyLightbox, _Component);

    function WarrantyLightbox(props) {
        (0, _classCallCheck3.default)(this, WarrantyLightbox);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WarrantyLightbox.__proto__ || Object.getPrototypeOf(WarrantyLightbox)).call(this, props));

        _this.state = {};

        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        _this.setEqualHeight = _this.setEqualHeight.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(WarrantyLightbox, [{
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
                { className: 'warranty-light-box light-box' },
                _react2.default.createElement(
                    'div',
                    { className: 'light-box-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-12' },
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
                                    { className: 'title' },
                                    'Garantie Information'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'description' },
                                    'Bei jedem erworbenen Ger\xE4t erhalten Sie bei uns ein Rundum-sorglos-Paket. Auf jedes gebrauchte Ger\xE4te erhalten Sie ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        '1 Jahr Garantie'
                                    ),
                                    ', auf Neuger\xE4te ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        '2 Jahre Garantie'
                                    ),
                                    '.'
                                ),
                                _react2.default.createElement('p', { className: 'description' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'wrap-steps' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'horizontal first' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-step' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wrap' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/step-1.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'Ger\xE4t hat ein Problem'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image arrow' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/arrow.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-step' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wrap' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/step-2.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'Erstelle ein Retourenlabel im Kundenkonto'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image arrow' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/arrow.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-step' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wrap' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/step-3.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'Sende es kostenlos ein oder besuche unseren Shop'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image arrow' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/arrow.svg', alt: '' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'vertical' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-step' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wrap' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/step-4-a.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'Wenn eine Reparatur m\xF6glich ist wird diese kostenlos durchgef\xFChrt'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-step' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wrap' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/step-4-b.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'Wenn diese nicht m\xF6glich ist, wird das Ger\xE4t ausgetauscht'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-step' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wrap' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/step-4-c.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'Falls der Austausch nicht m\xF6glich ist, erhalten Sie eine Gutschrift'
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'horizontal last' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'image arrow', style: { marginLeft: '10px' } },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/arrow.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-step' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wrap' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warranty-lightbox/step-5.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'Happy End!'
                                                )
                                            )
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
    return WarrantyLightbox;
}(_react.Component);

WarrantyLightbox.propTypes = {};
WarrantyLightbox.defaultProps = {};

exports.default = WarrantyLightbox;

/***/ }),

/***/ 1255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(316);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMasonryComponent = __webpack_require__(1256);

var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

var _reactAnimateOnScroll = __webpack_require__(1276);

var _reactAnimateOnScroll2 = _interopRequireDefault(_reactAnimateOnScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpecificationsBlock = function SpecificationsBlock(_ref) {
    var specifications = _ref.specifications,
        additionalSpecifications = _ref.additionalSpecifications;

    function mapSpecification(itemSpecification, i) {
        return _react2.default.createElement(
            'div',
            { className: 'col-sm-6 col-xs-12 item-specification-block', key: i },
            _react2.default.createElement(
                _reactAnimateOnScroll2.default,
                { animateOnce: true, animateIn: 'fadeIn', offset: i <= 1 ? 0 : 150 },
                _react2.default.createElement(
                    'div',
                    { key: i, className: 'box-category' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        itemSpecification.categoryName,
                        itemSpecification.categoryDescription && _react2.default.createElement(
                            'div',
                            { className: 'descriptionBlock' },
                            _react2.default.createElement('i', { className: 'fa fa-info', 'aria-hidden': 'true' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'descriptionOptions' },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    itemSpecification.categoryDescription
                                )
                            )
                        )
                    ),
                    itemSpecification.options.map(function (itemOption, i) {
                        return _react2.default.createElement(
                            'div',
                            { key: i, className: 'box-specifications' },
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    { className: 'box-specifications-option' },
                                    itemOption.optionName,
                                    itemOption.optionDescription && _react2.default.createElement(
                                        'div',
                                        { className: 'descriptionBlock' },
                                        _react2.default.createElement('i', { className: 'fa fa-info', 'aria-hidden': 'true' }),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'descriptionOptions' },
                                            _react2.default.createElement(
                                                'p',
                                                null,
                                                itemOption.optionDescription
                                            )
                                        )
                                    ),
                                    ':'
                                ),
                                _react2.default.createElement('strong', null),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'box-specifications-values' },
                                    itemOption.values.map(function (itemValue, i) {
                                        return _react2.default.createElement(
                                            'span',
                                            { className: 'value', key: i },
                                            itemValue.valueName,
                                            itemValue.valueName === 'Ja' && _react2.default.createElement('span', { className: 'circleJa' }),
                                            itemValue.valueDescription && _react2.default.createElement(
                                                'div',
                                                { className: 'descriptionBlock' },
                                                _react2.default.createElement('i', { className: 'fa fa-info', 'aria-hidden': 'true' }),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'descriptionOptions' },
                                                    _react2.default.createElement(
                                                        'p',
                                                        null,
                                                        itemValue.valueDescription
                                                    )
                                                )
                                            ),
                                            i < itemOption.values.length - 1 ? ', ' : null
                                        );
                                    })
                                )
                            )
                        );
                    })
                )
            )
        );
    }
    function mapAdditionalSpecifications() {
        var arrayElements = [];
        for (var key in additionalSpecifications) {
            var value = '';
            switch (key) {
                case 'SIMLock':
                    additionalSpecifications[key] === 0 ? value = 'Nein' : 'Ja';
                    arrayElements.push(_react2.default.createElement(
                        'div',
                        { key: key, className: 'box-specifications' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'box-specifications-option' },
                                'SIM-Lock:'
                            ),
                            _react2.default.createElement('strong', null),
                            _react2.default.createElement(
                                'span',
                                { className: 'box-specifications-values' },
                                value,
                                value === 'Ja' && _react2.default.createElement('span', { className: 'circleJa' })
                            )
                        )
                    ));
                    break;
                case 'cloudLock':
                    additionalSpecifications[key] === 0 ? value = 'Nein' : 'Ja';
                    arrayElements.push(_react2.default.createElement(
                        'div',
                        { key: key, className: 'box-specifications' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'box-specifications-option' },
                                'Cloud-Lock:'
                            ),
                            _react2.default.createElement('strong', null),
                            _react2.default.createElement(
                                'span',
                                { className: 'box-specifications-values' },
                                value,
                                value === 'Ja' && _react2.default.createElement('span', { className: 'circleJa' })
                            )
                        )
                    ));
                    break;
                case 'batteryCapacity':
                    value = additionalSpecifications[key];
                    arrayElements.push(_react2.default.createElement(
                        'div',
                        { key: key, className: 'box-specifications' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'box-specifications-option' },
                                'Batteriekapazit\xE4t:'
                            ),
                            _react2.default.createElement('strong', null),
                            _react2.default.createElement(
                                'span',
                                { className: 'box-specifications-values' },
                                value == -1 ? "n.v." : value + ' %'
                            )
                        )
                    ));
                    break;
                case 'operationSystemVersion':
                    value = additionalSpecifications[key];
                    arrayElements.push(_react2.default.createElement(
                        'div',
                        { key: key, className: 'box-specifications' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'box-specifications-option' },
                                'Betriebssystem Version:'
                            ),
                            _react2.default.createElement('strong', null),
                            _react2.default.createElement(
                                'span',
                                { className: 'box-specifications-values' },
                                value == -1 ? "n.v." : value
                            )
                        )
                    ));
                    break;
            }
        }
        return _react2.default.createElement(
            'div',
            { className: 'col-sm-6 col-xs-12 item-specification-block', key: 'detail' },
            _react2.default.createElement(
                _reactAnimateOnScroll2.default,
                { animateOnce: true, animateIn: 'fadeIn' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-category' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Detaillierte Informationen'
                    ),
                    arrayElements
                )
            )
        );
    }

    var additionalSpecification = additionalSpecifications && Object.keys(additionalSpecifications).length > 0 && mapAdditionalSpecifications();
    var allSpecifications = specifications ? [].concat((0, _toConsumableArray3.default)(specifications.map(mapSpecification)), [additionalSpecification]) : [];

    return _react2.default.createElement(
        'div',
        { className: 'specificationsBlock' },
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _reactMasonryComponent2.default,
                { className: 'wrap-specifications', disableImagesLoaded: true },
                allSpecifications
            )
        )
    );
};

SpecificationsBlock.propTypes = {};
SpecificationsBlock.defaultProps = {};

exports.default = SpecificationsBlock;

/***/ }),

/***/ 1256:
/***/ (function(module, exports, __webpack_require__) {

var isBrowser = typeof window !== 'undefined';
var Masonry = isBrowser ? window.Masonry || __webpack_require__(1257) : null;
var imagesloaded = isBrowser ? __webpack_require__(1262) : null;
var assign = __webpack_require__(1263);
var elementResizeDetectorMaker = __webpack_require__(1264);
var debounce = __webpack_require__(955);
var omit = __webpack_require__(1275);
var PropTypes = __webpack_require__(28);
var React = __webpack_require__(16);
var createReactClass = __webpack_require__(44);
var refName = 'masonryContainer';

var propTypes = {
  enableResizableChildren: PropTypes.bool,
  disableImagesLoaded: PropTypes.bool,
  onImagesLoaded: PropTypes.func,
  updateOnEachImageLoad: PropTypes.bool,
  options: PropTypes.object,
  elementType: PropTypes.string,
  onLayoutComplete: PropTypes.func,
  onRemoveComplete: PropTypes.func
};

var MasonryComponent = createReactClass({
  masonry: false,
  erd: undefined,
  latestKnownDomChildren: [],
  displayName: 'MasonryComponent',
  propTypes: propTypes,

  getDefaultProps: function() {
    return {
      enableResizableChildren: false,
      disableImagesLoaded: false,
      updateOnEachImageLoad: false,
      options: {},
      className: '',
      elementType: 'div',
      onLayoutComplete: function() {
      },
      onRemoveComplete: function() {
      }
    };
  },

  initializeMasonry: function(force) {
    if (!this.masonry || force) {
      this.masonry = new Masonry(
        this.refs[refName],
        this.props.options
      );

      if (this.props.onLayoutComplete) {
        this.masonry.on('layoutComplete', this.props.onLayoutComplete);
      }

      if (this.props.onRemoveComplete) {
        this.masonry.on('removeComplete', this.props.onRemoveComplete);
      }

      this.latestKnownDomChildren = this.getCurrentDomChildren();
    }
  },

  getCurrentDomChildren: function() {
    var node = this.refs[refName];
    var children = this.props.options.itemSelector ? node.querySelectorAll(this.props.options.itemSelector) : node.children;
    return Array.prototype.slice.call(children);
  },

  diffDomChildren: function() {
    var forceItemReload = false;

    var knownChildrenStillAttached = this.latestKnownDomChildren.filter(function(element) {
      /*
       * take only elements attached to DOM
       * (aka the parent is the masonry container, not null)
       * otherwise masonry would try to "remove it" again from the DOM
       */
      return !!element.parentNode;
    });

    /*
     * If not all known children are attached to the dom - we have no other way of notifying
     * masonry to remove the ones not still attached besides invoking a complete item reload.
     * basically all the rest of the code below does not matter in that case.
     */
    if (knownChildrenStillAttached.length !== this.latestKnownDomChildren) {
      forceItemReload = true;
    }

    var currentDomChildren = this.getCurrentDomChildren();

    /*
     * Since we are looking for a known child which is also attached to the dom AND
     * not attached to the dom at the same time - this would *always* produce an empty array.
     */
    var removed = knownChildrenStillAttached.filter(function(attachedKnownChild) {
      return !~currentDomChildren.indexOf(attachedKnownChild);
    });

    /*
     * This would get any children which are attached to the dom but are *unkown* to us
     * from previous renders
     */
    var newDomChildren = currentDomChildren.filter(function(currentChild) {
      return !~knownChildrenStillAttached.indexOf(currentChild);
    });

    var beginningIndex = 0;

    // get everything added to the beginning of the DOMNode list
    var prepended = newDomChildren.filter(function(newChild) {
      var prepend = (beginningIndex === currentDomChildren.indexOf(newChild));

      if (prepend) {
        // increase the index
        beginningIndex++;
      }

      return prepend;
    });

    // we assume that everything else is appended
    var appended = newDomChildren.filter(function(el) {
      return prepended.indexOf(el) === -1;
    });

    /*
     * otherwise we reverse it because so we're going through the list picking off the items that
     * have been added at the end of the list. this complex logic is preserved in case it needs to be
     * invoked
     *
     * var endingIndex = currentDomChildren.length - 1;
     *
     * newDomChildren.reverse().filter(function(newChild, i){
     *     var append = endingIndex == currentDomChildren.indexOf(newChild);
     *
     *     if (append) {
     *         endingIndex--;
     *     }
     *
     *     return append;
     * });
     */

    // get everything added to the end of the DOMNode list
    var moved = [];

    /*
     * This would always be true (see above about the lofic for "removed")
     */
    if (removed.length === 0) {
      /*
       * 'moved' will contain some random elements (if any) since the "knownChildrenStillAttached" is a filter
       * of the "known" children which are still attached - All indexes could basically change. (for example
       * if the first element is not attached)
       * Don't trust this array.
       */
      moved = knownChildrenStillAttached.filter(function(child, index) {
        return index !== currentDomChildren.indexOf(child);
      });
    }

    this.latestKnownDomChildren = currentDomChildren;

    return {
      old: knownChildrenStillAttached, // Not used
      new: currentDomChildren, // Not used
      removed: removed,
      appended: appended,
      prepended: prepended,
      moved: moved,
      forceItemReload: forceItemReload
    };
  },

  performLayout: function() {
    var diff = this.diffDomChildren();

    // Would never be true. (see comments of 'diffDomChildren' about 'removed')
    if (diff.removed.length > 0) {
      if (this.props.enableResizableChildren) {
        diff.removed.forEach(this.erd.removeAllListeners, this.erd);
      }
      this.masonry.remove(diff.removed);
      this.masonry.reloadItems();
    }

    if (diff.appended.length > 0) {
      this.masonry.appended(diff.appended);

      if (diff.prepended.length === 0) {
        this.masonry.reloadItems();
      }

      if (this.props.enableResizableChildren) {
        diff.appended.forEach(this.listenToElementResize, this);
      }
    }

    if (diff.prepended.length > 0) {
      this.masonry.prepended(diff.prepended);

      if (this.props.enableResizableChildren) {
        diff.prepended.forEach(this.listenToElementResize, this);
      }
    }

    if (diff.forceItemReload || diff.moved.length > 0) {
      this.masonry.reloadItems();
    }

    this.masonry.layout();
  },

  imagesLoaded: function() {
    if (this.props.disableImagesLoaded) {
      return;
    }

    imagesloaded(this.refs[refName])
      .on(
        this.props.updateOnEachImageLoad ? 'progress' : 'always',
        debounce(
          function(instance) {
            if (this.props.onImagesLoaded) {
              this.props.onImagesLoaded(instance);
            }
            this.masonry.layout();
          }.bind(this), 100)
      );
  },

  initializeResizableChildren: function() {
    if (!this.props.enableResizableChildren) {
      return;
    }

    this.erd = elementResizeDetectorMaker({
      strategy: 'scroll'
    });

    this.latestKnownDomChildren.forEach(this.listenToElementResize, this);
  },

  listenToElementResize: function(el) {
    this.erd.listenTo(el, function() {
      this.masonry.layout()
    }.bind(this))
  },

  destroyErd: function() {
    if (this.erd) {
      this.latestKnownDomChildren.forEach(this.erd.uninstall, this.erd);
    }
  },

  componentDidMount: function() {
    this.initializeMasonry();
    this.initializeResizableChildren();
    this.imagesLoaded();
  },

  componentDidUpdate: function() {
    this.performLayout();
    this.imagesLoaded();
  },

  componentWillUnmount: function() {
    this.destroyErd();

    // unregister events
    if (this.props.onLayoutComplete) {
      this.masonry.off('layoutComplete', this.props.onLayoutComplete);
    }

    if (this.props.onRemoveComplete) {
      this.masonry.off('removeComplete', this.props.onRemoveComplete);
    }

    this.masonry.destroy();
  },

  render: function() {
    var props = omit(this.props, Object.keys(propTypes));
    return React.createElement(this.props.elementType, assign({}, props, {ref: refName}), this.props.children);
  }
});

module.exports = MasonryComponent;
module.exports.default = MasonryComponent;


/***/ }),

/***/ 1257:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Masonry v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(1258),
        __webpack_require__(1082)
      ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('outlayer'),
      require('get-size')
    );
  } else {
    // browser global
    window.Masonry = factory(
      window.Outlayer,
      window.getSize
    );
  }

}( window, function factory( Outlayer, getSize ) {

'use strict';

// -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');
  // isFitWidth -> fitWidth
  Masonry.compatOptions.fitWidth = 'isFitWidth';

  var proto = Masonry.prototype;

  proto._resetLayout = function() {
    this.getSize();
    this._getMeasurement( 'columnWidth', 'outerWidth' );
    this._getMeasurement( 'gutter', 'outerWidth' );
    this.measureColumns();

    // reset column Y
    this.colYs = [];
    for ( var i=0; i < this.cols; i++ ) {
      this.colYs.push( 0 );
    }

    this.maxY = 0;
    this.horizontalColIndex = 0;
  };

  proto.measureColumns = function() {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if ( !this.columnWidth ) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[ mathMethod ]( cols );
    this.cols = Math.max( cols, 1 );
  };

  proto.getContainerWidth = function() {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');
    var container = isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize( container );
    this.containerWidth = size && size.innerWidth;
  };

  proto._getItemLayoutPosition = function( item ) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
    colSpan = Math.min( colSpan, this.cols );
    // use horizontal or top column position
    var colPosMethod = this.options.horizontalOrder ?
      '_getHorizontalColPosition' : '_getTopColPosition';
    var colPosition = this[ colPosMethod ]( colSpan, item );
    // position the brick
    var position = {
      x: this.columnWidth * colPosition.col,
      y: colPosition.y
    };
    // apply setHeight to necessary columns
    var setHeight = colPosition.y + item.size.outerHeight;
    var setMax = colSpan + colPosition.col;
    for ( var i = colPosition.col; i < setMax; i++ ) {
      this.colYs[i] = setHeight;
    }

    return position;
  };

  proto._getTopColPosition = function( colSpan ) {
    var colGroup = this._getTopColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );

    return {
      col: colGroup.indexOf( minimumY ),
      y: minimumY,
    };
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  proto._getTopColGroup = function( colSpan ) {
    if ( colSpan < 2 ) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for ( var i = 0; i < groupCount; i++ ) {
      colGroup[i] = this._getColGroupY( i, colSpan );
    }
    return colGroup;
  };

  proto._getColGroupY = function( col, colSpan ) {
    if ( colSpan < 2 ) {
      return this.colYs[ col ];
    }
    // make an array of colY values for that one group
    var groupColYs = this.colYs.slice( col, col + colSpan );
    // and get the max value of the array
    return Math.max.apply( Math, groupColYs );
  };

  // get column position based on horizontal index. #873
  proto._getHorizontalColPosition = function( colSpan, item ) {
    var col = this.horizontalColIndex % this.cols;
    var isOver = colSpan > 1 && col + colSpan > this.cols;
    // shift to next row if item can't fit on current row
    col = isOver ? 0 : col;
    // don't let zero-size items take up space
    var hasSize = item.size.outerWidth && item.size.outerHeight;
    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

    return {
      col: col,
      y: this._getColGroupY( col, colSpan ),
    };
  };

  proto._manageStamp = function( stamp ) {
    var stampSize = getSize( stamp );
    var offset = this._getElementOffset( stamp );
    // get the columns that this stamp affects
    var isOriginLeft = this._getOption('originLeft');
    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor( firstX / this.columnWidth );
    firstCol = Math.max( 0, firstCol );
    var lastCol = Math.floor( lastX / this.columnWidth );
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min( this.cols - 1, lastCol );
    // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');
    var stampMaxY = ( isOriginTop ? offset.top : offset.bottom ) +
      stampSize.outerHeight;
    for ( var i = firstCol; i <= lastCol; i++ ) {
      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
    }
  };

  proto._getContainerSize = function() {
    this.maxY = Math.max.apply( Math, this.colYs );
    var size = {
      height: this.maxY
    };

    if ( this._getOption('fitWidth') ) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  proto._getContainerFitWidth = function() {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while ( --i ) {
      if ( this.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
  };

  proto.needsResizeLayout = function() {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;

}));


/***/ }),

/***/ 1258:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(1081),
        __webpack_require__(1082),
        __webpack_require__(1259),
        __webpack_require__(1261)
      ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter, getSize, utils, Item ) {
        return factory( window, EvEmitter, getSize, utils, Item);
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, EvEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  var isInitLayout = this._getOption('initLayout');
  if ( isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  initLayout: true,
  originLeft: true,
  originTop: true,
  resize: true,
  resizeContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

var proto = Outlayer.prototype;
// inherit EvEmitter
utils.extend( proto, EvEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

/**
 * get backwards compatible option value, check old name
 */
proto._getOption = function( option ) {
  var oldOption = this.constructor.compatOptions[ option ];
  return oldOption && this.options[ oldOption ] !== undefined ?
    this.options[ oldOption ] : this.options[ option ];
};

Outlayer.compatOptions = {
  // currentName: oldName
  initLayout: 'isInitLayout',
  horizontal: 'isHorizontal',
  layoutInstant: 'isLayoutInstant',
  originLeft: 'isOriginLeft',
  originTop: 'isOriginTop',
  resize: 'isResizeBound',
  resizeContainer: 'isResizingContainer'
};

proto._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  var canBindResize = this._getOption('resize');
  if ( canBindResize ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
proto.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
proto._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0; i < itemElems.length; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
proto._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
proto.getItemElements = function() {
  return this.items.map( function( item ) {
    return item.element;
  });
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
proto.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var layoutInstant = this._getOption('layoutInstant');
  var isInstant = layoutInstant !== undefined ?
    layoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
proto._init = proto.layout;

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();
};


proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
proto._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option == 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( option instanceof HTMLElement ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
proto.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
proto._getItemsForLayout = function( items ) {
  return items.filter( function( item ) {
    return !item.isIgnored;
  });
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
proto._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  items.forEach( function( item ) {
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }, this );

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
proto._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
proto._processLayoutQueue = function( queue ) {
  this.updateStagger();
  queue.forEach( function( obj, i ) {
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
  }, this );
};

// set stagger from option in milliseconds number
proto.updateStagger = function() {
  var stagger = this.options.stagger;
  if ( stagger === null || stagger === undefined ) {
    this.stagger = 0;
    return;
  }
  this.stagger = getMilliseconds( stagger );
  return this.stagger;
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
proto._positionItem = function( item, x, y, isInstant, i ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.stagger( i * this.stagger );
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
proto._postLayout = function() {
  this.resizeContainer();
};

proto.resizeContainer = function() {
  var isResizingContainer = this._getOption('resizeContainer');
  if ( !isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
proto._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
proto._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
proto._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }

  // bind callback
  items.forEach( function( item ) {
    item.once( eventName, tick );
  });
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
proto.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
proto.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
proto.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  elems.forEach( this.ignore, this );
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
proto.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  elems.forEach( function( elem ) {
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }, this );
};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
proto._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems == 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

proto._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  this.stamps.forEach( this._manageStamp, this );
};

// update boundingLeft / Top
proto._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
proto._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
proto._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
proto.handleEvent = utils.handleEvent;

/**
 * Bind layout to window resizing
 */
proto.bindResize = function() {
  window.addEventListener( 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
proto.unbindResize = function() {
  window.removeEventListener( 'resize', this );
  this.isResizeBound = false;
};

proto.onresize = function() {
  this.resize();
};

utils.debounceMethod( Outlayer, 'onresize', 100 );

proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
proto.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
proto.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
proto.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.reveal();
  });
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.hide();
  });
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
proto.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0; i < this.items.length; i++ ) {
    var item = this.items[i];
    if ( item.element == elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
proto.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  elems.forEach( function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }, this );

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
proto.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  removeItems.forEach( function( item ) {
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }, this );
};

// ----- destroy ----- //

// remove and disable Outlayer instance
proto.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  this.items.forEach( function( item ) {
    item.destroy();
  });

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  var Layout = subclass( Outlayer );
  // apply new options and compatOptions
  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  utils.extend( Layout.defaults, options );
  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = subclass( Item );

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

function subclass( Parent ) {
  function SubClass() {
    Parent.apply( this, arguments );
  }

  SubClass.prototype = Object.create( Parent.prototype );
  SubClass.prototype.constructor = SubClass;

  return SubClass;
}

// ----- helpers ----- //

// how many milliseconds are in each unit
var msUnits = {
  ms: 1,
  s: 1000
};

// munge time-like parameter into millisecond number
// '0.4s' -> 40
function getMilliseconds( time ) {
  if ( typeof time == 'number' ) {
    return time;
  }
  var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
  var num = matches && matches[1];
  var unit = matches && matches[2];
  if ( !num.length ) {
    return 0;
  }
  num = parseFloat( num );
  var mult = msUnits[ unit ] || 1;
  return num * mult;
}

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));


/***/ }),

/***/ 1259:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(1260)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( matchesSelector ) {
      return factory( window, matchesSelector );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));


/***/ }),

/***/ 1260:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));


/***/ }),

/***/ 1261:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Outlayer Item
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(1081),
        __webpack_require__(1082)
      ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      require('ev-emitter'),
      require('get-size')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window.EvEmitter,
      window.getSize
    );
  }

}( window, function factory( EvEmitter, getSize ) {
'use strict';

// ----- helpers ----- //

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //


var docElemStyle = document.documentElement.style;

var transitionProperty = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';
var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  transition: 'transitionend'
}[ transitionProperty ];

// cache all vendor properties that could have vendor prefix
var vendorProperties = {
  transform: transformProperty,
  transition: transitionProperty,
  transitionDuration: transitionProperty + 'Duration',
  transitionProperty: transitionProperty + 'Property',
  transitionDelay: transitionProperty + 'Delay'
};

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EvEmitter
var proto = Item.prototype = Object.create( EvEmitter.prototype );
proto.constructor = Item;

proto._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
proto.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
proto.getPosition = function() {
  var style = getComputedStyle( this.element );
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  var x = parseFloat( xValue );
  var y = parseFloat( yValue );
  // convert percent to pixels
  var layoutSize = this.layout.size;
  if ( xValue.indexOf('%') != -1 ) {
    x = ( x / 100 ) * layoutSize.width;
  }
  if ( yValue.indexOf('%') != -1 ) {
    y = ( y / 100 ) * layoutSize.height;
  }
  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
proto.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var style = {};
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');

  // x
  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = isOriginLeft ? 'left' : 'right';
  var xResetProperty = isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = isOriginTop ? 'top' : 'bottom';
  var yResetProperty = isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

proto.getXValue = function( x ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && !isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

proto.getYValue = function( y ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};

proto._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var didNotMove = x == this.position.x && y == this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

proto.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  x = isOriginLeft ? x : -x;
  y = isOriginTop ? y : -y;
  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
};

// non transition + transform support
proto.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

proto.moveTo = proto._transitionTo;

proto.setPosition = function( x, y ) {
  this.position.x = parseFloat( x );
  this.position.y = parseFloat( y );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
proto._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
proto.transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' + toDashedAll( transformProperty );

proto.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // munge number to millisecond, to match stagger
  var duration = this.layout.options.transitionDuration;
  duration = typeof duration == 'number' ? duration + 'ms' : duration;
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: duration,
    transitionDelay: this.staggerDelay || 0
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

// ----- events ----- //

proto.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

proto.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform'
};

proto.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

proto.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
proto._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: '',
  transitionDelay: ''
};

proto.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- stagger ----- //

proto.stagger = function( delay ) {
  delay = isNaN( delay ) ? 0 : delay;
  this.staggerDelay = delay + 'ms';
};

// ----- show/hide/remove ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

proto.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  this.once( 'transitionEnd', function() {
    this.removeElem();
  });
  this.hide();
};

proto.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

proto.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

proto.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));


/***/ }),

/***/ 1262:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(1081)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter ) {
      return factory( window, EvEmitter );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});


/***/ }),

/***/ 1263:
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = assign;


/***/ }),

/***/ 1264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach                 = __webpack_require__(1121).forEach;
var elementUtilsMaker       = __webpack_require__(1265);
var listenerHandlerMaker    = __webpack_require__(1266);
var idGeneratorMaker        = __webpack_require__(1267);
var idHandlerMaker          = __webpack_require__(1268);
var reporterMaker           = __webpack_require__(1269);
var browserDetector         = __webpack_require__(1122);
var batchProcessorMaker     = __webpack_require__(1270);
var stateHandler            = __webpack_require__(1272);

//Detection strategies.
var objectStrategyMaker     = __webpack_require__(1273);
var scrollStrategyMaker     = __webpack_require__(1274);

function isCollection(obj) {
    return Array.isArray(obj) || obj.length !== undefined;
}

function toArray(collection) {
    if (!Array.isArray(collection)) {
        var array = [];
        forEach(collection, function (obj) {
            array.push(obj);
        });
        return array;
    } else {
        return collection;
    }
}

function isElement(obj) {
    return obj && obj.nodeType === 1;
}

/**
 * @typedef idHandler
 * @type {object}
 * @property {function} get Gets the resize detector id of the element.
 * @property {function} set Generate and sets the resize detector id of the element.
 */

/**
 * @typedef Options
 * @type {object}
 * @property {boolean} callOnAdd    Determines if listeners should be called when they are getting added.
                                    Default is true. If true, the listener is guaranteed to be called when it has been added.
                                    If false, the listener will not be guarenteed to be called when it has been added (does not prevent it from being called).
 * @property {idHandler} idHandler  A custom id handler that is responsible for generating, setting and retrieving id's for elements.
                                    If not provided, a default id handler will be used.
 * @property {reporter} reporter    A custom reporter that handles reporting logs, warnings and errors.
                                    If not provided, a default id handler will be used.
                                    If set to false, then nothing will be reported.
 * @property {boolean} debug        If set to true, the the system will report debug messages as default for the listenTo method.
 */

/**
 * Creates an element resize detector instance.
 * @public
 * @param {Options?} options Optional global options object that will decide how this instance will work.
 */
module.exports = function(options) {
    options = options || {};

    //idHandler is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var idHandler;

    if (options.idHandler) {
        // To maintain compatability with idHandler.get(element, readonly), make sure to wrap the given idHandler
        // so that readonly flag always is true when it's used here. This may be removed next major version bump.
        idHandler = {
            get: function (element) { return options.idHandler.get(element, true); },
            set: options.idHandler.set
        };
    } else {
        var idGenerator = idGeneratorMaker();
        var defaultIdHandler = idHandlerMaker({
            idGenerator: idGenerator,
            stateHandler: stateHandler
        });
        idHandler = defaultIdHandler;
    }

    //reporter is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var reporter = options.reporter;

    if(!reporter) {
        //If options.reporter is false, then the reporter should be quiet.
        var quiet = reporter === false;
        reporter = reporterMaker(quiet);
    }

    //batchProcessor is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var batchProcessor = getOption(options, "batchProcessor", batchProcessorMaker({ reporter: reporter }));

    //Options to be used as default for the listenTo function.
    var globalOptions = {};
    globalOptions.callOnAdd     = !!getOption(options, "callOnAdd", true);
    globalOptions.debug         = !!getOption(options, "debug", false);

    var eventListenerHandler    = listenerHandlerMaker(idHandler);
    var elementUtils            = elementUtilsMaker({
        stateHandler: stateHandler
    });

    //The detection strategy to be used.
    var detectionStrategy;
    var desiredStrategy = getOption(options, "strategy", "object");
    var importantCssRules = getOption(options, "important", false);
    var strategyOptions = {
        reporter: reporter,
        batchProcessor: batchProcessor,
        stateHandler: stateHandler,
        idHandler: idHandler,
        important: importantCssRules
    };

    if(desiredStrategy === "scroll") {
        if (browserDetector.isLegacyOpera()) {
            reporter.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy.");
            desiredStrategy = "object";
        } else if (browserDetector.isIE(9)) {
            reporter.warn("Scroll strategy is not supported on IE9. Changing to object strategy.");
            desiredStrategy = "object";
        }
    }

    if(desiredStrategy === "scroll") {
        detectionStrategy = scrollStrategyMaker(strategyOptions);
    } else if(desiredStrategy === "object") {
        detectionStrategy = objectStrategyMaker(strategyOptions);
    } else {
        throw new Error("Invalid strategy name: " + desiredStrategy);
    }

    //Calls can be made to listenTo with elements that are still being installed.
    //Also, same elements can occur in the elements list in the listenTo function.
    //With this map, the ready callbacks can be synchronized between the calls
    //so that the ready callback can always be called when an element is ready - even if
    //it wasn't installed from the function itself.
    var onReadyCallbacks = {};

    /**
     * Makes the given elements resize-detectable and starts listening to resize events on the elements. Calls the event callback for each event for each element.
     * @public
     * @param {Options?} options Optional options object. These options will override the global options. Some options may not be overriden, such as idHandler.
     * @param {element[]|element} elements The given array of elements to detect resize events of. Single element is also valid.
     * @param {function} listener The callback to be executed for each resize event for each element.
     */
    function listenTo(options, elements, listener) {
        function onResizeCallback(element) {
            var listeners = eventListenerHandler.get(element);
            forEach(listeners, function callListenerProxy(listener) {
                listener(element);
            });
        }

        function addListener(callOnAdd, element, listener) {
            eventListenerHandler.add(element, listener);

            if(callOnAdd) {
                listener(element);
            }
        }

        //Options object may be omitted.
        if(!listener) {
            listener = elements;
            elements = options;
            options = {};
        }

        if(!elements) {
            throw new Error("At least one element required.");
        }

        if(!listener) {
            throw new Error("Listener required.");
        }

        if (isElement(elements)) {
            // A single element has been passed in.
            elements = [elements];
        } else if (isCollection(elements)) {
            // Convert collection to array for plugins.
            // TODO: May want to check so that all the elements in the collection are valid elements.
            elements = toArray(elements);
        } else {
            return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }

        var elementsReady = 0;

        var callOnAdd = getOption(options, "callOnAdd", globalOptions.callOnAdd);
        var onReadyCallback = getOption(options, "onReady", function noop() {});
        var debug = getOption(options, "debug", globalOptions.debug);

        forEach(elements, function attachListenerToElement(element) {
            if (!stateHandler.getState(element)) {
                stateHandler.initState(element);
                idHandler.set(element);
            }

            var id = idHandler.get(element);

            debug && reporter.log("Attaching listener to element", id, element);

            if(!elementUtils.isDetectable(element)) {
                debug && reporter.log(id, "Not detectable.");
                if(elementUtils.isBusy(element)) {
                    debug && reporter.log(id, "System busy making it detectable");

                    //The element is being prepared to be detectable. Do not make it detectable.
                    //Just add the listener, because the element will soon be detectable.
                    addListener(callOnAdd, element, listener);
                    onReadyCallbacks[id] = onReadyCallbacks[id] || [];
                    onReadyCallbacks[id].push(function onReady() {
                        elementsReady++;

                        if(elementsReady === elements.length) {
                            onReadyCallback();
                        }
                    });
                    return;
                }

                debug && reporter.log(id, "Making detectable...");
                //The element is not prepared to be detectable, so do prepare it and add a listener to it.
                elementUtils.markBusy(element, true);
                return detectionStrategy.makeDetectable({ debug: debug, important: importantCssRules }, element, function onElementDetectable(element) {
                    debug && reporter.log(id, "onElementDetectable");

                    if (stateHandler.getState(element)) {
                        elementUtils.markAsDetectable(element);
                        elementUtils.markBusy(element, false);
                        detectionStrategy.addListener(element, onResizeCallback);
                        addListener(callOnAdd, element, listener);

                        // Since the element size might have changed since the call to "listenTo", we need to check for this change,
                        // so that a resize event may be emitted.
                        // Having the startSize object is optional (since it does not make sense in some cases such as unrendered elements), so check for its existance before.
                        // Also, check the state existance before since the element may have been uninstalled in the installation process.
                        var state = stateHandler.getState(element);
                        if (state && state.startSize) {
                            var width = element.offsetWidth;
                            var height = element.offsetHeight;
                            if (state.startSize.width !== width || state.startSize.height !== height) {
                                onResizeCallback(element);
                            }
                        }

                        if(onReadyCallbacks[id]) {
                            forEach(onReadyCallbacks[id], function(callback) {
                                callback();
                            });
                        }
                    } else {
                        // The element has been unisntalled before being detectable.
                        debug && reporter.log(id, "Element uninstalled before being detectable.");
                    }

                    delete onReadyCallbacks[id];

                    elementsReady++;
                    if(elementsReady === elements.length) {
                        onReadyCallback();
                    }
                });
            }

            debug && reporter.log(id, "Already detecable, adding listener.");

            //The element has been prepared to be detectable and is ready to be listened to.
            addListener(callOnAdd, element, listener);
            elementsReady++;
        });

        if(elementsReady === elements.length) {
            onReadyCallback();
        }
    }

    function uninstall(elements) {
        if(!elements) {
            return reporter.error("At least one element is required.");
        }

        if (isElement(elements)) {
            // A single element has been passed in.
            elements = [elements];
        } else if (isCollection(elements)) {
            // Convert collection to array for plugins.
            // TODO: May want to check so that all the elements in the collection are valid elements.
            elements = toArray(elements);
        } else {
            return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }

        forEach(elements, function (element) {
            eventListenerHandler.removeAllListeners(element);
            detectionStrategy.uninstall(element);
            stateHandler.cleanState(element);
        });
    }

    function initDocument(targetDocument) {
        detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
    }

    return {
        listenTo: listenTo,
        removeListener: eventListenerHandler.removeListener,
        removeAllListeners: eventListenerHandler.removeAllListeners,
        uninstall: uninstall,
        initDocument: initDocument
    };
};

function getOption(options, name, defaultValue) {
    var value = options[name];

    if((value === undefined || value === null) && defaultValue !== undefined) {
        return defaultValue;
    }

    return value;
}


/***/ }),

/***/ 1265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(options) {
    var getState = options.stateHandler.getState;

    /**
     * Tells if the element has been made detectable and ready to be listened for resize events.
     * @public
     * @param {element} The element to check.
     * @returns {boolean} True or false depending on if the element is detectable or not.
     */
    function isDetectable(element) {
        var state = getState(element);
        return state && !!state.isDetectable;
    }

    /**
     * Marks the element that it has been made detectable and ready to be listened for resize events.
     * @public
     * @param {element} The element to mark.
     */
    function markAsDetectable(element) {
        getState(element).isDetectable = true;
    }

    /**
     * Tells if the element is busy or not.
     * @public
     * @param {element} The element to check.
     * @returns {boolean} True or false depending on if the element is busy or not.
     */
    function isBusy(element) {
        return !!getState(element).busy;
    }

    /**
     * Marks the object is busy and should not be made detectable.
     * @public
     * @param {element} element The element to mark.
     * @param {boolean} busy If the element is busy or not.
     */
    function markBusy(element, busy) {
        getState(element).busy = !!busy;
    }

    return {
        isDetectable: isDetectable,
        markAsDetectable: markAsDetectable,
        isBusy: isBusy,
        markBusy: markBusy
    };
};


/***/ }),

/***/ 1266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(idHandler) {
    var eventListeners = {};

    /**
     * Gets all listeners for the given element.
     * @public
     * @param {element} element The element to get all listeners for.
     * @returns All listeners for the given element.
     */
    function getListeners(element) {
        var id = idHandler.get(element);

        if (id === undefined) {
            return [];
        }

        return eventListeners[id] || [];
    }

    /**
     * Stores the given listener for the given element. Will not actually add the listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The callback that the element has added.
     */
    function addListener(element, listener) {
        var id = idHandler.get(element);

        if(!eventListeners[id]) {
            eventListeners[id] = [];
        }

        eventListeners[id].push(listener);
    }

    function removeListener(element, listener) {
        var listeners = getListeners(element);
        for (var i = 0, len = listeners.length; i < len; ++i) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              break;
            }
        }
    }

    function removeAllListeners(element) {
      var listeners = getListeners(element);
      if (!listeners) { return; }
      listeners.length = 0;
    }

    return {
        get: getListeners,
        add: addListener,
        removeListener: removeListener,
        removeAllListeners: removeAllListeners
    };
};


/***/ }),

/***/ 1267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function() {
    var idCount = 1;

    /**
     * Generates a new unique id in the context.
     * @public
     * @returns {number} A unique id in the context.
     */
    function generate() {
        return idCount++;
    }

    return {
        generate: generate
    };
};


/***/ }),

/***/ 1268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(options) {
    var idGenerator     = options.idGenerator;
    var getState        = options.stateHandler.getState;

    /**
     * Gets the resize detector id of the element.
     * @public
     * @param {element} element The target element to get the id of.
     * @returns {string|number|null} The id of the element. Null if it has no id.
     */
    function getId(element) {
        var state = getState(element);

        if (state && state.id !== undefined) {
            return state.id;
        }

        return null;
    }

    /**
     * Sets the resize detector id of the element. Requires the element to have a resize detector state initialized.
     * @public
     * @param {element} element The target element to set the id of.
     * @returns {string|number|null} The id of the element.
     */
    function setId(element) {
        var state = getState(element);

        if (!state) {
            throw new Error("setId required the element to have a resize detection state.");
        }

        var id = idGenerator.generate();

        state.id = id;

        return id;
    }

    return {
        get: getId,
        set: setId
    };
};


/***/ }),

/***/ 1269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global console: false */

/**
 * Reporter that handles the reporting of logs, warnings and errors.
 * @public
 * @param {boolean} quiet Tells if the reporter should be quiet or not.
 */
module.exports = function(quiet) {
    function noop() {
        //Does nothing.
    }

    var reporter = {
        log: noop,
        warn: noop,
        error: noop
    };

    if(!quiet && window.console) {
        var attachFunction = function(reporter, name) {
            //The proxy is needed to be able to call the method with the console context,
            //since we cannot use bind.
            reporter[name] = function reporterProxy() {
                var f = console[name];
                if (f.apply) { //IE9 does not support console.log.apply :)
                    f.apply(console, arguments);
                } else {
                    for (var i = 0; i < arguments.length; i++) {
                        f(arguments[i]);
                    }
                }
            };
        };

        attachFunction(reporter, "log");
        attachFunction(reporter, "warn");
        attachFunction(reporter, "error");
    }

    return reporter;
};

/***/ }),

/***/ 1270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1271);

module.exports = function batchProcessorMaker(options) {
    options             = options || {};
    var reporter        = options.reporter;
    var asyncProcess    = utils.getOption(options, "async", true);
    var autoProcess     = utils.getOption(options, "auto", true);

    if(autoProcess && !asyncProcess) {
        reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true.");
        asyncProcess = true;
    }

    var batch = Batch();
    var asyncFrameHandler;
    var isProcessing = false;

    function addFunction(level, fn) {
        if(!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
            // Since this is async, it is guaranteed to be executed after that the fn is added to the batch.
            // This needs to be done before, since we're checking the size of the batch to be 0.
            processBatchAsync();
        }

        batch.add(level, fn);
    }

    function processBatch() {
        // Save the current batch, and create a new batch so that incoming functions are not added into the currently processing batch.
        // Continue processing until the top-level batch is empty (functions may be added to the new batch while processing, and so on).
        isProcessing = true;
        while (batch.size()) {
            var processingBatch = batch;
            batch = Batch();
            processingBatch.process();
        }
        isProcessing = false;
    }

    function forceProcessBatch(localAsyncProcess) {
        if (isProcessing) {
            return;
        }

        if(localAsyncProcess === undefined) {
            localAsyncProcess = asyncProcess;
        }

        if(asyncFrameHandler) {
            cancelFrame(asyncFrameHandler);
            asyncFrameHandler = null;
        }

        if(localAsyncProcess) {
            processBatchAsync();
        } else {
            processBatch();
        }
    }

    function processBatchAsync() {
        asyncFrameHandler = requestFrame(processBatch);
    }

    function clearBatch() {
        batch           = {};
        batchSize       = 0;
        topLevel        = 0;
        bottomLevel     = 0;
    }

    function cancelFrame(listener) {
        // var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
        var cancel = clearTimeout;
        return cancel(listener);
    }

    function requestFrame(callback) {
        // var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) { return window.setTimeout(fn, 20); };
        var raf = function(fn) { return setTimeout(fn, 0); };
        return raf(callback);
    }

    return {
        add: addFunction,
        force: forceProcessBatch
    };
};

function Batch() {
    var batch       = {};
    var size        = 0;
    var topLevel    = 0;
    var bottomLevel = 0;

    function add(level, fn) {
        if(!fn) {
            fn = level;
            level = 0;
        }

        if(level > topLevel) {
            topLevel = level;
        } else if(level < bottomLevel) {
            bottomLevel = level;
        }

        if(!batch[level]) {
            batch[level] = [];
        }

        batch[level].push(fn);
        size++;
    }

    function process() {
        for(var level = bottomLevel; level <= topLevel; level++) {
            var fns = batch[level];

            for(var i = 0; i < fns.length; i++) {
                var fn = fns[i];
                fn();
            }
        }
    }

    function getSize() {
        return size;
    }

    return {
        add: add,
        process: process,
        size: getSize
    };
}


/***/ }),

/***/ 1271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports = {};

utils.getOption = getOption;

function getOption(options, name, defaultValue) {
    var value = options[name];

    if((value === undefined || value === null) && defaultValue !== undefined) {
        return defaultValue;
    }

    return value;
}


/***/ }),

/***/ 1272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var prop = "_erd";

function initState(element) {
    element[prop] = {};
    return getState(element);
}

function getState(element) {
    return element[prop];
}

function cleanState(element) {
    delete element[prop];
}

module.exports = {
    initState: initState,
    getState: getState,
    cleanState: cleanState
};


/***/ }),

/***/ 1273:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects objects to elements in order to detect resize events.
 * Heavily inspired by: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 */



var browserDetector = __webpack_require__(1122);

module.exports = function(options) {
    options             = options || {};
    var reporter        = options.reporter;
    var batchProcessor  = options.batchProcessor;
    var getState        = options.stateHandler.getState;

    if(!reporter) {
        throw new Error("Missing required dependency: reporter.");
    }

    /**
     * Adds a resize event listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
     */
    function addListener(element, listener) {
        function listenerProxy() {
            listener(element);
        }

        if(browserDetector.isIE(8)) {
            //IE 8 does not support object, but supports the resize event directly on elements.
            getState(element).object = {
                proxy: listenerProxy
            };
            element.attachEvent("onresize", listenerProxy);
        } else {
            var object = getObject(element);

            if(!object) {
                throw new Error("Element is not detectable by this strategy.");
            }

            object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
        }
    }

    function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";

        return (rules.join(seperator) + seperator).trim();
    }

    /**
     * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
     * @private
     * @param {object} options Optional options object.
     * @param {element} element The element to make detectable
     * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
     */
    function makeDetectable(options, element, callback) {
        if (!callback) {
            callback = element;
            element = options;
            options = null;
        }

        options = options || {};
        var debug = options.debug;

        function injectObject(element, callback) {
            var OBJECT_STYLE = buildCssTextString(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]);

            //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.

            // Position altering may be performed directly or on object load, depending on if style resolution is possible directly or not.
            var positionCheckPerformed = false;

            // The element may not yet be attached to the DOM, and therefore the style object may be empty in some browsers.
            // Since the style object is a reference, it will be updated as soon as the element is attached to the DOM.
            var style = window.getComputedStyle(element);
            var width = element.offsetWidth;
            var height = element.offsetHeight;

            getState(element).startSize = {
                width: width,
                height: height
            };

            function mutateDom() {
                function alterPositionStyles() {
                    if(style.position === "static") {
                        element.style.setProperty("position", "relative", options.important ? "important" : "");

                        var removeRelativeStyles = function(reporter, element, style, property) {
                            function getNumericalValue(value) {
                                return value.replace(/[^-\d\.]/g, "");
                            }

                            var value = style[property];

                            if(value !== "auto" && getNumericalValue(value) !== "0") {
                                reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                                element.style.setProperty(property, "0", options.important ? "important" : "");
                            }
                        };

                        //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
                        //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
                        removeRelativeStyles(reporter, element, style, "top");
                        removeRelativeStyles(reporter, element, style, "right");
                        removeRelativeStyles(reporter, element, style, "bottom");
                        removeRelativeStyles(reporter, element, style, "left");
                    }
                }

                function onObjectLoad() {
                    // The object has been loaded, which means that the element now is guaranteed to be attached to the DOM.
                    if (!positionCheckPerformed) {
                        alterPositionStyles();
                    }

                    /*jshint validthis: true */

                    function getDocument(element, callback) {
                        //Opera 12 seem to call the object.onload before the actual document has been created.
                        //So if it is not present, poll it with an timeout until it is present.
                        //TODO: Could maybe be handled better with object.onreadystatechange or similar.
                        if(!element.contentDocument) {
                            var state = getState(element);
                            if (state.checkForObjectDocumentTimeoutId) {
                                window.clearTimeout(state.checkForObjectDocumentTimeoutId);
                            }
                            state.checkForObjectDocumentTimeoutId = setTimeout(function checkForObjectDocument() {
                                state.checkForObjectDocumentTimeoutId = 0;
                                getDocument(element, callback);
                            }, 100);

                            return;
                        }

                        callback(element.contentDocument);
                    }

                    //Mutating the object element here seems to fire another load event.
                    //Mutating the inner document of the object element is fine though.
                    var objectElement = this;

                    //Create the style element to be added to the object.
                    getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
                        //Notify that the element is ready to be listened to.
                        callback(element);
                    });
                }

                // The element may be detached from the DOM, and some browsers does not support style resolving of detached elements.
                // The alterPositionStyles needs to be delayed until we know the element has been attached to the DOM (which we are sure of when the onObjectLoad has been fired), if style resolution is not possible.
                if (style.position !== "") {
                    alterPositionStyles(style);
                    positionCheckPerformed = true;
                }

                //Add an object element as a child to the target element that will be listened to for resize events.
                var object = document.createElement("object");
                object.style.cssText = OBJECT_STYLE;
                object.tabIndex = -1;
                object.type = "text/html";
                object.setAttribute("aria-hidden", "true");
                object.onload = onObjectLoad;

                //Safari: This must occur before adding the object to the DOM.
                //IE: Does not like that this happens before, even if it is also added after.
                if(!browserDetector.isIE()) {
                    object.data = "about:blank";
                }

                if (!getState(element)) {
                    // The element has been uninstalled before the actual loading happened.
                    return;
                }

                element.appendChild(object);
                getState(element).object = object;

                //IE: This must occur after adding the object to the DOM.
                if(browserDetector.isIE()) {
                    object.data = "about:blank";
                }
            }

            if(batchProcessor) {
                batchProcessor.add(mutateDom);
            } else {
                mutateDom();
            }
        }

        if(browserDetector.isIE(8)) {
            //IE 8 does not support objects properly. Luckily they do support the resize event.
            //So do not inject the object and notify that the element is already ready to be listened to.
            //The event handler for the resize event is attached in the utils.addListener instead.
            callback(element);
        } else {
            injectObject(element, callback);
        }
    }

    /**
     * Returns the child object of the target element.
     * @private
     * @param {element} element The target element.
     * @returns The object element of the target.
     */
    function getObject(element) {
        return getState(element).object;
    }

    function uninstall(element) {
        if (!getState(element)) {
            return;
        }

        var object = getObject(element);

        if (!object) {
            return;
        }

        if (browserDetector.isIE(8)) {
            element.detachEvent("onresize", object.proxy);
        } else {
            element.removeChild(object);
        }

        if (getState(element).checkForObjectDocumentTimeoutId) {
            window.clearTimeout(getState(element).checkForObjectDocumentTimeoutId);
        }

        delete getState(element).object;
    }

    return {
        makeDetectable: makeDetectable,
        addListener: addListener,
        uninstall: uninstall
    };
};


/***/ }),

/***/ 1274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects divs to elements in order to detect resize events on scroll events.
 * Heavily inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
 */



var forEach = __webpack_require__(1121).forEach;

module.exports = function(options) {
    options             = options || {};
    var reporter        = options.reporter;
    var batchProcessor  = options.batchProcessor;
    var getState        = options.stateHandler.getState;
    var hasState        = options.stateHandler.hasState;
    var idHandler       = options.idHandler;

    if (!batchProcessor) {
        throw new Error("Missing required dependency: batchProcessor");
    }

    if (!reporter) {
        throw new Error("Missing required dependency: reporter.");
    }

    //TODO: Could this perhaps be done at installation time?
    var scrollbarSizes = getScrollbarSizes();

    var styleId = "erd_scroll_detection_scrollbar_style";
    var detectionContainerClass = "erd_scroll_detection_container";

    function initDocument(targetDocument) {
        // Inject the scrollbar styling that prevents them from appearing sometimes in Chrome.
        // The injected container needs to have a class, so that it may be styled with CSS (pseudo elements).
        injectScrollStyle(targetDocument, styleId, detectionContainerClass);
    }

    initDocument(window.document);

    function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";

        return (rules.join(seperator) + seperator).trim();
    }

    function getScrollbarSizes() {
        var width = 500;
        var height = 500;

        var child = document.createElement("div");
        child.style.cssText = buildCssTextString(["position: absolute", "width: " + width*2 + "px", "height: " + height*2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);

        var container = document.createElement("div");
        container.style.cssText = buildCssTextString(["position: absolute", "width: " + width + "px", "height: " + height + "px", "overflow: scroll", "visibility: none", "top: " + -width*3 + "px", "left: " + -height*3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);

        container.appendChild(child);

        document.body.insertBefore(container, document.body.firstChild);

        var widthSize = width - container.clientWidth;
        var heightSize = height - container.clientHeight;

        document.body.removeChild(container);

        return {
            width: widthSize,
            height: heightSize
        };
    }

    function injectScrollStyle(targetDocument, styleId, containerClass) {
        function injectStyle(style, method) {
            method = method || function (element) {
                targetDocument.head.appendChild(element);
            };

            var styleElement = targetDocument.createElement("style");
            styleElement.innerHTML = style;
            styleElement.id = styleId;
            method(styleElement);
            return styleElement;
        }

        if (!targetDocument.getElementById(styleId)) {
            var containerAnimationClass = containerClass + "_animation";
            var containerAnimationActiveClass = containerClass + "_animation_active";
            var style = "/* Created by the element-resize-detector library. */\n";
            style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString(["display: none"]) + " }\n\n";
            style += "." + containerAnimationActiveClass + " { " + buildCssTextString(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass]) + " }\n";
            style += "@-webkit-keyframes " + containerAnimationClass +  " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n";
            style += "@keyframes " + containerAnimationClass +          " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }";
            injectStyle(style);
        }
    }

    function addAnimationClass(element) {
        element.className += " " + detectionContainerClass + "_animation_active";
    }

    function addEvent(el, name, cb) {
        if (el.addEventListener) {
            el.addEventListener(name, cb);
        } else if(el.attachEvent) {
            el.attachEvent("on" + name, cb);
        } else {
            return reporter.error("[scroll] Don't know how to add event listeners.");
        }
    }

    function removeEvent(el, name, cb) {
        if (el.removeEventListener) {
            el.removeEventListener(name, cb);
        } else if(el.detachEvent) {
            el.detachEvent("on" + name, cb);
        } else {
            return reporter.error("[scroll] Don't know how to remove event listeners.");
        }
    }

    function getExpandElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
    }

    function getShrinkElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
    }

    /**
     * Adds a resize event listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
     */
    function addListener(element, listener) {
        var listeners = getState(element).listeners;

        if (!listeners.push) {
            throw new Error("Cannot add listener to an element that is not detectable.");
        }

        getState(element).listeners.push(listener);
    }

    /**
     * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
     * @private
     * @param {object} options Optional options object.
     * @param {element} element The element to make detectable
     * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
     */
    function makeDetectable(options, element, callback) {
        if (!callback) {
            callback = element;
            element = options;
            options = null;
        }

        options = options || {};

        function debug() {
            if (options.debug) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(idHandler.get(element), "Scroll: ");
                if (reporter.log.apply) {
                    reporter.log.apply(null, args);
                } else {
                    for (var i = 0; i < args.length; i++) {
                        reporter.log(args[i]);
                    }
                }
            }
        }

        function isDetached(element) {
            function isInDocument(element) {
                var isInShadowRoot = element.getRootNode && element.getRootNode().contains(element);
                return element === element.ownerDocument.body || element.ownerDocument.body.contains(element) || isInShadowRoot;
            }

            if (!isInDocument(element)) {
                return true;
            }

            // FireFox returns null style in hidden iframes. See https://github.com/wnr/element-resize-detector/issues/68 and https://bugzilla.mozilla.org/show_bug.cgi?id=795520
            if (window.getComputedStyle(element) === null) {
                return true;
            }

            return false;
        }

        function isUnrendered(element) {
            // Check the absolute positioned container since the top level container is display: inline.
            var container = getState(element).container.childNodes[0];
            var style = window.getComputedStyle(container);
            return !style.width || style.width.indexOf("px") === -1; //Can only compute pixel value when rendered.
        }

        function getStyle() {
            // Some browsers only force layouts when actually reading the style properties of the style object, so make sure that they are all read here,
            // so that the user of the function can be sure that it will perform the layout here, instead of later (important for batching).
            var elementStyle            = window.getComputedStyle(element);
            var style                   = {};
            style.position              = elementStyle.position;
            style.width                 = element.offsetWidth;
            style.height                = element.offsetHeight;
            style.top                   = elementStyle.top;
            style.right                 = elementStyle.right;
            style.bottom                = elementStyle.bottom;
            style.left                  = elementStyle.left;
            style.widthCSS              = elementStyle.width;
            style.heightCSS             = elementStyle.height;
            return style;
        }

        function storeStartSize() {
            var style = getStyle();
            getState(element).startSize = {
                width: style.width,
                height: style.height
            };
            debug("Element start size", getState(element).startSize);
        }

        function initListeners() {
            getState(element).listeners = [];
        }

        function storeStyle() {
            debug("storeStyle invoked.");
            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            var style = getStyle();
            getState(element).style = style;
        }

        function storeCurrentSize(element, width, height) {
            getState(element).lastWidth = width;
            getState(element).lastHeight  = height;
        }

        function getExpandChildElement(element) {
            return getExpandElement(element).childNodes[0];
        }

        function getWidthOffset() {
            return 2 * scrollbarSizes.width + 1;
        }

        function getHeightOffset() {
            return 2 * scrollbarSizes.height + 1;
        }

        function getExpandWidth(width) {
            return width + 10 + getWidthOffset();
        }

        function getExpandHeight(height) {
            return height + 10 + getHeightOffset();
        }

        function getShrinkWidth(width) {
            return width * 2 + getWidthOffset();
        }

        function getShrinkHeight(height) {
            return height * 2 + getHeightOffset();
        }

        function positionScrollbars(element, width, height) {
            var expand          = getExpandElement(element);
            var shrink          = getShrinkElement(element);
            var expandWidth     = getExpandWidth(width);
            var expandHeight    = getExpandHeight(height);
            var shrinkWidth     = getShrinkWidth(width);
            var shrinkHeight    = getShrinkHeight(height);
            expand.scrollLeft   = expandWidth;
            expand.scrollTop    = expandHeight;
            shrink.scrollLeft   = shrinkWidth;
            shrink.scrollTop    = shrinkHeight;
        }

        function injectContainerElement() {
            var container = getState(element).container;

            if (!container) {
                container                   = document.createElement("div");
                container.className         = detectionContainerClass;
                container.style.cssText     = buildCssTextString(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]);
                getState(element).container = container;
                addAnimationClass(container);
                element.appendChild(container);

                var onAnimationStart = function () {
                    getState(element).onRendered && getState(element).onRendered();
                };

                addEvent(container, "animationstart", onAnimationStart);

                // Store the event handler here so that they may be removed when uninstall is called.
                // See uninstall function for an explanation why it is needed.
                getState(element).onAnimationStart = onAnimationStart;
            }

            return container;
        }

        function injectScrollElements() {
            function alterPositionStyles() {
                var style = getState(element).style;

                if(style.position === "static") {
                    element.style.setProperty("position", "relative",options.important ? "important" : "");

                    var removeRelativeStyles = function(reporter, element, style, property) {
                        function getNumericalValue(value) {
                            return value.replace(/[^-\d\.]/g, "");
                        }

                        var value = style[property];

                        if(value !== "auto" && getNumericalValue(value) !== "0") {
                            reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                            element.style[property] = 0;
                        }
                    };

                    //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
                    //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
                    removeRelativeStyles(reporter, element, style, "top");
                    removeRelativeStyles(reporter, element, style, "right");
                    removeRelativeStyles(reporter, element, style, "bottom");
                    removeRelativeStyles(reporter, element, style, "left");
                }
            }

            function getLeftTopBottomRightCssText(left, top, bottom, right) {
                left = (!left ? "0" : (left + "px"));
                top = (!top ? "0" : (top + "px"));
                bottom = (!bottom ? "0" : (bottom + "px"));
                right = (!right ? "0" : (right + "px"));

                return ["left: " + left, "top: " + top, "right: " + right, "bottom: " + bottom];
            }

            debug("Injecting elements");

            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            alterPositionStyles();

            var rootContainer = getState(element).container;

            if (!rootContainer) {
                rootContainer = injectContainerElement();
            }

            // Due to this WebKit bug https://bugs.webkit.org/show_bug.cgi?id=80808 (currently fixed in Blink, but still present in WebKit browsers such as Safari),
            // we need to inject two containers, one that is width/height 100% and another that is left/top -1px so that the final container always is 1x1 pixels bigger than
            // the targeted element.
            // When the bug is resolved, "containerContainer" may be removed.

            // The outer container can occasionally be less wide than the targeted when inside inline elements element in WebKit (see https://bugs.webkit.org/show_bug.cgi?id=152980).
            // This should be no problem since the inner container either way makes sure the injected scroll elements are at least 1x1 px.

            var scrollbarWidth          = scrollbarSizes.width;
            var scrollbarHeight         = scrollbarSizes.height;
            var containerContainerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]);
            var containerStyle          = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth)));
            var expandStyle             = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
            var shrinkStyle             = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
            var expandChildStyle        = buildCssTextString(["position: absolute", "left: 0", "top: 0"]);
            var shrinkChildStyle        = buildCssTextString(["position: absolute", "width: 200%", "height: 200%"]);

            var containerContainer      = document.createElement("div");
            var container               = document.createElement("div");
            var expand                  = document.createElement("div");
            var expandChild             = document.createElement("div");
            var shrink                  = document.createElement("div");
            var shrinkChild             = document.createElement("div");

            // Some browsers choke on the resize system being rtl, so force it to ltr. https://github.com/wnr/element-resize-detector/issues/56
            // However, dir should not be set on the top level container as it alters the dimensions of the target element in some browsers.
            containerContainer.dir              = "ltr";

            containerContainer.style.cssText    = containerContainerStyle;
            containerContainer.className        = detectionContainerClass;
            container.className                 = detectionContainerClass;
            container.style.cssText             = containerStyle;
            expand.style.cssText                = expandStyle;
            expandChild.style.cssText           = expandChildStyle;
            shrink.style.cssText                = shrinkStyle;
            shrinkChild.style.cssText           = shrinkChildStyle;

            expand.appendChild(expandChild);
            shrink.appendChild(shrinkChild);
            container.appendChild(expand);
            container.appendChild(shrink);
            containerContainer.appendChild(container);
            rootContainer.appendChild(containerContainer);

            function onExpandScroll() {
                var state = getState(element);
                if (state && state.onExpand) {
                    state.onExpand();
                } else {
                    debug("Aborting expand scroll handler: element has been uninstalled");
                }
            }

            function onShrinkScroll() {
                var state = getState(element);
                if (state && state.onShrink) {
                    state.onShrink();
                } else {
                    debug("Aborting shrink scroll handler: element has been uninstalled");
                }
            }

            addEvent(expand, "scroll", onExpandScroll);
            addEvent(shrink, "scroll", onShrinkScroll);

            // Store the event handlers here so that they may be removed when uninstall is called.
            // See uninstall function for an explanation why it is needed.
            getState(element).onExpandScroll = onExpandScroll;
            getState(element).onShrinkScroll = onShrinkScroll;
        }

        function registerListenersAndPositionElements() {
            function updateChildSizes(element, width, height) {
                var expandChild             = getExpandChildElement(element);
                var expandWidth             = getExpandWidth(width);
                var expandHeight            = getExpandHeight(height);
                expandChild.style.setProperty("width", expandWidth + "px", options.important ? "important" : "");
                expandChild.style.setProperty("height", expandHeight + "px", options.important ? "important" : "");
            }

            function updateDetectorElements(done) {
                var width           = element.offsetWidth;
                var height          = element.offsetHeight;

                // Check whether the size has actually changed since last time the algorithm ran. If not, some steps may be skipped.
                var sizeChanged = width !== getState(element).lastWidth || height !== getState(element).lastHeight;

                debug("Storing current size", width, height);

                // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
                // Otherwise the if-check in handleScroll is useless.
                storeCurrentSize(element, width, height);

                // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
                // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

                batchProcessor.add(0, function performUpdateChildSizes() {
                    if (!sizeChanged) {
                        return;
                    }

                    if (!getState(element)) {
                        debug("Aborting because element has been uninstalled");
                        return;
                    }

                    if (!areElementsInjected()) {
                        debug("Aborting because element container has not been initialized");
                        return;
                    }

                    if (options.debug) {
                        var w = element.offsetWidth;
                        var h = element.offsetHeight;

                        if (w !== width || h !== height) {
                            reporter.warn(idHandler.get(element), "Scroll: Size changed before updating detector elements.");
                        }
                    }

                    updateChildSizes(element, width, height);
                });

                batchProcessor.add(1, function updateScrollbars() {
                    // This function needs to be invoked event though the size is unchanged. The element could have been resized very quickly and then
                    // been restored to the original size, which will have changed the scrollbar positions.

                    if (!getState(element)) {
                        debug("Aborting because element has been uninstalled");
                        return;
                    }

                    if (!areElementsInjected()) {
                        debug("Aborting because element container has not been initialized");
                        return;
                    }

                    positionScrollbars(element, width, height);
                });

                if (sizeChanged && done) {
                    batchProcessor.add(2, function () {
                        if (!getState(element)) {
                            debug("Aborting because element has been uninstalled");
                            return;
                        }

                        if (!areElementsInjected()) {
                          debug("Aborting because element container has not been initialized");
                          return;
                        }

                        done();
                    });
                }
            }

            function areElementsInjected() {
                return !!getState(element).container;
            }

            function notifyListenersIfNeeded() {
                function isFirstNotify() {
                    return getState(element).lastNotifiedWidth === undefined;
                }

                debug("notifyListenersIfNeeded invoked");

                var state = getState(element);

                // Don't notify if the current size is the start size, and this is the first notification.
                if (isFirstNotify() && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height) {
                    return debug("Not notifying: Size is the same as the start size, and there has been no notification yet.");
                }

                // Don't notify if the size already has been notified.
                if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
                    return debug("Not notifying: Size already notified");
                }


                debug("Current size not notified, notifying...");
                state.lastNotifiedWidth = state.lastWidth;
                state.lastNotifiedHeight = state.lastHeight;
                forEach(getState(element).listeners, function (listener) {
                    listener(element);
                });
            }

            function handleRender() {
                debug("startanimation triggered.");

                if (isUnrendered(element)) {
                    debug("Ignoring since element is still unrendered...");
                    return;
                }

                debug("Element rendered.");
                var expand = getExpandElement(element);
                var shrink = getShrinkElement(element);
                if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
                    debug("Scrollbars out of sync. Updating detector elements...");
                    updateDetectorElements(notifyListenersIfNeeded);
                }
            }

            function handleScroll() {
                debug("Scroll detected.");

                if (isUnrendered(element)) {
                    // Element is still unrendered. Skip this scroll event.
                    debug("Scroll event fired while unrendered. Ignoring...");
                    return;
                }

                updateDetectorElements(notifyListenersIfNeeded);
            }

            debug("registerListenersAndPositionElements invoked.");

            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            getState(element).onRendered = handleRender;
            getState(element).onExpand = handleScroll;
            getState(element).onShrink = handleScroll;

            var style = getState(element).style;
            updateChildSizes(element, style.width, style.height);
        }

        function finalizeDomMutation() {
            debug("finalizeDomMutation invoked.");

            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            var style = getState(element).style;
            storeCurrentSize(element, style.width, style.height);
            positionScrollbars(element, style.width, style.height);
        }

        function ready() {
            callback(element);
        }

        function install() {
            debug("Installing...");
            initListeners();
            storeStartSize();

            batchProcessor.add(0, storeStyle);
            batchProcessor.add(1, injectScrollElements);
            batchProcessor.add(2, registerListenersAndPositionElements);
            batchProcessor.add(3, finalizeDomMutation);
            batchProcessor.add(4, ready);
        }

        debug("Making detectable...");

        if (isDetached(element)) {
            debug("Element is detached");

            injectContainerElement();

            debug("Waiting until element is attached...");

            getState(element).onRendered = function () {
                debug("Element is now attached");
                install();
            };
        } else {
            install();
        }
    }

    function uninstall(element) {
        var state = getState(element);

        if (!state) {
            // Uninstall has been called on a non-erd element.
            return;
        }

        // Uninstall may have been called in the following scenarios:
        // (1) Right between the sync code and async batch (here state.busy = true, but nothing have been registered or injected).
        // (2) In the ready callback of the last level of the batch by another element (here, state.busy = true, but all the stuff has been injected).
        // (3) After the installation process (here, state.busy = false and all the stuff has been injected).
        // So to be on the safe side, let's check for each thing before removing.

        // We need to remove the event listeners, because otherwise the event might fire on an uninstall element which results in an error when trying to get the state of the element.
        state.onExpandScroll && removeEvent(getExpandElement(element), "scroll", state.onExpandScroll);
        state.onShrinkScroll && removeEvent(getShrinkElement(element), "scroll", state.onShrinkScroll);
        state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart);

        state.container && element.removeChild(state.container);
    }

    return {
        makeDetectable: makeDetectable,
        addListener: addListener,
        uninstall: uninstall,
        initDocument: initDocument
    };
};


/***/ }),

/***/ 1275:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return basePickBy(object, props, function(value, key) {
    return key in object;
  });
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Creates an array of the own and inherited enumerable symbol properties
 * of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable string keyed properties of `object` that are
 * not omitted.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = baseRest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props, 1), toKey);
  return basePick(object, baseDifference(getAllKeysIn(object), props));
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = omit;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(153)))

/***/ }),

/***/ 1276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _lodashThrottle = __webpack_require__(1277);

var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var ScrollAnimation = (function (_Component) {
  _inherits(ScrollAnimation, _Component);

  function ScrollAnimation(props) {
    _classCallCheck(this, ScrollAnimation);

    _get(Object.getPrototypeOf(ScrollAnimation.prototype), "constructor", this).call(this, props);
    this.serverSide = typeof window === "undefined";
    this.listener = (0, _lodashThrottle2["default"])(this.handleScroll.bind(this), 50);
    this.visibility = {
      onScreen: false,
      inViewport: false
    };

    this.state = {
      classes: "animated",
      style: {
        animationDuration: this.props.duration + "s",
        opacity: this.props.initiallyVisible ? 1 : 0
      }
    };
  }

  _createClass(ScrollAnimation, [{
    key: "getElementTop",
    value: function getElementTop(elm) {
      var yPos = 0;
      while (elm && elm.offsetTop !== undefined && elm.clientTop !== undefined) {
        yPos += elm.offsetTop + elm.clientTop;
        elm = elm.offsetParent;
      }
      return yPos;
    }
  }, {
    key: "getScrollPos",
    value: function getScrollPos() {
      if (this.scrollableParent.pageYOffset !== undefined) {
        return this.scrollableParent.pageYOffset;
      }
      return this.scrollableParent.scrollTop;
    }
  }, {
    key: "getScrollableParentHeight",
    value: function getScrollableParentHeight() {
      if (this.scrollableParent.innerHeight !== undefined) {
        return this.scrollableParent.innerHeight;
      }
      return this.scrollableParent.clientHeight;
    }
  }, {
    key: "getViewportTop",
    value: function getViewportTop() {
      return this.getScrollPos() + this.props.offset;
    }
  }, {
    key: "getViewportBottom",
    value: function getViewportBottom() {
      return this.getScrollPos() + this.getScrollableParentHeight() - this.props.offset;
    }
  }, {
    key: "isInViewport",
    value: function isInViewport(y) {
      return y >= this.getViewportTop() && y <= this.getViewportBottom();
    }
  }, {
    key: "isAboveViewport",
    value: function isAboveViewport(y) {
      return y < this.getViewportTop();
    }
  }, {
    key: "isBelowViewport",
    value: function isBelowViewport(y) {
      return y > this.getViewportBottom();
    }
  }, {
    key: "inViewport",
    value: function inViewport(elementTop, elementBottom) {
      return this.isInViewport(elementTop) || this.isInViewport(elementBottom) || this.isAboveViewport(elementTop) && this.isBelowViewport(elementBottom);
    }
  }, {
    key: "onScreen",
    value: function onScreen(elementTop, elementBottom) {
      return !this.isAboveScreen(elementBottom) && !this.isBelowScreen(elementTop);
    }
  }, {
    key: "isAboveScreen",
    value: function isAboveScreen(y) {
      return y < this.getScrollPos();
    }
  }, {
    key: "isBelowScreen",
    value: function isBelowScreen(y) {
      return y > this.getScrollPos() + this.getScrollableParentHeight();
    }
  }, {
    key: "getVisibility",
    value: function getVisibility() {
      var elementTop = this.getElementTop(this.node) - this.getElementTop(this.scrollableParent);
      var elementBottom = elementTop + this.node.clientHeight;
      return {
        inViewport: this.inViewport(elementTop, elementBottom),
        onScreen: this.onScreen(elementTop, elementBottom)
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.serverSide) {
        var parentSelector = this.props.scrollableParentSelector;
        this.scrollableParent = parentSelector ? document.querySelector(parentSelector) : window;
        if (this.scrollableParent && this.scrollableParent.addEventListener) {
          this.scrollableParent.addEventListener("scroll", this.listener);
        } else {
          console.warn("Cannot find element by locator: " + this.props.scrollableParentSelector);
        }
        if (this.props.animatePreScroll) {
          this.handleScroll();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.delayedAnimationTimeout);
      clearTimeout(this.callbackTimeout);
      if (window && window.removeEventListener) {
        window.removeEventListener("scroll", this.listener);
      }
    }
  }, {
    key: "visibilityHasChanged",
    value: function visibilityHasChanged(previousVis, currentVis) {
      return previousVis.inViewport !== currentVis.inViewport || previousVis.onScreen !== currentVis.onScreen;
    }
  }, {
    key: "animate",
    value: function animate(animation, callback) {
      var _this = this;

      this.delayedAnimationTimeout = setTimeout(function () {
        _this.animating = true;
        _this.setState({
          classes: "animated " + animation,
          style: {
            animationDuration: _this.props.duration + "s"
          }
        });
        _this.callbackTimeout = setTimeout(callback, _this.props.duration * 1000);
      }, this.props.delay);
    }
  }, {
    key: "animateIn",
    value: function animateIn(callback) {
      var _this2 = this;

      this.animate(this.props.animateIn, function () {
        if (!_this2.props.animateOnce) {
          _this2.setState({
            style: {
              animationDuration: _this2.props.duration + "s",
              opacity: 1
            }
          });
          _this2.animating = false;
        }
        var vis = _this2.getVisibility();
        if (callback) {
          callback(vis);
        }
      });
    }
  }, {
    key: "animateOut",
    value: function animateOut(callback) {
      var _this3 = this;

      this.animate(this.props.animateOut, function () {
        _this3.setState({
          classes: "animated",
          style: {
            animationDuration: _this3.props.duration + "s",
            opacity: 0
          }
        });
        var vis = _this3.getVisibility();
        if (vis.inViewport && _this3.props.animateIn) {
          _this3.animateIn(_this3.props.afterAnimatedIn);
        } else {
          _this3.animating = false;
        }

        if (callback) {
          callback(vis);
        }
      });
    }
  }, {
    key: "handleScroll",
    value: function handleScroll() {
      if (!this.animating) {
        var currentVis = this.getVisibility();
        if (this.visibilityHasChanged(this.visibility, currentVis)) {
          clearTimeout(this.delayedAnimationTimeout);
          if (!currentVis.onScreen) {
            this.setState({
              classes: "animated",
              style: {
                animationDuration: this.props.duration + "s",
                opacity: this.props.initiallyVisible ? 1 : 0
              }
            });
          } else if (currentVis.inViewport && this.props.animateIn) {
            this.animateIn(this.props.afterAnimatedIn);
          } else if (currentVis.onScreen && this.visibility.inViewport && this.props.animateOut && this.state.style.opacity === 1) {
            this.animateOut(this.props.afterAnimatedOut);
          }
          this.visibility = currentVis;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var classes = this.props.className ? this.props.className + " " + this.state.classes : this.state.classes;
      return _react2["default"].createElement(
        "div",
        { ref: function (node) {
            _this4.node = node;
          }, className: classes, style: Object.assign({}, this.state.style, this.props.style) },
        this.props.children
      );
    }
  }]);

  return ScrollAnimation;
})(_react.Component);

exports["default"] = ScrollAnimation;

ScrollAnimation.defaultProps = {
  offset: 150,
  duration: 1,
  initiallyVisible: false,
  delay: 0,
  animateOnce: false,
  animatePreScroll: true
};

ScrollAnimation.propTypes = {
  animateIn: _propTypes2["default"].string,
  animateOut: _propTypes2["default"].string,
  offset: _propTypes2["default"].number,
  duration: _propTypes2["default"].number,
  delay: _propTypes2["default"].number,
  initiallyVisible: _propTypes2["default"].bool,
  animateOnce: _propTypes2["default"].bool,
  style: _propTypes2["default"].object,
  scrollableParentSelector: _propTypes2["default"].string,
  className: _propTypes2["default"].string,
  animatePreScroll: _propTypes2["default"].bool
};
module.exports = exports["default"];

/***/ }),

/***/ 1277:
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
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
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

module.exports = throttle;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(153)))

/***/ }),

/***/ 1278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactToggle = __webpack_require__(1279);

var _reactToggle2 = _interopRequireDefault(_reactToggle);

var _helpersFunction = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { gsap } from 'gsap';
// import { gsap, MorphSVGPlugin } from "gsap-trial/all";

//  gsap.registerPlugin(MorphSVGPlugin);

var UsefullProductItem = function UsefullProductItem(_ref) {
    var items = _ref.items,
        basketData = _ref.basketData,
        addModelToBasket = _ref.addModelToBasket;


    var handleTofuChange = function handleTofuChange(id) {
        items.map(function (item) {
            if (item.id === id) {
                item.toggle = !item.toggle;
            }
        });
    };

    /*
    const handeMouseEnter = (e) => {
        console.log('handeMouseEnter')
    }
      const handleMouseLeave = (e) => {
        console.log('handleMouseLeave')
    }
      const handeclick = (e) => {
        console.log('handeclick')
    }
    */

    return _react2.default.createElement(
        "div",
        null,
        items.map(function (item) {
            return _react2.default.createElement(
                "label",
                { key: item.id, className: "usefullToggle" },
                _react2.default.createElement(_reactToggle2.default, {
                    defaultChecked: basketData.some(function (basket) {
                        return basket.id === item.id;
                    }) ? true : false,
                    icons: false,
                    "data-status": basketData.some(function (basket) {
                        return basket.id === item.id;
                    }) ? 'in' : 'out',
                    onChange: function onChange(e) {
                        return addModelToBasket(e, item);
                    }
                }),
                _react2.default.createElement("img", { loading: "lazy", src: item.deviceImages.mainImg.src, alt: "" }),
                _react2.default.createElement(
                    "div",
                    { className: "description" },
                    _react2.default.createElement(
                        "span",
                        null,
                        item.model
                    ),
                    _react2.default.createElement("strong", null),
                    _react2.default.createElement(
                        "span",
                        null,
                        (item.discountPrice === false ? (0, _helpersFunction.formatPrice)(item.price) : (0, _helpersFunction.formatPrice)(item.discountPrice)) + " CHF"
                    )
                )
            );
        })
    );
};

exports.default = UsefullProductItem;

/***/ }),

/***/ 1279:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(869);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _check = __webpack_require__(1280);

var _check2 = _interopRequireDefault(_check);

var _x = __webpack_require__(1281);

var _x2 = _interopRequireDefault(_x);

var _util = __webpack_require__(1282);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toggle = function (_PureComponent) {
  _inherits(Toggle, _PureComponent);

  function Toggle(props) {
    _classCallCheck(this, Toggle);

    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.previouslyChecked = !!(props.checked || props.defaultChecked);
    _this.state = {
      checked: !!(props.checked || props.defaultChecked),
      hasFocus: false
    };
    return _this;
  }

  _createClass(Toggle, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.checked !== this.props.checked) {
        // Disable linting rule here since this usage of setState inside
        // componentDidUpdate is OK; see
        // https://reactjs.org/docs/react-component.html#componentdidupdate
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ checked: !!this.props.checked });
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      if (this.props.disabled) {
        return;
      }
      var checkbox = this.input;
      if (event.target !== checkbox && !this.moved) {
        this.previouslyChecked = checkbox.checked;
        event.preventDefault();
        checkbox.focus();
        checkbox.click();
        return;
      }

      var checked = this.props.hasOwnProperty('checked') ? this.props.checked : checkbox.checked;

      this.setState({ checked: checked });
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      if (this.props.disabled) {
        return;
      }
      this.startX = (0, _util.pointerCoord)(event).x;
      this.activated = true;
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      if (!this.activated) return;
      this.moved = true;

      if (this.startX) {
        var currentX = (0, _util.pointerCoord)(event).x;
        if (this.state.checked && currentX + 15 < this.startX) {
          this.setState({ checked: false });
          this.startX = currentX;
          this.activated = true;
        } else if (currentX - 15 > this.startX) {
          this.setState({ checked: true });
          this.startX = currentX;
          this.activated = currentX < this.startX + 5;
        }
      }
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      if (!this.moved) return;
      var checkbox = this.input;
      event.preventDefault();

      if (this.startX) {
        var endX = (0, _util.pointerCoord)(event).x;
        if (this.previouslyChecked === true && this.startX + 4 > endX) {
          if (this.previouslyChecked !== this.state.checked) {
            this.setState({ checked: false });
            this.previouslyChecked = this.state.checked;
            checkbox.click();
          }
        } else if (this.startX - 4 < endX) {
          if (this.previouslyChecked !== this.state.checked) {
            this.setState({ checked: true });
            this.previouslyChecked = this.state.checked;
            checkbox.click();
          }
        }

        this.activated = false;
        this.startX = null;
        this.moved = false;
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(event) {
      var onFocus = this.props.onFocus;


      if (onFocus) {
        onFocus(event);
      }

      this.setState({ hasFocus: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(event) {
      var onBlur = this.props.onBlur;


      if (onBlur) {
        onBlur(event);
      }

      this.setState({ hasFocus: false });
    }
  }, {
    key: 'getIcon',
    value: function getIcon(type) {
      var icons = this.props.icons;

      if (!icons) {
        return null;
      }
      return icons[type] === undefined ? Toggle.defaultProps.icons[type] : icons[type];
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          _icons = _props.icons,
          inputProps = _objectWithoutProperties(_props, ['className', 'icons']);

      var classes = (0, _classnames2.default)('react-toggle', {
        'react-toggle--checked': this.state.checked,
        'react-toggle--focus': this.state.hasFocus,
        'react-toggle--disabled': this.props.disabled
      }, className);

      return _react2.default.createElement(
        'div',
        { className: classes,
          onClick: this.handleClick,
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchEnd },
        _react2.default.createElement(
          'div',
          { className: 'react-toggle-track' },
          _react2.default.createElement(
            'div',
            { className: 'react-toggle-track-check' },
            this.getIcon('checked')
          ),
          _react2.default.createElement(
            'div',
            { className: 'react-toggle-track-x' },
            this.getIcon('unchecked')
          )
        ),
        _react2.default.createElement('div', { className: 'react-toggle-thumb' }),
        _react2.default.createElement('input', _extends({}, inputProps, {
          ref: function ref(_ref) {
            _this2.input = _ref;
          },
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          className: 'react-toggle-screenreader-only',
          type: 'checkbox' }))
      );
    }
  }]);

  return Toggle;
}(_react.PureComponent);

exports.default = Toggle;


Toggle.displayName = 'Toggle';

Toggle.defaultProps = {
  icons: {
    checked: _react2.default.createElement(_check2.default, null),
    unchecked: _react2.default.createElement(_x2.default, null)
  }
};

Toggle.propTypes = {
  checked: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  defaultChecked: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  className: _propTypes2.default.string,
  name: _propTypes2.default.string,
  value: _propTypes2.default.string,
  id: _propTypes2.default.string,
  'aria-labelledby': _propTypes2.default.string,
  'aria-label': _propTypes2.default.string,
  icons: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    checked: _propTypes2.default.node,
    unchecked: _propTypes2.default.node
  })])
};

/***/ }),

/***/ 1280:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'svg',
    { width: '14', height: '11', viewBox: '0 0 14 11' },
    _react2.default.createElement('path', { d: 'M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0', fill: '#fff', fillRule: 'evenodd' })
  );
};

/***/ }),

/***/ 1281:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'svg',
    { width: '10', height: '10', viewBox: '0 0 10 10' },
    _react2.default.createElement('path', { d: 'M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12', fill: '#fff', fillRule: 'evenodd' })
  );
};

/***/ }),

/***/ 1282:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointerCoord = pointerCoord;
// Copyright 2015-present Drifty Co.
// http://drifty.com/
// from: https://github.com/driftyco/ionic/blob/master/src/util/dom.ts

function pointerCoord(event) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (event) {
    var changedTouches = event.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      var touch = changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    var pageX = event.pageX;
    if (pageX !== undefined) {
      return { x: pageX, y: event.pageY };
    }
  }
  return { x: 0, y: 0 };
}

/***/ }),

/***/ 1283:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(1037);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(206);

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _helpersFunction = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SampleNextArrow = function SampleNextArrow(props) {
  var className = props.className,
      style = props.style,
      onClick = props.onClick;

  return _react2.default.createElement(
    "div",
    { className: className, style: (0, _extends3.default)({}, style), onClick: onClick },
    _react2.default.createElement(
      "svg",
      {
        width: "10",
        height: "18",
        viewBox: "0 0 10 18",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      },
      _react2.default.createElement("path", {
        d: "M2.19298 1.10152L8.9008 8.22652C9.10588 8.44331 9.20839 8.72152 9.20839 8.99995C9.20839 9.27825 9.10583 9.55636 8.9008 9.77339L2.19298 16.8984C1.76548 17.3484 1.05345 17.3671 0.602516 16.9406C0.148391 16.5128 0.132359 15.7978 0.55857 15.3496L6.57732 8.99808L0.55857 2.64652C0.132359 2.19839 0.148297 1.48823 0.602516 1.05745C1.05345 0.631359 1.76548 0.650109 2.19298 1.10152Z",
        fill: "#161616"
      })
    )
  );
};

var SamplePrevArrow = function SamplePrevArrow(props) {
  var className = props.className,
      style = props.style,
      onClick = props.onClick;

  return _react2.default.createElement(
    "div",
    { className: className, style: (0, _extends3.default)({}, style), onClick: onClick },
    _react2.default.createElement(
      "svg",
      {
        width: "10",
        height: "18",
        viewBox: "0 0 10 18",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      },
      _react2.default.createElement("path", {
        d: "M2.19298 1.10152L8.9008 8.22652C9.10588 8.44331 9.20839 8.72152 9.20839 8.99995C9.20839 9.27825 9.10583 9.55636 8.9008 9.77339L2.19298 16.8984C1.76548 17.3484 1.05345 17.3671 0.602516 16.9406C0.148391 16.5128 0.132359 15.7978 0.55857 15.3496L6.57732 8.99808L0.55857 2.64652C0.132359 2.19839 0.148297 1.48823 0.602516 1.05745C1.05345 0.631359 1.76548 0.650109 2.19298 1.10152Z",
        fill: "#161616"
      })
    )
  );
};

var SuccessAddToBasket = function (_Component) {
  (0, _inherits3.default)(SuccessAddToBasket, _Component);

  function SuccessAddToBasket(props) {
    (0, _classCallCheck3.default)(this, SuccessAddToBasket);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SuccessAddToBasket.__proto__ || Object.getPrototypeOf(SuccessAddToBasket)).call(this, props));

    _this.handleGoToCart = function () {
      _reactRouter.browserHistory.push("/warenkorb");
    };

    _this.handleGoBack = function () {
      var source = _this.props.source;

      if (source == "listingPage" || source == "quickViewPage" || source == "gridPage") {
        _this.props.closeSuccessAddToBasket();
      } else if (source == "detailPage" || source == "accessoryDetailPage") {
        _this.props.closeSuccessAddToBasket();
        _reactRouter.browserHistory.goBack();
      }
    };

    _this.addToBasket = function (e, item) {
      e.preventDefault();
      _this.props.addModelToBasket(e, item);
      if (window.isGoogleConnection) _this.gtagEnhancedEcommerce(e, item, "add_to_cart");
    };

    _this.gtagEnhancedEcommerce = function (e, item, tag) {
      if (tag == "select_content" && e.target.tagName === "BUTTON") {
        return;
      }
      var brands = item.criterias.find(function (item) {
        return item.id === "manufacturer";
      }).values,
          brand = brands.length ? brands[0].name : "",
          items = [{
        id: item.shortcode,
        name: item.descriptionLong || item.model || "",
        list_name: "Kaufen",
        quantity: 1,
        brand: brand,
        price: item.discountPrice || item.price,
        category: item.categoryName
      }];

      if (tag == "select_content") {
        gtag("event", tag, {
          content_type: "product",
          items: items
        });

        var gtagData = { category: item.categoryName };
        window.localStorage.setItem("gtag", JSON.stringify(gtagData));
      } else {
        gtag("event", tag, {
          items: items
        });
      }
    };

    _this.clickOnLink = function (e, item) {
      if (e.target.tagName === "BUTTON") {
        e.preventDefault();
      } else {
        if (window.isGoogleConnection) _this.gtagEnhancedEcommerce(item, "select_content");
      }
    };

    _this.mapRelevantProducts = _this.mapRelevantProducts.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SuccessAddToBasket, [{
    key: "mapRelevantProducts",
    value: function mapRelevantProducts(model, i) {
      var _this2 = this;

      var url = "",
          modelName = model.modelName ? model.modelName.split(" ").join("-").toLowerCase().replace(/\//g, "--") : model.model.split(" ").join("-").toLowerCase().replace(/\//g, "--"),
          deviceName = model.deviceName.toLowerCase().replace(/ /g, "-");
      url = "/kaufen/detail/zubehoer/" + deviceName + "/" + modelName + "/" + model.shortcode;
      var itemWrap = { paddingLeft: "8px", paddingRight: "8px" };

      return _react2.default.createElement(
        "div",
        { key: "MapRelevantProducts-" + i },
        _react2.default.createElement(
          "div",
          { style: itemWrap },
          _react2.default.createElement(
            _reactRouter.Link,
            {
              to: url,
              onClick: function onClick(e) {
                return _this2.clickOnLink(e, model);
              },
              key: "MapRelevantProductsLink-" + i,
              style: { textDecoration: "none" },
              className: "relevant-link"
            },
            _react2.default.createElement(
              "div",
              { className: "item" },
              _react2.default.createElement(
                "div",
                { className: "img" },
                _react2.default.createElement("img", {
                  loading: "lazy",
                  src: model.colorImage || model.deviceImages.mainImg.src,
                  alt: ""
                }),
                _react2.default.createElement("img", {
                  loading: "lazy",
                  className: "searchBtn",
                  src: "/images/search-icon.svg"
                }),
                _react2.default.createElement("img", {
                  loading: "lazy",
                  className: "wishBtn",
                  src: "/images/wish-icon.svg"
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "heading" },
                _react2.default.createElement(
                  "h4",
                  null,
                  model.model,
                  model.extendedTitle && " (" + model.extendedTitle + ")"
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "cost-block" },
                _react2.default.createElement(
                  "div",
                  { className: "cost" },
                  model.discountPrice && _react2.default.createElement(
                    "p",
                    { className: "price-value discount-price" },
                    (0, _helpersFunction.formatPrice)(model.discountPrice),
                    " ",
                    window.currencyValue
                  ),
                  _react2.default.createElement(
                    "p",
                    {
                      className: model.discountPrice ? "price-value old-price" : "price-value"
                    },
                    (0, _helpersFunction.formatPrice)(model.price),
                    " ",
                    window.currencyValue
                  )
                ),
                _react2.default.createElement("button", {
                  className: "add-cart",
                  "data-source": "relevantProduct",
                  "data-status": "out",
                  onClick: function onClick(e) {
                    return _this2.addToBasket(e, model);
                  }
                })
              )
            )
          )
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _settings;

      var _props = this.props,
          model = _props.model,
          recommendProducts = _props.recommendProducts,
          settings = (_settings = {
        infinite: false,
        speed: 500,
        slidesToShow: window.isMobile ? 1 : 3,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true
      }, (0, _defineProperty3.default)(_settings, "arrows", true), (0, _defineProperty3.default)(_settings, "nextArrow", _react2.default.createElement(SampleNextArrow, null)), (0, _defineProperty3.default)(_settings, "prevArrow", _react2.default.createElement(SamplePrevArrow, null)), _settings);

      return _react2.default.createElement(
        "div",
        { className: window.isMobile ? "light-box for-mobile" : "light-box" },
        _react2.default.createElement(
          "div",
          {
            className: "successAddToBasket-wrap " + (recommendProducts ? "m-2" : "m-20")
          },
          !window.isMobile && _react2.default.createElement(
            "div",
            {
              className: "successAddToBasket-wrap-btnClose",
              onClick: this.props.closeSuccessAddToBasket
            },
            _react2.default.createElement("img", { loading: "lazy", src: "/images/design/circle_close.svg" })
          ),
          _react2.default.createElement(
            "div",
            { className: "mainPart" },
            _react2.default.createElement(
              "div",
              { className: "row title" },
              _react2.default.createElement(
                "div",
                { className: "img" },
                _react2.default.createElement("img", {
                  loading: "lazy",
                  src: "/images/design/c-check_new.svg",
                  alt: ""
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "desc" },
                _react2.default.createElement(
                  "p",
                  { className: "success" },
                  "Erfolgreich in den Warenkorb hinzugef\xFCgt"
                ),
                _react2.default.createElement(
                  "p",
                  { className: "model" },
                  model.model,
                  model.capacity ? ", " + model.capacity : "",
                  model.color ? ", " + model.color : ""
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "row buttons" },
              _react2.default.createElement(
                "button",
                { className: "btn detail", onClick: this.handleGoToCart },
                _react2.default.createElement("img", { loading: "lazy", src: "/images/design/cart_new.svg", alt: "" }),
                " ",
                "Zum Warenkorb"
              ),
              _react2.default.createElement(
                "button",
                { className: "btn detail second", onClick: this.handleGoBack },
                _react2.default.createElement("img", {
                  loading: "lazy",
                  src: "/images/design/basket-simple-add_new.svg",
                  alt: ""
                }),
                " ",
                "Weiter einkaufen"
              )
            )
          ),
          _react2.default.createElement("div", { className: "cb" })
        ),
        recommendProducts && recommendProducts.length > 0 && _react2.default.createElement(
          "div",
          { className: "relevantProduct" },
          _react2.default.createElement(
            "h3",
            null,
            "Passendes Zubeh\xF6r"
          ),
          _react2.default.createElement(
            _reactSlick2.default,
            settings,
            recommendProducts.map(this.mapRelevantProducts)
          )
        )
      );
    }
  }]);
  return SuccessAddToBasket;
}(_react.Component);

SuccessAddToBasket.propTypes = {};
SuccessAddToBasket.defaultProps = {};

exports.default = SuccessAddToBasket;

/***/ }),

/***/ 1503:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(1037);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = __webpack_require__(316);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(334);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _addToBasketEffect = __webpack_require__(950);

var _addToBasketEffect2 = _interopRequireDefault(_addToBasketEffect);

var _addToWishlistEffect = __webpack_require__(1058);

var _addToWishlistEffect2 = _interopRequireDefault(_addToWishlistEffect);

var _lightboxImg = __webpack_require__(1062);

var _lightboxImg2 = _interopRequireDefault(_lightboxImg);

var _helpersFunction = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SampleNextArrow = function SampleNextArrow(props) {
    var className = props.className,
        style = props.style,
        onClick = props.onClick;

    return _react2.default.createElement(
        "div",
        {
            className: className,
            style: (0, _extends3.default)({}, style),
            onClick: onClick
        },
        _react2.default.createElement(
            "svg",
            { width: "10", height: "18", viewBox: "0 0 10 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            _react2.default.createElement("path", { d: "M2.19298 1.10152L8.9008 8.22652C9.10588 8.44331 9.20839 8.72152 9.20839 8.99995C9.20839 9.27825 9.10583 9.55636 8.9008 9.77339L2.19298 16.8984C1.76548 17.3484 1.05345 17.3671 0.602516 16.9406C0.148391 16.5128 0.132359 15.7978 0.55857 15.3496L6.57732 8.99808L0.55857 2.64652C0.132359 2.19839 0.148297 1.48823 0.602516 1.05745C1.05345 0.631359 1.76548 0.650109 2.19298 1.10152Z", fill: "#161616" })
        )
    );
};

var SamplePrevArrow = function SamplePrevArrow(props) {
    var className = props.className,
        style = props.style,
        onClick = props.onClick;

    return _react2.default.createElement(
        "div",
        {
            className: className,
            style: (0, _extends3.default)({}, style),
            onClick: onClick
        },
        _react2.default.createElement(
            "svg",
            { width: "10", height: "18", viewBox: "0 0 10 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            _react2.default.createElement("path", { d: "M2.19298 1.10152L8.9008 8.22652C9.10588 8.44331 9.20839 8.72152 9.20839 8.99995C9.20839 9.27825 9.10583 9.55636 8.9008 9.77339L2.19298 16.8984C1.76548 17.3484 1.05345 17.3671 0.602516 16.9406C0.148391 16.5128 0.132359 15.7978 0.55857 15.3496L6.57732 8.99808L0.55857 2.64652C0.132359 2.19839 0.148297 1.48823 0.602516 1.05745C1.05345 0.631359 1.76548 0.650109 2.19298 1.10152Z", fill: "#161616" })
        )
    );
};

var OtherProducts = function OtherProducts(_ref) {
    var _settings;

    var similarItems = _ref.similarItems,
        basketActions = _ref.basketActions,
        basketData = _ref.basketData,
        wishlistData = _ref.wishlistData;

    var _useState = (0, _react.useState)({
        currentMainImage: '',
        isOpenLightBox: false,
        currentImageLightBox: 0
    }),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        blockImage = _useState2[0],
        setBlockImage = _useState2[1];

    var closeLightBox = function closeLightBox() {
        $('#zoom_01').elevateZoom({ zoomType: "inner" });
        setBlockImage((0, _extends3.default)({}, blockImage, {
            isOpenLightBox: false
        }));
    };

    var openLightBox = function openLightBox(item) {
        $('.zoomContainer').remove();
        var position = 0;
        setBlockImage({
            currentMainImage: item.colorImage,
            isOpenLightBox: true,
            currentImageLightBox: position
        });
    };

    var addToBasket = function addToBasket(e, item) {
        e.stopPropagation();
        e.preventDefault();
        var status = void 0;
        var newBasketData = [];
        if (basketData.every(function (itemBasket) {
            return itemBasket.id != item.id;
        })) {
            newBasketData = [].concat((0, _toConsumableArray3.default)(basketData), [item]);
            status = 'out';
        } else {
            newBasketData = basketData.filter(function (itemBasket) {
                return itemBasket.shortcode != item.shortcode;
            });
            status = 'in';
        }
        basketActions.changeBasketData(newBasketData);
        if (status === 'out') {
            if (!window.isMobile) {
                var img = item.colorImage ? item.colorImage : '/images/design/Product.svg',
                    start = $(e.target).offset();
                basketActions.basketAddEffect(_react2.default.createElement(_addToBasketEffect2.default, { startPosition: start,
                    image: img,
                    basketType: "kaufen" }));
                setTimeout(function () {
                    basketActions.basketAddEffect(null);
                }, 2000);
            }
        }
    };

    var addModelToWishlist = function addModelToWishlist(e, item) {
        e.stopPropagation();
        e.preventDefault();
        var newWishlistData = null;
        var status = '';
        if (wishlistData.every(function (itemWishlist) {
            return itemWishlist.id != item.id;
        })) {
            newWishlistData = [].concat((0, _toConsumableArray3.default)(wishlistData), [item]);
            status = 'add';
        } else {
            newWishlistData = wishlistData.filter(function (itemWishlist) {
                return itemWishlist.shortcode != item.shortcode;
            });
            status = 'remove';
        }
        basketActions.changeWishlisteData(newWishlistData);
        if (!window.isMobile && status === 'add') {
            var img = item.colorImage ? item.colorImage : '/images/design/Product.svg';
            basketActions.wishlistAddEffect(_react2.default.createElement(_addToWishlistEffect2.default, { startPosition: $(e.target).offset(), image: img }));
            setTimeout(function () {
                basketActions.wishlistAddEffect(null);
            }, 2000);
        }
    };

    var handleOpenDetailPage = function handleOpenDetailPage(deviceName, modelName, capacity, color, shortcode) {
        window.open("//" + window.location.host + "/kaufen/detail/" + deviceName + "/" + modelName + "/" + capacity + "/" + color + "/" + shortcode, '_self');
    };

    var mapSimilarItems = function mapSimilarItems(model, i) {
        var itemWrap = { paddingLeft: "8px", paddingRight: "8px" };
        var realPrice = model.discountPrice ? model.discountPrice : model.price;
        var monthPrice = (realPrice / 12).toFixed(2);
        var description = '';
        if (description != '') description += ', ';
        description += model.capacity !== '' ? model.capacity : '';
        if (description != '') description += ', ';
        description += model.color !== '' ? model.color : '';
        if (description != '') description += ', ';
        description += model.warranty !== '' ? 'Garantie: ' + model.warranty : '';
        description = description.length > 35 ? description.substr(0, 35) + '...' : description;

        var productIsAddedToWishlist = false;
        wishlistData.map(function (el) {
            if (el.shortcode === model.shortcode) {
                productIsAddedToWishlist = true;
            }
        });

        var modelName = model.model.split(" ").join('-').toLowerCase() || 'modelName',
            deviceName = model.deviceName.toLowerCase().replace(/ /g, '-') || 'deviceName',
            color = model.color ? model.color.toLowerCase() : 'color',
            capacity = model.capacity ? model.capacity.toLowerCase() : 'capacity';

        return _react2.default.createElement(
            "div",
            { key: "map-similar-items" + i },
            _react2.default.createElement(
                "div",
                { style: itemWrap },
                _react2.default.createElement(
                    "div",
                    { className: "item", onClick: function onClick() {
                            return handleOpenDetailPage(deviceName, modelName, capacity, color, model.shortcode);
                        } },
                    _react2.default.createElement(
                        "div",
                        { className: "img" },
                        _react2.default.createElement("img", { loading: "lazy", src: model.colorImage || model.deviceImages.mainImg.src, alt: "" }),
                        _react2.default.createElement(
                            "i",
                            { className: "modelInfoBlock-img-small-searchBtn",
                                onClick: function onClick() {
                                    return openLightBox(model);
                                },
                                "aria-hidden": "true" },
                            _react2.default.createElement(
                                "svg",
                                { width: "25", height: "25", viewBox: "0 0 25 25", fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg" },
                                _react2.default.createElement("path", {
                                    d: "M27.8527 26.5212L20.1089 18.7493C21.8011 16.7076 22.6417 14.0926 22.4562 11.4473C22.2707 8.80207 21.0733 6.32994 19.1128 4.54439C17.1523 2.75885 14.5793 1.79714 11.9283 1.85901C9.27729 1.92089 6.75198 3.0016 4.87691 4.87667C3.00184 6.75173 1.92113 9.27704 1.85926 11.9281C1.79738 14.5791 2.75909 17.1521 4.54464 19.1126C6.33018 21.0731 8.80232 22.2704 11.4476 22.4559C14.0928 22.6414 16.7079 21.8008 18.7496 20.1087L26.4933 27.8524C26.6698 28.029 26.9093 28.1281 27.1589 28.1281C27.4086 28.1281 27.648 28.029 27.8246 27.8524C28.0011 27.6759 28.1003 27.4365 28.1003 27.1868C28.1003 26.9372 28.0011 26.6977 27.8246 26.5212H27.8527ZM3.74955 12.1868C3.74955 10.518 4.2444 8.88672 5.17153 7.49919C6.09865 6.11165 7.41641 5.03019 8.95816 4.39158C10.4999 3.75296 12.1964 3.58587 13.8331 3.91143C15.4698 4.237 16.9733 5.04059 18.1533 6.2206C19.3333 7.4006 20.1369 8.90402 20.4624 10.5407C20.788 12.1774 20.6209 13.8739 19.9823 15.4157C19.3437 16.9575 18.2622 18.2752 16.8747 19.2023C15.4871 20.1295 13.8558 20.6243 12.1871 20.6243C9.94929 20.6243 7.80318 19.7354 6.22084 18.153C4.6385 16.5707 3.74955 14.4246 3.74955 12.1868Z",
                                    fill: "#BED3CB" }),
                                _react2.default.createElement("path", {
                                    d: "M15.9375 11.25H13.125V8.4375C13.125 8.18886 13.0262 7.9504 12.8504 7.77459C12.6746 7.59877 12.4361 7.5 12.1875 7.5C11.9389 7.5 11.7004 7.59877 11.5246 7.77459C11.3488 7.9504 11.25 8.18886 11.25 8.4375V11.25H8.4375C8.18886 11.25 7.9504 11.3488 7.77459 11.5246C7.59877 11.7004 7.5 11.9389 7.5 12.1875C7.5 12.4361 7.59877 12.6746 7.77459 12.8504C7.9504 13.0262 8.18886 13.125 8.4375 13.125H11.25V15.9375C11.25 16.1861 11.3488 16.4246 11.5246 16.6004C11.7004 16.7762 11.9389 16.875 12.1875 16.875C12.4361 16.875 12.6746 16.7762 12.8504 16.6004C13.0262 16.4246 13.125 16.1861 13.125 15.9375V13.125H15.9375C16.1861 13.125 16.4246 13.0262 16.6004 12.8504C16.7762 12.6746 16.875 12.4361 16.875 12.1875C16.875 11.9389 16.7762 11.7004 16.6004 11.5246C16.4246 11.3488 16.1861 11.25 15.9375 11.25Z",
                                    fill: "#BED3CB" })
                            )
                        ),
                        _react2.default.createElement(
                            "i",
                            { className: productIsAddedToWishlist ? 'modelInfoBlock-img-small-wishBtn on' : 'modelInfoBlock-img-small-wishBtn',
                                onClick: function onClick(e) {
                                    return addModelToWishlist(e, model);
                                } },
                            _react2.default.createElement(
                                "svg",
                                { viewBox: "0 0 24 24" },
                                _react2.default.createElement("use", { href: "#heart" }),
                                _react2.default.createElement("use", { href: "#heart" })
                            ),
                            _react2.default.createElement(
                                "svg",
                                { className: "hide", viewBox: "0 0 24 24" },
                                _react2.default.createElement(
                                    "defs",
                                    null,
                                    _react2.default.createElement("path", { id: "#heart", d: "M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "heading" },
                        _react2.default.createElement(
                            "h4",
                            null,
                            model.model
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "colors" },
                            _react2.default.createElement("span", { className: "colorPic", style: { backgroundColor: model.colorCode } })
                        )
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "small-description" },
                        description
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "details" },
                        _react2.default.createElement("img", { loading: "lazy", src: "/images/otherProdLocation.svg", alt: "" }),
                        model.placeDescription
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "details" },
                        _react2.default.createElement("img", { loading: "lazy", src: "/images/otherProdState.svg", alt: "" }),
                        model.condition
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "cost-block" },
                        _react2.default.createElement(
                            "div",
                            { className: "cost" },
                            _react2.default.createElement(
                                "div",
                                { className: "price-wrap" },
                                model.discountPrice && _react2.default.createElement(
                                    "p",
                                    { className: "price-value discount-price" },
                                    (0, _helpersFunction.formatPrice)(model.discountPrice),
                                    " ",
                                    window.currencyValue
                                ),
                                _react2.default.createElement(
                                    "p",
                                    { className: model.discountPrice ? 'price-value old-price' : 'price-value' },
                                    (0, _helpersFunction.formatPrice)(model.price),
                                    " ",
                                    window.currencyValue
                                )
                            ),
                            _react2.default.createElement(
                                "span",
                                null,
                                "ab ",
                                monthPrice,
                                " CHF/Monat"
                            )
                        ),
                        _react2.default.createElement(
                            "button",
                            { className: "add-cart", onClick: function onClick(e) {
                                    return addToBasket(e, model);
                                } },
                            _react2.default.createElement("img", { loading: "lazy", src: "/images/otherProdCart.svg", alt: "" })
                        )
                    )
                )
            )
        );
    };

    var settings = (_settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true
    }, (0, _defineProperty3.default)(_settings, "arrows", true), (0, _defineProperty3.default)(_settings, "nextArrow", _react2.default.createElement(SampleNextArrow, null)), (0, _defineProperty3.default)(_settings, "prevArrow", _react2.default.createElement(SamplePrevArrow, null)), (0, _defineProperty3.default)(_settings, "responsive", [{
        breakpoint: 1440,
        settings: {
            slidesToShow: 4,
            infinite: true
        }
    }, {
        breakpoint: 1280,
        settings: {
            slidesToShow: 3,
            infinite: true
        }
    }, {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            infinite: true
        }
    }, {
        breakpoint: 540,
        settings: {
            slidesToShow: 1,
            infinite: true
        }
    }]), _settings);
    return _react2.default.createElement(
        "div",
        { className: "col-xs-12 other-product" },
        _react2.default.createElement(
            "h3",
            null,
            "Folgendes k\xF6nnte Sie auch interessieren"
        ),
        _react2.default.createElement(
            _reactSlick2.default,
            settings,
            similarItems.map(mapSimilarItems)
        ),
        blockImage.isOpenLightBox && _react2.default.createElement(_lightboxImg2.default, {
            src: blockImage.currentMainImage,
            showFirstImage: false,
            showRealImageText: true,
            close: closeLightBox,
            array: [blockImage.currentMainImage]
        })
    );
};

exports.default = OtherProducts;

/***/ }),

/***/ 1504:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmptyPurchaseProducts = undefined;

var _defineProperty2 = __webpack_require__(1037);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = __webpack_require__(316);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(334);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = __webpack_require__(66);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactSlick = __webpack_require__(929);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _reactContentLoader = __webpack_require__(1505);

var _addToBasketEffect = __webpack_require__(950);

var _addToBasketEffect2 = _interopRequireDefault(_addToBasketEffect);

var _addToWishlistEffect = __webpack_require__(1058);

var _addToWishlistEffect2 = _interopRequireDefault(_addToWishlistEffect);

var _lightboxImg = __webpack_require__(1062);

var _lightboxImg2 = _interopRequireDefault(_lightboxImg);

var _reactRouter = __webpack_require__(206);

var _helpersFunction = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SampleNextArrow = function SampleNextArrow(props) {
    var className = props.className,
        style = props.style,
        onClick = props.onClick;

    return _react2.default.createElement(
        'div',
        {
            className: className,
            style: (0, _extends3.default)({}, style),
            onClick: onClick
        },
        _react2.default.createElement(
            'svg',
            { width: '10', height: '18', viewBox: '0 0 10 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M2.19298 1.10152L8.9008 8.22652C9.10588 8.44331 9.20839 8.72152 9.20839 8.99995C9.20839 9.27825 9.10583 9.55636 8.9008 9.77339L2.19298 16.8984C1.76548 17.3484 1.05345 17.3671 0.602516 16.9406C0.148391 16.5128 0.132359 15.7978 0.55857 15.3496L6.57732 8.99808L0.55857 2.64652C0.132359 2.19839 0.148297 1.48823 0.602516 1.05745C1.05345 0.631359 1.76548 0.650109 2.19298 1.10152Z', fill: '#161616' })
        )
    );
};

var SamplePrevArrow = function SamplePrevArrow(props) {
    var className = props.className,
        style = props.style,
        onClick = props.onClick;

    return _react2.default.createElement(
        'div',
        {
            className: className,
            style: (0, _extends3.default)({}, style),
            onClick: onClick
        },
        _react2.default.createElement(
            'svg',
            { width: '10', height: '18', viewBox: '0 0 10 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M2.19298 1.10152L8.9008 8.22652C9.10588 8.44331 9.20839 8.72152 9.20839 8.99995C9.20839 9.27825 9.10583 9.55636 8.9008 9.77339L2.19298 16.8984C1.76548 17.3484 1.05345 17.3671 0.602516 16.9406C0.148391 16.5128 0.132359 15.7978 0.55857 15.3496L6.57732 8.99808L0.55857 2.64652C0.132359 2.19839 0.148297 1.48823 0.602516 1.05745C1.05345 0.631359 1.76548 0.650109 2.19298 1.10152Z', fill: '#161616' })
        )
    );
};

var PurchaseProducts = function PurchaseProducts(_ref) {
    var _settings;

    var recommendProducts = _ref.recommendProducts,
        basketActions = _ref.basketActions,
        basketData = _ref.basketData,
        wishlistData = _ref.wishlistData;

    var _useState = (0, _react.useState)({
        currentMainImage: '',
        isOpenLightBox: false,
        currentImageLightBox: 0,
        image: null
    }),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        blockImage = _useState2[0],
        setBlockImage = _useState2[1];

    var closeLightBox = function closeLightBox() {
        $('#zoom_01').elevateZoom({ zoomType: "inner" });
        setBlockImage((0, _extends3.default)({}, blockImage, {
            isOpenLightBox: false
        }));
    };

    var openLightBox = function openLightBox(item) {
        if (item.deviceImages.mainImg.src === '/images/design/Product.svg') return;
        $('.zoomContainer').remove();
        var position = null;
        [].concat(item.deviceImages.mainImg, item.deviceImages.realImg).forEach(function (item1, i) {
            // find current image position, for LightBox
            if (item1.src === blockImage.currentMainImage) position = i;
        });
        setBlockImage({
            currentMainImage: item.deviceImages.mainImg.src,
            isOpenLightBox: true,
            currentImageLightBox: position,
            image: item.deviceImages
        });
    };

    var addToBasket = function addToBasket(e, item) {
        e.stopPropagation();
        e.preventDefault();
        var status = void 0;
        var newBasketData = [];
        if (basketData.every(function (itemBasket) {
            return itemBasket.id != item.id;
        })) {
            newBasketData = [].concat((0, _toConsumableArray3.default)(basketData), [item]);
            status = 'out';
        } else {
            newBasketData = basketData.filter(function (itemBasket) {
                return itemBasket.shortcode != item.shortcode;
            });
            status = 'in';
        }
        basketActions.changeBasketData(newBasketData);
        if (status === 'out') {
            if (!window.isMobile) {
                var img = item.deviceImages ? item.deviceImages.mainImg.src : '/images/design/Product.svg',
                    start = $(e.target).offset();
                basketActions.basketAddEffect(_react2.default.createElement(_addToBasketEffect2.default, { startPosition: start,
                    image: img,
                    basketType: 'kaufen' }));
                setTimeout(function () {
                    basketActions.basketAddEffect(null);
                }, 2000);
            }
        }
    };

    var addModelToWishlist = function addModelToWishlist(e, item) {
        e.stopPropagation();
        e.preventDefault();
        var newWishlistData = null;
        var status = '';
        if (wishlistData.every(function (itemWishlist) {
            return itemWishlist.id != item.id;
        })) {
            newWishlistData = [].concat((0, _toConsumableArray3.default)(wishlistData), [item]);
            status = 'add';
        } else {
            newWishlistData = wishlistData.filter(function (itemWishlist) {
                return itemWishlist.shortcode != item.shortcode;
            });
            status = 'remove';
        }
        basketActions.changeWishlisteData(newWishlistData);
        if (!window.isMobile && status === 'add') {
            var img = item.deviceImages ? item.deviceImages.mainImg.src : '/images/design/Product.svg';
            basketActions.wishlistAddEffect(_react2.default.createElement(_addToWishlistEffect2.default, { startPosition: $(e.target).offset(), image: img }));
            setTimeout(function () {
                basketActions.wishlistAddEffect(null);
            }, 2000);
        }
    };

    var mapRecommendProducts = function mapRecommendProducts(item, i) {
        var max_model_len = 50;
        var itemWrap = { paddingLeft: "8px", paddingRight: "8px" };
        var title = item.model.length > max_model_len ? item.model.substr(0, max_model_len) + '...' : item.model;
        var mainImg = item.deviceImages.mainImg.src;

        var productIsAddedToWishlist = false;
        wishlistData.map(function (el) {
            if (el.shortcode === item.shortcode) {
                productIsAddedToWishlist = true;
            }
        });

        var modelName = item.model.split(" ").join('-').toLowerCase().replace(/\//g, '--'),
            deviceName = item.deviceName.toLowerCase().replace(/ /g, '-');
        return _react2.default.createElement(
            'div',
            { key: 'map-recommend-items' + i },
            _react2.default.createElement(
                'div',
                { style: itemWrap },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/kaufen/detail/zubehoer/' + deviceName + '/' + modelName + '/' + item.shortcode },
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement(
                            'div',
                            { className: 'img' },
                            _react2.default.createElement('img', { loading: 'lazy', src: mainImg, alt: '' }),
                            _react2.default.createElement(
                                'i',
                                { className: 'modelInfoBlock-img-small-searchBtn',
                                    onClick: function onClick() {
                                        return openLightBox(item);
                                    },
                                    'aria-hidden': 'true' },
                                _react2.default.createElement(
                                    'svg',
                                    { width: '25', height: '25', viewBox: '0 0 25 25', fill: 'none',
                                        xmlns: 'http://www.w3.org/2000/svg' },
                                    _react2.default.createElement('path', {
                                        d: 'M27.8527 26.5212L20.1089 18.7493C21.8011 16.7076 22.6417 14.0926 22.4562 11.4473C22.2707 8.80207 21.0733 6.32994 19.1128 4.54439C17.1523 2.75885 14.5793 1.79714 11.9283 1.85901C9.27729 1.92089 6.75198 3.0016 4.87691 4.87667C3.00184 6.75173 1.92113 9.27704 1.85926 11.9281C1.79738 14.5791 2.75909 17.1521 4.54464 19.1126C6.33018 21.0731 8.80232 22.2704 11.4476 22.4559C14.0928 22.6414 16.7079 21.8008 18.7496 20.1087L26.4933 27.8524C26.6698 28.029 26.9093 28.1281 27.1589 28.1281C27.4086 28.1281 27.648 28.029 27.8246 27.8524C28.0011 27.6759 28.1003 27.4365 28.1003 27.1868C28.1003 26.9372 28.0011 26.6977 27.8246 26.5212H27.8527ZM3.74955 12.1868C3.74955 10.518 4.2444 8.88672 5.17153 7.49919C6.09865 6.11165 7.41641 5.03019 8.95816 4.39158C10.4999 3.75296 12.1964 3.58587 13.8331 3.91143C15.4698 4.237 16.9733 5.04059 18.1533 6.2206C19.3333 7.4006 20.1369 8.90402 20.4624 10.5407C20.788 12.1774 20.6209 13.8739 19.9823 15.4157C19.3437 16.9575 18.2622 18.2752 16.8747 19.2023C15.4871 20.1295 13.8558 20.6243 12.1871 20.6243C9.94929 20.6243 7.80318 19.7354 6.22084 18.153C4.6385 16.5707 3.74955 14.4246 3.74955 12.1868Z',
                                        fill: '#BED3CB' }),
                                    _react2.default.createElement('path', {
                                        d: 'M15.9375 11.25H13.125V8.4375C13.125 8.18886 13.0262 7.9504 12.8504 7.77459C12.6746 7.59877 12.4361 7.5 12.1875 7.5C11.9389 7.5 11.7004 7.59877 11.5246 7.77459C11.3488 7.9504 11.25 8.18886 11.25 8.4375V11.25H8.4375C8.18886 11.25 7.9504 11.3488 7.77459 11.5246C7.59877 11.7004 7.5 11.9389 7.5 12.1875C7.5 12.4361 7.59877 12.6746 7.77459 12.8504C7.9504 13.0262 8.18886 13.125 8.4375 13.125H11.25V15.9375C11.25 16.1861 11.3488 16.4246 11.5246 16.6004C11.7004 16.7762 11.9389 16.875 12.1875 16.875C12.4361 16.875 12.6746 16.7762 12.8504 16.6004C13.0262 16.4246 13.125 16.1861 13.125 15.9375V13.125H15.9375C16.1861 13.125 16.4246 13.0262 16.6004 12.8504C16.7762 12.6746 16.875 12.4361 16.875 12.1875C16.875 11.9389 16.7762 11.7004 16.6004 11.5246C16.4246 11.3488 16.1861 11.25 15.9375 11.25Z',
                                        fill: '#BED3CB' })
                                )
                            ),
                            _react2.default.createElement(
                                'i',
                                { className: productIsAddedToWishlist ? 'modelInfoBlock-img-small-wishBtn on' : 'modelInfoBlock-img-small-wishBtn',
                                    onClick: function onClick(e) {
                                        return addModelToWishlist(e, item);
                                    } },
                                _react2.default.createElement(
                                    'svg',
                                    { viewBox: '0 0 24 24' },
                                    _react2.default.createElement('use', { href: '#heart' }),
                                    _react2.default.createElement('use', { href: '#heart' })
                                ),
                                _react2.default.createElement(
                                    'svg',
                                    { className: 'hide', viewBox: '0 0 24 24' },
                                    _react2.default.createElement(
                                        'defs',
                                        null,
                                        _react2.default.createElement('path', { id: '#heart', d: 'M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z' })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'heading' },
                            _react2.default.createElement(
                                'h4',
                                null,
                                title
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'cost-block purchase-product-cost' },
                            _react2.default.createElement(
                                'div',
                                { className: 'cost' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'price-wrap' },
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'price-value' },
                                        (0, _helpersFunction.formatPrice)(item.price),
                                        ' ',
                                        window.currencyValue
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'add-cart', onClick: function onClick(e) {
                                        return addToBasket(e, item);
                                    } },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/otherProdCart.svg', alt: '' })
                            )
                        )
                    )
                )
            )
        );
    };

    var settings = (_settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true
    }, (0, _defineProperty3.default)(_settings, 'arrows', true), (0, _defineProperty3.default)(_settings, 'nextArrow', _react2.default.createElement(SampleNextArrow, null)), (0, _defineProperty3.default)(_settings, 'prevArrow', _react2.default.createElement(SamplePrevArrow, null)), (0, _defineProperty3.default)(_settings, 'responsive', [{
        breakpoint: 1440,
        settings: {
            slidesToShow: 4,
            infinite: true
        }
    }, {
        breakpoint: 1280,
        settings: {
            slidesToShow: 3,
            infinite: true
        }
    }, {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            infinite: true
        }
    }, {
        breakpoint: 540,
        settings: {
            slidesToShow: 1,
            infinite: true
        }
    }]), _settings);

    return _react2.default.createElement(
        'div',
        { className: 'col-xs-12 other-product purchase-products' },
        _react2.default.createElement(
            'h3',
            null,
            'Artikel, die zusammen gekauft werden'
        ),
        _react2.default.createElement(
            _reactSlick2.default,
            settings,
            recommendProducts.map(mapRecommendProducts)
        ),
        blockImage.isOpenLightBox && _react2.default.createElement(_lightboxImg2.default, {
            src: blockImage.currentMainImage,
            showFirstImage: false,
            showRealImageText: true,
            close: closeLightBox,
            array: [].concat(blockImage.image.mainImg, blockImage.image.realImg)
        })
    );
};

var EmptyPurchaseProducts = exports.EmptyPurchaseProducts = function EmptyPurchaseProducts() {
    var _settings2;

    var settings = (_settings2 = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true
    }, (0, _defineProperty3.default)(_settings2, 'arrows', true), (0, _defineProperty3.default)(_settings2, 'nextArrow', _react2.default.createElement(SampleNextArrow, null)), (0, _defineProperty3.default)(_settings2, 'prevArrow', _react2.default.createElement(SamplePrevArrow, null)), (0, _defineProperty3.default)(_settings2, 'responsive', [{
        breakpoint: 1440,
        settings: {
            slidesToShow: 4,
            infinite: true
        }
    }, {
        breakpoint: 1280,
        settings: {
            slidesToShow: 3,
            infinite: true
        }
    }, {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            infinite: true
        }
    }, {
        breakpoint: 540,
        settings: {
            slidesToShow: 1,
            infinite: true
        }
    }]), _settings2);

    var itemWrap = { paddingLeft: "8px", paddingRight: "8px" };
    return _react2.default.createElement(
        'div',
        { className: 'col-xs-12 other-product purchase-products' },
        _react2.default.createElement(
            'h3',
            null,
            'Artikel, die zusammen gekauft werden'
        ),
        _react2.default.createElement(
            _reactSlick2.default,
            settings,
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: itemWrap },
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement(_reactContentLoader.BulletList, null)
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: itemWrap },
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement(_reactContentLoader.BulletList, null)
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: itemWrap },
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement(_reactContentLoader.BulletList, null)
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: itemWrap },
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement(_reactContentLoader.BulletList, null)
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: itemWrap },
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement(_reactContentLoader.BulletList, null)
                    )
                )
            )
        )
    );
};
exports.default = PurchaseProducts;

/***/ }),

/***/ 1505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulletList", function() { return ReactContentLoaderBulletList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Code", function() { return ReactContentLoaderCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Facebook", function() { return ReactContentLoaderFacebook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instagram", function() { return ReactContentLoaderInstagram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return ReactContentLoaderListStyle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var uid = (function () {
    return Math.random()
        .toString(36)
        .substring(6);
});

var SVG = function (_a) {
    var _b = _a.animate, animate = _b === void 0 ? true : _b, animateBegin = _a.animateBegin, _c = _a.backgroundColor, backgroundColor = _c === void 0 ? '#f5f6f7' : _c, _d = _a.backgroundOpacity, backgroundOpacity = _d === void 0 ? 1 : _d, _e = _a.baseUrl, baseUrl = _e === void 0 ? '' : _e, children = _a.children, _f = _a.foregroundColor, foregroundColor = _f === void 0 ? '#eee' : _f, _g = _a.foregroundOpacity, foregroundOpacity = _g === void 0 ? 1 : _g, _h = _a.gradientRatio, gradientRatio = _h === void 0 ? 2 : _h, _j = _a.gradientDirection, gradientDirection = _j === void 0 ? 'left-right' : _j, uniqueKey = _a.uniqueKey, _k = _a.interval, interval = _k === void 0 ? 0.25 : _k, _l = _a.rtl, rtl = _l === void 0 ? false : _l, _m = _a.speed, speed = _m === void 0 ? 1.2 : _m, _o = _a.style, style = _o === void 0 ? {} : _o, _p = _a.title, title = _p === void 0 ? 'Loading...' : _p, _q = _a.beforeMask, beforeMask = _q === void 0 ? null : _q, props = __rest(_a, ["animate", "animateBegin", "backgroundColor", "backgroundOpacity", "baseUrl", "children", "foregroundColor", "foregroundOpacity", "gradientRatio", "gradientDirection", "uniqueKey", "interval", "rtl", "speed", "style", "title", "beforeMask"]);
    var fixedId = uniqueKey || uid();
    var idClip = fixedId + "-diff";
    var idGradient = fixedId + "-animated-diff";
    var idAria = fixedId + "-aria";
    var rtlStyle = rtl ? { transform: 'scaleX(-1)' } : null;
    var keyTimes = "0; " + interval + "; 1";
    var dur = speed + "s";
    var gradientTransform = gradientDirection === 'top-bottom' ? 'rotate(90)' : undefined;
    return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("svg", __assign({ "aria-labelledby": idAria, role: "img", style: __assign(__assign({}, style), rtlStyle) }, props),
        title ? Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("title", { id: idAria }, title) : null,
        beforeMask && Object(__WEBPACK_IMPORTED_MODULE_0_react__["isValidElement"])(beforeMask) ? beforeMask : null,
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { role: "presentation", x: "0", y: "0", width: "100%", height: "100%", clipPath: "url(" + baseUrl + "#" + idClip + ")", style: { fill: "url(" + baseUrl + "#" + idGradient + ")" } }),
        Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("defs", null,
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("clipPath", { id: idClip }, children),
            Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("linearGradient", { id: idGradient, gradientTransform: gradientTransform },
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("stop", { offset: "0%", stopColor: backgroundColor, stopOpacity: backgroundOpacity }, animate && (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("animate", { attributeName: "offset", values: -gradientRatio + "; " + -gradientRatio + "; 1", keyTimes: keyTimes, dur: dur, repeatCount: "indefinite", begin: animateBegin }))),
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("stop", { offset: "50%", stopColor: foregroundColor, stopOpacity: foregroundOpacity }, animate && (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("animate", { attributeName: "offset", values: -gradientRatio / 2 + "; " + -gradientRatio / 2 + "; " + (1 +
                        gradientRatio / 2), keyTimes: keyTimes, dur: dur, repeatCount: "indefinite", begin: animateBegin }))),
                Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("stop", { offset: "100%", stopColor: backgroundColor, stopOpacity: backgroundOpacity }, animate && (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("animate", { attributeName: "offset", values: "0; 0; " + (1 + gradientRatio), keyTimes: keyTimes, dur: dur, repeatCount: "indefinite", begin: animateBegin })))))));
};

var ContentLoader = function (props) {
    return props.children ? Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(SVG, __assign({}, props)) : Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ReactContentLoaderFacebook, __assign({}, props));
};

var ReactContentLoaderFacebook = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ContentLoader, __assign({ viewBox: "0 0 476 124" }, props),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "48", y: "8", width: "88", height: "6", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "48", y: "26", width: "52", height: "6", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "0", y: "56", width: "410", height: "6", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "0", y: "72", width: "380", height: "6", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "0", y: "88", width: "178", height: "6", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("circle", { cx: "20", cy: "20", r: "20" }))); };

var ReactContentLoaderInstagram = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ContentLoader, __assign({ viewBox: "0 0 400 460" }, props),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("circle", { cx: "31", cy: "31", r: "15" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "58", y: "18", rx: "2", ry: "2", width: "140", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "58", y: "34", rx: "2", ry: "2", width: "140", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "0", y: "60", rx: "2", ry: "2", width: "400", height: "400" }))); };

var ReactContentLoaderCode = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ContentLoader, __assign({ viewBox: "0 0 340 84" }, props),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "0", y: "0", width: "67", height: "11", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "76", y: "0", width: "140", height: "11", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "127", y: "48", width: "53", height: "11", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "187", y: "48", width: "72", height: "11", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "18", y: "48", width: "100", height: "11", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "0", y: "71", width: "37", height: "11", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "18", y: "23", width: "140", height: "11", rx: "3" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "166", y: "23", width: "173", height: "11", rx: "3" }))); };

var ReactContentLoaderListStyle = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ContentLoader, __assign({ viewBox: "0 0 400 110" }, props),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "0", y: "0", rx: "3", ry: "3", width: "250", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "20", y: "20", rx: "3", ry: "3", width: "220", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "20", y: "40", rx: "3", ry: "3", width: "170", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "0", y: "60", rx: "3", ry: "3", width: "250", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "20", y: "80", rx: "3", ry: "3", width: "200", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "20", y: "100", rx: "3", ry: "3", width: "80", height: "10" }))); };

var ReactContentLoaderBulletList = function (props) { return (Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(ContentLoader, __assign({ viewBox: "0 0 245 125" }, props),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("circle", { cx: "10", cy: "20", r: "8" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "25", y: "15", rx: "5", ry: "5", width: "220", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("circle", { cx: "10", cy: "50", r: "8" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "25", y: "45", rx: "5", ry: "5", width: "220", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("circle", { cx: "10", cy: "80", r: "8" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "25", y: "75", rx: "5", ry: "5", width: "220", height: "10" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("circle", { cx: "10", cy: "110", r: "8" }),
    Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("rect", { x: "25", y: "105", rx: "5", ry: "5", width: "220", height: "10" }))); };

/* harmony default export */ __webpack_exports__["default"] = (ContentLoader);

//# sourceMappingURL=react-content-loader.es.js.map


/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(316);

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

var _reactHelmet = __webpack_require__(1057);

var _reactRedux = __webpack_require__(313);

var _reactRouter = __webpack_require__(206);

var _redux = __webpack_require__(148);

var _basket = __webpack_require__(327);

var basketActions = _interopRequireWildcard(_basket);

var _index = __webpack_require__(330);

var _index2 = _interopRequireDefault(_index);

var _helpersFunction = __webpack_require__(315);

var _addToBasketEffect = __webpack_require__(950);

var _addToBasketEffect2 = _interopRequireDefault(_addToBasketEffect);

var _successAddToBasket = __webpack_require__(1283);

var _successAddToBasket2 = _interopRequireDefault(_successAddToBasket);

var _listSimilarItems = __webpack_require__(1041);

var _listSimilarItems2 = _interopRequireDefault(_listSimilarItems);

var _modelInfoBlock = __webpack_require__(1253);

var _modelInfoBlock2 = _interopRequireDefault(_modelInfoBlock);

var _otherProducts = __webpack_require__(1503);

var _otherProducts2 = _interopRequireDefault(_otherProducts);

var _purchaseProducts = __webpack_require__(1504);

var _purchaseProducts2 = _interopRequireDefault(_purchaseProducts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DetailModelPage = function (_Component) {
    (0, _inherits3.default)(DetailModelPage, _Component);

    function DetailModelPage(props) {
        (0, _classCallCheck3.default)(this, DetailModelPage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DetailModelPage.__proto__ || Object.getPrototypeOf(DetailModelPage)).call(this, props));

        _this.state = {
            model: [],
            similarItems: [],
            upsellingItems: [],
            specifications: [],
            additionalSpecifications: {},
            capacityName: null,
            deviceStatus: {
                statusId: null,
                dateOfBought: null,
                boughtCurrentUser: false
            },
            activeNavItem: 'technical',
            successAddToBasket: null,
            recommendProducts: null
        };

        _this.clickNavItem = _this.clickNavItem.bind(_this);
        _this.mapAccessories = _this.mapAccessories.bind(_this);
        _this._increaseCounter = _this._increaseCounter.bind(_this);
        _this.openSuccessAddToBasket = _this.openSuccessAddToBasket.bind(_this);
        _this._recommendProducts = _this._recommendProducts.bind(_this);
        _this.closeSuccessAddToBasket = _this.closeSuccessAddToBasket.bind(_this);
        _this.addModelToBasket = _this.addModelToBasket.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(DetailModelPage, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.params.currentModelId !== this.props.params.currentModelId) {
                var _nextProps$params = nextProps.params,
                    currentModelId = _nextProps$params.currentModelId,
                    deviceName = _nextProps$params.device;

                deviceName = deviceName.split("-").join(' ');
                var objForRequest = {
                    deviceName: deviceName,
                    inventoryId: currentModelId
                };
                this._getModelData(objForRequest, currentModelId);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props$params = this.props.params,
                currentModelId = _props$params.currentModelId,
                deviceName = _props$params.device;

            deviceName = deviceName.split("-").join(' ');
            var objForRequest = {
                deviceName: deviceName,
                inventoryId: currentModelId
            };
            this._getModelData(objForRequest, currentModelId);
            this._increaseCounter(currentModelId);
        }
    }, {
        key: '_increaseCounter',
        value: function _increaseCounter(currentModelId) {
            _axios2.default.post('/api/increaseCounter', { deviceId: currentModelId }).then(function (_ref) {
                var data = _ref.data;
            }).catch(function (error) {});
        }
    }, {
        key: '_gtag_snippet',
        value: function _gtag_snippet(model) {
            gtag('event', 'page_view', {
                'send_to': 'AW-827036726',
                'ecomm_prodid': model.shortcode,
                'ecomm_pagetype': 'product',
                'ecomm_totalvalue': +model.discountPrice || +model.price,
                'ecomm_category': 'Electronics'
            });
        }
    }, {
        key: '_recommendProducts',
        value: function _recommendProducts(modelId) {
            var _this2 = this;

            var successAddToBasket = this.state.successAddToBasket;

            var promise = new Promise(function (resolve, reject) {
                if (modelId) {
                    _axios2.default.get('/api/loadRecommendProducts?modelId=' + modelId).then(function (result) {
                        resolve(result.data.data.length ? result.data.data : null);
                    });
                } else {
                    resolve(null);
                }
            });
            promise.then(function (result) {
                if (result && successAddToBasket == null && result.length > 0) {
                    _this2.setState({ recommendProducts: result });
                }
            });
        }
    }, {
        key: '_getModelData',
        value: function _getModelData(objForRequest, currentModelId) {
            var _this3 = this;

            document.getElementById('spinner-box-load').style.display = 'block';
            _index2.default.getModels('/api/models', objForRequest).then(function (_ref2) {
                var data = _ref2.data;

                var responseData = data;
                if (window.isGoogleConnection) {
                    _this3._gtag_snippet(responseData.data[0]);
                }
                _this3.setState({ model: responseData.data, capacityName: responseData.meta.capacityName });
                var model = responseData.data,
                    gtagData = JSON.parse(window.localStorage.getItem("gtag"));
                0;
                if (window.isGoogleConnection && gtagData) {
                    gtag('event', 'view_item', {
                        "items": [{
                            "id": model[0].shortcode,
                            "name": model[0].descriptionLong,
                            "list_name": "Kaufen",
                            "quantity": 1,
                            "price": model[0].discountPrice || model[0].price,
                            "brand": model[0].deviceName,
                            "category": gtagData.category || ''
                        }]
                    });
                }

                (0, _helpersFunction.pushKlavioIdentify)();

                var gtagDataCategory = gtagData ? [gtagData.category] : [''];
                var klavioItem = {
                    "ProductName": model[0].descriptionLong,
                    "ProductID": model[0].shortcode,
                    "Categories": gtagDataCategory,
                    "ImageURL": model[0].deviceImages.mainImg.src,
                    "URL": window.location.href,
                    "Brand": model[0].deviceName,
                    "Price": model[0].discountPrice || model[0].price,
                    "CompareAtPrice": model[0].price
                };

                _learnq.push(["track", "Viewed Product", klavioItem]);

                _learnq.push(["trackViewedItem", {
                    "Title": klavioItem.ProductName,
                    "ItemId": klavioItem.ProductID,
                    "Categories": klavioItem.Categories,
                    "ImageUrl": klavioItem.ImageURL,
                    "Url": klavioItem.URL,
                    "Metadata": {
                        "Brand": klavioItem.Brand,
                        "Price": klavioItem.Price,
                        "CompareAtPrice": klavioItem.CompareAtPrice
                    }
                }]);

                _this3._recommendProducts(model[0].modelId);
            }).catch(function (error) {});
            _axios2.default.get('/api/getSpecifications?deviceId=' + currentModelId).then(function (_ref3) {
                var data = _ref3.data;

                _this3.setState({ specifications: data.specifications, additionalSpecifications: data.additionalSpecifications });
            }).catch(function (error) {});
            _axios2.default.post('/api/similarItems', { deviceId: currentModelId }).then(function (_ref4) {
                var data = _ref4.data;

                _this3.setState({ similarItems: data });
            }).catch(function (error) {});
            _axios2.default.get('/api/checkSoldDevice?deviceShortcode=' + currentModelId).then(function (_ref5) {
                var data = _ref5.data;

                _this3.setState({ deviceStatus: (0, _extends3.default)({}, _this3.state.deviceStatus, { statusId: data.status, dateOfBought: data.date,
                        boughtCurrentUser: data.boughtCurrentUser }) });
            }).catch(function (error) {});
            _axios2.default.get('/api/getUpsellingProducts?deviceShortcode=' + currentModelId).then(function (_ref6) {
                var data = _ref6.data;

                _this3.setState({ upsellingItems: data.data });
            }).catch(function (error) {});
        }
    }, {
        key: 'clickNavItem',
        value: function clickNavItem(e) {
            var activeNavItem = e.currentTarget.getAttribute('data-type');
            this.setState({ activeNavItem: activeNavItem });
        }
    }, {
        key: 'mapAccessories',
        value: function mapAccessories(item, i) {
            return _react2.default.createElement(
                'li',
                { key: i },
                _react2.default.createElement('i', { className: 'fa fa-check-circle-o', 'aria-hidden': 'true' }),
                item
            );
        }
    }, {
        key: 'getUrlForNavigation',
        value: function getUrlForNavigation() {
            var deviceName = this.state.model[0].deviceName,
                currentDevices = null;

            function findCurrentDevice(current, nextDevice) {
                if (nextDevice.submodels) {
                    var equalDevice = nextDevice.submodels.filter(function (item) {
                        return item.name == deviceName;
                    });
                    if (equalDevice.length > 0) {
                        currentDevices = [].concat((0, _toConsumableArray3.default)(current), [equalDevice[0].name]);
                        return true;
                    } else {
                        nextDevice.submodels.forEach(function (item) {
                            if (item.submodels) {
                                findCurrentDevice([].concat((0, _toConsumableArray3.default)(current), [item.name]), item);
                            }
                        });
                        return false;
                    }
                }
            }
            this.props.devices.forEach(function (item) {
                return findCurrentDevice([item.name], item);
            });
            var strUrl = '';
            if (currentDevices) strUrl = currentDevices.join('/').toLowerCase().replace(/ /g, '-') + '/filter';
            return '/kaufen/' + strUrl;
        }
    }, {
        key: 'openSuccessAddToBasket',
        value: function openSuccessAddToBasket(item, source) {
            this.setState({ successAddToBasket: _react2.default.createElement(_successAddToBasket2.default, {
                    addModelToBasket: this.addModelToBasket,
                    basketData: this.props.basketData,
                    source: source,
                    model: item,
                    recommendProducts: this.state.recommendProducts,
                    closeSuccessAddToBasket: this.closeSuccessAddToBasket }) });
        }
    }, {
        key: 'closeSuccessAddToBasket',
        value: function closeSuccessAddToBasket() {
            this.setState({ successAddToBasket: null });
        }
    }, {
        key: 'addModelToBasket',
        value: function addModelToBasket(e, item) {
            var _this4 = this;

            e.stopPropagation();
            e.preventDefault();
            var status = e.target.getAttribute('data-status'),
                basketData = this.props.basketData,
                newBasketData = null;

            if (item.categoryName) {
                newBasketData = [].concat((0, _toConsumableArray3.default)(basketData), [item]);
            } else if (basketData.every(function (itemBasket) {
                return itemBasket.id != item.id;
            })) {
                newBasketData = [].concat((0, _toConsumableArray3.default)(basketData), [item]);
            } else {
                newBasketData = basketData.filter(function (itemBasket) {
                    return itemBasket.shortcode != item.shortcode;
                });
            }
            this.props.basketActions.changeBasketData(newBasketData);

            if (status === 'out') {
                var brands = item.criterias.find(function (item) {
                    return item.id === 'manufacturer';
                }).values,
                    brand = brands.length ? brands[0].name : "",
                    category = item.categoryName;
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
                    var img = item.deviceImages ? item.deviceImages.mainImg.src : '/images/design/Product.svg',
                        start = $(e.target).offset();
                    this.props.basketActions.basketAddEffect(_react2.default.createElement(_addToBasketEffect2.default, { startPosition: start,
                        image: img,
                        basketType: 'kaufen' }));
                    setTimeout(function () {
                        _this4.props.basketActions.basketAddEffect(null);
                    }, 2000);
                } else {
                    _reactRouter.browserHistory.push('/warenkorb');
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                model = _state.model,
                similarItems = _state.similarItems,
                specifications = _state.specifications,
                additionalSpecifications = _state.additionalSpecifications,
                capacityName = _state.capacityName,
                deviceStatus = _state.deviceStatus,
                activeNavItem = _state.activeNavItem,
                successAddToBasket = _state.successAddToBasket,
                upsellingItems = _state.upsellingItems,
                recommendProducts = _state.recommendProducts,
                deviceName = this.props.params.device,
                locationQuery = this.props.location.query,
                urlNavigation = model[0] && this.getUrlForNavigation() || '',
                loader = document.getElementById('spinner-box-load'),
                title = model[0] ? model[0].descriptionLong + ',  ' + model[0].capacity + ', ' + model[0].condition : '',
                descriptionPrice = model[0] && model[0].discountPrice ? model[0].discountPrice : model[0] ? model[0].price : '',
                description = model[0] ? model[0].descriptionLong + ',  ' + model[0].capacity + ' g\xFCnstig kaufen in ' + model[0].placeDescription + ' f\xFCr ' + descriptionPrice + ' im Zustand ' + model[0].condition + ' inkl. ' + model[0].warranty + ' Garantie.' : '';

            var webshopDiscountData = JSON.parse(window.localStorage.getItem('webshopDiscountData'));
            if (loader && model[0]) loader.style.display = 'none';

            var schemaData = {};
            if (model[0]) {
                // add schema
                var device = model[0];

                var titleSchema = '';

                var condition = device.conditionId === 1 || device.conditionId === 2 ? '' : 'gebraucht, ';
                titleSchema = device.model + ', ' + condition + device.capacity + ', ' + device.color;

                var stockDevice = {};
                if (device.statusId === 1) {
                    stockDevice = {
                        "availability": "https://schema.org/InStock"
                    };
                } else {
                    stockDevice = {
                        "availability": "https://schema.org/OutOfStock"
                    };
                }

                var conditionDevice = {};
                if (device.conditionId === 1 || device.conditionId === 2) {
                    conditionDevice = {
                        "itemCondition": "https://schema.org/NewCondition"
                    };
                } else if (device.conditionId === 3 || device.conditionId === 4 || device.conditionId === 5) {
                    conditionDevice = {
                        "itemCondition": "https://schema.org/UsedCondition"
                    };
                }

                var offers = {};
                if (device.discountPrice === false) {
                    offers = {
                        "@type": "Offer",
                        "url": window.location.href,
                        "priceCurrency": "CHF",
                        "price": device.price
                    };
                } else {
                    offers = {
                        "@type": "AggregateOffer",
                        "url": window.location.href,
                        "priceCurrency": "CHF",
                        "lowPrice": device.discountPrice,
                        "highPrice": device.price
                    };
                }

                schemaData = {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "name": titleSchema,
                    "image": device.deviceImages.mainImg.src,
                    "description": device.descriptionSeo,
                    "brand": device.deviceName,
                    "sku": device.shortcode,
                    "offers": offers
                };

                schemaData = (0, _extends3.default)({}, schemaData, stockDevice, conditionDevice);
            }
            var structuredSchemaDataJSON = JSON.stringify(schemaData);

            return _react2.default.createElement(
                'div',
                { className: 'detail-page' },
                model[0] && _react2.default.createElement(_reactHelmet.Helmet, {
                    title: title,
                    meta: [{ "name": "description", "content": description }, { "property": "og:title", "content": title }, { "property": "og:image", "content": model[0].deviceImages.mainImg.src }]
                }),
                _react2.default.createElement(
                    _reactHelmet.Helmet,
                    null,
                    _react2.default.createElement(
                        'script',
                        { type: 'application/ld+json' },
                        structuredSchemaDataJSON
                    )
                ),
                model[0] && _react2.default.createElement(
                    'div',
                    { className: 'detailPage' },
                    _react2.default.createElement(
                        'div',
                        { className: 'infoBlock' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container-fluid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                !window.isMobile && _react2.default.createElement(
                                    'div',
                                    { className: 'col-xs-12' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'navigation-row' },
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: '/' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/house-icon.svg', alt: '' })
                                        ),
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: urlNavigation },
                                            'Liste'
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            model[0] && model[0].model
                                        )
                                    )
                                ),
                                !window.isMobile && webshopDiscountData.desktop_detail_active == 1 && _react2.default.createElement(
                                    'div',
                                    { className: 'notification-device-detail' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'subtract' },
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/subtract.svg' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'content' },
                                        _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: (0, _helpersFunction.discountCode)(webshopDiscountData.desktop_detail_text, 'discount-code') } })
                                    )
                                ),
                                window.isMobile && webshopDiscountData.mobile_detail_active == 1 && _react2.default.createElement(
                                    'div',
                                    { className: 'notification-device-detail' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'subtract' },
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/subtract.svg' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'content' },
                                        _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: (0, _helpersFunction.discountCode)(webshopDiscountData.mobile_detail_text, 'discount-code') } })
                                    )
                                ),
                                _react2.default.createElement(_modelInfoBlock2.default, { currentModel: model,
                                    openSuccessAddToBasket: this.openSuccessAddToBasket,
                                    deviceStatus: deviceStatus,
                                    capacityName: capacityName,
                                    isRemarketingCampaign: locationQuery ? locationQuery.coupon : 0,
                                    specifications: specifications,
                                    additionalSpecifications: additionalSpecifications,
                                    upsellingItems: upsellingItems
                                })
                            ),
                            _react2.default.createElement('div', { className: 'cb' })
                        )
                    ),
                    similarItems.length > 0 && _react2.default.createElement(
                        'div',
                        { className: 'others-product-block' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container-fluid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(_otherProducts2.default, {
                                    similarItems: similarItems,
                                    basketActions: this.props.basketActions,
                                    basketData: this.props.basketData,
                                    wishlistData: this.props.wishlistData
                                })
                            )
                        )
                    ),
                    !recommendProducts && _react2.default.createElement(
                        'div',
                        { className: 'others-product-block' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container-fluid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(_purchaseProducts.EmptyPurchaseProducts, null)
                            )
                        )
                    ),
                    recommendProducts && recommendProducts.length > 0 && _react2.default.createElement(
                        'div',
                        { className: 'others-product-block' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container-fluid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(_purchaseProducts2.default, {
                                    recommendProducts: recommendProducts,
                                    basketActions: this.props.basketActions,
                                    basketData: this.props.basketData,
                                    wishlistData: this.props.wishlistData })
                            )
                        )
                    ),
                    false && _react2.default.createElement(
                        'div',
                        { className: 'similar' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container' },
                            _react2.default.createElement(_listSimilarItems2.default, { similarItems: similarItems, deviceName: deviceName }),
                            _react2.default.createElement('div', { className: 'cb' })
                        )
                    ),
                    successAddToBasket
                )
            );
        }
    }]);
    return DetailModelPage;
}(_react.Component);

DetailModelPage.propTypes = {};
DetailModelPage.defaultProps = {};

function mapStateToProps(state) {
    return {
        devices: state.shop.devices,
        basketData: state.basket.basketData,
        wishlistData: state.basket.wishlistData
    };
}
function mapDispatchToProps(dispatch) {
    return {
        basketActions: (0, _redux.bindActionCreators)(basketActions, dispatch)
    };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DetailModelPage);

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

/***/ 900:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(86);

var ReactCurrentOwner = __webpack_require__(935);

var warning = __webpack_require__(904);
var canDefineProperty = __webpack_require__(934);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(975);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (true) {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (true) {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
       true ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
       true ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (true) {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (true) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (true) {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;

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

/***/ 904:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(959);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ 905:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ 906:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

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

/***/ 934:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var canDefineProperty = false;
if (true) {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;

/***/ }),

/***/ 935:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

module.exports = ReactCurrentOwner;

/***/ }),

/***/ 936:
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(1016);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


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

/***/ 947:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

if (true) {
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = lowPriorityWarning;

/***/ }),

/***/ 948:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var _prodInvariant = __webpack_require__(906);

var ReactCurrentOwner = __webpack_require__(935);

var invariant = __webpack_require__(905);
var warning = __webpack_require__(904);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty
  // Strip regex characters so we can use it for regex
  ).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'
  // Remove hasOwnProperty from the template to make it generic
  ).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
   true ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ?  true ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ?  true ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ?  true ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ?  true ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ?  true ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ?  true ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs,

  pushNonStandardWarningStack: function (isCreatingElement, currentSource) {
    if (typeof console.reactStack !== 'function') {
      return;
    }

    var stack = [];
    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    try {
      if (isCreatingElement) {
        stack.push({
          name: id ? ReactComponentTreeHook.getDisplayName(id) : null,
          fileName: currentSource ? currentSource.fileName : null,
          lineNumber: currentSource ? currentSource.lineNumber : null
        });
      }

      while (id) {
        var element = ReactComponentTreeHook.getElement(id);
        var parentID = ReactComponentTreeHook.getParentID(id);
        var ownerID = ReactComponentTreeHook.getOwnerID(id);
        var ownerName = ownerID ? ReactComponentTreeHook.getDisplayName(ownerID) : null;
        var source = element && element._source;
        stack.push({
          name: ownerName,
          fileName: source ? source.fileName : null,
          lineNumber: source ? source.lineNumber : null
        });
        id = parentID;
      }
    } catch (err) {
      // Internal state is messed up.
      // Stop building the stack (it's just a nice to have).
    }

    console.reactStack(stack);
  },
  popNonStandardWarningStack: function () {
    if (typeof console.reactStackEnd !== 'function') {
      return;
    }
    console.reactStackEnd();
  }
};

module.exports = ReactComponentTreeHook;

/***/ }),

/***/ 949:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* global window self */

var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

/* eslint-disable no-restricted-globals */
var isWebWorker = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.constructor && self.constructor.name === 'DedicatedWorkerGlobalScope';
/* eslint-enable no-restricted-globals */

var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

/**
 * @see https://github.com/jsdom/jsdom/releases/tag/12.0.0
 * @see https://github.com/jsdom/jsdom/issues/1537
 */
/* eslint-disable no-undef */
var isJsDom = function isJsDom() {
  return typeof window !== 'undefined' && window.name === 'nodejs' || navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom');
};

exports.isBrowser = isBrowser;
exports.isWebWorker = isWebWorker;
exports.isNode = isNode;
exports.isJsDom = isJsDom;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(335)))

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

/***/ }),

/***/ 953:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animated = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(995);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(869);

var _classnames2 = _interopRequireDefault(_classnames);

var _browserOrNode = __webpack_require__(949);

var _prefixer = __webpack_require__(1011);

var _prefixer2 = _interopRequireDefault(_prefixer);

var _propTypes = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isLteIE9 = function () {
  var ua = _browserOrNode.isBrowser ? window.navigator.userAgent : "";
  var ie = ua.indexOf("MSIE ");
  return ie > -1 && parseInt(ua.substring(ie + 5, ua.indexOf(".", ie)), 10) <= 9;
}();

var Animated = exports.Animated = function (_React$Component) {
  _inherits(Animated, _React$Component);

  function Animated(props) {
    _classCallCheck(this, Animated);

    var _this = _possibleConstructorReturn(this, (Animated.__proto__ || Object.getPrototypeOf(Animated)).call(this, props));

    _this.getNewState = function (_ref) {
      var isVisible = _ref.isVisible,
          animationIn = _ref.animationIn,
          animationOut = _ref.animationOut,
          animationInDuration = _ref.animationInDuration,
          animationOutDuration = _ref.animationOutDuration,
          animationInDelay = _ref.animationInDelay,
          animationOutDelay = _ref.animationOutDelay;
      return isVisible ? {
        animation: animationIn,
        duration: animationInDuration,
        delay: animationInDelay
      } : {
        animation: animationOut,
        duration: animationOutDuration,
        delay: animationOutDelay
      };
    };

    _this.state = props.animateOnMount ? _this.getNewState(props) : {};
    return _this;
  }

  _createClass(Animated, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var isVisible = this.props.isVisible;

      if (isVisible !== nextProps.isVisible) {
        this.setState(this.getNewState(_extends({}, this.props, nextProps)));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          style = _props.style,
          isVisible = _props.isVisible,
          innerRef = _props.innerRef,
          className = _props.className;
      var _state = this.state,
          animation = _state.animation,
          delay = _state.delay,
          duration = _state.duration;


      var classes = (0, _classnames2.default)("animated", animation, className);

      var backwardStyle = isLteIE9 || !animation ? {
        opacity: isVisible ? 1 : 0,
        transition: "opacity " + delay + "ms"
      } : {};

      return _react2.default.createElement(
        "div",
        { className: classes,
          ref: innerRef,
          style: (0, _prefixer2.default)(_extends({
            animationDelay: delay + "ms",
            animationDuration: duration + "ms",
            pointerEvents: isVisible ? "all" : "none"
          }, style, backwardStyle)) },
        children
      );
    }
  }]);

  return Animated;
}(_react2.default.Component);

Animated.displayName = "Animated";

Animated.propTypes = {
  animateOnMount: _propTypes.bool,
  isVisible: _propTypes.bool,
  animationIn: _propTypes.string,
  animationOut: _propTypes.string,
  animationInDelay: _propTypes.number,
  animationOutDelay: _propTypes.number,
  animationInDuration: _propTypes.number,
  animationOutDuration: _propTypes.number,
  className: _propTypes.string,
  style: _propTypes.object,
  innerRef: _propTypes.func
};

Animated.defaultProps = {
  animateOnMount: true,
  isVisible: true,
  animationIn: "fadeIn",
  animationOut: "fadeOut",
  animationInDelay: 0,
  animationOutDelay: 0,
  animationInDuration: 1000,
  animationOutDuration: 1000,
  className: "",
  style: {}
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

/***/ 959:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

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

/***/ 973:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _prodInvariant = __webpack_require__(906),
    _assign = __webpack_require__(86);

var ReactNoopUpdateQueue = __webpack_require__(974);

var canDefineProperty = __webpack_require__(934);
var emptyObject = __webpack_require__(997);
var invariant = __webpack_require__(905);
var lowPriorityWarning = __webpack_require__(947);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ?  true ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (true) {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          lowPriorityWarning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent
};

/***/ }),

/***/ 974:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var warning = __webpack_require__(904);

function warnNoop(publicInstance, callerName) {
  if (true) {
    var constructor = publicInstance.constructor;
     true ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;

/***/ }),

/***/ 975:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),

/***/ 976:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),

/***/ 977:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(935);
var ReactComponentTreeHook = __webpack_require__(948);
var ReactElement = __webpack_require__(900);

var checkReactTypeSpec = __webpack_require__(1003);

var canDefineProperty = __webpack_require__(934);
var getIteratorFn = __webpack_require__(976);
var warning = __webpack_require__(904);
var lowPriorityWarning = __webpack_require__(947);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

   true ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
     true ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += ReactComponentTreeHook.getCurrentStackAddendum();

        var currentSource = props !== null && props !== undefined && props.__source !== undefined ? props.__source : null;
        ReactComponentTreeHook.pushNonStandardWarningStack(true, currentSource);
         true ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
        ReactComponentTreeHook.popNonStandardWarningStack();
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (true) {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            lowPriorityWarning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
};

module.exports = ReactElementValidator;

/***/ }),

/***/ 978:
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;


/***/ }),

/***/ 995:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(996);


/***/ }),

/***/ 996:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(86);

var ReactBaseClasses = __webpack_require__(973);
var ReactChildren = __webpack_require__(998);
var ReactDOMFactories = __webpack_require__(1002);
var ReactElement = __webpack_require__(900);
var ReactPropTypes = __webpack_require__(1006);
var ReactVersion = __webpack_require__(1008);

var createReactClass = __webpack_require__(1009);
var onlyChild = __webpack_require__(1010);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (true) {
  var lowPriorityWarning = __webpack_require__(947);
  var canDefineProperty = __webpack_require__(934);
  var ReactElementValidator = __webpack_require__(977);
  var didWarnPropTypesDeprecated = false;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;
var createMixin = function (mixin) {
  return mixin;
};

if (true) {
  var warnedForSpread = false;
  var warnedForCreateMixin = false;
  __spread = function () {
    lowPriorityWarning(warnedForSpread, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.');
    warnedForSpread = true;
    return _assign.apply(null, arguments);
  };

  createMixin = function (mixin) {
    lowPriorityWarning(warnedForCreateMixin, 'React.createMixin is deprecated and should not be used. ' + 'In React v16.0, it will be removed. ' + 'You can use this mixin directly instead. ' + 'See https://fb.me/createmixin-was-never-implemented for more info.');
    warnedForCreateMixin = true;
    return mixin;
  };
}

var React = {
  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: createReactClass,
  createFactory: createFactory,
  createMixin: createMixin,

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

if (true) {
  var warnedForCreateClass = false;
  if (canDefineProperty) {
    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        lowPriorityWarning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated,' + ' and will be removed in  React v16.0.' + ' Use the latest available v15.* prop-types package from npm instead.' + ' For info on usage, compatibility, migration and more, see ' + 'https://fb.me/prop-types-docs');
        didWarnPropTypesDeprecated = true;
        return ReactPropTypes;
      }
    });

    Object.defineProperty(React, 'createClass', {
      get: function () {
        lowPriorityWarning(warnedForCreateClass, 'Accessing createClass via the main React package is deprecated,' + ' and will be removed in React v16.0.' + " Use a plain JavaScript class instead. If you're not yet " + 'ready to migrate, create-react-class v15.* is available ' + 'on npm as a temporary, drop-in replacement. ' + 'For more info see https://fb.me/react-create-class');
        warnedForCreateClass = true;
        return createReactClass;
      }
    });
  }

  // React.DOM factories are deprecated. Wrap these methods so that
  // invocations of the React.DOM namespace and alert users to switch
  // to the `react-dom-factories` package.
  React.DOM = {};
  var warnedForFactories = false;
  Object.keys(ReactDOMFactories).forEach(function (factory) {
    React.DOM[factory] = function () {
      if (!warnedForFactories) {
        lowPriorityWarning(false, 'Accessing factories like React.DOM.%s has been deprecated ' + 'and will be removed in v16.0+. Use the ' + 'react-dom-factories package instead. ' + ' Version 1.0 provides a drop-in replacement.' + ' For more info, see https://fb.me/react-dom-factories', factory);
        warnedForFactories = true;
      }
      return ReactDOMFactories[factory].apply(ReactDOMFactories, arguments);
    };
  });
}

module.exports = React;

/***/ }),

/***/ 997:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (true) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),

/***/ 998:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var PooledClass = __webpack_require__(999);
var ReactElement = __webpack_require__(900);

var emptyFunction = __webpack_require__(959);
var traverseAllChildren = __webpack_require__(1000);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var _prodInvariant = __webpack_require__(906);

var invariant = __webpack_require__(905);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ?  true ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;

/***/ })

});