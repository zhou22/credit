<?php

namespace App\Http\Service\Warehouse;

use App\Http\Controllers\Controller;
use App\Entity\Warehouse\PurchaseRecordExtend;



class PurchaseRecordExtendService extends Controller
{
    
    public $rels = null;

    public function __construct()
    {
        $this->rels = new PurchaseRecordExtend();     

    }

   //添加需求数据
    public function add($datas,$id)
    {

        foreach ($datas as $v=>$a)
        {
            if ($v != 0) {
                $count[] = array('name' => $a['name'], 'type' => $a['type'], 'version' => $a['version'], 'number' => $a['number'],'price' => $a['price'], 'purchase_record_id' => $id, 'reach_date' => strtotime($a['reach_date']),'created_at' => time());
            }
        }

        return $this->rels->insert($count);

    }


    public function delete($id )
    {

        return $this->rels->where('purchase_record_id',$id)->delete();

    }


    public function getResls($purchaseRecordId)
    {

        return $this->rels->where('purchase_record_id',$purchaseRecordId)->get();
    }




}