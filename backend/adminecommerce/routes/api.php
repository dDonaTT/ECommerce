<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProductListController;


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
Route::get('/productlistbysubcategory/{category}',[ProductListController::class, 'ProductListBySubCategory']);


