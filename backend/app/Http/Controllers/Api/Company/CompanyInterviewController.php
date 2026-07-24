<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyInterviewController extends Controller
{
    public function index(Request $request)
    {
        $companyId = $request->user()->id;
        
        $jobIds = \App\Models\Job::where('company_id', $companyId)->pluck('id');
        
        // Assuming Interview model exists and relates to JobApplication or Job directly.
        // Based on other portals, interviews tie to applications.
        $interviews = \App\Models\JobInterview::whereIn('job_id', $jobIds)
            ->with(['application.user', 'job'])
            ->latest()
            ->get()
            ->map(function($interview) {
                return [
                    'id' => $interview->id,
                    'name' => $interview->application && $interview->application->user ? $interview->application->user->name : 'Unknown Candidate',
                    'role' => $interview->job ? $interview->job->title : 'Unknown Role',
                    'date' => \Carbon\Carbon::parse($interview->scheduled_at)->format('M d, Y'),
                    'time' => \Carbon\Carbon::parse($interview->scheduled_at)->format('h:i A'),
                    'type' => $interview->type ?? 'Technical Round',
                    'match' => 'High'
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $interviews
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'applicantId' => 'required|exists:job_applications,id',
            'date' => 'required|date',
            'time' => 'required|string',
            'type' => 'required|string'
        ]);

        $companyId = $request->user()->id;
        $jobIds = \App\Models\Job::where('company_id', $companyId)->pluck('id');
        
        // Verify applicant belongs to company's jobs
        $application = \App\Models\JobApplication::whereIn('job_id', $jobIds)->findOrFail($validated['applicantId']);

        $interview = new \App\Models\JobInterview();
        $interview->job_application_id = $application->id;
        $interview->job_id = $application->job_id;
        $interview->user_id = $application->user_id;
        $interview->scheduled_at = \Carbon\Carbon::parse($validated['date'] . ' ' . $validated['time']);
        $interview->type = $validated['type'];
        $interview->status = 'Scheduled';
        $interview->save();

        return response()->json([
            'success' => true,
            'message' => 'Interview scheduled.',
            'data' => $interview
        ], 201);
    }
}
