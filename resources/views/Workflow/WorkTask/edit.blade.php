
<table class="form-table" style="max-width: 900px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="worktask-edit-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-edit-workName" value="{{$rows['work_name']}}">
            <input type="hidden" name="worktask-edit-work_id" id="worktask-edit-work_id" value="{{$rows['work_id']}}">
        </td>
        <td class="label">
            <label for="worktask-edit-taskName" class="form-label">当前流程：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-edit-taskName" value="{{$rows['task_name']}}">
            <input type="hidden" name="worktask-edit-task_id" id="worktask-edit-task_id" value="{{$rows['task_id']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="worktask-edit-lastName" class="form-label">上一项：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-edit-lastName" value="{{$rows['lastName']}}">
            <input type="hidden" id="worktask-edit-last_id" value="{{$rows['last_id']}}">
        </td>
        <td class="label">
            <label for="worktask-edit-nextName" class="form-label">下一项：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-edit-nextName" value="{{$rows['nextName']}}">
            <input type="hidden" id="worktask-edit-next_id" value="{{$rows['next_id']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="worktask-edit-remark" class="textarea">{{$rows['remarks']}}</textarea>
        </td>
    </tr>
    </tbody>
</table>
<input type="hidden" name="worktask-edit-id" id="worktask-edit-id" value="{{$rows['id']}}">
<script type="text/javascript" src="{{asset('js/workflow/worktask/worktaskEdit.js')}}"></script>
