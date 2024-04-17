<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductList;
use App\Models\productDetails;
use App\Models\Category;
use App\Models\SubCategory;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class ProductListController extends Controller
{
    public function ProductListByRemark(Request $request)
    {
        $remark = $request->remark;
        $productlist = ProductList::where('remark', $remark)->get();
        return $productlist;
    }

    public function ProductListByCategory(Request $request)
    {
        $Category = $request->category;
        $productlist = ProductList::where('category', $Category)->get();
        return $productlist;
    }

    public function ProductListBySubCategory(Request $request)
    {
        $Category = $request->category;
        $SubCategory = $request->subcategory;
        $productlist = ProductList::where('category', $Category)
            ->where('subcategory', $SubCategory)->get();
        return $productlist;
    }

    public function GetAllProduct()
    {
        $products = ProductList::latest()->paginate(1);
        return view('backend.product.product_all', compact('products'));
    }

    public function AddProduct()
    {
        $category = Category::orderBy('category_name', 'ASC')->get();
        $subcategory = SubCategory::orderBy('subcategory_name', 'ASC')->get();
        return view('backend.product.product_add', compact('category', 'subcategory'));
    }

    public function StoreProduct(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'price' => 'required',
            'discount_price' => 'required',
            'category' => 'required',
            'subcategory' => 'required',
            'remark' => 'required',
            'brand' => 'required',
            'product_code' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'title.required' => ' is required',
            'price.required' => ' is required',
            'discount_price.required' => ' is required',
            'category.required' => ' is required',
            'subcategory.required' => ' is required',
            'remark.required' => ' is required',
            'brand.required' => ' is required',
            'product_code.required' => ' is required',
            'image.required' => ' is required',
        ]);

        if ($request->file('image')) {
            $manager = new ImageManager(new Driver());
            $name_gen = hexdec(uniqid()) . '.' . $request->file('image')->getClientOriginalExtension();
            $img = $manager->read($request->file('image'));
            $img->resize(711, 960);
            $img->save('upload/product/' . $name_gen);
            $save_url = 'http://127.0.0.1:8000/upload/product/' . $name_gen;

            $product_id = ProductList::insertGetId([
                'title' => $request->title,
                'price' => $request->price,
                'discount_price' => $request->discount_price,
                'category' => $request->category,
                'subcategory' => $request->subcategory,
                'remark' => $request->remark,
                'brand' => $request->brand,
                'product_code' => $request->product_code,
                'image' => $save_url,
            ]);

            // Insert Into Product Details Table

            function uploadImage($request, $fieldName, $manager)
            {
                if ($request->hasFile($fieldName)) {
                    $image = $request->file($fieldName);
                    $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
                    $img = $manager->read($image);
                    $img->resize(711, 960);
                    $img->save('upload/productdetails/' . $name_gen);
                    return 'http://127.0.0.1:8000/upload/productdetails/' . $name_gen;
                } else {
                    return null;
                }
            }

            $save_url_one = uploadImage($request, 'image_one', $manager);
            $save_url_two = uploadImage($request, 'image_two', $manager);
            $save_url_three = uploadImage($request, 'image_three', $manager);
            $save_url_four = uploadImage($request, 'image_four', $manager);


            ProductDetails::insert([
                'product_id' => $product_id,
                'image_one' => $save_url_one,
                'image_two' => $save_url_two,
                'image_three' => $save_url_three,
                'image_four' => $save_url_four,
                'short_description' => $request->short_description,
                'color' => $request->color,
                'size' => $request->size,
                'long_description' => $request->long_description,
            ]);

            $notification = [
                'message' => 'Product Inserted Successfully',
                'alert-type' => 'success'
            ];

            return redirect()->route('all.product')->with($notification);
        }
    }

    public function EditProduct($id)
    {
        $category = Category::orderBy('category_name', 'ASC')->get();
        $subcategory = SubCategory::orderBy('subcategory_name', 'ASC')->get();
        $product = ProductList::findOrFail($id);
        $details = ProductDetails::where('product_id', $id)->get();
        return view('backend.product.product_edit', compact('category', 'subcategory', 'product', 'details'));
    }

    public function UpdateProduct(Request $request, $id)
    {

        $product = ProductList::findOrFail($id);

        $data = [
            'title' => $request->title,
            'price' => $request->price,
            'discount_price' => $request->discount_price,
            'category' => $request->category,
            'subcategory' => $request->subcategory,
            'remark' => $request->remark,
            'brand' => $request->brand,
            'product_code' => $request->product_code,
        ];

        if ($request->hasFile('image')) {
            $manager = new ImageManager(new Driver());
            $name_gen = hexdec(uniqid()) . '.' . $request->file('image')->getClientOriginalExtension();
            $img = $manager->read($request->file('image'));
            $img->resize(711, 960);
            $img->save('upload/product/' . $name_gen);
            $data['image'] = 'http://127.0.0.1:8000/upload/product/' . $name_gen;
        }

        $product->update($data);

        // Update Product Details Table

        $productDetails = ProductDetails::where('product_id', $id)->first();

        function uploadImage($request, $fieldName, $manager)
        {
            if ($request->hasFile($fieldName)) {
                $image = $request->file($fieldName);
                $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
                $img = $manager->read($image);
                $img->resize(711, 960);
                $img->save('upload/productdetails/' . $name_gen);
                return 'http://127.0.0.1:8000/upload/productdetails/' . $name_gen;
            } else {
                return null;
            }
        }

        $save_url_one = uploadImage($request, 'image_one', $manager);
        $save_url_two = uploadImage($request, 'image_two', $manager);
        $save_url_three = uploadImage($request, 'image_three', $manager);
        $save_url_four = uploadImage($request, 'image_four', $manager);

        $productDetails->update([
            'image_one' => $save_url_one,
            'image_two' => $save_url_two,
            'image_three' => $save_url_three,
            'image_four' => $save_url_four,
            'short_description' => $request->short_description,
            'color' => $request->color,
            'size' => $request->size,
            'long_description' => $request->long_description,
        ]);

        $notification = [
            'message' => 'Product Updated Successfully',
            'alert-type' => 'success'
        ];

        return redirect()->route('all.product')->with($notification);
    }


    public function DeleteProduct($id)
    {
        $product = ProductList::findOrFail($id);

        ProductDetails::where('product_id', $id)->delete();

        $product->delete();
        $notification = array(
            'message' => 'Product Deleted Successfully',
            'alert-type' => 'Success'
        );
        return redirect()->back()->with($notification);
    }
}
