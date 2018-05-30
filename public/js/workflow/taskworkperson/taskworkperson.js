
var taskworkperson                       =   $('#taskworkperson'),
//新增面板属性值
    taskworkpersonAdd                    =   $('#taskworkperson-add'),
//修改面板
    taskworkpersonEdit                    =   $('#taskworkperson-edit'),
//筛选属性值
    taskworkpersonSearchKeywords         =   $('#taskworkperson-search-keywords'),
    taskworkpersonSearchDateType         =   $('#taskworkperson-search-date-type'),
    taskworkpersonSearchDateFrom         =   $('#taskworkperson-search-date-from'),
    taskworkpersonSearchDateTo           =   $('#taskworkperson-search-date-to'),
    taskworkpersonTool                   =   $('#taskworkperson-tool'),
    taskworkpersonOpt,
    STAFF_ADD,
    STAFF_EDIT


//表格数据列表
taskworkperson.datagrid({
    url : '/taskworkperson/getListFormat',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'ASC',
    toolbar : '#taskworkperson-tool',
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
                return row.person_name == null ? '申请人所在部门或中心' : row.person_name ;
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

                   if (row.person_name != null && row.person_type == "部门") {                    
                        return '执行部门所有人!';
                    }

                   if (row.person_name != null && row.person_type == "职员") {                    
                        return '执行人!';
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
taskworkpersonOpt = {
    add : function ()
    {        
        addLoading();
        taskworkpersonAdd.dialog('open').dialog('refresh','/taskworkperson/create'); 
    },
    remove : function ()
    {
        var rows = taskworkperson.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/taskworkperson/'+ids,
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
                                taskworkperson.datagrid('reload');
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
        var rows = taskworkperson.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            taskworkpersonEdit.dialog('open').dialog('refresh','/taskworkperson/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    redo : function ()
    {
        taskworkperson.datagrid('unselectAll');
    },
    reload : function ()
    {
        taskworkperson.datagrid('reload');
    },
    search : function (data)
    { 
        if (taskworkpersonTool.form('validate'))
        {
            taskworkperson.datagrid('load', {
                keywords : taskworkpersonSearchKeywords.textbox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        taskworkpersonSearchKeywords.textbox('clear');
        this.search(0);
    }
};


/*查询字段区域*/
taskworkpersonSearchKeywords.textbox({
    width : 150,
    prompt : '标题'
});

/*函数*/
function addLoading()
{
    //新增面板
    taskworkpersonAdd.dialog({
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
                    taskworkpersonAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskworkpersonAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    taskworkpersonEdit.dialog({
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
                    taskworkpersonEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    taskworkpersonEdit.dialog('close');
                }
            }]
    });

}

