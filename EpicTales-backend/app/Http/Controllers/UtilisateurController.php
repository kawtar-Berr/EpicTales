<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UtilisateurController extends Controller
{
    public function index()
    {
        return Utilisateur::all();
    }

    public function show($id)
    {
        return Utilisateur::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'username' => 'required|string|unique:utilisateurs,username',
            'motDePasse' => 'required|min:6',
            'role' => 'in:Utilisateur,Admin',
        ]);

        return Utilisateur::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'username' => $request->username,
            'motDePasse' => Hash::make($request->motDePasse),
            'role' => $request->role ?? 'Utilisateur',
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = Utilisateur::findOrFail($id);
        $user->update($request->all());
        return $user;
    }

    public function destroy($id)
    {
        return Utilisateur::destroy($id);
    }

    public function count()
    {
        $nombreUtilisateurs = Utilisateur::count();
        return response()->json(['count' => $nombreUtilisateurs]);
    }
}
