<?php
use App\Http\Middleware\RoleMiddleware;
// ...existing code...
$routeMiddleware = [
    // autres middlewares...
    'role' => \App\Http\Middleware\RoleMiddleware::class,
    'sanctum' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
];
