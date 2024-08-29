<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Laravel\Passport\RefreshToken;
use Carbon\Carbon;

class UserController extends Controller
{
    public function AllUsers()
    {
        $users = User::all();

        foreach ($users as $user) {
            $user->access_token = $user->token()->id ?? null;
            $user->refresh_token = RefreshToken::where('access_token_id', $user->token()->id)->first()->id ?? null;
            $user->access_token_expires_at = $user->token()->expires_at ?? null;
            $user->refresh_token_expires_at = RefreshToken::where('access_token_id', $user->token()->id)->first()->expires_at ?? null;
        }

        return $users;
    }

    public function GetAllUser(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('role', 'like', '%' . $search . '%');
            });
        }

        $users = $query->latest()->get();
        $userCount = $query->count();


        return view('backend.user.user_view', compact('users', 'userCount'));
    }


    public function AddUser()
    {
        return view('backend.user.user_add');
    }

    public function StoreUser(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        $tokenResult = $user->createToken('app')->accessToken;

        $notification = [
            'message' => 'User inserted successfully',
            'alert-type' => 'success',
            'access_token' => $tokenResult,
        ];

        return redirect()->route('all.user')->with($notification);
    }

    public function EditUser($id)
    {
        $user = User::findOrFail($id);

        // Include token data (if needed)
        $user->access_token = $user->token()->id ?? null;
        $user->refresh_token = RefreshToken::where('access_token_id', $user->token()->id)->first()->id ?? null;
        $user->access_token_expires_at = $user->token()->expires_at ?? null;
        $user->refresh_token_expires_at = RefreshToken::where('access_token_id', $user->token()->id)->first()->expires_at ?? null;

        return view('backend.user.user_edit', compact('user'));
    }

    public function UpdateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'role' => 'required|in:admin,user,manager',
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;

        if ($request->has('password')) {
            $request->validate([
                'password' => 'required|min:6',
            ]);
            $user->password = bcrypt($request->password);
        }

        $user->save();

        // Update token expiration dates (if applicable)
        $tokenResult = $user->token();
        if ($tokenResult) {
            $tokenResult->expires_at = Carbon::now()->addMinutes(config('auth.token_expiration.access_token'));
            $refreshToken = RefreshToken::where('access_token_id', $tokenResult->id)->first();
            if ($refreshToken) {
                $refreshToken->expires_at = Carbon::now()->addMinutes(config('auth.token_expiration.refresh_token'));
                $refreshToken->save();
            }
            $tokenResult->save();
        }

        $notification = [
            'message' => 'User updated successfully',
            'alert-type' => 'success',
            'access_token' => $tokenResult->id ?? null,
            'refresh_token' => $refreshToken->id ?? null,
            'access_token_expires_at' => $tokenResult->expires_at ?? null,
            'refresh_token_expires_at' => $refreshToken->expires_at ?? null,
        ];

        return redirect()->route('all.user')->with($notification);
    }

    public function DeleteUser($id)
    {
        User::findOrFail($id)->delete();

        // Token deletion would happen automatically with the user deletion

        $notification = [
            'message' => 'User deleted successfully',
            'alert-type' => 'success'
        ];

        return redirect()->back()->with($notification);
    }
}
