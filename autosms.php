<?php

$token = $_GET['token'];
$text = trim($_GET['text']);

if (!empty($text) && $token === '23Hu7d45fhJ9kl') {
  $headers = 'From: cpatik@gmail.com' . "\n" .
             'Reply-To: cpatik@gmail.com' . "\n" .
             'X-Mailer: PHP/' . phpversion();
  # @mail('cpatik@gmail.com', '', $text, $headers);
  # @mail('15182509281.15188921020.nGnXfZ7T3C@txt.voice.google.com', '', $text, $headers);
  @mail('5188921020@vtext.com', '', $text, $headers);
}

/*
<script>
javascript:(function(){var%20s,d=""+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text);d=d.replace(/\r\n|\r|\n/g,"%20,");if(!d){d=window.location.href;}if(d!=null){s=document.createElement('script');s.src='http://patik.com/autosms.php?token=23Hu7d45fhJ9kl&text='+encodeURIComponent(d);document.getElementsByTagName('head')[0].appendChild(s);}}());void(0);
</script>
*/
?>
