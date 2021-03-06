
var work                       =   $('#work'),
//新增面板属性值
    workAdd                    =   $('#work-add'),
//修改面板
    workEdit                    =   $('#work-edit'),
//筛选属性值
    workSearchKeywords         =   $('#work-search-keywords'),
    workSearchDateType         =   $('#work-search-date-type'),
    workSearchDateFrom         =   $('#work-search-date-from'),
    workSearchDateTo           =   $('#work-search-date-to'),
    workTool                   =   $('#work-tool'),
    workOpt,
    STAFF_ADD,
    STAFF_EDIT


//表格数据列表
work.treegrid({
    url :'/work/getList',
    method : 'post',
    fit : true,
    lines : true,
    singleSelect : true,//是否允许多选
    treeField : 'name',
    idField : 'id',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'DESC',
    toolbar : '#work-tool',
    pagination : true,
    pageSize : 50,
    pageList : [50,100],
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
            title : '名称',
            width : 100
        },
        {
            field : 'created_at',
            title : '创建时间',
            width : 100,
        },
        {
            field : '操作',
            title : '操作',
            width : 100
        }
    ]]
});





//工具条操作
workOpt = {
    add : function ()
    {        
        addLoading();
        workAdd.dialog('open').dialog('refresh','/work/create'); 
    },
    remove : function ()
    {
        var rows = work.treegrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/work/'+ids,
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
                                work.treegrid('reload');
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
        var rows = work.treegrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            workEdit.dialog('open').dialog('refresh','/work/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    redo : function ()
    {
        work.treegrid('unselectAll');
    },
    reload : function ()
    {
        work.treegrid('reload');
    },
    search : function (data)
    {
        
        if (workTool.form('validate'))
        {
            work.treegrid('load', {
                keywords : workSearchKeywords.textbox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        workSearchKeywords.textbox('clear');
        this.search(0);
    },
    addOne : function (data)
    {       
        addLoading();
        workAdd.dialog('open').dialog('refresh','/work/create');
        
    },
    editOne : function (data)
    {   
        editLoading();
        workEdit.dialog('open').dialog('refresh','/work/'+data.id+'/edit');
        
    },

    deleteOne : function (datas)
    {
        $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + datas.name + '</strong> 吗？', function (flag) {
            if (flag) {
                $.ajax({
                    url : '/work/'+datas.id,
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
                            work.treegrid('reload');
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

    }
};


/*查询字段区域*/
workSearchKeywords.textbox({
    width : 150,
    prompt : '标题'
});

/*函数*/
function addLoading()
{
    //新增面板
    workAdd.dialog({
        title : '新增',
        width : 500,
        height : 400,
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
                    workAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    workAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    workEdit.dialog({
        title : '修改',
        width: 500,
        height: 400,
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
                    workEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    workEdit.dialog('close');
                }
            }]
    });

}

