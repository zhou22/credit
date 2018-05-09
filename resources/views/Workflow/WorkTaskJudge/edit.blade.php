
<table class="form-table" style="max-width: 900px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="worktaskjudge-edit-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-edit-workName" value="{{$rows['work_name']}}">
            <input type="hidden" name="worktaskjudge-edit-work_id" id="worktaskjudge-edit-work_id" value="{{$rows['work_id']}}">
        </td>
        <td class="label">
            <label for="worktaskjudge-edit-taskName" class="form-label">流程：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-edit-taskName" value="{{$rows['task_name']}}">
            <input type="hidden" name="worktaskjudge-edit-task_id" id="worktaskjudge-edit-task_id" value="{{$rows['task_id']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="worktaskjudge-edit-lastName" class="form-label">上一项：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-edit-lastName" value="{{$rows['lastName']}}">
            <input type="hidden" id="worktaskjudge-edit-last_id" value="{{$rows['last_id']}}">
        </td>
        <td class="label">
            <label for="worktaskjudge-edit-nextName" class="form-label">下一项：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-edit-nextName" value="{{$rows['nextName']}}">
            <input type="hidden" id="worktaskjudge-edit-next_id" value="{{$rows['next_id']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="worktaskjudge-edit-remark" class="textarea">{{$rows['remarks']}}</textarea>
        </td>
    </tr>
    </tbody>
</table>
<input type="hidden" name="worktaskjudge-edit-id" id="worktaskjudge-edit-id" value="{{$rows['id']}}">
<script type="text/javascript" src="{{asset('js/workflow/worktaskjudge/worktaskjudgeEdit.js')}}"></script>
