<?php

namespace Database\Seeders;

use App\Models\BlockType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlockTypeSeeder extends Seeder
{
    public function run(): void
    {
        BlockType::create(["name" => "paragraph"]);
        BlockType::create(["name" => "heading1"]);
        BlockType::create(["name" => "heading2"]);
        BlockType::create(["name" => "heading3"]);
    }
}
