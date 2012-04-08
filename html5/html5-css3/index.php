<?php
# require_once('../../inc/html.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="html5-2011-01-07-main" role="main">
    <h1>HTML5 &amp; CSS3</h1>
    <h2>Resources</h2>
    <ul class="taglist">
      <li>My <span style="text-decoration:line-through;">boring <a href="HTML5_CSS3_Today.ppt">PPT</a>/<a href="HTML5_CSS3_Today.pdf">PDF</a> slides</span> <a href="https://docs.google.com/present/view?id=dfg9wgw_344dpffx9mp&amp;revision=_latest&amp;start=0&amp;amp;theme=city&amp;cwj=true">super fun Google Docs presentation</a></li>
      <li>HTML5:
        <ul>
          <li>Tag list: <a href="http://www.w3schools.com/html5/html5_reference.asp">www.w3schools.com/html5/html5_reference.asp</a></li>
          <li>Demos: <a href="http://html5rocks.com">html5rocks.com</a> (sandbox: <a href="http://playground.html5rocks.com">playground.html5rocks.com</a>), <a href="http://html5demos.com/">html5demos.com</a></li>
          <li>Detailed default page structure: <a href="http://html5boilerplate.com">html5boilerplate.com</a></li>
          <li>(Most of) the new <code>&lt;input&gt;</code> types: <a href="http://miketaylr.com/code/input-type-attr.html">miketaylr.com/code/input-type-attr.html</a></li>
        </ul>
      </li>
      <li>CSS3:
        <ul>
          <li>Partial property list &amp; feature detection: <a href="http://modernizr.com/docs/">modernizr.com/docs/</a></li>
          <li>Another partial list, with examples: <a href="http://www.css3.info/preview/">css3.info/preview/</a></li>
          <li>Sandbox: <a href="http://css3please.com">css3please.com</a></li>
          <li>Properties that can be transitioned: <a href="http://www.w3.org/TR/css3-transitions/#properties-from-css-">w3.org/TR/css3-transitions/#properties-from-css-</a></li>
          <li>Just fooling around: <a href="http://markdotto.com/playground/3d-text/">3-D Text</a>, <a href="http://mothereffingtextshadow.com/">M-Fing Text Shadow</a>, <a href="http://mothereffinghsl.com/">M-Fing HSL</a></li>
        </ul>
      </li>
      <li>Dragging IE 6-8 into the present:
        <ul>
          <li>Shivs: <a href="http://code.google.com/p/html5shiv">code.google.com/p/html5shiv</a></li>
          <li>Emulating CSS3 selectors: <a href="http://selectivizr.com/">selectivizr.com</a></li>
          <li>Emulating (some) CSS3 effects: <a href="http://css3pie.com/">css3pie.com</a></li>
        </ul>
      </li>
      <li>Live, shareable sandbox: <a href="http://jsfiddle.net">jsfiddle.net</a> (<a href="http://jsfiddle.net/cpatik/dhDbz/">example</a>)</li>
      <li>Current browser support matrices: <a href="http://caniuse.com">caniuse.com</a>, <a href="http://quirksmode.org/css/contents.html">quirksmode.org/css/contents.html</a></li>
      <li>Gradient goodness: <a href="http://colorzilla.com/gradient-editor/">colorzilla.com/gradient-editor/</a></li>
      <li>Do web sites need to look exactly the same in every browser? <a href="http://dowebsitesneedtolookexactlythesameineverybrowser.com/">Answer</a></li>
      <li>Blogs for staying up to date with browser development:
        <ul>
          <li><a href="http://webkit.org/blog/">webkit.org/blog</a></li>
          <li><a href="http://blog.mozilla.com/">blog.mozilla.com</a></li>
          <li><a href="http://dev.opera.com/articles/css/">dev.opera.com/articles/</a></li>
        </ul>
      </li>
    </ul>
    <h2>Input Types</h2>
    <p><a href="http://jsfiddle.net/cpatik/nZurE/embedded/result/">Full screen</a></p>
    <iframe style="width: 97%; height: 300px" src="http://jsfiddle.net/cpatik/nZurE/embedded/html,js,css,result/"></iframe>
    <h2>Data Attribute</h2>
    <p><a href="http://jsfiddle.net/cpatik/mYCjr/embedded/result/">Full screen</a></p>
    <iframe style="width: 97%; height: 300px" src="http://jsfiddle.net/cpatik/mYCjr/embedded/js,html,css,result/"></iframe>
    <h2>Button</h2>
    <p><a href="http://jsfiddle.net/cpatik/eDGYf/embedded/result/">Full screen</a></p>
    <iframe style="width: 97%; height: 300px" src="http://jsfiddle.net/cpatik/eDGYf/embedded/css,html,result/"></iframe>
    <h2>RGBA versus Opacity</h2>
    <p><a href="http://jsfiddle.net/cpatik/EjnPR/embedded/result/">Full screen</a></p>
    <iframe style="width: 97%; height: 300px" src="http://jsfiddle.net/cpatik/EjnPR/embedded/css,html,result/"></iframe>
  </div>
  <?php
}

$x = new Print_html();
$x->name = 'html5-css3';
$x->section = 'html5';
$x->pageTitle = 'HTML5 &amp; CSS3';
$x->keywords = 'html5, css3';
$x->dirLevel = 2;
# $x->styleSheets = array('style.css', 'lib/css/smoothness/jquery-ui-1.8.7.custom.css');

# ajax request
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || !empty($_GET['return'])) {
  print_page_body();
  exit();
}
# navigated directly
else {
  $x->redirect = true;
}

$x->print_full_page();

?>
