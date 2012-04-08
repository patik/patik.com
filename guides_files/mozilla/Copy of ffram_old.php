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

				<p><a href="http://www.mozilla.org/products/firefox/" title="Get Firefox - Web Browsing Redefined"><img src="http://www.mozilla.org/products/firefox/buttons/getfirefox_large3.png" style="float:right; border:none; width:178px; height:60px;" alt="Get Firefox" /></a><big>This tutorial will show you how to get Mozilla Firefox installed and running in your RAM rather than from your hard drive. It is based on a <a href="http://texturizer.net/firefox/tips.html#oth_usb">tip</a> from <a href="http://texturizer.net/firefox/">Texturizer.net</a> and uses <a href="http://www.arsoft-online.de/products/product.php?id=1">AR RAM Disk</a>.</big></p>
				
				<br/>
				<hr/>
				<br/>
				
				<p>First we will setup Firefox to run from a single directory. This method is identical to the one used to run Firefox from a removable media device, such as a USB memory stick.</p>
				
				<p>Create a folder which you will put all Firefox files in. For this tutorial we'll call it <tt>ff_folder</tt>. Within this folder, create an empty folder called <tt>Profile</tt>.</p>
				
				<p>Download the <a href="ftp://ftp.mozilla.org/pub/mozilla.org/firefox/releases/0.8/Firefox-0.8.zip">zipped version</a> of Firefox and extract it into <tt>ff_folder</tt>. It will automatically create its own folder called Firefox.</p>
				
				<p>Right now your folder structure should look like this:</p>
				
					<div class="codeblock">
						\ff_folder\Profile\ &nbsp; &nbsp; <span class="normalText">(currently empty)</span><br/>
						\ff_folder\Firefox\  &nbsp; &nbsp; <span class="normalText">(contains firefox.exe and other program files and folders)</span>
					</div>
				
				<p>Now we need to create a shortcut to instruct Firefox to create your profile. Create a shortcut by right-clicking in Explorer and selecting <tt>New &gt; Shortcut</tt>. Point it to the following location.</p>
				
					<div class="codeblock">
						"B:\ff_folder\firefox\firefox.exe" -ProfileManager<br/>
					</div>
				
				<p>Name this file <tt>Firefox Profile</tt> in any location, such as your desktop. This starts Firefox with the profile manager so you can create a profile that resides on your RAM Disk (be sure to click on <tt>Choose Folder</tt> during the profile setup) so that it does not go to the default location (on your hard drive).</p>
				
				<p>Now create a new shortcut called "Firefox" to start Firefox normally.</p>
								
					<div class="codeblock">
						"B:\ff_folder\firefox\firefox.exe"<br/>
					</div>
				
				<p>You can now copy <tt>ff_folder</tt> to any removable media and run Firefox by double-clicking on the shortcut.</p>
				
				<br/>
				<hr/>
				<br/>
				
				<p>Download and install <a href="http://www.arsoft-online.de/products/product.php?id=1">AR RAM Disk</a>. This program creates a 64MB partition that by default shows up as <tt>B:\</tt> in Explorer (you can change these settings in the Control Panel). The 64MB is taken from your RAM, so anything on this partition will be residing in your system memory, not on your hard drive.</p>
				
				<p>The drive will empty its contents each time you boot your computer, so Firefox will need to be copied to the RAM Disk upon startup and, if you want, saved the hard drive before shutdown. First we'll get Firefox to copy to to the disk upon start up. It's best to automate this process with a <tt>.bat</tt> (batch) file that will run automatically.</p>
				
				<p>Open up Notepad and create a new text file called <tt>load_firefox.bat</tt> (no <tt>txt</tt> extension) and enter the following code:</p>
					
					<div class="codeblock">
						XCOPY C:\ff_folder\*.* B:\ff_folder\ /E /Y /C
					</div>
				
				<p>This file will copy your <tt>ff_folder</tt> contents to drive <tt>B:</tt>, the default drive letter of the RAM Disk. If your <tt>ff_folder</tt> is not in your <tt>C:\</tt> directory, or your RAM Disk is not at <tt>B:</tt>you will need to change that. It is recommended that you put this file in your Start Menu's <tt>Startup</tt> folder so that these operations are performed automatically and Firefox is ready to go as soon as you start Windows.</p>
				
				<p>Now you will need a way to copy your Firefox settings back to your hard drive before you shut down your PC so that you can save your settings, bookmarks, extensions, etc. Create a new text file called <tt>save_firefox.bat</tt> and copy the following code:</p>
				
					<div class="codeblock">
						XCOPY B:\ff_folder\*.* C:\ff_folder\ /E /Y
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
