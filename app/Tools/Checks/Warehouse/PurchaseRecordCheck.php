<?php

namespace App\Tools\Checks\Warehouse;

use App\Tools\Checks\Check;
use Validator;
use Illuminate\Validation\Rule;

class PurchaseRecordCheck extends Check 
{


    public $messages = [
        'budget.filled' => '必须选择有无预算!',
        'type.filled' => '必须选择采购类型!'
    ];




    public function addCheck($datas,$check)
    {
        if ($datas->lst_data['total'] <= 1) {
            $check->status = -1;
            $check->msg = '没有添加任何需求！';
            return $check;
        }

        //验证
        $errors = Validator::make($datas->all(), [
            'budget' => 'filled',
            'type' => 'filled'
        ],$this->messages);


        if (empty($errors->errors()->all())) {
           $check->status = 1;
           $check->msg = '操作成功！';
        } else {
           $check->status = -1;
           $check->msg = $errors->errors()->first();
        }


        return $check;

    }






}