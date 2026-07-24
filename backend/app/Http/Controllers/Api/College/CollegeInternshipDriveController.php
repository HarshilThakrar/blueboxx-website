<?php

namespace App\Http\Controllers\Api\College;

use App\Http\Controllers\Controller;
use App\Models\Internship;
use Illuminate\Http\Request;

class CollegeInternshipDriveController extends Controller
{
    public function index(Request $request)
    {
        $drives = Internship::where('college_id', $request->user()->id)
            ->where('drive_type', 'internship_drive')
            ->withCount('applications')
            ->latest()
            ->get();
        return response()->json(['success' => true, 'data' => $drives]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company_id' => 'required|exists:users,id',
            'description' => 'required|string',
            'vacancies' => 'nullable|integer',
            'application_deadline' => 'nullable|date',
            'location' => 'nullable|string',
        ]);

        $drive = Internship::create(array_merge($validated, [
            'college_id' => $request->user()->id,
            'drive_type' => 'internship_drive',
            'status' => 'active'
        ]));

        return response()->json(['success' => true, 'data' => $drive]);
    }

    public function update(Request $request, $id)
    {
        $drive = Internship::where('college_id', $request->user()->id)
            ->where('drive_type', 'internship_drive')
            ->findOrFail($id);
            
        $drive->update($request->all());
        return response()->json(['success' => true, 'data' => $drive]);
    }

    public function destroy(Request $request, $id)
    {
        $drive = Internship::where('college_id', $request->user()->id)
            ->where('drive_type', 'internship_drive')
            ->findOrFail($id);
            
        $drive->delete();
        return response()->json(['success' => true, 'message' => 'Deleted successfully']);
    }
}
