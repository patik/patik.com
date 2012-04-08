<?php

$part = $_GET['part'];

switch($part) {
  case 'keywords':
    # Keywords
    $keywords = 'binary, newsgroups, usenet, grabit, xnews, shn, server, etree, guide, tutorial';
    return $keywords;
    break;
  case 'title':
    # Document title
    $title = 'Binary Newsgroups';
    return $title;
    break;
  case 'useScript':
    # Use script.js?
    return false;
    break;
  case 'pageCSS':
    # Page-specific CSS
    $css = <<<EOTEOTEOT
    div.bin { text-align: center; padding: 10px; }
		div.main { width: 810px; }
EOTEOTEOT;
    return $css;
    break;
  case 'content':
    # Page content (everything that goes inside div#mainBody
    $content = <<<EOTEOTEOT
  	<h2>How To Use Binary Newsgroups</h2>
    <p>With GrabIt, for Windows<br/>By <a href="mailto:craig@patik.com">Craig</a></p>
    
    <h3>Getting Started</h3>
    <p>Binary files (audio, video, pictures, etc.) can be found on a part of the internet called <em>Usenet</em>, arranged in <em>newsgroups</em>. In order to download these files, you will need a few tools:</p>
    <ol class="general">
      <li><strong>A news server (required)</strong>. You may already have access to a news server through your cable or DSL ISP -- check <a href="http://www.newsbin.com/ISP.htm">this list</a> to find out. You can also use one of many pay servers which charge a fee to access. I recommend <a href="http://www.giganews.com/?c=gn22722">Giganews</a> or <a href="http://news.astraweb.com/">Astraweb</a>. Giganews offers much better retention (files that were uploaded in the past two months, versus 2 weeks for Astraweb), while Astrweb has the option to pay for a certain amount of bandwidth (gigabytes) of data which can be used over any length of time. Giganews is good for regular downloaders, which Astraweb is good for occasional downloaders who may not download files every month.</li>
      <li><strong>Binary news reader (required)</strong>. For this guide I will use <a href="http://www.shemes.com/">GrabIt</a>, which is free and supports many features. You can also use Xnews, for which I have written a <a href="binaries_xnews">guide</a>. More powerful software includes <a href="http://www.newsleecher.com/">NewsLeecher</a> which is not free.</li>
      <li><strong>File opener (required)</strong>. Most files are posted to Usenet in <tt>RAR</tt> format. Basically, a file (or group of files) is contained in a group of <tt>RAR</tt> files with the same name (<tt>example.part1.rar</tt>, <tt>example.part2.rar</tt>, etc). To get your files, or <em>extract</em> them from the <tt>RAR</tt>s, you can use <a href="http://www.7-zip.org/">7-Zip</a>, which is free, or <a href="http://www.win-rar.com/download.html">WinRAR</a>, which has a free trial.</li>
      <li><strong>File repairer (required)</strong>. <a href="http://www.quickpar.org.uk/">QuickPar</a> is an excellent, free program which will verify that your files downloaded correctly and fix them if they didn't. While you can technically download from Usenet without it, it will make your life a lot easier.</li>
      <li><strong>Indexing service (optional, recommended)</strong>. An indexing service will let you know what files are on Usenet and where they are with a much easier interface. They also provide you with small files that you can download which will have your news reader downloading instantly without browsing for files and waiting for newsgroups to load. I highly recommend <a href="http://www.newzbin.com/">Newzbin</a>, which costs ~50 cents per week.</li>
		</ol>
    
    <h3>Getting Set Up</h3>
    
    <p>Download <a href="http://www.shemes.com/index.php?p=download">GrabIt</a>.</p>
      <p>Find out your news server address. If you signed up for a pay server, you can find the server name on their website. To use your ISP's server, check <a href="http://www.newsbin.com/ISP.htm">this list</a>.</p>

      <p>Double-click on the <tt>GrabIt.exe</tt> file which you downloaded and complete the installation process. GrabIt will then run for the first time.</p>

      <p>First it will ask you to enter your news server's address. If your server requires a username and password (most pay servers do, most ISP servers don't) check the box.</p>

      <div class="bin"><img src="binaries/binaries_grabit_01.png" alt="Enter your news server address" title="Enter your news server address" /></div>

      <p>If you checked the box, enter your username and password here. Click OK.</p>

      <div class="bin"><img src="binaries/binaries_grabit_02.png" alt="Enter your username and password" title="Enter your username and password" /></div>

      <p>That's all you need to do to setup. Click <tt>Finish</tt>.</p>

      <div class="bin"><img src="binaries/binaries_grabit_03.png" alt="Click Finish to download list" title="Click Finish to download list" /></div>

      <p>There are two ways to select files to download on Usenet. You can browse certain groups or you can import a file list (an <tt>NZB</tt> or <tt>BNS</tt> file)from an indexing service as described in the beginning. Both methods will be covered here.<br/><br/></p>

      <h3>Browsing for Files</h3>

      <p>Click on your news server in the left pane, then click on the <tt>All Groups</tt> tab in the main area. Once the list of newsgroups loads, you can narrow it down by typing the name of the desired newsgroup. For this example we will download files from <tt>alt.binaries.music.shn.dmb</tt>. When you see your group in the list, click on it and click the <tt>Subscribe</tt> button at the top. You may also subscribe to other groups.</p>

      <div class="bin"><img src="binaries/binaries_grabit_04.png" alt="Subscribe to the group" title="Subscribe to the group" /></div>

      <p>Now click on the <tt>+</tt> next to your news server to show the list of subscribed groups. Click on the name of the group you wish browse, then click <tt>Update Groups</tt> at the top.</p>

      <div class="bin"><img src="binaries/binaries_grabit_05.png" alt="Get the group's contents" title="Get the group's contents" /></div>

      <p>When it finishes downloading, you will see a list of files. A yellow icon represents a binary file -- a file containing music, video, or other non-text information. A blue icon represents a text file (containing information about the post) or a <tt>PAR2</tt> or <tt>MD5</tt> file, which can be used to verify or repair binary (yellow) files.</p>

      <div class="bin"><img src="binaries/binaries_grabit_06.png" alt="Icon types" title="Icon types" /></div>

      <p>Select the files you would like to download with your mouse. Click on <tt>Grab Selected</tt> at the top to begin downloading.</p>

      <div class="bin"><img src="binaries/binaries_grabit_07.png" alt="Select the files" title="Select the files" /></div>

      <p>Under the <tt>Batch</tt> tab you will see the files as they are being downloaded. To prevent a file from downloading, simple select it with your mouse and press <tt>delete</tt> on your keyboard.</p>

      <p>To view files that have downloaded, click the <tt>Download Folder</tt> button at the top to open the folder containing your files.</p>

      <div class="bin"><img src="binaries/binaries_grabit_08.png" alt="Select the files" title="Select the files" /></div>
      
      <h3>Importing a File List</h3>

      <p>If you use an indexing service such as <a href="http://www.newzbin.com/">NewzBin.com</a>, you can import <tt>NZB</tt> or <tt>BNS</tt> files downloaded from those sites. While the <tt>Batch</tt> tab in GrabIt is open, click on the <tt>Article Import</tt> button at the top.</p>

      <div class="bin"><img src="binaries/binaries_grabit_09.png" alt="Import a file list" title="Import a file list" /></div>

      <p>Select the file type and click <tt>Add</tt>. Find the <tt>.nzb</tt> or <tt>.bns</tt> file on your hard drive, then click <tt>Open</tt> to add it to the list. Once you are finished, click <tt>Grab</tt> and the downloading will begin automatically.</p>

      <div class="bin"><img src="binaries/binaries_grabit_10.png" alt="Import a file list" title="Import a file list" /></div>


      <p>Notes:</p>
      <ul class="general">
        <li>Files will expire, so download older posts first. Typical retention is anywhere from 2 days for ISP servers, or 14-21 days for pay servers.</li>
        <li>Usually the poster will include <tt>.PAR2</tt> files, which you can use with QuickPar to verify and repair your download.</li>
      </ul>
    
    <h2><a href="/guides/"><small>Return to Guides</small></a></h2>
    
EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}
  
  
?>
