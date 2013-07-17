/*global L: true*/
/*global TweenMax: true*/
/*jshint devel:true*/


$(document).ready(function(){

	var map = L.map('map').setView([-36.8500, 174.7833], 13);

	L.tileLayer('http://{s}.tile.cloudmade.com/1142b9cbe62a48c6b6e8a86ef4122ab7/997/256/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
	}).addTo(map);

	// ------------------------------------------------------

	//var marker = L.marker([-36.873579, 174.761311]).addTo(map);

	//marker.bindPopup("<b>Hello world!</b><br>I am a popup.");//.openOn(map);


	var testIcon = L.icon({
		iconUrl: 'img/pin.png',
		shadowUrl: 'img/shadow.png',

		iconSize:     [74, 120], // size of the icon
		shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		shadowAnchor: [0, 0],  // the same for the shadow
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	L.marker([-36.873579, 174.761311], {icon: testIcon}).addTo(map);

	$('.leaflet-marker-icon').on('mouseenter', function(){

		var $this = $(this);

		TweenMax.to($this, 0.25, {
			'scale' : '2',
			'transformOrigin' : 'center bottom'
		});

		TweenMax.to($this, 1, {'top' : '-30px', repeat:-1, yoyo:true});
	});

	$('.leaflet-marker-icon').on('mouseleave', function(){

		var $this = $(this);

		TweenMax.to($this, 0.25, {
			'scale' : '1',
			'transformOrigin' : 'center bottom',
			'top' : '0'
		});

		TweenMax.set($this, {
			'top' : 'auto',
			'transformOrigin' : '50% 50% 0',
			'scale' : 'auto'
		});

		//$this.attr({'style' : ''});

	});

	$('.leaflet-marker-icon').on('click', function(e){

		e.preventDefault();

	});

});










