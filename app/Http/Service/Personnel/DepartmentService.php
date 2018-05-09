<?php

namespace App\Http\Service\Personnel;

use Validator;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Entity\Department;
use App\Tools\Tool;

class DepartmentService extends Controller
{
    
    public $rels = null;

    public $messages = [
            'name.unique' => '部门已存在!',
            'name.between' => '部门名称2-20位之间!',
            'pid.numeric' => '非法操作!',
            'status.numeric' => '非法操作!',
        ];

    public function __construct()
    {
        $this->rels = new Department();        

    }

//获取数据
    public function getList($relsArray) 
    {        

        if ($relsArray['selectValue'] == 1) {
            $rows = $this->rels->where(function($query) use($relsArray) {
                                   if ($relsArray['searchValue'] == 1)
                                   { 
                                       $query->where('name','like','%'.$relsArray['keywords'].'%');  
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
                               ->orderBy($relsArray->input('sort'),$relsArray->input('order'))
                               ->offset($relsArray->input('rows')*($relsArray->input('page') - 1))
                               ->limit($relsArray->input('rows'));

            $counts = $rows->count();

            $rows = $rows->get();


           if ($relsArray['searchValue'] != 1)
           { 
              $rows = Tool::getTree($rows); 
           }        

            return array(
                'total'=>$counts,
                'rows'=>$rows
            );                   
        } else {

            return Tool::getTree($this->rels->get());
        }
    }

//获取数据为tree
    public function getTree()
    {    
        $rels = $this->rels->all('id','name as text','pid');

        return Tool::getTree($rels);
    }

//获取部门和人员tree
    public function getTreeTwo()
    {
        $rels = Tool::getTreeTwo($this->rels->all('id','name as text','pid'),DB::table('krd_staffs')->select('id','name as text','department')->get());
        return Tool::getTree($rels);
    }


//获取所有数据
   public static function getData()
    {    

        return Department::all('id','name');

    }


//添加数据
    public function add($datas)
    {


        //验证
        $errors = Validator::make($datas->all(), [
            'name' => [
                'between:2,20',
                 Rule::unique('krd_departments')->where('pid',$datas->input('pid')),
              ],
            'pid' => 'numeric'
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            $this->rels->name = $datas->input('name');
            $this->rels->pid = $datas->input('pid');
            $this->rels->status = $datas->input('status');
            $this->rels->save();
            return ["status"=>1,"msg"=>$errors->errors()->first()];

        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }


//获取一条数据
    public function getOne($id)
    {
        $data = array();

        $data = $this->rels->find($id)->toArray();
        if ($data['pid'] <> 0) {
            $data['parent'] = $this->rels->find($data['pid'])->toArray();
        } else {

             $data['parent'] = 0;
        }
        
        return $data;

    }

//得到上一级数据
    static public function getOneParent($id)
    {
       $data = DB::table('krd_departments')->where('id',$id)->first();
        
        if ($data) {
            return $data->pid;
        } else{
            return 0;

        }

    }

//修改数据
    public function update($datas)
    {
        $rels = $this->rels->where('id',$datas->input('pid'))
                           ->where('name',$datas->input('pname'))
                           ->get();

        if ($rels->first())
        {
            //验证
            $errors = Validator::make($datas->all(), [
                'name' => [
                    'between:2,20',
                     Rule::unique('krd_departments')->where('pid',$datas->input('pid'))->ignore($datas->input('id')),
                  ],
                'status' => 'numeric',
                'pid' => 'numeric'
            ],$this->messages);

            //判断验证是否通过
            if (empty($errors->errors()->all())) 
            {

                $rels = $this->rels->find($datas->input('id'));

                if ($rels) 
                {
                    $rels->name = $datas->input('name');
                    $rels->pid = $datas->input('pid');
                    $rels->status = $datas->input('status');
                    $rels->save();
                    return ["status"=>1,"msg"=>$errors->errors()->first()];
                }

                return ["status"=>-1,"msg"=>'非法操作!'];

            } else {
                return ["status"=>-1,"msg"=>$errors->errors()->first()];
            }
           
        }

        return ["status"=>-1,"msg"=>'非法操作!'];

    }

//删除部门
    public function delete($id)
    {
        $id = is_array($id) ? $id : ( is_string($id) ?explode (',',$id) :func_get_args());


        $rels = $this->rels->whereIn('pid', $id)->get();

        if ($rels->first())
        {
            return ;
        } 

        return $this->rels->destroy($id);         
    }



//修改部门状态
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





}
