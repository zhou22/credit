/**
 * Created by ASUS on 2016/6/9.
 */

var
//编辑面板属性值
    workEditName                   =   $('#work-edit-name'),
    workEditId                     =   $('#work-edit-id')

//修改面板
function workEditing()
{
    if (workEdit.form('validate'))
    {
        $.ajax({
            url : '/work/'+workEditId.val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                id : $.trim(workEditId.val()),
                name : $.trim(workEditName.val()),
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
                    workEdit.dialog('close');
                    work.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}
      


//新增品名
workEditName.textbox({
    width : 180,
    height : 32,
    required : true,
    validType : 'length[1,30]',
    missingMessage : '请输入流程',
    invalidMessage : '流程1-30位之间'
});
$('#work-edit table:first').show();


