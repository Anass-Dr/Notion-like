<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type_id',
        'content',
        'order',
        'page_id'
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function type()
    {
        return $this->belongsTo(BlockType::class);
    }
}
