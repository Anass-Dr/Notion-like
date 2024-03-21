<?php

namespace Database\Seeders;

use App\Models\BlockType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlockTypeSeeder extends Seeder
{
    public function run(): void
    {
        BlockType::create([
            "name" => "Text",
            "description" => "Just start writing with plain text.",
            "image" => "http://127.0.0.1:8000/assets/images/alphabet.png"
        ]);
        BlockType::create([
            "name" => "Heading 1",
            "description" => "Big section heading.",
            "image" => "http://127.0.0.1:8000/assets/images/header1.png"
        ]);
        BlockType::create([
            "name" => "Heading 2",
            "description" => "Medium section heading.",
            "image" => "http://127.0.0.1:8000/assets/images/header2.png"
        ]);
        BlockType::create([
            "name" => "Heading 3",
            "description" => "Small section heading.",
            "image" => "http://127.0.0.1:8000/assets/images/header3.png"
        ]);
    }
}
