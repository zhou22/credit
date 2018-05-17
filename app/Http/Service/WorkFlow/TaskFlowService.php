<?php

namespace App\Http\Service\WorkFlow;

use App\Entity\Workflow\TaskFlow;
use App\Http\Controllers\Controller;



class TaskingService extends Controller
{
    public function __construct()
    {
        $this->rels = new TaskFlow();

    }

    public function add($data)
    {
        $this->rels->task_work_id = $data['task_work']->id;       
        $this->rels->task_work_name = $data['task_work']->task_name;
        $this->rels->task_info_id = $data['task_info_id'];
        $this->rels->save();
        return $this->rels;
    }


    public function getRels($data)
    {

        return $this->rels->where('task_info_id',$data)->get()->toArray();

    }


    public function update($data)
    {
        $row = $this->rels->find($data->tasking_id);
        $row->status = $data->status;
        $row->save();

        return $row; 
    }

}