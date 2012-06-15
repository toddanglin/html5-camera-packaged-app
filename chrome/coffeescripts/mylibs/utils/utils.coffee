define([

  'mylibs/utils/BlobBuilder.min'

], () ->

	canvas = {}
	ctx = {}

	pub = 

		init: ->

			# initialize the drawing canvas
            canvas = document.createElement("canvas")
            
            canvas.width = 460
            canvas.height = 340

            ctx = canvas.getContext("2d")

            Image.prototype.toDataURL = ->

            	# draw the image to a canvas
            	ctx.drawImage this, 0, 0, this.width, this.height

            	# get the data url off the canvas
            	canvas.toDataURL()

            # modify the image prototype to turn convert it to a blob
            Image.prototype.toBlob = ->

            	Image.prototype.toDataURL()

            	# convert the data url to a blob
            	if dataURI.split(',')[0].indexOf('base64') >= 0
                	byteString = atob(dataURI.split(',')[1])
	            else
	                byteString = unescape(dataURI.split(',')[1])
	            
	            mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	            
	            ab = new ArrayBuffer(byteString.length, 'binary')
	            
	            ia = new Uint8Array(ab)
	            
	            for bytes in byteString
	                ia[_i] = byteString.charCodeAt(_i)
	            
	            blobBuiler = new BlobBuilder()
	             
	            blobBuiler.append(ab);
	            
	            # return the blob
	            blobBuiler.getBlob mimeString
		
		getAnimationFrame: -> 
        
	        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
	        window.msRequestAnimationFrame || (callback, element) ->
	          return window.setTimeout(callback, 1000 / 60)
)