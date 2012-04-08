<?php

$part = $_GET['part'];

switch($part) {
  case 'keywords':
    # Keywords
    $keywords = 'cd-r guides, guide, guides, binary, newsgroups, xnews, firewire, shn, server, etree';
    return $keywords;
    break;
  case 'title':
    # Document title
    $title = 'Using Usenet Newsgroups';
    return $title;
    break;
  case 'useScript':
    # Use script.js?
    return false;
    break;
  case 'pageCSS':
    # Page-specific CSS
    $css = <<<EOTEOTEOT
    div.bin {
			text-align: center;
			padding: 10px;
		}
		
		table.text td.step {
			width: 100%;
			background-color: white;
			padding-top: 10px;
		}
		
		table.text td.stepalt {
			width: 100%;
			background-color: #ECEDFF;
			padding-top: 10px;
		}
		
		span.link {
			padding: 0px 1px 0px 1px;
			border-style: solid;
			border-width: 1px 2px 2px 1px;
			background: #ECEDFF;  /* #F4F5FF */
			color: black;
			border-color: #B9B9B9;
			-moz-border-radius: 2px;
		}
		
		span.smallLink {
			font-size: smaller;
		}
		
		p {
			line-height: 1.6em;
		}
		
		p.stepnumber {
			font-weight: bold;
			color: navy;
			font-size: x-large;
			padding-top: 20px;
		}
EOTEOTEOT;
    return $css;
    break;
  case 'content':
    # Page content (everything that goes inside div#mainBody
    $content = <<<EOTEOTEOT
  	<div class="tablecenter">
<div class="main">
<div class="tablecenter">


	<div class="banner">
		<a href="../"><img src="../logo.png" style="border:none;" alt="Patik.com" title="Patik.com" /></a>
	</div>

	<br/>
	<br/>

	<table class="text">
		<tr>
			<th>How To Read Usenet Newsgroups For Free</th>
		</tr>
		<tr>
			<td>
				<div class="pageTitle"><span class="subTitle">By <a href="mailto:craig@patik.com">Craig</a></span></div>

				<br/>
				<br/>
			</td>
		</tr>
		<tr>
			<td class="stepalt">
				<p class="stepnumber">Step 1.</p>
				<p>To read newsgroups you will need a news server.</p>
				<p>A free one is <a href="http://news.aioe.org/">Aioe.org</a>. No registration is required, and you are limited to 25 posts per day. The server address, which you will need later if you choose to use Aioe, is <tt>news.aioe.org</tt></p>
				<p>If you have a broadband connection, such as a cable or DSL modem, your service provider likely offers one for free. Below are some popular ISPs and their news server addresses (you'll need this address later).</p>
				<ul>
					<li><b>Comcast</b>: <tt>newsgroups.comcast.net</tt> <span class="smallLink">(<a href="http://faq.comcast.net/faq/query.jsp?name=Newsgroups">more info</a>)</span></li>
					<li><b>AOL</b>: no server available.</li>
					<li><b>Road Runner</b>: depends on your location. Check <a href="http://www.rr.com/">their website</a> for your area's server address.</li>
					<li><b>Charter</b>: <tt>nntp.charter.net</tt> <span class="smallLink">(<a href="http://support2.charter.com/support/asp/contentredirect.asp?sprt_cid=dcdae69f-3ffe-4430-967c-c65cc3a181a2">more info</a>)</span></li>
					<li><b>Verizon</b>: <tt>news.verizon.net</tt> <span class="smallLink">(<a href="http://www2.verizon.net/contact/news.asp">more info</a>)</span></li>
					<li><b>Earthlink</b>: <tt>news.east.earthlink.net</tt> or <tt>news.west.earthlink.net</tt> <span class="smallLink">(<a href="http://support.earthlink.net/mu/1/psc/img/walkthroughs/other/landingpage/8532.psc.html">more info</a>)</span></li>
					<li><b>SBC</b>: depends on your location. Check <a href="http://help.sbcglobal.net/article.php?item=387">here</a> for your server's address.</li>
				</ul>
				<p>You can find a more detailed list <a href="http://www.newsbin.com/ISP.htm">here</a>.</p>
				<p>Alternatively you may pay for a news server. One cheap option is <a href="http://news.astraweb.com/">Astraweb</a> which will offer you enough usage for literally 80 years for a one-time fee of $10. If you choose this, sign up the <a href="http://news.astraweb.com/downloadplans.html">25GB "Pay-by-Download Plan"</a>, not one of the monthly options. Your news server address will be <tt>news.astraweb.com</tt></p>
			</td>
		</tr>
		<tr>
			<td class="step">
				<p class="stepnumber">Step 2.</p>
				<p>You will need to download a news reader. I recommend <a href="http://www.mozilla.org/products/thunderbird/">Mozilla Thunderbird</a>, which is simple and easy to use. It is also free.
				
				<ul>
					<li><span class="link"><a href="http://download.mozilla.org/?product=thunderbird&amp;os=win&amp;lang=en-US">Download for Windows</a></span><br/><br/></li>
					<li><span class="link"><a href="http://download.mozilla.org/?product=thunderbird&amp;os=osx&amp;lang=en-US">Download for Macintosh</a></span>
				</ul>
				<p>You may also use any other news reader that you'd like.</p>

				<p>Click on of the download links above. When prompted, save the file to your hard drive. Pick a convenient place, such as your desktop.</p>

				<div class="bin"><img src="usenet/usenet03.png" alt="Save File dialog" title="Save the file to your hard drive" /></div>
			</td>
		</tr>
		<tr>
			<td class="stepalt">
				<p class="stepnumber">Step 3.</p>
				<p>When it finishes downloading, go to your desktop and double-click on the file to begin the installation process.</p>

				<div class="bin"><img src="usenet/usenet04.png" alt="Thunderbird setup file icon" title="Double-click the setup file" /></div>

				<p>The setup process should be easy -- just keep clicking the <tt>Next</tt> button.</p>
			</td>
		</tr>
		<tr>
			<td class="step">
				<p class="stepnumber">Step 4.</p>
				<p>When it's finished, click on the Thunderbird shortcut on your desktop, Start Menu, or QuickLaunch bar. The Account Setup Wizard will begin.</p>

				<p>Select <tt>newsgroup account</tt>, and click <tt>Next</tt>.</p>

				<div class="bin"><img src="usenet/usenet05.png" alt="Thunderbird Account Wizard dialog" title="Select Newsgroup account" /></div>
			</td>
		</tr>
		<tr>
			<td class="stepalt">
				<p class="stepnumber">Step 5.</p>
				<p>Enter the name and email address that you want to show up with your posts to the newsgroup. Click on Next.</p>

				<div class="bin"><img src="usenet/usenet06.png" alt="Identity information" title="Enter your name and email" /></div>
			</td>
		</tr>
		<tr>
			<td class="step">
				<p class="stepnumber">Step 6.</p>
				<p>Now enter the address of your news server, as determined in Step 1.</p>

				<div class="bin"><img src="usenet/usenet07.png" alt="Server information" title="Enter the server information" /></div>
			</td>
		</tr>
		<tr>
			<td class="stepalt">
				<p class="stepnumber">Step 7.</p>
				<p>If you wish you can give your account a name, enter it here.</p>

				<div class="bin"><img src="usenet/usenet08.png" alt="Account name" title="Enter a name" /></div>
			</td>
		</tr>
		<tr>
			<td class="step">
				<p class="stepnumber">Step 8.</p>
				<p>Finish the account setup. In the main Thunderbird window, right-click on the news server and select <tt>Subscribe...</tt></p>

				<div class="bin"><img src="usenet/usenet09.png" alt="Subscribing to a group" title="Right-click and choose Subscribe" /></div>
			</td>
		</tr>
		<tr>
			<td class="stepalt">
				<p class="stepnumber">Step 9.</p>
				<p>You will now see the list of newsgroups on the server. Type in the name of the group you want to read and select it in the list.</p>

				<div class="bin"><img src="usenet/usenet10a.png" alt="Group subscribtion dialog" title="Find your group and click Subscribe" /></div>
				
				<p>Click on the <tt>Subscribe</tt> button. You can repeat the process to add more groups. Click <tt>OK</tt> when you're finished.</p>
				
				<div class="bin"><img src="usenet/usenet10b.png" alt="Group subscribtion dialog" title="Find your group and click Subscribe" /></div>
			</td>
		</tr>
		<tr>
			<td class="step">
				<p class="stepnumber">Step 10.</p>
				<p>Now click on the name of a newsgroup to download new messages. Depending on your server, it may prompt you for your username and password. This information can be provided by your ISP or the news service you signed up with.</p>

				<div class="bin"><img src="usenet/usenet11.png" alt="Username prompt" title="Enter your username" /></div>

				<div class="bin"><img src="usenet/usenet12.png" alt="Password prompt" title="Enter your password" /></div>
			</td>
		</tr>
		<tr>
			<td class="stepalt">
				<p class="stepnumber">Step 11.</p>
				<p>For newsgroups with a lot of messages you will be prompted with a screen like this. Download as many messages as you'd like -- they will be the most current ones. It's recommended that you check the box to mark the remaining (older) messages as read.</p>

				<div class="bin"><img src="usenet/usenet13.png" alt="Download messages" title="Downloading messages" /></div>

				<br/><br/><p style="text-align:center;"><strong>You are now ready to read newsgroups!</strong></p><br/>
			</td>
		</tr>
		<tr>
			<td class="step">
				<p>To make browsing groups easier, it is recommended that you change the way messages are displayed. Click on <tt>View</tt>, then <tt>Threads</tt>, then <tt>Threads with Unread</tt>.

				<div class="bin"><img src="usenet/usenet14.png" alt="Setting the proper view for messages" title="Click View, Threads, Threads with Unread" /></div>
			</td>
		</tr>
		<tr>
			<td>

				<br/><br/>

				<p style="text-align:center;"><a href="../guides/"><small>Return to Guides</small></a></p>
			</td>
		</tr>
	</table>
</div>
</div>
</div>
EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}

?>
