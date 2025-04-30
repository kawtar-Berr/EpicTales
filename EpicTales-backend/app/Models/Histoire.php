<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Histoire extends Model
{
    use HasFactory;

    protected $fillable = ['titre', 'description', 'statut', 'dateCreation', 'id_storyroom', 'id_createur'];

    public function storyRoom() {
        return $this->belongsTo(StoryRoom::class, 'id_storyroom');
    }

    public function createur() {
        return $this->belongsTo(Utilisateur::class, 'id_createur');
    }

    public function chapitres() {
        return $this->hasMany(Chapitre::class, 'id_histoire');
    }
}

