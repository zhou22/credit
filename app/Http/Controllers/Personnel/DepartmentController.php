<?php

namespace App\Http\Controllers\Personnel;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Personnel\DepartmentService;

class DepartmentController extends Controller
{

    public $rels = null;

    public function __construct()
    {

        $this->rels = new DepartmentService();        

    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        //显示部门管理页面
        return view('Personnel.Department.index');
    }

    public function getList(Request $request)
    {
        return $this->rels->getList($request);

    }

    public function getTree()
    {
        
        return $this->rels->getTree();

    }

    //获取部门列表+人员列表
    public function getTreeTwo()
    {

        return $this->rels->getTreeTwo();
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        return $this->rels->getOne($id);
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
        return $this->rels->update($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->rels->delete($id);
    }

    /**
     * 
     *修改部门状态
     *
     * 
     */

    public function updateStatus($id)
    {

        return $this->rels->updateStatus($id);

    }




}
