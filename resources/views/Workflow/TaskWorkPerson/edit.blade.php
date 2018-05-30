
<table class="form-table" style="max-width: 900px; display: none;">
    <input type="hidden" id="taskworkperson-edit-id" value="{{$rows['id']}}">
    <tbody>
    <tr>        
        <td class="label">
            <label for="taskworkperson-edit-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkperson-edit-workname" value="{{$rows2['work_id']}}">
        </td>
        <td class="label">
            <label for="taskworkperson-edit-taskWork" class="form-label">具体流程：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkperson-edit-taskWork" value="{{$rows['task_work_id']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskworkperson-edit-person" class="form-label">执行部门/职员：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkperson-edit-person" value="{{$rows['person_id']}}">
            <input type="hidden" id="taskworkperson-edit-person_type" value="{{$rows['person_type']}}">
        </td>
        <td class="label">
            <label for="taskworkperson-edit-position" class="form-label">执行职位：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkperson-edit-position" value="{{$rows['position_id']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskworkperson-edit-execute" class="form-label">执行类型：</label>
        </td>
        <td class="input">
            <input type="text" id="taskworkperson-edit-execute" value="{{$rows['execute']}}" >
        </td>
        <td class="label">

        </td>
        <td class="input">

        </td>
    </tr>
    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="taskworkperson-edit-remark" class="textarea">{{$rows['remarks']}}</textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/workflow/taskworkperson/taskworkpersonEdit.js')}}"></script>
