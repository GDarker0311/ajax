/**
 * @since 2015-09-21 12:35
 * @author vivaxy
 */
'use strict';
import Ajax from '../src/ajax.js';

let ajax = new Ajax({
    url: 'data.json'
}).on('success', (data) => {
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
        'function': () => {
            return 0;
        },
        'another': (value) => {
            console.log(value);
        }
    },
    'second': (value) => {
        console.log(value);
    }
});

ajax.send();
