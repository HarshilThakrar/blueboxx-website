<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;
use App\Models\Blog;
use App\Observers\BlogObserver;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Services\Payments\PaymentGatewayInterface::class,
            \App\Services\Payments\RazorpayGatewayService::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Implicitly grant "Super Admin" role all permissions
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super_admin') ? true : null;
        });

        // Fix for Spatie Permissions relying on Sanctum provider model
        config(['auth.guards.sanctum.provider' => 'users']);

        // Security & Performance: Prevent N+1 queries in non-production environments
        Model::preventLazyLoading(!app()->isProduction());
        
        // Ensure mass assignment exceptions are thrown in local
        Model::preventSilentlyDiscardingAttributes(!app()->isProduction());

        // Register Observers
        Blog::observe(BlogObserver::class);

        // Strict API Rate Limiting for Production
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(100)->by($request->user()?->id ?: $request->ip());
        });
    }
}
