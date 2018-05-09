<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title','科瑞德')</title>
    <link rel="stylesheet" type="text/css" href="{{asset('easyui/themes/bootstrap/easyui.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('easyui/themes/icon.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('css/index.css')}}">
    @yield('links')
</head>
<body @yield('body')>
<!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>

@yield('content')

<!--details容器-->
<div id="details"></div>


<script type="text/javascript" src="{{asset('easyui/jquery.min.js')}}"></script>
<script type="text/javascript" src="{{asset('easyui/jquery.easyui.min.js')}}"></script>
<script type="text/javascript" src="{{asset('easyui/locale/easyui-lang-zh_CN.js')}}"></script>
<script type="text/javascript" src="{{asset('js/index.js')}}"></script>
@yield('javascript')
</body>
</html>
