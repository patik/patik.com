// Delay before first draw of the page 
// (value in milliseconds, default is 250) 
user_pref("nglayout.initialpaint.delay", 10);

// Lengthen time between page redraws during loading
user_pref("content.notify.interval", 500000);
user_pref("content.notify.ontimer", true);

// Time you must be idle before FF enters a low frequency 
// interrupt mode, which makes the interface becomes less 
// responsive but the page loads more quickly. Default is 750000
user_pref("content.switch.threshold", 250000);

// Increase cache size (for 2GB RAM or more)
user_pref("browser.cache.memory.capacity", 65536);

// Enable pipelining: 
user_pref("network.http.pipelining", true); 
user_pref("network.http.proxy.pipelining", true); 
user_pref("network.http.pipelining.maxrequests", 8);
user_pref("network.http.max-connections", 48);
user_pref("network.http.max-connections-per-server", 8);
user_pref("network.http.pipelining.firstrequest", true);
user_pref("browser.turbo.enabled", true);
user_pref("network.dns.disableIPv6", true);
user_pref("network.image.imageBehavior", 0);

//user error pages instead of popup messages
user_pref("browser.xul.error_pages.enabled", true);

// Firefox 2.0 UI

// Open search bar results in new tab
user_pref("browser.search.openintab", true);

// Turn off Go button
user_pref("browser.urlbar.hideGoButton", true);

// Don't replace tabs when opening folder of bookmarks in tabs 
user_pref("browser.tabs.loadFolderAndReplace", false);

//show full path to plugins in about:plugins
user_pref("plugin.expose_full_path", true);

//allow pages to copy to the clipboard
user_pref("signed.applets.codebase_principal_support", true);

//keep firefox from being swapped out of memory while minimized
user_pref("config.trim_on_minimize", false);

//turn off blinking
user_pref("browser.blink_allowed", false);

// Get rid of wait before installing extensions
user_pref("security.dialog_enable_delay", 0);

//lower threshold for scrolling tabs when many are open (default=100, off=0)
user_pref("browser.tabs.tabMinWidth", 75);

// for the Nuke Anything extension, removes the blinking border
// default: "3px solid red"
user_pref("extensions.nuke_anything_enhanced.autoblink", "");

// Firefox 3.0 UI

// Enable color management profiles
user_pref("gfx.color_management.enabled", true);

// Enable spellchecking in text inputs
user_pref("layout.spellcheckDefault", 2);

// Generate HTML version of bookmarks
user_pref("browser.bookmarks.autoExportHTML", true);

// Do not warn when closing multiple tabs
user_pref("browser.tabs.warnOnClose", false);

//open search bar results in new tab
user_pref("browser.search.openintab", true);

// Set fixed font size (default is 13)
user_pref("font.size.fixed.x-western", 13);

// Set variable font size (default is 16)
user_pref("font.size.variable.x-western", 15);

// Set font to sans-serif
user_pref("font.default.x-western", "sans-serif");

// Set serif font
user_pref("font.name.serif.x-western", "Georgia");

// Set sans-serif font ("Trebuchet MS")
user_pref("font.name.sans-serif.x-western", "Calibri");

// Set monospace font
user_pref("font.name.monospace.x-western", "Courier New");
