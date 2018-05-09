/**
* Created by ASUS on 2016/6/9.
*/


var
//新增面板属性值
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
    staffAddDetails             =   $('#staff-add-details')



/*表单字段区域*/
function staffAdding()
{
    if (staffAdd.form('validate'))
    {
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
                department_id : $.trim(staffAddDepartment.combotree('getValue')),
                position : $.trim(staffAddposition.combobox('getText')),
                group_id : $.trim(staffAddposition.combobox('getValue')),
                position_id : $.trim(staffAddposition.combobox('getValue')),
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
    url : '/positions/getList',
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

//毕业时间
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

$('#staff-add table:first').show();