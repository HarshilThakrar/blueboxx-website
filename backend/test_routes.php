<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$router = app('router');
$routes = $router->getRoutes();

foreach ($routes as $route) {
    if (strpos($route->uri(), 'admin/approvals') !== false) {
        echo $route->methods()[0] . " " . $route->uri() . "\n";
        echo "Middleware: " . implode(', ', $route->gatherMiddleware()) . "\n\n";
    }
}
