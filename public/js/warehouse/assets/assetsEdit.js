/**
 * Created by ASUS on 2016/6/9.
 */

var
//编辑面板属性值
    assetsEditName                   =   $('#assets-edit-name'),
    assetsEditType                   =   $('#assets-edit-type'),
    assetsEditUser                   =   $('#assets-edit-user'),
    assetsEditSecrecy                =   $('#assets-edit-secrecy'),
    assetsEditPrice                  =   $('#assets-edit-price'),
    assetsEditFactory                =   $('#assets-edit-factory'),
    assetsEditQuantity               =   $('#assets-edit-quantity'),
    assetsEditUnit                   =   $('#assets-edit-unit'),
    assetsEditRemark                 =   $('#assets-edit-remark'),
    assetsEditInfo                   =   $('#assets-edit-info'),
    assetsEditUser_type              =   $('#assets-edit-user_type'),
    assetsEditUser_id                =   $('#assets-edit-user_id'),
    assetsEditId                     =   $('#assets-edit-id')

//修改面板
function assetsEditing()
{
    if (assetsEdit.form('validate'))
    {
        STAFF_EDIT.sync();
        $.ajax({
            url : '/assets/'+assetsEditId.val(),
            type : 'put',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                id : $.trim(assetsEditId.val()),
                name : $.trim(assetsEditName.val()),
                users : $.trim(assetsEditUser.combobox('getText')),
                user_type : $.trim(assetsEditUser.combotree('tree').tree('getSelected') == null ? assetsEditUser_type.val() : assetsEditUser.combotree('tree').tree('getSelected').user_type),
                user_id : $.trim(assetsEditUser.combotree('tree').tree('getSelected') == null ? assetsEditUser_id.val() : assetsEditUser.combotree('tree').tree('getSelected').id),                
                secrecy : $.trim(assetsEditSecrecy.combobox('getText')),
                price : $.trim(assetsEditPrice.val()),
                factory : $.trim(assetsEditFactory.combobox('getText')),
                quantity : $.trim(assetsEditQuantity.val()),
                unit : $.trim(assetsEditUnit.val()),     
                remarks :$.trim(assetsEditRemark.val()), 
                info : $.trim(assetsEditInfo.val())    
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
                    assetsEdit.dialog('close');
                    assets.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('修改失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}
      


//新增品名
assetsEditName.textbox({
    width : 180,
    height : 32,
    required : true,
    validType : 'length[1,30]',
    missingMessage : '请输物品名称',
    invalidMessage : '物品名称1-30位之间'
});


//部门
assetsEditUser.combotree({
    width : 180,
    height : 32,
    delay : 150,
    url :'/departments/getTreeTwo',
    method:'get',
    required : true,
    editable : true,
    valueField : 'id',
    textField : 'text',
    onHidePanel : function()
    {
        getCombotree(assetsEditUser);
                  
    }
});

//保密等级
assetsEditSecrecy.combobox({
    width : 180,
    height : 32,
    data : [{
        id : '1',
        text : '1级'
    },{
        id : '2',
        text : '2级'
    },{
        id : '3',
        text : '3级'
    },{
        id : '4',
        text : '4级'
    }],
    required : true,
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto',
});


//采购单价
assetsEditPrice.numberbox({
    width : 180,
    height : 32,
    min:0,    
    precision:2,
    missingMessage : '只能输入数字!',
    required : true
});

//品牌
assetsEditFactory.combobox({
    width : 180,
    height : 32,
    data : [{
        id : '1',
        text : '联想'
    },{
        id : '2',
        text : '华硕'
    },{
        id : '3',
        text : '戴尔'
    },{
        id : '4',
        text : '苹果'
    }],
    required : true,
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto',
});


//采购数量
assetsEditQuantity.numberbox({
    width : 180,
    height : 32,
    min:0,    
    precision:2,
    missingMessage : '只能输入数字!',
    required : true
});


//计量单位
assetsEditUnit.textbox({
    width : 180,
    height : 32,
    required : true,
    validType : 'length[1,30]',
    missingMessage : '计量单位',
    invalidMessage : '字数在1-30位之间'
});

   
 //加载修改编辑器,编辑器功能在index.js页面设置
STAFF_EDIT = KindEditor.create('#assets-edit-info', {
    width : '94%',
    height : '200px',
    resizeType : 0,
    items : editor_tool
});

$('#assets-edit table:first').show();


