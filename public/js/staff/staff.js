/**
 * Created by ASUS on 2016/6/9.
 */

var staff                       =   $('#staff'),
//新增面板属性值
    staffAdd                    =   $('#staff-add'),
//修改面板
    staffEdit                    =   $('#staff-edit'),
//筛选属性值
    staffSearchKeywords         =   $('#staff-search-keywords'),
    staffSearchDateType         =   $('#staff-search-date-type'),
    staffSearchDateFrom         =   $('#staff-search-date-from'),
    staffSearchDateTo           =   $('#staff-search-date-to'),
    staffSearchGender           =   $('#staff-search-gender'),
    staffSearchMaritalStatus    =   $('#staff-search-marital-status'),
    staffSearchEducation        =   $('#staff-search-education'),
    staffSearchType             =   $('#staff-search-type'),
    staffSearchEntryStatus      =   $('#staff-search-entry-status'),
    staffSearchposition         =   $('#staff-search-position'),
    staffTool                   =   $('#staff-tool'),
    field                       =   $('#field'),
    staffOpt,
    STAFF_ADD,
    STAFF_EDIT


//表格数据列表
staff.datagrid({
    url : '/staffs/getList',
    fit : true,
    method : 'post',
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'created_at',
    sortOrder : 'DESC',
    toolbar : '#staff-tool',
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
            field : 'number',
            title : '工号',
            width : 60,
            sortable : true
        },
        {
            field : 'name',
            title : '姓名',
            width : 100
        },
        {
            field : 'gender',
            title : '性别',
            width : 50,
            sortable : true
        },
        {
            field : 'id_card',
            title : '身份证',
            width : 170
        },
        {
            field : 'deposition',
            title : '部门职位',
            width : 150
        },
        {
            field : 'nation',
            title : '民族',
            width : 100
        },
        {
            field : 'type',
            title : '员工类型',
            width : 100,
            sortable : true
        },
        {
            field : 'tel',
            title : '移动电话',
            width : 120
        },
        {
            field : 'entry_status',
            title : '入职状态',
            width : 100,
            sortable : true
        },
        {
            field : 'entry_date',
            title : '入职时间',
            width : 100,
            sortable : true
        },
        {
            field : 'marital_status',
            title : '婚姻状况',
            width : 100,
            sortable : true
        },
        {
            field : 'education',
            title : '学历',
            width : 70,
            sortable : true
        },
        {
            field : 'created_at',
            title : '创建时间',
            hidden : true
        },
        {
            field : 'details',
            title : '详情',
            width : 40,
            fixed : true,
            formatter : function (value, row)
            {
                return '<a href="javascript:void(0)" class="staff-details" style="height: 18px;margin-left: 2px;" onclick="staffOpt.details(' + row.id + ')"></a>';
            }
        }
    ]],
    onLoadSuccess : function ()
    {
        $('.staff-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function (index, field)
    {
        if (field == 'details')
        {
            staff.datagrid('selectRow', index);
        }
    }
});

