<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyJobController extends Controller
{
    // Mock data for company jobs
    private $mockJobs = [
        [
            'id' => 'job-1',
            'title' => 'Frontend Developer',
            'category' => 'Full-time',
            'status' => 'Active',
            'type' => 'Remote',
            'location' => 'Bangalore, India',
            'salary' => '₹12,00,000 - ₹18,00,000',
            'applicants' => 45,
            'posted' => '2 days ago'
        ],
        [
            'id' => 'job-2',
            'title' => 'Product Designer Intern',
            'category' => 'Internship',
            'status' => 'Active',
            'type' => 'Hybrid',
            'location' => 'Mumbai, India',
            'salary' => '₹25,000 /mo',
            'applicants' => 128,
            'posted' => '5 days ago'
        ],
        [
            'id' => 'job-3',
            'title' => 'Backend Developer (Node.js)',
            'category' => 'Full-time',
            'status' => 'Pending',
            'type' => 'On-site',
            'location' => 'Pune, India',
            'salary' => '₹15,000,000 - ₹22,000,000',
            'applicants' => 0,
            'posted' => 'Just now'
        ],
        [
            'id' => 'job-4',
            'title' => 'Marketing Specialist',
            'category' => 'Full-time',
            'status' => 'Closed',
            'type' => 'Remote',
            'location' => 'Remote',
            'salary' => '₹8,000,000 - ₹12,00,000',
            'applicants' => 215,
            'posted' => '1 month ago'
        ]
    ];

    /**
     * Get all jobs for the company
     */
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $this->mockJobs
        ]);
    }

    /**
     * Create a new job/internship posting
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'type' => 'required|string',
            'location' => 'required|string',
            'salary' => 'required|string',
            'description' => 'required|string',
            'skills' => 'required|array',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job posted successfully and is pending approval.',
            'data' => [
                'id' => 'job-' . time(),
                'title' => $validated['title'],
                'category' => $validated['category'],
                'status' => 'Pending',
                'type' => $validated['type'],
                'location' => $validated['location'],
                'salary' => $validated['salary'],
                'applicants' => 0,
                'posted' => 'Just now'
            ]
        ], 201);
    }
}
