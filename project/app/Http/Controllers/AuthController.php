<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\JWT\GenerateToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'username' => ['required', 'string', 'min:3', 'unique:users'],
            'email' => ['required', 'string', 'email', 'lowercase', 'unique:users'],
            'password' => ['required', 'string', 'confirmed'],
        ]);

        $user = User::create($validatedData);
        return response()->json($user, 201);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        # - User Not Found :
        if (!$user)  return response()->json(["error" => "email not found"], 401);

        # - Wrong Credentials :
        if (!Hash::check($request->password, $user->password)) return response()->json([
            "error" => "Password incorrect"
        ], 401);

        # - Valid Credentials :
        $token = GenerateToken::new($user);
        return response()->json([
            "success" => true,
            "token" => $token,
        ], 200);
    }
}
