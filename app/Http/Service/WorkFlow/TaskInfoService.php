<?php

namespace App\Http\Service\WorkFlow;

use App\Entity\Workflow\TaskInfo;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class TaskInfoService extends Controller
{
    public function __construct()
    {
        $this->rels = new TaskInfo();

    }


    //获取列表数据
    public function getList($relsArray) 
    {
        if ($relsArray['selectValue'] == 1) {
            $rows = $this->rels
                                ->where(function($query) use($relsArray) {
                                        if ($relsArray['otherValue'] != 1) {
                                            $query->where('staff_id',$relsArray->user()->staff_id);
                                        } else {
                                            $query->where('staff_id','<>',$relsArray->user()->staff_id);
                                        }                                        
                                    })
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


    

        //获取列表数据
    public function getOtherList($relsArray) 
    {
        // if ($relsArray['selectValue'] == 1) {
        //     $rows = DB::table('work_person')                       
        //                          ->where(function($query) use($relsArray) {  
        //                                 $query->where('task_info.staff_id','<>',$relsArray->user()->staff_id);
        //                             })
        //                         ->where('task_info.status','<>',2)
        //                         ->leftJoin('task_info', function($join) use($relsArray){                                    
        //                             $join->on('task_info.tasking_id', '=', 'work_person.tasking_id');
                                                                      
        //                         })
        //                         ->where('work_person.person_id', '=', $relsArray->user()->staff_id)
        //                         ->orderBy('task_info.'.$relsArray->input('sort'),$relsArray->input('order'))
        //                         ->offset($relsArray->input('rows')*($relsArray->input('page') - 1))
        //                         ->limit($relsArray->input('rows'));

        //     $counts = $rows->count();

        //     $rows = $rows->get();

        //     return array(
        //         'total'=>$counts,
        //         'rows'=>$rows
        //     );                             

        // }

        $rels = $this->rels->get();



    }


    
    public function add($data,$users,$pid)
    {
        $this->rels->staff_id = $users['id'];
        $this->rels->staff_name = $users['name'];
        $this->rels->work_id = $data['task_work']->work_id;
        $this->rels->title = $data['title'];
        $this->rels->krd_task_id = $data['krd_task_rels']->id;
        $this->rels->pid = $pid;
        $this->rels->save();

        return $this->rels->id;
    }



    //更新指定id的tasking_id
    public function updateTaskingId($data)
    {
        $rels = $this->rels->find($data['task_info_id']);

        $rels->tasking_id  = $data['tasking']->id;
        $rels->tasking_name  = $data['tasking']->task_work_name;        
    
        $rels->save();
    }


    public function getTaskInfo($id)    
    {
        return $this->rels->find($id);
    }


    public function getTaskInfoPid($pid)    
    {
        return $this->rels->where('pid',$pid)->get();
    }




}