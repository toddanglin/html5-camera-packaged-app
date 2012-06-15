(function() {

  define([], function() {
    var pub;
    return pub = {
      init: function() {
        return $.subscribe("/intents/share", function(message) {
          var intent;
          intent = new Intent("http://webintents.org/share", "image/*", message.image);
          return window.navigator.startActivity(intent, function(data) {});
        });
      }
    };
  });

}).call(this);
