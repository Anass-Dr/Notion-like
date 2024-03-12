<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function workspacePermissions()
    {
        return $this->hasMany(WorkspacePermission::class);
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }
}
