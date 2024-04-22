<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\BlockTypeController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PublicPageController;
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
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware('jwt.auth')->group(function () {
  # Page Endpoint :
  Route::get('/pages', [PageController::class, 'index']);
  Route::post('/pages', [PageController::class, 'store']);
  Route::put('/pages/{id}', [PageController::class, 'update']);
  Route::delete('/pages/{id}', [PageController::class, 'destroy']);
  Route::post('/pages/{id}' , [PageController::class, 'changeActive']);
  Route::get('/pages/trash' , [PageController::class, 'getTrash']);
  Route::get('/pages/restore/{page:id}' , [PageController::class, 'restore']);
  Route::delete('/pages/delete/{page:id}' , [PageController::class, 'deletePermanently']);

  Route::post('/files/', [FileController::class, "save"]);

  # Public Page Endpoint :
  Route::post('/public-pages/{page:id}', [PublicPageController::class, 'store']);
  Route::get('/public-pages/id/{page:id}', [PublicPageController::class, 'check']);
  Route::delete('/public-pages/{publicPage:token}', [PublicPageController::class, 'unpublish']);
});

Route::get('/block-types', [BlockTypeController::class, 'index']);
Route::get('/public-pages/{token}', [PublicPageController::class, 'get']);