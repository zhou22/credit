<?php 

namespace App\Tools;

class Tool
{
    //无限级递归
    static public function getTree($rels,$relsV = 0)
    {  
        $tree = array();                                //每次都声明一个新数组用来放子元素  
        foreach($rels as $v)
        {  
            if($v['pid'] == $relsV)
            {                      
                $v['children'] = self::getTree($rels,$v['id']); //递归获取子记录  

                if($v['children'] == null)
                {  
                    unset($v['children']);             //如果子元素为空则unset()进行删除，说明已经到该分支的最后一个元素了（可选）  
                }  
                $tree[] = $v;                           //将记录存入新数组  
            }  
        }  
        return $tree;                                  //返回新数组  
    } 


    //排序部门和人员
    static public function getTreeTwo($rels,$rels2)
    {
        $tree = array();
        $rels2 = self::formatData($rels2);
        $rels = self::formatData($rels);

        foreach($rels as $v)
        {  
            foreach ($rels2 as $value) {
                if ($v['text'] == $value['department']) {
                    $value['pid'] = $v['id'];
                    $value['user_type'] = '职员'; 
                    $tree[] = $value;
                }

            }
            $v['user_type'] = '部门';       
            $tree[] = $v;
        }
        return $tree; 
    }


    static public function formatData($data)
    {
        return json_decode(json_encode($data,JSON_UNESCAPED_UNICODE),true);
    }
      

//生产日期编号
    static public function dateSn($data = '')
    {
        $sn = date("YmdHis",time());
        return $data.$sn;
    }


}


