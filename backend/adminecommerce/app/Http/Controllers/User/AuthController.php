<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\PersonalAccessToken;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();

                // Create access token
                $tokenResult = $user->createToken('app')->accessToken;

                return response([
                    'message' => "Successfully logged in",
                    'access_token' => $tokenResult,
                    'token_type' => 'Bearer',
                    'expires_in' => config('passport.token_expiration') * 60,
                    'user' => $user
                ], 200);
            }
        } catch (\Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }

        return response([
            'message' => 'Invalid Email Or Password'
        ], 401);
    }

    public function register(RegisterRequest $request)
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Create access token
            $tokenResult = $user->createToken('app')->accessToken;

            return response()->json([
                'message' => 'Registration Successful',
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'expires_in' => config('passport.token_expiration') * 60,
                'user' => $user
            ], 200);
        } catch (\Exception $exception) {
            Log::error('Registration error: ' . $exception->getMessage());

            return response()->json([
                'message' => 'Registration failed',
                'error' => $exception->getMessage()
            ], 400);
        }
    }
}
