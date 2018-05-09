<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title','科瑞德')</title>
    <link rel="stylesheet" type="text/css" href="{{asset('easyui/themes/bootstrap/easyui.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('easyui/themes/icon.css')}}">
</head>
<body>

<div id="dd" class="easyui-dialog" title="My Dialog" style="width:400px;height:200px;"   
        data-options="iconCls:'icon-save',resizable:true,modal:true">   
    Dialog Content.    
</div>  


<!-- 新增面板 -->
<form id="user-add" class="easyui-dialog" style="width:400px;height:200px;" data-options="iconCls:'icon-save',resizable:true,modal:true,closed:false,modal:true,maximizable:true,buttons:[{
        text : '取消',
        size : 'large',
        iconCls : 'icon-cross'
    }]"> 
    <input type="hidden" id="user-add-id" value="0">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
            <tr>
                <td class="label">
                    <label for="user-add-P" class="form-label">上级部门：</label>
                </td>
                <td class="input">
                    <input type="text" id="user-add-P" value="无" >
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="user-add-name" class="form-label">部门名称：</label>
                </td>
                <td class="input">
                    <input type="text" id="user-add-name">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="user-add-status" class="form-label">部门状态：</label>
                </td>
                <td >
                    <select id="user-add-status" class="easyui-combobox" name="user-add-status" style="width:220px;height: 32px;">  
                        <option value="0">请选择</option>    
                        <option value="1">激活</option>   
                        <option value="2">停用</option>   
                    </select>
                </td>
            </tr>
        </tbody>

    </table>
    {{ csrf_field() }}
</form>


<script type="text/javascript" src="{{asset('easyui/jquery.min.js')}}"></script>
<script type="text/javascript" src="{{asset('easyui/jquery.easyui.min.js')}}"></script>
<script type="text/javascript" src="{{asset('easyui/locale/easyui-lang-zh_CN.js')}}"></script>
</body>
</html>
