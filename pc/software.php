<?php

$part = $_GET['part'];

switch($part) {
  case 'keywords':
    # Keywords
    $keywords = 'software, firefox, greasemonkey, scripts, windows, applications, install, ubuntu, linux';
    return $keywords;
    break;
  case 'title':
    # Document title
    $title = 'Software';
    return $title;
    break; 
  case 'useScript':
    # Use script.js?
    return false;
    break;
  case 'pageCSS':
    # Page-specific CSS
    $css = <<<EOTEOTEOT
		
			.code {
		font-family: monospace;
		white-space: pre;
	}
	pre.code {
		background-color: #06C;
		color: white;
		border: #888 solid 0.15em;
		padding: 0.5em;
	}
EOTEOTEOT;
    return $css;
    break;
  case 'content':
    # Page content (everything that goes inside div#mainBody
    $content = <<<EOTEOTEOT
  	
		<h2>Overview</h2>
    <p>All of the scripts, software, and setup routines that I've created or collected are gathered here.</p>
    <h2>Sections</h2>
    <ul class="general subtleLink">
    	<li><a href="#firefox">Firefox</a>
      	<ul>
          <li><a href="#firefox-config">Configuration and settings</a></li>
        	<li><a href="#firefox-add-ons">Add-ons</a>
          <li><a href="#firefox-greasemonkey-scripts">Greasemonkey scripts</a></li>
          <li><a href="#firefox-themes">Themes</a></li>
          <li><a href="#firefox-search-plugins">Search engine plugins</a></li>
    			<li><a href="/pc/greasemonkey-user-scripts/">Greasemonkey scripts for Firefox that I've written</a></li>
        </ul>
      </li>
      <li><a href="#windows">Windows</a>
      	<ul>
        	<li><a href="#windows-apps">Applications</a></li>
          <li>Configuration</li>
          <li><a href="#chrome-extensions">Google Chrome Extensions</a></li>
          <li><a href="/pc/computer/">My current computer setup</a></li>
        </ul>
      </li>
      <li>Linux
      	<ul>
        	<li><a href="/pc/ubuntu_setup.html">Ubuntu setup</a> (very old)</li>
        </ul>
      </li>
    </ul>
    
    <h2 id="firefox">Firefox</h2>
    
    <h3 id="firefox-config">Configuration</h3>
    <ul class="general subtleLink">
      <li><a href="/pc/user.js">user.js</a></li>
      <li><a href="/pc/userChrome.css">userChrome.css</a></li>
      <li><a href="/pc/userContent.css">userContent.css</a></li>
      <li><a href="/ubiquity/">My Ubiquity commands and command feed</a></li>
      <li><a href="http://lifehacker.com/392287/set-firefox-3-to-launch-gmail-for-mailto-links">Set Firefox to use Gmail for mailto links</a></li>
      <li>Adblock filters:
      	<ul class="general">
          <li> Disable NY Times double-click feature:
            <pre>*.nytimes.com/js/common/screen/altClickToSearch.js</pre>
          </li>
        </ul>
    	</li>
        <li>Enable extension compatibility with newer versions of Firefox:<br/>
        Enter
        <span class="code"><a href="about:config">about:config</a></span>
        in the URL bar and then make the following changes:
        <ul>
          <li>Right-click, choose
            <span class="code">New &gt; Boolean</span>
          </li>
          <li>
            <span class="code">extensions.checkCompatibility</span>
            set to false</li>
          <li>
            <span class="code">extensions.checkUpdateSecurity</span>
            set to false</li>
        </ul>
      </li>
    </ul>
    
    <h3 id="firefox-add-ons">Add-ons</h3>
    <ul class="general subtleLink">
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/1865">Adblock Plus</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/47734">App Tabs</a></li>
		<li><a href="http://lifehacker.com/software/exclusive-lifehacker-download/better-gmail-2-firefox-extension-for-new-gmail-320618.php">Better Gmail 2</a></li>
		<li><a href="http://lifehacker.com/262020/trick-out-google-reader-with-better-greader/">Better Google Reader</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/10897">Check Places</a> (find dead bookmarks, fix favicons, etc)</li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/240">Context Search</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/26">Download Statusbar</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/201">DownThemAll</a></li>
		
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/2109">FEBE</a> (backup Firefox profile)</li>
		<li><a href="http://flashblock.mozdev.org/">FlashBlock</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/1978">Forecastfox Enhanced</a> &amp; my <a href="http://www.patik.com/pc/weather.xml">settings</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/1117">FoxClocks</a> &amp; my <a href="http://www.patik.com/pc/foxclocks.fcl">settings file</a></li>
		
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/5673">FxIF</a> (view image exif data)</li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/748">Greasemonkey</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/673">InFormEnter</a></li>
		
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/39">Mouse Gestures</a> (<a href="http://www.mousegestures.org/nightly.html">nightlies</a>, <a href="http://www.mousegestures.org/exchange/details.php?mappingID=117">undo close tab</a>)</li>
		<li><a href="http://www.oxymoronical.com/web/firefox/nightly">Nightly Tester Tools</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/951">Nuke Anything Enhanced</a></li>
		<li><a href="http://www.labnol.org/internet/open-firefox-websites-in-google-chrome/4422/">Open in Google Chrome</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/58606">Quick Translator</a></li>
		<li><a href="http://www.ideashower.com/ideas/launched/read-it-later/">Read It Later</a><!-- (feed: 17446, pw: faaa703)--></li>
		<li><a href="http://www.rememberthemilk.com/services/gmail/">Remember the Milk for Gmail</a></li>
		
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/3544">SearchLoad Options</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/14762">StrataBuddy</a> and its recommended companion add-ons, for Firefox 3.7/4.0 enhancements</li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/2108">Stylish</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/1956">Tabs Open Relative</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/57">Titlebar Tweaks</a></li>
		<li><a href="http://labs.mozilla.com/2008/08/introducing-ubiquity/">Ubiquity</a> and <a href="http://www.patik.com/ubiquity/">my Ubiquity commands</a></li>
		<li><a href="https://addons.mozilla.org/en-US/firefox/addon/13878">Vacuum Places Improved</a></li>
		<li><a href="https://mozillalabs.com/weave/">Weave</a></li>
		<li><a href="http://www.xmarks.com/">Xmarks</a></li>
		<li>Web development:
			<ul class="general subtleLink">
				<li><a href="https://addons.mozilla.org/en-US/firefox/addon/1843">Firebug</a></li>
				<li><a href="https://addons.mozilla.org/en-US/firefox/addon/10704">CSS Usage</a> (<a href="http://spaghetticoder.org/cssusage/">homepage</a>) for Firebug. Indicates which CSS rules are used on a given page</li>
				<li><a href="http://thedarkone.github.com/firepicker/">Fire Picker</a> color picker for Firebug</li>
				<li><a href="https://addons.mozilla.org/en-US/firefox/addon/60">Web Developer</a></li>
			</ul>
		</li>
    </ul>
    
    <h3 id="firefox-themes">Themes</h3>
    <ul class="general subtleLink">
      <li><a href="https://addons.mozilla.org/en-US/firefox/addon/3699">Classic Compact</a></li>
    </ul>
    
    <h3 id="firefox-greasemonkey-scripts">Greasemonkey &amp; Stylish scripts</h3>
    <ul class="general subtleLink">
      <li><a href="http://userscripts.org/users/12818/favorites">UserScripts.org</a> (<a href="http://userscripts.org/users/12818">Ellsass</a>)</li>
      <li><a href="http://userstyles.org/">UserStyles.org</a></li>
    	<li><a href="/pc/greasemonkey-user-scripts/">Greasemonkey scripts that I've written</a></li>
			<li class="spacer">&nbsp;</li>
			<li><a href="http://userscripts.org/scripts/show/31864">YouTube HQ + 720p Ultimate [MAR 2009] [+autoplay off option]</a> (<a href="http://userscripts.org/scripts/search?q=youtube+hq&sort=installs">search for newer version</a>)</li>
			<li><a href="http://userscripts.org/scripts/show/40617">Troy's Twitter Script</a></li>
			<li><a href="http://userscripts.org/scripts/show/9580">Facebook View Photo in Album</a></li>
      <li><a href="http://userscripts.org/scripts/show/32115">LongURL Mobile Expander</a></li>
			<li><a href="http://userscripts.org/scripts/show/31950">GoogleFX</a></li>

			<li><a href="http://userscripts.org/scripts/show/20689">SABTab2 for Newzbin</a> (for <a href="http://www.sabnzbd.org/">SABnzbd+</a>)</li>
      <li><a href="http://userstyles.org/styles/3292">Hide Search and Go Buttons</a></li>
      <li><a href="http://userstyles.org/styles/8250">Display keyword field in Bookmark dialog</a></li>
      <li><a href="http://userstyles.org/styles/8248">Yellow https location bar</a></li>
      <li><a href="http://userstyles.org/styles/9439">Knowledge Networks easier on the eyes</a></li>

      <li><a href="http://userstyles.org/styles/3851">Guardian article cleaner</a></li>
      <li><a href="http://userscripts.org/scripts/show/8390">Auto add to Google Reader</a></li>
      <li><a href="http://userstyles.org/style/show/1">Slashdot Ad Remover</a></li>
      <li><a href="http://userscripts.org/scripts/show/938">W3schools cleaner</a></li>
			<li><a href="http://userscripts.org/scripts/show/33042">YouTube Enhancer</a></li>
    </ul>
    
    <h3 id="firefox-search-plugins">Search Engine Plugins</h3>
		<ul class="general subtleLink">
			<li><a href="http://mycroft.mozdev.org/dlstats.html">Mycroft Top 25</a></li>
			<li><a href="http://www.patik.com/searchplugins/">My search engine plugins</a></li>
			<li><a href="https://addons.mozilla.org/en-US/firefox/browse/type:4/cat:all?sort=name">Mozilla Addons</a></li>
      <li class="spacer">&nbsp;</li>
			<li><a href="http://mycroft.mozdev.org/google-search-plugins.html">Google</a></li>
			<li><a href="http://mycroft.mozdev.org/wikipedia-search-plugins.html">Wikipedia</a>, <a href="https://addons.mozilla.org/en-US/firefox/addon/4614">alternate</a></li>
			<li><a href="http://mycroft.mozdev.org/download.html?name=google+maps&amp;submitform=Search">Google Maps</a></li>
			<li><a href="http://mycroft.mozdev.org/search-engines.html?name=newzbin">Newzbin</a></li>
			<li><a href="http://mycroft.mozdev.org/dlstats.html">Google Images</a></li>

			<li><a href="http://mycroft.mozdev.org/dlstats.html">Dictionary.com</a></li>
			<li><a href="http://mycroft.mozdev.org/dlstats.html">Mininova</a></li>
			<li><a href="http://mycroft.mozdev.org/dlstats.html">The Pirate Bay</a></li>
			<li><a href="https://addons.mozilla.org/en-US/firefox/addons/policy/0/45518/67661?src=search">Amazon</a></li>
			<li><a href="http://mycroft.mozdev.org/search-engines.html?name=wikitravel">Wikitravel</a>, or <a href="http://wikitravel.org/en/Main_Page">direct from site</a></li>

			<li><a href="https://addons.mozilla.org/en-US/firefox/addon/4605">IMDB</a></li>
			<li><a href="http://mycroft.mozdev.org/dlstats.html">Youtube</a></li>
			<li><a href="http://mycroft.mozdev.org/search-engines.html?category=23">TripAdvisor</a></li>
			<li><a href="http://mycroft.mozdev.org/search-engines.html?name=urbandictionary">Urban Dictionary</a></li>
			<li><a href="http://mycroft.mozdev.org/ebay-search-plugins.html">eBay</a></li>
			<li><a href="http://mycroft.mozdev.org/dlstats.html">LEO Deu-Eng</a></li>
		</ul>
    
    <h2 id="windows">Windows</h2>
    
    <h3 id="windows-apps">Applications to install</h3>
    <ul class="general subtleLink">
    	<li>Most can be installed at once with <a href="http://ninite.com/">Ninite</a></li>
      <li class="spacer">&nbsp;</li>
      
      <li><a href="http://www.mozilla.com/firefox/">Firefox</a></li>
      <li><a href="http://pidgin.im/">Pidgin</a>
      	<ul><li><a href="http://plugins.guifications.org/trac/downloads">Purple Plugin Pack</a></li></ul>
      </li>
      <li><a href="http://www.microsoft.com/security_essentials/">Microsoft Security Essentials</a> (free anti-virus and malware-cleaning software)</li>
      <li><a href="http://www.apple.com/itunes/download/">iTunes</a></li>
			<li><a href="http://www.google.com/chrome">Google Chrome</a>
				<ul><li>Windows shortcut: <tt>"path/to/google/chrome.exe" --enable-user-scripts --enable-local-storage --enable-sync --enable-extension-timeline-api</tt></li></ul>
			</li>
      <li><a href="http://sabnzbd.org/">SABnzbd+</a> for usenet</li>
      <li><a href="http://www.getdropbox.com/downloading">DropBox</a></li>
			<li><a href="http://www.2brightsparks.com/syncback/sbpro.html">SyncBack Pro</a> (FTP backups)</li>
      <li><a href="http://www.foxitsoftware.com/pdf/reader/">Foxit PDF Reader</a></li>
      <li><a href="http://sourceforge.net/projects/pdfcreator/">PDF Creator</a> for printing anything to a PDF</li>
      <li><a href="http://notepad-plus.sourceforge.net/uk/site.htm">Notepad++</a></li>
			<li><a href="http://mpc-hc.sourceforge.net/">Media Player Classic Home Cinema</a></li>
      <li><a href="http://handbrake.fr/">Handbrake</a></li>
      <li><a href="http://www.autogk.me.uk/">AutoGK</a> for creating Xvid videos</li>
			<li><a href="http://www.cubicreality.com/">Cubic Explorer</a></li>
      <li><a href="http://www.quickpar.org.uk/">QuickPar</a></li>
      <li><a href="http://www.exactaudiocopy.de/en/index.php/resources/download/">Exact Audio Copy</a></li>
      <li><a href="http://earth.google.com/">Google Earth</a>, <a href="http://code.google.com/apis/earth/">browser plugin</a></li>
      <li><a href="http://www.ysgyfarnog.co.uk/utilities/mousegestures/">Mouse gestures for IE</a></li>
      <li><a href="http://www.r2.com.au/software.php?page=2&amp;show=startdelay">Startup Delayer</a></li>
      <li><a href="http://elsdoerfer.name/=ntfslink">NTFS Link</a> for creating symlinks/junctions</li>
      <li class="spacer">&nbsp;</li>
	  <li>Auto login at startup:
	  	<ul>
			<li>Start &gt; Run, type in <tt>control userpasswords2</li>
			<li>Select/highlight the default user (who will be logged on automatically each time)</li>
			<li>Uncheck the box "users must enter a user name and password to use this computer"</li>
			<li>Click Ok, and confirm that user's password</li>
		</ul>
	  </li>
      <li>Windows Explorer:
				<ul class="sublist">
					<li><a href="http://foldersize.sourceforge.net/">Folder Size</a></li>

					<li><a href="http://www.contextmagic.com/audiotag-editor/">InfoTag Magic</a></li>
					<li><a href="http://lingo.atspace.com/openwide.html">OpenWide</a> (customize Save As dialog)</li>
					<li class="spacer">&nbsp;</li>
					<li><a href="http://lifehacker.com/399362/power-up-windows-explorer-with-free-add+ons">More from Lifehacker.com</a></li>
				</ul>
			</li>
    </ul>
    
    <h3 id="chrome-extensions">Google Chrome</h3>
    <ul class="general subtleLink">
      <li><a href="https://chrome.google.com/extensions/detail/chmimgmjdabgiilljdjfbonifbhiglao">AdBlock+ Element Hiding Helper</a></li>
			<li><a href="https://chrome.google.com/extensions/detail/gmfocnipihcoejdieiimhiecclokidea">Better Gmail</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/jlhlebbhengjlhmcjebbkambaekglhkf">Bubble Translate</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/chieodlkhimccchlojdmiondhiggkhmf">ChromeMilk</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/lojpenhmoajbiciapkjkiekmobleogjc">Chrome Reader</a> (subscribe to RSS without leaving the page)</li>
      <li><a href="https://chrome.google.com/extensions/detail/mmffncokckfccddfenhkhnllmlobdahm">FastestFox - Browse Faster</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/bnbbfjbeaefgipfjpdabmpadaacmafkj">Firebug Lite</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/fhaledancjhefginmkkondfjpnkhdglh">Fittr Flickr</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/cdngiadmnkhgemkimkhiilgffbjijcie">FlashBlock</a> by ruzanow</li>
      <li><a href="https://chrome.google.com/extensions/detail/ihffmkcfkejomlfnilnmkokcpgclhfeg">Forecastfox Weather</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/okanipcmceoeemlbjnmnbdibhgpbllgc">Google Quick Scroll</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/kcnhkahnjcbndmmehfkdnkjomaanaooo">Google Voice</a></li>
      <!--<li><a href="https://chrome.google.com/extensions/detail/fkjimegeljmjilcjajmggmmcelbgdeim">Google Weather</a></li>-->
      <li><a href="https://chrome.google.com/extensions/detail/egljjohbmnnpicoiddaapkpejfpnmmpe">gPDF</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/aeaoofnhgocdbnbeljkmbjdmhbcokfdb">Mouse Stroke</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/hcifofgaphfkfdcjbdogpamghiihilkl">Picnik</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/pggmlienkcoenodbjpkbidlmmedgonai">Postponer Adder</a> (Read It Later)</li>
      <li><a href="https://chrome.google.com/extensions/detail/mmfblgljgoaokhbcjnddgcnaielcpjeb">Postponer Manager</a> (Read It Later)</li>
      <li><a href="https://chrome.google.com/extensions/detail/hdleelhkacfjhhmgakhigfckpddlbahi">QuickSearch</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/hphjpfmagbhbdfhdndglcccmhdjhjjce">Remember The Milk for Gmail</a></li>
			<li><a href="https://chrome.google.com/extensions/detail/ahldefgplekckalfcolhhnljbbgaiboc">Send from Gmail</a> (mailto: goes to Gmail, but without a button in the toolbar like the <a href="https://chrome.google.com/extensions/detail/pgphcomnlaojlmmcjmiddhdapjpbgeoc">official version</a>)</li>
			<li><a href=http://vimium.github.com/">Vimium</a> (keyboard shortcuts and remember site zoom level)</li>
      <li><a href="https://chrome.google.com/extensions/detail/bfbameneiokkgbdmiekhjnmfkcnldhhm">Web Developer</a></li>
      <li><a href="https://chrome.google.com/extensions/detail/ajpgkpeckebdhofmmjfgcjjiiejpodla">Xmarks Bookmarks Sync</a></li>
    </ul>
    
    <h3>Configuration</h3>
    <ul class="general subtleLink">
    	<li>Windows Explorer<br/>To open Explorer at C:\ in explore mode by default when pressing winkey+E:
        <ol class="general">
          <li>Open Registry Editor to <tt>HKEY_CLASSES_ROOT \ Folder \ shell \ explore</tt></li>
          <li>Export key to backup</li>
          <li>In <tt>ddeexec</tt>, change value for <tt>(default)</tt> to
            <pre class="code">[ExploreFolder("%l", %I, %S)]</pre>
          </li>
          <li>In <tt>command</tt>, change value for <tt>(default)</tt> to
            <pre class="code">%SystemRoot%\Explorer.exe /e,/idlist,%I,%L</pre>
          </li>
        </ol>
      </li>
      <li>Background highlight color for current line in text editors:
        <ul>
          <li>Hue: 40, Sat: 240, Lum: 222</li>
          <li>Red: 255, Green: 255, Blue: 217</li>
        </ul>
      </li>
    </ul>
    
    <div>&nbsp;</div>
    <div>&nbsp;</div>
EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}

?>