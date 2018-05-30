@extends('master')


@section('content')
<!-- 默认执行人表 -->


<!--数据列表-->
<table id="taskworkperson"></table>

<!--工具条-->
<form id="taskworkperson-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="taskworkpersonOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="taskworkpersonOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="taskworkpersonOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="taskworkpersonOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="taskworkpersonOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="taskworkpersonOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="taskworkperson-search-keywords">关键字：</label>
        <input type="text" id="taskworkperson-search-keywords">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="taskworkpersonOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="taskworkperson-add"></form>

<!--修改面板-->
<form id="taskworkperson-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/workflow/taskworkperson/taskworkperson.js')}}"></script>
@endsection
