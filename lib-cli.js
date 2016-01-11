(function(window, $, io) {
  'use strict';

  var smarttv = {};
  window.smarttv = smarttv;

  // Socket
  var socket = io.connect('/');
  smarttv.send = function(msg) {
    socket.emit('message', msg);
  };
  smarttv.on = function(c, fn) {
    socket.on(c, fn);
  };

  // Apps
  $.get('/api/apps', function(apps) {
    smarttv.apps = apps;
  });
  smarttv.showApp = function(app) {
    window.location.href = '/' + app;
  };
  smarttv.pressKey = function(key) {
    sendEvent('keyDown', key);
    sendEvent('keyUp', key);

    function sendEvent(type, key) {
      $.ajax('/api/inputs', {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          type: type,
          keyCode: key
        })
      });
    }
  };

  // Hidden keyboard
  $(document).on('pageinit', function() {
    $('body').append(
      $('<input type=text id="st-hidden-input">')
        .width(window.innerWidth)
        .css('position', 'absolute')
        .css('top', '-100%')
    );
  });
  smarttv.showKeyboard = function() {
    $('#st-hidden-input').focus();
  };

})(window, $, io);