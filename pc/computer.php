<?php 
# require_once('../inc/html.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
  ?>
  <div id="home-main" role="main">
  <style>
    .item {
      text-align: left;
      padding: 1.0em;
      list-style-type: none;
      width: 92%;
      margin: 0 auto;
    }
    .alt {
      background-color: white;
    }
  	.rgba .alt {
      background-color: rgba(255,255,255,0.5);
  	}
    .item ul li {
      list-style-type: disc;
      margin-left: 3em;
    }
    .item p a {
      font-size: 1em;
    }
    .topLink {
      text-align: left;
      color: navy;
    }
    .jumpLink {
      font-size: smaller;
    }
  	pre.code {
  		background-color: #06C;
  		color: white;
  		border: #888 solid 0.15em;
  		padding: 0.5em;
  	}
  </style>

	<h1>Computers</h1>
  
  <section>
    <h2>MacBook Air</h2>
    <p>11" with 1.8GHz i7 processor</p>
     
    <h2>Desktop PC</h2>
    <p>Built July 2009</p>
    <ul>
      <li>AMD 3.0GHz Quad-Core processor <a href="#processor" class="jumpLink">[more]</a></li>
      <li>4GB RAM <a href="#memory" class="jumpLink">[more]</a></li>
      <li>GeForce 9600 GT video card <a href="#videocard" class="jumpLink">[more]</a></li>
      <li>Dual LCD monitors <a href="#monitor" class="jumpLink">[more]</a></li>
      <li>Windows 7</li>
    </ul>
    
    <ul>
      <li class="item alt" id="processor">
        <h2>Processor</h2>
        <h3>AMD Phenom II X4 3.0GHz Quad-Core</h3>
        <p><img src="/pc/computer_files/pc2009_processor.png" alt="AMD Phenom II X4 3.0GHz Quad-Core processor retail box" /></p>
        <ul>
          <li>4 x 128KB L1 Cache</li>
          <li>4 x 512KB L2 Cache</li>
          <li>6MB L3 Cache</li>
          <li>Socket AM2+, 125W, 45 nm</li>
          <li>32 and 64 bit Support</li>
          <li>940 Deneb, Black Edition, Model #HDZ940XCGIBOX</li>
        </ul>
        <p><a href="http://www.amd.com/us/products/desktop/processors/phenom-ii/Pages/phenom-ii-model-number-comparison.aspx">Product Link</a></p>
        <p><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16819103471">Newegg Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
      <li class="item">
        <h2>Motherboard</h2>
        <h3>Gigabyte GA-MA790X-UD4P</h3>
        <p><img src="/pc/computer_files/pc2009_motherboard.png" alt="Gigabyte GA-MA790X-UD4P motherboard" /></p>
        <ul>
          <li>Front side bus: 5200/2000 MT/s</li>
          <li>Socket type: AM3/AM2+/AM2</li>
          <li>Chipset:
            <ul>
              <li>North bridge: AMD 790X</li>
              <li>South bridge: AMD SB750</li>
            </ul>
          </li>
          <li>Memory: 4×240pin, DDR2 1333 OC, 16GB max, Dual Channel</li>
          <li>Expansion slots:
            <ul>
              <li>1 x PCI Express x16, running at x16 (PCIEX16_1)</li>
              <li>1 x PCI Express x16, running at x8 (PCIEX8_1)</li>
              <li>3 x PCI Express x1</li>
              <li>2 x PCI</li>
            </ul>
          </li>
          <li>Storage:
            <ul>
              <li>6 x SATA 3Gb/s</li>
              <li>SATA RAID: 0/1/5/10/JBOD</li>
              <li>PATA: 1 x ATA100, 2 devices max</li>
            </ul>
          </li>
          <li>Audio: Realtek ALC889A, 8 channels</li>
          <li>LAN: Realtek 8111DL, 10/100/1000Mbps</li>
          <li>Rear Panel Ports:
            <ul>
              <li>8 x USB 2.0</li>
              <li>2 x IEEE 1394a</li>
              <li>S/PDIF out: 1 x Optical, 1 x Coaxial</li>
              <li>6 audio ports</li>
              <li>2 x PS/2</li>
            </ul>
          </li>
          <li>Onboard ports:
            <ul>
              <li>4 x USB 2.0</li>
              <li>1 x 1394a</li>
            </ul>
          </li>
          <li>Physical Spec:
            <ul>
              <li>ATX</li>
              <li>12.0" x 9.2"</li>
              <li>24-pin power</li>
            </ul>
          </li>
        </ul>
        <p><a href="http://www.gigabyte.us/Products/Motherboard/Products_Spec.aspx?ProductID=3031">Product Link</a></p>
        <p><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16813128387">Newegg Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
      <li class="item alt" id="memory">
        <h2>Memory</h2>
        <h3>2 x Kingston HyperX 2GB</h3>
        <p><img src="/pc/computer_files/pc2009_memory.png" alt="Two Kingston HyperX memory sticks" /></p>
        <ul>
          <li>240-Pin DDR2 1066 SDRAM</li>
          <li>Model KHX8500D2/2G</li>
          <li>Cas Latency: 5</li>
          <li>2.3V</li>
        </ul>
        <p><a href="http://www.kingston.com/HyperX/products/khx_ddr2.asp">Product Link</a></p>
        <p><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16820104072">Newegg Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
      <li class="item">
        <h2>Case</h2>
        <h3>Cooler Master Centurion 5</h3>
        <p><img src="/pc/computer_files/pc2009_case.png" alt="Cooler Master Centurion 5 computer case" /></p>
        <ul>
          <li>Type: ATX Mid-Tower</li>
          <li>Drive bays:
            <ul>
              <li>5 x External 5.25"</li>
              <li>1 x External 3.5"</li>
              <li>4 x Internal 3.5"</li>
              <li>7 expansion slots</li>
            </ul>
          </li>
          <li>Front ports:
            <ul>
              <li>2 x USB2.0</li>
              <li>2 x Audio</li>
              <li>1 x IEEE1394</li>
            </ul>
          </li>
          <li>Fans:
            <ul>
              <li>1 x 80mm front fan</li>
              <li>1 x 120mm rear fan</li>
            </ul>
          </li>
          <li>Tool-free assembly</li>
          <li>Side Panel Window</li>
          <li>Aluminum Bezel, SECC Chassis</li>
          <li>18.9" x 8" x 17.2" (DxWxH)</li>
          <li>Model: CAC-T05-WW</li>
        </ul>
        <p><a href="http://www.coolermaster.com/products/product.php?act=detail&amp;id=21">Product Link</a></p>
        <p><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16811119077">Newegg Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
      <li class="item alt">
        <h2>Power Supply</h2>
        <h3>Corsair CMPSU-850TX</h3>
        <p><img src="/pc/computer_files/pc2009_psu.png" alt="Corsair CMPSU-850TX power supply" /></p>
        <ul>
          <li>850W</li>
          <li>Type: ATX12V 2.2 / EPS12V 2.91</li>
          <li>Connectors:
            <ul>
              <li>20+4Pin main connector</li>
              <li>4 x 6+2-Pin PCI-Express connectors</li>
              <li>8 x SATA power connector</li>
            </ul>
          </li>
          <li>Input: 100-240V, 50/60 Hz, 12A</li>
          <li>Model: CMPSU-850TX</li>
          <li>SLI and Crossfire ready</li>
          <li>140mm thermally controlled fan</li>
        </ul>
        <p><a href="http://www.corsair.com/products/tx/default.aspx">Product Link</a></p>
        <p><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16817139009">Newegg Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
      <li class="item" id="videocard">
        <h2>Graphics/Video Card</h2>
        <h3>GeForce 9600 GT</h3>
        <p><img src="/pc/computer_files/pc2009_videocard.png" alt="BFG GeForce 9600 GT graphics card" /></p>
        <ul>
          <li>BFG Tech BFGE96512GTOCBE</li>
          <li>Core clock 675MHz</li>
          <li>Memory: 512MB, 1800MHz, 256-bit, GDDR3</li>
          <li>64 stream processors</li>
          <li>DirectX 10, OpenGL 2.1</li>
          <li>2 x DVI output</li>
          <li>HDCP Ready</li>
          <li>2560 x 1600 max resolution</li>
          <li>PCI Express 2.0 x16</li>
        </ul>
        <p><a href="http://www.bfgtech.com/bfgr96512gtoce.aspx">Product Link</a></p>
        <p><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16814143161">Newegg Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
      <li class="item alt">
        <h2>Hard Drive</h2>
        <h3>Western Digital 1TB</h3>
        <p><img src="/pc/computer_files/pc2009_harddrive.png" alt="Western Digital 1TB Caviar Black hard drive" /></p>
        <ul>
          <li>7200 RPM</li>
          <li>32MB Cache</li>
          <li>SATA 3.0Gb/s</li>
          <li>Model: Caviar Black WD1001FALS</li>
          <li>3.5" internal</li>
        </ul>
        <p><a href="http://www.wdc.com/en/products/products.asp?driveid=488">Product Link</a></p>
        <p><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16822136284">Newegg Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
      <li class="item">
        <h2>DVD burner</h2>
        <h3>Samsung 22x DVD Writer</h3>
        <p><img src="/pc/computer_files/pc2009_dvd.png" alt="Samsung 22x DVD Writer" /></p>
        <ul>
          <li>22x DVD+R, DVD-R</li>
          <li>48x CD-R</li>
          <li>Read speed: 16X DVD, 48X CD</li>
          <li>Dual-layer</li>
          <li>2MB Cache</li>
          <li>SATA</li>
          <li>Model: SH-S223L</li>
        </ul>
        <p><a href="http://www.cdrlabs.com/Optical-Drives/Samsung-SH-S223L-External-22x-DVD-Writer.html">Product Link</a></p>
        <p><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16827151188">Newegg Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
      <li class="item alt" id="monitor">
        <h2>Main monitor</h2>
        <h3>Asus 24" Widescreen LCD</h3>
        <p><img src="/pc/computer_files/pc2009_monitor-widescreen.png" alt="Asus 24-inch Widescreen LCD monitor" /></p>
        <ul>
          <li>Resolution: 1920 x 1200 (WUXGA)</li>
          <li>Response Time: 2ms</li>
          <li>Brightness: 450 cd/m2</li>
          <li>Contrast Ratio: 1000:1 (ASCR 3000:1)</li>
          <li>Viewing Angle: 170°(H) / 160°(V)</li>
          <li>Color Saturation 92% (NTSC)</li>
          <li>DVI, HDMI, D-Sub inputs</li>
          <li>Built-in 1.3MP webcam, speakers</li>
          <li>Model: MK241H</li>
        </ul>
        <p><a href="http://ca.asus.com/products.aspx?l1=10&amp;l2=151&amp;l3=638&amp;l4=0&amp;model=2063&amp;modelmenu=1">Product Link</a></p>
        <p><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16824236033">Newegg Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
      <li class="item">
        <h2>Second monitor</h2>
        <h3>Planar 19" LCD monitor</h3>
        <p><img src="/pc/computer_files/pc2009_monitor-old.png" alt="Planar 19-inch LCD monitor" /></p>
        <ul>
          <li>Resolution: 1280 x 1024</li>
          <li>75Hz</li>
          <li>Model: CT1904Z</li>
        </ul>
        <p><a href="http://www.planar.com/support/Support_By_Product/Home%20and%20Business/archive/">Product Link</a></p>
        <div class="topLink">
          <a href="#top">top</a>
        </div>
      </li>
    </ul>
  </section>
  </div>
  
   <?php
}

$x = new Print_html();
$x->name = 'computer';
$x->section = 'code';
$x->pageTitle = 'Computer';
$x->keywords = 'software, firefox, greasemonkey, scripts, windows, applications, install, ubuntu, linux';
$x->dirLevel = 1;
$x->useragent = $_SERVER['HTTP_USER_AGENT'];

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
