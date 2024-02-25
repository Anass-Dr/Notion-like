<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function blocks()
    {
        return $this->hasMany(Block::class);
    }
}
