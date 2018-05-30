/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    taskworkpersonEditworkName                 =   $('#taskworkperson-edit-workname'),
    taskworkpersonEdittaskWork                 =   $('#taskworkperson-edit-taskWork'),
    taskworkpersonEditperson                   =   $('#taskworkperson-edit-person'),
    taskworkpersonEditposition                 =   $('#taskworkperson-edit-position'),
    taskworkpersonEditexecute                  =   $('#taskworkperson-edit-execute'),
    taskworkpersonEditRemark                   =   $('#taskworkperson-edit-remark')


/*表单字段区域*/
function taskworkpersonEditing()
{
    if (taskworkpersonEdit.form('validate'))
    {
        var     task_work_id = $.trim(taskworkpersonEdittaskWork.combobox('getValue')),
            person_id = $.trim(taskworkpersonEditperson.combotree('getValue')),
            person_type = taskworkpersonEditperson.combotree('tree').tree('getSelected'),
            position_id = $.trim(taskworkpersonEditposition.combobox('getValue')),
            execute = $.trim(taskworkpersonEditexecute.combobox('getValue')),
            remarks = $.trim(taskworkpersonEditRemark.val());

        $.ajax({
            url : '/taskworkperson/'+$('#taskworkperson-edit-id').val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                id : $.trim($('#taskworkperson-edit-id').val()),
                task_work_id : task_work_id,
                person_id : person_id == '' ? null : person_id,
                person_type : person_id == '' ? (position_id == '' ? '职员' : '部门') : person_type.user_type,
                position_id : position_id == '' ? null : position_id,
                execute : execute,
                remarks : remarks
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
                    taskworkpersonEdit.dialog('close');
                    taskworkperson.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning');
                }
            }
        });
    }
}


//事务列表
taskworkpersonEditworkName.combotree({
    width : 180,
    height : 32,
    url :'/work/getList',//'/work/getList'
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
        url = taskworkpersonEditworkName.combotree('options').url;
        if (url == '') {
            taskworkpersonEditworkName.combotree('options').url = '/work/getList';
            taskworkpersonEditworkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(taskworkpersonEditworkName);//验证用户是否选择下拉
    },
    onClick : function(node)
    {
        taskworkpersonEdittaskWork.combogrid('grid').datagrid('options').url = '/worktask/getList';
        taskworkpersonEdittaskWork.combogrid('grid').datagrid('reload',{
                keyWork : node.id,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
        taskworkpersonEdittaskWork.combogrid('setValue',{id:'',name:''});
    }
    
});

//流程事务列表
taskworkpersonEdittaskWork.combogrid({
    width : 180,
    height : 32,
    url : '/worktask/getList',
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
    required : true,
    sortName : 'created_at',
    sortOrder : 'ASC',
    pagination : true,
    pageSize : 10,
    pageList : [10, 20, 30, 40, 50],
    pageNumber : 1,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         keyWork : taskworkpersonEditworkName.combobox('getValue'),
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

                    var _data = taskworkpersonEdittaskWork.combogrid('grid').datagrid('getData');

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

        taskworkpersonEdittaskWork.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        taskworkpersonEdittaskWork.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//部门
taskworkpersonEditperson.combotree({
    width : 180,
    height : 32,
    delay : 150,
    url :'/departments/getTreeTwo',
    method:'get',
    editable : true,
    valueField : 'id',
    textField : 'text',
    onHidePanel : function()
    {
        getCombotree(taskworkpersonEditperson);
                  
    }
});


//职位
taskworkpersonEditposition.combobox({
    width : 180,
    height : 32,
    method : 'post',
    url : '/positions/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')  
    },
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onHidePanel : function()
    {
        getCombobox(taskworkpersonEditposition);
                  
    }
});


//员工类型
taskworkpersonEditexecute.combobox({
    width : 180,
    height : 32,
    data : [{
        id : '0',
        text : '所有人确认'
    },{
        id : '1',
        text : '一人确认'
    }],
    editable : false,
    required : true,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});


$('#taskworkperson-edit table:first').show();