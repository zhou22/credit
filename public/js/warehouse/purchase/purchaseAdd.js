/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    purchaseAddAskDate                   =   $('#purchase-add-ask_date'),
    purchaseAddType                      =   $('#purchase-add-type'),
    purchaseAddBudget                    =   $('#purchase-add-budget'),

    original_price                       = 0,
    relsType                            ;



/*表单字段区域*/
function purchaseAdding()
{
    $('#listName').textbox({required : false,});
    $('#listNumber').numberbox({required : false,});
    $('#listReach_date').datebox({required : false,});
    purchaseAddItType.combobox({required : false,})
    $('#itListCause').textbox({required : false,});

    if (purchaseAdd.form('validate'))
    {
        if (purchaseAddType.combobox('getValue') == 1) {
           listData =  $('#purchase-product-itList').datagrid('getData');
           relsType = 1;
        }

        if (purchaseAddType.combobox('getValue') == 2) {
           listData =  $('#purchase-product-list').datagrid('getData');     
           relsType = 2 ;      
        }

        if (listData['total'] <= 1) {
            $.messager.alert(' 警告操作', ' 没有添加任何物品！ ', 'warning');
        }else {
            $.ajax({
                url : '/purchase/record',
                type : 'POST',
                data : {
                    _token : $('meta[name="csrf-token"]').attr('content'),
                    type : purchaseAddType.combobox('getValue'),
                    type_name : purchaseAddType.combobox('getText'),
                    relsType : relsType,
                    typeText : purchaseAddType.combobox('getText'),
                    ask_date : purchaseAddAskDate.datebox('getValue'),
                    lst_data : listData,
                    remarks : $('#purchase-add-remarks').val(),
                    budget : purchaseAddBudget.combobox('getValue'),
                    budget_name : purchaseAddBudget.combobox('getText')

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
                        purchaseAdd.dialog('close');
                        purchase.datagrid('load');
                    } else if (data.status == -1) {
                        $.messager.alert('添加失败', data.msg, 'warning');
                    }
                }
            });
        }
    }

    $('#listName').textbox({required : true,});
    $('#listNumber').numberbox({required : true,});
    $('#listReach_date').datebox({required : true,});
    purchaseAddItType.combobox({required : true,})
    $('#itListCause').textbox({required : true,});

}

//其他物品申请列表
$('#purchase-product-list').datagrid({
    width: '98%',
    rownumbers : true,
    autoRowHeight :true,
    nowrap:false,
    fitColumns:true, 
    columns: [[
        {
            field : 'id',
            title : '编号',
            hidden : true
        },
        {
            field : 'name',
            title : '品名',
            width : 120
        },
        {
            field : 'type',
            title : '规格',
            width : 120
        },
        {
            field : 'version',
            title : '型号',
            width : 110
        },
        {
            field : 'number',
            title : '数量',
            width : 60
        },
        {
            field : 'price',
            title : '预估单价',
            width : 80
        },
        {
            field : 'reach_date',
            title : '到达时间',
            width : 120
        },
        {
            field: 'opt',
            title: '操作',
            width: 70,
            formatter : function (value,row,index) {
                if (index == 0) {
                    return '<a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" style="height:60px;">新增</a>';
                } else {
                    return '<a href="javascript:void(0)" class="easyui-linkbutton remove" plain="true" iconCls="icon-remove" style="height:60px;">移除</a>';                    
                }
            }
        }
    ]],
    onClickCell :function(index,field) {
        $('#purchase-product-list').datagrid('selectRow', index);
        if (field == 'opt') {
            if (index == 0 ) {
                listAdd();
            }
            if (index != 0) {
                listRemove(index);
            }
        }

    }
});


function listAdd()
{

    var     name = $('#listName').val(),
            type = $('#listType').val(),
            version = $('#listVersion').val(),
            number = $('#listNumber').val(),
            price = $('#listPrice').val(),
            reach_date = $('#listReach_date').val()


    if (name == '' || number == '') {
        $.messager.alert('警告', '品名和数量不能为空!','warning');
        return;
    }


//判断是否重复添加
    var data = $('#purchase-product-list').datagrid('getData');
    for (var i = 1 ; i < data.rows.length; i++) {
        if ( data.rows.length > 1 && data.rows[i].name == name && data.rows[i].type == type && data.rows[i].version == version) {
             $.messager.alert('警告', '不能重复添加!','warning');
             return;
        }
    }


    $('#purchase-product-list').datagrid('insertRow',{
        row: {
            name: name,
            type: type,
            version: version,
            number: number,
            price: price,
            reach_date: reach_date
        }
    });

    $('.remove').linkbutton({    
        iconCls : 'icon-remove',
        height : 60 
    });
    original_price = ((original_price * 100) + ($('#listNumber').val() * $('#listPrice').val() * 100)) / 100;
    $('.original_price').text('￥' + original_price.toFixed(2));
}

