(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('EventEmitter', ['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod);
        global.EventEmitter = mod.exports;
    }
})(this, function (exports, module) {
    /**
     * @since 15-09-02 10:25
     * @author vivaxy
     */
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var EventEmitter = (function () {
        function EventEmitter() {
            _classCallCheck(this, EventEmitter);

            this.events = {};
        }

        /**
         *
         * @param event
         * @param callback
         * @returns {EventEmitter}
         */

        _createClass(EventEmitter, [{
            key: 'on',
            value: function on(event, callback) {
                if (!this.events[event]) {
                    this.events[event] = [];
                }
                this.events[event].push(callback);
                return this;
            }

            /**
             *
             * @param event
             * @returns {EventEmitter}
             */
        }, {
            key: 'emit',
            value: function emit(event) {
                var callbacks = this.events[event],
                    _this = this,
                    _arguments = arguments;
                if (callbacks) {
                    callbacks.forEach(function (callback) {
                        callback.apply(_this, Array.prototype.slice.call(_arguments, 1));
                    });
                }
                return this;
            }

            /**
             *
             * @param event
             * @param callback
             * @returns {EventEmitter}
             */
        }, {
            key: 'off',
            value: function off(event, callback) {
                if (this.events[event] && callback) {
                    this.events[event].splice(this.events[event].indexOf(callback), 1);
                } else {
                    this.events[event] = [];
                }
                return this;
            }
        }]);

        return EventEmitter;
    })();

    module.exports = EventEmitter;
});
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('Ajax', ['exports', 'module', '../event-emitter/src/event-emitter.js'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require('../event-emitter/src/event-emitter.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod, global.EventEmitter);
        global.Ajax = mod.exports;
    }
})(this, function (exports, module, _eventEmitterSrcEventEmitterJs) {
    /**
     * @since 15-09-02 11:37
     * @author vivaxy
     */
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _EventEmitter2 = _interopRequireDefault(_eventEmitterSrcEventEmitterJs);

    var Ajax = (function (_EventEmitter) {
        _inherits(Ajax, _EventEmitter);

        function Ajax(options) {
            _classCallCheck(this, Ajax);

            _get(Object.getPrototypeOf(Ajax.prototype), 'constructor', this).call(this, arguments);
            this.url = options.url;
            this.type = options.type;
        }

        _createClass(Ajax, [{
            key: 'send',
            value: function send(data) {
                var _this = this;
                this.xhr = new XMLHttpRequest();
                this.xhr.addEventListener('readystatechange', function () {
                    /**
                     0    UNSENT    open() has not been called yet.
                     1    OPENED    send() has not been called yet.
                     2    HEADERS_RECEIVED    send() has been called, and headers and status are available.
                     3    LOADING    Downloading; responseText holds partial data.
                     4    DONE
                     */
                    if (_this.xhr.readyState === 4) {
                        if (_this.xhr.status >= 200 && _this.xhr.status < 300 || _this.xhr.status === 304) {
                            // 2** is valid response status, and 304 means get from the cache
                            // _this.xhr.responseType
                            _this.emit('success', _this.xhr.responseText, _this.xhr);
                        } else {
                            _this.emit('error', _this.xhr);
                        }
                    }
                });
                if (this.type && this.type.toUpperCase() === 'POST') {
                    _this.xhr.open('POST', this.url, true);
                    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
                    _this.xhr.send(this._getQueryString(data));
                } else {
                    var a = document.createElement('a');
                    a.href = this.url;
                    var url = a.origin + a.pathname + '?' + this._getQueryString(this._mixin(data, { _: new Date().getTime() }));
                    _this.xhr.open('GET', url, true);
                    _this.xhr.send();
                }
                // this.xhr.timeout = 0;
                return this;
            }
        }, {
            key: 'abort',
            value: function abort() {
                this.xhr.abort();
                return this;
            }
        }, {
            key: '_getQueryString',
            value: function _getQueryString(data) {
                if (typeof data === 'string') return data === '' ? '' : '?' + data;
                var queryString = '';
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var value = data[key];
                        if (typeof value !== 'string') {
                            try {
                                value = JSON.stringify(value);
                            } catch (e) {
                                throw 'data can not be parsed to queryString';
                            }
                        }
                        queryString += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                    }
                }
                return queryString.slice(0, -1);
            }
        }, {
            key: '_mixin',
            value: function _mixin(a, b) {
                var r = {};
                r = this._copy(a, r);
                r = this._copy(b, r);
                return r;
            }
        }, {
            key: '_copy',
            value: function _copy(a, r) {
                for (var i in a) {
                    if (a.hasOwnProperty(i)) {
                        r[i] = a[i];
                    }
                }
                return r;
            }
        }]);

        return Ajax;
    })(_EventEmitter2['default']);

    module.exports = Ajax;
});
