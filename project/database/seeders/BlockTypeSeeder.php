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
            "name" => "paragraph",
            "description" => "Just start writing with plain text.",
            "image" => "http://127.0.0.1:8000/assets/images/alphabet.png"
        ]);
        BlockType::create([
            "name" => "heading1",
            "description" => "Big section heading.",
            "image" => "http://127.0.0.1:8000/assets/images/header1.png"
        ]);
        BlockType::create([
            "name" => "heading2",
            "description" => "Medium section heading.",
            "image" => "http://127.0.0.1:8000/assets/images/header2.png"
        ]);
        BlockType::create([
            "name" => "heading3",
            "description" => "Small section heading.",
            "image" => "http://127.0.0.1:8000/assets/images/header3.png"
        ]);
        BlockType::create([
            "name" => "image",
            "description" => "Importez une image, ou intégrez-la avec un lien.",
            "image" => "http://127.0.0.1:8000/assets/images/block__image.png"
        ]);
        BlockType::create([
            "name" => "video",
            "description" => "Embed from Vimeo...",
            "image" => "http://127.0.0.1:8000/assets/images/block__video.png"
        ]);
        BlockType::create([
            "name" => "audio",
            "description" => "Embed from SoundCloud, Spotify...",
            "image" => "http://127.0.0.1:8000/assets/images/block__audio.png"
        ]);
        BlockType::create([
            "name" => "youtube",
            "description" => "Embed from Youtube",
            "image" => "http://127.0.0.1:8000/assets/images/block__youtube.svg"
        ]);
    }
}
