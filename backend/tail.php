<?php
$file = 'storage/logs/laravel.log';
$lines = file($file);
$last = array_slice($lines, -100);
echo implode("", $last);
