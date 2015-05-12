'use strict';

var Emitter = require('component-emitter');
var debounce = require('debounce');


var scrollUtil = module.exports;
scrollUtil.frequency = 1000 / 60;

// Make scroll util an event emitter
Emitter(scrollUtil);

scrollUtil.onGlobalScroll = function() {
  this.oldX = this.x;
  this.oldY = this.y;
  this.x = window.scrollX || window.pageXOffset;
  this.y = window.scrollY || window.pageYOffset;

  this.direction = this.y - this.oy;

  this.applyScroll();
  if (this.frequency > 0) {
    this.debouncedScroll();
  } else {
    this.applyScrollDebounce();
  }
};

scrollUtil.applyScrollDebounce = function() {
  this.emit('scrollDebounce');
};

scrollUtil.applyScroll = function() {
  this.emit('scroll');
};

scrollUtil.addListener = function(listener, noDebounce) {
  this.on(noDebounce ? 'scroll' : 'scrollDebounce', listener);
};

scrollUtil.removeListener = function(listener) {
  if (listener) {
    this.off('scroll', listener);
    this.off('scrollDebounce', listener);
  }
};

scrollUtil.debouncedScroll = debounce(scrollUtil.applyScrollDebounce.bind(scrollUtil), scrollUtil.frequency);

// first call to init values
scrollUtil.onGlobalScroll();

window.addEventListener('scroll', scrollUtil.onGlobalScroll.bind(scrollUtil));