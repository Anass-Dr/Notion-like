<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\BlockTypeController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

# Authentication :
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::get('/reset-password/{token}', [AuthController::class, 'verifyResetToken'])->name('password.reset');
// Route::post('/reset-password/{token}', [AuthController::class, 'resetPassword']);

Route::middleware('jwt.auth')->group(function () {
  # Page Endpoint :
  Route::get('/pages/{id}', [PageController::class, 'index']);
  Route::post('/pages', [PageController::class, 'store']);
  Route::put('/pages/{id}', [PageController::class, 'update']);
  Route::delete('/pages', [PageController::class, 'destroy']);
});

Route::get('/block-types', [BlockTypeController::class, 'index']);
