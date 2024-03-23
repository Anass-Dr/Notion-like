<?php

namespace App\Services\Email;

class GenerateToken
{
  public static function new($id)
  {
    return uniqid() . uniqid() . "@" . $id;
  }
}
