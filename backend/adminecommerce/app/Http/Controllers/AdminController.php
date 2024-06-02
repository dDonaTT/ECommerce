<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Support\Facades\Redirect;

class AdminController extends Controller
{
    protected $guard;

    public function __construct(StatefulGuard $guard)
    {
        $this->guard = $guard;
    }

    public function adminLogout()
    {

        $this->guard->logout();

        return Redirect::route('login');
    }
    public function UserProfile(){

        $adminData = auth()->user();
        if ($adminData) {
            return view('admin.admin_profile', compact('adminData'));
        } else {

            return redirect()->route('login');
        }
    }
    public function UserProfileStore(Request $request){

        $data = auth()->user();
        $data->name = $request->name;
        $data->email = $request->email;

        if ($request->file('profile_photo_path')) {
            $file = $request->file('profile_photo_path');
            @unlink(public_path('upload/admin_images/'.$data->profile_photo_path));
            $filename = date('YmdHi').$file->getClientOriginalName();
            $file->move(public_path('upload/admin_images'),$filename);
            $data['profile_photo_path'] = $filename;
        }
        $data->save();

        return redirect()->route('user.profile');

    }

}
