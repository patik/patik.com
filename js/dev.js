/* Author: Craig Patik */
/* Local development only */

var patikdev = {
  $body: null,
  $window: null,

  init: function() {
    try {
      // Containers
      patikdev.$body = $('body');
      patikdev.$window = $(window);
      patikdev.events.init();

      if (document.location.href.indexOf('//patikrd/') > -1 || document.location.href.indexOf('//patik/') > -1) {
        var s = document.createElement('div');
        s.id = "breakpoint";
        document.body.appendChild(s);
        patikdev.events.showWindowSize();
      }
    } catch(e) { console.log(e); }
  },

  events: {
    init: function() {
      try {
        patikdev.$window.on('resize', function(/* evt */) {
          patikdev.events.showWindowSize();
        });
      } catch(e) { console.log(e); }
    },

    showWindowSize: function() {
      var $breakpoint = $('#breakpoint'),
          width = patikdev.$window.width();

      // Force Chrome to display at iPhone width
      if (width === 400) {
        patikdev.$body.css('width', '320px');
        $breakpoint.html('Phone <span>320</span>');
      }
      else {
        patikdev.$body.css('width', 'auto');
      }
      // Update display
      if (width < 480) {
        $breakpoint.html('Phone <span>' + width + '</span>');
      }
      else if (width < 768) {
        $breakpoint.html('Phone to tablet <span>' + width + '</span>');
      }
      else if (width < 980) {
        $breakpoint.html('Tablet <span>' + width + '</span>');
      }
      else if (width >= 980) {
        $breakpoint.html('Desktop <span>' + width + '</span>');
      }
    }
  }
};
