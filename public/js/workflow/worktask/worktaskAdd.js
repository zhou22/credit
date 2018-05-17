/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    worktaskAddtaskName                   =   $('#worktask-add-taskName'),
    worktaskAddworkName                   =   $('#worktask-add-workName'),
    worktaskAddchildWork                  =   $('#worktask-add-childWork'),
    worktaskAddRemark                     =   $('#worktask-add-remark'),
    worktaskAddtaskChildAfter             =   $('#worktask-add-taskChildAfter')


/*表单字段区域*/
function worktaskAdding()
{
    if (worktaskAdd.form('validate'))
    {
        $.ajax({
            url : '/worktask',
            type : 'POST',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                task_id : $.trim(worktaskAddtaskName.combobox('getValue')),
                work_id : $.trim(worktaskAddworkName.combotree('getValue')),
                child_work_id : $.trim(worktaskAddchildWork.combotree('getValue')),
                child_after : $.trim(worktaskAddtaskChildAfter.combobox('getValue')),                
                remarks : $.trim(worktaskAddRemark.val())
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
                    worktaskAdd.dialog('close');
                    worktask.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning');
                }
            }
        });
    }
}


//事务名
worktaskAddworkName.combotree({
    width : 180,
    height : 32,
    url :'',//'/work/getList'
    method:'post',
    required : true,
    editable : true,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         category :"事务",
         selectValue : 1,
         requestType : 'combotree'
    },
    onShowPanel : function()
    {
        url = worktaskAddworkName.combotree('options').url;
        if (url == '') {
            worktaskAddworkName.combotree('options').url = '/work/getList';
            worktaskAddworkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(worktaskAddworkName);//验证用户是否选择下拉
    }
});



//子事务名
worktaskAddchildWork.combotree({
    width : 180,
    height : 32,
    url :'',//'/work/getList'
    method:'post',
    required : false,
    editable : true,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         category :"事务",
         selectValue : 1,
         requestType : 'combotree'
    },
    onShowPanel : function()
    {
        url = worktaskAddchildWork.combotree('options').url;
        if (url == '') {
            worktaskAddchildWork.combotree('options').url = '/work/getList';
            worktaskAddchildWork.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(worktaskAddchildWork);//验证用户是否选择下拉
    }    
});

//执行方式
worktaskAddtaskChildAfter.combobox({
    width : 180,
    height : 32,
    data : [{
        id : '1',
        text : '同时结束父流程'
    },{
        id : '2',
        text : '返回父流程'
    }],
    editable : true,
    required : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});


//流程名
worktaskAddtaskName.combobox({
    width : 180,
    height : 32,
    url : '',//'/task/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')

    },
    required : true,
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onShowPanel : function()
    {
        url = worktaskAddtaskName.combobox('options').url;
        if (url == '') {
            worktaskAddtaskName.combobox('options').url = '/task/getList';
            worktaskAddtaskName.combobox('reload');
        }
    },
    onHidePanel : function()
    { 
        getCombobox(worktaskAddtaskName);//验证用户是否选择下拉
    }
});

$('#worktask-add table:first').show();