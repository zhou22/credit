/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    taskworkpersonAddworkName                 =   $('#taskworkperson-add-workname'),
    taskworkpersonAddtaskWork                 =   $('#taskworkperson-add-taskwork'),
    taskworkpersonAddperson                   =   $('#taskworkperson-add-person'),
    taskworkpersonAddposition                 =   $('#taskworkperson-add-position'),
    taskworkpersonAddexecute                  =   $('#taskworkperson-add-execute'),
    taskworkpersonAddRemark                   =   $('#taskworkperson-add-remark')


/*表单字段区域*/
function taskworkpersonAdding()
{
    if (taskworkpersonAdd.form('validate'))
    {
        var     task_work_id = $.trim(taskworkpersonAddtaskWork.combobox('getValue')),
                person_id = $.trim(taskworkpersonAddperson.combotree('getValue')),
                person_type = taskworkpersonAddperson.combotree('tree').tree('getSelected'),
                position_id = $.trim(taskworkpersonAddposition.combobox('getValue')),
                execute = $.trim(taskworkpersonAddexecute.combobox('getValue')),
                remarks = $.trim(taskworkpersonAddRemark.val());

        $.ajax({
            url : '/taskworkperson',
            type : 'POST',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
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
                        msg : '添加成功'
                    });
                    taskworkpersonAdd.dialog('close');
                    taskworkperson.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning');
                }
            }
        });
    }
}

//事务列表
taskworkpersonAddworkName.combotree({
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
        url = taskworkpersonAddworkName.combotree('options').url;
        if (url == '') {
            taskworkpersonAddworkName.combotree('options').url = '/work/getList';
            taskworkpersonAddworkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(taskworkpersonAddworkName);//验证用户是否选择下拉
    },
    onClick : function(node)
    {
        taskworkpersonAddtaskWork.combogrid('grid').datagrid('options').url = '/worktask/getList';
        taskworkpersonAddtaskWork.combogrid('grid').datagrid('reload',{
                keyWork : node.id,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
        taskworkpersonAddtaskWork.combogrid('setValue',{id:'',name:''});
    }
    
});


//流程事务列表
taskworkpersonAddtaskWork.combogrid({
    width : 180,
    height : 32,
    url : '',//'/worktask/getList'
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

                    var _data = taskworkpersonAddtaskWork.combogrid('grid').datagrid('getData');

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
        taskworkpersonAddtaskWork.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        taskworkpersonAddtaskWork.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//部门
taskworkpersonAddperson.combotree({
    width : 180,
    height : 32,
    delay : 150,
    url :'',//'/departments/getTreeTwo'
    method:'get',
    editable : true,
    valueField : 'id',
    textField : 'text',
    onHidePanel : function()
    {
        getCombotree(taskworkpersonAddperson);
                  
    },
    onShowPanel : function()
    {
        url = taskworkpersonAddperson.combotree('options').url;
        if (url == '') {
            taskworkpersonAddperson.combotree('options').url = '/departments/getTreeTwo';
            taskworkpersonAddperson.combotree('reload');
        }
    },
});


//职位
taskworkpersonAddposition.combobox({
    width : 180,
    height : 32,
    method : 'post',
    url : '',//'/positions/getList'
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')  
    },
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onHidePanel : function()
    {
        getCombobox(taskworkpersonAddposition);
                  
    },
    onShowPanel : function()
    {
        url = taskworkpersonAddposition.combobox('options').url;
        if (url == '') {
            taskworkpersonAddposition.combobox('options').url = '/positions/getList';
            taskworkpersonAddposition.combobox('reload');
        }
    },
});


//执行类型
taskworkpersonAddexecute.combobox({
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


$('#taskworkperson-add table:first').show();