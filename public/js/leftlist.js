
//内容切换选项卡
$('#tabs').tabs({
    fit : true,
    border : false,
    onContextMenu : function (e, title, index)
    {
        e.preventDefault();

        var menu = $('#menu'),
            _this = this;

        //右击弹出菜单
        menu.menu('show', {
            top : e.pageY,
            left : e.pageX
        });

        //将起始页禁用关闭
        if (index == 0)
        {
            menu.menu('disableItem', $('.closecur')[0]);
        } else {
            menu.menu('enableItem', $('.closecur')[0]);
        }

        //三个关闭方法
        menu.menu({
            onClick : function (item)
            {
                var tablist = $(_this).tabs('tabs');

                switch (item.text)
                {
                    case '关闭' :
                        $(_this).tabs('close', index);
                        break;

                    case '关闭所有' :
                        for (var i = tablist.length; i > 0; i --)
                        {
                            $(_this).tabs('close', i);
                        }
                        break;

                    case '关闭其他所有' :
                        for (var i = tablist.length; i > 0; i --)
                        {
                            if (i != index)
                            {
                                $(_this).tabs('close', i);
                            }
                        }
                        $(_this).tabs('select', 1);
                        break;
                }
            }
        });

    }
});

$("#tree").tree({
    url : "/list",
    method : 'get',
    lines : true,
    animate :true,
    onSelect : function(node)
    {
        if (node.state == 'open') 
        {
            $(this).tree('collapseAll',node.target);
        }else {
            $(this).tree('expandAll',node.target);
        }
        
    },
    onClick : function (node)
    {

        var tabs = $('#tabs');

        //判断是否有连接
        if (node.url) 
        {

            //判断是否打开标签页
            if (tabs.tabs('exists',node.text)) 
            {
                //如果有就选中
                tabs.tabs('select',node.text);
            } else {
                //添加选项卡
                tabs.tabs('add',{
                    title : node.text,
                    closable : true,
                    iconCls : node.iconCls,
                    content:'<iframe name="indextab" scrolling=no class="center-body" src="'+ node.url+'" frameborder="0" style="width:100%;height:100%;"></iframe>',  
                });

            }
            $(".center-body").parent('div').css("overflow","hidden");
        }

    }
});

