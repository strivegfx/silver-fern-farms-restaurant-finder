<?php

	$menuInfo = $_POST["menuInfo"]; // pull the color value sent through from jquery
	$loc = $menuInfo[0];
	$cui = $menuInfo[1];
	$json = file_get_contents('../js/restaurant-info.json'); // fetch the json recipe document
	$jsonDec = json_decode($json); // decode json into a php array set
	$len = count($jsonDec); // find the length of the json data
	$cmpJson = ""; // compiled json selection shell

	//echo count($jsonDec->recipes);
	//echo "len = ".$len;
	//echo json_encode($jsonDec);
	//echo $jsonDec[3]->Address;

	for($i = 0; $i < $len; $i++){

		if($jsonDec[$i]->Address == $loc && $jsonDec[$i]->Description == $cui){

			//echo "match";

			if($cmpJson != ""){

				$cmpJson .= ",";

			}else{

				$cmpJson .= "[";

			}

			$cmpJson .= json_encode($jsonDec[$i]);

		}

	}

	$cmpJson .= "]";

	//echo json_encode("location = ".$loc." || cuisine = ".$cui);

	echo $cmpJson;