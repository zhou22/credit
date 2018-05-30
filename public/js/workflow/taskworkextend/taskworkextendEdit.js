/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    taskworkextendEditworkName                   =   $('#taskworkextend-edit-workName'),
    taskworkextendEdittaskName                   =   $('#taskworkextend-edit-taskWork'),
    taskworkextendEditworkNext                   =   $('#taskworkextend-edit-next'),
    taskworkextendEditjudge                      =   $('#taskworkextend-edit-judge'),
    taskworkextendEditfieldType                  =   $('#taskworkextend-edit-field_type'),
    taskworkextendEditRemark                     =   $('#taskworkextend-edit-remark')



/*表单字段区域*/
function taskworkextendEditing()
{
    if (taskworkextendEdit.form('validate'))
    {
        $.ajax({
            url : '/taskworkextend',
            type : 'POST',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                task_work_id : taskworkextendEdittaskName.combogrid('getValue'),
                task_work_next_id : taskworkextendEditworkNext.combogrid('getValue'),
                judge : taskworkextendEditjudge.textbox('getText'),
                field_type : taskworkextendEditfieldType.textbox('getText'),
                remarks : taskworkextendEditRemark.val()
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
                    taskworkextendEdit.dialog('close');
                    taskworkextend.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning');
                }
            }
        });
    }
}

//事务名
taskworkextendEditworkName.combotree({
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
        url = taskworkextendEditworkName.combotree('options').url;
        if (url == '') {
            taskworkextendEditworkName.combotree('options').url = '/work/getList';
            taskworkextendEditworkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(taskworkextendEditworkName);//验证用户是否选择下拉
    },
    onClick : function(node)
    {
        taskworkextendEdittaskName.combogrid('grid').datagrid('options').url = '/worktask/getList';
        taskworkextendEdittaskName.combogrid('grid').datagrid('reload',{
                keyWork : node.id,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
        taskworkextendEdittaskName.combogrid('setValue',{id:'',name:''});

        taskworkextendEditworkNext.combogrid('grid').datagrid('options').url = '/worktask/getList';
        taskworkextendEditworkNext.combogrid('grid').datagrid('reload',{
                keyWork : node.id,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
        taskworkextendEditworkNext.combogrid('setValue',{id:'',name:''});

    }
});


//流程列表
taskworkextendEdittaskName.combogrid({
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

                    var _data = taskworkextendEdittaskName.combogrid('grid').datagrid('getData');

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
        taskworkextendEdittaskName.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        taskworkextendEdittaskName.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//子事流程
taskworkextendEditworkNext.combogrid({
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

                    var _data = taskworkextendEditworkNext.combogrid('grid').datagrid('getData');

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
        taskworkextendEditworkNext.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        taskworkextendEditworkNext.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//判断字段
taskworkextendEditfieldType.textbox({
    width : 180,
    height : 32
});


//判断条件
taskworkextendEditjudge.textbox({
    width : 180,
    height : 32
});


//设置上一项和下一项的值
$(function(){

    var nextid =  $('#taskworkextend-edit-next').val();
    var nextname =  $('#taskworkextend-edit-nextName').val();

    if (nextid == 0 || nextid == '') {
        nextname = '无';
    }

    taskworkextendEdittaskName.combogrid('setValue',{id:taskworkextendEdittaskName.val(),task_name:$('#taskworkextend-edit-taskWorkName').val()});
    taskworkextendEditworkNext.combogrid('setValue',{id:nextid,task_name:nextname});
});

$('#taskworkextend-edit table:first').show();


