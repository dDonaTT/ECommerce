<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Auth;
use App\Models\User;

use App\Http\Requests\RegisterRequest;
use DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;



class AuthController extends Controller
{
    public function Login(Request $request)
    {

        try {

            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;

                return response([
                    'message' => "Successfully Login",
                    'token' => $token,
                    'user' => $user
                ], 200); // States Code
            }

        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }
        return response([
            'message' => 'Invalid Email Or Password'
        ], 401);

    } // end method


    public function register(RegisterRequest $request)
    {
        try {
            // Create a new user with hashed password
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Generate the token for the user
            $token = $user->createToken('app')->accessToken;

            // Return success response with user data and token
            return response()->json([
                'message' => 'Registration Successful',
                'token' => $token,
                'user' => $user
            ], 200);
        } catch (\Exception $exception) {
            // Log the exception for debugging
            Log::error('Registration error: '.$exception->getMessage());

            // Return error response
            return response()->json([
                'message' => 'Registration failed',
                'error' => $exception->getMessage()
            ], 400);
        }
    }
    // end mehtod






}
