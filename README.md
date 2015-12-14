# ajax

ajax library

# demo

[here](http://vivaxy.github.io/ajax/demo)

# usage

```js
import Ajax from `path`;
new Ajax({
    url: 'data.json',
    type: 'POST'
}).on('success', function(responseText, xhr){

}).on('error', function(xhr){

})
```

# develop

1. `> npm i`

2. `> npm run build`

with webpack-dev-server `> npm run server`

# changelog

- 1.0.2 fix event-emitter not installed when `npm i`

- 1.0.1 use webpack and babel 6

- 1.0.0 initialize
