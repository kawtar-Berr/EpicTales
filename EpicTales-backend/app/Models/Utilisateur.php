<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Utilisateur extends Authenticatable
{
    use HasFactory;

    protected $table = 'utilisateurs';

    protected $fillable = [
        'nom', 'email', 'username', 'motDePasse', 'role', 'IsReported', 'isAbandoner'
    ];

    protected $hidden = ['motDePasse'];

    protected $casts = [
        'IsReported' => 'boolean',
        'isAbandoner' => 'boolean',
    ];
}
