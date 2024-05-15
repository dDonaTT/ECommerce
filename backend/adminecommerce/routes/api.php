<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
// use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\ProductDetailsController;

use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ForgetController;
use App\Http\Controllers\User\ResetController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Admin\SliderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


 /////////////// User Login API Start ////////////////////////

 // Login Routes
 Route::post('/login',[AuthController::class, 'Login']);

 // Register Routes
Route::post('/register',[AuthController::class, 'Register']);

 // Forget Password Routes
 Route::post('/forgetpassword',[ForgetController::class, 'ForgetPassword']);

 // Reset Password Routes
Route::post('/resetpassword',[ResetController::class, 'ResetPassword']);

// Current User Route
Route::get('/user',[UserController::class, 'User'])->middleware('auth:api');


 /////////////// End User Login API Start ////////////////////////



//Category Route
Route::get('/allcategory',[CategoryController::class, 'AllCategory']);

//Slider Route
Route::get('/allslider',[SliderController::class, 'AllSlider']);


//User Route
Route::get('/alluser',[UserController::class, 'AllUser']);
Route::get('/allproduct',[ProductListController::class, 'AllProducts']);

//Product
Route::get('/productlistbyremark/{remark}',[ProductListController::class, 'ProductListByRemark']);
Route::get('/productlistbycategory/{category}',[ProductListController::class, 'ProductListByCategory']);
Route::get('/productlistbysubcategory/{category}/{subcategory}',[ProductListController::class, 'ProductListBySubCategory']);


//ProductDetails
Route::get('/productdetails/{id}',[ProductDetailsController::class, 'ProductDetails']);

