
<table class="form-table" style="max-width: 900px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="worktaskjudge-add-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-add-workName">
        </td>
        <td class="label">
            <label for="worktaskjudge-add-taskWork" class="form-label">流程：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-add-taskWork">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="worktaskjudge-add-field_type" class="form-label">判断字段：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-add-field_type">
        </td>
        <td class="label">
            <label for="worktaskjudge-add-judge" class="form-label">判断方式：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-add-judge">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="worktaskjudge-add-other" class="form-label">子事务：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-add-other">
        </td>
        <td class="label">
            <label for="worktaskjudge-add-execute" class="form-label">执行顺序：</label>
        </td>
        <td class="input">
            <input type="text" id="worktaskjudge-add-execute">
        </td>
    </tr>

    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="worktaskjudge-add-remark" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/workflow/worktaskjudge/worktaskjudgeAdd.js')}}"></script>
