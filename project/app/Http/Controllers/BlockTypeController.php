<?php

namespace App\Http\Controllers;

use App\Models\BlockType;
use Illuminate\Http\Request;

class BlockTypeController extends Controller
{
    public function index()
    {
        $block_types = BlockType::all();
        return response()->json($block_types);
    }
}
