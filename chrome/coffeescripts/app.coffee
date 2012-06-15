define([
	'mylibs/postman/postman'
	'mylibs/utils/utils'
	'mylibs/file/file'
	
], (postman, utils, file) ->
	
	'use strict'

	iframe = iframe = document.getElementById("iframe")
	canvas = document.getElementById("canvas")	
	ctx = canvas.getContext("2d")

	draw = -> 
		utils.getAnimationFrame()(draw)
		update()

	update = ->

		ctx.drawImage(video, 0, 0, video.width, video.height)
		img = ctx.getImageData(0, 0, canvas.width, canvas.height)
		buffer = img.data.buffer

		$.publish "/postman/deliver", [{ message: { image: img.data.buffer } }, "/camera/update", [ buffer ]]

	hollaback = (stream) ->

		e = window.URL || window.webkitURL
		video = document.getElementById("video")
		video.src = if e then e.createObjectURL(stream) else stream
		video.play()

		draw()

	errback = ->
		console.log("Couldn't Get The Video");

	pub = 
		init: ->

			# initialize utils
			utils.init()

			# cue up the postman!
			postman.init(iframe)

			# get the files
			file.init()

			# subscribe to events
			$.subscribe "/app/ready", ->

				# get the currently saved files
				$.publish "/file/read", []

				# start the camera
				navigator.webkitGetUserMedia { video: true }, hollaback, errback

			
)