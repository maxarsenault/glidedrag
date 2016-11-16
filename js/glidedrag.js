// Help from:
//  https://api.jquery.com/animate/
//  https://matthewlein.com/ceaser/
//  http://www.w3schools.com/jsref/met_win_setinterval.asp
//  http://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript
//  https://learn.jquery.com/plugins/basic-plugin-creation/
//  https://github.com/rdallasgray/bez

/*
Custom easing
-webkit-transition: all 100ms cubic-bezier(0.140, 0.715, 0.300, 0.905); 
   -moz-transition: all 100ms cubic-bezier(0.140, 0.715, 0.300, 0.905); 
     -o-transition: all 100ms cubic-bezier(0.140, 0.715, 0.300, 0.905); 
        transition: all 100ms cubic-bezier(0.140, 0.715, 0.300, 0.905);
*/

(function ( $ ) {
  var TheDraggable = null;
  var XDiff, YDiff ;
  var TheLeft, TheTop ;
 
  $(document).mouseup(function (e) {
    clearInterval(momentumIntervalX) ;
    clearInterval(momentumIntervalY) ;
    momentum = false ;
	
    if (TheDraggable == null ) {
      return ;
    }
    
    $(TheDraggable).animate({
        "top": TheTop - YDiff + (momentumY2 - momentumY1)*6,
        'left': TheLeft - XDiff + (momentumX2 - momentumX1)*6
    }, 750, $.bez([0.140, 0.715, 0.300, 0.905]));
    
    console.log("Xchange = " + (momentumX2 - momentumX1)*3) ;
    console.log("Ychange = " + (momentumY2 - momentumY1)*3) ;
    TheDraggable = null;
    $('html').removeClass('cursormove');
  });
  $(document).mousemove(function (e) {

    if (TheDraggable) {
      TheLeft = e.pageX;
      TheTop = e.pageY;
      TheDraggable.css({
        'top': TheTop - YDiff,
        'left': TheLeft - XDiff
      });
    }
  });
 
  var momentum = false ;
  var momentumIntervalX = null ;
  var momentumIntervalY = null ;
  var momentumX1 = null ;
  var momentumX2 = null ;
  var momentumY1 = null ;
  var momentumY2 = null ;
  var momentumIntervalTime = 50 ;
 
  $.fn.glideDrag = function() {
 
    /*
    // If options need to become more complicated
        var settings = $.extend({
            color: "#556b2f",
            backgroundColor: "white"
        }, options );
    */
 
    this.mousedown(function (e) {
        
      if ( momentum == false ) {
        momentumIntervalX = setInterval(function() {
		
          momentumX1 = momentumX2 ;
          momentumX2 = TheLeft ;
          // console.log( "momentumX2: "+momentumX2) ;
		  
        }, momentumIntervalTime) ;
        momentumIntervalY = setInterval(function() {
		
          momentumY1 = momentumY2 ;
          momentumY2 = TheTop ;
          // console.log( "momentumY2: "+momentumY2) ;
		  
        }, momentumIntervalTime) ;
        momentum = true ;
      }
	  
      TheDraggable = $(this);
      $(TheDraggable).stop(true,false) ;

      TheLeft = momentumX1 = momentumX2 = e.pageX ;
      TheTop = momentumY1 = momentumY2 = e.pageY ;
      XDiff = e.pageX - $(this).offset().left ;
      YDiff = e.pageY - $(this).offset().top ;
      $('html').addClass('cursormove');
      return false;
        
    });
        return this ;
 
  };
}( jQuery ));