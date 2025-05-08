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
            // $table->date('dateCreation')->default(DB::raw('CURDATE()'));
            $table->date('dateCreation');
            $table->integer('code')->unique();
            $table->binary('link')->nullable();
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
