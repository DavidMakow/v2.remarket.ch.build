webpackJsonp([70],{"+zJ9":function(e,t,n){var r=n("GmwO")("meta"),o=n("8ANE"),i=n("x//u"),a=n("GCs6").f,u=0,c=Object.isExtensible||function(){return!0},s=!n("zyKz")(function(){return c(Object.preventExtensions({}))}),l=function(e){a(e,r,{value:{i:"O"+ ++u,w:{}}})},f=e.exports={KEY:r,NEED:!1,fastKey:function(e,t){if(!o(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!i(e,r)){if(!c(e))return"F";if(!t)return"E";l(e)}return e[r].i},getWeak:function(e,t){if(!i(e,r)){if(!c(e))return!0;if(!t)return!1;l(e)}return e[r].w},onFreeze:function(e){return s&&f.NEED&&c(e)&&!i(e,r)&&l(e),e}}},"0/jl":function(e,t,n){"use strict";var r=n("YjQv"),o=n("x//u"),i=n("qs+f"),a=n("Wdy1"),u=n("1RnF"),c=n("+zJ9").KEY,s=n("zyKz"),l=n("a/OS"),f=n("LhDF"),p=n("GmwO"),d=n("hgbu"),m=n("4DQ7"),y=n("Ntt2"),h=n("4KAD"),b=n("6rdy"),v=n("NU0k"),g=n("FKWp"),O=n("ksFB"),_=n("9MbE"),k=n("YTz9"),E=n("NZ8V"),w=n("6tLb"),N=n("rjjF"),x=n("GCs6"),M=n("pEGt"),j=N.f,P=x.f,S=w.f,I=r.Symbol,B=r.JSON,D=B&&B.stringify,A=d("_hidden"),F=d("toPrimitive"),T={}.propertyIsEnumerable,C=l("symbol-registry"),z=l("symbols"),L=l("op-symbols"),W=Object.prototype,Y="function"==typeof I,G=r.QObject,K=!G||!G.prototype||!G.prototype.findChild,R=i&&s(function(){return 7!=E(P({},"a",{get:function(){return P(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=j(W,t);r&&delete W[t],P(e,t,n),r&&e!==W&&P(W,t,r)}:P,Q=function(e){var t=z[e]=E(I.prototype);return t._k=e,t},V=Y&&"symbol"==typeof I.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof I},Z=function(e,t,n){return e===W&&Z(L,t,n),g(e),t=_(t,!0),g(n),o(z,t)?(n.enumerable?(o(e,A)&&e[A][t]&&(e[A][t]=!1),n=E(n,{enumerable:k(0,!1)})):(o(e,A)||P(e,A,k(1,{})),e[A][t]=!0),R(e,t,n)):P(e,t,n)},J=function(e,t){g(e);for(var n,r=b(t=O(t)),o=0,i=r.length;i>o;)Z(e,n=r[o++],t[n]);return e},q=function(e){var t=T.call(this,e=_(e,!0));return!(this===W&&o(z,e)&&!o(L,e))&&(!(t||!o(this,e)||!o(z,e)||o(this,A)&&this[A][e])||t)},H=function(e,t){if(e=O(e),t=_(t,!0),e!==W||!o(z,t)||o(L,t)){var n=j(e,t);return!n||!o(z,t)||o(e,A)&&e[A][t]||(n.enumerable=!0),n}},U=function(e){for(var t,n=S(O(e)),r=[],i=0;n.length>i;)o(z,t=n[i++])||t==A||t==c||r.push(t);return r},X=function(e){for(var t,n=e===W,r=S(n?L:O(e)),i=[],a=0;r.length>a;)!o(z,t=r[a++])||n&&!o(W,t)||i.push(z[t]);return i};Y||(u((I=function(){if(this instanceof I)throw TypeError("Symbol is not a constructor!");var e=p(arguments.length>0?arguments[0]:void 0),t=function(n){this===W&&t.call(L,n),o(this,A)&&o(this[A],e)&&(this[A][e]=!1),R(this,e,k(1,n))};return i&&K&&R(W,e,{configurable:!0,set:t}),Q(e)}).prototype,"toString",function(){return this._k}),N.f=H,x.f=Z,n("2m2c").f=w.f=U,n("bSeU").f=q,n("THEY").f=X,i&&!n("c8Kh")&&u(W,"propertyIsEnumerable",q,!0),m.f=function(e){return Q(d(e))}),a(a.G+a.W+a.F*!Y,{Symbol:I});for(var $="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ee=0;$.length>ee;)d($[ee++]);for($=M(d.store),ee=0;$.length>ee;)y($[ee++]);a(a.S+a.F*!Y,"Symbol",{for:function(e){return o(C,e+="")?C[e]:C[e]=I(e)},keyFor:function(e){if(V(e))return h(C,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){K=!0},useSimple:function(){K=!1}}),a(a.S+a.F*!Y,"Object",{create:function(e,t){return void 0===t?E(e):J(E(e),t)},defineProperty:Z,defineProperties:J,getOwnPropertyDescriptor:H,getOwnPropertyNames:U,getOwnPropertySymbols:X}),B&&a(a.S+a.F*(!Y||s(function(){var e=I();return"[null]"!=D([e])||"{}"!=D({a:e})||"{}"!=D(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!V(e)){for(var t,n,r=[e],o=1;arguments.length>o;)r.push(arguments[o++]);return"function"==typeof(t=r[1])&&(n=t),!n&&v(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!V(t))return t}),r[1]=t,D.apply(B,r)}}}),I.prototype[F]||n("aLzV")(I.prototype,F,I.prototype.valueOf),f(I,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},"2m2c":function(e,t,n){var r=n("DvwR"),o=n("B5V0").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,o)}},"3ggi":function(e,t,n){n("Ntt2")("asyncIterator")},"4DQ7":function(e,t,n){t.f=n("hgbu")},"4KAD":function(e,t,n){var r=n("pEGt"),o=n("ksFB");e.exports=function(e,t){for(var n,i=o(e),a=r(i),u=a.length,c=0;u>c;)if(i[n=a[c++]]===t)return n}},"4ajQ":function(e,t,n){var r=n("Wdy1");r(r.S+r.F*!n("qs+f"),"Object",{defineProperty:n("GCs6").f})},"5QVw":function(e,t,n){e.exports={default:n("tYO1"),__esModule:!0}},"6rdy":function(e,t,n){var r=n("pEGt"),o=n("THEY"),i=n("bSeU");e.exports=function(e){var t=r(e),n=o.f;if(n)for(var a,u=n(e),c=i.f,s=0;u.length>s;)c.call(e,a=u[s++])&&t.push(a);return t}},"6tLb":function(e,t,n){var r=n("ksFB"),o=n("2m2c").f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return a&&"[object Window]"==i.call(e)?function(e){try{return o(e)}catch(e){return a.slice()}}(e):o(r(e))}},AFOY:function(e,t,n){n("CZee");var r=n("iANj").Object;e.exports=function(e,t){return r.create(e,t)}},BQO6:function(e,t,n){n("tz60"),n("+3lO"),e.exports=n("4DQ7").f("iterator")},BzqH:function(e,t,n){n("nclR"),e.exports=n("iANj").Object.setPrototypeOf},C4MV:function(e,t,n){e.exports={default:n("rKx+"),__esModule:!0}},CZee:function(e,t,n){var r=n("Wdy1");r(r.S,"Object",{create:n("NZ8V")})},CqZ3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ThankYouPage=void 0;var r=v(n("Gu7T")),o=v(n("Zrlr")),i=v(n("wxAW")),a=v(n("zwoO")),u=v(n("Pf15")),c=n("GiK3"),s=v(c),l=(v(n("KSGD")),n("CIox")),f=v(n("mtWM")),p=n("RH2O"),d=n("c9Fv"),m=b(n("4rpi")),y=b(n("GGA4")),h=n("b8v9");function b(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function v(e){return e&&e.__esModule?e:{default:e}}var g=t.ThankYouPage=function(e){function t(e){(0,o.default)(this,t);var n=(0,a.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={basketData:[],totalPrice:0,repairList:[],selectedOptions:[]},n.mapBasketItems=n.mapBasketItems.bind(n),n.mapBasketItemsDevices=n.mapBasketItemsDevices.bind(n),n.checkIsLogin=n.checkIsLogin.bind(n),n._getPrice=n._getPrice.bind(n),n}return(0,u.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){var e=this,t=JSON.parse(window.localStorage.getItem("basketDataRepair")),n=0,o=[];document.getElementById("spinner-box-load").style.display="block",t?f.default.get("/api/getModelRepairList?modelId="+t.modelId).then(function(i){document.getElementById("spinner-box-load").style.display="none",n=e._getPrice(t.selectedOptions,i.data.repairList,t.shippingMethod),o=[].concat((0,r.default)(t.selectedOptions)),t.shippingMethod&&t.selectedOptions.push(t.shippingMethod),t=t.selectedOptions,e.setState({basketData:t,selectedOptions:o,totalPrice:n,repairList:i.data.repairList})}):document.getElementById("spinner-box-load").style.display="none",window.localStorage.removeItem("basketDataRepair"),this.props.basketActions.changeBasketDataRepair([]),this.props.basketActions.changeShippingMethodRepair(null)}},{key:"_getPrice",value:function(e,t,n){var r=0,o=0;return e.forEach(function(e){+e.priceMax>=r&&(r=+e.priceMax)}),t.forEach(function(t){e.some(function(e){return t.shortcode===e.shortcode})&&(+t.priceMax==r?(o+=+t.priceMax,r=null):o+=+t.minPrice)}),n&&(o+=+n.price),o}},{key:"mapBasketItemsDevices",value:function(e,t){if(11!==e.productTypeId){var n=this.state.selectedOptions,r=0,o=e.priceMax;if(n.forEach(function(e){+e.priceMax>r&&(r=+e.priceMax)}),n.length>0)if(r>+e.priceMax)o=e.minPrice;else if(r==+e.priceMax){o=this.state.repairList.find(function(e){return+e.priceMax==r&&n.some(function(t){return t.shortcode==e.shortcode})}).shortcode==e.shortcode?e.priceMax:e.minPrice}return s.default.createElement("div",{key:t,className:"itemModel"},s.default.createElement("div",{className:"model"},s.default.createElement("p",null,e.title," (",e.shortcode,")")),s.default.createElement("div",{className:"price"},s.default.createElement("p",null,(0,h.formatPrice)(o)," ",window.currencyValue)))}}},{key:"mapBasketItems",value:function(e,t){if(11==e.productTypeId)return s.default.createElement("div",{key:t,className:"itemModel"},s.default.createElement("div",{className:"model"},s.default.createElement("p",null,e.name)),s.default.createElement("div",{className:"price"},s.default.createElement("p",null,(0,h.formatPrice)(e.price)," ",window.currencyValue)))}},{key:"checkIsLogin",value:function(e){this.props.user.isLogin||(e.preventDefault(),this.props.userActions.setRedirectTo("/kundenkonto"))}},{key:"render",value:function(){var e=this.state,t=e.basketData,n=e.totalPrice;return s.default.createElement("div",{className:"paymentPage"},s.default.createElement("div",{className:"container"},s.default.createElement("div",{className:"col-md-8 col-md-push-2"},s.default.createElement("div",{className:"wrapWindow text-center"},s.default.createElement("div",{className:"circle ok"}),s.default.createElement("p",{className:"bigText"},"Herzlichen Glückwunsch"),s.default.createElement("p",{className:"smallText"},"Vielen Dank für Ihre Bestellung, wir werden diese umgehend bearbeiten."),s.default.createElement("h3",null,"Bestellübersicht"),s.default.createElement("div",{className:"wrapBasketItems first"},t.map(this.mapBasketItemsDevices)),s.default.createElement("div",{className:"wrapBasketItems"},t.map(this.mapBasketItems)),s.default.createElement("div",{className:"total"},s.default.createElement("p",{className:"col-xs-6 title"},"Total inkl. MwSt"),s.default.createElement("p",{className:"col-xs-6 priceTotal"},(0,h.formatPrice)(n)," ",window.currencyValue)),s.default.createElement(l.Link,{to:"/kundenkonto",className:"btn",onClick:this.checkIsLogin},"Im Detail ansehen",s.default.createElement("span",null,s.default.createElement("i",{className:"fa fa-long-arrow-right","aria-hidden":"true"})))))))}}]),t}(c.Component);g.propTypes={},g.defaultProps={},t.default=(0,p.connect)(function(e){return{user:e.user}},function(e){return{basketActions:(0,d.bindActionCreators)(m,e),userActions:(0,d.bindActionCreators)(y,e)}},null,{pure:!1})(g)},NMac:function(e,t,n){var r=n("8ANE"),o=n("FKWp"),i=function(e,t){if(o(e),!r(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,r){try{(r=n("3fMt")(Function.call,n("rjjF").f(Object.prototype,"__proto__").set,2))(e,[]),t=!(e instanceof Array)}catch(e){t=!0}return function(e,n){return i(e,n),t?e.__proto__=n:r(e,n),e}}({},!1):void 0),check:i}},NU0k:function(e,t,n){var r=n("NZra");e.exports=Array.isArray||function(e){return"Array"==r(e)}},Ntt2:function(e,t,n){var r=n("YjQv"),o=n("iANj"),i=n("c8Kh"),a=n("4DQ7"),u=n("GCs6").f;e.exports=function(e){var t=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||u(t,e,{value:a.f(e)})}},OoWg:function(e,t,n){n("Ntt2")("observable")},OvRC:function(e,t,n){e.exports={default:n("AFOY"),__esModule:!0}},Pf15:function(e,t,n){"use strict";t.__esModule=!0;var r=a(n("kiBT")),o=a(n("OvRC")),i=a(n("pFYg"));function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":(0,i.default)(t)));e.prototype=(0,o.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}},Zrlr:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},Zzip:function(e,t,n){e.exports={default:n("BQO6"),__esModule:!0}},gCWN:function(e,t){},kiBT:function(e,t,n){e.exports={default:n("BzqH"),__esModule:!0}},nclR:function(e,t,n){var r=n("Wdy1");r(r.S,"Object",{setPrototypeOf:n("NMac").set})},pFYg:function(e,t,n){"use strict";t.__esModule=!0;var r=a(n("Zzip")),o=a(n("5QVw")),i="function"==typeof o.default&&"symbol"==typeof r.default?function(e){return typeof e}:function(e){return e&&"function"==typeof o.default&&e.constructor===o.default&&e!==o.default.prototype?"symbol":typeof e};function a(e){return e&&e.__esModule?e:{default:e}}t.default="function"==typeof o.default&&"symbol"===i(r.default)?function(e){return void 0===e?"undefined":i(e)}:function(e){return e&&"function"==typeof o.default&&e.constructor===o.default&&e!==o.default.prototype?"symbol":void 0===e?"undefined":i(e)}},"rKx+":function(e,t,n){n("4ajQ");var r=n("iANj").Object;e.exports=function(e,t,n){return r.defineProperty(e,t,n)}},rjjF:function(e,t,n){var r=n("bSeU"),o=n("YTz9"),i=n("ksFB"),a=n("9MbE"),u=n("x//u"),c=n("LocR"),s=Object.getOwnPropertyDescriptor;t.f=n("qs+f")?s:function(e,t){if(e=i(e),t=a(t,!0),c)try{return s(e,t)}catch(e){}if(u(e,t))return o(!r.f.call(e,t),e[t])}},tYO1:function(e,t,n){n("0/jl"),n("gCWN"),n("3ggi"),n("OoWg"),e.exports=n("iANj").Symbol},wxAW:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n("C4MV"),i=(r=o)&&r.__esModule?r:{default:r};t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i.default)(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},zwoO:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n("pFYg"),i=(r=o)&&r.__esModule?r:{default:r};t.default=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":(0,i.default)(t))&&"function"!=typeof t?e:t}}});