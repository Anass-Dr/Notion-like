<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordEmail;
use App\Models\PasswordToken;
use App\Models\User;
use App\Services\Email\GenerateToken as EmailGenerateToken;
use App\Services\JWT\GenerateToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $rules = [
                'username' => ['required', 'string', 'min:3', 'unique:users'],
                'email' => ['required', 'string', 'email', 'lowercase', 'unique:users'],
                'password' => ['required', 'string', 'confirmed'],
            ];

            $this->validate($request, $rules);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Validation failed",
                "errors" => $e->validator->errors()->messages(),
            ], 422);
        }

        $user = User::create($request->only('username', 'email', 'password'));
        return response()->json([
            "success" => true,
            "message" => "User registered successfully"
        ], 201);
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

    public function forgotPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $token = EmailGenerateToken::new();
            PasswordToken::create([
                "token" => $token,
                "user_id" => $user->id
            ]);

            $data = [
                "token" => $token,
            ];

            Mail::to($user->email)->send(new ResetPasswordEmail($data));

            return response()->json([
                "success" => true,
                "message" => "Reset link sent to your email"
            ], 200);
        }

        return response()->json([
            "success" => false,
            "message" => "Email not found"
        ], 404);
    }

    public function verifyResetToken(string $token)
    {
        $passwordToken = PasswordToken::where('token', $token)->first();

        if ($passwordToken) {
            Session::put('user_id', $passwordToken->user_id);
            redirect('http://127.0.0.1:3000/reset-password');
        }

        return response()->json([
            "success" => false,
            "message" => "Token expired or not found"
        ], 404);
    }
}
