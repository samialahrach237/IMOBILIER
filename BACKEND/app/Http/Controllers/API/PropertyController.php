<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with(['city', 'district', 'owner', 'images', 'favoritedBy'])
            ->when($request->city, fn ($q, $city) => $q->whereHas('city', fn ($c) => $c->where('slug', Str::slug($city))->orWhere('name', $city)))
            ->when($request->district_id, fn ($q, $v) => $q->where('district_id', $v))
            ->when($request->transaction_type, fn ($q, $v) => $q->where('transaction_type', strtoupper($v)))
            ->when($request->property_type, fn ($q, $v) => $q->where('property_type', strtoupper($v)))
            ->when($request->min_price, fn ($q, $v) => $q->where('price', '>=', $v))
            ->when($request->max_price, fn ($q, $v) => $q->where('price', '<=', $v))
            ->when($request->min_surface, fn ($q, $v) => $q->where('surface', '>=', $v))
            ->when($request->max_surface, fn ($q, $v) => $q->where('surface', '<=', $v))
            ->when($request->bedrooms, fn ($q, $v) => $q->where('bedrooms', '>=', $v))
            ->when($request->bathrooms, fn ($q, $v) => $q->where('bathrooms', '>=', $v))
            ->when($request->boolean('furnished'), fn ($q) => $q->where('furnished', true))
            ->when($request->boolean('parking'), fn ($q) => $q->where('parking', true))
            ->when($request->boolean('elevator'), fn ($q) => $q->where('elevator', true));

        match ($request->get('sort')) {
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            'oldest' => $query->oldest(),
            'surface_asc' => $query->orderBy('surface'),
            'surface_desc' => $query->orderByDesc('surface'),
            default => $query->latest(),
        };

        return PropertyResource::collection($query->paginate($request->integer('per_page', 12)));
    }

    public function sale(Request $request) { $request->merge(['transaction_type' => 'SALE']); return $this->index($request); }
    public function rent(Request $request) { $request->merge(['transaction_type' => 'RENT']); return $this->index($request); }

    public function show(Property $property)
    {
        return new PropertyResource($property->load(['city', 'district', 'owner', 'images', 'favoritedBy']));
    }

    public function store(PropertyRequest $request)
    {
        $property = Property::create($this->payload($request));
        $this->storeImages($request, $property);
        return new PropertyResource($property->load(['city', 'district', 'owner', 'images', 'favoritedBy']));
    }

    public function update(PropertyRequest $request, Property $property)
    {
        $property->update($this->payload($request, $property->id));
        $this->storeImages($request, $property);
        return new PropertyResource($property->load(['city', 'district', 'owner', 'images', 'favoritedBy']));
    }

    public function destroy(Property $property)
    {
        $property->delete();
        return response()->json(['success' => true, 'message' => 'Property deleted']);
    }

    private function payload(PropertyRequest $request, ?int $id = null): array
    {
        $data = $request->validated();
        unset($data['images']);
        $data['slug'] = Str::slug($data['title']) . '-' . ($id ?: Str::random(6));
        return $data;
    }

    private function storeImages(Request $request, Property $property): void
    {
        if (!$request->hasFile('images')) {
            return;
        }

        foreach ($request->file('images') as $index => $image) {
            $property->images()->create([
                'image_path' => $image->store('properties', 'public'),
                'is_primary' => !$property->images()->exists() && $index === 0,
            ]);
        }
    }
}
