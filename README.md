# ajax
ajax library

## demo

[here](http://vivaxy.github.io/ajax/demo)

## usage

```js
import Ajax from `path`;
new Ajax({
    url: 'data.json',
    type: 'POST'
}).on('success', function(responseText, xhr){

}).on('error', function(xhr){

})
```

## develop

1. npm i

2. `git submodule update --init` (update `git submodule update --remote`)

3. make
