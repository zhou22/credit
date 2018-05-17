/**
 * Created by ASUS on 2016/6/9.
 */

var
//编辑面板属性值
    workEditName                   =   $('#work-edit-name'),
    workEditId                     =   $('#work-edit-id')
    workEditCategory               =   $('#work-edit-category')
    workEditPid                    =   $('#work-edit-pid')

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
                category : $.trim(workEditCategory.val()),
                pid : $.trim(workEditPid.val()) == '' ? 0 :  workEditPid.val()
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
                    work.treegrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}
      


//修改品名
workEditName.textbox({
    width : 200,
    height : 32,
    required : true,
    validType : 'length[1,30]',
    missingMessage : '请输入流程',
    invalidMessage : '流程1-30位之间'
});



//类型
workEditCategory.combobox({
    width : 200,
    height : 32,
    data : [{
        id : '目录',
        text : '目录'
    },{
        id : '事务',
        text : '事务'
    }],
    editable : false,
    required : true,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});



//修改面板的下拉菜单
workEditPid.combotree({
    width : 200,
    height : 32,
    delay : 150,
    url :'/work/getList',
    method:'post',
    required : true,
    editable : true,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         category :"目录",
         selectValue : 1,
         requestType : 'combotree'
    }
});












$('#work-edit table:first').show();


