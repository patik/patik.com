// http://heretic-monkey.com/?p=690

/*
// Function.prototype.bind polyfill for IE8
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/function/bind#Compatibility
if (!Function.prototype.bind) {
  Function.prototype.bind = function( obj ) {
    if (typeof this === "function") {
			var slice = [].slice,
				args = slice.call(arguments, 1),
				self = this,
				nop = function () {},
				bound = function () {
					return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
				};
	 
			bound.prototype = this.prototype;
			return bound;
		}
  };
}
*/

// Tell IE9 to use its built-in console
// Note that you cannot use this with IE8 even if you polyfill Function.prototype.bind
if (Function.prototype.bind && console && typeof console.log === "object") {
	//["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
	["assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn"]
		.forEach(function (method) {
			console[method] = this.call(console[method], console);
		}, Function.prototype.bind);
}
// IE8
else if (!Function.prototype.bind && typeof console !== "undefined" && typeof console.log === "object") {
	console.log = function() { Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments)); };
}
// Browsers that have console.log()
else if (typeof console.log === "function") {
	alert('already has console.log');
	console.log = function() {
		// Opera 11
		if (window.opera) {
			var i = 0;
			while (i < arguments.length) {
				window.console.log.call(console, "Item " + (i+1) + " [" + typeof arguments[i] + "]: " + arguments[i]);
				i++;
			}
		}
		// All other modern browsers
		else if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
			// If sole argument is a string, make sure it doesn't get ellipsified
			window.console.log.apply( window.console, (Array.prototype.slice.call(arguments)).toString() );
		}
		else {
			//Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
		  console.log.call( console, Array.prototype.slice.call(arguments) );
		}
	};
}

// Set up console object if it doesn't exist
//if (!console) { console = function() { return this; }; }

// No console at all, so plug in Firebug Lite
if (typeof console === "undefined" || (typeof console === "object" && typeof console.log !== "function")) {
	function watchForFirebug() {
		if (!document.getElementById('firebug-lite')) {
			setTimeout(watchForFirebug, 200);
		}
		else {
			// Write buffered items to the console
			console.log( Array.prototype.slice.call(consoleLogBuffer) );
			// Remove these global helper items
			consoleLogBuffer = null;
			setTimeout(function() { watchForFirebug = null; }, 200);
		}
	}
	console = {
		log: function() {
			// Inject Firebug lite
			if (!document.getElementById("firebug-lite")) {
				// Include the script
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.id = "firebug-lite";
				// Preferably run the script locally instead, especially while developing
				script.src = "//getfirebug.com/firebug-lite.js";
				// If you want to expand the Firebug console window by default, uncomment this line
				//document.getElementsByTagName("html")[0].setAttribute("debug", "true");
				document.getElementsByTagName("head")[0].appendChild(script);
			}
			// Save arguments for when Firebug is ready
			// At this point, Firebug has not yet loaded. However, the <script> was only added during
			//   the first call to console.log and this could be a second (or third, etc) call.
			//   So we need to save the current arguments as well as possibly previous arguments
			consoleLogBuffer = (consoleLogBuffer || []).concat( [].slice.call(arguments) );
			watchForFirebug();
		}
	};
}
/*
// Make Opera 11's output easier to read
else if (window.opera && typeof console.log === "function") {
	console.log = function() {
		var i = 0;
		while (i < arguments.length) {
			console.log.apply(console, "Item " + (i+1) + " [" + typeof arguments[i] + "]: " + arguments[i]);
			i++;
		}
	};
}
*/
/*
// make it safe to use console.log always
(function(b) {
	function c() {};
	for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), a; a = d.pop(); ) {
    b[a] = b[a] || c;
	}
})(
	 (function() {
	  	try {
		 	  console.log();
			  return window.console;
		  }
		  catch(err) {
			  return window.console = {};
		  }
		 })());
*/
