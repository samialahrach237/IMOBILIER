<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PropertyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $primary = $this->images->firstWhere('is_primary', true) ?? $this->images->first();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'transaction_type' => $this->transaction_type,
            'property_type' => $this->property_type,
            'price' => (float) $this->price,
            'city' => $this->city?->name,
            'city_id' => $this->city_id,
            'district' => $this->district?->name,
            'district_id' => $this->district_id,
            'address' => $this->address,
            'latitude' => (float) $this->latitude,
            'longitude' => (float) $this->longitude,
            'surface' => $this->surface,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'floor' => $this->floor,
            'total_floors' => $this->total_floors,
            'furnished' => $this->furnished,
            'parking' => $this->parking,
            'elevator' => $this->elevator,
            'balcony' => $this->balcony,
            'terrace' => $this->terrace,
            'status' => $this->status,
            'primary_image' => $primary ? $this->imageUrl($primary->image_path) : null,
            'images' => $this->images->map(fn ($image) => [
                'id' => $image->id,
                'url' => $this->imageUrl($image->image_path),
                'is_primary' => $image->is_primary,
            ]),
            'owner' => $this->owner ? [
                'id' => $this->owner->id,
                'name' => $this->owner->name,
                'email' => $this->owner->email,
                'phone' => $this->owner->phone,
            ] : null,
            'is_favorite' => $request->user() ? $this->favoritedBy->contains($request->user()->id) : false,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }

    private function imageUrl(string $path): string
    {
        if (str_starts_with($path, 'http')) {
            return $path;
        }

        return Storage::url($path);
    }
}
