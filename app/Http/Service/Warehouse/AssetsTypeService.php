<?php

namespace App\Http\Service\Warehouse;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class AssetsTypeService extends Controller
{
    
    //获取列表数据
    public function getList($relsArray) 
    {

            return DB::table('krd_assets_type')->select('id','name','assets_tab','department_id')->get();

    }


    // 获取一条数据
    public function getOne($id)
    {

    }


}