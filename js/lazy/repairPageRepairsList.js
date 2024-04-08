webpackJsonp([37],{

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
var ReactDOM = __webpack_require__(321);

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

/***/ 1568:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(28);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(206);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BankPaymentModal = function BankPaymentModal(_ref) {
    var data = _ref.data,
        fromRepair = _ref.fromRepair;

    // let url = fromRepair ? '/reparieren/danke' : '/danke'
    (0, _react.useEffect)(function () {
        $('#BankPaymentModal').modal('show');
    }, []);

    var closeModal = function closeModal() {
        window.localStorage.removeItem('bankPaymentData');
        $('#BankPaymentModal').modal('hide');
    };

    return _react2.default.createElement(
        'div',
        { className: 'modal fade',
            id: 'BankPaymentModal',
            tabIndex: '-1',
            role: 'dialog',
            'data-backdrop': 'static',
            'aria-labelledby': 'myModalLabel' },
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
                        { type: 'button',
                            onClick: closeModal,
                            className: 'close',
                            'data-dismiss': 'modal',
                            'aria-label': 'Close' },
                        _react2.default.createElement(
                            'span',
                            { 'aria-hidden': 'true' },
                            '\xD7'
                        )
                    ),
                    _react2.default.createElement(
                        'h4',
                        { className: 'modal-title', id: 'myModalLabel' },
                        'Bitte \xFCberweisen Sie das Geld auf das folgende Konto:'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'modal-body' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'Kontoinhaber Firmenname: ',
                            data.companyName
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'Kontoinhaber Adresse: Gerbergasse 82, CH-4001 Basel'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'Bankname: ',
                            data.bankName
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'IBAN: ',
                            data.bankIban
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'BIC/SWIFT: ',
                            data.bankSwift
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'Clearing: ',
                            data.bankClearing
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'modal-footer' },
                    _react2.default.createElement(
                        'button',
                        { type: 'button',
                            onClick: closeModal,
                            className: 'btn',
                            'data-dismiss': 'modal' },
                        'Schliessen'
                    )
                )
            )
        )
    );
};

BankPaymentModal.propTypes = {};
BankPaymentModal.defaultProps = {
    fromRepair: false
};

exports.default = BankPaymentModal;

/***/ }),

/***/ 1891:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeliveryByPost = undefined;

var _toConsumableArray2 = __webpack_require__(316);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = __webpack_require__(1037);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends7 = __webpack_require__(66);

var _extends8 = _interopRequireDefault(_extends7);

var _classCallCheck2 = __webpack_require__(856);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(857);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(858);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(859);

var _inherits3 = _interopRequireDefault(_inherits2);

var _index = __webpack_require__(149);

var _index2 = _interopRequireDefault(_index);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(313);

var _reactRouter = __webpack_require__(206);

var _reactSelect = __webpack_require__(902);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _redux = __webpack_require__(148);

var _basket = __webpack_require__(327);

var basketActions = _interopRequireWildcard(_basket);

var _helpersFunction = __webpack_require__(315);

var _bankPaymentModal = __webpack_require__(1568);

var _bankPaymentModal2 = _interopRequireDefault(_bankPaymentModal);

var _deliveryByPostSummaryPopup = __webpack_require__(1944);

var _deliveryByPostSummaryPopup2 = _interopRequireDefault(_deliveryByPostSummaryPopup);

var _deliverySuccessLetter = __webpack_require__(1892);

