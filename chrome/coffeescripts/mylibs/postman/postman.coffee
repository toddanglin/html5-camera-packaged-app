define([
  
  'mylibs/file/file'

], (file) ->
	
	recipient = {}

	pub =

		init: (iframe) ->

			recipient = iframe

			window.onmessage = (event) ->

				# receive the command to save a file
				if event.data.path == "/file/save"

						file.save event.data.message.name, event.data.message.image

			# subscribe to the send event
			$.subscribe "/postman/deliver", (message, address) ->
			
				message.message.address = address
				recipient.contentWindow.webkitPostMessage message, "*"
)