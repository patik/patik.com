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
    $title = 'Alternative to MKW';
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
  	<h2>An Alternative to MKW</h2>
    <p>For Windows, Thanks to Freakmike3</p>

				<p>1. Create a folder on your C: drive called <tt>&quot;util&quot;</tt></p>
				<p>2. Create a folder on your C: drive called <tt>&quot;burning&quot;</tt></p>
				<p>3. Make sure there are copies of <tt>Shortn32.exe</tt> and <tt>md5sum.exe</tt> in the <tt>&quot;util&quot;</tt> folder you created.</p>
				<p>4. Create the following four batch files in notepad and put them all in the <tt>&quot;util&quot;</tt> folder you created:</p>
				<p>Name this file <tt>&quot;unshorten.bat&quot;</tt>:</p>

					<div class="codeblock">cls<br/>
						lfnfor on<br/>
						for %%f in (*.shn) do c:\util\shortn32.exe -x %%f c:\burning\%%f.wav<br/>
						lfnfor off
					</div>

				<p>Name this file <tt>&quot;shorten.bat&quot;:</tt></p>

				<div class="codeblock">
						cls<br/>
						lfnfor on<br/>
						for %%f in (*.wav) do c:\util\shortn32.exe %%f c:\burning\%%f.shn<br/>
						lfnfor off
					</div>

				<p>Name this file <tt>&quot;md5gen.bat&quot;</tt>:</p>

				<div class="codeblock">
						c:\util\md5sum 
						--binary *.shn &gt; &gt; ~NameMe~.md5
					</div>
			
            		<p>Name this file <tt>&quot;checksum.bat&quot;</tt>:</p>
            
				<div class="codeblock">
					cls<br/>
					lfnfor on<br/>
					for %%f in (*.md5) do c:\util\md5sum.exe --check %%f<br/>
					lfnfor off
				</div>

				<p>5. Open Windows Explorer and go to <tt>View &gt; Options &gt; File Types</tt> and click on &quot;New Type&quot; and enter into the Description of type field &quot;Shorten file&quot; and into the Associated extension field <tt>&quot;.shn&quot;</tt></p>

				<p>6. Create a &quot;New...&quot; action and call it &quot;Extract&quot;. Put <tt>&quot;c:\util\shortn32.exe&quot; -x &quot;%1&quot; &quot;%1.wav&quot;</tt> (WITH the quotes) into the &quot;application to perform action&quot; field. Click on <tt>&quot;Ok&quot;</tt>.</p>

				<p>7. Create a &quot;New...&quot; action and call it &quot;Extract all&quot;. Under &quot;application to perform action&quot;, browse to the file <tt>&quot;unshorten.bat&quot;</tt> you created. Click on <tt>&quot;Ok&quot;</tt>.</p>

				<p>8. Create a &quot;New...&quot; action and call it &quot;Generate MD5&quot;. Under &quot;application to perform action&quot;, browse to the file <tt>&quot;md5gen.bat&quot;</tt> you created. Click on <tt>&quot;Ok&quot;</tt>.</p>

				<p>9. Back in <tt>View&gt;Options&gt;File Types</tt>, again click on &quot;New Type&quot; and enter into the description of type field &quot;md5 checksum&quot; and into the associated extension field <tt>&quot;.md5&quot;</tt></p>

				<p>10. Create a &quot;New...&quot; action and call it &quot;check&quot;. Under &quot;application to perform action&quot;, browse to the file <tt>&quot;checksum.bat&quot;</tt> you created. Click on <tt>&quot;Ok&quot;</tt>.</p>

				<p>11. Find &quot;Wave sound&quot; (or something similar) on the list of registered file types and double click on it. Create a &quot;New...&quot; action and call it &quot;Shorten all&quot;. Under &quot;application to perform action&quot;, browse to the file <tt>&quot;shorten.bat&quot;</tt> you created. Click on <tt>&quot;Ok&quot;</tt>.</p>

				<p>12. Create a &quot;New...&quot; action and call it &quot;Shorten&quot;. Under &quot;application to perform action&quot;, type <tt>&quot;c:\util\shortn32.exe&quot; &quot;%1&quot; &quot;%1.shn&quot;</tt> (WITH the quotes). Click on <tt>&quot;Ok&quot;</tt>.</p>

				<p><strong>Ok, now your system is set up to do the following:</strong></p>
				<ol>
					<li>Right click on a .shn file on a CDROM disc (or anywhere for that matter) and 
					  choose <tt>&quot;Extract all&quot;</tt>. All the shorten files in the current 
					  directory will be sequentially extracted into <tt>.wav</tt> files in the <tt>c:\burning</tt> directory.</li>
					<li>Right click on a .shn file in a directory and choose &quot;Generate MD5&quot;. 
					  A file called <tt>&quot;~NameMe~.md5&quot;</tt> will be created in the c:\burning directory. Rename the file appropriately.</li>
					<li>Right click on an <tt>.md5</tt> file in a directory and choose &quot;check&quot;. A DOS window will 
					  open and md5sum will sequentially verify that all the <tt>.shn</tt> files in the directory match the <tt>.md5</tt> file.</li>
					<li>Simply double-click on any <tt>.shn</tt> file anywhere and it will decompress to a <tt>.wav</tt> file.</li>
					<li>Right click on a <tt>.wav</tt> file and choose <tt>&quot;Shorten&quot;</tt>. A <tt>.shn</tt> file will be created in the same directory.</li>
				</ol>
				<h2><a href="/guides/"><small>Return to Guides</small></a></h2>
    <div>&nbsp;</div>
    <div>&nbsp;</div>
EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}
  
  
?>

