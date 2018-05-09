/**
 * Created by ASUS on 2016/5/9.
 */

var position                      =   $('#position'),

//添加职位参数
    positionAdd                   =   $('#position-add'),//form表单id
    positionAddName               =   $('#position-add-name'),//新增职位名字
    positionAddStatus             =   $('#position-add-status'),//新增职位状态


//修改职位参数
    positionEdit                   =   $('#position-edit'),//修改表单id
    positionEditId                 =   $('#position-edit-id'),//修改职位id
    positionEditName               =   $('#position-edit-name'),//修改职位名字
    positionEditStatus             =   $('#position-edit-status'),//修改职位状态

//职位搜索
    positionSearchKeywords  =   $('#position-search-keywords'),
    positionSearchDateType  =   $('#position-search-date-type'),
    positionSearchDateFrom  =   $('#position-search-date-from'),
    positionSearchDateTo    =   $('#position-search-date-to'),
    positionTool            =   $('#positiontool'),

    positionOpt             



//浏览器改变时触发
$(window).resize(function () {
    positionAdd.dialog('center');
});



//表格数据列表
position.datagrid({
    url :'/positions/getList',
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
    toolbar : '#positiontool',
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
            title : '职位名称',
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

                        state = "<a href='javascript:void(0)' class='status-1' onclick='positionOpt.updateStatus("+ JSON.stringify(row) +")' style='margin-left: 11px;height: 18px;' title='激活'></a>";

                        break;

                    default :

                        state = "<a href='javascript:void(0)' class='status-2' onclick='positionOpt.updateStatus("+ JSON.stringify(row) +")' style='margin-left: 11px;height: 18px;' title='停用'></a>";

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
                    var editPos,deletePos
                    editPos = "<a href='javascript:void(0)' class='editPos' onclick='positionOpt.editPos("+ JSON.stringify(row) +")' title='修改'></a>";
                    deletePos = "<a href='javascript:void(0)' class='deletePos' onclick='positionOpt.deletePos("+ JSON.stringify(row) +")' title='删除'></a>";
                    return  editPos + deletePos;
            }
        }


    ]],
    onLoadSuccess : function(data){

        $('.editPos').linkbutton({    
            iconCls : 'icon-editB',
            height : 19 
        });

        $('.deletePos').linkbutton({    
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
positionOpt = {
    add : function ()
    {
        positionAdd.dialog('open');
    },
    addPos : function (data)
    {       
        positionAdd.dialog('open');
        
    },

    editPos : function (data)
    {  

        $.ajax({
            url :'/positions/'+data.id+'/edit',
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
                    positionEditId.val(data.id);
                    positionEditName.val(data.name);
                    positionEditStatus.val(data.status);
                    positionEditName.textbox('setValue',positionEditName.val());
                    positionEditStatus.combobox('setValue',positionEditStatus.val() == 1 ? 1 : 2 );
                    positionEdit.dialog('open');                    

                } else {
                    $.messager.alert('操作警告', '没有获取到相应数据！', 'warning');
                }
            }
        });
        
    },

    deletePos : function (datas)
    {
        $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + datas.name + '</strong> 吗？', function (flag) {
            if (flag) {
                $.ajax({
                    url : '/positions/'+ datas.id,
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
                            position.datagrid('unselectAll');
                            position.datagrid('reload');
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

    deletesPos : function ()
    {
        var rows = position.datagrid('getSelections');

        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗？', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                        ids.push(rows[i].id);
                    }

                    $.ajax({
                        url : '/positions/'+ ids,
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
                                position.datagrid('load');
                                position.datagrid('unselectAll');
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

        var PosStatus 

        if (data.status == 1) 
        {
            PosStatus = '停用' ;
        } else {
            PosStatus = '激活' ;
        }


        $.messager.confirm('确认操作', '您真的要 <strong>' +PosStatus+'->'+data.name + '</strong> 职位吗？', function (flag) {
            if (flag) {
                $.ajax({
                    url : '/positions/updateStatus/'+ data.id,
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
                            position.datagrid('unselectAll');
                            position.datagrid('reload');
                            $.messager.show({
                                title : '操作提醒',
                                msg : '职位'+data.msg
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
        if (positionTool.form('validate'))
        {
            position.datagrid('load', {
                keywords : positionSearchKeywords.textbox('getValue'),
                dateType : positionSearchDateType.combobox('getValue'),
                dateFrom : positionSearchDateFrom.datebox('getValue'),
                dateTo : positionSearchDateTo.datebox('getValue'),
                searchValue : data,
                _token : $('meta[name="csrf-token"]').attr('content')
            });
            position.datagrid('unselectAll');
        }
    },
    reset : function ()
    {
        positionSearchKeywords.textbox('clear');
        positionSearchDateType.combobox('clear').combobox('disableValidation');
        positionSearchDateFrom.datebox('clear');
        positionSearchDateTo.datebox('clear');
        this.search(0);
        position.datagrid('sort', {
            sortName : 'created_at',
            sortOrder : 'DESC'
        });
    },
    redo : function ()
    {
        position.datagrid('unselectAll');
    },
    reload : function ()
    {
        position.datagrid('reload');
    }

};


//新增面板
positionAdd.dialog({
    title : '新增面板',
    width: 400,
    height: 220,
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
            if (positionAdd.form('validate'))
            {
                $.ajax({
                    url : '/positions',
                    type : 'POST',
                    data : {
                        name : $.trim(positionAddName.val()),
                        status : positionAddStatus.val(),
                        _token : $('meta[name="csrf-token"]').attr('content'),
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
                            positionAdd.dialog('close');
                            position.datagrid('load');
                            position.datagrid('unselectAll');
                        } else if (data.status == -1) {
                            $.messager.alert('添加失败', data.msg, 'warning', function () {
                                positionAddName.textbox('textbox').select();
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
            positionAdd.dialog('close');
        }
    }],
    onClose : function ()
    {
        positionAdd.form('reset');
        positionAdd.dialog('center');
    }
});



//修改面板
positionEdit.dialog({
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
            if (positionEdit.form('validate'))
            {
                $.ajax({
                    url : '/positions/' + positionEditId.val(),
                    type : 'PUT',
                    data : {
                        name : $.trim(positionEditName.val()),
                        id : positionEditId.val(),
                        _token : $('meta[name="csrf-token"]').attr('content'),
                        status : positionEditStatus.val(),
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
                            positionEdit.dialog('close');
                            position.datagrid('load');
                            position.datagrid('unselectAll');
                        } else if (data.status == -1) {
                            $.messager.alert('修改失败', data.msg, 'warning', function () {
                                positionEditName.textbox('textbox').select();
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
            positionEdit.dialog('close');
        }
    }],
    onClose : function ()
    {
        positionEdit.form('reset');
        positionEdit.dialog('center');
    }
});







/*查询字段区域*/
positionSearchKeywords.textbox({
    width : 150,
    prompt : '职位'
});

//时间类型旋转
positionSearchDateType.combobox({
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
positionDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if (positionSearchDateType.combobox('enableValidation').combobox('isValid') == false)
        {
            positionSearchDateType.combobox('showPanel');
        }
    }
};

//起始时间
positionDate.prompt = '起始时间';
positionSearchDateFrom.datebox(positionDate);

//结束时间
positionDate.prompt = '结束时间';
positionSearchDateTo.datebox(positionDate);






//职位名称
positionName = {
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入职位名称',
    invalidMessage : '职位名称2-20位之间'
};



//新增
positionAddName.textbox(positionName);


//修改
positionEditName.textbox(positionName);