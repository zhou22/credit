
<table class="form-table" style="max-width: 900px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="taskworkextend-edit-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-edit-workName" value="{{$rows['work_name']}}">
            <input type="hidden" name="taskworkextend-edit-work_id" id="taskworkextend-edit-work_id" value="{{$rows['work_id']}}">
        </td>
        <td class="label">
            <label for="taskworkextend-edit-taskName" class="form-label">流程：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-edit-taskName" value="{{$rows['task_name']}}">
            <input type="hidden" name="taskworkextend-edit-task_id" id="taskworkextend-edit-task_id" value="{{$rows['task_id']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskworkextend-edit-lastName" class="form-label">上一项：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-edit-lastName" value="{{$rows['lastName']}}">
            <input type="hidden" id="taskworkextend-edit-last_id" value="{{$rows['last_id']}}">
        </td>
        <td class="label">
            <label for="taskworkextend-edit-nextName" class="form-label">下一项：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-edit-nextName" value="{{$rows['nextName']}}">
            <input type="hidden" id="taskworkextend-edit-next_id" value="{{$rows['next_id']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="taskworkextend-edit-remark" class="textarea">{{$rows['remarks']}}</textarea>
        </td>
    </tr>
    </tbody>
</table>
<input type="hidden" name="taskworkextend-edit-id" id="taskworkextend-edit-id" value="{{$rows['id']}}">
<script type="text/javascript" src="{{asset('js/workflow/taskworkextend/taskworkextendEdit.js')}}"></script>
