<?php

namespace App\Http\Service\WorkFlow;

use App\Entity\Workflow\WorkPerson;
use App\Http\Controllers\Controller;
use App\Tools\Tool;



class WorkPersonService extends Controller
{
    public function __construct()
    {
        $this->rels = new WorkPerson();

    }



    public function getList($id)
    {
        $row = $this->rels->where('person_id',$id)
                          ->get();
        return $row;

    }


    public function getListTasking($data)
    {
        $row = $this->rels->whereIn('tasking_id',$data)
                          ->get();
        return $row;

    }

    public function getFind($id)
    {
        $row = $this->rels->find($id);        
        return $row;        
    }
   
   //添加需求数据
    public function add($datas)
    {
        $count = [];
        foreach ($datas as $k=>$v)
        {
            $count[] = [
                            'person_id' => $v['id'], 
                            'person_name' => $v['name'], 
                            'tasking_id' => $v['tasking_id']->id, 
                            'execute' => $v['execute'],
                            'created_at' => time()
                        ];

        }

        $this->rels->insert($count);

    }


    //更新审核
    public function update($dates)
    {
       $rows = $this->rels->where('person_id',$dates->user()->staff_id)
                   ->where('tasking_id',$dates->tasking_id)
                   ->update([
                            "status" => $dates->status,
                            "contents" => $dates->task_remarks
                            ]);
        return $rows;

    }



}