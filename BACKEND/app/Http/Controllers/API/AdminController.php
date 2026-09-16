<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Property;
use App\Models\Reservation;
use App\Models\User;

class AdminController extends Controller
{
    public function statistics()
    {
        return response()->json([
            'totals' => [
                'properties' => Property::count(),
                'sale' => Property::where('transaction_type', 'SALE')->count(),
                'rent' => Property::where('transaction_type', 'RENT')->count(),
                'available' => Property::where('status', 'AVAILABLE')->count(),
                'users' => User::count(),
                'reservations' => Reservation::count(),
            ],
            'properties_by_city' => City::withCount('properties')->get(['id', 'name']),
            'sale_vs_rent' => [
                ['name' => 'Vente', 'value' => Property::where('transaction_type', 'SALE')->count()],
                ['name' => 'Location', 'value' => Property::where('transaction_type', 'RENT')->count()],
            ],
            'reservations_by_month' => Reservation::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as total")->groupBy('month')->orderBy('month')->get(),
        ]);
    }

    public function users()
    {
        return User::latest()->paginate(20);
    }
}
