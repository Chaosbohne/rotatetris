rotatetris
======

Tetris Smartphones
git push


http://gwenvanhee.github.io/mirror/

// Collab-Modus starten (Oben rechts --> grünes Licht muss leuchten)

// in den Ordner navigieren und Server starten
$ cd workspace/rotatetris
$ node app.js

// Wenn Fehler beim starten, dann schauen ob Server bereits läuft:
$ ps aux | grep node

// Website erreichbar: unter "Menü" -> "Preview" -> "Port 3000"

    header(role='banner')
        #header.container
            .row.header_wrapper
              .col-xs-12.col-sm-12.col-md-12
                div.joytetheading.text-center 
                  div.borderheadline ROTATETRIS
        #start.container
            .row
              .col-xs-12.col-sm-12.col-md-12.text-center
                a.btn.btn-primary(href='/play') PLAY
                
                
                 
        '<div class="col-sm-12 col-md-12 text-center">'+                
          '<a href="/" class="play btn btn-primary btn-lg btn-space">Next</a>'+                
        '</div> '    
        
        
        
        
        extends layout
block content
  #loading.container
    .row
      .col-xs-12.col-sm-12.col-md-12
        .text-center.pagination-centered
          h1
            img.img-responsive(src='/images/rotetris.png', alt='Responsive image')
          h2 Loading...
          
  #start.container.hidden
    #playSmartphone
      .row
        .col-xs-4.col-sm-4.col-md-4      
          button#bLeft.btn-warning.btn.btn-default.btn-lg(type='button')
            span.glyphicon.glyphicon-arrow-left     
        .col-xs-4.col-sm-4.col-md-4
          button#bTop.btn-warning.btn.btn-default.btn-lg(type='button')
            span.glyphicon.glyphicon-arrow-up 
          button#bDown.btn-warning.btn.btn-default.btn-lg(type='button')
            span.glyphicon.glyphicon-arrow-down 
        .col-xs-4.col-sm-4.col-md-4
          button#bRight.btn-warning.btn.btn-default.btn-lg(type='button')
            span.glyphicon.glyphicon-arrow-right 