var _deliverySuccessLetter2 = _interopRequireDefault(_deliverySuccessLetter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeliveryByPost = exports.DeliveryByPost = function (_Component) {
    (0, _inherits3.default)(DeliveryByPost, _Component);

    function DeliveryByPost(props) {
        (0, _classCallCheck3.default)(this, DeliveryByPost);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DeliveryByPost.__proto__ || Object.getPrototypeOf(DeliveryByPost)).call(this, props));

        _this.state = {
            formData: new FormDataValue(),
            isChanged: {
                LieferLand: false,
                RechnungLand: false,
                LieferAnrede: false,
                RechnungAnrede: false,
                customerCompany: false,
                shippingCompany: false,
                LieferVorname: false,
                LieferNachname: false,
                RechnungNachname: false,
                RechnungVorname: false,
                LieferFirmenname: false,
                RechnungFirmenname: false,
                LieferTelefon: false,
                RechnungTelefon: false
            },
            country: {
                countriesList: []
            },
            inputCheckbox: {
                shippingAddress: true,
                shippingCompany: false,
                customerCompany: false,
                systemCompany: false
            },
            payMethod: {
                method: null,
                payMethodDatatrans: null
            },
            payForm: null,
            shippingMethods: [],
            showSummaryPopup: false,
            errors: {},
            formSend: false
        };

        _this.changeCheckbox = _this.changeCheckbox.bind(_this);
        _this.changeCountry = _this.changeCountry.bind(_this);
        _this.sendForm = _this.sendForm.bind(_this);
        _this.choosePayMethod = _this.choosePayMethod.bind(_this);
        _this._checkShowSpecialPayMethod = _this._checkShowSpecialPayMethod.bind(_this);
        _this.toggleSummaryPopup = _this.toggleSummaryPopup.bind(_this);
        _this.removeFromBasket = _this.removeFromBasket.bind(_this);
        _this._setPersonalDataForm = _this._setPersonalDataForm.bind(_this);
        _this._getShippingMethod = _this._getShippingMethod.bind(_this);
        _this.handlerChangeInput = _this.handlerChangeInput.bind(_this);
        _this.changeShippingMethod = _this.changeShippingMethod.bind(_this);
        _this._addDatatrans = _this._addDatatrans.bind(_this);
        _this._loadStripe = _this._loadStripe.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(DeliveryByPost, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!window.isMobile) {
                /*find height item-column*/
                var maxHeight = 0;
                $('.item-form-column').each(function () {
                    if ($('div', this).height() > maxHeight) maxHeight = $('div', this).height();
                }).height(maxHeight);
                /*end*/
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                basketDataRepair = _props.basketDataRepair,
                model = _props.model,
                basket = (0, _extends8.default)({}, basketDataRepair, { modelId: model.id });

            window.localStorage.setItem('basketDataRepair', JSON.stringify(basket));
            /*
            axios.get('/api/countries')
                .then(({data}) => {
                    if(window.isGoogleConnection) {
                        _googleAutocomplete.call(this, data.meta.domainId)
                    }
                    let countriesList = data.data.map(item => {
                        return {value: item['name-short'], label: item['name-de']}
                    })
                    this.setState({country: {...this.state.country, countriesList}})
                })
            */
            var remarketDomainId = 2;
            var countriesList = [{ value: 'ch', label: 'Schweiz' }, { value: 'li', label: 'Liechtenstein' }];
            this.setState({ country: (0, _extends8.default)({}, this.state.country, { countriesList: countriesList }) });
            if (window.isGoogleConnection) {
                _helpersFunction._googleAutocomplete.call(this, remarketDomainId);
            }

            this._getShippingMethod();
            this._addDatatrans();

            if (this.props.user.isLogin) {
                _index2.default.get('/api/accountData').then(function (result) {
                    return _this2._setPersonalDataForm(result.data);
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === true) {
                _index2.default.get('/api/accountData').then(function (result) {
                    return _this3._setPersonalDataForm(result.data);
                });
            }
            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === false) {
                this.setState({ formData: new FormDataValue(),
                    inputCheckbox: (0, _extends8.default)({}, this.state.inputCheckbox, {
                        shippingCompany: false,
                        customerCompany: false,
                        systemCompany: false })
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.basketActions.changeShippingMethodRepair(null);

            document.getElementById('datatrans').remove();
            if (this.stripeHandler) this.stripeHandler.close();
        }
    }, {
        key: '_loadStripe',
        value: function _loadStripe(onload) {
            if (!window.StripeCheckout) {
                var script = document.createElement('script');
                script.onload = function () {
                    onload();
                };
                script.src = 'https://checkout.stripe.com/checkout.js';
                document.head.appendChild(script);
            } else {
                onload();
            }
        }
    }, {
        key: '_addDatatrans',
        value: function _addDatatrans() {
            //connect datatrans lib
            (function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);js.id = id;
                js.src = "https://pay.datatrans.com/upp/payment/js/datatrans-1.0.2.js";
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'datatrans');
        }
    }, {
        key: 'changeShippingMethod',
        value: function changeShippingMethod(e, item) {
            this.setState({ errors: (0, _extends8.default)({}, this.state.errors, (0, _defineProperty3.default)({}, e.target.name, '')) });
            this.props.basketActions.changeShippingMethodRepair(item);
        }
    }, {
        key: '_getShippingMethod',
        value: function _getShippingMethod() {
            var _this4 = this;

            _index2.default.get('/api/repairShippingMethods').then(function (result) {
                if (_this4.props.shippingMethod) {
                    var pickasMethod = result.data.filter(function (item) {
                        return item.shortcode === 'PICKAS';
                    })[0];
                    _this4.setState({ shippingMethods: [_this4.props.shippingMethod, pickasMethod] });
                    _this4.props.basketActions.changeShippingMethodRepair(_this4.props.shippingMethod);
                } else {
                    _this4.setState({ shippingMethods: result.data });
                }
            });
        }
    }, {
        key: '_setPersonalDataForm',
        value: function _setPersonalDataForm(data) {
            var formData = (0, _extends8.default)({}, this.state.formData),
                inputCheckbox = (0, _extends8.default)({}, this.state.inputCheckbox);

            for (var key in data) {
                if (formData.hasOwnProperty(key)) formData[key] = data[key];
                if (key === 'company') inputCheckbox.systemCompany = !!data[key];
                if (key === 'LieferFirmenname') inputCheckbox.shippingCompany = !!data[key];
                if (key === 'RechnungFirmenname') inputCheckbox.customerCompany = !!data[key];
            }
            this.setState({ formData: formData, inputCheckbox: inputCheckbox });
        }
    }, {
        key: 'handlerChangeInput',
        value: function handlerChangeInput(e) {
            var _e$target = e.target,
                name = _e$target.name,
                value = _e$target.value,
                form = (0, _extends8.default)({}, this.state.formData),
                inputCheckbox = (0, _extends8.default)({}, this.state.inputCheckbox);


            this.autocomleteFieldsShippingBilling(e, form, inputCheckbox);
            this.changeShippingBillingForm(e);

            this.setState({ errors: (0, _extends8.default)({}, this.state.errors, (0, _defineProperty3.default)({}, name, null)),
                formData: (0, _extends8.default)({}, form, (0, _defineProperty3.default)({}, name, value)),
                inputCheckbox: inputCheckbox
            });
        }
    }, {
        key: 'changeCheckbox',
        value: function changeCheckbox(e) {
            var inputCheckbox = (0, _extends8.default)({}, this.state.inputCheckbox),
                name = e.target.name;


            if (e.target.getAttribute('data-show')) {
                e.target.getAttribute('data-show') === 'true' ? inputCheckbox.shippingAddress = false : inputCheckbox.shippingAddress = true;
            } else {
                this.autocomleteFieldsShippingBilling(e, {}, inputCheckbox);
                this.changeShippingBillingForm(e);

                inputCheckbox[name] = !inputCheckbox[name];
            }

            this.setState({ inputCheckbox: inputCheckbox });
        }
    }, {
        key: 'changeCountry',
        value: function changeCountry(country, name) {
            var e = {
                target: {
                    name: name,
                    value: country.value
                }
            },
                form = (0, _extends8.default)({}, this.state.formData),
                inputCheckbox = (0, _extends8.default)({}, this.state.inputCheckbox);

            this.autocomleteFieldsShippingBilling(e, form, inputCheckbox);
            this.changeShippingBillingForm(e);

            this.setState({ formData: (0, _extends8.default)({}, form, (0, _defineProperty3.default)({}, name, country.value)),
                errors: (0, _extends8.default)({}, this.state.errors, (0, _defineProperty3.default)({}, name, ''))
            });
        }
    }, {
        key: 'changeShippingBillingForm',
        value: function changeShippingBillingForm(e) {
            var name = e.target.name,
                isChanged = (0, _extends8.default)({}, this.state.isChanged);

            if (isChanged.hasOwnProperty(name)) {
                isChanged[name] = true;
                this.setState({ isChanged: isChanged });
            }
        }
    }, {
        key: 'autocomleteFieldsShippingBilling',
        value: function autocomleteFieldsShippingBilling(e, form, inputCheckbox) {
            var _e$target2 = e.target,
                name = _e$target2.name,
                value = _e$target2.value,
                isChanged = this.state.isChanged;


            switch (name) {
                case 'Geschlecht':
                    if (!isChanged.LieferAnrede) form.LieferAnrede = value;
                    if (!isChanged.RechnungAnrede) form.RechnungAnrede = value;
                    break;
                case 'Sprache':
                    if (!isChanged.LieferLand) form.LieferLand = value;
                    if (!isChanged.RechnungLand) form.RechnungLand = value;
                    break;
                case 'systemCompany':
                    if (!isChanged.customerCompany) {
                        inputCheckbox.customerCompany = e.target.checked;
                    }
                    if (!isChanged.shippingCompany) {
                        inputCheckbox.shippingCompany = e.target.checked;
                    }
                    break;
                case 'first_name':
                    if (!isChanged.LieferVorname) form.LieferVorname = value;
                    if (!isChanged.RechnungVorname) form.RechnungVorname = value;
                    break;
                case 'last_name':
                    if (!isChanged.LieferNachname) form.LieferNachname = value;
                    if (!isChanged.RechnungNachname) form.RechnungNachname = value;
                    break;
                case 'company':
                    if (!isChanged.LieferFirmenname) form.LieferFirmenname = value;
                    if (!isChanged.RechnungFirmenname) form.RechnungFirmenname = value;
                    break;
                case 'phone':
                    if (!isChanged.LieferTelefon) form.LieferTelefon = value;
                    if (!isChanged.RechnungTelefon) form.RechnungTelefon = value;
                    break;
            }
        }
    }, {
        key: 'removeFromBasket',
        value: function removeFromBasket(item) {
            if (item.productTypeId == 11) {
                this.props.basketActions.changeShippingMethodRepair(null);
            } else {
                var selectedRepairOptions = [].concat((0, _toConsumableArray3.default)(this.props.basketDataRepair.selectedOptions)),
                    newSelectedOptions = selectedRepairOptions.filter(function (itemSelected) {
                    return itemSelected.shortcode !== item.shortcode;
                });
                this.props.basketActions.changeBasketDataRepair(newSelectedOptions);
            }
        }
    }, {
        key: 'toggleSummaryPopup',
        value: function toggleSummaryPopup() {
            !this.state.showSummaryPopup ? $('.delivery-form').css({ zIndex: '1000001' }) : $('.delivery-form').css({ zIndex: 'auto' });
            this.setState({ showSummaryPopup: !this.state.showSummaryPopup });
        }
    }, {
        key: '_checkShowSpecialPayMethod',
        value: function _checkShowSpecialPayMethod() {
            var _state = this.state,
                inputCheckbox = _state.inputCheckbox,
                formData = _state.formData;

            if (inputCheckbox.shippingAddress) {
                return inputCheckbox.systemCompany && formData.company && inputCheckbox.customerCompany && formData.RechnungFirmenname;
            } else {
                return inputCheckbox.systemCompany && formData.company && inputCheckbox.shippingCompany && formData.LieferFirmenname && inputCheckbox.customerCompany && formData.RechnungFirmenname;
            }
        }
    }, {
        key: 'sendForm',
        value: function sendForm(e) {
            var _this5 = this;

            e.preventDefault();

            var _props2 = this.props,
                basketDataRepair = _props2.basketDataRepair,
                model = _props2.model,
                inputCheckbox = (0, _extends8.default)({}, this.state.inputCheckbox),
                data = (0, _extends8.default)({}, this.state.formData, {
                repairs: basketDataRepair.selectedOptions.map(function (item) {
                    return item.shortcode;
                }),
                shippingMethodShortcode: basketDataRepair.shippingMethod.shortcode,
                shippingAddress: this.state.inputCheckbox.shippingAddress ? 'billing' : 'custom',
                shippingCompany: inputCheckbox.shippingCompany,
                customerCompany: inputCheckbox.customerCompany,
                systemCompany: inputCheckbox.systemCompany,
                modelId: model.id
            });


            document.getElementById('spinner-box-load').style.display = 'block';
            _index2.default.post('/api/bookingWithShipping', data).then(function (result) {
                document.getElementById('spinner-box-load').style.display = 'none';
                if (result.status === 200) {
                    _this5.setState({ formSend: true });
                    _this5.props.submitForm();

                    var basket = (0, _extends8.default)({}, basketDataRepair, { modelId: model.id });
                    window.localStorage.setItem('basketDataRepair', JSON.stringify(basket));

                    if (_this5.state.payMethod.method === 'Datatrans') {
                        _this5.setState({ payForm: _react2.default.createElement('form', { id: 'paymentForm',
                                'data-merchant-id': '3000012768',
                                'data-amount': (0, _helpersFunction.formatPrice)(result.data.totalPrice),
                                'data-currency': 'CHF',
                                'data-paymentmethod': _this5.state.payMethod.payMethodDatatrans,
                                'data-refno': result.data.basketShortcode,
                                'data-sign': '180103170812117471' })
                        });
                        Datatrans.startPayment({ 'form': '#paymentForm',
                            'closed': function closed() {
                                _index2.default.get('/api/closePaymentWindow?basketShortcode=' + result.data.basketShortcode + '&\n                                                                    totalPrice=' + (0, _helpersFunction.formatPrice)(result.data.totalPrice) + '&paymentMethod=' + _this5.state.payMethod.payMethodDatatrans);
                                _this5.setState({ payForm: null });
                            }
                        });
                    } else if (_this5.state.payMethod.method === 'Stripe') {
                        _this5._loadStripe(function () {
                            var ifPay = false;
                            _this5.stripeHandler = window.StripeCheckout.configure({
                                key: window.stripeKey.key,
                                image: '/images/logo.png',
                                locale: 'auto',
                                currency: 'EUR',
                                token: function token(_token) {
                                    if (_token.id) {
                                        document.getElementById('spinner-box-load').style.display = 'block';
                                        _index2.default.get('/api/stripePayment?tokenId=' + _token.id + '&basketShortcode=' + result.data.basketShortcode + '&\n                                                        email=' + _token.email).then(function (result) {
                                            document.getElementById('spinner-box-load').style.display = 'none';
                                            // if(result.status === 200) browserHistory.push('/reparieren/danke')
                                        }).catch(function (error) {
                                            document.getElementById('spinner-box-load').style.display = 'none';
                                            if (error.response.status === 404) _reactRouter.browserHistory.push('/reparieren/error-payment');
                                        });
                                        ifPay = true;
                                    }
                                },
                                closed: function closed() {
                                    if (!ifPay) {
                                        _index2.default.get('/api/closePaymentWindow?basketShortcode=' + result.data.basketShortcode + '&\n                                                       totalPrice=' + (0, _helpersFunction.formatPrice)(result.data.totalPrice) + '&paymentMethod=' + _this5.state.payMethod.payMethodDatatrans);
                                    }
                                }
                            });
                            if (document.querySelector('.stripe-button-el')) document.querySelector('.stripe-button-el').style.display = 'none';
                            _this5.stripeHandler.open({
                                amount: result.data.totalPrice * 100,
                                name: 'Remarket',
                                allowRememberMe: false
                            });
                        });
                    } else if (_this5.state.payMethod.method === 'Vorauskasse/Überweisung') {
                        document.getElementById('spinner-box-load').style.display = 'block';
                        _index2.default.get('/api/bankPayment?basketShortcode=' + result.data.basketShortcode).then(function (result) {
                            document.getElementById('spinner-box-load').style.display = 'none';
                            _this5.setState({ bankPaymentModal: _react2.default.createElement(_bankPaymentModal2.default, { data: result.data, fromRepair: true }) });
                            // $('#BankPaymentModal').modal('show')
                        }).catch(function (error) {
                            if (error.response.status === 404) _reactRouter.browserHistory.push('/reparieren/error-payment');
                        });
                    } else if (_this5.state.payMethod.method === 'PayPal') {
                        document.getElementById('spinner-box-load').style.display = 'block';
                        _index2.default.get('/api/paypalPayment?basketShortcode=' + result.data.basketShortcode).then(function (result) {
                            window.open(result.data.link, '_self');
                        });
                    } else if (_this5.state.payMethod.method === 'PerRechnung') {
                        document.getElementById('spinner-box-load').style.display = 'block';
                        _index2.default.get('/api/paymentByInvoice?basketShortcode=' + result.data.basketShortcode).then(function (result) {
                            document.getElementById('spinner-box-load').style.display = 'none';
                            // if(result.status === 200) browserHistory.push('/reparieren/danke')
                        }).catch(function (error) {
                            if (error.response.status === 404) _reactRouter.browserHistory.push('/reparieren/error-payment');
                        });
                    } else if (_this5.state.payMethod.method === 'payInShop') {
                        document.getElementById('spinner-box-load').style.display = 'block';
                        _index2.default.get('/api/paymentByCash?basketShortcode=' + result.data.basketShortcode).then(function (result) {
                            document.getElementById('spinner-box-load').style.display = 'none';
                            // if(result.status === 200) browserHistory.push('/reparieren/danke')
                        }).catch(function (error) {
                            if (error.response.status === 404) _reactRouter.browserHistory.push('/reparieren/error-payment');
                        });
                    }
                }
            }).catch(function (error) {
                document.getElementById('spinner-box-load').style.display = 'none';
                var errorsResponse = error.response.data.errors,
                    errors = {};

                for (var key in errorsResponse) {
                    errors[key] = errorsResponse[key][0];
                }
                _this5.setState({ errors: errors });
            });
        }
    }, {
        key: 'sendByBicycle',
        value: function sendByBicycle() {}
    }, {
        key: 'choosePayMethod',
        value: function choosePayMethod(e) {
            var method = e.target.value,
                payMethodDatatrans = e.target.getAttribute('data-paymethoddatatrans');
            this.setState({ payMethod: (0, _extends8.default)({}, this.state.payMethod, { method: method, payMethodDatatrans: payMethodDatatrans }) });
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
            var _this6 = this;

            var _state2 = this.state,
                country = _state2.country,
                inputCheckbox = _state2.inputCheckbox,
                formData = _state2.formData,
                shippingMethods = _state2.shippingMethods,
                showSummaryPopup = _state2.showSummaryPopup,
                errors = _state2.errors,
                formSend = _state2.formSend,
                shippingMethod = this.props.basketDataRepair.shippingMethod,
                domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1],
                ifRequired = Math.round(this.props.totalPrice * 100) / 100 !== 0,
                showSpecialPayMethod = this._checkShowSpecialPayMethod(),
                columnClassName = inputCheckbox.shippingAddress ? "col-md-4 col-sm-6 item-form-column " : "col-md-3 col-sm-6 item-form-column";

            return _react2.default.createElement(
                'div',
                { className: 'delivery-post' },
                !formSend && _react2.default.createElement(
                    'div',
                    null,
                    !this.props.mountedInBicycleForm && _react2.default.createElement(
                        'div',
                        { className: 'price' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'title' },
                            'Preis'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'value' },
                            this.props.totalPrice,
                            ' ',
                            domain === 'ch' ? 'CHF' : 'EUR'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'form',
                            { name: 'deliveryByPostForm',
                                className: 'editFormWrap',
                                onKeyPress: this.cancelSendByEnter.bind(this),
                                onSubmit: this.sendForm },
                            _react2.default.createElement(
                                'div',
                                { className: columnClassName },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'user-data personal' },
                                    _react2.default.createElement(
                                        'h3',
                                        { className: 'title' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'num' },
                                            '1'
                                        ),
                                        'Pers\xF6nliche Angaben'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'topPersonalData' },
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { type: 'radio',
                                                name: 'Geschlecht',
                                                checked: formData.Geschlecht == 'Herr',
                                                onChange: this.handlerChangeInput,
                                                value: 'Herr',
                                                required: true }),
                                            _react2.default.createElement('span', null),
                                            'Herr'
                                        ),
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { type: 'radio',
                                                name: 'Geschlecht',
                                                checked: formData.Geschlecht == 'Frau',
                                                onChange: this.handlerChangeInput,
                                                value: 'Frau' }),
                                            _react2.default.createElement('span', null),
                                            'Frau'
                                        ),
                                        errors.Geschlecht && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.Geschlecht
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'personalDataInputHalf' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.first_name,
                                                onChange: this.handlerChangeInput,
                                                name: 'first_name', placeholder: 'Vorname', required: true }),
                                            errors.first_name && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.first_name
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.last_name,
                                                onChange: this.handlerChangeInput,
                                                name: 'last_name', placeholder: 'Nachname', required: true }),
                                            errors.last_name && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.last_name
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'inputFullWidth' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'email',
                                                value: formData.email,
                                                onChange: this.handlerChangeInput,
                                                name: 'email', placeholder: 'E-Mail', required: true }),
                                            errors.email && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.email
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'inputFullWidth' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.phone,
                                                onChange: this.handlerChangeInput,
                                                name: 'phone', placeholder: 'Telefon (mobil)', required: true }),
                                            errors.phone && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.phone
                                            )
                                        )
                                    ),
                                    !country.countriesList.some(function (item) {
                                        return item.value === formData.Sprache.toLowerCase();
                                    }) && _react2.default.createElement('input', { className: 'requiredSelect', type: 'text', required: true }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-row' },
                                        _react2.default.createElement(_reactSelect2.default, {
                                            placeholder: 'Ausw\xE4hlen...',
                                            value: formData.Sprache.toLowerCase(),
                                            name: 'Sprache',
                                            clearable: false,
                                            options: country.countriesList,
                                            searchable: false,
                                            onChange: function onChange(val) {
                                                return _this6.changeCountry(val, "Sprache");
                                            } }),
                                        errors.Sprache && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.Sprache
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'labelCompany' },
                                        _react2.default.createElement('input', { type: 'checkbox',
                                            value: inputCheckbox.systemCompany,
                                            name: 'systemCompany',
                                            checked: inputCheckbox.systemCompany,
                                            onChange: this.changeCheckbox }),
                                        _react2.default.createElement('span', { className: 'check' }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'text' },
                                            'Firma'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: inputCheckbox.systemCompany ? "inputFullWidth" : "inputFullWidth hide" },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.company,
                                                onChange: this.handlerChangeInput,
                                                name: 'company',
                                                placeholder: 'Firma',
                                                required: inputCheckbox.systemCompany }),
                                            errors.company && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.company
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: inputCheckbox.systemCompany ? "inputFullWidth" : "inputFullWidth hide" },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.vat,
                                                onChange: this.handlerChangeInput,
                                                name: 'vat',
                                                placeholder: 'Company number',
                                                required: inputCheckbox.systemCompany }),
                                            errors.vat && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.vat
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: columnClassName },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'user-data billing' },
                                    _react2.default.createElement(
                                        'h3',
                                        { className: 'title' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'num' },
                                            '2'
                                        ),
                                        'Rechnungs-',
                                        _react2.default.createElement('br', null),
                                        'adresse'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'topPersonalData' },
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { type: 'radio',
                                                checked: formData.RechnungAnrede == 'Herr',
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungAnrede',
                                                required: true,
                                                value: 'Herr' }),
                                            _react2.default.createElement('span', null),
                                            'Herr'
                                        ),
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { type: 'radio',
                                                checked: formData.RechnungAnrede == 'Frau',
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungAnrede',
                                                required: true,
                                                value: 'Frau' }),
                                            _react2.default.createElement('span', null),
                                            'Frau'
                                        ),
                                        errors.RechnungAnrede && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.RechnungAnrede
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'personalDataInputHalf' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.RechnungVorname,
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungVorname',
                                                placeholder: 'Vorname',
                                                required: true }),
                                            errors.RechnungVorname && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.RechnungVorname
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.RechnungNachname,
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungNachname',
                                                placeholder: 'Nachname',
                                                required: true }),
                                            errors.RechnungNachname && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.RechnungNachname
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'inputFullWidth street' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.RechnungStrasse,
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungStrasse', id: 'customer_route', placeholder: 'Adresse', required: true }),
                                            errors.RechnungStrasse && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.RechnungStrasse
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'personalDataInputHalf' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.RechnungHausnummer,
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungHausnummer', id: 'customer_street_number', placeholder: 'Nr.', required: true }),
                                            errors.RechnungHausnummer && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.RechnungHausnummer
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'personalDataInputHalf' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.RechnungPLZ,
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungPLZ', placeholder: 'PLZ', id: 'customer_postal_code', required: true }),
                                            errors.RechnungPLZ && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.RechnungPLZ
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.RechnungStadt,
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungStadt', placeholder: 'Stadt', id: 'customer_locality', required: true }),
                                            errors.RechnungStadt && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.RechnungStadt
                                            )
                                        )
                                    ),
                                    !country.countriesList.some(function (item) {
                                        return item.value === formData.RechnungLand.toLowerCase();
                                    }) && _react2.default.createElement('input', { className: 'requiredSelect', type: 'text', required: true }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-row' },
                                        _react2.default.createElement(_reactSelect2.default, {
                                            placeholder: 'Ausw\xE4hlen...',
                                            value: formData.RechnungLand.toLowerCase(),
                                            name: 'RechnungLand',
                                            clearable: false,
                                            options: country.countriesList,
                                            searchable: false,
                                            onChange: function onChange(val) {
                                                return _this6.changeCountry(val, "RechnungLand");
                                            } }),
                                        errors.RechnungLand && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.RechnungLand
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'inputFullWidth' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.RechnungTelefon,
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungTelefon', placeholder: 'Telefon', required: true }),
                                            errors.RechnungTelefon && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.RechnungTelefon
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'labelCompany' },
                                        _react2.default.createElement('input', { type: 'checkbox',
                                            name: 'customerCompany',
                                            value: inputCheckbox.customerCompany,
                                            checked: inputCheckbox.customerCompany,
                                            onClick: this.changeCheckbox }),
                                        _react2.default.createElement('span', { className: 'check' }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'text' },
                                            'Firma'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: inputCheckbox.customerCompany ? "inputFullWidth" : "inputFullWidth hide" },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.RechnungFirmenname,
                                                onChange: this.handlerChangeInput,
                                                name: 'RechnungFirmenname',
                                                placeholder: 'Firma',
                                                required: inputCheckbox.customerCompany }),
                                            errors.RechnungFirmenname && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.RechnungFirmenname
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'topPersonalData showBillingForm' },
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(
                                                'label',
                                                { style: { width: '100%' } },
                                                _react2.default.createElement('input', { type: 'radio',
                                                    value: 'billing',
                                                    name: 'shippingAddress',
                                                    'data-show': 'false',
                                                    checked: inputCheckbox.shippingAddress,
                                                    onChange: this.changeCheckbox }),
                                                _react2.default.createElement('span', null),
                                                'Lieferadresse = Rechnungsadresse'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(
                                                'label',
                                                { style: { width: '100%' } },
                                                _react2.default.createElement('input', { type: 'radio',
                                                    value: 'custom',
                                                    name: 'shippingAddress',
                                                    'data-show': 'true',
                                                    checked: !inputCheckbox.shippingAddress,
                                                    onChange: this.changeCheckbox }),
                                                _react2.default.createElement('span', null),
                                                'Lieferadresse erstellen'
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: inputCheckbox.shippingAddress === true ? 'hide col-md-3 col-sm-6 item-form-column' : "col-sm-6 col-md-3 item-form-column" },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'user-data shipping' },
                                    _react2.default.createElement(
                                        'h3',
                                        { className: 'title' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'num' },
                                            '3'
                                        ),
                                        'Liefer-',
                                        _react2.default.createElement('br', null),
                                        'adresse'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'topPersonalData' },
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { type: 'radio',
                                                checked: formData.LieferAnrede == 'Herr',
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferAnrede',
                                                value: 'Herr',
                                                required: !inputCheckbox.shippingAddress }),
                                            _react2.default.createElement('span', null),
                                            'Herr'
                                        ),
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            _react2.default.createElement('input', { type: 'radio',
                                                checked: formData.LieferAnrede == 'Frau',
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferAnrede',
                                                value: 'Frau',
                                                required: !inputCheckbox.shippingAddress }),
                                            _react2.default.createElement('span', null),
                                            'Frau'
                                        ),
                                        errors.LieferAnrede && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.LieferAnrede
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'personalDataInputHalf' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.LieferVorname,
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferVorname',
                                                placeholder: 'Vorname',
                                                required: !inputCheckbox.shippingAddress }),
                                            errors.LieferVorname && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.LieferVorname
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.LieferNachname,
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferNachname',
                                                placeholder: 'Nachname',
                                                required: !inputCheckbox.shippingAddress }),
                                            errors.LieferNachname && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.LieferNachname
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'inputFullWidth street' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.LieferStrasse,
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferStrasse', id: 'route', placeholder: 'Strasse', required: !inputCheckbox.shippingAddress }),
                                            errors.LieferStrasse && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.LieferStrasse
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'personalDataInputHalf' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.LieferHausnummer,
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferHausnummer', id: 'street_number', placeholder: 'Nr.', required: !inputCheckbox.shippingAddress }),
                                            errors.LieferHausnummer && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.LieferHausnummer
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'personalDataInputHalf' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.LieferPLZ,
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferPLZ', placeholder: 'PLZ', id: 'postal_code', required: !inputCheckbox.shippingAddress }),
                                            errors.LieferPLZ && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.LieferPLZ
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.LieferStadt,
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferStadt', placeholder: 'Stadt', id: 'locality', required: !inputCheckbox.shippingAddress }),
                                            errors.LieferStadt && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.LieferStadt
                                            )
                                        )
                                    ),
                                    !country.countriesList.some(function (item) {
                                        return item.value === formData.LieferLand.toLowerCase();
                                    }) && inputCheckbox.shippingAddress !== true && _react2.default.createElement('input', { className: 'requiredSelect', type: 'text', required: true }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-row' },
                                        _react2.default.createElement(_reactSelect2.default, {
                                            placeholder: 'Ausw\xE4hlen...',
                                            value: formData.LieferLand.toLowerCase(),
                                            name: 'LieferLand',
                                            clearable: false,
                                            options: country.countriesList,
                                            searchable: false,
                                            onChange: function onChange(val) {
                                                return _this6.changeCountry(val, "LieferLand");
                                            } }),
                                        errors.LieferLand && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.LieferLand
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'inputFullWidth phone' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.LieferTelefon,
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferTelefon', placeholder: 'Telefon', required: !inputCheckbox.shippingAddress }),
                                            errors.LieferTelefon && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.LieferTelefon
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'labelCompany' },
                                        _react2.default.createElement('input', { type: 'checkbox',
                                            value: inputCheckbox.shippingCompany,
                                            name: 'shippingCompany',
                                            checked: inputCheckbox.shippingCompany,
                                            onChange: this.changeCheckbox }),
                                        _react2.default.createElement('span', { className: 'check' }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'text' },
                                            'Firma'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: inputCheckbox.shippingCompany ? "inputFullWidth" : "inputFullWidth hide" },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-row' },
                                            _react2.default.createElement('input', { type: 'text',
                                                value: formData.LieferFirmenname,
                                                onChange: this.handlerChangeInput,
                                                name: 'LieferFirmenname',
                                                placeholder: 'Firma',
                                                required: inputCheckbox.shippingCompany }),
                                            errors.LieferFirmenname && _react2.default.createElement(
                                                'p',
                                                { className: 'info error' },
                                                errors.LieferFirmenname
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: columnClassName },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'shipping-method' },
                                        _react2.default.createElement(
                                            'h4',
                                            { className: 'title' },
                                            'Versandmethode:'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'topPersonalData' },
                                            shippingMethods.map(function (item, i) {
                                                return _react2.default.createElement(
                                                    'label',
                                                    { key: i },
                                                    _react2.default.createElement('input', { type: 'radio',
                                                        required: true,
                                                        onChange: function onChange(e) {
                                                            return _this6.changeShippingMethod(e, item);
                                                        },
                                                        checked: shippingMethod && item.shortcode === shippingMethod.shortcode,
                                                        value: item.shortcode,
                                                        name: 'shippingMethodShortcode' }),
                                                    _react2.default.createElement('span', null),
                                                    item.name
                                                );
                                            })
                                        ),
                                        errors.shippingMethodShortcode && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.shippingMethodShortcode
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'payment-method' },
                                        _react2.default.createElement(
                                            'h3',
                                            { className: 'title' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'num' },
                                                '4'
                                            ),
                                            'Zahlungsmethode'
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'view-summary', onClick: this.toggleSummaryPopup },
                                            'Zusammenfassung anzeigen'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'topPersonalData' },
                                            _react2.default.createElement(
                                                'ul',
                                                { onChange: this.choosePayMethod },
                                                shippingMethod && shippingMethod.shortcode === 'PICKAS' && _react2.default.createElement(
                                                    'li',
                                                    null,
                                                    _react2.default.createElement(
                                                        'label',
                                                        null,
                                                        _react2.default.createElement('input', { type: 'radio', name: 'payment_method', required: ifRequired, value: 'payInShop' }),
                                                        _react2.default.createElement('span', { className: 'radio' }),
                                                        'Zahlung bei Abholung'
                                                    )
                                                ),
                                                domain === 'ch' && _react2.default.createElement(
                                                    'div',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'label',
                                                            null,
                                                            _react2.default.createElement('input', { type: 'radio', name: 'payment_method', required: ifRequired, value: 'Datatrans', 'data-paymethoddatatrans': 'VIS' }),
                                                            _react2.default.createElement('span', { className: 'radio' }),
                                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/4.png', width: '24', height: '24', className: 'payment-icon', alt: 'Visa' }),
                                                            'Visa'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'label',
                                                            null,
                                                            _react2.default.createElement('input', { type: 'radio', name: 'payment_method', required: ifRequired, value: 'Datatrans', 'data-paymethoddatatrans': 'ECA' }),
                                                            _react2.default.createElement('span', { className: 'radio' }),
                                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/5.png', width: '24', height: '24', className: 'payment-icon', alt: 'Mastercard' }),
                                                            'Mastercard'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'label',
                                                            null,
                                                            _react2.default.createElement('input', { type: 'radio', name: 'payment_method', required: ifRequired, value: 'Datatrans', 'data-paymethoddatatrans': 'PFC' }),
                                                            _react2.default.createElement('span', { className: 'radio' }),
                                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/3.png', width: '24', height: '24', className: 'payment-icon', alt: 'PostFinance Card' }),
                                                            'PostFinance Card'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'label',
                                                            null,
                                                            _react2.default.createElement('input', { type: 'radio', name: 'payment_method', required: ifRequired, value: 'Datatrans', 'data-paymethoddatatrans': 'TWI' }),
                                                            _react2.default.createElement('span', { className: 'radio' }),
                                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/17.png', width: '24', height: '24', className: 'payment-icon', alt: 'Diners Club' }),
                                                            'TWINT Wallet '
                                                        )
                                                    )
                                                ),
                                                domain === 'de' && _react2.default.createElement(
                                                    'div',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'label',
                                                            null,
                                                            _react2.default.createElement('input', { type: 'radio', name: 'payment_method', required: ifRequired, value: 'Stripe' }),
                                                            _react2.default.createElement('span', { className: 'radio' }),
                                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/4.png', width: '24', height: '24', className: 'payment-icon', alt: 'Visa' }),
                                                            'Visa'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'label',
                                                            null,
                                                            _react2.default.createElement('input', { type: 'radio', name: 'payment_method', required: ifRequired, value: 'Stripe' }),
                                                            _react2.default.createElement('span', { className: 'radio' }),
                                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/5.png', width: '24', height: '24', className: 'payment-icon', alt: 'Mastercard' }),
                                                            'Mastercard'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'label',
                                                            null,
                                                            _react2.default.createElement('input', { type: 'radio', name: 'payment_method', required: ifRequired, value: 'Stripe' }),
                                                            _react2.default.createElement('span', { className: 'radio' }),
                                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/7.png', width: '24', height: '24', className: 'payment-icon', alt: 'American Express' }),
                                                            'American Express'
                                                        )
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'li',
                                                    null,
                                                    _react2.default.createElement(
                                                        'label',
                                                        null,
                                                        _react2.default.createElement('input', { type: 'radio', name: 'payment_method', required: ifRequired, value: 'PayPal' }),
                                                        _react2.default.createElement('span', { className: 'radio' }),
                                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/6.png', width: '24', height: '24', className: 'payment-icon', alt: 'PayPal' }),
                                                        'PayPal'
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'li',
                                                    null,
                                                    _react2.default.createElement(
                                                        'label',
                                                        null,
                                                        _react2.default.createElement('input', { type: 'radio', name: 'payment_method', value: 'Vorauskasse/\xDCberweisung' }),
                                                        _react2.default.createElement('span', { className: 'radio' }),
                                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/10.png', width: '24', height: '24', className: 'payment-icon', alt: 'Vorauskasse' }),
                                                        'Vorauskasse'
                                                    )
                                                ),
                                                showSpecialPayMethod && _react2.default.createElement(
                                                    'li',
                                                    null,
                                                    _react2.default.createElement(
                                                        'label',
                                                        null,
                                                        _react2.default.createElement('input', { type: 'radio', name: 'payment_method', value: 'PerRechnung' }),
                                                        _react2.default.createElement('span', { className: 'radio' }),
                                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/icons/payment-type/', width: '24', height: '24', className: 'payment-icon', alt: 'Per Rechnung' }),
                                                        'Per Rechnung'
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'button',
                                        { type: 'submit', className: 'btn', onSubmit: this.sendForm, onClick: this.props.selectDesiredButton },
                                        'Weiter',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    this.state.bankPaymentModal,
                    this.state.payForm,
                    showSummaryPopup && _react2.default.createElement(_deliveryByPostSummaryPopup2.default, { basketData: this.props.basketDataRepair,
                        sendForm: this.sendForm,
                        removeFromBasket: this.removeFromBasket,
                        totalPrice: this.props.totalPrice,
                        toggleSummaryPopup: this.toggleSummaryPopup })
                ),
                formSend && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_deliverySuccessLetter2.default, { props: this.props }),
                    _react2.default.createElement(
                        'p',
                        { className: 'delivery-form-form-send-text' },
                        'you can spontaneously forward your ',
                        this.props.model.title.split(' ')[1],
                        ' during our opening hours for the repair and wait directly onthe rapaired ',
                        this.props.model.title.split(' ')[1],
                        '!'
                    )
                )
            );
        }
    }]);
    return DeliveryByPost;
}(_react.Component);

