<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\ProductDetailsController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Category Route
Route::get('/allcategory',[CategoryController::class, 'AllCategory']);


//User Route
Route::get('/alluser',[UserController::class, 'AllUser']);
Route::get('/allproduct',[ProductListController::class, 'AllProducts']);

//Product
Route::get('/productlistbyremark/{remark}',[ProductListController::class, 'ProductListByRemark']);
Route::get('/productlistbycategory/{category}',[ProductListController::class, 'ProductListByCategory']);
Route::get('/productlistbysubcategory/{category}/{subcategory}',[ProductListController::class, 'ProductListBySubCategory']);


//ProductDetails
Route::get('/productdetails/{id}',[ProductDetailsController::class, 'ProductDetails']);

