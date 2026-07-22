<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobApplication;

class JobseekerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        
        $applications = JobApplication::with('job.companyProfile')
            ->where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();
            
        $recentApps = $applications->map(function ($app) {
            return [
                'company' => $app->job->companyProfile->company_name ?? 'Company',
                'role' => $app->job->title ?? 'Job Role',
                'status' => $app->status,
                'time' => $app->created_at->diffForHumans(),
                'type' => $app->job->employment_type ?? 'Full-time'
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'jobs_applied' => JobApplication::where('user_id', $userId)->count(),
                    'profile_views' => 0, // TBD: Implement actual profile views count
                    'interviews' => JobApplication::where('user_id', $userId)->where('status', 'interview')->count(),
                ],
                'recent_applications' => $recentApps
            ]
        ]);
    }

    public function applications(Request $request)
    {
        $userId = $request->user()->id;
        
        $applications = JobApplication::with('job.companyProfile')
            ->where('user_id', $userId)
            ->latest()
            ->get();
            
        $apps = $applications->map(function ($app) {
            return [
                'id' => $app->id,
                'role' => $app->job->title ?? 'Job Role',
                'company' => $app->job->companyProfile->company_name ?? 'Company',
                'location' => $app->job->location ?? 'Remote',
                'status' => $app->status,
                'date' => $app->created_at->format('M d, Y'),
                'logo' => $app->job->companyProfile->logo ? asset('storage/' . $app->job->companyProfile->logo) : "https://ui-avatars.com/api/?name=".urlencode($app->job->companyProfile->company_name ?? 'C')."&background=random"
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $apps
        ]);
    }
}
