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
    $title = 'All About B+Ps';
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
  	<h2>All About B+Ps</h2>
    <p>A simpler, cheaper way of obtaining shows by B+P</p>
    
    <h3>What is a B+P?</h3>
    <p>B+P stands for blanks and postage. The general method is to send someone blank CD-Rs, a return envelope and postage, and they will burn the show for you and send it back. This way no one profits, and the music is spread.</p>
    
    <h3>Find a B+P offer.</h3>
    <p>Oftentimes on message boards and newsgroups, people will make a B+P offer. It will generall say &quot;B+P of MM/DD/YY&quot; in the subject, and the body will describe what show(s) is/are available, and how many people can get in on it. Usually you must respond to the person (by private e-mail, not as a reply on the messageboard!) and they will get back to you if you made it. Only a limited number of people, usually 5-10, can win each B+P. Try to make your e-mail something interesting; instead of saying &quot;did I make it?&quot;, tell a short band-related story and how much you appreciate the offer.</p>
    
    <h3>Here's what to send:</h3>
    <ol class="general">
      <li><strong>A return envelope.</strong> It should be a bubble envelope, not padded. It must have your address written on it, plus enough postage to get it back to you. Please use stamps, not meters. Canadians and other international people should affix American postage, or else send cash.</li>
			<li><strong>A note</strong> with the following: your e-mail address, the show(s) are receiving, and a short thank-you.</li>
			<li><strong>The appropriate amount of discs.</strong> If the B+Per has any guidelines about certain brands, please adhere to them. Put the discs in sleeves, as jewel cases raise shipping prices and are likely to break.</li>
			<li><strong>An outer envelope.</strong> This can be very flimsy and light, no padding needed. Just use a standard manilla business envelope.</li>
		</ol>
    
    <h2><a href="/guides/"><small>Return to Guides</small></a></h2>
EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}

?>
