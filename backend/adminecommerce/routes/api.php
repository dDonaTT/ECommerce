<?php

use App\Http\Controllers\Admin\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\OrderController;


// use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\ProductDetailsController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ForgetController;
use App\Http\Controllers\User\ResetController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\FavouriteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/create-checkout-session', [OrderController::class, 'createCheckoutSession']);



/////////////// User Login API Start ////////////////////////

// Login Routes
Route::post('/login', [AuthController::class, 'Login']);

// Register Routes
Route::post('/register', [AuthController::class, 'Register']);

// Forget Password Routes
Route::post('/forgetpassword', [ForgetController::class, 'ForgetPassword']);

// Reset Password Routes
Route::post('/resetpassword', [ResetController::class, 'ResetPassword']);

// Current User Route
Route::get('/user', [UserController::class, 'User'])->middleware('auth:api');


/////////////// End User Login API Start ////////////////////////

Route::get('/allcategory', [CategoryController::class, 'AllCategory']);

Route::get('/allslider', [SliderController::class, 'AllSlider']);

Route::get('/alluser', [UserController::class, 'AllUser']);
Route::get('/allproduct', [ProductListController::class, 'AllProducts']);
Route::get('/productlistbyremark/{remark}', [ProductListController::class, 'ProductListByRemark']);
Route::get('/productlistbycategory/{category}', [ProductListController::class, 'ProductListByCategory']);
Route::get('/productlistbysubcategory/{category}/{subcategory}', [ProductListController::class, 'ProductListBySubCategory']);
Route::get('/search/{key}', [ProductListController::class, 'ProductBySearch']);

Route::get('/productdetails/{id}', [ProductDetailsController::class, 'ProductDetails']);

// Cart List Route
Route::get('/cartlist/{email}', [ProductCartController::class, 'CartList']);
Route::get('/removecartlist/{id}', [ProductCartController::class, 'RemoveCartList']);
Route::get('/cartitemplus/{id}/{quantity}/{price}', [ProductCartController::class, 'CartItemPlus']);
Route::get('/cartitemminus/{id}/{quantity}/{price}', [ProductCartController::class, 'CartItemMinus']);
// Cart Order Route
Route::post('/cartorder', [ProductCartController::class, 'CartOrder']);
Route::get('/orderlistbyuser/{email}', [ProductCartController::class, 'OrderListByUser']);
// Post Product Review Route
Route::post('/postreview', [ReviewController::class, 'PostReview']);

// Review Product Route
Route::get('/reviewlist/{product_code}', [ReviewController::class, 'ReviewList']);

Route::post('/addtocart', [ProductCartController::class, 'addToCart']);
Route::get('/cartcount', [ProductCartController::class, 'CartCount']);

// Notification Route
Route::get('/notification', [NotificationController::class, 'NotificationHistory']);

// Favourite Route
Route::get('/favourite/{product_code}/{email}',[FavouriteController::class, 'AddFavourite']);
Route::get('/favouritelist/{email}',[FavouriteController::class, 'FavouriteList']);
Route::get('/favouriteremove/{product_code}/{email}',[FavouriteController::class, 'FavouriteRemove']);
