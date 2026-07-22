<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

try {
    Artisan::call('storage:link');
    echo "Storage linked.\n";

    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    DB::table('course_categories')->truncate();
    DB::table('course_levels')->truncate();
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    
    echo "Tables truncated successfully.\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
