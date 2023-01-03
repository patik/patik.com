var chromorph = function(val, settings) {
  
  if (val === null || (!/string|object/.test(typeof val))) { return null; }
  settings = settings || {};
  
  var outval, i,
      opts = {
        bg: settings.bg || '#fff',
        of: settings.format || 'hex',
        ot: settings.type,
        elem: settings.elem || null,
        // default these to true, but make sure they weren't explicitly set to false
        hash: settings.hash === false? false : true,
        rnd: settings['round'] === false? false : true
      },
      // Regular expressions to test for valid color values
      regex = {
        hex: /^#?([0-9abcdef]{3}|[0-9abcdef]{6})$/i,
        rgb: /^\s*(?:rgb\()?\s*(\d+%?),\s*(\d+%?),\s*(\d+%?)\)?\;?$/i,
        rgba: /^\s*(?:rgba\()?\s*(\d+%?),\s*(\d+%?),\s*(\d+%?),\s*(\d?\.?\d+)\)?\;?$/i,
        hsl: /^\s*(?:hsl\()?\s*(\d+),\s*(\d+%),\s*(\d+%)\)?\;?$/i,
        hsla: /^\s*(?:hsla\()?\s*(\d+),\s*(\d+%),\s*(\d+%),\s*(\d?\.?\d+)\)?\;?$/i,
        clean: /\s|#|_/g
      },
      // Combined color of the element's ancestors
      bg = {
        hex: '',
        rgb: '',
        rgba: ''
      },
      
      //
      // Conversion methods
      //
      
      // Convert any format to RGBA; this result is used as the base value upon which all other conversions are performed
      // Returns an array with R, G, B, and A values as decimals
      convert = function(val, bg) {
        try {
          var arr = [], i,
              col = {
                      hex:  { string: '', array: [] },
                      rgb:  { string: '', array: [] },
                      rgba: { string: '', array: [] },
                      hsl:  { string: '', array: [] },
                      hsla: { string: '', array: [] }
                    };
          
          // Figure out which format was given and convert it to the other formats
          
          // If input was an array, convert it to a string first
          if (isArray(val)) {
            // Convert color percentage values to decimal values
            i = val.length;
            while (i--) {
              if (/\d+%/.test(val[i])) {
                arr[i] = percentToFloat(val[i].replace('%',''));
              }
            }
            
            // Value was RGB
            if (arr.length === 3) {
              col.rgb.array = arr;
              col.rgb.string = arrayToString.rgb(arr);
              col.rgba.array = arr.concat([1.0]);
              col.rgba.string = arrayToString.rgba(col.rgba.array);
            }
            else if (arr.length === 4) {
              col.rgba.array = arr;
              col.rgba.string = arrayToString.rgba(arr);
            }
            else {
              return false;
            }
          }
          // Numbers aren't preferred for input, but convert them to strings if they're the right length for hex
          else if (typeof val === 'number') {
            val = val.toString();
            if (val.length !== 3 && val.length !== 6) {
              throw new TypeError('input value was a number, possible a hex value, but the length was ' + val.length);
              return false;
            }
          }
          
          if (typeof val === 'string') {
            val = val.replace(regex.clean, '');
            if (regex.hex.test(val)) {
              val = normalizeHex(val);
              col.hex.array = stringToArray('hex', val);
              // Create a normalized string version by using the array that was just created
              col.hex.string = (opts.hash? '#' : '') + arrayToString.hex(col.hex.array);
            }
            else if (regex.rgba.test(val)) {
              col.rgba.array  = stringToArray('rgba', val);
              col.rgba.string = arrayToString.rgba(col.rgba.array);
            }
            else if (regex.rgb.test(val)) {
              col.rgb.array  = stringToArray('rgb', val);
              col.rgb.string = arrayToString.rgb(col.rgb.array);
            }
            else if (regex.hsla.test(val)) {
              col.hsla.array  = stringToArray('hsla', val);
              col.hsla.string = arrayToString.hsla(col.hsla.array);
            }
            else if (regex.hsl.test(val)) {
              col.hsl.array  = stringToArray('hsl', val);
              col.hsl.string = arrayToString.hsl(col.hsl.array);
            }
            else {
              return false;
            }
          }
          else {
            return false;
          }
          
          // Populate the object with any missing color formats
          
          // If we already have hex, rgb, or hsl, the others can be populated easily
          if (col.hex.string.length || col.rgb.string.length || col.hsl.string.length) {
            // Hex is known
            if (col.hex.string.length) {
              // Convert to rgb
              col.rgb.array  = hexToRgb(col.hex.string);
              col.rgb.string = arrayToString.rgb(col.rgb.array);
              // Convert to hsl
              col.hsl.array  = rgbToHsl(col.rgb.string);
              col.hsl.string = arrayToString.hsl(col.hsl.array);
            }
            // rgb is known
            else if (col.rgb.string.length) {
              // Convert to hex
              col.hex.array  = rgbToHex(col.rgb.string);
              col.hex.string = (opts.hash? '#' : '') + arrayToString.hex(col.hex.array);
              // Convert to hsl
              col.hsl.array  = rgbToHsl(col.rgb.string);
              col.hsl.string = arrayToString.hsl(col.hsl.array);
            }
            // hsl is known
            else {
              // Convert to rgb
              col.rgb.array  = hslToRgb(col.hex.string);
              col.rgb.string = arrayToString.rgb(col.rgb.array);
              // Convert to hex
              col.rgb.array  = hexToRgb(col.rgb.string);
              col.rgb.string = arrayToString.rgb(col.rgb.array);
            }
            // Alpha-transparent varieties will be the same but with an opacity of 1.0
            // RGBA
            col.rgba.array  = col.rgb.array.concat([1.0]);
            col.rgba.string = arrayToString.rgba(col.rgba.array);
            // HSLA
            col.hsla.array = col.rgb.array.concat([1.0]);
            col.hsla.string = arrayToString.hsla(col.hsl.array);
          }
          // Convert from RGBA or HSLA
          else if (col.rgba.string.length || col.hsla.string.length) {
            // Convert to RGB first
            if (col.rgba.string.length) {
              // Use given background color
              col.rgb.array = rgbaToRgb(col.rgba.array, bg);
              col.rgb.string = arrayToString.rgb(col.rgb.array);
              col.hsla.array = rgbaToHsla(col.rgba.array);
              col.hsla.string = arrayToString.hsla(col.hsla.array);
            }
            else {
              col.rgb.array = hslaToRgb(col.hsla.array, bg);
              col.rgb.string = arrayToString.rgb(col.rgb.array);
            }
            // Hex
            col.hex.string = (opts.hash? '#' : '') + rgbToHex(col.rgb.string);
            col.hex.array = stringToArray('hex', col.hex.string);
            // HSL
            col.hsl.array = rgbToHsl(col.rgb.array);
            col.hsl.string = arrayToString.hsl(col.hsl.array);
          }
          else {
            return null;
          }
          
          return col;
        } catch(e) { }
      },
      
      // Turn an array of [R,G,B,A] values into a CSS-style string
      arrayToString = {
        hex: function(arr) {
          try {
            return arr.join('');
          } catch(e) { }
        },
        rgb: function(arr) {
          try {
            return 'rgb(' + arr.join(', ') + ')';
          } catch(e) { }
        },
        rgba: function(arr) {
          try {
            return 'rgba(' + arr.join(', ') + ')';
          } catch(e) { }
        },
        hsl: function(arr) {
          try {
            return 'hsl(' + arr[0] + ', ' + arr[1] + '%, ' + arr[2] + '%)';
          } catch(e) { }
        },
        hsla: function(arr) {
          try {
            return 'hsla(' + arr[0] + ', ' + arr[1] + '%, ' + arr[2] + '%, ' + arr[3] + ')';
          } catch(e) { }
        }
      },
      
      // Turn a CSS-style string into an array of [R,G,B,A] values
      stringToArray = function(format, str) {
        var arr = [], formats = 'rgb,rgba,hsl,hsla'.split(','), i;
        try {
          if (!str || !format) {
            throw {error: 'bad args', message: 'bad args'};
          }
          format = format.toLowerCase();
          if (format === 'hex') {
            // Convert 3-char hex value to 6-chars
            str = normalizeHex(str);
            // Split into R, G, and B parts
            arr = /^(\w{2})(\w{2})(\w{2})$/.exec(str.replace('#','')).slice(1);
            // Convert each part to 16-bit integers
            arr.forEach(function(i) {
              i = parseInt(i, 16);
            });
          }
          else {
            // Test against each of the other formats
            i = formats.length;
            while (i--) {
              if (regex[formats[i]].test(str)) {
                arr = regex[formats[i]].exec(str).slice(1);
                break;
              }
            }
          }
        } catch(e) { }
        finally { return arr; }
      },
      
      // Converts hex string #abcdef to rgb array [255,255,255]
      hexToRgb = function(h) {
        var parts = null;
        try {
          if (typeof h === 'number') { h = h.toString(); }
          // Convert 3-char hex value to 6-chars
          h = normalizeHex(h);
          // Split into R, G, and B parts
          parts = /^(\w{2})(\w{2})(\w{2})$/.exec(h).slice(1);
          // Convert each part to 16-bit integers
          parts.forEach(function(c, i) {
            parts[i] = parseInt(c, 16);
          });
        } catch(e) { }
        finally {
          return parts;
        }
      },
      
      rgbaToRgb = function(rgba, bg) {
        // Algorithm thanks to Wikipedia and hkurabko: http://stackoverflow.com/questions/2049230/convert-rgba-color-to-rgb/2645218#2645218
        // Target.R = ((1 - Source.A) * BGColor.R) + (Source.A * Source.R)
        // Target.G = ((1 - Source.A) * BGColor.G) + (Source.A * Source.G)
        // Target.B = ((1 - Source.A) * BGColor.B) + (Source.A * Source.B)
        try {
          var rgb = [], i;
          if (bg) {
            bg = convert(bg, {format: 'rgb'}).a;
            if (!bg.length) {
              throw new TypeError('input background could not be converted to rgb ' + val.length);
            }
          }
          else {
            bg = [255, 255, 255]; // White
          }
          
          // Red
          rgb[0] = ((1 - rgba[3]) * bg[0]) + (rgba[3] * rgba[0]);
          // Green
          rgb[1] = ((1 - rgba[3]) * bg[1]) + (rgba[3] * rgba[1]);
          // Blue
          rgb[2] = ((1 - rgba[3]) * bg[2]) + (rgba[3] * rgba[2]);
          
          rgb = rnd(rgb);
          return rgb;
        } catch(e) { }
      },
      
      // RGB to Hex, thanks to http://www.javascripter.net/faq/rgbtohex.htm
      // Receives string, returns array
      rgbToHex = function(rgb) {
        try {
          // Split into separate color values
          rgb = stringToArray('rgb', rgb);
          if (!rgb) { return false; }
          // Convert each number individually to hexidecimal
          return decToHex(rgb[0]) + decToHex(rgb[1]) + decToHex(rgb[2]);
        } catch(e) { }
      },
      
      // RGBA to Hex
      rgbaToHex = function(rgba, bg) {
        try {
          // Split into separate color & alpha values
          rgba = stringToArray('rgba', rgba);
          if (!rgba) { return false; }
          // Convert to RGB
          rgba = rgbaToRgb(rgba, bg);
          // Convert each number individually to hexidecimal
          return decToHex(rgba[0]) + decToHex(rgba[1]) + decToHex(rgba[2]);
        } catch(e) { }
      },
      
      // Receives a string or array, returns an array
      // Thanks to Pointy: http://stackoverflow.com/questions/2348597/why-doesnt-this-javascript-rgb-to-hsl-code-work/2348659#2348659
      rgbToHsl = function(rgb) {
        try {
          if (typeof rgb === 'string') {
            rgb = stringToArray('rgb', rgb);
          }
          var r = (rgb[0]),
              g = (rgb[1]),
              b = (rgb[2]),
              max, min, delta, h, s, l;
          r /= 255;
          g /= 255;
          b /= 255;
          max = Math.max(r, g, b);
          min = Math.min(r, g, b);
          l = (max + min) / 2;
          
          if (max === min) {
            h = s = 0; // achromatic
          }
          else {
              delta = max - min;
              s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
              switch(max){
                  case r:
                    h = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                  case g:
                    h = (b - r) / delta + 2;
                    break;
                  case b:
                    h = (r - g) / delta + 4;
                    break;
                  default:
                    break;
              }
              h /= 6;
          }
      
          return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
        } catch(e) { }
      },
      
			// TO DO: Get shorter version: https://gist.github.com/1325937
      // http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
      hslToRgb = function(hsl) {
        try {
          if (typeof hsl === 'string') {
            hsl = stringToArray('hsl', hsl);
          }
          var chroma, hue, x, rgb, m;
          chroma = (1 - Math.abs(2*hsl[2] - 1)) * hsl[0];
          hue = hsl[0]/60;
          x = chroma*(1 - Math.abs(hue%2 - 1));
          if (0 <= hue < 1) {
            rgb = [chroma, x, 0];
          }
          else if (1 <= hue < 2) {
            rgb = [x, chroma, 0];
          }
          else if (2 <= hue < 3) {
            rgb = [0, chroma, x];
          }
          else if (3 <= hue < 4) {
            rgb = [0, x, chroma];
          }
          else if (4 <= hue < 5) {
            rgb = [x, 0, chroma];
          }
          else if (5 <= hue < 6) {
            rgb = [chroma, 0, x];
          }
          m = hsl[2] - 0.5*chroma;
          
          return [rgb[0] + m, rgb[1] + m, rgb[2] + m];
        } catch(e) { }
      },
      
      // RGBA to HSLA, thanks to http://www.javascripter.net/faq/rgbtohex.htm
      // Returns array
      rgbaToHsla = function(rgba) {
        try {
          if (typeof rgba === 'string') {
            rgba = stringToArray('rgba', rgba);
          }
          // Convert RGB segment to HSL and keep the same alpha value
          return rgbToHsl(rgba.slice(0, 3)).concat(parseFloat(rgba[3]));
        } catch(e) { }
      },
      
      // Converts hex string #abcdef to rgb array [255,255,255]
      hexToArray = function(h) {
        var parts = null;
        try {
          if (typeof h === 'number') { h = h.toString(); }
          // Convert 3-char hex value to 6-chars
          h = normalizeHex(h);
          // Split into R, G, and B parts
          parts = /^(\w{2})(\w{2})(\w{2})$/.exec(h).slice(1);
          
          // Convert each part to 16-bit integers
          parts.forEach(function(c) {
            c = parseInt(c, 16);
          });
        } catch(e) { return null; }
        finally {
          return parts;
        }
      },
        
      // Formatting
      
      rgbToArray = function(str) {
        var rgb = null;
        try {
          str = str.toString().replace(regex.clean, '');
          // Hex
          if (regex.hex.test(str)) {
            str = normalizeHex(str);
            rgb = hexToRgb(str);
          }
          // RGB
          else if (regex.rgb.test(str)) {
            rgb = regex.rgb.exec(str).slice(1);
          }
          // To do: from rgba
        }
        catch(e) { }
        finally {
          return rgb;
        }
      },
      
      // Convert #abc to #aabbcc
      normalizeHex = function(h) {
        try {
          // Validate h is a hex value
          if (!h || typeof h !== 'string') { return false; }
          h = h.replace(regex.clean, '');
          if (!regex.hex.test(h)) { return false; }
          
          // Already 6 characters, nothing to do
          if (h.length === 6) { return h; }
          
          // Can't help ya, buddy
          if (h.length !== 3) { return false; }
          
          var i = 0;
          while (i < 6) {
            h = h.substr(0,i) + h.charAt(i) + h.charAt(i) + h.substr(i+1)
            i += 2;
          }
          
          return h;
        } catch(e) { }
      },
      
      percentToFloat = function(val, limit) {
        try {      
          var test = val;
          // Make sure val is a number of some sort
          if (!/^(string|number)$/i.test(typeof val)) { return false; }
          val = parseFloat(val);
          if (isNaN(val)) { return false; }
          
          // Upper bound (number equivalent to 100%)
          limit = !isNaN(parseFloat(limit)) ? parseFloat(limit) : 255;
          
          // Perform calculation: "35%" -> "0.35 * 255". Also results in a string
          val = (val/100 * limit).toFixed(2);
          
          // Omit unnecessary extra decimals
          if (parseInt(val.substr(val.indexOf('.')+1)) === 0) {
            val = val.substr(0, val.indexOf('.'));
          }
          return parseFloat(val);
        } catch(e) { }
      },
      
      //
      // Numeric conversions
      //
      
      decToHex = function(n) {
        try {
          n = parseInt(n, 10);
          if (isNaN(n)) {
            return "00";
          }
          n = Math.max(0,Math.min(n,255));
          return "0123456789ABCDEF".charAt((n-n%16)/16)
               + "0123456789ABCDEF".charAt(n%16);
        } catch(e) { return false; }
      },
      
      rnd = function(a) {
        try {
          if (!opts.rnd || !a) { return a; }
          
          // If string, convert to number
          if (typeof a === 'string') {
            a = parseFloat(a);
          }
          
          // Single number
          if (!isNaN(a)) {
            return Math.round(a);
          }
          
          // Array values
          if (isArray(a)) {
            var i = a.length;
            while (i--) {
              if (isNaN(a[i])) { return null; }
              a[i] = Math.round(a[i]);
            }
            return a;
          }
          
          return null;
        } catch(e) { }
      },
      
      // Utilities
      isArray = function(a) {
        return Object.prototype.toString.call(a) === '[object Array]';
      };
  
  // Verify and normalize output format name (default: hex)
  if (!/^hex|rgb|rgba|hsl|hsla$/i.test(opts.of)) {
    opts.of = 'hex';
  }
  opts.of = opts.of.toLowerCase();
  
  // Detect output type if it was not specified
  if (!opts.ot) { opts.ot = 'string'; }
  if (!/^string|array|object$/i.test(opts.ot.toString())) {
    if (isArray(val)) {
      opts.ot = 'array';
    }
    else if (typeof val === 'object' && val !== null) {
      opts.ot = 'object';
    }
    else {
      opts.ot = 'string';
    }
  }
  
  // Prepare output value so it can be appended to at any point
  if (opts.ot === 'array') {
    outval = [];
  }
  else if (opts.ot === 'object') {
    outval = {hex: '', rgb: '', rgba: '', hsla: ''};
  }
  else {
    if (opts.of === 'Hex') {
      outval = '#';
    }
    else {
      outval = '';
    }
  }
  
  // Convert color
  outval = convert(val);
  
  return outval;
};
