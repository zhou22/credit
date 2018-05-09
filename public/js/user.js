/**
 * Created by ASUS on 2016/5/9.
 */

var user                    =   $('#user'),
    userAdd                 =   $('#user-add'),
    userAddAccounts         =   $('#user-add-accounts'),
    userAddPassword         =   $('#user-add-password'),
    userAddStaffName        =   $('#user-add-staff-name'),
    userEdit                =   $('#user-edit'),
    userEditId              =   $('#user-edit-id'),
    userEditAccounts        =   $('#user-edit-accounts'),
    userEditPassword        =   $('#user-edit-password'),
    userEditState           =   $('#user-edit-state'),
    userEditStateButton     =   $('#user-edit-state-button'),
    userEditStaffName       =   $('#user-edit-staff-name'),
    userSearchKeywords      =   $('#user-search-keywords'),
    userSearchDateType      =   $('#user-search-date-type'),
    userSearchDateFrom      =   $('#user-search-date-from'),
    userSearchDateTo        =   $('#user-search-date-to'),
    userSearchState         =   $('#user-search-state'),
    userTool                =   $('#user-tool'),
    randAdd                 =   $('.rand-add'),
    randEdit                =   $('.rand-edit'),
    userDate,
    userOpt;


//浏览器改变时触发
$(window).resize(function () {
    userAdd.dialog('center');
});


//表格数据列表
user.datagrid({
    url : '/users/getList',
    method : 'post',
    fit : true,
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'DESC',
    toolbar : '#user-tool',
    pagination : true,
    pageSize : 20,
    pageList : [10, 20, 30, 40, 50],
    pageNumber : 1,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')
    },
    columns : [[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'accounts',
            title : '登录帐号',
            width : 100
        },
        {
            field : 'name',
            title : '真实姓名',
            width : 100
        },
        {
            field : 'department',
            title : '部门',
            width : 100
        },
        {
            field : 'last_login_time',
            title : '登录时间',
            width : 100,
            sortable : true
        },
        {
            field : 'last_login_ip',
            title : '登录IP',
            width : 100
        },
        {
            field : 'login_count',
            title : '登录次数',
            width : 80,
            sortable : true
        },
        {
            field : 'created_at',
            title : '创建时间',
            width : 100,
            sortable : true
        },
        {
            field : 'status',
            title : '状态',
            width : 60,
            sortable : true,
            fixed : true,
            formatter : function (value, row)
            {
                var state = '';

                switch (value)
                {
                    case 1:

                        state = "<a href='javascript:void(0)' class='status-1' onclick='userOpt.updateStatus("+ JSON.stringify(row) +")' style='margin-left: 11px;height: 18px;' title='激活'></a>";

                        break;

                    default :

                        state = "<a href='javascript:void(0)' class='status-2' onclick='userOpt.updateStatus("+ JSON.stringify(row) +")' style='margin-left: 11px;height: 18px;' title='停用'></a>";

                }

                return state;
            }
        }
    ]],
    onLoadSuccess : function ()
    {
        $('.status-1').linkbutton({
            iconCls : 'icon-ok',
            plain : true
        });
        $('.status-2').linkbutton({
            iconCls : 'icon-lock',
            plain : true
        });
    }
});


