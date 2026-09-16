<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'image_url' => $this->image_url,
            'districts' => $this->districts->map(fn ($district) => [
                'id' => $district->id,
                'name' => $district->name,
                'slug' => $district->slug,
            ]),
            'properties_count' => $this->whenCounted('properties'),
        ];
    }
}
