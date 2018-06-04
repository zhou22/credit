
<style type="text/css">
    .datagrid-row,.oherGoods .datagrid-row {  
        height: 70px;
    }
</style>

<table class="form-table" style="max-width: 900px;">
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
            <label for="purchase-add-type">采购类型：</label>
        </td>
        <td class="input">
            <input type="text" id="purchase-add-type">
        </td>
        <td class="label">
            <label for="purchase-add-ask_date">申请时间：</label>
        </td>
        <td class="input">
            <input type="text" id="purchase-add-ask_date" value="{{Date('Y-m-d H:i:s',time())}}">
        </td>
    </tr>

    <tr>
        <td class="label">
            <label for="purchase-add-budget">有无预算：</label>
        </td>
        <td class="input">
            <input type="text" id="purchase-add-budget">
        </td>
        <td class="label" colspan="2">
        </td>
    </tr>

    <tr class="oherGoods">
        <td class="label" valign="top">
            <label for="purchase-product-list">物品列表：</label>
        </td>
        <td class="input" colspan="3">
            <table id="purchase-product-list">
                <tbody>
                    <tr>
                        <td> </td>
                        <td><input type="text" id="listName" style="width: 100%;"></td>
                        <td><input type="text" id="listType" style="width: 100%;"></td>
                        <td><input type="text" id="listVersion" style="width: 100%;"></td>
                        <td><input type="text" id="listNumber" style="width: 100%;"></td>
                        <td><input type="text" id="listPrice" style="width: 100%;"></td>
                        <td><input type="text" id="listReach_date" style="width: 100%;"></td>              
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>

    <tr>
        <td class="label">
            <label>合计金额：</label>
        </td>
        <td class="input original_price"  colspan="3">
            ￥0.00
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="purchase-add-remarks">备注：</label>
        </td>
        <td class="input" colspan="3">
            <textarea id="purchase-add-remarks" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/warehouse/purchase/purchaseAdd.js')}}"></script>