//新增面板
userAdd.dialog({
    title : '新增帐号',
    width: 400,
    height: 300,
    iconCls : 'icon-add',
    closed: true,
    modal : true,
    maximizable : true,
    buttons:[
    {
        text : '保存',
        size : 'large',
        iconCls : 'icon-accept',
        handler : function ()
        {
            if (userAdd.form('validate'))
            {
                $.ajax({
                    url : '/users',
                    type : 'POST',
                    data : {
                        accounts : $.trim(userAddAccounts.val()),
                        password : userAddPassword.val(),
                        staff_id : userAddStaffName.combogrid('getValue'),
                        status : 1,
                        _token : $('meta[name="csrf-token"]').attr('content')
                    },
                    beforeSend : function ()
                    {
                        $.messager.progress({
                            text : '正在处理中...'
                        })
                    },
                    success : function (data)
                    {
                        $.messager.progress('close');
                        if (data.status > 0)
                        {
                            $.messager.show({
                                title : '操作提示',
                                msg : '添加成功'
                            });
                            userAdd.dialog('close');
                            user.datagrid('load');
                        } else if (data.status == -1) {
                            $.messager.alert('添加失败', data.msg, 'warning', function () {
                                userAddAccounts.textbox('textbox').select();
                            });
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
            userAdd.dialog('close');
        }
    }],
    onClose : function ()
    {
        userAdd.form('reset');
        userAdd.dialog('center');
    }
});

//修改面板
userEdit.dialog({
    title : '修改帐号',
    width: 400,
    height: 300,
    iconCls : 'icon-edit',
    closed: true,
    modal : true,
    maximizable : true,
    buttons:[
        {
            text : '保存',
            size : 'large',
            iconCls : 'icon-accept',
            handler : function ()
            {

                if (userEdit.form('validate'))
                {
                    $.ajax({
                        url : '/users/' + userEditId.val(),
                        type : 'PUT',
                        data : {
                            id : userEditId.val(),
                            password : userEditPassword.val(),
                            status : userEditState.val(),
                            staff_id : userEditStaffName.combogrid('getValue'),
                            staff_name : userEditStaffName.combogrid('getText'),
                             _token : $('meta[name="csrf-token"]').attr('content')
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            })
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            if (data.status > 0)
                            {
                                $.messager.show({
                                    title : '操作提示',
                                    msg : '修改成功'
                                });
                                userEdit.dialog('close');
                                user.datagrid('reload');
                            } else {
                                $.messager.alert('修改失败', '没有任何数据被修改！', 'warning', function () {
                                    userEditPassword.textbox('textbox').select();
                                });
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
                userEdit.dialog('close');
            }
        }],
    onClose : function ()
    {
        userEdit.form('reset');
        userEdit.dialog('center');
    }
});

//工具条操作
userOpt = {
    add : function ()
    {
        userAdd.dialog('open');
        //新增关联档案
        userAddStaffName.combogrid({
            width : 120,
            height : 32,
            url : '/staffs/getList',
            method : 'post',
            panelWidth : 450,
            panelHeight : 'auto',
            panelMaxHeight : 227,
            fitColumns : true,
            rownumbers : true,
            border : false,
            idField:'id',
            textField:'name',
            editable : false,
            sortName : 'created_at',
            sortOrder : 'DESC',
            pagination : true,
            pageSize : 10,
            pageList : [10, 20, 30, 40, 50],
            pageNumber : 1,
            queryParams: {
                 _token : $('meta[name="csrf-token"]').attr('content'),
                 userValue : 1
            },
            columns : [[
                {
                    field : 'id',
                    title : '自动编号',
                    width : 50,
                    hidden : true
                },
                {
                    field : 'name',
                    title : '姓名',
                    width : 80
                },
                {
                    field : 'number',
                    title : '工号',
                    width : 50,
                    sortable : true
                },
                {
                    field : 'gender',
                    title : '性别',
                    width : 50,
                    sortable : true
                },
                {
                    field : 'id_card',
                    title : '身份证',
                    width : 150
                },
                {
                    field : 'position',
                    title : '职位',
                    width : 50
                },
                {
                    field : 'created_at',
                    title : '创建时间',
                    width : 100,
                    hidden : true
                }
            ]],
            onOpen : function ()
            {
                userAddStaffName.combogrid('grid').datagrid('reload');
            },
            onShowPanel : function ()
            {
                userAddStaffName.combogrid('panel').panel('resize', {
                    width : '450px'
                })
            }
        });
    },
    edit : function ()
    {
        //修改关联档案
        userEditStaffName.combogrid({
            width : 120,
            height : 32,
            url : '/staffs/getList',
            method : 'post',
            panelWidth : 450,
            panelHeight : 'auto',
            panelMaxHeight : 227,
            fitColumns : true,
            rownumbers : true,
            border : false,
            idField:'id',
            textField:'name',
            editable : false,
            sortName : 'created_at',
            sortOrder : 'DESC',
            pagination : true,
            pageSize : 10,
            pageList : [10, 20, 30, 40, 50],
            pageNumber : 1,
            queryParams: {
                 _token : $('meta[name="csrf-token"]').attr('content'),
                 userValue : 1
            },
            columns : [[
                {
                    field : 'id',
                    title : '自动编号',
                    width : 50,
                    hidden : true
                },
                {
                    field : 'name',
                    title : '姓名',
                    width : 80
                },
                {
                    field : 'number',
                    title : '工号',
                    width : 50,
                    sortable : true
                },
                {
                    field : 'gender',
                    title : '性别',
                    width : 50,
                    sortable : true
                },
                {
                    field : 'id_card',
                    title : '身份证',
                    width : 150
                },
                {
                    field : 'position',
                    title : '职位',
                    width : 50
                },
                {
                    field : 'created_at',
                    title : '创建时间',
                    width : 100,
                    hidden : true
                }
            ]],
            onOpen : function ()
            {
                userEditStaffName.combogrid('grid').datagrid('reload');
            },
            onShowPanel : function ()
            {
                userEditStaffName.combogrid('panel').panel('resize', {
                    width : '450px'
                })
            }
        });
        var rows = user.datagrid('getSelections');

        if (rows.length == 1)
        {
            userEdit.dialog('open');
            userEdit.form('load', {
                id : rows[0].id,
                accounts : rows[0].accounts,
                password : 'krd1234'
            });
            userEditStaffName.combogrid('setValue',{id:rows[0].staff_id,name:rows[0].name});
            if (rows[0].status == 1)
            {
                userEditStateButton.switchbutton('check');
                userEditState.val(1);
            } else {
                userEditStateButton.switchbutton('uncheck');
                userEditState.val(2);
            }
        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }
    },
    remove : function ()
    {
        var rows = user.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗？', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                        ids.push(rows[i].id);
                    }

                    $.ajax({
                        url : '/users/' + ids,
                        type : 'DELETE',
                        data : {
                            ids : ids.join(','),
                             _token : $('meta[name="csrf-token"]').attr('content')
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            });
                            //user.datagrid('loading');
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            //user.datagrid('loaded');
                            if (data)
                            {
                                user.datagrid('reload');
                                $.messager.show({
                                    title : '操作提醒',
                                    msg : data + '条数据被成功删除！'
                                })
                            } else {
                                $.messager.alert('删除失败', '没有删除任何数据！', 'warning');
                            }
                        }
                    });
                }
            });
        } else {
            $.messager.alert('操作警告', '删除记录必须一条或以上的数据！', 'warning');
        }
    },
    updateStatus : function (data)
    {

        var DepStatus 

        if (data.status == 1) 
        {
            DepStatus = '停用' ;
        } else {
            DepStatus = '激活' ;
        }


        $.messager.confirm('确认操作', '您真的要 <strong>' +DepStatus+'->'+data.accounts + '</strong>账号吗？', function (flag) {
            if (flag) {
                $.ajax({
                    url : '/users/updateStatus/'+ data.id,
                    type : 'post',
                    data : {
                        _token : $('meta[name="csrf-token"]').attr('content')
                    },
                    beforeSend : function ()
                    {
                        $.messager.progress({
                            text : '正在处理中...'
                        })
 
                    },
                    success : function (data)
                    {
                        $.messager.progress('close');

                        if (data.status == 1)
                        {
                            user.datagrid('unselectAll');
                            user.datagrid('reload');
                            $.messager.show({
                                title : '操作提醒',
                                msg : '账号'+ data.msg,
                            })
                        } else {
                            $.messager.alert('操作', ata.msg, 'warning');
                        }
                    }
                });
            }            
        });

    },
    redo : function ()
    {
        user.datagrid('unselectAll');
    },
    reload : function ()
    {
        user.datagrid('reload');
    },
    search : function (data = 1 )
    {
        if (userTool.form('validate'))
        {
            user.datagrid('load', {
                keywords : userSearchKeywords.textbox('getValue'),
                dateType : userSearchDateType.combobox('getValue'),
                dateFrom : userSearchDateFrom.datebox('getValue'),
                dateTo : userSearchDateTo.datebox('getValue'),
                status : userSearchState.combobox('getValue'),
                searchValue : data,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
        }
    },
    reset : function ()
    {
        userSearchKeywords.textbox('clear');
        userSearchDateType.combobox('clear').combobox('disableValidation');
        userSearchDateFrom.datebox('clear');
        userSearchDateTo.datebox('clear');
        userSearchState.combobox('clear');
        this.search(0);
        user.datagrid('sort', {
            sortName : 'created_at',
            sortOrder : 'DESC'
        });
    }
};


/*查询字段区域*/
userSearchKeywords.textbox({
    width : 150,
    prompt : '帐号'
});

//时间类型旋转
userSearchDateType.combobox({
    width : 100,
    editable : false,
    prompt : '时间类型',
    data : [{
        id : 'created_at',
        text : '创建时间'
    }],
    valueField : 'id',
    textFiedl : 'text',
    required : true,
    novalidate : true,
    panelHeight : 'auto',
    tipPosition : 'left',
    missingMessage : '请选择时间类型'
});

//查询时间对象
userDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if (userSearchDateType.combobox('enableValidation').combobox('isValid') == false)
        {
            userSearchDateType.combobox('showPanel');
        }
    }
};

//起始时间
userDate.prompt = '起始时间';
userSearchDateFrom.datebox(userDate);

//结束时间
userDate.prompt = '结束时间';
userSearchDateTo.datebox(userDate);

//审核组件
userSearchState.combobox({
    width : 70,
    editable : false,
    prompt : '状态',
    data : [{
        id : '1',
        text : '激活'
    }, {
        id : '2',
        text : '停用'
    }],
    valueField : 'id',
    textFiedl : 'text',
    panelHeight : 'auto'
});


/*表单字段区域*/

//新增帐号
userAddAccounts.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入帐号名称',
    invalidMessage : '帐号名称2-20位之间'
});

