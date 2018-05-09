<?php

namespace App\Http\Controllers;

use App\Http\Service\Personnel\StaffService;
use App\Http\Service\WorkFlow\TaskWorkService;
use App\Http\Service\WorkFlow\TaskingService;
use App\Http\Service\WorkFlow\TaskInfoService;
use App\Http\Service\WorkFlow\TaskPersonService;
use App\Http\Service\WorkFlow\TaskWorkJudgeService;
use App\Http\Service\WorkFlow\WorkPersonService;
use App\Http\Service\Personnel\DepartmentService;


class BaseController extends Controller
{

    public  $rels = null;
    //储存事务流程
    public  $taskWork = null;
    //储存事务流程记录
    public  $tasking = null;
    //存储当前事务流程最新状态
    public  $taskInfo = null;
    //存储默认执行人或部门数据
    public $taskPerson = null;
    //存储默认任务流程判断数据
    public $taskWorkJudge = null;
    //获取执行人数据
    public $relsPerson =null;
    //存储流程执行人数据
    public $workPerson = null;

    public $taskWorkInfo = [];


    //控制整套流程
    public function addTask($users,$pid = 0)
    {
   
        //获取所有的数据,和添加一条TaskInfo,Tasking
        $this->getAllTaskWork($users,$pid);

        //更新taskinfo表takingid
        $this->updateTaskInfoTaskingId($pid);

        $this->relsPerson = $this->getRelsPerson($users,$pid);

        $this->addWorkPerson($this->relsPerson);

        if (!empty($this->taskWorkInfo[$pid]['task_work_judge']->first())) {
            $this->addSonTaskWork($users,$pid);
        }

        return  $this->taskWorkInfo;
    }


    //更新流程
    public function updateTask($datas)
    {
       $this->workPerson = new WorkPersonService();       
       $this->workPerson->update($datas);
       $rels = $this->getWorkPersonId($datas->work_person_id);

       if ($rels->execute == 1) {
            $rels =  $this->updateTasking($datas);
       }
       
       


       return $rels;

    }




    public function addSonTaskWork($users,$pid)
    {
        $taskWorkJudge =  $this->taskWorkInfo[$pid]['task_work_judge'];
        $taskWorkId =  $this->taskWorkInfo[$pid]['task_work']->id;
        $taskInfoId = $this->taskWorkInfo[$pid]['task_info_id'];
        $krdTaskRels = $this->taskWorkInfo[$pid]['krd_task_rels'];

        foreach ($taskWorkJudge as $key => $value) {

            if (eval('return  $krdTaskRels->'.$value["judge"].';') && $value["task_work_id"] == $taskWorkId ) {
                $this->taskWorkInfo[$taskInfoId]['workId'] =  $value['other'];
                $this->taskWorkInfo[$taskInfoId]['lastId'] =  $this->taskWorkInfo[$pid]['lastId'];          
                $this->taskWorkInfo[$taskInfoId]['krd_task_rels'] =  $this->taskWorkInfo[$pid]['krd_task_rels'];
                $this->addTask($users,$taskInfoId);
            }            
        }
    }



    public function getAllTaskWork($users,$pid)
    {


        $relsWorkTask = $this->getOneTaskWork($pid);

        $this->taskWorkInfo[$pid]['task_work'] = $relsWorkTask['0'];

        $this->taskWorkInfo[$pid]['title'] =  $this->taskWorkInfo[$pid]['task_work']->work_name.'申请';

        $this->taskWorkInfo[$pid]['task_work_judge'] = $this->getRelsTaskWorkJudge($this->taskWorkInfo[$pid]['task_work']->id);

        $this->taskWorkInfo[$pid]['task_person'] = $this->getRelsTaskPerson($this->taskWorkInfo[$pid]['task_work']->id);

        $this->taskWorkInfo[$pid]['task_info_id'] = $this->addTaskInfo($users,$pid);

        $this->taskWorkInfo[$pid]['tasking'] = $this->addTasking($pid);      




    }

    public function getOneUserInfo($id)
    {
        $users = new StaffService();

        return $users->getOne($id);

    }

    //获取执行人数据
    public function getRelsPerson($users,$pid)
    {
        return  $this->formatPerson(StaffService::getData(),$users,$pid);
    }   



