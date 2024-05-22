webpackJsonp([15,19],{

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

/***/ 1048:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.negate = negate;
exports.printIt = printIt;
exports.first = first;
exports.tail = tail;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var curry = exports.curry = function curry(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.length > args.length ? curry(fn.bind.apply(fn, [null].concat(args))) : fn.apply(undefined, args);
  };
};

var assoc = exports.assoc = curry(function (key, val, obj) {
  return _extends({}, obj, _defineProperty({}, key, val));
});

var assocPath = exports.assocPath = curry(function (keyPath, val, obj) {
  if (keyPath.length === 0) {
    return val;
  }

  if (keyPath.length === 1) {
    return assoc(keyPath[0], val, obj);
  } else {
    return _extends({}, obj, _defineProperty({}, keyPath[0], assocPath(keyPath.slice(1), val, obj[keyPath[0]])));
  }
});

// concatenate two arrays
// if set1 = [2, 4, 5] and set2 = [6, 0] then concat(set1, set2) = [2, 4, 5, 6, 0]
var concat = exports.concat = curry(function (set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx = 0;
  var result = [];

  while (idx < set1.length) {
    result[result.length] = set1[idx++];
  }
  idx = 0;
  while (idx < set2.length) {
    result[result.length] = set2[idx++];
  }

  return result;
});

/**
 * given an object and a property name, returns the value of that property in the object
 * super complicated :)
 * but get really useful as a curried function
 */
var prop = exports.prop = curry(function (prop, obj) {
  return obj[prop];
});

/**
 * given a property name and a value, check if the property in the object equals the given value
 * e.g. propEq('id', 1, {id: 1, name: 'mukesh'}) === true
 * e.g. propEq('id', 2, {id: 1, name: 'mukesh'}) === false
 */
var propEq = exports.propEq = curry(function (prop, val, obj) {
  return equals(val, obj[prop]);
});

/**
 * Tells whether the two objects have same value for a property
 * E.g. p1 = {fname: 'rustom', lname: 'yadav'}; p2 = { fname: 'kuldev', lname: 'yadav'}
 * then eqProps('lname', p1, p2) === true
 * but eqProps('fname', p1, p2) === false
 */
var eqProps = exports.eqProps = curry(function (prop, o1, o2) {
  return equals(o1[prop], o2[prop]);
});

/**
 * In a given list, update the value at a particular index
 * E.g. update(10, 2, [0,1,2,3,4]) === [0,1,10,3,4]
 */
var update = exports.update = curry(function (index, val, arr) {
  if (index >= 0 && index < arr.length) {
    return [].concat(_toConsumableArray(arr.slice(0, index)), [val], _toConsumableArray(arr.slice(index + 1)));
  } else {
    return arr;
  }
});

/**
 * find a value inside a list/array and replace with a given value
 */
var findAndUpdate = exports.findAndUpdate = curry(function (findFn, val, arr) {
  var index = arr.findIndex(findFn);
  if (index >= 0) {
    return update(index, val, arr);
  } else {
    return arr;
  }
});

// prepend an element to an array
// e.g. prepend(4, [0, 1]) = [4, 0, 1]
var prepend = exports.prepend = curry(function (el, arr) {
  return concat([el], arr);
});

// append an element to end of an array
// e.g. append(4, [0, 1]) = [0, 1, 4]
var append = exports.append = curry(function (el, arr) {
  return concat(arr, [el]);
});

var pipe = exports.pipe = function pipe() {
  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function () {
    return fns.reduce(function (acc, fn) {
      return [fn.apply(null, acc)];
    }, arguments)[0];
  };
};

function negate(fn, context) {
  return function () {
    return !fn.apply(context, arguments);
  };
}

var dedupe = exports.dedupe = curry(function (arr, fn) {
  return arr.filter(function (item, index, self) {
    return index === self.findIndex(fn.bind(null, item));
  });
});

var equals = exports.equals = curry(function (a, b) {
  return a === b;
});

var eqBy = exports.eqBy = curry(function (fn, a, b) {
  return equals(fn.call(null, a), fn.call(null, b));
});

var find = exports.find = curry(function (pred, arr) {
  return arr.find(pred);
});

function printIt(item) {
  console.log("to print", item);
  return item;
}

var without = exports.without = curry(function (discardArr, arr) {
  return arr.filter(function (item) {
    return !discardArr.some(equals(item));
  });
});

var startsWith = exports.startsWith = curry(function (prefix, str) {
  if (!str) {
    return false;
  } else {
    return str.indexOf(prefix) === 0;
  }
});

function first(list) {
  return list[0];
}

var head = exports.head = first;

function tail(list) {
  return list.slice(1);
}

var any = exports.any = curry(function (pred, list) {
  if (list && list.some && typeof list.some === "function") {
    return list.some(pred);
  } else {
    return list.reduce(function (acc, item) {
      return acc || pred(item);
    }, false);
  }
});

var findIndex = exports.findIndex = curry(function (finder, list) {
  if (!list) {
    return -1;
  }

  var itemIndex = -1;

  for (var i = 0; i < list.length; i++) {
    if (finder(list[i])) {
      itemIndex = i;
      break;
    }
  }

  return itemIndex;
});

var R = {
  any: any,
  curry: curry,
  assoc: assoc,
  assocPath: assocPath,
  append: append,
  prepend: prepend,
  concat: concat,
  pipe: pipe,
  negate: negate,
  dedupe: dedupe,
  equals: equals,
  eqBy: eqBy,
  prop: prop,
  propEq: propEq,
  eqProps: eqProps,
  find: find,
  without: without,
  update: update,
  printIt: printIt,
  first: first,
  head: head,
  tail: tail,
  startsWith: startsWith,
  findIndex: findIndex
};

exports.default = R;


/***/ }),

/***/ 1080:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var allCountries = [
  ["Afghanistan (‫افغانستان‬‎)", "af", "93", "+..-..-...-...."],
  ["Åland Islands", "ax", "358", ""],
  ["Albania (Shqipëri)", "al", "355", "+...(...)...-..."],
  ["Algeria (‫الجزائر‬‎)", "dz", "213", "+...-..-...-...."],
  ["American Samoa", "as", "1684", "+.(...)...-...."],
  ["Andorra", "ad", "376", "+...-...-..."],
  ["Angola", "ao", "244", "+...(...)...-..."],
  ["Anguilla", "ai", "1264", "+.(...)...-...."],
  ["Antarctica", "aq", "672", ""],
  ["Antigua and Barbuda", "ag", "1268", "+.(...)...-...."],
  ["Argentina", "ar", "54", "+..(...)...-...."],
  ["Armenia (Հայաստան)", "am", "374", "+...-..-...-..."],
  ["Aruba", "aw", "297", "+...-...-...."],
  ["Australia", "au", "61", "+.. ... ... ..."],
  ["Austria (Österreich)", "at", "43", "+..(...)...-...."],
  ["Azerbaijan (Azərbaycan)", "az", "994", "+...-..-...-..-.."],
  ["Bahamas", "bs", "1242", "+.(...)...-...."],
  ["Bahrain (‫البحرين‬‎)", "bh", "973", "+...-....-...."],
  ["Bangladesh (বাংলাদেশ)", "bd", "880", "+...-..-...-..."],
  ["Barbados", "bb", "1246", "+.(...)...-...."],
  ["Belarus (Беларусь)", "by", "375", "+...(..)...-..-.."],
  ["Belgium (België)", "be", "32", "+.. ... .. .. .."],
  ["Belize", "bz", "501", "+...-...-...."],
  ["Benin (Bénin)", "bj", "229", "+...-..-..-...."],
  ["Bermuda", "bm", "1441", "+.(...)...-...."],
  ["Bhutan (འབྲུག)", "bt", "975", "+...-.-...-..."],
  ["Bolivia", "bo", "591", "+...-.-...-...."],
  ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387", "+...-..-...."],
  ["Botswana", "bw", "267", "+...-..-...-..."],
  ["Bouvet Island", "bv", "47", ""],
  ["Brazil (Brasil)", "br", "55", "+..-..-....-...."],
  ["British Indian Ocean Territory", "io", "246", "+...-...-...."],
  ["British Virgin Islands", "vg", "1284", "+.(...)...-...."],
  ["Brunei", "bn", "673", "+...-...-...."],
  ["Bulgaria (България)", "bg", "359", "+...(...)...-..."],
  ["Burkina Faso", "bf", "226", "+...-..-..-...."],
  ["Burundi (Uburundi)", "bi", "257", "+...-..-..-...."],
  ["Cambodia (កម្ពុជា)", "kh", "855", "+...-..-...-..."],
  ["Cameroon (Cameroun)", "cm", "237", "+...-....-...."],
  [
    "Canada",
    "ca",
    "1",
    "+. (...) ...-....",
    1,
    [
      "204",
      "236",
      "249",
      "250",
      "289",
      "306",
      "343",
      "365",
      "387",
      "403",
      "416",
      "418",
      "431",
      "437",
      "438",
      "450",
      "506",
      "514",
      "519",
      "548",
      "579",
      "581",
      "587",
      "604",
      "613",
      "639",
      "647",
      "672",
      "705",
      "709",
      "742",
      "778",
      "780",
      "782",
      "807",
      "819",
      "825",
      "867",
      "873",
      "902",
      "905",
    ],
  ],
  ["Cape Verde (Kabu Verdi)", "cv", "238", "+...(...)..-.."],
  ["Caribbean Netherlands", "bq", "599", "+...-...-....", 1],
  ["Cayman Islands", "ky", "1345", "+.(...)...-...."],
  [
    "Central African Republic (République centrafricaine)",
    "cf",
    "236",
    "+...-..-..-....",
  ],
  ["Chad (Tchad)", "td", "235", "+...-..-..-..-.."],
  ["Chile", "cl", "56", "+..-.-....-...."],
  ["China (中国)", "cn", "86", "+.. ..-........"],
  ["Christmas Island", "cx", "61", ""],
  ["Cocos (Keeling) Islands", "cc", "61", ""],
  ["Colombia", "co", "57", "+..(...)...-...."],
  ["Comoros (‫جزر القمر‬‎)", "km", "269", "+...-..-....."],
  [
    "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
    "cd",
    "243",
    "+...(...)...-...",
  ],
  ["Congo (Republic) (Congo-Brazzaville)", "cg", "242", "+...-..-...-...."],
  ["Cook Islands", "ck", "682", "+...-..-..."],
  ["Costa Rica", "cr", "506", "+... ....-...."],
  ["Côte d’Ivoire", "ci", "225", "+...-..-...-..."],
  ["Croatia (Hrvatska)", "hr", "385", "+...-..-...-..."],
  ["Cuba", "cu", "53", "+..-.-...-...."],
  ["Curaçao", "cw", "599", "+...-...-....", 0],
  ["Cyprus (Κύπρος)", "cy", "357", "+...-..-...-..."],
  ["Czech Republic (Česká republika)", "cz", "420", "+...(...)...-..."],
  ["Denmark (Danmark)", "dk", "45", "+.. .. .. .. .."],
  ["Djibouti", "dj", "253", "+...-..-..-..-.."],
  ["Dominica", "dm", "1767", "+.(...)...-...."],
  [
    "Dominican Republic (República Dominicana)",
    "do",
    "1",
    "+.(...)...-....",
    2,
    ["809", "829", "849"],
  ],
  ["Ecuador", "ec", "593", "+...-.-...-...."],
  ["Egypt (‫مصر‬‎)", "eg", "20", "+..(...)...-...."],
  ["El Salvador", "sv", "503", "+... ....-...."],
  ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240", "+...-..-...-...."],
  ["Eritrea", "er", "291", "+...-.-...-..."],
  ["Estonia (Eesti)", "ee", "372", "+...-...-...."],
  ["Ethiopia", "et", "251", "+...-..-...-...."],
  ["Falkland Islands (Islas Malvinas)", "fk", "500", "+...-....."],
  ["Faroe Islands (Føroyar)", "fo", "298", "+...-...-..."],
  ["Fiji", "fj", "679", "+...-..-....."],
  ["Finland (Suomi)", "fi", "358", "+... .. .... ...."],
  ["France", "fr", "33", "+.. . .. .. .. .."],
  ["French Guiana (Guyane française)", "gf", "594", "+...-.....-...."],
  ["French Polynesia (Polynésie française)", "pf", "689", "+...-..-..-.."],
  ["French Southern and Antarctic Lands", "tf", "262", ""],
  ["Gabon", "ga", "241", "+...-.-..-..-.."],
  ["Gambia", "gm", "220", "+...(...)..-.."],
  ["Georgia (საქართველო)", "ge", "995", "+...(...)...-..."],
  ["Germany (Deutschland)", "de", "49", "+.. ... ......."],
  ["Ghana (Gaana)", "gh", "233", "+...(...)...-..."],
  ["Gibraltar", "gi", "350", "+...-...-....."],
  ["Greece (Ελλάδα)", "gr", "30", "+..(...)...-...."],
  ["Greenland (Kalaallit Nunaat)", "gl", "299", "+...-..-..-.."],
  ["Grenada", "gd", "1473", "+.(...)...-...."],
  ["Guadeloupe", "gp", "590", "", 0],
  ["Guam", "gu", "1671", "+.(...)...-...."],
  ["Guatemala", "gt", "502", "+... ....-...."],
  ["Guernsey", "gg", "44", ""],
  ["Guinea (Guinée)", "gn", "224", "+...-..-...-..."],
  ["Guinea-Bissau (Guiné Bissau)", "gw", "245", "+...-.-......"],
  ["Guyana", "gy", "592", "+...-...-...."],
  ["Haiti", "ht", "509", "+... ....-...."],
  ["Heard Island and McDonald Islands", "hm", "672", ""],
  ["Honduras", "hn", "504", "+...-....-...."],
  ["Hong Kong (香港)", "hk", "852", "+... .... ...."],
  ["Hungary (Magyarország)", "hu", "36", "+..(...)...-..."],
  ["Iceland (Ísland)", "is", "354", "+... ... ...."],
  ["India (भारत)", "in", "91", "+.. .....-....."],
  ["Indonesia", "id", "62", "+..-..-...-.."],
  ["Iran (‫ایران‬‎)", "ir", "98", "+..(...)...-...."],
  ["Iraq (‫العراق‬‎)", "iq", "964", "+...(...)...-...."],
  ["Ireland", "ie", "353", "+... .. ......."],
  ["Isle of Man", "im", "44", ""],
  ["Israel (‫ישראל‬‎)", "il", "972", "+...-.-...-...."],
  ["Italy (Italia)", "it", "39", "+.. ... ......", 0],
  ["Jamaica", "jm", "1876", "+.(...)...-...."],
  ["Japan (日本)", "jp", "81", "+.. ... .. ...."],
  ["Jersey", "je", "44", ""],
  ["Jordan (‫الأردن‬‎)", "jo", "962", "+...-.-....-...."],
  ["Kazakhstan (Казахстан)", "kz", "7", "+. ... ...-..-..", 1],
  ["Kenya", "ke", "254", "+...-...-......"],
  ["Kiribati", "ki", "686", "+...-..-..."],
  ["Kosovo", "xk", "383", ""],
  ["Kuwait (‫الكويت‬‎)", "kw", "965", "+...-....-...."],
  ["Kyrgyzstan (Кыргызстан)", "kg", "996", "+...(...)...-..."],
  ["Laos (ລາວ)", "la", "856", "+...-..-...-..."],
  ["Latvia (Latvija)", "lv", "371", "+...-..-...-..."],
  ["Lebanon (‫لبنان‬‎)", "lb", "961", "+...-.-...-..."],
  ["Lesotho", "ls", "266", "+...-.-...-...."],
  ["Liberia", "lr", "231", "+...-..-...-..."],
  ["Libya (‫ليبيا‬‎)", "ly", "218", "+...-..-...-..."],
  ["Liechtenstein", "li", "423", "+...(...)...-...."],
  ["Lithuania (Lietuva)", "lt", "370", "+...(...)..-..."],
  ["Luxembourg", "lu", "352", "+...(...)...-..."],
  ["Macau (澳門)", "mo", "853", "+...-....-...."],
  ["Macedonia (FYROM) (Македонија)", "mk", "389", "+...-..-...-..."],
  ["Madagascar (Madagasikara)", "mg", "261", "+...-..-..-....."],
  ["Malawi", "mw", "265", "+...-.-....-...."],
  ["Malaysia", "my", "60", "+.. ..-....-...."],
  ["Maldives", "mv", "960", "+...-...-...."],
  ["Mali", "ml", "223", "+...-..-..-...."],
  ["Malta", "mt", "356", "+...-....-...."],
  ["Marshall Islands", "mh", "692", "+...-...-...."],
  ["Martinique", "mq", "596", "+...(...)..-..-.."],
  ["Mauritania (‫موريتانيا‬‎)", "mr", "222", "+...-..-..-...."],
  ["Mauritius (Moris)", "mu", "230", "+...-...-...."],
  ["Mayotte", "yt", "262", ""],
  ["Mexico (México)", "mx", "52", "+..-..-..-...."],
  ["Micronesia", "fm", "691", "+...-...-...."],
  ["Moldova (Republica Moldova)", "md", "373", "+...-....-...."],
  ["Monaco", "mc", "377", "+...-..-...-..."],
  ["Mongolia (Монгол)", "mn", "976", "+...-..-..-...."],
  ["Montenegro (Crna Gora)", "me", "382", "+...-..-...-..."],
  ["Montserrat", "ms", "1664", "+.(...)...-...."],
  ["Morocco (‫المغرب‬‎)", "ma", "212", "+...-..-....-..."],
  ["Mozambique (Moçambique)", "mz", "258", "+...-..-...-..."],
  ["Myanmar (Burma) (မြန်မာ)", "mm", "95", "+..-...-..."],
  ["Namibia (Namibië)", "na", "264", "+...-..-...-...."],
  ["Nauru", "nr", "674", "+...-...-...."],
  ["Nepal (नेपाल)", "np", "977", "+...-..-...-..."],
  ["Netherlands (Nederland)", "nl", "31", "+.. .. ........"],
  ["New Caledonia (Nouvelle-Calédonie)", "nc", "687", "+...-..-...."],
  ["New Zealand", "nz", "64", "+.. ...-...-...."],
  ["Nicaragua", "ni", "505", "+...-....-...."],
  ["Niger (Nijar)", "ne", "227", "+...-..-..-...."],
  ["Nigeria", "ng", "234", "+...-..-...-.."],
  ["Niue", "nu", "683", "+...-...."],
  ["Norfolk Island", "nf", "672", "+...-...-..."],
  ["North Korea (조선 민주주의 인민 공화국)", "kp", "850", "+...-...-..."],
  ["Northern Mariana Islands", "mp", "1670", "+.(...)...-...."],
  ["Norway (Norge)", "no", "47", "+.. ... .. ..."],
  ["Oman (‫عُمان‬‎)", "om", "968", "+...-..-...-..."],
  ["Pakistan (‫پاکستان‬‎)", "pk", "92", "+.. ...-......."],
  ["Palau", "pw", "680", "+...-...-...."],
  ["Palestine (‫فلسطين‬‎)", "ps", "970", "+...-..-...-...."],
  ["Panama (Panamá)", "pa", "507", "+...-...-...."],
  ["Papua New Guinea", "pg", "675", "+...(...)..-..."],
  ["Paraguay", "py", "595", "+...(...)...-..."],
  ["Peru (Perú)", "pe", "51", "+..(...)...-..."],
  ["Philippines", "ph", "63", "+.. ... ...."],
  ["Pitcairn Islands", "pn", "64", ""],
  ["Poland (Polska)", "pl", "48", "+.. ...-...-..."],
  ["Portugal", "pt", "351", "+...-..-...-...."],
  ["Puerto Rico", "pr", "1", "+. (...) ...-....", 3, ["787", "939"]],
  ["Qatar (‫قطر‬‎)", "qa", "974", "+...-....-...."],
  ["Réunion (La Réunion)", "re", "262", "+...-.....-...."],
  ["Romania (România)", "ro", "40", "+..-..-...-...."],
  ["Russia (Россия)", "ru", "7", "+. ... ...-..-..", 0],
  ["Rwanda", "rw", "250", "+...(...)...-..."],
  ["Saint Barthélemy (Saint-Barthélemy)", "bl", "590", "", 1],
  ["Saint Helena", "sh", "290"],
  ["Saint Kitts and Nevis", "kn", "1869", "+.(...)...-...."],
  ["Saint Lucia", "lc", "1758", "+.(...)...-...."],
  ["Saint Martin (Saint-Martin (partie française))", "mf", "590", "", 2],
  ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
  ["Saint Vincent and the Grenadines", "vc", "1784", "+.(...)...-...."],
  ["Samoa", "ws", "685", "+...-..-...."],
  ["San Marino", "sm", "378", "+...-....-......"],
  ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239", "+...-..-....."],
  [
    "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
    "sa",
    "966",
    "+...-.-...-....",
  ],
  ["Senegal (Sénégal)", "sn", "221", "+...-..-...-...."],
  ["Serbia (Србија)", "rs", "381", "+...-..-...-...."],
  ["Seychelles", "sc", "248", "+...-.-...-..."],
  ["Sierra Leone", "sl", "232", "+...-..-......"],
  ["Singapore", "sg", "65", "+.. ....-...."],
  ["Sint Maarten", "sx", "1721", "+.(...)...-...."],
  ["Slovakia (Slovensko)", "sk", "421", "+...(...)...-..."],
  ["Slovenia (Slovenija)", "si", "386", "+...-..-...-..."],
  ["Solomon Islands", "sb", "677", "+...-....."],
  ["Somalia (Soomaaliya)", "so", "252", "+...-.-...-..."],
  ["South Africa", "za", "27", "+..-..-...-...."],
  ["South Georgia and the South Sandwich Islands", "gs", "500", ""],
  ["South Korea (대한민국)", "kr", "82", "+..-..-...-...."],
  ["South Sudan (‫جنوب السودان‬‎)", "ss", "211", "+...-..-...-...."],
  ["Spain (España)", "es", "34", "+.. ... ... ..."],
  ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94", "+..-..-...-...."],
  ["Sudan (‫السودان‬‎)", "sd", "249", "+...-..-...-...."],
  ["Suriname", "sr", "597", "+...-...-..."],
  ["Svalbard and Jan Mayen", "sj", "47", ""],
  ["Swaziland", "sz", "268", "+...-..-..-...."],
  ["Sweden (Sverige)", "se", "46", "+.. .. ... .. .."],
  ["Switzerland (Schweiz)", "ch", "41", "+.. .. ... .. .."],
  ["Syria (‫سوريا‬‎)", "sy", "963", "+...-..-....-..."],
  ["Taiwan (台灣)", "tw", "886", "+...-....-...."],
  ["Tajikistan", "tj", "992", "+...-..-...-...."],
  ["Tanzania", "tz", "255", "+...-..-...-...."],
  ["Thailand (ไทย)", "th", "66", "+..-..-...-..."],
  ["Timor-Leste", "tl", "670", "+...-...-...."],
  ["Togo", "tg", "228", "+...-..-...-..."],
  ["Tokelau", "tk", "690", "+...-...."],
  ["Tonga", "to", "676", "+...-....."],
  ["Trinidad and Tobago", "tt", "1868", "+.(...)...-...."],
  ["Tunisia (‫تونس‬‎)", "tn", "216", "+...-..-...-..."],
  ["Turkey (Türkiye)", "tr", "90", "+.. ... ... .. .."],
  ["Turkmenistan", "tm", "993", "+...-.-...-...."],
  ["Turks and Caicos Islands", "tc", "1649", "+.(...)...-...."],
  ["Tuvalu", "tv", "688", "+...-....."],
  ["U.S. Virgin Islands", "vi", "1340", "+.(...)...-...."],
  ["Uganda", "ug", "256", "+...(...)...-..."],
  ["Ukraine (Україна)", "ua", "380", "+...(..)...-..-.."],
  [
    "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
    "ae",
    "971",
    "+...-.-...-....",
  ],
  ["United Kingdom", "gb", "44", "+.. .... ......"],
  ["United States", "us", "1", "+. (...) ...-....", 0],
  ["United States Minor Outlying Islands", "um", "1", "", 2],
  ["Uruguay", "uy", "598", "+...-.-...-..-.."],
  ["Uzbekistan (Oʻzbekiston)", "uz", "998", "+...-..-...-...."],
  ["Vanuatu", "vu", "678", "+...-....."],
  ["Vatican City (Città del Vaticano)", "va", "39", "+.. .. .... ....", 1],
  ["Venezuela", "ve", "58", "+..(...)...-...."],
  ["Vietnam (Việt Nam)", "vn", "84", "+..-..-....-..."],
  ["Wallis and Futuna", "wf", "681", "+...-..-...."],
  ["Western Sahara", "eh", "212", "+...-..-...."],
  ["Yemen (‫اليمن‬‎)", "ye", "967", "+...-.-...-..."],
  ["Zambia", "zm", "260", "+...-..-...-...."],
  ["Zimbabwe", "zw", "263", "+...-.-......"],
];

// we will build this in the loop below
var allCountryCodes = {};
var iso2Lookup = {};
var addCountryCode = function (iso2, dialCode, priority) {
  if (!(dialCode in allCountryCodes)) {
    allCountryCodes[dialCode] = [];
  }
  var index = priority || 0;
  allCountryCodes[dialCode][index] = iso2;
};

for (var i = 0; i < allCountries.length; i++) {
  // countries
  var c = allCountries[i];
  allCountries[i] = {
    name: c[0],
    iso2: c[1],
    dialCode: c[2],
    priority: c[4] || 0,
  };

  // format
  if (c[3]) {
    allCountries[i].format = c[3];
  }

  // area codes
  if (c[5]) {
    allCountries[i].hasAreaCodes = true;
    for (var j = 0; j < c[5].length; j++) {
      // full dial code is country code + dial code
      var dialCode = c[2] + c[5][j];
      addCountryCode(c[1], dialCode);
    }
  }
  iso2Lookup[allCountries[i].iso2] = i;

  // dial codes
  addCountryCode(c[1], c[2], c[4]);
}

module.exports = {
  allCountries: allCountries,
  iso2Lookup: iso2Lookup,
  allCountryCodes: allCountryCodes,
};


/***/ }),

/***/ 1160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hoistNonReactStatic = __webpack_require__(1161);
var React = __webpack_require__(16);
var ReactDOM = __webpack_require__(322);

module.exports = function enhanceWithClickOutside(WrappedComponent) {
  var componentName = WrappedComponent.displayName || WrappedComponent.name;

  var EnhancedComponent = function (_React$Component) {
    _inherits(EnhancedComponent, _React$Component);

    function EnhancedComponent(props) {
      _classCallCheck(this, EnhancedComponent);

      var _this = _possibleConstructorReturn(this, (EnhancedComponent.__proto__ || Object.getPrototypeOf(EnhancedComponent)).call(this, props));

      _this.handleClickOutside = _this.handleClickOutside.bind(_this);
      return _this;
    }

    _createClass(EnhancedComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
      }
    }, {
      key: 'handleClickOutside',
      value: function handleClickOutside(e) {
        var domNode = this.__domNode;
        if ((!domNode || !domNode.contains(e.target)) && this.__wrappedInstance && typeof this.__wrappedInstance.handleClickOutside === 'function') {
          this.__wrappedInstance.handleClickOutside(e);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            wrappedRef = _props.wrappedRef,
            rest = _objectWithoutProperties(_props, ['wrappedRef']);

        return React.createElement(WrappedComponent, _extends({}, rest, {
          ref: function ref(c) {
            _this2.__wrappedInstance = c;
            _this2.__domNode = ReactDOM.findDOMNode(c);
            wrappedRef && wrappedRef(c);
          }
        }));
      }
    }]);

    return EnhancedComponent;
  }(React.Component);

  EnhancedComponent.displayName = 'clickOutside(' + componentName + ')';

  return hoistNonReactStatic(EnhancedComponent, WrappedComponent);
};

/***/ }),

/***/ 1161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ 1230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1231);

var ReactTelephoneInput = __webpack_require__(1233);

module.exports = ReactTelephoneInput;

/***/ }),

