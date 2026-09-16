<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\District;
use App\Models\Property;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@immocasa.test'],
            ['name' => 'Admin ImmoCasa', 'password' => Hash::make('password123'), 'role' => 'ADMIN', 'phone' => '+212 600 000 001', 'city' => 'Casablanca']
        );

        $user = User::updateOrCreate(
            ['email' => 'user@immocasa.test'],
            ['name' => 'Client Demo', 'password' => Hash::make('password123'), 'role' => 'USER', 'phone' => '+212 600 000 002', 'city' => 'Meknes']
        );

        $owners = collect(['Nadia El Mansouri', 'Youssef Bennani', 'Agence Atlas Home'])->map(fn ($name, $i) => User::updateOrCreate(
            ['email' => 'owner'.($i + 1).'@immocasa.test'],
            ['name' => $name, 'password' => Hash::make('password123'), 'role' => 'OWNER', 'phone' => '+212 661 20 3'.str_pad($i, 3, '0'), 'city' => ['Meknes', 'Fes', 'Casablanca'][$i]]
        ));

        $cityData = [
            'Meknes' => ['Hamria', 'Marjane', 'Toulal', 'Belle Vue', 'Ville Nouvelle'],
            'Fes' => ['Agdal', 'Saiss', 'Narjiss', 'Route Immouzer', 'Ville Nouvelle'],
            'Casablanca' => ['Maarif', 'Racine', 'Gauthier', 'Californie', 'Ain Diab', 'Bourgogne'],
        ];

        $coords = [
            'Meknes' => [33.8935, -5.5473],
            'Fes' => [34.0181, -5.0078],
            'Casablanca' => [33.5731, -7.5898],
        ];

        $cities = collect($cityData)->mapWithKeys(function ($districts, $name) {
            $city = City::updateOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'description' => "Selection premium de biens immobiliers a $name.", 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80']
            );

            foreach ($districts as $district) {
                District::updateOrCreate(['city_id' => $city->id, 'slug' => Str::slug($district)], ['name' => $district]);
            }

            return [$name => $city->load('districts')];
        });

        Property::query()->delete();

        $images = [
            'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1400&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
            'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1400&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
        ];

        for ($i = 1; $i <= 50; $i++) {
            $cityName = array_keys($cityData)[($i - 1) % 3];
            $city = $cities[$cityName];
            $district = $city->districts[($i - 1) % $city->districts->count()];
            $transaction = $i % 2 === 0 ? 'SALE' : 'RENT';
            $type = ['APARTMENT', 'VILLA', 'HOUSE', 'STUDIO'][$i % 4];
            $base = $transaction === 'SALE' ? 650000 : 2800;
            $price = $base + ($i * ($transaction === 'SALE' ? 42000 : 230));
            $surface = 45 + (($i * 13) % 180);
            [$lat, $lng] = $coords[$cityName];

            $property = Property::create([
                'title' => "$type lumineux a $district->name",
                'slug' => Str::slug("$type lumineux a $district->name $i"),
                'description' => "Bien soigneusement selectionne a $district->name, avec volumes agreables, finitions modernes et acces rapide aux services essentiels. Ideal pour residence principale, investissement ou location longue duree.",
                'transaction_type' => $transaction,
                'property_type' => $type,
                'price' => $price,
                'city_id' => $city->id,
                'district_id' => $district->id,
                'address' => $district->name.', '.$cityName,
                'latitude' => $lat + (($i % 7) * 0.006),
                'longitude' => $lng + (($i % 5) * 0.006),
                'surface' => $surface,
                'bedrooms' => $type === 'STUDIO' ? 0 : 1 + ($i % 4),
                'bathrooms' => 1 + ($i % 3),
                'floor' => $i % 9,
                'total_floors' => 10,
                'furnished' => $i % 3 === 0,
                'parking' => $i % 2 === 0,
                'elevator' => $i % 4 !== 0,
                'balcony' => $i % 2 !== 0,
                'terrace' => $i % 5 === 0,
                'status' => ['AVAILABLE', 'AVAILABLE', 'RESERVED', 'SOLD', 'RENTED'][$i % 5],
                'owner_id' => $owners[$i % $owners->count()]->id,
            ]);

            foreach ($images as $index => $image) {
                $property->images()->create(['image_path' => $image, 'is_primary' => $index === 0]);
            }
        }

        $user->favorites()->sync(Property::limit(4)->pluck('id'));
        Property::limit(6)->get()->each(fn ($property, $i) => Reservation::create([
            'user_id' => $user->id,
            'property_id' => $property->id,
            'requested_date' => now()->addDays($i + 2)->toDateString(),
            'requested_time' => sprintf('%02d:00', 10 + $i),
            'request_type' => $i % 2 === 0 ? 'VISIT' : 'RESERVATION',
            'message' => 'Je souhaite recevoir plus de details et organiser un rendez-vous.',
            'status' => ['PENDING', 'ACCEPTED', 'REFUSED'][$i % 3],
        ]));
    }
}
