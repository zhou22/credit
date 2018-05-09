
var assets                       =   $('#assets'),
//新增面板属性值
    assetsAdd                    =   $('#assets-add'),
//修改面板
    assetsEdit                    =   $('#assets-edit'),
//筛选属性值
    assetsSearchKeywords         =   $('#assets-search-keywords'),
    assetsSearchDateType         =   $('#assets-search-date-type'),
    assetsSearchDateFrom         =   $('#assets-search-date-from'),
    assetsSearchDateTo           =   $('#assets-search-date-to'),
    assetsTool                   =   $('#assets-tool'),
    assetsOpt,
    STAFF_ADD,
    STAFF_EDIT


//表格数据列表
assets.datagrid({
    url : '/assets/getList',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'DESC',
    toolbar : '#assets-tool',
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
            title : '资产编号',
            width : 100,
            sortable : true
        },
        {
            field : 'type',
            title : '类型',
            width : 50
        },
        {
            field : 'name',
            title : '型号',
            width : 100,
            sortable : true
        },
        {
            field : 'users',
            title : '使用人/部门',
            width : 80
        },
        {
            field : 'quantity',
            title : '数量',
            width : 100
        },
        {
            field : 'unit',
            title : '单位',
            width : 80
        },
        {
            field : 'remarks',
            title : '备注',
            width : 120,
            sortable : true
        },
        {
            field : 'secrecy',
            title : '保密等级',
            width : 80
        },
        {
            field : 'details',
            title : '详情',
            width : 40,
            fixed : true,
            formatter : function (value, row)
            {
                return '<a href="javascript:void(0)" class="assets-details" style="height: 18px;margin-left: 2px;" onclick="assetsOpt.details(' + row.id + ')"></a>';
            }
        }
    ]],
    onLoadSuccess : function ()
    {
        $('.assets-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function (index, field)
    {
        if (field == 'details')
        {
            assets.datagrid('selectRow', index);
        }
    }
});



//工具条操作
assetsOpt = {
    add : function ()
    {        
        addLoading();
        assetsAdd.dialog('open').dialog('refresh','/assets/create'); 
    },
    remove : function ()
    {
        var rows = assets.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗?', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/assets/'+ids,
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
                                assets.datagrid('reload');
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
        var rows = assets.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            assetsEdit.dialog('open').dialog('refresh','/assets/'+rows[0].id+'/edit');

        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }

    },
    details : function (id)
    {
        details.
                dialog('open').
                dialog('setTitle', '员工档案详情').
                dialog('refresh');
    },
    redo : function ()
    {
        assets.datagrid('unselectAll');
    },
    reload : function ()
    {
        assets.datagrid('reload');
    },
    search : function (data)
    {
        if (assetsTool.form('validate'))
        {
            assets.datagrid('load', {
                keywords : assetsSearchKeywords.textbox('getValue'),
                dateType : assetsSearchDateType.combobox('getValue'),
                dateFrom : assetsSearchDateFrom.datebox('getValue'),
                dateTo : assetsSearchDateTo.datebox('getValue'),
                searchValue : data,
                selectValue : 1,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        assetsSearchKeywords.textbox('clear');
        assetsSearchDateType.combobox('clear').combobox('disableValidation');
        assetsSearchDateFrom.datebox('clear');
        assetsSearchDateTo.datebox('clear');
        this.search(0);
    }
};


/*查询字段区域*/
assetsSearchKeywords.textbox({
    width : 150,
    prompt : '资产编号|型号|使用者'
});

//时间类型旋转
assetsSearchDateType.combobox({
    width : 100,
    editable : false,
    prompt : '时间类型',
    data : [{
        id : 'created_at',
        text : '入库时间'
    }, {
        id : 'updated_at',
        text : '修改时间'
    }],
    valueField : 'id',
    textField : 'text',
    required : true,
    novalidate : true,
    panelHeight : 'auto',
    tipPosition : 'left',
    missingMessage : '请选择时间类型'
});

//查询时间对象
assetsDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if (assetsSearchDateType.combobox('enableValidation').combobox('isValid') == false)
        {
            assetsSearchDateType.combobox('showPanel');
        }
    }
};

//起始时间
assetsDate.prompt = '起始时间';
assetsSearchDateFrom.datebox(assetsDate);

//结束时间
assetsDate.prompt = '结束时间';
assetsSearchDateTo.datebox(assetsDate);


/*函数*/
function addLoading()
{
    //新增面板
    assetsAdd.dialog({
        title : '新增',
        width : 780,
        closed :true,
        height : 500,
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
                    assetsAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    assetsAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    assetsEdit.dialog({
        title : '修改',
        width: 780,
        height: 500,
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
                    assetsEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    assetsEdit.dialog('close');
                }
            }]
    });

}

