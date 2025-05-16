<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('story_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->enum('statut', ['Public', 'Privé']);
            $table->date('dateCreation');
            $table->string('code', 10)->unique(); // <-- string pour code unique
            $table->string('link')->nullable();   // <-- string pour le lien
            $table->foreignId('id_createur')->constrained('utilisateurs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('story_rooms');
    }
};
