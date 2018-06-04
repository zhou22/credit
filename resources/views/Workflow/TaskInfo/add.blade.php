
<table class="form-table" style="max-width: 600px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="taskinfo-add-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="taskinfo-add-workName">
        </td>
        <td class="label">
            <label for="taskinfo-add-taskName" class="form-label">当前流程：</label>
        </td>
        <td class="input">
            <input type="text" id="taskinfo-add-taskName">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="taskinfo-add-childWork" class="form-label">子事务：</label>
        </td>
        <td class="input">
            <input type="text" id="taskinfo-add-childWork">
        </td>
        <td class="label">
            <label for="taskinfo-add-taskChildAfter" class="form-label">执行方式：</label>
        </td>
        <td class="input">
            <input type="text" id="taskinfo-add-taskChildAfter">
        </td>
    </tr>
    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="taskinfo-add-remark" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/workflow/taskinfo/taskinfoAdd.js')}}"></script>
