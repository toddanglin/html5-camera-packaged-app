(function() {

  define([], function(file) {
    var pub, recipient;
    recipient = {};
    return pub = {
      init: function(iframe) {
        recipient = iframe;
        window.onmessage = function(event) {
          return $.publish(event.data.address, [event.data.message]);
        };
        return $.subscribe("/postman/deliver", function(message, address, block) {
          message.address = address;
          return recipient.contentWindow.webkitPostMessage(message, "*", block);
        });
      }
    };
  });

}).call(this);
