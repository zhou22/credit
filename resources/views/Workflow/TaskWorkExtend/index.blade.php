@extends('master')


@section('content')

<!--数据列表-->
<table id="taskworkextend"></table>

<!--工具条-->
<form id="taskworkextend-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="taskworkextendOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="taskworkextendOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="taskworkextendOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="taskworkextendOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="taskworkextendOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="taskworkextendOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="taskworkextend-search-keywords">关键字：</label>
        <input type="text" id="taskworkextend-search-keywords">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="taskworkextendOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="taskworkextend-add"></form>

<!--修改面板-->
<form id="taskworkextend-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/workflow/taskworkextend/taskworkextend.js')}}"></script>
@endsection
