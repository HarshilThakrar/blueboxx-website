<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyApplicantController extends Controller
{
    // Mock applicant data
    private $mockApplicants = [
        [
            'id' => 'app-1',
            'jobId' => 'job-1',
            'jobTitle' => 'Frontend Developer',
            'applicantName' => 'Rahul Sharma',
            'email' => 'rahul@example.com',
            'status' => 'New',
            'appliedAt' => '2 hours ago',
            'score' => 85,
            'match' => 'High',
            'avatar' => null
        ],
        [
            'id' => 'app-2',
            'jobId' => 'job-1',
            'jobTitle' => 'Frontend Developer',
            'applicantName' => 'Priya Patel',
            'email' => 'priya@example.com',
            'status' => 'Shortlisted',
            'appliedAt' => '1 day ago',
            'score' => 92,
            'match' => 'Very High',
            'avatar' => null
        ],
        [
            'id' => 'app-3',
            'jobId' => 'job-2',
            'jobTitle' => 'Product Designer Intern',
            'applicantName' => 'Amit Kumar',
            'email' => 'amit@example.com',
            'status' => 'Interview',
            'appliedAt' => '3 days ago',
            'score' => 78,
            'match' => 'Medium',
            'avatar' => null
        ],
        [
            'id' => 'app-4',
            'jobId' => 'job-2',
            'jobTitle' => 'Product Designer Intern',
            'applicantName' => 'Sneha Reddy',
            'email' => 'sneha@example.com',
            'status' => 'Rejected',
            'appliedAt' => '1 week ago',
            'score' => 45,
            'match' => 'Low',
            'avatar' => null
        ]
    ];

    /**
     * Get all applicants for the company's jobs
     */
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $this->mockApplicants
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

        return response()->json([
            'success' => true,
            'message' => 'Applicant status updated successfully.',
            'data' => [
                'id' => $id,
                'status' => $validated['status']
            ]
        ]);
    }
}
