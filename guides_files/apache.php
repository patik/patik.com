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
    $title = 'Apache HTTP Server';
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
  	<h2>Setting up Apache HTTP Server</h2>
    <p>For Windows, Apache version 1.3.24<br/>By <a href="mailto:craig@patik.com">Craig</a></p>
    
    <ol class="general">
    	<li><p>Download the Apache <a href="http://www.apache.org/dist/httpd/binaries/win32/">binary setup file</a> and install.</p></li>
      <li><p>All configuration is done in the file <tt>/conf/httpd.conf</tt>. Open this in Notepad or some other plain text editor. This file looks confusing at first, but there are only a few things to change. To make things easier, I have created a <a href="httpd.conf">template</a> for you to use.</p></li>
      <li><p>Find the first set of <tt>#######</tt> in the template. This is the option for setting the amount of connections that are allowed at once.</p>
					<div class="codeblock">ThreadsPerChild 30</div>
      </li>
      <li><p>Keep in mind that one person may use several connections at once (either by downloading different files at once or using a download accelerator). A good way to decide on this number is to take your total bandwidth and divide by the minimum amount you want a person to have. For example, I have a total of 1,250KB/s upstream, and I want everyone to get at least 40KB/s. 1,250/40 is approxiamately 30. Make sure to keep your units straight (8kb = 1KB).</p></li>
			<li><p>Scroll to the next set of <tt>#######</tt>. Put in your e-mail address. This will be linked to on the main page, and it doesn't matter if the e-mail address is correct (ie, you can put in &quot;address-at-domain-dot-com&quot;). Down just a little further is where you name your server (same exactness rules apply).</p>

					<div class="codeblock">
						ServerAdmin address@domain.com<br/><br/>
						ServerName 123.45.67.89
					</div>
          <p>or</p>
          <div class="codeblock">
						ServerName www.domain.com
					</div>
			</li>
      <li><p>Find the next section of <tt>#######</tt>. This is where you define which directories will be accessible to outside users. To add new directories, create a new <tt>&lt;Directory&gt; &lt;/Directory&gt;</tt> section. You may add as many as you wish.</p>

					<div class="codeblock">
						&lt;Directory 
						/&gt;<br/>
						Options 
						FollowSymLinks<br/>
						AllowOverride None<br/>
						&lt;/Directory&gt;
						<br/><br/>
						&lt;Directory 
						&quot;C:/Program Files/Apache/icons&quot;&gt;<br/>
						Options Indexes MultiViews<br/>
						AllowOverride None<br/>
						Order allow,deny<br/>
						Allow from all<br/>
						&lt;/Directory&gt;
					</div>

				<p>Leave the above part intact. Use the following examples to guide you.</p>

					<div class="codeblock">
						&lt;Directory 
						&quot;D:/SHN&quot;&gt;<br/>
						Options FollowSymLinks Indexes Multiviews<br/>
						IndexOptions FancyIndexing<br/>
						&lt;/Directory&gt;
					</div>

				<p>In this section, <tt>D:/SHN</tt> is the directory on my drive that I want to share. All subdirectories (ie, <tt>D:/SHN/dmb</tt> and <tt>D:/SHN/phish</tt>) are automatically shared. To add more folders, copy and paste that entire <tt>&lt;Directory&gt;</tt> block and change the <tt>D:/SHN</tt> to what you want. Be sure to use forward slashes, but no trailing slash.</p>

				<p>If you want the user to see an HTML file when they browse to that directory, you can include an <tt>index.html</tt> file, otherwise Apache will automatically generate a list of the directory's contents. You can play around with the other settings in each block to determine what contents are listed. It can be set to allow only certain types of files to be seen or downloaded, or allow/deny access to a specific user. The settings I have will allow all files to be seen and downloaded (but not changed or deleted). More info at <a href="http://httpd.apache.org">Apache.org</a>.</p>
			</li>
			<li><p>Scroll down a bit further to find the next set of <tt>#######</tt>. This is where we set our aliases. An alias is a folder name that outside users see; it is used to disguise the layout of the folders on your drive as well as make it easier to organize your files. Let's look at the example:</p>

					<div class="codeblock">
						Alias /icons/ &quot;C:/Program Files/Apache/icons/&quot;<br/>
						Alias /temp/ &quot;D:/temp/&quot;<br/>
						Alias /shn/ &quot;D:/SHN/&quot;
					</div>

				<p>Leave the icons alias there, and focus on the rest. According to this example, when someone browses or clicks to <tt>http://www.domain.com/shn/</tt> it will list the contents in my <tt>D:/SHN</tt> folder. Be sure to include the trailing slash (and make sure they're forward slashes). Keep in mind that these are case sensitive; if someone types in <tt>http://www.domain.com/sHN/</tt> it will not work. If you're concerned about case-sensitivity, you might want to do something like this:</p>

					<div class="codeblock">
						Alias /shn/ &quot;D:/SHN/&quot;<br/>
						Alias /SHN/ &quot;D:/SHN/&quot;
					</div>

				<p>so that either way, the user will find what they're looking for. You need only make one alias per directory, you don't need one for each subdirectory. Also, a directory will not be accessible by an outside user unless you make an alias for it.</p>
			</li>
			<li><p>You're done with the conf file. Now you'll need to create an <tt>index.html</tt> file, which will be the first thing your visitors will see whenthey come to your site. This file can have links to other html files or to your folders (using the appropriate alias!). Put this file in the <tt>/htdocs/</tt> folder, replacing the one that is there now.</p></li>
    </ol>
    
    <p>That's it! So why does Apache have to be so complicated? It's a very powerful and sophisticated program. It is, however, the best http server (it's used by 54% of all websites you visit, including many big-name sites). It takes up very little memory considering how much it handles, it's very fast, it's stable, and its possibilities are endless. Best of all, it's free and continuously being updated.</p>
    
    <h2><a href="/guides/"><small>Return to Guides</small></a></h2>
    
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
