<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/utilisateurs/count', [UtilisateurController::class, 'count']);
Route::apiResource('utilisateurs', UtilisateurController::class);

