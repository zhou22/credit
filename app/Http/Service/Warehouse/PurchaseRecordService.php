<?php

namespace App\Http\Service\Warehouse;

use App\Http\Controllers\Controller;
use App\Entity\Warehouse\PurchaseRecord;
use App\Http\Service\Warehouse\PurchaseRecordItExtendService;
use App\Http\Service\Warehouse\PurchaseRecordExtendService;
use App\Tools\Tool;
use App\Tools\UUID;


class PurchaseRecordService extends Controller
{
    
    public $rels = null;


    public function __construct()
    {
        $this->rels = new PurchaseRecord();     

    }


    //获取列表数据
    public function getList($relsArray) 
    {
        if ($relsArray['selectValue'] == 1) {

            $rows = $this->rels        
                               ->orderBy($relsArray->input('sort'),$relsArray->input('order'))
                               ->offset($relsArray->input('rows')*($relsArray->input('page') - 1))
                               ->limit($relsArray->input('rows'));

            $counts = $rows->count();
            $rows = $rows->get();

            return array(
                'total'=>$counts,
                'rows'=>$rows
            ); 
                             
        } else {

            return $this->rels->get();
        }
    }

    //添加采购申请
    public function add($datas,$users,$checks)
    {
        try {
            $this->rels->sn = Tool::dateSn();        
            $this->rels->department_id = $users['department_id'];
            $this->rels->department_name = $users['department'];
            $this->rels->person_id = $users['id'];
            $this->rels->person_name = $users['name'];
            $this->rels->ask_date = strtotime($datas->input('ask_date'));
            $this->rels->budget = $datas->input('budget');
            $this->rels->budget_name = $datas->input('budget_name');
            $this->rels->type = $datas->input('type');
            $this->rels->type_name = $datas->input('type_name');
            $this->rels->remarks = $datas->input('remarks');
            $this->rels->save();           
        } catch (\Exception $e) {
            $checks->status = -1;
            $checks->msg = '数据库操作错误!';       
        }

        $relsIt = $this->getRelsExtend($datas['relsType']);

        $relsIt->add($datas->lst_data['rows'],$this->rels->id);


        return $this->rels;
    }


    public function getItOne($data)
    {
        $rels = $this->rels->where('id',$data->krd_task_id)->get()->first();

        $relsItExtend = $this->getRelsExtend(1);    

        $relsExtend = $this->getRelsExtend(2);

        $rels['itExtend'] =  $relsItExtend->getResls($data->krd_task_id);

        $rels['extend'] =  $relsExtend->getResls($data->krd_task_id);

        return $rels;

    }



    public function getRelsExtend($data)
    {
        if ($data == 1) {
             $data = new PurchaseRecordItExtendService();
        } else {
             $data = new PurchaseRecordExtendService();
        }

        return $data;
    }


    public function update($datas)
    {
        $relsIt = $this->getRelsExtend(2);
        $relsIt->delete($datas->id);       
        $relsIt->add($datas->lst_data['rows'],$datas->id);
        return $datas->id;
    }


}