
<!--编辑面板-->
<table class="form-table" style="max-width: 780px;display: none;">
    <input type="hidden" id="staff-edit-id" value="{{$rows['id']}}">
    <tbody>
    <tr>
        <td class="label">
            <label for="staff-edit-name" class="form-label">姓名：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-name" value="{{$rows['name']}}" >
        </td>
        <td class="label">
            <label for="staff-edit-gender" class="form-label">性别：</label>
        </td>
        <td class="input">
            <a href="javascript:void(0)" id="staff-edit-gender-1" name="staff_edit_gender">男</a>
            <a href="javascript:void(0)" id="staff-edit-gender-2" name="staff_edit_gender">女 </a>
            <input type="hidden" id="staff-edit-gender" value="{{$rows['gender']}}">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-edit-number" class="form-label">工号：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-number" value="{{$rows['number']}}"  >
        </td>
        <td class="label">
            <label for="staff-edit-department" class="form-label">部门：</label>
        </td>
        <td class="input">
            <input id="staff-edit-department" value="{{$rows['department_id']}}" >
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-edit-id-card" class="form-label">身份证：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-id-card" value="{{$rows['id_card']}}" >
        </td>
        <td class="label">
            <label for="staff-edit-position" class="form-label">职位：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-position" value="{{$rows['position_id']}}"  >
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-edit-tel" class="form-label">移动电话：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-tel"  value="{{$rows['tel']}}" >
        </td>
        <td class="label">
            <label for="staff-edit-type" class="form-label">员工类型：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-type" value="{{$rows['type']}}" >
        </td>            
    </tr>
    <tr>
        <td class="label">
            <label for="staff-edit-nation" class="form-label">民族：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-nation" value="{{$rows['nation']}}" >
        </td>
        <td class="label">
            <label for="staff-edit-marital-status" class="form-label">婚姻状况：</label>
        </td>
        <td class="input">
            <input id="staff-edit-marital-status" value="{{$rows['marital_status']}}" >
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-edit-education" class="form-label">学历：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-education" value="{{$rows['education']}}" >
        </td>
        <td class="label">
            <label for="staff-edit-entry-date" class="form-label">入职日期：</label>
        </td>
        <td class="input">
            <input id="staff-edit-entry-date" value="{{$rows['entry_date']}}" >
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-edit-entry-status" class="form-label">入职状态：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-entry-status" value="{{$rows['entry_status']}}" >
        </td>
        <td class="label">
            <label for="staff-edit-specialty" class="form-label">专业：</label>
        </td>
        <td class="input">
            <input id="staff-edit-specialty" value="{{$rows['specialty']}}" >
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-edit-politics-status" class="form-label">政治面貌：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-politics-status" value="{{$rows['politics_status']}}" >
        </td>
        <td class="label">
            <label for="staff-edit-graduate-colleges" class="form-label">毕业院校：</label>
        </td>
        <td class="input">
            <input id="staff-edit-graduate-colleges" value="{{$rows['graduate_colleges']}}" >
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-edit-registered" class="form-label">户口：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-registered" value="{{$rows['registered']}}" >
        </td>
        <td class="label">
            <label for="staff-edit-graduate-date" class="form-label">毕业时间：</label>
        </td>
        <td class="input">
            <input id="staff-edit-graduate-date" value="{{$rows['graduate_date'] != '' ? date('Y-m-d',$rows['graduate_date']) : ''}}" >
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="staff-edit-registered-address" class="form-label">户口所在地：</label>
        </td>
        <td class="input">
            <input type="text" id="staff-edit-registered-address" value="{{$rows['registered_address']}}" >
        </td>
        <td class="label">
            <label for="staff-edit-health" class="form-label">健康状况：</label>
        </td>
        <td class="input">
            <input id="staff-edit-health" value="{{$rows['health']}}" >
        </td>
    </tr>
    <tr>
        <td class="label">
            个人简介：
        </td>
        <td class="input" colspan="3">
            <textarea id="staff-edit-intro" class="textarea" placeholder="255字内简单介绍一下自己！">{{$rows['intro']}}</textarea>
        </td>
    </tr>
    <tr>
        <td class="label">
            详情：
        </td>
        <td class="input" colspan="3">
            <textarea id="staff-edit-details" class="textarea">{{$rows['details']}}</textarea>
        </td>
    </tr>
    </tbody>
</table>

<script type="text/javascript" src="{{asset('js/staff/staffEdit.js')}}"></script>