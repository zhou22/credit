@extends('master')


@section('content')

<!--数据列表-->
<table id="assets"></table>

<!--工具条-->
<form id="assets-tool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="assetsOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="assetsOpt.edit()">编辑</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="assetsOpt.remove()">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="assetsOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="assetsOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="assetsOpt.reset()">重置查询</a>
    </div>
    <div class="tool-search">
        <label for="assets-search-keywords">关键字：</label>
        <input type="text" id="assets-search-keywords">
        <input type="text" id="assets-search-date-type">
        <input type="text" id="assets-search-date-from">
        <label for="assets-search-date-to">-</label>
        <input type="text" id="assets-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="assetsOpt.search(1)">查询</a>
    </div>
</form>


<!--新增面板-->
<form id="assets-add"></form>

<!--修改面板-->
<form id="assets-edit"></form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('kindeditor/kindeditor-min.js')}}"></script>
<script type="text/javascript" src="{{asset('kindeditor/lang/zh_CN.js')}}"></script>
<script type="text/javascript" src="{{asset('js/warehouse/assets/assets.js')}}"></script>
@endsection
