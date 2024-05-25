<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductCart;
use App\Models\ProductList;

class ProductCartController extends Controller
{
    public function addToCart(Request $request){
        $email = $request->input('email');
        $size = $request->input('size');
        $color = $request->input('color');
        $quantity = $request->input('quantity');
        $product_code = $request->input('product_code');

        $productDetails = ProductList::where('product_code',$product_code)->get();

        $price = $productDetails[0]['price'];
        $discount_price = $productDetails[0]['discount_price'];

        if($discount_price=="na"){
            $total_price = $price*$quantity;
            $unit_price = $price;
        }
        else{
            $total_price = $discount_price*$quantity;
            $unit_price = $discount_price;
        }

        $result = ProductCart::insert([

            'email' => $email,
            'image' => $productDetails[0]['image'],
            'product_name' => $productDetails[0]['title'],
            'product_code' => $productDetails[0]['product_code'],
            'size' => "Size: ".$size,
            'color' => "Color: ".$color,
            'quantity' => $quantity,
            'unit_price' => $unit_price,
            'total_price' => $total_price,

        ]);

        return $result;
    }
    public function CartCount(Request $request){
        $product_code = $request->product_code;
        $result = ProductCart::count();
        return $result;
    }
    public function CartList(Request $request){

        $email = $request->email;
        $result = ProductCart::where('email',$email)->get();
        return $result;

    }





}