DeliveryByPost.propTypes = {};
DeliveryByPost.defaultProps = {
    mountedInBicycleForm: false
};

function mapStateToProps(state) {
    return {
        user: state.user,
        basketDataRepair: state.basket.basketDataRepair
    };
}
function mapDispatchToProps(dispatch) {
    return {
        basketActions: (0, _redux.bindActionCreators)(basketActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DeliveryByPost);


function FormDataValue() {
    this.Geschlecht = '', this.first_name = '', this.last_name = '', this.email = '', this.phone = '', this.Sprache = 'ch', this.company = '', this.vat = '', this.RechnungAnrede = '', this.RechnungVorname = '', this.RechnungNachname = '', this.RechnungStrasse = '', this.RechnungHausnummer = '', this.RechnungPLZ = '', this.RechnungStadt = '', this.RechnungLand = 'ch', this.RechnungTelefon = '', this.RechnungFirmenname = '', this.LieferAnrede = '', this.LieferVorname = '', this.LieferNachname = '', this.LieferStrasse = '', this.LieferHausnummer = '', this.LieferPLZ = '', this.LieferStadt = '', this.LieferLand = 'ch', this.LieferTelefon = '', this.LieferFirmenname = '';
}

/***/ }),

/***/ 1892:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeliverySuccessLetter = function DeliverySuccessLetter(_ref) {
    var props = _ref.props;

    return _react2.default.createElement(
        "ul",
        { className: "person-info" },
        _react2.default.createElement(
            "div",
            { className: "delivery-form-form-send" },
            _react2.default.createElement("img", { loading: "lazy", className: "delivery-form-form-send__img", src: "", alt: "" }),
            _react2.default.createElement(
                "h1",
                { className: "delivery-form-form-send__title" },
                "Thank you!"
            ),
            _react2.default.createElement(
                "p",
                { className: "delivery-form-form-send__content" },
                "I'm glad I can help you estimate the repair price of your device. Send it by postage"
            ),
            _react2.default.createElement(
                "div",
                { className: "delivery-form-form-send__details" },
                _react2.default.createElement(
                    "span",
                    { className: "delivery-form-form-send__details-name" },
                    props.model.title
                ),
                _react2.default.createElement(
                    "span",
                    { className: "delivery-form-form-send__details-price" },
                    props.totalPrice,
                    " ",
                    window.currencyValue
                )
            ),
            _react2.default.createElement(
                "p",
                { className: "delivery-form-form-send__duration" },
                "Duration:",
                _react2.default.createElement(
                    "span",
                    { className: "delivery-form-form-send__duration-period" },
                    " 2-3 days"
                )
            )
        )
    );
};

