<?php

sleep(10);

date_default_timezone_set('America/New_York');
$date = date("G:i:s (T)");
# Create image
$im = imagecreatetruecolor(300, 25);
$text_color = imagecolorallocate($im, 255, 255, 255);
imagestring($im, 4, 5, 5,  'This image loaded at ' . $date, $text_color);

header('Content-Type: image/png');
# Output the image
imagepng($im);
# Free up memory
imagedestroy($im);


?>