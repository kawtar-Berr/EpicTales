<?php

namespace App\Http\Controllers;

use App\Models\StoryRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class StoryRoomController extends Controller
{
    public function index()
    {
        return StoryRoom::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom'    => 'required|string|max:255',
            'statut' => 'required|in:Public,Privé',
        ]);

        // Générer un code unique
        do {
            $code = strtoupper(Str::random(6));
        } while (StoryRoom::where('code', $code)->exists());

        // Création de la salle avec date, code et lien
        $storyRoom = StoryRoom::create([
            'nom'          => $request->nom,
            'statut'       => $request->statut,
            'dateCreation' => now()->toDateString(),
            'code'         => $code,
            'link'         => url("/accueil/room/{$code}"),
            'id_createur'  => Auth::id(),
        ]);

        return response()->json([
            'id'   => $storyRoom->id,
            'code' => $storyRoom->code,
            'link' => $storyRoom->link,
        ], 201);
    }

    public function showByCode($code)
    {
        return StoryRoom::where('code', $code)->firstOrFail();
    }
    public function showByCreator($id)
    {
        return StoryRoom::where('id_createur', $id)->get();
    }
    public function show($id)
    {
        return StoryRoom::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $room = StoryRoom::findOrFail($id);
        $room->update($request->all());
        return $room;
    }

    public function destroy($id)
    {
        return StoryRoom::destroy($id);
    }

    public function publicRooms()
    {
        return StoryRoom::where('statut', 'public')->get();
    }

    public function privateRooms()
    {
        return StoryRoom::where('statut', 'private')->get();
    }

    public function members($id)
    {
        $room = StoryRoom::findOrFail($id);
        // Relation many-to-many
        return $room->membres;
    }
}
