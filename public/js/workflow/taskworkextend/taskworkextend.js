
var taskworkextend                       =   $('#taskworkextend'),
//新增面板属性值
    taskworkextendAdd                    =   $('#taskworkextend-add'),
//修改面板
    taskworkextendEdit                   =   $('#taskworkextend-edit'),
//筛选属性值
    taskworkextendSearchKeywords         =   $('#taskworkextend-search-keywords'),
    taskworkextendSearchDateType         =   $('#taskworkextend-search-date-type'),
    taskworkextendSearchDateFrom         =   $('#taskworkextend-search-date-from'),
    taskworkextendSearchDateTo           =   $('#taskworkextend-search-date-to'),
    taskworkextendTool                   =   $('#taskworkextend-tool'),
    taskworkextendOpt


//表格数据列表
taskworkextend.datagrid({
    url : '/taskworkextend/getList',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'ASC',
    toolbar : '#taskworkextend-tool',
    pagination : true,
    pageSize : 20,
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
            width : 100,
            checkbox : true
        },
        {
            field : 'work_name',
            title : '事务',
            width : 100,
        },
        {
            field : 'work_task',
            title : '流程事务',
            width : 100,
        },
        {
            field : 'next_name',
            title : '下一项',
            width : 100,
        },
        {
            field : 'field_type',
            title : '字段类型',
            width : 100,
        },
        {
            field : 'judge',
            title : '判断',
            width : 100,
        },
        {
            field : '123',
            title : '操作',
            width : 100,
        }
    ]]
});



//工具条操作
taskworkextendOpt = {
    add : function ()
    {        
        addLoading();
        taskworkextendAdd.dialog('open').dialog('refresh','/taskworkextend/create'); 
    },
    remove : function ()
    {
        var rows = taskworkextend.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/taskworkextend/'+ids,
                        type : 'DELETE',
                        data : {
                            _token : $('meta[name="csrf-token"]').attr('content')
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            });
                            //user.datagrid('loading');
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            //user.datagrid('loaded');
                            if (data)
                            {
                                taskworkextend.datagrid('reload');
                                $.messager.show({
                                    title : '操作提醒',
                                    msg : data + '条数据被成功删除！'
                                })
                            } else {
                                $.messager.alert('删除失败', '没有删除任何数据！', 'warning');
                            }
                        }
                    });
                }
            });
        } else {
            $.messager.alert('操作警告', '删除记录必须一条或以上的数据！', 'warning');
        }
    },
    edit : function ()
    {
        var rows = taskworkextend.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            taskworkextendEdit.dialog('open').dialog('refresh','/taskworkextend/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    redo : function ()
    {
        taskworkextend.datagrid('unselectAll');
    },
    reload : function ()
    {
        taskworkextend.datagrid('reload');
    },
    search : function (data)
    { 
        if (taskworkextendTool.form('validate'))
        {
            taskworkextend.datagrid('load', {
                keywords : taskworkextendSearchKeywords.textbox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        taskworkextendSearchKeywords.textbox('clear');
        this.search(0);
    }
};


/*查询字段区域*/
taskworkextendSearchKeywords.textbox({
    width : 150,
    prompt : '标题'
});

/*函数*/
function addLoading()
{
    //新增面板
    taskworkextendAdd.dialog({
        title : '新增',
        width : 900,
        height : 450,
        closed :true,
        iconCls : 'icon-add',
        modal : true,
        maximizable : true,
        buttons:[
            {
                text : '保存',
                size : 'large',
                iconCls : 'icon-accept',
                handler : function ()
                {
                    taskworkextendAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskworkextendAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    taskworkextendEdit.dialog({
        title : '修改',
        width: 900,
        height: 450,
        iconCls : 'icon-edit',
        modal : true,
        maximizable : true,
        buttons:[
            {
                text : '保存',
                size : 'large',
                iconCls : 'icon-accept',
                handler : function ()
                {
                    taskworkextendEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskworkextendEdit.dialog('close');
                }
            }]
    });

}

