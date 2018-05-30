<?php

namespace App\Http\Controllers\WorkFlow;

use Illuminate\Http\Request;
use App\Http\Service\WorkFlow\TaskWorkPersonService;
use App\Http\Service\WorkFlow\TaskWorkService;

class TaskWorkPersonController extends BaseController
{

    public $rels = null;

    public function __construct()
    {
        $this->rels = new TaskWorkPersonService();
    }

    /**
     * 显示主页面
     *
     * @return index页面
     */
    public function index()
    {
        //显示页面
        return view('WorkFlow.TaskWorkPerson.index');
    }

    /**
     * @param  Request $request [description]
     * @return ajax的列表数据
     */
    public function getList(Request $request)
    {
        return $this->rels->getList($request);
    }



    //格式化列表数据
    public function getListFormat(Request $request)
    {
        return $this->rels->getListFormat($request);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('WorkFlow.TaskWorkPerson.add');
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
        $rels2 = new TaskWorkService();
        $rows =  $this->rels->getOne($id);
        $rows2 = $rels2->getOne($rows['task_work_id']);
        return view('WorkFlow.TaskWorkPerson.edit')->with('rows' ,$rows)->with('rows2' ,$rows2);
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