/***/ 1231:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1232);
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
		module.hot.accept("!!../../css-loader/index.js!./default.css", function() {
			var newContent = require("!!../../css-loader/index.js!./default.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1232:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(767)(false);
// imports


// module
exports.push([module.i, ".react-tel-input {\n  position: relative;\n  width: 200px;\n}\n.react-tel-input .ad {\n  background-position: -16px 0;\n}\n.react-tel-input .ae {\n  background-position: -32px 0;\n}\n.react-tel-input .af {\n  background-position: -48px 0;\n}\n.react-tel-input .ag {\n  background-position: -64px 0;\n}\n.react-tel-input .ai {\n  background-position: -80px 0;\n}\n.react-tel-input .al {\n  background-position: -96px 0;\n}\n.react-tel-input .am {\n  background-position: -112px 0;\n}\n.react-tel-input .ao {\n  background-position: -128px 0;\n}\n.react-tel-input .ar {\n  background-position: -144px 0;\n}\n.react-tel-input .as {\n  background-position: -160px 0;\n}\n.react-tel-input .at {\n  background-position: -176px 0;\n}\n.react-tel-input .au {\n  background-position: -192px 0;\n}\n.react-tel-input .aw {\n  background-position: -208px 0;\n}\n.react-tel-input .az {\n  background-position: -224px 0;\n}\n.react-tel-input .ba {\n  background-position: -240px 0;\n}\n.react-tel-input .bb {\n  background-position: 0 -11px;\n}\n.react-tel-input .bd {\n  background-position: -16px -11px;\n}\n.react-tel-input .be {\n  background-position: -32px -11px;\n}\n.react-tel-input .bf {\n  background-position: -48px -11px;\n}\n.react-tel-input .bg {\n  background-position: -64px -11px;\n}\n.react-tel-input .bh {\n  background-position: -80px -11px;\n}\n.react-tel-input .bi {\n  background-position: -96px -11px;\n}\n.react-tel-input .bj {\n  background-position: -112px -11px;\n}\n.react-tel-input .bm {\n  background-position: -128px -11px;\n}\n.react-tel-input .bn {\n  background-position: -144px -11px;\n}\n.react-tel-input .bo {\n  background-position: -160px -11px;\n}\n.react-tel-input .br {\n  background-position: -176px -11px;\n}\n.react-tel-input .bs {\n  background-position: -192px -11px;\n}\n.react-tel-input .bt {\n  background-position: -208px -11px;\n}\n.react-tel-input .bw {\n  background-position: -224px -11px;\n}\n.react-tel-input .by {\n  background-position: -240px -11px;\n}\n.react-tel-input .bz {\n  background-position: 0 -22px;\n}\n.react-tel-input .ca {\n  background-position: -16px -22px;\n}\n.react-tel-input .cd {\n  background-position: -32px -22px;\n}\n.react-tel-input .cf {\n  background-position: -48px -22px;\n}\n.react-tel-input .cg {\n  background-position: -64px -22px;\n}\n.react-tel-input .ch {\n  background-position: -80px -22px;\n}\n.react-tel-input .ci {\n  background-position: -96px -22px;\n}\n.react-tel-input .ck {\n  background-position: -112px -22px;\n}\n.react-tel-input .cl {\n  background-position: -128px -22px;\n}\n.react-tel-input .cm {\n  background-position: -144px -22px;\n}\n.react-tel-input .cn {\n  background-position: -160px -22px;\n}\n.react-tel-input .co {\n  background-position: -176px -22px;\n}\n.react-tel-input .cr {\n  background-position: -192px -22px;\n}\n.react-tel-input .cu {\n  background-position: -208px -22px;\n}\n.react-tel-input .cv {\n  background-position: -224px -22px;\n}\n.react-tel-input .cw {\n  background-position: -240px -22px;\n}\n.react-tel-input .cy {\n  background-position: 0 -33px;\n}\n.react-tel-input .cz {\n  background-position: -16px -33px;\n}\n.react-tel-input .de {\n  background-position: -32px -33px;\n}\n.react-tel-input .dj {\n  background-position: -48px -33px;\n}\n.react-tel-input .dk {\n  background-position: -64px -33px;\n}\n.react-tel-input .dm {\n  background-position: -80px -33px;\n}\n.react-tel-input .do {\n  background-position: -96px -33px;\n}\n.react-tel-input .dz {\n  background-position: -112px -33px;\n}\n.react-tel-input .ec {\n  background-position: -128px -33px;\n}\n.react-tel-input .ee {\n  background-position: -144px -33px;\n}\n.react-tel-input .eg {\n  background-position: -160px -33px;\n}\n.react-tel-input .er {\n  background-position: -176px -33px;\n}\n.react-tel-input .es {\n  background-position: -192px -33px;\n}\n.react-tel-input .et {\n  background-position: -208px -33px;\n}\n.react-tel-input .fi {\n  background-position: -224px -33px;\n}\n.react-tel-input .fj {\n  background-position: -240px -33px;\n}\n.react-tel-input .fk {\n  background-position: 0 -44px;\n}\n.react-tel-input .fm {\n  background-position: -16px -44px;\n}\n.react-tel-input .fo {\n  background-position: -32px -44px;\n}\n.react-tel-input .fr,\n.react-tel-input .bl,\n.react-tel-input .mf {\n  background-position: -48px -44px;\n}\n.react-tel-input .ga {\n  background-position: -64px -44px;\n}\n.react-tel-input .gb {\n  background-position: -80px -44px;\n}\n.react-tel-input .gd {\n  background-position: -96px -44px;\n}\n.react-tel-input .ge {\n  background-position: -112px -44px;\n}\n.react-tel-input .gf {\n  background-position: -128px -44px;\n}\n.react-tel-input .gh {\n  background-position: -144px -44px;\n}\n.react-tel-input .gi {\n  background-position: -160px -44px;\n}\n.react-tel-input .gl {\n  background-position: -176px -44px;\n}\n.react-tel-input .gm {\n  background-position: -192px -44px;\n}\n.react-tel-input .gn {\n  background-position: -208px -44px;\n}\n.react-tel-input .gp {\n  background-position: -224px -44px;\n}\n.react-tel-input .gq {\n  background-position: -240px -44px;\n}\n.react-tel-input .gr {\n  background-position: 0 -55px;\n}\n.react-tel-input .gt {\n  background-position: -16px -55px;\n}\n.react-tel-input .gu {\n  background-position: -32px -55px;\n}\n.react-tel-input .gw {\n  background-position: -48px -55px;\n}\n.react-tel-input .gy {\n  background-position: -64px -55px;\n}\n.react-tel-input .hk {\n  background-position: -80px -55px;\n}\n.react-tel-input .hn {\n  background-position: -96px -55px;\n}\n.react-tel-input .hr {\n  background-position: -112px -55px;\n}\n.react-tel-input .ht {\n  background-position: -128px -55px;\n}\n.react-tel-input .hu {\n  background-position: -144px -55px;\n}\n.react-tel-input .id {\n  background-position: -160px -55px;\n}\n.react-tel-input .ie {\n  background-position: -176px -55px;\n}\n.react-tel-input .il {\n  background-position: -192px -55px;\n}\n.react-tel-input .in {\n  background-position: -208px -55px;\n}\n.react-tel-input .io {\n  background-position: -224px -55px;\n}\n.react-tel-input .iq {\n  background-position: -240px -55px;\n}\n.react-tel-input .ir {\n  background-position: 0 -66px;\n}\n.react-tel-input .is {\n  background-position: -16px -66px;\n}\n.react-tel-input .it {\n  background-position: -32px -66px;\n}\n.react-tel-input .jm {\n  background-position: -48px -66px;\n}\n.react-tel-input .jo {\n  background-position: -64px -66px;\n}\n.react-tel-input .jp {\n  background-position: -80px -66px;\n}\n.react-tel-input .ke {\n  background-position: -96px -66px;\n}\n.react-tel-input .kg {\n  background-position: -112px -66px;\n}\n.react-tel-input .kh {\n  background-position: -128px -66px;\n}\n.react-tel-input .ki {\n  background-position: -144px -66px;\n}\n.react-tel-input .km {\n  background-position: -160px -66px;\n}\n.react-tel-input .kn {\n  background-position: -176px -66px;\n}\n.react-tel-input .kp {\n  background-position: -192px -66px;\n}\n.react-tel-input .kr {\n  background-position: -208px -66px;\n}\n.react-tel-input .kw {\n  background-position: -224px -66px;\n}\n.react-tel-input .ky {\n  background-position: -240px -66px;\n}\n.react-tel-input .kz {\n  background-position: 0 -77px;\n}\n.react-tel-input .la {\n  background-position: -16px -77px;\n}\n.react-tel-input .lb {\n  background-position: -32px -77px;\n}\n.react-tel-input .lc {\n  background-position: -48px -77px;\n}\n.react-tel-input .li {\n  background-position: -64px -77px;\n}\n.react-tel-input .lk {\n  background-position: -80px -77px;\n}\n.react-tel-input .lr {\n  background-position: -96px -77px;\n}\n.react-tel-input .ls {\n  background-position: -112px -77px;\n}\n.react-tel-input .lt {\n  background-position: -128px -77px;\n}\n.react-tel-input .lu {\n  background-position: -144px -77px;\n}\n.react-tel-input .lv {\n  background-position: -160px -77px;\n}\n.react-tel-input .ly {\n  background-position: -176px -77px;\n}\n.react-tel-input .ma {\n  background-position: -192px -77px;\n}\n.react-tel-input .mc {\n  background-position: -208px -77px;\n}\n.react-tel-input .md {\n  background-position: -224px -77px;\n}\n.react-tel-input .me {\n  background-position: -112px -154px;\n  height: 12px;\n}\n.react-tel-input .mg {\n  background-position: 0 -88px;\n}\n.react-tel-input .mh {\n  background-position: -16px -88px;\n}\n.react-tel-input .mk {\n  background-position: -32px -88px;\n}\n.react-tel-input .ml {\n  background-position: -48px -88px;\n}\n.react-tel-input .mm {\n  background-position: -64px -88px;\n}\n.react-tel-input .mn {\n  background-position: -80px -88px;\n}\n.react-tel-input .mo {\n  background-position: -96px -88px;\n}\n.react-tel-input .mp {\n  background-position: -112px -88px;\n}\n.react-tel-input .mq {\n  background-position: -128px -88px;\n}\n.react-tel-input .mr {\n  background-position: -144px -88px;\n}\n.react-tel-input .ms {\n  background-position: -160px -88px;\n}\n.react-tel-input .mt {\n  background-position: -176px -88px;\n}\n.react-tel-input .mu {\n  background-position: -192px -88px;\n}\n.react-tel-input .mv {\n  background-position: -208px -88px;\n}\n.react-tel-input .mw {\n  background-position: -224px -88px;\n}\n.react-tel-input .mx {\n  background-position: -240px -88px;\n}\n.react-tel-input .my {\n  background-position: 0 -99px;\n}\n.react-tel-input .mz {\n  background-position: -16px -99px;\n}\n.react-tel-input .na {\n  background-position: -32px -99px;\n}\n.react-tel-input .nc {\n  background-position: -48px -99px;\n}\n.react-tel-input .ne {\n  background-position: -64px -99px;\n}\n.react-tel-input .nf {\n  background-position: -80px -99px;\n}\n.react-tel-input .ng {\n  background-position: -96px -99px;\n}\n.react-tel-input .ni {\n  background-position: -112px -99px;\n}\n.react-tel-input .nl,\n.react-tel-input .bq {\n  background-position: -128px -99px;\n}\n.react-tel-input .no {\n  background-position: -144px -99px;\n}\n.react-tel-input .np {\n  background-position: -160px -99px;\n}\n.react-tel-input .nr {\n  background-position: -176px -99px;\n}\n.react-tel-input .nu {\n  background-position: -192px -99px;\n}\n.react-tel-input .nz {\n  background-position: -208px -99px;\n}\n.react-tel-input .om {\n  background-position: -224px -99px;\n}\n.react-tel-input .pa {\n  background-position: -240px -99px;\n}\n.react-tel-input .pe {\n  background-position: 0 -110px;\n}\n.react-tel-input .pf {\n  background-position: -16px -110px;\n}\n.react-tel-input .pg {\n  background-position: -32px -110px;\n}\n.react-tel-input .ph {\n  background-position: -48px -110px;\n}\n.react-tel-input .pk {\n  background-position: -64px -110px;\n}\n.react-tel-input .pl {\n  background-position: -80px -110px;\n}\n.react-tel-input .pm {\n  background-position: -96px -110px;\n}\n.react-tel-input .pr {\n  background-position: -112px -110px;\n}\n.react-tel-input .ps {\n  background-position: -128px -110px;\n}\n.react-tel-input .pt {\n  background-position: -144px -110px;\n}\n.react-tel-input .pw {\n  background-position: -160px -110px;\n}\n.react-tel-input .py {\n  background-position: -176px -110px;\n}\n.react-tel-input .qa {\n  background-position: -192px -110px;\n}\n.react-tel-input .re {\n  background-position: -208px -110px;\n}\n.react-tel-input .ro {\n  background-position: -224px -110px;\n}\n.react-tel-input .rs {\n  background-position: -240px -110px;\n}\n.react-tel-input .ru {\n  background-position: 0 -121px;\n}\n.react-tel-input .rw {\n  background-position: -16px -121px;\n}\n.react-tel-input .sa {\n  background-position: -32px -121px;\n}\n.react-tel-input .sb {\n  background-position: -48px -121px;\n}\n.react-tel-input .sc {\n  background-position: -64px -121px;\n}\n.react-tel-input .sd {\n  background-position: -80px -121px;\n}\n.react-tel-input .se {\n  background-position: -96px -121px;\n}\n.react-tel-input .sg {\n  background-position: -112px -121px;\n}\n.react-tel-input .sh {\n  background-position: -128px -121px;\n}\n.react-tel-input .si {\n  background-position: -144px -121px;\n}\n.react-tel-input .sk {\n  background-position: -160px -121px;\n}\n.react-tel-input .sl {\n  background-position: -176px -121px;\n}\n.react-tel-input .sm {\n  background-position: -192px -121px;\n}\n.react-tel-input .sn {\n  background-position: -208px -121px;\n}\n.react-tel-input .so {\n  background-position: -224px -121px;\n}\n.react-tel-input .sr {\n  background-position: -240px -121px;\n}\n.react-tel-input .ss {\n  background-position: 0 -132px;\n}\n.react-tel-input .st {\n  background-position: -16px -132px;\n}\n.react-tel-input .sv {\n  background-position: -32px -132px;\n}\n.react-tel-input .sx {\n  background-position: -48px -132px;\n}\n.react-tel-input .sy {\n  background-position: -64px -132px;\n}\n.react-tel-input .sz {\n  background-position: -80px -132px;\n}\n.react-tel-input .tc {\n  background-position: -96px -132px;\n}\n.react-tel-input .td {\n  background-position: -112px -132px;\n}\n.react-tel-input .tg {\n  background-position: -128px -132px;\n}\n.react-tel-input .th {\n  background-position: -144px -132px;\n}\n.react-tel-input .tj {\n  background-position: -160px -132px;\n}\n.react-tel-input .tk {\n  background-position: -176px -132px;\n}\n.react-tel-input .tl {\n  background-position: -192px -132px;\n}\n.react-tel-input .tm {\n  background-position: -208px -132px;\n}\n.react-tel-input .tn {\n  background-position: -224px -132px;\n}\n.react-tel-input .to {\n  background-position: -240px -132px;\n}\n.react-tel-input .tr {\n  background-position: 0 -143px;\n}\n.react-tel-input .tt {\n  background-position: -16px -143px;\n}\n.react-tel-input .tv {\n  background-position: -32px -143px;\n}\n.react-tel-input .tw {\n  background-position: -48px -143px;\n}\n.react-tel-input .tz {\n  background-position: -64px -143px;\n}\n.react-tel-input .ua {\n  background-position: -80px -143px;\n}\n.react-tel-input .ug {\n  background-position: -96px -143px;\n}\n.react-tel-input .us {\n  background-position: -112px -143px;\n}\n.react-tel-input .uy {\n  background-position: -128px -143px;\n}\n.react-tel-input .uz {\n  background-position: -144px -143px;\n}\n.react-tel-input .va {\n  background-position: -160px -143px;\n}\n.react-tel-input .vc {\n  background-position: -176px -143px;\n}\n.react-tel-input .ve {\n  background-position: -192px -143px;\n}\n.react-tel-input .vg {\n  background-position: -208px -143px;\n}\n.react-tel-input .vi {\n  background-position: -224px -143px;\n}\n.react-tel-input .vn {\n  background-position: -240px -143px;\n}\n.react-tel-input .vu {\n  background-position: 0 -154px;\n}\n.react-tel-input .wf {\n  background-position: -16px -154px;\n}\n.react-tel-input .ws {\n  background-position: -32px -154px;\n}\n.react-tel-input .ye {\n  background-position: -48px -154px;\n}\n.react-tel-input .za {\n  background-position: -64px -154px;\n}\n.react-tel-input .zm {\n  background-position: -80px -154px;\n}\n.react-tel-input .zw {\n  background-position: -96px -154px;\n}\n.react-tel-input * {\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n}\n.react-tel-input .hide {\n  display: none;\n}\n.react-tel-input .v-hide {\n  visibility: hidden;\n}\n.react-tel-input input[type='text'],\n.react-tel-input input[type='tel'] {\n  position: relative;\n  z-index: 0;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  padding-left: 44px;\n  margin-left: 0;\n  background: #ffffff;\n  border: 1px solid #cacaca;\n  border-radius: 3px;\n  box-shadow: 0 1px 2px #e3e3e3 inset;\n  line-height: 25px;\n  height: 28px;\n  width: 100%;\n}\n.react-tel-input input[type='text']:focus,\n.react-tel-input input[type='tel']:focus {\n  border-color: #42bdff;\n  border-left-color: #cacaca;\n}\n.react-tel-input input[type='text'].invalid-number,\n.react-tel-input input[type='tel'].invalid-number {\n  border: 1px solid #d79f9f;\n  background-color: #faf0f0;\n  border-left-color: #cacaca;\n}\n.react-tel-input input[type='text'].invalid-number:focus,\n.react-tel-input input[type='tel'].invalid-number:focus {\n  border: 1px solid #d79f9f;\n  border-left-color: #cacaca;\n  background-color: #faf0f0;\n}\n.react-tel-input .flag-dropdown {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  padding: 0;\n  background-color: #eaeaea;\n  border: 1px solid #cacaca;\n  border-radius: 3px 0 0 3px;\n}\n\n.react-tel-input .flag-dropdown {\n  outline: 0px solid transparent;\n}\n\n.react-tel-input .flag-dropdown.open-dropdown {\n  background: #fff;\n  border-bottom: 0;\n  border-radius: 3px 0 0 0;\n}\n.react-tel-input .flag-dropdown.open-dropdown .selected-flag {\n  background: #fff;\n  border-radius: 3px 0 0 0;\n}\n.react-tel-input .flag-dropdown:hover {\n  cursor: pointer;\n}\n.react-tel-input .flag-dropdown:hover .selected-flag {\n  background-color: #fff;\n}\n.react-tel-input input[disabled] + .flag-dropdown:hover {\n  cursor: default;\n}\n.react-tel-input input[disabled] + .flag-dropdown:hover .selected-flag {\n  background-color: transparent;\n}\n.react-tel-input .selected-flag {\n  z-index: 13;\n  position: relative;\n  width: 38px;\n  height: 26px;\n  padding: 0 0 0 8px;\n  border-radius: 3px 0 0 3px;\n}\n.react-tel-input .selected-flag .flag {\n  position: absolute;\n  top: 50%;\n  margin-top: -5px;\n  width: 16px;\n  height: 11px;\n}\n.react-tel-input .selected-flag .arrow {\n  position: relative;\n  top: 50%;\n  margin-top: -2px;\n  left: 20px;\n  width: 0;\n  height: 0;\n  border-left: 3px solid transparent;\n  border-right: 3px solid transparent;\n  border-top: 4px solid #555;\n}\n.react-tel-input .selected-flag .arrow.up {\n  border-top: none;\n  border-bottom: 4px solid #555;\n}\n.react-tel-input .country-list {\n  list-style: none;\n  position: absolute;\n  z-index: 20;\n  padding: 0;\n  margin: -1px 0 0 -1px;\n  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);\n  background-color: white;\n  border: 1px solid #ccc;\n  width: 400px;\n  /* max-height: 200px; */\n  overflow-y: scroll;\n  border-radius: 0 0 3px 3px;\n  top: 26px;\n}\n.react-tel-input .country-list .flag {\n  display: inline-block;\n  margin-right: 6px;\n  margin-top: 2px;\n  width: 16px;\n  height: 11px;\n}\n.react-tel-input .country-list .divider {\n  padding-bottom: 5px;\n  margin-bottom: 5px;\n  border-bottom: 1px solid #ccc;\n}\n.react-tel-input .country-list .country {\n  padding: 5px 10px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.react-tel-input .country-list .country .dial-code {\n  color: #999;\n}\n.react-tel-input .country-list .country:hover {\n  background-color: #e8f7fe;\n}\n.react-tel-input .country-list .country.highlight {\n  background-color: #c7e2f1;\n}\n.react-tel-input .country-list .country-name {\n  margin-right: 6px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports["default"] = exports.ReactTelephoneInput = void 0;

var _cramda = _interopRequireDefault(__webpack_require__(1048));

var _reactTinyVirtualList = _interopRequireDefault(__webpack_require__(1234));

var _debounce = _interopRequireDefault(__webpack_require__(1235));

var _lodash = _interopRequireDefault(__webpack_require__(1236));

var _react = _interopRequireWildcard(__webpack_require__(16));

var _propTypes = _interopRequireDefault(__webpack_require__(28));

var _classnames = _interopRequireDefault(__webpack_require__(869));

var _reactClickOutside = _interopRequireDefault(__webpack_require__(1160));

var _countryTelephoneData = _interopRequireDefault(__webpack_require__(1080));

var _format_number = _interopRequireDefault(__webpack_require__(1237));

var _replace_country_code = _interopRequireDefault(__webpack_require__(1238));

var _number_validator = _interopRequireDefault(__webpack_require__(1239));

var _guessSelectedCountry = _interopRequireDefault(__webpack_require__(1240));

var _jsxFileName = "/Users/mukesh/Documents/projects/react-telephone-input/src/ReactTelephoneInput.js";

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var find = _cramda["default"].find,
    propEq = _cramda["default"].propEq,
    equals = _cramda["default"].equals,
    findIndex = _cramda["default"].findIndex,
    startsWith = _cramda["default"].startsWith;
var allCountries = _countryTelephoneData["default"].allCountries,
    iso2Lookup = _countryTelephoneData["default"].iso2Lookup;
var isModernBrowser = true;

if (typeof document !== 'undefined') {
  isModernBrowser = Boolean(document.createElement('input').setSelectionRange);
} else {
  isModernBrowser = true;
}

var keys = {
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  LEFT: 37,
  ENTER: 13,
  ESC: 27,
  PLUS: 43,
  A: 65,
  Z: 90,
  SPACE: 32
};

function getDropdownListWidth() {
  var defaultWidth = 400;
  var horizontalMargin = 20;

  if (window.innerWidth - horizontalMargin < defaultWidth) {
    return window.innerWidth - horizontalMargin;
  } else {
    return defaultWidth;
  }
}

var ReactTelephoneInput = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ReactTelephoneInput, _Component);

  function ReactTelephoneInput(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "numberInputRef", null);

    _defineProperty(_assertThisInitialized(_this), "_cursorToEnd", function (skipFocus) {
      var input = _this.numberInputRef;

      if (skipFocus) {
        _this._fillDialCode();
      } else {
        input.focus();

        if (isModernBrowser) {
          var len = input.value.length;
          input.setSelectionRange(len, len);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFlagDropdownClick", function (e) {
      if (_this.props.disabled) {
        return;
      }

      e.preventDefault();
      var _this$state = _this.state,
          preferredCountries = _this$state.preferredCountries,
          selectedCountry = _this$state.selectedCountry;
      var onlyCountries = _this.props.onlyCountries;
      var highlightCountry = find(equals(_this.state.selectedCountry), preferredCountries.concat(onlyCountries));
      var highlightCountryIndex = findIndex(propEq('iso2', selectedCountry.iso2), preferredCountries.concat(onlyCountries)); // need to put the highlight on the current selected country if the dropdown is going to open up

      _this.setState({
        showDropDown: !_this.state.showDropDown,
        highlightCountry: highlightCountry,
        highlightCountryIndex: highlightCountryIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleInput", function (event) {
      var formattedNumber = '+';
      var newSelectedCountry = _this.state.selectedCountry;
      var freezeSelection = _this.state.freezeSelection; // if the input is the same as before, must be some special key like enter, alt, command etc.

      if (event.target.value === _this.state.formattedNumber) {
        return;
      }

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        // ie hack
        event.returnValue = false; // eslint-disable-line no-param-reassign
      }

      if (event.target.value && event.target.value.length > 0) {
        // before entering the number in new format,
        // lets check if the dial code now matches some other country
        // replace all non-numeric characters from the input string
        var inputNumber = event.target.value.replace(/\D/g, ''); // we don't need to send the whole number to guess the country...
        // only the first 6 characters are enough
        // the guess country function can then use memoization much more effectively
        // since the set of input it gets has drastically reduced

        if (!_this.state.freezeSelection || _this.state.selectedCountry.dialCode.length > inputNumber.length) {
          newSelectedCountry = (0, _guessSelectedCountry["default"])(inputNumber.substring(0, 6), _this.props);
          freezeSelection = false;
        }

        formattedNumber = (0, _format_number["default"])(inputNumber, newSelectedCountry.format, _this.props.autoFormat);
      }

      var caretPosition = event.target.selectionStart;
      var oldFormattedText = _this.state.formattedNumber;
      var diff = formattedNumber.length - oldFormattedText.length;
      var selectedCountry = newSelectedCountry.dialCode.length > 0 ? newSelectedCountry : _this.state.selectedCountry;

      _this.setState({
        formattedNumber: formattedNumber,
        freezeSelection: freezeSelection,
        selectedCountry: selectedCountry
      }, function () {
        if (isModernBrowser) {
          if (caretPosition === 1 && formattedNumber.length === 2) {
            caretPosition += 1;
          }

          if (diff > 0) {
            caretPosition -= diff;
          }

          if (caretPosition > 0 && oldFormattedText.length >= formattedNumber.length) {
            if (_this.numberInputRef) {
              _this.numberInputRef.setSelectionRange(caretPosition, caretPosition);
            }
          }
        }

        if (_this.props.onChange) {
          _this.props.onChange(formattedNumber, selectedCountry);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputClick", function () {
      _this.setState({
        showDropDown: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleFlagItemClick", function (country) {
      var onlyCountries = _this.props.onlyCountries;
      var currentSelectedCountry = _this.state.selectedCountry;
      var nextSelectedCountry = find(function (c) {
        return c.iso2 === country.iso2;
      }, onlyCountries); // tiny optimization

      if (nextSelectedCountry && currentSelectedCountry.iso2 !== nextSelectedCountry.iso2) {
        var newNumber = (0, _replace_country_code["default"])(currentSelectedCountry, nextSelectedCountry, _this.state.formattedNumber.replace(/\D/g, '') // let's convert formatted number to just numbers for easy find/replace
        );
        var formattedNumber = (0, _format_number["default"])(newNumber, nextSelectedCountry.format, _this.props.autoFormat);

        _this.setState({
          showDropDown: false,
          selectedCountry: nextSelectedCountry,
          freezeSelection: true,
          formattedNumber: formattedNumber
        }, function () {
          _this._cursorToEnd();

          if (_this.props.onChange) {
            _this.props.onChange(formattedNumber, nextSelectedCountry);
          }
        });
      } else {
        _this.setState({
          showDropDown: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputFocus", function () {
      // trigger parent component's onFocus handler
      if (typeof _this.props.onFocus === 'function') {
        _this.props.onFocus(_this.state.formattedNumber, _this.state.selectedCountry);
      }

      _this._fillDialCode();
    });

    _defineProperty(_assertThisInitialized(_this), "_fillDialCode", function () {
      // if the input is blank, insert dial code of the selected country
      if (_this.numberInputRef && _this.numberInputRef.value === '+') {
        _this.setState({
          formattedNumber: "+" + _this.state.selectedCountry.dialCode
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getHighlightCountryIndex", function (direction) {
      var onlyCountries = _this.props.onlyCountries;
      var _this$state2 = _this.state,
          highlightCountryIndex = _this$state2.highlightCountryIndex,
          preferredCountries = _this$state2.preferredCountries; // had to write own function because underscore does not have findIndex. lodash has it

      var newHighlightCountryIndex = highlightCountryIndex + direction;

      if (newHighlightCountryIndex < 0 || newHighlightCountryIndex >= onlyCountries.length + preferredCountries.length) {
        return newHighlightCountryIndex - direction;
      }

      return newHighlightCountryIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "_searchCountry", (0, _lodash["default"])(function searchCountry(queryString) {
      if (!queryString || queryString.length === 0) {
        return null;
      } // don't include the preferred countries in search


      var probableCountries = this.props.onlyCountries.filter(function (country) {
        return startsWith(queryString.toLowerCase(), country.name.toLowerCase());
      }, this);
      return probableCountries[0];
    }));

    _defineProperty(_assertThisInitialized(_this), "searchCountry", function () {
      var probableCandidate = _this._searchCountry(_this.state.queryString) || _this.props.onlyCountries[0];

      var probableCandidateIndex = findIndex(propEq('iso2', probableCandidate.iso2), _this.props.onlyCountries) + _this.state.preferredCountries.length;

      _this.setState({
        queryString: '',
        highlightCountryIndex: probableCandidateIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeydown", function (event) {
      if (!_this.state.showDropDown || event.metaKey || event.altKey) {
        return;
      } // ie hack


      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false; // eslint-disable-line no-param-reassign
      }

      var self = _assertThisInitialized(_this);

      function _moveHighlight(direction) {
        var highlightCountryIndex = self._getHighlightCountryIndex(direction);

        self.setState({
          highlightCountryIndex: highlightCountryIndex
        });
      }

      switch (event.which) {
        case keys.DOWN:
          _moveHighlight(1);

          break;

        case keys.UP:
          _moveHighlight(-1);

          break;

        case keys.ENTER:
          _this.handleFlagItemClick(_this.state.preferredCountries.concat(_this.props.onlyCountries)[_this.state.highlightCountryIndex], event);

          break;

        case keys.ESC:
          _this.setState({
            showDropDown: false
          }, _this._cursorToEnd);

          break;

        default:
          if (event.which >= keys.A && event.which <= keys.Z || event.which === keys.SPACE) {
            _this.setState({
              queryString: _this.state.queryString + String.fromCharCode(event.which)
            }, _this.state.debouncedQueryStingSearcher);
          }

      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputKeyDown", function (event) {
      if (event.which === keys.ENTER && typeof _this.props.onEnterKeyPress === 'function') {
        _this.props.onEnterKeyPress(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function () {
      if (_this.state.showDropDown) {
        _this.setState({
          showDropDown: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getCountryDropDownList", function () {
      var _this$state3 = _this.state,
          highlightCountryIndex = _this$state3.highlightCountryIndex,
          preferredCountries = _this$state3.preferredCountries;
      var data = preferredCountries.concat(_this.props.onlyCountries);
      return /*#__PURE__*/_react["default"].createElement(_reactTinyVirtualList["default"], {
        width: getDropdownListWidth(),
        height: 300,
        itemCount: data.length,
        itemSize: 40,
        style: _this.props.listStyle,
        className: "country-list",
        scrollToIndex: highlightCountryIndex,
        scrollToAlignment: "center",
        renderItem: function renderItem(_ref) {
          var index = _ref.index,
              style = _ref.style;
          var country = data[index];
          var itemClasses = (0, _classnames["default"])(_this.props.listItemClassName, {
            preferred: findIndex(propEq('iso2', country.iso2), _this.state.preferredCountries) >= 0,
            highlight: _this.state.highlightCountryIndex === index
          });
          var inputFlagClasses = "flag " + country.iso2;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: "flag_no_" + index,
            "data-flag-key": "flag_no_" + index,
            className: itemClasses,
            "data-dial-code": country.dialCode,
            "data-country-code": country.iso2,
            onClick: _this.handleFlagItemClick.bind(_assertThisInitialized(_this), country),
            style: style,
            title: country.name + " - " + country.dialCode,
            "data-test-id": "src_reacttelephoneinput_test_id_0",
            __self: _assertThisInitialized(_this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 511,
              columnNumber: 13
            }
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: inputFlagClasses,
            style: _this.getFlagStyle(),
            "data-test-id": "src_reacttelephoneinput_test_id_1",
            __self: _assertThisInitialized(_this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 522,
              columnNumber: 15
            }
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "country-name",
            "data-test-id": "src_reacttelephoneinput_test_id_2",
            __self: _assertThisInitialized(_this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 527,
              columnNumber: 15
            }
          }, country.name), /*#__PURE__*/_react["default"].createElement("span", {
            className: "dial-code",
            "data-test-id": "src_reacttelephoneinput_test_id_3",
            __self: _assertThisInitialized(_this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 533,
              columnNumber: 15
            }
          }, "+" + country.dialCode));
        },
        __self: _assertThisInitialized(_this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 488,
          columnNumber: 7
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFlagStyle", function () {
      if (_this.props.flagsImagePath) {
        return {
          backgroundImage: "url(" + _this.props.flagsImagePath + ")"
        };
      }

      return {};
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputBlur", function () {
      if (typeof _this.props.onBlur === 'function') {
        _this.props.onBlur(_this.state.formattedNumber, _this.state.selectedCountry);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFlagKeyDown", function (event) {
      // only trigger dropdown click if the dropdown is not already open.
      // it will otherwise interfere with key up/down of list
      if (event.which === keys.DOWN && _this.state.showDropDown === false) {
        _this.handleFlagDropdownClick(event);
      }
    });

    var _preferredCountries = props.preferredCountries.map(function (iso2) {
      return Object.prototype.hasOwnProperty.call(iso2Lookup, iso2) ? allCountries[iso2Lookup[iso2]] : null;
    }).filter(function (val) {
      return val !== null;
    });

    _this.state = {
      firstCall: true,
      preferredCountries: _preferredCountries,
      showDropDown: false,
      queryString: '',
      freezeSelection: false,
      debouncedQueryStingSearcher: (0, _debounce["default"])(_this.searchCountry, 600)
    };
    return _this;
  }

  var _proto = ReactTelephoneInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._cursorToEnd(true);
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !equals(nextProps, this.props) || !equals(nextState, this.state);
  };

  ReactTelephoneInput.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    var inputNumber;
    var onlyCountries = props.onlyCountries;
    var showDropDown = state.showDropDown,
        preferredCountries = state.preferredCountries,
        selectedCountry = state.selectedCountry; // don't calculate new state if the dropdown is open. We might be changing
    // the highlightCountryIndex using our keys

    if (showDropDown) {
      return state;
    }

    if (props.value) {
      inputNumber = props.value;
    } else if (props.initialValue && state.firstCall) {
      inputNumber = props.initialValue;
    } else if (props.value === null) {
      // just clear the value
      inputNumber = '';
    } else if (state && state.formattedNumber && state.formattedNumber.length > 0) {
      inputNumber = state.formattedNumber;
    } else {
      inputNumber = '';
    }

    var selectedCountryGuess = (0, _guessSelectedCountry["default"])(inputNumber.replace(/\D/g, ''), props); // if the guessed country has the same dialCode as the selected country in
    // our state, we give preference to the already selected country

    if (selectedCountry && selectedCountryGuess.dialCode === selectedCountry.dialCode) {
      selectedCountryGuess = selectedCountry;
    }

    var selectedCountryGuessIndex = findIndex(propEq('iso2', selectedCountryGuess.iso2), preferredCountries.concat(onlyCountries));
    var formattedNumber = (0, _format_number["default"])(inputNumber.replace(/\D/g, ''), selectedCountryGuess ? selectedCountryGuess.format : null, props.autoFormat);
    return {
      firstCall: false,
      selectedCountry: selectedCountryGuess,
      highlightCountryIndex: selectedCountryGuessIndex,
      formattedNumber: formattedNumber
    };
  } // put the cursor to the end of the input (usually after a focus event)
  ;

  _proto.render = function render() {
    var _this2 = this;

    var selectedCountry = this.state.selectedCountry;
    var arrowClasses = (0, _classnames["default"])({
      arrow: true,
      up: this.state.showDropDown
    });
    var inputClasses = (0, _classnames["default"])({
      'form-control': true,
      'invalid-number': !this.props.isValid(this.state.formattedNumber.replace(/\D/g, ''))
    });
    var flagViewClasses = (0, _classnames["default"])({
      'flag-dropdown': true,
      'open-dropdown': this.state.showDropDown
    });
    var inputFlagClasses = "flag " + selectedCountry.iso2;
    var buttonProps = this.props.buttonProps;
    var otherProps = this.props.inputProps;

    if (this.props.inputId) {
      otherProps.id = this.props.inputId;
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])('react-tel-input', this.props.classNames, this.props.className),
      "data-test-id": "src_reacttelephoneinput_test_id_4",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 594,
        columnNumber: 7
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: flagViewClasses,
      onKeyDown: this.handleKeydown,
      "data-test-id": "src_reacttelephoneinput_test_id_6",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 602,
        columnNumber: 9
      }
    }, /*#__PURE__*/_react["default"].createElement("button", _extends({
      onClick: this.handleFlagDropdownClick,
      className: "selected-flag",
      title: selectedCountry.name + ": + " + selectedCountry.dialCode,
      "data-test-id": "src_reacttelephoneinput_test_id_7",
      onKeyDown: this.handleFlagKeyDown,
      type: "button"
    }, buttonProps, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 607,
        columnNumber: 11
      }
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: inputFlagClasses,
      style: this.getFlagStyle(),
      "data-test-id": "src_reacttelephoneinput_test_id_8",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 616,
        columnNumber: 13
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: arrowClasses,
      "data-test-id": "src_reacttelephoneinput_test_id_9",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 621,
        columnNumber: 15
      }
    }))), this.state.showDropDown ? this.getCountryDropDownList() : ''), /*#__PURE__*/_react["default"].createElement("input", _extends({
      onChange: this.handleInput,
      onClick: this.handleInputClick,
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur,
      onKeyDown: this.handleInputKeyDown,
      value: this.state.formattedNumber,
      ref: function ref(node) {
        _this2.numberInputRef = node;
      },
      type: "tel",
      className: inputClasses,
      autoComplete: this.props.autoComplete,
      pattern: this.props.pattern,
      required: this.props.required,
      placeholder: this.props.placeholder,
      disabled: this.props.disabled
    }, otherProps, {
      "data-test-id": "src_reacttelephoneinput_test_id_5",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 629,
        columnNumber: 9
      }
    })));
  };

  return ReactTelephoneInput;
}(_react.Component);

exports.ReactTelephoneInput = ReactTelephoneInput;

_defineProperty(ReactTelephoneInput, "defaultProps", {
  autoFormat: true,
  onlyCountries: allCountries,
  defaultCountry: allCountries[0].iso2,
  isValid: _number_validator["default"],
  flagsImagePath: 'flags.png',
  onEnterKeyPress: function onEnterKeyPress() {},
  preferredCountries: [],
  disabled: false,
  placeholder: '+1 (702) 123-4567',
  autoComplete: 'tel',
  required: false,
  inputProps: {},
  buttonProps: {},
  listItemClassName: 'country',
  listStyle: {
    zIndex: 20,
    backgroundColor: 'white'
  }
});

ReactTelephoneInput.propTypes =  true ? {
  value: _propTypes["default"].string,
  initialValue: _propTypes["default"].string,
  autoFormat: _propTypes["default"].bool,
  defaultCountry: _propTypes["default"].string,
  isValid: _propTypes["default"].func,
  onlyCountries: _propTypes["default"].arrayOf(_propTypes["default"].object),
  preferredCountries: _propTypes["default"].arrayOf(_propTypes["default"].string),
  flagsImagePath: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  autoComplete: _propTypes["default"].string,
  classNames: _propTypes["default"].string,
  className: _propTypes["default"].string,
  inputId: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  onEnterKeyPress: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  disabled: _propTypes["default"].bool,
  pattern: _propTypes["default"].string,
  required: _propTypes["default"].bool,
  inputProps: _propTypes["default"].object,
  buttonProps: _propTypes["default"].object,
  listStyle: _propTypes["default"].object,
  listItemClassName: _propTypes["default"].string
} : {};

var _default = (0, _reactClickOutside["default"])(ReactTelephoneInput);

exports["default"] = _default;

/***/ }),

/***/ 1234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollDirection", function() { return DIRECTION; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

var ALIGNMENT;
(function (ALIGNMENT) {
    ALIGNMENT["AUTO"] = "auto";
    ALIGNMENT["START"] = "start";
    ALIGNMENT["CENTER"] = "center";
    ALIGNMENT["END"] = "end";
})(ALIGNMENT || (ALIGNMENT = {}));
var DIRECTION;
(function (DIRECTION) {
    DIRECTION["HORIZONTAL"] = "horizontal";
    DIRECTION["VERTICAL"] = "vertical";
})(DIRECTION || (DIRECTION = {}));
var SCROLL_CHANGE_REASON;
(function (SCROLL_CHANGE_REASON) {
    SCROLL_CHANGE_REASON["OBSERVED"] = "observed";
    SCROLL_CHANGE_REASON["REQUESTED"] = "requested";
})(SCROLL_CHANGE_REASON || (SCROLL_CHANGE_REASON = {}));
var scrollProp = (_a = {}, _a[DIRECTION.VERTICAL] = 'scrollTop', _a[DIRECTION.HORIZONTAL] = 'scrollLeft', _a);
var sizeProp = (_b = {}, _b[DIRECTION.VERTICAL] = 'height', _b[DIRECTION.HORIZONTAL] = 'width', _b);
var positionProp = (_c = {}, _c[DIRECTION.VERTICAL] = 'top', _c[DIRECTION.HORIZONTAL] = 'left', _c);
var marginProp = (_d = {}, _d[DIRECTION.VERTICAL] = 'marginTop', _d[DIRECTION.HORIZONTAL] = 'marginLeft', _d);
var oppositeMarginProp = (_e = {}, _e[DIRECTION.VERTICAL] = 'marginBottom', _e[DIRECTION.HORIZONTAL] = 'marginRight', _e);
var _a;
var _b;
var _c;
var _d;
var _e;

/* Forked from react-virtualized 💖 */
var SizeAndPositionManager = /** @class */function () {
    function SizeAndPositionManager(_a) {
        var itemCount = _a.itemCount,
            itemSizeGetter = _a.itemSizeGetter,
            estimatedItemSize = _a.estimatedItemSize;
        this.itemSizeGetter = itemSizeGetter;
        this.itemCount = itemCount;
        this.estimatedItemSize = estimatedItemSize;
        // Cache of size and position data for items, mapped by item index.
        this.itemSizeAndPositionData = {};
        // Measurements for items up to this index can be trusted; items afterward should be estimated.
        this.lastMeasuredIndex = -1;
    }
    SizeAndPositionManager.prototype.updateConfig = function (_a) {
        var itemCount = _a.itemCount,
            itemSizeGetter = _a.itemSizeGetter,
            estimatedItemSize = _a.estimatedItemSize;
        if (itemCount != null) {
            this.itemCount = itemCount;
        }
        if (estimatedItemSize != null) {
            this.estimatedItemSize = estimatedItemSize;
        }
        if (itemSizeGetter != null) {
            this.itemSizeGetter = itemSizeGetter;
        }
    };
    SizeAndPositionManager.prototype.getLastMeasuredIndex = function () {
        return this.lastMeasuredIndex;
    };
    /**
     * This method returns the size and position for the item at the specified index.
     * It just-in-time calculates (or used cached values) for items leading up to the index.
     */
    SizeAndPositionManager.prototype.getSizeAndPositionForIndex = function (index) {
        if (index < 0 || index >= this.itemCount) {
            throw Error("Requested index " + index + " is outside of range 0.." + this.itemCount);
        }
        if (index > this.lastMeasuredIndex) {
            var lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
            var offset = lastMeasuredSizeAndPosition.offset + lastMeasuredSizeAndPosition.size;
            for (var i = this.lastMeasuredIndex + 1; i <= index; i++) {
                var size = this.itemSizeGetter(i);
                if (size == null || isNaN(size)) {
                    throw Error("Invalid size returned for index " + i + " of value " + size);
                }
                this.itemSizeAndPositionData[i] = {
                    offset: offset,
                    size: size
                };
                offset += size;
            }
            this.lastMeasuredIndex = index;
        }
        return this.itemSizeAndPositionData[index];
    };
    SizeAndPositionManager.prototype.getSizeAndPositionOfLastMeasuredItem = function () {
        return this.lastMeasuredIndex >= 0 ? this.itemSizeAndPositionData[this.lastMeasuredIndex] : { offset: 0, size: 0 };
    };
    /**
     * Total size of all items being measured.
     * This value will be completedly estimated initially.
     * As items as measured the estimate will be updated.
     */
    SizeAndPositionManager.prototype.getTotalSize = function () {
        var lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
        return lastMeasuredSizeAndPosition.offset + lastMeasuredSizeAndPosition.size + (this.itemCount - this.lastMeasuredIndex - 1) * this.estimatedItemSize;
    };
    /**
     * Determines a new offset that ensures a certain item is visible, given the alignment.
     *
     * @param align Desired alignment within container; one of "start" (default), "center", or "end"
     * @param containerSize Size (width or height) of the container viewport
     * @return Offset to use to ensure the specified item is visible
     */
    SizeAndPositionManager.prototype.getUpdatedOffsetForIndex = function (_a) {
        var _b = _a.align,
            align = _b === void 0 ? ALIGNMENT.START : _b,
            containerSize = _a.containerSize,
            currentOffset = _a.currentOffset,
            targetIndex = _a.targetIndex;
        if (containerSize <= 0) {
            return 0;
        }
        var datum = this.getSizeAndPositionForIndex(targetIndex);
        var maxOffset = datum.offset;
        var minOffset = maxOffset - containerSize + datum.size;
        var idealOffset;
        switch (align) {
            case ALIGNMENT.END:
                idealOffset = minOffset;
                break;
            case ALIGNMENT.CENTER:
                idealOffset = maxOffset - (containerSize - datum.size) / 2;
                break;
            case ALIGNMENT.START:
                idealOffset = maxOffset;
                break;
            default:
                idealOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));
        }
        var totalSize = this.getTotalSize();
        return Math.max(0, Math.min(totalSize - containerSize, idealOffset));
    };
    SizeAndPositionManager.prototype.getVisibleRange = function (_a) {
        var containerSize = _a.containerSize,
            offset = _a.offset,
            overscanCount = _a.overscanCount;
        var totalSize = this.getTotalSize();
        if (totalSize === 0) {
            return {};
        }
        var maxOffset = offset + containerSize;
        var start = this.findNearestItem(offset);
        if (typeof start === 'undefined') {
            throw Error("Invalid offset " + offset + " specified");
        }
        var datum = this.getSizeAndPositionForIndex(start);
        offset = datum.offset + datum.size;
        var stop = start;
        while (offset < maxOffset && stop < this.itemCount - 1) {
            stop++;
            offset += this.getSizeAndPositionForIndex(stop).size;
        }
        if (overscanCount) {
            start = Math.max(0, start - overscanCount);
            stop = Math.min(stop + overscanCount, this.itemCount - 1);
        }
        return {
            start: start,
            stop: stop
        };
    };
    /**
     * Clear all cached values for items after the specified index.
     * This method should be called for any item that has changed its size.
     * It will not immediately perform any calculations; they'll be performed the next time getSizeAndPositionForIndex() is called.
     */
    SizeAndPositionManager.prototype.resetItem = function (index) {
        this.lastMeasuredIndex = Math.min(this.lastMeasuredIndex, index - 1);
    };
    /**
     * Searches for the item (index) nearest the specified offset.
     *
     * If no exact match is found the next lowest item index will be returned.
     * This allows partially visible items (with offsets just before/above the fold) to be visible.
     */
    SizeAndPositionManager.prototype.findNearestItem = function (offset) {
        if (isNaN(offset)) {
            throw Error("Invalid offset " + offset + " specified");
        }
        // Our search algorithms find the nearest match at or below the specified offset.
        // So make sure the offset is at least 0 or no match will be found.
        offset = Math.max(0, offset);
        var lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
        var lastMeasuredIndex = Math.max(0, this.lastMeasuredIndex);
        if (lastMeasuredSizeAndPosition.offset >= offset) {
            // If we've already measured items within this range just use a binary search as it's faster.
            return this.binarySearch({
                high: lastMeasuredIndex,
                low: 0,
                offset: offset
            });
        } else {
            // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
            // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
            // The overall complexity for this approach is O(log n).
            return this.exponentialSearch({
                index: lastMeasuredIndex,
                offset: offset
            });
        }
    };
    SizeAndPositionManager.prototype.binarySearch = function (_a) {
        var low = _a.low,
            high = _a.high,
            offset = _a.offset;
        var middle = 0;
        var currentOffset = 0;
        while (low <= high) {
            middle = low + Math.floor((high - low) / 2);
            currentOffset = this.getSizeAndPositionForIndex(middle).offset;
            if (currentOffset === offset) {
                return middle;
            } else if (currentOffset < offset) {
                low = middle + 1;
            } else if (currentOffset > offset) {
                high = middle - 1;
            }
        }
        if (low > 0) {
            return low - 1;
        }
        return 0;
    };
    SizeAndPositionManager.prototype.exponentialSearch = function (_a) {
        var index = _a.index,
            offset = _a.offset;
        var interval = 1;
        while (index < this.itemCount && this.getSizeAndPositionForIndex(index).offset < offset) {
            index += interval;
            interval *= 2;
        }
        return this.binarySearch({
            high: Math.min(index, this.itemCount - 1),
            low: Math.floor(index / 2),
            offset: offset
        });
    };
    return SizeAndPositionManager;
}();

var STYLE_WRAPPER = {
    overflow: 'auto',
    willChange: 'transform',
    WebkitOverflowScrolling: 'touch'
};
var STYLE_INNER = {
    position: 'relative',
    width: '100%',
    minHeight: '100%'
};
var STYLE_ITEM = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
};
var STYLE_STICKY_ITEM = __assign({}, STYLE_ITEM, { position: 'sticky' });
var VirtualList = /** @class */function (_super) {
    __extends(VirtualList, _super);
    function VirtualList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemSizeGetter = function (itemSize) {
            return function (index) {
                return _this.getSize(index, itemSize);
            };
        };
        _this.sizeAndPositionManager = new SizeAndPositionManager({
            itemCount: _this.props.itemCount,
            itemSizeGetter: _this.itemSizeGetter(_this.props.itemSize),
            estimatedItemSize: _this.getEstimatedItemSize()
        });
        _this.state = {
            offset: _this.props.scrollOffset || _this.props.scrollToIndex != null && _this.getOffsetForIndex(_this.props.scrollToIndex) || 0,
            scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED
        };
        _this.styleCache = {};
        _this.getRef = function (node) {
            _this.rootNode = node;
        };
        _this.handleScroll = function (event) {
            var onScroll = _this.props.onScroll;
            var offset = _this.getNodeOffset();
            if (offset < 0 || _this.state.offset === offset || event.target !== _this.rootNode) {
                return;
            }
            _this.setState({
                offset: offset,
                scrollChangeReason: SCROLL_CHANGE_REASON.OBSERVED
            });
            if (typeof onScroll === 'function') {
                onScroll(offset, event);
            }
        };
        return _this;
    }
    VirtualList.prototype.componentDidMount = function () {
        var _a = this.props,
            scrollOffset = _a.scrollOffset,
            scrollToIndex = _a.scrollToIndex;
        this.rootNode.addEventListener('scroll', this.handleScroll, {
            passive: true
        });
        if (scrollOffset != null) {
            this.scrollTo(scrollOffset);
        } else if (scrollToIndex != null) {
            this.scrollTo(this.getOffsetForIndex(scrollToIndex));
        }
    };
    VirtualList.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props,
            estimatedItemSize = _a.estimatedItemSize,
            itemCount = _a.itemCount,
            itemSize = _a.itemSize,
            scrollOffset = _a.scrollOffset,
            scrollToAlignment = _a.scrollToAlignment,
            scrollToIndex = _a.scrollToIndex;
        var scrollPropsHaveChanged = nextProps.scrollToIndex !== scrollToIndex || nextProps.scrollToAlignment !== scrollToAlignment;
        var itemPropsHaveChanged = nextProps.itemCount !== itemCount || nextProps.itemSize !== itemSize || nextProps.estimatedItemSize !== estimatedItemSize;
        if (nextProps.itemSize !== itemSize) {
            this.sizeAndPositionManager.updateConfig({
                itemSizeGetter: this.itemSizeGetter(nextProps.itemSize)
            });
        }
        if (nextProps.itemCount !== itemCount || nextProps.estimatedItemSize !== estimatedItemSize) {
            this.sizeAndPositionManager.updateConfig({
                itemCount: nextProps.itemCount,
                estimatedItemSize: this.getEstimatedItemSize(nextProps)
            });
        }
        if (itemPropsHaveChanged) {
            this.recomputeSizes();
        }
        if (nextProps.scrollOffset !== scrollOffset) {
            this.setState({
                offset: nextProps.scrollOffset || 0,
                scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED
            });
        } else if (typeof nextProps.scrollToIndex === 'number' && (scrollPropsHaveChanged || itemPropsHaveChanged)) {
            this.setState({
                offset: this.getOffsetForIndex(nextProps.scrollToIndex, nextProps.scrollToAlignment, nextProps.itemCount),
                scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED
            });
        }
    };
    VirtualList.prototype.componentDidUpdate = function (_, prevState) {
        var _a = this.state,
            offset = _a.offset,
            scrollChangeReason = _a.scrollChangeReason;
        if (prevState.offset !== offset && scrollChangeReason === SCROLL_CHANGE_REASON.REQUESTED) {
            this.scrollTo(offset);
        }
    };
    VirtualList.prototype.componentWillUnmount = function () {
        this.rootNode.removeEventListener('scroll', this.handleScroll);
    };
    VirtualList.prototype.scrollTo = function (value) {
        var _a = this.props.scrollDirection,
            scrollDirection = _a === void 0 ? DIRECTION.VERTICAL : _a;
        this.rootNode[scrollProp[scrollDirection]] = value;
    };
    VirtualList.prototype.getOffsetForIndex = function (index, scrollToAlignment, itemCount) {
        if (scrollToAlignment === void 0) {
            scrollToAlignment = this.props.scrollToAlignment;
        }
        if (itemCount === void 0) {
            itemCount = this.props.itemCount;
        }
        var _a = this.props.scrollDirection,
            scrollDirection = _a === void 0 ? DIRECTION.VERTICAL : _a;
        if (index < 0 || index >= itemCount) {
            index = 0;
        }
        return this.sizeAndPositionManager.getUpdatedOffsetForIndex({
            align: scrollToAlignment,
            containerSize: this.props[sizeProp[scrollDirection]],
            currentOffset: this.state && this.state.offset || 0,
            targetIndex: index
        });
    };
    VirtualList.prototype.recomputeSizes = function (startIndex) {
        if (startIndex === void 0) {
            startIndex = 0;
        }
        this.styleCache = {};
        this.sizeAndPositionManager.resetItem(startIndex);
    };
    VirtualList.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            estimatedItemSize = _a.estimatedItemSize,
            height = _a.height,
            _b = _a.overscanCount,
            overscanCount = _b === void 0 ? 3 : _b,
            renderItem = _a.renderItem,
            itemCount = _a.itemCount,
            itemSize = _a.itemSize,
            onItemsRendered = _a.onItemsRendered,
            onScroll = _a.onScroll,
            _c = _a.scrollDirection,
            scrollDirection = _c === void 0 ? DIRECTION.VERTICAL : _c,
            scrollOffset = _a.scrollOffset,
            scrollToIndex = _a.scrollToIndex,
            scrollToAlignment = _a.scrollToAlignment,
            stickyIndices = _a.stickyIndices,
            style = _a.style,
            width = _a.width,
            props = __rest(_a, ["estimatedItemSize", "height", "overscanCount", "renderItem", "itemCount", "itemSize", "onItemsRendered", "onScroll", "scrollDirection", "scrollOffset", "scrollToIndex", "scrollToAlignment", "stickyIndices", "style", "width"]);
        var offset = this.state.offset;
        var _d = this.sizeAndPositionManager.getVisibleRange({
            containerSize: this.props[sizeProp[scrollDirection]] || 0,
            offset: offset,
            overscanCount: overscanCount
        }),
            start = _d.start,
            stop = _d.stop;
        var items = [];
        var wrapperStyle = __assign({}, STYLE_WRAPPER, style, { height: height, width: width });
        var innerStyle = __assign({}, STYLE_INNER, (_e = {}, _e[sizeProp[scrollDirection]] = this.sizeAndPositionManager.getTotalSize(), _e));
        if (stickyIndices != null && stickyIndices.length !== 0) {
            stickyIndices.forEach(function (index) {
                return items.push(renderItem({
                    index: index,
                    style: _this.getStyle(index, true)
                }));
            });
            if (scrollDirection === DIRECTION.HORIZONTAL) {
                innerStyle.display = 'flex';
            }
        }
        if (typeof start !== 'undefined' && typeof stop !== 'undefined') {
            for (var index = start; index <= stop; index++) {
                if (stickyIndices != null && stickyIndices.includes(index)) {
                    continue;
                }
                items.push(renderItem({
                    index: index,
                    style: this.getStyle(index, false)
                }));
            }
            if (typeof onItemsRendered === 'function') {
                onItemsRendered({
                    startIndex: start,
                    stopIndex: stop
                });
            }
        }
        return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", __assign({ ref: this.getRef }, props, { style: wrapperStyle }), Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])("div", { style: innerStyle }, items));
        var _e;
    };
    VirtualList.prototype.getNodeOffset = function () {
        var _a = this.props.scrollDirection,
            scrollDirection = _a === void 0 ? DIRECTION.VERTICAL : _a;
        return this.rootNode[scrollProp[scrollDirection]];
    };
    VirtualList.prototype.getEstimatedItemSize = function (props) {
        if (props === void 0) {
            props = this.props;
        }
        return props.estimatedItemSize || typeof props.itemSize === 'number' && props.itemSize || 50;
    };
    VirtualList.prototype.getSize = function (index, itemSize) {
        if (typeof itemSize === 'function') {
            return itemSize(index);
        }
        return Array.isArray(itemSize) ? itemSize[index] : itemSize;
    };
    VirtualList.prototype.getStyle = function (index, sticky) {
        var style = this.styleCache[index];
        if (style) {
            return style;
        }
        var _a = this.props.scrollDirection,
            scrollDirection = _a === void 0 ? DIRECTION.VERTICAL : _a;
        var _b = this.sizeAndPositionManager.getSizeAndPositionForIndex(index),
            size = _b.size,
            offset = _b.offset;
        return this.styleCache[index] = sticky ? __assign({}, STYLE_STICKY_ITEM, (_c = {}, _c[sizeProp[scrollDirection]] = size, _c[marginProp[scrollDirection]] = offset, _c[oppositeMarginProp[scrollDirection]] = -(offset + size), _c.zIndex = 1, _c)) : __assign({}, STYLE_ITEM, (_d = {}, _d[sizeProp[scrollDirection]] = size, _d[positionProp[scrollDirection]] = offset, _d));
        var _c, _d;
    };
    VirtualList.defaultProps = {
        overscanCount: 3,
        scrollDirection: DIRECTION.VERTICAL,
        width: '100%'
    };
    VirtualList.propTypes = {
        estimatedItemSize: __WEBPACK_IMPORTED_MODULE_1_prop_types__["number"],
        height: Object(__WEBPACK_IMPORTED_MODULE_1_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_1_prop_types__["number"], __WEBPACK_IMPORTED_MODULE_1_prop_types__["string"]]).isRequired,
        itemCount: __WEBPACK_IMPORTED_MODULE_1_prop_types__["number"].isRequired,
        itemSize: Object(__WEBPACK_IMPORTED_MODULE_1_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_1_prop_types__["number"], __WEBPACK_IMPORTED_MODULE_1_prop_types__["array"], __WEBPACK_IMPORTED_MODULE_1_prop_types__["func"]]).isRequired,
        onScroll: __WEBPACK_IMPORTED_MODULE_1_prop_types__["func"],
        onItemsRendered: __WEBPACK_IMPORTED_MODULE_1_prop_types__["func"],
        overscanCount: __WEBPACK_IMPORTED_MODULE_1_prop_types__["number"],
        renderItem: __WEBPACK_IMPORTED_MODULE_1_prop_types__["func"].isRequired,
        scrollOffset: __WEBPACK_IMPORTED_MODULE_1_prop_types__["number"],
        scrollToIndex: __WEBPACK_IMPORTED_MODULE_1_prop_types__["number"],
        scrollToAlignment: Object(__WEBPACK_IMPORTED_MODULE_1_prop_types__["oneOf"])([ALIGNMENT.AUTO, ALIGNMENT.START, ALIGNMENT.CENTER, ALIGNMENT.END]),
        scrollDirection: Object(__WEBPACK_IMPORTED_MODULE_1_prop_types__["oneOf"])([DIRECTION.HORIZONTAL, DIRECTION.VERTICAL]),
        stickyIndices: Object(__WEBPACK_IMPORTED_MODULE_1_prop_types__["arrayOf"])(__WEBPACK_IMPORTED_MODULE_1_prop_types__["number"]),
        style: __WEBPACK_IMPORTED_MODULE_1_prop_types__["object"],
        width: Object(__WEBPACK_IMPORTED_MODULE_1_prop_types__["oneOfType"])([__WEBPACK_IMPORTED_MODULE_1_prop_types__["number"], __WEBPACK_IMPORTED_MODULE_1_prop_types__["string"]])
    };
    return VirtualList;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);


/* harmony default export */ __webpack_exports__["default"] = (VirtualList);


/***/ }),

/***/ 1235:
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ }),

