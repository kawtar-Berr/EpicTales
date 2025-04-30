<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StoryRoom extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'statut', 'dateCreation', 'code', 'link', 'id_createur'];

    public function createur() {
        return $this->belongsTo(Utilisateur::class, 'id_createur');
    }

    public function modérateurs() {
        return $this->belongsToMany(Utilisateur::class, 'moderateurs', 'id_storyroom', 'id_utilisateur');
    }

    public function membres()
    {
        return $this->belongsToMany(Utilisateur::class, 'storyroom_utilisateur', 'storyroom_id', 'utilisateur_id');
    }

    public function histoires() {
        return $this->hasMany(Histoire::class, 'id_storyroom');
    }

    
}

