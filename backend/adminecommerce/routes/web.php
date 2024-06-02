<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\ReviewController;

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

Route::middleware(['auth:sanctum', 'verified', CheckRole::class . ':admin'])->group(function () {

    Route::get('/dashboard', function () {
        return view('dashboard.index');
    })->name('dashboard');
    Route::prefix('category')->group(function () {
        Route::get('/all', [CategoryController::class, 'GetAllCategory'])->name('all.category');
        Route::get('/add', [CategoryController::class, 'AddCategory'])->name('add.category');
        Route::post('/store', [CategoryController::class, 'StoreCategory'])->name('category.store');
        Route::get('/edit/{id}', [CategoryController::class, 'EditCategory'])->name('category.edit');
        Route::post('/update', [CategoryController::class, 'UpdateCategory'])->name('category.update');
        Route::get('/delete/{id}', [CategoryController::class, 'DeleteCategory'])->name('category.delete');
    });

    Route::prefix('subcategory')->group(function () {
        Route::get('/all', [CategoryController::class, 'GetAllSubCategory'])->name('all.subcategory');
        Route::get('/add', [CategoryController::class, 'AddSubCategory'])->name('add.subcategory');
        Route::post('/store', [CategoryController::class, 'StoreSubCategory'])->name('subcategory.store');
        Route::get('/edit/{id}', [CategoryController::class, 'EditSubCategory'])->name('subcategory.edit');
        Route::post('/update', [CategoryController::class, 'UpdateSubCategory'])->name('subcategory.update');
        Route::get('/delete/{id}', [CategoryController::class, 'DeleteSubCategory'])->name('subcategory.delete');
    });

    Route::prefix('user')->group(function () {
        Route::get('/all', [UserController::class, 'GetAllUser'])->name('all.user');
        Route::get('/add', [UserController::class, 'AddUser'])->name('add.user');
        Route::post('/store', [UserController::class, 'StoreUser'])->name('user.store');
        Route::get('/edit/{id}', [UserController::class, 'EditUser'])->name('user.edit');
        Route::post('/update/{id}', [UserController::class, 'UpdateUser'])->name('user.update');
        Route::get('/delete/{id}', [UserController::class, 'DeleteUser'])->name('user.delete');
        Route::post('/update-role/{id}', [UserController::class, 'UpdateUserRole'])->name('user.updateRole');
    });

    Route::prefix('product')->group(function () {
        Route::get('/all', [ProductListController::class, 'GetAllProduct'])->name('all.product');
        Route::get('/add', [ProductListController::class, 'AddProduct'])->name('add.product');
        Route::post('/store', [ProductListController::class, 'StoreProduct'])->name('product.store');
        Route::get('/edit/{id}', [ProductListController::class, 'EditProduct'])->name('product.edit');
        Route::post('/update/{id}', [ProductListController::class, 'UpdateProduct'])->name('product.update');
        Route::get('/delete/{id}', [ProductListController::class, 'DeleteProduct'])->name('product.delete');
    });

    Route::prefix('slider')->group(function () {
        Route::get('/all', [SliderController::class, 'GetAllSlider'])->name('all.slider');
        Route::get('/add', [SliderController::class, 'AddSlider'])->name('add.slider');
        Route::post('/store', [SliderController::class, 'StoreSlider'])->name('slider.store');
        Route::get('/edit/{id}', [SliderController::class, 'EditSlider'])->name('slider.edit');
        Route::post('/update/{id}', [SliderController::class, 'UpdateSlider'])->name('slider.update');
        Route::get('/delete/{id}', [SliderController::class, 'DeleteSlider'])->name('slider.delete');
    });
    Route::get('/logout', [AdminController::class, 'adminLogout'])->name('admin.logout');
    Route::prefix('admin')->group(function () {

        Route::get('/user/profile', [AdminController::class, 'UserProfile'])->name('user.profile');
    });
    Route::post('/user/profile/store', [AdminController::class, 'UserProfileStore'])->name('user.profile.store');


});
Route::prefix('order')->group(function () {

    Route::get('/pending', [ProductCartController::class, 'PendingOrder'])->name('pending.order');
    Route::get('/processing', [ProductCartController::class, 'ProcessingOrder'])->name('processing.order');
    Route::get('/complete', [ProductCartController::class, 'CompleteOrder'])->name('complete.order');
    Route::get('/details/{id}', [ProductCartController::class, 'OrderDetails'])->name('order.details');
    Route::get('/status/processing/{id}', [ProductCartController::class, 'PendingToProcessing'])->name('pending.processing');
    Route::get('/status/complete/{id}', [ProductCartController::class, 'ProcessingToComplete'])->name('processing.complete');

});
        Route::get('/delete/{id}', [ReviewController::class, 'DeleteReview'])->name('review.delete');
        Route::get('/all/review',[ReviewController::class, 'GetAllReview'])->name('all.review');
        Route::get('/index', [ReviewController::class, 'GetAllReview'])->name('index');
