<?php

namespace App\Services\Email;

class GenerateToken
{
  public static function new()
  {
    return uniqid() . uniqid();
  }
}
