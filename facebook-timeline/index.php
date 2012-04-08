<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="facebooktimeline-main" role="main">
    
    <h1>Facebook Timeline</h1>
    
    <section>
      <p>Facebook rolled out their new profile <a href="http://www.facebook.com/about/timeline">Timeline</a> feature in late September 2011. Here's mine, from 2011 back to 1981. It's so large I couldn't save it as one complete JPG image; instead it's in two parts. To get the full effect you can try viewing <a href="fb_timeline.tif">the full image</a>, which is a 28MB tif file (if you're not sure what that means, you don't want to click on it).</p>
    </section>
    
    <section>
      <figure>
        <figcaption>2011</figcaption>
      	<a href="fb_timeline_01.jpg" target="_blank" title="Open in new window"><img src="fb_timeline_01.jpg" alt="Facebook Timeline web page capture for the year 2011"></a>
      </figure>
      
      <figure>
        <figcaption>2010-1981</figcaption>
      	<a href="fb_timeline_02.jpg" target="_blank" title="Open in new window"><img src="fb_timeline_02.jpg" alt="Facebook Timeline web page capture for the years 2010-1981"></a>
      </figure>
    </section>
    
    <style>
    #facebooktimeline-main figure {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
    }
    </style>
  </div>
  <?php
}

$x = new Print_html();
$x->name = 'facebooktimeline';
$x->section = 'about';
$x->pageTitle = 'My Complete Facebook Timeline, All 30 Years';
$x->dirLevel = 1;

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