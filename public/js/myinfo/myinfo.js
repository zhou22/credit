
$(function(){
  $('#p').datagrid({
      url :'/taskinfo/getOtherList',
      method : 'post',
      title : '待办事项',
      width:600,    
      height:280, 
      fit : false,
      lines : true,
      singleSelect : true,//是否允许多选
      idField : 'id',
      fitColumns : true,
      rownumbers : true,
      border : true,
      sortName : 'created_at',
      sortOrder : 'DESC',
      pagination : true,
      pageSize : 10,
      pageList : [10,50,100],
      pageNumber : 1,
      queryParams: {
           _token : $('meta[name="csrf-token"]').attr('content'),
           selectValue : 1,
           otherValue : 1
      },
      tools:'#worktool',
      columns : [[
        {
            field : 'title',
            title : '标题',
            width : 120
        },
        {
            field : 'staff_name',
            title : '发起人',
            width : 70
        },
        {
            field : 'tasking_name',
            title : '当前位置',
            width : 100
        },
        {
            field : 'created_at',
            title : '时间',
            width : 120,
            formatter : function (value,row,index)
            {
                return row.created_at;
            }
        },
        {
            field : '操作',
            title : '操作',
            width : 130,
            formatter : function (value,row,index)
            {
                return  '<a href="/taskinfo/'+row.id+'/workpersonid/'+row.work_person_id+'" target="_blank" class="infoMore"  plain="false"  style="height: 16px; width: 40px;font-size: 14px;">批复</a>'
                        + '<a href="/taskinfo/'+row.id+'/workpersonid/'+row.work_person_id+'" target="_blank" class="infoMore"  plain="false"  style="height: 16px; width: 55px;font-size: 14px;">进度明细</a>';
            }
        },
    ]],
    onLoadSuccess : function()
    {
        $('.infoMore').linkbutton();        
    },
    onClickCell :function(index,field) {
        $('#p').datagrid('selectRow', index);
    }

  });


  $('#p2').datagrid({
      url :'/taskinfo/getList',
      method : 'post',
      title : '我的申请',
      width:600,    
      height:280, 
      fit : false,
      lines : true,
      idField : 'id',
      fitColumns : true,
      rownumbers : true,
      border : true,
      sortName : 'created_at',
      sortOrder : 'DESC',
      pagination : true,
      pageSize : 10,
      pageList : [10,50,100],
      pageNumber : 1,
      queryParams: {
           _token : $('meta[name="csrf-token"]').attr('content'),
           selectValue : 1
      },
      tools:'#worktool',
      columns : [[
        {
            field : 'title',
            title : '标题',
            width : 100
        },
        {
            field : 'staff_name',
            title : '发起人',
            width : 80
        },
        {
            field : 'tasking_name',
            title : '当前位置',
            width : 80
        },
        {
            field : 'created_at',
            title : '时间',
            width : 150,
        },
        {
            field : 'status',
            title : '状态',
            width : 50,
            formatter : function (value,row,index)
            {
                switch (row.status) {
                    case 1:
                        return '进行';
                        break;
                    case 2:
                        return '通过';
                        break;
                    case 3:
                        return '驳回';
                        break;
                }
            }
        },
        {
            field : '操作',
            title : '操作',
            width : 100,
            formatter : function (value,row,index)
            {

                return  '<a href="javascript:void(0)" target="_blank" class="infoMore"  style="height: 16px; width: 40px;font-size: 14px;">详情</a>'+
                        '<a href="javascript:void(0)" target="_blank" class="infoMore"  style="height: 16px; width: 40px;font-size: 14px;margin-left:5px;">进程</a>';
            }
        },
    ]],
    onLoadSuccess : function()
    {
        $('.infoMore').linkbutton();        
    },
    onClickCell :function(index,field) {
        $('#p2').datagrid('selectRow', index);
    }

  });


  $('#p3').panel({    
    width:600,    
    height:280,    
    title: '已处理事项'    

  });

  $('#p4').panel({    
    width:520,    
    height:280,    
    title: '我的申请'    

  });


  $('#p5').panel({    
    width:520,    
    height:280,    
    title: '消息通知'    

  });

  $('#p6').panel({    
    width:520,    
    height:280,    
    title: '消息通知'    

  });

});
