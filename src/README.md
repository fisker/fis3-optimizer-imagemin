# <%= package.name %>
<%= package.description %>

[![npm](https://img.shields.io/npm/v/<%= package.name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= package.name %>)
[![npm](https://img.shields.io/npm/dt/<%= package.name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= package.name %>)
[![npm](https://img.shields.io/npm/dm/<%= package.name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= package.name %>)

## install
```sh
npm i -g <%= package.name %>
```

### default options
```
<%= JSON.stringify(options, null, 2) %>
```
more options:
<%
if (standalone) {
%>
https://www.npmjs.com/package/imagemin-<%= plugin.name %>
<%
} else {
  _.forEach(plugins, function(plugin) {
%>
https://www.npmjs.com/package/imagemin-<%= plugin.name %>
<%
  })
}
%>

notice: *default plugin and plugin config might change in future*

### usage

```
// fis-conf.js

var options = {} // your options

fis.match('<%= standalone ? '*' + plugin.ext : '::image' %>', {
  optimizer: fis.plugin('imagemin<%= standalone ? '-' + plugin.name : '' %>', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin
<%
if (standalone) {
%>
imagemin-<%= plugin.name %>: https://www.npmjs.com/package/imagemin-<%= plugin.name %>
<%
} else {
%>
## pre installed imagemin plugins
<%
  _.forEach(plugins, function(plugin) {
%>
imagemin-<%= plugin.name %>: https://www.npmjs.com/package/imagemin-<%= plugin.name %>
<%
  })
}
%>

## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin