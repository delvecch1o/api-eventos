<?php 

namespace App\Services;

use App\Models\Event;
use Illuminate\Support\Facades\Auth;

class EventService
{
    public function createService($nome, $palestrante, $inicio, $fim , $descrição, $numero_de_participantes)
    {
        $user = Auth::user();
        $data = $user->events()->create([
            'nome' => $nome,
            'palestrante' => $palestrante,
            'inicio' => $inicio,
            'fim' => $fim,
            'descrição' => $descrição,
            'numero_de_participantes' => $numero_de_participantes

        ]);
        return [
            'data' => $data
        ];
    }

    public function showService()
    {
        $user = Auth::user();
        $show = $user->events()->get();
        return [
            'show' => $show
        ];
    }

    public function show(Event $event)
    {
        $user = Auth::user();
        $show = $user->address()->find($event);
        return $show;
    }

    public function updateService(Event $event, $nome, $palestrante, $inicio, $fim , $descrição, $numero_de_participantes)
    {
        $event->update([
            'nome' => $nome,
            'palestrante' => $palestrante,
            'inicio' => $inicio,
            'fim' => $fim,
            'descrição' => $descrição,
            'numero_de_participantes' => $numero_de_participantes

        ]);

        return [
            'event' => $event
        ];
    }

    public function destroyService(Event $event)
    {
        $event->delete();
    }
}