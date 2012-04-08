# Chromorph

**Convert between many web color formats, including alpha transparency**

Chromorph will convert an alpha-transparent color value into the equivalent non-alpha value, taking into account the color(s) displayed behind it.

`rgba(24, 105, 210, 0.5)` with `#fff` background &rarr; `rgb(139, 179, 232)` or `#8BB3E8`

It is aimed at older browsers which don't support HSLA or RGBA.

***Chromorph is in beta and not all conversions work properly at the moment.***

## Usage

`chromorph()` takes a string or array and returns an object. That object contains the color in each format (hex, rbg, rgba, hsl, and hsla) as both arrays and strings.

    var myColor = chromorph("rgba(24, 105, 210, 0.5)");
    console.log(myColor.hex.string); // "#8BB3E8"
    console.log(myColor.hsla.array); // [213, 79, 45, 0.5]

### Settings

You can pass a settings object with the following defaults:

* `bg: #ffffff  // background color for alpha transparency`
* `format: all  // formats to return [hex, rgb, rgba, hsl, hsla]`
* `type: object // return type [string, array, object containing both]`
* `round: true  // round RGB values to integers and alpha values to 1 decimal` 

Example of converting an HSLA value to hex:

    chromorph([213, '79%', '45%', .25], {bg:'#fff', format: 'hex', type: 'string', round: true});
    // Returns "#C5DAF4" 

    
### Dependencies

For older browsers that don't support `Array.forEach`, you'll need to include a polyfill, such as the one from [Mozilla Developers Network](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach#Compatibility).


## What's Next

- Complete all conversion combinations
- **jQuery plugin** that automatically applies a hex/rgb color value to elements when the browser doesn't support transparency does not require jQuery (the jQuery plugin will remain)
- Online web app for quick conversions

## Change History

### 0.1 - October 22, 2011
- Initial beta version

## License

Have fun with it -- BSD, MIT, or GPL; see included LICENSE file

## Author

Craig Patik; [patik.com](http://patik.com/), [@craigpatik](https://twitter.com/craigpatik)
