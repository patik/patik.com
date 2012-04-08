var demo = {
	$list: null,
	$body: null,
	canvas: null,
	$form: null,
	formFields: {},
	paper: null,
	
	init: function() {
		// Containers & elements
		demo.$body = $('body');
		demo.canvas = $('#worldmap').get(0) || null;
		demo.$list = $('#people-list');
		demo.$form = $('#add-person');
		demo.formFields = { $first: $('#add-first-name'), $last: $('#add-last-name'), $location: $('#add-location'), $distance: $('#add-distance'), $tickets: $('#add-tickets')};
		
		if (typeof window.FileReader === 'function' && window.addEventListener) {
			window.addEventListener('dragover', demo.events.handleDragOver, false)
			window.addEventListener('drop', demo.events.handleFileDrop, false);
		}
		else {
			$('.dnd-available').slideUp();
			demo.$body.append('<p>Your browser doesn\'t support reading from files</p>');
		}
		
		// Map
		if (Modernizr.canvas) {
			WorldMap({
				id: demo.canvas.id,
				bgcolor: "#99b3cc",
				fgcolor: "#f2efe9",
				bordercolor: "#808080",
				borderwidth: 0.5,
				padding: 10
			});
			
			// Conference locations
			demo.draw.addCircle({id: 'lon', x: 51.5, y: 0, color: '#00f', title: 'London (12)'});
			demo.draw.addCircle({id: 'nyc', x: 40.72, y: -74, color: '#00f', title: 'New York (8)'});
			demo.draw.addCircle({id: 'pth', x: -31.9, y: 115.8, color: '#00f', title: 'Perth (17)'});
			demo.draw.addCircle({id: 'bej', x:39.9, y: 116.4, color: '#00f', title: 'Beijing (6)'});
		}
		else {
			// Canvas not supported
			$('#map-container canvas').prepend('<img src="img/canvas_placeholder.png" alt="Faded world map">');
		}
		
		var me = demo.people.create(['Craig', 'Patik', '45.0|-70.1', 240, 2, '']);
		demo.people.add(me);
		
		// Setup event listeners
		demo.events.init();
	},
	
	events: {
		init: function() {
			
			// Add person form
			demo.$form
				.bind('submit', function(evt) {
					evt.stopPropagation();
					evt.preventDefault();
					demo.people.addFromForm();
					return false;
				})
			
			// Add person button
			$('#add-button')
				.bind('click', function() { demo.$form.submit(); })
				.bind('keyup keypress', function(evt) {
					if (evt.which === 13) {
						demo.$form.submit();
					}
				});
			
			// Remove person button
			demo.$body.delegate('#people-list .del', 'click', function(evt) {
				var $person = $(this).closest('li');
				demo.people.removeFromMap($person.attr('id'));
				$person.remove();
				evt.stopPropagation();
				evt.preventDefault();
				return false;
			});
		},
		
		handleFileDrop: function(evt) {
			evt.stopPropagation();
	    evt.preventDefault();
			var files = evt.dataTransfer.files; // FileList object
			// files is a FileList of File objects
			for (var i = 0, f; f = files[i]; i++) {
				// Only process text and csv files
				if (!/text|txt|csv|excel/.test(f.type)) { alert('You may only import a text file'); continue; }
				var reader = new FileReader();
				reader.onload = (function(theFile) {
					return function(e) {
						// File contents => e.target.result
						demo.parseFile(e.target.result);
					};
				})(f);
				// Read in the file as text
				reader.readAsText(f);
			}
		},
		
		handleDragOver: function(evt) {
			evt.stopPropagation();
			evt.preventDefault();
		}
	},
	
	draw: {
		circles: {},
		
		addCircle: function(settings) {
			if (!settings) { return false; }
			var coords = demo.draw.coordsToPixels([settings.x, settings.y]),
					radius = settings.radius || 3,
					ctx, outerCircle, outerRadius;
			
			if (settings.distance) {
				// Need to draw the dot and a radius ring
				ctx = demo.canvas.getContext('2d');
				ctx.beginPath();
				ctx.fillStyle = "#00f";
				ctx.arc(coords[0],coords[1],radius,0,Math.PI*2,true);
				ctx.shadowOffsetX = 1;
				ctx.shadowOffsetY = 1;
				ctx.shadowBlur = '6px';
				ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
				ctx.fill();
				// Store for later
				demo.draw.circles[settings.id] = ctx;
				
				// Outer ring
				if (settings.distance >= 100) {
					// Convert distance from miles to pixels
					outerRadius = settings.distance * 0.04;
				}
				else {
					outerRadius = 4;
				}
				
				ctx = demo.canvas.getContext('2d');
				ctx.beginPath();
				ctx.strokeStyle = "#093";
				ctx.arc(coords[0], coords[1], outerRadius, 0, Math.PI*2, true);
				ctx.shadowOffsetX = 1;
				ctx.shadowOffsetY = 1;
				ctx.shadowBlur = '6px';
				ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
				ctx.stroke();
				// Store ring
				demo.draw.circles[settings.id + '_outer'] = ctx;
			}
			else {
				// Draw a plain dot only
				ctx = demo.canvas.getContext('2d');
				ctx.beginPath();
				ctx.fillStyle = "#f00";
				ctx.arc(coords[0],coords[1],radius,0,Math.PI*2,true);
				ctx.shadowOffsetX = 1;
				ctx.shadowOffsetY = 1;
				ctx.shadowBlur = '6px'
				ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
				ctx.fill();
				demo.draw.circles[settings.id] = ctx;
			}
			
			console.log(settings.id + ', converted [' + settings.x + ', ' + settings.y + '] to [' + coords[0] + ', ' + coords[1] + ']');
		},
		
		coordsToPixels: function(coords) {
			var degX = coords[1],
			    degY = coords[0],
					pxX, pxY;
			
			// North
			if (degY >= 0.0) {
				pxY = 262.0 - (2.25 * degY);
			}
			// South
			else {
				pxY = 262.0 + Math.abs(degY)*2.15;
			}
			
			// East
			if (degX >= 0.0) {
				pxX = 352.0 + parseFloat(degX*1.97);
			}
			// West
			else {
				pxX = parseFloat(180.0+degX)*1.93;
			}
			return [pxX,pxY];
		}
	},
	
	parseFile: function(fileContents) {
		console.log('parsing:',fileContents);
		var //fileContents = evt.target.result,
		    //fileName = fileContents.name,
				// Split file contents at each newline
				people = fileContents.split(/\n/),
				i = 0, person;
		//console.log('file contains ' + people.length + ' people');
		// Split each line by commas
		while (i < people.length) {
			// Create a Person object
			person = demo.people.create(people[i].split(/\t/));
			// Add person to the list
			demo.people.add(person);
			i++;
		}
	},
	
	people: {
		currentId: 0,
		list: {},
		
		create: function(properties) {
			var person;
			if (properties && $.isArray(properties)) {
				person = new Person(properties);
			}
			else if (arguments.length > 1) {
				person = new Person(arguments);
			}
			return person;
		},
		
		// Pull in a person's info from the form
		addFromForm: function() {
			var properties = [], person;
			properties.push(demo.formFields.$first.val());
			properties.push(demo.formFields.$last.val());
			properties.push(demo.formFields.$location.val());
			properties.push(demo.formFields.$distance.val());
			properties.push(demo.formFields.$tickets.val());
			properties.push('');
			//console.log('adding person with properties: ', properties);
			person = demo.people.create(properties);
			demo.people.add(person);
			// Clear form fields
			demo.formFields.$first.val('');
			demo.formFields.$last.val('');
			demo.formFields.$location.val('');
			demo.formFields.$distance.val('');
			demo.formFields.$tickets.val('');
		},
		
		// Add a Person object to the internal list and look up their location if necessary
		add: function(person) {
			if (person.first.length && person.last.length && person.location.length) {
				demo.people.list[person.id] = person;
				
				// If location has already been determined, put them on the map now
				if (person.lat && person.long) {
					demo.people.placeOnMap(person);
				}
				// Else, look up coordinates for this place name asynchronously
				else if (person.location.length) {
					demo.getPlaceNameCoords(person);
				}
				demo.$list.closest('section').show();
			}
			else {
				alert('Invalid personal info, need at least a name and location');
			}
		},
		
		// Add person to the map
		// Often called after the Person has been instantiated because their location was determined asynchronously
		placeOnMap: function(person) {
			demo.draw.addCircle({id: person.last.replace(/\W/g,'').toLowerCase(), x:person.lat, y: person.long, color: '#f00', distance: person.distance, title: person.first + ' ' + person.last});
			demo.$list.append('<li id="' + person.id + '"><div class="name">' + person.first + ' ' + person.last + '</div><a class="button del" tabindex="1">Remove</a><div class="loc">' + person.location + ' [' + person.lat + ',' + person.long + ']</div></li>');
		},
		
		removeFromMap: function(id) {
			if (demo.draw.circles[id]) {
				console.log('circle exists at id ' + id);
				demo.draw.circles[id] = null;
			}
			if (demo.draw.circles[id+'_outer']) {
				console.log('circle exists at id ' + id + '_outer');
				demo.draw.circles[id+'_outer'] = null;
			}
		}
	},
	
	getPlaceNameCoords: function(person) {
		//return false;
		$.ajax({
			url: 'inc/geocode.php?loc=' + encodeURIComponent(person.location),
			method: 'GET',
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				if (data.okay) {
					person.lat = parseFloat(data.lat);
					person.long = parseFloat(data.long);
					person.formatted_address = data.formatted_address.toString();
					demo.people.placeOnMap(person);
				}
				else {
					alert(JSON.stringify(data));
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('Ajax error, check console');
				console.log(jqXHR, textStatus, errorThrown);
			},
			complete: function(jqXHR, textStatus) {
			}
		});
	},
	
	generateRandomId: function () {
		var id="", i=5, letterpool="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    while (i--) { id += letterpool.charAt(Math.floor(Math.random() * letterpool.length)); }
		id += demo.getUnixTime().toString().substr(demo.getUnixTime().toString().length-5, 5);
		// Try again if this ID is already in use
		if (document.getElementById(id)) { demo.generateRandomId(); }
    return id;
	},
	
	getUnixTime: function () { return parseInt(Math.floor(new Date().getTime() / 1000), 10); }
};

var Person = function(props) {
	var props = $.isArray(props)? props : ['', '', '', 50, 2, ''];
	this.id = demo.people.currentId;
	demo.people.currentId++;
	
	// Basic info
	this.first = props[0] || '';
	this.last = props[1] || '';
	this.distance = isNaN(props[3])? 50 : parseFloat(props[3]);
	this.count = isNaN(props[4])? 2 : parseInt(props[4]);
	this.avatar = props[5] || '';
	
	// Get location and convert to lat/long if necessary
	this.location = props[2] || '';
	this.formatted_address = this.location;
	this.lat  = 0.0;
	this.long = 0.0;
	
	// Lat/long passed directly
	var coordsRegex = /^(-?\d{1,2}\.\d+)\|(-?\d{1,2}\.\d+)$/, coords;
	if (coordsRegex.test(this.location)) {
		coords = coordsRegex.exec(this.location);
		if ($.isArray(coords) && coords.length === 3) {
			this.lat = parseFloat(coords[1]);
			this.long = parseFloat(coords[2]);
			if (isNaN(this.lat))  { this.lat  = 0.0; }
			if (isNaN(this.long)) { this.long = 0.0; }
		}
	}
};