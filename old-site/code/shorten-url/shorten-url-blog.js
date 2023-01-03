(function(d) {
  // Pull in jQuery
  if (!window.jQuery) {
    var s = d.createElement('script');
    s.src = d.location.protocol + '//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);
  }

  // Define objects and set up form
  var cpsu = {
    $linkBox: null,
    $form: null,
    $input: null,
    $output: null,
    $button: null,
    action: 'http://patik.com/code/shorten-url/',
    
    setup: function($) {
      // Input that will contain the URL
			cpsu.$linkBox = $('.bitly-link');
      // Submit form to shorten the current page's URL
      cpsu.$form.submit();
    },
    
    shortenURL: function(sURL) {
      var url = sURL || window.location.href,
          // Generate a semi-random callback function name
          callback = 'cpsu' + (new Date().getTime()).toString().substr(7),
          s = d.createElement('script');
    
      window[callback] = function(data) {
        try {
          if (data.okay) {
            cpsu.$linkBox.val(data.short_url);
          }
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
