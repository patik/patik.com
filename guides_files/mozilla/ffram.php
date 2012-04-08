<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
<head>
<title>Speeding Up Firefox</title>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<meta name="description" content="Craig Patik's homepage, with various computer guides, pictures, and more" />
	<meta name="keywords" content="craig patik, cd-r guides, guide, binary, newsgroups, flac, etree, Apache, Mozilla Firefox" />
	
	<link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" href="../../style_older.css" title="Default" type="text/css" />
	<link rel="alternate stylesheet" href="../../style2.css" title="Style 2" type="text/css" />
	<script language="JavaScript" type="text/javascript" src="../../sleight.js"></script>
</head>

<body>
<p>&nbsp;</p>
<div class="tablecenter">
<div class="main">
<div class="tablecenter"> 

	<div class="banner">
		<a href="http://www.patik.com"><img src="../../logo.png" style="border:none;" alt="Patik.com" title="Patik.com" /></a>
	</div>
      
	<br/>
	<br/>
      
	<table class="text">
		<tr>
			<th>Mozilla Firefox in a RAM Partition</th>
		</tr>
		<tr>
			<td>
				<div class="pageTitle"><span style="text-align:center;" class="pageTitle">For Windows 2000 &amp; XP</span></div>
				<br/>

				<p><a href="http://www.mozilla.org/products/firefox/" title="Get Firefox - Web Browsing Redefined"><img src="http://www.mozilla.org/products/firefox/buttons/getfirefox_large3.png" style="float:right; border:none; width:178px; height:60px;" alt="Get Firefox" /></a><big>This tutorial will show you how to get Mozilla Firefox installed and running in your RAM rather than from your hard drive. It is based on a <a href="http://texturizer.net/firefox/tips.html#oth_usb">tip</a> from <a href="http://texturizer.net/firefox/">Texturizer.net</a> and <a href="http://johnhaller.com/jh/mozilla/portable_firefox/">Portable Mozilla</a>, and uses either <a href="http://www.arsoft-online.de/products/product.php?id=1">AR RAM Disk</a> or <a href="http://www.8ung.at/ramdisk/RAMDisk/RAMDisk.htm">RAMDisk</a>.</big></p>
				
				<p><span style="color:red;"><b>Update:</b></span> (7/23/04) This guide was posted in the <a href="http://forums.mozillazine.org/viewtopic.php?t=55195">Mozillazine.org forums</a> when I first wrote it. Since then, John Haller started the <a href="http://johnhaller.com/jh/mozilla/portable_firefox/">Portable Mozilla</a> project which not only makes this tutorial more simple, but it's a better solution for those wanting to run Firefox from a USB drive. The old tutorial can be found <a href="ffram_old.php">here</a>.</p>
				
				<br/>
				<hr/>
				<br/>
				
				<p>First you will need to download the latest version of <a href="http://johnhaller.com/jh/mozilla/portable_firefox/">Portable Firefox</a>. This will look and act just like a normal install of Firefox, except that it has been optimized for space, it only uses one folder, and it doesnt keep a cache or history.</p>
				
				<p>For this guide we'll use <tt>C:\firefox\</tt> as the place to store the unzipped folder on the hard drive. A <tt>firefox.bat</tt> file is included in that folder, which is what you'll use to launch Firefox.</p>
				
				<br/>
				<hr/>
				<br/>
				
				<p>Download and install <a href="http://www.arsoft-online.de/products/product.php?id=1">AR RAM Disk</a> or <a href="http://www.8ung.at/ramdisk/RAMDisk/RAMDisk.htm">RAMDisk</a>. These programs create small (32MB-64MB) partitions that by default show up as <tt>B:\</tt> in Explorer (you can change these settings in the Control Panel). That memory is taken from your RAM, so anything on this partition will reside in your system memory, not on your hard drive.</p>
				
				<p>The partition will empty its contents each time you boot your computer, so Firefox will need to be copied to the RAM partition upon startup and, if you want, saved to the hard drive before shutdown. First we'll get Firefox to copy to the disk upon start up. It's best to automate this process with a <tt>.bat</tt> (batch) file that will run automatically.</p>
				
				<p>Open up Notepad and create a new text file called <tt>load_firefox.bat</tt> (no <tt>txt</tt> extension) and enter the following code:</p>
					
					<div class="codeblock">
						XCOPY C:\firefox\*.* B:\firefox\ /E /Y /C
					</div>
				
				<p>This file will copy your <tt>firefox</tt> contents to drive <tt>B:</tt>, the default drive letter of the RAM partition. If your <tt>firefox</tt> is not in your <tt>C:\</tt> directory, or your RAM Disk is not at <tt>B:</tt>you will need to change that. It is recommended that you put this file in your Start Menu's <tt>Startup</tt> folder so that these operations are performed automatically and Firefox is ready to go as soon as you start Windows.</p>
				
				<p>Now you will need a way to copy your Firefox settings back to your hard drive before you shut down your PC so that you can save your settings, bookmarks, extensions, etc. Create a new text file called <tt>save_firefox.bat</tt> and copy the following code:</p>
				
					<div class="codeblock">
						XCOPY B:\firefox\*.* C:\firefox\ /E /Y
					</div>
				
				<p>This will copy the entire program files and profile back to your hard drive and replace the existing copy (the one that was copied to the RAM partition upon system boot). You can put this file wherever it is convenient, such as the Desktop. You can run it any time you want to save your settings, but it is recommended you close Firefox first.</p>
				
				<p>So now the following is set up:</p>
				<ul>
					<li>Upon booting Windows, a partition will be created in your RAM and Firefox will be copied there along with your profile.</li>
					<li>Use Firefox by double-clicking on the shortcut.</li>
					<li>Before you shut down your PC, run <tt>save_firefox.bat</tt> to save your profile.</li>
				</ul>
				
				<p><strong>Be sure to update your shortcuts</strong>, including on your desktop, QuickLaunch bar, and in your Start Menu.</p>
				
				<p>Enjoy the performance boost!</p>

				<p style="text-align:center;"><a href="../../guides"><small>Return to Guides</small></a></p>
			</td>
		</tr>
	</table>

</div>
</div>
</div>

</body>
</html>
