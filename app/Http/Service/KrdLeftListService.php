<?php

namespace App\Http\Service;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Entity\KrdLeftList;

class KrdLeftListService extends Controller
{
    

    public function getTree()
    {

        $rels = new KrdLeftList();      

        $rels = $rels->all('id','name as text','url as url','iconCls as iconCls','pid')->toArray();

        //声明数组
        $tree = array();

        foreach ($rels as $key => $value)
         {
           if ($value['pid'] == 0) 
           {

               $tree[] = $value;
           }
        }



        foreach ($tree as $tkey => $tvalue) 
        {
            foreach ($rels as $k => $v) 
            {
                if ($v['pid'] == $tvalue['id']) 
                {
                    $tree[$tkey]['children'][] = $v;
                }
            }
            
        }


        
        return $tree;

    }






}
