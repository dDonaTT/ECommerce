<?php

namespace App\Http\Controllers\Admin;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Session;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubCategory;

use Intervention\Image\Facades\Image;

class CategoryController extends Controller
{
    public function AllCategory()
    {
        $categories = Category::all();
        $categoryDetailsArray = [];
        foreach ($categories as $value) {
            $subcategory = SubCategory::where('category_name', $value['category_name'])->get();
            $item = [
                'category_name' => $value['category_name'],
                'category_image' => $value['category_image'],
                'subcategory_name' => $subcategory


            ];
            array_push($categoryDetailsArray, $item);
        }
        return $categoryDetailsArray;
    }

    public function GetAllCategory(Request $request)
    {
        $query = Category::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('category_name', 'like', '%' . $search . '%');
        }

        $category = $query->latest()->get();

        return view('backend.category.category_view', compact('category'));
    }


    public function AddCategory()
    {

        return view('backend.category.category_add');

    }

    public function StoreCategory(Request $request)
    {

        $request->validate([
            'category_name' => 'required',
            'category_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'category_name.required' => 'Category name is required',
            'category_image.required' => 'Category image is required',
        ]);

        if ($request->file('category_image')) {
            $manager = new ImageManager(new Driver());
            $name_gen = hexdec(uniqid()) . '.' . $request->file('category_image')->getClientOriginalExtension();
            $img = $manager->read($request->file('category_image'));
            $img = $img->resize(128, 128);

            $img->toJpeg(80)->save(base_path('public/upload/category/' . $name_gen));
            $save_url = 'http://127.0.0.1:8000/upload/category/' . $name_gen;

            Category::insert([
                'category_name' => $request->category_name,
                'category_image' => $save_url,
            ]);
        }

        $notification = array(
            'message' => 'Category Inserted Successfully',
            'alert-type' => 'Success'
        );
        Session::flash('success', 'Category inserted successfully');

        return redirect()->route('all.category')->with($notification);

    }

    public function EditCategory($id)
    {

        $category = Category::findOrFail($id);
        return view('backend.category.category_edit', compact('category'));

    }

    public function UpdateCategory(Request $request)
    {

        $request->validate([
            'category_name' => 'required',
            'category_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'category_name.required' => 'Category name is required',
            'category_image.required' => 'Category image is required',
        ]);

        $category_id = $request->id;

        if ($request->file('category_image')) {

            $manager = new ImageManager(new Driver());
            $name_gen = hexdec(uniqid()) . '.' . $request->file('category_image')->getClientOriginalExtension();
            $img = $manager->read($request->file('category_image'));
            $img = $img->resize(128, 128);

            $img->toJpeg(80)->save(base_path('public/upload/category/' . $name_gen));
            $save_url = 'http://127.0.0.1:8000/upload/category/' . $name_gen;

            Category::findOrFail($category_id)->update([
                'category_name' => $request->category_name,
                'category_image' => $save_url,
            ]);

            $notification = [
                'message' => 'Category Updated Successfully',
                'alert-type' => 'Success'
            ];

            return redirect()->route('all.category')->with($notification);
        } else {
            Category::findOrFail($category_id)->update([
                'category_name' => $request->category_name,
            ]);

            $notification = [
                'message' => 'Category Updated Without Image Successfully',
                'alert-type' => 'Success'
            ];

            return redirect()->route('all.category')->with($notification);
        }
    }


    public function DeleteCategory($id)
    {

        Category::findOrFail($id)->delete();

        $notification = array(
            'message' => 'Category Deleted Successfully',
            'alert-type' => 'Success'
        );

        return redirect()->back()->with($notification);

    }
    public function GetAllSubCategory(Request $request)
{
    $query = Subcategory::query();

    if ($request->has('search')) {
        $search = $request->input('search');
        $query->where('subcategory_name', 'like', '%' . $search . '%')
              ->orWhere('category_name', 'like', '%' . $search . '%');
    }

    $sub_categories = $query->latest()->get();

    return view('backend.subcategory.subcategory_view', compact('sub_categories'));
}

    public function AddSubCategory()
    {

        $category = Category::latest()->get();
        return view('backend.subcategory.subcategory_add', compact('category'));
    }


    public function StoreSubCategory(Request $request)
    {
        $request->validate([
            'subcategory_name' => 'required',
        ], [
            'subcategory_name.required' => 'Input SubCategory Name'

        ]);
        Subcategory::insert([
            'category_name' => $request->category_name,
            'subcategory_name' => $request->subcategory_name,
        ]);

        $notification = array(
            'message' => 'SubCategory Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.subcategory')->with($notification);

    }


    public function EditSubCategory($id)
    {

        $category = Category::orderBy('category_name', 'ASC')->get();
        $subcategory = Subcategory::findOrFail($id);
        return view('backend.subcategory.subcategory_edit', compact('category', 'subcategory'));

    }

    public function UpdateSubCategory(Request $request)
    {

        $subcategory_id = $request->id;

        Subcategory::findOrFail($subcategory_id)->update([
            'category_name' => $request->category_name,
            'subcategory_name' => $request->subcategory_name,
        ]);

        $notification = array(
            'message' => 'SubCategory Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.subcategory')->with($notification);

    }


    public function DeleteSubCategory($id)
    {

        Subcategory::findOrFail($id)->delete();
        $notification = array(
            'message' => 'SubCategory Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);

    }



}


