@extends('master')


@section('links')
<link rel="stylesheet" type="text/css" href="{{asset('css/myinfo.css')}}">
@endsection

@section('content')


<!-- 工具条 -->
<div id="worktool" style="padding: 5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)"  plain="true" class="easyui-linkbutton" style="height: 16px; width: 40px;font-size: 14px;" onclick="workOpt.all()">更多</a>
    </div>
</div>


    <div id="p" class="myinfo" style="padding:10px;">    
    </div>
    <div id="p2" class="myinfo" style="padding:10px;">    
    </div>
    <div id="p3" class="myinfo" style="padding:10px;">    
    </div> 
    <div id="p4" class="myinfo" style="padding:10px;">    
    </div>
    <div id="p5" class="myinfo" style="padding:10px;">    
    </div>
    <div id="p6" class="myinfo" style="padding:10px;">    
    </div>




@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/myinfo/myinfo.js')}}"></script>
@endsection
