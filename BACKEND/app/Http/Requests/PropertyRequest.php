<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:180'],
            'description' => ['required', 'string', 'min:20'],
            'transaction_type' => ['required', 'in:SALE,RENT'],
            'property_type' => ['required', 'in:APARTMENT,VILLA,HOUSE,STUDIO'],
            'price' => ['required', 'numeric', 'min:1'],
            'city_id' => ['required', 'exists:cities,id'],
            'district_id' => ['nullable', 'exists:districts,id'],
            'address' => ['required', 'string', 'max:255'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'surface' => ['required', 'integer', 'min:1'],
            'bedrooms' => ['required', 'integer', 'min:0'],
            'bathrooms' => ['required', 'integer', 'min:0'],
            'floor' => ['nullable', 'integer', 'min:0'],
            'total_floors' => ['nullable', 'integer', 'min:0'],
            'furnished' => ['boolean'],
            'parking' => ['boolean'],
            'elevator' => ['boolean'],
            'balcony' => ['boolean'],
            'terrace' => ['boolean'],
            'status' => ['required', 'in:AVAILABLE,RESERVED,SOLD,RENTED'],
            'owner_id' => ['required', 'exists:users,id'],
            'images.*' => ['nullable', 'image', 'max:4096'],
        ];
    }
}
