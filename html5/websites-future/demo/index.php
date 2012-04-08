<?php
# require_once('../../inc/html.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div class="container">
    <div id="main" role="main">
      <script src="js/libs/modernizr.js"></script>
      <h1>Worldwide Tech Conference</h1>
      <h2>Ticket Application</h2>
      <section id="form-container">
        <h3>Add a person</h3>
        <form id="add-person" method="get" action=".">
          <div>
            <label for="add-first-name"><span class="visuallyhidden">first </span>Name:</label>
            <input type="text" id="add-first-name" placeholder="First" tabindex="1" pattern="^\w[\w\s\.]+$">
            <label for="add-last-name" class="visuallyhidden">last name</label>
            <input type="text" id="add-last-name" placeholder="Last" tabindex="1" pattern="^\w[\w\s\.]+$">
          </div>
          <div class="add-location-container">
            <label for="add-location">Location:</label>
            <input type="text" id="add-location" data-placeholder="Address or city" placeholder="Address or City" tabindex="1">
          </div>
           <div class="add-distance-container">
            <label for="add-distance">Distance you're willing travel:</label>
            <input type="number" id="add-distance" placeholder="100" tabindex="1" size="4">
          </div>
          <div>
            <label for="add-tickets">Number of tickets:</label>
            <input type="number" id="add-tickets" placeholder="2" tabindex="1" size="2">
            <a class="btn add" id="add-button" value="Add" tabindex="1">Add</a>
          </div>
        </form>
        <?php if ($isDesktop) { ?>
        <div class="upload-instructions">
          <p>Need to upload in bulk? <span class="has-dnd" style="display:none;">Just drag and drop a tab-delimited text file</span>
          <label class="no-dnd" for="file-upload">Upload a tab-delimited text file</label>
          <input type="file" id="file-upload" class="no-dnd">
          </p>
        </div>
        <?php } ?>
      </section>

      <section id="people" style="display:none;">
        <h3>Attendees:</h3>
        <div><a class="button next" tabindex="1">Submit Application</a></div>
        <ul id="people-list"></ul>
      </section>

      <div id="map-container">
        <canvas id="worldmap" height="420" width="744">
          <div>Your browser must support <a href="http://en.wikipedia.org/wiki/Canvas_element"><code>canvas</code></a> to see this map.</div>
        </canvas>
      </div>
    </div>
    <footer>

    </footer>
  </div><?php /* end div#container

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>')</script>*/ ?>
  <script src="js/libs/worldmap.js"></script>
  <script src="js/libs/raphael.min.js"></script>
  <script src="js/plugins.js"></script>
  <script src="js/script.js"></script>
  <script>demo.init();</script>
  <!--[if lt IE 7 ]>
    <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
    <script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
  <![endif]-->
 <?php
}

$x = new Print_html();
$x->name = 'websites-future-demo';
$x->section = 'html5';
$x->pageTitle = 'Demo - Ticket Finder';
$x->keywords = 'file reader, canvas, web sockets, drag and drop, html5, css3';
$x->dirLevel = 3;
$x->styleSheets = array('css/style.css',); # 'lib/css/smoothness/jquery-ui-1.8.7.custom.css');

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
