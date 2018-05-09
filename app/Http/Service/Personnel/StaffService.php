<?php

namespace App\Http\Service\Personnel;

use Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Entity\Staff;
use App\Tools\Tool;

class StaffService extends Controller
{
    
    public $rels = null;

    public $messages = [
        'name.between' => '姓名在2-20位之间!',
        'number.between' => '工号必须为4位!',
        'number.unique' => '工号已经被占用!',
        'id_card.regex' => '身份证不合法!',
        'id_card.unique' => '身份证号已被占用!',
    ];



    public function __construct()
    {
        $this->rels = new Staff();        

    }


//获取数据
    public function getList($relsArray)
    {        

        $rows = $this->rels
                           ->where(function($query) use($relsArray) {
                               if ($relsArray['searchValue'] == 1)
                               {    if (is_numeric($relsArray['keywords'])) {                                      
                                        $query->where('number','like','%'.$relsArray['keywords'].'%')
                                              ->orwhere('tel','like','%'.$relsArray['keywords'].'%');
                                    } else {
                                        $query->where('name','like','%'.$relsArray['keywords'].'%');
                                    }
                               }  
                            })
                           ->where(function($query) use($relsArray) {
                               if (!empty($relsArray['entry_status']))
                               { 
                                   $query->where('entry_status','=',$relsArray['entry_status']);  
                               }  
                            })
                           ->where(function($query) use($relsArray) {
                               if (!empty($relsArray['position']))
                               { 
                                   $query->where('position','=',$relsArray['position']);  
                               }  
                            })
                           ->where(function($query) use($relsArray) {
                               if (!empty($relsArray['gender']))
                               { 
                                   $query->where('gender','=',$relsArray['gender']);  
                               }  
                            })
                            ->where(function($query) use($relsArray) {
                               if (!empty($relsArray['marital_status']))
                               { 
                                   $query->where('marital_status','=',$relsArray['marital_status']);  
                               }  
                            })
                            ->where(function($query) use($relsArray) {
                               if (!empty($relsArray['education']))
                               { 
                                   $query->where('education','=',$relsArray['education']);  
                               }  
                            })
                            ->where(function($query) use($relsArray) {
                               if (!empty($relsArray['type']))
                               { 
                                   $query->where('type','=',$relsArray['type']);  
                               }  
                            })
                           ->where(function($query) use($relsArray) {
                               if (!empty($relsArray['dateFrom']))
                               { 
                                   $query->where($relsArray['dateType'],'>=',strtotime($relsArray['dateFrom']));  
                               }  
                            })
                           ->where(function($query) use($relsArray) {
                               if (!empty($relsArray['dateTo']))
                               { 
                                   $query->where($relsArray['dateType'],'<=',strtotime($relsArray['dateTo']));  
                               }  
                            })
                           ->where(function($query) use($relsArray) {
                               if (!empty($relsArray['userValue']))
                               { 
                                   $query->whereNull ('user_id')->orWhere('user_id','=','');  
                               }  
                            })

                           ->orderBy($relsArray->input('sort'),$relsArray->input('order'))
                           ->offset($relsArray->input('rows')*($relsArray->input('page') - 1))
                           ->limit($relsArray->input('rows'));
        $counts = $rows->count();
        $rows = $rows->get();


        foreach ($rows as $key => $value) {
            $value['deposition'] = $value['department'].'->'.$value['position'];
        }


        return array(
            'total'=>$counts,
            'rows'=>$rows
        );                   

    }


//获取所有数据
   public static function getData()
    {    

        return Staff::all('id','name','department_id','department','position','position_id','user_id');

    }

//修改user_id
   public static function updateStaffUserId($id,$userId)
    {    
        if (!empty($id)) {
          Staff::where('user_id', $userId)
             ->update(['user_id' => null]);
    
          Staff::where('id', $id)
             ->update(['user_id' => $userId]);
        }


    }

//添加数据
    public function add($datas) 
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'name' => 'between:2,20',
            'number' => [
                'between:3,5',
                 Rule::unique('krd_staffs'),
            ],
            'id_card' => [
                'regex :/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/',
                 Rule::unique('krd_staffs'),
            ]
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            
            $this->rels->name = $datas->input('name');
            $this->rels->number = $datas->input('number');
            $this->rels->id_card = $datas->input('id_card');
            $this->rels->gender = $datas->input('gender');
            $this->rels->department = $datas->input('department');
            $this->rels->department_id = $datas->input('department_id');
            $this->rels->position = $datas->input('position');  
            $this->rels->position_id = $datas->input('position_id');           
            $this->rels->group_id = $datas->input('group_id');
            $this->rels->tel = $datas->input('tel');
            $this->rels->type = $datas->input('type');
            $this->rels->nation = $datas->input('nation');
            $this->rels->marital_status = $datas->input('marital_status');
            $this->rels->entry_status = $datas->input('entry_status');
            $this->rels->entry_date = $datas->input('entry_date') == '' ? null : strtotime($datas->input('entry_date'));
            $this->rels->politics_status = $datas->input('politics_status');            
            $this->rels->education = $datas->input('education');
            $this->rels->save();

