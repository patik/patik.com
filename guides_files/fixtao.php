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
    $title = 'Fixing TAO Discs';
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
  	<h2>How To Fix TAO Discs</h2>
    <p>Remove those annoying two-second gaps and make your discs tradable!<br/>Written by <a href="http://groups.google.com/groups?selm=O3JL6.1523%24Az.124652%40newsread2.prod.itd.earthlink.net">Gilly</a></p>
    
    <h3>Instructions</h3>
    <ol class="general">
      <li>Download Feurio! right now: <a href="http://www.feurio.com/English/index.shtml">http://www.feurio.com/English/index.shtml</a></li>
      <li>Create a new project, with the setting &quot;round track markers&quot;.</li>
      <li>When you rip the CD to hard drive: click the MORE OPTIONS button to display the four &quot;kill digital silence at end of track&quot; type options.</li>
      <li>You want to rip the CD *without* linking the tracks.</li>
      <li>Check all four &quot;kill digital [analog] silence at end [start] of tracks&quot; boxes.</li>
      <li>After the CD's been ripped to the hard drive, LINK the tracks together.</li>
      <li>Burn it!</li>
      <li>Listen to your new 100% flawless track transitioned disc!</li>
      <li>Give away your old TAO disc to a newbie for free (on the condition he or she will NOT trade it).</li>
		</ol>
    
    <h3>Explanation</h3>
    <p>I've fixed about ten TAO shows (30 discs) in 3 months with Feurio and/or CDWav, all are perfect now. Here's why:</p>
    <p>Feurio does an unbelievable job eliminating the gaps because it automatically rounds the track markers so they're exactly on sector boundaries. As I understand it, the data on CDs is written over thousands (millions?) of sectors. Those little blips you here between tracks sometimes, when burned with other software, occur because the burning software inserts a track marker without concern for the sector boundaries... so it has to fill the miniscule gap between the track marker and the sector boundary with silence (albeit .01 or .02 seconds -- it makes a blip).</p>
    <p>Now, unfortunately, sometimes when a TAO disc is burned DAO, the track markers are shifted onto sector boundaries, and the silence does not start/end exactly on a track marker. There could be a shift of several hundreths of a second. Point being: the &quot;kill digital silence at end (or start) of track&quot; feature of Feurio doesn't work (because the silence isn't really at the end of the track). It would be easier to explain w/ a graphic, but just take my word for it.</p>
    <p>So, if Feurio can't fix your gap-laden CDs, you'll need to rip it as one huge WAV (done with tracks linked in Feurio), and then open that enormous WAV in CDWav. Then, you can find the flat-lines on the wav, and &quot;cut&quot; the wav at the start and end of the flat-line. Flat-line = silence = 2 second gap. I've noticed that the gaps are actually 2.01 seconds, so cut accordingly.</p>
    <p><strong>So in summary:</strong> Download Feurio (it's FREE). Trust me, it works FLAWLESSLY. I've listened to my reburned [repaired] shows with headphones and very high volume, and there is absolutely no blip or gap between tracks.</p>
    
    <h2><a href="../guides/"><small>Return to Guides</small></a></h2>
    
EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}

?>
