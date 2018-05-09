<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Service\Personnel\UserService;
use Illuminate\Http\Request;

class RegisterController extends Controller
{

    public $rels = null;

    public function __construct()
    {
        $this->middleware('guest');
        $this->rels = new UserService();  
    }

    public function register(Request $request)
    {
        return $this->rels->add($request);
    }



}
