webpackJsonp([65],{"+zJ9":function(e,t,a){var n=a("GmwO")("meta"),r=a("8ANE"),l=a("x//u"),c=a("GCs6").f,s=0,o=Object.isExtensible||function(){return!0},i=!a("zyKz")(function(){return o(Object.preventExtensions({}))}),u=function(e){c(e,n,{value:{i:"O"+ ++s,w:{}}})},d=e.exports={KEY:n,NEED:!1,fastKey:function(e,t){if(!r(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!l(e,n)){if(!o(e))return"F";if(!t)return"E";u(e)}return e[n].i},getWeak:function(e,t){if(!l(e,n)){if(!o(e))return!0;if(!t)return!1;u(e)}return e[n].w},onFreeze:function(e){return i&&d.NEED&&o(e)&&!l(e,n)&&u(e),e}}},"0/jl":function(e,t,a){"use strict";var n=a("YjQv"),r=a("x//u"),l=a("qs+f"),c=a("Wdy1"),s=a("1RnF"),o=a("+zJ9").KEY,i=a("zyKz"),u=a("a/OS"),d=a("LhDF"),f=a("GmwO"),m=a("hgbu"),p=a("4DQ7"),h=a("Ntt2"),b=a("4KAD"),g=a("6rdy"),y=a("NU0k"),E=a("FKWp"),v=a("ksFB"),N=a("9MbE"),k=a("YTz9"),C=a("NZ8V"),w=a("6tLb"),x=a("rjjF"),_=a("GCs6"),O=a("pEGt"),S=x.f,z=_.f,F=w.f,M=n.Symbol,j=n.JSON,B=j&&j.stringify,P=m("_hidden"),I=m("toPrimitive"),D={}.propertyIsEnumerable,A=u("symbol-registry"),T=u("symbols"),R=u("op-symbols"),G=Object.prototype,K="function"==typeof M,U=n.QObject,H=!U||!U.prototype||!U.prototype.findChild,W=l&&i(function(){return 7!=C(z({},"a",{get:function(){return z(this,"a",{value:7}).a}})).a})?function(e,t,a){var n=S(G,t);n&&delete G[t],z(e,t,a),n&&e!==G&&z(G,t,n)}:z,q=function(e){var t=T[e]=C(M.prototype);return t._k=e,t},L=K&&"symbol"==typeof M.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof M},Y=function(e,t,a){return e===G&&Y(R,t,a),E(e),t=N(t,!0),E(a),r(T,t)?(a.enumerable?(r(e,P)&&e[P][t]&&(e[P][t]=!1),a=C(a,{enumerable:k(0,!1)})):(r(e,P)||z(e,P,k(1,{})),e[P][t]=!0),W(e,t,a)):z(e,t,a)},Q=function(e,t){E(e);for(var a,n=g(t=v(t)),r=0,l=n.length;l>r;)Y(e,a=n[r++],t[a]);return e},Z=function(e){var t=D.call(this,e=N(e,!0));return!(this===G&&r(T,e)&&!r(R,e))&&(!(t||!r(this,e)||!r(T,e)||r(this,P)&&this[P][e])||t)},V=function(e,t){if(e=v(e),t=N(t,!0),e!==G||!r(T,t)||r(R,t)){var a=S(e,t);return!a||!r(T,t)||r(e,P)&&e[P][t]||(a.enumerable=!0),a}},J=function(e){for(var t,a=F(v(e)),n=[],l=0;a.length>l;)r(T,t=a[l++])||t==P||t==o||n.push(t);return n},$=function(e){for(var t,a=e===G,n=F(a?R:v(e)),l=[],c=0;n.length>c;)!r(T,t=n[c++])||a&&!r(G,t)||l.push(T[t]);return l};K||(s((M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(a){this===G&&t.call(R,a),r(this,P)&&r(this[P],e)&&(this[P][e]=!1),W(this,e,k(1,a))};return l&&H&&W(G,e,{configurable:!0,set:t}),q(e)}).prototype,"toString",function(){return this._k}),x.f=V,_.f=Y,a("2m2c").f=w.f=J,a("bSeU").f=Z,a("THEY").f=$,l&&!a("c8Kh")&&s(G,"propertyIsEnumerable",Z,!0),p.f=function(e){return q(m(e))}),c(c.G+c.W+c.F*!K,{Symbol:M});for(var X="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ee=0;X.length>ee;)m(X[ee++]);for(X=O(m.store),ee=0;X.length>ee;)h(X[ee++]);c(c.S+c.F*!K,"Symbol",{for:function(e){return r(A,e+="")?A[e]:A[e]=M(e)},keyFor:function(e){if(L(e))return b(A,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){H=!0},useSimple:function(){H=!1}}),c(c.S+c.F*!K,"Object",{create:function(e,t){return void 0===t?C(e):Q(C(e),t)},defineProperty:Y,defineProperties:Q,getOwnPropertyDescriptor:V,getOwnPropertyNames:J,getOwnPropertySymbols:$}),j&&c(c.S+c.F*(!K||i(function(){var e=M();return"[null]"!=B([e])||"{}"!=B({a:e})||"{}"!=B(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!L(e)){for(var t,a,n=[e],r=1;arguments.length>r;)n.push(arguments[r++]);return"function"==typeof(t=n[1])&&(a=t),!a&&y(t)||(t=function(e,t){if(a&&(t=a.call(this,e,t)),!L(t))return t}),n[1]=t,B.apply(j,n)}}}),M.prototype[I]||a("aLzV")(M.prototype,I,M.prototype.valueOf),d(M,"Symbol"),d(Math,"Math",!0),d(n.JSON,"JSON",!0)},"2m2c":function(e,t,a){var n=a("DvwR"),r=a("B5V0").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,r)}},"3ggi":function(e,t,a){a("Ntt2")("asyncIterator")},"4DQ7":function(e,t,a){t.f=a("hgbu")},"4KAD":function(e,t,a){var n=a("pEGt"),r=a("ksFB");e.exports=function(e,t){for(var a,l=r(e),c=n(l),s=c.length,o=0;s>o;)if(l[a=c[o++]]===t)return a}},"4ajQ":function(e,t,a){var n=a("Wdy1");n(n.S+n.F*!a("qs+f"),"Object",{defineProperty:a("GCs6").f})},"5QVw":function(e,t,a){e.exports={default:a("tYO1"),__esModule:!0}},"6rdy":function(e,t,a){var n=a("pEGt"),r=a("THEY"),l=a("bSeU");e.exports=function(e){var t=n(e),a=r.f;if(a)for(var c,s=a(e),o=l.f,i=0;s.length>i;)o.call(e,c=s[i++])&&t.push(c);return t}},"6tLb":function(e,t,a){var n=a("ksFB"),r=a("2m2c").f,l={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return c&&"[object Window]"==l.call(e)?function(e){try{return r(e)}catch(e){return c.slice()}}(e):r(n(e))}},AFOY:function(e,t,a){a("CZee");var n=a("iANj").Object;e.exports=function(e,t){return n.create(e,t)}},BQO6:function(e,t,a){a("tz60"),a("+3lO"),e.exports=a("4DQ7").f("iterator")},BzqH:function(e,t,a){a("nclR"),e.exports=a("iANj").Object.setPrototypeOf},C4MV:function(e,t,a){e.exports={default:a("rKx+"),__esModule:!0}},CZee:function(e,t,a){var n=a("Wdy1");n(n.S,"Object",{create:a("NZ8V")})},NMac:function(e,t,a){var n=a("8ANE"),r=a("FKWp"),l=function(e,t){if(r(e),!n(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,n){try{(n=a("3fMt")(Function.call,a("rjjF").f(Object.prototype,"__proto__").set,2))(e,[]),t=!(e instanceof Array)}catch(e){t=!0}return function(e,a){return l(e,a),t?e.__proto__=a:n(e,a),e}}({},!1):void 0),check:l}},NU0k:function(e,t,a){var n=a("NZra");e.exports=Array.isArray||function(e){return"Array"==n(e)}},Ntt2:function(e,t,a){var n=a("YjQv"),r=a("iANj"),l=a("c8Kh"),c=a("4DQ7"),s=a("GCs6").f;e.exports=function(e){var t=r.Symbol||(r.Symbol=l?{}:n.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:c.f(e)})}},OoWg:function(e,t,a){a("Ntt2")("observable")},OvRC:function(e,t,a){e.exports={default:a("AFOY"),__esModule:!0}},Pf15:function(e,t,a){"use strict";t.__esModule=!0;var n=c(a("kiBT")),r=c(a("OvRC")),l=c(a("pFYg"));function c(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":(0,l.default)(t)));e.prototype=(0,r.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(n.default?(0,n.default)(e,t):e.__proto__=t)}},Zrlr:function(e,t,a){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},Zzip:function(e,t,a){e.exports={default:a("BQO6"),__esModule:!0}},e7c0:function(e,t,a){var n;n=function(e){return function(e){function t(n){if(a[n])return a[n].exports;var r=a[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(6),c=n(l),s=n(a(4)),o={className:s.default.string,onloadCallbackName:s.default.string,elementID:s.default.string,onloadCallback:s.default.func,verifyCallback:s.default.func,expiredCallback:s.default.func,render:s.default.oneOf(["onload","explicit"]),sitekey:s.default.string,theme:s.default.oneOf(["light","dark"]),type:s.default.string,verifyCallbackName:s.default.string,expiredCallbackName:s.default.string,size:s.default.oneOf(["invisible","compact","normal"]),tabindex:s.default.string,hl:s.default.string,badge:s.default.oneOf(["bottomright","bottomleft","inline"])},i=function(){return"undefined"!=typeof window&&void 0!==window.grecaptcha&&"function"==typeof window.grecaptcha.render},u=void 0,d=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a._renderGrecaptcha=a._renderGrecaptcha.bind(a),a.reset=a.reset.bind(a),a.state={ready:i(),widget:null},a.state.ready||"undefined"==typeof window||(u=setInterval(a._updateReadyState.bind(a),1e3)),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),r(t,[{key:"componentDidMount",value:function(){this.state.ready&&this._renderGrecaptcha()}},{key:"componentDidUpdate",value:function(e,t){var a=this.props,n=a.render,r=a.onloadCallback;"explicit"===n&&r&&this.state.ready&&!t.ready&&this._renderGrecaptcha()}},{key:"componentWillUnmount",value:function(){clearInterval(u)}},{key:"reset",value:function(){var e=this.state,t=e.ready,a=e.widget;t&&null!==a&&grecaptcha.reset(a)}},{key:"execute",value:function(){var e=this.state,t=e.ready,a=e.widget;t&&null!==a&&grecaptcha.execute(a)}},{key:"_updateReadyState",value:function(){i()&&(this.setState({ready:!0}),clearInterval(u))}},{key:"_renderGrecaptcha",value:function(){this.state.widget=grecaptcha.render(this.props.elementID,{sitekey:this.props.sitekey,callback:this.props.verifyCallback?this.props.verifyCallback:void 0,theme:this.props.theme,type:this.props.type,size:this.props.size,tabindex:this.props.tabindex,hl:this.props.hl,badge:this.props.badge,"expired-callback":this.props.expiredCallback?this.props.expiredCallback:void 0}),this.props.onloadCallback&&this.props.onloadCallback()}},{key:"render",value:function(){return"explicit"===this.props.render&&this.props.onloadCallback?c.default.createElement("div",{id:this.props.elementID,"data-onloadcallbackname":this.props.onloadCallbackName,"data-verifycallbackname":this.props.verifyCallbackName}):c.default.createElement("div",{id:this.props.elementID,className:this.props.className,"data-sitekey":this.props.sitekey,"data-theme":this.props.theme,"data-type":this.props.type,"data-size":this.props.size,"data-badge":this.props.badge,"data-tabindex":this.props.tabindex})}}]),t}();t.default=d,d.propTypes=o,d.defaultProps={elementID:"g-recaptcha",className:"g-recaptcha",onloadCallback:void 0,onloadCallbackName:"onloadCallback",verifyCallback:void 0,verifyCallbackName:"verifyCallback",expiredCallback:void 0,expiredCallbackName:"expiredCallback",render:"onload",theme:"light",type:"image",size:"normal",tabindex:"0",hl:"en",badge:"bottomright"},e.exports=t.default},function(e,t){"use strict";function a(e){return function(){return e}}var n=function(){};n.thatReturns=a,n.thatReturnsFalse=a(!1),n.thatReturnsTrue=a(!0),n.thatReturnsNull=a(null),n.thatReturnsThis=function(){return this},n.thatReturnsArgument=function(e){return e},e.exports=n},function(e,t,a){"use strict";var n=function(e){};e.exports=function(e,t,a,r,l,c,s,o){if(n(t),!e){var i;if(void 0===t)i=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[a,r,l,c,s,o],d=0;(i=new Error(t.replace(/%s/g,function(){return u[d++]}))).name="Invariant Violation"}throw i.framesToPop=1,i}}},function(e,t,a){"use strict";var n=a(1),r=a(2),l=a(5);e.exports=function(){function e(e,t,a,n,c,s){s!==l&&r(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return a.checkPropTypes=n,a.PropTypes=a,a}},function(e,t,a){e.exports=a(3)()},function(e,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,a){t.exports=e}])},e.exports=n(a("GiK3"))},gCWN:function(e,t){},kiBT:function(e,t,a){e.exports={default:a("BzqH"),__esModule:!0}},nclR:function(e,t,a){var n=a("Wdy1");n(n.S,"Object",{setPrototypeOf:a("NMac").set})},pFYg:function(e,t,a){"use strict";t.__esModule=!0;var n=c(a("Zzip")),r=c(a("5QVw")),l="function"==typeof r.default&&"symbol"==typeof n.default?function(e){return typeof e}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":typeof e};function c(e){return e&&e.__esModule?e:{default:e}}t.default="function"==typeof r.default&&"symbol"===l(n.default)?function(e){return void 0===e?"undefined":l(e)}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":void 0===e?"undefined":l(e)}},"rKx+":function(e,t,a){a("4ajQ");var n=a("iANj").Object;e.exports=function(e,t,a){return n.defineProperty(e,t,a)}},rjjF:function(e,t,a){var n=a("bSeU"),r=a("YTz9"),l=a("ksFB"),c=a("9MbE"),s=a("x//u"),o=a("LocR"),i=Object.getOwnPropertyDescriptor;t.f=a("qs+f")?i:function(e,t){if(e=l(e),t=c(t,!0),o)try{return i(e,t)}catch(e){}if(s(e,t))return r(!n.f.call(e,t),e[t])}},tYO1:function(e,t,a){a("0/jl"),a("gCWN"),a("3ggi"),a("OoWg"),e.exports=a("iANj").Symbol},up84:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ContactForm=void 0;var n=p(a("Dd8w")),r=p(a("Zrlr")),l=p(a("wxAW")),c=p(a("zwoO")),s=p(a("Pf15")),o=a("GiK3"),i=p(o),u=(p(a("KSGD")),p(a("e7c0"))),d=p(a("mtWM")),f=a("RH2O"),m=a("b8v9");function p(e){return e&&e.__esModule?e:{default:e}}var h=t.ContactForm=function(e){function t(e){(0,r.default)(this,t);var a=(0,c.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={inputCheckbox:{company:!1,agree:!1,errorAgree:!1},captcha:{isCheckCaptcha:!1,errorCaptcha:!1},infoMsg:null},a.changeCheckbox=a.changeCheckbox.bind(a),a.sendForm=a.sendForm.bind(a),a.verifyCaptchaCallback=a.verifyCaptchaCallback.bind(a),a._setPersonalDataFields=a._setPersonalDataFields.bind(a),a}return(0,s.default)(t,e),(0,l.default)(t,[{key:"componentWillReceiveProps",value:function(e){e.user.isLogin!==this.props.user.isLogin&&!1===e.user.isLogin&&(document.querySelectorAll(".contactForm input").forEach(function(e){e.value="",e.checked=!1}),this.setState({inputCheckbox:(0,n.default)({},this.state.inputCheckbox,{company:!1})}));e.user.data!==this.props.user.data&&e.user.data&&this._setPersonalDataFields(e.user.data.shippingAddress)}},{key:"componentDidMount",value:function(){this.props.user.data&&this._setPersonalDataFields(this.props.user.data.shippingAddress),this.encryptedEmail()}},{key:"encryptedEmail",value:function(){var e=window.domainName.name.split(".")[window.domainName.name.split(".").length-1];document.getElementById("email-rot-13").innerHTML="de"===e?'<n uers="znvygb:vasb@erznexrg.qr" >vasb@erznexrg.qr</n>'.replace(/[a-zA-Z]/g,function(e){return String.fromCharCode((e<="Z"?90:122)>=(e=e.charCodeAt(0)+13)?e:e-26)}):'<n uers="znvygb:vasb@erznexrg.pu" >vasb@erznexrg.pu</n>'.replace(/[a-zA-Z]/g,function(e){return String.fromCharCode((e<="Z"?90:122)>=(e=e.charCodeAt(0)+13)?e:e-26)})}},{key:"showMapHandler",value:function(e){(0,m.showMap)(e)}},{key:"_setPersonalDataFields",value:function(e){var t=document.forms.contactForm,a=this.state.inputCheckbox;for(var n in e)"companyName"===n?e[n]?(a.company=!0,t[n].value=e[n]):(a.company=!1,t[n].value=e[n]):t[n]&&(t[n].value=e[n]);this.setState({inputCheckbox:a})}},{key:"verifyCaptchaCallback",value:function(e){this.setState({captcha:(0,n.default)({},this.state.captcha,{isCheckCaptcha:!0,errorCaptcha:!1})})}},{key:"changeCheckbox",value:function(e){var t=this.state.inputCheckbox;t[e.target.name]=!t[e.target.name],this.setState({inputCheckbox:t})}},{key:"sendForm",value:function(e){var t=this;e.preventDefault();var a=new FormData(document.forms.contactForm),r=this.state.captcha;this.state.inputCheckbox.agree?(this.setState({inputCheckbox:(0,n.default)({},this.state.inputCheckbox,{errorAgree:!1})}),r.isCheckCaptcha||!window.isGoogleConnection?(document.getElementById("spinner-box-load").style.display="block",d.default.post("/api/contactUs",a).then(function(e){document.getElementById("spinner-box-load").style.display="none",document.querySelectorAll("input[name=subject], textarea").forEach(function(e){return e.value=""}),t.setState({infoMsg:e.data})}).catch(function(e){document.getElementById("spinner-box-load").style.display="none"})):this.setState({captcha:(0,n.default)({},this.state.captcha,{errorCaptcha:!0})})):this.setState({inputCheckbox:(0,n.default)({},this.state.inputCheckbox,{errorAgree:!0})})}},{key:"render",value:function(){var e=this,t=this.state,a=t.inputCheckbox,n=t.captcha,r=window.domainName.name.split(".")[window.domainName.name.split(".").length-1];return i.default.createElement("div",{className:"contactPage"},i.default.createElement("div",{className:"modal fade bs-example-modal-lg",id:"modalMap",tabIndex:"-1","data-keyboard":"false",role:"dialog","aria-labelledby":"myLargeModalLabeAgb"},i.default.createElement("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document"},i.default.createElement("button",{type:"button",className:"closeModal",onClick:function(){return $("#modalMap").modal("hide")},"data-dismiss":"modal","aria-label":"Close"}),i.default.createElement("div",{className:"modal-content"},i.default.createElement("div",{className:"mapContainer"})))),i.default.createElement("div",{className:"container mb"},"ch"===r&&i.default.createElement("div",{className:"col-sm-6 col-lg-8"},i.default.createElement("div",{className:"col-sm-12"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"E-Mail"),i.default.createElement("p",{className:"email"},i.default.createElement("span",{id:"email-rot-13"}))),i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Social"),i.default.createElement("div",{className:"imgSocial"},i.default.createElement("a",{href:"https://www.facebook.com/remarketch-Kaufen-und-Verkaufen-per-Knopfdruck-157822264839941/",target:"_blank"},i.default.createElement("img",{loading:"lazy",src:"/images/design/icons-facebook.svg",alt:""})),i.default.createElement("a",{href:"https://tiktok.com/@remarket.ch",target:"_blank"},i.default.createElement("img",{loading:"lazy",src:"/images/design/icons-tiktok.svg",alt:""})),i.default.createElement("a",{href:"https://www.instagram.com/remarket.ch/",target:"_blank"},i.default.createElement("img",{loading:"lazy",src:"/images/design/icon-instagram.svg",alt:""}))))),i.default.createElement("div",{className:"col-sm-12"},i.default.createElement("h3",{className:"placeDescription"},i.default.createElement("img",{loading:"lazy",alt:"",src:"/images/design/contact/flag-of-canton-of-basel.svg"}),"Filiale Barfüsserplatz, Basel")),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Adresse"),i.default.createElement("p",{className:"adress"},"Gerbergasse 82"),i.default.createElement("p",{className:"adress"},"CH-4001 Basel"))),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Telefon"),i.default.createElement("p",{className:"phone"},i.default.createElement("a",{href:"tel:+41615112244"},"061 511 22 44")))),i.default.createElement("div",{className:"col-sm-12 bord"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Öffnungszeiten"),i.default.createElement("p",{className:"adress"},"Mo-Fr: 09:00 - 18:30 Uhr"),i.default.createElement("p",{className:"adress"},"Sa: 10:00 - 18:00 Uhr")),i.default.createElement("button",{className:"btn",onClick:function(){return e.showMapHandler(1)}},"Karte anzeigen",i.default.createElement("span",null,i.default.createElement("i",{className:"fa fa-long-arrow-right","aria-hidden":"true"}))),i.default.createElement("hr",null)),i.default.createElement("div",{className:"col-sm-12"},i.default.createElement("h3",{className:"placeDescription"},i.default.createElement("img",{loading:"lazy",alt:"",src:"/images/design/contact/flag-of-canton-of-basel.svg"}),"Filiale St. Jakob-Park, Basel")),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Adresse"),i.default.createElement("p",{className:"adress"},"St. Jakobs-Strasse 397 (im 2. UG)"),i.default.createElement("p",{className:"adress"},"CH-4052 Basel"))),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Telefon"),i.default.createElement("p",{className:"phone"},i.default.createElement("a",{href:"tel:+41613116020"},"061 311 60 20")))),i.default.createElement("div",{className:"col-sm-12 bord"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Öffnungszeiten"),i.default.createElement("p",{className:"adress"},"Mo-Fr: 09:00 - 19:00 Uhr"),i.default.createElement("p",{className:"adress"},"Sa: 09:00 - 18:00 Uhr")),i.default.createElement("button",{className:"btn",onClick:function(){return e.showMapHandler(5)}},"Karte anzeigen",i.default.createElement("span",null,i.default.createElement("i",{className:"fa fa-long-arrow-right","aria-hidden":"true"}))),i.default.createElement("hr",null)),i.default.createElement("div",{className:"col-sm-12"},i.default.createElement("h3",{className:"placeDescription"},i.default.createElement("img",{loading:"lazy",alt:"",src:"/images/design/contact/bern-logo.svg"}),"Filiale Shoppyland, Bern")),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Adresse"),i.default.createElement("p",{className:"adress"},"Industriestrasse 10 (im UG)"),i.default.createElement("p",{className:"adress"},"CH-3321 Schönbühl"))),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Telefon"),i.default.createElement("p",{className:"phone"},i.default.createElement("a",{href:"tel:+41318520901"},"031 852 09 01")))),i.default.createElement("div",{className:"col-sm-12 bord"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Öffnungszeiten"),i.default.createElement("p",{className:"adress"},"Mo-Do: 09:00 - 20:00 Uhr"),i.default.createElement("p",{className:"adress"},"Fr: 09:00 - 21:00 Uhr"),i.default.createElement("p",{className:"adress"},"Sa: 08:00 - 17:00 Uhr")),i.default.createElement("button",{className:"btn",onClick:function(){return e.showMapHandler(5)}},"Karte anzeigen",i.default.createElement("span",null,i.default.createElement("i",{className:"fa fa-long-arrow-right","aria-hidden":"true"}))),i.default.createElement("hr",null)),i.default.createElement("div",{className:"col-sm-12"},i.default.createElement("h3",{className:"placeDescription"},i.default.createElement("img",{loading:"lazy",alt:"",src:"/images/design/contact/emblem-7.svg"}),"Filiale Gäupark, Solothurn")),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Adresse"),i.default.createElement("p",{className:"adress"},"Hausimollstrasse 14 (im 1OG)"),i.default.createElement("p",{className:"adress"},"CH-4622 Egerkingen"))),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Telefon"),i.default.createElement("p",{className:"phone"},i.default.createElement("a",{href:"tel:+41625112270"},"062 511 22 70")))),i.default.createElement("div",{className:"col-sm-12 bord"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Öffnungszeiten"),i.default.createElement("p",{className:"adress"},"Mo-Mi: 09:00 - 18:30 Uhr"),i.default.createElement("p",{className:"adress"},"Do: 09:00 - 21:00 Uhr"),i.default.createElement("p",{className:"adress"},"Fr: 09:00 - 18:30 Uhr"),i.default.createElement("p",{className:"adress"},"Sa: 08:00 - 18:00 Uhr")),i.default.createElement("button",{className:"btn",onClick:function(){return e.showMapHandler(7)}},"Karte anzeigen",i.default.createElement("span",null,i.default.createElement("i",{className:"fa fa-long-arrow-right","aria-hidden":"true"}))))),"ch"!==r&&i.default.createElement("div",{className:"col-sm-8"},i.default.createElement("div",{className:"col-sm-12"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"E-Mail"),i.default.createElement("p",{className:"email"},i.default.createElement("span",{id:"email-rot-13"}))),i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Social"),i.default.createElement("div",{className:"imgSocial"},i.default.createElement("a",{href:"https://www.facebook.com/iReparatur.ch.remarket.ch",target:"_blank"},i.default.createElement("img",{loading:"lazy",src:"/images/design/icons-facebook.svg",alt:""})),i.default.createElement("a",{href:"https://twitter.com/remarket_ch",target:"_blank"},i.default.createElement("img",{loading:"lazy",src:"/images/design/icons-twitter.svg",alt:""})),i.default.createElement("a",{href:"https://www.instagram.com/remarket.ch/",target:"_blank"},i.default.createElement("img",{loading:"lazy",src:"/images/design/icon-instagram.svg",alt:""}))))),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Adresse"),i.default.createElement("p",{className:"adress"},"Berner Weg 23"),i.default.createElement("p",{className:"adress"},"D-79539 Lörrach"))),i.default.createElement("div",{className:"col-sm-6"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Telefon"),i.default.createElement("p",{className:"phone"},i.default.createElement("a",{href:"tel:+49762191656504"},"07621 916 56 50")))),i.default.createElement("div",{className:"col-sm-12 bord"},i.default.createElement("div",{className:"itemInfoBlock"},i.default.createElement("h3",{className:"title"},"Öffnungszeiten"),i.default.createElement("p",{className:"adress"},"Mo-Fr: 09:00 - 17:00 Uhr")),i.default.createElement("button",{className:"btn",onClick:function(){return e.showMapHandler(4)}},"Karte anzeigen",i.default.createElement("span",null,i.default.createElement("i",{className:"fa fa-long-arrow-right","aria-hidden":"true"}))),i.default.createElement("hr",null))),i.default.createElement("div",{className:"col-sm-6 col-lg-4"},i.default.createElement("div",{className:"contactForm"},this.state.infoMsg&&i.default.createElement("p",{className:"successMsg"},this.state.infoMsg),i.default.createElement("h3",{className:"title"},"Telefon"),i.default.createElement("h2",null,"Kontaktformular"),i.default.createElement("form",{action:"#",name:"contactForm",onSubmit:this.sendForm},i.default.createElement("div",{className:"wrapLabel"},i.default.createElement("label",null,i.default.createElement("input",{type:"radio",name:"gender",value:"Herr",required:!0}),i.default.createElement("span",null),"Herr"),i.default.createElement("label",null,i.default.createElement("input",{type:"radio",name:"gender",value:"Frau"}),i.default.createElement("span",null),"Frau"),i.default.createElement("label",null,i.default.createElement("input",{type:"checkbox",name:"company",checked:a.company,onChange:this.changeCheckbox}),i.default.createElement("span",{className:"check"}),"Firma")),i.default.createElement("div",{className:a.company?"":"hide"},i.default.createElement("input",{type:"text",name:"companyName",placeholder:"Firma",required:a.company})),i.default.createElement("input",{type:"text",name:"firstname",placeholder:"Vorname",required:!0}),i.default.createElement("input",{type:"text",name:"lastname",placeholder:"Nachname",required:!0}),i.default.createElement("input",{type:"number",name:"phone",placeholder:"Telefon",required:!0}),i.default.createElement("input",{type:"email",name:"email",placeholder:"E-Mail",required:!0}),i.default.createElement("input",{type:"text",name:"subject",placeholder:"Betreff",required:!0}),i.default.createElement("textarea",{name:"message",rows:"10",placeholder:"Nachricht",required:!0}),i.default.createElement("div",{className:"wrapLabel"},i.default.createElement("label",null,i.default.createElement("input",{type:"checkbox",name:"agree",checked:a.agree,onChange:this.changeCheckbox}),i.default.createElement("span",{className:"check"}),i.default.createElement("div",{className:"col-sm-10"},a.errorAgree&&i.default.createElement("a",{href:"/ueber-uns/datenschutzerklaerung/",target:"_blank",style:{color:"red"}}," Bitte lesen und akzeptieren Sie die Datenschutzerklärung."),!a.errorAgree&&i.default.createElement("a",{href:"/ueber-uns/datenschutzerklaerung/",target:"_blank",style:{color:"#02ca95"}}," Bitte lesen und akzeptieren Sie die Datenschutzerklärung.")))),i.default.createElement(u.default,{sitekey:window.captchaSitekey.key,render:"explicit",hl:"de",verifyCallback:this.verifyCaptchaCallback,onloadCallback:function(){return!1}}),n.errorCaptcha&&i.default.createElement("p",{style:{color:"red"}},"Bitte bestätigen Sie, dass Sie kein Roboter sind."),i.default.createElement("div",{className:"text-right"},i.default.createElement("button",{className:"btn",type:"submit"},"Senden",i.default.createElement("span",null,i.default.createElement("i",{className:"fa fa-long-arrow-right","aria-hidden":"true"}))))),i.default.createElement("div",{className:"cb"})))))}}]),t}(o.Component);h.propTypes={},h.defaultProps={},t.default=(0,f.connect)(function(e){return{user:e.user}})(h)},wxAW:function(e,t,a){"use strict";t.__esModule=!0;var n,r=a("C4MV"),l=(n=r)&&n.__esModule?n:{default:n};t.default=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,l.default)(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}()},zwoO:function(e,t,a){"use strict";t.__esModule=!0;var n,r=a("pFYg"),l=(n=r)&&n.__esModule?n:{default:n};t.default=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":(0,l.default)(t))&&"function"!=typeof t?e:t}}});