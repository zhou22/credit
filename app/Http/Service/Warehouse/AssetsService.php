<?php

namespace App\Http\Service\Warehouse;

use Validator;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Entity\Warehouse\Assets;
use App\Tools\Tool;
use Illuminate\Support\Facades\DB;

class AssetsService extends Controller
{
    
    public $rels = null;

    public $messages = [
        'name.between' => '品名不能为空且不能大于30位!',
        'type.required' => '必须选择物品类型!',
        'users.required' => '使用人/部门不能为空!',
        'secrecy.required' => '必须选择保密等级!',
        'price.numeric' => '单价必须为数字!',
        'factory.required' => '必须选择保密品牌!',
        'quantity.numeric' => '数量必须为数字!',
        'unit.between' => '计量单位不能为空,且不能大于30位!',
        'remarks.max' => '备注不能超出255字',
    ];

    public function __construct()
    {
        $this->rels = new Assets();        

    }

    //获取列表数据
    public function getList($relsArray) 
    {

        if ($relsArray['selectValue'] == 1) {
            $rows = $this->rels->where(function($query) use($relsArray) {
                                       if ($relsArray['searchValue'] == 1)
                                       {    
                                            $query->where('sn','like','%'.$relsArray['keywords'].'%')
                                                  ->orWhere('name','like','%'.$relsArray['keywords'].'%')
                                                  ->orWhere('users','like','%'.$relsArray['keywords'].'%');
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

    public function add($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'name' => 'between:1,30',
            'type' => 'required',
            'users' => 'required',
            'secrecy' => 'required',
            'price' => 'numeric',
            'factory' => 'required',
            'quantity' => 'numeric',   
            'unit' => 'between:1,30',   
            'remarks' => 'max:255',
        ],$this->messages);


        //判断验证是否通过
        if (empty($errors->errors()->all())) {
            $rels2 = DB::table('krd_assets_type')->select('id','assets_tab','number')->where('name',$datas->input('type'))->first();
            if (!$rels2) {
                return ["status"=>-1,"msg"=>'必须选择物品类型!'];
            }
            $number = $rels2->number + 1;
            $rels2->number = str_pad(++$rels2->number,4,'0',STR_PAD_LEFT);
            $this->rels->sn = 'KRD'.$rels2->assets_tab.$rels2->number;
            $this->rels->type = $datas->input('type');
            $this->rels->name = $datas->input('name');
            $this->rels->quantity = $datas->input('quantity');
            $this->rels->unit = $datas->input('unit');
            $this->rels->price = $datas->input('price');
            $this->rels->remarks = $datas->input('remarks');
            $this->rels->secrecy = $datas->input('secrecy');
            $this->rels->factory = $datas->input('factory');
            $this->rels->users = $datas->input('users');
            $this->rels->user_type = $datas->input('user_type');
            $this->rels->user_id = $datas->input('user_id');
            $this->rels->save();
            $id = $this->rels->id;

            if ($id) {
                DB::table('krd_assets_extend')->insert([
                    "krd_asset_id" => $id,
                    "info" => $datas->input('info')
                ]);
            }

            DB::table('krd_assets_type')
                    ->where('name',$datas->input('type'))
                    ->update(["number" =>$number]);
            return ["status"=>1,"msg"=>'帐添加成功！'];
        } else {
            return ["status"=>-1,"msg"=>$errors->errors()->first()];
        }

    }


//修改数据
    public function update($datas)
    {
        //验证
        $errors = Validator::make($datas->all(), [
            'name' => 'between:1,30',
            'users' => 'required',
            'secrecy' => 'required',
            'price' => 'numeric',
            'factory' => 'required',
            'quantity' => 'numeric',   
            'unit' => 'between:1,30',   
            'remarks' => 'max:255',
        ],$this->messages);

        //判断验证是否通过
        if (empty($errors->errors()->all())) 
        {
            $rels2 = $this->rels->find($datas->input('id'));
            if (!$rels2) {
                return ["status"=>-1,"msg"=>'非法操作!'];
            }
            $rels2->name = $datas->input('name');
            $rels2->quantity = $datas->input('quantity');
            $rels2->unit = $datas->input('unit');
            $rels2->price = $datas->input('price');
            $rels2->remarks = $datas->input('remarks');
            $rels2->secrecy = $datas->input('secrecy');
            $rels2->factory = $datas->input('factory');
            $rels2->users = $datas->input('users');
            $rels2->user_type = $datas->input('user_type');
            $rels2->user_id = $datas->input('user_id');
            $rels2->save();
            if (DB::table('krd_assets_extend')->where('krd_asset_id', $datas->input('id'))->first()) 
            {
                DB::table('krd_assets_extend')
                                            ->where('krd_asset_id',$datas->input('id'))
                                            ->update([
                                                    "info" => $datas->input('info')
                                            ]);
            } else {
                DB::table('krd_assets_extend') 
                                            ->insert([
                                                "krd_asset_id" => $datas->input('id'),
                                                "info" => $datas->input('info')
                                            ]);

            }

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


    //获取扩展表的数据
    public function getOneExtend($id)
    {
        return  Tool::formatData(DB::table('krd_assets_extend')->where('krd_asset_id', $id)->first());
    }



    //删除资产信息
    public function delete($id)
    {
        $id = is_array($id) ? $id : ( is_string($id) ?explode (',',$id) :func_get_args());
        return $this->rels->destroy($id);    
    }


}