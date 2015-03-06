'use strict';

var Emitter = require('emitter-component');
var debounce = require('debounce');

var frequency = 1000 / 60;

var scrollUtil = module.exports = {
    doScroll: function() {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x = window.scrollX || window.pageXOffset;
        this.y = window.scrollY || window.pageYOffset;

        this.direction = this.y - this.oy;
        this.emit('scroll');
    },
    addListener: function(listener) {
        this.on('scroll', listener);
    },
    removeListener: function(listener) {
        if (listener) {
            this.off('scroll', listener);
        }
    },
    removeAllListeners: function() {
        this.off('scroll');
    }
};

Emitter(scrollUtil);
scrollUtil.debouncedScroll = debounce(scrollUtil.doScroll, frequency);
scrollUtil.doScroll();
window.addEventListener('scroll', scrollUtil.debouncedScroll.bind(scrollUtil));