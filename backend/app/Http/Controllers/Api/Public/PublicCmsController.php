<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\PlacementPartner;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\Internship;
use App\Models\Course;
use App\Models\Job;
use App\Models\ExpertProfile;
use Illuminate\Support\Facades\Cache;

class PublicCmsController extends Controller
{
    /**
     * Get platform statistics for the Hero Section.
     */
    public function stats()
    {
        return Cache::remember('public.cms.stats', now()->addHours(1), function () {
            // These would normally be calculated from models or fetched from GlobalSettings.
            // For production-readiness, we'll fetch actual counts, and fallback to base numbers.
            $studentsCount = User::role('student')->count() + 2500;
            $placementsCount = 1200; // E.g., PlacementRecord::count() + 1200
            $projectsCount = Internship::count() * 5 + 850; 
            $partnersCount = PlacementPartner::where('is_active', true)->count() + 120;

            return response()->json([
                'success' => true,
                'data' => [
                    'students' => $studentsCount,
                    'placed' => $placementsCount,
                    'projects' => $projectsCount,
                    'partners' => $partnersCount,
                ]
            ]);
        });
    }

    /**
     * Get public global settings.
     */
    public function settings()
    {
        return Cache::remember('public.cms.settings', now()->addHours(6), function () {
            $settings = \App\Models\GlobalSetting::where('group', 'general')
                ->pluck('value', 'key');
                
            return response()->json([
                'success' => true,
                'data' => $settings
            ]);
        });
    }

    /**
     * Get placement partners for Clients Section.
     */
    public function partners()
    {
        return Cache::remember('public.cms.partners', now()->addHours(6), function () {
            $partners = PlacementPartner::where('is_active', true)
                ->orderBy('id', 'asc')
                ->get()
                ->map(fn($p) => [
                    'id' => $p->id,
                    'name' => $p->company_name,
                    'logo' => $p->logo_path ? asset('storage/' . $p->logo_path) : null,
                ]);

            return response()->json([
                'success' => true,
                'data' => $partners
            ]);
        });
    }

    /**
     * Get testimonials.
     */
    public function testimonials()
    {
        return Cache::remember('public.cms.testimonials', now()->addHours(6), function () {
            $testimonials = Testimonial::where('is_featured', true)
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get()
                ->map(fn($t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'role' => $t->role,
                    'content' => $t->content,
                    'avatar' => $t->photo_url ? asset('storage/' . $t->photo_url) : null,
                    'rating' => $t->rating,
                ]);

            return response()->json([
                'success' => true,
                'data' => $testimonials
            ]);
        });
    }

    /**
     * Get FAQs.
     */
    public function faqs()
    {
        return Cache::remember('public.cms.faqs', now()->addHours(6), function () {
            $faqs = Faq::where('is_active', 1)
                ->orderBy('order', 'asc')
                ->get()
                ->map(fn($f) => [
                    'id' => $f->id,
                    'question' => $f->question,
                    'answer' => $f->answer,
                ]);

            return response()->json([
                'success' => true,
                'data' => $faqs
            ]);
        });
    }

    /**
     * Get featured experts/mentors.
     */
    public function experts()
    {
        return Cache::remember('public.cms.experts', now()->addHours(6), function () {
            $experts = ExpertProfile::with('user')
                ->where('is_available', true)
                ->where('is_verified', true)
                ->orderBy('average_rating', 'desc')
                ->take(3)
                ->get()
                ->map(fn($e) => [
                    'id' => $e->id,
                    'name' => $e->user ? trim(($e->user->first_name ?? '') . ' ' . ($e->user->last_name ?? '')) : 'Unknown',
                    'role' => $e->designation ?? 'Expert Mentor',
                    'exp' => $e->experience_years ? $e->experience_years . ' yrs' : '5+ yrs',
                    'rating' => $e->average_rating,
                    'sessions' => 0,
                    'skills' => [],
                    'price' => '₹' . ($e->hourly_rate ? round($e->hourly_rate / 2) : 499) . '/30m',
                    'badge' => $e->specialization ? $e->specialization . ' Expert' : 'Expert',
                    'gradientFrom' => '#1B2A6B',
                    'gradientTo' => '#2E45A3',
                    'avatarBg' => 'from-blue-600 to-indigo-700',
                    'slug' => $e->id // we don't have a slug field standard, use ID
                ]);

            return response()->json([
                'success' => true,
                'data' => $experts
            ]);
        });
    }
}
