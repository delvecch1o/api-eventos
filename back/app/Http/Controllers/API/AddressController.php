<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\AddressService;
use App\Http\Requests\AddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;

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

    public function show()
    {
        $show = $this->addressService->showService();

        return response()->json([
            'show' => $show
        ]);
    }

    public function update(AddressRequest $request, Address $address)
    {
        $data = $this->addressService->updateService(
            $address,
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
            'message' => 'Endereço atualizado com sucesso!'
        ]);
    }

    public function destroy(Address $address)
    {
        $this->addressService->destroyService($address);

        return response()->json([
            'message' => "Endereço excluido com sucesso"
        ]);
    }
}
