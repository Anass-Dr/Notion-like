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
        'workspace_id',
        'deleted_at',
    ];

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function blocks()
    {
        return $this->hasMany(Block::class);
    }
}
