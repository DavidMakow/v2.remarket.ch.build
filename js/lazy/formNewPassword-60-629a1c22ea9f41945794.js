webpackJsonp([60,77],{"+nnx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n("Dd8w")),o=u(n("d7EF")),a=n("GiK3"),s=u(a);u(n("KSGD"));function u(e){return e&&e.__esModule?e:{default:e}}var i=function(e){var t=e.error,n=e.label,u=e.id,i=e.name,l=e.type,f=e.handleChange,c=e.successResend,d=e.resendActivationLink,p=e.resendActivationEmail,m=(0,a.useState)({showPassword:!1}),y=(0,o.default)(m,2),v=y[0],w=y[1];return s.default.createElement("div",{className:"form__group"},s.default.createElement("input",{className:t?"errorInput string optional form__field":"string optional form__field",onChange:f,name:i,maxLength:"255",id:u,placeholder:" ",type:"password"!==l?l:v.showPassword?"text":"password",size:"50"}),"password"===l&&s.default.createElement("i",{className:v.showPassword?"eye eye-opened":"eye eye-closed",onClick:function(){return w((0,r.default)({},v,{showPassword:!v.showPassword}))}}),s.default.createElement("label",{className:"string optional form__label",htmlFor:u},n),t&&s.default.createElement("span",{className:"errorText"}," ",t,".",d&&s.default.createElement("span",{onClick:p,className:"resendActivationLink"},d)),c&&!t&&s.default.createElement("span",{className:"success"},c))};i.propTypes={},i.defaultProps={},t.default=i},"+zJ9":function(e,t,n){var r=n("GmwO")("meta"),o=n("8ANE"),a=n("x//u"),s=n("GCs6").f,u=0,i=Object.isExtensible||function(){return!0},l=!n("zyKz")(function(){return i(Object.preventExtensions({}))}),f=function(e){s(e,r,{value:{i:"O"+ ++u,w:{}}})},c=e.exports={KEY:r,NEED:!1,fastKey:function(e,t){if(!o(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!a(e,r)){if(!i(e))return"F";if(!t)return"E";f(e)}return e[r].i},getWeak:function(e,t){if(!a(e,r)){if(!i(e))return!0;if(!t)return!1;f(e)}return e[r].w},onFreeze:function(e){return l&&c.NEED&&i(e)&&!a(e,r)&&f(e),e}}},"0/jl":function(e,t,n){"use strict";var r=n("YjQv"),o=n("x//u"),a=n("qs+f"),s=n("Wdy1"),u=n("1RnF"),i=n("+zJ9").KEY,l=n("zyKz"),f=n("a/OS"),c=n("LhDF"),d=n("GmwO"),p=n("hgbu"),m=n("4DQ7"),y=n("Ntt2"),v=n("6rdy"),w=n("NU0k"),h=n("FKWp"),b=n("8ANE"),g=n("wXdB"),_=n("ksFB"),N=n("9MbE"),E=n("YTz9"),O=n("NZ8V"),P=n("6tLb"),S=n("rjjF"),j=n("THEY"),x=n("GCs6"),F=n("pEGt"),M=S.f,C=x.f,k=P.f,A=r.Symbol,z=r.JSON,B=z&&z.stringify,K=p("_hidden"),Y=p("toPrimitive"),D={}.propertyIsEnumerable,G=f("symbol-registry"),W=f("symbols"),T=f("op-symbols"),Q=Object.prototype,L="function"==typeof A&&!!j.f,R=r.QObject,Z=!R||!R.prototype||!R.prototype.findChild,I=a&&l(function(){return 7!=O(C({},"a",{get:function(){return C(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=M(Q,t);r&&delete Q[t],C(e,t,n),r&&e!==Q&&C(Q,t,r)}:C,V=function(e){var t=W[e]=O(A.prototype);return t._k=e,t},J=L&&"symbol"==typeof A.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof A},q=function(e,t,n){return e===Q&&q(T,t,n),h(e),t=N(t,!0),h(n),o(W,t)?(n.enumerable?(o(e,K)&&e[K][t]&&(e[K][t]=!1),n=O(n,{enumerable:E(0,!1)})):(o(e,K)||C(e,K,E(1,{})),e[K][t]=!0),I(e,t,n)):C(e,t,n)},H=function(e,t){h(e);for(var n,r=v(t=_(t)),o=0,a=r.length;a>o;)q(e,n=r[o++],t[n]);return e},U=function(e){var t=D.call(this,e=N(e,!0));return!(this===Q&&o(W,e)&&!o(T,e))&&(!(t||!o(this,e)||!o(W,e)||o(this,K)&&this[K][e])||t)},$=function(e,t){if(e=_(e),t=N(t,!0),e!==Q||!o(W,t)||o(T,t)){var n=M(e,t);return!n||!o(W,t)||o(e,K)&&e[K][t]||(n.enumerable=!0),n}},X=function(e){for(var t,n=k(_(e)),r=[],a=0;n.length>a;)o(W,t=n[a++])||t==K||t==i||r.push(t);return r},ee=function(e){for(var t,n=e===Q,r=k(n?T:_(e)),a=[],s=0;r.length>s;)!o(W,t=r[s++])||n&&!o(Q,t)||a.push(W[t]);return a};L||(u((A=function(){if(this instanceof A)throw TypeError("Symbol is not a constructor!");var e=d(arguments.length>0?arguments[0]:void 0),t=function(n){this===Q&&t.call(T,n),o(this,K)&&o(this[K],e)&&(this[K][e]=!1),I(this,e,E(1,n))};return a&&Z&&I(Q,e,{configurable:!0,set:t}),V(e)}).prototype,"toString",function(){return this._k}),S.f=$,x.f=q,n("2m2c").f=P.f=X,n("bSeU").f=U,j.f=ee,a&&!n("c8Kh")&&u(Q,"propertyIsEnumerable",U,!0),m.f=function(e){return V(p(e))}),s(s.G+s.W+s.F*!L,{Symbol:A});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)p(te[ne++]);for(var re=F(p.store),oe=0;re.length>oe;)y(re[oe++]);s(s.S+s.F*!L,"Symbol",{for:function(e){return o(G,e+="")?G[e]:G[e]=A(e)},keyFor:function(e){if(!J(e))throw TypeError(e+" is not a symbol!");for(var t in G)if(G[t]===e)return t},useSetter:function(){Z=!0},useSimple:function(){Z=!1}}),s(s.S+s.F*!L,"Object",{create:function(e,t){return void 0===t?O(e):H(O(e),t)},defineProperty:q,defineProperties:H,getOwnPropertyDescriptor:$,getOwnPropertyNames:X,getOwnPropertySymbols:ee});var ae=l(function(){j.f(1)});s(s.S+s.F*ae,"Object",{getOwnPropertySymbols:function(e){return j.f(g(e))}}),z&&s(s.S+s.F*(!L||l(function(){var e=A();return"[null]"!=B([e])||"{}"!=B({a:e})||"{}"!=B(Object(e))})),"JSON",{stringify:function(e){for(var t,n,r=[e],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=t=r[1],(b(t)||void 0!==e)&&!J(e))return w(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!J(t))return t}),r[1]=t,B.apply(z,r)}}),A.prototype[Y]||n("aLzV")(A.prototype,Y,A.prototype.valueOf),c(A,"Symbol"),c(Math,"Math",!0),c(r.JSON,"JSON",!0)},"2m2c":function(e,t,n){var r=n("DvwR"),o=n("B5V0").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,o)}},"3ggi":function(e,t,n){n("Ntt2")("asyncIterator")},"4DQ7":function(e,t,n){t.f=n("hgbu")},"4ajQ":function(e,t,n){var r=n("Wdy1");r(r.S+r.F*!n("qs+f"),"Object",{defineProperty:n("GCs6").f})},"5QVw":function(e,t,n){e.exports={default:n("tYO1"),__esModule:!0}},"6rdy":function(e,t,n){var r=n("pEGt"),o=n("THEY"),a=n("bSeU");e.exports=function(e){var t=r(e),n=o.f;if(n)for(var s,u=n(e),i=a.f,l=0;u.length>l;)i.call(e,s=u[l++])&&t.push(s);return t}},"6tLb":function(e,t,n){var r=n("ksFB"),o=n("2m2c").f,a={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return s&&"[object Window]"==a.call(e)?function(e){try{return o(e)}catch(e){return s.slice()}}(e):o(r(e))}},AFOY:function(e,t,n){n("CZee");var r=n("iANj").Object;e.exports=function(e,t){return r.create(e,t)}},BQO6:function(e,t,n){n("tz60"),n("+3lO"),e.exports=n("4DQ7").f("iterator")},BzqH:function(e,t,n){n("nclR"),e.exports=n("iANj").Object.setPrototypeOf},C4MV:function(e,t,n){e.exports={default:n("rKx+"),__esModule:!0}},CZee:function(e,t,n){var r=n("Wdy1");r(r.S,"Object",{create:n("NZ8V")})},NMac:function(e,t,n){var r=n("8ANE"),o=n("FKWp"),a=function(e,t){if(o(e),!r(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,r){try{(r=n("3fMt")(Function.call,n("rjjF").f(Object.prototype,"__proto__").set,2))(e,[]),t=!(e instanceof Array)}catch(e){t=!0}return function(e,n){return a(e,n),t?e.__proto__=n:r(e,n),e}}({},!1):void 0),check:a}},NU0k:function(e,t,n){var r=n("NZra");e.exports=Array.isArray||function(e){return"Array"==r(e)}},Ntt2:function(e,t,n){var r=n("YjQv"),o=n("iANj"),a=n("c8Kh"),s=n("4DQ7"),u=n("GCs6").f;e.exports=function(e){var t=o.Symbol||(o.Symbol=a?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||u(t,e,{value:s.f(e)})}},OoWg:function(e,t,n){n("Ntt2")("observable")},OvRC:function(e,t,n){e.exports={default:n("AFOY"),__esModule:!0}},Pf15:function(e,t,n){"use strict";t.__esModule=!0;var r=s(n("kiBT")),o=s(n("OvRC")),a=s(n("pFYg"));function s(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":(0,a.default)(t)));e.prototype=(0,o.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}},Zrlr:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},Zzip:function(e,t,n){e.exports={default:n("BQO6"),__esModule:!0}},gCWN:function(e,t){},kiBT:function(e,t,n){e.exports={default:n("BzqH"),__esModule:!0}},nclR:function(e,t,n){var r=n("Wdy1");r(r.S,"Object",{setPrototypeOf:n("NMac").set})},pFYg:function(e,t,n){"use strict";t.__esModule=!0;var r=s(n("Zzip")),o=s(n("5QVw")),a="function"==typeof o.default&&"symbol"==typeof r.default?function(e){return typeof e}:function(e){return e&&"function"==typeof o.default&&e.constructor===o.default&&e!==o.default.prototype?"symbol":typeof e};function s(e){return e&&e.__esModule?e:{default:e}}t.default="function"==typeof o.default&&"symbol"===a(r.default)?function(e){return void 0===e?"undefined":a(e)}:function(e){return e&&"function"==typeof o.default&&e.constructor===o.default&&e!==o.default.prototype?"symbol":void 0===e?"undefined":a(e)}},"rKx+":function(e,t,n){n("4ajQ");var r=n("iANj").Object;e.exports=function(e,t,n){return r.defineProperty(e,t,n)}},rjjF:function(e,t,n){var r=n("bSeU"),o=n("YTz9"),a=n("ksFB"),s=n("9MbE"),u=n("x//u"),i=n("LocR"),l=Object.getOwnPropertyDescriptor;t.f=n("qs+f")?l:function(e,t){if(e=a(e),t=s(t,!0),i)try{return l(e,t)}catch(e){}if(u(e,t))return o(!r.f.call(e,t),e[t])}},tYO1:function(e,t,n){n("0/jl"),n("gCWN"),n("3ggi"),n("OoWg"),e.exports=n("iANj").Symbol},vKmc:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FormNewPassword=void 0;var r=v(n("Dd8w")),o=v(n("Zrlr")),a=v(n("wxAW")),s=v(n("zwoO")),u=v(n("Pf15")),i=n("GiK3"),l=v(i),f=(v(n("KSGD")),v(n("mtWM"))),c=n("CIox"),d=v(n("+nnx")),p=(v(n("vY3h")),n("RH2O")),m=n("c9Fv"),y=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n("GGA4"));function v(e){return e&&e.__esModule?e:{default:e}}var w=t.FormNewPassword=function(e){function t(e){(0,o.default)(this,t);var n=(0,s.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={error:{password:"",password_confirmation:""},message:""},n.closeLogin=n.closeLogin.bind(n),n.newPasswordSend=n.newPasswordSend.bind(n),n.handleChangeNewPassword=n.handleChangeNewPassword.bind(n),n}return(0,u.default)(t,e),(0,a.default)(t,[{key:"closeLogin",value:function(){c.browserHistory.push("/")}},{key:"handleChangeNewPassword",value:function(e){var t=e.target,n=t.name,r=t.value,o=this.state.error;/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(r.trim())?$(e.target).parents(".input.full").find(".statusBarPassword").css({background:"#00cb94"}):$(e.target).parents(".input.full").find(".statusBarPassword").css({background:"#ff0000"}),o[n]=null,this.setState({error:o})}},{key:"newPasswordSend",value:function(e){var t=this;e.preventDefault();var n="/api/reset/"+this.props.params.hash,o=new FormData(document.forms.newPasswordForm);document.getElementById("spinner-box-load").style.display="block",f.default.post(n,o).then(function(e){if(document.getElementById("spinner-box-load").style.display="none","true"===e.data.status)document.querySelectorAll(".simform input:not([type=submit])").forEach(function(e){return e.value=""}),t.setState({message:e.data.message});else{var n=e.data.message,o=void 0,a=void 0;n&&(o=a=n),t.setState({error:(0,r.default)({},t.state.error,{password:o,password_confirmation:a})})}}).catch(function(e){document.getElementById("spinner-box-load").style.display="none";var n=e.response.data.errors,o=void 0,a=void 0;n&&n.password&&(o=a=n.password[0]),t.setState({error:(0,r.default)({},t.state.error,{password:o,password_confirmation:a})})})}},{key:"render",value:function(){return l.default.createElement("div",{className:"resetPassword"},l.default.createElement("div",{className:"container"},l.default.createElement("div",{className:"col-md-8 col-md-push-2 resetPassword-wrap"},this.state.message&&l.default.createElement("p",{className:"message"},this.state.message),l.default.createElement("div",{className:"circle"}),l.default.createElement("p",{className:"title"},"Passwort ändern"),l.default.createElement("form",{acceptCharset:"utf-8",action:"#",className:"simform",name:"newPasswordForm",onSubmit:this.newPasswordSend},l.default.createElement("div",{className:"sminputs"},l.default.createElement("div",{className:"input full"},l.default.createElement(d.default,{error:this.state.error.password,id:"new-password",name:"password",type:"password",placeholder:"Neues Passwort",label:"Neues Passwort",handleChange:this.handleChangeNewPassword}),l.default.createElement("div",{className:"statusBarPassword"})),l.default.createElement("div",{className:"input full"},l.default.createElement(d.default,{error:this.state.error.password_confirmation,id:"confirm_password",name:"password_confirmation",type:"password",placeholder:"Passwort bestätigen",label:"Passwort bestätigen",handleChange:this.handleChangeNewPassword}))),l.default.createElement("div",{className:"simform-actions"},l.default.createElement("button",{className:"btn"},"Senden",l.default.createElement("span",null,l.default.createElement("i",{className:"fa fa-long-arrow-right","aria-hidden":"true"}))))))))}}]),t}(i.Component);w.propTypes={},w.defaultProps={},t.default=(0,p.connect)(function(e){return{}},function(e){return{userActions:(0,m.bindActionCreators)(y,e)}},null,{pure:!1})(w)},vY3h:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n("GiK3"),a=(r=o)&&r.__esModule?r:{default:r};t.default=function(e){var t=e.id,n=void 0===t?"spinner-box-load":t;return a.default.createElement("div",{id:n,className:"dn"},a.default.createElement("div",{className:"animation"},a.default.createElement("div",{className:"circle"}),a.default.createElement("img",{loading:"lazy",src:"/images/design/logo_animation-spinner.svg",alt:"Logo"})))}},wxAW:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n("C4MV"),a=(r=o)&&r.__esModule?r:{default:r};t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,a.default)(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},zwoO:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n("pFYg"),a=(r=o)&&r.__esModule?r:{default:r};t.default=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":(0,a.default)(t))&&"function"!=typeof t?e:t}}});