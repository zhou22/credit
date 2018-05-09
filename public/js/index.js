var details                =   $('#details'),
    btnLogout           =       $('#btn-logout'),
    editor_tool            =        [
                                'source', '|',
                                'formatblock', 'fontname', 'fontsize','|',
                                'forecolor', 'hilitecolor', 'bold','italic', 'underline', 'link',
                                'removeformat', '|',
                                'justifyleft', 'justifycenter', 'justifyright', '|',
                                'insertorderedlist', 'insertunorderedlist','|',
                                'emoticons', 'image','baidumap','|',
                                'fullscreen'
    ];

//非火狐浏览器屏蔽tab-loading
if (navigator.userAgent.indexOf('Firefox') < 0)
{
    $('.tabs-loading').remove();
}

//判断针对火狐浏览器，并判断easyui 渲染完毕后再隐藏遮罩
if (navigator.userAgent.indexOf('Firefox') > 0)
{
    $.parser.onComplete = function ()
    {
        $('.tabs-loading').hide();
    }
}

//登出系统
btnLogout.click(function () {
    $.messager.confirm('操作提醒', '是否退出系统！', function (flag) {
        if (flag)
        {
            $.messager.progress({
                text : '登出系统中...',
            });

            $.ajax({
                url : 'logout',
                type : 'POST',
                data : {
                    _token : $('meta[name="csrf-token"]').attr('content'),
                },
                success : function (data)
                {
                    location.href = '/';
                }
            });
        }
    });
});


//详情弹窗
details.dialog({
        width: 780,
        height: 500,
        iconCls : 'icon-tip',
        closed: true,
        modal : true,
        maximizable : true,
        buttons:[
            {
                text : '关闭',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    details.dialog('close');
                }
            }]
});




function getCombobox (data)
{
    var _options = data.combobox('options');  
    var _data = data.combobox('getData');/* 下拉框所有选项 */  
    var _value = data.combobox('getValue');/* 用户输入的值 */ 
    var _text = data.combobox('getText');/* 用户输入的值 */

    if (_text == '') {
        data.combobox('setValue', '');
        return;
    }

    var _a = false;
    for (var i = 0; i < _data.length; i++) {  
        if (_data[i][_options.textField] == _text) {  
            _a=true;  
            break;  
        }
    }

    if(!_a){
        $.messager.alert('操作提示', '必须选择,直接输入无效!', 'warning');
        data.combobox('setValue', '');    
    }  

    var _b = false;/* 标识是否在下拉列表中找到了用户输入的字符 */ 
    for (var i = 0; i < _data.length; i++) {  
        if (_data[i][_options.valueField] == _value) {  
            _b=true;  
            break;
        }
    }

    if(!_b){
        $.messager.alert('操作提示', '必须选择,直接输入无效!', 'warning');
        data.combobox('setValue', '');    
    }  
}


function getCombotree (data)
{
    setTimeout(function(){
        var _value = data.combotree('getValue');/* 用户输入的值 */
        var _text = data.combotree('getText');/* 用户输入的值 */
        if (_value != '' && data.combotree('tree').tree('getSelected').text == _text) {
            return;           
        }

        if (_text == '') {
            data.combotree('setText','');
            data.combotree('setValue','');
            return;
        }
        $.messager.alert('操作提示', '必须选择,直接输入无效!', 'warning');
        data.combotree('setValue','');
        
    },50);    

    
}