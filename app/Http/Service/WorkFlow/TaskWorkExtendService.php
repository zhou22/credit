<?php

namespace App\Http\Service\WorkFlow;

use App\Http\Controllers\Controller;
use App\Entity\Workflow\TaskWorkExtend;
use App\Tools\Tool;
use Validator;
use Illuminate\Validation\Rule;



class TaskWorkExtendService extends Controller
{
    
    public $rels = null;

    public function __construct()
    {
        $this->rels = new TaskWorkExtend();     

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



    

    public function getRels($taskWorkdId){


         return  $this->rels->where('task_work_id',$taskWorkdId)->get();


    }

    
}