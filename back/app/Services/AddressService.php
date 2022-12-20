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
}
