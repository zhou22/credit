
<table class="form-table" style="max-width: 400px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="work-edit-pid" class="form-label">所属目录：</label>
        </td>
        <td class="input">
            <input type="text" id="work-edit-pid" value="{{$rows['pid']}}">
        </td>
    </tr> 
    <tr>
        <td class="label">
            <label for="work-edit-name" class="form-label">名称：</label>
        </td>
        <td class="input">
            <input type="text" id="work-edit-name" value="{{$rows['name']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="work-edit-category" class="form-label">类型：</label>
        </td>
        <td class="input">
            <input type="text" id="work-edit-category" value="{{$rows['category']}}">
        </td>
    </tr>
    </tbody>
</table>
<input type="hidden" name="work-edit-id" id="work-edit-id" value="{{$rows['id']}}">
<script type="text/javascript" src="{{asset('js/workflow/work/workEdit.js')}}"></script>
