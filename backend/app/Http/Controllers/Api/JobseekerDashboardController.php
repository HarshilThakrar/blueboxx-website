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
                    'saved_jobs' => \App\Models\SavedJob::where('user_id', $userId)->count(),
                    'interviews' => JobApplication::where('user_id', $userId)->where('status', 'interview')->count(),
                    'offers' => JobApplication::where('user_id', $userId)->whereIn('status', ['offer', 'hired', 'offered'])->count(),
                ],
                'recent_applications' => $recentApps
            ]
        ]);
    }

    public function applications(Request $request)
    {
        $userId = $request->user()->id;
        
        $query = JobApplication::with('job.companyProfile')
            ->where('user_id', $userId);

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->whereHas('job', function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhereHas('companyProfile', function($profileQuery) use ($search) {
                      $profileQuery->where('company_name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('status') && !empty($request->status) && $request->status !== 'All Status') {
            $query->where('status', strtolower($request->status));
        }
            
        $applications = $query->latest()->get();
            
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
