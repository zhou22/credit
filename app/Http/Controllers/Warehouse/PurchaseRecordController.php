<?php

namespace App\Http\Controllers\Warehouse;

use Illuminate\Http\Request;

use App\Tools\Tool;
use App\Http\Controllers\BaseController;
use App\Http\Service\Warehouse\PurchaseRecordService;
use App\Tools\Checks\CheckInfo;
use App\Tools\Checks\Warehouse\PurchaseRecordCheck;



class PurchaseRecordController extends BaseController
{

    public $rels = null;
    public $checks = null;
    public $workType = 1;

    public function __construct()
    {
        $this->rels = new PurchaseRecordService();        
    }


    /**
     * 显示主页面
     *
     * @return index页面
     */
    public function index()
    {

        //显示页面
        return view('Warehouse.PurchaseRecord.index');
    }


    /**
     * 获取固定资产数据
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
    public function create(Request $request)
    {

        $users = $this->getOneUserInfo($request->user()->staff_id);

        return view('Warehouse.PurchaseRecord.add')->with('users' ,$users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->checks = new PurchaseRecordCheck();

        $users = $this->getOneUserInfo($request->user()->staff_id);//获取用户信息

        $checksInfo = $this->checks->addCheck($request,new CheckInfo());

        if ($checksInfo->status == 1) {

            $checksInfo =  $this->rels->add($request,$users,$checksInfo);    
        }

        $this->taskWorkInfo[0]['workId'] =  $this->workType;
        $this->taskWorkInfo[0]['lastId'] =  0;
        $this->taskWorkInfo[0]['krd_task_rels'] =  $checksInfo;

        return $this->addTask($users);

        return Tool::formatData($checksInfo); 

    }

    public function itStore(Request $request)
    {

        $updateTask = $this->updateTask($request);

        return $updateTask;

        return  $this->rels->update($request);  
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
        return view('Warehouse.PurchaseRecord.edit');
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
