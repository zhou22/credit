/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    workAddName                   =   $('#work-add-name'),
    workAddCategory               =   $('#work-add-category')
    workAddPid                    =   $('#work-add-pid')
/*表单字段区域*/
function workAdding()
{
    if (workAdd.form('validate'))
    {
        $.ajax({
            url : '/work',
            type : 'POST',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                name : $.trim(workAddName.val()),
                category : $.trim(workAddCategory.val()),
                pid : $.trim(workAddPid.val()) == '' ? 0 :  workAddPid.val()
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
                    workAdd.dialog('close');
                    work.treegrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}




//新增品名
workAddName.textbox({
    width : 200,
    height : 32,
    required : true,
    validType : 'length[1,30]',
    missingMessage : '请输入流程',
    invalidMessage : '流程1-30位之间'
});


//类型
workAddCategory.combobox({
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



//新增面板的下拉菜单
workAddPid.combotree({
    width : 200,
    height : 32,
    delay : 150,
    url :'/work/getList',
    method:'post',
    editable : true,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         category :"目录",
         selectValue : 1,
         requestType : 'combotree'
    }
});





$('#work-add table:first').show();