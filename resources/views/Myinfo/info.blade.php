
@extends('master')


@section('content')
<?php   
    //初始化默认总金额
    $allPrice = 0; 
?>
<style type="text/css">
    .itGoods .datagrid-row,.oherGoods .datagrid-row {  
        height: 70px;
    }
    table,td,tr{
        border:1px solid #ccc;
    }
    .input{
        padding-left: 10px !important;
    }
    body{
        overflow: auto;
        margin-bottom: 100px;
    }
    .textGray {
        color: #999;
    }
    a{
        text-decoration:none;
        color:#087ab2;
    }
    a:hover{
        color:#333;
    }
</style>
<form id="purchase-add">
    <table class="form-table" style="max-width: 900px;border:1px solid #ccc;">
        <thead>
            <tr><td colspan="4" style="text-align: center; height: 60px">{{$taskInfo['title']}}</td></tr>
            <input type="hidden" name="purchase-id" id="purchase-id" value="{{$rels['id']}}">
            <input type="hidden" name="tasking-id" id="tasking-id" value="{{$taskInfo['tasking_id']}}">
            <input type="hidden" name="work-person-id" id="work-person-id" value="{{$workPersonUser->id}}">

        </thead>
        <tbody>
        <tr>
            <td class="label">
                <label for="purchase-add-department">申请部门：</label>
            </td>
            <td class="input">
                {{$users['department']}}
            </td>
            <td class="label">
                <label for="purchase-add-name">申请人：</label>
            </td>
            <td class="input">
                {{$users['name']}}
            </td>
        </tr>

        <tr>
            <td class="label">
                <label for="purchase-type">采购类型：</label>
            </td>
            <td class="input">
                {{$rels['type_name']}}
                <input type="hidden" name="purchase-type" id="purchase-type" value="{{$rels['type']}}">
            </td>
            <td class="label">
                <label for="purchase-add-ask_date">申请时间：</label>
            </td>
            <td class="input">
                {{$rels['ask_date']}}
            </td>
        </tr>

        <tr>
            <td class="label">
                <label for="purchase-add-budget">有无预算：</label>
            </td>
            <td class="input">
                {{$rels['budget_name']}}
            </td>
            <td class="label" colspan="2">
            </td>

        </tr>
        
        @if(count($rels['itExtend']) > 0)
        <tr class="itGoods">
            <td class="label" valign="top">
                <label for="purchase-add-product-itList">采购需求：</label>
            </td>
            <td class="input" colspan="3" style="padding: 0px !important;">
                <table id="purchase-product-itList" class="details-table" style="text-align: center; padding: 0px; margin: 0px; width: 100%;">
                    <thead>
                        <tr >
                            <td>设备类型</td>
                            <td style="width:200px;">申请原因</td>
                            <td>数量</td>
                            <td>单位</td>
                            <td style="width:300px;">其他需求</td>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($rels['itExtend'] as $rel)
                        <tr >
                            <td>{{$rel->purchase_type}}</td>
                            <td>{{$rel->cause}}</td>
                            <td>{{$rel->quantity}}</td>
                            <td>{{$rel->unit}}</td>
                            <td>{{$rel->other_need}}</td>
                        </tr>
                        @endforeach
                    </tbody>       
                </table>
            </td>
        </tr>
        @endif

        @if(count($rels['extend']) <= 0)
        <tr class="oherGoods">
            <td class="label" valign="top">
                <label for="purchase-product-list">物品列表：</label>
            </td>
            <td class="input" colspan="3" style="padding: 0px !important;">
                <table id="purchase-product-list" style="width: 100% !important;">
                    <tbody>
                        <tr style="padding: 0px !important;">
                            <td > </td>
                            <td ><input type="text" id="listName" style="width: 100%;"></td>
                            <td ><input type="text" id="listType" style="width: 100%;"></td>
                            <td ><input type="text" id="listVersion" style="width: 100%;"></td>
                            <td ><input type="text" id="listNumber" style="width: 100%;"></td>
                            <td ><input type="text" id="listPrice" style="width: 100%;"></td>
                            <td ><input type="text" id="listReach_date" style="width: 100%;"></td>              
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        @else
        <tr class="oherGoods">
            <td class="label" valign="top">
                <label for="purchase-add-product-list">物品列表：</label>
            </td>
            <td class="input" colspan="3"  style="padding: 0px !important;">
                <table id="purchase-product-list" class="details-table" style="text-align: center; padding: 0px; margin: 0px; width: 100%;">
                    <thead>
                        <tr >
                            <td>品名</td>
                            <td>规格</td>
                            <td>型号</td>
                            <td>数量</td>
                            <td>预估单价</td>
                            <td>到达时间</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="padding: 0px !important;">
                            <td > </td>
                            <td ><input type="text" id="listName" style="width: 100%;"></td>
                            <td ><input type="text" id="listType" style="width: 100%;"></td>
                            <td ><input type="text" id="listVersion" style="width: 100%;"></td>
                            <td ><input type="text" id="listNumber" style="width: 100%;"></td>
                            <td ><input type="text" id="listPrice" style="width: 100%;"></td>
                            <td ><input type="text" id="listReach_date" style="width: 100%;"></td>              
                        </tr>
                        @foreach ($rels['extend'] as $rel)
                        <tr >
                            <td>{{$rel->id}}</td>
                            <td>{{$rel->name}}</td>
                            <td>{{$rel->type}}</td>
                            <td>{{$rel->version}}</td>
                            <td>{{$rel->number}}</td>
                            <td>{{$rel->price}}</td>
                            <td>{{Date('Y-m-d',strtotime($rel->reach_date))}}</td>
                            <?php
                                $allPrice = ($allPrice*100 + $rel->price*100)/100;
                             ?>
                        </tr>
                        @endforeach
                    </tbody>       
                </table>
            </td>
        </tr>
        @endif
        <tr>
            <td class="label">
                <label>合计金额：</label>
            </td>
            <td class="input original_price"  colspan="3">
                <input type="hidden" name="original_price" id="original_price" value="{{$allPrice}}">
                ￥{{number_format($allPrice,2)}}元
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="purchase-add-remarks">备注：</label>
            </td>
            <td class="input" colspan="3" valign="top" style="border-radius: 5px;border:1px solid #ccc; height: 120px; ">
                {{$rels['remarks']}}
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="task-remarks">审批意见：</label>
            </td>
            <td class="input" colspan="3"  style="padding: 0px !important;">
                <textarea id="task-remarks" class="textarea" style="width: 100%; height: 100%; padding: 0;margin: 0; height: 150px;">{{$workPersonUser->contents}}</textarea>
            </td>
        </tr>
        <tr>
            <td class="label" colspan="4" height="60px" style="text-align: center;">
                <a id="btnPass" href="javascript:void(0)" style="margin-left:50px; width: 102px; height: 35px;">通过</a>
                <a id="btnSave" href="javascript:void(0)" style="margin-left:50px; width: 102px; height: 35px;">保存</a>                
                <a id="btnBlack" href="javascript:void(0)" style="margin-left:50px; width: 102px; height: 35px;">驳回</a>
            </td>
        </tr>
        <tr>
            <td colspan="3" style="padding: 0px;" valign="top">
                <div id="task-work-list" style="padding:10px;font-size: 14px !important;">   
                    @foreach ($Tasking as $value)
                    <b>{{$value['task_work_name']}}</b>

                        @foreach ($workPerson as $v)
                            @if($v['status'] != 1 && $v['tasking_id'] == $value['id'])
                            <div style="padding:5px 10px 0px 10px;">
                                <img src="{{asset('img/userX0.gif')}}">{{$v['person_name']}}<span class="textGray">({{$v['updated_at']}})</span>
                            </div>
                            <div style="padding:0px 10px 5px 30px;border-bottom:1px dotted #ddd;"><b>审批意见:</b>{{$v['contents']}} </div>
                            @endif
                        @endforeach
                    @endforeach
               </div>  
            </td>
            <td style="padding: 0px" valign="top">
                <div id="task-father-list" style="padding:5px 15px;font-size: 14px !important;">                    
                    <div style="padding:5px 10px 0px 10px;">
                        <a href="#"><img src="{{asset('img/list.png')}}">{{$TaskInfoFather['title']}}<span class="textGray">({{$TaskInfoFather['created_at']}})</span></a>
                    </div>
                </div>  
                <div id="task-son-list" style="padding:5px 15px;font-size: 14px !important;">    
                    @foreach ($TaskInfoSon as $value)
                        <div style="padding:5px 10px 0px 10px;">
                            <img src="{{asset('img/list.png')}}">{{$value['title']}}<span class="textGray">{{$value['created_at']}}</span>
                        </div>
                    @endforeach
                </div>  
            </td>
        </tr>
        </tbody>
    </table>
</form>
@endsection

@section('javascript')
<script type="text/javascript" src="{{asset('js/myinfo/info.js')}}"></script>
@endsection


