<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class HomeController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = $this->getOneUserInfo($request->user()->staff_id);

        return view('index')->with('users' ,$users);
    }
}
