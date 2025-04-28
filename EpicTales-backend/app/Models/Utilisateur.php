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

    public function storyRoomsCreees() {
        return $this->hasMany(StoryRoom::class, 'id_createur');
    }
    
    public function histoiresCreees() {
        return $this->hasMany(Histoire::class, 'id_createur');
    }
    
    public function chapitres() {
        return $this->hasMany(Chapitre::class, 'id_createur');
    }
    
    public function votes() {
        return $this->hasMany(Vote::class, 'id_utilisateur');
    }
    
    public function notifications() {
        return $this->hasMany(Notification::class, 'id_utilisateur');
    }

    public function storyRoomsRejointes()
    {
        return $this->belongsToMany(StoryRoom::class, 'storyroom_utilisateur', 'utilisateur_id', 'storyroom_id');
    }

    

}