exports.default = DeliverySuccessLetter;

/***/ }),

/***/ 1943:
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

var _deliveryByPost = __webpack_require__(1891);

var _deliveryByPost2 = _interopRequireDefault(_deliveryByPost);

var _deliveryByBicycle = __webpack_require__(1945);

var _deliveryByBicycle2 = _interopRequireDefault(_deliveryByBicycle);

var _bookAnAppointment = __webpack_require__(1946);

var _bookAnAppointment2 = _interopRequireDefault(_bookAnAppointment);

var _helpersFunction = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RepairPageDeliveryForm = function (_Component) {
    (0, _inherits3.default)(RepairPageDeliveryForm, _Component);

    function RepairPageDeliveryForm(props) {
        (0, _classCallCheck3.default)(this, RepairPageDeliveryForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RepairPageDeliveryForm.__proto__ || Object.getPrototypeOf(RepairPageDeliveryForm)).call(this, props));

        _this.state = {
            activeNavItem: ''
        };

        _this.clickNavItem = _this.clickNavItem.bind(_this);
        _this.mapNotice = _this.mapNotice.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(RepairPageDeliveryForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $("html, body").animate({ scrollTop: $('.select-device.repair-list-part').offset().top - 90 }, 600);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            window.recaptchaOptions = { lang: 'de' };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: 'clickNavItem',
        value: function clickNavItem(e) {
            var activeNavItem = e.currentTarget.getAttribute('data-type');
            this.setState({ activeNavItem: activeNavItem });
        }
    }, {
        key: 'mapNotice',
        value: function mapNotice(item) {
            if (item.notice) {
                return _react2.default.createElement(
                    'li',
                    { key: item.shortcode },
                    item.notice
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var activeNavItem = this.state.activeNavItem,
                _props = this.props,
                totalPrice = _props.totalPrice,
                selectedRepairOptions = _props.selectedRepairOptions,
                model = _props.model,
                basketActions = _props.basketActions,
                totalTime = _props.totalTime,
                showNoticeBlock = selectedRepairOptions.some(function (item) {
                return item.notice;
            });

            return _react2.default.createElement(
                'div',
                { className: 'delivery-form animated fadeIn' },
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
                                { className: 'title' },
                                'Wie wollen Sie die Reparatur durchf\xFChren lassen?'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'navigation' },
                                _react2.default.createElement(
                                    'div',
                                    { className: activeNavItem === 'book' ? 'item-navigation active' : 'item-navigation',
                                        'data-type': 'book',
                                        onClick: this.clickNavItem },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'image' },
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair-delivery-nav-icon-1.png', alt: '' }),
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair-delivery-nav-icon-1-active.png', alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'title' },
                                        'Termin buchen'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'descr' },
                                        'Ladenlokal besuchen'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: activeNavItem === 'bicycle' ? 'item-navigation active' : 'item-navigation',
                                        'data-type': 'bicycle',
                                        onClick: this.clickNavItem },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'image' },
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair-delivery-nav-icon-2.png', alt: '' }),
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair-delivery-nav-icon-2-active.png', alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'title' },
                                        'Per Velokurier'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'descr' },
                                        'Dauer Versand: ca. 2 Stunden (hin- und zur\xFCck)'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: activeNavItem === 'post' ? 'item-navigation active' : 'item-navigation',
                                        'data-type': 'post',
                                        onClick: this.clickNavItem },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'image' },
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair-delivery-nav-icon-3.png', alt: '' }),
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair-delivery-nav-icon-3-active.png', alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'title' },
                                        'Per Postversand'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'descr' },
                                        'Dauer Versand: ca. 2-3 Tage'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: activeNavItem === 'recommend' ? 'item-navigation active' : 'item-navigation',
                                        'data-type': 'recommend',
                                        onClick: this.clickNavItem },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'image' },
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair-delivery-nav-icon-4.png', alt: '' }),
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/repair-delivery-nav-icon-4-active.png', alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'title' },
                                        'Freund empfehlen'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'descr' },
                                        'E-Mail, Whatsapp, etc.'
                                    )
                                )
                            )
                        )
                    ),
                    activeNavItem === 'post' && _react2.default.createElement(_deliveryByPost2.default, { totalPrice: (0, _helpersFunction.formatPrice)(totalPrice),
                        model: model }),
                    activeNavItem === 'bicycle' && _react2.default.createElement(_deliveryByBicycle2.default, { totalPrice: (0, _helpersFunction.formatPrice)(totalPrice),
                        model: model }),
                    activeNavItem === 'book' && _react2.default.createElement(_bookAnAppointment2.default, { model: model,
                        totalTime: totalTime,
                        basketActions: basketActions,
                        selectedRepairOptions: selectedRepairOptions,
                        totalPrice: (0, _helpersFunction.formatPrice)(totalPrice) }),
                    showNoticeBlock && _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-12' },
                            _react2.default.createElement(
                                'div',
                                { className: 'notice-block' },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'head-title' },
                                    _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/warning.png', alt: '' }),
                                    _react2.default.createElement(
                                        'b',
                                        null,
                                        'Wichtiger Hinweis:'
                                    ),
                                    ' Bei Ihrer Reparatur gibt es folgendes zu beachten:'
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    selectedRepairOptions.map(this.mapNotice)
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return RepairPageDeliveryForm;
}(_react.Component);

