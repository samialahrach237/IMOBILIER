<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservation::with(['property.city', 'property.district', 'property.owner', 'property.images', 'user'])->latest();
        if (!$request->user()->isAdmin()) {
            $query->where('user_id', $request->user()->id);
        }
        return ReservationResource::collection($query->paginate(15));
    }

    public function store(ReservationRequest $request)
    {
        $reservation = Reservation::create($request->validated() + ['user_id' => $request->user()->id, 'status' => 'PENDING']);
        return (new ReservationResource($reservation->load(['property.city', 'property.district', 'property.owner', 'property.images', 'user'])))
            ->additional(['success' => true, 'message' => 'Votre demande a ete envoyee avec succes.']);
    }

    public function destroy(Request $request, Reservation $reservation)
    {
        abort_if(!$request->user()->isAdmin() && $reservation->user_id !== $request->user()->id, 403);
        abort_if(!$request->user()->isAdmin() && $reservation->status !== 'PENDING', 422);
        $reservation->update(['status' => 'CANCELLED']);
        return response()->json(['success' => true, 'message' => 'Demande annulee.']);
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $data = $request->validate(['status' => ['required', 'in:ACCEPTED,REFUSED,CANCELLED,PENDING']]);
        $reservation->update($data);
        return new ReservationResource($reservation->load(['property.city', 'property.district', 'property.owner', 'property.images', 'user']));
    }
}
