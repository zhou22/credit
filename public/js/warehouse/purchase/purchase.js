    
var purchase                       =   $('#purchase'),
//新增面板属性值
    purchaseAdd                    =   $('#purchase-add'),
//修改面板
    purchaseEdit                    =   $('#purchase-edit'),
//筛选属性值
    purchaseSearchKeywords         =   $('#purchase-search-keywords'),
    purchaseSearchDateType         =   $('#purchase-search-date-type'),
    purchaseSearchDateFrom         =   $('#purchase-search-date-from'),
    purchaseSearchDateTo           =   $('#purchase-search-date-to'),
    purchaseTool                   =   $('#purchase-tool'),
    purchaseOpt



//表格数据列表
purchase.datagrid({
    url : '/purchase/record/getList',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'DESC',
    toolbar : '#purchase-tool',
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
            field : 'sn',
            title : '编号',
            width : 100,
        },
        {
            field : 'department_name',
            title : '申请部门',
            width : 100,
        },
        {
            field : 'person_name',
            title : '申请人',
            width : 100,
        },
        {
            field : 'ask_date',
            title : '申请时间',
            width : 100,
        },
        {
            field : 'budget_name',
            title : '有无预算',
            width : 100,
        },
        {
            field: 'details',
            title: '详情',
            width: 40,
            fixed : true,
            formatter : function (value,row)
            {
                return '<a href="javascript:void(0)" class="purchase-details" style="height: 18px;margin-left:2px;" onclick="purchaseOpt.details(' + row.id + ');"></a>';
            }
        }
    ]],
    onLoadSuccess : function()
    {
        $('.purchase-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function (index, field)
    {
        if (field == 'details') {
            purchase.datagrid('selectRow', index);
        }
    }
});



//工具条操作
purchaseOpt = {
    details : function (id)
    {
        details.
            dialog('open').
            dialog('setTitle', '采购申请详情').
            dialog('refresh');
    },
    add : function ()
    {        
        addLoading();
        purchaseAdd.dialog('open').dialog('refresh','/purchase/record/create'); 
    },
    remove : function ()
    {
        var rows = purchase.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/purchase/record/'+ids,
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
                                purchase.datagrid('reload');
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
        var rows = purchase.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            purchaseEdit.dialog('open').dialog('refresh','/purchase/record/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    redo : function ()
    {
        purchase.datagrid('unselectAll');
    },
    reload : function ()
    {
        purchase.datagrid('reload');
    },
    search : function (data)
    {
        if (purchaseTool.form('validate'))
        {
            purchase.datagrid('load', {
                keywords : purchaseSearchKeywords.textbox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        purchaseSearchKeywords.textbox('clear');
        this.search(0);
    }
};


/*查询字段区域*/
purchaseSearchKeywords.textbox({
    width : 150,
    prompt : '标题'
});

/*函数*/
function addLoading()
{
    //新增面板
    purchaseAdd.dialog({
        title : '新增',
        width : 900,
        height : 506,
        closed :true,
        iconCls : 'icon-add',
        modal : true,
        maximizable : true,
        buttons:[
            {
                text : '提交申请',
                size : 'large',
                iconCls : 'icon-accept',
                handler : function ()
                {
                    purchaseAdding();
                }
            },
            {
                text : '保存',
                size : 'large',
                iconCls : 'icon-save',
                handler : function ()
                {
                    
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    purchaseAdd.dialog('close');
                }
            }]
    });

    purchaseAdd.dialog('center');

}


function editLoading()
{
    //修改面板
    purchaseEdit.dialog({
        title : '修改',
        width: 900,
        height: 200,
        iconCls : 'icon-edit',
        modal : true,
        maximizable : true,
        buttons:[
            {
                text : '提交申请',
                size : 'large',
                iconCls : 'icon-accept',
                handler : function ()
                {
                }
            },
            {
                text : '保存',
                size : 'large',
                iconCls : 'icon-save',
                handler : function ()
                {
                    purchaseEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    purchaseEdit.dialog('close');
                }
            }]
    });
    purchaseEdit.dialog('center');
}

