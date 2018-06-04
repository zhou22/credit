
var taskinfo                       =   $('#taskinfo'),
//新增面板属性值
    taskinfoAdd                    =   $('#taskinfo-add'),
//修改面板
    taskinfoEdit                    =   $('#taskinfo-edit'),
//筛选属性值
    taskinfoSearchKeywords         =   $('#taskinfo-search-keywords'),
    taskinfoSearchDateType         =   $('#taskinfo-search-date-type'),
    taskinfoSearchDateFrom         =   $('#taskinfo-search-date-from'),
    taskinfoSearchDateTo           =   $('#taskinfo-search-date-to'),
    taskinfoTool                   =   $('#taskinfo-tool'),
    taskinfoOpt,
    STAFF_ADD,
    STAFF_EDIT


//表格数据列表
taskinfo.datagrid({
    url : '/taskinfo/getList',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'ASC',
    toolbar : '#taskinfo-tool',
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
            field : 'title',
            title : '主题',
            width : 100,
        },
        {
            field : 'task_flow_name',
            title : '当前位置',
            width : 100,
        },
        {
            field : 'status',
            title : '状态',
            width : 100,
        },
        {
            field : 'created_at',
            title : '发起时间',
            width : 100,
        }
    ]]
});



//工具条操作
taskinfoOpt = {
    add : function ()
    {        
        addLoading();
        taskinfoAdd.dialog('open').dialog('refresh','/taskinfo/create');
    },
    remove : function ()
    {
        var rows = taskinfo.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/taskinfo/'+ids,
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
                                taskinfo.datagrid('reload');
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
        var rows = taskinfo.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            taskinfoEdit.dialog('open').dialog('refresh','/taskinfo/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    redo : function ()
    {
        taskinfo.datagrid('unselectAll');
    },
    reload : function ()
    {
        taskinfo.datagrid('reload');
    },
    search : function (data)
    { 
        if (taskinfoTool.form('validate'))
        {
            taskinfo.datagrid('load', {
                keywords : taskinfoSearchKeywords.textbox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        taskinfoSearchKeywords.textbox('clear');
        this.search(0);
    }
};


/*查询字段区域*/
taskinfoSearchKeywords.textbox({
    width : 150,
    prompt : '事务|流程'
});

/*函数*/
function addLoading()
{
    //新增面板
    taskinfoAdd.dialog({
        title : '新增',
        width : 600,
        height : 420,
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
                    taskinfoAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskinfoAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    taskinfoEdit.dialog({
        title : '修改',
        width: 600,
        height: 420,
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
                    taskinfoEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskinfoEdit.dialog('close');
                }
            }]
    });

}

