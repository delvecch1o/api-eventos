<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client as HttpClient;
use Illuminate\Support\Facades\Auth;
use App\Models\Address;

class AddressService
{
    public function cepService($cep, $numero)
    {
        
        $httpCliente = new HttpClient(['verify' => false]);
        $data = json_decode($httpCliente->get("https://viacep.com.br/ws/${cep}/json/")
            ->getBody()->getContents());
          
        $user = Auth::user();
        $data =  $user->address()->create([
            'cep' => $cep,
            'logradouro' => $data->logradouro,
            'complemento' => $data->complemento,
            'bairro' => $data->bairro,
            'localidade' => $data->localidade,
            'uf' => $data->uf,
            'numero' => $numero,
            
        ]);
        
        return [
           'data' => $data,
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

    public function updateService($id, $cep, $numero)
    {
        $httpCliente = new HttpClient(['verify' => false]);
        $data = json_decode($httpCliente->get("https://viacep.com.br/ws/${cep}/json/")
            ->getBody()->getContents());

        $user = Auth::user();
        $user->address()->where('id', $id)->update([
            'cep' => $cep,
            'logradouro' => $data->logradouro,
            'complemento' => $data->complemento,
            'bairro' => $data->bairro,
            'localidade' => $data->localidade,
            'uf' => $data->uf,
            'numero' => $numero,

        ]);
        return [
            'data' => $data
        ];
    }

    public function destroyService(Address $address)
    {
        $address->delete();
    }
}
