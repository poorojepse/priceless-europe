$(function () {
   smoothScroll(800);
   readMore();
   informationHighlight();
   slide();
   imgLightbox();
})

function imgLightbox() {
   $('html').on('click', 'img', function() {
      
      var $this = $(this),
          curImg = $this.attr('src'),
          sibImages = ($this.parent().children('img').map(function() {             
             return ("<div class='photo'><img src='"+$(this).attr('src')+"'></div>");
          }).get()),   
          accmName = $this.parent().attr('data-title'),
          
          parPost = $this.parent().children().index($this),
          
          imgGal = "<div id='photo-gallery-container'><div class='gallery-container'><span class='close-gallery'></span><div class='gallery-flexrow'><div class='active-photo'><img src='"+curImg+"'><div class='active-text'><h4 class='name'>"+accmName+"</h4></div></div><div class='sidebar-photo'>"+finSibImg()+"</div></div></div></div>",
      
          imgLig = "<div id='photo-gallery-container'><div class='gallery-container'><span class='close-gallery'></span><div class='gallery-flexrow'><div class='active-photo'><img src='"+curImg+"'><div class='active-text'><h3 class='name'>Single</h3></div></div></div></div></div>";
          
         function finSibImg() {
            var q = "";

            for (var t in sibImages ) {
               if ( t == parPost ) {
                  q += sibImages[t].replace('photo', 'photo current-photo');
               } else {
                  q += sibImages[t];
               }
            } 
            return q;           
         };      
      
         if ( $('#photo-gallery-container').length > 0 ) {           
            $('.active-photo img').attr('src', curImg);     
            $this.parent().siblings().removeClass('current-photo');
            $this.parent().addClass('current-photo');         
         } else if ( $this.hasClass('acm-photo') ) { 
            $('body').append(imgGal);
         } else if ( $this.hasClass('imgLig') ) {
            $('body').append(imgLig);
         } else {
            return;
         }
   });
   
   $('body').on('click', '.close-gallery', function(event) {
      $('#photo-gallery-container').remove();
   });
}

function smoothScroll (duration) {
      $('a[href^="#"]').on('click', function(event) {

      var $this = $(this);
          target = $( $(this).attr('href') );
          flexClass = $(this).parent().attr('class').split(' ')[1];
         
         if ($(window).width() > 560 ) {            
            event.preventDefault();
            $('html, body').animate({
               scrollTop: target.offset().top
            }, duration);
            
            $('.information-flexrow').scrollLeft(0);
            $('.information-flexrow').children().removeClass('active-info');
            $('.information-flexrow').find("#"+flexClass+"").addClass('active-info'); 
            
         } else {            
            event.preventDefault();
            $('html, body').animate({
               scrollTop: $("#"+flexClass+"").offset().top
            }, duration);
            
            $('.information-flexrow').find(".information-content").removeClass('show-info');
            $('.information-flexrow').find("#"+flexClass+" .information-content").addClass('show-info', 400);
         }
   });
}

function readMore(){
   $('.read-more').click( function(event) {
      event.preventDefault();
      var $this = $(this);
      
      $this.toggleClass('read-less', 400).siblings('.blurb').toggleClass('full-blurb', 400);
   })
}


function informationHighlight() {
   $(".information-name").click(function(event) {
      event.preventDefault();
      var $this = $(this);
      if ($(window).width() > 560) {
         $this.parent().parent().effect('highlight', {color: '#dddddd'});         
      } else {
         $this.siblings().toggleClass('show-info', 400);
         $this.parent().parent().effect('highlight', {color: '#dddddd'});
      }
   })
}

function slide() {
   $('.thumb-item').click( function(event) {
      event.preventDefault();
      var $this = $(this),
          position = $this.parent().children().index($this);
      
      $('.slide-support-flex').removeClass('active-slide').eq(position).addClass('active-slide');
      $('.thumb-item').removeClass('active-thumb').eq(position).addClass('active-thumb');
      $('.bg-item').removeClass('active-bg').eq(position).addClass('active-bg');
   });
   
   $('.nav-prev, .nav-next').click( function(event) {
      event.preventDefault();
      
      var $this = $(this),
          curActiveSlide = $('.slide-thumb-container').find('.active-thumb'),
          position = $('.slide-thumb-container').children().index(curActiveSlide),
          slideNum = $('.thumb-item').length;
         
         console.log(curActiveSlide);
         console.log(position);
         console.log(slideNum);
      
      if ($this.hasClass('nav-next')) {
         if (position < slideNum - 1) {
            $('.active-slide').removeClass('active-slide').next().addClass('active-slide');
            $('.active-thumb').removeClass('active-thumb').next().addClass('active-thumb');
         } else {
            $('.slide-support-flex').removeClass('active-slide').first().addClass('active-slide');
            $('.thumb-item').removeClass('active-thumb').first().addClass('active-thumb');
         }
      } else {
         if (position === 0) {
            $('.slide-support-flex').removeClass('active-slide').last().addClass('active-slide');
            $('.thumb-item').removeClass('active-thumb').last().addClass('active-thumb');
         } else {
            $('.active-slide').removeClass('active-slide').prev().addClass('active-slide');
            $('.active-thumb').removeClass('active-thumb').prev().addClass('active-thumb');
         }
      }
   });
}
