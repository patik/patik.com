<?php
/**
 * Groups configuration for default Minify implementation
 * @package Minify
 */

/**
 * You may wish to use the Minify URI Builder app to suggest
 * changes. http://yourdomain/min/builder/
 *
 * See http://code.google.com/p/minify/wiki/CustomSource for other ideas
 **/

return array(
    'jslib' => array('//js/vendor/jquery.js',
                     '//js/vendor/fastclick.js',
                     '//js/foundation/foundation.js',
                     '//js/foundation/foundation.dropdown.js',
                     '//js/foundation/foundation.topbar.js'),
    'js' => array('//js/plugins.js', '//js/script.js')
    // 'css' => array('//css/style.css'),
);
