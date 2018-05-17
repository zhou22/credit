/**
 * Created by ASUS on 2016/6/9.
 */

var
//编辑面板属性值
    taskEditName                   =   $('#task-edit-name'),
    taskEditId                     =   $('#task-edit-id'),
    taskEditRemarks                  =   $('#task-edit-remarks')
    

//修改面板
function taskEditing()
{
    if (taskEdit.form('validate'))
    {
        $.ajax({
            url : '/task/'+taskEditId.val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                id : $.trim(taskEditId.val()),
                name : $.trim(taskEditName.val()),
                remarks : $.trim(taskEditRemarks.val())
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
                    taskEdit.dialog('close');
                    task.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}
      


//新增品名
taskEditName.textbox({
    width : 180,
    height : 32,
    required : true,
    validType : 'length[1,30]',
    missingMessage : '请输入流程',
    invalidMessage : '流程1-30位之间'
});
$('#task-edit table:first').show();


