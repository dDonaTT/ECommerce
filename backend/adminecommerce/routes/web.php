<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard.index');
    })->name('dashboard');
});

Route::prefix('category')->group(function(){

    Route::get('/all',[CategoryController::class, 'GetAllCategory'])->name('all.category');

    Route::get('/add',[CategoryController::class, 'AddCategory'])->name('add.category');

    Route::post('/store',[CategoryController::class, 'StoreCategory'])->name('category.store');

    Route::get('/edit/{id}',[CategoryController::class, 'EditCategory'])->name('category.edit');

    Route::post('/update',[CategoryController::class, 'UpdateCategory'])->name('category.update');

    Route::get('/delete/{id}',[CategoryController::class, 'DeleteCategory'])->name('category.delete');
});
