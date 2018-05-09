/**
 * Created by ASUS on 2016/5/9.
 */

var department                      =   $('#department'),

//添加部门参数
    departmentAdd                   =   $('#department-add'),//form表单id
    departmentAddName               =   $('#department-add-name'),//新增部门名字
    departmentAddP                  =   $('#department-add-name-p'),//新增部门上一级名字
    departmentAddIdP                =   $('#department-add-id-p'),//新增部门上一级id
    departmentAddStatus             =   $('#department-add-status'),//新增部门状态


//修改部门参数
    departmentEdit                   =   $('#department-edit'),//修改表单id
    departmentEditIdP                =   $('#department-edit-id-p'),//修改部门上一级id
    departmentEditNameP              =   $('#department-edit-name-p'),//修改部门上一级名字
    departmentEditId                 =   $('#department-edit-id'),//修改部门id
    departmentEditName               =   $('#department-edit-name'),//修改部门名字
    departmentEditStatus             =   $('#department-edit-status'),//修改部门状态

//部门搜索
    departmentSearchKeywords  =   $('#department-search-keywords'),
    departmentSearchDateType  =   $('#department-search-date-type'),
    departmentSearchDateFrom  =   $('#department-search-date-from'),
    departmentSearchDateTo    =   $('#department-search-date-to'),
    departmentTool            =   $('#departmenttool'),

    departmentOpt             



//浏览器改变时触发
$(window).resize(function () {
    departmentAdd.dialog('center');
});


//新增面板的下拉菜单
departmentAddP.combotree({
    width : 220,
    height : 32,
    delay : 150,
    url :'/departments/getTree',
    method:'get',
    required : true,
    editable : true,
    onClick : function(node){
        departmentAddIdP.val(node.id);
        departmentAddP.val(node.text);
    },
    onClickIcon : function(index){
        departmentAddP.combotree('setValue',departmentAddP.val());
    }

});

//修改面板的下拉菜单
departmentEditNameP.combotree({
    width : 220,
    height : 32,
    delay : 150,
    url :'/departments/getTree',
    method:'get',
    required : true,
    editable : true,
    onClick : function(node){
        departmentEditIdP.val(node.id);
        departmentEditNameP.val(node.text);
    },
    onClickIcon : function(index){
       departmentEditNameP.combotree('setValue',departmentEditNameP.val());
    }

});

//表格数据列表
department.treegrid({
    url :'/departments/getList',
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
    toolbar : '#departmenttool',
    pagination : true,
    pageSize : 50,
    pageList : [50,100],
    pageNumber : 1,
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')
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
            title : '部门名称',
            width : 100
        },
        {
            field : 'created_at',
            title : '创建时间',
            width : 100,
        },
        {
            field : 'status',
            title : '状态',
            width : 50,
            fixed : true,
            formatter : function (value, row)
            {
                if (row.pid == 0) {
                        return;
                }       

                var state = '';

                switch (value)
                {
                    case 1 :

                        state = "<a href='javascript:void(0)' class='status-1' onclick='departmentOpt.updateStatus("+ JSON.stringify(row) +")' style='margin-left: 11px;height: 18px;' title='激活'></a>";

                        break;

                    default :

                        state = "<a href='javascript:void(0)' class='status-2' onclick='departmentOpt.updateStatus("+ JSON.stringify(row) +")' style='margin-left: 11px;height: 18px;' title='停用'></a>";

                }

                return state;
            }
        },
        {
            field : 'images',
            title : '操作', 
            width : 80,
            formatter: function(value,row,index){

                    if (row.pid == 0) {
                        return;
                    }                    
                    var editDep,deleteDep,addDep
                    addDep = "<a href='javascript:void(0)' class='addDep' onclick='departmentOpt.addDep("+ JSON.stringify(row) +")' title='新增'></a>";
                    editDep = "<a href='javascript:void(0)' class='editDep' onclick='departmentOpt.editDep("+ JSON.stringify(row) +")' title='修改'></a>";
                    deleteDep = "<a href='javascript:void(0)' class='deleteDep' onclick='departmentOpt.deleteDep("+ JSON.stringify(row) +")' title='删除'></a>";
                    return addDep + editDep + deleteDep;
            }
        }


    ]],
    onLoadSuccess : function(data){
        $('.addDep').linkbutton({    
            iconCls : 'icon-add',
            height : 19 
        });

        $('.editDep').linkbutton({    
            iconCls : 'icon-editB',
            height : 19 
        });

        $('.deleteDep').linkbutton({    
            iconCls : 'icon-deleteB',
            height : 19 
        });

        $('.status-1').linkbutton({
            iconCls : 'icon-ok',


        });
        $('.status-2').linkbutton({
            iconCls : 'icon-lock',

        });

    }
});


