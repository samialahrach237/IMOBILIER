<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CityController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\FavoriteController;
use App\Http\Controllers\API\PropertyController;
use App\Http\Controllers\API\ReservationController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/contact', [ContactController::class, 'store']);

Route::get('/properties/sale', [PropertyController::class, 'sale']);
Route::get('/properties/rent', [PropertyController::class, 'rent']);
Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{property}', [PropertyController::class, 'show']);
Route::get('/cities', [CityController::class, 'index']);
Route::get('/cities/{city}', [CityController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{property}', [FavoriteController::class, 'destroy']);
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);

    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/statistics', [AdminController::class, 'statistics']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::apiResource('/properties', PropertyController::class)->except(['index', 'show']);
        Route::get('/reservations', [ReservationController::class, 'index']);
        Route::patch('/reservations/{reservation}/status', [ReservationController::class, 'updateStatus']);
        Route::get('/cities', [CityController::class, 'index']);
    });
});
