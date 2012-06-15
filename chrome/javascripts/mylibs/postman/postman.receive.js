(function() {

  define(['mylibs/file/file'], function(file) {
    "use strict";
    var pub;
    return pub = {
      init: function() {
        return window.onmessage = function(event) {
          if (event.data.path === "/file/save") {
            return file.save(event.data.message.name, event.data.message.image);
          }
        };
      }
    };
  });

}).call(this);
