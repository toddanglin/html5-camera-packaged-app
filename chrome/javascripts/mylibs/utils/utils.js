(function() {

  define(['mylibs/utils/BlobBuilder.min'], function() {
    var canvas, ctx, pub;
    canvas = {};
    ctx = {};
    return pub = {
      init: function() {
        canvas = document.createElement("canvas");
        canvas.width = 460;
        canvas.height = 340;
        ctx = canvas.getContext("2d");
        Image.prototype.toDataURL = function() {
          ctx.drawImage(this, 0, 0, this.width, this.height);
          return canvas.toDataURL();
        };
        return Image.prototype.toBlob = function() {
          var ab, blobBuiler, byteString, bytes, ia, mimeString, _i, _len;
          Image.prototype.toDataURL();
          if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
          } else {
            byteString = unescape(dataURI.split(',')[1]);
          }
          mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
          ab = new ArrayBuffer(byteString.length, 'binary');
          ia = new Uint8Array(ab);
          for (_i = 0, _len = byteString.length; _i < _len; _i++) {
            bytes = byteString[_i];
            ia[_i] = byteString.charCodeAt(_i);
          }
          blobBuiler = new BlobBuilder();
          blobBuiler.append(ab);
          return blobBuiler.getBlob(mimeString);
        };
      },
      getAnimationFrame: function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
          return window.setTimeout(callback, 1000 / 60);
        };
      }
    };
  });

}).call(this);
