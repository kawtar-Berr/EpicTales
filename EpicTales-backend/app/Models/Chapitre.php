<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chapitre extends Model
{
    use HasFactory;

    public function histoire() {
        return $this->belongsTo(Histoire::class, 'id_histoire');
    }

    public function createur() {
        return $this->belongsTo(Utilisateur::class, 'id_createur');
    }

    public function votes() {
        return $this->hasMany(Vote::class, 'id_chapitre');
    }
}