exports.default = RepairPageDeliveryForm;

/***/ }),

/***/ 1944:
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

var _helpersFunction = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeliveryByPostSummaryPopup = function (_Component) {
    (0, _inherits3.default)(DeliveryByPostSummaryPopup, _Component);

    function DeliveryByPostSummaryPopup(props) {
        (0, _classCallCheck3.default)(this, DeliveryByPostSummaryPopup);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DeliveryByPostSummaryPopup.__proto__ || Object.getPrototypeOf(DeliveryByPostSummaryPopup)).call(this, props));

        _this.state = {};

        _this.mapBasketData = _this.mapBasketData.bind(_this);
        _this.sendForm = _this.sendForm.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(DeliveryByPostSummaryPopup, [{
        key: 'sendForm',
        value: function sendForm() {
            this.props.toggleSummaryPopup();
            $('form.editFormWrap button[type="submit"]').click();
        }
    }, {
        key: 'mapBasketData',
        value: function mapBasketData(item, i) {
            var removeFromBasket = this.props.removeFromBasket,
                selectedRepairOptions = this.props.basketData.selectedOptions,
                maxPriceInSelectedRepairOption = 0,
                maxPriceOptionShortcode = null,
                priceValue = item.priceMax;

            selectedRepairOptions.forEach(function (itemSelectedOption) {
                if (+itemSelectedOption.priceMax > maxPriceInSelectedRepairOption) {
                    maxPriceInSelectedRepairOption = +itemSelectedOption.priceMax;
                    maxPriceOptionShortcode = itemSelectedOption.shortcode;
                }
            });
            if (maxPriceInSelectedRepairOption > 0 && maxPriceInSelectedRepairOption >= +item.priceMax) {
                maxPriceOptionShortcode === item.shortcode ? priceValue = item.priceMax : priceValue = item.minPrice;
            }
            return _react2.default.createElement(
                'tr',
                { key: i },
                _react2.default.createElement(
                    'td',
                    null,
                    item.title
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'span',
                        { className: 'count' },
                        '1'
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'span',
                        { className: 'price' },
                        (0, _helpersFunction.formatPrice)(priceValue),
                        ' ',
                        window.currencyValue
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('span', { onClick: function onClick() {
                            return removeFromBasket(item);
                        },
                        className: 'removeFromBasket' })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                basketData = _props.basketData,
                toggleSummaryPopup = _props.toggleSummaryPopup,
                totalPrice = _props.totalPrice,
                removeFromBasket = _props.removeFromBasket;

            totalPrice = basketData.shippingMethod ? totalPrice + +basketData.shippingMethod.price : totalPrice;
            return _react2.default.createElement(
                'div',
                { className: 'summary-popup basketWrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'summary-popup-container' },
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
                                    onClick: toggleSummaryPopup,
                                    alt: '' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'body productWrap' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    'Bestell\xFCbersicht'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'table',
                                        null,
                                        _react2.default.createElement(
                                            'tbody',
                                            null,
                                            basketData.selectedOptions.map(this.mapBasketData),
                                            basketData.shippingMethod && _react2.default.createElement(
                                                'tr',
                                                null,
                                                _react2.default.createElement(
                                                    'td',
                                                    null,
                                                    basketData.shippingMethod.name
                                                ),
                                                _react2.default.createElement('td', null),
                                                _react2.default.createElement(
                                                    'td',
                                                    null,
                                                    _react2.default.createElement(
                                                        'span',
                                                        { className: 'price' },
                                                        (0, _helpersFunction.formatPrice)(+basketData.shippingMethod.price),
                                                        ' ',
                                                        window.currencyValue
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'td',
                                                    null,
                                                    _react2.default.createElement('span', { onClick: function onClick() {
                                                            return removeFromBasket(basketData.shippingMethod);
                                                        },
                                                        className: 'removeFromBasket' })
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'total clearfix' },
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'col-xs-6 title' },
                                            'Total inkl. MwSt'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'col-xs-6 priceTotal' },
                                            (0, _helpersFunction.formatPrice)(totalPrice),
                                            ' ',
                                            window.currencyValue,
                                            '   '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'commentField' },
                                    _react2.default.createElement('textarea', { name: 'comment', rows: '2', placeholder: 'Notiz / Spezielle Anmerkung' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'buttons' },
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'btn', onClick: this.sendForm },
                                        'Jetzt bezahlen',
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
            );
        }
    }]);
    return DeliveryByPostSummaryPopup;
}(_react.Component);

exports.default = DeliveryByPostSummaryPopup;

/***/ }),

/***/ 1945:
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

var _deliverySuccessLetter = __webpack_require__(1892);

var _deliverySuccessLetter2 = _interopRequireDefault(_deliverySuccessLetter);

var _deliveryByPost = __webpack_require__(1891);

var _deliveryByPost2 = _interopRequireDefault(_deliveryByPost);

var _helpersFunction = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeliveryByBicycle = function (_Component) {
    (0, _inherits3.default)(DeliveryByBicycle, _Component);

    function DeliveryByBicycle(props) {
        (0, _classCallCheck3.default)(this, DeliveryByBicycle);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DeliveryByBicycle.__proto__ || Object.getPrototypeOf(DeliveryByBicycle)).call(this, props));

        _this.state = {
            showInfo: false,
            info: {
                price: null,
                shortcode: null,
                name: null
            },
            errors: {
                zip: null
            },
            formWasSubmit: false
        };

        _this.handleChangeZip = _this.handleChangeZip.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(DeliveryByBicycle, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.inputZipCallback = (0, _debounce3.default)(function (e) {
                var _this2 = this;

                var zip = document.querySelector('.delivery-bicycle input[name="zip"]').value;
                axios.get('/api/checkShippingZip?zip=' + zip).then(function (result) {
                    _this2.setState({ info: result.data, showInfo: true });
                }).catch(function (error) {
                    var zip = error.response.data.errors.zip[0];
                    _this2.setState({ errors: (0, _extends3.default)({}, _this2.state.errors, { zip: zip }), showInfo: false });
                });
            }, 1000);
        }
    }, {
        key: 'submitForm',
        value: function submitForm() {
            this.setState({ formWasSubmit: true });
        }
    }, {
        key: 'handleChangeZip',
        value: function handleChangeZip(e) {
            this.setState({ errors: (0, _extends3.default)({}, this.state.errors, { zip: null }), showInfo: false });
            e.persist();
            this.inputZipCallback(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var totalPrice = this.props.totalPrice,
                _state = this.state,
                info = _state.info,
                showInfo = _state.showInfo,
                formWasSubmit = _state.formWasSubmit;

            return _react2.default.createElement(
                'div',
                { className: 'delivery-bicycle' },
                !formWasSubmit && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'price' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'title' },
                            'price'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'value' },
                            (0, _helpersFunction.formatPrice)(totalPrice),
                            ' ',
                            window.currencyValue
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row row-flex' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6 item-column ' },
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'num' },
                                        '1'
                                    ),
                                    'Calculate the price'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'content' },
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        'Please enter your ',
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'bold' },
                                            'zip code'
                                        ),
                                        ' where ',
                                        _react2.default.createElement('br', null),
                                        ' the device is to be collected:'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-row' },
                                        _react2.default.createElement('input', { type: 'number',
                                            name: 'zip',
                                            placeholder: 'e.g. 4132',
                                            onChange: this.handleChangeZip }),
                                        this.state.errors.zip && _react2.default.createElement(
                                            'p',
                                            { className: 'error' },
                                            this.state.errors.zip
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: showInfo ? "info show" : "info" },
                                        info.name && _react2.default.createElement(
                                            'p',
                                            null,
                                            info.name
                                        ),
                                        info.price && _react2.default.createElement(
                                            'p',
                                            null,
                                            'Price: ',
                                            _react2.default.createElement(
                                                'span',
                                                {
                                                    className: 'bold' },
                                                (0, _helpersFunction.formatPrice)(info.price),
                                                ' ',
                                                window.currencyValue
                                            ),
                                            ' (flat rate per route)'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'You can call one of the two shipping companies at any time (at step 2. and specify your desired or desired time for collection. '
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Please name ',
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'bold' },
                                                '"Standard"'
                                            ),
                                            ' (shipping within 60 minutes) and our customer reference: iReparation as invoice recipient. '
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Please enter your address as the shipping destination.'
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6 item-column' },
                            _react2.default.createElement(
                                'div',
                                { className: 'right-part' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'num' },
                                        '2'
                                    ),
                                    'Enter your contact data'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'numPhone' },
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/guy-banner.svg', alt: '' }),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                { href: 'tel:+615118043' },
                                                '+615118043'
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'address' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-column' },
                                            _react2.default.createElement(
                                                'p',
                                                { className: 'category' },
                                                'Basel Branch'
                                            ),
                                            _react2.default.createElement(
                                                'p',
                                                null,
                                                'remarket.ch GmbH'
                                            ),
                                            _react2.default.createElement(
                                                'p',
                                                null,
                                                'Gerbergasse 82'
                                            ),
                                            _react2.default.createElement(
                                                'p',
                                                null,
                                                '4001 Basel'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item-column' },
                                            _react2.default.createElement(
                                                'p',
                                                { className: 'category' },
                                                'Opening hours'
                                            ),
                                            _react2.default.createElement(
                                                'p',
                                                { className: 'time' },
                                                'Mon - Fri ',
                                                _react2.default.createElement('br', null),
                                                ' 09:00 - 18:30'
                                            ),
                                            _react2.default.createElement(
                                                'p',
                                                { className: 'time' },
                                                'Sat ',
                                                _react2.default.createElement('br', null),
                                                ' 10:00 - 18_00'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-12' },
                            _react2.default.createElement(
                                'div',
                                { className: 'info-block' },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'You are welcome to choose one of our two Velokurierpartner for an EXPRESS delivery. We carry out most of the repairs EXPRESS on the spot, so you only have to do without your bike for about 60 minutes (+ journey from the cyclist) and use it again. '
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'small' },
                                    'Information : The collection and delivery service by Velokurier is only possible for corporate customers'
                                )
                            )
                        )
                    ),
                    showInfo && _react2.default.createElement(_deliveryByPost2.default, { mountedInBicycleForm: true,
                        totalPrice: totalPrice,
                        model: this.props.model,
                        submitForm: this.submitForm.bind(this)
                        // selectDesiredButton={this.selectDesiredButton.bind(this)}
                        , shippingMethod: info })
                ),
                formWasSubmit && _react2.default.createElement(_deliverySuccessLetter2.default, { props: this.props })
            );
        }
    }]);
    return DeliveryByBicycle;
}(_react.Component);

exports.default = DeliveryByBicycle;

/***/ }),

/***/ 1946:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(316);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = __webpack_require__(1037);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = __webpack_require__(66);

var _extends5 = _interopRequireDefault(_extends4);

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

var _reactRecaptcha = __webpack_require__(992);

var _reactRecaptcha2 = _interopRequireDefault(_reactRecaptcha);

var _withStyles = __webpack_require__(1230);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _reactSelect = __webpack_require__(902);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactRedux = __webpack_require__(313);

