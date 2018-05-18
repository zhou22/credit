
<table class="form-table" style="max-width: 900px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="worktask-edit-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-edit-workName" value="{{$rows['work_name']}}">
            <input type="hidden" id="worktask-edit-workId" value="{{$rows['work_id']}}">
        </td>
        <td class="label">
            <label for="worktask-edit-taskName" class="form-label">当前流程：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-edit-taskName" value="{{$rows['task_name']}}">
            <input type="hidden" id="worktask-edit-taskId" value="{{$rows['task_id']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="worktask-edit-childWorkName" class="form-label">子事务：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-edit-childWorkName" value="{{$rows['child_work_name']}}">
            <input type="hidden" id="worktask-edit-childWorkId" value="{{$rows['child_work_id']}}">
        </td>
        <td class="label">
            <label for="worktask-edit-taskChildAfter" class="form-label">执行方式：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-edit-taskChildAfter" value="{{$rows['child_after']}}">
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
