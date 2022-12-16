<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class AuthService
{
    public function registerService($name, $email, $password, $cpf, $role)
    {
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