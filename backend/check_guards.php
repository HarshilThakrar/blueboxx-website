<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$guards = \Spatie\Permission\Models\Role::pluck('guard_name')->unique();
echo "Roles guards: " . $guards . "\n";

$permissions = \Spatie\Permission\Models\Permission::pluck('guard_name')->unique();
echo "Permissions guards: " . $permissions . "\n";
