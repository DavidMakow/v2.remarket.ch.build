webpackJsonp([64],{"+zJ9":function(e,t,n){var r=n("GmwO")("meta"),o=n("8ANE"),a=n("x//u"),i=n("GCs6").f,c=0,u=Object.isExtensible||function(){return!0},s=!n("zyKz")(function(){return u(Object.preventExtensions({}))}),l=function(e){i(e,r,{value:{i:"O"+ ++c,w:{}}})},f=e.exports={KEY:r,NEED:!1,fastKey:function(e,t){if(!o(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!a(e,r)){if(!u(e))return"F";if(!t)return"E";l(e)}return e[r].i},getWeak:function(e,t){if(!a(e,r)){if(!u(e))return!0;if(!t)return!1;l(e)}return e[r].w},onFreeze:function(e){return s&&f.NEED&&u(e)&&!a(e,r)&&l(e),e}}},"0/jl":function(e,t,n){"use strict";var r=n("YjQv"),o=n("x//u"),a=n("qs+f"),i=n("Wdy1"),c=n("1RnF"),u=n("+zJ9").KEY,s=n("zyKz"),l=n("a/OS"),f=n("LhDF"),d=n("GmwO"),p=n("hgbu"),m=n("4DQ7"),y=n("Ntt2"),v=n("6rdy"),g=n("NU0k"),b=n("FKWp"),h=n("8ANE"),E=n("wXdB"),N=n("ksFB"),_=n("9MbE"),w=n("YTz9"),O=n("NZ8V"),k=n("6tLb"),j=n("rjjF"),P=n("THEY"),S=n("GCs6"),C=n("pEGt"),M=j.f,x=S.f,A=k.f,F=r.Symbol,z=r.JSON,T=z&&z.stringify,D=p("_hidden"),W=p("toPrimitive"),I={}.propertyIsEnumerable,K=l("symbol-registry"),B=l("symbols"),G=l("op-symbols"),L=Object.prototype,Y="function"==typeof F&&!!P.f,R=r.QObject,Q=!R||!R.prototype||!R.prototype.findChild,Z=a&&s(function(){return 7!=O(x({},"a",{get:function(){return x(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=M(L,t);r&&delete L[t],x(e,t,n),r&&e!==L&&x(L,t,r)}:x,U=function(e){var t=B[e]=O(F.prototype);return t._k=e,t},V=Y&&"symbol"==typeof F.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof F},q=function(e,t,n){return e===L&&q(G,t,n),b(e),t=_(t,!0),b(n),o(B,t)?(n.enumerable?(o(e,D)&&e[D][t]&&(e[D][t]=!1),n=O(n,{enumerable:w(0,!1)})):(o(e,D)||x(e,D,w(1,{})),e[D][t]=!0),Z(e,t,n)):x(e,t,n)},H=function(e,t){b(e);for(var n,r=v(t=N(t)),o=0,a=r.length;a>o;)q(e,n=r[o++],t[n]);return e},J=function(e){var t=I.call(this,e=_(e,!0));return!(this===L&&o(B,e)&&!o(G,e))&&(!(t||!o(this,e)||!o(B,e)||o(this,D)&&this[D][e])||t)},$=function(e,t){if(e=N(e),t=_(t,!0),e!==L||!o(B,t)||o(G,t)){var n=M(e,t);return!n||!o(B,t)||o(e,D)&&e[D][t]||(n.enumerable=!0),n}},X=function(e){for(var t,n=A(N(e)),r=[],a=0;n.length>a;)o(B,t=n[a++])||t==D||t==u||r.push(t);return r},ee=function(e){for(var t,n=e===L,r=A(n?G:N(e)),a=[],i=0;r.length>i;)!o(B,t=r[i++])||n&&!o(L,t)||a.push(B[t]);return a};Y||(c((F=function(){if(this instanceof F)throw TypeError("Symbol is not a constructor!");var e=d(arguments.length>0?arguments[0]:void 0),t=function(n){this===L&&t.call(G,n),o(this,D)&&o(this[D],e)&&(this[D][e]=!1),Z(this,e,w(1,n))};return a&&Q&&Z(L,e,{configurable:!0,set:t}),U(e)}).prototype,"toString",function(){return this._k}),j.f=$,S.f=q,n("2m2c").f=k.f=X,n("bSeU").f=J,P.f=ee,a&&!n("c8Kh")&&c(L,"propertyIsEnumerable",J,!0),m.f=function(e){return U(p(e))}),i(i.G+i.W+i.F*!Y,{Symbol:F});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)p(te[ne++]);for(var re=C(p.store),oe=0;re.length>oe;)y(re[oe++]);i(i.S+i.F*!Y,"Symbol",{for:function(e){return o(K,e+="")?K[e]:K[e]=F(e)},keyFor:function(e){if(!V(e))throw TypeError(e+" is not a symbol!");for(var t in K)if(K[t]===e)return t},useSetter:function(){Q=!0},useSimple:function(){Q=!1}}),i(i.S+i.F*!Y,"Object",{create:function(e,t){return void 0===t?O(e):H(O(e),t)},defineProperty:q,defineProperties:H,getOwnPropertyDescriptor:$,getOwnPropertyNames:X,getOwnPropertySymbols:ee});var ae=s(function(){P.f(1)});i(i.S+i.F*ae,"Object",{getOwnPropertySymbols:function(e){return P.f(E(e))}}),z&&i(i.S+i.F*(!Y||s(function(){var e=F();return"[null]"!=T([e])||"{}"!=T({a:e})||"{}"!=T(Object(e))})),"JSON",{stringify:function(e){for(var t,n,r=[e],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=t=r[1],(h(t)||void 0!==e)&&!V(e))return g(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!V(t))return t}),r[1]=t,T.apply(z,r)}}),F.prototype[W]||n("aLzV")(F.prototype,W,F.prototype.valueOf),f(F,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},"2m2c":function(e,t,n){var r=n("DvwR"),o=n("B5V0").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,o)}},"3ggi":function(e,t,n){n("Ntt2")("asyncIterator")},"4DQ7":function(e,t,n){t.f=n("hgbu")},"4ajQ":function(e,t,n){var r=n("Wdy1");r(r.S+r.F*!n("qs+f"),"Object",{defineProperty:n("GCs6").f})},"5QVw":function(e,t,n){e.exports={default:n("tYO1"),__esModule:!0}},"6rdy":function(e,t,n){var r=n("pEGt"),o=n("THEY"),a=n("bSeU");e.exports=function(e){var t=r(e),n=o.f;if(n)for(var i,c=n(e),u=a.f,s=0;c.length>s;)u.call(e,i=c[s++])&&t.push(i);return t}},"6tLb":function(e,t,n){var r=n("ksFB"),o=n("2m2c").f,a={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return i&&"[object Window]"==a.call(e)?function(e){try{return o(e)}catch(e){return i.slice()}}(e):o(r(e))}},AFOY:function(e,t,n){n("CZee");var r=n("iANj").Object;e.exports=function(e,t){return r.create(e,t)}},BQO6:function(e,t,n){n("tz60"),n("+3lO"),e.exports=n("4DQ7").f("iterator")},BzqH:function(e,t,n){n("nclR"),e.exports=n("iANj").Object.setPrototypeOf},C4MV:function(e,t,n){e.exports={default:n("rKx+"),__esModule:!0}},CZee:function(e,t,n){var r=n("Wdy1");r(r.S,"Object",{create:n("NZ8V")})},KrCH:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=p(n("Gu7T")),o=p(n("d7EF")),a=n("GiK3"),i=p(a),c=n("CIox"),u=n("RH2O"),s=n("c9Fv"),l=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n("4rpi")),f=p(n("YGUz")),d=n("b8v9");function p(e){return e&&e.__esModule?e:{default:e}}t.default=(0,u.connect)(function(e){return{wishlistData:e.basket.wishlistData,basketData:e.basket.basketData}},function(e){return{basketActions:(0,s.bindActionCreators)(l,e)}})(function(e){var t=e.wishlistData,n=e.basketData,u=e.basketActions,s=(0,a.useState)("devices"),l=(0,o.default)(s,2),p=l[0],m=l[1],y=function(e){var t=e.currentTarget.getAttribute("data-type");m(t)},v=function(e,n){e.stopPropagation(),e.preventDefault();var r=t.filter(function(e){return e.shortcode!=n.shortcode});u.changeWishlisteData(r)},g=function(e,t){e.stopPropagation(),e.preventDefault();var o=null,a="";n.every(function(e){return e.id!=t.id})?(o=[].concat((0,r.default)(n),[t]),a="add"):(o=n.filter(function(e){return e.shortcode!=t.shortcode}),a="remove"),u.changeBasketData(o);var c=void 0,s=void 0,l=void 0;7!==t.productTypeId?(s=(c=t.criterias.find(function(e){return"manufacturer"===e.id}).values).length?c[0].name:"",l=t.categoryName):(s=t.deviceName,l=""),"add"===a&&(gtag("event","add_to_cart",{items:[{id:t.shortcode,list_name:"Kaufen",quantity:1,price:t.discountPrice||t.price,name:t.descriptionLong||t.model||"",brand:s,category:l}]}),window.isMobile||(u.basketAddEffect(i.default.createElement(f.default,{startPosition:$(e.target).offset(),image:t.deviceImages.mainImg.src,basketType:"kaufen"})),setTimeout(function(){u.basketAddEffect(null)},2e3))),"remove"===a&&gtag("event","remove_from_cart",{items:[{id:t.shortcode,list_name:"Kaufen",quantity:1,price:t.discountPrice||t.price,name:t.descriptionLong||t.model||"",brand:s,category:l}]}),n.map(function(e){return snaptr("track","ADD_CART",{shortcode:e.shortcode,name:e.name})})};return i.default.createElement("div",{className:"wishlist-page"},i.default.createElement("div",{className:"container-fluid"},i.default.createElement("div",{className:"navigation-row"},i.default.createElement(c.Link,{to:"/"},i.default.createElement("img",{loading:"lazy",src:"/images/design/house-icon.svg",alt:""})),i.default.createElement("span",null,"Wunschliste")),i.default.createElement("div",{className:"wishlist-wrapper"},i.default.createElement("h1",null,"Meine Wunschliste"),i.default.createElement("div",{className:"wishlist-tabs-button"},i.default.createElement("ul",{className:"offer-tab-buttons"},i.default.createElement("li",{className:"devices"===p?"active":"","data-type":"devices",onClick:function(e){return y(e)}},"Geräte"),i.default.createElement("li",{className:"products"===p?"active":"","data-type":"products",onClick:function(e){return y(e)}},"Produkte"))),i.default.createElement("div",{className:"items-bar"},i.default.createElement("h3",{className:"name"},"Produktname"),i.default.createElement("h3",{className:"price"},"Einzelpreis"),i.default.createElement("h3",null,"Verfügbarkeit"),i.default.createElement("div",{className:"empty"})),i.default.createElement("div",{className:"items"},"devices"===p&&t.filter(function(e){return 7===e.productTypeId}).map(function(e,t){var n=e.model.split(" ").join("-").toLowerCase()||"modelName",r=e.deviceName.toLowerCase().replace(/ /g,"-")||"deviceName",o=e.color?e.color.toLowerCase():"color",a=e.capacity?e.capacity.toLowerCase():"capacity";return i.default.createElement("div",{className:"item",key:"wishlist-devices-"+t,onClick:function(t){return function(e,t,n,r,o){window.open("//"+window.location.host+"/kaufen/detail/"+e+"/"+t+"/"+n+"/"+r+"/"+o,"_self")}(r,n,a,o,e.shortcode)}},i.default.createElement("button",{className:"icon-cross"},i.default.createElement("img",{loading:"lazy",src:"/images/icon-cross.svg",alt:"",onClick:function(t){return v(t,e)}})),i.default.createElement("div",{className:"item-img"},i.default.createElement("img",{loading:"lazy",src:e.deviceImages?e.deviceImages.mainImg.src:"/images/design/Product.svg",alt:""})),i.default.createElement("div",{className:"item-description"},i.default.createElement("p",null,e.model,", ",e.color,", ",e.capacity),i.default.createElement("span",{className:"price"},e.discountPrice?(0,d.formatPrice)(e.discountPrice):(0,d.formatPrice)(e.price)," ",window.currencyValue),i.default.createElement("span",{className:"stock-status"},1===e.statusId?"Auf Lager":"Nicht auf Lager")),i.default.createElement("button",{className:"btn addToBasket",onClick:function(t){return g(t,e)}},"ZUM WARENKORB HINZUFÜGEN"))}),"products"===p&&t.filter(function(e){return 7!==e.productTypeId}).map(function(e,t){var n=e.model.split(" ").join("-").toLowerCase().replace(/\//g,"--"),r=e.deviceName.toLowerCase().replace(/ /g,"-");return i.default.createElement("div",{className:"item",key:"wishlist-products-"+t,onClick:function(t){return function(e,t,n){window.open("//"+window.location.host+"/kaufen/detail/zubehoer/"+e+"/"+t+"/"+n,"_self")}(r,n,e.shortcode)}},i.default.createElement("button",{className:"icon-cross"},i.default.createElement("img",{loading:"lazy",src:"/images/icon-cross.svg",alt:"",onClick:function(t){return v(t,e)}})),i.default.createElement("div",{className:"item-img"},i.default.createElement("img",{loading:"lazy",src:e.deviceImages?e.deviceImages.mainImg.src:"/images/design/Product.svg",alt:""})),i.default.createElement("div",{className:"item-description"},i.default.createElement("p",null,e.model),i.default.createElement("span",{className:"price"},e.discountPrice?(0,d.formatPrice)(e.discountPrice):(0,d.formatPrice)(e.price)," ",window.currencyValue),i.default.createElement("span",{className:"stock-status"},e.quantity>0?"Auf Lager":"Nicht auf Lager")),i.default.createElement("button",{className:"btn addToBasket",onClick:function(t){return g(t,e)}},"ZUM WARENKORB HINZUFÜGEN"))})))))})},NMac:function(e,t,n){var r=n("8ANE"),o=n("FKWp"),a=function(e,t){if(o(e),!r(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,r){try{(r=n("3fMt")(Function.call,n("rjjF").f(Object.prototype,"__proto__").set,2))(e,[]),t=!(e instanceof Array)}catch(e){t=!0}return function(e,n){return a(e,n),t?e.__proto__=n:r(e,n),e}}({},!1):void 0),check:a}},NU0k:function(e,t,n){var r=n("NZra");e.exports=Array.isArray||function(e){return"Array"==r(e)}},Ntt2:function(e,t,n){var r=n("YjQv"),o=n("iANj"),a=n("c8Kh"),i=n("4DQ7"),c=n("GCs6").f;e.exports=function(e){var t=o.Symbol||(o.Symbol=a?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||c(t,e,{value:i.f(e)})}},OoWg:function(e,t,n){n("Ntt2")("observable")},OvRC:function(e,t,n){e.exports={default:n("AFOY"),__esModule:!0}},Pf15:function(e,t,n){"use strict";t.__esModule=!0;var r=i(n("kiBT")),o=i(n("OvRC")),a=i(n("pFYg"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":(0,a.default)(t)));e.prototype=(0,o.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}},YGUz:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n("Zrlr")),o=s(n("wxAW")),a=s(n("zwoO")),i=s(n("Pf15")),c=n("GiK3"),u=s(c);s(n("KSGD"));function s(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){(0,r.default)(this,t);var n=(0,a.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return(0,i.default)(t,e),(0,o.default)(t,[{key:"componentDidMount",value:function(){var e=document.querySelector(".addToBasketEffect"),t=this.props.startPosition,n=this.getEndPosition();e.style.top=t.top+"px",e.style.left=t.left+"px",setTimeout(function(){e.style.transition="all 2s",e.style.top=n.top-20+"px",e.style.left=n.left-19+"px",e.style.transform="scale(.3)"},0)}},{key:"getEndPosition",value:function(){if("kaufen"!==this.props.basketType)return $(".cart-total-verkaufen").offset();var e=$(".cart-total-kaufen").offset();0==e.top&&0==e.left&&(e=$($(".cart-total-kaufen")[1]).offset());return e}},{key:"render",value:function(){return u.default.createElement("div",{className:"addToBasketEffect"},u.default.createElement("img",{loading:"lazy",src:this.props.image,alt:""}))}}]),t}(c.Component);l.propTypes={},l.defaultProps={},t.default=l},Zrlr:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},Zzip:function(e,t,n){e.exports={default:n("BQO6"),__esModule:!0}},gCWN:function(e,t){},kiBT:function(e,t,n){e.exports={default:n("BzqH"),__esModule:!0}},nclR:function(e,t,n){var r=n("Wdy1");r(r.S,"Object",{setPrototypeOf:n("NMac").set})},pFYg:function(e,t,n){"use strict";t.__esModule=!0;var r=i(n("Zzip")),o=i(n("5QVw")),a="function"==typeof o.default&&"symbol"==typeof r.default?function(e){return typeof e}:function(e){return e&&"function"==typeof o.default&&e.constructor===o.default&&e!==o.default.prototype?"symbol":typeof e};function i(e){return e&&e.__esModule?e:{default:e}}t.default="function"==typeof o.default&&"symbol"===a(r.default)?function(e){return void 0===e?"undefined":a(e)}:function(e){return e&&"function"==typeof o.default&&e.constructor===o.default&&e!==o.default.prototype?"symbol":void 0===e?"undefined":a(e)}},"rKx+":function(e,t,n){n("4ajQ");var r=n("iANj").Object;e.exports=function(e,t,n){return r.defineProperty(e,t,n)}},rjjF:function(e,t,n){var r=n("bSeU"),o=n("YTz9"),a=n("ksFB"),i=n("9MbE"),c=n("x//u"),u=n("LocR"),s=Object.getOwnPropertyDescriptor;t.f=n("qs+f")?s:function(e,t){if(e=a(e),t=i(t,!0),u)try{return s(e,t)}catch(e){}if(c(e,t))return o(!r.f.call(e,t),e[t])}},tYO1:function(e,t,n){n("0/jl"),n("gCWN"),n("3ggi"),n("OoWg"),e.exports=n("iANj").Symbol},wxAW:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n("C4MV"),a=(r=o)&&r.__esModule?r:{default:r};t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,a.default)(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},zwoO:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n("pFYg"),a=(r=o)&&r.__esModule?r:{default:r};t.default=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":(0,a.default)(t))&&"function"!=typeof t?e:t}}});