(function() {

  define([], function() {
    var pub, recipient;
    recipient = {};
    return pub = {
      init: function(iframe) {
        recipient = iframe;
        window.onmessage = function(event) {
          if (event.data.path === "/file/save") {
            return file.save(event.data.message.name, event.data.message.image);
          }
        };
        return $.subscribe("/postman/deliver", function(message, address) {
          message.message.address = address;
          return recipient.contentWindow.webkitPostMessage(message, "*");
        });
      }
    };
  });

}).call(this);