            $id = $this->rels->id;
            if ($id) {
                DB::table('krd_staff_extend')->insert([
                    "staff_id" => $id,
                    "specialty" => $datas->input('specialty'),
                    "intro" => $datas->input('intro'),
                    "health" => $datas->input('health'),
                    "registered" => $datas->input('registered'),
                    "registered_address" => $datas->input('registered_address'),
                    "graduate_date" => $datas->input('graduate_date') == '' ? null : strtotime($datas->input('graduate_date')),
                    "graduate_colleges" => $datas->input('graduate_colleges'),
                    "details" => $datas->input('details')
                ]);
            }

            return ["status"=>1,"msg"=>''];

        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }


    }



//修改数据
    public function update($datas) 
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'name' => 'between:2,20',
            'number' => [
                'between:3,5',
                 Rule::unique('krd_staffs')->ignore($datas->input('id')),
            ],
            'id_card' => [
                'regex :/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/',
                 Rule::unique('krd_staffs')->ignore($datas->input('id')),
            ]
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            $staff_update = $this->rels->find($datas->input('id'));
            if (!$staff_update) {
                return ["status"=>-1,"msg"=>'非法操作!'];
            }

            $staff_update->name = $datas->input('name');
            $staff_update->number = $datas->input('number');
            $staff_update->id_card = $datas->input('id_card');
            $staff_update->gender = $datas->input('gender');
            $staff_update->department = $datas->input('department');
            $staff_update->department_id = $datas->input('department_id');
            $staff_update->position = $datas->input('position');            
            $staff_update->position_id = $datas->input('position_id');            
            $staff_update->group_id = $datas->input('group_id');
            $staff_update->tel = $datas->input('tel');
            $staff_update->type = $datas->input('type');
            $staff_update->nation = $datas->input('nation');
            $staff_update->marital_status = $datas->input('marital_status');
            $staff_update->entry_status = $datas->input('entry_status');
            $staff_update->entry_date = $datas->input('entry_date') == '' ? null : strtotime($datas->input('entry_date'));
            $staff_update->politics_status = $datas->input('politics_status');            
            $staff_update->education = $datas->input('education');
            $staff_update->save();

            if (DB::table('krd_staff_extend')->where('staff_id', $datas->input('id'))->first()) {
                DB::table('krd_staff_extend')  
                    ->where('staff_id', $datas->input('id'))
                    ->update([
                        "specialty" => $datas->input('specialty'),
                        "intro" => $datas->input('intro'),
                        "health" => $datas->input('health'),
                        "registered" => $datas->input('registered'),
                        "registered_address" => $datas->input('registered_address'),
                        "graduate_date" => $datas->input('graduate_date') == '' ? null : strtotime($datas->input('graduate_date')),
                        "graduate_colleges" => $datas->input('graduate_colleges'),
                        "details" => $datas->input('details')
                    ]);
            } else {
                DB::table('krd_staff_extend')->insert([
                    "staff_id" => $datas->input('id'),
                    "specialty" => $datas->input('specialty'),
                    "intro" => $datas->input('intro'),
                    "health" => $datas->input('health'),
                    "registered" => $datas->input('registered'),
                    "registered_address" => $datas->input('registered_address'),
                    "graduate_date" => $datas->input('graduate_date') == '' ? null : strtotime($datas->input('graduate_date')),
                    "graduate_colleges" => $datas->input('graduate_colleges'),
                    "details" => $datas->input('details')
                ]);
            }

            return ["status"=>1,"msg"=>''];

        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }


    }

//获取一条数据
    public function getOne($id)
    {
       $rows = $this->rels->where('id',$id)->get();
       $rows2 =  DB::table('krd_staff_extend')->select('staff_id','health','specialty','registered','registered_address','graduate_date','graduate_colleges','details','intro')->where('staff_id', $id)->get();

       if ($rows2->first()) {
           $rows2 = Tool::formatData($rows2);//格式化数据
           $rows = Tool::formatData($rows);//格式化数据           
           $rows = array_merge($rows[0],$rows2[0]);
       } else {
           $rows = array_merge($rows,['staff_id'=>'','health'=>'','specialty'=>'','registered'=>'','registered_address'=>'','graduate_date'=>'','graduate_colleges'=>'','details'=>'','intro'=>'']);
       }

       return $rows;
    }



    //删除账号信息
    public function delete($id)
    {
        $id = is_array($id) ? $id : ( is_string($id) ?explode (',',$id) :func_get_args());
        DB::table('krd_staff_extend')->whereIn('staff_id', $id)->update(['deleted_at'=>time()]);
        return $this->rels->destroy($id);    
    }

   
}
