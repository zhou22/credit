<?php

namespace App\Http\Controllers\WorkFlow;

use Illuminate\Http\Request;
use App\Http\Service\WorkFlow\TaskInfoService;

class TaskInfoController extends WorkFlowController
{

    public $rels = null;

    public function __construct()
    {
        $this->rels = new TaskInfoService();
    }

    /**
     * 显示主页面
     *
     * @return index页面
     */
    public function index()
    {
        return view("WorkFlow.TaskInfo.index");
    }

    /**
     * 获取我的所有审批
     * @param  Request $request [description]
     * @return ajax的列表数据
     */
    public function getList(Request $request)
    {
        return $this->rels->getList($request);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("WorkFlow.TaskInfo.add");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

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

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

    }





}
