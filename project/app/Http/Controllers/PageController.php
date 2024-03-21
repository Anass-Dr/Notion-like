<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\BlockType;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
    }

    public function store(Request $request)
    {
        # Create New Page :
        $page = Page::create([
            "title" => $request->title,
            "icon" => $request->icon,
            "background" => $request->background,
            "workspace_id" => 1
        ]);

        foreach ($request->blocks as $block) {
            # Get Block Type :
            $block_type = BlockType::where("name", $block['type'])->first();

            # Create New Block :
            Block::create([
                "type_id" => $block_type->id,
                "order" => $block['order'],
                "content" => $block['data']['text'],
                "page_id" => $page->id
            ]);
        }
        return response()->json(["message" => "ok"]);
    }

    public function update(string $id, Request $request)
    {
        $page = Page::find($id);
    }
}
