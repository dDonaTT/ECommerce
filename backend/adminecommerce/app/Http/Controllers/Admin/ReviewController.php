<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductReviews;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function ReviewList(Request $request)
    {

        $product_code = $request->product_code;
        $result = ProductReviews::where('product_code', $product_code)->orderBy('id', 'desc')->limit(4)->get();
        return $result;
    } // End Method



    public function PostReview(Request $request)
    {
        // Log the incoming request data
        \Log::info('PostReview Request', $request->all());

        try {
            $product_name = $request->input('product_name');
            $product_code = $request->input('product_code');
            $user_name = $request->input('reviewer_name');
            $reviewer_photo = $request->input('reviewer_photo');
            $reviewer_rating = $request->input('reviewer_rating');
            $reviewer_comments = $request->input('reviewer_comments');

            $result = ProductReviews::insert([
                'product_name' => $product_name,
                'product_code' => $product_code,
                'reviewer_name' => $user_name,
                'reviewer_photo' => $reviewer_photo,
                'reviewer_rating' => $reviewer_rating,
                'reviewer_comments' => $reviewer_comments,
            ]);

            return response()->json(['success' => $result], 200);
        } catch (\Exception $e) {
            \Log::error('PostReview Error', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    // End Method





}
