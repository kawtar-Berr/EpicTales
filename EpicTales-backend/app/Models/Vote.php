<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = ['id_utilisateur', 'id_chapitre', 'valeur'];

    public function utilisateur() {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur');
    }

    public function chapitre() {
        return $this->belongsTo(Chapitre::class, 'id_chapitre');
    }
}

