<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AddressController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    
    Route::post('logout', [AuthController::class, 'logout']);
    
    Route::post('address', [AddressController::class, 'cep']);
    Route::get('address/show', [AddressController::class, 'show']);
    Route::put('address/update/{id}', [AddressController::class, 'update']);
    Route::delete('address/{address}', [AddressController::class, 'destroy']);



});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
