# Within Viewport

***Determine whether elements are within the viewport***

Includes both a standalone, plain JavaScript function and a jQuery plugin with handy selectors and shorthand methods. 

The standalone function and jQuery plugin are equally functional. I recommend the plugin if you're using jQuery anyway; otherwise, use the standalone function.

## Usage

### Basic

    // Returns true if the element is entirely within view
    var elem = document.getElementById("#myElement");
    withinViewport(elem);

### Advanced

    // Test against only some sides of the viewport for faster performance
    withinViewport(elem, {sides: "left"});
    
    // Define your own viewport by specifying thresholds for each side
    // Example: element is at least 12px inside the top and right of the viewport
    withinViewport(elem, {top: 12, right: 12});

For more options, see 'Settings' section below.

### Shorthand notation

    // These will use the default thresholds; see 'Settings' section below
    withinViewport(elem, "bottom right");
    withinViewport.left(elem);
    
## jQuery plugin

### Include

The scripts must be included in this order:

    <script src="http://code.jquery.com/jquery-1.7.min.js"></script>
    <script src="withinViewport.js"></script>
    <script src="jquery.withinViewport.js"></script>

### Usage

#### Basic

    // Returns true if the element is entirely within the viewport
    $("#myElement").is(":within-viewport");

    // Returns a jQuery object of all <div>s that are within the viewport
    $("div").withinViewport();

#### Advanced

There are shorthand selectors and methods for testing against only one edge of the viewport.

    // Returns true if the element is within the left edge of the viewport
    // Also works with 'top', 'right', and 'bottom'
    $("#myElement").is(":within-viewport-left");

    // Returns a jQuery object containing all <div>s within the left edge of the viewport
    $("div").withinViewportLeft();

    // Same as above, but only elements that are at least 12px inside the left edge
    $("div").withinViewportLeft({left: 12});

These shortcuts will result in slightly better performance if you're testing hundreds or thousands of elements.

#### Live updating

If you're looking to keep tabs on elements' whereabouts at all times, you can bind to the `window`'s `resize` and `scroll` events. Instead of `scroll`, I recommend using [James Padolsey's `ScrollStop` event](http://james.padolsey.com/javascript/special-scroll-events-for-jquery/) since firing on every `window.scroll` event will [bring your UI to its knees](http://ejohn.org/blog/learning-from-twitter/).

    $(window).bind("resize scrollStop", function() {
      // Your code here...
      
      // Example:
      $("div")
        // Declare all divs out of the viewport...
        .removeClass("within-viewport");
        // Then filter them to reveal which ones are still within it
        .filter(":within-viewport")
          .addClass("within-viewport");
    });

A future version will allow you to fire custom events when elements pass in and out of the viewport.

## Settings

This applies to both the jQuery plugin and standalone function.

Use the object `withinView.defaults` to define your page's practical viewport compared to the actual browser viewport. 

For example, a fixed header with a height of 100px that spans the entire width of the page effectively lowers the viewport by 100px from the top edge of the browser window:

    withinView.defaults.top = 100;

If you only care about some edges of the viewport, you can specify them to improve performance:

    withinView.defaults.sides = "left bottom";

You can also pass settings on the fly to temporarily override the defaults:

    withinViewport(elem, {sides:"left bottom", left: 40});
    $("div").withinViewport({sides:"left bottom", left: 40});

Individual elements may have their own settings embedded in a `data` attribute using object notation. These will override both the defaults any any settings passed to the function on the fly (like the example above).

    <div data-withinviewport-settings="{sides: 'left', top: 40}">

You can specify *negative threshold values* to allow elements to reside outside the viewport.

## What's Next

- Option to **fire events** when elements pass in and out of the viewport
- Option to perform simple actions on matched elements (toggle class, set attribute value, etc)
- Test against Firefox 3.6, Safari 5.0.1
- Support IE7
- Find out how old of a jQuery version you can use (my guess: 1.4-ish)

No IE6 support is planned &mdash; if you'd like to add it, feel free to make a pull request.

## Credit

Within Viewport is inspired by these similar utilities which only reflect whether an element is at least partially in view:

* Remy Sharp's [Element 'in view' Event Plugin](http://remysharp.com/2009/01/26/element-in-view-event-plugin/)
* Mike Tuupola's [Viewport Selectors for jQuery](http://www.appelsiini.net/projects/viewport)

## History

### 0.2 - November 5, 2011

- Standalone version now available, no jQuery or other dependencies
- Cleaned up and standardized the jQuery plugin
- Added optional shortcut methods
- Added support for testing multiple sides at once (eg, left and bottom)
- Removed requirement for Array.forEach and replaced with faster while() loops
- Tested against IE8-9, Firefox 7, Chrome 15, Safari 5.1, Opera 11.52; Mac & Windows
- Included a demo

### 0.1 - October 15, 2011

- Initial beta version

## License

Have fun with it &mdash; BSD, MIT, or GPL; see included LICENSE file

## Author

Craig Patik, [patik.com](http://patik.com/) & [@craigpatik](https://twitter.com/craigpatik)
