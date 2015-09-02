/**
 * @since 15-09-02 11:37
 * @author vivaxy
 */
'use strict';
import EventEmitter from '../event-emitter/src/event-emitter.js';

class Ajax extends EventEmitter {

    constructor(options) {
        super(arguments);
        this.url = options.url;
        this.type = options.type;
        this.contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    send(data) {
        let _this = this;
        this.xhr = new XMLHttpRequest();
        this.xhr.addEventListener('readystatechange', () => {
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
            this.xhr.open('POST', this.url, true);
            this.xhr.setRequestHeader('Content-Type', this.contentType);
            this.xhr.send(this._getQueryString(data));
        } else {
            let a = document.createElement('a');
            a.href = this.url;
            let search = '';
            let timestamp = new Date().getTime();
            switch (typeof data) {
                case 'undefined': // undefined
                    search = '_=' + timestamp;
                    break;
                case 'string': // string
                    search = data === '' ? '_=' + timestamp : data + '&_=' + timestamp;
                    break;
                case 'object':
                    search = this._getQueryString(this._mixin(data, {
                        _: timestamp
                    }));
                    break;
                default:
                    throw new Error('data type error: not in `undefined`, `string` or `object`');
            }
            let url = a.origin + a.pathname + '?' + search;
            this.xhr.open('GET', url, true);
            this.xhr.send();
        }
        // this.xhr.timeout = 0;
        return this;
    }

    abort() {
        this.xhr.abort();
        return this;
    }

    _getQueryString(data) {
        if (typeof data === 'string') {
            return data;
        }
        let queryString = '';
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                if (typeof value !== 'string') {
                    try {
                        value = JSON.stringify(value);
                    } catch (e) {
                        throw 'data can not be parsed to queryString';
                    }
                }
                if (value !== undefined) { // omit undefined key pair
                    queryString += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
        }
        return queryString.slice(0, -1);
    }

    _mixin(a, b) {
        let r = {};
        r = this._copy(a, r);
        r = this._copy(b, r);
        return r;
    }

    _copy(a, r) {
        for (let i in a) {
            if (a.hasOwnProperty(i)) {
                r[i] = a[i];
            }
        }
        return r;
    }

}

export default Ajax;
