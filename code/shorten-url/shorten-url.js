(function(d) {
  // Pull in jQuery
  if (!window.jQuery) {
    var s = d.createElement('script');
    s.src = d.location.protocol + '//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);
  }

  // Define objects and set up form
  var cpsu = {
    $container: null,
    $form: null,
    $input: null,
    $output: null,
    $button: null,
    action: 'http://patik.com/code/shorten-url/',

    setup: function($) {
      // Clear existing containers
      if ($('#cpsu-shortener-container').length) {
        $('#cpsu-shortener-container').remove();
      }

      // Set up form
      cpsu.$container = $('<div/>', {id:'cpsu-shortener-container'})
            .attr('style','position: fixed; top: 2em; right: 2em; width: 400px; min-height: 50px; border: 1px solid #444; color: #444; padding: 5px; z-index: 1000; border-radius: 4px; background-clip: padding-box; background-color: #fefefe; font-size: 14px; box-shadow: 0 0 8px rgba(0, 105, 210, 0.4);')
            .appendTo($(d.body));

      cpsu.$form = $('<form/>', {method: 'get', action: cpsu.action, className: 'cpsu-form'})
            .submit(function(event) {
              cpsu.$button.attr('disabled','disabled');
              cpsu.shortenURL();
              event.preventDefault();
              return false;
            })
            .appendTo(cpsu.$container);

      cpsu.$input = $('<input/>', {type: 'url', className:'cpsu-input', value: window.location.href})
            .attr('style','border: 1px solid #0069d2; padding: 2px 4px; width: 390px; margin-bottom: 5px;')
            .val(window.location.href)
            .appendTo(cpsu.$form);

      cpsu.$button = $('<input/>', {type: 'submit', className:'cpsu-button', value: 'Shorten'})
            .attr('style','border: 1px solid #0069d2; padding: 2px 20px; display: block; float: left; margin-right: 20px; font-weight: bold;')
            .appendTo(cpsu.$form);

      cpsu.$output = $('<input/>', {type: 'url', className:'cpsu-output', placeholder: 'Shortening...'})
            .attr('style','border: 1px solid #0069d2; padding: 2px 4px; width: 390px; display: block; float: left; width: 180px;')
            .appendTo(cpsu.$form);

      // Styles
      $('.cpsu-input-container')
        .attr('style', 'margin-bottom: 15px;');

      // Submit form to shorten the current page's URL
      cpsu.$form.submit();
    },

    shortenURL: function() {
      var url = cpsu.$input.val() || window.location.href,
          // Generate a semi-random callback function name
          callback = 'cpsu' + (new Date().getTime()).toString().substr(7),
          s = d.createElement('script');

      window[callback] = function(data) {
        try {
          if (data.okay) {
            cpsu.$output.val(data.short_url);
          }
          cpsu.$button.removeAttr('disabled');
        } catch(e) { }
      };
      s.src = cpsu.action + '?url=' + encodeURIComponent(url) + '&cb=' + callback;
      d.getElementsByTagName('head')[0].appendChild(s);
    }
  };
	window.cpsu = cpsu;
})(document);

// Initialize once jQuery has loaded
(function waitForjQuery() {
  if (!window.jQuery) { setTimeout(waitForjQuery, 200); }
  else { cpsu.setup(window.jQuery); }
})();
