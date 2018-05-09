/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    taskAddName                   =   $('#task-add-name')


/*表单字段区域*/
function taskAdding()
{
    if (taskAdd.form('validate'))
    {
        $.ajax({
            url : '/task',
            type : 'POST',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                name : $.trim(taskAddName.val())
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
                    taskAdd.dialog('close');
                    task.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}


//新增品名
taskAddName.textbox({
    width : 200,
    height : 32,
    required : true,
    validType : 'length[1,30]',
    missingMessage : '请输入流程',
    invalidMessage : '流程1-30位之间'
});
$('#task-add table:first').show();