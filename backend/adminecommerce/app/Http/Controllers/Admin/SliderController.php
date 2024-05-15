<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HomeSlider;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Session;

class SliderController extends Controller
{
    public function AllSlider(){
        $result = HomeSlider::all();
        return $result;
    }

    public function GetAllSlider(){
    $slider = HomeSlider::latest()->get();
    return view('backend.slider.slider_view',compact('slider'));
}
public function AddSlider(){
    return view('backend.slider.slider_add');

}

public function StoreSlider(Request $request){
    $request->validate([
        'slider_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ], [
        'slider_image.required' => 'Slider image is required',
    ]);

    if($request->file('slider_image')){
        $manager = new ImageManager(new Driver());
        $name_gen = hexdec(uniqid()).'.'.$request->file('slider_image')->getClientOriginalExtension();
        $img = $manager->read($request->file('slider_image'));
        $img = $img->resize(128,128);

        $img->toJpeg(80)->save(base_path('public/upload/slider/'.$name_gen));
        $save_url = 'http://127.0.0.1:8000/upload/slider/'.$name_gen;

        HomeSlider::insert([
            'slider_image' => $save_url,
        ]);
    }

    $notification = array(
        'message' => 'Slider Inserted Successfully',
        'alert-type' => 'Success'
    );
    Session::flash('success', 'Slider inserted successfully');

    return redirect()->route('all.slider')->with($notification);

}

public function EditSlider($id){
    $slider = HomeSlider::findOrFail($id);
    return view('backend.slider.slider_edit',compact('slider'));

}

public function UpdateSlider(Request $request){
    $request->validate([
        'slider_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ], [
        'slider_image.required' => 'Slider image is required',
    ]);

    $slider_id = $request->id;

    if ($request->file('slider_image')) {

        $manager = new ImageManager(new Driver());
        $name_gen = hexdec(uniqid()).'.'.$request->file('slider_image')->getClientOriginalExtension();
        $img = $manager->read($request->file('slider_image'));
        $img = $img->resize(128,128);

        $img->toJpeg(80)->save(base_path('public/upload/slider/'.$name_gen));
        $save_url = 'http://127.0.0.1:8000/upload/slider/'.$name_gen;

        HomeSlider::findOrFail($slider_id)->update([
            'slider_image' => $save_url,
        ]);

        $notification = [
            'message' => 'Slider Updated Successfully',
            'alert-type' => 'Success'
        ];

        return redirect()->route('all.slider')->with($notification);
    }
    else {
        $notification = [
            'message' => 'Slider Updated Without Image Successfully',
            'alert-type' => 'Success'
        ];

        return redirect()->route('all.slider')->with($notification);
    }
}

public function DeleteSlider($id){

    HomeSlider::findOrFail($id)->delete();

    $notification = array(
        'message' => 'Slider Deleted Successfully',
        'alert-type' => 'Success'
    );

    return redirect()->back()->with($notification);

}

}

