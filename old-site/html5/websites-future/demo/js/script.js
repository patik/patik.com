var demo = {
  $list: null,
  $body: null,
  canvas: null,
  $form: null,
  formFields: {},
  paper: null,
  mobile: false,
  hasMap: false,

  init: function() {
    try {
      // Containers & elements
      demo.$body = $('body');
      demo.canvas = $('#worldmap').get(0) || null;
      demo.$list = $('#people-list');
      demo.$form = $('#add-person');
      demo.formFields = { $first: $('#add-first-name'), $last: $('#add-last-name'), $location: $('#add-location'),
                          $distance: $('#add-distance'), $tickets: $('#add-tickets')};

      if (typeof window.FileReader === 'function' && window.addEventListener) {
        window.addEventListener('dragover', demo.events.handleDragOver, false);
        window.addEventListener('drop', demo.events.handleFileDrop, false);
        $('.has-dnd').show();
        $('.no-dnd').hide();
      }
      else {
        $('.has-dnd').hide();
        //demo.$body.append('<p>Your browser doesn\'t support reading from files</p>');
      }

      // Map
      if (Modernizr.canvas && Modernizr.svg && !demo.mobile) {
        demo.hasMap = true;
        WorldMap({
          id: demo.canvas.id,
          bgcolor: "#99b3cc",
          fgcolor: "#f2efe9",
          bordercolor: "#808080",
          borderwidth: 0.5,
          padding: 10
        });

        // Raphael.js setup
        demo.paper = Raphael('map-container', 744, 420);
        // Conference locations
        demo.draw.addCircle({id: 'lon', x: 51.5, y: 0, color: '#00f', title: 'London (12)'});
        demo.draw.addCircle({id: 'nyc', x: 40.72, y: -74, color: '#00f', title: 'New York (8)'});
        demo.draw.addCircle({id: 'pth', x: -31.9, y: 115.8, color: '#00f', title: 'Perth (17)'});
        demo.draw.addCircle({id: 'bej', x: 39.9, y: 116.4, color: '#00f', title: 'Beijing (6)'});
        demo.draw.addCircle({id: 'atl', x: 33.7, y: -84.4, color: '#00f', title: 'Atlanta (4)'});
        demo.draw.addCircle({id: 'bsas', x: -34.608, y: -58.368, color: '#00f', title: 'Buenos Airea (6)'});
      }
      else if (!demo.mobile) {
        // Canvas not supported
        $('#map-container canvas').prepend('<img src="img/canvas_placeholder.png" alt="Faded world map">');
      }

      // Try to get the user's location automatically
      demo.loc.getUserLocation();

      // Fake placeholders for older browsers
      if (!Modernizr.input.placeholder) {
        $("input[placeholder]").each(function() {
          var $e = $(this),
              placeholder = $e.attr("placeholder");
          $e.removeAttr("placeholder").val(placeholder);
          $e.bind("focus blur", function(e) {
            if (e.type === "focus" && $e.val() === placeholder) { $e.val(""); }
            else { if (!$e.val()) { $e.val(placeholder); } }
          });
        });
      }

      //var me = demo.people.create(['Some', 'Guy', '45.0|-70.1', 240, 2, '']);
      //demo.people.add(me);

      demo.events.init();
    } catch (e) { demo.handleError(e, arguments); }
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
        .bind('keyup', function(evt) {
          if (evt.which === 13) {
            evt.stopPropagation();
            evt.preventDefault();
            demo.$form.submit();
          }
        });

      // Location input
      $('#add-location')
        .bind('keyup keypress', function(evt) {
          // Clear out the automatic location if the user typed something in
          if ($(this).val().length) {
            demo.loc.putAutoLocation(true);
          }
        });

      // Add person button
      $('#add-button')
        .bind('click', function() { demo.$form.submit(); })
        .bind('keyup', function(evt) {
          if (evt.which === 13) {
            evt.stopPropagation();
            evt.preventDefault();
            demo.$form.submit();
          }
        });

      // Remove person button
      demo.$body.delegate('#people-list .del', 'click', function(evt) {
        try {
          var $person = $(this).closest('li');
          if (demo.hasMap) {
            demo.people.removeFromMap($person.attr('id'));
          }
          $person.remove();
          evt.stopPropagation();
          evt.preventDefault();
          // Hide the section if no people are left in the list
          if (!$('#people-list').html().length) {
            $('#people').slideUp();
          }
          return false;
        } catch (e) { demo.handleError(e, arguments); }
      });

      // Fake web sockets call from server
      demo.$body.bind('keyup', function(evt) {
        if (evt.which === 77 && $(evt.target).is('.button.next')) {
            evt.stopPropagation();
            evt.preventDefault();
            demo.server.create();
          }
      });

      // File upload box
      $('#file-upload').bind('change', function (evt) {
        demo.events.handleFileUpload(evt);
      });
    },

    // Reading files: http://www.html5rocks.com/en/tutorials/file/dndfiles/

    handleFileDrop: function(evt) {
      try {
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
      } catch (e) { demo.handleError(e, arguments); }
    },

    handleFileUpload: function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      return false;
    },

    handleDragOver: function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
  },

  draw: {
    circles: {},

    addCircle: function(settings) {
      try {
        if (!settings) { return false; }
        var coords = demo.draw.coordsToPixels([settings.x, settings.y]),
            radius = settings.radius || 3,
            circle, outerCircle, outerRadius;

        if (settings.distance) {
          // Need to draw the dot and a radius ring
          circle = demo.paper.circle(coords[0], coords[1], radius);
          circle.attr("fill", settings.color).attr("stroke", "#ddd").attr('id',settings.id);
          if (settings.title) {
            circle.attr('title', settings.title);
          }
          demo.draw.circles[settings.id] = circle;

          // Convert distance from miles to pixels
          if (settings.distance >= 100) {
            outerRadius = settings.distance * 0.04;
          }
          else {
            outerRadius = 4;
          }
          outerCircle = demo.paper.circle(coords[0], coords[1], outerRadius);
          outerCircle.attr({'stroke': "#333"});
          demo.draw.circles[settings.id + '_outer'] = outerCircle;
        }
        else {
          // Draw a plain dot only
          circle = demo.paper.circle(coords[0], coords[1], radius);
          circle.attr("fill", settings.color).attr("stroke", "#eee").attr('id',settings.id);
          if (settings.title) {
            circle.attr('title', settings.title);
          }
          demo.draw.circles[settings.id] = circle;
        }
      } catch (e) { demo.handleError(e, arguments); }
    },

    coordsToPixels: function(coords) {
      try {
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
      } catch (e) { demo.handleError(e, arguments); }
    },

    // Takes two circle objects
    distanceBetween: function(a, b) {
      try {
        var side1, side2, hypotenuse;
        // Side 1
        if (a.attrs.cx >= b.attrs.cx) {
          side1 = a.attrs.cx - b.attrs.cx;
        }
        else {
          side1 = b.attrs.cx - a.attrs.cx;
        }
        // Side 2
        if (a.attrs.cy >= b.attrs.cy) {
          side2 = a.attrs.cy - b.attrs.cy;
        }
        else {
          side2 = b.attrs.cy - a.attrs.cy;
        }
        return Math.sqrt(side1*side1 + side2*side2);
      } catch (e) { demo.handleError(e, arguments); }
    },

    // Takes a Person's circle and finds the closest conference circle
    // Returns array with [distance in pixels, circle object of the closest conf]
    findClosestConf: function(a) {
      try {
        var confs = ['lon','nyc','pth','bej','atl','bsas'],
            closestCircle = null, closestDist = 9999999,
            dist, i;
        // Loop through confs
        i = confs.length;
        while (i--) {
          dist = demo.draw.distanceBetween(a, demo.draw.circles[confs[i]]);
          if (dist < closestDist) {
            closestDist = dist;
            closestCircle = confs[i];
          }
        }

        // Convert distance to miles
        closestDist = closestDist/0.04;

        return [Math.round(closestDist), demo.getConfName(closestCircle)];

      } catch (e) { demo.handleError(e, arguments); }
    }
  },

  loc: {
    current: [0,0],

    // Get user's position
    getUserLocation: function () {
      try {
        // Try W3C Geolocation
        if (navigator.geolocation) {
          demo.loc.waitingForLocation();
          navigator.geolocation.getCurrentPosition(function(position) {
            demo.loc.current = [position.coords.latitude, position.coords.longitude];
            demo.loc.putAutoLocation();
          }, function() { demo.loc.waitingForLocation(true); });
        }
        // Try Google Gears Geolocation
        else if (google.gears) {
          var geo = google.gears.factory.create('beta.geolocation');
          demo.loc.waitingForLocation();
          geo.getCurrentPosition(function(position) {
            demo.loc.current = [position.latitude, position.longitude];
            demo.loc.putAutoLocation();
          }, function() { demo.loc.waitingForLocation(true); });
        }
        // Browser doesn't support Geolocation, so prompt for input
        else {
          demo.loc.waitingForLocation(true);
        }
      } catch (e) { demo.loc.waitingForLocation(true); demo.handleError(e, arguments); }
    },

    waitingForLocation: function(off) {
      try {
        var $input = $('#add-location');
        // Don't overwrite any user input
        if ($input.val().length > 0) {
          return false;
        }
        if (!off) {
          $input.attr('placeholder','Getting location...');
        }
        else {
          $input.attr('placeholder', $input.data('placeholder'));
        }
      } catch (e) { demo.handleError(e, arguments); }
    },

    putAutoLocation: function(clear) {
      try {
        var $input = $('#add-location');
        // Don't overwrite any user input
        if ($input.val().length > 0) {
          return false;
        }
        if (!clear) {
          $input
            .attr('placeholder','Use current location')
            .css({'color':'#99b3cc', 'font-style': 'italic'});
        }
        else {
          $input
            .attr('placeholder', $input.data('placeholder'))
            .css({'color': 'inherit', 'font-style': 'normal'});
        }
      } catch (e) { demo.handleError(e, arguments); }
    },

    getPlaceNameCoords: function(person) {
      try {
        var nearest;
        //return false;
        $.ajax({
          url: 'inc/geocode.php?loc=' + encodeURIComponent(person.location),
          method: 'GET',
          dataType: 'json',
          success: function(data, textStatus, jqXHR) {
            if (data.okay) {
              person.lat = parseFloat(data.lat);
              person.long = parseFloat(data.long);
              demo.people.placeOnMap(person);
              person.formatted_address = data.formatted_address.toString();
              $('#' + person.id).find('.loc').html(data.formatted_address.toString());
              nearest = demo.draw.findClosestConf(demo.draw.circles[person.id]);
              if (typeof nearest[1] === 'string' && nearest[1] !== 'undefined' && nearest[0] < 99999) {
                $('#' + person.id).find('.nearest').html('Nearest: ' + nearest[1] + ', ' + nearest[0] + ' miles');
              }
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR, textStatus, errorThrown);
          },
          complete: function(jqXHR, textStatus) {
          }
        });
      } catch (e) { demo.handleError(e, arguments); }
    }
  },

  people: {
    currentId: 0,
    list: {},

    create: function(properties) {
      try {
        var person;
        if (properties && $.isArray(properties)) {
          person = new Person(properties);
        }
        else if (arguments.length > 1) {
          person = new Person(arguments);
        }
        return person;
      } catch (e) { demo.handleError(e, arguments); }
    },

    // Pull in a person's info from the form
    addFromForm: function() {
      try {
        var properties = [], person;
        properties.push(demo.formFields.$first.val());
        properties.push(demo.formFields.$last.val());
        properties.push(demo.formFields.$location.val() ? demo.formFields.$location.val() : demo.loc.current[0] + '|' + demo.loc.current[1]);
        properties.push(demo.formFields.$distance.val());
        properties.push(demo.formFields.$tickets.val());
        properties.push('');
        person = demo.people.create(properties);
        if (!demo.formFields.$location.val() && demo.loc.current.length) {
          person.formatted_address = 'Current location';
        }
        demo.people.add(person);
        // Clear form fields
        demo.formFields.$first.val('');
        demo.formFields.$last.val('');
        demo.formFields.$location.val('');
        demo.formFields.$distance.val('');
        demo.formFields.$tickets.val('');
      } catch (e) { demo.handleError(e, arguments); }
    },

    // Add a Person object to the internal list and look up their location if necessary
    add: function(person) {
      try {
        var nearest;
        if (person.first.length && person.last.length && person.location.length) {
          demo.people.list[person.id] = person;
          // Look up coordinates for this place name asynchronously
          if (!person.lat && !person.long) {
            demo.loc.getPlaceNameCoords(person);
          }
          else {
            demo.people.placeOnMap(person);
            nearest = demo.draw.findClosestConf(demo.draw.circles[person.id]);
            if (typeof nearest[1] === 'string' && nearest[1] !== 'undefined' && nearest[0] < 99999) {
              $('#' + person.id).find('.nearest').html('Nearest: ' + nearest[1] + ', ' + nearest[0] + ' miles');
            }
          }
          $('#people').slideDown();
        }
        else {
          //alert('Invalid personal info, need at least a name and location');
        }
      } catch (e) { demo.handleError(e, arguments); }
    },

    // Add person to the map
    // Often called after the Person has been instantiated because their location was determined asynchronously
    placeOnMap: function(person) {
      try {
        if (demo.hasMap) {
          demo.draw.addCircle({id: person.id, x:person.lat, y: person.long, color: '#f00', distance: person.distance, title: person.first + ' ' + person.last + ', ' + person.count + ' requested'});
        }
        demo.$list.append('<li id="' + person.id + '"><img class="avatar" src="' + person.avatar + '" alt="">' +
                          '<div class="name">' + person.first + ' ' + person.last + '</div>' +
                          '<a class="button del small" tabindex="1">Remove</a><div class="loc">' + person.formatted_address + '</div>' +
                          '<div class="nearest"></div></li>'
                        );
      } catch (e) { demo.handleError(e, arguments); }
    },

    removeFromMap: function(id) {
      try {
        if (demo.draw.circles[id]) {
          demo.draw.circles[id].remove();
          demo.draw.circles[id] = null;
        }
        if (demo.draw.circles[id+'_outer']) {
          demo.draw.circles[id+'_outer'].remove();
          demo.draw.circles[id+'_outer'] = null;
        }
      } catch (e) { demo.handleError(e, arguments); }
    }
  },

  server: {
    create: function() {
      try {
        alert('London no longer has any available openings');
        if (demo.hasMap) {
          demo.people.removeFromMap('lon');
        }
      } catch (e) { demo.handleError(e, arguments); }
    }
  },

  parseFile: function(fileContents) {
    try {
      var people = fileContents.split(/\n/),
          i = 0, person;

      // Split each line by commas
      while (i < people.length) {
        // Create a Person object
        if (people[i].replace(/\s/g, '').length) {
          person = demo.people.create(people[i].split(/\t/));
          // Add person to the list
          demo.people.add(person);
        }
        i++;
      }
    } catch (e) { demo.handleError(e, arguments); }
  },

  getConfName: function(id) {
    try {
      var name;
      switch(id) {
        case 'lon':
          name = 'London';
          break;
        case 'nyc':
          name = 'New York';
          break;
        case 'pth':
          name = 'Perth';
          break;
        case 'bej':
          name = 'Beijing';
          break;
        case 'atl':
          name = 'Atlanta';
          break;
        case 'bsas':
          name = 'Buenos Aires';
          break;
        default:
          break;
      }
      return name;
    } catch (e) { demo.handleError(e, arguments); }
  },

  handleError: function(error, args) {
    try {
      var func = args.callee.caller || 'unknown function';
      console.log('Error in ' + func + ': ', error, args);
    } catch (e) { }
  },

  generateRandomId: function () {
    try {
      var id="", i=5, letterpool="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      while (i--) { id += letterpool.charAt(Math.floor(Math.random() * letterpool.length)); }
      id += demo.getUnixTime().toString().substr(5);
      // Try again if this ID is already in use
      if (document.getElementById(id)) { demo.generateRandomId(); }
      return id;
    } catch (e) { demo.handleError(e, arguments); }
  },

  getUnixTime: function () { try { return parseInt(Math.floor(new Date().getTime() / 1000), 10); } catch (e) { demo.handleError(e, arguments); } }
};

// Person constructor
var Person = function(props) {
  try {
    props = $.isArray(props)? props : ['', '', '', 50, 2, ''];

    // Basic info
    this.first = props[0] || '';
    this.last = props[1] || '';
    this.distance = isNaN(props[3])? 50 : parseFloat(props[3]);
    this.count = isNaN(props[4])? 2 : parseInt(props[4], 10);
    this.avatar = props[5] || 'img/avatar.png';
    this.id = (this.first.replace(/\W/g,'') + this.last.replace(/\W/g,'')).toLowerCase();

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
        this.formatted_address = '';
        this.lat = parseFloat(coords[1]);
        this.long = parseFloat(coords[2]);
        if (isNaN(this.lat))  { this.lat  = 0.0; }
        if (isNaN(this.long)) { this.long = 0.0; }
      }
    }
  } catch (e) { demo.handleError(e, arguments); }
};
