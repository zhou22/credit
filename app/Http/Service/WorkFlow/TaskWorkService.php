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

        if (!empty($datas['id'])) {
            $row = $this->rels->find($datas['id']);

            if (empty($row) || $row->work_id != $datas['work_id'] ) {
                return ["status"=>-1,"msg"=>'非法操作!'];
            }
        } else {
            $datas['id'] = 0;
        }


        //验证
        $errors = Validator::make($datas->all(), [
            'remarks' => 'max:255',
            'task_id' => [
                  Rule::unique('task_work')->where(function ($query) use ($datas) {
                                            $query->where('work_id', $datas['work_id']);
                                        })                                         
            ]
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            $this->rels->task_name = $datas->input('task_name');
            $this->rels->task_id = $datas->input('task_id');
            $this->rels->work_name = $datas->input('work_name');
            $this->rels->work_id = $datas->input('work_id');
            $this->rels->remarks = $datas->input('remarks');
            $this->rels->next_id = 0;
            $this->rels->last_id = $datas['id'];
            $this->rels->save();
            if (!empty($datas['id'])) {
                $row->next_id = $this->rels->id;
                $row->save();
            }
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
                                            $query->where('work_id', $datas['work_id']);
                                        })
                                           ->ignore($datas->id),
            ]
        ],$this->messages);




        //判断验证是否通过
        if (empty($errors->errors()->all())) {

            //判断是否存在上一项
            if (!empty($datas['last_id'])) {
                $last = $this->rels->find($datas['last_id']);
                if (empty($last)) {
                    return ["status"=>-1,"msg"=>'非法操作!'];
                }

                $last->next_id = $datas['id'];
                $last->save();

            } else {            
                $datas['last_id'] = 0;
            }

            //判断是否存在下一项
            if (!empty($datas['next_id'])) {
                $next = $this->rels->find($datas['next_id']);
                if (empty($next)) {
                    return ["status"=>-1,"msg"=>'非法操作!'];
                }

                $next->last_id = $datas['id'];
                $next->save();                

            } else {
                $datas['next_id'] = 0;
            }


            $rels = $this->rels->find($datas['id']);

            if (empty($rels)) {
                return ["status"=>-1,"msg"=>'非法操作!'];
            }

            $rels->task_name = $datas->input('task_name');
            $rels->task_id = $datas->input('task_id');
            $rels->work_name = $datas->input('work_name');
            $rels->work_id = $datas->input('work_id');
            $rels->remarks = $datas->input('remarks');
            $rels->next_id = $datas->input('next_id');
            $rels->last_id = $datas->input('last_id');
            $rels->save();

            return ["status"=>1,"msg"=>'事务流程加成功！'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }




    }



    //获取上一条和下一条数据
    public function getOneAll($id)
    {
        $last = $this->rels->where('next_id',$id);
        $rels = $this->getOne($id);
        $next = $this->rels->where('id',$rels->next_id);
        if (empty($last)) {
            $rels->lastName = $last->task_name;
            $rels->lastId = $last->id;
        }

        if (empty($next)) {
            $rels->nextName = $next->task_name;
            $rels->nextId = $next->id;
        }
        return $rels;

    }

    // 获取一条数据
    public function getOne($id)
    {
        return  $this->rels->find($id);
    }

    // 获取一条数据
    public function getOneWork($data)
    {
        return  $this->rels->where('work_id',$data['workId'])->where('last_id',$data['lastId'])->get();
    }
}