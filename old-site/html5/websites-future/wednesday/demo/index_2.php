<?php

$isDesktop = true;
# http://detectmobilebrowsers.com/
$useragent = $_SERVER['HTTP_USER_AGENT'];
if(preg_match('/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i',substr($useragent,0,4))) {
	#if (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|ipod|android|spider|googlebot)/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
	$isDesktop = false;
}

?>
<!--[if lt IE 8 ]><html lang="en" class="no-js oldie<?php if (!$isDesktop) { echo ' mobile'; } ?>"><![endif]-->
<!--[if IE 8 ]><html lang="en" class="no-js oldie ie8<?php if (!$isDesktop) { echo ' mobile'; } ?>"><![endif]-->
<!--[if IE 9 ]><html lang="en" class="no-js oldie ie9<?php if (!$isDesktop) { echo ' mobile'; } ?>"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html lang="en" class="no-js<?php if (!$isDesktop) { echo ' mobile'; } ?>"><!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title>Demo - Ticket Finder</title>
  <meta name="description" content="Demo of canvas, file reader api, and drag and drop">
  <meta name="author" content="Craig Patik">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <?php if ($isDesktop) { ?>
  <script src="http://use.typekit.net/tfz6xpv.js"></script>
  <script>try { Typekit.load(); } catch (e) { }</script>
  <?php } ?>
  <link rel="stylesheet" href="../../../min/?g=h5canvasdemocss">
  <script src="js/libs/modernizr.js"></script>
</head>
<body>
  <div id="container">
    <header>
			<h1>Worldwide Tech Conference</h1>
      <h2>Ticket Application</h2>
    </header>
    <div id="main" role="main">
			<section id="form-container">
      	<h3>Add a person</h3>
        <p class="dnd-available dnd-instructions">or drag and drop a tab-delimited text file containing that information</p>
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
            <a class="button add small" id="add-button" value="Add" tabindex="1">Add</a>
          </div>
        </form>
      </section>

      <section id="people" style="display:none;">
      	<h3>Attendees:</h3>
        <div><a class="button next" tabindex="1">Submit Application</a></div>
        <ul id="people-list"></ul>
      </section>

      <?php if ($isDesktop) { ?>
      <div id="map-container">
      	<canvas id="worldmap" height="420" width="744">
        	<div>Your browser must support <a href="http://en.wikipedia.org/wiki/Canvas_element"><code>canvas</code></a> to see this map.</div>
        </canvas>
      </div>
      <?php } ?>
    </div>
    <footer>

    </footer>
  </div><?php /* end div#container */ ?>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>')</script>
  <script src="../../../min/?g=h5canvasdemojs"></script>
  <?php if (!$isDesktop) { ?><script>demo.mobile = true;</script><?php } ?>
  <script>demo.init();</script>
  <script>
    var _gaq=[['_setAccount','UA-12082176-1'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>

  <!--[if lt IE 7 ]>
    <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
    <script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
  <![endif]-->
</body>
</html>
