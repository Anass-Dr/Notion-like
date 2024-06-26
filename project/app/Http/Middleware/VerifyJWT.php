<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyJWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        $secretKey = env("JWT_SECRET");

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            $request->merge(["user_id" => $decoded->user->id]);
        } catch (\Firebase\JWT\ExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            return response()->json(['error' => 'Invalid token signature'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred'], 500);
        }

        return $next($request);
    }
}
