<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductCart;
use App\Models\ProductList;
use App\Models\CartOrder;
class ProductCartController extends Controller
{
    public function OrderListByUser(Request $request){
        $email = $request->email;
        $result = CartOrder::where('email',$email)->orderBy('id','DESC')->get();
        return $result;

    }// End Method 


}