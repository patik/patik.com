<?php

# http://code.google.com/apis/maps/documentation/geocoding/index.html#JSON

function geocode($loc = '')
{
  if (empty($loc)) { return NULL; }
  $coords = array();
  $u = "http://maps.googleapis.com/maps/api/geocode/json?address=" . urlencode(str_replace('/\s/','+',$loc)) . "&sensor=true";
	
	# Call the Google API
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $u);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json = curl_exec($ch);
	curl_close($ch);
	
  # Extract the shortened URL (see example at the end of this file)
  $response = json_decode($json);
	
	if ($response->status === "OK") {
		foreach ($response->results as $r) {
			# return "" . strval($r->geometry->location->lat) . ", " . strval($r->geometry->location->lng) . ", " . $r->formatted_address;
			if (!empty($r->geometry->location->lat) || intval($r->geometry->location->lat) === 0) {
				$coords['lat'] = floatval($r->geometry->location->lat);
			}
			else {
				@mail('cpatik@gmail.com', 'geocode json error 2', $json);
			}
			if (!empty($r->geometry->location->lng) || intval($r->geometry->location->lng) === 0) {
				$coords['long'] = floatval($r->geometry->location->lng);
			}
			if (!empty($r->formatted_address)) {
				$coords['formatted_address'] = strval($r->formatted_address);
			}
			# Just use the first one
			break;
		}
	}
  else {
    @mail('cpatik@gmail.com', 'geocode json error 1', $json);
  }
  
	#return $response;
  return $coords;
}

# Get input
$loc = trim($_GET['loc']);
# echo geocode($loc);
# exit();

# Defaults
header("Content-Type: text/javascript");
$ajax_response = '{"okay": false, "lat":"0.0, "long":0.0, "location":"' . addslashes($loc) . '", "message":"Geocode failed"}';

# Attempt the geocode
if (!empty($loc)) {
  $coords = geocode($loc);
	# Write new response if it worked
	if (!empty($coords)) {
		if (!empty($coords['lat']) && !empty($coords['long'])) {
			$ajax_response = '{"okay": true, "lat":"' . $coords["lat"] . '", "long":"' . $coords["long"] . '", "formatted_address":"' . addslashes($coords["formatted_address"]) . '", "location":"' . addslashes($loc) . '", "message":"Successfully geocoded"}';
		}
	}
}

# Output result
echo $ajax_response;
exit();

?>
