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

		}, // end of init fnc

		genSet : function(){

			$m.s.test = 'hello world';

			console.log('test = ' + $m.s.test);

			// --- PINS ---
			$m.s.pin = {}; // setting up the pin object
			$m.s.pin.orgHgt = 473; // pin original height
			$m.s.pin.orgWth = 292; // pin original width
			$m.s.pin.smlRatio = 0.20;
			$m.s.pin.lrgRatio = 0.35;
			$m.s.pin.smlHgt = $m.s.pin.orgHgt * $m.s.pin.smlRatio;
			$m.s.pin.smlWth = $m.s.pin.orgWth * $m.s.pin.smlRatio;
			$m.s.pin.lrgHgt = $m.s.pin.orgHgt * $m.s.pin.lrgRatio;
			$m.s.pin.lrgWth = $m.s.pin.orgWth * $m.s.pin.lrgRatio;

			// --- MENU ---
			$m.s.sel = {};
			$m.s.sel.loc = 'auckland';
			$m.s.sel.cui = [];
			$m.s.menu = $('.menu');

		}, // end of genSet fnc

		genMap : function(){ // generate map

			console.log('generating map!');

			var $map = L.map('map').setView([-36.8500, 174.7833], 13);

			L.tileLayer('http://{s}.tile.cloudmade.com/1142b9cbe62a48c6b6e8a86ef4122ab7/997/256/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
				maxZoom: 18
			}).addTo($map);

			$m.s.map = $map; // store map in settings

		}, // end of genMap fnc

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

		}, // end of getJson fnc

		genIcon : function(){

			console.log('generating icons!');

			var $json = $m.s.json,
				$jsonLen = $json.length,
				$map = $m.s.map,
				$smlHgt = $m.s.pin.smlHgt,
				$smlWth = $m.s.pin.smlWth,
				$sffIcon = L.icon({ // create silver fern farms pin object
					iconUrl: 'img/special-pin.png', // main pin image directory
					//iconRetinaUrl: 'my-icon@2x.png',
					iconSize: [$smlWth, $smlHgt], // size of the icon
					iconAnchor: [$smlWth / 2, $smlHgt], // point of the icon which will correspond to marker's location

					popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor

					shadowUrl: 'img/shadow.png', // pin shadow directory
					//shadowRetinaUrl: 'my-icon-shadow@2x.png',
					shadowSize: [$smlWth, $smlWth], // size of the shadow
					shadowAnchor: [$smlWth / 2, $smlWth / 2]  // the same for the shadow

				}),
				$genIcon = L.icon({ // create generic green pin
					iconUrl: 'img/green-pin.png', // main pin image directory
					//iconRetinaUrl: 'my-icon@2x.png',
					iconSize: [25, 41], // size of the icon
					iconAnchor: [12, 41], // point of the icon which will correspond to marker's location

					popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor

					shadowUrl: 'img/marker-shadow.png', // pin shadow directory
					//shadowRetinaUrl: 'my-icon-shadow@2x.png',
					shadowSize: [41, 41], // size of the shadow
					shadowAnchor: [12, 41] // the same for the shadow
				}),
				$pinLat = null,
				$pinLng = null;

			console.log('json length = ' + $jsonLen);

			for(var $i = 0; $i < $jsonLen; $i++){

				$pinLat = $json[$i].Latitude;
				$pinLng = $json[$i].Longitude;

				//console.log('json latitude = ' + $pinLat);
				//console.log('json longitude = ' + $pinLng);
				//console.log('');

				if($i % 100 === 0){

					L.marker([$pinLat, $pinLng], {icon: $sffIcon}).addTo($map);

				}else{

					L.marker([$pinLat, $pinLng], {icon: $genIcon}).addTo($map);

				} // emd of if statement

			} // end of for loop

		}, // end of genIcon fnc

		listeners : function(){

			console.log('generating listeners!');

			// --- PINS ---

			$('.leaflet-marker-icon').on('mouseenter', function(){

				$m.uiAct.iconEnter($(this));

			});

			$('.leaflet-marker-icon').on('mouseleave', function(){

				$m.uiAct.iconLeave($(this));

			});

			$('.leaflet-marker-icon').on('click', function(e){

				// e.preventDefault();

			});

			// --- MENU ---

			$m.s.menu.on('click', 'li', function(){

				$m.uiAct.menuClick($(this));

			});

		}, // end of listeners fnc

		uiAct : { // ui actions...

			// --- PINS ---

			iconEnter : function($this){

				console.log('icon enter!');

				var $special = $this.attr('src');

				console.log('image src = ' + $special);

				if($special !== 'img/special-pin.png'){

					console.log('NOT SPECIAL PIN!');

					return ''; // break the function

				} // end of is statement

				var $lrgHgt = $m.s.pin.lrgHgt,
					$lrgWth = $m.s.pin.lrgWth,
					$smlHgt = $m.s.pin.smlHgt,
					$smlWth = $m.s.pin.smlWth,
					$pinTop = ($lrgHgt - $smlHgt) * -1,
					$pinLft = ($lrgHgt - $smlHgt) / 2 * -1;

				TweenMax.to($this, 0.25, {
					'width' : $lrgWth,
					'height' : $lrgHgt,
					'top' : $pinTop,
					'left' : $pinLft + 15
				});

				//TweenMax.to($this, 1, {'top' : $pinTop - 15, repeat:-1, yoyo:true, delay: 0.25});

			}, // end of iconEnter fnc

			iconLeave : function($this){

				console.log('icon leave!');

				var $special = $this.attr('src');

				console.log('image src = ' + $special);

				if($special !== 'img/special-pin.png'){

					console.log('NOT SPECIAL PIN!');

					return ''; // break the function

				} // end of is statement

				var $smlHgt = $m.s.pin.smlHgt,
					$smlWth = $m.s.pin.smlWth;

				TweenMax.to($this, 0.25, {
					'width' : $smlWth,
					'height' : $smlHgt,
					'top' : '0',
					'left' : '0',
					repeat: 0,
					yoyo: false
				});

			}, // end of iconLeave fnc

			// --- MENU ---

			menuClick : function($this){

				console.log('menu click!');

				var $locSet = $m.s.sel.loc, // pull in the current location from settings
					$cuiSet = $m.s.sel.cui, // pull in the cuisine array from settings
					$thisSel = $this.attr('data-selection'), // this selection name
					$thisAtv = $this.attr('data-active'),
					$cont = $this.closest('div.selection-container'), // find the container
					$contLoc = $cont.hasClass('location'); // is the selection within the location container - if not must be the cuisine container

				console.log('');
				console.log('you clicked the ' + $thisSel + ' button');

				if($contLoc){ // if the clicked button resides within the location container...

					if($thisAtv === 'true'){ // if this button is already active - do nothing as we do not want to load the content a second time via an ajax request to the server...

						return ''; // break the function

					} // end of if statement

					$cont.find('li').attr({'data-active' : 'false'}); // make all selections active state inside the location container only = false
					$this.attr({'data-active' : 'true'}); // make the clicked button's active state = true

					console.log('inside the location container');

					$locSet = $thisSel; // add the selection name to the location setting

					//return ''; // break the function

				}else{ // if the clicked button DOES NOT reside within the location container...

					console.log('inside the cuisine container');

					$cuiSet = [];  // reset the cuisine selection array

					if($thisAtv === 'true'){ // if this button is already active - then change its state to = false

						$this.attr({'data-active' : 'false'});

					}else{ // else change its state to = true

						$this.attr({'data-active' : 'true'});

					} // end of if statement

					$cont.find('li').each(function(){

						//console.log('--> ' + $(this).attr('data-selection'));

						$this = $(this), // re-establish $this to the current button in the loop
						$thisAtv = $this.attr('data-active');

						if($thisAtv === 'true'){ // if the current button in the loop is an active element...

							$thisSel = $this.attr('data-selection');

							$cuiSet.push($thisSel); // push the selection name into the cuisine array

						} // end of if statement

					}); // end of each function

				} // end of if statement

				$m.s.sel.loc = $locSet; // store the current location back into settings
				$m.s.sel.cui = $cuiSet; // store the cuisine array back into settings

				console.log('location name = ' + $locSet);
				console.log('cusine array = ' + $cuiSet);

			} // end of menuCLick fnc

		} // end of ui actions obj

	}; // end of module container ($m) obj

	//marker.bindPopup("<b>Hello world!</b><br>I am a popup.");//.openOn(map);

	(function(){

		$m.init(); // start running the module!

	})();


}); // end of document ready










