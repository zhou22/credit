/**
 * Created by ASUS on 2016/6/9.
 */

var
//新增面板属性值
    worktaskEditworkId                     =   $('#worktask-edit-workId'),
    worktaskEditworkName                   =   $('#worktask-edit-workName'),
    worktaskEdittaskId                     =   $('#worktask-edit-taskId'),
    worktaskEdittaskName                   =   $('#worktask-edit-taskName'),
    worktaskEditchildWorkId                =   $('#worktask-edit-childWorkId'),
    worktaskEditchildWorkName              =   $('#worktask-edit-childWorkName'),
    worktaskEdittaskChildAfter             =   $('#worktask-edit-taskChildAfter'),
    worktaskEditRemark                     =   $('#worktask-edit-remark'),
    worktaskEditId                         =   $('#worktask-edit-id')



    var workid = worktaskEditworkId.val();
    var workname = worktaskEditworkName.val();
    var taskId =  worktaskEdittaskId.val();
    var taskName =  worktaskEdittaskName.val();
    var childWorkId =  worktaskEditchildWorkId.val();
    var childWorkName =  worktaskEditchildWorkName.val();


//修改面板
function worktaskEditing()
{
    if (worktaskEdit.form('validate'))
    {
        $.ajax({
            url : '/worktask/'+worktaskEditId.val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                task_id : $.trim(worktaskEdittaskName.combobox('getValue')),
                work_id : $.trim(worktaskEditworkName.combotree('getValue')),
                child_work_id : $.trim(worktaskEditchildWorkName.combotree('getValue')),
                child_after : $.trim(worktaskEdittaskChildAfter.combobox('getValue')),                
                id : $.trim(worktaskEditId.val()),
                remarks : $.trim(worktaskEditRemark.val())
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
                    worktaskEdit.dialog('close');
                    worktask.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}




//事务名
worktaskEditworkName.combotree({
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
        url = worktaskEditworkName.combotree('options').url;
        if (url == '') {
            worktaskEditworkName.combotree('options').url = '/work/getList';
            worktaskEditworkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(worktaskEditworkName);//验证用户是否选择下拉
    }
});



//子事务名
worktaskEditchildWorkName.combotree({
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
        url = worktaskEditchildWorkName.combotree('options').url;
        if (url == '') {
            worktaskEditchildWorkName.combotree('options').url = '/work/getList';
            worktaskEditchildWorkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(worktaskEditchildWorkName);//验证用户是否选择下拉
    }    
});

//执行方式
worktaskEdittaskChildAfter.combobox({
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
worktaskEdittaskName.combobox({
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
        url = worktaskEdittaskName.combobox('options').url;
        if (url == '') {
            worktaskEdittaskName.combobox('options').url = '/task/getList';
            worktaskEdittaskName.combobox('reload');
        }
    },
    onHidePanel : function()
    { 
        getCombobox(worktaskEdittaskName);//验证用户是否选择下拉
    }
});

    worktaskEditworkName.combotree('setValue',{id:workid,text:workname});
    worktaskEditchildWorkName.combotree('setValue',{id:childWorkId,text:childWorkName});
    worktaskEdittaskName.combobox('setValue',{id:taskId,name:taskName});

$('#worktask-edit table:first').show();


