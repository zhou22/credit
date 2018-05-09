<?php

namespace App\Http\Service\Personnel;

use Validator;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Entity\Position;
use App\Tools\Tool;

class PositionService extends Controller
{
    
    public $rels = null;

    public function __construct()
    {
        $this->rels = new Position();        

    }


    public $messages = [
        'name.unique' => '职位已存在!',
        'name.between' => '职位名称2-20位之间!',
        'status.numeric' => '非法操作!',
    ];


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
             return $this->rels->get();
        }                

    }



//添加数据
    public function add($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'name' => [
                'between:2,20',
                 Rule::unique('krd_positions'),
              ],
            'status' => 'numeric'
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            $this->rels->name = $datas->input('name');
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
        $data = $this->rels->find($id);        
        return $data;

    }



//删除职位
    public function delete($id)
    {
        $id = is_array($id) ? $id : ( is_string($id) ?explode (',',$id) :func_get_args());

        return $this->rels->destroy($id);         
    }

    //修改数据
    public function update($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'name' => [
                'between:2,20',
                 Rule::unique('krd_positions')->ignore($datas->input('id')),
              ],
            'status' => 'numeric'
        ],$this->messages);


        //判断验证是否通过
        if (empty($errors->errors()->all())) {

            $rels = $this->rels->find($datas->input('id'));

            if($rels)
            {
                $rels->name = $datas->input('name');
                $rels->status = $datas->input('status');
                $rels->save();
                return ["status"=>1,"msg"=>$errors->errors()->first()];
            }

            return ["status"=>-1,"msg"=>'非法操作!'];

        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }

    /**
     *修改职位状态
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

}
