<?php

namespace App\Http\Service\Warehouse;

use App\Http\Controllers\Controller;
use App\Entity\Warehouse\PurchaseRecordItExtend;



class PurchaseRecordItExtendService extends Controller
{
    
    public $rels = null;

    public function __construct()
    {
        $this->rels = new PurchaseRecordItExtend();     

    }

   //添加需求数据
    public function add($datas,$id)
    {

        foreach ($datas as $k=>$v)
        {
            if ($k != 0) 
            {
                $count[] = 
                [
                    'purchase_type' => $v['itType'],
                    'cause' => $v['itCause'], 
                    'quantity' => $v['itNumber'], 
                    'unit' => '', 
                    'purchase_record_id' => $id, 
                    'other_need' => $v['itOtherNeed'],
                    'created_at' => time()
                ];
            }
        }

        $this->rels->insert($count);

    }


    public function getResls($purchaseRecordId)
    {

        return $this->rels->where('purchase_record_id',$purchaseRecordId)->get();
    }


}