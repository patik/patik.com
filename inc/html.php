<?php

class Print_html
{
  public $page;
  public $section;
  public $pageTitle;
  public $keywords;
  public $redirect;
  public $dirLevel;
  public $styleSheets;
  public $scriptFiles;
  public $preload;
  public $useragent;
  public $jQueryVersion;
  public $isMobile;
  public $noAnalytics;

  public function __construct()
  {
    $this->useragent = '';
    $this->page = 'home';
    $this->section = 'home';
    $this->pageTitle = '';
    $this->keywords = '';
    $this->redirect = false;
    $this->dirLevel = 0;
    $this->styleSheets = array();
    $this->scriptFiles = array();
    $this->preload = array();
    $this->jQueryVersion = '1.7.2';
    $this->isMobile = false;
    $this->isTablet = false;
    $this->noAnalytics = false;
  }

  # Print the appropriate number of ../../ for relative links
  public function print_dir_level()
  {
    if ($this->section === 'error') {
      echo '/';
    }
    else {
      $lev = $this->dirLevel;
      $path = '';
      while ($lev > 0) {
        $path .= '../';
        $lev--;
      }
      echo strlen($path) > 0 ? $path : '';
    }
  }

  public function print_page_begin()
  {
    # http://detectmobilebrowsers.com/
    if (preg_match('/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$this->useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i',substr($this->useragent,0,4))) {
      #if (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|ipod|android|spider|googlebot)/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
      $this->isMobile = true;
    }
    # Check for tablets (for now, just iPad and Android !mobile)
    if (preg_match('/ipad/i', $this->useragent) || (preg_match('/android/i', $this->useragent) && !preg_match('/mobidle/i', $this->useragent))) {
      $this->isTablet = true;
    }

    $htmlTagClass = "no-js";
    if ($this->isMobile || $this->isTablet) {
      $htmlTagClass .= " touch";
    }

    ?>
<!doctype html>
<html lang="en" class="<?php echo $htmlTagClass; ?>">
<head>
  <meta charset="utf-8">
  <?php /* if ($this->redirect) { echo '<script src="' . $this->print_dir_level() . 'js/redirect.js"></script>'; } */ ?>
  <title><?php if (!empty($this->pageTitle)) { echo $this->pageTitle . ' - '; } ?>Patik.com</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
<?php if (!empty($this->keywords)) { ?>
  <meta name="keywords" content="<?php echo $this->keywords; ?>">
<?php } ?>
  <meta name="author" content="Craig Patik">
  <meta name="description" content="Craig Patik's homepage &mdash; travel logs &amp; photos, and web design &amp; development">
<?php /* for adaptive images */ ?>
<script>document.cookie='resolution='+Math.max(screen.width,screen.height)+'; path=/';</script><?php /*
old version:
  <script>var device_width=screen.width;var device_height=screen.height;if(device_width>device_height){ai_width=device_width;}else{ai_width=device_height;} document.cookie='resolution='+ai_width+'; expires=; path=/';</script>*/ ?>
<?php
if (!$this->isMobile || $this->isTablet) {
  # Load Typekit fonts only for desktop & tablet due to download size and rendering overhead
  # Hide text while Typekit fonts are loading
  $tkTags = array('h1','h2','h3','input','a','p','li');
  $tkLoadingCSS = array();
  $tkLoadedCSS = array();
  $tkFailedCSS = array();
  foreach ($tkTags as $t) {
    $tkLoadingCSS[] = ".wf-loading " . $t . ", " . $t;
    $tkLoadedCSS[]  = ".wf-inactive " . $t . ", .wf-active " . $t;
    $tkFailedCSS[]  = $t;
  }
  echo "<style>\n" . implode(', ', $tkLoadingCSS) . " { visibility: hidden; }\n</style>\n";
  echo "<style>\n" . implode(', ', $tkLoadedCSS) . " { visibility: visible; }\n</style>\n";
?>
  <script src="http://use.typekit.com/xlw2lhp.js"></script>
  <script>try {
    Typekit.load(); } catch(e) { <?php /* If Typekit fails, reveal the text */ ?>
      window.insertCss = '<?php echo implode(', ', $tkFailedCSS) . " { visibility: visible !important; }"; ?>';
    }
  </script>
<?php
}
?>
  <?php /*<!--[if lte IE 8]><link rel="stylesheet" href="<?php $this->print_dir_level(); ?>min/?g=cssie"><![endif]-->
  <!--[if (gte IE 9)|!(IE)]><!--><link rel="stylesheet" href="<?php $this->print_dir_level(); ?>min/?g=css"><!--<![endif]-->*/ ?>
  <?php /*<link rel="stylesheet" href="<?php $this->print_dir_level(); ?>css/libs/bootstrap.css">*/ ?>
  <link rel="stylesheet" href="<?php $this->print_dir_level(); ?>css/style.css">
  <?php if (!empty($this->styleSheets) && is_array($this->styleSheets)) {
          foreach ($this->styleSheets as $ss) { ?>
  <link rel="stylesheet" media="all" href="<?php echo $ss; ?>">
  <?php   }
        } ?>
  <script src="<?php $this->print_dir_level(); ?>js/libs/modernizr.min.js"></script>
</head>
<body>
  <div class="navbar"><?php /* navbar-fixed-top */ ?>
    <div class="navbar-inner">
      <div class="container">
        <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>
        <a class="brand" href="/">Patik.com</a>
        <div class="nav-collapse">
          <ul class="nav pull-right">
            <!-- <li class="<?php if ($this->section === 'home') { echo 'active'; } ?>"><a href="#">Home</a></li> -->
            <li class="dropdown">
              <a href="#" class="dropdown-toggle<?php if ($this->section === 'travel') { echo ' active'; } ?>" data-toggle="dropdown">Travel <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="<?php $this->print_dir_level(); ?>travel/">All Travels</a></li>
                <li class="divider"></li>
                <li><a href="<?php $this->print_dir_level(); ?>travel/peru-argentina/">Peru &amp; Argentina</a></li>
                <li><a href="<?php $this->print_dir_level(); ?>travel/spain/">Spain</a></li>
                <li><a href="<?php $this->print_dir_level(); ?>travel/turkey/">Turkey</a></li>
                <li><a href="<?php $this->print_dir_level(); ?>travel/germany/">Germany &amp; Austria</a></li>
                <li><a href="<?php $this->print_dir_level(); ?>travel/greece/">Greece</a></li>
                <li><a href="<?php $this->print_dir_level(); ?>travel/paris/">Paris</a></li>
                <li><a href="<?php $this->print_dir_level(); ?>travel/france/">France</a></li>
                <li class="divider"></li>
                <li><a href="<?php $this->print_dir_level(); ?>travel/britain-benelux/">Britian &amp; Benelux</a></li>
              </ul>
            </li>
            <li><a href="<?php $this->print_dir_level(); ?>code/"<?php if ($this->section === 'code') { echo ' class="active"'; } ?>>Code</a></li>
            <li><a href="http://picasaweb.google.com/cpatik">Photos</a></li>
            <li><a href="<?php $this->print_dir_level(); ?>about/"<?php if ($this->section === 'about') { echo ' class="active"'; } ?>>About</a></li>
          </ul>
        </div><!-- /.nav-collapse -->
      </div>
    </div><!-- /navbar-inner -->
  </div>

  <div id="main" class="container">
    <?php
  }

