
var taskperson                       =   $('#taskperson'),
//新增面板属性值
    taskpersonAdd                    =   $('#taskperson-add'),
//修改面板
    taskpersonEdit                    =   $('#taskperson-edit'),
//筛选属性值
    taskpersonSearchKeywords         =   $('#taskperson-search-keywords'),
    taskpersonSearchDateType         =   $('#taskperson-search-date-type'),
    taskpersonSearchDateFrom         =   $('#taskperson-search-date-from'),
    taskpersonSearchDateTo           =   $('#taskperson-search-date-to'),
    taskpersonTool                   =   $('#taskperson-tool'),
    taskpersonOpt,
    STAFF_ADD,
    STAFF_EDIT


//表格数据列表
taskperson.datagrid({
    url : '/taskperson/getListFormat',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'ASC',
    toolbar : '#taskperson-tool',
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
            field : 'person_name',
            title : '执行',
            width : 100,
            formatter : function (value, row)
            {
                return row.person_name == null ? '申请人所在部门' : row.person_name ;
            }
        },
        {
            field : 'position_name',
            title : '职位',
            width : 100,
            formatter : function (value, row)
            {
                if (row.position_name == null) {
                    if (row.person_name == null) {
                         return row.position_name == null ? '申请人自己!' : row.position_name ;
                    }
                    else
                    {
                        return '执行部门所有人!';
                    }
                }
                else
                {
                    return row.position_name;
                }
            }
        },
        {
            field : 'execute',
            title : '执行类型',
            width : 100,
            formatter : function (value, row)
            {
                return row.execute != 1 ? 'All' : 'One' ;
            }
        }
    ]]
});



//工具条操作
taskpersonOpt = {
    add : function ()
    {        
        addLoading();
        taskpersonAdd.dialog('open').dialog('refresh','/taskperson/create'); 
    },
    remove : function ()
    {
        var rows = taskperson.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/taskperson/'+ids,
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
                                taskperson.datagrid('reload');
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
        var rows = taskperson.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            taskpersonEdit.dialog('open').dialog('refresh','/taskperson/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    redo : function ()
    {
        taskperson.datagrid('unselectAll');
    },
    reload : function ()
    {
        taskperson.datagrid('reload');
    },
    search : function (data)
    { 
        if (taskpersonTool.form('validate'))
        {
            taskperson.datagrid('load', {
                keywords : taskpersonSearchKeywords.textbox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        taskpersonSearchKeywords.textbox('clear');
        this.search(0);
    }
};


/*查询字段区域*/
taskpersonSearchKeywords.textbox({
    width : 150,
    prompt : '标题'
});

/*函数*/
function addLoading()
{
    //新增面板
    taskpersonAdd.dialog({
        title : '新增',
        width : 900,
        height : 440,
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
                    taskpersonAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskpersonAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    taskpersonEdit.dialog({
        title : '修改',
        width: 900,
        height: 440,
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
                    taskpersonEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskpersonEdit.dialog('close');
                }
            }]
    });

}

