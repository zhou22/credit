@extends('master')


@section('content')

<!--数据列表-->
<table id="work"></table>

<!--工具条-->
<form id="work-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="workOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="workOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="workOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="workOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="workOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="workOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="work-search-keywords">关键字：</label>
        <input type="text" id="work-search-keywords">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="workOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="work-add"></form>

<!--修改面板-->
<form id="work-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/workflow/work/work.js')}}"></script>
@endsection
