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
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8">
    <title><?php if (!empty($this->pageTitle)) { echo $this->pageTitle . ' - '; } ?>Patik.com</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <?php if (!empty($this->keywords)) { ?>
    <meta name="keywords" content="<?php echo $this->keywords; ?>">
    <?php } ?>
    <meta name="author" content="Craig Patik">
    <meta name="description" content="Craig Patik's homepage &mdash; travel logs &amp; photos, and web design &amp; development">
    <?php /* for adaptive images */ ?>
    <script>document.cookie='resolution='+Math.max(screen.width,screen.height)+("devicePixelRatio" in window ? ","+devicePixelRatio : ",1")+'; path=/';</script>
    <script src="http://use.typekit.com/xlw2lhp.js"></script>
    <script>try { Typekit.load(); } catch(e) {}</script>
  <?php
    }
  ?>
    <link rel="stylesheet" href="<?php $this->print_dir_level(); ?>css/style.css">
    <?php if (!empty($this->styleSheets) && is_array($this->styleSheets)) {
            foreach ($this->styleSheets as $ss) { ?>
    <link rel="stylesheet" media="all" href="<?php echo $ss; ?>">
    <?php }
          }
    ?>
    <script src="<?php $this->print_dir_level(); ?>js/vendor/custom.modernizr.js"></script>
</head>
<body>
    <nav class="top-bar">
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
                        <li><a href="<?php $this->print_dir_level(); ?>travel/britain-benelux/">Britian &amp; Benelux</a></li>
                        <li><a href="<?php $this->print_dir_level(); ?>travel/peru-argentina/">Peru &amp; Argentina</a></li>
                        <li><a href="<?php $this->print_dir_level(); ?>travel/spain/">Spain</a></li>
                        <li><a href="<?php $this->print_dir_level(); ?>travel/turkey/">Turkey</a></li>
                        <li><a href="<?php $this->print_dir_level(); ?>travel/germany/">Germany &amp; Austria</a></li>
                        <li><a href="<?php $this->print_dir_level(); ?>travel/greece/">Greece</a></li>
                        <li><a href="<?php $this->print_dir_level(); ?>travel/paris/">Paris</a></li>
                        <li><a href="<?php $this->print_dir_level(); ?>travel/france/">France</a></li>
                      </ul>
                    </li>
                    <li><a href="<?php $this->print_dir_level(); ?>code/"<?php if ($this->section === 'code') { echo ' class="active"'; } ?>>Code</a></li>
                    <li><a href="http://picasaweb.google.com/cpatik">Photos</a></li>
                    <li><a href="<?php $this->print_dir_level(); ?>about/"<?php if ($this->section === 'about') { echo ' class="active"'; } ?>>About</a></li>
                  </ul>
                </div><!-- /.nav-collapse -->
            </div>
        </div><!-- /navbar-inner -->
    </nav>

  <div id="main" class="container">
    <?php
  }

  public function print_page_end()
  {
    ?>
  </div>
<script src="<?php $this->print_dir_level(); ?>js/vendor/jquery.js"></script>
<script src="<?php $this->print_dir_level(); ?>js/vendor/fastclick.js"></script>
<script src="<?php $this->print_dir_level(); ?>js/foundation/foundation.js"></script>
<script src="<?php $this->print_dir_level(); ?>js/foundation/topbar.js"></script>
<script src="<?php $this->print_dir_level(); ?>min?g=js"></script>
<script>
<?php
if (!empty($this->preload)) {
    foreach ($this->preload as $html) {
        echo "patik.preload('$html');\n";
    }
}
?>
    $(document).foundation();
    $(document).ready(function() { patik.init(); });
</script>
<?php
    if (!empty($this->scriptFiles) && is_array($this->scriptFiles)) {
        foreach ($this->scriptFiles as $ss) {
            echo '<script src="$ss;"></script>';
        }
    }

    # Pages with specalized analytics code (e.g., error pages), for desktop only
    if (!$this->noAnalytics) {
        echo '<script src="' . $this->print_dir_level() . 'js/ga.js"></script>';
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
