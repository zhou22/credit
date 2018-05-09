/**
 * Created by ASUS on 2016/6/9.
 */

var staff                       =   $('#staff'),

//新增面板属性值
    staffAdd                    =   $('#staff-add'),
    staffAddName                =   $('#staff-add-name'),
    staffAddGender              =   $('#staff-add-gender'),
    staffAddNumber              =   $('#staff-add-number'),
    staffAddIdCard              =   $('#staff-add-id-card'),
    staffAddIntro               =   $('#staff-add-intro'),
    staffAddposition            =   $('#staff-add-position'),
    staffAddTel                 =   $('#staff-add-tel'),
    staffAddType                =   $('#staff-add-type'),
    staffAddMaritalStatus       =   $('#staff-add-marital-status'),
    staffAddNation              =   $('#staff-add-nation'),
    staffAddEntryDate           =   $('#staff-add-entry-date'),
    staffAddEducation           =   $('#staff-add-education'),
    staffAddDepartment          =   $('#staff-add-department'),
    staffAddEntryStatus         =   $('#staff-add-entry-status'),
    staffAddSpecialty           =   $('#staff-add-specialty'),
    staffAddPoliticsStatus      =   $('#staff-add-politics-status'),
    staffAddHealth              =   $('#staff-add-health'),
    staffAddRegistered          =   $('#staff-add-registered'),
    staffAddGraduateDate        =   $('#staff-add-graduate-date'),
    staffAddRegisteredAddress   =   $('#staff-add-registered-address'),
    staffAddGraduateColleges    =   $('#staff-add-graduate-colleges'),
    staffAddDetails             =   $('#staff-add-details'),
    STAFF_ADD,
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
    staffSearchIdCard           =   $('#staff-search-id-card'),
    staffSearchNation           =   $('#staff-search-nation'),
    staffSearchEntryStatus      =   $('#staff-search-entry-status'),
    staffSearchposition         =   $('#staff-search-position'),
    staffTool                   =   $('#staff-tool'),
    field                       =   $('#field'),
    staffOpt,
    STAFF_EDIT


