<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AddressService;

class AddressController extends Controller
{
    private AddressService $addressService;

    public function __construct(AddressService $addressService)
    {
        $this->addressService = $addressService;
    }

    public function cep(Request $request)
    {
        $data = $this->addressService->cepService(
            ...array_values(
                $request->only([
                   'cep',
                   'numero',  
                ])
            )
        );
        return response()->json([
            'status' => 200,
            'data' => $data['data'],
        ]);
    }
}
