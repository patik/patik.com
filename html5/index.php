<?php
# require_once('../inc/html.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="html5-main" role="main">

    <section>
      <h1>Presentations</h1>
      <ul>
        <li><a href="websites-future/">September 15, 2011: Web Sites of the Future</a></li>
        <li><a href="html5-css3/">January 7, 2011: HTML5 &amp; CSS3</a></li>
      </ul>
    </section>

    <section>
      <h2>Relevant Links</h2>
      <ul>
        <li>Current browser support for new technologies: <a href="http://caniuse.com">caniuse.com</a>, <a href="http://quirksmode.org/css/contents.html">quirksmode.org/css/contents.html</a></li>
        <li>Detailed default page structure: <a href="http://html5boilerplate.com">html5boilerplate.com</a></li>
        <li>Do web sites need to look exactly the same in every browser? <a href="http://dowebsitesneedtolookexactlythesameineverybrowser.com/">Answer</a>. <a href="http://paulirish.com/2011/tiered-adaptive-front-end-experiences/">Here's why.</a></li>
        <li>Intros, demos, and easy-to-read documentation: <a href="http://html5rocks.com">html5rocks.com</a>, <a href="http://html5doctor.com">html5doctor.com</a></li>
      </ul>
    </section>

  </div>
  <?php
}

$x = new Print_html();
$x->name = 'html5';
$x->section = 'html5';
$x->pageTitle = 'HTML5';
$x->keywords = 'html5, css3, javascript';
$x->dirLevel = 1;
$x->useragent = $_SERVER['HTTP_USER_AGENT'];

# ajax request
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || !empty($_GET['return'])) {
	print_page_body();
  exit();
}
# navigated directly
else {
	$x->redirect = true;
}

$x->print_full_page();

?>
