/**
 * Created by ASUS on 2016/5/25.
 */

//变量初始化
var rand                =       Math.floor(Math.random() * 5 ) + 1,
    body                =       $('body'),
    login               =       $('#login'),
    loginAccounts       =       $('#login-accounts'),
    loginPassword       =       $('#login-password'),
    register            =       $('#register'),
    btnRegister         =       $('.btn-register'),
    registerAccounts    =       $('#register-accounts'),
    registerPassword    =       $('#register-password'),
    registerNotPassword =       $('#register-notpassword');



//非火狐浏览器屏蔽tab-loading
if (navigator.userAgent.indexOf('Firefox') < 0)
{
    $('.tabs-loading').remove();
}

//判断针对火狐浏览器，并判断easyui 渲染完毕后再隐藏遮罩
if (navigator.userAgent.indexOf('Firefox') > 0)
{
    $.parser.onComplete = function ()
    {
        $('.tabs-loading').hide();
    }
}


//随机背景
body.css('background', 'url(/img/bg' + rand + '.jpg) no-repeat center center fixed')
   .css('background-size', 'cover');

//浏览器改变大小时触发
$(window).resize(function () {
    login.dialog('center');
});

//登录面板
login.dialog({
    title : '登录后台',
    width: 370,
    height: 260,
    iconCls : 'icon-lock',
    closed: false,
    modal : false,
    maximizable : false,
    closable : false,
    draggable : false,
    buttons:[
    {
        text : '登录',
        id : 'login-btn',
        size : 'large',
        iconCls : 'icon-go',
        handler : function ()
        {
            //if (login.form('validate'))
            if (true)
            {
                $.ajax({
                    url :'/login',
                    type : 'POST',
                    data : {
                        _token : $('meta[name="csrf-token"]').attr('content'),
                        accounts : $.trim(loginAccounts.val()),
                        password : loginPassword.val()
                    },
                    beforeSend : function ()
                    {
                        $.messager.progress({
                            text : '正在尝试登录...'
                        })
                    },
                    success : function (data)
                    {
                        $.messager.progress('close');
                        if (data.status > 0)
                        {
                            parent.location.reload();
                        } else {
                            $.messager.alert('登录失败', data.msg, 'warning', function () {
                                loginPassword.textbox('textbox').select();
                            });
                        }
                    }
                });
            }
        }
    }],
    onOpen : function ()
    {
        $(function ()
        {
            $('#login-btn').parent().css('text-align', 'center');
        });

    }
});

//快速注册面板
register.dialog({
    title : '申请帐号',
    width : 400,
    height : 260,
    modal : true,
    closed : true,
    maximizable : true,
    iconCls : 'icon-add',
    buttons : [{
        text : '保存',
        size : 'large',
        iconCls : 'icon-accept',
        handler : function () {
            if (register.form('validate')) {
                $.ajax({
                    url : '/register',
                    type : 'POST',
                    data : {
                        _token : $('meta[name="csrf-token"]').attr('content'),
                        accounts : $.trim(registerAccounts.val()),
                        password : registerPassword.val(),
                        notpassword : registerNotPassword.val(),
                        status : 2
                    },
                    beforeSend : function ()
                    {
                        $.messager.progress({
                            text : '正在尝试保存...'
                        });
                    },
                    success : function(data)
                    {
                        $.messager.progress('close');
                        if (data.status == 1)
                        {
                            $.messager.show({
                                title : '操作提醒',
                                msg : '添加帐号成功！'
                            });
                            register.dialog('close');
                            $.messager.alert('提醒！',data.msg, 'info');
                        } else {
                            registerAccounts.textbox('textbox').select();
                            $.messager.alert('操作', data.msg, 'warning');
                        }
                    }
                });
            }
        }
    },{
        text : '取消',
        size : 'large',
        iconCls : 'icon-cross',
        handler : function ()
        {
            register.dialog('close');
        }
    }],
    onClose : function ()
    {
        register.form('reset');
    }
});

//注册按钮事件
btnRegister.click(function () {
    register.dialog('open');
    register.dialog('resize');
});

/*表单字段区域*/

//登录帐号
loginAccounts.textbox({
    width : 220,
    height : 32,
    iconCls : 'icon-man',
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入登录帐号',
    invalidMessage : '登录帐号2-20位之间'
});

//登录密码
loginPassword.textbox({
    width : 220,
    height : 32,
    iconCls : 'icon-lock2',
    validType : 'length[6,30]',
    required : true,
    missingMessage : '请输入登录密码',
    invalidMessage : '登录密码6-30位之间'
});

registerAccounts.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入帐号名称',
    invalidMessage : '帐号名称2-20位'
});

registerPassword.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'length[6,30]',
    missingMessage : '请输入帐号密码',
    invalidMessage : '帐号密码6-30位'
});

registerNotPassword.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'equals["#register-password"]',
    missingMessage : '请输入确认密码',
    invalidMessage : '确认密码和密码不一致'
});

//检查一个字段是否和另一个字段相同
$.extend($.fn.validatebox.defaults.rules, {
    equals: {
        validator: function(value,param){
            return value == $(param[0]).val();
        },
        message: '密码和密码确认必须一致'
    }
});