/***/ 1236:
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

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

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
var splice = arrayProto.splice;

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
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

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

module.exports = memoize;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(153)))

/***/ }),

/***/ 1237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _cramda = _interopRequireDefault(__webpack_require__(1048));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var first = _cramda["default"].first,
    tail = _cramda["default"].tail;

function formatNumber(text, pattern, autoFormat) {
  if (!text || text.length === 0) {
    return '+';
  } // for all strings with length less than 3, just return it (1, 2 etc.)
  // also return the same text if the selected country has no fixed format


  if (text && text.length < 2 || !pattern || !autoFormat) {
    return "+" + text;
  }

  var formattedObject = pattern.split('').reduce(function (acc, character) {
    if (acc.remainingText.length === 0) {
      return acc;
    }

    if (character !== '.') {
      return {
        formattedText: acc.formattedText + character,
        remainingText: acc.remainingText
      };
    }

    return {
      formattedText: acc.formattedText + first(acc.remainingText),
      remainingText: tail(acc.remainingText)
    };
  }, {
    formattedText: '',
    remainingText: text.split('')
  });
  return formattedObject.formattedText + formattedObject.remainingText.join('');
}

var _default = formatNumber;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 1238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = replaceCountryCode;

function replaceCountryCode(currentSelectedCountry, nextSelectedCountry, number) {
  var dialCodeRegex = RegExp("^(" + currentSelectedCountry.dialCode + ")");
  var codeToBeReplaced = number.match(dialCodeRegex);
  var newNumber = number.replace(dialCodeRegex, nextSelectedCountry.dialCode);

  if (codeToBeReplaced === null && newNumber === number) {
    return nextSelectedCountry.dialCode + number;
  }

  return newNumber;
}

