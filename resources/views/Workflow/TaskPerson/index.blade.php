@extends('master')


@section('content')
<!-- 默认执行人表 -->


<!--数据列表-->
<table id="taskperson"></table>

<!--工具条-->
<form id="taskperson-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="taskpersonOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="taskpersonOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="taskpersonOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="taskpersonOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="taskpersonOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="taskpersonOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="taskperson-search-keywords">关键字：</label>
        <input type="text" id="taskperson-search-keywords">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="taskpersonOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="taskperson-add"></form>

<!--修改面板-->
<form id="taskperson-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/workflow/taskperson/taskperson.js')}}"></script>
@endsection
