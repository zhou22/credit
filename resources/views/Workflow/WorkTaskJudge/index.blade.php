@extends('master')


@section('content')

<!--数据列表-->
<table id="worktaskjudge"></table>

<!--工具条-->
<form id="worktaskjudge-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="worktaskjudgeOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="worktaskjudgeOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="worktaskjudgeOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="worktaskjudgeOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="worktaskjudgeOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="worktaskjudgeOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="worktaskjudge-search-keywords">关键字：</label>
        <input type="text" id="worktaskjudge-search-keywords">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="worktaskjudgeOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="worktaskjudge-add"></form>

<!--修改面板-->
<form id="worktaskjudge-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/workflow/worktaskjudge/worktaskjudge.js')}}"></script>
@endsection
