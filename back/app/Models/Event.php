<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes;


class Event extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'events';
    protected $fillable = [
        'nome',
        'palestrante',
        'inicio',
        'fim',
        'descrição',
        'numero_de_participantes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
