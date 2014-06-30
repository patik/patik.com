<?php

if(isset($_GET['app'])) {
    $app = $_GET['app'];
    header('Location: http://www8dm.nystax.gov/' . strtoupper($app) . '/' . strtolower($app) . 'Start', true, 307);
    exit;
}

header("HTTP/1.0 404 Not Found");

?>
