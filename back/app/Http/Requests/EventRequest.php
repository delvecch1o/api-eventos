<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
        'nome' => 'required|max:191' ,
        'palestrante' => 'required|max:25',
        'inicio' => 'required|date' ,
        'fim' => 'required|date|after:' .$this->inicio ?? null ,
        'descrição' => 'required|max:191',
        'numero_de_participantes' => 'required|numeric|integer|min:1' ,

        ];
    }

    public function messages()
    {
        return[
            'nome.required' => 'O nome é obrigatório',
            'palestrante.required' => 'O nome do palestrante é obrigatório',
            'fim.after' => 'A data final deve ser posterior a data inicial',
            'numero_de_participantes.min' => 'A quantidade minima de participantes é 1' ,

        ];
        
    }
}
