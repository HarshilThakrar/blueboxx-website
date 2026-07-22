<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminLeadController extends Controller
{
    /**
     * List all leads
     */
    public function index(Request $request)
    {
        $query = Lead::with('assignedAdmin:id,name,email');

        if ($s = $request->query('search')) {
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('phone', 'like', "%{$s}%")
                  ->orWhere('subject', 'like', "%{$s}%");
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $leads = $query->latest()->paginate((int)$request->query('per_page', 20));

        return response()->json([
            'success' => true,
            'data'    => $leads->items(),
            'pagination' => [
                'current_page' => $leads->currentPage(),
                'last_page'    => $leads->lastPage(),
                'total'        => $leads->total(),
            ]
        ]);
    }

    /**
     * View a specific lead
     */
    public function show($id)
    {
        $lead = Lead::with('assignedAdmin')->findOrFail($id);
        return response()->json(['success' => true, 'data' => $lead]);
    }

    /**
     * Update lead status or assign admin
     */
    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $data = $request->validate([
            'status' => 'nullable|in:new,contacted,in_progress,converted,dead',
            'assigned_admin_id' => 'nullable|exists:users,id',
        ]);

        $lead->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Lead updated successfully.',
            'data'    => $lead
        ]);
    }

    /**
     * Delete a lead
     */
    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);
        $lead->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lead deleted successfully.'
        ]);
    }

    /**
     * Convert Lead to Student
     */
    public function convertToStudent(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        if ($lead->status === 'converted') {
            return response()->json(['success' => false, 'message' => 'Lead is already converted.'], 400);
        }

        // Check if user already exists
        $user = User::where('email', $lead->email)->first();

        if (!$user) {
            $password = Str::random(10);
            $user = User::create([
                'name' => $lead->name,
                'email' => $lead->email,
                'phone' => $lead->phone,
                'password' => Hash::make($password),
                'status' => 'active',
            ]);
            $user->assignRole('Student');
            
            // Optionally dispatch a welcome email with their auto-generated password here
            // $user->notify(new \App\Notifications\UserSignupNotification($password));
        }

        $lead->update(['status' => 'converted']);

        return response()->json([
            'success' => true,
            'message' => 'Lead converted to student successfully!',
            'data'    => ['user_id' => $user->id]
        ]);
    }
}
