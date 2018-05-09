/**
* Created by ASUS on 2016/6/9.
*/
var
//新增面板属性值
    purchaseAdd  = $('#purchase-add'),
    original_price  = 0;

/*表单字段区域*/
function purchaseAdding(a,msg)
{
    $('#listName').textbox({required : false,});
    $('#listNumber').numberbox({required : false,});
    $('#listReach_date').datebox({required : false,});
    $('#itListCause').textbox({required : false,});

    if (purchaseAdd.form('validate'))
    {

       listData =  $('#purchase-product-list').datagrid('getData');           


        if (listData['total'] <= 1 && a != 3) {
            $.messager.alert(' 警告操作', ' 没有添加任何物品！ ', 'warning');
        }else {

            $.messager.confirm('确认操作', msg, function (flag) {
                if (flag) {
                    $.ajax({
                        url : '/purchase/record/itStore',
                        type : 'post',
                        data : {
                            _token : $('meta[name="csrf-token"]').attr('content'),
                            id : $('#purchase-id').val(),
                            task_remarks : $('#task-remarks').val(),
                            tasking_id : $('#tasking-id').val(),
                            work_person_id : $('#work-person-id').val(),
                            status : a,
                            lst_data : listData
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
            });
        }
    }

    $('#listName').textbox({required : true,});
    $('#listNumber').numberbox({required : true,});
    $('#listReach_date').datebox({required : true,});
    $('#itListCause').textbox({required : true,});

}




//其他物品申请列表
$('#purchase-product-list').datagrid({
    width: '100%',
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
    $('.original_price').text('￥' + original_price.toFixed(2)+'元');
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


$('#btnPass').linkbutton({    
    iconCls: 'icon-accept',
    onClick : function() 
    {
        purchaseAdding(2,'确认通过当前申请!');
    } 
}); 

$('#btnBlack').linkbutton({    
    iconCls: 'icon-cross',
    onClick : function() 
    {        
        purchaseAdding(3,'确认驳回当前申请!');
    }  
}); 

$('#btnSave').linkbutton({    
    iconCls: 'icon-save',
    onClick : function() 
    {        
        purchaseAdding(1,'确认保存当前申请!');
    }  
}); 

$(function(){
    $('#task-work-list').panel({    
      width:'100%',
      title: '审批进度',      
    });  

    $('#task-father-list').panel({    
      width:'100%',    
      height:150,    
      title: '主事务'  
    });  

    $('#task-son-list').panel({    
      width:'100%',    
      height:150,    
      title: '子事务'  
    });  

    original_price = $('#original_price').val();

});