var _helpersFunction = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BookAnAppointment = function (_Component) {
    (0, _inherits3.default)(BookAnAppointment, _Component);

    function BookAnAppointment(props) {
        (0, _classCallCheck3.default)(this, BookAnAppointment);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (BookAnAppointment.__proto__ || Object.getPrototypeOf(BookAnAppointment)).call(this, props));

        _this2.state = {
            showInfo: false,
            captcha: {
                isCheckCaptcha: false,
                errorCaptcha: false
            },
            isSelectTime: false,
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                colorValue: ''
            },
            openHours: null,
            formWasSubmited: false,
            errors: {
                datetime: ''
            }
        };

        _this2.verifyCaptchaCallback = _this2.verifyCaptchaCallback.bind(_this2);
        _this2.sendForm = _this2.sendForm.bind(_this2);
        _this2.showCaptcha = _this2.showCaptcha.bind(_this2);
        _this2._setDataFields = _this2._setDataFields.bind(_this2);
        _this2.changePhoneNumber = _this2.changePhoneNumber.bind(_this2);
        _this2._initCalendar = _this2._initCalendar.bind(_this2);
        _this2.changeColor = _this2.changeColor.bind(_this2);
        _this2.handlerChangeInput = _this2.handlerChangeInput.bind(_this2);
        _this2._initMap = _this2._initMap.bind(_this2);
        return _this2;
    }

    (0, _createClass3.default)(BookAnAppointment, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            setHeight();
            calendarTimePosition();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === true) {
                this._setDataFields(nextProps.user.data);
            }
            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === false) {
                this.setState({ formData: { firstName: '', lastName: '', email: '', phone: '', colorValue: '' }
                });
            }
            if (nextProps.totalTime !== this.props.totalTime) {
                $('#input').datetimepicker('destroy');
                this._initCalendar(nextProps.totalTime);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._initCalendar(this.props.totalTime);
            setHeight();
            if (this.props.user.isLogin) {
                this._setDataFields(this.props.user.data);
            }
            if (window.isGoogleConnection) {
                this._initMap();
            }
        }
    }, {
        key: 'changePhoneNumber',
        value: function changePhoneNumber(e) {
            this.setState({ formData: (0, _extends5.default)({}, this.state.formData, { phone: e }) });
        }
    }, {
        key: 'handlerChangeInput',
        value: function handlerChangeInput(e) {
            var _e$target = e.target,
                name = _e$target.name,
                value = _e$target.value;

            this.setState({ errors: (0, _extends5.default)({}, this.state.errors, (0, _defineProperty3.default)({}, name, null)),
                formData: (0, _extends5.default)({}, this.state.formData, (0, _defineProperty3.default)({}, name, value))
            });
        }
    }, {
        key: '_initCalendar',
        value: function _initCalendar(totalTime) {
            var _this3 = this;

            var disabledWeekDays = [],
                totalTimeForRepair = totalTime,
                initialMinTime = setMinTimeForToday(),
                minTime = null,
                maxTime = null,
                _this = this;
            axios.get('/api/getShopOpenHours').then(function (result) {
                var todayWeekDay = new Date().getDay();

                getOpenHours(result.data, todayWeekDay);
                createCalendar(initialMinTime, maxTime, disabledWeekDays);
                _this3.setState({ openHours: result.data });
            });
            function setMinTimeForToday() {
                var today = new Date(),
                    startTimeHour = today.getHours(),
                    startTimeMinutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
                return startTimeHour + ':' + startTimeMinutes;
            }
            function getOpenHours(data, todayWeekDay) {
                data.forEach(function (item, index) {
                    if (todayWeekDay == index) {
                        minTime = item.from || 0;
                        maxTime = item.to || 0;
                    }
                    if (!item.from && !item.to) disabledWeekDays.push(index);
                });
                if (maxTime) {
                    var arr = maxTime.split('');
                    arr[arr.length - 1] = +arr[arr.length - 1] + 1;
                    maxTime = arr.join('');
                }
            }
            function checkNeededTimeForRepair() {
                var totalMinutesForRepair = totalTimeForRepair * 60 + 1,
                    countHiddenTimeBlocks = Math.ceil(totalMinutesForRepair / 30);

                $('.xdsoft_time_variant .xdsoft_time').each(function (index, element) {
                    var elementsArray = $('.xdsoft_time_variant .xdsoft_time');
                    if (index + countHiddenTimeBlocks >= elementsArray.length) {
                        $(this).css({ opacity: '.4', pointerEvents: 'none' });
                    }
                });
            }
            function setTimeAfterSelectDate() {
                var timeArray = [].concat((0, _toConsumableArray3.default)($('.xdsoft_time_variant .xdsoft_time')));
                timeArray.forEach(function (item) {
                    return item.classList.remove('xdsoft_current');
                });
            }

            function createCalendar(minTimeParam, maxTimeParam, disabledWeekDays) {
                $.datetimepicker.setLocale('de');
                $('#datetimepicker').datetimepicker({
                    formatDate: 'd.m.Y',
                    formatTime: 'H:i',
                    inline: true,
                    step: 30,
                    minDate: new Date(),
                    disabledWeekDays: disabledWeekDays,
                    minTime: minTimeParam,
                    maxTime: maxTimeParam,
                    scrollMonth: false,
                    defaultSelect: false,
                    onChangeDateTime: function onChangeDateTime(dp, $input) {
                        setHeight();
                        calendarTimePosition();
                    },
                    onChangeMonth: function onChangeMonth() {
                        setHeight();
                    },
                    onChangeYear: function onChangeYear() {
                        setHeight();
                    },
                    onGenerate: function onGenerate(ct, input) {
                        setTimeout(function () {
                            setHeight();
                            calendarTimePosition();
                            checkNeededTimeForRepair();
                        }, 10);
                    },
                    onSelectTime: function onSelectTime() {
                        _this.setState({ isSelectTime: true });
                    },
                    onSelectDate: function onSelectDate(ct, $i) {
                        var today = new Date(),
                            currentYear = today.getFullYear(),
                            currentMonth = today.getMonth(),
                            currentDay = today.getDate(),
                            selectedYear = ct.getFullYear(),
                            selectedMonth = ct.getMonth(),
                            selectedDay = ct.getDate(),
                            selectedDayEqualTodayDay = currentYear === selectedYear && currentMonth === selectedMonth && currentDay === selectedDay;

                        getOpenHours(_this.state.openHours, ct.getDay());
                        if (selectedDayEqualTodayDay) {
                            minTime = setMinTimeForToday();
                        }

                        $('#datetimepicker').datetimepicker('setOptions', { minTime: minTime, maxTime: maxTime });
                        setTimeout(function () {
                            checkNeededTimeForRepair();
                            setTimeAfterSelectDate();
                        }, 20);
                        _this.setState({ errors: (0, _extends5.default)({}, _this.state.errors, { datetime: '' }), isSelectTime: false });
                    }
                });
            }
        }
    }, {
        key: '_setDataFields',
        value: function _setDataFields(data) {
            var email = data.systemAddress.email,
                phone = data.systemAddress.phone,
                firstName = data.systemAddress.first_name,
                lastName = data.systemAddress.last_name;

            if (phone && phone.indexOf('0041') === 0) phone = '+' + phone.slice(2);
            this.setState({ formData: (0, _extends5.default)({}, this.state.formData, { email: email, phone: phone, firstName: firstName, lastName: lastName }) });
        }
    }, {
        key: 'verifyCaptchaCallback',
        value: function verifyCaptchaCallback(res) {
            this.setState({ captcha: (0, _extends5.default)({}, this.state.captcha, { isCheckCaptcha: true, errorCaptcha: false }) });
        }
    }, {
        key: 'showCaptcha',
        value: function showCaptcha(e) {
            var captcha = this.state.captcha;

            if (!captcha.isCheckCaptcha) {
                this.recaptchaInstance.execute();
            } else {
                this.recaptchaInstance.reset();
                this.setState({ captcha: (0, _extends5.default)({}, this.state.captcha, { isCheckCaptcha: false, errorCaptcha: false }) });
            }
        }
    }, {
        key: 'sendForm',
        value: function sendForm(e) {
            var _this4 = this;

            e.preventDefault();

            var _state = this.state,
                captcha = _state.captcha,
                isSelectTime = _state.isSelectTime,
                _props = this.props,
                selectedRepairOptions = _props.selectedRepairOptions,
                model = _props.model,
                datetime = Date.parse(createDateAsUTC(new Date($('#datetimepicker').datetimepicker('getValue')))),
                data = (0, _extends5.default)({}, this.state.formData, {
                datetime: datetime,
                repairs: selectedRepairOptions.map(function (item) {
                    return item.shortcode;
                }),
                modelId: model.id,
                colorId: this.state.formData.colorValue && this.state.formData.colorValue.id
            });

            if ((captcha.isCheckCaptcha || !window.isGoogleConnection) && isSelectTime) {
                document.getElementById('spinner-box-load').style.display = 'block';
                axios.post('/api/bookingWithShopVisit', data).then(function (result) {
                    document.getElementById('spinner-box-load').style.display = 'none';

                    _this4.setState({ formWasSubmited: true });
                    //this.props.basketActions.changeBasketDataRepair([])
                    //this.props.basketActions.changeShippingMethodRepair(null)
                }).catch(function (error) {
                    document.getElementById('spinner-box-load').style.display = 'none';
                    var errorsResponse = error.response.data.errors,
                        errors = {};

                    for (var key in errorsResponse) {
                        errors[key] = errorsResponse[key][0];
                    }
                    _this4.setState({ errors: errors });
                });
            } else {
                this.setState({ captcha: (0, _extends5.default)({}, this.state.captcha, { errorCaptcha: !captcha.isCheckCaptcha }),
                    errors: (0, _extends5.default)({}, this.state.errors, { datetime: !isSelectTime && 'Date/time field is required' })
                });
            }
            function createDateAsUTC(date) {
                return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            }
        }
    }, {
        key: 'changeColor',
        value: function changeColor(colorValue) {
            this.setState({
                formData: (0, _extends5.default)({}, this.state.formData, { colorValue: colorValue }),
                errors: (0, _extends5.default)({}, this.state.errors, { colorId: '' })
            });
        }
    }, {
        key: 'mapColorOptionSelected',
        value: function mapColorOptionSelected(item) {
            return _react2.default.createElement(
                'span',
                null,
                item.value,
                _react2.default.createElement('span', { className: 'colorPic', style: { background: item.code } })
            );
        }
    }, {
        key: 'mapColorOption',
        value: function mapColorOption(item) {
            return _react2.default.createElement(
                'span',
                null,
                item.value,
                _react2.default.createElement('span', { className: 'colorPic', style: { background: item.code } })
            );
        }
    }, {
        key: '_initMap',
        value: function _initMap() {
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

            var myLatlng = new google.maps.LatLng(47.555012, 7.5886962);
            var map = new google.maps.Map(document.querySelector('.mapWrapper'), {
                zoom: 17,
                center: myLatlng
            });
            var infoWindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            var domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1],
                placeId = domain === 'ch' ? 'ChIJ6Woipq25kUcRoqB8dyvAvKA' : 'ChIJxwhr9H6xkUcRzxmAyoHLx8k';
            service.getDetails({
                placeId: placeId
            }, function (result, status) {
                map.setCenter(result.geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    place: {
                        placeId: placeId,
                        location: result.geometry.location
                    }
                });
                marker.setVisible(false);
                var starWidth = result.rating / 5 * 100 + '%';

                var starsContent = '';
                result.rating ? starsContent = '<b style="color:#02ca95">' + result.rating + '&nbsp;</b>\n                                    <div class="back-stars">\n                                        <i class="fa fa-star active" aria-hidden="true"></i>\n                                        <i class="fa fa-star active" aria-hidden="true"></i>\n                                        <i class="fa fa-star active" aria-hidden="true"></i>\n                                        <i class="fa fa-star active" aria-hidden="true"></i>\n                                        <i class="fa fa-star active" aria-hidden="true"></i>\n                                        <div class="front-stars" style="width: ' + starWidth + '">\n                                            <i class="fa fa-star" aria-hidden="true"></i>\n                                            <i class="fa fa-star" aria-hidden="true"></i>\n                                            <i class="fa fa-star" aria-hidden="true"></i>\n                                            <i class="fa fa-star" aria-hidden="true"></i>\n                                            <i class="fa fa-star" aria-hidden="true"></i>\n                                        </div>\n                                    </div>' : null;
                var content = '<div class="map-info-block">\n                            <p><b>' + result.name + '</b></p>\n                            <p>' + result.adr_address.replace(/,/g, '') + '</p>\n                            ' + starsContent + '\n                           </div>';
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
                var overlay = new CustomMarker(result.geometry.location, map, {});
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                totalPrice = _props2.totalPrice,
                model = _props2.model,
                totalTime = _props2.totalTime,
                _state2 = this.state,
                captcha = _state2.captcha,
                errors = _state2.errors,
                formData = _state2.formData,
                formWasSubmited = _state2.formWasSubmited,
                country = window.domainName.name === 'remarket.ch' ? 'ch' : 'de';


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'delivery-book form-send-delivery-book' },
                    !formWasSubmited && _react2.default.createElement(
                        'div',
                        { className: 'price' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'title' },
                            'price'
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'value' },
                            (0, _helpersFunction.formatPrice)(totalPrice),
                            ' ',
                            window.currencyValue
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'form',
                            { name: 'contactData', onSubmit: this.sendForm },
                            formWasSubmited && _react2.default.createElement(
                                'div',
                                { className: 'col-md-4 col-sm-6' },
                                _react2.default.createElement('img', { loading: 'lazy', className: 'form-send-device-photo', src: '', alt: '' }),
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'form-send-thanks' },
                                    'Thank you!'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'form-send-thanks__content' },
                                    'I\'m glad I can help you estimate the repair price of your device. Book appintment'
                                ),
                                _react2.default.createElement(
                                    'section',
                                    { className: 'form-send-devise' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'form-send-devise__model' },
                                            model.title
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'form-send-devise__color' },
                                            _react2.default.createElement('span', { className: 'form-send-devise__color_' + (formData.colorValue && formData.colorValue.id),
                                                style: { background: '' + formData.colorValue.code,
                                                    width: "15px",
                                                    height: "15px",
                                                    display: "inleneBlock",
                                                    borderRadius: "50%"
                                                } }),
                                            '\xA0',
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'form-send-devise__description' },
                                                formData.colorValue.value,
                                                ', 32 GB'
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-send-devise__price' },
                                        (0, _helpersFunction.formatPrice)(totalPrice),
                                        window.currencyValue
                                    )
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'form-send__duration' },
                                    'Duration:\xA0',
                                    totalTime.toFixed(2),
                                    ' ',
                                    +totalTime.toFixed(0) > 0 && +totalTime.toFixed(0) === 1 ? _react2.default.createElement(
                                        'span',
                                        null,
                                        'hour'
                                    ) : _react2.default.createElement(
                                        'span',
                                        null,
                                        'hours'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: formWasSubmited ? "col-md-4 col-sm-6 calendar" : "col-md-4 col-sm-6 item-column calendar" },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    formWasSubmited ? _react2.default.createElement(
                                        'p',
                                        { className: 'form-send__title' },
                                        'Add apointment'
                                    ) : _react2.default.createElement(
                                        'h3',
                                        { className: 'title' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'num' },
                                            '1'
                                        ),
                                        'Datum und Uhrzeit ausw\xE4hlen'
                                    ),
                                    _react2.default.createElement('input', { type: 'text', id: 'datetimepicker' }),
                                    formWasSubmited ? _react2.default.createElement(
                                        'button',
                                        { className: 'btn form-send__btn', type: 'submit' },
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'Book apointment'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'form-send__btn-arrow' },
                                            '\u2192'
                                        )
                                    ) : ''
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'input-row' },
                                    errors.datetime && _react2.default.createElement(
                                        'p',
                                        { className: 'info error' },
                                        errors.datetime
                                    )
                                )
                            ),
                            !formWasSubmited && _react2.default.createElement(
                                'div',
                                { className: 'col-md-4 col-sm-6 item-column' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'h3',
                                        { className: 'title' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'num' },
                                            '2'
                                        ),
                                        'Kontaktdaten eintragen'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-row' },
                                        _react2.default.createElement('input', { type: 'text',
                                            value: formData.firstName,
                                            onChange: this.handlerChangeInput,
                                            name: 'firstName',
                                            required: true, placeholder: 'Vorname' }),
                                        errors.firstName && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.firstName
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-row' },
                                        _react2.default.createElement('input', { type: 'text',
                                            value: formData.lastName,
                                            onChange: this.handlerChangeInput,
                                            name: 'lastName',
                                            required: true, placeholder: 'Nachname' }),
                                        errors.lastName && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.lastName
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-row' },
                                        _react2.default.createElement(_withStyles2.default, {
                                            inputProps: { name: "phone_number", required: true },
                                            pattern: '(\\+?\\d){11,}',
                                            value: formData.phone,
                                            onChange: this.changePhoneNumber,
                                            defaultCountry: country,
                                            autoFormat: false,
                                            placeholder: 'Ihre Mobiltelefonnummer',
                                            flagsImagePath: '/images/design/flags.png' }),
                                        errors.phone && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.phone
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-row' },
                                        _react2.default.createElement('input', { type: 'email',
                                            value: formData.email,
                                            onChange: this.handlerChangeInput,
                                            name: 'email',
                                            required: true,
                                            placeholder: 'E-Mail' }),
                                        errors.email && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.email
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'select' },
                                        _react2.default.createElement(_reactSelect2.default, {
                                            placeholder: 'Bitte w\xE4hlen Sie Farbe Ihres Ger\xE4tes aus',
                                            value: formData.colorValue,
                                            name: 'colorCode',
                                            clearable: false,
                                            options: model.colors,
                                            searchable: false,
                                            required: true,
                                            valueKey: 'id',
                                            labelKey: 'value',
                                            valueRenderer: this.mapColorOptionSelected.bind(this),
                                            optionRenderer: this.mapColorOption.bind(this),
                                            onChange: this.changeColor }),
                                        errors.colorId && _react2.default.createElement(
                                            'p',
                                            { className: 'info error' },
                                            errors.colorId
                                        )
                                    )
                                )
                            ),
                            !formWasSubmited && _react2.default.createElement(
                                'div',
                                { className: 'col-md-4 col-sm-6 item-column' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'h3',
                                        { className: 'title' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'num' },
                                            '3'
                                        ),
                                        'Termin best\xE4tigen'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        'Bitte kontrollieren Sie nochmals alle Angaben und best\xE4tigen Sie den Termin.'
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
                                        'button',
                                        { className: 'btn send', type: 'submit' },
                                        'Jetzt Termin reservierendasdas'
                                    )
                                )
                            ),
                            formWasSubmited && _react2.default.createElement(
                                'div',
                                { className: 'col-md-4 col-sm-6 item-column' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'form-send__title-address' },
                                        'Adressess'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'form-send__address' },
                                        'IRepartur.ch ',
                                        _react2.default.createElement('br', null),
                                        ' Gerbergasse 82 ',
                                        _react2.default.createElement('br', null),
                                        ' CH-4001 Basel'
                                    ),
                                    _react2.default.createElement(
                                        'h3',
                                        { className: 'form-send__title' },
                                        'Ofnungszeiten Basel'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-send-container form-send__address' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Mo-Fr:'
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '09:00 - 18.30 Uhr'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-send-container form-send__address' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Sa:'
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '10:00 - 18.00 Uhr'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-send-contucts' },
                                        _react2.default.createElement(
                                            'h3',
                                            { className: 'form-send-contucts__title' },
                                            'E-mail'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'form-send-contucts__mail' },
                                            _react2.default.createElement('img', { loading: 'lazy', src: '/images/repair-icons/mail.svg', alt: '' }),
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                'basel@irepartur.ch'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'h3',
                                            { className: 'form-send-contucts__title' },
                                            'Telephone'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'form-send-contucts__mail' },
                                            '061 511 22 42'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement('div', { className: !formWasSubmited ? "mapWrapper form-send_none" : "mapWrapper form-send_active" }),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-12' },
                            _react2.default.createElement(
                                'p',
                                { className: 'info-block' },
                                'Gerne k\xF6nnen Sie Ihr Ger\xE4t spontan w\xE4hrend unseren \xD6ffnungszeiten f\xFCr die Reparatur vorbeibringen und direkt auf das reparierte Ger\xE4t warten!'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return BookAnAppointment;
}(_react.Component);

