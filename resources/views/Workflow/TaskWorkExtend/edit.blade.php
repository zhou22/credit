
<table class="form-table" style="max-width: 900px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="taskworkextend-edit-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-edit-workName" value="{{$rows->work_name}}">
        </td>
        <td class="label">
            <label for="taskworkextend-edit-taskWork" class="form-label">流程事务：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-edit-taskWork" value="{{$rows->task_work_id}}">
            <input type="hidden" id="taskworkextend-edit-taskWorkName" value="{{$rows->work_task}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskworkextend-edit-field_type" class="form-label">判断字段：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-edit-field_type"  value="{{$rows->field_type}}">
        </td>
        <td class="label">
            <label for="taskworkextend-edit-judge" class="form-label">判断方式：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkextend-edit-judge"  value="{{$rows->judge}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskworkextend-edit-next" class="form-label">下一流程：</label>
        </td>
        <td class="input" colspan="3">
            <input type="text" id="taskworkextend-edit-next"  value="{{$rows->task_work_next_id}}">  
            <input type="hidden" id="taskworkextend-edit-nextName"  value="{{$rows->next_name}}">  
        </td>
    </tr>

    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="taskworkextend-edit-remark" class="textarea">{{$rows->remarks}}</textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/workflow/taskworkextend/taskworkextendEdit.js')}}"></script>
