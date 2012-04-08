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
    $title = 'Fixing WAV Volume';
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
  	<h2>How To Fix Volume Levels</h2>
    <p>Amplify those soft or quiet discs without losing quality<br/>Written by Mr. Sparkle</p>
    <p>Instructions for Cool Edit</p>
    
    <h3>Instructions</h3>
    <ol class="general">
      <li>Choose transform &gt; amplitude &gt; hard limiting</li>
      <li>Set &quot;Limit Max Amplitude&quot; to -.5 db</li>
      <li>Enter the amount of volume boost you want into the &quot;boost input&quot; box. I usually start with +3db. Play around with db values until you get it to the level you want.</li>
      <li>Normalize it to 98% when you are done.</li>
		</ol>
    
    <h2><a href="/guides/"><small>Return to Guides</small></a></h2>
    
EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}

?>
