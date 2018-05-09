<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    //使用软删除
    use SoftDeletes;
    // 取出和存入字段为时间戳
    // protected $dateFormat = 'U';
    
    protected $dates = [
        'dimission_date',
        'entry_date',
        'deleted_at'
    ];
    //设置数据库
    protected $table = 'krd_staffs';

    //自动维护创建和更新时间
    public $timestamps = true;

    public function freshTimestamp() {
        return time();
    }

    public function fromDateTime($value) {
        return $value;
    }


}