  public function print_page_end()
  {
    ?>
  </div>
<script>
yepnope([
  {
    load: 'http://ajax.googleapis.com/ajax/libs/jquery/<?php echo $this->jQueryVersion; ?>/jquery.min.js',
    complete: function () {
      if (!window.jQuery) {
        yepnope('<?php $this->print_dir_level(); ?>js/libs/jquery.min.js');
      }
      yepnope([
        {
          load: ['<?php $this->print_dir_level(); ?>min?g=js'],
          complete: function () {
            <?php
            if (!empty($this->preload)) {
              foreach ($this->preload as $html) {
                echo "patik.preload.add('$html');\n";
              }
            }
            ?>
            $(document).ready(function() { patik.init(); });
          }
        }
      ]);
    }
  },
<?php
if (!empty($this->scriptFiles) && is_array($this->scriptFiles)) {
  foreach ($this->scriptFiles as $ss) { ?>
  {
    load: '<?php echo $ss; ?>'
  },
<?php
  }
}
# Pages with specalized analytics code (e.g., error pages), for desktop only
if (!$this->noAnalytics && !$this->isMobile) {
?>
  {
    load: '<?php $this->print_dir_level(); ?>js/ga.js'
  }
<?php
}
?>
]);
</script>
<?php
# Mobile analytics code
if (!$this->noAnalytics && ($this->isMobile || $this->isTablet)) {
	function googleAnalyticsGetImageUrl() {
		$url  = "/inc/gam.php?utmac=MO-12082176-1&utmn=" . rand(0, 0x7fffffff);
		$referer = $_SERVER["HTTP_REFERER"];
		$query = $_SERVER["QUERY_STRING"];
		$path = $_SERVER["REQUEST_URI"];

		if (empty($referer)) {
			$referer = "-";
		}
		$url .= "&utmr=" . urlencode($referer);

		if (!empty($path)) {
			$url .= "&utmp=" . urlencode($path);
		}

		$url .= "&guid=ON";

		return $url;
	}

	echo '<img src="' . googleAnalyticsGetImageUrl(). '">';
}
?>
</body>
</html>
    <?php
  }

  public function print_full_page($body_function = '')
  {
    if (!$body_function) {
      $body_function = 'print_page_body';
    }
    $this->print_page_begin();
    $body_function();
    $this->print_page_end();
  }
}

?>
