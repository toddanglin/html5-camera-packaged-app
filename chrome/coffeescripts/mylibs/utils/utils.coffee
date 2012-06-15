define([
], ($, kendo) ->
	
	pub = 
		init: ->
		
		getAnimationFrame: -> 
        
	        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
	        window.msRequestAnimationFrame || (callback, element) ->
	          return window.setTimeout(callback, 1000 / 60)
)