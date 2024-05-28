<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCart extends Model
{
    use HasFactory;

    protected $fillable = [
        'email', 'image', 'product_name', 'product_code',
        'size', 'color', 'quantity', 'unit_price', 'total_price'
    ];
}
