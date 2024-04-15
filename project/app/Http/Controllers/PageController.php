<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\BlockType;
use App\Models\Page;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $data = [];
        $pages = Page::where('user_id', $request->user_id)->where('deleted_at', null)->get()->toArray();
        foreach ($pages as $page) :
            $blocks = Block::where('page_id', $page['id'])->get()->toArray();
            for ($i = 0; $i < count($blocks); $i++):
                $type = BlockType::find($blocks[$i]['type_id']);
                $blocks[$i]['type'] = $type->name;
            endfor;
            $page['blocks'] = $blocks;
            $data[] = $page;
        endforeach;

        return response()->json(["success" => true, "data" => $data]);
    }

    public function store(Request $request)
    {
        # - Set active to false for all pages :
        Page::where('user_id', $request->user_id)->update(['active' => false]);

        $page = Page::create(["user_id" => $request->user_id]);
        $page = Page::find($page->id)->toArray();
        $page["blocks"] = [];

        return response()->json([
            "success" => true,
            "data" => ["page" => $page]
        ], 201);
    }

    public function update(string $id, Request $request)
    {
        $page = Page::find($id);

        if ($page) {
            $page->update($request->all());
            # - Delete All blocks :
            Block::where("page_id", $page->id)->delete();

            # - Insert Blocks :
            foreach ($request->blocks as $block):
                $type = BlockType::where("name", $block['type'])->first();
                Block::create([
                    "content" => $block['content'] ?? "",
                    "page_id" => $page->id,
                    "order" => 1,
                    "type_id" => $type->id
                ]);
            endforeach;

            return response()->json([
                "success" => true
            ]);
        } else {
            return response()->json([
                "success" => false,
                "error" => "Page not found"
            ], 404);
        }
    }

    public function destroy (string $id, Request $request) {
        $page = Page::find($id)->update(['deleted_at' => Carbon::now()->utc(), 'active' => false]);

        if($page) {
            Page::find($request->active_id)->update(['active' => true]);
            return response()->json(['message' => 'page deleted successfully'], 202);
        }

        return response()->json(['message' => 'page not found'], 404);
    }

    public function changeActive (string $id, Request $request) {
        # - Set active to false for all pages :
        Page::where('user_id', $request->user_id)->update(['active' => false]);

        Page::find($id)->update(['active' => true]);
        return response()->json(["message" => "Active page updated successfuly"]);
    }
}
