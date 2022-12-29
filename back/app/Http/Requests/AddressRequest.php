<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'cep' => 'required|min:8',
            'numero' => 'required|unique:addresses,numero',
        ];
    }

    public function messages()
    {
        return [
            'cep.required' => 'O cep é obrigatório',
            'numero.unique' => 'Endereço com esse numero ja foi cadastrado',
            'cep.min' => 'Cep inválido, por favor digite um cep valido com 8 caracteres',
            'numero.required' => 'O numero é obrigatório',
        ];
    }

   
}
