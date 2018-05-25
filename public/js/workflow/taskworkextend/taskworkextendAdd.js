/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    taskworkextendAddworkName                   =   $('#taskworkextend-add-workName'),
    taskworkextendAddtaskName                   =   $('#taskworkextend-add-taskWork'),
    taskworkextendAddworkNameOther              =   $('#taskworkextend-add-other'),
    taskworkextendAddjudge                      =   $('#taskworkextend-add-judge'),
    taskworkextendAddfieldType                  =   $('#taskworkextend-add-field_type'),
    taskworkextendAddRemark                     =   $('#taskworkextend-add-remark')



/*表单字段区域*/
function taskworkextendAdding()
{
    if (taskworkextendAdd.form('validate'))
    {
        $.ajax({
            url : '/taskworkextend',
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
                    taskworkextendAdd.dialog('close');
                    taskworkextend.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning');
                }
            }
        });
    }
}

//事务名
taskworkextendAddworkName.combotree({
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
        url = taskworkextendAddworkName.combotree('options').url;
        if (url == '') {
            taskworkextendAddworkName.combotree('options').url = '/work/getList';
            taskworkextendAddworkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(taskworkextendAddworkName);//验证用户是否选择下拉
    },
    onClick : function(node)
    {
        taskworkextendAddtaskName.combogrid('grid').datagrid('options').url = '/worktask/getList';
        taskworkextendAddtaskName.combogrid('grid').datagrid('reload',{
                keyWork : node.id,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
        taskworkextendAddtaskName.combogrid('setValue',{id:'',name:''});

        taskworkextendAddworkNameOther.combogrid('grid').datagrid('options').url = '/worktask/getList';
        taskworkextendAddworkNameOther.combogrid('grid').datagrid('reload',{
                keyWork : node.id,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
        taskworkextendAddworkNameOther.combogrid('setValue',{id:'',name:''});

    }
});


//流程列表
taskworkextendAddtaskName.combogrid({
    width : 180,
    height : 32,
    url :'',//'/worktask/getList';
    required : true,
    method : 'post',
    panelWidth : 450,
    panelHeight : 'auto',
    panelMaxHeight : 227,
    fitColumns : true,
    rownumbers : true,
    border : false,
    idField:'id',
    textField:'task_name',
    editable : false,
    sortName : 'created_at',
    sortOrder : 'ASC',
    pagination : true,
    pageSize : 10,
    pageList : [10, 20, 30, 40, 50],
    pageNumber : 1,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1         
    },
    columns : [[
        {
            field : 'id',
            title : '自动编号',
            width : 50,
            hidden : true
        },
        {
            field : 'work_name',
            title : '事务',
            width : 50,
        },
        {
            field : 'task_name',
            title : '流程',
            width : 50,
        },
        {
            field : 'next_id',
            title : '下一流程',
            width : 50,
            formatter : function (value,row,index)
            {
                if (row.next_id == null || row.next_id == 0 || row.next_id == ''  ) {
                    return '无';
                }else {

                    var _data = taskworkextendAddtaskName.combogrid('grid').datagrid('getData');

                    for (var i = 0; i < _data.rows.length; i++) {  
                        if (_data.rows[i]['id'] == row.next_id) {  
                            return _data.rows[i]['work_name']+'=>'+_data.rows[i]['task_name'];
                        }
                    }
                    

                }
            }
        },
        {
            field : 'created_at',
            title : '创建时间',
            width : 100,
            hidden : true
        }
    ]],
    onOpen : function ()
    {
        taskworkextendAddtaskName.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        taskworkextendAddtaskName.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//子事务名
taskworkextendAddworkNameOther.combogrid({
    width : 180,
    height : 32,
    url :'',//'/worktask/getList';
    required : true,
    method : 'post',
    panelWidth : 450,
    panelHeight : 'auto',
    panelMaxHeight : 227,
    fitColumns : true,
    rownumbers : true,
    border : false,
    idField:'id',
    textField:'task_name',
    editable : false,
    sortName : 'created_at',
    sortOrder : 'ASC',
    pagination : true,
    pageSize : 10,
    pageList : [10, 20, 30, 40, 50],
    pageNumber : 1,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1         
    },
    columns : [[
        {
            field : 'id',
            title : '自动编号',
            width : 50,
            hidden : true
        },
        {
            field : 'work_name',
            title : '事务',
            width : 50,
        },
        {
            field : 'task_name',
            title : '流程',
            width : 50,
        },
        {
            field : 'next_id',
            title : '下一流程',
            width : 50,
            formatter : function (value,row,index)
            {
                if (row.next_id == null || row.next_id == 0 || row.next_id == ''  ) {
                    return '无';
                }else {

                    var _data = taskworkextendAddworkNameOther.combogrid('grid').datagrid('getData');

                    for (var i = 0; i < _data.rows.length; i++) {  
                        if (_data.rows[i]['id'] == row.next_id) {  
                            return _data.rows[i]['work_name']+'=>'+_data.rows[i]['task_name'];
                        }
                    }
                    

                }
            }
        },
        {
            field : 'created_at',
            title : '创建时间',
            width : 100,
            hidden : true
        }
    ]],
    onOpen : function ()
    {
        taskworkextendAddworkNameOther.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        taskworkextendAddworkNameOther.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//判断字段
taskworkextendAddfieldType.combobox({
    width : 180,
    height : 32,
    url : '',//'/task/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')
    },
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onShowPanel : function()
    {
        url = taskworkextendAddfieldType.combobox('options').url;
        if (url == '') {
            taskworkextendAddfieldType.combobox('options').url = '/task/getList';
            taskworkextendAddfieldType.combobox('reload');
        }
    },
    onHidePanel : function()
    { 
        getCombobox(taskworkextendAddfieldType);//验证用户是否选择下拉
    }
});


//判断条件
taskworkextendAddjudge.textbox({
    width : 180,
    height : 32
});



$('#taskworkextend-add table:first').show();