/**
 * Created by ASUS on 2016/6/9.
 */

var
//修改面板
    staffEditName                =   $('#staff-edit-name'),
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
    staffEditRegisteredaddress   =   $('#staff-edit-registered-address'),
    staffEditGraduateColleges    =   $('#staff-edit-graduate-colleges'),
    staffEditDetails             =   $('#staff-edit-details')

//修改面板
function staffEditing()
{
    if (staffEdit.form('validate'))
    {
        STAFF_EDIT.sync();
        $.ajax({
            url : '/staffs/'+$('#staff-edit-id').val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                id : $.trim($('#staff-edit-id').val()),
                name : $.trim(staffEditName.val()),
                number : $.trim(staffEditNumber.val()),
                id_card : $.trim(staffEditIdCard.val()),
                gender : staffEditGender.val(),
                intro : $.trim(staffEditIntro.val()),
                department : $.trim(staffEditDepartment.combotree('getText')),
                department_id : $.trim(staffEditDepartment.combotree('getValue')),
                position : $.trim(staffEditposition.combobox('getText')),
                position_id : $.trim(staffEditposition.combobox('getValue')),
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
                registered_address : $.trim(staffEditRegisteredaddress.val()),
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
                        msg : '修改成功'
                    });
                    staffEdit.dialog('close');
                    staff.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning');
                }
            }
        });
    }
}
      


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

    if ( staffEditGender.val() == '女') {        
        $('#staff-edit-gender-2').linkbutton('select');
        staffEditGender.val('女');
    } else{
        $('#staff-edit-gender-1').linkbutton('select');
        staffEditGender.val('男');
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
    staffEditRegisteredaddress.textbox({
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

$('#staff-edit table:first').show();


