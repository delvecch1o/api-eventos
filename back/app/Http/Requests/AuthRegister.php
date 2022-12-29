<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\Cpf;

class AuthRegister extends FormRequest
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
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'cpf' => ['required', new Cpf, 'unique:users,cpf'],
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required',
            'role' => 'required|max:191',
        ];
    }

    public function messages()
    {
       return[
           'name.required' => 'O nome é obrigatório',
           'email.unique' => 'O email ja foi cadastrado',
           'cpf.required' => 'O cpf é obrigatório',
           'cpf.unique' => 'O cpf ja foi cadastrado',
           'password.required' => 'A senha é obrigatório',
           'password.confirmed' => 'As senhas não são iguais',
           'password.min' => 'Senha muito curta, mínimo 8 caracteres',
           'password_confirmation.required' => 'Confirmação da senha é obrigatório',
           'role.required' => 'A função é obrigatório',
       ] ;
    }
    
}
