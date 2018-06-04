<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/', 'HomeController@index');

Route::middleware('auth')->group(function () {

    Route::resource('/list', 'KrdLeftListController');

    Route::resource('/myinfo','MyInfoController');


    Route::resource('/workflow','WorkFlow\BaseController');//事务流程

    //物品类型路由
    Route::post('/assetstype/getList', 'Warehouse\AssetsTypeController@getList');//物品类型列表
    Route::resource('/assetstype','Warehouse\AssetsTypeController');

    //固定资产路由
    Route::post('/assets/getList', 'Warehouse\AssetsController@getList');//固定资产列表
    Route::resource('/assets','Warehouse\AssetsController');

    //采购申请路由
    Route::post('/purchase/record/getList', 'Warehouse\PurchaseRecordController@getList');//采购申请列表
    Route::post('/purchase/record/itStore', 'Warehouse\PurchaseRecordController@itStore');//信息技术部添加
    Route::resource('/purchase/record','Warehouse\PurchaseRecordController');

    //账号管理路由    
    Route::post('/users/getList', 'Personnel\UserController@getList');//账号列表
    Route::post('/users/updateStatus/{id}','Personnel\UserController@updateStatus');//修改账号状态
    Route::resource('/users', 'Personnel\UserController');


    //部门管理路由
    Route::get('/departments/getTreeTwo','Personnel\DepartmentController@getTreeTwo');//部门+职员列表
    Route::get('/departments/getTree','Personnel\DepartmentController@getTree');//部门列表
    Route::post('/departments/getList','Personnel\DepartmentController@getList');//部门列表
    Route::post('/departments/updateStatus/{id}','Personnel\DepartmentController@updateStatus');//修改部门状态
    Route::resource('/departments', 'Personnel\DepartmentController');

    //员工档案资料
    Route::post('/staffs/getList','Personnel\StaffController@getList');//员工资料列表
    Route::resource('/staffs', 'Personnel\StaffController');

    //职位管理路由
    Route::post('/positions/getList','Personnel\PositionController@getList');//职位列表
    Route::post('/positions/updateStatus/{id}','Personnel\PositionController@updateStatus');//修改职位状态
    Route::resource('/positions', 'Personnel\PositionController');

    //流程管理路由
    Route::post('/task/getList','WorkFlow\TaskController@getList');//流程管理列表
    Route::resource('/task','WorkFlow\TaskController');

    //事务管理路由
    Route::post('/work/getList','WorkFlow\WorkController@getList');//流程管理列表
    Route::resource('/work','WorkFlow\WorkController');

    //事务流程管理路由
    Route::post('/worktask/getList','WorkFlow\TaskWorkController@getList');//事务流程管理列表
    Route::resource('/worktask','WorkFlow\TaskWorkController');

    //事务流程判断管理路由
    Route::post('/taskworkextend/getList','WorkFlow\TaskWorkExtendController@getList');//事务流程判断管理列表
    Route::resource('/taskworkextend','WorkFlow\TaskWorkExtendController');

    //事务流程默认执行人管理路由
    Route::post('/taskworkperson/getListFormat','WorkFlow\TaskWorkPersonController@getListFormat');//事务流程默认执行人列表
    Route::resource('/taskworkperson','WorkFlow\TaskWorkPersonController');


    //办公审批信息
    Route::post('/taskinfo/getList','WorkFlow\TaskInfoController@getList');//办公审批信息列表我的审批
    // Route::post('/taskinfo/getOtherList','WorkFlow\TaskInfoController@getOtherList');//办公审批信息列表需要审批
    // Route::get('/taskinfo/{id}/workpersonid/{taskingId}','WorkFlow\TaskInfoController@showTaskInfo');//显示审批信息

    Route::resource('/taskinfo','WorkFlow\TaskInfoController');


    // Route::get('/text', function () {
    //     return view('text');
    // });

});