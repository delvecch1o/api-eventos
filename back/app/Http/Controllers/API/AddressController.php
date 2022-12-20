<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\AddressService;
use App\Http\Requests\AddressRequest;

class AddressController extends Controller
{
    private AddressService $addressService;

    public function __construct(AddressService $addressService)
    {
        $this->addressService = $addressService;
    }

    public function cep(AddressRequest $request)
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
