<?php

$part = $_GET['part'];

switch($part) {
  case 'keywords':
    # Keywords
    $keywords = 'cd-r guides, guide, guides, binary, newsgroups, firewire, shn, server, etree';
    return $keywords;
    break;
  case 'title':
    # Document title
    $title = 'Guides &amp; Tutorials';
    return $title;
    break;
  case 'useScript':
    # Use script.js?
    return false;
    break;
  case 'pageCSS':
    # Page-specific CSS
    $css = '';
    return $css;
    break;
  case 'content':
    # Page content (everything that goes inside div#mainBody
    $content = <<<EOTEOTEOT
  	<h2>How-To Guides for CDR &amp; SHN/FLAC Traders</h2>
    
    <h3>Web</h3>
    <ul class="general">
    	<li><a href="/guides/apache/" title="Just a few easy steps">Setting up Apache to run a file server</a></li>
    	<!--<li><a href="html" title="Also a handy reference sheet">Basic HTML Tutorial</a></li>
    	<li><a href="/guides/css/" title="Also a handy reference sheet">Basic CSS Tutorial</a></li>-->
    	<li><a href="/guides/binaries/" title="A useful tool">Downloading From Binary Newsgroups</a></li>
		</ul>
    
    <h3>Audio</h3>
    <ul class="general">
    	<li><a href="/guides/fixtao/" title="Why aren't you trading in FLAC?">Fixing TAO discs (getting rid of two-second gaps)</a></li>
    	<!--<li><a href="/guides/altmkw/" title="Right-click menu alternatives">Alternative to MKW for SHNs</a></li>-->
    	<li><a href="/guides/volume/" title="Or just get bigger speakers">Adjusting the Volume on a WAV File</a></li>
		</ul>
    
    <h3>Other</h3>
    <ul class="general">
    	<li><a href="/guides/bp/" title="Etiquette is good to have">CD-R B+P Instructions</a></li>
    	<li><a href="http://www.videohelp.com/" title="Play movies in your DVD player">Making DVDs from any video source</a></li>
    	<li><a href="/guides/eacfirewire/" title="It shouldn't be this tricky">Using a Firewire Drive with Exact Audio Copy</a></li>
    </ul>
    
    <h2>Other Links</h2>
    <ul class="linkList">
      <li>Guides</li>
      <li><a href="/software/">Software</a></li>
      <li><a href="/about/">Contact Me</a></li>
    </ul>

EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}

?>
