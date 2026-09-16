<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CityResource;
use App\Http\Resources\PropertyResource;
use App\Models\City;

class CityController extends Controller
{
    public function index()
    {
        return CityResource::collection(City::with('districts')->withCount('properties')->get());
    }

    public function show(City $city)
    {
        return response()->json([
            'city' => new CityResource($city->load('districts')->loadCount('properties')),
            'properties' => PropertyResource::collection($city->properties()->with(['city', 'district', 'owner', 'images', 'favoritedBy'])->latest()->paginate(12)),
        ]);
    }
}
