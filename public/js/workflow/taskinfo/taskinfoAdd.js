/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    taskinfoAddtaskName                   =   $('#taskinfo-add-taskName'),
    taskinfoAddworkName                   =   $('#taskinfo-add-workName'),
    taskinfoAddchildWork                  =   $('#taskinfo-add-childWork'),
    taskinfoAddRemark                     =   $('#taskinfo-add-remark'),
    taskinfoAddtaskChildAfter             =   $('#taskinfo-add-taskChildAfter')


/*表单字段区域*/
function taskinfoAdding()
{
    if (taskinfoAdd.form('validate'))
    {
        $.ajax({
            url : '/taskinfo',
            type : 'POST',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                task_id : $.trim(taskinfoAddtaskName.combobox('getValue')),
                work_id : $.trim(taskinfoAddworkName.combotree('getValue')),
                child_work_id : $.trim(taskinfoAddchildWork.combotree('getValue')),
                child_after : $.trim(taskinfoAddtaskChildAfter.combobox('getValue')),                
                remarks : $.trim(taskinfoAddRemark.val())
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
                    taskinfoAdd.dialog('close');
                    taskinfo.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning');
                }
            }
        });
    }
}


//事务名
taskinfoAddworkName.combotree({
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
        url = taskinfoAddworkName.combotree('options').url;
        if (url == '') {
            taskinfoAddworkName.combotree('options').url = '/work/getList';
            taskinfoAddworkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(taskinfoAddworkName);//验证用户是否选择下拉
    }
});



//子事务名
taskinfoAddchildWork.combotree({
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
        url = taskinfoAddchildWork.combotree('options').url;
        if (url == '') {
            taskinfoAddchildWork.combotree('options').url = '/work/getList';
            taskinfoAddchildWork.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(taskinfoAddchildWork);//验证用户是否选择下拉
    }    
});

//执行方式
taskinfoAddtaskChildAfter.combobox({
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
taskinfoAddtaskName.combobox({
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
        url = taskinfoAddtaskName.combobox('options').url;
        if (url == '') {
            taskinfoAddtaskName.combobox('options').url = '/task/getList';
            taskinfoAddtaskName.combobox('reload');
        }
    },
    onHidePanel : function()
    { 
        getCombobox(taskinfoAddtaskName);//验证用户是否选择下拉
    }
});

$('#taskinfo-add table:first').show();