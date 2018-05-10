/**
 * Created by ASUS on 2016/6/9.
 */

var
//新增面板属性值
    worktaskEditlastId                     =   $('#worktask-edit-lastName'),
    worktaskEditnextId                     =   $('#worktask-edit-nextName'),
    worktaskEditworkId                     =   $('#worktask-edit-work_id'),
    worktaskEditworkName                   =   $('#worktask-edit-workName'),
    worktaskEdittaskId                     =   $('#worktask-edit-task_id'),
    worktaskEdittaskName                   =   $('#worktask-edit-taskName'),
    worktaskEditRemark                     =   $('#worktask-edit-remark'),
    worktaskEditId                         =   $('#worktask-edit-id')


    var lastid =  $('#worktask-edit-last_id').val();
    var lastname =  $('#worktask-edit-lastName').val();
    var nextid =  $('#worktask-edit-next_id').val();
    var nextname =  $('#worktask-edit-nextName').val();
    var workid = worktaskEditworkId.val();
    var workname = worktaskEditworkName.val();
//修改面板
function worktaskEditing()
{
    if (worktaskEdit.form('validate'))
    {
        $.ajax({
            url : '/worktask/'+worktaskEditId.val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                task_id : $.trim(worktaskEdittaskId.val()),
                task_name : $.trim(worktaskEdittaskName.val()),
                work_id : $.trim(worktaskEditworkName.combotree('getValue')),
                work_name : $.trim(worktaskEditworkName.combotree('getText')),
                last_id : $.trim(worktaskEditlastId.combogrid('getValue')),
                next_id : $.trim(worktaskEditnextId.combogrid('getValue')),

                id : $.trim(worktaskEditId.val()),
                remarks : $.trim(worktaskEditRemark.val())
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
                    worktaskEdit.dialog('close');
                    worktask.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}




//上一项事务名
worktaskEditlastId.combogrid({
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
    editable : true,
    sortName : 'created_at',
    sortOrder : 'DESC',
    pagination : true,
    pageSize : 10,
    pageList : [10, 20, 30, 40, 50],
    pageNumber : 1,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1,
         keyWork : worktaskEditworkId.val()
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

                    var _data = worktaskEditlastId.combogrid('grid').datagrid('getData');

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
        worktaskEditlastId.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        worktaskEditlastId.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//下一项事务名
worktaskEditnextId.combogrid({
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
    editable : true,
    sortName : 'created_at',
    sortOrder : 'DESC',
    pagination : true,
    pageSize : 10,
    pageList : [10, 20, 30, 40, 50],
    pageNumber : 1,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1,
         keyWork : worktaskEditworkId.val()
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

                    var _data = worktaskEditnextId.combogrid('grid').datagrid('getData');

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
        worktaskEditnextId.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        worktaskEditnextId.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});



//事务名
worktaskEditworkName.combotree({
    width : 180,
    height : 32,
    url :'',
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
        url = worktaskEditworkName.combotree('options').url;
        if (url == '') {
            worktaskEditworkName.combotree('options').url = '/work/getList';
            worktaskEditworkName.combotree('reload');
        }
    },
    onHidePanel : function() 
    {  
        getCombotree(worktaskEditworkName);//验证用户是否选择下拉
    },
    onClick : function(node)
    {
        worktaskEditlastId.combogrid('grid').datagrid('options').url = '/worktask/getList';

        worktaskEditlastId.combogrid('grid').datagrid('load',{
                keyWork : node.id,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        worktaskEditnextId.combogrid('grid').datagrid('options').url = '/worktask/getList';

        worktaskEditnextId.combogrid('grid').datagrid('load',{
                keyWork : node.id,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });


        worktaskEditlastId.combogrid('setValue',{id:'',name:''});
        worktaskEditnextId.combogrid('setValue',{id:'',name:''});
    }
});

//流程名
worktaskEdittaskName.textbox({
    width : 180,
    height : 32,
    disabled : true
});

//设置上一项和下一项的值

    if (lastid == 0 || lastid == '') {
        lastname = '无';
    }

    if (nextid == 0 || nextid == '') {
        nextname = '无';
    }

    worktaskEditlastId.combogrid('setValue',{id:lastid,task_name:lastname});
    worktaskEditnextId.combogrid('setValue',{id:nextid,task_name:nextname});
    worktaskEditworkName.combotree('setValue',{id:workid,text:workname});


$('#worktask-edit table:first').show();


