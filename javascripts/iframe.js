(function() {

  (function() {
  
    var iframe, url;
    iframe = document.createElement('iframe');
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.frameBorder = "0";
    url = chrome.extension.getURL("");
    
    iframe.src = "index.html"

    return document.body.appendChild(iframe);
  
  })();

}).call(this);
