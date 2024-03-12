<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'email',
        'password',
        'image',
        'preferences',
        'role'
    ];

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function workspaces()
    {
        return $this->hasMany(Workspace::class);
    }

    public function workspacePermissions()
    {
        return $this->hasMany(WorkspacePermission::class);
    }
}
