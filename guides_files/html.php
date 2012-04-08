<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>ED Media 2003: Tips and Tricks for First Time WebCT Users - HTML Introduction</title>
	<link rel="stylesheet" href="html.css" type="text/css" />
	
	<script type="text/javascript">
	var ie=(navigator.appName.indexOf('Microsoft') != -1);
</script>

</head>
 
<body>
<div style="text-align:left;">
<a id="top"><br/></a>
<h1><big>HTML Guide and Reference Sheet</big></h1>

<p>&nbsp;</p>
<div class="tablecenter">
<table class="links">
	<tr>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';this.style.color='#f80000';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#fund">Fundamentals</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';this.style.color='#f80000';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#fonts">Fonts</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';this.style.color='#f80000';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#text">Text</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';this.style.color='#f80000';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#links">Links</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';this.style.color='#f80000';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#images">Images</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';this.style.color='#f80000';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#tables">Tables</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';this.style.color='#f80000';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}" style="border-right:thin white solid;"><a href="#hints">Hints and Tips</a></td>
	</tr>
</table>
</div>

<p>&nbsp;</p>

<a id="fund"><br/></a>
<h1>Fundamentals</h1>
<p>HTML uses tags to alter how things are displayed on a page. A tag is a command written withing angled brackets and placed around an element (picture, text, or other object). There are two tags around each element, an opening tag:</p>
	<div class="codeblock"><code>&lt;command&gt;</code></div>
<p>and a closing tag</p>
	<div class="codeblock"><code>&lt;/command&gt;</code></div>

<p>They combine to look like this:</p>

<div class="codeblock"><code>&lt;command&gt;</code>Your text or picture here<code>&lt;/command&gt;</code></div>

<p>Tags can be combined and nested. For example, the <code>&lt;big&gt;</code> command makes a font increase in size. Using nested <code>&lt;big&gt;</code> tags can make a string of text continually increase in size.</p>

<p>Examine the following code:</p>

<div class="codeblock"><code>&lt;big&gt;</code>Some text, <code style="color:blue">&lt;big&gt;</code>some more text, <code style="color:black">&lt;big&gt;</code>and some more.<code style="color:black">&lt;/big&gt;</code><code style="color:blue">&lt;/big&gt;</code><code style="color:green">&lt;/big&gt;</code></div>

<p>The <code>&lt;big&gt;</code> tag is used three times, each successive tag nested inside the one before it, making the font size grow more and more. The resulting HTML page will display like this:</p>

<div class="codeblock"><big>Some text, <big>some more text, <big>and some more.</big></big></big></div>

<p>Tags can also have <dfn>attributes</dfn>. An attribute is a value that changes the way a tag works. For example, the <code>&lt;font&gt;</code> tag is used to adjust the font of some text. To change the color of that font, we use the <code>color</code> attribute.</p>

<div class="codeblock">Here is some text that is <code>&lt;font color="red"&gt;</code>red<code>&lt;/font&gt;</code></div>

<p>It displays like this:</p>

<div class="codeblock">Here is some text that is <span style="color:red;">red</span></div>



<p>&nbsp;</p>
<a id="fonts"><br/></a>
<h1>Fonts</h1>
<p>There are many tags that affect the look of text on your page. Here are some of the most common ones.</p>
<br/>
<table border="1" width="90%" cellpadding="10">
	<tr>
		<th width="20%">Tag</th>
		<th width="30%">Used for</th>
		<th width="50%">Example</th>
	</tr>
	<tr>
		<td width="20%"><code>&lt;strong&gt;</code></td>
		<td width="30%">For making text boldface</td>
		<td width="50%">This text is <strong>bold</strong></td>
	</tr>
	<tr>
		<td width="20%"><code>&lt;em&gt;</code></td>
		<td width="30%">For making text italicized</td>
		<td width="50%">This text is <em>italicized</em></td>
	</tr>
	<tr>
		<td width="20%"><code>&lt;big&gt;</code></td>
		<td width="30%">For increasing text size</td>
		<td width="50%">This text is <big>bigger</big></td>
	</tr>
	<tr>
		<td width="20%"><code>&lt;small&gt;</code></td>
		<td width="30%">For decreasing text size</td>
		<td width="50%">This text is <small>smaller</small></td>
	</tr>
	<tr>
		<td width="20%"><code>&lt;sup&gt;</code><br/><code>&lt;sub&gt;</code></td>
		<td width="30%">For superscript and subscript text</td>
		<td width="50%">This text is <sup>superscript</sup> and this is <sub>subscript</sub></td>
	</tr>
	<tr>
		<td width="20%"><code>&lt;tt&gt;</code></td>
		<td width="30%">Makes the text fixed-width ("typewriter text")</td>
		<td width="50%">This text is <tt>fixed-width and monospace</tt></td>
	</tr>
	<tr>
		<td width="25%"><code>&lt;font color="red"&gt;</code></td>
		<td width="25%">Makes the text red. You can replace red with the appropriate color. Note the space between <code>font</code> and <code>color</code>.</td>
		<td width="50%" align="center">
			<table align="center" border="0">
				<tr>
					<td><span style="color:red;">red</span></td>
					<td><span style="color:fuchsia;">fuchsia</span></td>
				</tr>
				<tr>
					<td><span style="color:orange;">orange</span></td>
					<td><span style="color:maroon;">maroon</span></td>
				</tr>
				<tr>
					<td><span style="color:yellow;">yellow</span></td>
					<td><span style="color:lime;">lime</span></td>
				</tr>
				<tr>
					<td><span style="color:green;">green</span></td>
					<td><span style="color:olive;">olive</span></td>
				</tr>
				<tr>
					<td><span style="color:blue;">blue</span></td>
					<td><span style="color:aqua;">aqua</span></td>
				</tr>
				<tr>
					<td><span style="color:purple;">purple</span></td>
					<td><span style="color:teal;">teal</span></td>
				</tr>
				<tr>
					<td><span style="color:brown;">brown</span></td>
					<td><span style="color:navy;">navy</span></td>
				</tr>
				<tr>
					<td><span style="color:black;">black</span></td>
					<td><span style="color:gray;">gray</span></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td width="20%"><code>&lt;font face=" "&gt;</code></td>
		<td width="30%">For changing the typeface. Since not all users' computers will have the same fonts installed, we must instead specify a family of fonts.
			<br/>
			<br/>
			<div class="codeblock">
				<code>&lt;font <span style="color:red">face="Arial, Helvetica, sans-serif"</span>&gt;</code>Your text here<code>&lt;/font&gt;</code>
			</div>
			</td>
		<td width="50%">
			<p style="font-family:Arial, Helveti