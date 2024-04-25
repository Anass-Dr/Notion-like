<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\BlockType;
use App\Models\Page;
use App\Models\PublicPage;

class PublicPageController extends Controller
{
    public function check(Page $page)
    {
        $publicPage = PublicPage::where("page_id", $page->id)->first();
        $token = $publicPage ? $publicPage->token : "";
        return response()->json(["token" => $token]);
    }

    public function store(Page $page)
    {
        $title = str_replace(" ", "-", $page->title);
        $token = uniqid($title . "_");
        $publicPage = PublicPage::create([
            "token" => $token,
            "page_id" => $page->id
        ]);
        return response()->json(["token" => $token]);
    }

    public function get(string $token)
    {
        $publicPage = PublicPage::where('token', $token)->first();
        if (!$publicPage) return response()->json(["message" => "Token not valid"], 404);

        $page = Page::find($publicPage->page_id)->toArray();
        $blocks = Block::where('page_id', $page['id'])->get()->toArray();
        for ($i = 0; $i < count($blocks); $i++) :
            $type = BlockType::find($blocks[$i]['type_id']);
            $blocks[$i]['type'] = $type->name;
            if ($type->name === "code") $blocks[$i]['content'] = json_decode($blocks[$i]['content']);
        endfor;
        $page['blocks'] = $blocks;
        return response()->json(["data" => $page]);
    }

    public function unpublish(PublicPage $publicPage)
    {
        $publicPage->delete();
        return response()->json(["message" => "Page is no more public"], 204);
    }
}
