/* Author: Craig Patik */

var patik = {
  $body: null,

  init: function() {
    try {
      // Insert server-generated CSS
      if (window.insertCss) {
        //patik.css.insert();
      }

      // Containers
      patik.$body = $('body');
      patik.$window = $(window);
      patik.events.showWindowSize();
      patik.events.init();
      setTimeout(function () { patik.preload.add(''); }, 1500);

      // Development only
      if (document.location.href.indexOf('http://patikrd/') > -1) {
        var s = document.createElement('div');
        d.id = "breakpoint";
        document.body.appendChild(d);
        patik.events.showWindowSize();
        $(window).on('resize', function(evt) {
          patik.events.showWindowSize();
        });
      }
    } catch(e) { console.log(e); }
  },

  events: {
    init: function() {
      try {

      } catch(e) { console.log(e); }
    },

    showWindowSize: function() {
      var $breakpoint = $('#breakpoint'),
          width = patik.$window.width();

      // Force Chrome to display at iPhone width
      if (width === 400) {
        patik.$body.css('width', '320px');
        $breakpoint.html('Phone <span>320</span>');
      }
      else {
        patik.$body.css('width', 'auto');
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
  },

  preload: {
    $container: null,
    queue: [],

    add: function(html) {
      var i;
      if (!patik.preload.$container) {
        patik.preload.$container = $('<div/>',{style:'position:absolute;top:-9999em;left:-9999em;display:block;visibility:hidden;'});
        // Sometimes called before init()
        if (!patik.$body) { patik.$body = $('body'); }
        patik.$body.append(patik.preload.$container);
      }

      patik.preload.$container.append(html);

      if (patik.preload.queue.length) {
        i = 0;
        while (i < patik.preload.queue.length) {
          patik.preload.$container.append(patik.preload.queue[i]);
        }
        patik.preload.queue = [];
      }
    }
  },

  css: {
    insert: function(s) {
      try {
        var css = s || window.insertCss;
        if (!css) { return false; }
        $('<style/>').text(css).appendTo($('head'));
      } catch(e) { }
    }
  }
};
