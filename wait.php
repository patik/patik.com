<?php
date_default_timezone_set('America/New_York');
$begin = date("G:i:s (T)");
sleep(10);
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Wait for 10 seconds</title>
<style>
body {
	color: #444;
}
table {
	border-collapse: collapse;
}
td {
	padding: 0.25em 0.5em;
	border: 1px solid #666;
}
td:nth-child(2n) {
	font-family: Monaco, Menlo, Consolas, "Lucida Sans Console", "Courier New", Courier, monospace;
}
</style>
</head>
<body>
<p>Done.</p>
<table>
	<tbody>
		<tr>
			<td>Request made</td>
			<td><?php echo $begin; ?></td>
		</tr>
		<tr>
			<td>Page loaded</td>
			<td><?php echo date("G:i:s (T)"); ?></td>
		</tr>
	</tbody>
</table>
</body>
</html>
