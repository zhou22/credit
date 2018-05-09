<?php

namespace App\Http\Service\Personnel;

use Validator;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Service\Personnel\StaffService;
use App\Entity\User;
use App\Tools\Tool;

class UserService extends Controller
{
    
    public $rels = null;

    public $messages = [
        'accounts.unique' => '账号已存在!',
        'accounts.between' => '账号在2-20位之间!',
        'password.between' => '密码在6-30!',
        'status.numeric' => '非法操作!',
    ];


    public function __construct()
    {
        $this->rels = new User();        

    }


    /**
     * 获取账号列表
     */

    public function getList($relsArray) 
    {        

        $Staff = StaffService::getData();

        

        $rows = $this->rels
                    ->where(function($query) use($relsArray) {
                       if ($relsArray['searchValue'] == 1)
                       { 
                           $query->where('accounts','like','%'.$relsArray['keywords'].'%');  
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
                       if (!empty($relsArray['status']))
                       { 
                        if ($relsArray['status'] == 1) {
                            $query->where('status','=',1); 
                        } else {
                            $query->where('status','<>',1);                             
                        }

                            
                       }  
                    })
                   ->orderBy($relsArray->input('sort'),$relsArray->input('order'))
                   ->offset($relsArray->input('rows')*($relsArray->input('page') - 1))
                   ->limit($relsArray->input('rows'));                          

        $counts = $rows->count();
        $rows = $rows->get();


        foreach ($rows as $key => $value) {
            foreach ($Staff as $k => $v) {
               if ($v['user_id'] == $value['id'] ) {
                   $value['department'] = $v['department'];
                   $value['name'] = $v['name'];
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
            'accounts' => [
                'between:2,20',
                 Rule::unique('krd_users'),
              ],
            'status' => 'numeric',   
            'password' => 'between:6,30',
        ],$this->messages);


        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            $this->rels->accounts = $datas->input('accounts');
            $this->rels->status = $datas->input('status');
            $this->rels->staff_id = $datas->input('staff_id');
            $this->rels->password = bcrypt($datas->input('password'));
            $this->rels->save();
            $id = $this->rels->id;
            StaffService::updateStaffUserId($datas->input('staff_id'),$id);
            return ["status"=>1,"msg"=>'帐号申请成功，请等待审核！'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }



    //修改数据
    public function update($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'password' => 'between:6,30',
            'status' => 'numeric',            
        ],$this->messages);


        //判断验证是否通过
        if (empty($errors->errors()->all())) {

            $rels = $this->rels->find($datas->input('id'));

            if($rels)
            {
                $rels->password = bcrypt($datas->input('password'));
                $rels->status = $datas->input('status');
                $rels->staff_id = $datas->input('staff_id');
                $rels->save();
                StaffService::updateStaffUserId($datas->input('staff_id'),$datas->input('id'));
                return ["status"=>1,"msg"=>$errors->errors()->first()];
            }

            return ["status"=>-1,"msg"=>'非法操作!'];

        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }

    /**
     *修改账号状态
     *
     * 
     */
     public function updateStatus($id)
    {

         $rels = $this->rels->find($id);
        if ($rels->first()) 
        {
             if ($rels->status == 1) 
             {
                $rels->status = '2';
             }  else {
                $rels->status = '1';
                
             }
             $rels->save();
              return ["status"=>1,"msg"=>'修改成功!'];
        }

         return ["status"=>-1,"msg"=>'非法操作!'];
    }


    //删除账号
    public function delete($id)
    {
        $id = is_array($id) ? $id : ( is_string($id) ?explode (',',$id) :func_get_args());

        return $this->rels->destroy($id);         
    }

}
