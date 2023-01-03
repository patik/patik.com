<html>
<head>
<title>Images directory</title>
<style type="text/css">
.imageHolder, .nonImage {
	max-width: 600px;
	margin: 0 auto;
	margin-bottom: 1em;
}
.imageHolder {
	text-align: center;
}
.imageCaption {
	text-align: center;
}
</style>
</head>
<body>

<h1>Images</h1>

<p><a href="../">&uarr; Up one directory</a></p>


<?php
//define the path as relative
$path = ".";
$ignore_pages = array('.','..','index.php','.htaccess');
//using the opendir function
$dir_handle = @opendir($path) or die("Unable to open $path");
// Collect file names
while ($file = readdir($dir_handle)) 
{
	if (is_dir($file) & !in_array($file, $ignore_pages)) {
      $dir_list[] = $file;
  }
	else if (!in_array($file, $ignore_pages)) {
		if (preg_match('/png|jpg|gif|bmp/i', $file)) {
			$images_list[] = $file;
		}
		else {
			$files_list[] = $file;
		}
	}
}
//closing the directory
closedir($dir_handle);

// Output images
sort($images_list);
$i = 0;
echo '<h2>Images</h2>';
while ($i < count($images_list)) {
	echo '<div class="imageCaption"><a href="' . $images_list[$i] . '">' . $images_list[$i] . '</a></div>';
	$i++;
}

// Output subdirectory names
sort($dir_list);
$i = 0;
echo '<h2>Sub-directories</h2>';
while ($i < count($dir_list)) {
	echo '<div class="nonImage"><a href="' . $dir_list[$i] . '">' . $dir_list[$i] . '</a></div>';
	$i++;
}

// Output non-image file names
sort($files_list);
$i = 0;
echo '<h2>Files</h2>';
while ($i < count($files_list)) {
	echo '<div class="nonImage"><a href="' . $files_list[$i] . '">' . $files_list[$i] . '</a></div>';
	$i++;
}

// Output images
sort($images_list);
$i = 0;
echo '<h2>Images with Preview</h2>';
while ($i < count($images_list)) {
	echo '<div class="imageHolder"><a href="' . $images_list[$i] . '"><img src="' . $images_list[$i] . '" style="max-width:600px;" /></a><div class="imageCaption">' . $images_list[$i] . '</div></div>';
	$i++;
}

?> 

</body>
</html>
