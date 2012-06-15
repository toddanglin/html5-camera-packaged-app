define([
], () ->
	
	pub = 

		init: ->
	
			$.subscribe "/intents/share", (message) ->

				# bring up the pick window
				intent = new Intent("http://webintents.org/share", "image/*", message.image)
				window.navigator.startActivity(intent, (data) ->)

)