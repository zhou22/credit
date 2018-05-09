<?php

namespace App\Entity\Warehouse;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseRecord extends Model
{
    //使用软删除
    use SoftDeletes;
    // 取出和存入字段为时间戳
    // protected $dateFormat = 'U';
    
    protected $dates = [
        'deleted_at',
        'ask_date'
    ];
    //设置数据库
    protected $table = 'purchase_record';

    //自动维护创建和更新时间
    public $timestamps = true;

    public function freshTimestamp() {
        return time();
    }

    public function fromDateTime($value) {
        return $value;
    }


}
