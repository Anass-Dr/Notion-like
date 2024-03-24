<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(string $id)
    {
        $data = [];
        $pages = Page::where('user_id', $id)->get()->toArray();
        foreach ($pages as $page) :
            $blocks = Block::where('page_id', $page['id'])->get()->toArray();
            $page['blocks'] = $blocks;
            $data[] = $page;
        endforeach;

        return response()->json(["success" => true, "data" => $data]);
    }

    public function store(Request $request)
    {
        Page::where('user_id', $request->user_id)->update(['active' => false]);
        $page = Page::create(["user_id" => $request->user_id])->toArray();
        $page["blocks"] = [];

        return response()->json([
            "success" => true,
            "data" => ["page" => $page]
        ], 201);
    }

    public function update(string $id, Request $request)
    {
        $page = Page::where('id', $id)->where('user_id', $request->user_id)->first();

        if ($page) {
            $page->update([
                "title" => $request->page['title'],
                "icon" => $request->page['icon'],
                "cover" => $request->page['cover'],
                "active" => $request->page['active']
            ]);
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
}