module.exports = exports.default;

/***/ }),

/***/ 1239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = isNumberValid;

var _cramda = _interopRequireDefault(__webpack_require__(1048));

var _countryTelephoneData = _interopRequireDefault(__webpack_require__(1080));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isNumberValid(inputNumber) {
  var countries = _countryTelephoneData["default"].allCountries;
  return _cramda["default"].any(function (country) {
    return _cramda["default"].startsWith(country.dialCode, inputNumber) || _cramda["default"].startsWith(inputNumber, country.dialCode);
  }, countries);
}

module.exports = exports.default;

/***/ }),

/***/ 1240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = guessSelectedCountry;

var _cramda = _interopRequireDefault(__webpack_require__(1048));

var _countryTelephoneData = _interopRequireDefault(__webpack_require__(1080));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// memoize results based on the first 5/6 characters. That is all that matters
var find = _cramda["default"].find,
    propEq = _cramda["default"].propEq,
    startsWith = _cramda["default"].startsWith;
var allCountries = _countryTelephoneData["default"].allCountries,
    allCountryCodes = _countryTelephoneData["default"].allCountryCodes;

function guessSelectedCountry(inputNumber, props) {
  var defaultCountry = props.defaultCountry,
      onlyCountries = props.onlyCountries;
  var secondBestGuess = find(propEq('iso2', defaultCountry), allCountries) || onlyCountries[0];
  var inputNumberForCountries = inputNumber.substr(0, 4);
  var bestGuess;

  if (inputNumber.trim() !== '') {
    bestGuess = onlyCountries.reduce(function (selectedCountry, country) {
      // if the country dialCode exists WITH area code
      if (allCountryCodes[inputNumberForCountries] && allCountryCodes[inputNumberForCountries][0] === country.iso2) {
        return country; // if the selected country dialCode is there with the area code
      } else if (allCountryCodes[inputNumberForCountries] && allCountryCodes[inputNumberForCountries][0] === selectedCountry.iso2) {
        return selectedCountry; // else do the original if statement
      }

      if (startsWith(country.dialCode, inputNumber)) {
        if (country.dialCode.length > selectedCountry.dialCode.length) {
          return country;
        }

        if (country.dialCode.length === selectedCountry.dialCode.length && country.priority < selectedCountry.priority) {
          return country;
        }
      }

      return selectedCountry;
    }, {
      dialCode: '',
      priority: 10001
    }, this);
  } else {
    return secondBestGuess;
  }

  if (!bestGuess || !bestGuess.name) {
    return secondBestGuess;
  }

  return bestGuess;
}

module.exports = exports.default;

/***/ }),

/***/ 1483:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(334);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactI18next = __webpack_require__(315);

