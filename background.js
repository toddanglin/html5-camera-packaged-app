chrome.experimental.app.onLaunched.addListener(function() { 
  chrome.windows.create({url:'index.html', type: 'shell'});
});

