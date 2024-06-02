<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartOrder extends Model
{
    use HasFactory;

    // Add the fillable property to allow mass assignment
    protected $fillable = [
        'invoice_no',
        'product_name',
        'product_code',
        'size',
        'color',
        'quantity',
        'unit_price',
        'total_price',
        'email',
        'name',
        'payment_method',
        'delivery_address',
        'city',
        'delivery_charge',
        'order_date',
        'order_time',
        'order_status'
    ];


}
