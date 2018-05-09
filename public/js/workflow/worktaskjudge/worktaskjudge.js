
var worktaskjudge                       =   $('#worktaskjudge'),
//新增面板属性值
    worktaskjudgeAdd                    =   $('#worktaskjudge-add'),
//修改面板
    worktaskjudgeEdit                    =   $('#worktaskjudge-edit'),
//筛选属性值
    worktaskjudgeSearchKeywords         =   $('#worktaskjudge-search-keywords'),
    worktaskjudgeSearchDateType         =   $('#worktaskjudge-search-date-type'),
    worktaskjudgeSearchDateFrom         =   $('#worktaskjudge-search-date-from'),
    worktaskjudgeSearchDateTo           =   $('#worktaskjudge-search-date-to'),
    worktaskjudgeTool                   =   $('#worktaskjudge-tool'),
    worktaskjudgeOpt


//表格数据列表
worktaskjudge.datagrid({
    url : '/worktaskjudge/getList',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'ASC',
    toolbar : '#worktaskjudge-tool',
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
            field : 'work_task',
            title : '流程事务',
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
            field : 'other',
            title : '子事务流程',
            width : 100,
        },
        {
            field : 'execute',
            title : '执行顺序',
            width : 100,
        }
    ]]
});



//工具条操作
worktaskjudgeOpt = {
    add : function ()
    {        
        addLoading();
        worktaskjudgeAdd.dialog('open').dialog('refresh','/worktaskjudge/create'); 
    },
    remove : function ()
    {
        var rows = worktaskjudge.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/worktaskjudge/'+ids,
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
                                worktaskjudge.datagrid('reload');
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
        var rows = worktaskjudge.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            worktaskjudgeEdit.dialog('open').dialog('refresh','/worktaskjudge/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    redo : function ()
    {
        worktaskjudge.datagrid('unselectAll');
    },
    reload : function ()
    {
        worktaskjudge.datagrid('reload');
    },
    search : function (data)
    { 
        if (worktaskjudgeTool.form('validate'))
        {
            worktaskjudge.datagrid('load', {
                keywords : worktaskjudgeSearchKeywords.textbox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        worktaskjudgeSearchKeywords.textbox('clear');
        this.search(0);
    }
};


/*查询字段区域*/
worktaskjudgeSearchKeywords.textbox({
    width : 150,
    prompt : '标题'
});

/*函数*/
function addLoading()
{
    //新增面板
    worktaskjudgeAdd.dialog({
        title : '新增',
        width : 900,
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
                    worktaskjudgeAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    worktaskjudgeAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    worktaskjudgeEdit.dialog({
        title : '修改',
        width: 900,
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
                    worktaskjudgeEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    worktaskjudgeEdit.dialog('close');
                }
            }]
    });

}

