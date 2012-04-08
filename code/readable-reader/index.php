<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

header("HTTP/1.1 301 Moved Permanently");
header("Location: http://patik.com/code/user-scripts/"); 


function print_page_body()
{
  ?>
  <div id="readable-reader-main" role="main">
    
    <h1>Moved</h1>
    <p>Readable Reader can now be found at my <a href="http://patik.com/code/user-scripts/">user scripts</a> page.</p>
    
    <script>window.location.href = "http://patik.com/code/user-scripts/";</script>
    
  </div>
  <?php
}

$x = new Print_html();
$x->name = 'userscripts';
$x->section = 'code';
$x->pageTitle = 'Readable Reader for Google Reader and Other User Scripts';
$x->keywords = 'user script, google reader, rss, css, javascript, greasemonkey, browser extension, add-on';
$x->dirLevel = 2;

# ajax request
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || !empty($_GET['return'])) {
	print_page_body();
}
# navigated directly
else {
	$x->redirect = true;
}

$x->print_full_page();

?>