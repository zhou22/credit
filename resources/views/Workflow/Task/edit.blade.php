
<table class="form-table" style="max-width: 400px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="task-edit-name" class="form-label">默认流程：</label>
        </td>
        <td class="input">
            <input type="text" id="task-edit-name" value="{{$rows['name']}}">
        </td>
    </tr>   
    </tbody>
</table>
<input type="hidden" name="task-edit-id" id="task-edit-id" value="{{$rows['id']}}">
<script type="text/javascript" src="{{asset('js/workflow/task/taskEdit.js')}}"></script>
