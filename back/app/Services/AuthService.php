<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Exception;

class AuthService
{
    public function registerService($name, $email, $password, $cpf, $role)
    {
        $cpf = preg_replace( '/[^0-9]/is', '', $cpf );
        
        if(strlen($cpf) != 11){
            throw new Exception('Erro, Tamanho incorreto');
        }
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            throw new Exception('Erro, CPF com digitos iguais não são validos');
        }
        for ($tamanho = 9; $tamanho < 11; $tamanho++) {
            for ($digito = 0, $contador = 0; $contador < $tamanho; $contador++) {
                $digito += $cpf[$contador] * (($tamanho + 1) - $contador);
            }
            $digito = ((10 * $digito) % 11) % 10;
            if ($cpf[$contador] != $digito) {
                throw new Exception('Erro, Por favor insira um CPF valido');
            }
        }
        

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'cpf' => $cpf,
            'role' => $role


        ]);

        $token = $user->createToken($user->email . '_Token')->plainTextToken;
        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function loginService($email, $password)
    {
        $user = User::where('email', $email)->first();
        if(!$user || !Hash::check($password, $user->password))
        {
            throw new UnauthorizedHttpException('message', 'Credenciais Invalidas');
        } else
        {
            $token = $user->createToken($user->email . '_Token')->plainTextToken;
            return [
                'user' => $user,
                'token' => $token
            ];
        }
    }

    public function logoutService()
    {
        auth()->user()->tokens()->delete();
    }
}