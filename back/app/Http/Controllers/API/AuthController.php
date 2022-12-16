<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\AuthRegister;
use App\Http\Requests\AuthLogin;

class AuthController extends Controller
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(AuthRegister $request)
    {
        $data = $this->authService->registerService(
            ...array_values(
                $request->only([
                    'name',
                    'email',
                    'password',
                    'cpf',
                    'role',
                ])
            )
        );
        return response()->json([
            'status' => 200,
            'username'=> $data['user']->name,
            'token' => $data['token'],
            'message' => 'Usuario cadastrado com Sucesso!'
        ]);
    }

    public function login(AuthLogin $request)
    {
       
        $data = $this->authService->loginService(
            ...array_values(
                $request->only([
                    'email',
                    'password'
                ])
            )
        );
        return response()->json([
            'status' => 200,
            'username' => $data['user']->name,
            'token' => $data['token'],
            'message' => 'Login Com Sucesso!'
        ]);
    }

    public function logout()
    {
        $this->authService->logoutService();
        return response()->json([
            'status' => 200,
            'message' => 'Usuario saiu com Sucesso'

        ]);
    }
    
}
