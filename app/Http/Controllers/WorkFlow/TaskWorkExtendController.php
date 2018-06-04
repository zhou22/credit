<?php

namespace App\Http\Controllers\WorkFlow;

use Illuminate\Http\Request;
use App\Http\Service\WorkFlow\TaskWorkExtendService;
use App\Http\Controllers\WorkFlow\TaskWorkController;

class TaskWorkExtendController extends WorkFlowController
{

    public $rels = null;

    public function __construct()
    {
        $this->rels = new TaskWorkExtendService();
    }

    /**
     * 显示主页面
     *
     * @return index页面
     */
    public function index()
    {
        //显示页面
        return view('WorkFlow.TaskWorkExtend.index');
    }

    /**
     * 获取固定资产数据
     * @param  Request $request [description]
     * @return ajax的列表数据
     */
    public function getList(Request $request)
    {

        $taskWork = new TaskWorkController();

        $taskWorkRels = $taskWork->getAll();

        $taskWorkRels = $taskWork->getListRel($taskWorkRels);


        $rels = $this->rels->getList($request);


        foreach ($rels['rows'] as $value) {
            foreach ($taskWorkRels as $v) {
                if ($value['task_work_id'] == $v['id']) {
                    $value['work_task'] = $v['task_name'];
                    $value['work_name'] = $v['work_name'];                
                }

                if ($value['task_work_next_id'] == $v['id']) {
                    $value['next_name'] = $v['task_name'];                    
                }
            }
        }

        return $rels;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('WorkFlow.TaskWorkExtend.add');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       return $this->rels->add($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $rows =  $this->rels->getOne($id);


        $taskWork = new TaskWorkController();

        $taskWorkRels = $taskWork->getAll();

        $taskWorkRels = $taskWork->getListRel($taskWorkRels);

        foreach ($taskWorkRels as $v) {
            if ($rows['task_work_id'] == $v['id']) {
                $rows['work_task'] = $v['task_name'];
                $rows['work_name'] = $v['work_name'];            
            }

            if ($rows['task_work_next_id'] == $v['id']) {
                $rows['next_name'] = $v['task_name'];                    
            }
        }

        return view('WorkFlow.TaskWorkExtend.edit')->with('rows' ,$rows);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return  $this->rels->update($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return  $this->rels->delete($id);
    }





}
