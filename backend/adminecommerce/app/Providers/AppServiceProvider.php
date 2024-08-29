<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Passport::tokensExpireIn(now()->addMinutes(config('auth.token_expiration.access_token')));
        Passport::refreshTokensExpireIn(now()->addMinutes(config('auth.token_expiration.refresh_token')));
    }
}
