<?php

// ─── Bootstrap Laravel ───────────────────────────────────────────────────────
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::capture();
$kernel->handle($request);

use Illuminate\Support\Facades\DB;

// ─── Disable FK checks so we can truncate in any order ───────────────────────
DB::statement('SET FOREIGN_KEY_CHECKS=0');

$cleared = [];

// Courses
if (DB::getSchemaBuilder()->hasTable('course_enrollments'))   { DB::table('course_enrollments')->truncate();   $cleared[] = 'course_enrollments'; }
if (DB::getSchemaBuilder()->hasTable('course_reviews'))       { DB::table('course_reviews')->truncate();       $cleared[] = 'course_reviews'; }
if (DB::getSchemaBuilder()->hasTable('lesson_progress'))      { DB::table('lesson_progress')->truncate();      $cleared[] = 'lesson_progress'; }
if (DB::getSchemaBuilder()->hasTable('course_lessons'))       { DB::table('course_lessons')->truncate();       $cleared[] = 'course_lessons'; }
if (DB::getSchemaBuilder()->hasTable('course_sections'))      { DB::table('course_sections')->truncate();      $cleared[] = 'course_sections'; }
if (DB::getSchemaBuilder()->hasTable('course_levels'))        { DB::table('course_levels')->truncate();        $cleared[] = 'course_levels'; }
if (DB::getSchemaBuilder()->hasTable('courses'))              { DB::table('courses')->truncate();              $cleared[] = 'courses'; }

// Jobs
if (DB::getSchemaBuilder()->hasTable('job_applications'))     { DB::table('job_applications')->truncate();     $cleared[] = 'job_applications'; }
if (DB::getSchemaBuilder()->hasTable('job_views'))            { DB::table('job_views')->truncate();            $cleared[] = 'job_views'; }
if (DB::getSchemaBuilder()->hasTable('jobs'))                 { DB::table('jobs')->truncate();                 $cleared[] = 'jobs'; }

// Internships
if (DB::getSchemaBuilder()->hasTable('internship_submissions'))  { DB::table('internship_submissions')->truncate();  $cleared[] = 'internship_submissions'; }
if (DB::getSchemaBuilder()->hasTable('internship_tasks'))        { DB::table('internship_tasks')->truncate();        $cleared[] = 'internship_tasks'; }
if (DB::getSchemaBuilder()->hasTable('internship_applications')) { DB::table('internship_applications')->truncate(); $cleared[] = 'internship_applications'; }
if (DB::getSchemaBuilder()->hasTable('internships'))             { DB::table('internships')->truncate();             $cleared[] = 'internships'; }

// Blogs (fake seeded ones)
if (DB::getSchemaBuilder()->hasTable('blog_blog_tag'))           { DB::table('blog_blog_tag')->truncate();           $cleared[] = 'blog_blog_tag'; }
if (DB::getSchemaBuilder()->hasTable('blog_blog_category'))      { DB::table('blog_blog_category')->truncate();      $cleared[] = 'blog_blog_category'; }
if (DB::getSchemaBuilder()->hasTable('blog_tags'))               { DB::table('blog_tags')->truncate();               $cleared[] = 'blog_tags'; }
if (DB::getSchemaBuilder()->hasTable('blog_categories'))         { DB::table('blog_categories')->truncate();         $cleared[] = 'blog_categories'; }
if (DB::getSchemaBuilder()->hasTable('blogs'))                   { DB::table('blogs')->truncate();                   $cleared[] = 'blogs'; }

// Users except super admin (keep id=1)
// We intentionally keep users - only remove seeded non-admin users
// Uncomment the line below only if you want to remove ALL seeded users too:
// DB::table('users')->where('id', '!=', 1)->delete(); $cleared[] = 'users (non-admin)';

DB::statement('SET FOREIGN_KEY_CHECKS=1');

echo "\n✅ Fake data cleared from:\n";
foreach ($cleared as $t) {
    echo "   - $t\n";
}
echo "\nYour admin panel now shows only real data.\n";
