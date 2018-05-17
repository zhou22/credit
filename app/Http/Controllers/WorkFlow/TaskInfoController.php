<?php

namespace App\Http\Controllers\WorkFlow;

use Illuminate\Http\Request;
use App\Http\Service\WorkFlow\TaskInfoService;
use App\Http\Service\Warehouse\PurchaseRecordService;

class TaskInfoController extends BaseController
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

    }

    /**
     * [showTaskInfo 显示流程审批页面]
     * @param  [type] $id        [int]
     * @param  [type] $workpersonid [int]
     * @return 模板页面
     */
    public function showTaskInfo($id,$workpersonid){

        $TaskInfo = $this->rels->getTaskInfo($id);

        $TaskInfoSon = $this->rels->getTaskInfoPid($id);//获取子事务流程

        $TaskInfoFather = $this->rels->getTaskInfo($TaskInfo->pid);//获取父流程

        $Tasking = $this->getTasking($id);

        foreach ($Tasking as $key => $value) {
            $TaskingId[] = $value['id'];
        }

        $workPerson = $this->getWorkPerson($TaskingId,"tasking_id");

        $workPersonUser = $this->getWorkPersonId($workpersonid);

        $users = $this->getOneUserInfo($TaskInfo->staff_id);

        $purchaseInfo =   new PurchaseRecordService;
        $purchaseInfo =  $purchaseInfo->getItOne($TaskInfo);
        
        return view('Myinfo.info')
                                ->with('users',$users)
                                ->with('rels',$purchaseInfo)
                                ->with('taskInfo',$TaskInfo)
                                ->with('TaskInfoSon',$TaskInfoSon)
                                ->with('TaskInfoFather',$TaskInfoFather)
                                ->with('Tasking',$Tasking)
                                ->with('workPerson',$workPerson)
                                ->with('workPersonUser',$workPersonUser)
                                ;
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
     * 获取我需要审批的数据
     * @param  Request $request [description]
     * @return ajax的列表数据
     */
    public function getOtherList(Request $request)
    {
        $relsArray = [];

        $rels = $this->rels->getList($request);
        

        $relsTasking = $this->getWorkPerson($request->user()->staff_id,"person_id");

        foreach ($rels['rows'] as $key => $value) {
           foreach ($relsTasking as $k => $v) {
                if ($v['tasking_id'] == $value['tasking_id']) {
                    $value['work_person_id'] = $v['id'];
                    $relsArray[] = $value;
                }
           }
        }

        $rels['rows'] = $relsArray;

        return $rels;
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

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
