define([

  'mylibs/utils/utils'

], (utils) ->

  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem

  fileSystem = {}
  myPicturesDir = {}
  blobBuiler = {}

  compare = (a,b) ->
    
    if a.name < b.name
      return -1
  
    if a.name > b.name
      return 1
  
    return 0

  errorHandler = (e) ->

    msg = ''

    switch e.code
      when FileError.QUOTA_EXCEEDED_ERR
        msg = 'QUOTA_EXCEEDED_ERR'
      when FileError.NOT_FOUND_ERR
        msg = 'NOT_FOUND_ERR'
      when FileError.SECURITY_ERR
        msg = 'SECURITY_ERR'
      when FileError.INVALID_MODIFICATION_ERR
        msg = 'INVALID_MODIFICATION_ERR'
      when FileError.INVALID_STATE_ERR
        msg = 'INVALID_STATE_ERR'
      else
        msg = 'Unknown Error'

    console.log('Error: ' + msg);


    $.publish("/msg/error", ["Access to the file system could not be obtained."])    

  save = (name, blob) ->

        fileSystem.root.getFile name,  create: true, (fileEntry) ->

          fileEntry.createWriter (fileWriter) ->

            fileWriter.onwriteend = (e) ->

                console.info "save completed"

            fileWriter.onerror = (e) ->

                console.error "Write failed: " + e.toString()

            fileWriter.write blob
                
        , errorHandler

  destroy = (name) ->

      fileSystem.root.getFile name, create: false, (fileEntry) ->

        fileEntry.remove ->

            $.publish("/file/deleted/#{name}")

        , errorHandler

      , errorHandler


  read = ->

    window.webkitStorageInfo.requestQuota PERSISTENT, 5000 * 1024, (grantedBytes) ->
        
        window.requestFileSystem PERSISTENT, grantedBytes, success, errorHandler

    success = (fs) ->

      console.log("Got File Access!")

      fs.root.getDirectory "MyPictures", create: true, (dirEntry) ->

        myPicturesDir = dirEntry

        entries = []
        dirReader = fs.root.createReader()
        animation = effects: "zoomIn fadeIn", show: true, duration: 1000

        read = ->

          dirReader.readEntries (results) ->

            if not results.length

              entries.sort(compare)

              for entry in entries

                do ->
                  
                  img = new Image()
                  img.src = entry.toURL()
                  
                  img.onload = ->

                    dataURL = img.toDataURL()

                    $.publish "/postman/deliver", [ { message: { name: entry.name, image: dataURL } }, "/pictures/create", [] ]

            else

              for entry in results

                if entry.isFile

                  entries.push entry

              read()

        read()

      , errorHandler

      fileSystem = fs

  pub = 

    init: (kb) ->

      # subscribe to events
      $.subscribe "/file/save", (message) ->
        save message.name, message.image

      $.subscribe "/file/delete", (message) ->
        destroy message.name

      $.subscribe "/file/read", (message) ->
        read()

      

)