<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyDashboardController extends Controller
{
    /**
     * Get dashboard metrics and data for the company portal
     */
    public function index(Request $request)
    {
        $companyId = $request->user()->id;

        $jobs = \App\Models\Job::where('company_id', $companyId)->latest()->get();
        $activeJobsCount = $jobs->where('status', 'Active')->count();
        $pendingJobsCount = $jobs->where('status', 'Pending')->count();

        $jobIds = $jobs->pluck('id');
        $applications = \App\Models\JobApplication::whereIn('job_id', $jobIds)->get();
        $totalApplicants = $applications->count();
        $hiredCount = $applications->where('status', 'Hired')->count();

        $activeJobsList = $jobs->where('status', 'Active')->take(5)->map(function($job) {
            return [
                'id' => $job->id,
                'title' => $job->title,
                'category' => $job->job_type,
                'status' => $job->status,
                'type' => $job->location === 'Remote' ? 'Remote' : 'On-site',
                'applicants' => $job->applications()->count()
            ];
        })->values();

        // For now, keep interviews mocked or empty until Interview model is implemented
        $interviews = [];

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'active_jobs' => $activeJobsCount,
                    'total_applicants' => $totalApplicants,
                    'pending_jobs' => $pendingJobsCount,
                    'hired' => $hiredCount,
                ],
                'active_jobs_list' => $activeJobsList,
                'today_interviews' => $interviews,
            ]
        ]);
    }
}
