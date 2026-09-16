<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return PropertyResource::collection($request->user()->favorites()->with(['city', 'district', 'owner', 'images', 'favoritedBy'])->paginate(12));
    }

    public function store(Request $request)
    {
        $data = $request->validate(['property_id' => ['required', 'exists:properties,id']]);
        $request->user()->favorites()->syncWithoutDetaching([$data['property_id']]);
        return response()->json(['success' => true, 'message' => 'Bien ajoute aux favoris.']);
    }

    public function destroy(Request $request, Property $property)
    {
        $request->user()->favorites()->detach($property->id);
        return response()->json(['success' => true, 'message' => 'Bien supprime des favoris.']);
    }
}
