
<table class="form-table" style="max-width: 900px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="worktask-add-workName" class="form-label">事务：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-add-workName">
        </td>
        <td class="label">
            <label for="worktask-add-lastId" class="form-label">上一项：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-add-lastId">
        </td>
        <td class="label">
            <label for="worktask-add-taskName" class="form-label">流程：</label>
        </td>
        <td class="input">
            <input type="text" id="worktask-add-taskName">
        </td>
    </tr>
    <tr>
        <td class="label">
            备注:
        </td>
        <td class="input" colspan="5">
            <textarea id="worktask-add-remark" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/workflow/worktask/worktaskAdd.js')}}"></script>
