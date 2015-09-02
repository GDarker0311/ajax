/*
 * @Author: vivaxy
 * @Date:   2015-04-03 10:11:40
 * @Last Modified by:   vivaxy
 * @Last Modified time: 2015-04-03 10:32:53
 */

'use strict';

var ajax = new Ajax({
    url: 'data.json'
}).on('success', function (data) {
    console.log(JSON.parse(data));
}).on('readystatechange', function (data) {
     //console.log(data);
}).send('name=jack&date=2015-04-03');

ajax.send({
    'name': 'jones',
    'data': '20150403'
});

ajax.send({
    'first': {
        'function': function () {
            return 0;
        },
        'another': function (value) {
            console.log(value);
        }
    },
    'second': function (value) {
        console.log(value);
    }
});

ajax.send();