//修改帐号
userEditAccounts.textbox({
    width : 220,
    height : 32,
    disabled : true
});

//新增密码
userAddPassword.textbox({
    width : 220,
    height : 32,
    validType : 'length[6,30]',
    required : true,
    missingMessage : '请填写密码!',
    invalidMessage : '帐号密码6-30位之间'
});

//修改密码
userEditPassword.textbox({
    width : 220,
    height : 32,
    validType : 'length[6,30]',
    missingMessage : '请修改帐号密码',
    invalidMessage : '帐号密码6-30位之间'
});

//新增随机密码
randAdd.click(function () {
    userAddPassword.textbox('setValue', getRandPassword(8, 16));
});

//修改随机密码
randEdit.click(function () {
    userEditPassword.textbox('setValue', getRandPassword(8, 16));
});

//创建一个随机密码生成器
var getRandPassword = function (min, max)
{
    var source = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789',
        length = Math.ceil(Math.random() * (max - min) + min),
        password = '';

    for (var i = 0; i < length; i ++)
    {
        password += source.charAt(Math.ceil(Math.random() * 1000 % source.length));
    }

    return password;
};

//修改状态滑动按钮
userEditStateButton.switchbutton({
    with : 65,
    onText : '激活',
    offText : '停用',
    onChange : function (checked)
    {
        if (checked)
        {
            userEditState.val(1);
        } else {
            userEditState.val(2);
        }
    }
});








