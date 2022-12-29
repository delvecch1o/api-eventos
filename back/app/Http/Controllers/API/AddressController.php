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

    public function consultarCep(Request $request, $cep)
    {
        $consultaCep = $this->addressService->cepService(
            ...[$cep, ...array_values(
                $request->only([
                    'cep',
                ])
            )]
        );
        return response()->json([
            'status' => 200,
            'endereco' =>  $consultaCep
            
        ]);
    }


    public function cep(AddressRequest $request)
    {
        $addressData = $this->addressService->create(
            ...array_values(
                $request->only([
                   'cep',
                   'numero',  
                ])
            )
        );
        return response()->json([
            'status' => 200,
            'endereco' => $addressData['endereco'],
        ]);
    }

    public function show()
    {
        $show = $this->addressService->showService();

        return response()->json([
            'show' => $show
        ]);
    }

    public function showDetails($id)
    {
        $show = $this->addressService->show($id);
        return response()->json([
            'show' => $show
        ]);
    }

    public function update(AddressRequest $request, Address $address)
    {
        $address = $this->addressService->updateService(
            $address,
            ...array_values(
                $request->only([
                    'cep',
                    'numero',
                    'complemento',
                ])

            )
           
        );

        return response()->json([
            'status' => 200,
            'address' => $address['address'],
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