    //筛选执行人数据
    public function formatPerson($data,$user,$pid)
    {

        $rels = $this->taskWorkInfo[$pid]['task_person'];

        $relsArray = [];


        foreach ($rels as $key => $value) {

            switch ($value['person_type']) {
                case '职员':

                    //筛选出自己
                    if ( (empty($value['position_id']) || $value['position_id'] == 0))
                    {
                        $arrayRels = $user;
                        $arrayRels['execute'] = $value['execute'];
                        $arrayRels['tasking_id'] = $this->taskWorkInfo[$pid]['tasking'];
                        $relsArray[] = $arrayRels;
                    }
                    //筛选出特定的执行人
                    if ( (!empty($value['position_id']) && $value['position_id'] != 0)) {
                        $arrayRels = $this->getOneUserInfo($value['person_id']);
                        $arrayRels['execute'] = $value['execute'];
                        $arrayRels['tasking_id'] = $this->taskWorkInfo[$pid]['tasking'];
                        $relsArray[] = $arrayRels;
                    }
                    break;
                case '部门':
                    
                    //筛选出特定部门下的所有执行人
                    foreach ($data as $k => $v) {
                        if ( (empty($value['position_id']) || $value['position_id'] == 0)) {
                            //部门下的所有
                            if ($value['person_id'] == $v['department_id']) {
                                $v['execute'] = $value['execute'];
                                $v['tasking_id'] = $this->taskWorkInfo[$pid]['tasking'];
                                $relsArray[] = $v;
                            }
                        }

                        if ( (!empty($value['position_id']) && $value['position_id'] != 0)) {            
                            //筛选出指定部门下的指定职位
                            if (!empty($value['person_id']) && $value['person_id'] != 0) {

                                if (($value['person_id'] == $v['department_id']) && ($value['position_id'] == $v['position_id']) ) {
                                    $v['execute'] = $value['execute'];
                                    $v['tasking_id'] = $this->taskWorkInfo[$pid]['tasking'];
                                    $relsArray[] = $v;
                                }
                            } else {
                                //筛选出本部门下的指定职位
                                if (($user['department_id'] == $v['department_id']) && ($value['position_id'] == $v['position_id']) ) {
                                    $v['execute'] = $value['execute'];
                                    $v['tasking_id'] = $this->taskWorkInfo[$pid]['tasking'];
                                    $relsArray[] = $v;
                                }
                                
                                $id = $user['department_id'];
                                //得到父id
                                while ($id != 0) {
                                    $id = DepartmentService::getOneParent($id);

                                    //筛选出本中心下的指定职位
                                    if (($id == $v['department_id']) && ($value['position_id'] == $v['position_id']) ) {
                                        $v['execute'] = $value['execute'];
                                        $v['tasking_id'] = $this->taskWorkInfo[$pid]['tasking'];
                                        $relsArray[] = $v;
                                    }

                                }

                            }

                        }

                    }

                    break;
            }


        }

        return $relsArray;

    }




    //获取Taskwork数据
    public function getOneTaskWork($pid)
    {        

       $this->taskWork = new TaskWorkService();
       return $this->taskWork->getOneWork($this->taskWorkInfo[$pid]);
    }




    //添加taskinfo数据,并得到id
    public function addTaskInfo($users,$pid)
    {
       $this->TaskInfo = new TaskInfoService();
       return $this->TaskInfo->add($this->taskWorkInfo[$pid],$users,$pid);


    }


    //添加当前正在使用进行的流程事务
    public function addTasking($pid)
    {

       $this->Tasking = new TaskingService();
       return $this->Tasking->add($this->taskWorkInfo[$pid]);

    }

    //获取当前正在使用进行的流程事务
    public function getTasking($data)
    {
       $this->Tasking = new TaskingService();
       return $this->Tasking->getRels($data);

    }

    //更新当前正在执行的流程状态
    public function updateTasking($datas)
    {
       $this->Tasking = new TaskingService();
       return $this->Tasking->update($datas);

    }

    //获取tak_person数据,返回查找数据
    public function getRelsTaskPerson($taskWorkId)
    {
       $this->TaskPerson = new TaskPersonService();
       return $this->TaskPerson->getRels($taskWorkId);
    }


    //获取tasWorkExtend表数据
    public function getRelsTaskWorkJudge($taskWorkId)
    {

       $this->TaskPerson = new TaskWorkJudgeService();
       return $this->TaskPerson->getRels($taskWorkId);

    }


    public function updateTaskInfoTaskingId($pid)
    {
        $this->TaskInfo = new TaskInfoService();
        $this->TaskInfo->updateTaskingId($this->taskWorkInfo[$pid]);
    }


    public function addWorkPerson($datas)
    {
       $this->workPerson = new WorkPersonService();
       return $this->workPerson->add($datas);
    }


    public function getWorkPerson($datas,$dataType)
    {
        $this->workPerson = new WorkPersonService();

        switch ($dataType) {
            case 'person_id':
                return $this->workPerson->getList($datas);
                break;
            case 'tasking_id':
                return $this->workPerson->getListTasking($datas);
                break;
            default:
                break;
        }
    }

    public function getWorkPersonId($id)
    {
        $this->workPerson = new WorkPersonService();
        return $this->workPerson->getFind($id);
    }




}





