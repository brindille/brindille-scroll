var domready = require('domready');
var scroll = require('../index.js');
var transform = require('dom-transform');

domready(function() {
  document.body.style.height = '5000px';

  var $instructions = document.createElement('h1');
  $instructions.innerHTML = 'Scroll down (please)'
  $instructions.style.margin = '20px';
  document.body.appendChild($instructions);

  var $redblock = createBlock('#FF0000', 'debounce');
  document.body.appendChild($redblock);

  var $blueblock = createBlock('#0000FF', 'no debounce');
  document.body.appendChild($blueblock);

  scroll.addListener(redScrollHandler);
  scroll.addListener(blueScrollHandler, true);

  function redScrollHandler() {
    transform($redblock, {y: document.body.scrollTop});
  }
  function blueScrollHandler() {
    transform($blueblock, {y: document.body.scrollTop});
  }
});

function createBlock(bgColor, text, size) {
  var $block = document.createElement('div');
  $block.style.width = '200px';
  $block.style.height = '200px';
  $block.style.color = 'white';
  $block.style.position = 'relative';
  $block.style.background = bgColor;
  $block.style.margin = '20px';
  $block.style.padding = '20px';
  $block.style.float = 'left';
  $block.innerHTML = text;
  return $block;
}