function setHeight() {
    /*find height item-column*/
    var maxHeight = 0;
    $('.item-column').each(function () {
        if ($('div', this).height() > maxHeight) maxHeight = $('div', this).height();
    }).height(maxHeight);
    /*end*/
}
function calendarTimePosition() {
    if ($('.xdsoft_time_variant').height() < $('.xdsoft_timepicker').height()) {
        var count = $('.xdsoft_timepicker').height() - $('.xdsoft_time_variant').height();
        if (count - 96 > 0) $('.xdsoft_time_variant').css({ marginTop: count / 2 - 24 + 'px' });
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(BookAnAppointment);

/***/ }),

/***/ 817:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RepairPageRepairsList = undefined;

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

var _reactRouter = __webpack_require__(206);

var _repairPageDeliveryForm = __webpack_require__(1943);

var _repairPageDeliveryForm2 = _interopRequireDefault(_repairPageDeliveryForm);

var _reactRedux = __webpack_require__(313);

var _redux = __webpack_require__(148);

var _basket = __webpack_require__(327);

var basketActions = _interopRequireWildcard(_basket);

var _helpersFunction = __webpack_require__(315);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RepairPageRepairsList = exports.RepairPageRepairsList = function (_Component) {
    (0, _inherits3.default)(RepairPageRepairsList, _Component);

    function RepairPageRepairsList(props) {
        (0, _classCallCheck3.default)(this, RepairPageRepairsList);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RepairPageRepairsList.__proto__ || Object.getPrototypeOf(RepairPageRepairsList)).call(this, props));

        _this.state = {
            repairList: [],
            model: {
                id: null,
                frontImage: null,
                backImage: null,
                title: null
            },
            isPhonePositionFront: true,
            selectedRepairOptions: [],
            totalPrice: 0,
            totalTime: 0
        };

        _this.getRepairsList = _this.getRepairsList.bind(_this);
        _this.mapRepairList = _this.mapRepairList.bind(_this);
        _this.rotatePhone = _this.rotatePhone.bind(_this);
        _this.wrapRepairOptionsInRow = _this.wrapRepairOptionsInRow.bind(_this);
        _this.chooseRepairOption = _this.chooseRepairOption.bind(_this);
        _this.mapOptionsOnPhone = _this.mapOptionsOnPhone.bind(_this);
        _this.calculatePriceAndTime = _this.calculatePriceAndTime.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(RepairPageRepairsList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getRepairsList();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.params.model !== this.props.params.model) {
                this.getRepairsList(nextProps.params.model);
            }
            if (nextProps.selectedRepairOptions !== this.props.selectedRepairOptions) {
                this.calculatePriceAndTime(nextProps.selectedRepairOptions);
            }
        }
    }, {
        key: 'mapOptionsOnPhone',
        value: function mapOptionsOnPhone(type, item, i) {
            var style = { position: 'absolute', margin: item.positionY + 'px 0 0 ' + item.positionX + 'px' },
                className = '',
                selectedRepairOptions = this.props.selectedRepairOptions;

            if (selectedRepairOptions.some(function (itemSelected) {
                return itemSelected.shortcode == item.shortcode;
            })) className = 'active';
            if (item.isBackPosition && type === 'back') {
                return _react2.default.createElement(
                    'div',
                    { className: 'item-option', key: i, style: style },
                    _react2.default.createElement('label', { htmlFor: 'option-' + item.shortcode, className: className }),
                    _react2.default.createElement(
                        'span',
                        { className: 'title' },
                        item.title
                    )
                );
            }
            if (!item.isBackPosition && type === 'front') {
                return _react2.default.createElement(
                    'div',
                    { className: 'item-option', key: i, style: style },
                    _react2.default.createElement('label', { htmlFor: 'option-' + item.shortcode, className: className }),
                    _react2.default.createElement(
                        'span',
                        { className: 'title' },
                        item.title
                    )
                );
            }
        }
    }, {
        key: 'wrapRepairOptionsInRow',
        value: function wrapRepairOptionsInRow() {
            var rows = this.state.repairList.map(this.mapRepairList).reduce(function (r, element, index) {
                index % 2 === 0 && r.push([]);
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
        key: 'getRepairsList',
        value: function getRepairsList() {
            var _this2 = this;

            var modelParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.params.model;

            var modelId = modelParam.slice(modelParam.lastIndexOf('-') + 1);
            document.getElementById('spinner-box-load').style.display = 'block';
            axios.get('/api/getModelRepairList?modelId=' + modelId).then(function (response) {
                document.getElementById('spinner-box-load').style.display = 'none';
                _this2.setState({ repairList: response.data.repairList, model: response.data.model });
                window.scrollTo(0, document.querySelector('.select-device').offsetTop - 110);
            });
        }
    }, {
        key: 'mapRepairList',
        value: function mapRepairList(item, i) {
            var _this3 = this;

            var selectedRepairOptions = this.props.selectedRepairOptions,
                maxPriceInSelectedRepairOption = 0,
                priceValue = item.priceMax,
                domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1];

            selectedRepairOptions.forEach(function (itemSelectedOption) {
                if (+itemSelectedOption.priceMax > maxPriceInSelectedRepairOption) {
                    maxPriceInSelectedRepairOption = +itemSelectedOption.priceMax;
                }
            });
            if (selectedRepairOptions.length > 0) {
                if (maxPriceInSelectedRepairOption > +item.priceMax) {
                    priceValue = item.minPrice;
                } else if (maxPriceInSelectedRepairOption == +item.priceMax) {
                    var firstSelected = this.state.repairList.find(function (element) {
                        return +element.priceMax == maxPriceInSelectedRepairOption && selectedRepairOptions.some(function (itemSelected) {
                            return itemSelected.shortcode == element.shortcode;
                        });
                    });
                    firstSelected.shortcode == item.shortcode ? priceValue = item.priceMax : priceValue = item.minPrice;
                }
            }
            return _react2.default.createElement(
                'div',
                { className: 'col-sm-6', key: i },
                _react2.default.createElement(
                    'label',
                    { className: 'item-repair-option' },
                    _react2.default.createElement(
                        'div',
                        { className: 'left' },
                        _react2.default.createElement('input', { type: 'checkbox',
                            id: 'option-' + item.shortcode,
                            checked: selectedRepairOptions.some(function (itemSelected) {
                                return itemSelected.shortcode === item.shortcode;
                            }),
                            onChange: function onChange() {
                                return _this3.chooseRepairOption(item);
                            } }),
                        _react2.default.createElement('span', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'image' },
                            _react2.default.createElement('img', { loading: 'lazy', src: item.icon || 'https://www.ireparatur.ch/images/repair-icons/battery.png', alt: '' })
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'name' },
                            item.title
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'right' },
                        _react2.default.createElement(
                            'span',
                            { className: 'price' },
                            (0, _helpersFunction.formatPrice)(priceValue),
                            ' ',
                            domain === 'ch' ? 'CHF' : 'EUR'
                        )
                    )
                )
            );
        }
    }, {
        key: 'chooseRepairOption',
        value: function chooseRepairOption(option) {
            var selectedRepairOptions = [].concat((0, _toConsumableArray3.default)(this.props.selectedRepairOptions));
            if (selectedRepairOptions.some(function (item) {
                return item.shortcode === option.shortcode;
            })) {
                selectedRepairOptions = selectedRepairOptions.filter(function (item) {
                    return item.shortcode !== option.shortcode;
                });
            } else selectedRepairOptions.push(option);
            this.props.basketActions.changeBasketDataRepair(selectedRepairOptions);
        }
    }, {
        key: 'calculatePriceAndTime',
        value: function calculatePriceAndTime(selectedRepairOptions) {
            var maxPriceSelectedOptions = 0,
                maxTimeSelectedOptions = 0,
                totalPrice = 0,
                totalTime = 0;
            selectedRepairOptions.forEach(function (itemSelectedOption) {
                if (+itemSelectedOption.priceMax >= maxPriceSelectedOptions) {
                    maxPriceSelectedOptions = +itemSelectedOption.priceMax;
                }
                if (+itemSelectedOption.timeMax >= maxTimeSelectedOptions) {
                    maxTimeSelectedOptions = +itemSelectedOption.timeMax;
                }
            });
            this.state.repairList.forEach(function (itemRepair) {
                if (selectedRepairOptions.some(function (itemSelected) {
                    return itemRepair.shortcode === itemSelected.shortcode;
                })) {
                    if (+itemRepair.priceMax == maxPriceSelectedOptions) {
                        totalPrice += +itemRepair.priceMax;
                        maxPriceSelectedOptions = null;
                    } else {
                        totalPrice += +itemRepair.minPrice;
                    }
                    if (+itemRepair.timeMax == maxTimeSelectedOptions) {
                        totalTime += +itemRepair.timeMax;
                        maxTimeSelectedOptions = null;
                    } else {
                        totalTime += +itemRepair.timeMin;
                    }
                }
            });
            totalTime = totalTime / 3600;
            this.setState({ totalPrice: totalPrice, totalTime: totalTime });
        }
    }, {
        key: 'rotatePhone',
        value: function rotatePhone() {
            this.setState({ isPhonePositionFront: !this.state.isPhonePositionFront });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                model = _state.model,
                repairList = _state.repairList,
                isPhonePositionFront = _state.isPhonePositionFront,
                totalPrice = _state.totalPrice,
                totalTime = _state.totalTime,
                _props = this.props,
                selectedRepairOptions = _props.selectedRepairOptions,
                basketActions = _props.basketActions;

            return _react2.default.createElement(
                'section',
                { className: 'select-device repair-list-part' },
                _react2.default.createElement(
                    'p',
                    { className: 'title' },
                    'Reparatur ausw\xE4hlen und Preis berechnen'
                ),
                selectedRepairOptions.length > 0 && _react2.default.createElement(_repairPageDeliveryForm2.default, { selectedRepairOptions: selectedRepairOptions,
                    basketActions: basketActions,
                    model: model,
                    totalTime: totalTime,
                    totalPrice: totalPrice }),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wrap-repair-list' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-4 text-center' },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'title', style: { maxWidth: '270px' } },
                                    model.title
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: isPhonePositionFront ? "phone-model" : "phone-model flipped" },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'model front' },
                                        repairList.map(this.mapOptionsOnPhone.bind(this, 'front')),
                                        _react2.default.createElement('img', { loading: 'lazy', src: model.frontImage || 'https://www.ireparatur.ch/images/model-outline/iphone7-front.png', alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'model back' },
                                        repairList.map(this.mapOptionsOnPhone.bind(this, 'back')),
                                        _react2.default.createElement('img', { loading: 'lazy', src: model.backImage || 'https://www.ireparatur.ch/images/model-outline/iphone7-back.png', alt: '' })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { style: { maxWidth: '270px' }, className: 'buttons' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'btn-rotate', onClick: this.rotatePhone },
                                        'Ger\xE4t umdrehen'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'col-md-8' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'repair-options' },
                                    selectedRepairOptions.length > 0 && _react2.default.createElement(
                                        'p',
                                        { className: 'result' },
                                        'Sehr gut, diese Reparatur / Dienstleistung k\xF6nnen wir durchf\xFChren und ist (vor Ort) in ca.',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            ' ',
                                            Math.round(+totalTime * 100) / 100
                                        ),
                                        ' Stunden f\xFCr',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            ' ',
                                            Math.round(+totalPrice * 100) / 100
                                        ),
                                        ' ',
                                        window.currencyValue,
                                        ' erledigt'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { className: 'title' },
                                        'W\xE4hlen Sie aus der Reparatur-Liste (unten) den Fehler auf Ihrem Ger\xE4t, oder direkt auf dem Ger\xE4t (links).'
                                    ),
                                    this.wrapRepairOptionsInRow()
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'bottom-info' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'col-xs-12' },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'The technical specifications of the iPhone 7 Plus are based on the basic version iPhone 7, but differ in some points. Thus, the screen diagonal of 5.5 inches is slightly larger and the resolution of 1920 x 1080 pixels corresponds to the full HD standard. The device has 3 gigabytes of RAM and also has a higher battery capacity of about 2.900 mAh, which allows up to 384 hours in standby mode. The experts at iReparatur.ch in Basel know the technical features of the iPhone 7 Plus from Apple and offer a wide range of repairs. From the typical iPhone 7 plus glass defect through the silent switch and the battery to the back or front camera, the specialists are familiar with the typical weak points of the device and gladly repair your iPhone 7 Plus. In our branch in the heart of Basel, you can easily preview your iPhone 7 Plus without any appointment agreement.'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return RepairPageRepairsList;
}(_react.Component);

