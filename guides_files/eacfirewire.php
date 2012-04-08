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
    $title = 'EAC with Firewire';
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
  	<h2>How To Use EAC With a Firewire Drive</h2>
    <p>For Windows 2000 and XP, possibly others<br/>By <a href="mailto:craig@patik.com">Craig</a></p>
    
    <h3>Instructions</h3>
    <ol class="general">
      <li>Open <tt>C:\Windows\System32</tt> and find <tt>Wnaspi32.dll</tt>. Make a backup of this file.</li>
			<li>Download this file: <a href="Wnaspi32.dll">Wnaspi32.dll</a> <tt>[169KB]</tt> and put it in that directory.</li>
			<li>Open Exact Audio Copy, click on the <tt>EAC</tt> menu, and select <tt>EAC Options</tt>. Find the Interface tab, and choose <tt>Installed External ASPI Interface</tt>.</li>
			<li>This should solve the Firewire problem. For more information on setting up EAC, read the <a href="http://www.ping.be/satcp/eac01.htm">EAC Tutorial</a>.</li>
		</ol>
    
    <h2><a href="/guides/"><small>Return to Guides</small></a></h2>
    
EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}

?>
