<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\StoryRoomController;


Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/storyrooms/{id}/members', [StoryRoomController::class, 'members']);

Route::post('/utilisateurs/{idUtilisateur}/rooms/{idRoom}/join', [UtilisateurController::class, 'rejoindreRoom']);

Route::get('/storyrooms/public', [StoryRoomController::class, 'publicRooms']);
Route::get('/utilisateurs/{id}/rooms', [UtilisateurController::class, 'rooms']);

Route::get('/utilisateurs/count', [UtilisateurController::class, 'count']);
Route::apiResource('utilisateurs', UtilisateurController::class);

Route::apiResource('storyrooms', StoryRoomController::class);

