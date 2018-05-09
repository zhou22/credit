
@extends('master')


@section('body')
    class="easyui-layout"
@endsection

@section('content')

<!-- 软件头部 -->
<div data-options="region:'north',split:true,border:false" class="layout-north">
    <div class="logo">
        <img src="{{asset('img/logo.png')}}" alt="科瑞德管理系统">
    </div>
    <div class="info">
        您好，{{$users['name']}}！
        <a href="javascript:void(0)" class="easyui-linkbutton" id="btn-edit" iconCls="icon-edit">修改密码</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" id="btn-logout" iconCls="icon-remove">退出系统</a>
    </div>

</div>


<!-- 软件左侧栏 -->
<div data-options="region:'west',split:true,title:'导航',iconCls:'icon-list'" class="layout-west">
    <div id="tree">
        
    </div>
</div>

<!-- 软件主体部分 -->
<div data-options="region:'center' " class="layout-center">
    <div id="tabs">
        <div title="首页" iconCls="icon-house" >            
            <iframe name="indextab" scrolling=no class="center-body" src="{{asset('/myinfo')}}" frameborder="0" style="width:100%;height:100%;"></iframe>
        </div>
    </div>
</div>


<!-- 软件底部 -->
<div data-options="region:'south',split:true " class="layout-south">
    四川科瑞德制药股份有限公司 互联网药品信息服务资格证书证书编号:(蜀) -非经营性-2011-009
</div>


<!-- 左键菜单 -->
<div id="menu" class="easyui-menu">
    <div class="closecur">关闭</div>
    <div class="closeall">关闭所有</div>
    <div class="closeother" iconCls="icon-cross">关闭其他所有</div>

</div>

@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/leftlist.js')}}"></script>
@endsection