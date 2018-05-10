/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    worktaskAddlastId                     =   $('#worktask-add-lastId'),
    worktaskAddworkName                   =   $('#worktask-add-workName'),
    worktaskAddtaskName                   =   $('#worktask-add-taskName'),
    worktaskAddRemark                     =   $('#worktask-add-remark')


/*表单字段区域*/
function worktaskAdding()
{
    if (worktaskAdd.form('validate'))
    {
        $.ajax({
            url : '/worktask',
            type : 'POST',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                task_name : $.trim(worktaskAddtaskName.combobox('getText')),
                work_name : $.trim(worktaskAddworkName.combobox('getText')),
                task_id : $.trim(worktaskAddtaskName.combobox('getValue')),
                work_id : $.trim(worktaskAddworkName.combobox('getValue')),
                id : $.trim(worktaskAddlastId.combogrid('getValue')),
                remarks : $.trim(worktaskAddRemark.val())
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
                    worktaskAdd.dialog('close');
                    worktask.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning');
                }
            }
        });
    }
}

//事务名
worktaskAddworkName.combotree({
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
        url = worktaskAddworkName.combotree('options').url;
        if (url == '') {
            worktaskAddworkName.combotree('options').url = '/work/getList';
            worktaskAddworkName.combotree('reload');
        }
    },
    onHidePanel : function()
    {  
        getCombotree(worktaskAddworkName);//验证用户是否选择下拉
    },
    onClick : function(node)
    {
        worktaskAddlastId.combogrid('grid').datagrid('options').url = '/worktask/getList';
        worktaskAddlastId.combogrid('grid').datagrid('reload',{
                keyWork : node.id,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
        worktaskAddlastId.combogrid('setValue',{id:'',name:''});
    }
    
});

//上一项事务名
worktaskAddlastId.combogrid({
    width : 180,
    height : 32,
    url :'',//'/worktask/getList';
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

                    var _data = worktaskAddlastId.combogrid('grid').datagrid('getData');

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
        worktaskAddlastId.combogrid('grid').datagrid('reload');
    },
    onShowPanel : function ()
    {
        worktaskAddlastId.combogrid('panel').panel('resize', {
            width : '450px'
        })
    }
});




//流程名
worktaskAddtaskName.combobox({
    width : 180,
    height : 32,
    url : '',//'/task/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')

    },
    required : true,
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onShowPanel : function()
    {
        url = worktaskAddtaskName.combobox('options').url;
        if (url == '') {
            worktaskAddtaskName.combobox('options').url = '/task/getList';
            worktaskAddtaskName.combobox('reload');
        }
    },
    onHidePanel : function()
    { 
        getCombobox(worktaskAddtaskName);//验证用户是否选择下拉
    }
});

$('#worktask-add table:first').show();