function listRemove(index)
{

     $.messager.confirm('确认操作', '您确定要删除所选物品吗？', function (flag) {
        if (flag) {
            var data = $('#purchase-product-list').datagrid('getData');
            var row = data.rows[index];
            original_price = ((original_price * 100) - (row.number * row.price * 100)) / 100;

            $('.original_price').text('￥' + original_price.toFixed(2));
            $('#purchase-product-list').datagrid('deleteRow',index);
            $('#purchase-product-list').datagrid('load');
        }
    });

}


//采购申请时间
purchaseAddAskDate.datetimebox({
    width : 140,
    height : 32,
    editable : false,
    showSeconds: false 
});

//采购类型
purchaseAddType.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '1',
        text : 'IT资产'
    },{
        id : '2',
        text : '其他物品'
    }],
    required : true,
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto',
    onChange : function(newValue) {

        if (newValue == 1) {
            $('.itGoods').show();
            $('.oherGoods').hide();
        }else {
            $('.itGoods').hide();
            $('.oherGoods').show();
        }

    }
});


//有无预算
purchaseAddBudget.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '1',
        text : '有预算'
    },{
        id : '2',
        text : '追加'
    },{
        id : '3',
        text : '无预算'
    }],
    required : true,
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});



//物品列表表单字段

$('#listName').textbox({    
    required : true,
    multiline :true,
    height :60
})

$('#listType').textbox({
    multiline :true,
    height :60
})

$('#listVersion').textbox({
    multiline :true,
    height :60

})

//采购数量
$('#listNumber').numberbox({
    min:1,
    missingMessage : '只能输入数字!',
    required : true,
    height :60

});

$('#listPrice').numberbox({
    height :60 
})

$('#listReach_date').datebox({  
    required : true,
    editable : false,
    height :60

})



//it申请表格

//其他物品申请列表
$('#purchase-product-itList').datagrid({
    width: '98%',
    rownumbers : true,
    autoRowHeight :true,
    nowrap:false,
    fitColumns:true,
    columns: [[
        {
            field : 'id',
            title : '编号',
            hidden : true
        },
        {
            field : 'itType',
            title : '设备类型',
            width : 140
        },
        {
            field : 'itNumber',
            title : '数量',
            width : 60
        },
        {
            field : 'itCause',
            title : '申请原因',
            width : 150
        },
        {
            field : 'itOtherNeed',
            title : '其他需求',
            width : 150
        },
        {
            field: 'opt',
            title: '操作',
            width: 60,
            formatter : function (value,row,index) {
                if (index == 0) {
                    return '<a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add"  style="height:60px;">新增</a>';
                } else {
                    return '<a href="javascript:void(0)" class="easyui-linkbutton remove" plain="true" iconCls="icon-remove" style="height:60px;">移除</a>';                    
                }
            }
        }
    ]],
    onClickCell :function(index,field) {
        
        if (field == 'opt') {
            if (index == 0 ) {
                itListAdd();
            }
            if (index != 0) {
                itListRemove(index);
            }
        }        
        $('#purchase-product-itList').datagrid('selectRow', index);
    }
});



function itListAdd()
{

    var     type = $('#itListType').combobox('getText'),
            number = $('#itListNumber').val(),
            cause = $('#itListCause').val(),
            otherNeed = $('#itListOtherNeed').val()

//判断是否为空
    if (type == '' || cause == '') {
        $.messager.alert('警告', '设备类型和申请原因不能为空!','warning');
        return;
    }

//判断是否重复添加
    var data = $('#purchase-product-itList').datagrid('getData');
    for (var i = 1 ; i < data.rows.length; i++) {
        if ( data.rows.length > 1 && data.rows[i].itType == type && data.rows[i].itCause == cause && data.rows[i].itOtherNeed == otherNeed) {
             $.messager.alert('警告', '不能重复添加!','warning');
             return;
        }
    }
//追加数据到列表
    $('#purchase-product-itList').datagrid('insertRow',{
        row: {
            itType: type,
            itNumber: number,
            itCause: cause,
            itOtherNeed: otherNeed,
        }
    });

    $('.remove').linkbutton({    
        iconCls : 'icon-remove',
        height : 60 
    });
}

function itListRemove(index)
{

     $.messager.confirm('确认操作', '您确定要删除所选物品吗？', function (flag) {
        if (flag) {
            var data = $('#purchase-product-itList').datagrid('getData');
            $('#purchase-product-itList').datagrid('deleteRow',index);
        }
    });

}





//it申请列表字段
//物品类型
var purchaseAddItType  =  $('#itListType');
purchaseAddItType.combobox({
    height : 60,
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
        getCombobox(purchaseAddItType);
    }
});


$('#itListCause').textbox({    
    required : true,
    width : '100%',
    multiline :true,
    height :60
})

$('#itListOtherNeed').textbox({
    multiline :true,
    width : '100%',
    height :60
})

$('#itListNumber').numberbox({
    height :60,
    width : '100%',
})





$('.itGoods').hide();
$('.oherGoods').hide();

$(function(){
    $('#purchase-add table:first').show();
});
