(function() {

  define([], function($, kendo) {
    var pub;
    return pub = {
      init: function() {},
      getAnimationFrame: function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
          return window.setTimeout(callback, 1000 / 60);
        };
      }
    };
  });

}).call(this);