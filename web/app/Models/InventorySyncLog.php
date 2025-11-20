<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventorySyncLog extends Model
{
    use HasFactory;

    protected $fillable = ['action', 'payload', 'count', 'performed_by'];
    protected $casts = ['payload' => 'array'];
}
