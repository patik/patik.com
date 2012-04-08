// Tell IE9 to use its built-in console
if (Function.prototype.bind && console && typeof console.log === "object") {
	alert('a');
	["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
		.forEach(function (method) {
			console[method] = this.call(console[method], console);
		}, Function.prototype.bind);
}

// log() cross-browser console.log wrapper
if (!window.log) {
	window.log = function () {
    log.history = log.history || [];  // store logs to an array for reference
    log.history.concat( [].slice.call(arguments) );
		
		// Makes the console output a bit easier to read in some consoles
		var prettyPrint = function(args) {
			var prettyArgs = [],
			    i = 0;
			while (i < args.length) {
				prettyArgs.push("Item " + (i+1) + " [" + typeof args[i] + "]: ");
				prettyArgs.push(args[i]);
				i++;
			}
			return prettyArgs;
		};
		
		// Modern browsers
		if (typeof console !== "undefined" && typeof console.log === "function") {
			
			// Opera 11
			if (window.opera) {
				arguments = prettyPrint(arguments);
			}
			
			// All other modern browsers
			else if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
				alert('b');
				console.log( (Array.prototype.slice.call(arguments)).toString() );
			}
			else {
				alert('c');
				console.log( Array.prototype.slice.call(arguments) );
			}
			
		}
		
		// IE8
		else if (!Function.prototype.bind && typeof console !== "undefined" && typeof console.log === "object") {
			alert("IE8");
			Function.prototype.call.call( console.log, console, Array.prototype.slice.call( prettyPrint(arguments) ) );
		}
		
		// IE7 and lower, and other old browsers
		else {
			alert('d');
			// Inject Firebug lite
			if (!document.getElementById("firebug-lite")) {
				// Include the script
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.id = "firebug-lite";
				// Preferably run the script locally instead, especially while developing
				script.src = "http://getfirebug.com/firebug-lite.js";
				// If you want to expand the Firebug console window by default, uncomment this line
				//document.getElementsByTagName("html")[0].setAttribute("debug", "true");
				document.getElementsByTagName("head")[0].appendChild(script);
			}
			// Function to wait for Firebug to be downloaded and run
			if (!watchForFirebug) {
				watchForFirebug = function() {
					if (!document.getElementById("firebug-lite")) {
						setTimeout(watchForFirebug, 200);
					}
					else {
						// Write buffered items to the console
						console.log( Array.prototype.slice.call(log.history) );
						// Empty/remove these helper items
						log.history = [];
						setTimeout(function() { watchForFirebug = null; }, 200);
					}
				};
			}
			// Remember that this could be the second or third time log() was called while
			//    Firebug was loading, so this next call can't be inside the previous if statement
			watchForFirebug();
		}
	}
}

// Make console.log call log()
if (!console) {
	// || (typeof console !== "undefined" && typeof console.log !== "function")) {
	console = {
		log: function() {
			alert('helper');
			window.log( Array.prototype.slice.call(arguments) );
		}
	};
}