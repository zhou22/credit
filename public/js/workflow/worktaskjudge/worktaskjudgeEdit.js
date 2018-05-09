/**
 * Created by ASUS on 2016/6/9.
 */

var
//新增面板属性值
    worktaskjudgeEditlastId                     =   $('#worktaskjudge-edit-lastName'),
    worktaskjudgeEditnextId                     =   $('#worktaskjudge-edit-nextName'),
    worktaskjudgeEditworkName                   =   $('#worktaskjudge-edit-workName'),
    worktaskjudgeEdittaskName                   =   $('#worktaskjudge-edit-taskName'),
    worktaskjudgeEditRemark                     =   $('#worktaskjudge-edit-remark'),
    worktaskjudgeEditId                         =   $('#worktaskjudge-edit-id')
//修改面板
function worktaskjudgeEditing()
{
    if (worktaskjudgeEdit.form('validate'))
    {
        $.ajax({
            url : '/worktaskjudge/'+worktaskjudgeEditId.val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                task_name : $.trim(worktaskjudgeEdittaskName.combobox('getText')),
                work_name : $.trim(worktaskjudgeEditworkName.combobox('getText')),
                task_id : $.trim(worktaskjudgeEdittaskName.combobox('getValue')),
                work_id : $.trim(worktaskjudgeEditworkName.combobox('getValue')),

                last_id : $.trim(worktaskjudgeEditlastId.combogrid('getValue')),
                next_id : $.trim(worktaskjudgeEditnextId.combogrid('getValue')),

                id : $.trim(worktaskjudgeEditId.val()),
                remarks : $.trim(worktaskjudgeEditRemark.val())
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
                    worktaskjudgeEdit.dialog('close');
                    worktaskjudge.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}




//上一项事务名
worktaskjudgeEditlastId.combogrid({
    width : 180,
    height : 32,
    url : '/worktaskjudge/getList',
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
         keyWork : $('#worktaskjudge-edit-work_id').val()
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

                    var _data = worktaskjudgeEditlastId.combogrid('grid').datagrid('getData');

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
        worktaskjudgeEditlastId.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        worktaskjudgeEditlastId.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//下一项事务名
worktaskjudgeEditnextId.combogrid({
    width : 180,
    height : 32,
    url : '/worktaskjudge/getList',
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
         keyWork : $('#worktaskjudge-edit-work_id').val()
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

                    var _data = worktaskjudgeEditnextId.combogrid('grid').datagrid('getData');

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
        worktaskjudgeEditnextId.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        worktaskjudgeEditnextId.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//事务名
worktaskjudgeEditworkName.combobox({
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
        getCombobox(worktaskjudgeEditworkName);//验证用户是否选择下拉
    }
});

//流程名
worktaskjudgeEdittaskName.combobox({
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
        getCombobox(worktaskjudgeEdittaskName);//验证用户是否选择下拉
    }
});

//设置上一项和下一项的值
$(function(){

    var lastid =  $('#worktaskjudge-edit-last_id').val();
    var lastname =  $('#worktaskjudge-edit-lastName').val();
    var nextid =  $('#worktaskjudge-edit-next_id').val();
    var nextname =  $('#worktaskjudge-edit-nextName').val();

    if (lastid == 0 || lastid == '') {
        lastname = '无';
    }

    if (nextid == 0 || nextid == '') {
        nextname = '无';
    }

    worktaskjudgeEditlastId.combogrid('setValue',{id:lastid,task_name:lastname});
    worktaskjudgeEditnextId.combogrid('setValue',{id:nextid,task_name:nextname});

    worktaskjudgeEditworkName.combobox('setValue',$('#worktaskjudge-edit-work_id').val());
    worktaskjudgeEdittaskName.combobox('setValue',$('#worktaskjudge-edit-task_id').val());
});
$('#worktaskjudge-edit table:first').show();


