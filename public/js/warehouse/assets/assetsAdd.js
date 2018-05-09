/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    assetsAddName                   =   $('#assets-add-name'),
    assetsAddType                   =   $('#assets-add-type'),
    assetsAddUser                   =   $('#assets-add-user'),
    assetsAddSecrecy                =   $('#assets-add-secrecy'),
    assetsAddPrice                  =   $('#assets-add-price'),
    assetsAddFactory                =   $('#assets-add-factory'),
    assetsAddQuantity               =   $('#assets-add-quantity'),
    assetsAddUnit                   =   $('#assets-add-unit'),
    assetsAddRemark                 =   $('#assets-add-remark'),
    assetsAddInfo                   =   $('#assets-add-info')

/*表单字段区域*/
function assetsAdding()
{
    if (assetsAdd.form('validate'))
    {
        STAFF_ADD.sync();
        $.ajax({
            url : '/assets',
            type : 'POST',
            data : {
                _token : $('meta[name="csrf-token"]').attr('content'),
                name : $.trim(assetsAddName.val()),
                type : $.trim(assetsAddType.combobox('getText')),
                users : $.trim(assetsAddUser.combobox('getText')),
                user_type : $.trim(assetsAddUser.combotree('tree').tree('getSelected').user_type),
                user_id : $.trim(assetsAddUser.combotree('tree').tree('getSelected').id),
                secrecy : $.trim(assetsAddSecrecy.combobox('getText')),
                price : $.trim(assetsAddPrice.val()),
                factory : $.trim(assetsAddFactory.combobox('getText')),
                quantity : $.trim(assetsAddQuantity.val()),
                unit : $.trim(assetsAddUnit.val()),     
                remarks :$.trim(assetsAddRemark.val()), 
                info : $.trim(assetsAddInfo.val())     
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
                    assetsAdd.dialog('close');
                    assets.datagrid('load');
                } else if (data.status == -1) {
                    $.messager.alert('添加失败', data.msg, 'warning', function () {
                    });
                }
            }
        });
    }
}


//新增品名
assetsAddName.textbox({
    width : 180,
    height : 32,
    required : true,
    validType : 'length[1,30]',
    missingMessage : '请输物品名称',
    invalidMessage : '物品名称1-30位之间'
});




//物品类型
assetsAddType.combobox({
    width : 180,
    height : 32,
    url : '/assetstype/getList',
    queryParams: {
         _token : $('meta[name="csrf-token"]').attr('content'),
         selectValue : 1
    },
    required : true,
    editable : true,
    valueField : 'id',
    textField : 'name',
    panelHeight : 'auto',
    onHidePanel : function() 
    {  
        getCombobox(assetsAddType);
    }
});


//部门
assetsAddUser.combotree({
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
        getCombotree(assetsAddUser);
                  
    }
});

//保密等级
assetsAddSecrecy.combobox({
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
assetsAddPrice.numberbox({
    width : 180,
    height : 32,
    min:0,    
    precision:2,
    missingMessage : '只能输入数字!',
    required : true
});

//品牌
assetsAddFactory.combobox({
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
assetsAddQuantity.numberbox({
    width : 180,
    height : 32,
    min:0,    
    precision:2,
    missingMessage : '只能输入数字!',
    required : true
});


//计量单位
assetsAddUnit.textbox({
    width : 180,
    height : 32,
    required : true,
    validType : 'length[1,30]',
    missingMessage : '计量单位',
    invalidMessage : '字数在1-30位之间'
});

//加载新增编辑器,编辑器功能在index.js页面设置
STAFF_ADD = KindEditor.create('#assets-add-info', {
    width : '94%',
    height : '200px',
    resizeType : 0,
    items : editor_tool
});
$('#assets-add table:first').show();