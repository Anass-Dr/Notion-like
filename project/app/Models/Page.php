<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'icon',
        'background',
        'deleted_at',
        'workspace_id'
    ];

    public function blocks()
    {
        return $this->hasMany(Block::class);
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }
}
