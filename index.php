<?php
declare(strict_types=1);
header('Content-Type: application/json');


$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if( $method !== 'POST'){
    http_response_code(405);
    echo json_encode(['error' => 'method not allowed']);
    exit;
}

$pathInfo = $_SERVER['PATH_INFO'] ?? '';

match ($pathInfo){
    '/hello' => show_hello(),
    default => show_error(),
};

function show_hello(){
    http_response_code(200);
    echo json_encode(['invoke' => 'hello world']);
    exit;
}

function show_error(){
    http_response_code(404);
    echo json_encode(['error' => 'not found']);
}
