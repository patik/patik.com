// Code specific to the live demo on patik.com, not needed for anything in the github repository
$(document).ready(function() {
  // Set the default top threshold to the bottom of the header
  var headerHeight = $('header').outerHeight();
  withinViewport.defaults.top = headerHeight;
  $('#top').val(headerHeight);
});