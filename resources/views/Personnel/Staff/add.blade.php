
<table class="form-table" style="max-width: 780px; display: none;">
    <tbody>
    <tr>
        <td class="label">
            <label for="staff-add-name" class="form-label">姓名：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-name">
        </td>
        <td class="label">
            <label for="staff-add-gender" class="form-label">性别：</label>
        </td>
        <td class="input">
            <a href="javascript:void(0)" id="staff-add-gender-1" name="staff_add_gender">男</a>
            <a href="javascript:void(0)" id="staff-add-gender-2" name="staff_add_gender">女 </a>
            <input type="hidden" id="staff-add-gender" value="男">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-add-number" class="form-label">工号：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-number">
        </td>
        <td class="label">
            <label for="staff-add-department" class="form-label">部门：</label>
        </td>
        <td class="input">
            <input id="staff-add-department">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-add-id-card" class="form-label">身份证：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-id-card">
        </td>
        <td class="label">
            <label for="staff-add-position" class="form-label">职位：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-position">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-add-tel" class="form-label">移动电话：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-tel">
        </td>
        <td class="label">
            <label for="staff-add-type" class="form-label">员工类型：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-type">
        </td>            
    </tr>
    <tr>
        <td class="label">
            <label for="staff-add-nation" class="form-label">民族：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-nation">
        </td>
        <td class="label">
            <label for="staff-add-marital-status" class="form-label">婚姻状况：</label>
        </td>
        <td class="input">
            <input id="staff-add-marital-status">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-add-education" class="form-label">学历：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-education">
        </td>
        <td class="label">
            <label for="staff-add-entry-date" class="form-label">入职日期：</label>
        </td>
        <td class="input">
            <input id="staff-add-entry-date">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-add-entry-status" class="form-label">入职状态：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-entry-status">
        </td>
        <td class="label">
            <label for="staff-add-specialty" class="form-label">专业：</label>
        </td>
        <td class="input">
            <input id="staff-add-specialty">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-add-politics-status" class="form-label">政治面貌：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-politics-status">
        </td>
        <td class="label">
            <label for="staff-add-graduate-colleges" class="form-label">毕业院校：</label>
        </td>
        <td class="input">
            <input id="staff-add-graduate-colleges">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-add-registered" class="form-label">户口：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-registered">
        </td>
        <td class="label">
            <label for="staff-add-graduate-date" class="form-label">毕业时间：</label>
        </td>
        <td class="input">
            <input id="staff-add-graduate-date">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-add-registered-address" class="form-label">户口所在地：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-add-registered-address">
        </td>
        <td class="label">
            <label for="staff-add-health" class="form-label">健康状况：</label>
        </td>
        <td class="input">
            <input id="staff-add-health">
        </td>
    </tr>
    <tr>
        <td class="label">
            个人简介：
        </td>
        <td class="input" colspan="3">
            <textarea id="staff-add-intro" class="textarea" placeholder="255字内简单介绍一下自己！"></textarea>
        </td>
    </tr>
    <tr>
        <td class="label">
            详情：
        </td>
        <td class="input" colspan="3">
            <textarea id="staff-add-details" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/staff/staffAdd.js')}}"></script>