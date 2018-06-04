<?php

namespace App\Http\Controllers;

use App\Http\Service\Personnel\StaffService;


class BaseController extends Controller
{

    public  $rels = null;

    public function getOneUserInfo($id)
    {
        $users = new StaffService();

        return $users->getOne($id);

    }








}





