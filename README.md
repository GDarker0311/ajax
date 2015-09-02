# ajax
ajax library

## example

[here](http://vivaxy.github.io/ajax/example)

## usage

```js
new Ajax({
    url: 'data.json',
    type: 'POST'
}).on('success', function(responseText, xhr){

}).on('error', function(xhr){

})
```

## develop

1. npm i

2. git submodule update --init

3. make
