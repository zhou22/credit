/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    worktaskjudgeAddworkName                   =   $('#worktaskjudge-add-workName'),
    worktaskjudgeAddtaskName                   =   $('#worktaskjudge-add-taskWork'),
    worktaskjudgeAddworkNameOther              =   $('#worktaskjudge-add-other'),
    worktaskjudgeAddexecute                    =   $('#worktaskjudge-add-execute'),
    worktaskjudgeAddRemark                     =   $('#worktaskjudge-add-remark')


/*表单字段区域*/
function worktaskjudgeAdding()
{
    if (worktaskjudgeAdd.form('validate'))
    {
        $.ajax({
            url : '/worktaskjudge',
            type : 'POST',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),

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
                    worktaskjudgeAdd.dialog('close');
                    worktaskjudge.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning');
                }
            }
        });
    }
}

//事务名
worktaskjudgeAddworkName .combobox({
    width : 180,
    height : 32,
    url : '/work/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')

    },
    required : true,
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onHidePanel : function() 
    {  
        getCombobox(worktaskjudgeAddworkName);//验证用户是否选择下拉
    }
});

//流程列表
worktaskjudgeAddtaskName.combobox({
    width : 180,
    height : 32,
    url : '/task/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')

    },
    required : true,
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onHidePanel : function()
    { 
        getCombobox(worktaskjudgeAddtaskName);//验证用户是否选择下拉
    }
});



//子事务名
worktaskjudgeAddworkNameOther.combobox({
    width : 180,
    height : 32,
    url : '/work/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')

    },
    required : true,
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onHidePanel : function() 
    {  
        getCombobox(worktaskjudgeAddworkNameOther);//验证用户是否选择下拉 
    }
});


//子程序执行类型
worktaskjudgeAddexecute.combobox({
    width : 180,
    height : 32,
    data : [{
        id : '0',
        text : '顺序进行'
    },{
        id : '1',
        text : '并行进行'
    }],
    editable : false,
    required : true,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});



$('#worktaskjudge-add table:first').show();