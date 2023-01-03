var chrtool = {
  $body: null,
	doRound: true,
	
	// Regular expressions to test for valid color values
	regex: {
		hex: /^#?([0-9abcdef]{3}|[0-9abcdef]{6})$/i,
		rgb: /^\s*(?:rgb\()?\s*(\d+%?),\s*(\d+%?),\s*(\d+%?)\)?\;?$/i,
		rgba: /^\s*(?:rgba\()?\s*(\d+%?),\s*(\d+%?),\s*(\d+%?),\s*(\d?\.?\d+)\)?\;?$/i,
		clean: /\s|#|_/gi
	},
  
  init: function() {
    
    chrtool.events.init();
  },
  
  events: {
    init: function() {
			$('#colors-form').bind('submit', function(evt) {
				evt.preventDefault();
				evt.stopPropagation();
				//console.log('calling with: ' + $('#rgba-in').val() + ', {bg: ' + $('#bg-in').val() + '}');
				var $bg = $('#preview-bg'),
						$main = $('#preview-main'),
						mainColor = $('#rgba-in').val(),
						bgColor = $('#bg-in').val() || '#ffffff',
						formats = 'hex,rgb,rgba,hsl,hsla'.split(','),
						col, format, i;
				$('#preview').hide();
				// Convert color
				col = chromorph(mainColor, {bg: bgColor, format: 'rgb', type: 'object', round: chrtool.doRound});
				if (col) {
          console.log(col);
					// Print values
          while (format = formats.pop()) {
            $('#' + format + '-str').val(col[format].string);
            j = col[format].array.length;
            while (j--) {
              $('#' + format + '-arr-' + j).val(col[format].array[j]);
            }
          }
					// Show preview
					$('#preview').show();
					$main
						.css('background-color', '#' + col.hex.string.replace('#', ''))
						.find('.preview-text').first().html('#' + col.hex.string.replace('#', ''));
					// If alpha value, show background
					if (parseFloat(col.rgba.array[3]) < 1) {
						$bg
							.css('background-color', bgColor)
							.find('.preview-text').first().html('Background:' + bgColor);
					}
					else {
						$bg
							.css('background-color', 'transparent')
							.find('.preview-text').first().html('');
					}
        }
				return false;
			});
			
			$('#submit').bind('click keydown', function(evt) {
				evt.preventDefault();
				evt.stopPropagation();
				$('#colors-form').submit();
				return false;
			});
			
			$('#do-rnd').bind('change', function(evt) {
				chrtool.doRound = evt.target.checked;
			});
    }
  }  
};

$(document).ready(function() {
  chrtool.init();
});
