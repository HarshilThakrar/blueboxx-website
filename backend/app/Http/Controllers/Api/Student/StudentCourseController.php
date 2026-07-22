<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use App\Models\CourseEnrollment;
use App\Models\LessonProgress;
use App\Models\Course;
use App\Models\IssuedCertificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentCourseController extends Controller
{
    /**
     * Get all courses enrolled by the authenticated student
     */
    public function index(Request $request)
    {
        $enrollments = CourseEnrollment::with(['course.category', 'course.modules.lessons'])
            ->where('user_id', $request->user()->id)
            ->get();

        $active = [];
        $completed = [];

        foreach ($enrollments as $enrollment) {
            $course = $enrollment->course;
            
            // Calculate progress dynamically
            $totalLessons = 0;
            $completedLessons = 0;
            
            foreach ($course->modules as $module) {
                $totalLessons += $module->lessons->count();
                foreach ($module->lessons as $lesson) {
                    $isCompleted = LessonProgress::where('user_id', $request->user()->id)
                        ->where('lesson_id', $lesson->id)
                        ->where('is_completed', true)
                        ->exists();
                    if ($isCompleted) {
                        $completedLessons++;
                    }
                }
            }

            $progress = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;
            $isCourseCompleted = $enrollment->status === 'completed' || $progress >= 100;

            $courseData = [
                'enrollment_id' => $enrollment->id,
                'course_id' => $course->id,
                'title' => $course->title,
                'thumbnail' => $course->thumbnail ? asset('storage/' . $course->thumbnail) : null,
                'category' => $course->category->name ?? 'Uncategorized',
                'progress' => $progress,
                'total_lessons' => $totalLessons,
                'completed_lessons' => $completedLessons,
                'instructor' => $course->instructor ? $course->instructor->name : 'Expert', // Assuming relation or fallback
                'completed_date' => $isCourseCompleted ? $enrollment->updated_at->format('M d, Y') : null,
                'next_module' => 'Continue Learning' // Placeholder logic
            ];

            if ($isCourseCompleted) {
                $completed[] = $courseData;
            } else {
                $active[] = $courseData;
            }
        }

        return response()->json([
            'success' => true, 
            'data' => [
                'active' => $active,
                'completed' => $completed
            ]
        ]);
    }

    /**
     * Mark a specific lesson as completed
     */
    public function markLessonComplete(Request $request, $course_id, $lesson_id)
    {
        $user = $request->user();

        // Verify enrollment
        $isEnrolled = CourseEnrollment::where('user_id', $user->id)
            ->where('course_id', $course_id)
            ->where('status', 'active')
            ->exists();

        if (!$isEnrolled) {
            return response()->json(['success' => false, 'message' => 'Not enrolled in this course'], 403);
        }

        LessonProgress::updateOrCreate(
            ['user_id' => $user->id, 'lesson_id' => $lesson_id],
            ['is_completed' => true]
        );

        // Check overall course progress to issue certificate
        $course = Course::with('modules.lessons')->findOrFail($course_id);
        
        $totalLessons = 0;
        $completedLessons = 0;
        
        foreach ($course->modules as $module) {
            $totalLessons += $module->lessons->count();
            foreach ($module->lessons as $lesson) {
                $isCompleted = LessonProgress::where('user_id', $user->id)
                    ->where('lesson_id', $lesson->id)
                    ->where('is_completed', true)
                    ->exists();
                if ($isCompleted) {
                    $completedLessons++;
                }
            }
        }

        $progress = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;

        // Auto-generate certificate if 100% complete
        if ($progress >= 100) {
            $existingCert = IssuedCertificate::where('user_id', $user->id)
                ->where('course_id', $course_id)
                ->first();

            if (!$existingCert) {
                IssuedCertificate::create([
                    'user_id' => $user->id,
                    'course_id' => $course_id,
                    'certificate_number' => 'CERT-' . strtoupper(uniqid()),
                    'issued_at' => now(),
                    'status' => 'Issued'
                ]);
            }
        }

        return response()->json([
            'success' => true, 
            'message' => 'Lesson marked as complete', 
            'course_progress' => $progress
        ]);
    }
}
