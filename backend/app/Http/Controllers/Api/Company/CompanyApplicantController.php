<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyApplicantController extends Controller
{
    /**
     * Get all applicants for the company's jobs
     */
    public function index(Request $request)
    {
        $companyId = $request->user()->id;
        
        // Fetch all jobs belonging to this company
        $jobIds = \App\Models\Job::where('company_id', $companyId)->pluck('id');
        
        // Fetch applications for these jobs
        $applications = \App\Models\JobApplication::whereIn('job_id', $jobIds)
            ->with(['job', 'user.profile'])
            ->latest()
            ->get()
            ->map(function($app) {
                // Ensure safe fallback if relation is missing
                $jobTitle = $app->job ? $app->job->title : 'Unknown Job';
                $applicantName = $app->user ? $app->user->name : 'Unknown Applicant';
                $email = $app->user ? $app->user->email : '';
                $phone = $app->user && $app->user->profile ? $app->user->profile->phone : '';
                
                return [
                    'id' => $app->id,
                    'jobId' => $app->job_id,
                    'jobTitle' => $jobTitle,
                    'role' => $jobTitle,
                    'applicantName' => $applicantName,
                    'name' => $applicantName,
                    'email' => $email,
                    'phone' => $phone,
                    'status' => $app->status, // Map to frontend standard if needed
                    'appliedAt' => $app->created_at->diffForHumans(),
                    'appliedDate' => $app->created_at->format('M d, Y'),
                    'score' => rand(70, 95), // Placeholder for AI match until implemented
                    'match' => 'High', 
                    'exp' => '1 Year', // Default placeholder if missing from profile
                    'portfolio' => null
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $applications
        ]);
    }

    /**
     * Update an applicant's status
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:New,Shortlisted,Interview,Hired,Rejected'
        ]);
        
        $companyId = $request->user()->id;
        $jobIds = \App\Models\Job::where('company_id', $companyId)->pluck('id');

        $application = \App\Models\JobApplication::whereIn('job_id', $jobIds)->findOrFail($id);
        
        $application->status = $validated['status'];
        $application->save();

        return response()->json([
            'success' => true,
            'message' => 'Applicant status updated successfully.',
            'data' => $application
        ]);
    }
}
