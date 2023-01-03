<?php

$part = $_GET['part'];

switch($part) {
  case 'keywords':
    # Keywords
    $keywords = 'gps, geo-caching, gps log, hiking, buck mountain, lake george, adirondacks';
    return $keywords;
    break;
  case 'title':
    # Document title
    $title = 'GPS Logs';
    return $title;
    break;
  case 'useScript':
    # Use script.js?
    return 'script.js';
    break;
  case 'pageCSS':
    # Page-specific CSS
    $css = <<<EOTEOTEOT
    ul.mapList {
      float: left;
      list-style-type: none;
    }
    ul.mapList li {
      font-weight: bold;
      cursor: pointer;
    }
    ul.mapList li:hover {
      background-color: #558ED5;
      color: white;
    }
    div.mapContainer {
      float: right;
      border: 1px solid black;
    }
    .gpsList {
      margin: 1em;
      font-size: 1.2em;
      text-align: left;
    }
    iframe.mapContainer {
      margin: 0 auto;
    }
EOTEOTEOT;
    return $css;
    break;
  case 'content':
    # Page content (everything that goes inside div#mainBody
    $content = <<<EOTEOTEOT
  	<h2>GPS Logs</h2>
    <p>Below are some of the routes that I have tracked using my <a href="http://www.wintec.com.tw/en/product_detail.php?pro_id=65">GPS logger</a>.</p>
    <p>Click on each link to view the map.</p>
    
    <ul class="gpsList">
    	<li>Buck Mountain, May 24, 2009<br /><a href="http://picasaweb.google.com/lh/albumMap?uname=cpatik&aid=5339837849513224961#map" onclick="javascript:changeMapSimple('http://picasaweb.google.com/lh/albumMap?uname=cpatik&aid=5339837849513224961#map');return false;">Photos from this hike</a>
        	<ul>
            	<li><a href="#" onclick="javascript:changeMapSimple('/gps_files/GM_20090524120451.html');return false;">Drive to the mountain (partial)</a></li>
            	<li><a href="#" onclick="javascript:changeMapSimple('/gps_files/GM_20090524123824.html');return false;">Hike to the summit</a> with group of 6 plus a dog</li>
            	<li><a href="#" onclick="javascript:changeMapSimple('/gps_files/GM_20090524150338.html');return false;">Descent back to the car</a></li>
            	<li><a href="#" onclick="javascript:changeMapSimple('/gps_files/GM_20090524161158.html');return false;">My solo trip back</a> just 1km to catch up with everyone</li>
            	<li><a href="#" onclick="javascript:changeMapSimple('/gps_files/GM_20090524163807.html');return false;">Scenic drive back to Trout Lake</a></li>
            </ul>
        </li>
    </ul>
    
    <iframe id="mapContainer" scrolling="no" src="/gps_files/GM_20090524123824.html" style="width:98%;height:750px;"></iframe>
    
    <h2>Other Links</h2>
    <ul class="linkList">
      <li><a href="../guides/">Guides</a></li>
      <li>GPS Treks</li>
      <li><a href="../about/">Contact Me</a></li>
    </ul>
    
EOTEOTEOT;
    return $content;
  default:
    return false;
    break;
}

?>
