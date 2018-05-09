<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    //使用软删除
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    //设置数据库
    protected $table = 'krd_departments';
    //自动维护创建和更新时间
    public $timestamps = true;
    //取出字段为时间戳
    // protected $dateFormat = 'U';

    public function freshTimestamp() {
        return time();
    }

    public function fromDateTime($value) {
        return $value;
    }

}
