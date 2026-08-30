<?php
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('X-Frame-Options: DENY');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip = trim(explode(',', (string) $ip)[0]);
$rateFile = sys_get_temp_dir() . '/kcjc-ai-' . hash('sha256', $ip);
$now = time();
$window = 60;
$limit = 20;
$hits = [];

if (is_file($rateFile)) {
    $raw = file_get_contents($rateFile);
    $decoded = json_decode((string) $raw, true);
    if (is_array($decoded)) {
        $hits = array_values(array_filter($decoded, static fn($stamp) => is_int($stamp) && $stamp > $now - $window));
    }
}

if (count($hits) >= $limit) {
    header('Retry-After: 60');
    http_response_code(429);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'Too many requests. Please try again shortly.']);
    exit;
}

$hits[] = $now;
file_put_contents($rateFile, json_encode($hits), LOCK_EX);

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 8192) {
    http_response_code(400);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'Invalid request body.']);
    exit;
}

$payload = json_decode($rawBody, true);
if (!is_array($payload)) {
    http_response_code(400);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'Invalid request body.']);
    exit;
}

$message = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', (string) ($payload['message'] ?? '')));
$message = substr($message, 0, 2000);

if ($message === '') {
    http_response_code(400);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'Message is required.']);
    exit;
}

$configPath = __DIR__ . '/gemini-config.php';
$apiKey = '';
if (is_file($configPath)) {
    $config = include $configPath;
    if (is_array($config) && !empty($config['gemini_api_key']) && $config['gemini_api_key'] !== 'MY_GEMINI_API_KEY') {
        $apiKey = (string) $config['gemini_api_key'];
    }
}

header('Content-Type: application/json; charset=UTF-8');

if ($apiKey === '') {
    http_response_code(200);
    echo json_encode(['reply' => null]);
    exit;
}

$prompt = 'You are Campus Guide AI for Krishna Chaitanya Junior College, Nellore. Answer only from college website facts. Keep replies short. User question: ' . $message;
$endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . rawurlencode($apiKey);
$requestBody = json_encode([
    'contents' => [
        ['role' => 'user', 'parts' => [['text' => $prompt]]],
    ],
]);

$response = false;
$status = 0;

if (function_exists('curl_init')) {
    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => $requestBody,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
    ]);
    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
} else {
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $requestBody,
            'timeout' => 20,
            'ignore_errors' => true,
        ],
    ]);
    $response = @file_get_contents($endpoint, false, $context);
    $status = 200;
}

if (!is_string($response) || $status >= 400) {
    http_response_code(200);
    echo json_encode(['reply' => null]);
    exit;
}

$data = json_decode($response, true);
$reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

http_response_code(200);
echo json_encode(['reply' => is_string($reply) && $reply !== '' ? $reply : null]);
