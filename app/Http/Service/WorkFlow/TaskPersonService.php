<?php

namespace App\Http\Service\WorkFlow;

use App\Http\Controllers\Controller;
use App\Entity\Workflow\TaskPerson;
use App\Tools\Tool;
use Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;



class TaskPersonService extends Controller
{
    
    public $rels = null;

    public $messages = [
        'remarks.max' => '备注不能超过255位!',
        'task_work_id.unique' => '不能重复添加'
    ];

    public function __construct()
    {
        $this->rels = new TaskPerson();     

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

    public function getListFormat($relsArray)
    {

        $rows = $this->getList($relsArray);

        $counts = $rows['total'];

        $rows = $rows['rows'];

        

        $row2 = Tool::formatData(DB::table('task_work')->select('work_name','task_name','id')->get());

        $row3 = Tool::formatData(DB::table('krd_staffs')->select('id','name')->get());

        $row4 = Tool::formatData(DB::table('krd_departments')->select('id','name')->get());

        $row5 = Tool::formatData(DB::table('krd_positions')->select('id','name')->get());

        foreach ($rows as $key => $value) {
            foreach ($row2 as $k => $v) {
                if ($value['task_work_id'] == $v['id'] ) {
                    $value['work_name'] = $v['work_name'];
                    $value['task_name'] = $v['task_name'];
                    break;
                }
            }

            if ($value['person_type'] == '部门') {                
                foreach ($row4 as $k => $v) {
                    if ($value['person_id'] == $v['id'] ) {
                        $value['person_name'] = $v['name'].'('.$value['person_type'].')';
                        break;
                    }
                }
            }else{
                foreach ($row3 as $k => $v) {
                    if ($value['person_id'] == $v['id'] ) {
                        $value['person_name'] = $v['name'].'('.$value['person_type'].')';
                        break;
                    }
                }
            }

            foreach ($row5 as $k => $v) {
                if ($value['position_id'] == $v['id'] ) {
                    $value['position_name'] = $v['name'];
                    break;
                }
            }




        }


        return array(
            'total'=>$counts,
            'rows'=>$rows
        ); 


    }


    //添加数据
   public function add($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'remarks' => 'max:255',
            'task_work_id' => [
                  Rule::unique('task_person')->where(function ($query) use ($datas) {
                                            $query->where('person_id', $datas['person_id'])
                                                  ->where('person_type', $datas['person_type'])
                                                  ->where('position_id', $datas['position_id']);
                                        })                                         
            ]
        ],$this->messages);



        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            $this->rels->task_work_id  = $datas->input('task_work_id');
            $this->rels->person_id  = $datas->input('person_id');
            $this->rels->person_type  = $datas->input('person_type');
            $this->rels->position_id  = $datas->input('position_id');
            $this->rels->execute  = $datas->input('execute');
            $this->rels->remarks  = $datas->input('remarks');
            $this->rels->save();
            return ["status"=>1,"msg"=>'流程默认执行人添加成功！'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }


    //修改数据
   public function update($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'remarks' => 'max:255',
            'task_work_id' => [
                  Rule::unique('task_person')->where(function ($query) use ($datas) {
                                            $query->where('person_id', $datas['person_id'])
                                                  ->where('person_type', $datas['person_type'])
                                                  ->where('position_id', $datas['position_id']);
                                        })->ignore($datas['id'])                                 
            ]
        ],$this->messages);



        //判断验证是否通过
        if (empty($errors->errors()->all())) {

            $rels = $this->rels->find($datas['id']);
            if (!$rels) {
                return ["status"=>-1,"msg"=>'非法操作!'];
            }

            $rels->task_work_id  = $datas->input('task_work_id');
            $rels->person_id  = $datas->input('person_id');
            $rels->person_type  = $datas->input('person_type');
            $rels->position_id  = $datas->input('position_id');
            $rels->execute  = $datas->input('execute');
            $rels->remarks  = $datas->input('remarks');
            $rels->save();
            return ["status"=>1,"msg"=>'流程默认执行人修改成功！'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }



    //获取一条数据
    public function getOne($id)
    {
        return  $this->rels->find($id);
    }


    public function getRels($taskWorkdId){


         return  $this->rels->where('task_work_id',$taskWorkdId)->get();


    }



}


