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

			$m.s.map = $('#map');

			// --- PINS ---
			$m.s.pin = {}; // setting up the pin object to hold the following settings...
			$m.s.pin.orgHgt = 473; // pin original height
			$m.s.pin.orgWth = 292; // pin original width
			$m.s.pin.smlRatio = 0.20;
			$m.s.pin.lrgRatio = 0.35;
			$m.s.pin.smlHgt = $m.s.pin.orgHgt * $m.s.pin.smlRatio;
			$m.s.pin.smlWth = $m.s.pin.orgWth * $m.s.pin.smlRatio;
			$m.s.pin.lrgHgt = $m.s.pin.orgHgt * $m.s.pin.lrgRatio;
			$m.s.pin.lrgWth = $m.s.pin.orgWth * $m.s.pin.lrgRatio;

			// --- MENU ---
			//$m.s.sel = {};
			//$m.s.sel.loc = 'auckland';
			//$m.s.sel.cui = [];
			//$m.s.menu = $('.menu');

			$m.s.phpData = ['blank', 'blank']; // an array to hold the selections -> $m.s.phpData[0] = cuisine -> $m.s.phpData[1] = region
			$m.s.uQ = $('.user-query'); // user query dom reference
			$m.s.swpTxt = $m.s.uQ.find('.swap-txt'); // menu text that is being swapped out
			$m.s.pCity = $m.s.uQ.find('.pick-city').find('ul'); // pick-city dom reference
			$m.s.pCuis = $m.s.uQ.find('.pick-cuisine').find('ul'); // pick-cuisine dom reference

			$m.s.whtOut = $('.white-out'); // white out dom reference

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

			$.ajax({
				type: 'POST',
				url: 'php/sort-json.php',
				data: {"menuInfo" : ["Cnr of Victoria & Albert Streets, Auckland","Mai Thai"]},
				dataType: 'json',
				success: function($json) {
					//console.log($json);
					$m.s.json = $json;
					console.log('returned content from php = ' + $m.s.json);

					$m.genIcon(); // generate icons
					$m.listeners(); // set listeners
				},
				error: function() {
					console.log('json error!');
				}
			});

		}, // end of getJson fnc

		genIcon : function(){

			console.log('generating icons!');

			var $json = $m.s.json,
				$jsonLen = $json.length,
				$map = $m.s.map,
				$smlHgt = $m.s.pin.smlHgt,
				$smlWth = $m.s.pin.smlWth,
				$lrgHgt = $m.s.pin.lrgHgt,
				$sffIcon = L.icon({ // create silver fern farms pin object
					iconUrl: 'img/special-pin.png', // main pin image directory
					//iconRetinaUrl: 'my-icon@2x.png',
					iconSize: [$smlWth, $smlHgt], // size of the icon
					iconAnchor: [$smlWth / 2, $smlHgt], // point of the icon which will correspond to marker's location

					popupAnchor: [0, ($lrgHgt + 5) * -1], // point from which the popup should open relative to the iconAnchor

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

					popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor

					shadowUrl: 'img/marker-shadow.png', // pin shadow directory
					//shadowRetinaUrl: 'my-icon-shadow@2x.png',
					shadowSize: [41, 41], // size of the shadow
					shadowAnchor: [12, 41] // the same for the shadow
				}),
				$pinLat = null,
				$pinLng = null,

				// --- POPUP INFORMARION --
				$pinInfo = null, // shell for pin information
				$description = null,
				$type = null,
				$address = null,
				$phone = null,
				$web = null,
				$hours = null;

			console.log('json length = ' + $jsonLen);

			for(var $i = 0; $i < $jsonLen; $i++){

				$pinLat = $json[$i].Latitude;
				$pinLng = $json[$i].Longitude;
				$description = $json[$i].Description;
				$type = $json[$i].Type;
				$address = $json[$i].Address;
				$phone = $json[$i].Phone;
				$web = $json[$i].Web;
				$hours = $json[$i].Hours;

				$pinInfo = $description + '<br>' + $type + '<br>' + $address + '<br>' + $phone + '<br>' + $web + '<br>' + $hours;

				//console.log('json latitude = ' + $pinLat);
				//console.log('json longitude = ' + $pinLng);
				//console.log('');

				if($i % 100 === 0){

					L.marker([$pinLat, $pinLng], {icon: $sffIcon})
						.addTo($map)
						.bindPopup('<h2>Silver Fern Farms.....</h2>' + $pinInfo);

				}else{

					L.marker([$pinLat, $pinLng], {icon: $genIcon})
						.addTo($map)
						.bindPopup($pinInfo);

				} // end of if statement

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

			$('.leaflet-marker-icon').on('click', function(){

				// e.preventDefault();

				$m.uiAct.iconClick($(this));

			});

			// --- MAIN SELECTORS ---

			$m.s.uQ.on('click', '.swap-txt', function(){

				$m.uiAct.selClick($(this));

			});

			$m.s.uQ.on('click', 'li', function(){

				$m.uiAct.selLstClick($(this));

			});

			//$m.s.uQ
			//$m.s.pCity
			//$m.s.pCuis 

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

				if($special !== 'img/special-pin.png' || $this.attr('data-active') === 'false'){

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

			iconClick : function($this){

				console.log('icon click!');

				var $special = $this.attr('src');

				console.log('image src = ' + $special);

				if($special !== 'img/special-pin.png'){

					console.log('NOT SPECIAL PIN!');

					return ''; // break the function

				} // end of is statement

				var $atv = $this.attr('data-active');

				// setting the active state so that when a user mouseleave's a pin that is active it will not shrink down...
				if($atv === 'false'){ // if the pin is being clicked when it is not already active

					$this.attr({'data-active' : 'true'});

				}else{

					$this.attr({'data-active' : 'false'});

				} // end of if statement

			}, // end of iconClick

			// --- MENU ---

			selClick : function($this){

				console.log('selection click!');

				var $city = $this.closest('.selection').hasClass('pick-city'),
					$ulAct = null, // active selection
					$ulDor = null; // dormant selection

				if($city){

					$ulAct = $m.s.pCity;
					$ulDor = $m.s.pCuis;

				}else{

					$ulAct = $m.s.pCuis;
					$ulDor = $m.s.pCity;

				} // end of if statement

				TweenMax.to($m.s.whtOut, 1, {
					'opacity' : '0.8',
					'display' : 'block'
				});

				// --- ANIMATE TO ACTIVE ---

				TweenMax.set($ulAct, {'display' : 'block'});

				TweenMax.to($ulAct, 1, {
					'opacity' : '1',
					'left' : '50%',
					'transform' : 'translateX(-50%)',
					'top' : '60px'
				});

				/// --- SET TO DORMANT ---

				TweenMax.set($ulDor, {
					'display' : 'none',
					'opacity' : '0',
					'left' : '0',
					'transform' : 'translateX(-50%)',
					'top' : '0'
				});

			}, // end of selCLick fnc

			selLstClick : function($this){

				console.log('selection list click!');

				var $liTxt = $this.text(), // what is the list item name
					$ul = $this.closest('ul'),
					$sel = $this.closest('.selection'),
					$swpTxt = $sel.find('.swap-txt'), // find the text to swap out
					$i = 0, // currently targeting cuisine location in selection array (will change further down if need be)
					$phpData = $m.s.phpData;

				console.log('current selection text = ' + $swpTxt.text());
				console.log('list item text = ' + $liTxt);

				$swpTxt.text($liTxt); // change te selection text to match the list item name

				if($sel.hasClass('pick-city')){ // if the selection is in reference to the city then change the array reference to 1

					$i = 1;

				} // end of if statement

				$m.s.phpData[$i] = $liTxt;

				console.log('cusine = ' + $m.s.phpData[0] + ' | region = ' + $m.s.phpData[1]);

				/// --- SET TO DORMANT ---

				TweenMax.set($ul, {
					'display' : 'none',
					'opacity' : '0',
					'left' : '0',
					'transform' : 'translateX(-50%)',
					'top' : '0'
				});

				if($phpData[0] !== 'blank' && $phpData[1] !== 'blank'){

					console.log('POPULATE MAP!');

					//TweenMax.to($m.s.map, 1, {'margin-top' : '100px'});

					TweenMax.to($m.s.whtOut, 1, {
						'opacity' : '0',
						'display' : 'none'
					});

					TweenMax.to($m.s.uQ, 1, {
						'font-size' : '30px',
						'left' : '0',
						'width' : '100%',
						'padding' : '25px'
					});

				} // end of if statement

			} // end of selLstClick fnc

		} // end of ui actions obj

	}; // end of module container ($m) obj

	(function(){

		$m.init(); // start running the module!

	})();


}); // end of document ready








