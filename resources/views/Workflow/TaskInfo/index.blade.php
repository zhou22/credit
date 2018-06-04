@extends('master')


@section('content')

<!--数据列表-->
<table id="taskinfo"></table>

<!--工具条-->
<form id="taskinfo-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="taskinfoOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="taskinfoOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="taskinfoOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="taskinfoOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="taskinfoOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="taskinfoOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="taskinfo-search-keywords">关键字：</label>
        <input type="text" id="taskinfo-search-keywords">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="taskinfoOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="taskinfo-add"></form>

<!--修改面板-->
<form id="taskinfo-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/workflow/taskinfo/taskinfo.js')}}"></script>
@endsection
