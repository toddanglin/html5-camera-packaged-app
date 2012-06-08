(function($) {

	// subscribe to the application ready event to read in images
	// from local storage
	$.subscribe("/chrome/storage/read", function() {

		// read in the items from local storage

	});

	$.subscribe("/chrome/storage/save", function(img) {

		// store the image in local storage
		chrome.storage.local.set({ 'img': img }, function() {
			console.info("stored image successfully");
		})

	});




})(jQuery);