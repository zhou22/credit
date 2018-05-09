
<table class="form-table" style="max-width: 780px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="assets-add-name" class="form-label">品名：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-add-name">
        </td>
        <td class="label">
            <label for="assets-add-type" class="form-label">类型：</label>
        </td>
        <td class="input">
            <input id="assets-add-type">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="assets-add-user" class="form-label">使用人/部门：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-add-user">
        </td>
        <td class="label">
            <label for="assets-add-secrecy" class="form-label">保密等级：</label>
        </td>
        <td class="input">
            <input id="assets-add-secrecy">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="assets-add-price" class="form-label">采购单价：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-add-price">
        </td>
        <td class="label">
            <label for="assets-add-factory" class="form-label">品牌：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-add-factory">
        </td>            
    </tr>
    <tr>
        <td class="label">
            <label for="assets-add-quantity" class="form-label">数量：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-add-quantity">
        </td>
        <td class="label">
            <label for="assets-add-unit" class="form-label">计量单位：</label>
        </td>
        <td class="input">
            <input type="text" id="assets-add-unit">
        </td>
    </tr>
    <tr>
        <td class="label">
            图片上传:
        </td>
        <td class="input" colspan="3">
            <div style="margin-bottom:20px" id="addImage" >
                <img id="preview_id" src="{{asset('/img/icon-add.png')}}" style="border: 1px solid #B8B9B9; width: 100px; height: 100px; cursor:pointer;" onclick="$('#input_id').click()" />
                <input type="file" name="file" id="input_id" style="display: none;" onchange="return uploadImageToServer('input_id','images', 'preview_id');" />
            </div>
        </td>
    </tr>
    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="assets-add-remark" class="textarea"></textarea>
        </td>
    </tr>
    <tr>
        <td class="label">
            商品详情:
        </td>
        <td class="input" colspan="3">
            <textarea id="assets-add-info" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/assets/assetsAdd.js')}}"></script>
