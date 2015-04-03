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
 * @param  {[type]} data  [description]
 * @return {[type]}       [description]
 */
p.fire = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback(data);
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
        ajax = new XMLHttpRequest();
    ajax.addEventListener('readystatechange', function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            _this.fire('success', ajax.responseText);
        }
        _this.fire('readystatechange', ajax);
    });
    if (this.type && this.type.toUpperCase() === 'POST') {
        ajax.open('POST', this.url, true);
        ajax.send(data);
    } else {
        var a = document.createElement('a');
        a.href = this.url;
        var url = a.origin + a.pathname + this.getQueryString(data);
        ajax.open('GET', url, true);
        ajax.send();
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
                    throw new Error('data can not be parsed to querystring');
                }
            }
            querystring += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
    }
    return querystring.slice(0, -1);
};