//工具条操作
departmentOpt = {
    add : function ()
    {
        departmentAdd.dialog('open');
        departmentAddP.combotree('reload');
    },
    addDep : function (data)
    {       
        departmentAddIdP.val(data.id);
        departmentAddP.val(data.name);
        departmentAddP.combotree('setValue',data.name);
        departmentAddP.combotree('reload');
        departmentAdd.dialog('open');
        
    },

    editDep : function (data)
    {   
        $.ajax({
            url :'/departments/'+data.id+'/edit',
            type : 'GET',
            beforeSend : function ()
            {
                $.messager.progress({
                    text : '正在处理中...'
                })
            },
            success : function (data)
            {
                $.messager.progress('close');
                if (data)
                {
                    departmentEditIdP.val(data.pid);
                    departmentEditNameP.val(data.parent == 0 ? '无' : data.parent.name);
                    departmentEditId.val(data.id);
                    departmentEditName.val(data.name);
                    departmentEditStatus.val(data.status);

                    departmentEditNameP.combotree('setValue',departmentEditNameP.val());
                    departmentEditName.textbox('setValue',departmentEditName.val());
                    departmentEditStatus.combobox('setValue',departmentEditStatus.val() == 1 ? 1 : 2);

                    departmentEditNameP.combotree('reload');
                    departmentEdit.dialog('open');                    

                } else {
                    $.messager.alert('操作警告', '没有获取到相应数据！', 'warning');
                }
            }
        });
        
    },

    deleteDep : function (datas)
    {
        $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + datas.name + '</strong> 吗？', function (flag) {
            if (flag) {
                $.ajax({
                    url : '/departments/'+ datas.id,
                    type : 'DELETE',
                    data : {
                        ids : datas.id,
                        _token : $('meta[name="csrf-token"]').attr('content')
                    },
                    beforeSend : function ()
                    {
                        $.messager.progress({
                            text : '正在处理中...'
                        })
 
                    },
                    success : function (data)
                    {
                        $.messager.progress('close');

                        if (data)
                        {
                            department.treegrid('unselectAll');
                            department.treegrid('reload');
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

    },

    deletesDep : function ()
    {
        var rows = department.treegrid('getSelections');

        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗？', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                        ids.push(rows[i].id);
                    }

                    $.ajax({
                        url : '/departments/'+ ids,
                        type : 'DELETE',
                        data : {
                            _token : $('meta[name="csrf-token"]').attr('content')
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            })
                            //post.datagrid('loading');
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            //post.datagrid('loaded');
                            if (data)
                            {
                                department.treegrid('load');
                                department.treegrid('unselectAll');
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

    updateStatus : function (data)
    {

        var DepStatus 

        if (data.status == 1) 
        {
            DepStatus = '停用' ;
        } else {
            DepStatus = '激活' ;
        }


        $.messager.confirm('确认操作', '您真的要 <strong>' +DepStatus+'->'+data.name + '</strong> 吗？', function (flag) {
            if (flag) {
                $.ajax({
                    url : '/departments/updateStatus/'+ data.id,
                    type : 'post',
                    data : {
                        _token : $('meta[name="csrf-token"]').attr('content')
                    },
                    beforeSend : function ()
                    {
                        $.messager.progress({
                            text : '正在处理中...'
                        })
 
                    },
                    success : function (data)
                    {
                        $.messager.progress('close');

                        if (data.status == 1)
                        {
                            department.treegrid('unselectAll');
                            department.treegrid('reload');
                            $.messager.show({
                                title : '操作提醒',
                                msg : '部门'+data.msg
                            })
                        } else {
                            $.messager.alert('操作', data.msg, 'warning');
                        }
                    }
                });
            }            
        });

    },

    search : function (data)
    {
        if (departmentTool.form('validate'))
        {
            department.treegrid('load', {
                keywords : departmentSearchKeywords.textbox('getValue'),
                dateType : departmentSearchDateType.combobox('getValue'),
                dateFrom : departmentSearchDateFrom.datebox('getValue'),
                dateTo : departmentSearchDateTo.datebox('getValue'),
                searchValue : data,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
            department.treegrid('unselectAll');
        }
    },
    reset : function ()
    {
        departmentSearchKeywords.textbox('clear');
        departmentSearchDateType.combobox('clear').combobox('disableValidation');
        departmentSearchDateFrom.datebox('clear');
        departmentSearchDateTo.datebox('clear');
        this.search(0);
        department.treegrid('sort', {
            sortName : 'created_at',
            sortOrder : 'DESC'
        });
    },
    redo : function ()
    {
        department.treegrid('unselectAll');
    },
    reload : function ()
    {
        department.treegrid('reload');
    }

};


//新增面板
departmentAdd.dialog({
    title : '新增面板',
    width: 400,
    height: 300,
    iconCls : 'icon-add',
    closed: true,
    modal : true,
    maximizable : true,
    buttons:[
    {
        text : '保存',
        size : 'large',
        iconCls : 'icon-accept',
        handler : function ()
        {            
            if (departmentAdd.form('validate'))
            {
                $.ajax({
                    url : '/departments',
                    type : 'POST',
                    data : {
                        name : $.trim(departmentAddName.val()),
                        _token : $('meta[name="csrf-token"]').attr('content'),
                        pid : departmentAddIdP.val(),
                        pname : departmentAddP.val()
                    },
                    beforeSend : function ()
                    {
                        $.messager.progress({
                            text : '正在处理中...'
                        })
                    },
                    success : function (data)
                    {
                        $.messager.progress('close');
                        if (data.status > 0)
                        {
                            $.messager.show({
                                title : '操作提示',
                                msg : '添加成功'
                            });
                            departmentAdd.dialog('close');
                            department.treegrid('load');
                            department.treegrid('unselectAll');
                        } else if (data.status == -1) {
                            $.messager.alert('添加失败', data.msg, 'warning', function () {
                                departmentAddName.textbox('textbox').select();
                            });
                        }
                    }
                });
            }
        }
    },{
        text : '取消',
        size : 'large',
        iconCls : 'icon-cross',
        handler : function ()
        {
            departmentAdd.dialog('close');
        }
    }],
    onClose : function ()
    {
        departmentAdd.form('reset');
        departmentAdd.dialog('center');
    }
});




//修改面板
departmentEdit.dialog({
    title : '修改面板',
    width: 400,
    height: 300,
    iconCls : 'icon-add',
    closed: true,
    modal : true,
    maximizable : true,
    buttons:[
    {
        text : '保存',
        size : 'large',
        iconCls : 'icon-accept',
        handler : function ()
        {            
            if (departmentEdit.form('validate'))
            {
                $.ajax({
                    url : '/departments/' + departmentEditId.val(),
                    type : 'PUT',
                    data : {
                        name : $.trim(departmentEditName.val()),
                        id : departmentEditId.val(),
                        _token : $('meta[name="csrf-token"]').attr('content'),
                        pid : departmentEditIdP.val(),
                        status : departmentEditStatus.val(),
                        pname : departmentEditNameP.val()

                    },
                    beforeSend : function ()
                    {
                        $.messager.progress({
                            text : '正在处理中...'
                        })
                    },
                    success : function (data)
                    {
                        $.messager.progress('close');
                        if (data.status > 0)
                        {
                            $.messager.show({
                                title : '操作提示',
                                msg : '修改成功'
                            });
                            departmentEdit.dialog('close');
                            department.treegrid('load');
                            department.treegrid('unselectAll');
                        } else if (data.status == -1) {
                            $.messager.alert('修改失败', data.msg, 'warning', function () {
                                departmentEditName.textbox('textbox').select();
                            });
                        }
                    }
                });
            }
        }
    },{
        text : '取消',
        size : 'large',
        iconCls : 'icon-cross',
        handler : function ()
        {
            departmentEdit.dialog('close');
        }
    }],
    onClose : function ()
    {
        departmentEdit.form('reset');
        departmentEdit.dialog('center');
    }
});







/*查询字段区域*/
departmentSearchKeywords.textbox({
    width : 150,
    prompt : '部门'
});

//时间类型旋转
departmentSearchDateType.combobox({
    width : 100,
    editable : false,
    prompt : '时间类型',
    data : [{
        id : 'created_at',
        text : '创建时间'
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
departmentDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if (departmentSearchDateType.combobox('enableValidation').combobox('isValid') == false)
        {
            departmentSearchDateType.combobox('showPanel');
        }
    }
};

//起始时间
departmentDate.prompt = '起始时间';
departmentSearchDateFrom.datebox(departmentDate);

//结束时间
departmentDate.prompt = '结束时间';
departmentSearchDateTo.datebox(departmentDate);






//部门名称
departmentName = {
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入部门名称',
    invalidMessage : '部门名称2-20位之间'
};



//新增
departmentAddName.textbox(departmentName);


//修改
departmentEditName.textbox(departmentName);