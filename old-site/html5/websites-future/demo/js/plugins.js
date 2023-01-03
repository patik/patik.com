// Enable console.log()
try {
	// Browsers with no console, or when running on network drives or web servers
	if (!/function|object/i.test(typeof console)) {
		window.console = {
			log: function () { return; /* Dummy function so calls to console.log() won't throw errors */ }
		};
	}
	else {
		// IE9
		if (typeof console.log == "object" && Function.prototype.bind && console) {
			["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
				.forEach(function (method) {
					console[method] = this.call(console[method], console);
				}, Function.prototype.bind);
		}
		// IE8
		else if (!Function.prototype.bind && typeof console != 'undefined' && typeof console.log == 'object') {
			Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
		}
	}
} catch (e) { }


// geo-location shim
// https://gist.github.com/366184

// currentely only serves lat/long
// depends on jQuery

;(function(geolocation){

  if (geolocation) return;
  
  var cache;
  
  geolocation = window.navigator.geolocation = {};
  geolocation.getCurrentPosition = function(callback){
    
    if (cache) callback(cache);
    
    $.getScript('//www.google.com/jsapi', function(){
      
      cache = {
        coords : {
          "latitude": google.loader.ClientLocation.latitude,
          "longitude": google.loader.ClientLocation.longitude
        }
      };
      
      callback(cache);
    });
    
  };
  
  geolocation.watchPosition = geolocation.getCurrentPosition;

})(navigator.geolocation);



// usage
navigator.geolocation.watchPosition(function(pos){
  console.log("I'm located at ",pos.coords.latitude,' and ',pos.coords.longitude);
});