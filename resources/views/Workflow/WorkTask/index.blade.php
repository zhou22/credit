@extends('master')


@section('content')

<!--数据列表-->
<table id="worktask"></table>

<!--工具条-->
<form id="worktask-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="worktaskOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="worktaskOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="worktaskOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="worktaskOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="worktaskOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="worktaskOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="worktask-search-keywords">关键字：</label>
        <input type="text" id="worktask-search-keywords">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="worktaskOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="worktask-add"></form>

<!--修改面板-->
<form id="worktask-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/workflow/worktask/worktask.js')}}"></script>
@endsection
