<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Services\EventService;
use App\Http\Requests\EventRequest;

class EventController extends Controller
{
    private EventService $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    public function create(EventRequest $request)
    {
        $data = $this->eventService->createService(
            ...array_values(
                $request->only([
                    'nome',
                    'palestrante',
                    'inicio',
                    'fim',
                    'descrição',
                    'numero_de_participantes',
                ])
            )
        );
        return response()->json([
            'status' => 200,
            'event' => $data['data'],
            'message' => 'Evento cadastrado com sucesso!'
        ]);
    }

    public function show()
    {
        $show = $this->eventService->showService();
        return response()->json([
            'show' => $show
        ]);
    }

    public function showDetails(Event $event)
    {
        $show = $this->eventService->show($event);
        return response()->json([
            'show' => $show
        ]);
    }

    public function update(EventRequest $request, Event $event)
    {
        $data = $this->eventService->updateService(
            $event,
            ...array_values(
                $request->only([
                    'nome',
                    'palestrante',
                    'inicio',
                    'fim',
                    'descrição',
                    'numero_de_participantes',
                ])
            )
        );
        return response()->json([
            'status' => 200,
            'event' => $data['event'],
            'message' => 'Evento Atualizado com sucesso!'
        ]);
    }

    public function destroy(Event $event)
    {
        $this->eventService->destroyService($event);
        return response()->json([
            'message' => 'Evento excluido com sucesso'
        ]);
    }
}
