/*global L: true*/
/*global TweenMax: true*/
/*jshint devel:true*/


$(document).ready(function(){

	var $m = {

		//console.log('running module!');

		s : {}, // settings shell

		init : function(){

			$m.genSet(); // generate settings
			$m.genMap(); // generate map
			$m.getJson(); // get json!

		},

		genSet : function(){

			$m.s.test = 'hello world';

			console.log('test = ' + $m.s.test);
			// --- PINS ---
			$m.s.pin = {}; // setting up the pin object
			$m.s.pin.orgHgt = 473; // pin original height
			$m.s.pin.orgWth = 292; // pin original width
			$m.s.pin.smlRatio = 0.25;
			$m.s.pin.lrgRatio = 0.5;
			$m.s.pin.smlHgt = $m.s.pin.orgHgt * $m.s.pin.smlRatio;
			$m.s.pin.smlWth = $m.s.pin.orgWth * $m.s.pin.smlRatio;
			$m.s.pin.lrgHgt = $m.s.pin.orgHgt * $m.s.pin.lrgRatio;
			$m.s.pin.lrgWth = $m.s.pin.orgWth * $m.s.pin.lrgRatio;

		},

		genMap : function(){ // generate map

			console.log('generating map!');

			var $map = L.map('map').setView([-36.8500, 174.7833], 13);

			L.tileLayer('http://{s}.tile.cloudmade.com/1142b9cbe62a48c6b6e8a86ef4122ab7/997/256/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
				maxZoom: 18
			}).addTo($map);

			$m.s.map = $map; // store map in settings

		},

		getJson : function(){ // get json from server...

			$.getJSON('js/auckland.json', function($json){

				$m.s.json = $json;

			})
			.success(function() { /* alert("success"); */ })
			.error(function() { /* alert("error"); */ })
			.complete(function() {

				console.log('got json');

				$m.genIcon(); // generate icons
				$m.listeners(); // set listeners

			});

		}, // end of getJson obj

		genIcon : function(){

			console.log('generating icons!');

			var $json = $m.s.json,
				//$jsonLen = json....
				$map = $m.s.map,
				$smlHgt = $m.s.pin.smlHgt,
				$smlWth = $m.s.pin.smlWth;

			var testIcon = L.icon({
				iconUrl: 'img/pin.png',
				shadowUrl: 'img/shadow.png',

				iconSize:     [$smlWth, $smlHgt], // size of the icon
				shadowSize:   [50, 64], // size of the shadow
				iconAnchor:   [$smlWth / 2, $smlHgt], // point of the icon which will correspond to marker's location
				shadowAnchor: [0, 0],  // the same for the shadow
				popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});

			L.marker([-36.873579, 174.761311], {icon: testIcon}).addTo($map);

		},

		listeners : function(){

			console.log('generating listeners!');

			$('.leaflet-marker-icon').on('mouseenter', function(){

				$m.uiAct.iconEnter($(this));

			});

			$('.leaflet-marker-icon').on('mouseleave', function(){

				$m.uiAct.iconLeave($(this));

			});

			$('.leaflet-marker-icon').on('click', function(e){

				e.preventDefault();

			});


		}, // end of listeners

		uiAct : { // ui actions...

			iconEnter : function($this){

				console.log('icon enter!');

				var $lrgHgt = $m.s.pin.lrgHgt,
					$lrgWth = $m.s.pin.lrgWth,
					$smlHgt = $m.s.pin.smlHgt,
					$smlWth = $m.s.pin.smlWth,
					$pinTop = ($lrgHgt - $smlHgt) * -1;

				TweenMax.to($this, 0.25, {
					'width' : $lrgWth,
					'height' : $lrgHgt,
					'top' : $pinTop,
					'left' : '-38px'
				});

				TweenMax.to($this, 1, {'top' : $pinTop - 30, repeat:-1, yoyo:true, delay: 0.25});

			},

			iconLeave : function($this){

				console.log('icon leave!');

				var $smlHgt = $m.s.pin.smlHgt,
					$smlWth = $m.s.pin.smlWth;

				TweenMax.to($this, 0.25, {
					'width' : $smlWth,
					'height' : $smlHgt,
					'top' : '0',
					'left' : '0'
				});
			}
		} // end of ui actions




	}; // end of module container



	// ------------------------------------------------------

	//var marker = L.marker([-36.873579, 174.761311]).addTo(map);

	//marker.bindPopup("<b>Hello world!</b><br>I am a popup.");//.openOn(map);


	(function(){

		$m.init(); // start running the module!

	})();


}); // end of document ready