var _reactSelect = __webpack_require__(902);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PersonalData = function PersonalData(_ref) {
  var changeCountry = _ref.changeCountry,
      country = _ref.country,
      inputCheckbox = _ref.inputCheckbox,
      changeCheckbox = _ref.changeCheckbox,
      ifErrorPayment = _ref.ifErrorPayment,
      error = _ref.error,
      user = _ref.user,
      goToPayment = _ref.goToPayment,
      cancelRedirect = _ref.cancelRedirect,
      handlerSendSellBasket = _ref.handlerSendSellBasket,
      handlerNextTab = _ref.handlerNextTab,
      handlerShowHideBlocks = _ref.handlerShowHideBlocks,
      validateError = _ref.validateError,
      validateForm = _ref.validateForm,
      validateCheck = _ref.validateCheck,
      isValidate = _ref.isValidate,
      payMethodError = _ref.payMethodError,
      t = _ref.t;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      clickBtn = _useState2[0],
      setClickBtn = _useState2[1];

  (0, _react.useEffect)(function () {
    validateCheck();
  }, []);
  function changePassword(e) {
    var value = e.target.value,
        regular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

    if (regular.test(value.trim())) {
      $(e.target).parents(".inputFullWidth").find(".statusBarPassword").css({ background: "#00cb94" });
    } else {
      $(e.target).parents(".inputFullWidth").find(".statusBarPassword").css({ background: "#ff0000" });
    }
  }
  function showLoginForm() {
    cancelRedirect(true);
    document.getElementById("op").checked = true;
    $(".login-box-wrapper").css({ display: "block" });
  }

  var onClickButton = function onClickButton() {
    setClickBtn(true);
    setTimeout(function () {
      setClickBtn(false);
    }, 5500);
    if (!validateForm()) {
      return;
    }
    if (window.isMobile) {
      goToPayment();
    } else {
      handlerNextTab();
    }
  };

  return _react2.default.createElement(
    "div",
    { className: "personalData" },
    _react2.default.createElement(
      "h3",
      {
        className: "title",
        onClick: function onClick(e) {
          return handlerShowHideBlocks(e);
        },
        "data-step": "personalData"
      },
      _react2.default.createElement(
        "span",
        { className: "num" },
        "2"
      ),
      _react2.default.createElement(
        "span",
        { className: "text" },
        t("basketPage.personalData")
      ),
      _react2.default.createElement(
        "span",
        { className: "arrow" },
        _react2.default.createElement("i", { className: "fa fa-angle-down", "aria-hidden": "true" })
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "wrapperItemBasket" },
      _react2.default.createElement(
        "div",
        { className: "billingForm" },
        _react2.default.createElement(
          "div",
          { className: "topPersonalData" },
          !user.isLogin && _react2.default.createElement(
            "div",
            { className: "login-buttons buy-form" },
            _react2.default.createElement(
              "div",
              { className: "buttons-row" },
              window.isMobile && _react2.default.createElement(
                "label",
                null,
                _react2.default.createElement("input", {
                  type: "checkbox",
                  onChange: changeCheckbox,
                  name: "asGuest",
                  className: "checkbox-login-as-guest",
                  defaultChecked: true
                }),
                _react2.default.createElement("span", { className: "check" }),
                "Als Gast bestellen - hierbei wird kein Benutzeraccount erstellt"
              )
            ),
            !window.isMobile && _react2.default.createElement(
              "label",
              null,
              _react2.default.createElement("input", {
                type: "checkbox",
                onChange: changeCheckbox,
                name: "asGuest",
                className: "checkbox-login-as-guest",
                defaultChecked: true
              }),
              _react2.default.createElement("span", { className: "check" }),
              "Als Gast bestellen - hierbei wird kein Benutzeraccount erstellt"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "form-subheading" },
            _react2.default.createElement("img", { loading: "lazy", src: "/images/basket-form1.svg", alt: "" }),
            _react2.default.createElement(
              "h3",
              null,
              "Lieferadresse"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "wrapLabel" },
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                "div",
                {
                  className: validateError.gender.error ? clickBtn === true ? "genderArea genderError purple" : "genderArea genderError" : "genderArea"
                },
                _react2.default.createElement(
                  "label",
                  null,
                  _react2.default.createElement("input", {
                    type: "radio",
                    name: "gender",
                    value: "Herr",
                    onClick: function onClick() {
                      return validateForm();
                    },
                    required: true
                  }),
                  _react2.default.createElement("span", null),
                  "Herr"
                ),
                _react2.default.createElement(
                  "label",
                  null,
                  _react2.default.createElement("input", {
                    type: "radio",
                    name: "gender",
                    value: "Frau",
                    onClick: function onClick() {
                      return validateForm();
                    },
                    required: true
                  }),
                  _react2.default.createElement("span", null),
                  "Frau"
                )
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.gender.msg
              )
            ),
            _react2.default.createElement(
              "label",
              null,
              _react2.default.createElement("input", {
                type: "checkbox",
                name: "company",
                checked: inputCheckbox.company === true ? "true" : null,
                onChange: changeCheckbox
              }),
              _react2.default.createElement("span", { className: "check" }),
              "Firma"
            )
          ),
          !user.isLogin && _react2.default.createElement(
            "span",
            { className: "loginForSellForm", onClick: showLoginForm },
            "Sie haben bereits ein Konto? Jetzt einloggen"
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: inputCheckbox.company ? " rowInputs" : " rowInputs hide"
          },
          _react2.default.createElement(
            "div",
            { className: "input-wrapper" },
            _react2.default.createElement("input", {
              type: "text",
              name: "companyName",
              className: validateError.companyName.error ? clickBtn === true ? "error purple" : "error" : null,
              placeholder: "Firma",
              onChange: function onChange() {
                return validateForm();
              },
              required: inputCheckbox.company
            }),
            _react2.default.createElement(
              "span",
              { className: "placeholder" },
              "Firma"
            ),
            _react2.default.createElement(
              "span",
              { className: "errorText" },
              validateError.companyName.msg
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "rowInputs-wrapper" },
          _react2.default.createElement(
            "div",
            { className: " rowInputs" /*onChange={changeNameField}*/ },
            _react2.default.createElement(
              "div",
              { className: "input-wrapper adjust-wrapper" },
              _react2.default.createElement("input", {
                type: "text",
                name: "firstname",
                className: validateError.firstname.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Vorname",
                onChange: function onChange() {
                  return validateForm();
                },
                required: true
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Vorname"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.firstname.msg
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "input-wrapper" },
              _react2.default.createElement("input", {
                type: "text",
                name: "lastname",
                className: validateError.lastname.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Nachname",
                onChange: function onChange() {
                  return validateForm();
                },
                required: true
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Nachname"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.lastname.msg
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "rowInputs-wrapper" },
          _react2.default.createElement(
            "div",
            { className: "rowInputs" },
            _react2.default.createElement(
              "div",
              { className: "input-wrapper adjust-wrapper" },
              _react2.default.createElement("input", {
                type: "email",
                name: "email",
                className: error.info || validateError.email.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "E-Mail",
                onChange: function onChange() {
                  return validateForm();
                },
                required: true
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "E-Mail"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                error.info ? error.info : validateError.email.error ? validateError.email.msg : ""
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "input-wrapper" },
              _react2.default.createElement("input", {
                type: "tel",
                name: "phone",
                className: validateError.phone.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Telefon (mobil)",
                minLength: "10",
                onChange: function onChange() {
                  return validateForm();
                },
                required: true
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Telefon (mobil)"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.phone.msg
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "rowInputs-wrapper" },
          _react2.default.createElement(
            "div",
            { className: "personalDataAddress rowInputs" },
            _react2.default.createElement(
              "div",
              { className: "input-wrapper input-wrapper-lg" },
              _react2.default.createElement("input", {
                type: "text",
                name: "street",
                className: validateError.street.error ? clickBtn === true ? "error purple" : "error" : null,
                id: "route",
                placeholder: "Strasse",
                onChange: function onChange() {
                  return validateForm();
                },
                required: true
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Strasse"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.street.msg
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "input-wrapper input-wrapper-sm" },
              _react2.default.createElement("input", {
                type: "text",
                name: "number",
                className: validateError.number.error ? clickBtn === true ? "error purple" : "error" : null,
                id: "street_number",
                placeholder: "Nr.",
                onChange: function onChange() {
                  return validateForm();
                },
                required: true
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Nr."
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.number.msg
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "personalDataCity rowInputs" },
            _react2.default.createElement(
              "div",
              { className: "input-wrapper input-wrapper-sm" },
              _react2.default.createElement("input", {
                type: "text",
                name: "zip",
                className: validateError.zip.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "PLZ",
                id: "postal_code",
                onChange: function onChange() {
                  return validateForm();
                },
                required: true
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "PLZ"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.zip.msg
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "input-wrapper input-wrapper-lg" },
              _react2.default.createElement("input", {
                type: "text",
                name: "city",
                className: validateError.city.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Stadt",
                id: "locality",
                onChange: function onChange() {
                  return validateForm();
                },
                required: true
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Stadt"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.city.msg
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "select" },
          !country.countriesList.some(function (item) {
            return item.value === country.currentCountry.inputCountry.toLowerCase();
          }) && _react2.default.createElement("input", { className: "requiredSelect", type: "text", required: true }),
          _react2.default.createElement(_reactSelect2.default, {
            placeholder: "Land",
            value: country.currentCountry.inputCountry.toLowerCase(),
            name: "inputCountry",
            clearable: false,
            options: country.countriesList,
            searchable: false,
            required: true,
            onChange: function onChange(val) {
              return changeCountry(val, "inputCountry");
            }
          }),
          _react2.default.createElement(
            "span",
            { className: "placeholder" },
            "Ausw\xE4hlen"
          )
        ),
        !user.isLogin && !inputCheckbox.asGuest && _react2.default.createElement(
          "div",
          { className: "inputFullWidth rowInputs" },
          _react2.default.createElement("input", {
            type: "password",
            name: "password",
            placeholder: "Password (min. 8 Zeichen + min. 1 Nr. )",
            className: error.password ? "error" : null,
            onChange: changePassword,
            required: !ifErrorPayment
          }),
          _react2.default.createElement(
            "span",
            { className: "errorText" },
            error.password
          ),
          _react2.default.createElement("div", { className: "statusBarPassword" })
        ),
        _react2.default.createElement(
          "label",
          { className: "shippingAddressCheck" },
          _react2.default.createElement("input", {
            type: "checkbox",
            name: "shippingAddress",
            checked: inputCheckbox.shippingAddress === true ? true : false,
            onChange: changeCheckbox
          }),
          _react2.default.createElement("span", null),
          " Diese Lieferadresse auch als Rechnungsadresse benutzen"
        )
      ),
      _react2.default.createElement(
        "div",
        {
          className: inputCheckbox.shippingAddress === true ? "hide shippingForm" : "shippingForm"
        },
        _react2.default.createElement(
          "div",
          { className: "form-subheading" },
          _react2.default.createElement("img", { loading: "lazy", src: "/images/basket-form2.svg", alt: "" }),
          _react2.default.createElement(
            "h3",
            null,
            "Rechnungsadresse"
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "topPersonalData" },
          _react2.default.createElement(
            "div",
            { className: "wrapLabel" },
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                "div",
                {
                  className: validateError.customer_gender.error ? clickBtn === true ? "genderArea genderError purple" : "genderArea genderError" : "genderArea"
                },
                _react2.default.createElement(
                  "label",
                  null,
                  _react2.default.createElement("input", {
                    type: "radio",
                    name: "customer_gender",
                    value: "Herr",
                    onClick: function onClick() {
                      return validateForm();
                    },
                    required: !inputCheckbox.shippingAddress
                  }),
                  _react2.default.createElement("span", null),
                  "Herr"
                ),
                _react2.default.createElement(
                  "label",
                  null,
                  _react2.default.createElement("input", {
                    type: "radio",
                    name: "customer_gender",
                    value: "Frau",
                    onClick: function onClick() {
                      return validateForm();
                    },
                    required: !inputCheckbox.shippingAddress
                  }),
                  _react2.default.createElement("span", null),
                  "Frau"
                )
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.customer_gender.msg
              )
            ),
            _react2.default.createElement(
              "label",
              null,
              _react2.default.createElement("input", {
                type: "checkbox",
                name: "customerCompanyName",
                value: "1",
                checked: inputCheckbox.customerCompanyName === true ? "true" : null,
                onClick: changeCheckbox
              }),
              _react2.default.createElement("span", { className: "check" }),
              "Firma"
            )
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: inputCheckbox.customerCompanyName ? "rowInputs" : "rowInputs hide"
          },
          _react2.default.createElement(
            "div",
            { className: "input-wrapper" },
            _react2.default.createElement("input", {
              type: "text",
              name: "customer_companyName",
              className: validateError.customer_companyName.error ? clickBtn === true ? "error purple" : "error" : null,
              placeholder: "Firma",
              onChange: function onChange() {
                return validateForm();
              },
              required: inputCheckbox.customerCompanyName
            }),
            _react2.default.createElement(
              "span",
              { className: "placeholder" },
              "Firma"
            ),
            _react2.default.createElement(
              "span",
              { className: "errorText" },
              validateError.customer_companyName.msg
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "rowInputs-wrapper" },
          _react2.default.createElement(
            "div",
            { className: "rowInputs" /*onChange={changeNameField}*/ },
            _react2.default.createElement(
              "div",
              { className: "input-wrapper adjust-wrapper" },
              _react2.default.createElement("input", {
                type: "text",
                name: "customer_firstname",
                className: validateError.customer_firstname.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Vorname",
                onChange: function onChange() {
                  return validateForm();
                },
                required: !inputCheckbox.shippingAddress
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Vorname"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.customer_firstname.msg
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "input-wrapper" },
              _react2.default.createElement("input", {
                type: "text",
                name: "customer_lastname",
                className: validateError.customer_lastname.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Nachname",
                onChange: function onChange() {
                  return validateForm();
                },
                required: !inputCheckbox.shippingAddress
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Nachname"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.customer_lastname.msg
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "rowInputs-wrapper" },
          _react2.default.createElement(
            "div",
            { className: "rowInputs" },
            _react2.default.createElement(
              "div",
              { className: "input-wrapper adjust-wrapper" },
              _react2.default.createElement("input", {
                type: "email",
                name: "customer_email",
                className: error.info || validateError.customer_email.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "E-Mail",
                onChange: function onChange() {
                  return validateForm();
                },
                required: !inputCheckbox.shippingAddress
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "E-Mail"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                error.info ? error.info : validateError.customer_email.msg !== "" ? validateError.customer_email.msg : ""
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "input-wrapper" },
              _react2.default.createElement("input", {
                type: "tel",
                name: "customer_phone",
                className: validateError.customer_phone.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Telefon (mobil)",
                onChange: function onChange() {
                  return validateForm();
                },
                required: !inputCheckbox.shippingAddress
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Telefon (mobil)"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.customer_phone.msg
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "rowInputs-wrapper" },
          _react2.default.createElement(
            "div",
            { className: "personalDataAddress rowInputs" },
            _react2.default.createElement(
              "div",
              { className: "input-wrapper input-wrapper-lg" },
              _react2.default.createElement("input", {
                type: "text",
                name: "customer_street",
                id: "customer_route",
                className: validateError.customer_street.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Strasse",
                onChange: function onChange() {
                  return validateForm();
                },
                required: !inputCheckbox.shippingAddress
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Strasse"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.customer_street.msg
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "input-wrapper input-wrapper-sm" },
              _react2.default.createElement("input", {
                type: "text",
                name: "customer_number",
                id: "customer_street_number",
                className: validateError.customer_number.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Nr.",
                onChange: function onChange() {
                  return validateForm();
                },
                required: !inputCheckbox.shippingAddress
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Nr."
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.customer_number.msg
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "personalDataCity rowInputs" },
            _react2.default.createElement(
              "div",
              { className: "input-wrapper input-wrapper-sm" },
              _react2.default.createElement("input", {
                type: "text",
                name: "customer_zip",
                className: validateError.customer_zip.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "PLZ",
                id: "customer_postal_code",
                onChange: function onChange() {
                  return validateForm();
                },
                required: !inputCheckbox.shippingAddress
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "PLZ"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.customer_zip.msg
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "input-wrapper input-wrapper-lg" },
              _react2.default.createElement("input", {
                type: "text",
                name: "customer_city",
                className: validateError.customer_city.error ? clickBtn === true ? "error purple" : "error" : null,
                placeholder: "Stadt",
                id: "customer_locality",
                onChange: function onChange() {
                  return validateForm();
                },
                required: !inputCheckbox.shippingAddress
              }),
              _react2.default.createElement(
                "span",
                { className: "placeholder" },
                "Stadt"
              ),
              _react2.default.createElement(
                "span",
                { className: "errorText" },
                validateError.customer_city.msg
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "select" },
          !country.countriesList.some(function (item) {
            return item.value === country.currentCountry.customer_inputCountry.toLowerCase();
          }) && inputCheckbox.shippingAddress !== true && _react2.default.createElement("input", { className: "requiredSelect", type: "text", required: true }),
          _react2.default.createElement(_reactSelect2.default, {
            placeholder: "Ausw\xE4hlen...",
            value: country.currentCountry.customer_inputCountry.toLowerCase(),
            name: "customer_inputCountry",
            clearable: false,
            options: country.countriesList,
            searchable: false,
            onChange: function onChange(val) {
              return changeCountry(val, "customer_inputCountry");
            }
          }),
          _react2.default.createElement(
            "span",
            { className: "placeholder" },
            "Ausw\xE4hlen"
          )
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "basketMobileBottom" },
        payMethodError && payMethodError.status && _react2.default.createElement(
          "div",
          { className: "basketError" },
          _react2.default.createElement("img", {
            loading: "lazy",
            src: "/images/design/warning.svg",
            alt: "",
            style: { marginRight: "10px" }
          }),
          _react2.default.createElement(
            "span",
            null,
            payMethodError.msg
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "text-right button-row" },
          !handlerSendSellBasket && _react2.default.createElement(
            "button",
            {
              type: "button",
              className: isValidate ? "basketSubmit btn button-pulse" : "basketSubmit btn",
              onClick: function onClick() {
                return onClickButton();
              }
            },
            t("basketPage.continue"),
            _react2.default.createElement(
              "span",
              null,
              _react2.default.createElement("img", { loading: "lazy", src: "images/arrow.svg", alt: "" })
            )
          ),
          handlerSendSellBasket && _react2.default.createElement(
            "button",
            {
              type: "submit",
              className: isValidate ? "basketSubmit btn button-pulse" : "basketSubmit btn",
              onSubmit: handlerSendSellBasket
            },
            "Absenden",
            _react2.default.createElement(
              "span",
              null,
              _react2.default.createElement("i", { className: "fa fa-long-arrow-right", "aria-hidden": "true" })
            )
          )
        ),
        window.isMobile && _react2.default.createElement(
          "div",
          { className: "toPaymentWrap" },
          _react2.default.createElement(
            "button",
            {
              className: isValidate ? "btn toPayment button-pulse" : "btn toPayment",
              type: "button",
              onClick: function onClick() {
                return onClickButton();
              }
            },
            t("basketPage.continue"),
            _react2.default.createElement(
              "span",
              null,
              _react2.default.createElement("img", { loading: "lazy", src: "images/arrow.svg", alt: "" })
            )
          )
        )
      )
    )
  );
};

PersonalData.propTypes = {};
PersonalData.defaultProps = {};

exports.default = (0, _reactI18next.withTranslation)()(PersonalData);

/***/ }),

/***/ 1513:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculatePrice = calculatePrice;

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpersFunction = __webpack_require__(316);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductOverview = function ProductOverview(_ref) {
    var basketData = _ref.basketData,
        removeFromBasket = _ref.removeFromBasket,
        couponError = _ref.couponError,
        changeCoupon = _ref.changeCoupon,
        triggerChangeCoupon = _ref.triggerChangeCoupon,
        goToCheckoutMobile = _ref.goToCheckoutMobile;

    var totalPrice = 0;

    function mapBasketData(item, i) {
        if (item.productTypeId == 999) {
            totalPrice += +item.price;
            return _react2.default.createElement(
                'tr',
                { key: i },
                _react2.default.createElement(
                    'td',
                    null,
                    item.note,
                    ' (',
                    item.shortcode,
                    ')'
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'h4',
                        { className: 'price' },
                        (0, _helpersFunction.formatPrice)(item.price),
                        ' ',
                        window.currencyValue
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('span', { onClick: function onClick() {
                            return removeFromBasket(item.productTypeId, item.shortcode);
                        }, className: 'removeFromBasket' })
                )
            );
        } else {
            var mapCriterias = function mapCriterias() {
                var elementsArray = [];

                var _loop = function _loop(answer) {
                    if (answer !== 'image' && answer !== 'Device' && answer !== 'Defects' && answer !== 'Submodel' && answer !== 'Model' && answer !== 'Brand' && answer !== 'id' && answer !== 'comment') {
                        var name = answer === 'Condition' ? 'Allgemeiner Zustand' : answer;
                        elementsArray.push(_react2.default.createElement(
                            'li',
                            { key: answer },
                            _react2.default.createElement(
                                'strong',
                                null,
                                name,
                                ':'
                            ),
                            ' ',
                            item[answer].map(function (value, i) {
                                return _react2.default.createElement(
                                    'span',
                                    { key: i },
                                    value.name,
                                    i !== item[answer].length - 1 ? ', ' : null
                                );
                            })
                        ));
                    }
                };

                for (var answer in item) {
                    _loop(answer);
                }
                return elementsArray;
            };

            item.id = i;
            totalPrice += calculatePrice(item).price;

            return _react2.default.createElement(
                'tr',
                { className: 'itemBasketDataVerkaufen', key: i },
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'h4',
                        null,
                        item.Model[0].name,
                        ' ',
                        item.Model[0].nameExt ? ' (' + item.Model[0].nameExt + ')' : null
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'wrapCriterias' },
                        _react2.default.createElement('img', { loading: 'lazy', src: item.image }),
                        _react2.default.createElement(
                            'ul',
                            null,
                            ' ',
                            mapCriterias(),
                            ' '
                        )
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'p',
                        { className: 'price discount-price' },
                        (0, _helpersFunction.formatPrice)(calculatePrice(item).price),
                        ' ',
                        window.currencyValue
                    ),
                    calculatePrice(item).oldPrice > 0 && _react2.default.createElement(
                        'p',
                        { className: 'price old-price' },
                        (0, _helpersFunction.formatPrice)(calculatePrice(item).oldPrice),
                        ' ',
                        window.currencyValue
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('span', { onClick: function onClick() {
                            return removeFromBasket(null, item.id);
                        }, className: 'removeFromBasket' })
                )
            );
        }
    }
    return _react2.default.createElement(
        'div',
        { className: 'col-md-5 productWrap' },
        _react2.default.createElement(
            'h3',
            { className: 'title' },
            'Verkaufs\xFCbersicht'
        ),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'table',
                    { className: 'verkaufenBasket' },
                    _react2.default.createElement(
                        'tbody',
                        null,
                        basketData.map(mapBasketData)
                    )
                ),
                totalPrice > 0 && _react2.default.createElement(
                    'div',
                    { className: 'total clearfix' },
                    _react2.default.createElement(
                        'p',
                        { className: 'col-xs-6 title' },
                        'Total gesch\xE4tzter Preis:'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'col-xs-6 priceTotal' },
                        (0, _helpersFunction.formatPrice)(totalPrice),
                        ' ',
                        window.currencyValue
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'commentField' },
                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/medical.svg' }),
                _react2.default.createElement(
                    'label',
                    null,
                    'Notizen'
                ),
                _react2.default.createElement('textarea', { name: 'comment', rows: '2', placeholder: 'Notiz / Spezielle Anmerkungen', style: { marginTop: '13px' } })
            ),
            _react2.default.createElement(
                'div',
                { className: 'couponField' },
                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/gift.svg' }),
                _react2.default.createElement(
                    'label',
                    null,
                    'Gutschein-Code eingeben'
                ),
                _react2.default.createElement('input', { type: 'text',
                    style: { display: 'block', padding: '13px 113px 13px 16px', marginTop: '13px' },
                    className: couponError ? 'errorInput' : '',
                    name: 'coupon',
                    id: 'input_coupon',
                    placeholder: 'Code eingeben' }),
                _react2.default.createElement(
                    'button',
                    { type: 'button', className: 'couponButton btn', onClick: triggerChangeCoupon },
                    'einl\xF6sen'
                ),
                couponError && _react2.default.createElement(
                    'span',
                    { className: 'errorText' },
                    couponError
                )
            )
        ),
        window.isMobile && _react2.default.createElement(
            'div',
            { className: 'btn basketToCheckout mobileFixedBtn',
                onClick: goToCheckoutMobile },
            'Zur Kasse'
        )
    );
};

ProductOverview.propTypes = {};
ProductOverview.defaultProps = {};

exports.default = ProductOverview;
function calculatePrice(userAnswers) {
    var minPrice = +userAnswers.Model[0].minPrice,
        total = 0,
        oldPrice = 0;
    for (var key in userAnswers) {
        if (key === 'Defects') {
            userAnswers[key].forEach(function (item) {
                return total += +item.price;
            });
        } else if (key !== 'Brand' && key !== 'Submodel' && key !== 'image' && key !== 'Device' && key !== 'Condition' && key !== 'id' && key !== 'comment') {
            if (key === 'Model') {
                userAnswers[key].forEach(function (item) {
                    total += +item.price;
                });
            } else {
                userAnswers[key].forEach(function (item) {
                    var modelPrice = +userAnswers.Model[0].price,
                        itemPrice = +item.valuePrice.replace(/[^0-9.]/g, ""),
                        newPrice = 0,
                        isPersantage = item.valuePrice.includes('%'),
                        isNegative = item.valuePrice.includes('-');
                    if (isPersantage) {
                        newPrice = Math.ceil(modelPrice * (itemPrice / 100) / 5) * 5;
                        if (isNegative) {
                            total -= newPrice;
                        } else {
                            total += newPrice;
                        }
                    } else {
                        if (isNegative) {
                            total -= itemPrice;
                        } else {
                            total += itemPrice;
                        }
                    }
                });
            }
        }
    }
    if (total < minPrice) total = minPrice;
    oldPrice = total;
    if (userAnswers.Model[0].discountPrice > 0) total += +userAnswers.Model[0].discountPrice;
    if (oldPrice === total) oldPrice = 0;
    oldPrice = Math.round(oldPrice / 5) * 5;
    total = Math.round(total / 5) * 5;

    return { price: total, oldPrice: oldPrice };
}

/***/ }),

/***/ 1711:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShowResults = undefined;

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

var _debounce2 = __webpack_require__(899);

var _debounce3 = _interopRequireDefault(_debounce2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactAnimatedCss = __webpack_require__(953);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _basket = __webpack_require__(327);

var basketActions = _interopRequireWildcard(_basket);

var _user = __webpack_require__(217);

var userActions = _interopRequireWildcard(_user);

var _helpersFunction = __webpack_require__(316);

var _sendLinkMobile = __webpack_require__(1712);

var _sendLinkMobile2 = _interopRequireDefault(_sendLinkMobile);

var _sendLinks = __webpack_require__(1713);

var _sendLinks2 = _interopRequireDefault(_sendLinks);

var _showResultsPersonalData = __webpack_require__(1714);

var _showResultsPersonalData2 = _interopRequireDefault(_showResultsPersonalData);

var _bringToShop = __webpack_require__(1715);

var _bringToShop2 = _interopRequireDefault(_bringToShop);

var _pickupByBicycle = __webpack_require__(1716);

var _pickupByBicycle2 = _interopRequireDefault(_pickupByBicycle);

var _pickupByPackage = __webpack_require__(1717);

var _pickupByPackage2 = _interopRequireDefault(_pickupByPackage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowResults = exports.ShowResults = function (_Component) {
    (0, _inherits3.default)(ShowResults, _Component);

    function ShowResults(props) {
        (0, _classCallCheck3.default)(this, ShowResults);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ShowResults.__proto__ || Object.getPrototypeOf(ShowResults)).call(this, props));

        _this._gtag_report_conversion_by_postal = function (url) {
            var callback = function callback() {
                if (typeof url != 'undefined') {
                    window.location = url;
                }
            };
            var price = JSON.parse(window.localStorage.getItem('PDFData')).totalPrice;
            gtag('event', 'conversion', { 'send_to': 'AW-827036726/CBjWCIaAqscBELaorooD', 'value': price, 'currency': 'CHF' });
            return false;
        };

        _this.state = {
            country: {
                countriesList: [],
                currentCountry: {
                    inputCountry: "CH",
                    customer_inputCountry: "CH"
                }
            },
            inputCheckbox: {
                shippingAddress: true,
                company: false,
                customerCompanyName: false,
                agree: false,
                asGuest: false
            },
            coupon: {
                couponError: null,
                couponPrice: null,
                couponShortcode: null,
                isCoupon: false
            },
            errors: {
                password: '',
                info: '',
                general: ''
            },
            currentTab: '',
            pdfUrl: '',
            showOldPrice: false,
            summaryTabContent: 'generalInfo',
            uidNumberField: '',
            place: {},
            defineTypeElem: 0
        };

        _this._calculatePrice = _this._calculatePrice.bind(_this);
        _this._mapCriterias = _this._mapCriterias.bind(_this);
        _this._setPersonalDataFields = _this._setPersonalDataFields.bind(_this);
        _this._getPersonalDataFields = _this._getPersonalDataFields.bind(_this);
        _this.changeCountry = _this.changeCountry.bind(_this);
        _this.changeCheckbox = _this.changeCheckbox.bind(_this);
        _this.changeForm = _this.changeForm.bind(_this);
        _this.handleClickMobileBtn = _this.handleClickMobileBtn.bind(_this);
        _this.send = _this.send.bind(_this);
        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        _this.changeCoupon = _this.changeCoupon.bind(_this);
        _this.addToBasket = _this.addToBasket.bind(_this);
        _this.saveAndBackToSellProcess = _this.saveAndBackToSellProcess.bind(_this);
        _this.changeSummaryTabContent = _this.changeSummaryTabContent.bind(_this);
        _this._gtag_report_conversion = _this._gtag_report_conversion.bind(_this);
        _this.handlerChangeInput = _this.handlerChangeInput.bind(_this);
        _this.loginFormMobile = _this.loginFormMobile.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ShowResults, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.inputCouponCallback = (0, _debounce3.default)(function (e) {
                var _this2 = this;

                var email = document.forms.basketForm.email.value,
                    shippingAddress = this.state.inputCheckbox.shippingAddress;

                _axios2.default.get('/api/checkCoupon?coupon=' + e.target.value + '&email=' + email + '&shippingAddress=' + shippingAddress + '&couponType=6').then(function (data) {
                    if (!_this2.state.coupon.isCoupon) {
                        e.target.value = '';
                        document.getElementById('coupon').checked = false;
                        _this2.setState({
                            coupon: (0, _extends3.default)({}, _this2.state.coupon, {
                                isCoupon: true,
                                data: data.data,
                                couponShortcode: data.data.shortcode,
                                showOldPrice: false,
                                couponPrice: +data.data.price
                            })
                        });
                    } else {
                        _this2.setState({ coupon: (0, _extends3.default)({}, _this2.state.coupon, { couponError: 'Guteschein wurde bereits benutzt' }) });
                    }
                }).catch(function (error) {
                    var data = error.response.data;

                    _this2.setState({ coupon: (0, _extends3.default)({}, _this2.state.coupon, { couponError: data }) });
                });
            }, 1000);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.chooseSummaryTab == 'generalInfo') {
                this.changeSummaryTabContent('generalInfo');
            }
            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === false) {
                var inputs = document.querySelectorAll('.personalData input');
                inputs.forEach(function (item) {
                    item.value = "";
                    item.checked = false;
                });
                var inputCheckbox = this.state.inputCheckbox;

                inputCheckbox.company = false;
                this.setState({ inputCheckbox: inputCheckbox });
            }
            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === true) {
                this.setState({ errors: (0, _extends3.default)({}, this.state.errors, { info: '' }) });
            }
            if (nextProps.user.data !== this.props.user.data && nextProps.user.data) {
                window.localStorage.removeItem("userDataVerkaufen");
                window.localStorage.removeItem("userData");
                this._setPersonalDataFields(nextProps.user.data);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $('#intercom-container .intercom-launcher-frame').attr('style', 'bottom:20px !important');
            $('#tidio-chat #tidio-chat-iframe').css({
                bottom: "-10px",
                right: "10px"
            });
            $('body .fixedBtnVerkaufenResult').remove();
            document.querySelector('body').removeEventListener("keyup", this.handleKeyPress, { passive: true });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            if (!window.isMobile) {
                $("#myModalResult").modal();
            } else {
                $('body .verkaufenQuestion').remove();
                this.props.setTitle && this.props.setTitle('<span class="count">1/3</span> Zusammenfassung');
                if ($('#intercom-container').length > 0) {
                    $('#intercom-container .intercom-launcher-frame').removeAttr('style');
                    $('#intercom-container').before('<div class="fixedBtnVerkaufenResult summary"></div>');
                }
                if ($('#tidio-chat').length > 0) {
                    $('#tidio-chat').before('<div class="fixedBtnVerkaufenResult summary"></div>');
                } else $('body').append('<div class="fixedBtnVerkaufenResult summary"></div>');
            }

            $('.nav-pills a').on('click', function (e) {
                return e.preventDefault();
            });
            if (this.props.user.isLogin && this.props.user.data) {
                this._setPersonalDataFields(this.props.user.data);
            } else {
                var personalData = JSON.parse(window.localStorage.getItem('userDataVerkaufen'));
                if (personalData) this._setPersonalDataFields(personalData);
            }
            /*
            axios.get('/api/countries')
                .then(({data}) => {
                    if(window.isGoogleConnection) {
                        _googleAutocomplete.call(this, data.meta.domainId, 'userDataVerkaufen')
                    }
                    let countriesList = data.data.map(item => {
                        return {value: item['name-short'], label: item['name-de']}
                    })
                    this.setState({country: {...this.state.country, countriesList}})
                })
            */
            var remarketDomainId = 2;
            var countriesList = [{ value: 'ch', label: 'Schweiz' }, { value: 'li', label: 'Liechtenstein' }];
            this.setState({ country: (0, _extends3.default)({}, this.state.country, { countriesList: countriesList }) });
            if (window.isGoogleConnection) {
                _helpersFunction._googleAutocomplete.call(this, remarketDomainId, 'userDataVerkaufen');
            }

            document.querySelector('body').addEventListener("keyup", this.handleKeyPress);
            if (this.props.showInstructions) {
                $('.nav-pills a[href="#instructions"]').tab('show');
                this.setState({ pdfUrl: this.props.pdfUrl, currentTab: 'instructions' });
                this._gtag_report_conversion_by_postal();

                this._gapi_load_surveyoptin();
            }
            setTimeout(function () {
                return _this3.setState({ showOldPrice: true });
            }, 1500);
        }
    }, {
        key: '_gapi_load_surveyoptin',
        value: function _gapi_load_surveyoptin() {
            var email = window.localStorage.getItem("email");
            var order = window.localStorage.getItem("order");
            var loggedUserData = JSON.parse(window.localStorage.getItem("loggedUserData"));
            var userData = JSON.parse(window.localStorage.getItem("userDataVerkaufen"));
            var user = {};
            if (loggedUserData && loggedUserData.shippingAddress) {
                user.country = loggedUserData.shippingAddress.inputCountry;
            } else if (userData && userData.shippingAddress) {
                user.country = userData.shippingAddress.inputCountry;
            } else {
                return;
            }
            var now = new Date();
            var deliveryDuration = 2;
            if ([5, 6, 0].includes(now.getDay())) {
                deliveryDuration = 3;
            }
            var estimated_delivery_date = new Date(now.setDate(now.getDate() + deliveryDuration)).toISOString().substring(0, 10);
            if (typeof window.gapi !== 'undefined') {
                window.gapi.load('surveyoptin', function () {
                    window.gapi.surveyoptin.render({
                        // REQUIRED FIELDS
                        "merchant_id": 120090380,
                        "order_id": order,
                        "email": email,
                        "delivery_country": user.country,
                        "estimated_delivery_date": estimated_delivery_date

                    });
                });
            }
        }
    }, {
        key: '_gtag_report_conversion',
        value: function _gtag_report_conversion(url) {
            var callback = function callback() {
                if (typeof url != 'undefined') {
                    window.location = url;
                }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-782352579/CBjWCIaAqscBELaorooD', 'value': this._calculatePrice().price, 'currency': 'CHF',
                'event_callback': callback
            });
            return false;
        }
    }, {
        key: 'handlerChangeInput',
        value: function handlerChangeInput(e) {
            this.setState({ uidNumberField: e.target.value });
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(e) {
            if (e.key === "Escape") {
                if (($("#modalAGBReg").data('bs.modal') || {}).isShown) {
                    $('#modalAGBReg').modal('hide');
                } else {
                    $('#myModalResult').modal('hide');
                    this.props.closeShowResults(this.state.currentTab, this.state.inputCheckbox.asGuest);
                }
            }
        }
    }, {
        key: '_setPersonalDataFields',
        value: function _setPersonalDataFields(data) {
            var shippingAddressForm = document.forms.basketForm,
                _state = this.state,
                country = _state.country,
                inputCheckbox = _state.inputCheckbox,
                uidNumberField = _state.uidNumberField;

            if (shippingAddressForm) {
                for (var key in data.billingAddress) {
                    if (key === 'customer_inputCountry') {
                        country.currentCountry.customer_inputCountry = data.billingAddress[key];
                    } else if (key === 'customer_companyName') {
                        if (data.billingAddress[key]) {
                            inputCheckbox.customerCompanyName = true;
                            shippingAddressForm[key].value = data.billingAddress[key];
                        } else {
                            inputCheckbox.customerCompanyName = false;
                            shippingAddressForm[key].value = data.billingAddress[key];
                        }
                    } else if (shippingAddressForm[key]) shippingAddressForm[key].value = data.billingAddress[key];
                }
                for (var _key in data.shippingAddress) {
                    if (_key === 'inputCountry') {
                        country.currentCountry.inputCountry = data.shippingAddress[_key];
                    } else if (_key === 'companyName') {
                        if (data.shippingAddress[_key]) {
                            inputCheckbox.company = true;
                            shippingAddressForm[_key].value = data.shippingAddress[_key];
                        } else {
                            inputCheckbox.company = false;
                            shippingAddressForm[_key].value = data.shippingAddress[_key];
                        }
                    } else if (_key === 'vat') {
                        uidNumberField = data.shippingAddress[_key];
                    } else if (shippingAddressForm[_key]) shippingAddressForm[_key].value = data.shippingAddress[_key];
                }
            }
            this.setState({
                country: country, inputCheckbox: inputCheckbox, uidNumberField: uidNumberField,
                autoloadPersonalData: (0, _extends3.default)({}, this.state.autoloadPersonalData, { element: null, data: null })
            });
        }
    }, {
        key: '_getPersonalDataFields',
        value: function _getPersonalDataFields() {
            var form = document.forms.basketForm,
                data = {};
            if (form) {
                data.shippingAddress = {
                    city: form.city.value,
                    companyName: form.companyName.value,
                    vat: form.companyUidNumber.value,
                    email: form.email.value,
                    firstname: form.firstname.value,
                    gender: form.gender.value,
                    inputCountry: form.inputCountry && form.inputCountry.value,
                    lastname: form.lastname.value,
                    number: form.number.value,
                    phone: form.phone.value,
                    street: form.street.value,
                    zip: form.zip.value
                };
                data.billingAddress = {
                    customer_city: form.city.value,
                    customer_companyName: form.companyName.value,
                    customer_email: form.email.value,
                    customer_firstname: form.firstname.value,
                    customer_gender: form.gender.value,
                    customer_inputCountry: form.customer_inputCountry && form.customer_inputCountry.value,
                    customer_lastname: form.lastname.value,
                    customer_number: form.number.value,
                    customer_phone: form.phone.value,
                    customer_street: form.street.value,
                    customer_zip: form.zip.value
                };
            }
            return data;
        }
    }, {
        key: 'changeCountry',
        value: function changeCountry(val, name) {
            var value = val.value,
                currentCountry = this.state.country.currentCountry;

            currentCountry[name] = value;
            this.setState({ country: (0, _extends3.default)({}, this.state.country, { currentCountry: currentCountry }) });
        }
    }, {
        key: 'changeCoupon',
        value: function changeCoupon(e) {
            this.setState({ coupon: (0, _extends3.default)({}, this.state.coupon, { couponError: null }) });
            e.persist();
            this.inputCouponCallback(e);
        }
    }, {
        key: 'addToBasket',
        value: function addToBasket(e) {
            var userAnswers = this.props.userAnswers,
                data = [];

            if (this.state.coupon.isCoupon) data = [userAnswers, this.state.coupon.data];else data.push(userAnswers);
            this.props.addToBasketVerkaufen(e, data);
        }
    }, {
        key: 'saveAndBackToSellProcess',
        value: function saveAndBackToSellProcess(e) {
            this.props.addToBasketVerkaufen(e, [this.props.userAnswers], true);
            this.props.handlerBack && this.props.handlerBack();
        }
    }, {
        key: 'changeCheckbox',
        value: function changeCheckbox(e) {
            var inputCheckbox = this.state.inputCheckbox,
                name = e.target.name;

            inputCheckbox[name] = !inputCheckbox[name];
            this.setState({ inputCheckbox: inputCheckbox });
        }
    }, {
        key: 'changeForm',
        value: function changeForm() {
            var personalData = this._getPersonalDataFields();
            window.localStorage.setItem('userDataVerkaufen', JSON.stringify(personalData));
            this.setState({ errors: (0, _extends3.default)({}, this.state.errors, { info: '', password: '', general: '' }) });
        }
    }, {
        key: 'cancelSendByEnter',
        value: function cancelSendByEnter(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                return false;
            }
        }
    }, {
        key: 'send',
        value: function send(e) {
            var _this4 = this;

            e.preventDefault();
            if (this.state.inputCheckbox.agree) {
                var data = new FormData(document.forms.basketForm),
                    basketData = [].concat((0, _toConsumableArray3.default)(this.props.basket.basketDataVerkaufen), [this.props.userAnswers]);

                if (this.state.coupon.isCoupon) basketData.push(this.state.coupon.data);
                data.append("basketData", JSON.stringify(basketData));
                document.getElementById('spinner-box-load').style.display = 'block';
                _axios2.default.post('/api/basketPayout', data).then(function (result) {
                    window.localStorage.removeItem('basketDataVerkaufen');
                    _this4.props.basketActions.changeBasketVerkaufenData([]);

                    document.getElementById('spinner-box-load').style.display = 'none';
                    $('.nav-pills a[href="#instructions"]').tab('show');

                    if (window.isMobile) {
                        $('.buttonsForMobile .sendForm').css({ display: 'none' });
                        $('.buttonsForMobile .estimatePrice').css({ display: 'block' });
                        _this4.props.setTitle && _this4.props.setTitle('<span class="count">3/3</span> Anleitung');
                        _this4.props.setStep && _this4.props.setStep('instructions');
                        _this4.props.setIsGuest && _this4.props.setIsGuest(_this4.state.inputCheckbox.asGuest);
                    }

                    _this4.setState({ pdfUrl: result.data[0].PDFPath, currentTab: 'instructions' });
                    if (window.isGoogleConnection) {
                        // this._gtag_report_conversion() //google adwords
                    }
                    if (window.isFBConnection) {
                        fbq('track', 'CompleteRegistration', { value: result.data[0].PDFData.totalPrice, currency: window.currencyValue }); // facebook pixel
                    }
                }).catch(function (error) {
                    var err = error.response.data.errors,
                        info = void 0,
                        password = void 0,
                        general = void 0;
                    if (err) {
                        err.email ? info = err.email : '';
                        err.password ? password = err.password : '';
                        err.general ? general = err.general : '';
                    }
                    _this4.setState({ errors: (0, _extends3.default)({}, _this4.state.errors, { info: info, password: password, general: general }) });
                    document.getElementById('spinner-box-load').style.display = 'none';
                });
            }
        }
    }, {
        key: 'handleClickMobileBtn',
        value: function handleClickMobileBtn(e) {
            var name = e.target.getAttribute('data-name');
            if (name === 'summary') {
                $('.nav-pills a[href="#form"]').tab('show');
                this.props.setTitle && this.props.setTitle('<span class="count">2/3</span> Persönliche Angaben');
                this.props.setStep && this.props.setStep('form');
                $('.buttonsForMobile .sendForm').css({ display: 'block' });
                $('.buttonsForMobile .summary').css({ display: 'none' });
                $('.fixedBtnVerkaufenResult').removeClass('summary');
            } else if (name === 'form') $("#form button[type='submit']").click();
        }
    }, {
        key: '_calculatePrice',
        value: function _calculatePrice() {
            var userAnswers = this.props.userAnswers,
                minPrice = +userAnswers.Model[0].minPrice,
                total = 0,
                oldPrice = 0;

            for (var key in userAnswers) {
                if (key === 'Defects') {
                    userAnswers[key].forEach(function (item) {
                        return total += +item.price;
                    });
                } else if (key !== 'Brand' && key !== 'Submodel' && key !== 'image' && key !== 'Device' && key !== 'Condition' && key !== 'comment') {
                    if (key === 'Model') {
                        userAnswers[key].forEach(function (item) {
                            total += +item.price;
                        });
                    } else {
                        userAnswers[key].forEach(function (item) {
                            var modelPrice = +userAnswers.Model[0].price,
                                itemPrice = +item.valuePrice.replace(/[^0-9.]/g, ""),
                                newPrice = 0,
                                isPersantage = item.valuePrice.includes('%'),
                                isNegative = item.valuePrice.includes('-');
                            if (isPersantage) {
                                newPrice = Math.ceil(modelPrice * (itemPrice / 100) / 5) * 5;
                                if (isNegative) {
                                    total -= newPrice;
                                } else {
                                    total += newPrice;
                                }
                            } else {
                                if (isNegative) {
                                    total -= itemPrice;
                                } else {
                                    total += itemPrice;
                                }
                            }
                        });
                    }
                }
            }
            if (total < minPrice) total = minPrice;
            oldPrice = total;
            if (this.state.coupon.isCoupon) total += +this.state.coupon.couponPrice;
            if (userAnswers.Model[0].discountPrice > 0) total += +userAnswers.Model[0].discountPrice;
            if (oldPrice === total) oldPrice = 0;
            oldPrice = Math.round(oldPrice / 5) * 5;
            total = Math.round(total / 5) * 5;
            return { price: total || 0, oldPrice: oldPrice || 0 };
        }
    }, {
        key: '_mapCriterias',
        value: function _mapCriterias() {
            var userAnswers = this.props.userAnswers,
                elementsArray = [];

            var _loop = function _loop(answer) {
                var titleName = '',
                    className = !window.isMobile ? "col-xs-4 itemAnswer" : "col-xs-6 itemAnswer";
                switch (answer) {
                    case 'Brand':
                        titleName = 'Marke';
                        break;
                    case 'Submodel':
                        titleName = 'Untermodell';
                        break;
                    case 'Model':
                        titleName = 'Modell';
                        break;
                    case 'Condition':
                        titleName = 'Allgemeiner Zustand';
                        break;
                    case 'Defects':
                        titleName = 'Liste der Defekte';
                        break;
                    default:
                        titleName = answer;
                }
                if (answer !== 'image' && answer !== 'Device' && answer !== 'Defects' && answer !== 'comment') {
                    elementsArray.push(_react2.default.createElement(
                        'div',
                        { className: className, key: answer },
                        _react2.default.createElement(
                            'p',
                            { className: 'title' },
                            titleName
                        ),
                        _react2.default.createElement(
                            'ul',
                            null,
                            userAnswers[answer].map(function (item, i) {
                                return _react2.default.createElement(
                                    'li',
                                    { key: i },
                                    item.name,
                                    ' ',
                                    item.nameExt ? ' (' + item.nameExt + ')' : null,
                                    !item.hasOwnProperty('colorCode') && answer !== 'Model' && item.image && _react2.default.createElement('img', { loading: 'lazy', src: item.image }),
                                    item.colorCode && _react2.default.createElement('span', { className: 'colorPic', style: { backgroundColor: item.colorCode } })
                                );
                            }),
                            userAnswers[answer].length === 0 && _react2.default.createElement(
                                'li',
                                null,
                                '-'
                            )
                        )
                    ));
                }
                if (answer === 'Defects') {
                    elementsArray.push(_react2.default.createElement(
                        'div',
                        { className: className, key: answer },
                        _react2.default.createElement(
                            'p',
                            { className: 'title' },
                            titleName
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            userAnswers[answer].map(function (item, i) {
                                return _react2.default.createElement(
                                    'span',
                                    {
                                        key: i },
                                    item['description-short'],
                                    i < userAnswers[answer].length - 1 ? ', ' : null
                                );
                            })
                        )
                    ));
                }
            };

            for (var answer in userAnswers) {
                _loop(answer);
            }
            //wrap in row class
            var groupSize = !window.isMobile ? 3 : 2;
            var rows = elementsArray.reduce(function (r, element, index) {
                index % groupSize === 0 && r.push([]);
                r[r.length - 1].push(element);
                return r;
            }, []).map(function (rowContent, i) {
                return _react2.default.createElement(
                    'div',
                    { className: 'row', key: i },
                    rowContent
                );
            });
            return rows;
        }
    }, {
        key: 'changeSummaryTabContent',
        value: function changeSummaryTabContent(value, place) {
            if (value == 'generalInfo' && window.isMobile) {
                this.props.handleClearSummaryTab();
            }
            this.setState({
                summaryTabContent: value,
                place: place
            });
        }
    }, {
        key: 'showLoginForm',
        value: function showLoginForm() {

            this.setState({
                showLoginForm: true,
                defineTypeElem: this.state.defineTypeElem + 1
            });
        }
    }, {
        key: '_loadPersonalData',
        value: function _loadPersonalData(token) {
            var _this5 = this;

            if (token) {
                _axios2.default.get('/api/customerAgileData').then(function (data) {
                    document.getElementById('spinner-box-load').style.display = 'none';
                    if (data.status === 200) {
                        _this5.props.userActions.loginSuccess(data.data);
                    }
                }).catch(function (error) {});
            }
        }
    }, {
        key: 'loginFormMobile',
        value: function loginFormMobile(e) {
            var _this6 = this;

            e.preventDefault();
            var url = '/api/login';
            var data = new FormData(document.forms.loginFormMobile);
            document.getElementById('spinner-box-load').style.display = 'block';
            _axios2.default.post(url, data).then(function (result) {
                if (result.statusText !== "OK") {
                    document.getElementById('spinner-box-load').style.display = 'none';
                    var errorLogin = _this6.state.errorLogin;

                    errorLogin[result.data.field] = result.data.message;
                    if (result.data.resendActivationLink) errorLogin.resendActivationLink = result.data.resendActivationLink;
                    _this6.setState({ errorLogin: errorLogin });
                } else {
                    window.localStorage.setItem("token", result.data.token);
                    window.axios.defaults.headers.common['Authorization-Token'] = result.data.token;
                    _this6._loadPersonalData(result.data.token);
                }
            }).catch(function (error) {

                document.getElementById('spinner-box-load').style.display = 'none';
                var err = error.response.data.errors,
                    login = void 0,
                    password = void 0;
                if (err) {
                    err.login ? login = err.login[0] : '';
                    err.password ? password = err.password[0] : '';
                }

                _this6.setState({ errorLogin: (0, _extends3.default)({}, _this6.state.errorLogin, { login: login, password: password }), spinner: null });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            $('#tidio-chat #tidio-chat-iframe').show();

            var _props = this.props,
                userAnswers = _props.userAnswers,
                changeComment = _props.changeComment,
                closeShowResults = _props.closeShowResults,
                user = _props.user,
                _state2 = this.state,
                country = _state2.country,
                inputCheckbox = _state2.inputCheckbox,
                errors = _state2.errors,
                currentTab = _state2.currentTab,
                coupon = _state2.coupon,
                summaryTabContent = _state2.summaryTabContent,
                uidNumberField = _state2.uidNumberField,
                place = _state2.place,
                defineTypeElem = _state2.defineTypeElem,
                showLoginForm = _state2.showLoginForm,
                price = 0,
                showAddCoupon = this.props.basket.basketDataVerkaufen.every(function (item) {
                return item.productTypeId != 999;
            }),
                places = JSON.parse(window.localStorage.getItem("locationData"));


            if (!this.props.showInstructions) price = this._calculatePrice();
            return _react2.default.createElement(
                'div',
                { className: 'resultSellPage' },
                _react2.default.createElement(
                    'div',
                    { id: 'myModalResult', className: 'modal fade bs-example-modal-lg', 'data-backdrop': 'static', role: 'dialog',
                        'aria-labelledby': 'myLargeModalLabel' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-dialog modal-lg modal-sell-result', role: 'document' },
                        _react2.default.createElement('button', { type: 'button', className: 'closeModal',
                            onClick: function onClick() {
                                return closeShowResults(currentTab, inputCheckbox.asGuest);
                            },
                            'data-dismiss': 'modal',
                            'aria-label': 'Close' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-content' },
                            _react2.default.createElement(
                                'div',
                                { className: 'tabs' },
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'nav nav-pills nav-justified', role: 'tablist' },
                                    _react2.default.createElement(
                                        'li',
                                        { role: 'presentation', className: 'active' },
                                        _react2.default.createElement(
                                            'a',
                                            { href: '#summary', 'aria-controls': 'home', role: 'tab' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'num' },
                                                '1'
                                            ),
                                            'Zusammenfassung'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { role: 'presentation' },
                                        _react2.default.createElement(
                                            'a',
                                            { href: '#form', 'aria-controls': 'profile', role: 'tab' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'num' },
                                                '2'
                                            ),
                                            'Pers\xF6nliche Angaben'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { role: 'presentation' },
                                        _react2.default.createElement(
                                            'a',
                                            { href: '#instructions', 'aria-controls': 'messages', role: 'tab' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'num' },
                                                '3'
                                            ),
                                            'Anleitung'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tab-content' },
                                    userAnswers && _react2.default.createElement(
                                        'div',
                                        { role: 'tabpanel', className: 'tab-pane active', id: 'summary' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'clearfix' },
                                            summaryTabContent !== 'chooseLocation' && _react2.default.createElement(
                                                'div',
                                                {
                                                    className: 'col-sm-4 clearfix topMobile' },
                                                summaryTabContent === 'bringToShop' && !window.isMobile && _react2.default.createElement(
                                                    'div',
                                                    { className: 'bring-to-shop__backButton',
                                                        onClick: function onClick() {
                                                            return _this7.changeSummaryTabContent('generalInfo');
                                                        } },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'bring-to-shop__backButton-btn' },
                                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/arrow-back.svg', alt: 'ZUR\xDCCK' })
                                                    ),
                                                    _react2.default.createElement(
                                                        'span',
                                                        null,
                                                        'ZUR\xDCCK'
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'information-block' },
                                                    _react2.default.createElement(
                                                        'h3',
                                                        { className: 'title' },
                                                        'Information'
                                                    ),
                                                    _react2.default.createElement(
                                                        'p',
                                                        null,
                                                        'Gerne k\xF6nnen Sie bei uns im Ladenlokal das Ger\xE4t verkaufen oder kostenlos uns per Post zusenden.'
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image col-xs-12  text-center' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: userAnswers.image, alt: '' })
                                                ),
                                                _react2.default.createElement('div', { className: 'clearfix' }),
                                                _react2.default.createElement(
                                                    _reactAnimatedCss.Animated,
                                                    { animationIn: 'zoomIn', animationInDelay: 3 },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'price col-xs-12 animated zoomIn' },
                                                        _react2.default.createElement(
                                                            'p',
                                                            { className: 'title' },
                                                            'Ihr Preis'
                                                        ),
                                                        _react2.default.createElement(
                                                            'p',
                                                            { className: price.oldPrice > 0 && this.state.showOldPrice ? 'oldPrice value' : 'value' },
                                                            price.oldPrice > 0 ? (0, _helpersFunction.formatPrice)(price.oldPrice) : (0, _helpersFunction.formatPrice)(price.price),
                                                            ' ',
                                                            window.currencyValue
                                                        ),
                                                        price.oldPrice > 0 && this.state.showOldPrice && _react2.default.createElement(
                                                            _reactAnimatedCss.Animated,
                                                            { animationIn: 'bounceIn', animationInDelay: 1000 },
                                                            _react2.default.createElement(
                                                                'div',
                                                                null,
                                                                _react2.default.createElement(
                                                                    'p',
                                                                    { className: 'value' },
                                                                    (0, _helpersFunction.formatPrice)(price.price),
                                                                    ' ',
                                                                    window.currencyValue
                                                                ),
                                                                coupon.isCoupon && _react2.default.createElement(
                                                                    'p',
                                                                    { className: 'couponInfo' },
                                                                    _react2.default.createElement('span', {
                                                                        className: 'circleOk' }),
                                                                    'Gutschein ',
                                                                    coupon.couponShortcode,
                                                                    ' wurde eingel\xF6st'
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: summaryTabContent !== 'chooseLocation' ? "col-sm-8" : "col-md-12" },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'row' },
                                                    summaryTabContent === 'generalInfo' && _react2.default.createElement(
                                                        'div',
                                                        null,
                                                        _react2.default.createElement(
                                                            'div',
                                                            { className: 'wrapAnswers clearfix' },
                                                            this._mapCriterias()
                                                        ),
                                                        _react2.default.createElement(
                                                            'div',
                                                            { className: 'comment' },
                                                            _react2.default.createElement('textarea', { style: { width: '100%' },
                                                                name: 'comment', rows: '2',
                                                                placeholder: 'Kommentar zu diesem Ger\xE4t hinzuf\xFCgen (optional)',
                                                                onChange: changeComment })
                                                        )
                                                    ),
                                                    summaryTabContent === 'chooseLocation' && _react2.default.createElement(
                                                        'div',
                                                        { className: 'chooseLocation', id: 'chooseLocationTab' },
                                                        !window.isMobile && _react2.default.createElement(
                                                            'div',
                                                            { className: 'backButton',
                                                                onClick: function onClick() {
                                                                    return _this7.changeSummaryTabContent('generalInfo');
                                                                } },
                                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/arrow-back.svg', alt: '' })
                                                        ),
                                                        !window.isMobile && _react2.default.createElement(
                                                            'div',
                                                            { className: 'back' },
                                                            _react2.default.createElement(
                                                                'span',
                                                                null,
                                                                'Zur\xFCck'
                                                            )
                                                        ),
                                                        _react2.default.createElement(
                                                            'div',
                                                            { className: 'col-md-12' },
                                                            _react2.default.createElement(
                                                                'p',
                                                                { className: 'title text-center' },
                                                                'Ladenlokal besuchen'
                                                            ),
                                                            _react2.default.createElement(
                                                                'p',
                                                                { className: 'description text-center' },
                                                                'W\xE4hlen Sie die Filiale aus, welche Sie besuchen wollen, um weitere Informationen zu erhalten.'
                                                            ),
                                                            _react2.default.createElement(
                                                                'div',
                                                                { className: 'locations' },
                                                                places.data.map(function (item, i) {
                                                                    return _react2.default.createElement(
                                                                        'button',
                                                                        { key: i,
                                                                            className: 'btn bigText text-center',
                                                                            onClick: function onClick(e) {
                                                                                _this7.changeSummaryTabContent('bringToShop', item);
                                                                            } },
                                                                        _react2.default.createElement('img', { loading: 'lazy', alt: '',
                                                                            src: '/images/' + item.id + '.svg',
                                                                            style: { marginRight: 17 } }),
                                                                        _react2.default.createElement(
                                                                            'div',
                                                                            { className: 'location-title' },
                                                                            'Filiale ',
                                                                            item.descriptionBranch
                                                                        )
                                                                    );
                                                                })
                                                            )
                                                        )
                                                    ),
                                                    summaryTabContent === 'bringToShop' && _react2.default.createElement(_bringToShop2.default, { place: place }),
                                                    summaryTabContent === 'pickupByBicycle' && _react2.default.createElement(_pickupByBicycle2.default, null),
                                                    summaryTabContent === 'pickupByPackage' && _react2.default.createElement(_pickupByPackage2.default, null)
                                                ),
                                                summaryTabContent !== 'chooseLocation' && _react2.default.createElement(
                                                    'div',
                                                    { className: 'row' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'col-md-12' },
                                                        _react2.default.createElement(
                                                            'div',
                                                            { className: 'row text-right buttons' },
                                                            _react2.default.createElement(
                                                                'button',
                                                                { className: 'btn',
                                                                    onClick: function onClick() {
                                                                        return _this7.changeSummaryTabContent('chooseLocation');
                                                                    } },
                                                                'Ladenlokal besuchen',
                                                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/ic-bring.svg', alt: '' })
                                                            ),
                                                            _react2.default.createElement(
                                                                'button',
                                                                { className: 'btn',
                                                                    'data-name': 'summary',
                                                                    onClick: function onClick(e) {
                                                                        $('.nav-pills a[href="#form"]').tab('show');
                                                                        _this7.props.setStep && _this7.handleClickMobileBtn(e);
                                                                    } },
                                                                'Gratis per Post einsenden',
                                                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/ic-post.svg', alt: '' })
                                                            )
                                                        ),
                                                        window.isMobile && _react2.default.createElement(_sendLinkMobile2.default, null),
                                                        _react2.default.createElement(
                                                            'div',
                                                            { className: 'row buttons' },
                                                            _react2.default.createElement(
                                                                'span',
                                                                { className: 'link',
                                                                    onClick: this.saveAndBackToSellProcess },
                                                                _react2.default.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' }),
                                                                'Weiteres Ger\xE4t verkaufen'
                                                            ),
                                                            _react2.default.createElement(
                                                                'span',
                                                                { className: 'link',
                                                                    onClick: this.addToBasket },
                                                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/save.svg', alt: '' }),
                                                                'Ich will sp\xE4ter weitermachen, jetzt ',
                                                                _react2.default.createElement(
                                                                    'strong',
                                                                    null,
                                                                    'speichern'
                                                                ),
                                                                '!'
                                                            )
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-sm-12 tabSummary' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'row' },
                                                    !window.isMobile && summaryTabContent !== 'chooseLocation' && _react2.default.createElement(_sendLinks2.default, { user: user, id: 'summary' })
                                                )
                                            )
                                        )
                                    ),
                                    userAnswers && _react2.default.createElement(
                                        'div',
                                        { role: 'tabpanel', className: 'tab-pane', id: 'form' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'clearfix' },
                                            window.isMobile && _react2.default.createElement(_sendLinkMobile2.default, null),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-sm-4 clearfix topMobile' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image col-xs-12 text-center' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: userAnswers.image, alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'price col-xs-12' },
                                                    _react2.default.createElement(
                                                        'p',
                                                        { className: 'title' },
                                                        'Ihr Preis'
                                                    ),
                                                    _react2.default.createElement(
                                                        'p',
                                                        { className: price.oldPrice > 0 ? 'oldPrice value' : 'value' },
                                                        price.oldPrice > 0 ? (0, _helpersFunction.formatPrice)(price.oldPrice) : (0, _helpersFunction.formatPrice)(price.price),
                                                        ' ',
                                                        window.currencyValue
                                                    ),
                                                    price.oldPrice > 0 && !userAnswers.Model[0].discountPrice > 0 && _react2.default.createElement(
                                                        _reactAnimatedCss.Animated,
                                                        { animationIn: 'bounceIn', animationInDelay: 1000 },
                                                        _react2.default.createElement(
                                                            'div',
                                                            null,
                                                            _react2.default.createElement(
                                                                'p',
                                                                { className: 'value' },
                                                                (0, _helpersFunction.formatPrice)(price.price),
                                                                ' ',
                                                                window.currencyValue
                                                            ),
                                                            coupon.isCoupon && _react2.default.createElement(
                                                                'p',
                                                                { className: 'couponInfo' },
                                                                _react2.default.createElement('span', {
                                                                    className: 'circleOk' }),
                                                                'Gutschein ',
                                                                coupon.couponShortcode,
                                                                ' wurde eingel\xF6st'
                                                            )
                                                        )
                                                    ),
                                                    userAnswers.Model[0].discountPrice > 0 && _react2.default.createElement(
                                                        'div',
                                                        null,
                                                        _react2.default.createElement(
                                                            'p',
                                                            { className: 'value' },
                                                            (0, _helpersFunction.formatPrice)(price.price),
                                                            ' ',
                                                            window.currencyValue
                                                        ),
                                                        coupon.isCoupon && _react2.default.createElement(
                                                            'p',
                                                            { className: 'couponInfo' },
                                                            _react2.default.createElement('span', {
                                                                className: 'circleOk' }),
                                                            'Gutschein ',
                                                            coupon.couponShortcode,
                                                            ' wurde eingel\xF6st'
                                                        )
                                                    ),
                                                    showAddCoupon && _react2.default.createElement(
                                                        'div',
                                                        { className: 'couponField' },
                                                        _react2.default.createElement('input', { type: 'checkbox', id: 'coupon' }),
                                                        _react2.default.createElement(
                                                            'label',
                                                            { htmlFor: 'coupon' },
                                                            '+ Gutscheincode hinzuf\xFCgen'
                                                        ),
                                                        _react2.default.createElement('input', { type: 'text',
                                                            className: coupon.couponError ? 'errorInput' : '',
                                                            name: 'coupon',
                                                            placeholder: 'Gutschein einl\xF6sen',
                                                            onChange: this.changeCoupon }),
                                                        coupon.couponError && _react2.default.createElement(
                                                            'span',
                                                            { className: 'errorText' },
                                                            coupon.couponError
                                                        )
                                                    )
                                                ),
                                                !window.isMobile && _react2.default.createElement(_sendLinks2.default, { user: user, id: 'form' })
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-sm-8' },
                                                errors.general && _react2.default.createElement(
                                                    'p',
                                                    { className: 'errorInfo' },
                                                    errors.general
                                                ),
                                                !user.isLogin && window.isMobile && _react2.default.createElement(
                                                    'form',
                                                    { name: 'loginFormMobile', className: 'loginFormMobile', onSubmit: this.loginFormMobile },
                                                    showLoginForm && _react2.default.createElement(
                                                        'div',
                                                        null,
                                                        _react2.default.createElement('input', { type: 'email', name: 'login', required: true, placeholder: 'E-Mail' }),
                                                        _react2.default.createElement('br', null),
                                                        _react2.default.createElement('input', { type: 'text', name: 'password', required: true, placeholder: 'Passwort' })
                                                    ),
                                                    defineTypeElem > 0 ? _react2.default.createElement(
                                                        'button',
                                                        { type: 'submit',
                                                            className: 'btn',
                                                            onSubmit: this.loginFormMobile },
                                                        'Einloggen',
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                                        )
                                                    ) : _react2.default.createElement(
                                                        'span',
                                                        { className: 'btn', onClick: this.showLoginForm.bind(this) },
                                                        'Einloggen',
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                                        )
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'form',
                                                    { action: '#', name: 'basketForm', onChange: this.changeForm,
                                                        onKeyPress: this.cancelSendByEnter.bind(this),
                                                        onSubmit: this.send },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'basketWrap' },
                                                        _react2.default.createElement(_showResultsPersonalData2.default, { country: country,
                                                            basketDataVerkaufen: this.props.basket.basketDataVerkaufen,
                                                            uidNumberField: uidNumberField,
                                                            handlerChangeInput: this.handlerChangeInput,
                                                            price: (0, _helpersFunction.formatPrice)(price.price),
                                                            cancelRedirect: this.props.userActions.cancelRedirectToMyAccount,
                                                            user: this.props.user,
                                                            error: errors,
                                                            inputCheckbox: inputCheckbox,
                                                            changeCountry: this.changeCountry,
                                                            changeCheckbox: this.changeCheckbox })
                                                    ),
                                                    _react2.default.createElement(
                                                        'span',
                                                        { className: 'agree' },
                                                        _react2.default.createElement(
                                                            'label',
                                                            null,
                                                            _react2.default.createElement('input', { type: 'checkbox',
                                                                name: 'agree',
                                                                required: true,
                                                                onChange: this.changeCheckbox }),
                                                            _react2.default.createElement('span', { className: 'checkbox' })
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            'Ich habe die ',
                                                            _react2.default.createElement(
                                                                'a',
                                                                {
                                                                    href: '/ueber-uns/agb', target: '_blank' },
                                                                'AGB'
                                                            ),
                                                            ' und die ',
                                                            _react2.default.createElement(
                                                                'a',
                                                                {
                                                                    href: '/ueber-uns/datenschutzerklaerung',
                                                                    target: '_blank' },
                                                                'Datenschutzerkl\xE4rung'
                                                            ),
                                                            ' gelesen und akzeptiere diese'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'text-right buttons' },
                                                        _react2.default.createElement(
                                                            'button',
                                                            { type: 'submit',
                                                                className: 'btn pulsing',
                                                                onSubmit: this.send },
                                                            'Abschliessen',
                                                            _react2.default.createElement(
                                                                'span',
                                                                null,
                                                                _react2.default.createElement('i', { className: 'fa fa-long-arrow-right',
                                                                    'aria-hidden': 'true' })
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { role: 'tabpanel', className: 'tab-pane howItWorks', id: 'instructions' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'clearfix periods' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-sm-4 text-center itemPeriod' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'num' },
                                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/1.svg', alt: 'ds' })
                                                    ),
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/estimate-icon.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'h4',
                                                    null,
                                                    'Ger\xE4t zur\xFCcksetzen'
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'L\xF6schen Sie alle Daten auf Ihrem Ger\xE4t indem Sie es auf die Werkseinstellungen zur\xFCcksetzen'
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-sm-4 text-center itemPeriod' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'num' },
                                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/2.svg', alt: '' })
                                                    ),
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/send-icon.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'h4',
                                                    null,
                                                    'Ger\xE4t einsenden'
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'Senden Sie Ihr Ger\xE4t ',
                                                    _react2.default.createElement(
                                                        'strong',
                                                        null,
                                                        'kostenlos'
                                                    ),
                                                    ' mit dem vorfrankierten Versandlabel per Post zu.'
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-sm-4 text-center itemPeriod' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'num' },
                                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/3.svg', alt: '' })
                                                    ),
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/get-icon.svg', alt: '' })
                                                ),
                                                _react2.default.createElement(
                                                    'h4',
                                                    null,
                                                    'Zahlung erhalten'
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    null,
                                                    'Nach Pr\xFCfung Ihres Ger\xE4tes wird der Betrag ',
                                                    _react2.default.createElement(
                                                        'strong',
                                                        null,
                                                        'Express'
                                                    ),
                                                    ' ausbezahlt.'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'row text-center' },
                                            _react2.default.createElement(
                                                'a',
                                                { href: '//' + window.location.host + '/' + this.state.pdfUrl,
                                                    target: '_blank',
                                                    className: 'estimatePrice btn' },
                                                ' Herunterladen und ausdrucken',
                                                _react2.default.createElement(
                                                    'span',
                                                    null,
                                                    _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                                )
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
                    { className: 'buttonsForMobile' },
                    _react2.default.createElement(
                        'button',
                        { type: 'button',
                            'data-name': 'form',
                            className: 'btn sendForm',
                            onClick: this.handleClickMobileBtn },
                        'Abschliessen'
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '//' + window.location.host + '/' + this.state.pdfUrl,
                            target: '_blank',
                            className: 'estimatePrice btn' },
                        ' Herunterladen und ausdrucken'
                    )
                )
            );
        }
    }]);
    return ShowResults;
}(_react.Component);

ShowResults.propTypes = {};
ShowResults.defaultProps = {};

function mapStateToProps(state) {
    return {
        basket: state.basket,
        user: state.user,
        places: state.places.currentLocation
    };
}

function mapDispatchToProps(dispatch) {
    return {
        basketActions: (0, _redux.bindActionCreators)(basketActions, dispatch),
        userActions: (0, _redux.bindActionCreators)(userActions, dispatch)
        // placesActions: bindActionCreators(placesActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, { pure: false })(ShowResults);

/***/ }),

/***/ 1712:
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

var SendLinkMobile = function (_Component) {
    (0, _inherits3.default)(SendLinkMobile, _Component);

    function SendLinkMobile(props) {
        (0, _classCallCheck3.default)(this, SendLinkMobile);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SendLinkMobile.__proto__ || Object.getPrototypeOf(SendLinkMobile)).call(this, props));

        _this.state = {};

        _this.changeCheckbox = _this.changeCheckbox.bind(_this);
        _this.copyToClipboard = _this.copyToClipboard.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(SendLinkMobile, [{
        key: 'changeCheckbox',
        value: function changeCheckbox(e) {
            if (e.target.checked) {
                $('.wrapOverlay').css({ display: 'block' });
                $('.sellPage #myModalResult.modal').css({ overflow: 'visible' });
                $('.sellPage .buttonsForMobile').css({ opacity: 0.73 });
                $('.wrapLinks').css({ display: 'flex' });
            } else {
                $('.wrapOverlay').css({ display: 'none' });
                $('.sellPage #myModalResult.modal').css({ overflow: 'scroll' });
                $('.sellPage .buttonsForMobile').css({ opacity: 1 });
                $('.wrapLinks').hide();
            }
        }
    }, {
        key: 'copyToClipboard',
        value: function copyToClipboard(e) {
            e.preventDefault();
            Clipboard.copy(document.querySelector('.hiddenInputWithLink').value);
            $('#linkBtn').click();
        }
    }, {
        key: 'render',
        value: function render() {
            var link = window.location.href,
                message = 'Hallo,\nhier der Link von remarket um dein Ger\xE4t zu verkaufen\n' + link,
                linkWhatsApp = 'whatsapp://send?text=Hallo,\nhier der Link von remarket um dein Ger\xE4t zu verkaufen\n' + link;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('div', { className: 'wrapOverlay' }),
                _react2.default.createElement(
                    'div',
                    { className: 'sendLinkMobile' },
                    _react2.default.createElement('input', { type: 'checkbox', id: 'linkBtn', onChange: this.changeCheckbox }),
                    _react2.default.createElement('label', { htmlFor: 'linkBtn' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'wrapLinks' },
                        _react2.default.createElement(
                            'span',
                            { className: 'title' },
                            'Link teilen'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'itemBtn' },
                            _react2.default.createElement(
                                'a',
                                { href: "mailto:?body=" + encodeURI(message), onClick: function onClick() {
                                        return $('#linkBtn').click();
                                    } },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/mail-links.png', alt: '' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'itemBtn' },
                            _react2.default.createElement(
                                'a',
                                { href: encodeURI(linkWhatsApp), onClick: function onClick() {
                                        return $('#linkBtn').click();
                                    } },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/whatsapp-links.png', alt: '' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'itemBtn' },
                            _react2.default.createElement(
                                'a',
                                { href: '', onClick: this.copyToClipboard },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/copy-to-clipboard.png', alt: '' })
                            ),
                            _react2.default.createElement('textarea', {
                                className: 'hiddenInputWithLink',
                                defaultValue: link })
                        )
                    )
                )
            );
        }
    }]);
    return SendLinkMobile;
}(_react.Component);

SendLinkMobile.propTypes = {};
SendLinkMobile.defaultProps = {};

exports.default = SendLinkMobile;


window.Clipboard = function (window, document, navigator) {
    var textArea, copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range, selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyToClipboard() {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    copy = function copy(text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };

    return {
        copy: copy
    };
}(window, document, navigator);

/***/ }),

/***/ 1713:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(1230);

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SendLinks = function (_Component) {
    (0, _inherits3.default)(SendLinks, _Component);

    function SendLinks(props) {
        (0, _classCallCheck3.default)(this, SendLinks);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SendLinks.__proto__ || Object.getPrototypeOf(SendLinks)).call(this, props));

        _this.state = {
            userData: {
                number: ''
            },
            successMsg: ''
        };

        _this.clickCheckbox = _this.clickCheckbox.bind(_this);
        _this._setDataFields = _this._setDataFields.bind(_this);
        _this.changePhoneNumber = _this.changePhoneNumber.bind(_this);
        _this.sendForm = _this.sendForm.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(SendLinks, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.user.data !== this.props.user.data && nextProps.user.data) {
                this._setDataFields(nextProps.user.data);
            }
            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === false) {
                [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('input[name="email"], input[name="number"]'))).forEach(function (item) {
                    return item.value = "";
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('.textarea'))).forEach(function (item) {
                return item.setAttribute('contentEditable', true);
            });
            if (this.props.user.isLogin && this.props.user.data) {
                this._setDataFields(this.props.user.data);
            }
        }
    }, {
        key: 'changePhoneNumber',
        value: function changePhoneNumber(e) {
            this.setState({ userData: (0, _extends3.default)({}, this.state.userData, { number: e }) });
        }
    }, {
        key: '_setDataFields',
        value: function _setDataFields(data) {
            var email = data.systemAddress.email,
                phone = data.systemAddress.phone,
                emailForm = document.forms['linkByEmail-' + this.props.id];

            if (phone.indexOf('0041') === 0) phone = '+' + phone.slice(2);
            if (emailForm.emailFrom) emailForm.emailFrom.value = email;
            this.setState({ userData: (0, _extends3.default)({}, this.state.userData, { number: phone }) });
        }
    }, {
        key: 'sendForm',
        value: function sendForm(e) {
            var _this2 = this;

            e.preventDefault();
            var data = void 0,
                type = void 0,
                text = null,
                name = e.target.name,
                leftPosition = 0;

            if (name.includes('linkByEmail')) {
                data = new FormData(document.forms['linkByEmail-' + this.props.id]);
                type = 'email';
                text = $('.textarea.email').html();
                leftPosition = $(e.target).closest('.itemBtn').position().left;
            } else {
                data = new FormData(document.forms['linkBySms-' + this.props.id]);
                type = 'phone';
                text = document.querySelector('.textarea.phone').innerText;
                leftPosition = $(e.target).closest('.itemBtn').position().left;
            }
            data.append('type', type);
            data.append('message', text);
            document.getElementById('spinner-box-load').style.display = 'block';
            axios.post('/api/shareLink', data).then(function (result) {
                document.getElementById('spinner-box-load').style.display = 'none';
                [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('input[name="linkBtn"]'))).forEach(function (item) {
                    return item.checked = false;
                });
                [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('.itemBtn label'))).forEach(function (item) {
                    return item.classList.remove('active');
                });
                if (name.includes('linkByEmail')) {
                    _this2.setState({ successMsg: 'Die E-Mail wurde erfolgreich versendet' });

                    $('.successMessage').css({ left: leftPosition + 'px' }).fadeIn();
                    setTimeout(function () {
                        return $('.successMessage').fadeOut();
                    }, 2000);
                } else {
                    _this2.setState({ successMsg: 'Die SMS wurde erfolgreich versendet' });
                    $('.successMessage').css({ left: leftPosition + 'px' }).fadeIn();
                    setTimeout(function () {
                        return $('.successMessage').fadeOut();
                    }, 2000);
                }
            });
        }
    }, {
        key: 'clickCheckbox',
        value: function clickCheckbox(e) {
            [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('.itemBtn label'))).forEach(function (item) {
                return item.classList.remove('active');
            });
            if (!e.target.checked) e.target.checked = false;else {
                [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('input[name="linkBtn"]'))).forEach(function (item) {
                    return item.checked = false;
                });
                e.target.checked = true;
                e.target.parentNode.querySelector('label').classList.add('active');
            }
            if (e.target.id.includes('clipboard')) {
                var copyText = document.querySelector('.hiddenInputWithLink');
                copyText.select();
                document.execCommand('copy');
                e.target.checked = false;
                e.target.parentNode.querySelector('label').classList.remove('active');
                this.setState({ successMsg: 'Der Link wurde erfolgreich in die Zwischenablage kopiert' });
                $('.successMessage').css({ left: $(e.target).closest('.itemBtn').position().left + 'px' }).fadeIn();
                setTimeout(function () {
                    return $('.successMessage').fadeOut();
                }, 2000);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var link = window.location.href,
                country = window.domainName.name === 'remarket.ch' ? 'ch' : 'de',
                id = this.props.id;

            return _react2.default.createElement(
                'div',
                { className: 'sendLinksWrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'successMessage' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/ok-links.svg' }),
                    ' ',
                    _react2.default.createElement(
                        'span',
                        { className: 'copy' },
                        this.state.successMsg
                    )
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'title' },
                    'Link teilen'
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'wrapLinks' },
                    _react2.default.createElement(
                        'span',
                        { className: 'itemBtn' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'email-' + id },
                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/mail-links.png', alt: '' })
                        ),
                        _react2.default.createElement('input', { type: 'checkbox', id: 'email-' + id, name: 'linkBtn', onChange: this.clickCheckbox }),
                        _react2.default.createElement(
                            'div',
                            { className: 'form' },
                            _react2.default.createElement(
                                'form',
                                { name: 'linkByEmail-' + id, onSubmit: this.sendForm },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'header' },
                                    'Link mit Freunden teilen',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'via E-mail'
                                    )
                                ),
                                _react2.default.createElement('input', { type: 'email', name: 'emailFrom', required: true, placeholder: 'Ihre E-Mail' }),
                                _react2.default.createElement('input', { type: 'email', name: 'emailTo', required: true, placeholder: 'E-Mail Ihres Freundes' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'textarea email' },
                                    'Hallo,',
                                    _react2.default.createElement('br', null),
                                    'hier der Link von remarket um dein Ger\xE4t zu verkaufen:',
                                    _react2.default.createElement('br', null),
                                    _react2.default.createElement(
                                        'a',
                                        { contentEditable: false, href: link },
                                        link
                                    )
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn', onSubmit: this.sendForm },
                                    'Senden'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'itemBtn' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'sms-' + id },
                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/sms-link.png', alt: '' })
                        ),
                        _react2.default.createElement('input', { type: 'checkbox', id: 'sms-' + id, name: 'linkBtn', onChange: this.clickCheckbox }),
                        _react2.default.createElement(
                            'div',
                            { className: 'form' },
                            _react2.default.createElement(
                                'form',
                                { name: 'linkBySms-' + id, onSubmit: this.sendForm },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'header' },
                                    'Link mit Freunden teilen',
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'via SMS'
                                    )
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'inputTitle' },
                                    'Absender Mobiltelefonnummer'
                                ),
                                _react2.default.createElement(_withStyles2.default, {
                                    inputProps: { name: "phoneFrom", required: true },
                                    pattern: '(\\+?\\d){11,}',
                                    value: this.state.userData.number,
                                    onChange: this.changePhoneNumber,
                                    defaultCountry: country,
                                    autoFormat: false,
                                    placeholder: 'Ihre Mobiltelefonnummer',
                                    flagsImagePath: '/images/design/flags.png' }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'inputTitle' },
                                    'Empf\xE4nger Mobiltelefonnummer'
                                ),
                                _react2.default.createElement(_withStyles2.default, {
                                    inputProps: { name: "phoneTo", required: true },
                                    pattern: '(\\+?\\d){11,}',
                                    defaultCountry: country,
                                    autoFormat: false,
                                    placeholder: 'Mobiltelefonnummer Ihres Freundes',
                                    flagsImagePath: '/images/design/flags.png' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'textarea phone' },
                                    'Hallo,',
                                    _react2.default.createElement('br', null),
                                    'hier der Link von remarket um dein Ger\xE4t zu verkaufen ',
                                    _react2.default.createElement('br', null),
                                    _react2.default.createElement(
                                        'a',
                                        { contentEditable: false, href: link },
                                        link
                                    )
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn', onSubmit: function onSubmit() {
                                            return _this3.sendForm;
                                        } },
                                    'Senden'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'itemBtn' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'clipboard-' + id },
                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/copy-to-clipboard.png', alt: '' })
                        ),
                        _react2.default.createElement('input', { id: 'clipboard-' + id, type: 'checkbox', name: 'linkBtn', onChange: this.clickCheckbox }),
                        _react2.default.createElement(
                            'div',
                            { className: 'form copyForm' },
                            _react2.default.createElement('textarea', {
                                defaultValue: link,
                                className: 'hiddenInputWithLink' }),
                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/ok-links.svg' }),
                            ' ',
                            _react2.default.createElement(
                                'span',
                                { className: 'copy' },
                                'Link wurde in Zwischenablage kopiert'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return SendLinks;
}(_react.Component);

SendLinks.propTypes = {};
SendLinks.defaultProps = {};

exports.default = SendLinks;

/***/ }),

