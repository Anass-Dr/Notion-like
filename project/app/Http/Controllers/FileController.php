<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    public function save(Request $request) {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $file = $request->file('file');
        $path = Storage::disk('public')->put('uploads', $file);
        $path = "http://127.0.0.1:8000/storage/" . $path;
        return response()->json([
            'message' => 'File uploaded successfully!',
            'path' => $path,
        ]);
    }
}
