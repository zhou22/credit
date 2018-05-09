@extends('master')


@section('content')


<!-- 数据列表 -->
<table id="position">
    
</table>


<!-- 工具条 -->
<form id="positiontool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" onclick="positionOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-deleteB" onclick="positionOpt.deletesPos()">批量删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-redo" onclick="positionOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-reload" onclick="positionOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" onclick="positionOpt.reset()">重置查询</a>
    </div>

    <div class="tool-search">
        <label for="position-search-keywords">关键字：</label>
        <input type="text" id="position-search-keywords">
        <input type="text" id="position-search-date-type">
        <input type="text" id="position-search-date-from">
        <label for="position-search-date-to">-</label>
        <input type="text" id="position-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="positionOpt.search(1)">查询</a>
    </div>
</form>


<!-- 新增面板 -->
<form id="position-add">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
            <tr>
                <td class="label">
                    <label for="position-add-name" class="form-label">职位名称：</label>
                </td>
                <td class="input">
                    <input type="text" id="position-add-name">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="position-add-status" class="form-label">职位状态：</label>
                </td>
                <td >
                    <select id="position-add-status" class="easyui-combobox" name="position-add-status" style="width:220px;height: 32px;">  
                        <option value="0">请选择</option>    
                        <option value="1">激活</option>   
                        <option value="2">冻结</option>   
                    </select>
                </td>
            </tr>
        </tbody>

    </table>
</form>




<!-- 修改面板 -->
<form id="position-edit">
    <input type="hidden" id="position-edit-id" value="0">
    <table class="form-table" style="max-width: 420px;">
        <tbody>

            <tr>
                <td class="label">
                    <label for="position-edit-name" class="form-label">职位名称：</label>
                </td>
                <td class="input">
                    <input type="text" id="position-edit-name">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="position-edit-status" class="form-label">职位状态：</label>
                </td>
                <td >
                    <select id="position-edit-status" class="easyui-combobox" name="position-edit-status" style="width:220px;height: 32px;">  
                        <option value="0">请选择</option>    
                        <option value="1">激活</option>   
                        <option value="2">停用</option>   
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
</form>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/position.js')}}"></script>
@endsection