/***/ 1714:
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

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = __webpack_require__(902);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _productOverview = __webpack_require__(1513);

var _index = __webpack_require__(149);

var _index2 = _interopRequireDefault(_index);

var _helpersFunction = __webpack_require__(316);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowResultsPersonalData = function (_Component) {
    (0, _inherits3.default)(ShowResultsPersonalData, _Component);

    function ShowResultsPersonalData(props) {
        (0, _classCallCheck3.default)(this, ShowResultsPersonalData);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ShowResultsPersonalData.__proto__ || Object.getPrototypeOf(ShowResultsPersonalData)).call(this, props));

        _this.state = {
            activeNavItem: 'now',
            showLoginForm: false,
            desiredPayoutTypeValue: null
        };

        _this.loginUser = _this.loginUser.bind(_this);
        _this.clickNavItem = _this.clickNavItem.bind(_this);
        _this.changePassword = _this.changePassword.bind(_this);
        _this.showLoginForm = _this.showLoginForm.bind(_this);
        _this.showSocialRegisterForm = _this.showSocialRegisterForm.bind(_this);
        _this.changeDesiredPayoutType = _this.changeDesiredPayoutType.bind(_this);
        _this.handlerBlurInputUIDNumber = _this.handlerBlurInputUIDNumber.bind(_this);
        _this.calculateTotalPrice = _this.calculateTotalPrice.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ShowResultsPersonalData, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            /*
            axios.get('/api/countries')
                .then(({ data }) => {
                    if(window.isGoogleConnection) {
                        _googleAutocomplete.call(this, data.meta.domainId)
                    }
                    let countriesList = data.data.map( item => { return { value: item['name-short'], label: item['name-de']}})
                    this.setState({country: {...this.state.country, countriesList }})
                })
            */
            var remarketDomainId = 2;
            var countriesList = [{ value: 'ch', label: 'Schweiz' }, { value: 'li', label: 'Liechtenstein' }];
            this.setState({ country: (0, _extends3.default)({}, this.state.country, { countriesList: countriesList }) });
            if (window.isGoogleConnection) {
                _helpersFunction._googleAutocomplete.call(this, remarketDomainId);
            }
        }
    }, {
        key: '_setFormFields',
        value: function _setFormFields(data) {
            var form = document.forms.editUserProfileForm,
                _state = this.state,
                country = _state.country,
                inputCheckbox = _state.inputCheckbox;

            for (var key in data) {
                switch (key) {
                    case 'company':
                        if (data[key]) {
                            inputCheckbox.systemCompany = true;
                            form[key].value = data[key];
                        } else {
                            inputCheckbox.systemCompany = false;
                            form[key].value = data[key];
                        }
                        break;
                    case 'LieferFirmenname':
                        if (data[key]) {
                            inputCheckbox.shippingCompany = true;
                            form[key].value = data[key];
                        } else {
                            inputCheckbox.shippingCompany = false;
                            form[key].value = data[key];
                        }
                        break;
                    case 'RechnungFirmenname':
                        if (data[key]) {
                            inputCheckbox.customerCompany = true;
                            form[key].value = data[key];
                        } else {
                            inputCheckbox.customerCompany = false;
                            form[key].value = data[key];
                        }
                        break;
                    case 'Sprache':
                        if (form[key]) form[key].value = data[key];
                        country.currentCountry.system_inputCountry = data[key];
                        break;
                    case 'LieferLand':
                        if (form[key]) form[key].value = data[key];
                        country.currentCountry.inputCountry = data[key];
                        break;
                    case 'RechnungLand':
                        if (form[key]) form[key].value = data[key];
                        country.currentCountry.customer_inputCountry = data[key];
                        break;
                    default:
                        if (form[key]) form[key].value = data[key];
                }
            }
            this.setState({ inputCheckbox: inputCheckbox, country: country });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.inputCheckbox.asGuest) {
                this.setState({ activeNavItem: 'now', desiredPayoutTypeValue: null });
            }
        }
    }, {
        key: 'changeDesiredPayoutType',
        value: function changeDesiredPayoutType(e) {
            var value = e.target.value;

            this.setState({ desiredPayoutTypeValue: value });
        }
    }, {
        key: 'clickNavItem',
        value: function clickNavItem(e) {
            if (!this.props.inputCheckbox.asGuest) {
                var activeNavItem = e.currentTarget.getAttribute('data-type');
                this.setState({ activeNavItem: activeNavItem, desiredPayoutTypeValue: null });
            }
        }
    }, {
        key: 'handlerBlurInputUIDNumber',
        value: function handlerBlurInputUIDNumber(e) {
            if (!e.target.value) $('.uid-number-wrap').removeClass('show-input');
        }
    }, {
        key: 'changePassword',
        value: function changePassword(e) {
            var value = e.target.value,
                regular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

            if (regular.test(value.trim())) {
                $(e.target).parents('.inputFullWidth').find('.statusBarPassword').css({ background: '#00cb94' });
            } else {
                $(e.target).parents('.inputFullWidth').find('.statusBarPassword').css({ background: '#ff0000' });
            }
        }
    }, {
        key: 'showLoginForm',
        value: function showLoginForm() {
            this.props.cancelRedirect(true);
            document.getElementById("op").checked = true;
            $('.login-box-wrapper').css({ display: 'block' });
        }
    }, {
        key: 'showSocialRegisterForm',
        value: function showSocialRegisterForm(type) {
            var _this2 = this;

            this.props.cancelRedirect(true);
            if (type === 'facebook') {
                FB.login(function (response) {
                    var token = response.authResponse.accessToken;
                    var body = {
                        token: token,
                        provider: type
                    };
                    _index2.default.post('/api/socialAuth', body).then(function (result) {
                        window.localStorage.setItem("token", result.data.token);
                        window.axios.defaults.headers.common['Authorization-Token'] = result.data.token;
                        _this2._loadPersonalData(result.data.token);
                    }).catch(function (error) {
                        if (error.response.status === 404) {
                            document.getElementById("op").checked = true;
                            _this2.setState({ errorLogin: (0, _extends3.default)({}, _this2.state.errorLogin, { socialNoEmail: error.response.data }),
                                errorRegistration: (0, _extends3.default)({}, _this2.state.errorRegistration, { socialNoEmail: error.response.data })
                            });
                        }
                    });
                }, { scope: 'email' });
            } else {
                window.gapiAuth2.signIn().then(function (data) {
                    var token = data.Zi.access_token;
                    var body = {
                        token: token,
                        provider: 'google'
                    };
                    _index2.default.post('/api/socialAuth', body).then(function (result) {
                        window.localStorage.setItem("token", result.data.token);
                        window.axios.defaults.headers.common['Authorization-Token'] = result.data.token;
                        _this2._loadPersonalData(result.data.token);
                    }).catch(function (error) {
                        if (error.response.status === 404) {}
                    });
                });
            }
        }
    }, {
        key: 'calculateTotalPrice',
        value: function calculateTotalPrice() {
            var totalPrice = this.props.price,
                basketPrice = 0;
            this.props.basketDataVerkaufen.forEach(function (item) {
                if (item.productTypeId == 999) {
                    totalPrice += +item.price;
                    basketPrice += +item.price;
                } else {
                    totalPrice += (0, _productOverview.calculatePrice)(item).price;
                    basketPrice += (0, _productOverview.calculatePrice)(item).price;
                }
            });

            return { totalPrice: totalPrice, basketPrice: basketPrice };
        }
    }, {
        key: 'loginFacebook',
        value: function loginFacebook(e) {
            var _this3 = this;

            e.preventDefault();
            document.getElementById("op").checked = false;
            this.setState({ errorLogin: (0, _extends3.default)({}, this.state.errorLogin, { socialNoEmail: '' }),
                errorRegistration: (0, _extends3.default)({}, this.state.errorRegistration, { socialNoEmail: '' })
            });
            FB.login(function (response) {
                var token = response.authResponse.accessToken;
                var body = {
                    token: token,
                    provider: 'facebook'
                };
                document.getElementById('spinner-box-load').style.display = 'block';
                _index2.default.post('/api/socialAuth', body).then(function (result) {
                    window.localStorage.setItem("token", result.data.token);
                    window.axios.defaults.headers.common['Authorization-Token'] = result.data.token;
                    _this3._loadPersonalData(result.data.token);
                }).catch(function (error) {
                    if (error.response.status === 404) {
                        document.getElementById('spinner-box-load').style.display = 'none';
                        document.getElementById("op").checked = true;
                        _this3.setState({ errorLogin: (0, _extends3.default)({}, _this3.state.errorLogin, { socialNoEmail: error.response.data }),
                            errorRegistration: (0, _extends3.default)({}, _this3.state.errorRegistration, { socialNoEmail: error.response.data })
                        });
                    }
                });
            }, { scope: 'email' });
        }
    }, {
        key: 'loginGoogle',
        value: function loginGoogle(e) {
            var _this4 = this;

            e.preventDefault();
            this.setState({ errorLogin: (0, _extends3.default)({}, this.state.errorLogin, { socialNoEmail: '' }),
                errorRegistration: (0, _extends3.default)({}, this.state.errorRegistration, { socialNoEmail: '' })
            });
            document.getElementById("op").checked = false;
            window.gapiAuth2.signIn().then(function (data) {
                var token = data.Zi.access_token;
                var body = {
                    token: token,
                    provider: 'google'
                };
                document.getElementById('spinner-box-load').style.display = 'block';
                _index2.default.post('/api/socialAuth', body).then(function (result) {
                    window.localStorage.setItem("token", result.data.token);
                    window.axios.defaults.headers.common['Authorization-Token'] = result.data.token;
                    _this4._loadPersonalData(result.data.token);
                }).catch(function (error) {
                    if (error.response.status === 404) {
                        document.getElementById('spinner-box-load').style.display = 'none';
                        document.getElementById("op").checked = true;
                        _this4.setState({ errorLogin: (0, _extends3.default)({}, _this4.state.errorLogin, { socialNoEmail: error.response.data }),
                            errorRegistration: (0, _extends3.default)({}, _this4.state.errorRegistration, { socialNoEmail: error.response.data })
                        });
                    }
                });
            });
        }
    }, {
        key: 'closeLoginForm',
        value: function closeLoginForm() {
            [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('.simform input:not([type=submit])'))).forEach(function (item) {
                return item.value = '';
            });
            this.setState({ errorRegistration: { email: '', phone: '', password: '', password_confirmation: '', socialNoEmail: '' },
                errorLogin: { infoMsg: '', login: '', password: '', socialNoEmail: '', resendActivationLink: '', successResend: '' },
                showInputCode: false,
                spinner: null
            });
            this.props.userActions.setRedirectTo(false);
            this.props.userActions.cancelRedirectToMyAccount(false);
            $('.login-box-wrapper').css({ display: 'none' });
        }
    }, {
        key: 'loginUser',
        value: function loginUser(e) {
            var _this5 = this;

            var url = '/api/login';
            var data = new FormData(document.forms.loginFormMobile);
            document.getElementById('spinner-box-load').style.display = 'block';
            _index2.default.post(url, data).then(function (result) {
                if (result.data.status === 'false') {
                    document.getElementById('spinner-box-load').style.display = 'none';
                    var errorLogin = _this5.state.errorLogin;

                    errorLogin[result.data.field] = result.data.message;
                    if (result.data.resendActivationLink) errorLogin.resendActivationLink = result.data.resendActivationLink;
                    _this5.setState({ errorLogin: errorLogin });
                } else {
                    window.localStorage.setItem("token", result.data.token);
                    window.axios.defaults.headers.common['Authorization-Token'] = result.data.token;
                    _this5._loadPersonalData(result.data.token);
                }
            }).catch(function (error) {
                document.getElementById('spinner-box-load').style.display = 'none';
                var err = error.response.data.errors,
                    login = void 0,
                    password = void 0;
                if (err) {
                    err.login ? login = err.login[0] : '';
                    err.password ? password = err.password[0] : '';
                }
                _this5.setState({ errorLogin: (0, _extends3.default)({}, _this5.state.errorLogin, { login: login, password: password }), spinner: null });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                changeCountry = _props.changeCountry,
                country = _props.country,
                inputCheckbox = _props.inputCheckbox,
                changeCheckbox = _props.changeCheckbox,
                ifErrorPayment = _props.ifErrorPayment,
                error = _props.error,
                user = _props.user,
                goToDelivery = _props.goToDelivery,
                price = _props.price,
                uidNumberField = _props.uidNumberField,
                handlerChangeInput = _props.handlerChangeInput,
                _state2 = this.state,
                activeNavItem = _state2.activeNavItem,
                desiredPayoutTypeValue = _state2.desiredPayoutTypeValue,
                domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1],
                classUidNumberRow = inputCheckbox.company ? uidNumberField ? "rowInputs uid-number-wrap show-input" : "rowInputs uid-number-wrap" : "rowInputs uid-number-wrap hide",
                totalPrice = this.calculateTotalPrice().totalPrice,
                basketPrice = this.calculateTotalPrice().basketPrice;


            return _react2.default.createElement(
                'div',
                { className: 'personalData' },
                _react2.default.createElement(
                    'h3',
                    { className: 'title' },
                    _react2.default.createElement(
                        'span',
                        { className: 'num' },
                        '1'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'text' },
                        'Pers\xF6nliche Daten'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'arrow' },
                        _react2.default.createElement('i', { className: 'fa fa-angle-up', 'aria-hidden': 'true' })
                    )
                ),
                this.state.showLoginForm && window.isMobile && _react2.default.createElement(
                    'form',
                    { name: 'loginFormMobile' },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement('input', { type: 'text', placeholder: 'password' })
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement('input', { type: 'text', placeholder: 'e-mail' })
                    ),
                    _react2.default.createElement(
                        'button',
                        { type: 'button',
                            className: 'btn right',
                            onClick: this.showLoginForm },
                        'Einloggen',
                        _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                        )
                    )
                ),
                !user.isLogin && _react2.default.createElement(
                    'div',
                    { className: 'login-buttons sell-form' },
                    _react2.default.createElement(
                        'div',
                        { className: '' },
                        !window.isMobile && _react2.default.createElement(
                            'button',
                            { type: 'button',
                                className: 'btn',
                                onClick: this.showLoginForm },
                            'Einloggen',
                            _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                            )
                        ),
                        window.isMobile && _react2.default.createElement(
                            'div',
                            { className: 'topPersonalData' },
                            _react2.default.createElement(
                                'label',
                                null,
                                _react2.default.createElement('input', { type: 'checkbox',
                                    onChange: changeCheckbox,
                                    name: 'asGuest',
                                    className: 'checkbox-login-as-guest' }),
                                _react2.default.createElement('span', { className: 'check' }),
                                'Als Gast registrieren - hierbei wird kein Benutzeraccount erstellt'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Registration - Ihre Angaben:'
                        )
                    ),
                    !window.isMobile && _react2.default.createElement(
                        'div',
                        { className: 'topPersonalData' },
                        _react2.default.createElement(
                            'label',
                            null,
                            _react2.default.createElement('input', { type: 'checkbox',
                                onChange: changeCheckbox,
                                name: 'asGuest',
                                className: 'checkbox-login-as-guest' }),
                            _react2.default.createElement('span', { className: 'check' }),
                            'Als Gast registrieren - hierbei wird kein Benutzeraccount erstellt'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'wrapperItemBasket' },
                    _react2.default.createElement(
                        'div',
                        { className: 'billingForm' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-6' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'topPersonalData' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'wrapLabel' },
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { type: 'radio', name: 'gender', value: 'Herr', required: true }),
                                            _react2.default.createElement('span', null),
                                            'Herr'
                                        ),
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { type: 'radio', name: 'gender', value: 'Frau', required: true }),
                                            _react2.default.createElement('span', null),
                                            'Frau'
                                        ),
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { type: 'checkbox',
                                                name: 'company',
                                                checked: inputCheckbox.company,
                                                onChange: changeCheckbox }),
                                            _react2.default.createElement('span', { className: 'check' }),
                                            'Firma'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: inputCheckbox.company ? " rowInputs" : " rowInputs hide" },
                                    _react2.default.createElement('input', { type: 'text', name: 'companyName', placeholder: 'Firma', required: inputCheckbox.company })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: classUidNumberRow },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'text' },
                                        _react2.default.createElement(
                                            'span',
                                            { onClick: function onClick() {
                                                    return $('.uid-number-wrap').addClass('show-input').find('input').focus();
                                                } },
                                            '+',
                                            uidNumberText[domain].text
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'question-sign' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/question_condition.svg', alt: '' }),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'info-icon-text' },
                                                uidNumberText[domain].tooltip
                                            )
                                        )
                                    ),
                                    _react2.default.createElement('input', { type: 'text',
                                        onBlur: this.handlerBlurInputUIDNumber,
                                        name: 'companyUidNumber',
                                        value: uidNumberField,
                                        onChange: handlerChangeInput,
                                        placeholder: uidNumberText[domain].text,
                                        required: inputCheckbox.company })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: ' rowInputs' /*onChange={changeNameField}*/ },
                                    _react2.default.createElement('input', { type: 'text', name: 'firstname', placeholder: 'Vorname', required: true }),
                                    _react2.default.createElement('input', { type: 'text', name: 'lastname', placeholder: 'Nachname', required: true })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'personalDataAddress rowInputs' },
                                    _react2.default.createElement('input', { type: 'text', name: 'street', id: 'route', placeholder: 'Strasse', required: true }),
                                    _react2.default.createElement('input', { type: 'text', name: 'number', id: 'street_number', placeholder: 'Nr.', required: true })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'personalDataCity rowInputs' },
                                    _react2.default.createElement('input', { type: 'text', name: 'zip', placeholder: 'PLZ', id: 'postal_code', required: true }),
                                    _react2.default.createElement('input', { type: 'text', name: 'city', placeholder: 'Stadt', id: 'locality', required: true })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'select' },
                                    !country.countriesList.some(function (item) {
                                        return item.value === country.currentCountry.inputCountry.toLowerCase();
                                    }) && _react2.default.createElement('input', { className: 'requiredSelect', type: 'text', required: true }),
                                    _react2.default.createElement(_reactSelect2.default, {
                                        placeholder: 'Land ausw\xE4hlen...',
                                        value: country.currentCountry.inputCountry.toLowerCase(),
                                        name: 'inputCountry',
                                        clearable: false,
                                        options: country.countriesList,
                                        searchable: false,
                                        required: true,
                                        onChange: function onChange(val) {
                                            return changeCountry(val, "inputCountry");
                                        } })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: ' rowInputs' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'wrapInput' },
                                        _react2.default.createElement('input', { type: 'email', name: 'email', className: error.info ? 'error' : null, placeholder: 'E-Mail', required: true }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'errorText' },
                                            error.info
                                        )
                                    ),
                                    _react2.default.createElement('input', { type: 'tel', name: 'phone', placeholder: 'Telefon (mobil)', required: true })
                                ),
                                !user.isLogin && !inputCheckbox.asGuest && _react2.default.createElement(
                                    'div',
                                    { className: 'inputFullWidth rowInputs password' },
                                    _react2.default.createElement('input', { type: 'password',
                                        name: 'password',
                                        placeholder: 'Passwort (mind. 8 Zeichen, inkl. mind. 1 Zahl)',
                                        className: error.password ? 'error' : null,
                                        onChange: this.changePassword,
                                        required: !ifErrorPayment }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'errorText' },
                                        error.password
                                    ),
                                    _react2.default.createElement('div', { className: 'statusBarPassword' })
                                ),
                                _react2.default.createElement(
                                    'label',
                                    { className: 'shippingAddressCheck' },
                                    _react2.default.createElement('input', { type: 'checkbox',
                                        name: 'shippingAddress',
                                        value: inputCheckbox.shippingAddress,
                                        defaultChecked: inputCheckbox.shippingAddress,
                                        onChange: changeCheckbox }),
                                    _react2.default.createElement('span', null),
                                    ' Diese Adresse auch f\xFCr R\xFCcksendungen benutzen'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-6' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'payment-request' },
                                    _react2.default.createElement(
                                        'h3',
                                        { className: 'title' },
                                        'Ihr Auszahlungswunsch'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'tabs-nav' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: activeNavItem === 'later' ? "item-tab active" : "item-tab",
                                                onClick: this.clickNavItem,
                                                'data-type': 'later' },
                                            'Zahlungsdaten sp\xE4ter angeben'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: activeNavItem === 'now' ? "item-tab active" : "item-tab",
                                                onClick: this.clickNavItem,
                                                'data-type': 'now' },
                                            'Zahlungsdaten jetzt angeben'
                                        )
                                    ),
                                    activeNavItem === 'now' && _react2.default.createElement(
                                        'div',
                                        { className: 'tab-content' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-method' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wrap-label' },
                                                _react2.default.createElement(
                                                    'label',
                                                    { className: 'custom-radio-check' },
                                                    _react2.default.createElement('input', { onChange: this.changeDesiredPayoutType,
                                                        onLoad: this.changeDesiredPayoutType,
                                                        type: 'radio',
                                                        name: 'desiredPayoutType',
                                                        value: '2', checked: 'checked', required: true }),
                                                    _react2.default.createElement('span', null),
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/sell-payment-bank-icon.svg', alt: '' }),
                                                    _react2.default.createElement(
                                                        'div',
                                                        null,
                                                        'Bank\xFCberweisung',
                                                        basketPrice > 0 && _react2.default.createElement(
                                                            'div',
                                                            { className: 'basketPrice' },
                                                            _react2.default.createElement(
                                                                'strong',
                                                                null,
                                                                '+ ',
                                                                (0, _helpersFunction.formatPrice)(basketPrice),
                                                                ' ',
                                                                window.currencyValue
                                                            ),
                                                            ' - Es sind mehrere Ger\xE4te im Verkaufskorb'
                                                        )
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'price' },
                                                    (0, _helpersFunction.formatPrice)(totalPrice),
                                                    ' ',
                                                    window.currencyValue
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'inputRow' },
                                                _react2.default.createElement('input', { type: 'text', name: 'iban', placeholder: 'Ihre IBAN-Nummer', required: true }),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image-icon' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/qmark-grey.svg', alt: '' }),
                                                    _react2.default.createElement(
                                                        'span',
                                                        { className: 'info-icon-text' },
                                                        'Hier k\xF6nnen Sie Ihre IBAN-Nummer (Bankkontonummer) angeben, damit wir Ihnen den Betrag auf dieses Konto auszahlen k\xF6nnen. Die IBAN-Nummer steht oft auch auf Ihrer EC-Karte.'
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'footer' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'item-column' },
                                                _react2.default.createElement('span', { className: 'check-icon' }),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'image-wrap' },
                                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/sell-payment-express.svg', alt: '' })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'item-column big' },
                                                _react2.default.createElement(
                                                    'p',
                                                    { className: 'title' },
                                                    'Immer inklusive und kostenfrei'
                                                ),
                                                _react2.default.createElement(
                                                    'p',
                                                    { className: 'descr' },
                                                    'Sie erhalten Ihr Geld Express: Auszahlung am gleichen Tag bei Anlieferung vor 14 Uhr. Dauer der Auszahlung auf Ihr Bankkonto im Normalfall 1-2 Werktage.'
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
                        { className: inputCheckbox.shippingAddress === true ? 'hide shippingForm' : 'shippingForm' },
                        _react2.default.createElement(
                            'div',
                            { className: 'topPersonalData' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wrapLabel' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    _react2.default.createElement('input', { type: 'radio', name: 'customer_gender', value: 'Herr', required: !inputCheckbox.shippingAddress }),
                                    _react2.default.createElement('span', null),
                                    'Herr'
                                ),
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    _react2.default.createElement('input', { type: 'radio', name: 'customer_gender', value: 'Frau', required: !inputCheckbox.shippingAddress }),
                                    _react2.default.createElement('span', null),
                                    'Frau'
                                ),
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    _react2.default.createElement('input', { type: 'checkbox',
                                        name: 'customerCompanyName',
                                        value: true,
                                        defaultChecked: inputCheckbox.customerCompanyName,
                                        onClick: changeCheckbox }),
                                    _react2.default.createElement('span', { className: 'check' }),
                                    'Firma'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: inputCheckbox.customerCompanyName ? "rowInputs" : "rowInputs hide" },
                            _react2.default.createElement('input', { type: 'text', name: 'customer_companyName', placeholder: 'Firma', required: inputCheckbox.customerCompanyName })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'rowInputs' /*onChange={changeNameField}*/ },
                            _react2.default.createElement('input', { type: 'text', name: 'customer_firstname', placeholder: 'Vorname', required: !inputCheckbox.shippingAddress }),
                            _react2.default.createElement('input', { type: 'text', name: 'customer_lastname', placeholder: 'Nachname', required: !inputCheckbox.shippingAddress })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'personalDataAddress rowInputs' },
                            _react2.default.createElement('input', { type: 'text', name: 'customer_street', id: 'customer_route', placeholder: 'Strasse', required: !inputCheckbox.shippingAddress }),
                            _react2.default.createElement('input', { type: 'text', name: 'customer_number', id: 'customer_street_number', placeholder: 'Nr.', required: !inputCheckbox.shippingAddress })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'personalDataCity rowInputs' },
                            _react2.default.createElement('input', { type: 'text', name: 'customer_zip', placeholder: 'PLZ', id: 'customer_postal_code', required: !inputCheckbox.shippingAddress }),
                            _react2.default.createElement('input', { type: 'text', name: 'customer_city', placeholder: 'Stadt', id: 'customer_locality', required: !inputCheckbox.shippingAddress })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'select' },
                            !country.countriesList.some(function (item) {
                                return item.value === country.currentCountry.customer_inputCountry.toLowerCase();
                            }) && inputCheckbox.shippingAddress !== true && _react2.default.createElement('input', { className: 'requiredSelect', type: 'text', required: true }),
                            _react2.default.createElement(_reactSelect2.default, {
                                placeholder: 'Land ausw\xE4hlen...',
                                value: country.currentCountry.customer_inputCountry.toLowerCase(),
                                name: 'customer_inputCountry',
                                clearable: false,
                                options: country.countriesList,
                                searchable: false,
                                onChange: function onChange(val) {
                                    return changeCountry(val, "customer_inputCountry");
                                } })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'rowInputs' },
                            _react2.default.createElement('input', { className: 'inputFullWidth', type: 'tel', name: 'customer_phone', placeholder: 'Telefon (mobil)', required: !inputCheckbox.shippingAddress })
                        )
                    )
                ),
                window.isMobile && _react2.default.createElement(
                    'button',
                    { type: 'button', className: 'btn toDelivery',
                        onClick: goToDelivery },
                    'Zu den Lieferoptionen'
                )
            );
        }
    }]);
    return ShowResultsPersonalData;
}(_react.Component);

