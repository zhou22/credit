@extends('master')


@section('content')

<!--数据列表-->
<table id="staff"></table>

<!--工具条-->
<form id="staff-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="staffOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="staffOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="staffOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="staffOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="staffOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-addsearch" onclick="staffOpt.field()" id="field">展开查询字段</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="staffOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="staff-search-keywords">关键字：</label>
        <input type="text" id="staff-search-keywords">
        <input type="text" id="staff-search-position">        
        <input type="text" id="staff-search-entry-status">
        <input type="text" id="staff-search-date-type">
        <input type="text" id="staff-search-date-from">
        <label for="staff-search-date-to">-</label>
        <input type="text" id="staff-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="staffOpt.search(1)">查询</a>
    </div>
    <div class="more">
        <input type="text" id="staff-search-gender">
        <input type="text" id="staff-search-marital-status">
        <input type="text" id="staff-search-education">
        <input type="text" id="staff-search-type">
    </div>
</form>


<!--新增面板-->
<form id="staff-add"></form>

<!--修改面板-->
<form id="staff-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('kindeditor/kindeditor-min.js')}}"></script>
<script type="text/javascript" src="{{asset('kindeditor/lang/zh_CN.js')}}"></script>
<script type="text/javascript" src="{{asset('js/staff/staff.js')}}"></script>
@endsection
