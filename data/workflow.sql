/*
Navicat MySQL Data Transfer

Source Server         : krd
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : workflow

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-05-11 16:20:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(64) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `pid` int(11) NOT NULL DEFAULT '0',
  `director_id` int(11) NOT NULL DEFAULT '0' COMMENT '部门主管 0表示不存在',
  `manager_id` int(11) NOT NULL DEFAULT '0' COMMENT '部门经理 0表示不存在',
  `rank` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `dept_name` (`dept_name`),
  KEY `pid` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='部门表';

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES ('1', '董事会', '0', '8', '8', '1', '2018-03-29 09:45:38', '2018-03-29 09:45:38');
INSERT INTO `dept` VALUES ('2', '产品部', '1', '6', '6', '1', '2017-04-28 10:37:56', '2017-04-28 10:37:56');
INSERT INTO `dept` VALUES ('3', '技术部', '2', '0', '0', '100', '2017-04-19 07:00:45', '2017-04-19 07:00:45');
INSERT INTO `dept` VALUES ('4', 'PHP部', '3', '2', '3', '1', '2017-04-19 15:02:49', '2017-04-19 07:02:21');
INSERT INTO `dept` VALUES ('5', '综管部', '1', '8', '8', '2', '2018-03-29 09:49:29', '2018-03-29 09:49:29');

-- ----------------------------
-- Table structure for emp
-- ----------------------------
DROP TABLE IF EXISTS `emp`;
CREATE TABLE `emp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workno` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工号',
  `dept_id` int(11) NOT NULL DEFAULT '0' COMMENT '部门id',
  `leave` smallint(6) NOT NULL DEFAULT '0' COMMENT '离职状态',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_workno_unique` (`workno`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of emp
-- ----------------------------
INSERT INTO `emp` VALUES ('1', '张三', '1044176017@qq.com', '$2y$10$FE1AOX1zg1IjyJn97r3qWOjpff5nhzB/hZsPO8QDpGm612vP2x9C2', '0001', '4', '0', 'n8eIaBUVOHygrfwJKJkuiEXC5hwahA9hLEYUMYgHaEASkvrpV76nDPN5I7sG', '2017-04-18 09:00:15', '2017-04-19 07:31:41', null);
INSERT INTO `emp` VALUES ('2', '李四', '1044176018@qq.com', '$2y$10$FE1AOX1zg1IjyJn97r3qWOjpff5nhzB/hZsPO8QDpGm612vP2x9C2', '0002', '4', '0', 'nlZs7VFBUHfs40fXgEtvgStuYYnkD3zRrzAfIfoCYPkxdfQyUIglfDph9Aac', '2017-04-18 17:15:04', '2017-04-19 07:31:46', null);
INSERT INTO `emp` VALUES ('3', '王二', '1044176019@qq.com', '$2y$10$FE1AOX1zg1IjyJn97r3qWOjpff5nhzB/hZsPO8QDpGm612vP2x9C2', '0003', '2', '0', 'YP8Vm1KCuJBUmCxENEhqr7zZonreBkqGMIAiBgU6J3VgbFMZmiYJY74bUYzv', '2017-04-18 17:16:54', '2017-04-19 07:31:52', null);
INSERT INTO `emp` VALUES ('4', '王芳', '1044176020@qq.com', '$2y$10$xvCpTKVSQY0eWo8XqZP5guJow6in6CbpW7L/tsFmJSRvGhte.2QQa', '0004', '5', '0', 'nFQcbu1pbpbIJ269lEcl6Rt7BfrRUhrQ4vsqS8wJS59hKL1HIxKIOLmqbRC9', '2017-04-18 17:17:22', '2018-03-29 09:50:52', null);
INSERT INTO `emp` VALUES ('5', '李八', '1044176027@qq.com', '$2y$10$bBzs2e6oUD3JAwNzOOMpou2z77CdM6fC8FO3F07SN62RUOjlweOo2', '897132', '4', '0', null, '2017-04-19 07:26:53', '2017-04-19 07:26:53', null);
INSERT INTO `emp` VALUES ('6', '赵武', '1044176021@qq.com', '$2y$10$2LAdd4qks1REHX7dBNvMBuJXe.K.gkw3v2FMf8ePyxAZTKgN8Tz.O', '897134', '2', '0', null, '2017-04-28 10:37:44', '2017-04-28 10:37:44', null);
INSERT INTO `emp` VALUES ('7', '王六', '1044176022@qq.com', '$2y$10$AvgpIqdHOtTMW8os5lMFKOyq5SCwSarNLxaAmYj8X.MBIneaSK1UC', '897135', '5', '0', 'P0zfoCgU59gXwTkiilHkcK76J16uvWMjtde8vFM1RjL0ViQYsdnbzMIVpP18', '2017-04-28 14:26:49', '2017-04-28 14:26:49', null);
INSERT INTO `emp` VALUES ('8', '测试人员1', '1044176023@qq.com', '$2y$10$1y8N26X4GZKq8acYk3NvG.MsjNiiKylL.OCzIl8FezuueDAVRmh0K', '897139', '1', '0', '7bGj09puoPTL9Ya9bh2uny2uAaQ7ffZpKoEn9wRWarwXEhVHEAFNTN4QN2Th', '2017-05-02 10:17:31', '2018-03-29 09:46:35', null);
INSERT INTO `emp` VALUES ('9', '测试人员2', '1044176030@qq.com', '$2y$10$wM9Jdf9zib654quT8x/mleeuPe0mMRhD1KDtIO2HHTJQFDDGvp3cm', '897138', '1', '0', 'rAGRNT686DRjnzjGlvmXcwE0192JEDCSqcJqpPyml4w7GmTkvt006GlX3zgz', '2017-05-02 10:18:37', '2018-03-29 09:52:53', null);
INSERT INTO `emp` VALUES ('10', '周文俊3', '123456@qq.com', '$2y$10$mhQpJPNO1lEWaDxh7GzAqethWXccIPSrgmLjwvC8w6tSA.Kczmw6e', '0121', '1', '0', '51bO4vZ27zzXTV10noPduhFRlqdsqEWTD1vzf9MAQTT08JG68sJtlKphZkw5', '2018-03-28 20:52:00', '2018-04-11 13:40:39', null);

-- ----------------------------
-- Table structure for entry
-- ----------------------------
DROP TABLE IF EXISTS `entry`;
CREATE TABLE `entry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '标题',
  `flow_id` int(11) NOT NULL DEFAULT '0',
  `emp_id` int(11) NOT NULL DEFAULT '0' COMMENT '发起人',
  `process_id` int(11) NOT NULL DEFAULT '0' COMMENT '当前步骤id',
  `circle` smallint(6) NOT NULL DEFAULT '1' COMMENT '第几轮申请',
  `status` int(11) NOT NULL COMMENT '当前状态 0处理中 9通过 -1驳回 -2撤销 -9草稿\n1：流程中\n9：处理完成',
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父流程',
  `enter_process_id` int(11) NOT NULL DEFAULT '0' COMMENT '进入子流程的父流程步骤id',
  `enter_proc_id` int(11) NOT NULL DEFAULT '0' COMMENT '进入子流程的进程id',
  `child` int(11) NOT NULL DEFAULT '0' COMMENT '子流程 process_id',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workflow_id` (`flow_id`),
  KEY `emp_id` (`emp_id`),
  KEY `step_id` (`process_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='流程实例';

-- ----------------------------
-- Records of entry
-- ----------------------------
INSERT INTO `entry` VALUES ('1', '请假一天', '3', '1', '60', '2', '0', '0', '0', '0', '75', '2017-05-04 14:39:13', '2017-05-05 14:39:58');
INSERT INTO `entry` VALUES ('2', '请假5天', '3', '2', '74', '2', '0', '0', '0', '0', '0', '2017-05-04 14:41:18', '2017-05-04 17:50:47');
INSERT INTO `entry` VALUES ('3', '请假一天', '4', '1', '75', '2', '0', '1', '60', '10', '0', '2017-05-05 14:39:58', '2017-05-05 14:39:58');
INSERT INTO `entry` VALUES ('4', '请假', '3', '10', '60', '1', '9', '0', '0', '0', '0', '2018-03-28 21:14:15', '2018-03-29 09:54:33');
INSERT INTO `entry` VALUES ('5', '请假', '4', '10', '76', '1', '9', '4', '60', '18', '0', '2018-03-29 09:51:28', '2018-03-29 09:54:33');
INSERT INTO `entry` VALUES ('6', '请假测试', '3', '10', '73', '1', '0', '0', '0', '0', '0', '2018-03-29 15:13:20', '2018-03-29 15:13:21');
INSERT INTO `entry` VALUES ('7', '请假的都是', '3', '10', '60', '1', '0', '0', '0', '0', '75', '2018-04-11 10:52:37', '2018-04-20 09:25:27');
INSERT INTO `entry` VALUES ('8', '请假的都是', '4', '10', '75', '1', '0', '7', '60', '29', '0', '2018-04-20 09:25:27', '2018-04-20 09:25:27');

-- ----------------------------
-- Table structure for entry_data
-- ----------------------------
DROP TABLE IF EXISTS `entry_data`;
CREATE TABLE `entry_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) NOT NULL DEFAULT '0',
  `flow_id` int(11) NOT NULL DEFAULT '0',
  `field_name` varchar(128) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `field_value` text COLLATE utf8mb4_bin,
  `field_remark` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `workflow_id` (`flow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='实例数据表';

-- ----------------------------
-- Records of entry_data
-- ----------------------------
INSERT INTO `entry_data` VALUES ('1', '1', '3', 'leave_type', 0xE79785E58187, '', null, null);
INSERT INTO `entry_data` VALUES ('2', '1', '3', 'reason', 0xE8BAABE4BD93E4B88DE88892E69C8D, '', null, null);
INSERT INTO `entry_data` VALUES ('3', '1', '3', 'day', 0x31, '', null, null);
INSERT INTO `entry_data` VALUES ('4', '1', '3', 'start_date', 0x323031372D30352D3035, '', null, null);
INSERT INTO `entry_data` VALUES ('5', '1', '3', 'end_date', 0x323031372D30352D3036, '', null, null);
INSERT INTO `entry_data` VALUES ('6', '1', '3', 'sex', 0xE5A5B3, '', null, null);
INSERT INTO `entry_data` VALUES ('7', '1', '3', 'hobby', 0xE7AFAEE79083, '', null, null);
INSERT INTO `entry_data` VALUES ('8', '2', '3', 'leave_type', 0xE79785E58187, '', null, null);
INSERT INTO `entry_data` VALUES ('9', '2', '3', 'reason', 0xE4B8ADE4BA8CE79785, '', null, null);
INSERT INTO `entry_data` VALUES ('10', '2', '3', 'day', 0x35, '', null, null);
INSERT INTO `entry_data` VALUES ('11', '2', '3', 'start_date', 0x323031372D30352D3035, '', null, null);
INSERT INTO `entry_data` VALUES ('12', '2', '3', 'end_date', 0x323031372D30352D3039, '', null, null);
INSERT INTO `entry_data` VALUES ('13', '2', '3', 'sex', 0xE5A5B3, '', null, null);
INSERT INTO `entry_data` VALUES ('14', '2', '3', 'hobby', 0xE8B6B3E79083, '', null, null);
INSERT INTO `entry_data` VALUES ('15', '4', '3', 'leave_type', 0xE79785E58187, '', null, null);
INSERT INTO `entry_data` VALUES ('16', '4', '3', 'reason', 0xE697A0, '', null, null);
INSERT INTO `entry_data` VALUES ('17', '4', '3', 'day', 0x33, '', null, null);
INSERT INTO `entry_data` VALUES ('18', '4', '3', 'start_date', 0x323031382D30332D3238, '', null, null);
INSERT INTO `entry_data` VALUES ('19', '4', '3', 'end_date', 0x323031382D30332D3330, '', null, null);
INSERT INTO `entry_data` VALUES ('20', '4', '3', 'sex', 0xE794B7, '', null, null);
INSERT INTO `entry_data` VALUES ('21', '4', '3', 'hobby', 0xE8B6B3E79083, '', null, null);
INSERT INTO `entry_data` VALUES ('22', '6', '3', 'leave_type', 0xE79785E58187, '', null, null);
INSERT INTO `entry_data` VALUES ('23', '6', '3', 'reason', 0xE697A0, '', null, null);
INSERT INTO `entry_data` VALUES ('24', '6', '3', 'day', 0x35, '', null, null);
INSERT INTO `entry_data` VALUES ('25', '6', '3', 'start_date', 0x323031382D30332D3239, '', null, null);
INSERT INTO `entry_data` VALUES ('26', '6', '3', 'end_date', 0x323031382D30342D3034, '', null, null);
INSERT INTO `entry_data` VALUES ('27', '6', '3', 'sex', 0xE4BF9DE5AF86, '', null, null);
INSERT INTO `entry_data` VALUES ('28', '7', '3', 'leave_type', 0xE79785E58187, '', null, null);
INSERT INTO `entry_data` VALUES ('29', '7', '3', 'reason', 0xE698AFE788BDE882A4E6B0B4E698AFE590A6, '', null, null);
INSERT INTO `entry_data` VALUES ('30', '7', '3', 'day', 0xE7BD9AE58D95E698AFE79A84, '', null, null);
INSERT INTO `entry_data` VALUES ('31', '7', '3', 'start_date', null, '', null, null);
INSERT INTO `entry_data` VALUES ('32', '7', '3', 'end_date', null, '', null, null);

-- ----------------------------
-- Table structure for flow
-- ----------------------------
DROP TABLE IF EXISTS `flow`;
CREATE TABLE `flow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flow_no` varchar(45) COLLATE utf8mb4_bin NOT NULL COMMENT '工作流编号',
  `flow_name` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '工作流名称',
  `template_id` int(255) NOT NULL DEFAULT '0',
  `flowchart` text COLLATE utf8mb4_bin,
  `jsplumb` text COLLATE utf8mb4_bin COMMENT 'jsplumb流程图数据',
  `type_id` int(11) NOT NULL DEFAULT '0' COMMENT '流程设计文件',
  `is_publish` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否发布，发布后可用',
  `is_show` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否显示',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='工作流定义表';

-- ----------------------------
-- Records of flow
-- ----------------------------
INSERT INTO `flow` VALUES ('3', '0000003', '请假1', '1', null, 0x7B22746F74616C223A342C226C697374223A7B2230223A7B226964223A35372C22666C6F775F6964223A332C2270726F636573735F6E616D65223A225C75353435385C75356465355C75363364305C75346561345C75373533335C7538626637222C2270726F636573735F746F223A223733222C2269636F6E223A2269636F6E2D6865617274222C227374796C65223A2277696474683A31353070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A236435346532313B6C6566743A31313270783B746F703A31323270783B227D2C2233223A7B226964223A36302C22666C6F775F6964223A332C2270726F636573735F6E616D65223A225C75376566635C75376261315C75363261355C7535393037222C2270726F636573735F746F223A22222C2269636F6E223A2269636F6E2D6F6B222C227374796C65223A2277696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A236637303B6C6566743A37353170783B746F703A34393370783B227D2C2234223A7B226964223A37332C22666C6F775F6964223A332C2270726F636573735F6E616D65223A225C75393065385C75393565385C75346533625C75376261315C75356261315C7536383338222C2270726F636573735F746F223A2236302C3734222C2269636F6E223A2269636F6E2D72656672657368222C227374796C65223A2277696474683A31353070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A33383270783B746F703A33343270783B227D2C2235223A7B226964223A37342C22666C6F775F6964223A332C2270726F636573735F6E616D65223A225C75393065385C75393565385C75376563665C75373430365C75356261315C7536383338222C2270726F636573735F746F223A223630222C2269636F6E223A2269636F6E2D72656672657368222C227374796C65223A2277696474683A31353070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A39363370783B746F703A31353470783B227D7D7D, '1', '0', '1', '2018-04-11 15:44:09', '2018-04-11 15:44:09');
INSERT INTO `flow` VALUES ('4', '000004', '报备', '1', null, 0x7B22746F74616C223A322C226C697374223A5B7B226964223A37352C22666C6F775F6964223A342C2270726F636573735F6E616D65223A225C75353136355C7536383633222C2270726F636573735F746F223A223736222C2269636F6E223A6E756C6C2C227374796C65223A2277696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A33333070783B746F703A31363170783B227D2C7B226964223A37362C22666C6F775F6964223A342C2270726F636573735F6E616D65223A225C75363033625C75376563665C75373430365C75353930645C7535626131222C2270726F636573735F746F223A22222C2269636F6E223A6E756C6C2C227374796C65223A2277696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A37363270783B746F703A33383870783B227D5D7D, '0', '1', '0', '2017-05-02 17:37:01', '2017-05-02 17:37:01');
INSERT INTO `flow` VALUES ('6', '1234', '采购流程', '2', null, 0x7B22746F74616C223A312C226C697374223A5B7B226964223A38342C22666C6F775F6964223A362C2270726F636573735F6E616D65223A225C75393163375C75386432645C75373533335C7538626637222C2270726F636573735F746F223A22222C2269636F6E223A6E756C6C2C227374796C65223A2277696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A37373670783B746F703A31343070783B227D2C7B226964223A38352C22666C6F775F6964223A362C2270726F636573735F6E616D65223A2249545C75356261315C7536383338222C2270726F636573735F746F223A22222C2269636F6E223A6E756C6C2C227374796C65223A2277696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A39343770783B746F703A31333870783B227D2C7B226964223A38362C22666C6F775F6964223A362C2270726F636573735F6E616D65223A225C75393163375C75386432645C75356261315C7536383338222C2270726F636573735F746F223A22222C2269636F6E223A6E756C6C2C227374796C65223A2277696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A3131393870783B746F703A31373570783B227D2C7B226964223A38372C22666C6F775F6964223A362C2270726F636573735F6E616D65223A225C75363632665C75353432365C75363730395C75393838345C7537623937222C2270726F636573735F746F223A22222C2269636F6E223A6E756C6C2C227374796C65223A2277696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A3130393970783B746F703A31323070783B227D2C7B226964223A38382C22666C6F775F6964223A362C2270726F636573735F6E616D65223A225C75373236395C75353463315C75376337625C7535373862222C2270726F636573735F746F223A22222C2269636F6E223A6E756C6C2C227374796C65223A2277696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A3131373470783B746F703A31373970783B227D2C7B226964223A38392C22666C6F775F6964223A362C2270726F636573735F6E616D65223A225C75363730305C75353261305C75393838345C7537623937222C2270726F636573735F746F223A22222C2269636F6E223A6E756C6C2C227374796C65223A2277696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A37373270783B746F703A33313370783B227D5D7D, '1', '0', '1', '2018-03-29 09:33:39', '2018-03-29 09:33:39');

-- ----------------------------
-- Table structure for flowlink
-- ----------------------------
DROP TABLE IF EXISTS `flowlink`;
CREATE TABLE `flowlink` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `flow_id` int(11) NOT NULL COMMENT '流程id',
  `type` varchar(45) COLLATE utf8mb4_bin NOT NULL COMMENT 'Condition:表示步骤流转\nRole:当前步骤操作人',
  `process_id` int(11) NOT NULL COMMENT '当前步骤id',
  `next_process_id` int(11) NOT NULL DEFAULT '-1' COMMENT '下一个步骤 Condition -1未指定 0结束 -9上级查找\ntype=Role时为0，不启用',
  `auditor` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '0' COMMENT '审批人 系统自动 指定人员 指定部门 指定角色\ntype=Condition时不启用',
  `expression` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '条件判断表达式\n为1表示true，通过的话直接进入下一步骤',
  `sort` int(11) NOT NULL COMMENT '条件判断顺序',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workflow_id` (`flow_id`),
  KEY `step_id` (`process_id`),
  KEY `emp_id` (`auditor`(191))
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='流程步骤流转轨迹';

-- ----------------------------
-- Records of flowlink
-- ----------------------------
INSERT INTO `flowlink` VALUES ('52', '3', 'Condition', '60', '-1', '0', '', '100', '2017-04-21 08:09:31', '2018-03-30 11:49:18');
INSERT INTO `flowlink` VALUES ('90', '3', 'Condition', '57', '73', '0', '', '100', '2017-04-24 03:26:17', '2017-04-24 03:26:17');
INSERT INTO `flowlink` VALUES ('98', '3', 'Sys', '73', '0', '-1001', '', '100', '2017-04-28 10:31:01', '2017-04-28 10:31:01');
INSERT INTO `flowlink` VALUES ('99', '3', 'Sys', '74', '0', '-1002', '', '100', '2017-04-28 10:42:37', '2017-04-28 10:42:37');
INSERT INTO `flowlink` VALUES ('100', '3', 'Condition', '73', '60', '0', '$day <= 3', '100', '2017-04-28 10:46:42', '2017-04-28 10:48:21');
INSERT INTO `flowlink` VALUES ('101', '3', 'Condition', '73', '74', '0', '$reason == 1  OR $day > 3', '100', '2017-04-28 10:46:42', '2018-04-11 15:44:09');
INSERT INTO `flowlink` VALUES ('102', '3', 'Condition', '74', '60', '0', '', '100', '2017-04-28 10:46:42', '2017-04-28 10:46:42');
INSERT INTO `flowlink` VALUES ('103', '3', 'Dept', '60', '0', '5', '', '100', '2017-04-28 14:20:42', '2017-04-28 14:20:42');
INSERT INTO `flowlink` VALUES ('104', '4', 'Condition', '75', '76', '0', '', '100', '2017-05-02 10:15:27', '2017-05-02 10:15:27');
INSERT INTO `flowlink` VALUES ('105', '4', 'Condition', '76', '-1', '0', '', '100', '2017-05-02 10:15:27', '2017-05-02 10:20:22');
INSERT INTO `flowlink` VALUES ('106', '4', 'Emp', '75', '0', '9', '', '100', '2017-05-02 10:19:57', '2017-05-02 10:19:57');
INSERT INTO `flowlink` VALUES ('107', '4', 'Emp', '76', '0', '8', '', '100', '2017-05-02 10:20:07', '2017-05-02 10:20:07');
INSERT INTO `flowlink` VALUES ('110', '5', 'Condition', '79', '-1', '0', '', '100', '2017-05-04 15:46:44', '2017-05-04 15:46:44');
INSERT INTO `flowlink` VALUES ('111', '3', 'Emp', '60', '0', '10,9,7', '', '100', '2018-03-30 11:49:13', '2018-03-30 11:49:13');

-- ----------------------------
-- Table structure for flow_type
-- ----------------------------
DROP TABLE IF EXISTS `flow_type`;
CREATE TABLE `flow_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(64) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `type_name` (`type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='流程分类表';

-- ----------------------------
-- Records of flow_type
-- ----------------------------
INSERT INTO `flow_type` VALUES ('1', '测试类型', '2017-04-25 16:54:53', '2017-04-25 16:54:54');

-- ----------------------------
-- Table structure for proc
-- ----------------------------
DROP TABLE IF EXISTS `proc`;
CREATE TABLE `proc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) NOT NULL,
  `flow_id` int(11) NOT NULL COMMENT '流程id',
  `process_id` int(11) NOT NULL COMMENT '当前步骤',
  `process_name` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '当前步骤名称',
  `emp_id` int(11) NOT NULL COMMENT '审核人',
  `emp_name` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '审核人名称',
  `dept_name` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '审核人部门名称',
  `auditor_id` int(11) NOT NULL DEFAULT '0' COMMENT '具体操作人',
  `auditor_name` varchar(64) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '操作人名称',
  `auditor_dept` varchar(64) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '操作人部门',
  `status` int(11) NOT NULL COMMENT '当前处理状态 0待处理 9通过 -1驳回\n0：处理中\n-1：驳回\n9：会签',
  `content` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '批复内容',
  `is_read` int(11) NOT NULL DEFAULT '0' COMMENT '是否查看',
  `is_real` tinyint(4) NOT NULL DEFAULT '1' COMMENT '审核人和操作人是否同一人',
  `circle` smallint(6) NOT NULL DEFAULT '1',
  `beizhu` text COLLATE utf8mb4_bin COMMENT '备注',
  `concurrence` int(11) NOT NULL DEFAULT '0' COMMENT '并行查找解决字段， 部门 角色 指定 分组用',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  KEY `workflow_id` (`flow_id`),
  KEY `emp_id` (`emp_id`),
  KEY `step_id` (`process_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='处理明细表';

-- ----------------------------
-- Records of proc
-- ----------------------------
INSERT INTO `proc` VALUES ('1', '1', '3', '57', '员工提交申请', '1', '张三', 'PHP部', '1', '张三', 'PHP部', '9', null, '0', '1', '1', null, '1493879953', '2017-05-04 14:39:13', '2017-05-04 14:39:13');
INSERT INTO `proc` VALUES ('2', '1', '3', '73', '部门主管审核', '2', '李四', 'PHP部', '2', '李四', 'PHP部', '9', '同意', '0', '1', '1', null, '1493879953', '2017-05-04 14:40:40', '2017-05-04 14:40:40');
INSERT INTO `proc` VALUES ('3', '1', '3', '60', '综管报备', '4', '王芳', '综管部', '4', '王芳', '综管部', '-1', null, '0', '1', '1', null, '1493880040', '2017-05-04 14:41:50', '2017-05-04 14:41:50');
INSERT INTO `proc` VALUES ('4', '1', '3', '60', '综管报备', '7', '王六', '综管部', '4', '王芳', '综管部', '-1', null, '0', '1', '1', null, '1493880040', '2017-05-04 14:41:50', '2017-05-04 14:41:50');
INSERT INTO `proc` VALUES ('5', '2', '3', '57', '员工提交申请', '2', '李四', 'PHP部', '2', '李四', 'PHP部', '9', null, '0', '1', '1', null, '1493880078', '2017-05-04 14:41:18', '2017-05-04 14:41:18');
INSERT INTO `proc` VALUES ('6', '2', '3', '73', '部门主管审核', '2', '李四', 'PHP部', '2', '李四', 'PHP部', '9', null, '0', '1', '1', null, '1493880078', '2017-05-04 14:41:21', '2017-05-04 14:41:21');
INSERT INTO `proc` VALUES ('7', '2', '3', '74', '部门经理审核', '3', '王二', '产品部', '3', '王二', '产品部', '-1', null, '0', '1', '1', null, '1493880081', '2017-05-04 14:41:59', '2017-05-04 14:41:59');
INSERT INTO `proc` VALUES ('8', '1', '3', '57', '员工提交申请', '1', '张三', 'PHP部', '1', '张三', 'PHP部', '9', null, '0', '1', '2', null, '1493880143', '2017-05-04 14:42:23', '2017-05-04 14:42:23');
INSERT INTO `proc` VALUES ('9', '1', '3', '73', '部门主管审核', '2', '李四', 'PHP部', '2', '李四', 'PHP部', '9', null, '0', '1', '2', null, '1493880143', '2017-05-04 17:47:41', '2017-05-04 17:47:41');
INSERT INTO `proc` VALUES ('10', '1', '3', '60', '综管报备', '4', '王芳', '综管部', '4', '王芳', '综管部', '9', null, '0', '1', '2', null, '1493891261', '2017-05-05 14:39:58', '2017-05-05 14:39:58');
INSERT INTO `proc` VALUES ('11', '1', '3', '60', '综管报备', '7', '王六', '综管部', '4', '王芳', '综管部', '9', null, '0', '1', '2', null, '1493891261', '2017-05-05 14:39:58', '2017-05-05 14:39:58');
INSERT INTO `proc` VALUES ('12', '2', '3', '57', '员工提交申请', '2', '李四', 'PHP部', '2', '李四', 'PHP部', '9', null, '0', '1', '2', null, '1493891439', '2017-05-04 17:50:39', '2017-05-04 17:50:39');
INSERT INTO `proc` VALUES ('13', '2', '3', '73', '部门主管审核', '2', '李四', 'PHP部', '2', '李四', 'PHP部', '9', null, '0', '1', '2', null, '1493891439', '2017-05-04 17:50:47', '2017-05-04 17:50:47');
INSERT INTO `proc` VALUES ('14', '2', '3', '74', '部门经理审核', '3', '王二', '产品部', '0', '', '', '0', null, '0', '1', '2', null, '1493891447', '2017-05-04 17:50:47', '2017-05-04 17:50:47');
INSERT INTO `proc` VALUES ('15', '3', '4', '75', '入档', '9', '测试人员2', '董事会', '0', '', '', '0', null, '0', '1', '2', null, '1493966398', '2017-05-05 14:39:58', '2017-05-05 14:39:58');
INSERT INTO `proc` VALUES ('16', '4', '3', '57', '员工提交申请', '10', '周文俊', '董事会', '10', '周文俊', '董事会', '9', null, '0', '1', '1', null, '1522242855', '2018-03-28 21:14:15', '2018-03-28 21:14:15');
INSERT INTO `proc` VALUES ('17', '4', '3', '73', '部门主管审核', '8', '测试人员1', '董事会', '8', '测试人员1', '董事会', '9', null, '0', '1', '1', null, '1522242855', '2018-03-29 09:48:19', '2018-03-29 09:48:19');
INSERT INTO `proc` VALUES ('18', '4', '3', '60', '综管报备', '4', '王芳', '综管部', '4', '王芳', '综管部', '9', null, '0', '1', '1', null, '1522288099', '2018-03-29 09:51:28', '2018-03-29 09:51:28');
INSERT INTO `proc` VALUES ('19', '4', '3', '60', '综管报备', '7', '王六', '综管部', '4', '王芳', '综管部', '9', null, '0', '1', '1', null, '1522288099', '2018-03-29 09:51:28', '2018-03-29 09:51:28');
INSERT INTO `proc` VALUES ('20', '5', '4', '75', '入档', '9', '测试人员2', '董事会', '9', '测试人员2', '董事会', '9', null, '0', '1', '1', null, '1522288288', '2018-03-29 09:53:17', '2018-03-29 09:53:17');
INSERT INTO `proc` VALUES ('21', '5', '4', '76', '总经理复审', '8', '测试人员1', '董事会', '8', '测试人员1', '董事会', '9', null, '0', '1', '1', null, '0', '2018-03-29 09:54:33', '2018-03-29 09:54:33');
INSERT INTO `proc` VALUES ('22', '6', '3', '57', '员工提交申请', '10', '周文俊', '董事会', '10', '周文俊', '董事会', '9', null, '0', '1', '1', null, '1522307601', '2018-03-29 15:13:21', '2018-03-29 15:13:21');
INSERT INTO `proc` VALUES ('23', '6', '3', '73', '部门主管审核', '8', '测试人员1', '董事会', '0', '', '', '0', null, '0', '1', '1', null, '1522307601', '2018-03-29 15:13:21', '2018-03-29 15:13:21');
INSERT INTO `proc` VALUES ('24', '7', '3', '57', '员工提交申请', '10', '周文俊2', '董事会', '10', '周文俊2', '董事会', '9', null, '0', '1', '1', null, '1523415157', '2018-04-11 10:52:37', '2018-04-11 10:52:37');
INSERT INTO `proc` VALUES ('25', '7', '3', '73', '部门主管审核', '8', '测试人员1', '董事会', '8', '测试人员1', '董事会', '9', '231231', '0', '1', '1', null, '1523415157', '2018-04-19 09:41:29', '2018-04-19 09:41:29');
INSERT INTO `proc` VALUES ('26', '7', '3', '60', '综管报备', '4', '王芳', '综管部', '10', '周文俊3', '董事会', '9', '的', '0', '1', '1', null, '1524102089', '2018-04-20 09:25:28', '2018-04-20 09:25:28');
INSERT INTO `proc` VALUES ('27', '7', '3', '60', '综管报备', '7', '王六', '综管部', '10', '周文俊3', '董事会', '9', '的', '0', '1', '1', null, '1524102089', '2018-04-20 09:25:28', '2018-04-20 09:25:28');
INSERT INTO `proc` VALUES ('28', '7', '3', '60', '综管报备', '9', '测试人员2', '董事会', '10', '周文俊3', '董事会', '9', '的', '0', '1', '1', null, '1524102089', '2018-04-20 09:25:28', '2018-04-20 09:25:28');
INSERT INTO `proc` VALUES ('29', '7', '3', '60', '综管报备', '10', '周文俊3', '董事会', '10', '周文俊3', '董事会', '9', '的', '0', '1', '1', null, '1524102089', '2018-04-20 09:25:28', '2018-04-20 09:25:28');
INSERT INTO `proc` VALUES ('30', '8', '4', '75', '入档', '9', '测试人员2', '董事会', '0', '', '', '0', null, '0', '1', '1', null, '1524187527', '2018-04-20 09:25:27', '2018-04-20 09:25:27');

-- ----------------------------
-- Table structure for process
-- ----------------------------
DROP TABLE IF EXISTS `process`;
CREATE TABLE `process` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flow_id` int(11) NOT NULL DEFAULT '0' COMMENT '流程id',
  `process_name` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '步骤名称',
  `limit_time` int(11) NOT NULL DEFAULT '0' COMMENT '限定时间,单位秒',
  `type` varchar(32) COLLATE utf8mb4_bin NOT NULL DEFAULT 'operation' COMMENT '流程图显示操作框类型',
  `icon` varchar(64) COLLATE utf8mb4_bin DEFAULT '' COMMENT '流程图显示图标',
  `process_to` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `style` text COLLATE utf8mb4_bin,
  `style_color` varchar(128) COLLATE utf8mb4_bin NOT NULL DEFAULT '#78a300',
  `style_height` smallint(6) NOT NULL DEFAULT '30',
  `style_width` smallint(6) NOT NULL DEFAULT '30',
  `position_left` varchar(128) COLLATE utf8mb4_bin NOT NULL DEFAULT '100px',
  `position_top` varchar(128) COLLATE utf8mb4_bin NOT NULL DEFAULT '200px',
  `position` smallint(6) NOT NULL DEFAULT '1' COMMENT '步骤位置',
  `child_flow_id` int(11) NOT NULL DEFAULT '0' COMMENT '子流程id',
  `child_after` tinyint(4) NOT NULL DEFAULT '2' COMMENT '子流程结束后 1.同时结束父流程 2.返回父流程',
  `child_back_process` int(11) NOT NULL DEFAULT '0' COMMENT '子流程结束后返回父流程进程',
  `description` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '步骤描述',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='流程步骤';

-- ----------------------------
-- Records of process
-- ----------------------------
INSERT INTO `process` VALUES ('57', '3', '员工提交申请', '0', 'operation', 'icon-heart', '', 0x77696474683A31353070783B6865696768743A31353070783B6C696E652D6865696768743A333070783B636F6C6F723A236435346532313B6C6566743A31313270783B746F703A31323270783B, '#d54e21', '30', '150', '112px', '122px', '0', '0', '2', '0', '', '2017-04-20 09:17:59', '2017-04-25 03:19:33');
INSERT INTO `process` VALUES ('60', '3', '综管报备', '0', 'operation', 'icon-ok', '', 0x77696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A236637303B6C6566743A37353170783B746F703A34393370783B, '#f70', '30', '30', '751px', '493px', '2', '4', '1', '73', '', '2017-04-20 09:18:08', '2017-05-02 15:42:11');
INSERT INTO `process` VALUES ('73', '3', '部门主管审核', '0', 'operation', 'icon-refresh', '', 0x77696474683A31353070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A33383270783B746F703A33343270783B, '#78a300', '30', '150', '382px', '342px', '1', '0', '2', '0', '', '2017-04-24 03:24:26', '2018-04-11 15:44:09');
INSERT INTO `process` VALUES ('74', '3', '部门经理审核', '0', 'operation', 'icon-refresh', '', 0x77696474683A31353070783B6865696768743A31353070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A39363370783B746F703A31353470783B, '#78a300', '30', '150', '963px', '154px', '1', '0', '2', '0', '', '2017-04-24 03:26:30', '2017-04-28 10:46:42');
INSERT INTO `process` VALUES ('75', '4', '入档', '0', 'operation', null, '', 0x77696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A33333070783B746F703A31363170783B, '#78a300', '30', '30', '330px', '161px', '0', '0', '1', '0', '', '2017-05-02 10:12:38', '2017-05-02 13:49:51');
INSERT INTO `process` VALUES ('76', '4', '总经理复审', '0', 'operation', null, '', 0x77696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A37363270783B746F703A33383870783B, '#78a300', '30', '30', '762px', '388px', '1', '0', '2', '0', '', '2017-05-02 10:12:43', '2017-05-02 10:16:38');
INSERT INTO `process` VALUES ('84', '6', '采购申请', '0', 'operation', null, '', 0x77696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A37373670783B746F703A31343070783B, '#78a300', '30', '30', '776px', '140px', '0', '0', '2', '0', '', '2018-03-28 21:10:52', '2018-03-28 21:11:29');
INSERT INTO `process` VALUES ('85', '6', 'IT审核', '0', 'operation', null, '', 0x77696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A39343770783B746F703A31333870783B, '#78a300', '30', '30', '947px', '138px', '1', '0', '2', '0', '', '2018-03-28 21:11:36', '2018-03-29 09:28:48');
INSERT INTO `process` VALUES ('86', '6', '采购审核', '0', 'operation', null, '', 0x77696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A3131393870783B746F703A31373570783B, '#78a300', '30', '30', '1198px', '175px', '1', '0', '2', '0', '', '2018-03-29 09:28:54', '2018-03-29 09:29:10');
INSERT INTO `process` VALUES ('87', '6', '是否有预算', '0', 'operation', null, '', 0x77696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A3130393970783B746F703A31323070783B, '#78a300', '30', '30', '1099px', '120px', '1', '0', '2', '0', '', '2018-03-29 09:30:14', '2018-03-29 09:30:33');
INSERT INTO `process` VALUES ('88', '6', '物品类型', '0', 'operation', null, '', 0x77696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A3131373470783B746F703A31373970783B, '#78a300', '30', '30', '1174px', '179px', '1', '0', '2', '0', '', '2018-03-29 09:31:23', '2018-03-29 09:31:37');
INSERT INTO `process` VALUES ('89', '6', '最加预算', '0', 'operation', null, '', 0x77696474683A333070783B6865696768743A333070783B6C696E652D6865696768743A333070783B636F6C6F723A233738613330303B6C6566743A37373270783B746F703A33313370783B, '#78a300', '30', '30', '772px', '313px', '1', '0', '2', '0', '', '2018-03-29 09:33:12', '2018-03-29 09:33:39');

-- ----------------------------
-- Table structure for process_var
-- ----------------------------
DROP TABLE IF EXISTS `process_var`;
CREATE TABLE `process_var` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `process_id` int(11) NOT NULL,
  `flow_id` int(11) NOT NULL COMMENT '流程id',
  `expression_field` varchar(45) COLLATE utf8mb4_bin NOT NULL COMMENT '条件表达式字段名称',
  PRIMARY KEY (`id`),
  KEY `step_id` (`process_id`),
  KEY `workflow_id` (`flow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='步骤判断变量记录';

-- ----------------------------
-- Records of process_var
-- ----------------------------
INSERT INTO `process_var` VALUES ('1', '33', '1', 'day');
INSERT INTO `process_var` VALUES ('3', '73', '3', 'day');
INSERT INTO `process_var` VALUES ('4', '73', '3', 'reason');

-- ----------------------------
-- Table structure for template
-- ----------------------------
DROP TABLE IF EXISTS `template`;
CREATE TABLE `template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_name` varchar(64) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `template_name` (`template_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='流程模板';

-- ----------------------------
-- Records of template
-- ----------------------------
INSERT INTO `template` VALUES ('1', '请假模板', '2017-04-21 10:36:07', '2017-04-21 10:36:08');
INSERT INTO `template` VALUES ('2', '采购模板', '2018-03-28 21:03:42', '2018-03-28 21:03:42');

-- ----------------------------
-- Table structure for template_form
-- ----------------------------
DROP TABLE IF EXISTS `template_form`;
CREATE TABLE `template_form` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_id` int(11) NOT NULL DEFAULT '0',
  `field` varchar(64) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '表单字段英文名',
  `field_name` varchar(64) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '表单字段中文名',
  `field_type` varchar(64) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '表单字段类型',
  `field_value` text COLLATE utf8mb4_bin COMMENT '表单字段值，select radio checkbox用',
  `field_default_value` text COLLATE utf8mb4_bin COMMENT '表单字段默认值',
  `rules` text COLLATE utf8mb4_bin,
  `sort` int(11) NOT NULL DEFAULT '100' COMMENT '排序',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `template_id` (`template_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='流程模板表单控件';

-- ----------------------------
-- Records of template_form
-- ----------------------------
INSERT INTO `template_form` VALUES ('1', '1', 'day', '请假天数', 'text', null, null, null, '100', '2017-04-25 13:48:16', '0000-00-00 00:00:00');
INSERT INTO `template_form` VALUES ('2', '1', 'reason', '请假原因', 'textarea', null, null, null, '100', '2017-04-25 07:10:19', '2017-04-25 07:10:19');
INSERT INTO `template_form` VALUES ('3', '1', 'start_date', '开始日期', 'date', null, null, null, '900', '2017-04-27 16:05:21', '2017-04-27 06:39:51');
INSERT INTO `template_form` VALUES ('4', '1', 'end_date', '结束日期', 'date', null, null, null, '901', '2017-04-27 06:42:44', '2017-04-27 06:42:44');
INSERT INTO `template_form` VALUES ('5', '1', 'leave_type', '请假类型', 'select', 0xE79785E581870D0AE5A99AE58187, 0xE79785E58187, null, '50', '2017-04-27 07:12:01', '2017-04-27 07:12:01');
INSERT INTO `template_form` VALUES ('6', '1', 'sex', '性别', 'radio', 0xE794B70D0AE5A5B30D0AE4BF9DE5AF86, 0xE4BF9DE5AF86, null, '1000', '2017-04-27 08:34:10', '2017-04-27 08:34:10');
INSERT INTO `template_form` VALUES ('7', '1', 'hobby', '兴趣爱好', 'checkbox', 0xE8B6B3E790830D0AE7AFAEE790830D0AE4B992E4B993E79083, null, null, '1002', '2017-04-27 08:35:28', '2017-04-27 08:35:28');
INSERT INTO `template_form` VALUES ('8', '1', 'bingli', '病例', 'file', null, null, null, '1200', '2017-04-28 09:48:16', '2017-04-28 09:48:16');
INSERT INTO `template_form` VALUES ('9', '2', 'type', '采购类型', 'select', 0xE58A9EE585ACE794B5E5AD90E8AEBEE5A4870D0AE4BBAAE599A8E794B5E5AD90E8AEBEE5A4870D0AE585B6E4BB96E789A9E59381, 0xE585B6E4BB96E789A9E59381, null, '50', '2018-03-28 21:08:58', '2018-03-28 21:08:58');
