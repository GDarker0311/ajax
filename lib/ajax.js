/*
 * @author: vivaxy
 * @date:   2015-04-02 20:46:03
 * @last modified by:   vivaxy
 * @last modified time: 2015-04-03 09:38:19
 */

'use strict';

/**
 * @constructor
 * @param {[type]} options [description]
 */
var Ajax = function (options) {
        this.events = {};

        this.url = options.url;
        this.type = options.type;

    },
    p = {};

Ajax.prototype = p;

/**
 * on `success`
 * @param  {[type]}   event    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
p.on = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
    return this;
};

/**
 * fire events
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
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
 * send data
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
p.send = function (data) {
    var _this = this,
        xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                // 2** is valid response status, and 304 means get from the cache
                _this.fire('success', xhr.responseText, xhr);
            }
        }
        _this.fire('readystatechange', xhr);
    });
    if (this.type && this.type.toUpperCase() === 'POST') {
        xhr.open('POST', this.url, true);
        xhr.send(data);
    } else {
        var a = document.createElement('a');
        a.href = this.url;
        var url = a.origin + a.pathname + this.getQueryString(data);
        xhr.open('GET', url, true);
        xhr.send();
    }
    return this;
};

/**
 * get query string from data
 * @param  {[type]} data [description]
 * @return {[type]}        [description]
 */
p.getQueryString = function (data) {
    if (typeof data === 'string') return data === '' ? '' : '?' + data;
    var querystring = '?';
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var value = data[key];
            if (typeof value !== 'string') {
                try {
                    value = JSON.stringify(value);
                } catch (e) {
                    throw 'data can not be parsed to querystring';
                }
            }
            querystring += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
    }
    return querystring.slice(0, -1);
};
