<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client as HttpClient;
use Illuminate\Support\Facades\Auth;
use App\Models\Address;

class AddressService
{
    public function cepService($cep)
    {
        
        $httpCliente = new HttpClient(['verify' => false]);
        $data = json_decode($httpCliente->get("https://viacep.com.br/ws/${cep}/json/")
            ->getBody()->getContents());
        return $data;
    }
    
    public function create($cep, $numero)
    {
        $cepData = $this->cepService($cep); 
        $user = Auth::user();
        $addressData =  $user->address()->create([
            'cep' => $cep,
            'logradouro' => $cepData->logradouro,
            'complemento' => $cepData->complemento,
            'bairro' => $cepData->bairro,
            'localidade' => $cepData->localidade,
            'uf' => $cepData->uf,
            'numero' => $numero,
            
        ]);
        
        return [
           'endereco' =>  $addressData,
        ];
        
    }

    public function showService()
    {
        $user = Auth::user();
        $show = $user->address()->get();
        return [
            'show' => $show
        ];

    }

    public function show(Address $address)
    {
        $user = Auth::user();
        $show = $user->address()->find($address);
        return  $show;
        
    }

    public function updateService(Address $address, $cep, $numero, $complemento)
    {
        
        $cepData = $this->cepService($cep); 
        $address->update([
            'cep' => $cep,
            'logradouro' => $cepData->logradouro,
            'complemento' => $complemento,
            'bairro' => $cepData->bairro,
            'localidade' => $cepData->localidade,
            'uf' => $cepData->uf,
            'numero' => $numero,

        ]);
        return [
            'address' => $address
        ];
    }

    public function destroyService(Address $address)
    {
        $address->delete();
    }
}
