(function(w, d) {
  var
  
  // Query the document and return an array (not a nodelist or collection) of matches
  q = function(selector) {
    return Array.prototype.slice.call(d.querySelectorAll(selector)) || [];
  },
  
  rdbl = {
    hasRun: false,
    
    init: function() {
      if (window.addEventListener) {
        window.addEventListener('resize', function() { setTimeout(rdbl.adjustHeights, 10); }, false);
      }
      // Needs to run after Google updates the value itself
      setTimeout(rdbl.adjustHeights, 10);
    },
    
    adjustHeights: function() {
      // Add 20px to #scrollable-sections and #entries heights, which are inserted dynamically by Google
      var offset = rdbl.hasRun ? 0 : 20;
      q("#scrollable-sections, #entries").forEach(function(elem) {
        if (elem.style.height) {
          elem.style.height = (parseInt(elem.style.height, 10) + offset) + "px";
        }
      });
      rdbl.hasRun = true;
    }
  };
	
  rdbl.init();
  
  window.rdbl = rdbl;
})(window, document, undefined);


