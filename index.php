<?php
declare(strict_types=1);

$pathInfo = $_SERVER['PATH_INFO'] ?? '';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($pathInfo === '/listen') {
    if ($method !== 'GET') {
        method_not_allowed('GET');
    }
    stream_listen();
}

if ($method !== 'POST') {
    method_not_allowed('POST');
}

match ($pathInfo){
    '/hello' => show_hello(),
    default => show_error(),
};

function show_hello(){
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode([[
        'type' => 'world',
        'yellow' => 'submarine',
    ]]);
    exit;
}

function show_error(){
    header('Content-Type: application/json');
    http_response_code(404);
    echo json_encode(['error' => 'not found']);
}

function method_not_allowed(string $allowedMethod): void {
    header('Content-Type: application/json');
    header("Allow: {$allowedMethod}");
    http_response_code(405);
    echo json_encode(['error' => 'method not allowed']);
    exit;
}

function stream_listen(): void {
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');
    header('Connection: keep-alive');
    header('X-Accel-Buffering: no');

    ignore_user_abort(true);
    set_time_limit(0);

    echo "retry: 3000\n\n";
    $eventId = 0;
    while (!connection_aborted()) {
        $eventId++;
        $payloadData = [
            'type' => 'world',
            'yellow' => 'submarine',
            'source' => 'listen',
            'time' => gmdate(DATE_ATOM),
        ];
        $payload = json_encode($payloadData);
        if ($payload === false) {
            continue;
        }
        $eventType = (string) ($payloadData['type'] ?? 'message');
        echo "id: {$eventId}\n";
        echo "event: {$eventType}\n";
        echo "data: {$payload}\n\n";
        @ob_flush();
        flush();
        sleep(5);
    }
    exit;
}
