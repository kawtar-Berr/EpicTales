<?php

namespace App\Http\Controllers;

use App\Models\StoryRoom;
use Illuminate\Http\Request;

class StoryRoomController extends Controller
{
    public function index()
    {
        return StoryRoom::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'statut' => 'nullable|string',
            'code' => 'required|string|unique:story_rooms,code',
            'link' => 'nullable|string',
            'id_createur' => 'nullable|exists:utilisateurs,id',
        ]);

        return StoryRoom::create($validated);
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
