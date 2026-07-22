<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\AccountApprovedMail;

class ApprovalController extends Controller
{
    /**
     * Get a list of pending approval users, optionally filtered by role
     */
    public function index(Request $request)
    {
        $query = User::with('roles')
            ->where('status', 'pending_approval');

        if ($request->has('role')) {
            $query->role($request->role);
        }

        return response()->json([
            'data' => $query->latest()->paginate(15)
        ]);
    }

    /**
     * Approve a user
     */
    public function approve(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        if ($user->status !== 'pending_approval' && $user->status !== 'rejected') {
            return response()->json(['message' => 'User is already active or suspended.'], 400);
        }

        $user->update(['status' => 'active']);
        
        Log::info("Admin approved user ID: {$user->id}");

        try {
            Mail::to($user->email)->send(new AccountApprovedMail($user));
        } catch (\Exception $e) {
            Log::error("Failed to send approval email to user {$user->id}: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'User approved successfully.',
            'user' => $user->load('roles')
        ]);
    }

    /**
     * Reject a user
     */
    public function reject(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        if ($user->status !== 'pending_approval') {
            return response()->json(['message' => 'Only pending users can be rejected.'], 400);
        }

        $user->update(['status' => 'rejected']);
        
        Log::info("Admin rejected user ID: {$user->id}");

        return response()->json([
            'message' => 'User rejected successfully.',
            'user' => $user->load('roles')
        ]);
    }

    /**
     * Suspend an active user
     */
    public function suspend(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        if ($user->status !== 'active') {
            return response()->json(['message' => 'Only active users can be suspended.'], 400);
        }

        $user->update(['status' => 'suspended']);
        $user->tokens()->delete(); // Force logout
        
        Log::info("Admin suspended user ID: {$user->id}");

        return response()->json([
            'message' => 'User suspended successfully.',
            'user' => $user->load('roles')
        ]);
    }
}
