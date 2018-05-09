
<table class="form-table" style="max-width: 400px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="work-edit-name" class="form-label">默认事务：</label>
        </td>
        <td class="input">
            <input type="text" id="work-edit-name" value="{{$rows['name']}}">
        </td>
    </tr>   
    </tbody>
</table>
<input type="hidden" name="work-edit-id" id="work-edit-id" value="{{$rows['id']}}">
<script type="text/javascript" src="{{asset('js/workflow/work/workEdit.js')}}"></script>
