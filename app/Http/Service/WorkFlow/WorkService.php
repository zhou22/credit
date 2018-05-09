<?php

namespace App\Http\Service\WorkFlow;

use App\Http\Controllers\Controller;
use App\Entity\Workflow\Work;
use Validator;
use App\Tools\Tool;


class WorkService extends Controller
{
    
    public $rels = null;

    public $messages = [
        'name.between' => '事务名不能为空且不能大于30位!',
    ];


    public function __construct()
    {
        $this->rels = new Work();     

    }

    //获取列表数据
    public function getList($relsArray) 
    {

        if ($relsArray['selectValue'] == 1) {

            $rows = $this->rels->where(function($query) use($relsArray) {
                                   if ($relsArray['searchValue'] == 1)
                                   {    
                                        $query->where('name','like','%'.$relsArray['keywords'].'%');
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
 
    //添加一天数据
   public function add($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'name' => 'between:1,30'
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            $this->rels->name = $datas->input('name');
            $this->rels->save();
            return ["status"=>1,"msg"=>'事务加成功！'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }


    //修改数据
    public function update($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'name' => 'between:1,30'
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) 
        {
            $rels2 = $this->rels->find($datas->input('id'));
            if (!$rels2) {
                return ["status"=>-1,"msg"=>'非法操作!'];
            }
            $rels2->name = $datas->input('name');
            $rels2->save();
            return ["status"=>1,"msg"=>'修改成功!'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }




    // 获取一条数据
    public function getOne($id)
    {
        return  $this->rels->find($id);
    }


}