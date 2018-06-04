
var worktask                       =   $('#worktask'),
//新增面板属性值
    worktaskAdd                    =   $('#worktask-add'),
//修改面板
    worktaskEdit                    =   $('#worktask-edit'),
//筛选属性值
    worktaskSearchKeywords         =   $('#worktask-search-keywords'),
    worktaskSearchDateType         =   $('#worktask-search-date-type'),
    worktaskSearchDateFrom         =   $('#worktask-search-date-from'),
    worktaskSearchDateTo           =   $('#worktask-search-date-to'),
    worktaskTool                   =   $('#worktask-tool'),
    worktaskOpt,
    STAFF_ADD,
    STAFF_EDIT


//表格数据列表
worktask.datagrid({
    url : '/worktask/getList',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'ASC',
    toolbar : '#worktask-tool',
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
            field : 'task_name',
            title : '流程',
            width : 100,
        },
        {
            field : 'child_work_name',
            title : '子事务',
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
worktaskOpt = {
    add : function ()
    {        
        addLoading();
        worktaskAdd.dialog('open').dialog('refresh','/worktask/create'); 
    },
    remove : function ()
    {
        var rows = worktask.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/worktask/'+ids,
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
                                worktask.datagrid('reload');
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
        var rows = worktask.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            worktaskEdit.dialog('open').dialog('refresh','/worktask/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    redo : function ()
    {
        worktask.datagrid('unselectAll');
    },
    reload : function ()
    {
        worktask.datagrid('reload');
    },
    search : function (data)
    { 
        if (worktaskTool.form('validate'))
        {
            worktask.datagrid('load', {
                keywords : worktaskSearchKeywords.textbox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        worktaskSearchKeywords.textbox('clear');
        this.search(0);
    }
};


/*查询字段区域*/
worktaskSearchKeywords.textbox({
    width : 150,
    prompt : '事务|流程'
});

/*函数*/
function addLoading()
{
    //新增面板
    worktaskAdd.dialog({
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
                    worktaskAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    worktaskAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    worktaskEdit.dialog({
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
                    worktaskEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    worktaskEdit.dialog('close');
                }
            }]
    });

}

