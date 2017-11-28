<?php
$WeatherSource = "https://api.sunrise-sunset.org/json?lat=33.4484376&lng=-112074036";
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>