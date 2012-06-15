(function() {

  define(['mylibs/utils/utils'], function(utils) {
    var blobBuiler, compare, destroy, errorHandler, fileSystem, myPicturesDir, pub, read, save;
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    fileSystem = {};
    myPicturesDir = {};
    blobBuiler = {};
    compare = function(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    };
    errorHandler = function(e) {
      var msg;
      msg = '';
      switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
          msg = 'QUOTA_EXCEEDED_ERR';
          break;
        case FileError.NOT_FOUND_ERR:
          msg = 'NOT_FOUND_ERR';
          break;
        case FileError.SECURITY_ERR:
          msg = 'SECURITY_ERR';
          break;
        case FileError.INVALID_MODIFICATION_ERR:
          msg = 'INVALID_MODIFICATION_ERR';
          break;
        case FileError.INVALID_STATE_ERR:
          msg = 'INVALID_STATE_ERR';
          break;
        default:
          msg = 'Unknown Error';
      }
      console.log('Error: ' + msg);
      return $.publish("/msg/error", ["Access to the file system could not be obtained."]);
    };
    save = function(name, blob) {
      return fileSystem.root.getFile(name, {
        create: true
      }, function(fileEntry) {
        return fileEntry.createWriter(function(fileWriter) {
          fileWriter.onwriteend = function(e) {
            return console.info("save completed");
          };
          fileWriter.onerror = function(e) {
            return console.error("Write failed: " + e.toString());
          };
          return fileWriter.write(blob);
        });
      }, errorHandler);
    };
    destroy = function(name) {
      return fileSystem.root.getFile(name, {
        create: false
      }, function(fileEntry) {
        return fileEntry.remove(function() {
          return $.publish("/file/deleted/" + name);
        }, errorHandler);
      }, errorHandler);
    };
    read = function() {
      var success;
      window.webkitStorageInfo.requestQuota(PERSISTENT, 5000 * 1024, function(grantedBytes) {
        return window.requestFileSystem(PERSISTENT, grantedBytes, success, errorHandler);
      });
      return success = function(fs) {
        console.log("Got File Access!");
        fs.root.getDirectory("MyPictures", {
          create: true
        }, function(dirEntry) {
          var animation, dirReader, entries;
          myPicturesDir = dirEntry;
          entries = [];
          dirReader = fs.root.createReader();
          animation = {
            effects: "zoomIn fadeIn",
            show: true,
            duration: 1000
          };
          read = function() {
            return dirReader.readEntries(function(results) {
              var entry, _i, _j, _len, _len2, _results;
              if (!results.length) {
                entries.sort(compare);
                _results = [];
                for (_i = 0, _len = entries.length; _i < _len; _i++) {
                  entry = entries[_i];
                  _results.push((function() {
                    var img;
                    img = new Image();
                    img.src = entry.toURL();
                    return img.onload = function() {
                      var dataURL;
                      dataURL = img.toDataURL();
                      return $.publish("/postman/deliver", [
                        {
                          message: {
                            name: entry.name,
                            image: dataURL
                          }
                        }, "/pictures/create", []
                      ]);
                    };
                  })());
                }
                return _results;
              } else {
                for (_j = 0, _len2 = results.length; _j < _len2; _j++) {
                  entry = results[_j];
                  if (entry.isFile) entries.push(entry);
                }
                return read();
              }
            });
          };
          return read();
        }, errorHandler);
        return fileSystem = fs;
      };
    };
    return pub = {
      init: function(kb) {
        $.subscribe("/file/save", function(message) {
          return save(message.name, message.image);
        });
        $.subscribe("/file/delete", function(message) {
          return destroy(message.name);
        });
        return $.subscribe("/file/read", function(message) {
          return read();
        });
      }
    };
  });

}).call(this);
