
<table class="form-table" style="max-width: 900px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="taskworkextend-add-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-add-workName">
        </td>
        <td class="label">
            <label for="taskworkextend-add-taskWork" class="form-label">流程事务：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-add-taskWork">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskworkextend-add-field_type" class="form-label">判断字段：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-add-field_type">
        </td>
        <td class="label">
            <label for="taskworkextend-add-judge" class="form-label">判断方式：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-add-judge">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskworkextend-add-next" class="form-label">下一流程：</label>
        </td>
        <td class="input" colspan="3">
            <input type="text" id="taskworkextend-add-next">
        </td>
    </tr>

    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="taskworkextend-add-remark" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/workflow/taskworkextend/taskworkextendAdd.js')}}"></script>
