<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('property_id')->constrained()->cascadeOnDelete();
            $table->date('requested_date');
            $table->time('requested_time');
            $table->enum('request_type', ['VISIT', 'RESERVATION']);
            $table->text('message')->nullable();
            $table->enum('status', ['PENDING', 'ACCEPTED', 'REFUSED', 'CANCELLED'])->default('PENDING')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
