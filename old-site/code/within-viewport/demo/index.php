<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Within Viewport Demo - Patik.com</title>

<!-- jQuery and the subsequent 2 scripts are all required to run the Within Viewport jQuery plugin -->
<script src="http://code.jquery.com/jquery-1.7.min.js"></script>
<script>window.jQuery || document.write('<script src="inc/jquery-1.7.min.js"><\/script>');</script>
<script src="../withinViewport.js"></script>
<script src="../jquery.withinViewport.js"></script>
<!-- Only withinViewport.js is required to run the standalone version -->

<!-- The following lines are only for this demo -->
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="author" content="Craig Patik">
<meta name="description" content="Within Viewport JavaScript and jQuery Plugin for determining whether elements are completely inside the browser viewport">
<link href="inc/demo.css" rel="stylesheet" media="all">
<script src="inc/demo.js"></script>
</head>
<body>
  <div id="explanation" class="" role="main">
    <h1>Within Viewport</h1>
    <div id="toggler" class="button minus small">Collapse</div>
    <p>Scroll around the page. Boxes completely within the viewport will darken.</p>
    <p>See the <a href="https://github.com/patik/within-viewport">code on GitHub</a> and the <a href="http://patik.com/blog/within-viewport-javascript-and-jquery-plugin/" class="no-ajaxy">blog post</a> for more info.</p>
    <div id="thresholds">
      <p>Set your own thresholds (in pixels):</p>
      <form action="." method="post">
        <div id="threshold-top">
          <label for="top">Top:</label>
          <input type="number" size="3" id="top" value="0" tabindex="1">
        </div>
        <div id="threshold-left">
          <label for="left">Left:</label>
          <input type="number" size="3" id="left" value="0" tabindex="1">
        </div>
        <div id="threshold-right">
          <label for="right">Right:</label>
          <input type="number" size="3" id="right" value="0" tabindex="1">
        </div>
        <div id="threshold-bottom">
          <label for="bottom">Bottom:</label>
          <input type="number" size="3" id="bottom" value="0" tabindex="1">
        </div>
        <div style="display:none;">
          <input type="checkbox" checked="checked" id="show-boundary" tabindex="1">
          <label for="show-boundary">Show boundary regions</label>
        </div>
      </form>
      <p style="display:none;">Press <code>shift + arrow key</code> to nudge the page by 1 pixel</p>
  	</div>
  </div>
  <!-- Boundary lines -->
  <div style="display:none;" class="boundary boundary-top"></div>
  <div style="display:none;" class="boundary boundary-right"></div>
  <div style="display:none;" class="boundary boundary-bottom"></div>
  <div style="display:none;" class="boundary boundary-left"></div>
  <script>
	var _gaq=[['_setAccount','UA-12082176-1'],['_trackPageview']];
	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
	g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g,s)}(document,'script'));
	if (typeof _gaq !== "undefined" && _gaq !== null && window.$) {
		$(document).ajaxSend(function(event, xhr, settings){
			_gaq.push(['_trackPageview', settings.url]);
		});
	}
	</script>
</body>
</html>