//表格数据列表
staff.datagrid({
    url : '/staffs/getlist',
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


//修改面板
staffEdit.dialog({
    title : '修改档案',
    width: 780,
    height: 500,
    iconCls : 'icon-edit',
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
                if (staffEdit.form('validate')){
                    STAFF_EDIT.sync();
                    $.ajax({
                        url : '/staffs',
                        type : 'POST',
                        data : {
                            _token : $('meta[name="csrf-token"]').attr('content'),
                            name : $.trim(staffEditName.val()),
                            number : $.trim(staffEditNumber.val()),
                            id_card : $.trim(staffEditIdCard.val()),
                            gender : staffEditGender.val(),
                            intro : $.trim(staffEditIntro.val()),
                            department : $.trim(staffEditDepartment.combotree('getText')),
                            position : $.trim(staffEditposition.combobox('getText')),
                            group_id : $.trim(staffEditposition.combobox('getValue')),
                            tel : $.trim(staffEditTel.val()),
                            type : $.trim(staffEditType.combobox('getValue')),
                            nation : $.trim(staffEditNation.val()),
                            marital_status : $.trim(staffEditMaritalStatus.combobox('getValue')),
                            entry_status : $.trim(staffEditEntryStatus.combobox('getValue')),
                            entry_date : $.trim(staffEditEntryDate.datebox('getValue')),
                            politics_status : $.trim(staffEditPoliticsStatus.combobox('getValue')),
                            specialty : $.trim(staffEditSpecialty.val()),
                            education : $.trim(staffEditEducation.combobox('getValue')),
                            health : $.trim(staffEditHealth.val()),
                            registered : $.trim(staffEditRegistered.combobox('getValue')),
                            registered_address : $.trim(staffEditRegisteredAddress.val()),
                            graduate_date : $.trim(staffEditGraduateDate.datebox('getValue')),
                            graduate_colleges : $.trim(staffEditGraduateColleges.val()),
                            details : $.trim(staffEditDetails.val())
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
                                staffEdit.dialog('close');
                                staff.datagrid('load');
                            } else if (data.status == -1) {
                                $.messager.alert('添加失败', data.msg, 'warning', function () {
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
                staffEdit.dialog('close');
            }
        }],
    onLoad : function ()
    {
        editLoading();
    },
    onClose : function ()
    {
        staffEdit.form('reset');
        staffEdit.dialog('center');
    }
});

//工具条操作
staffOpt = {
    add : function ()
    {
        addLoading();
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
                        if (rows[i].user_id == 0)
                        {
                            ids.push(rows[i].id);
                        }
                    }
                    $.ajax({
                        url : '/Staff/remove',
                        type : 'POST',
                        data : {
                            ids : ids.join(',')
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
    search : function ()
    {
        if (staffTool.form('validate'))
        {
            staff.datagrid('load', {
                keywords : staffSearchKeywords.textbox('getValue'),
                dateType : staffSearchDateType.combobox('getValue'),
                dateFrom : staffSearchDateFrom.datebox('getValue'),
                dateTo : staffSearchDateTo.datebox('getValue'),
                gender : staffSearchGender.combobox('getValue'),
                id_card : staffSearchIdCard.textbox('getValue'),
                nation : staffSearchNation.textbox('getValue'),
                entry_status : staffSearchEntryStatus.combobox('getValue'),
                marital_status : staffSearchMaritalStatus.combobox('getValue'),
                education : staffSearchEducation.combobox('getValue'),
                type : staffSearchType.combobox('getValue'),
                position : staffSearchposition.combobox('getValue'),
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
        staffSearchIdCard.textbox('clear');
        staffSearchNation.textbox('clear');
        staffSearchGender.combobox('clear');
        staffSearchEntryStatus.combobox('clear');
        staffSearchMaritalStatus.combobox('clear');
        staffSearchEducation.combobox('clear');
        staffSearchType.combobox('clear');
        staffSearchposition.combobox('clear');
        this.search();
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
    // url : '/positions/getlist',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content')
    },
    editable : false,
    valueField : 'name',
    textField : 'name',
    panelHeight : 'auto'
});


//身份证搜索
staffSearchIdCard.textbox({
    width : 220,
    prompt : '身份证(请输入精准18 位身份证号码)',
    validType : 'id_card',
    invalidMessage : '身份证格式不正确，且精确到18 位',
    tipPosition : 'bottom'
});

//民族名称搜索
staffSearchNation.textbox({
    width : 220,
    prompt : '民族(请输入精准关键字，如：汉族)',
    validType : 'nation',
    invalidMessage : '民族查询必须填入完整名称，不得小于2位，且末尾包含“族”字',
    tipPosition : 'bottom'
});


    /*表单字段区域*/
function addLoading()
{
    //新增面板
    staffAdd.dialog({
        title : '新增档案',
        width: 780,
        height: 500,
        href : '/staffs/create',
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
                    alert(STAFF_ADD);
                    if (staffAdd.form('validate')){
                        STAFF_ADD.sync();
                        $.ajax({
                            url : '/staffs',
                            type : 'POST',
                            data : {
                                _token : $('meta[name="csrf-token"]').attr('content'),
                                name : $.trim(staffAddName.val()),
                                number : $.trim(staffAddNumber.val()),
                                id_card : $.trim(staffAddIdCard.val()),
                                gender : staffAddGender.val(),
                                intro : $.trim(staffAddIntro.val()),
                                department : $.trim(staffAddDepartment.combotree('getText')),
                                position : $.trim(staffAddposition.combobox('getText')),
                                group_id : $.trim(staffAddposition.combobox('getValue')),
                                tel : $.trim(staffAddTel.val()),
                                type : $.trim(staffAddType.combobox('getValue')),
                                nation : $.trim(staffAddNation.val()),
                                marital_status : $.trim(staffAddMaritalStatus.combobox('getValue')),
                                entry_status : $.trim(staffAddEntryStatus.combobox('getValue')),
                                entry_date : $.trim(staffAddEntryDate.datebox('getValue')),
                                politics_status : $.trim(staffAddPoliticsStatus.combobox('getValue')),
                                specialty : $.trim(staffAddSpecialty.val()),
                                education : $.trim(staffAddEducation.combobox('getValue')),
                                health : $.trim(staffAddHealth.val()),
                                registered : $.trim(staffAddRegistered.combobox('getValue')),
                                registered_address : $.trim(staffAddRegisteredAddress.val()),
                                graduate_date : $.trim(staffAddGraduateDate.datebox('getValue')),
                                graduate_colleges : $.trim(staffAddGraduateColleges.val()),
                                details : $.trim(staffAddDetails.val())
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
                                    staffAdd.dialog('close');
                                    staff.datagrid('load');
                                } else if (data.status == -1) {
                                    $.messager.alert('添加失败', data.msg, 'warning', function () {
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
                    staffAdd.dialog('close');
                }
            }],
        onLoad : function ()
        {
            //新增姓名
            staffAddName.textbox({
                width : 240,
                height : 32,
                required : true,
                validType : 'length[2,20]',
                missingMessage : '请输入员工姓名',
                invalidMessage : '员工姓名2-20位之间'
            });


            //新增工号
            staffAddNumber.textbox({
                width : 240,
                height : 32,
                required : true,
                validType : 'number',
                missingMessage : '请输入员工工号',
                invalidMessage : '员工工号不合法'
            });

            //性别
            $('#staff-add-gender-1').linkbutton({
                plain : true,
                toggle : true,
                group : 'staff_add_gender',
                selected : true,
                iconCls : 'icon-male',
                onClick : function ()
                {
                    staffAddGender.val('男');
                }
            });
            $('#staff-add-gender-2').linkbutton({
                plain : true,
                toggle : true,
                group : 'staff_add_gender',
                iconCls : 'icon-female',
                onClick : function ()
                {
                    staffAddGender.val('女');
                }
            });


            //新增身份证
            staffAddIdCard.textbox({
                width : 240,
                height : 32,
                required : true,
                validType : 'id_card',
                missingMessage : '请输入员工身份证',
                invalidMessage : '员工身份证不合法'
            });

            //部门
            staffAddDepartment.combotree({
                width : 180,
                height : 32,
                delay : 150,
                url :'/departments/getTree',
                method:'get',
                required : true,
                editable : true
            });


            //职位
            staffAddposition.combobox({
                width : 180,
                height : 32,
                method : 'post',
                url : '/positions/getlist',
                queryParams: {
                     _token : $('meta[name="csrf-token"]').attr('content')
                },
                required : true,
                editable : false,
                valueField : 'id',
                textField : 'name',
                panelHeight : 'auto'
            });


            //移动电话
            staffAddTel.textbox({
                width : 240,
                height : 32,
                validType : 'tel'
            });

            //员工类型
            staffAddType.combobox({
                width : 180,
                height : 32,
                data : [{
                    id : '正式员工',
                    text : '正式员工'
                },{
                    id : '合同工',
                    text : '合同工'
                },{
                    id : '临时工',
                    text : '临时工'
                }],
                editable : false,
                valueField : 'id',
                textField : 'text',
                panelHeight : 'auto'
            });

            //婚姻状况
            staffAddMaritalStatus.combobox({
                width : 180,
                height : 32,
                data : [{
                    id : '未婚',
                    text : '未婚'
                },{
                    id : '已婚',
                    text : '已婚'
                },{
                    id : '离异',
                    text : '离异'
                },{
                    id : '丧偶',
                    text : '丧偶'
                }],
                editable : false,
                valueField : 'id',
                textField : 'text',
                panelHeight : 'auto'
            });

            //民族
            staffAddNation.textbox({
                width : 240,
                height : 32,
                validType : 'nation',
                invalidMessage : '民族格式不正确，包含“族”字，不少于2位'
            });

            //入职时间
            staffAddEntryDate.datebox({
                width : 180,
                height : 32,
                editable : false
            });

            //学历
            staffAddEducation.combobox({
                width : 180,
                height : 32,
                data : [{
                    id : '中专',
                    text : '中专'
                },{
                    id : '大专',
                    text : '大专'
                },{
                    id : '本科',
                    text : '本科'
                },{
                    id : '硕士',
                    text : '硕士'
                }],
                editable : false,
                valueField : 'id',
                textField : 'text',
                panelHeight : 'auto'
            });


            //入职状态
            staffAddEntryStatus.combobox({
                width : 180,
                height : 32,
                data : [{
                    id : '在职',
                    text : '在职'
                },{
                    id : '离休',
                    text : '离休'
                },{
                    id : '调休',
                    text : '调休'
                },{
                    id : '退休',
                    text : '退休'
                }],
                editable : false,
                valueField : 'id',
                textField : 'text',
                panelHeight : 'auto'
            });

            //入职状态
            staffAddPoliticsStatus.combobox({
                width : 180,
                height : 32,
                data : [{
                    id : '群众',
                    text : '群众'
                },{
                    id : '团员',
                    text : '团员'
                },{
                    id : '党员',
                    text : '党员'
                }],
                editable : false,
                valueField : 'id',
                textField : 'text',
                panelHeight : 'auto'
            });

            //专业
            staffAddSpecialty.textbox({
                width : 180,
                height : 32
            });

            //健康状况
            staffAddHealth.textbox({
                width : 180,
                height : 32
            });

            //户口
            staffAddRegistered.combobox({
                width : 180,
                height : 32,
                data : [{
                    id : '本地城市户口',
                    text : '本地城市户口'
                },{
                    id : '本地农村户口',
                    text : '本地农村户口'
                },{
                    id : '外地户口',
                    text : '外地户口'
                }],
                editable : false,
                valueField : 'id',
                textField : 'text',
                panelHeight : 'auto'
            });

            //离职时间
            staffAddGraduateDate.datebox({
                width : 180,
                height : 32,
                editable : false
            });

            //户口所在地
            staffAddRegisteredAddress.textbox({
                width : 240,
                height : 32
            });

            //毕业院校
            staffAddGraduateColleges.textbox({
                width : 180,
                height : 32
            });

            //加载新增编辑器,编辑器功能在index.js页面设置
            STAFF_ADD = KindEditor.create('#staff-add-details', {
                width : '94%',
                height : '200px',
                resizeType : 0,
                items : editor_tool
            });
        },
        onClose : function ()
        {
            staffAdd.form('reset');
            staffAdd.dialog('center');
        }
    });

    

}




//修改编辑加载完成后
function editLoading() 
{

    // 修改面板属性值         
    var staffEditName                =   $('#staff-edit-name'),
        staffEditGender              =   $('#staff-edit-gender'),
        staffEditNumber              =   $('#staff-edit-number'),
        staffEditIdCard              =   $('#staff-edit-id-card'),
        staffEditIntro               =   $('#staff-edit-intro'),
        staffEditposition            =   $('#staff-edit-position'),
        staffEditTel                 =   $('#staff-edit-tel'),
        staffEditType                =   $('#staff-edit-type'),
        staffEditMaritalStatus       =   $('#staff-edit-marital-status'),
        staffEditNation              =   $('#staff-edit-nation'),
        staffEditEntryDate           =   $('#staff-edit-entry-date'),
        staffEditEducation           =   $('#staff-edit-education'),
        staffEditDepartment          =   $('#staff-edit-department'),
        staffEditEntryStatus         =   $('#staff-edit-entry-status'),
        staffEditSpecialty           =   $('#staff-edit-specialty'),
        staffEditPoliticsStatus      =   $('#staff-edit-politics-status'),
        staffEditHealth              =   $('#staff-edit-health'),
        staffEditRegistered          =   $('#staff-edit-registered'),
        staffEditGraduateDate        =   $('#staff-edit-graduate-date'),
        staffEditRegisteredEditress  =   $('#staff-edit-registered-editress'),
        staffEditGraduateColleges    =   $('#staff-edit-graduate-colleges'),
        staffEditDetails             =   $('#staff-edit-details')
        

    
    //修改姓名
    staffEditName.textbox({
        width : 240,
        height : 32,
        required : true,
        validType : 'length[2,20]',
        missingMessage : '请输入员工姓名',
        invalidMessage : '员工姓名2-20位之间'
    });


    //修改工号
    staffEditNumber.textbox({
        width : 240,
        height : 32,
        required : true,
        validType : 'number',
        missingMessage : '请输入员工工号',
        invalidMessage : '员工工号不合法'
    });

    //性别
    $('#staff-edit-gender-1').linkbutton({
        plain : true,
        toggle : true,
        group : 'staff_edit_gender',
        iconCls : 'icon-male',
        onClick : function ()
        {
            staffEditGender.val('男');
        }
    });
    $('#staff-edit-gender-2').linkbutton({
        plain : true,
        toggle : true,
        group : 'staff_edit_gender',
        iconCls : 'icon-female',
        onClick : function ()
        {
            staffEditGender.val('女');
        }
    });

    if ( staffEditGender.val() == '男') {        
        $('#staff-edit-gender-1').linkbutton('select');
    } else{
        $('#staff-edit-gender-2').linkbutton('select');
    }

    //修改身份证
    staffEditIdCard.textbox({
        width : 240,
        height : 32,
        required : true,
        validType : 'id_card',
        missingMessage : '请输入员工身份证',
        invalidMessage : '员工身份证不合法'
    });

    //部门
    staffEditDepartment.combotree({
        width : 180,
        height : 32,
        delay : 150,
        url :'/departments/getTree',
        method:'get',
        required : true,
        editable : true
    });


    //职位
    staffEditposition.combobox({
        width : 180,
        height : 32,
        method : 'post',
        url : '/positions/getlist',
        queryParams: {
             _token : $('meta[name="csrf-token"]').attr('content')
        },
        required : true,
        editable : false,
        valueField : 'id',
        textField : 'name',
        panelHeight : 'auto'
    });


    //移动电话
    staffEditTel.textbox({
        width : 240,
        height : 32,
        validType : 'tel'
    });

    //员工类型
    staffEditType.combobox({
        width : 180,
        height : 32,
        data : [{
            id : '正式员工',
            text : '正式员工'
        },{
            id : '合同工',
            text : '合同工'
        },{
            id : '临时工',
            text : '临时工'
        }],
        editable : false,
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto'
    });

    //婚姻状况
    staffEditMaritalStatus.combobox({
        width : 180,
        height : 32,
        data : [{
            id : '未婚',
            text : '未婚'
        },{
            id : '已婚',
            text : '已婚'
        },{
            id : '离异',
            text : '离异'
        },{
            id : '丧偶',
            text : '丧偶'
        }],
        editable : false,
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto'
    });

    //民族
    staffEditNation.textbox({
        width : 240,
        height : 32,
        validType : 'nation',
        invalidMessage : '民族格式不正确，包含“族”字，不少于2位'
    });

    //入职时间
    staffEditEntryDate.datebox({
        width : 180,
        height : 32,
        editable : false
    });

    //学历
    staffEditEducation.combobox({
        width : 180,
        height : 32,
        data : [{
            id : '中专',
            text : '中专'
        },{
            id : '大专',
            text : '大专'
        },{
            id : '本科',
            text : '本科'
        },{
            id : '硕士',
            text : '硕士'
        }],
        editable : false,
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto'
    });


    //入职状态
    staffEditEntryStatus.combobox({
        width : 180,
        height : 32,
        data : [{
            id : '在职',
            text : '在职'
        },{
            id : '离休',
            text : '离休'
        },{
            id : '调休',
            text : '调休'
        },{
            id : '退休',
            text : '退休'
        }],
        editable : false,
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto'
    });

    //入职状态
    staffEditPoliticsStatus.combobox({
        width : 180,
        height : 32,
        data : [{
            id : '群众',
            text : '群众'
        },{
            id : '团员',
            text : '团员'
        },{
            id : '党员',
            text : '党员'
        }],
        editable : false,
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto'
    });

    //专业
    staffEditSpecialty.textbox({
        width : 180,
        height : 32
    });

    //健康状况
    staffEditHealth.textbox({
        width : 180,
        height : 32
    });

    //户口
    staffEditRegistered.combobox({
        width : 180,
        height : 32,
        data : [{
            id : '本地城市户口',
            text : '本地城市户口'
        },{
            id : '本地农村户口',
            text : '本地农村户口'
        },{
            id : '外地户口',
            text : '外地户口'
        }],
        editable : false,
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto'
    });

    //离职时间
    staffEditGraduateDate.datebox({
        width : 180,
        height : 32,
        editable : false
    });

    //户口所在地
    staffEditRegisteredEditress.textbox({
        width : 240,
        height : 32
    });

    //毕业院校
    staffEditGraduateColleges.textbox({
        width : 180,
        height : 32
    });

   
 //加载修改编辑器,编辑器功能在index.js页面设置
STAFF_EDIT = KindEditor.create('#staff-edit-details', {
    width : '94%',
    height : '200px',
    resizeType : 0,
    items : editor_tool
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