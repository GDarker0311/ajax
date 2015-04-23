/*
 * @author: vivaxy
 * @date:   2015-04-02 20:46:03
 * @last modified by:   vivaxy
 * @last modified time: 2015-04-03 09:38:19
 */

'use strict';

/**
 *
 * @param options
 * @constructor
 */
var Ajax = function (options) {
        this.events = {};

        this.url = options.url;
        this.type = options.type;

    },
    p = {};

Ajax.prototype = p;

/**
 *
 * @param event
 * @param callback
 * @returns {p}
 */
p.on = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
    return this;
};

/**
 *
 * @param event
 * @returns {p}
 */
p.fire = function (event) {
    var callbacks = this.events[event],
        _this = this,
        _arguments = arguments;
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback.apply(null, Array.prototype.slice.call(_arguments, 1));
        });
    }
    return this;
};

/**
 *
 * @param data
 * @returns {p}
 */
p.send = function (data) {
    var _this = this;
    this.xhr = new XMLHttpRequest();
    this.xhr.addEventListener('readystatechange', function () {
        /**
         0	UNSENT	open() has not been called yet.
         1	OPENED	send() has not been called yet.
         2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
         3	LOADING	Downloading; responseText holds partial data.
         4	DONE
         */
        if (_this.xhr.readyState === 4) {
            if (_this.xhr.status >= 200 && _this.xhr.status < 300 || _this.xhr.status === 304) {
                // 2** is valid response status, and 304 means get from the cache
                // _this.xhr.responseType
                _this.fire('success', _this.xhr.responseText, _this.xhr);
            } else {
                _this.fire('error', _this.xhr);
            }
        }
    });
    if (this.type && this.type.toUpperCase() === 'POST') {
        _this.xhr.open('POST', this.url, true);
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        _this.xhr.send(this.getQueryString(data));
    } else {
        var a = document.createElement('a');
        a.href = this.url;
        var url = a.origin + a.pathname + '?' + this.getQueryString(this.mixin(data, {_: new Date().getTime()}));
        _this.xhr.open('GET', url, true);
        _this.xhr.send();
    }
    // this.xhr.timeout = 0;
    return this;
};

/**
 * abort ajax
 * @returns {p}
 */
p.abort = function () {
    this.xhr.abort();
    return this;
};

/**
 *
 * @param data
 * @returns {*}
 */
p.getQueryString = function (data) {
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
};

/**
 *
 * @param a
 * @param b
 * @returns {{}}
 */
p.mixin = function (a, b) {
    var r = {};
    r = this.copy(a, r);
    r = this.copy(b, r);
    return r;
};

/**
 *
 * @param a
 * @param r
 * @returns {*}
 */
p.copy = function (a, r) {
    for (var i in a) {
        if (a.hasOwnProperty(i)) {
            r[i] = a[i];
        }
    }
    return r;
};

// getAllResponseHeaders();
// getResponseHeader('key');
// overrideMimeType('mime type');
// setRequestHeader('key', 'value');