//工具条操作
staffOpt = {
    add : function ()
    {        
        addLoading();
        staffAdd.dialog('open').dialog('refresh','/staffs/create'); 
    },
    remove : function ()
    {
        var rows = staff.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗？<br>已绑定的档案不会被删除，请先解绑！', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                            ids.push(rows[i].id);
                    }
                    $.ajax({
                        url : '/staffs/'+ids,
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
                                staff.datagrid('reload');
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
        var rows = staff.datagrid('getSelections');
        if (rows.length == 1)
        {
            editLoading();
            staffEdit.dialog('open').dialog('refresh','/staffs/'+rows[0].id+'/edit');

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
        staff.datagrid('unselectAll');
    },
    reload : function ()
    {
        staff.datagrid('reload');
    },
    search : function (data)
    {
        if (staffTool.form('validate'))
        {
            staff.datagrid('load', {
                keywords : staffSearchKeywords.textbox('getValue'),
                dateType : staffSearchDateType.combobox('getValue'),
                dateFrom : staffSearchDateFrom.datebox('getValue'),
                dateTo : staffSearchDateTo.datebox('getValue'),
                gender : staffSearchGender.combobox('getValue'),
                entry_status : staffSearchEntryStatus.combobox('getValue'),
                marital_status : staffSearchMaritalStatus.combobox('getValue'),
                education : staffSearchEducation.combobox('getValue'),
                type : staffSearchType.combobox('getValue'),
                position : staffSearchposition.combobox('getValue'),
                selectValue : 1,
                searchValue : data,
                _token : $('meta[name="csrf-token"]').attr('content')
            });

        }
    },
    reset : function ()
    {
        staffSearchKeywords.textbox('clear');
        staffSearchDateType.combobox('clear').combobox('disableValidation');
        staffSearchDateFrom.datebox('clear');
        staffSearchDateTo.datebox('clear');
        staffSearchGender.combobox('clear');
        staffSearchGender.combobox('clear');
        staffSearchEntryStatus.combobox('clear');
        staffSearchMaritalStatus.combobox('clear');
        staffSearchEducation.combobox('clear');
        staffSearchType.combobox('clear');
        staffSearchposition.combobox('clear');
        this.search(0);
    },
    field : function ()
    {
        if (field.linkbutton('options').text == '展开查询字段')
        {
            $('.more').show();
            field.linkbutton({
                text : '收起查询字段',
                iconCls : 'icon-reducesearch'
            }).linkbutton('select');
        } else {
            $('.more').hide();
            field.linkbutton({
                text : '展开查询字段',
                iconCls : 'icon-addsearch'
            }).linkbutton('unselect');
        }
        staff.datagrid('reload');
    }
};


/*查询字段区域*/
staffSearchKeywords.textbox({
    width : 150,
    prompt : '姓名|工号|电话'
});

//时间类型旋转
staffSearchDateType.combobox({
    width : 100,
    editable : false,
    prompt : '时间类型',
    data : [{
        id : 'created_at',
        text : '创建时间'
    }, {
        id : 'entry_date',
        text : '入职时间'
    }, {
        id : 'dimission_date',
        text : '离职时间'
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
staffDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if (staffSearchDateType.combobox('enableValidation').combobox('isValid') == false)
        {
            staffSearchDateType.combobox('showPanel');
        }
    }
};

//起始时间
staffDate.prompt = '起始时间';
staffSearchDateFrom.datebox(staffDate);

//结束时间
staffDate.prompt = '结束时间';
staffSearchDateTo.datebox(staffDate);


staffSearchEntryStatus.combobox({
    width : 93,
    editable : false,
    prompt : '入职状态',
    data : [{
        id : '在职',
        text : '在职'
    }, {
        id : '离职',
        text : '离职'
    }, {
        id : '调休',
        text : '调休'
    }, {
        id : '退休',
        text : '退休'
    }],
    valueField : 'id',
    textFiedl : 'text',
    panelHeight : 'auto'
});

//性别搜索
staffSearchGender.combobox({
    width : 73,
    editable : false,
    prompt : '性别',
    data : [{
        id : '男',
        text : '男'
    }, {
        id : '女',
        text : '女'
    }],
    valueField : 'id',
    textFiedl : 'text',
    panelHeight : 'auto'
});

//婚姻搜索
staffSearchMaritalStatus.combobox({
    width : 73,
    editable : false,
    prompt : '婚姻',
    data : [{
        id : '未婚',
        text : '未婚'
    }, {
        id : '已婚',
        text : '已婚'
    }, {
        id : '离异',
        text : '离异'
    }, {
        id : '丧偶',
        text : '丧偶'
    }],
    valueField : 'id',
    textFiedl : 'text',
    panelHeight : 'auto'
});

//学历搜索
staffSearchEducation.combobox({
    width : 73,
    editable : false,
    prompt : '学历',
    data : [{
        id : '中专',
        text : '中专'
    }, {
        id : '大专',
        text : '大专'
    }, {
        id : '本科',
        text : '本科'
    }, {
        id : '硕士',
        text : '硕士'
    }, {
        id : '博士',
        text : '博士'
    }],
    valueField : 'id',
    textFiedl : 'text',
    panelHeight : 'auto'
});

//员工类型搜索
staffSearchType.combobox({
    width : 93,
    editable : false,
    prompt : '员工类别',
    data : [{
        id : '正式员工',
        text : '正式员工'
    }, {
        id : '临时工',
        text : '临时工'
    }, {
        id : '合同工',
        text : '合同工'
    }],
    valueField : 'id',
    textFiedl : 'text',
    panelHeight : 'auto'
});

//职位搜索
staffSearchposition.combobox({
    width : 73,
    method : 'post',
    prompt : '职位',  
    url : '/positions/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1
    },
    editable : false,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto'
});

/*表单字段区域*/
function addLoading()
{
    //新增面板
    staffAdd.dialog({
        title : '新增档案',
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
                    staffAdding();
                }

            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    staffAdd.dialog('close');
                }
            }]
    });   

}


function editLoading()
{
    //修改面板
    staffEdit.dialog({
        title : '修改档案',
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
                    staffEditing();
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    staffEdit.dialog('close');
                }
            }]
    });

}

//检查工号是否合法的验证扩展
$.extend($.fn.validatebox.defaults.rules, {
    number: {
        validator: function(value,param){
            return /^[0-9]{4}$/.test(value);
        }
    }
});

//检查身份证是否合法的验证扩展
$.extend($.fn.validatebox.defaults.rules, {
    id_card: {
        validator: function(value,param){
            return /^[0-9]{17}[xX0-9]$/.test(value);
        }
    }
});

//扩展民族验证功能
$.extend($.fn.validatebox.defaults.rules, {
    nation : {
        validator: function(value){
            return /^.{1,4}族$/.test(value);
        }
    }
});

//扩展手机验证功能
$.extend($.fn.validatebox.defaults.rules, {
    tel: {
        validator: function(value){
            return /^1[0-9]{10}$/.test(value);
        },
        message: '手机格式不正确'
    }
});