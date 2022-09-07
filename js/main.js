;(function () {
	
	'use strict';
	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.userAgent.match(/iPad/i));
	};

	var isiPhone = function(){
	    return (
			(navigator.userAgent.match(/iPhone/i)) || 
			(navigator.userAgent.match(/iPod/i))
	    );
	};

	// Parallax
	var parallax = function() {
		if ( isiPad() || isiPhone() ) {
			$(window).stellar();
		} else {
			$(window).stellar();
		}
	};

	// Video BG
	var videoBG = function() {
		if (navigator.userAgent.match(/Android/i)
	    	|| navigator.userAgent.match(/webOS/i)
	    	|| navigator.userAgent.match(/iPhone/i) 
	    	|| navigator.userAgent.match(/iPad/i) 
	    	|| navigator.userAgent.match(/iPod/i)
	    	|| navigator.userAgent.match(/BlackBerry/i)
	    	|| navigator.userAgent.match(/Windows Phone/i)) {
	    	$('#escuela').before('<img id="" class="animate-box" src="images/svg/ua_logo.svg" alt="Universidad AHMSA" style="margin-bottom: 40px;">');
		} else {
	    	$("#escuela").css('margin-top','200px');
			$('#video_bg').append('<source src="videos/phoenix_reveal.mp4" type="video/mp4">');
		
			$('#qbootstrap-invitacion').waypoint( function( direction ) {
				if( direction === 'down') {
					$('#video_bg').trigger('play');
				}
			});
		}
	};

	// animate-box
	var contentWayPoint = function() {

		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this).hasClass('animated') ) {
			
				$(this.element).addClass('fadeInUp animated');
			
			}

		} , { offset: '75%' } );

	};


	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-qbootstrap-nav-toggle', function(event){

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');	
			} else {
				$(this).addClass('active');	
			}

			event.preventDefault();
			
		});

	};


	// Page Nav
	var clickMenu = function() {

		$('a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');
		    $('html, body').animate({
		        scrollTop: $('[data-section="' + section + '"]').offset().top
		    }, 500);

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-qbootstrap-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});

	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};
	var navigationSection = function() {

		var $section = $('div[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		    
		  	}
		}, {
		  	offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#qbootstrap-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top qbootstrap-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top qbootstrap-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top qbootstrap-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};



	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};


	var inlineSVG = function() {
		$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

		});
	};


	// Set the date we're counting down to
		var countDownDate = new Date("Sep 29, 2022 10:30:00").getTime();

		// Update the count down every 1 second
		var x = setInterval(function() {

		// Get todays date and time
		var now = new Date().getTime();

		// Find the distance between now an the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in an element with id="demo"
		document.getElementById("days").innerHTML = days +" <small>DÍAS</small>";
		document.getElementById("hours").innerHTML = hours + " <small>HORAS</small> ";
		document.getElementById("minutes").innerHTML = minutes + " <small>MINUTOS</small> ";
		document.getElementById("seconds").innerHTML = seconds + " <small>SEGUNDOS</small> ";

		// If the count down is finished, write some text 
		if (distance < 0) {
		 clearInterval(x);
		 document.getElementById("demo").innerHTML = "La Ceremonia de Graduación finalizó";
		}
		}, 1000);	
	

	// Document on load.
	$(function(){
		fullHeight();
		videoBG();
		burgerMenu();
		clickMenu();
		parallax();
		navigationSection();
		contentWayPoint();
		inlineSVG();
	});


	// Obtener escuela y matricula.
	$(function(){

		var queryString = window.location.search;
		var urlParams = new URLSearchParams(queryString);
		var especialidadParam = urlParams.get('especialidad');
		var matriculaParam = urlParams.get('matricula')

		switch(especialidadParam) {
			
			case 'laminacion':
			    $('#especialidad').text("LAMINACIÓN");
		    break;
			
			case 'procesos':
			    $('#especialidad').text("PROCESOS PRIMARIOS");
			break;
			
			case 'acero':
			    $('#especialidad').text("ACERO");
			break;
			default:
		}

		$('#matricula').text(matriculaParam);

	});


}());