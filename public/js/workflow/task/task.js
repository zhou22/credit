
var task                       =   $('#task'),
//新增面板属性值
    taskAdd                    =   $('#task-add'),
//修改面板
    taskEdit                    =   $('#task-edit'),
//筛选属性值
    taskSearchKeywords         =   $('#task-search-keywords'),
    taskSearchDateType         =   $('#task-search-date-type'),
    taskSearchDateFrom         =   $('#task-search-date-from'),
    taskSearchDateTo           =   $('#task-search-date-to'),
    taskTool                   =   $('#task-tool'),
    taskOpt,
    STAFF_ADD,
    STAFF_EDIT


//表格数据列表
task.datagrid({
    url : '/task/getList',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'DESC',
    toolbar : '#task-tool',
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
            field : 'name',
            title : '标题',
            width : 100,
        },
        {
            field : 'remarks',
            title : '备注',
            width : 100,
        }
    ]]
});



//工具条操作
taskOpt = {
    add : function ()
    {        
        addLoading();
        taskAdd.dialog('open').dialog('refresh','/task/create'); 
    },
    remove : function ()
    {
        var rows = task.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/task/'+ids,
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
                                task.datagrid('reload');
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
        var rows = task.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            taskEdit.dialog('open').dialog('refresh','/task/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    redo : function ()
    {
        task.datagrid('unselectAll');
    },
    reload : function ()
    {
        task.datagrid('reload');
    },
    search : function (data)
    {
        if (taskTool.form('validate'))
        {
            task.datagrid('load', {
                keywords : taskSearchKeywords.textbox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        taskSearchKeywords.textbox('clear');
        this.search(0);
    }
};


/*查询字段区域*/
taskSearchKeywords.textbox({
    width : 150,
    prompt : '标题'
});

/*函数*/
function addLoading()
{
    //新增面板
    taskAdd.dialog({
        title : '新增',
        width : 400,
        height : 380,
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
                    taskAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    taskEdit.dialog({
        title : '修改',
        width: 400,
        height: 380,
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
                    taskEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskEdit.dialog('close');
                }
            }]
    });

}

