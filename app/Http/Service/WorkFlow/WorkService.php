<?php

namespace App\Http\Service\WorkFlow;

use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;
use App\Entity\Workflow\Work;
use Validator;
use App\Tools\Tool;


class WorkService extends Controller
{
    
    public $rels = null;

    public $messages = [
        'name.between'=> '事务不能为空且不能大于30位!',
        'name.unique' => '事务已存在!',
        'pid.numeric' => '非法操作!'
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
                                ->where(function($query) use($relsArray) {
                                    if (!empty($relsArray['category'])) {
                                        $query->where('category',$relsArray['category']);                                        
                                    }
                                })                 
                                ->where(function($query) use($relsArray) {
                                    if (!empty($relsArray['order']))
                                    {
                                       $query->orderBy($relsArray->input('sort'),$relsArray->input('order'));
                                    }
                               })
                               ->where(function($query) use($relsArray) {
                                    if (!empty($relsArray['rows'])) 
                                    {
                                       $query->offset($relsArray->input('rows')*($relsArray->input('page') - 1));
                                    }
                               })
                               ->where(function($query) use($relsArray) {
                                    if (!empty($relsArray['rows'])) 
                                    {
                                       $query->limit($relsArray->input('rows'));
                                    }
                               });


           if ($relsArray['requestType'] == 'combotree')
           {    
                $rows = $rows->addSelect('id','name as text','pid');
           }  

            $counts = $rows->count();

            $rows = $rows->get();

            

           if ($relsArray['searchValue'] != 1)
           { 
               $rows = Tool::getTree($rows);
           }    

           if ($relsArray['requestType'] != 'combotree') {
                $rels = [
                    'total'=>$counts,
                    'rows'=>$rows
                    ];
           } else {
                $rels = $rows ;
           }

            return $rels; 
                             
        } else {

            return $this->rels->get();
        }
    }
 
    //添加一天数据
   public function add($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'name' => [
                'between:1,30',
                 Rule::unique('work')->where('pid',$datas->input('pid')),
              ],
            'pid' => 'numeric'
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            $this->rels->name = $datas->input('name');
            $this->rels->pid = $datas->input('pid');
            $this->rels->category = $datas->input('category');
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
            'name' => [
                'between:1,30',
                 Rule::unique('work')->where('pid',$datas->input('pid')),
              ],
            'pid' => 'numeric'
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) 
        {
            $rels2 = $this->rels->find($datas->input('id'));
            if (!$rels2) {
                return ["status"=>-1,"msg"=>'非法操作!'];
            }
            $rels2->name = $datas->input('name');
            $rels2->pid = $datas->input('pid');
            $rels2->category = $datas->input('category');
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

    // 获取所有数据
    public function getAll()
    {
        return  $this->rels->all();
    }
    

}