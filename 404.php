<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body($httpStatus = 400)
{
	if ($httpStatus === 400) {
		?>
		<div id="error-404-main" role="main" class="error-page">
		
			<h1>Page not found <span frown>:(</span></h1>
			
			<section>
				<p>Sorry, but the page you were trying to view does not exist.</p>
				<p>It looks like this was the result of either:</p>
				<ul>
					<li>a mistyped address</li>
					<li>an out-of-date link</li>
					<li>just plain bad luck</li>
				</ul>
			</section>
			
			<script>
				var _gaq=[['_setAccount','UA-12082176-1'],['_trackPageview']];
				_gaq.push(['_trackEvent', 'Error', '404', 'page: ' + document.location.pathname + document.location.search + ' ref: ' + document.referrer ]);
				(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
				g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
				s.parentNode.insertBefore(g,s)}(document,'script'));
				if (typeof _gaq !== "undefined" && _gaq !== null && window.$) {
					$(document).ajaxSend(function(event, xhr, settings){
						_gaq.push(['_trackPageview', settings.url]);
					});
				}
			</script>
			<script>
				var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),
				GOOG_FIXURL_SITE = location.host;
			</script>
			<script src="http://linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js"></script>
		</div>
		<?php
	}
	else if ($httpStatus === 500) {
		?>
    <div id="error-500-main" role="main" class="error-page">
      
      <h1>Server problem <span frown>:(</span></h1>
      
      <section>
        <p>Oops! Something went wrong. Don't worry, it's not you, it's me.</p>
        <p>In the meantime, perhaps you might want to head <a href="http://patik.com/">home</a> or try the menu at the top.</p>
      </section>
      
      <script>
        var _gaq=[['_setAccount','UA-12082176-1'],['_trackPageview']];
        _gaq.push(['_trackEvent', 'Error', '500', 'page: ' + document.location.pathname + document.location.search + ' ref: ' + document.referrer ]);
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
        if (typeof _gaq !== "undefined" && _gaq !== null && window.$) {
          $(document).ajaxSend(function(event, xhr, settings){
            _gaq.push(['_trackPageview', settings.url]);
          });
        }
      </script>
    </div>
  	<?php
	}
}

$x = new Print_html();
$x->name = 'error' . $_SERVER['REDIRECT_STATUS'];
$x->section = 'error';
$x->pageTitle = 'Page Not Found';
$x->noAnalytics = true;

# ajax request
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || !empty($_GET['return'])) {
	print_page_body($_SERVER['REDIRECT_STATUS']);
}
# navigated directly
else {
	$x->redirect = true;
}

$x->print_full_page();

?>