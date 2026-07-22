<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InternshipApplication;
use App\Models\InternshipTask;

class InternDashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        
        $applications = InternshipApplication::with('internship.companyProfile')
            ->where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();
            
        $recentApps = $applications->map(function ($app) {
            return [
                'company' => $app->internship->companyProfile->company_name ?? 'Company',
                'role' => $app->internship->title ?? 'Internship Role',
                'status' => $app->status,
                'time' => $app->created_at->diffForHumans(),
                'type' => $app->internship->type ?? 'Internship'
            ];
        });

        $tasksCompleted = InternshipTask::whereHas('internship', function($q) use ($userId) {
            $q->whereHas('applications', function($q2) use ($userId) {
                $q2->where('user_id', $userId)->where('status', 'Hired');
            });
        })->where('status', 'Completed')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'applications' => InternshipApplication::where('user_id', $userId)->count(),
                    'tasks_completed' => $tasksCompleted,
                    'hours_logged' => 0, // TBD: Implement actual hours logged based on tasks or timesheet
                ],
                'recent_applications' => $recentApps
            ]
        ]);
    }

    public function applications(Request $request)
    {
        $userId = $request->user()->id;
        
        $applications = InternshipApplication::with('internship.companyProfile')
            ->where('user_id', $userId)
            ->latest()
            ->get();
            
        $apps = $applications->map(function ($app) {
            return [
                'id' => $app->id,
                'role' => $app->internship->title ?? 'Internship Role',
                'company' => $app->internship->companyProfile->company_name ?? 'Company',
                'location' => $app->internship->location ?? 'Remote',
                'status' => $app->status,
                'type' => $app->internship->type ?? 'Internship',
                'logo' => $app->internship->companyProfile->logo ? asset('storage/' . $app->internship->companyProfile->logo) : "https://ui-avatars.com/api/?name=".urlencode($app->internship->companyProfile->company_name ?? 'C')."&background=random"
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $apps
        ]);
    }

    public function mentorSessions(Request $request)
    {
        $userId = $request->user()->id;
        
        // Mock mentor sessions for now, but returning empty to align with "no mock data" policy.
        // Once MentorSession model is linked to user, we fetch from DB.
        
        return response()->json([
            'success' => true,
            'data' => []
        ]);
    }
}
