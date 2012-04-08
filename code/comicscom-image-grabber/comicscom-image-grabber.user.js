// ==UserScript==
// @name           Comics.com Image Grabber
// @namespace      http://patik.com/code/
// @include        http://*.google.com/reader/*
// ==/UserScript==

var cmcimg = {
  items: [],
  timer: null,
  
  init: function() {
    cmcimg.collectFeedItems();
    // Add event listener to call that func again when the page/view updates with more items...
    cmcimg.timer = setInterval(cmcimg.collectFeedItems, 5000);
  },
  
  collectFeedItems: function() {
    var originalLength = cmcimg.items.length,
        items, page_url, i;
    
    clearInterval(cmcimg.timer);
    cmcimg.timer = null;
    
    // Find all Comics.com feed items
    items = document.querySelectorAll('#entries .entry');
    
    // Get URLs to their comics.com pages
    i = items.length;
    while (i--) {
      // Extra URL of the comics.com page
      items[i].className += 'cmcimg_entry_' + i;
      page_url = items[i].querySelector('a.entry-title-link');
      // Make sure we haven't already done this one
      if (!cmcimg.inArray(page_url)) {
        // Add item to the array
        cmcimg.items.push({
          className: items[i].className,
          callback: 'cmcimg_' + i,
          page_url: page_url,
          image_url: ''
        });
      }
      // If this item has been done, make sure the image is still in the HTML
      else {
        if (!item[i].querySelectorAll('.comicscom-grabbed-image').length) {
          item[i].innerHTML += '<a href="' + data.page_url + '"><img class="comicscom-grabbed-image" src="' + data.image_url + '"></a>';
        }
      }
    }
    
    // If any new items were added, download those items' images
    if (cmcimg.items.length > originalLength) {
      cmcimg.retrieveImages();
    }
    
    cmcimg.timer = setInterval(cmcimg.collectFeedItems, 5000);
  },
  
  retrieveImages: function() {
    // Create callback functions and retrieve URLs
    var script, head, i;
    i = cmcimg.items.length;
    head = document.getElementsByTagName('head')[0];
    while (i--) {
      if (cmcimg.items[i]['image_url'].length) {
        console.log('creating function called ' + cmcimg.items[i][callback] + ' for page url ' + cmcimg.items[i][page_url]);
        window[cmcimg.items[i]['callback']] = function(data) {
          // Handle server response
          if (!data.okay) { console.log(data.message); return false; }
          var i = cmcimg.items.length, item, j;
          while (i--) {
            for (j in cmcimg.items[i]) {
              if (j['page_url'] == data.page_url) {
                // Insert image into feed item, if it hasn't been already
                if (document.querySelector('.' + j['className'])) {
                  document.querySelector('.' + j['className']).innerHTML += '<a href="' + data.page_url + '"><img class="comicscom-grabbed-image" src="' + data.image_url + '"></a>';
                  addImageHTML();
                  j['image_url'] = data.image_url;
                }
                break;
              }
            }
          }
        };
        // Retrieve URL
        script = document.createElement('script');
        script.src = 'http://patik.com/code/comicscom-image-grabber/?cb=' + cmcimg.items[i][callback] + '&url=' + encodeURIComponent(cmcimg.items[i][page_url]);
        head.appendChild(script);
      }
    }
  },
  
  addImageHTML: function(entry, image_url, page_url) {
    entry.innerHTML += '<a href="' + page_url + '"><img class="comicscom-grabbed-image" src="' + image_url + '"></a>';
  },
  
  inArray: function(page_url) {
    var j = cmcimg.i;
    while (j--) {
      if (cmcimg.items[j]['page_url'] == page_url) {
        return true;
      }
    }
    return false;
  },
};

cmcimg.init();
