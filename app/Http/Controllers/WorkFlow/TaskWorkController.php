<?php

namespace App\Http\Controllers\WorkFlow;

use Illuminate\Http\Request;
use App\Http\Service\WorkFlow\TaskService;
use App\Http\Service\WorkFlow\WorkService;
use App\Http\Service\WorkFlow\TaskWorkService;

class TaskWorkController extends BaseController
{

    public $rels = null;

    public function __construct()
    {
        $this->rels = new TaskWorkService();
    }

    /**
     * 显示主页面
     *
     * @return index页面
     */
    public function index()
    {
        //显示页面
        return view('WorkFlow.WorkTask.index');
    }

    /**
     * 获取固定资产数据
     * @param  Request $request [description]
     * @return ajax的列表数据
     */
    public function getList(Request $request)
    {
        $rels = $this->rels->getList($request);

        $task = new TaskService();
        $work = new WorkService();

        $taskRels = $task->getAll();

        $workRels = $work->getAll();



        foreach ($rels['rows'] as $value) 
        {            
            foreach ($taskRels as $v) 
            {
                if ($v['id'] == $value['task_id']) {
                    $value['task_name'] = $v['name'];
                }
            }

            foreach ($workRels as $v2) 
            {
                if ($v2['id'] == $value['work_id']) {
                    $value['work_name'] = $v2['name'];                    
                }

                if ($v2['id'] == $value['child_work_id']) {
                    $value['child_work_name'] = $v2['name'];                    
                }
            }

            if (empty($value['child_work_id'])) {
                $value['child_work_name'] = '无';                    
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
        return view('WorkFlow.WorkTask.add');
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

        $task = new TaskService();
        $work = new WorkService();

        $taskRels = $task->getOne($rows['task_id']);

        $workRels = $work->getOne($rows['work_id']);

        $childWorkName = $work->getOne($rows['child_work_id']);

        $rows['work_name'] = $taskRels['name'];
        $rows['task_name'] = $workRels['name'];
        $rows['child_work_name'] = $childWorkName['name'];

        return view('WorkFlow.WorkTask.edit')->with('rows' ,$rows);
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
