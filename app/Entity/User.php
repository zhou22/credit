<?php

namespace App\Entity;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use Notifiable;
    //使用软删除
    use SoftDeletes;
    // 取出和存入字段为时间戳
    // protected $dateFormat = 'U';
    
    protected $dates = [
        'last_login_time',
        'deleted_at'
    ];
    //设置数据库
    protected $table = 'krd_users';
    //设置隐藏字段
    protected $hidden = [
        'password', 'remember_token',
    ];

    //自动维护创建和更新时间
    public $timestamps = true;

    public function freshTimestamp() {
        return time();
    }

    public function fromDateTime($value) {
        return $value;
    }


    public function department()
    {
        return $this->belongsTo('App\Entity\Department','department_id');
    }

}



