<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyJobController extends Controller
{
    /**
     * Get all jobs for the company
     */
    public function index(Request $request)
    {
        $companyId = $request->user()->id;
        
        $jobs = \App\Models\Job::where('company_id', $companyId)
            ->latest()
            ->withCount('applications')
            ->get()
            ->map(function($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'category' => $job->job_type,
                    'status' => $job->status,
                    'type' => $job->location === 'Remote' ? 'Remote' : 'On-site',
                    'location' => $job->location,
                    'salary' => $job->salary,
                    'applicants' => $job->applications_count,
                    'posted' => $job->created_at->diffForHumans(),
                    'views' => 0
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);
    }

    /**
     * Create a new job/internship posting
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string', // internship or job
            'type' => 'required|string',
            'location' => 'required|string',
            'salary' => 'required|string',
            'description' => 'required|string',
            'skills' => 'required|array',
            'deadline' => 'nullable|date',
        ]);

        $job = new \App\Models\Job();
        $job->company_id = $request->user()->id;
        $job->title = $validated['title'];
        $job->job_type = $validated['category'];
        $job->location = $validated['location'];
        $job->salary = $validated['salary'];
        $job->description = $validated['description'];
        $job->skills = json_encode($validated['skills']);
        $job->deadline = $validated['deadline'] ?? null;
        $job->status = 'Pending'; // Strict enforcement of Admin Approval workflow
        
        // Ensure slug is generated
        $job->slug = \Illuminate\Support\Str::slug($validated['title'] . '-' . time());
        
        $job->save();

        return response()->json([
            'success' => true,
            'message' => 'Job posted successfully and is pending admin approval.',
            'data' => $job
        ], 201);
    }

    /**
     * Update job status (Active/Closed)
     */
    public function updateStatus(Request $request, $id)
    {
        $companyId = $request->user()->id;
        $job = \App\Models\Job::where('company_id', $companyId)->findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:Active,Closed,Pending',
        ]);

        $job->status = $validated['status'];
        $job->save();

        return response()->json([
            'success' => true,
            'message' => "Job marked as {$validated['status']}.",
            'data' => $job
        ]);
    }

    /**
     * Delete a job posting
     */
    public function destroy(Request $request, $id)
    {
        $companyId = $request->user()->id;
        $job = \App\Models\Job::where('company_id', $companyId)->findOrFail($id);
        $job->delete();

        return response()->json([
            'success' => true,
            'message' => 'Job deleted successfully.'
        ]);
    }
}
