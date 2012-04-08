<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');
$httpStatus = intval($_SERVER['REDIRECT_STATUS']);

function print_page_body()
{
	global $httpStatus;
	
	?>
	<div id="error-<?php echo $httpStatus; ?>-main" role="main" class="error-page">
	<?php
	
	if ($httpStatus === 404) {
		?>
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
				var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),
				GOOG_FIXURL_SITE = location.host;
			</script>
			<script src="http://linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js"></script>
		<?php
	}
	else if ($httpStatus === 401) {
		?>
      <h1>Unauthorized <span frown>:(</span></h1>
      
      <section>
        <p>You don't have access to this area. Maybe you entered the wrong password?</p>
        <p>Perhaps you might want to head <a href="http://patik.com/">home</a> or try the menu at the top.</p>
      </section>
    <?php
  }
	else if ($httpStatus === 403) {
		?>
      <h1>Forbidden territory <span frown>:(</span></h1>
      
      <section>
        <p>Sorry, but you don't have access to this area.</p>
        <p>Perhaps you might want to head <a href="http://patik.com/">home</a> or try the menu at the top.</p>
      </section>
    <?php
  }
	else if ($httpStatus === 500) {
		?>
      <h1>Server problem <span frown>:(</span></h1>
      
      <section>
        <p>Oops! Something went wrong. Don't worry, it's not you, it's me.</p>
        <p>In the meantime, perhaps you might want to head <a href="http://patik.com/">home</a> or try the menu at the top.</p>
      </section>
  	<?php
	}
	else {
		$httpStatus = 499;
		?>
			<h1>Hmm, something went wrong <span frown>:(</span></h1>
			
			<section>
				<p>Don't worry, it's not you, it's me.</p>
        <p>And yes, I'll make it up to you (i.e., it's been reported).</p>
        <p>Perhaps you might want to head <a href="http://patik.com/">home</a> or try the menu at the top.</p>
			</section>
			
			<script>
				var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),
				GOOG_FIXURL_SITE = location.host;
			</script>
			<script src="http://linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js"></script>
		<?php
	}
	
	# End of main section </div>
	
	?>
  		<script>
				var _gaq=[['_setAccount','UA-12082176-1'],['_trackPageview']];
				_gaq.push(['_trackEvent', 'Error', '<?php echo $httpStatus; ?>', 'page: ' + document.location.pathname + document.location.search + ' ref: ' + document.referrer ]);
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

$x = new Print_html();
$x->name = 'error' . $httpStatus;
$x->section = 'error';
$x->noAnalytics = true;

switch($httpStatus) {
	case 404:
		$x->pageTitle = 'Page Not Found';
		break;
	case 401:
		$x->pageTitle = 'Unauthorized';
		break;
	case 403:
		$x->pageTitle = 'Forbidden Territory';
		break;
	case 500:
		$x->pageTitle = 'Server Problem';
		break;
	default:
		$x->pageTitle = 'Unknown error';
		$httpStatus = 499;
		break;
}

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