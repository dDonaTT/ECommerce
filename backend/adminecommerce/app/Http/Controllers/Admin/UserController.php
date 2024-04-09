<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function AllUsers()
    {
        $users = User::all();
        return $users;
    }

    public function GetAllUser()
    {
        $users = User::latest()->get();
        return view('backend.user.user_view', compact('users'));
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

        $notification = [
            'message' => 'User inserted successfully',
            'alert-type' => 'success'
        ];

        return redirect()->route('all.user')->with($notification);
    }

    public function EditUser($id)
    {
        $user = User::findOrFail($id);
        return view('backend.user.user_edit', compact('user'));
    }

    public function UpdateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->has('password')) {
            $request->validate([
                'password' => 'required|min:6',
            ]);
            $user->password = bcrypt($request->password);
        }

        $user->save();

        $notification = [
            'message' => 'User updated successfully',
            'alert-type' => 'success'
        ];

        return redirect()->route('all.user')->with($notification);
    }

    public function DeleteUser($id)
    {
        User::findOrFail($id)->delete();

        $notification = [
            'message' => 'User deleted successfully',
            'alert-type' => 'success'
        ];

        return redirect()->back()->with($notification);
    }
}
