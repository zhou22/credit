
<table class="form-table" style="max-width: 600px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="worktask-add-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-add-workName">
        </td>
        <td class="label">
            <label for="worktask-add-taskName" class="form-label">当前流程：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-add-taskName">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="worktask-add-childWork" class="form-label">子事务：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-add-childWork">
        </td>
        <td class="label">
            <label for="worktask-add-taskChildAfter" class="form-label">执行方式：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-add-taskChildAfter">
        </td>
    </tr>
    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="3">
            <textarea id="worktask-add-remark" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/workflow/worktask/worktaskAdd.js')}}"></script>
