<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }


    public function showLoginForm()
    {
        return view('login.index');
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['accounts' => $request->input('accounts'), 'password' => $request->input('password')])) {

            if (Auth::user()->status != 1) {
                Auth::logout();
                return ["status"=>-1,"msg"=>'账号处于冻结状态!请等待管理员审核!'];
            }   
            return ["status"=>1,"msg"=>''];
        } else {
            return ["status"=>0,"msg"=>'账号密码不正确!'];
        }
    }


    public function logout(Request $request)
    {
        Auth::logout();
        return 1;
    }

}
