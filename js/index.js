// Function for Home Page Responsiveness

$(function () {
	'use strict';
	window_height = window.innerHeight,
		header_height = $('.default-header').height(),
		fitscreen = window_height - header_height;
	$('.fullscreen').css('height', window_height);
	$('.fitscreen').css('height', fitscreen);

});


