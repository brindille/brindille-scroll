'use strict';

var Emitter = require('component-emitter');
var debounce = require('debounce');

var frequency = 1000 / 60;

var scrollUtil = module.exports = {
  onGlobalScroll: function() {
    this.oldX = this.x;
    this.oldY = this.y;
    this.x = window.scrollX || window.pageXOffset;
    this.y = window.scrollY || window.pageYOffset;

    this.direction = this.y - this.oy;

    this.applyScroll();
    this.debouncedScroll();
  },
  applyScrollDebounce: function() {
    this.emit('scrollDebounce');
  },
  applyScroll: function() {
    this.emit('scroll');
  },
  addListener: function(listener, noDebounce) {
    this.on(noDebounce ? 'scroll' : 'scrollDebounce', listener);
  },
  removeListener: function(listener) {
    if (listener) {
      this.off('scroll', listener);
      this.off('scrollDebounce', listener);
    }
  },
  removeAllListeners: function() {
    this.off();
  }
};

Emitter(scrollUtil);
scrollUtil.debouncedScroll = debounce(scrollUtil.applyScrollDebounce.bind(scrollUtil), frequency);
scrollUtil.onGlobalScroll();

window.addEventListener('scroll', scrollUtil.onGlobalScroll.bind(scrollUtil));