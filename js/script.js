/* Author: Craig Patik */

var patik = {
  $body: null,

  init: function() {
    try {
      patik.$body = $('body');
      // Insert any server-generated CSS
      if (window.insertCss) {
        patik.css.insert();
      }
      setTimeout(function () { patik.preload.add(''); }, 1500);
    } catch(e) { console.log(e); }
  },

  preload: {
    $container: null,
    queue: [],

    add: function(html) {
      var i;
      if (!patik.preload.$container) {
        patik.preload.$container = $('<div/>', {style:'position:absolute;top:-9999em;left:-9999em;display:block;visibility:hidden;'});
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

