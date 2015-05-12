var expect = require('chai').expect;
var trigger = require('./tiny-trigger/');
var scrollUtil = require('../index');
scrollUtil.frequency = 0;

var scrollIsTrigger = false;
var scrollDebouncedIsTrigger = false;

describe('brindille-scroll', function() {

  it('is initialized', function() {
    expect(scrollUtil.oldX).to.equal(undefined);
    expect(scrollUtil.oldY).to.equal(undefined);
    var x = window.scrollX || window.pageXOffset;
    var y = window.scrollY || window.pageYOffset;
    expect(scrollUtil.x).to.equal(x);
    expect(scrollUtil.y).to.equal(y);
    expect(isNaN(scrollUtil.direction)).to.equal(true);
  });

  it('has scroll listener', function() {
    scrollUtil.addListener(callbackScroll, true);
    expect(scrollUtil.hasListeners('scroll')).to.equal(true);
  });

  it('has debounced scroll listener', function() {
    scrollUtil.addListener(callbackScrollDebounced, false);
    expect(scrollUtil.hasListeners('scrollDebounce')).to.equal(true);
  });

  it('triggers scroll events', function() {
    trigger(window, 'scroll');
    expect(scrollIsTrigger).to.equal(true);
  });

  it('triggers scrollDebounce events', function() {
    trigger(window, 'scroll');
    expect(scrollDebouncedIsTrigger).to.equal(true);
  });

  it('removes specific listener', function() {
    scrollUtil.removeListener(callbackScroll);
    scrollUtil.removeListener(callbackScrollDebounced);
    expect(scrollUtil.hasListeners('scroll')).to.equal(false);
    expect(scrollUtil.hasListeners('scrollDebounce')).to.equal(false);
  });

  it('removes all listeners', function() {
    scrollUtil.addListener(callbackScroll, true);
    scrollUtil.addListener(callbackScrollDebounced, false);
    scrollUtil.removeAllListeners();
    expect(scrollUtil.hasListeners('scroll')).to.equal(false);
    expect(scrollUtil.hasListeners('scrollDebounce')).to.equal(false);
  });
});

function callbackScroll() {
  scrollIsTrigger = true;
}

function callbackScrollDebounced() {
  scrollDebouncedIsTrigger = true;
}