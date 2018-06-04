/**
 * Created by ASUS on 2016/6/9.
 */

var
//新增面板属性值
    taskinfoEditworkId                     =   $('#taskinfo-edit-workId'),
    taskinfoEditworkName                   =   $('#taskinfo-edit-workName'),
    taskinfoEdittaskId                     =   $('#taskinfo-edit-taskId'),
    taskinfoEdittaskName                   =   $('#taskinfo-edit-taskName'),
    taskinfoEditchildWorkId                =   $('#taskinfo-edit-childWorkId'),
    taskinfoEditchildWorkName              =   $('#taskinfo-edit-childWorkName'),
    taskinfoEdittaskChildAfter             =   $('#taskinfo-edit-taskChildAfter'),
    taskinfoEditRemark                     =   $('#taskinfo-edit-remark'),
    taskinfoEditId                         =   $('#taskinfo-edit-id')



    var workid = taskinfoEditworkId.val();
    var workname = taskinfoEditworkName.val();
    var taskId =  taskinfoEdittaskId.val();
    var taskName =  taskinfoEdittaskName.val();
    var childWorkId =  taskinfoEditchildWorkId.val();
    var childWorkName =  taskinfoEditchildWorkName.val();


//修改面板
function taskinfoEditing()
{
    if (taskinfoEdit.form('validate'))
    {
        $.ajax({
            url : '/taskinfo/'+taskinfoEditId.val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                task_id : $.trim(taskinfoEdittaskName.combobox('getValue')),
                work_id : $.trim(taskinfoEditworkName.combotree('getValue')),
                child_work_id : $.trim(taskinfoEditchildWorkName.combotree('getValue')),
                child_after : $.trim(taskinfoEdittaskChildAfter.combobox('getValue')),                
                id : $.trim(taskinfoEditId.val()),
                remarks : $.trim(taskinfoEditRemark.val())
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
                    taskinfoEdit.dialog('close');
                    taskinfo.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}




//事务名
taskinfoEditworkName.combotree({
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
        url = taskinfoEditworkName.combotree('options').url;
        if (url == '') {
            taskinfoEditworkName.combotree('options').url = '/work/getList';
            taskinfoEditworkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(taskinfoEditworkName);//验证用户是否选择下拉
    }
});



//子事务名
taskinfoEditchildWorkName.combotree({
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
        url = taskinfoEditchildWorkName.combotree('options').url;
        if (url == '') {
            taskinfoEditchildWorkName.combotree('options').url = '/work/getList';
            taskinfoEditchildWorkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(taskinfoEditchildWorkName);//验证用户是否选择下拉
    }    
});

//执行方式
taskinfoEdittaskChildAfter.combobox({
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
taskinfoEdittaskName.combobox({
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
        url = taskinfoEdittaskName.combobox('options').url;
        if (url == '') {
            taskinfoEdittaskName.combobox('options').url = '/task/getList';
            taskinfoEdittaskName.combobox('reload');
        }
    },
    onHidePanel : function()
    { 
        getCombobox(taskinfoEdittaskName);//验证用户是否选择下拉
    }
});

    taskinfoEditworkName.combotree('setValue',{id:workid,text:workname});
    taskinfoEditchildWorkName.combotree('setValue',{id:childWorkId,text:childWorkName});
    taskinfoEdittaskName.combobox('setValue',{id:taskId,name:taskName});

$('#taskinfo-edit table:first').show();


