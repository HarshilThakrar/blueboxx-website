<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyInterviewController extends Controller
{
    private $mockInterviews = [
        [
            'id' => 'int-1',
            'name' => 'Amit Kumar',
            'role' => 'Product Designer Intern',
            'date' => 'Tomorrow',
            'time' => '10:00 AM',
            'type' => 'Technical Round',
            'match' => 'Medium'
        ],
        [
            'id' => 'int-2',
            'name' => 'Rahul Sharma',
            'role' => 'Frontend Developer',
            'date' => 'Today',
            'time' => '2:30 PM',
            'type' => 'Culture Fit',
            'match' => 'High'
        ]
    ];

    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $this->mockInterviews
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'applicantId' => 'required|string',
            'date' => 'required|string',
            'time' => 'required|string',
            'type' => 'required|string'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Interview scheduled.',
            'data' => [
                'id' => 'int-' . time(),
                'date' => $validated['date'],
                'time' => $validated['time'],
                'type' => $validated['type']
            ]
        ], 201);
    }
}