ShowResultsPersonalData.propTypes = {};
ShowResultsPersonalData.defaultProps = {};
exports.default = ShowResultsPersonalData;


var uidNumberText = {
    de: {
        text: 'USt-ID angeben',
        tooltip: 'Bei Angabe der MwSt.-Nr. wird diese als Vorsteuerabzug beim Ankauf angewendet'
    },
    ch: {
        text: 'MwSt.-Nr. angeben',
        tooltip: 'Bei Angabe der USt-ID-Nr. wird diese als Vorsteuerabzug beim Ankauf angewendet'
    }
};

/***/ }),

/***/ 1715:
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

var BringToShop = function (_Component) {
    (0, _inherits3.default)(BringToShop, _Component);

    function BringToShop(props) {
        (0, _classCallCheck3.default)(this, BringToShop);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BringToShop.__proto__ || Object.getPrototypeOf(BringToShop)).call(this, props));

        _this.chooseLocation = function () {
            $('#myModalResult').modal('hide');
            $('#modalChooseLocation').modal('show');
        };

        _this.state = {};

        _this._initMap = _this._initMap.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(BringToShop, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (window.isGoogleConnection) {
                this._initMap(this.props.place);
            }
            this.encryptedEmail();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (window.isGoogleConnection) {
                this._initMap(nextProps.place);
            }
        }
    }, {
        key: 'encryptedEmail',
        value: function encryptedEmail() {
            var domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1];
            if (domain === 'de') {
                document.getElementById("email-rot-13").innerHTML = "<n uers=\"znvygb:vasb@erznexrg.qr\" >vasb@erznexrg.qr</n>".replace(/[a-zA-Z]/g, function (c) {
                    return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
                });
            } else {
                document.getElementById("email-rot-13").innerHTML = "<n uers=\"znvygb:vasb@erznexrg.pu\" >vasb@erznexrg.pu</n>".replace(/[a-zA-Z]/g, function (c) {
                    return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
                });
            }
        }
    }, {
        key: '_initMap',
        value: function _initMap(place) {
            function CustomMarker(latlng, map, args) {
                this.latlng = latlng;
                this.args = args;
                this.setMap(map);
            }
            CustomMarker.prototype = new google.maps.OverlayView();
            CustomMarker.prototype.draw = function () {
                var div = this.div;
                if (!div) {
                    div = this.div = document.createElement('div');
                    div.className = 'mapMarker';
                    var panes = this.getPanes();
                    panes.overlayImage.appendChild(div);
                }

                var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
                if (point) {
                    div.style.left = point.x - 20 + 'px';
                    div.style.top = point.y + 'px';
                }
            };

            var coordinate = { lat: place.latitude, long: place.longitude };

            var myLatlng = new google.maps.LatLng(coordinate.lat, coordinate.long);

            var map = new google.maps.Map(document.querySelector('.mapContainer'), {
                zoom: 17,
                center: myLatlng
            });
            var overlay = new CustomMarker(myLatlng, map, {});
        }
    }, {
        key: 'render',
        value: function render() {
            var place = this.props.place;


            var domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1],
                linkUrlBtnMap = domain === 'ch' ? 'https://goo.gl/maps/eiCWN7JDXav' : 'https://goo.gl/maps/kgHZhkiYVko';
            return _react2.default.createElement(
                'div',
                { className: 'bring-to-shop', id: 'bringToShop' },
                _react2.default.createElement(
                    'div',
                    { className: 'content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-6' },
                            _react2.default.createElement(
                                'p',
                                { className: 'title' },
                                'Adresse'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'address' },
                                domain === 'ch' ? 'remarket.ch' : 'remarket.de',
                                ' - ',
                                place.descriptionBranch
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'address' },
                                place.address
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'address' },
                                place.zip,
                                ' ',
                                place.city
                            ),
                            _react2.default.createElement(
                                'a',
                                { className: 'btn', target: '_blank', href: linkUrlBtnMap },
                                'Karte anzeigen',
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-6' },
                            _react2.default.createElement(
                                'p',
                                { className: 'title' },
                                '\xD6ffnungszeiten'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'time' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Mo:'
                                ),
                                place.openingHours.mon
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'time' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Di:'
                                ),
                                place.openingHours.tue
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'time' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Mi:'
                                ),
                                place.openingHours.wed
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'time' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Do:'
                                ),
                                place.openingHours.thu
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'time' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Fr:'
                                ),
                                place.openingHours.fri
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'time' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Sa:'
                                ),
                                place.openingHours.sat
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-6' },
                            _react2.default.createElement(
                                'p',
                                { className: 'title' },
                                'E-Mail'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'email' },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/icon-mail.svg', alt: '' }),
                                _react2.default.createElement('span', { id: 'email-rot-13' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-6' },
                            _react2.default.createElement(
                                'p',
                                { className: 'title' },
                                'Telefon'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'email' },
                                _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/icon-phone.svg', alt: '' }),
                                _react2.default.createElement(
                                    'a',
                                    { href: place.phone },
                                    place.phone
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement('div', { className: 'mapContainer' })
            );
        }
    }]);
    return BringToShop;
}(_react.Component);

