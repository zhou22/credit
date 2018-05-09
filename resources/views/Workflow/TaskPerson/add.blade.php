
<table class="form-table" style="max-width: 900px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="taskperson-add-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="taskperson-add-workname">
        </td>
        <td class="label">
            <label for="taskperson-add-taskWork" class="form-label">具体流程：</label>
        </td>
        <td class="input">
            <input type="text" id="taskperson-add-taskwork">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskperson-add-person" class="form-label">执行部门/职员：</label>
        </td>
        <td class="input">
            <input type="text" id="taskperson-add-person">
        </td>
        <td class="label">
            <label for="taskperson-add-position" class="form-label">执行职位：</label>
        </td>
        <td class="input">
            <input type="text" id="taskperson-add-position">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskperson-add-execute" class="form-label">执行类型：</label>
        </td>
        <td class="input">
            <input type="text" id="taskperson-add-execute">
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
            <textarea id="taskperson-add-remark" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/workflow/taskperson/taskpersonAdd.js')}}"></script>
