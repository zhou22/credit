<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title','科瑞德')</title>
    <link rel="stylesheet" type="text/css" href="{{asset('easyui/themes/bootstrap/easyui.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('easyui/themes/icon.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('css/login.css')}}">
</head>
<body>
<!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>

<!--登录面板-->
<form id="login" class="easyui-dialog">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
            <tr>
                <td class="label" style="width: 83px;">
                    <label for="login-accounts" class="form-label">帐号：</label>
                </td>
                <td class="input">
                    <input type="text" id="login-accounts" class="easyui-textbox">
                </td>
            </tr>
            <tr>
                <td class="label" style="width: 83px;">
                    <label for="login-password" class="form-label">密码：</label>
                </td>
                <td class="input">
                    <input type="password" id="login-password"  class="easyui-textbox">
                </td>
            </tr>
            <tr>
                <td colspan="2" class="register">没有业务帐号？<a href="javascript:void(0)" class="btn-register">「快速申请」</a></td>
            </tr>
        </tbody>
    </table>
</form>

<!--快速申请-->
<form id="register">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
            <tr>
                <td class="label">
                    <label for="register-accounts">帐号：</label>
                </td>
                <td class="input">
                    <input type="text" id="register-accounts" class="easyui-textbox">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="register-password">密码：</label>
                </td>
                <td class="input">
                    <input type="password" id="register-password" class="easyui-textbox">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="register-notpassword">确认密码：</label>
                </td>
                <td class="input">
                    <input type="password" id="register-notpassword" class="easyui-textbox">
                </td>
            </tr>
        </tbody>
    </table>
</form>

<script type="text/javascript" src="{{asset('easyui/jquery.min.js')}}"></script>
<script type="text/javascript" src="{{asset('easyui/jquery.easyui.min.js')}}"></script>
<script type="text/javascript" src="{{asset('easyui/locale/easyui-lang-zh_CN.js')}}"></script>
<script type="text/javascript" src="{{asset('js/login.js')}}"></script>
</body>
</html>