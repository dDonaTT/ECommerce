<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Category Route
Route::get('/allcategory',[CategoryController::class, 'AllCategory']);

//User Route
Route::get('/alluser',[UserController::class, 'AllUser']);
