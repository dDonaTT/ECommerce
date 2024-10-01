<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CartOrder;
use Illuminate\Http\Request;
use App\Models\ProductCart;
use App\Models\ProductList;

class ProductCartController extends Controller
{
    public function addToCart(Request $request)
    {
        try {
            $email = $request->input('email');
            $size = $request->input('size');
            $color = $request->input('color');
            $quantity = $request->input('quantity');
            $product_code = $request->input('product_code');

            $productDetails = ProductList::where('product_code', $product_code)->first();

            if (!$productDetails) {
                return response()->json(['success' => false, 'message' => 'Product not found'], 404);
            }

            $price = $productDetails->price;
            $discount_price = $productDetails->discount_price;

            if ($discount_price == "na") {
                $total_price = $price * $quantity;
                $unit_price = $price;
            } else {
                $total_price = $discount_price * $quantity;
                $unit_price = $discount_price;
            }

            $result = ProductCart::create([
                'email' => $email,
                'image' => $productDetails->image,
                'product_name' => $productDetails->title,
                'product_code' => $productDetails->product_code,
                'size' => "Size: " . $size,
                'color' => "Color: " . $color,
                'quantity' => $quantity,
                'unit_price' => $unit_price,
                'total_price' => $total_price,
            ]);

            return response()->json(['success' => (bool) $result]);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function CartCount(Request $request, $product_code)
    {
        $count = ProductCart::where('product_code', $product_code)->count();
        return response()->json(['count' => $count]);
    }

    public function CartList(Request $request)
    {
        $email = $request->email;
        $result = ProductCart::where('email', $email)->get();
        return response()->json($result);
    }

    public function RemoveCartList(Request $request)
    {
        $id = $request->id;
        $result = ProductCart::where('id', $id)->delete();
        return $result;
    }

    public function CartItemPlus(Request $request)
    {
        $id = $request->id;
        $quantity = $request->quantity;
        $price = $request->price;
        $newQuantity = $quantity + 1;
        $totalPrice = $newQuantity * $price;

        $result = ProductCart::where('id', $id)->update(['quantity' => $newQuantity, 'total_price' => $totalPrice]);

        return $result;

    }

    public function CartItemMinus(Request $request)
    {
        $id = $request->id;
        $quantity = $request->quantity;
        $price = $request->price;
        $newQuantity = $quantity - 1;
        $totalPrice = $newQuantity * $price;

        $result = ProductCart::where('id', $id)->update(['quantity' => $newQuantity, 'total_price' => $totalPrice]);

        return $result;

    }

    public function CartOrder(Request $request)
    {
        try {
            $city = $request->input('city');
            $payment_method = $request->input('payment_method');
            $delivery_method = $request->input('delivery_method');
            $name = $request->input('name');
            $email = $request->input('email');
            $delivery_address = $request->input('delivery_address');
            $invoice_no = $request->input('invoice_no');
            $delivery_charge = $request->input('delivery_charge');

            date_default_timezone_set('Europe/London');
            $request_time = date("h:i:sa");
            $request_date = date("d-m-Y");

            $cartList = ProductCart::where('email', $email)->get();

            $cartInsertDeletedResult = 0;

            foreach ($cartList as $cartListItem) {
                $resultInsert = CartOrder::insert([
                    'invoice_no' => "Easy" . $invoice_no,
                    'product_name' => $cartListItem['product_name'],
                    'product_code' => $cartListItem['product_code'],
                    'size' => $cartListItem['size'],
                    'color' => $cartListItem['color'],
                    'quantity' => $cartListItem['quantity'],
                    'unit_price' => $cartListItem['unit_price'],
                    'total_price' => $cartListItem['total_price'],
                    'email' => $cartListItem['email'],
                    'name' => $name,
                    'payment_method' => $payment_method,
                    'delivery_method' => $delivery_method,
                    'delivery_address' => $delivery_address,
                    'city' => $city,
                    'delivery_charge' => $delivery_charge,
                    'order_date' => $request_date,
                    'order_time' => $request_time,
                    'order_status' => "Pending",
                ]);

                if ($resultInsert) {
                    $resultDelete = ProductCart::where('id', $cartListItem['id'])->delete();
                    if ($resultDelete) {
                        $cartInsertDeletedResult = 1;
                    } else {
                        $cartInsertDeletedResult = 0;
                        break;
                    }
                }
            }

            return response()->json(['status' => $cartInsertDeletedResult]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }


    public function OrderListByUser(Request $request)
    {
        $email = $request->email;
        $result = CartOrder::where('email', $email)->orderBy('id', 'DESC')->get();
        return $result;
    }
    public function PendingOrder()
    {

        $orders = CartOrder::where('order_status', 'Pending')->orderBy('id', 'DESC')->get();
        return view('backend.order.pending_orders', compact('orders'));

    }
    public function ProcessingOrder()
    {

        $orders = CartOrder::where('order_status', 'Processing')->orderBy('id', 'DESC')->get();
        return view('backend.order.processing_orders', compact('orders'));

    } // End Method


    public function CompleteOrder()
    {

        $orders = CartOrder::where('order_status', 'Complete')->orderBy('id', 'DESC')->get();
        return view('backend.order.complete_orders', compact('orders'));

    }
    public function OrderDetails($id)
    {

        $order = CartOrder::findOrFail($id);
        return view('backend.order.order_details', compact('order'));


    }
    public function PendingToProcessing($id)
    {

        CartOrder::findOrFail($id)->update(['order_status' => 'Processing']);

        $notification = array(
            'message' => 'Order Processing Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('pending.order')->with($notification);

    }


    public function ProcessingToComplete($id)
    {

        CartOrder::findOrFail($id)->update(['order_status' => 'Complete']);

        $notification = array(
            'message' => 'Order Complete Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('processing.order')->with($notification);

    }
}
