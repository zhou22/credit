@extends('master')


@section('content')
<!-- 数据列表 -->
<table id="department">
    
</table>


<!-- 工具条 -->
<form id="departmenttool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" onclick="departmentOpt.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-deleteB" onclick="departmentOpt.deletesDep()">批量删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-redo" onclick="departmentOpt.redo()">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-reload" onclick="departmentOpt.reload()">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" onclick="departmentOpt.reset()">重置查询</a>
    </div>

    <div class="tool-search">
        <label for="department-search-keywords">关键字：</label>
        <input type="text" id="department-search-keywords">
        <input type="text" id="department-search-date-type">
        <input type="text" id="department-search-date-from">
        <label for="department-search-date-to">-</label>
        <input type="text" id="department-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="departmentOpt.search(1)">查询</a>
    </div>
</form>


<!-- 新增面板 -->
<form id="department-add">
    <input type="hidden" id="department-add-id-p" value="1">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
            <tr>
                <td class="label">
                    <label for="department-add-id-p" class="form-label">上级部门：</label>
                </td>
                <td class="input">
                    <input type="text" id="department-add-name-p" value="科瑞德" >
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="department-add-name" class="form-label">部门名称：</label>
                </td>
                <td class="input">
                    <input type="text" id="department-add-name">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="department-add-status" class="form-label">部门状态：</label>
                </td>
                <td >
                    <select id="department-add-status" class="easyui-combobox" name="department-add-status" style="width:220px;height: 32px;">  
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
<form id="department-edit">
    <input type="hidden" id="department-edit-id-p" value="0">
    <input type="hidden" id="department-edit-id" value="0">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
            <tr>
                <td class="label">
                    <label for="department-edit-name-p" class="form-label">上级部门：</label>
                </td>
                <td class="input">
                    <input type="text" id="department-edit-name-p" value="无" >
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="department-edit-name" class="form-label">部门名称：</label>
                </td>
                <td class="input">
                    <input type="text" id="department-edit-name">
                </td>
            </tr>

            <tr>
                <td class="label">
                    <label for="department-edit-status" class="form-label">部门状态：</label>
                </td>
                <td >
                    <select id="department-edit-status" class="easyui-combobox" name="department-edit-status" style="width:220px;height: 32px;">  
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
<script type="text/javascript" src="{{asset('js/department.js')}}"></script>
@endsection
