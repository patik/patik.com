<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>ScrollToHash Demo</title>
<script>
// Looks for a heading element that contains the text in the URL hash
function scrollToHash() {
  if (!window.location.hash) { return; }
  var stripNonWordChars = /\W/g, // Ignore punctuation
      stripHTML = /<\/?[^>]+>/g, // Ignore HTML tags
      hash = new RegExp(window.location.hash.replace(stripNonWordChars, ""), "i"),
      headers = document.querySelectorAll('h1,h2,h3,h4,h5,h6'),
      i = 0;
  while (i < headers.length) { // for now, while is much faster than forEach :(
    // Quick and dirty comparison of the header's alphanumeric content to the hash's
    if (hash.test(headers[i].innerHTML.replace(stripHTML, "").replace(stripNonWordChars, ""))) {
      headers[i].scrollIntoView();
      break;
    }
    i++;
  }
}
window.addEventListener("load", scrollToHash, false);
window.addEventListener("hashchange", scrollToHash, false);
</script>
<style>
nav a {
  display: block;
}
section {
  margin-bottom: 10em;
}
.spacer {
  margin: 2em 1em 20em 1em;
}
</style>
</head>
<body>
<aside>
  <h1>Handy jump links</h1>
  <p>Use these to update the URL hash</p>
  <nav>
    <a href="#alpha">#alpha</a>
    <a href="#bravo-charlie">#bravo-charlie</a>
    <a href="#bravocharlie">#bravocharlie</a> (jumps to the same place as the previous link)</a>
    <a href="#deltaecho">#deltaecho</a>
    <a href="#delta">#delta</a>
    <a href="#really-long-heading">#really-long-heading</a>
    <a href="#TingThatNoon">#TingThatNoon</a>
  </nav>
  <p>Now tons of space to make sure your browser has to scroll</p>
</aside>
<section>
  <h1>Alpha</h1>
  <p class="spacer">Just taking up a bit of space here.<br><a href="#handy">top</a></p>
  <h2>Bravo, Charlie!</h2>
  <p class="spacer">Just taking up a bit of space here.<br><a href="#handy">top</a></p>
</section>
<section>
  <h1>DeltaEcho</h1>
  <p class="spacer">Just taking up a bit of space here.<br><a href="#handy">top</a></p>
  <a href="#handy">top</a>
</section>
<section>
  <h3>Really Long Heading &mdash; with <strong>formatting</strong> &dash; That No One In Their Right Mind Would Include In Their URL In Its Entirety, Right?</h3>
  <p class="spacer">Just taking up a bit of space here.<br><a href="#handy">top</a></p>
</section>
</body>
</html>