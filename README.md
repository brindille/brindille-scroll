# brindille-scroll
Scroll utils

## Install

With [npm](http://npmjs.org) do:

```bash
$ npm install brindille-scroll --save
```

## Usage

```js
var scroll = require('brindille-scroll');
// add listener
scroll.addListener(handler);
// remove listener
scroll.removeListener(handler);
scroll.removeAllListeners();
// get properties
var x = scroll.x;
var previousX = scroll.oldX;
var y = scroll.y;
var previousY = scroll.oldY;
var direction = scroll.direction
```

## License

MIT