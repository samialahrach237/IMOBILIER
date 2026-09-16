<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'property' => new PropertyResource($this->whenLoaded('property')),
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
                'phone' => $this->user->phone,
            ]),
            'requested_date' => $this->requested_date?->format('Y-m-d'),
            'requested_time' => substr($this->requested_time, 0, 5),
            'request_type' => $this->request_type,
            'message' => $this->message,
            'status' => $this->status,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
