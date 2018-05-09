@extends('master')


@section('content')

<!--数据列表-->
<table id="task"></table>

<!--工具条-->
<form id="task-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="taskOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="taskOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="taskOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="taskOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="taskOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="taskOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="task-search-keywords">关键字：</label>
        <input type="text" id="task-search-keywords">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="taskOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="task-add"></form>

<!--修改面板-->
<form id="task-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/workflow/task/task.js')}}"></script>
@endsection