BringToShop.propTypes = {};
BringToShop.defaultProps = {};
exports.default = BringToShop;

/***/ }),

/***/ 1716:
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

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _debounce2 = __webpack_require__(899);

var _debounce3 = _interopRequireDefault(_debounce2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickupByBicycle = function (_Component) {
    (0, _inherits3.default)(PickupByBicycle, _Component);

    function PickupByBicycle(props) {
        (0, _classCallCheck3.default)(this, PickupByBicycle);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (PickupByBicycle.__proto__ || Object.getPrototypeOf(PickupByBicycle)).call(this, props));

        _this2.state = {
            infoPostCode: null,
            errors: {
                zip: '',
                date: ''
            }
        };

        _this2._initCalendar = _this2._initCalendar.bind(_this2);
        _this2.handleChangeZip = _this2.handleChangeZip.bind(_this2);
        _this2.handlerClickBook = _this2.handlerClickBook.bind(_this2);
        return _this2;
    }

    (0, _createClass3.default)(PickupByBicycle, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._initCalendar();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.inputZipCallback = (0, _debounce3.default)(function (e) {
                var _this3 = this;

                var zip = e.target.value;
                axios.get('/api/checkShippingZip?zip=' + zip).then(function (result) {
                    _this3.setState({ infoPostCode: result.data });
                }).catch(function (error) {
                    var zip = error.response.data.errors.zip[0];
                    _this3.setState({ errors: (0, _extends3.default)({}, _this3.state.errors, { zip: zip }) });
                });
            }, 1000);
        }
    }, {
        key: 'handleChangeZip',
        value: function handleChangeZip(e) {
            this.setState({ errors: (0, _extends3.default)({}, this.state.errors, { zip: null }), infoPostCode: null });
            e.persist();
            if (e.target.value) this.inputZipCallback(e);else this.inputZipCallback.cancel();
        }
    }, {
        key: 'handlerClickBook',
        value: function handlerClickBook() {
            if (!$('#datetimepicker').val()) this.setState({ errors: (0, _extends3.default)({}, this.state.errors, { date: 'Please select date and time' }) });
        }
    }, {
        key: '_initCalendar',
        value: function _initCalendar() {
            var disabledWeekDays = [0, 6],
                minTimeParam = '9.00',
                initialMinTimeParam = setMinTimeForToday(),
                maxTimeParam = '18.31',
                _this = this;

            $.datetimepicker.setLocale('de');
            $('#datetimepicker').datetimepicker({
                formatDate: 'd.m.Y',
                formatTime: 'H:i',
                inline: true,
                step: 5,
                disabledWeekDays: disabledWeekDays,
                minTime: initialMinTimeParam,
                maxTime: maxTimeParam,
                minDate: new Date(),
                defaultSelect: false,
                onChangeMonth: function onChangeMonth(current_time, $input) {},
                onSelectDate: function onSelectDate(ct, $i) {
                    var today = new Date(),
                        minTime = null,
                        currentYear = today.getFullYear(),
                        currentMonth = today.getMonth(),
                        currentDay = today.getDate(),
                        selectedYear = ct.getFullYear(),
                        selectedMonth = ct.getMonth(),
                        selectedDay = ct.getDate(),
                        selectedDayEqualTodayDay = currentYear === selectedYear && currentMonth === selectedMonth && currentDay === selectedDay;

                    if (selectedDayEqualTodayDay) {
                        minTime = setMinTimeForToday();
                        $('#datetimepicker').datetimepicker('setOptions', { minTime: minTime });
                    } else $('#datetimepicker').datetimepicker('setOptions', { minTime: minTimeParam });
                    _this.setState({ errors: (0, _extends3.default)({}, _this.state.errors, { date: '' }) });
                }
            });
            function setMinTimeForToday() {
                var today = new Date(),
                    startTimeHour = today.getHours() + 3,
                    startTimeMinutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
                return startTimeHour + '.' + startTimeMinutes;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'pickup-by-bicycle' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h3',
                        { className: 'title' },
                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/packing.svg', alt: '' }),
                        'Velokurier aufbieten'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row-input' },
                        _react2.default.createElement(
                            'div',
                            { className: 'input' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Ihre Postleitzahl:'
                            ),
                            _react2.default.createElement('input', { type: 'text', placeholder: 'z.B. 4142', onChange: this.handleChangeZip })
                        ),
                        this.state.infoPostCode && _react2.default.createElement(
                            'div',
                            { className: 'result' },
                            _react2.default.createElement('i', { className: 'fa fa-times-circle-o' }),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Eine Abholung per Velokurier ist m\xF6glich'
                            )
                        ),
                        this.state.errors.zip && _react2.default.createElement(
                            'div',
                            { className: 'result' },
                            _react2.default.createElement('i', { className: 'fa fa-check-circle-o' }),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Eine Abholung per Velokurier ist leider nicht m\xF6glich. Bitte w\xE4hlen Sie eine andere Abholmethode aus.'
                            )
                        )
                    ),
                    this.state.errors.date && _react2.default.createElement(
                        'p',
                        { className: 'info error', style: { color: '#ff0000' } },
                        this.state.errors.date
                    ),
                    _react2.default.createElement('div', { id: 'datetimepicker' })
                ),
                this.state.infoPostCode && _react2.default.createElement(
                    'button',
                    { className: 'btn', onClick: this.handlerClickBook },
                    'Book apointment',
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                    )
                )
            );
        }
    }]);
    return PickupByBicycle;
}(_react.Component);

PickupByBicycle.propTypes = {};
PickupByBicycle.defaultProps = {};
exports.default = PickupByBicycle;

/***/ }),

/***/ 1717:
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

var _reactSelect = __webpack_require__(902);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickupByPackage = function (_Component) {
    (0, _inherits3.default)(PickupByPackage, _Component);

    function PickupByPackage(props) {
        (0, _classCallCheck3.default)(this, PickupByPackage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PickupByPackage.__proto__ || Object.getPrototypeOf(PickupByPackage)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(PickupByPackage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'pickup-by-package' },
                _react2.default.createElement(
                    'h3',
                    { className: 'title' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/packing.svg', alt: '' }),
                    'Paket abholen'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'date-row' },
                    _react2.default.createElement(
                        'h4',
                        null,
                        'Gewunschetes Abholdatum?'
                    ),
                    _react2.default.createElement(_reactSelect2.default, {
                        placeholder: 'Bitte wahlen...' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'date-row' },
                    _react2.default.createElement(
                        'h4',
                        null,
                        'Gewunschetes Abholdatum?'
                    ),
                    _react2.default.createElement(_reactSelect2.default, {
                        placeholder: 'Bitte wahlen...' })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
                ),
                _react2.default.createElement(
                    'button',
                    { className: 'btn' },
                    'Book apointment',
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'text-right' },
                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/swiss-post.svg', alt: '' })
                )
            );
        }
    }]);
    return PickupByPackage;
}(_react.Component);

PickupByPackage.propTypes = {};
PickupByPackage.defaultProps = {};
exports.default = PickupByPackage;

/***/ }),

/***/ 774:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasketVerkaufen = undefined;

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

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(206);

var _axios = __webpack_require__(149);

var _axios2 = _interopRequireDefault(_axios);

var _debounce2 = __webpack_require__(899);

var _debounce3 = _interopRequireDefault(_debounce2);

var _helpersFunction = __webpack_require__(316);

var _personalData = __webpack_require__(1483);

var _personalData2 = _interopRequireDefault(_personalData);

var _productOverview = __webpack_require__(1513);

var _productOverview2 = _interopRequireDefault(_productOverview);

var _showResults = __webpack_require__(1711);

var _showResults2 = _interopRequireDefault(_showResults);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _basket = __webpack_require__(327);

var basketActions = _interopRequireWildcard(_basket);

var _user = __webpack_require__(217);

var userActions = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BasketVerkaufen = exports.BasketVerkaufen = function (_Component) {
    (0, _inherits3.default)(BasketVerkaufen, _Component);

    function BasketVerkaufen(props) {
        (0, _classCallCheck3.default)(this, BasketVerkaufen);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BasketVerkaufen.__proto__ || Object.getPrototypeOf(BasketVerkaufen)).call(this, props));

        _this.state = {
            country: {
                countriesList: [],
                currentCountry: {
                    inputCountry: "CH",
                    customer_inputCountry: "CH"
                }
            },
            inputCheckbox: {
                shippingAddress: true,
                company: false,
                customerCompanyName: false,
                asGuest: false
            },
            couponError: null,
            infoMsg: null,
            errors: {
                password: '',
                info: '',
                general: ''
            },
            showResults: null
        };

        _this.changeCheckbox = _this.changeCheckbox.bind(_this);
        _this.changeCountry = _this.changeCountry.bind(_this);
        _this.changeCoupon = _this.changeCoupon.bind(_this);
        _this.triggerChangeCoupon = _this.triggerChangeCoupon.bind(_this);
        _this.changeForm = _this.changeForm.bind(_this);
        _this.send = _this.send.bind(_this);
        _this.handleRemoveFromBasket = _this.handleRemoveFromBasket.bind(_this);
        _this.closeShowResults = _this.closeShowResults.bind(_this);
        _this._gtag_report_conversion = _this._gtag_report_conversion.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(BasketVerkaufen, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === false) {
                var inputs = document.querySelectorAll('.personalData input');
                inputs.forEach(function (item) {
                    item.value = "";
                    item.checked = false;
                });
                var inputCheckbox = this.state.inputCheckbox;

                inputCheckbox.company = false;
                this.setState({ inputCheckbox: inputCheckbox });
            }
            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === true) {
                this.setState({ errors: (0, _extends3.default)({}, this.state.errors, { info: '' }) });
            }
            if (nextProps.user.data !== this.props.user.data && nextProps.user.data) {
                window.localStorage.removeItem("userDataVerkaufen");
                window.localStorage.removeItem("userData");
                _helpersFunction._setPersonalDataFields.call(this, nextProps.user.data);
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.inputCouponCallback = (0, _debounce3.default)(function (e) {
                var _this2 = this;

                var email = document.forms.basketForm.email.value,
                    shippingAddress = this.state.inputCheckbox.shippingAddress;

                _axios2.default.get('/api/checkCoupon?coupon=' + e.target.value + '&email=' + email + '&shippingAddress=' + shippingAddress + '&couponType=6').then(function (result) {
                    if (_this2.props.basket.basketDataVerkaufen.every(function (item) {
                        return item.productTypeId != 999;
                    })) {
                        var newBasketData = [].concat((0, _toConsumableArray3.default)(_this2.props.basket.basketDataVerkaufen), [result.data]);
                        _this2.props.basketActions.changeBasketVerkaufenData(newBasketData);
                        e.target.value = '';
                    } else {
                        _this2.setState({ couponError: 'Es ist nich möglich mehrere Gutscheine zu versenden' });
                    }
                }).catch(function (error) {
                    var data = error.response.data;

                    _this2.setState({ couponError: data });
                });
            }, 1000);

            this.inputNameCallback = (0, _debounce3.default)(function (e) {
                var _this3 = this;

                var formType = e.target.name.indexOf('customer') < 0 ? 'shippingAddress' : 'billingAddress';
                _axios2.default.get('/api/autoloadAgileData?search=' + e.target.value + '&fieldName=' + e.target.name).then(function (_ref) {
                    var data = _ref.data;

                    if (data.length > 0) {
                        _this3.setState({
                            autoloadPersonalData: (0, _extends3.default)({}, _this3.state.autoloadPersonalData, {
                                element: _react2.default.createElement(AutoloadPersonalData, { data: data,
                                    formType: formType,
                                    choosePersonalData: _this3.choosePersonalData }),
                                data: data
                            })
                        });
                    } else {
                        _this3.setState({
                            autoloadPersonalData: (0, _extends3.default)({}, _this3.state.autoloadPersonalData, {
                                element: null,
                                data: data
                            })
                        });
                    }
                }).catch(function (error) {});
            }, 500); //autoload user data
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.user.isLogin && this.props.user.data && this.props.basket.basketDataVerkaufen.length > 0) {
                _helpersFunction._setPersonalDataFields.call(this, this.props.user.data);
            } else {
                var personalData = JSON.parse(window.localStorage.getItem('userDataVerkaufen'));
                if (personalData && this.props.basket.basketDataVerkaufen.length > 0) _helpersFunction._setPersonalDataFields.call(this, personalData);
            }
            /*
            axios.get('/api/countries')
                .then(( { data }) => {
                    if(window.isGoogleConnection) {
                        _googleAutocomplete.call(this, data.meta.domainId, 'userDataVerkaufen')
                    }
                    let countriesList = data.data.map( item => { return { value: item['name-short'], label: item['name-de']}})
                    this.setState({country: {...this.state.country, countriesList} })
                })
            */
            var remarketDomainId = 2;
            var countriesList = [{ value: 'ch', label: 'Schweiz' }, { value: 'li', label: 'Liechtenstein' }];
            this.setState({ country: (0, _extends3.default)({}, this.state.country, { countriesList: countriesList }) });
            if (window.isGoogleConnection) {
                _helpersFunction._googleAutocomplete.call(this, remarketDomainId, 'userDataVerkaufen');
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (!this.props.user.isLogin) {
                var personalData = (0, _helpersFunction._getPersonalDataFields)();
                window.localStorage.setItem('userDataVerkaufen', JSON.stringify(personalData));
            }
        }
    }, {
        key: '_gtag_report_conversion',
        value: function _gtag_report_conversion() {
            var callback = function callback() {
                if (typeof url != 'undefined') {
                    window.location = url;
                }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-827036726/XGt5CJnpz3sQtqiuigM',
                'event_callback': callback
            });
            return false;
        }
    }, {
        key: 'changeCountry',
        value: function changeCountry(val, name) {
            var value = val.value,
                currentCountry = this.state.country.currentCountry;

            currentCountry[name] = value;
            this.setState({ country: (0, _extends3.default)({}, this.state.country, { currentCountry: currentCountry }) });
        }
    }, {
        key: 'changeCheckbox',
        value: function changeCheckbox(e) {
            var inputCheckbox = this.state.inputCheckbox,
                name = e.target.name;

            inputCheckbox[name] = !inputCheckbox[name];
            this.setState({ inputCheckbox: inputCheckbox });
        }
    }, {
        key: 'changeCoupon',
        value: function changeCoupon(e) {
            this.setState({ couponError: null });
            e.persist();
            this.inputCouponCallback(e);
        }
    }, {
        key: 'triggerChangeCoupon',
        value: function triggerChangeCoupon() {
            if ($('#input_coupon').val() == "") {
                this.setState({ couponError: 'please input code eingeben' });
                return;
            }
            this.setState({ couponError: null });
            this.inputCouponCallback({ 'target': { 'value': $('#input_coupon').val() } });
        }
    }, {
        key: 'handleRemoveFromBasket',
        value: function handleRemoveFromBasket(productTypeId, id) {
            var basketData = this.props.basket.basketDataVerkaufen,
                newBasketData = [];
            if (productTypeId === 999) {
                // if item "Coupon"
                newBasketData = basketData.filter(function (item) {
                    return item.shortcode != id;
                });
            } else {
                newBasketData = basketData.filter(function (item) {
                    return item.id != id;
                });
            }
            this.props.basketActions.changeBasketVerkaufenData(newBasketData);
        }
    }, {
        key: 'closeShowResults',
        value: function closeShowResults(currentTab) {
            var isLogin = this.props.user.isLogin,
                inputCheckbox = (0, _extends3.default)({}, this.state.inputCheckbox);


            if (currentTab === 'instructions') {
                snaptr('track', 'SIGN_UP', { 'SIGN_UP': 'true' });

                if (!isLogin) {
                    if (inputCheckbox.asGuest) {
                        _reactRouter.browserHistory.push('/');
                    } else {
                        this.props.userActions.setRedirectTo('/kundenkonto');
                        setTimeout(function () {
                            return document.getElementById("op").checked = true;
                        }, 100);
                    }
                } else {
                    _reactRouter.browserHistory.push('/kundenkonto');
                }
            }
        }
    }, {
        key: 'send',
        value: function send(e) {
            var _this4 = this;

            e.preventDefault();
            var data = new FormData(document.forms.basketForm);
            data.append("basketData", JSON.stringify(this.props.basket.basketDataVerkaufen));

            document.getElementById('spinner-box-load').style.display = 'block';
            _axios2.default.post('/api/basketPayout', data).then(function (result) {
                document.getElementById('spinner-box-load').style.display = 'none';
                window.localStorage.setItem('email', result.data[0].viewData.email);
                window.localStorage.setItem('order', result.data[0].viewData.basketPayoutShortcode);
                window.localStorage.setItem('template', JSON.stringify(result.data[0].viewData.templates));
                window.localStorage.setItem('PDFData', JSON.stringify(result.data[0].PDFData));
                window.localStorage.setItem('basketDataVerkaufenForSellPage', JSON.stringify(_this4.props.basket.basketDataVerkaufen));
                //clear basket verkaufen
                window.localStorage.removeItem('basketDataVerkaufen');
                _this4.props.basketActions.changeBasketVerkaufenData([]);
                //browserHistory.push('/verkaufen/sell-overview')

                if (window.isMobile) {
                    $('.basketWrap>div').hide();
                }

                _this4.setState({ showResults: _react2.default.createElement(_showResults2.default, { closeShowResults: _this4.closeShowResults,
                        pdfUrl: result.data[0].PDFPath,
                        showInstructions: true })
                });
                _this4.props.sendSuccess && _this4.props.sendSuccess();
                if (window.isGoogleConnection) {
                    // this._gtag_report_conversion() //google adwords
                }
                if (window.isFBConnection) {
                    fbq('track', 'CompleteRegistration', { value: result.data[0].PDFData.totalPrice, currency: window.currencyValue }); // facebook pixel
                }
            }).catch(function (error) {
                var err = error.response.data.errors,
                    info = void 0,
                    password = void 0,
                    general = void 0;
                if (err) {
                    err.email ? info = err.email : '';
                    err.password ? password = err.password : '';
                    err.general ? general = err.general : '';
                }
                _this4.setState({ errors: (0, _extends3.default)({}, _this4.state.errors, { info: info, password: password, general: general }) });
                document.getElementById('spinner-box-load').style.display = 'none';
            });
        }
    }, {
        key: 'changeForm',
        value: function changeForm() {
            var personalData = (0, _helpersFunction._getPersonalDataFields)();
            window.localStorage.setItem('userDataVerkaufen', JSON.stringify(personalData));
            this.setState({ errors: (0, _extends3.default)({}, this.state.errors, { info: '', password: '', general: '' }) });
        }
    }, {
        key: 'cancelSendByEnter',
        value: function cancelSendByEnter(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                return false;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                country = _state.country,
                inputCheckbox = _state.inputCheckbox,
                couponError = _state.couponError,
                errors = _state.errors,
                basketDataVerkaufen = this.props.basket.basketDataVerkaufen;

            return _react2.default.createElement(
                'div',
                { className: 'basketWrap verkaufen sellPage' },
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'p',
                        { className: 'successMsg' },
                        this.state.infoMsg
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'errorInfo' },
                        this.state.errors.general
                    ),
                    basketDataVerkaufen.length > 0 ? _react2.default.createElement(
                        'form',
                        { action: '#', name: 'basketForm', onChange: this.changeForm, onKeyPress: this.cancelSendByEnter.bind(this), onSubmit: this.send },
                        _react2.default.createElement(
                            'div',
                            { className: 'row formWrap' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-7' },
                                _react2.default.createElement(_personalData2.default, { country: country,
                                    cancelRedirect: this.props.userActions.cancelRedirectToMyAccount,
                                    user: this.props.user,
                                    error: errors,
                                    inputCheckbox: inputCheckbox,
                                    changeCountry: this.changeCountry,
                                    handlerSendSellBasket: this.send,
                                    changeCheckbox: this.changeCheckbox })
                            ),
                            _react2.default.createElement(_productOverview2.default, { basketData: basketDataVerkaufen,
                                goToCheckoutMobile: this.props.goToCheckout,
                                changeCoupon: this.changeCoupon,
                                triggerChangeCoupon: this.triggerChangeCoupon,
                                couponError: couponError,
                                removeFromBasket: this.handleRemoveFromBasket })
                        )
                    ) : _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Verkaufskorb'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'emptyBasket' },
                            'Ihr Verkaufskorb ist leer.'
                        )
                    )
                ),
                this.state.showResults
            );
        }
    }]);
    return BasketVerkaufen;
}(_react.Component);

BasketVerkaufen.propTypes = {};
BasketVerkaufen.defaultProps = {};

function mapStateToProps(state) {
    return {
        basket: state.basket,
        user: state.user
    };
}
function mapDispatchToProps(dispatch) {
    return {
        basketActions: (0, _redux.bindActionCreators)(basketActions, dispatch),
        userActions: (0, _redux.bindActionCreators)(userActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, { pure: false })(BasketVerkaufen);

/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasketVerkaufenMobile = undefined;

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

var _basketVerkaufenPage = __webpack_require__(774);

var _basketVerkaufenPage2 = _interopRequireDefault(_basketVerkaufenPage);

var _headerMobile = __webpack_require__(932);

var _headerMobile2 = _interopRequireDefault(_headerMobile);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _user = __webpack_require__(217);

var userActions = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BasketVerkaufenMobile = exports.BasketVerkaufenMobile = function (_Component) {
    (0, _inherits3.default)(BasketVerkaufenMobile, _Component);

    function BasketVerkaufenMobile(props) {
        (0, _classCallCheck3.default)(this, BasketVerkaufenMobile);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BasketVerkaufenMobile.__proto__ || Object.getPrototypeOf(BasketVerkaufenMobile)).call(this, props));

        _this.state = {
            titleForHead: 'Verkaufskorb',
            basketStep: 'product'
        };
        _this.handleBackBtn = _this.handleBackBtn.bind(_this);
        _this.goToCheckout = _this.goToCheckout.bind(_this);
        _this.sendSuccess = _this.sendSuccess.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(BasketVerkaufenMobile, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if ($('#intercom-container').length > 0) {
                $('#intercom-container .intercom-launcher-frame').removeAttr('style');
                $('#intercom-container').before('<div class="fixedBtnBasketVerkaufen"></div>');
            }
            if ($('#tidio-chat').length > 0) {
                $('#tidio-chat').before('<div class="fixedBtnBasketVerkaufen"></div>');
            } else $('body').append('<div class="fixedBtnBasketVerkaufen"></div>');
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $('#intercom-container .intercom-launcher-frame').attr('style', 'bottom:20px !important');
            $('#tidio-chat #tidio-chat-iframe').css({
                bottom: "-10px",
                right: "10px"
            });
            $('body .fixedBtnBasketVerkaufen').remove();
        }
    }, {
        key: '_defineTitleHead',
        value: function _defineTitleHead(name) {
            this.setState({ titleForHead: name });
        }
    }, {
        key: 'handleBackBtn',
        value: function handleBackBtn() {
            if (this.state.basketStep === 'personal') {
                $('.productWrap').show();
                $('.personalData, .basketSubmit').hide();
                this.setState({ titleForHead: 'Verkaufskorb' });
            } else if (this.state.basketStep === 'instructions') {
                var isLogin = this.props.user.isLogin;

                if (!isLogin) {
                    document.getElementById("op").checked = true;
                    this.props.userActions.setRedirectTo('/kundenkonto');
                } else {
                    _reactRouter.browserHistory.push('/kundenkonto');
                }
            }
        }
    }, {
        key: 'goToCheckout',
        value: function goToCheckout() {
            this._defineTitleHead('1/2 Persönliche Angaben');
            this.setState({ basketStep: 'personal' });
            $('.productWrap').hide();
            $('.personalData, .basketSubmit').show();
        }
    }, {
        key: 'sendSuccess',
        value: function sendSuccess() {
            this._defineTitleHead('2/2 Anleitung');
            this.setState({ basketStep: 'instructions' });
        }
    }, {
        key: 'render',
        value: function render() {
            var titleForHead = this.state.titleForHead;

            return _react2.default.createElement(
                'div',
                { className: 'basketVerkaufen' },
                _react2.default.createElement(_headerMobile2.default, { menu: titleForHead === "Verkaufskorb",
                    back: titleForHead !== 'Verkaufskorb',
                    handlerBack: this.handleBackBtn,
                    title: titleForHead }),
                _react2.default.createElement(_basketVerkaufenPage2.default, { goToCheckout: this.goToCheckout,
                    sendSuccess: this.sendSuccess })
            );
        }
    }]);
    return BasketVerkaufenMobile;
}(_react.Component);

BasketVerkaufenMobile.propTypes = {};
BasketVerkaufenMobile.defaultProps = {};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}
function mapDispatchToProps(dispatch) {
    return {
        userActions: (0, _redux.bindActionCreators)(userActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, { pure: false })(BasketVerkaufenMobile);

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