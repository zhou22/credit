<?php

namespace App\Http\Service\WorkFlow;

use App\Http\Controllers\Controller;
use App\Entity\Workflow\TaskWork;
use App\Tools\Tool;
use Validator;
use Illuminate\Validation\Rule;



class TaskWorkService extends Controller
{
    
    public $rels = null;

    public $messages = [
        'remarks.max' => '备注不能超过255!',
        'task_id.unique' => '不能重复添加事务流程!'
    ];


    public function __construct()
    {
        $this->rels = new TaskWork();     

    }

    //获取列表数据
    public function getList($relsArray) 
    {
        if ($relsArray['selectValue'] == 1) {

            $rows = $this->rels                  
                               ->where(function($query) use($relsArray) {
                                   if (!empty($relsArray['keyWork']))
                                   { 
                                       $query->where('work_id',$relsArray['keyWork']);  
                                   }  
                                })
                               ->where(function($query) use($relsArray) {
                                   if (!empty($relsArray['keywords']))
                                   { 
                                       $query->where('work_name','like','%'.$relsArray['keywords'].'%')
                                             ->orWhere('task_name','like','%'.$relsArray['keywords'].'%');  
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
 
    //添加一条数据
   public function add($datas)
    {

        //验证
        $errors = Validator::make($datas->all(), [
            'remarks' => 'max:255',
            'task_id' => [
                  Rule::unique('task_work')->where(function ($query) use ($datas) {
                                            $query->where('work_id', $datas['work_id'])
                                                  ->where('child_work_id', $datas['child_work_id']);
                                        })                                         
            ]
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) {

            $this->rels->task_id = $datas->input('task_id');
            $this->rels->work_id = $datas->input('work_id');
            $this->rels->child_work_id = $datas->input('child_work_id');
            $this->rels->child_after = $datas->input('child_after');
            $this->rels->remarks = $datas->input('remarks');
            $this->rels->save();

            return ["status"=>1,"msg"=>'事务流程加成功！'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }



    public function update($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'remarks' => 'max:255',
            'task_id' => [
                  Rule::unique('task_work')->where(function ($query) use ($datas) {
                                            $query->where('work_id', $datas['work_id'])
                                                  ->where('child_work_id', $datas['child_work_id']);
                                        })
                                           ->ignore($datas->id),
            ]
        ],$this->messages);


        //判断验证是否通过
        if (empty($errors->errors()->all())) {

            //查找当前id数据
            $rels = $this->rels->find($datas['id']);

            if (empty($rels)) {
                return ["status"=>-1,"msg"=>'非法操作!'];
            }

            $rels->task_id = $datas->input('task_id');
            $rels->work_id = $datas->input('work_id');
            $rels->child_work_id = $datas->input('child_work_id');
            $rels->child_after = $datas->input('child_after');
            $rels->remarks = $datas->input('remarks');
            $rels->save();

            return ["status"=>1,"msg"=>'事务流程加成功！'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }
    }



    //获取上一条和下一条数据
    public function getOneAll($id)
    {

        // $rels = $this->getOne($id);

        // $last = $this->rels->where('next_id',$rels->id)->where('work_id',$rels->work_id)->get();
        // $next = $this->rels->where('id',$rels->next_id)->where('work_id',$rels->work_id)->get();

        // if ($last->first()) {
        //     $rels->lastName = $last[0]->task_name;
        //     $rels->lastId = $last[0]->id;
        // }

        // if ($next->first()) {
        //     $rels->nextName = $next[0]->task_name;
        //     $rels->nextId = $next[0]->id;
        // }

        return $rels;

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


    // 获取一条数据
    public function getOneWork($data)
    {
        return  $this->rels->where('work_id',$data['workId'])->where('last_id',$data['lastId'])->get();
    }
}