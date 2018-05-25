/**
 * Created by ASUS on 2016/6/9.
 */

var
//新增面板属性值
    taskworkextendEditlastId                     =   $('#taskworkextend-edit-lastName'),
    taskworkextendEditnextId                     =   $('#taskworkextend-edit-nextName'),
    taskworkextendEditworkName                   =   $('#taskworkextend-edit-workName'),
    taskworkextendEdittaskName                   =   $('#taskworkextend-edit-taskName'),
    taskworkextendEditRemark                     =   $('#taskworkextend-edit-remark'),
    taskworkextendEditId                         =   $('#taskworkextend-edit-id')
//修改面板
function taskworkextendEditing()
{
    if (taskworkextendEdit.form('validate'))
    {
        $.ajax({
            url : '/taskworkextend/'+taskworkextendEditId.val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                task_name : $.trim(taskworkextendEdittaskName.combobox('getText')),
                work_name : $.trim(taskworkextendEditworkName.combobox('getText')),
                task_id : $.trim(taskworkextendEdittaskName.combobox('getValue')),
                work_id : $.trim(taskworkextendEditworkName.combobox('getValue')),

                last_id : $.trim(taskworkextendEditlastId.combogrid('getValue')),
                next_id : $.trim(taskworkextendEditnextId.combogrid('getValue')),

                id : $.trim(taskworkextendEditId.val()),
                remarks : $.trim(taskworkextendEditRemark.val())
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
                    taskworkextendEdit.dialog('close');
                    taskworkextend.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}




//上一项事务名
taskworkextendEditlastId.combogrid({
    width : 180,
    height : 32,
    url : '/taskworkextend/getList',
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
    sortOrder : 'DESC',
    pagination : true,
    pageSize : 10,
    pageList : [10, 20, 30, 40, 50],
    pageNumber : 1,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1,
         keyWork : $('#taskworkextend-edit-work_id').val()
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
                if (row.next_id == null || row.next_id == 0 || $.trim(row.next_id) == ''  ) {
                    return '无';
                }else {

                    var _data = taskworkextendEditlastId.combogrid('grid').datagrid('getData');

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
        taskworkextendEditlastId.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        taskworkextendEditlastId.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//下一项事务名
taskworkextendEditnextId.combogrid({
    width : 180,
    height : 32,
    url : '/taskworkextend/getList',
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
    sortOrder : 'DESC',
    pagination : true,
    pageSize : 10,
    pageList : [10, 20, 30, 40, 50],
    pageNumber : 1,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1,
         keyWork : $('#taskworkextend-edit-work_id').val()
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
                if (row.next_id == null || row.next_id == 0 || $.trim(row.next_id) == ''  ) {
                    return '无';
                }else {

                    var _data = taskworkextendEditnextId.combogrid('grid').datagrid('getData');

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
        taskworkextendEditnextId.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        taskworkextendEditnextId.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//事务名
taskworkextendEditworkName.combobox({
    width : 180,
    height : 32,
    url : '/work/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1
    },
    required : true,
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onHidePanel : function() 
    {  
        getCombobox(taskworkextendEditworkName);//验证用户是否选择下拉
    }
});

//流程名
taskworkextendEdittaskName.combobox({
    width : 180,
    height : 32,
    url : '/task/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1
    },
    required : true,
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onHidePanel : function()
    {  
        getCombobox(taskworkextendEdittaskName);//验证用户是否选择下拉
    }
});

//设置上一项和下一项的值
$(function(){

    var lastid =  $('#taskworkextend-edit-last_id').val();
    var lastname =  $('#taskworkextend-edit-lastName').val();
    var nextid =  $('#taskworkextend-edit-next_id').val();
    var nextname =  $('#taskworkextend-edit-nextName').val();

    if (lastid == 0 || lastid == '') {
        lastname = '无';
    }

    if (nextid == 0 || nextid == '') {
        nextname = '无';
    }

    taskworkextendEditlastId.combogrid('setValue',{id:lastid,task_name:lastname});
    taskworkextendEditnextId.combogrid('setValue',{id:nextid,task_name:nextname});

    taskworkextendEditworkName.combobox('setValue',$('#taskworkextend-edit-work_id').val());
    taskworkextendEdittaskName.combobox('setValue',$('#taskworkextend-edit-task_id').val());
});
$('#taskworkextend-edit table:first').show();


