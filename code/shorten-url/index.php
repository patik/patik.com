<?php

function shortenURL($url = '')
{
  if (empty($url)) { return ''; }
  $short_url = '';
  $u = "http://api.bit.ly/v3/shorten";
	$post_string = "longUrl=" . urlencode($url) . "&login=ellsass&apiKey=R_7bfa0b4961592471dfb21849ed30ec98&format=json&history=1";

	# Call the bit.ly API
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $u);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post_string);
	$json = curl_exec($ch);
	curl_close($ch);

  # Extract the shortened URL (see example at the end of this file)
  $response = json_decode($json);
	if ($response->status_code === 200) {
		$short_url = $response->data->url;
	}

  if (empty($short_url)) {
    @mail('cpatik@gmail.com','bitly json',$json);
  }

  return $short_url;
}

# Get input
$long_url = trim($_GET['url']);
$callback = trim($_GET['cb']);

# Defaults
$ajax_response = 'try{console.log("Something went wrong.");}catch(e){}';
$short_url = "";
if (!empty($long_url)) {
  $short_url = shortenURL($long_url);
}

# XSS request
if (!empty($callback)) {
  # Defaults
  header("Content-Type: text/javascript");
  $ajax_response = '{"okay":false, "short_url":"", "long_url":"", "message":"Something went wrong."}';
  if (empty($short_url)) {
    # Create response with the bad news
    $ajax_response  = 'try { ' . $callback . '(';
    $ajax_response .= '{"okay": false, "short_url":"", "long_url":"' . addslashes($long_url) . '", "message":"Could not shorten the URL [' . addslashes($long_url) . ']"}';
    $ajax_response .= '); } catch(e) { }';
  }
  else {
    $ajax_response  = 'try { ' . $callback . '(';
    $ajax_response .= '{"okay": true, "short_url":"' . addslashes($short_url) . '", "long_url":"' . addslashes($long_url) . '", "message":"Successfully shortened"}';
    $ajax_response .= '); } catch(e) { }';
  }

  # Output result
  echo $ajax_response;
	exit();
}

# Direct (HTTP) request, show info page
else {
  header("Content-Type: text/html");
  $bm = "(function(){var%20d=document,s=d.createElement('script');s.src='http://patik.com/code/shorten-url/shorten-url.js';document.getElementsByTagName('head')[0].appendChild(s);})();void(0);";
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
	<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
  <title>Simple URL Shortener - Patik.com</title>
  <script src="http://use.typekit.net/tfz6xpv.js"></script>
  <script>try { Typekit.load(); } catch (e) { }</script>
  <style>
    html { font-size: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
    body { font-size: 16px; line-height: 1.25; max-width: 960px; margin: 1em auto; }
    body, input { color: #444; font-family: ff-tisa-web-pro-1, ff-tisa-web-pro-2, Palatino Linotype, Palatino, serif; }
    h1, h2 { font-weight: bold; font-weight: 700; font-family: ff-masala-web-pro-1, ff-masala-web-pro-2, Calibri, Trebuchet, Helvetica, sans-serif; }
    header, section { display: block; margin-bottom: 1em; }
    img { max-width: 100%; height: auto; }
    .bm, .bm:visited, .bm:link { display: inline-block; padding: 0.25em; border: 1px solid #0069d2; color: #0069d2; background-color: rgba(0,105,210,0.3); }
    .bm:hover, .bm:focus, .bm:active { display: inline-block; padding: 0.25em; border: 1px solid #0069d2; color: white; background-color: rgba(0,105,210,0.8); }
  </style>
</head>
<body>
  <header>
    <h1>Simple URL Shortener</h1>
  </header>
  <section id="instructions">
    <h2>Info</h2>
    <p>Bookmarklet: <a class="bm" href="javascript:<?php echo $bm; ?>">Shorten</a></p>
  </section>
  <?php if (!empty($short_url)) { ?>
    <section id="result">
      <h2>Results</h2>
      <p>Given URL: <tt><a href="<?php echo $long_url; ?>"><?php echo $long_url; ?></a></tt></p>
      <p>Result: <input type="url" size="<?php echo strval(strlen($short_url)+2); ?>" value="<?php echo $short_url; ?>"></p>
    </section>
  <?php } ?>
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
<?php
}

/*
Example response:

{
    "status_code": 200,
    "data": {
        "url": "http://bit.ly/cmeH01",
        "hash": "cmeH01",
        "global_hash": "1YKMfY",
        "long_url": "http://betaworks.com/",
        "new_hash": 0
    },
    "status_txt": "OK"
}

<?xml version="1.0" encoding="UTF-8"?>
<response>
    <status_code>200</status_code>
    <status_txt>OK</status_txt>
    <data>
        <url>http://bit.ly/cmeH01</url>
        <hash>cmeH01</hash>
        <global_hash>1YKMfY</global_hash>
        <long_url>http://betaworks.com/</long_url>
        <new_hash>0</new_hash>
    </data>
</response>
*/

?>
