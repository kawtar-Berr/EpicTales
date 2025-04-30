<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Inscription
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'username' => 'required|string|unique:utilisateurs,username',
            'motDePasse' => 'required|min:6',
        ]);

        $user = Utilisateur::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'username' => $request->username,
            'motDePasse' => Hash::make($request->motDePasse),
            'role' => 'Utilisateur',
        ]);

        return response()->json(['message' => 'Inscription réussie', 'utilisateur' => $user], 201);
    }

    // Connexion
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'motDePasse' => 'required',
        ]);

        $user = Utilisateur::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['motDePasse'], $user->motDePasse)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        // Générer un token avec Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'utilisateur' => $user,
        ]);
    }

    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}