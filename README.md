<a href="http://pixelscommander.com/polygon/backbone-elements/demo/#.U0LMA62Sy7o">
    <img alt="Reactive Elements" src="http://pixelscommander.com/polygon/backbone-elements/assets/backbone-elements-logo-small.png"/>
</a>

BackboneJS views as native HTML elements
===========================================

Tiny Google [Polymer](http://polymer-project.org) or Mozilla [X-Tags](http://www.x-tags.org/) add-on which allows to use [BackboneJS](https://github.com/jashkenas/backbone/) views as [custom HTML elements](http://w3c.github.io/webcomponents/spec/custom/). Also works with a native Custom Elements implementation if present.

[Demo](http://pixelscommander.com/polygon/backbone-elements/demo/)

Example
-------

**Using component in HTML**

```html
<body>
	<my-backbone-component label="{window.myLabel}"></my-backbone-component>
</body>
```

**Backbone view definition**
```js
//TODO backbone view example here

document.registerBackbone('my-backbone-component', BackboneView);
```

**Find complete examples in corresponding folder.**

Nesting
-------

Original content of a custom element is injected to component as ```attributes._content```.

```html
<my-backbone-component>Hello world</my-backbone-component>
```

In this case $scope._content is equal to "Hello world".


Dependencies
------------

- [BackboneJS](https://github.com/jashkenas/backbone/)
- [X-Tag core](https://github.com/x-tag/core) or [Polymer custom elements](https://github.com/Polymer/CustomElements) or native browser support for custom elements.

License
-------

MIT: http://mit-license.org/

Copyright 2014 Stepan Suvorov aka [stevermeister](http://github.com/stevermeister), Denis Radin aka [PixelsCommander](http://pixelscommander.com)
