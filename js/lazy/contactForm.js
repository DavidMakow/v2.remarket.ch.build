webpackJsonp([65],{

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContactForm = undefined;

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

var _reactRecaptcha = __webpack_require__(992);

var _reactRecaptcha2 = _interopRequireDefault(_reactRecaptcha);

var _axios = __webpack_require__(149);

var _axios2 = _interopRequireDefault(_axios);

var _reactRedux = __webpack_require__(313);

var _helpersFunction = __webpack_require__(316);

var _reactI18next = __webpack_require__(315);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactForm = exports.ContactForm = function (_Component) {
    (0, _inherits3.default)(ContactForm, _Component);

    function ContactForm(props) {
        (0, _classCallCheck3.default)(this, ContactForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ContactForm.__proto__ || Object.getPrototypeOf(ContactForm)).call(this, props));

        _this.state = {
            inputCheckbox: {
                company: false,
                agree: false,
                errorAgree: false
            },
            captcha: {
                isCheckCaptcha: false,
                errorCaptcha: false
            },
            infoMsg: null
        };

        _this.changeCheckbox = _this.changeCheckbox.bind(_this);
        _this.sendForm = _this.sendForm.bind(_this);
        _this.verifyCaptchaCallback = _this.verifyCaptchaCallback.bind(_this);
        _this._setPersonalDataFields = _this._setPersonalDataFields.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ContactForm, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.user.isLogin !== this.props.user.isLogin && nextProps.user.isLogin === false) {
                var inputs = document.querySelectorAll('.contactForm input');
                inputs.forEach(function (item) {
                    item.value = "";
                    item.checked = false;
                });
                this.setState({ inputCheckbox: (0, _extends3.default)({}, this.state.inputCheckbox, { company: false }) });
            }
            if (nextProps.user.data !== this.props.user.data && nextProps.user.data) {
                this._setPersonalDataFields(nextProps.user.data.shippingAddress);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.user.data) {
                this._setPersonalDataFields(this.props.user.data.shippingAddress);
            }
            this.encryptedEmail();
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
        key: 'showMapHandler',
        value: function showMapHandler(plId) {
            (0, _helpersFunction.showMap)(plId);
        }
    }, {
        key: '_setPersonalDataFields',
        value: function _setPersonalDataFields(data) {
            var contactForm = document.forms.contactForm,
                inputCheckbox = this.state.inputCheckbox;

            for (var key in data) {
                if (key === 'companyName') {
                    if (data[key]) {
                        inputCheckbox.company = true;
                        contactForm[key].value = data[key];
                    } else {
                        inputCheckbox.company = false;
                        contactForm[key].value = data[key];
                    }
                } else if (contactForm[key]) contactForm[key].value = data[key];
            }
            this.setState({ inputCheckbox: inputCheckbox });
        }
    }, {
        key: 'verifyCaptchaCallback',
        value: function verifyCaptchaCallback(res) {
            this.setState({ captcha: (0, _extends3.default)({}, this.state.captcha, { isCheckCaptcha: true, errorCaptcha: false }) });
        }
    }, {
        key: 'changeCheckbox',
        value: function changeCheckbox(e) {
            var inputCheckbox = this.state.inputCheckbox;

            inputCheckbox[e.target.name] = !inputCheckbox[e.target.name];
            this.setState({ inputCheckbox: inputCheckbox });
        }
    }, {
        key: 'sendForm',
        value: function sendForm(e) {
            var _this2 = this;

            e.preventDefault();
            var data = new FormData(document.forms.contactForm),
                captcha = this.state.captcha,
                inputCheckbox = this.state.inputCheckbox;

            if (inputCheckbox.agree) {
                this.setState({ inputCheckbox: (0, _extends3.default)({}, this.state.inputCheckbox, { errorAgree: false }) });
                if (captcha.isCheckCaptcha || !window.isGoogleConnection) {
                    document.getElementById('spinner-box-load').style.display = 'block';
                    _axios2.default.post('/api/contactUs', data).then(function (result) {
                        document.getElementById('spinner-box-load').style.display = 'none';
                        document.querySelectorAll('input[name=subject], textarea').forEach(function (item) {
                            return item.value = "";
                        });
                        _this2.setState({ infoMsg: result.data });
                    }).catch(function (error) {
                        document.getElementById('spinner-box-load').style.display = 'none';
                    });
                } else {
                    this.setState({ captcha: (0, _extends3.default)({}, this.state.captcha, { errorCaptcha: true }) });
                }
            } else {
                this.setState({ inputCheckbox: (0, _extends3.default)({}, this.state.inputCheckbox, { errorAgree: true }) });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                inputCheckbox = _state.inputCheckbox,
                captcha = _state.captcha,
                domain = window.domainName.name.split('.')[window.domainName.name.split('.').length - 1];
            var t = this.props.t;

            return _react2.default.createElement(
                'div',
                { className: 'contactPage' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal fade bs-example-modal-lg',
                        id: 'modalMap',
                        tabIndex: '-1',
                        'data-keyboard': 'false',
                        role: 'dialog',
                        'aria-labelledby': 'myLargeModalLabeAgb' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-dialog modal-lg modal-dialog-centered', role: 'document' },
                        _react2.default.createElement('button', { type: 'button', className: 'closeModal',
                            onClick: function onClick() {
                                return $('#modalMap').modal('hide');
                            },
                            'data-dismiss': 'modal',
                            'aria-label': 'Close' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-content' },
                            _react2.default.createElement('div', { className: 'mapContainer' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container mb' },
                    domain === 'ch' && _react2.default.createElement(
                        'div',
                        { className: 'col-sm-6 col-lg-8' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentEmail")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'email' },
                                    _react2.default.createElement('span', { id: 'email-rot-13' })
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentSocial")
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'imgSocial' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'https://www.facebook.com/remarketch-Kaufen-und-Verkaufen-per-Knopfdruck-157822264839941/',
                                            target: '_blank' },
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/icons-facebook.svg', alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'https://tiktok.com/@remarket.ch', target: '_blank' },
                                        _react2.default.createElement('img', { loading: 'lazy',
                                            src: '/images/design/icons-tiktok.svg', alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'https://www.instagram.com/remarket.ch/', target: '_blank' },
                                        _react2.default.createElement('img', { loading: 'lazy',
                                            src: '/images/design/icon-instagram.svg', alt: '' })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'placeDescription' },
                                _react2.default.createElement('img', { loading: 'lazy', alt: '', src: '/images/design/contact/flag-of-canton-of-basel.svg' }),
                                t("contactPage.h1MainContentBranch"),
                                ' Barf\xFCsserplatz, Basel'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentAddress")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Gerbergasse 82'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'CH-4001 Basel'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentPhone")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'phone' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'tel:+41615112244' },
                                        '061 511 22 44'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12 bord' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentOpeningHours")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Mo-Fr: 09:00 - 18:30 Uhr'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Sa: 10:00 - 18:00 Uhr'
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn', onClick: function onClick() {
                                        return _this3.showMapHandler(1);
                                    } },
                                t("contactPage.h1MainContentShowMap"),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                )
                            ),
                            _react2.default.createElement('hr', null)
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'placeDescription' },
                                _react2.default.createElement('img', { loading: 'lazy', alt: '', src: '/images/design/contact/flag-of-canton-of-basel.svg' }),
                                t("contactPage.h1MainContentBranch"),
                                ' St. Jakob-Park, Basel'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentAddress")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'St. Jakobs-Strasse 397 (im 2. UG)'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'CH-4052 Basel'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentAddress")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'phone' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'tel:+41613116020' },
                                        '061 311 60 20'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12 bord' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentOpeningHours")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Mo-Fr: 09:00 - 19:00 Uhr'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Sa: 09:00 - 18:00 Uhr'
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn', onClick: function onClick() {
                                        return _this3.showMapHandler(5);
                                    } },
                                t("contactPage.h1MainContentShowMap"),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                )
                            ),
                            _react2.default.createElement('hr', null)
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'placeDescription' },
                                _react2.default.createElement('img', { loading: 'lazy', alt: '', src: '/images/design/contact/bern-logo.svg' }),
                                t("contactPage.h1MainContentBranch"),
                                ' Shoppyland, Bern'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentAddress")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Industriestrasse 10 (im UG)'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'CH-3321 Sch\xF6nb\xFChl'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentPhone")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'phone' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'tel:+41318520901' },
                                        '031 852 09 01'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12 bord' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentOpeningHours")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Mo-Do: 09:00 - 20:00 Uhr'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Fr: 09:00 - 21:00 Uhr'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Sa: 08:00 - 17:00 Uhr'
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn', onClick: function onClick() {
                                        return _this3.showMapHandler(5);
                                    } },
                                t("contactPage.h1MainContentShowMap"),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                )
                            ),
                            _react2.default.createElement('hr', null)
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'placeDescription' },
                                _react2.default.createElement('img', { loading: 'lazy', alt: '', src: '/images/design/contact/emblem-7.svg' }),
                                t("contactPage.h1MainContentBranch"),
                                ' G\xE4upark, Solothurn'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentAddress")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Hausimollstrasse 14 (im 1OG)'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'CH-4622 Egerkingen'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentPhone")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'phone' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'tel:+41625112270' },
                                        '062 511 22 70'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12 bord' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentOpeningHours")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Mo-Mi: 09:00 - 18:30 Uhr'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Do: 09:00 - 21:00 Uhr'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Fr: 09:00 - 18:30 Uhr'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Sa: 08:00 - 18:00 Uhr'
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn', onClick: function onClick() {
                                        return _this3.showMapHandler(7);
                                    } },
                                t("contactPage.h1MainContentShowMap"),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                )
                            )
                        )
                    ),
                    domain !== 'ch' && _react2.default.createElement(
                        'div',
                        { className: 'col-sm-8' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentEmail")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'email' },
                                    _react2.default.createElement('span', { id: 'email-rot-13' })
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentSocial")
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'imgSocial' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'https://www.facebook.com/iReparatur.ch.remarket.ch',
                                            target: '_blank' },
                                        _react2.default.createElement('img', { loading: 'lazy', src: '/images/design/icons-facebook.svg', alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'https://twitter.com/remarket_ch', target: '_blank' },
                                        _react2.default.createElement('img', { loading: 'lazy',
                                            src: '/images/design/icons-twitter.svg', alt: '' })
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'https://www.instagram.com/remarket.ch/', target: '_blank' },
                                        _react2.default.createElement('img', { loading: 'lazy',
                                            src: '/images/design/icon-instagram.svg', alt: '' })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentAddress")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Berner Weg 23'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'D-79539 L\xF6rrach'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentPhone")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'phone' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'tel:+49762191656504' },
                                        '07621 916 56 50'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12 bord' },
                            _react2.default.createElement(
                                'div',
                                { className: 'itemInfoBlock' },
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'title' },
                                    t("contactPage.h1MainContentOpeningHours")
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'adress' },
                                    'Mo-Fr: 09:00 - 17:00 Uhr'
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn', onClick: function onClick() {
                                        return _this3.showMapHandler(4);
                                    } },
                                t("contactPage.h1MainContentShowMap"),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                )
                            ),
                            _react2.default.createElement('hr', null)
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm-6 col-lg-4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'contactForm' },
                            this.state.infoMsg && _react2.default.createElement(
                                'p',
                                { className: 'successMsg' },
                                this.state.infoMsg
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'title' },
                                t("contactPage.h1FormRightSideTelefon")
                            ),
                            _react2.default.createElement(
                                'h2',
                                null,
                                t("contactPage.h1FormRightSideContactForm")
                            ),
                            _react2.default.createElement(
                                'form',
                                { action: '#', name: 'contactForm', onSubmit: this.sendForm },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'wrapLabel' },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        _react2.default.createElement('input', { type: 'radio', name: 'gender', value: 'Herr', required: true }),
                                        _react2.default.createElement('span', null),
                                        t("contactPage.h1FormRightSideMr")
                                    ),
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        _react2.default.createElement('input', { type: 'radio', name: 'gender', value: 'Frau' }),
                                        _react2.default.createElement('span', null),
                                        t("contactPage.h1FormRightSideMrs")
                                    ),
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        _react2.default.createElement('input', { type: 'checkbox',
                                            name: 'company',
                                            checked: inputCheckbox.company,
                                            onChange: this.changeCheckbox }),
                                        _react2.default.createElement('span', { className: 'check' }),
                                        t("contactPage.h1FormRightSideCompany")
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: inputCheckbox.company ? "" : "hide" },
                                    _react2.default.createElement('input', { type: 'text', name: 'companyName', placeholder: t("contactPage.h1FormRightSideCompany"), required: inputCheckbox.company })
                                ),
                                _react2.default.createElement('input', { type: 'text', name: 'firstname', placeholder: t("contactPage.h1FormRightSideFirstName"), required: true }),
                                _react2.default.createElement('input', { type: 'text', name: 'lastname', placeholder: t("contactPage.h1FormRightSideLastName"), required: true }),
                                _react2.default.createElement('input', { type: 'number', name: 'phone', placeholder: t("contactPage.h1FormRightSideWiederholt"), required: true }),
                                _react2.default.createElement('input', { type: 'email', name: 'email', placeholder: t("contactPage.h1FormRightSideEmail"), required: true }),
                                _react2.default.createElement('input', { type: 'text', name: 'subject', placeholder: t("contactPage.h1FormRightSideSubject"), required: true }),
                                _react2.default.createElement('textarea', { name: 'message', rows: '10', placeholder: t("contactPage.h1FormRightSideMessage"), required: true }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'wrapLabel' },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        _react2.default.createElement('input', { type: 'checkbox',
                                            name: 'agree',
                                            checked: inputCheckbox.agree,
                                            onChange: this.changeCheckbox }),
                                        _react2.default.createElement('span', { className: 'check' }),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'col-sm-10' },
                                            inputCheckbox.errorAgree && _react2.default.createElement(
                                                'a',
                                                { href: '/ueber-uns/datenschutzerklaerung/', target: '_blank', style: { color: 'red' } },
                                                ' ',
                                                t("contactPage.h1FormRightSidePleaseRead")
                                            ),
                                            !inputCheckbox.errorAgree && _react2.default.createElement(
                                                'a',
                                                { href: '/ueber-uns/datenschutzerklaerung/', target: '_blank', style: { color: '#02ca95' } },
                                                ' ',
                                                t("contactPage.h1FormRightSidePleaseRead")
                                            )
                                        )
                                    )
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
                                    t("contactPage.h1FormRightSidePleaseRead")
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'text-right' },
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'btn', type: 'submit' },
                                        t("contactPage.h1FormRightSideSend"),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            _react2.default.createElement('i', { className: 'fa fa-long-arrow-right', 'aria-hidden': 'true' })
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement('div', { className: 'cb' })
                        )
                    )
                )
            );
        }
    }]);
    return ContactForm;
}(_react.Component);

ContactForm.propTypes = {};
ContactForm.defaultProps = {};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactI18next.withTranslation)()(ContactForm));

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

/***/ 992:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(16)):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.ReactRecaptcha=t(require("react")):e.ReactRecaptcha=t(e.React)}(this,function(e){return function(e){function t(r){if(a[r])return a[r].exports;var n=a[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),s=a(6),c=r(s),p=a(4),u=r(p),d={className:u.default.string,onloadCallbackName:u.default.string,elementID:u.default.string,onloadCallback:u.default.func,verifyCallback:u.default.func,expiredCallback:u.default.func,render:u.default.oneOf(["onload","explicit"]),sitekey:u.default.string,theme:u.default.oneOf(["light","dark"]),type:u.default.string,verifyCallbackName:u.default.string,expiredCallbackName:u.default.string,size:u.default.oneOf(["invisible","compact","normal"]),tabindex:u.default.string,hl:u.default.string,badge:u.default.oneOf(["bottomright","bottomleft","inline"])},f={elementID:"g-recaptcha",className:"g-recaptcha",onloadCallback:void 0,onloadCallbackName:"onloadCallback",verifyCallback:void 0,verifyCallbackName:"verifyCallback",expiredCallback:void 0,expiredCallbackName:"expiredCallback",render:"onload",theme:"light",type:"image",size:"normal",tabindex:"0",hl:"en",badge:"bottomright"},h=function(){return"undefined"!=typeof window&&"undefined"!=typeof window.grecaptcha&&"function"==typeof window.grecaptcha.render},y=void 0,b=function(e){function t(e){n(this,t);var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a._renderGrecaptcha=a._renderGrecaptcha.bind(a),a.reset=a.reset.bind(a),a.state={ready:h(),widget:null},a.state.ready||"undefined"==typeof window||(y=setInterval(a._updateReadyState.bind(a),1e3)),a}return i(t,e),l(t,[{key:"componentDidMount",value:function(){this.state.ready&&this._renderGrecaptcha()}},{key:"componentDidUpdate",value:function(e,t){var a=this.props,r=a.render,n=a.onloadCallback;"explicit"===r&&n&&this.state.ready&&!t.ready&&this._renderGrecaptcha()}},{key:"componentWillUnmount",value:function(){clearInterval(y)}},{key:"reset",value:function(){var e=this.state,t=e.ready,a=e.widget;t&&null!==a&&grecaptcha.reset(a)}},{key:"execute",value:function(){var e=this.state,t=e.ready,a=e.widget;t&&null!==a&&grecaptcha.execute(a)}},{key:"_updateReadyState",value:function(){h()&&(this.setState({ready:!0}),clearInterval(y))}},{key:"_renderGrecaptcha",value:function(){this.state.widget=grecaptcha.render(this.props.elementID,{sitekey:this.props.sitekey,callback:this.props.verifyCallback?this.props.verifyCallback:void 0,theme:this.props.theme,type:this.props.type,size:this.props.size,tabindex:this.props.tabindex,hl:this.props.hl,badge:this.props.badge,"expired-callback":this.props.expiredCallback?this.props.expiredCallback:void 0}),this.props.onloadCallback&&this.props.onloadCallback()}},{key:"render",value:function(){return"explicit"===this.props.render&&this.props.onloadCallback?c.default.createElement("div",{id:this.props.elementID,"data-onloadcallbackname":this.props.onloadCallbackName,"data-verifycallbackname":this.props.verifyCallbackName}):c.default.createElement("div",{id:this.props.elementID,className:this.props.className,"data-sitekey":this.props.sitekey,"data-theme":this.props.theme,"data-type":this.props.type,"data-size":this.props.size,"data-badge":this.props.badge,"data-tabindex":this.props.tabindex})}}]),t}(s.Component);t.default=b,b.propTypes=d,b.defaultProps=f,e.exports=t.default},function(e,t){"use strict";function a(e){return function(){return e}}var r=function(){};r.thatReturns=a,r.thatReturnsFalse=a(!1),r.thatReturnsTrue=a(!0),r.thatReturnsNull=a(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,a){"use strict";function r(e,t,a,r,o,i,l,s){if(n(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var p=[a,r,o,i,l,s],u=0;c=new Error(t.replace(/%s/g,function(){return p[u++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}}var n=function(e){};e.exports=r},function(e,t,a){"use strict";var r=a(1),n=a(2),o=a(5);e.exports=function(){function e(e,t,a,r,i,l){l!==o&&n(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return a.checkPropTypes=r,a.PropTypes=a,a}},function(e,t,a){e.exports=a(3)()},function(e,t){"use strict";var a="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=a},function(t,a){t.exports=e}])});

/***/ })

});