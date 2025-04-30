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
    public function up(): void
    {
        Schema::create('histoires', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->enum('statut', ['termine', 'en_cours'])->default('en_cours');
            $table->dateTime('dateCreation')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->foreignId('id_storyroom')->constrained('story_rooms')->onDelete('cascade');
            $table->foreignId('id_createur')->constrained('utilisateurs')->onDelete('cascade');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('histoires');
    }
};
