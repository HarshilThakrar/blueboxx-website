<?php

namespace App\Http\Controllers\Api\College;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudentEducation;
use App\Models\Job;
use App\Models\Internship;

class CollegeDashboardController extends Controller
{
    /**
     * Get dashboard KPIs and lists
     */
    public function index(Request $request)
    {
        $college = $request->user();
        
        $totalStudents = StudentEducation::where('college_id', $college->id)->count();
        $activePlacementDrives = Job::where('college_id', $college->id)->where('drive_type', 'placement_drive')->where('status', 'active')->count();
        $activeInternshipDrives = Internship::where('college_id', $college->id)->where('drive_type', 'internship_drive')->where('status', 'active')->count();
        $connectedCompanies = $college->partnerCompanies()->wherePivot('status', 'active')->count();

        $recentDrives = Job::where('college_id', $college->id)
            ->where('drive_type', 'placement_drive')
            ->latest()
            ->take(5)
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => [
                'kpis' => [
                    'total_students' => $totalStudents,
                    'active_placement_drives' => $activePlacementDrives,
                    'active_internship_drives' => $activeInternshipDrives,
                    'connected_companies' => $connectedCompanies,
                ],
                'recent_drives' => $recentDrives,
                'alerts' => [],
            ]
        ]);
    }

    /**
     * Get all students for the college
     */
    public function students(Request $request)
    {
        $studentsQuery = \App\Models\User::role('student')
            ->whereHas('education', function($q) use ($request) {
                $q->where('college_id', $request->user()->id);
            });
            
        $totalStudents = $studentsQuery->count();
        $students = $studentsQuery->with(['education', 'skills'])->get();

        return response()->json([
            'success' => true,
            'data' => [
                'students' => $students,
                'stats' => [
                    'total_students' => $totalStudents,
                    'placed' => 0,
                    'in_process' => 0,
                    'unplaced' => $totalStudents
                ]
            ]
        ]);
    }
}
