<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="color-converter-main" role="main">
    
    <h1>Chromorph</h1>
    <h2>Color Converter</h2>
    
    <section id="features">
      <p style="color:#900;font-style:italic;font-weight:bold;font-size:18px;">Chromorph is currently under development. Not all conversions work properly, particularly with alpha transparency.</p>
    	<p>Chromorph is a color conversion tool for web developers using colors in CSS.</p>
      <p>It can be used as a standalone function or (coming soon) a jQuery plugin. See <a href="#features">features</a> below. You can also <a href="https://github.com/cpatik/chromorph">fork it on GitHub</a>.</p>
    </section>
    
    <section>
    	<h2>Quick Converter</h2>
      <form id="colors-form" action="." method="get">
      	<label for="rgba-in">Input:</label>
        <input type="text" size="22" id="rgba-in" value="rgba(24, 105, 210, 0.75)" placeholder="rgba(24, 105, 210, 0.75)" tabindex="1">
        <br>
      	<label for="bg-in">Background, if RGBA:</label>
        <input type="text" size="12" id="bg-in" placeholder="#fffff" tabindex="1">
        <label for="do-round">Round values?</label>
        <input type="checkbox" checked="checked" id="do-round" tabindex="1">
        <br>
        <a id="submit" class="button spark">Convert</a>
        
        <table id="output">
          <thead>
            <tr>
              <th>Format</th><th>CSS</th><th>R</th><th>G</th><th>B</th><th>A</th>
            </tr>
          </thead>
          <tbody>
        		<tr>
            	<td>
              	<label for="hex-str">Hex:</label>
              </td>
              <td>
              	<input type="text" size="22" id="hex-str" readonly class="string-out" tabindex="2">
              </td>
              <td>
              	<label for="hex-arr-0" class="arr-out">R:</label>
                <input type="text" size="4" id="hex-arr-0" readonly class="arr-out" tabindex="2">
              </td>
              <td>
              	<label for="hex-arr-1" class="arr-out">G:</label>
			          <input type="text" size="4" id="hex-arr-1" readonly class="arr-out" tabindex="2">
              </td>
              <td>
              	<label for="hex-arr-2" class="arr-out">B:</label>
			          <input type="text" size="4" id="hex-arr-2" readonly class="arr-out" tabindex="2">
              </td>
            </tr>
            <tr>
              <td>
              	<label for="rgba-str">RGBA:</label>
              </td>
              <td>
			          <input type="text" size="22" id="rgba-str" readonly class="string-out" tabindex="2">
              </td>
              <td>
              	<label for="rgba-arr-0" class="arr-out">R:</label>
          			<input type="text" size="4" id="rgba-arr-0" readonly class="arr-out" tabindex="2">
              </td>
              <td>
         				<label for="rgba-arr-1" class="arr-out">G:</label>
              	<input type="text" size="4" id="rgba-arr-1" readonly class="arr-out" tabindex="2">
              </td>
              <td>
			          <label for="rgba-arr-2" class="arr-out">B:</label>
      			    <input type="text" size="4" id="rgba-arr-2" readonly class="arr-out" tabindex="2">
              </td>
              <td>
              	<label for="rgba-arr-3" class="arr-out">A:</label>
			          <input type="text" size="4" id="rgba-arr-3" readonly class="arr-out" tabindex="2">
              </td>
            </tr>
            <tr>
              <td>
              	<label for="rgb-str">RGB:</label>
              </td>
              <td>
        			  <input type="text" size="22" id="rgb-str" readonly class="string-out" tabindex="2">
              </td>
              <td>
              	<label for="rgb-arr-0" class="arr-out">R:</label>
 				        <input type="text" size="4" id="rgb-arr-0" readonly class="arr-out" tabindex="2">
              </td>
              <td>
              	<label for="rgb-arr-1" class="arr-out">G:</label>
      			    <input type="text" size="4" id="rgb-arr-1" readonly class="arr-out" tabindex="2">
              </td>
              <td>
              	<label for="rgb-arr-2" class="arr-out">B:</label>
			          <input type="text" size="4" id="rgb-arr-2" readonly class="arr-out" tabindex="2">
              </td>
            </tr>
            <tr>
              <td>
                <label for="hsl-str">HSL:</label>
              </td>
              <td>
                <input type="text" size="22" id="hsl-str" readonly class="string-out" tabindex="2">
              </td>
              <td>
              	<label for="hsl-arr-0" class="arr-out">H:</label>
         				<input type="text" size="4" id="hsl-arr-0" readonly class="arr-out" tabindex="2">
              </td>
              <td>
              	<label for="hsl-arr-1" class="arr-out">S:</label>
      			    <input type="text" size="4" id="hsl-arr-1" readonly class="arr-out" tabindex="2">
              </td>
              <td>
              	<label for="hsl-arr-2" class="arr-out">L:</label>
			          <input type="text" size="4" id="hsl-arr-2" readonly class="arr-out" tabindex="2">
             	</td>
            </tr>
            <tr>
              <td>
                <label for="hsla-str">HSLA:</label>
              </td>
              <td>
                <input type="text" size="22" id="hsla-str" readonly class="string-out" tabindex="2">
              </td>
              <td>
              	<label for="hsla-arr-0" class="arr-out">H:</label>
         				<input type="text" size="4" id="hsla-arr-0" readonly class="arr-out" tabindex="2">
              </td>
              <td>
              	<label for="hsla-arr-1" class="arr-out">S:</label>
      			    <input type="text" size="4" id="hsla-arr-1" readonly class="arr-out" tabindex="2">
              </td>
              <td>
              	<label for="hsla-arr-2" class="arr-out">L:</label>
			          <input type="text" size="4" id="hsla-arr-2" readonly class="arr-out" tabindex="2">
             	</td>
              <td>
              	<label for="hsla-arr-3" class="arr-out">A:</label>
			          <input type="text" size="4" id="hsla-arr-3" readonly class="arr-out" tabindex="2">
             	</td>
            </tr>
          </tbody>
        </table>
        
        <div id="preview" style="display:none;">
        	<div>Preview:</div>
        	<div id="preview-bg">
          	<div class="preview-text"></div>
        		<div id="preview-main">
            	<div class="preview-text"></div>
            </div>
          </div>
        </div>
        
        <input style="display:none;" type="submit" value="Convert" tabindex="1">
      </form>
    </section>
    
    <section>
    	<table id="examples">
      	<thead>
        	<tr>
          	<th>rgba</th><th>rgb</th><th>hsl</th><th>hex</th>
          </tr>
        </thead>
        <tbody>
        	<tr style="background-color:rgba(24, 105, 210, 1);">
          	<td>rgba(24, 105, 210, 1.00)</td><td>rgb(24, 105, 210)</td><td>hsl(214, 80%, 46%)</td><td>#1869D2</td>
          </tr>
          <tr style="background-color:rgba(24, 105, 210, 0.75);">
          	<td>rgba(24, 105, 210, 0.75)</td><td>rgb(82, 142, 221)</td><td>hsl(214, 67%, 60%)</td><td>#528EDD</td>
          </tr>
          <tr style="background-color:rgba(24, 105, 210, 0.5);">
          	<td>rgba(24, 105, 210, 0.50)</td><td>rgb(139, 179, 232)</td><td>hsl(214, 67%, 73%)</td><td>#8BB3E8</td>
          </tr>
          <tr style="background-color:rgba(24, 105, 210, 0.25);">
          	<td>rgba(24, 105, 210, 0.25)</td><td>rgb(197, 217, 243)</td><td>hsl(214, 66%, 86%)</td><td>#C5D9F3</td>
          </tr>
        </tbody>
      </table>
    </section>
    
    <section id="features">
      <h2>Features</h2>
      <!--<h3>Standard library and jQuery Plugin</h3>-->
      <ul>
      	<li>Converts alpha-transparent colors to their equivalent opaque formats (hex, rgb) while taking the background into account</li>
        <li>Provides a range of output options:
        	<ul>
          	<li><code>"rgb(12,34,56)"</code></li>
            <li><code>[12, 34, 56]</code></li>
            <li><code>{<span class="out-obj-l1">rgb</span>: <span class="out-obj-l2">{ string: 'rgb(12,34,56)', array: [12,34,56]}</span>, <span class="out-obj-l1">hex</span>: ...}</code></li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
  <?php
}

$x = new Print_html();
$x->name = 'chromorph';
$x->section = 'code';
$x->pageTitle = 'Chomorph Color Converter';
$x->keywords = 'convert colors, rgba, hex, rgb, hsla, hsl, web, javascript, jquery';
$x->scriptFiles = array('inc/script.js', 'inc/array.foreach.polyfill.min.js', 'chromorph.js');
$x->styleSheets = array('inc/style.css');
$x->dirLevel = 2;

# ajax request
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || !empty($_GET['return'])) {
	print_page_body();
}
# navigated directly
else {
	$x->redirect = true;
}

$x->print_full_page();

?>