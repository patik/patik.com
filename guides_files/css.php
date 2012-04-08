<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>ED Media 2003: Tips and Tricks for First Time WebCT Users - CSS Introduction</title>
	<link rel="stylesheet" href="css.css" type="text/css" />
</head>

<body>
<div style="text-align:left;">
<a id="top"><br/></a>
<h1><big>CSS Guide and Reference Sheet</big></h1>

<p>&nbsp;</p>
<div class="tablecenter">
<table class="links">
	<tr>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#intro">Introduction</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#fund">Fundamentals</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#classes">Classes</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#text">Text</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#borders">Borders and Margins</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#background">Background and Layout</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}"><a href="#links">Links</a></td>
		<td onmouseover="if (ie){ this.style.backgroundColor='#ccc';}" onmouseout="if (ie){ this.style.backgroundColor='#eee';this.style.color='#00008B';}" style="border-right:thin white solid;"><a href="#hints">Hints and Tips</a></td>
	</tr>
</table>
</div>

<p>&nbsp;</p> 

<a id="intro"><br/></a>
<h1>Introduction</h1>
<p>Cascading Style Sheet, or CSS, is a means of controlling the style and layout of a web page. HTML is a markup language, and is used to structure a page in terms of its title, sections, and content. CSS is used for adjusting the color, size, style, and positioning of the HTML. A perfect web page will have no attributes in the HTML tags; all styles will be controlled by CSS.</p>
<p>CSS's goal is to provide a convenient and efficient way to adjust the style and layout of all pages on a website. This is accomplished by using a separate <tt>.css</tt> file to complement the <tt>.html</tt> files. All of the <tt>.html</tt> files on a page use a single <tt>.css</tt> file, so a simple change in the <tt>.css</tt> file will automatically change how each <tt>.html</tt> file displays in a browser.</p>
<p>Imagine you want to change all the fonts on your site from black to navy blue. Without CSS, you must manually edit every <tt>.html</tt> file by changing all of its fonts to navy blue. With CSS, you only need to change a line or two in the <tt>.css</tt> file and all of the <tt>.html</tt> pages will display with the new font color despite not having been editted. Imagine using the non-CSS method on a hundred <tt>.html</tt> files, or a thousand. This idea is analogous to a professor handing out a printed syllabus to his students. If the professor decides to make a correction later, he must issue a new syllabus to every student; tracking them all down and making sure everyone has the latest copy can be tedious. But if the professor keeps the syllabus on his website, a simple update to that file will be present whenever any student views it.</p>
<p>The <em>cascading</em> part of CSS refers to using several different style sheets on a single page, each one overriding others depending on their definitions. For example, suppose you have a style sheet, <tt>style1.css</tt>, which tells the fonts to be red, and another sheet, <tt>style2.css</tt>, which tells the fonts to be green, bold, and 12 pixels high. Since <tt>style2.css</tt> is more strict, it will override <tt>style1.css</tt>. However, if <tt>style1.css</tt> also contains instructions for images, but <tt>style2.css</tt> doesn't, <tt>style1.css</tt> will be considered more strict about images, and the resulting page will display <tt>style2.css</tt>'s font definitons and <tt>style1.css</tt>'s image definitions.</p>
<p>Styles do not necessarily have to be implemented using <tt>.css</tt> files. The style code can also be placed in the <code>&lt;head&gt;</code> section of the HTML file. Note that when you do this, it automatically overrides any external <tt>.css</tt> files that you use. Also keep in mind that you are losing the ease of changing several files at once as described above; this method should only be used when the style applies to just a single <tt>.html</tt> file.</p>


<p>&nbsp;</p>
<hr />
<br/>
<a id="fund"><br/></a>
<h1>Fundamentals</h1>
<p>CSS code is written by defining certain characteristics of an HTML tag. First the function is listed, followed by a set of opened and closed curly brackets:</p>

	<div class="codeblock"><code>tag name {
		<br/>
		<span style="margin-left:48px;">}</span></code>
	</div>
<p>The definitions are written by listing a function and its value:</p>
	<div class="codeblock"><code>function: value;</code></div>
<p>The function is place between the curly brackets.</p>
	<div class="codeblock"><code>tag name {
		<br/><span style="margin-left:48px;">function: value;</span>
		<br/>
		<span style="margin-left:48px;">}</span></code>
	</div>

<p>A tag definition may contain more than one function, and each function can contain more than one value. Also, definitions may apply to several tags.</p>

	<div class="codeblock"><code>tagA, tagB {
		<br/><span style="margin-left:48px;">function1: value1;</span>
		<br/><span style="margin-left:48px;">function2: value2;</span>
		<br/><span style="margin-left:48px;">function3: value3 value4;</span>
		<br/>
		<span style="margin-left:48px;">}</span></code>
	</div>
	
<p>Note that tag names must be 