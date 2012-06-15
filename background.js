chrome.experimental.app.onLaunched.addListener(function() { 
  
  function onWindowLoaded(win) {
  	console.log(win)
  }

  var win = chrome.appWindow.create('chrome/main.html', { width: 900, height: 700 }, onWindowLoaded);

});

