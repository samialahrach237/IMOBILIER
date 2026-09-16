<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->enum('transaction_type', ['SALE', 'RENT'])->index();
            $table->enum('property_type', ['APARTMENT', 'VILLA', 'HOUSE', 'STUDIO'])->index();
            $table->decimal('price', 12, 2)->index();
            $table->foreignId('city_id')->constrained()->restrictOnDelete();
            $table->foreignId('district_id')->nullable()->constrained()->nullOnDelete();
            $table->string('address');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->unsignedInteger('surface')->index();
            $table->unsignedTinyInteger('bedrooms')->default(0)->index();
            $table->unsignedTinyInteger('bathrooms')->default(0);
            $table->unsignedTinyInteger('floor')->nullable();
            $table->unsignedTinyInteger('total_floors')->nullable();
            $table->boolean('furnished')->default(false);
            $table->boolean('parking')->default(false);
            $table->boolean('elevator')->default(false);
            $table->boolean('balcony')->default(false);
            $table->boolean('terrace')->default(false);
            $table->enum('status', ['AVAILABLE', 'RESERVED', 'SOLD', 'RENTED'])->default('AVAILABLE')->index();
            $table->foreignId('owner_id')->constrained('users')->restrictOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