function mapStateToProps(state) {
    return {
        selectedRepairOptions: state.basket.basketDataRepair.selectedOptions,
        shippingMethod: state.basket.basketDataRepair.shippingMethod
    };
}
function mapDispatchToProps(dispatch) {
    return {
        basketActions: (0, _redux.bindActionCreators)(basketActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, { pure: false })(RepairPageRepairsList);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom__ = __webpack_require__(321);
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

/***/ 992:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(16)):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.ReactRecaptcha=t(require("react")):e.ReactRecaptcha=t(e.React)}(this,function(e){return function(e){function t(r){if(a[r])return a[r].exports;var n=a[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),s=a(6),c=r(s),p=a(4),u=r(p),d={className:u.default.string,onloadCallbackName:u.default.string,elementID:u.default.string,onloadCallback:u.default.func,verifyCallback:u.default.func,expiredCallback:u.default.func,render:u.default.oneOf(["onload","explicit"]),sitekey:u.default.string,theme:u.default.oneOf(["light","dark"]),type:u.default.string,verifyCallbackName:u.default.string,expiredCallbackName:u.default.string,size:u.default.oneOf(["invisible","compact","normal"]),tabindex:u.default.string,hl:u.default.string,badge:u.default.oneOf(["bottomright","bottomleft","inline"])},f={elementID:"g-recaptcha",className:"g-recaptcha",onloadCallback:void 0,onloadCallbackName:"onloadCallback",verifyCallback:void 0,verifyCallbackName:"verifyCallback",expiredCallback:void 0,expiredCallbackName:"expiredCallback",render:"onload",theme:"light",type:"image",size:"normal",tabindex:"0",hl:"en",badge:"bottomright"},h=function(){return"undefined"!=typeof window&&"undefined"!=typeof window.grecaptcha&&"function"==typeof window.grecaptcha.render},y=void 0,b=function(e){function t(e){n(this,t);var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a._renderGrecaptcha=a._renderGrecaptcha.bind(a),a.reset=a.reset.bind(a),a.state={ready:h(),widget:null},a.state.ready||"undefined"==typeof window||(y=setInterval(a._updateReadyState.bind(a),1e3)),a}return i(t,e),l(t,[{key:"componentDidMount",value:function(){this.state.ready&&this._renderGrecaptcha()}},{key:"componentDidUpdate",value:function(e,t){var a=this.props,r=a.render,n=a.onloadCallback;"explicit"===r&&n&&this.state.ready&&!t.ready&&this._renderGrecaptcha()}},{key:"componentWillUnmount",value:function(){clearInterval(y)}},{key:"reset",value:function(){var e=this.state,t=e.ready,a=e.widget;t&&null!==a&&grecaptcha.reset(a)}},{key:"execute",value:function(){var e=this.state,t=e.ready,a=e.widget;t&&null!==a&&grecaptcha.execute(a)}},{key:"_updateReadyState",value:function(){h()&&(this.setState({ready:!0}),clearInterval(y))}},{key:"_renderGrecaptcha",value:function(){this.state.widget=grecaptcha.render(this.props.elementID,{sitekey:this.props.sitekey,callback:this.props.verifyCallback?this.props.verifyCallback:void 0,theme:this.props.theme,type:this.props.type,size:this.props.size,tabindex:this.props.tabindex,hl:this.props.hl,badge:this.props.badge,"expired-callback":this.props.expiredCallback?this.props.expiredCallback:void 0}),this.props.onloadCallback&&this.props.onloadCallback()}},{key:"render",value:function(){return"explicit"===this.props.render&&this.props.onloadCallback?c.default.createElement("div",{id:this.props.elementID,"data-onloadcallbackname":this.props.onloadCallbackName,"data-verifycallbackname":this.props.verifyCallbackName}):c.default.createElement("div",{id:this.props.elementID,className:this.props.className,"data-sitekey":this.props.sitekey,"data-theme":this.props.theme,"data-type":this.props.type,"data-size":this.props.size,"data-badge":this.props.badge,"data-tabindex":this.props.tabindex})}}]),t}(s.Component);t.default=b,b.propTypes=d,b.defaultProps=f,e.exports=t.default},function(e,t){"use strict";function a(e){return function(){return e}}var r=function(){};r.thatReturns=a,r.thatReturnsFalse=a(!1),r.thatReturnsTrue=a(!0),r.thatReturnsNull=a(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,a){"use strict";function r(e,t,a,r,o,i,l,s){if(n(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var p=[a,r,o,i,l,s],u=0;c=new Error(t.replace(/%s/g,function(){return p[u++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}}var n=function(e){};e.exports=r},function(e,t,a){"use strict";var r=a(1),n=a(2),o=a(5);e.exports=function(){function e(e,t,a,r,i,l){l!==o&&n(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return a.checkPropTypes=r,a.PropTypes=a,a}},function(e,t,a){e.exports=a(3)()},function(e,t){"use strict";var a="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=a},function(t,a){t.exports=e}])});

/***/ })

});