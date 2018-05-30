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

    public $messages = [
        'remarks.max' => '备注不能超过255!',
        'task_work_id.unique' => '不能重复添加流程判断!'
    ];

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

    //添加数据
    public function add($datas)
    {
                //验证
        $errors = Validator::make($datas->all(), [
            'remarks' => 'max:255',
            'task_work_id' => [
                  Rule::unique('task_work_extend')->where(function ($query) use ($datas) {
                                            $query->where('task_work_next_id', $datas['task_work_next_id']);
                                        })                                         
            ]
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) {

            $this->rels->task_work_id = $datas->input('task_work_id');
            $this->rels->task_work_next_id = $datas->input('task_work_next_id');
            $this->rels->judge = $datas->input('judge');
            $this->rels->remarks = $datas->input('remarks');
            $this->rels->field_type = $datas->input('field_type');
            $this->rels->save();

            return ["status"=>1,"msg"=>'流程判断添加成功!'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }

    

    // 获取一条数据
    public function getOne($id)
    {
        return  $this->rels->find($id);
    }

    // 获取所有数据
    public function getAll()
    {
        return  $this->rels->all();
    }
    

    public function getRels($taskWorkdId){


         return  $this->rels->where('task_work_id',$taskWorkdId)->get();


    }

    
}