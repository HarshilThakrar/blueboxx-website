<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function summary()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_students' => 0,
                'total_experts' => 0,
                'total_companies' => 0,
                'courses' => ['total' => 0, 'published' => 0],
                'revenue' => ['total' => 0, 'monthly' => 0],
                'orders' => ['total' => 0, 'completed' => 0],
                'jobs' => ['total' => 0, 'active' => 0],
                'internships' => ['total' => 0, 'running' => 0],
            ]
        ]);
    }

    public function charts()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'revenue' => [],
                'registrations' => []
            ]
        ]);
    }

    public function topCourses()
    {
        return response()->json(['success' => true, 'data' => []]);
    }

    public function recentEnrollments()
    {
        return response()->json(['success' => true, 'data' => []]);
    }

    public function feed()
    {
        return response()->json(['success' => true, 'data' => []]);
    }
}
