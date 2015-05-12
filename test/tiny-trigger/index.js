module.exports = function (element, evt) {
  dispatch(element, evt);
};

function dispatch (element, event) {
  var evt = document.createEvent('MouseEvents');
  evt.initEvent(event, true, false);
  element.dispatchEvent(evt);
};