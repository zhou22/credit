
<table class="form-table" style="max-width: 780px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="assets-edit-name" class="form-label">品名：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-edit-name" value="{{$rows['name']}}">
        </td>
        <td class="label">
            <label for="assets-edit-type" class="form-label">类型：</label>
        </td>
        <td class="input">
            {{$rows['type']}}
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="assets-edit-user" class="form-label">使用人/部门：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-edit-user" value="{{$rows['users']}}">
        </td>
        <td class="label">
            <label for="assets-edit-secrecy" class="form-label">保密等级：</label>
        </td>
        <td class="input">
            <input id="assets-edit-secrecy" value="{{$rows['secrecy']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="assets-edit-price" class="form-label">采购单价：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-edit-price" value="{{$rows['price']}}">
        </td>
        <td class="label">
            <label for="assets-edit-factory" class="form-label">品牌：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-edit-factory" value="{{$rows['factory']}}">
        </td>            
    </tr>
    <tr>
        <td class="label">
            <label for="assets-edit-quantity" class="form-label">数量：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-edit-quantity" value="{{$rows['quantity']}}">
        </td>
        <td class="label">
            <label for="assets-edit-unit" class="form-label">计量单位：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-edit-unit" value="{{$rows['unit']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="assets-edit-remark" class="textarea">{{$rows['remarks']}}</textarea>
        </td>
    </tr>
    <tr>
        <td class="label">
            商品详情:
        </td>
        <td class="input" colspan="3">
            <textarea id="assets-edit-info" class="textarea">{{$rowsExtend['info']}}</textarea>
        </td>
    </tr>
    </tbody>
</table>
<input type="hidden" name="assets-edit-user_type" id="assets-edit-user_type" value="{{$rows['user_type']}}">
<input type="hidden" name="assets-edit-user_id" id="assets-edit-user_id" value="{{$rows['user_id']}}">
<input type="hidden" name="assets-edit-id" id="assets-edit-id" value="{{$rows['id']}}">


<script type="text/javascript" src="{{asset('js/warehouse/assets/assetsEdit.js')}}"></script>
