@extends('master')



@section('content')

<!--数据列表-->
<table id="purchase"></table>

<!--工具条-->
<form id="purchase-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="purchaseOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="purchaseOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="purchaseOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="purchaseOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="purchaseOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="purchaseOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="purchase-search-keywords">关键字：</label>
        <input type="text" id="purchase-search-keywords">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="purchaseOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="purchase-add"></form>

<!--修改面板-->
<form id="purchase-edit"></form>

@endsection
@section('javascript')
<script type="text/javascript" src="{{asset('js/warehouse/purchase/purchase.js')}}"></script>
@endsection
