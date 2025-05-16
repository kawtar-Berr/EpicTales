<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\StoryRoomController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

// Auth public
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes accessibles à tous les utilisateurs authentifiés
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn(Request $request) => $request->user());
    Route::get('/storyrooms/{id}/members', [StoryRoomController::class, 'members']);
    Route::post('/utilisateurs/{idUtilisateur}/rooms/{idRoom}/join', [UtilisateurController::class, 'rejoindreRoom']);
    Route::get('/storyrooms/public', [StoryRoomController::class, 'publicRooms']);
    Route::get('/utilisateurs/{id}/rooms', [UtilisateurController::class, 'rooms']);
    Route::get('/utilisateurs/count', [UtilisateurController::class, 'count']);
    Route::apiResource('utilisateurs', UtilisateurController::class);
    Route::apiResource('storyrooms', StoryRoomController::class);
    Route::post('/storyrooms/join', [StoryRoomController::class, 'joinByCode']);
});

// // Routes réservées à l'admin
Route::middleware(['auth:sanctum', 'role:Admin'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    // Ajoute ici toutes les routes réservées à l'admin
});

// // Routes réservées à l'utilisateur
// Route::middleware(['auth:sanctum', 'role:Utilisateur'])->group(function () {
//     Route::get('/user/home', [UserController::class, 'home']);
//     // Ajoute ici toutes les routes réservées à l'utilisateur
// });
