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
