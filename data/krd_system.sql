/*
Navicat MySQL Data Transfer

Source Server         : krd
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : krd_system

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-05-11 16:20:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `equipment_sn` varchar(50) DEFAULT NULL COMMENT '设备编号',
  `price` decimal(10,2) DEFAULT NULL COMMENT '//参考价值',
  `remarks` varchar(10) DEFAULT NULL COMMENT '//备注',
  `factory` varchar(8) DEFAULT NULL COMMENT '//生产厂家',
  `name` varchar(45) DEFAULT NULL COMMENT '//品名',
  `type` int(11) DEFAULT NULL COMMENT '//物品类型',
  `standard` varchar(45) DEFAULT NULL COMMENT '//规格',
  `version` varchar(45) DEFAULT NULL COMMENT '//型号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//商品详情表';

-- ----------------------------
-- Records of goods
-- ----------------------------

-- ----------------------------
-- Table structure for krd_assets
-- ----------------------------
DROP TABLE IF EXISTS `krd_assets`;
CREATE TABLE `krd_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '//默认id',
  `created_at` bigint(20) DEFAULT NULL COMMENT '//添加的时间',
  `updated_at` bigint(20) DEFAULT NULL COMMENT '//修改时间',
  `deleted_at` bigint(20) DEFAULT NULL COMMENT '//软删除时间',
  `sn` varchar(20) DEFAULT NULL COMMENT '//资产编号',
  `equipment_sn` varchar(50) DEFAULT NULL COMMENT '设备编号',
  `type` varchar(20) DEFAULT NULL COMMENT '//资产类型',
  `name` varchar(50) DEFAULT NULL COMMENT '//资产品名',
  `quantity` decimal(10,2) DEFAULT NULL COMMENT '//计量',
  `unit` varchar(5) DEFAULT NULL COMMENT '//计量单位',
  `price` decimal(10,2) DEFAULT NULL COMMENT '//价值',
  `remarks` varchar(10) DEFAULT NULL COMMENT '//备注',
  `secrecy` varchar(3) DEFAULT NULL COMMENT '//保密等级',
  `images` varchar(300) DEFAULT NULL COMMENT '//图片',
  `factory` varchar(8) DEFAULT NULL COMMENT '//生产厂家',
  `add_mode` varchar(20) DEFAULT NULL COMMENT '//固定资产添加方式.',
  `users` varchar(45) DEFAULT NULL COMMENT '//使用人',
  `user_type` varchar(5) DEFAULT NULL COMMENT '//使用类型,部门和人',
  `user_id` int(11) DEFAULT NULL COMMENT '//使用人/部门id\n',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='//固定资产登记表';

-- ----------------------------
-- Records of krd_assets
-- ----------------------------
INSERT INTO `krd_assets` VALUES ('1', '1522135503', '1522226478', null, 'KRDB0001', 'DSC233242', '笔记本', '天逸V310', '1.00', '台', '3500.00', '无', '2级', null, '联想', '管理员直接添加', '周文俊', '职员', '23');
INSERT INTO `krd_assets` VALUES ('2', '1522135503', '1522226478', null, 'KRDB0001', 'DSC3897497HFU', '笔记本', '华硕712', '1.00', '台', '5500.00', '无', '2级', null, '华硕', '管理员直接添加', '信息技术部', '部门', '7');
INSERT INTO `krd_assets` VALUES ('3', '1522135503', '1522226478', null, 'KRDB0001', null, '笔记本', '天逸V45', '1.00', '台', '3400.00', '测试', '2级', null, '联想', null, '周文俊', '职员', '23');
INSERT INTO `krd_assets` VALUES ('4', '1522135977', '1522226478', null, 'KRDT0001', null, '台式电脑', '天逸43', '1.00', '台', '45666.00', '测试', '4级', null, '华硕', null, '苏雄', '职员', '24');
INSERT INTO `krd_assets` VALUES ('5', '1522136316', '1522226478', null, 'KRDT0002', null, '台式电脑', '测试', '1.00', '二', '123123.00', '人', '2级', null, '华硕', null, '运营中心', '部门', '3');
INSERT INTO `krd_assets` VALUES ('6', '1522136346', '1522226478', null, 'KRDT0002', null, '台式电脑', '测试', '1.00', '二', '123123.00', '人', '2级', null, '华硕', null, '运营中心', '部门', '3');
INSERT INTO `krd_assets` VALUES ('7', '1522136397', '1522226478', null, 'KRDT0002', null, '台式电脑', '测试', '1.00', '二', '123123.00', '人', '2级', null, '华硕', null, '运营中心', '部门', '3');
INSERT INTO `krd_assets` VALUES ('8', '1522136411', '1522226478', null, 'KRDT0002', null, '台式电脑', '测试', '1.00', '二', '123123.00', '人 发过地方的大概', '2级', null, '华硕', null, '运营中心', '部门', '3');
INSERT INTO `krd_assets` VALUES ('9', '1522136524', '1522226478', null, 'KRDT0002', null, '台式电脑', '测试', '1.00', '二', '123123.00', '人', '2级', null, '华硕', null, '运营中心', '部门', '3');
INSERT INTO `krd_assets` VALUES ('10', '1522136543', '1522226478', null, 'KRDT0002', null, '台式电脑', '测试', '1.00', '二', '123123.00', '人', '2级', null, '华硕', null, '运营中心', '部门', '3');
INSERT INTO `krd_assets` VALUES ('11', '1522136674', '1522226478', null, 'KRDT0002', null, '台式电脑', '测试', '1.00', '二', '123123.00', '人', '2级', null, '华硕', null, '运营中心', '部门', '3');
INSERT INTO `krd_assets` VALUES ('12', '1522136710', '1522226478', null, 'KRDT0003', null, '台式电脑', '测是', '1.00', '为', '231.00', '切尔驱动', '3级', null, '联想', null, '采购部', '部门', '29');
INSERT INTO `krd_assets` VALUES ('13', '1522152605', '1522226478', null, 'KRDB0002', null, '笔记本', '天逸V310', '1.00', '台', '3600.00', '备注', '1级', null, '华硕', null, '测试10', '职员', '27');
INSERT INTO `krd_assets` VALUES ('14', '1522204590', '1522300531', null, 'KRDB0001', null, '笔记本', '炫六', '1.00', '台', '30000.00', '测试用', '3级', null, '华硕', null, '测试3', '职员', '26');
INSERT INTO `krd_assets` VALUES ('15', '1522205398', '1522226478', null, 'KRDB0002', null, '笔记本', '测试8', '1.00', '台', '5000.00', '测试', '2级', null, '戴尔', null, '测试1', '职员', '25');
INSERT INTO `krd_assets` VALUES ('16', '1522213428', '1522226478', null, 'KRDB0003', null, '笔记本', '测试89', '1.00', '台', '12345.00', '测试测试用', '3级', null, '戴尔', null, '人事行政中心', '部门', '2');

-- ----------------------------
-- Table structure for krd_assets_extend
-- ----------------------------
DROP TABLE IF EXISTS `krd_assets_extend`;
CREATE TABLE `krd_assets_extend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `krd_asset_id` int(11) DEFAULT NULL COMMENT '//固定资产表id',
  `info` text COMMENT '//详细信息',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='//固定资产详情';

-- ----------------------------
-- Records of krd_assets_extend
-- ----------------------------
INSERT INTO `krd_assets_extend` VALUES ('1', null, null, null, '15', '没有哈没有哈电风扇鼎折覆餗地方是');
INSERT INTO `krd_assets_extend` VALUES ('2', null, null, null, '14', '没有哈,没有哈');
INSERT INTO `krd_assets_extend` VALUES ('3', null, null, null, '1', null);
INSERT INTO `krd_assets_extend` VALUES ('4', null, null, null, '2', null);
INSERT INTO `krd_assets_extend` VALUES ('5', null, null, null, '16', '详细信息而已<br />');
INSERT INTO `krd_assets_extend` VALUES ('6', null, null, null, '8', 'v电饭锅大锅饭多个如果人头还是福发过是<br />');

-- ----------------------------
-- Table structure for krd_assets_type
-- ----------------------------
DROP TABLE IF EXISTS `krd_assets_type`;
CREATE TABLE `krd_assets_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL COMMENT '//类型名',
  `assets_tab` varchar(45) DEFAULT NULL COMMENT '//资产sn前缀',
  `department_id` int(11) DEFAULT NULL COMMENT '//部门id',
  `number` int(11) DEFAULT NULL COMMENT '//编号计数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='//资产类型';

-- ----------------------------
-- Records of krd_assets_type
-- ----------------------------
INSERT INTO `krd_assets_type` VALUES ('1', null, null, null, '笔记本', 'B', '3', '3');
INSERT INTO `krd_assets_type` VALUES ('2', null, null, null, '台式电脑', 'T', '3', '1');
INSERT INTO `krd_assets_type` VALUES ('3', null, null, null, '打印机', 'P', '3', '1');
INSERT INTO `krd_assets_type` VALUES ('4', null, null, null, '路由器', 'R', '3', '1');
INSERT INTO `krd_assets_type` VALUES ('5', null, null, null, '机架式服务器', 'S', '3', '1');
INSERT INTO `krd_assets_type` VALUES ('6', null, null, null, '交换机', 'W', '3', '1');
INSERT INTO `krd_assets_type` VALUES ('7', null, null, null, '显示器', 'X', '3', '1');

-- ----------------------------
-- Table structure for krd_assets_users
-- ----------------------------
DROP TABLE IF EXISTS `krd_assets_users`;
CREATE TABLE `krd_assets_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `assets_id` int(11) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='//关联资产和职员资料表';

-- ----------------------------
-- Records of krd_assets_users
-- ----------------------------

-- ----------------------------
-- Table structure for krd_departments
-- ----------------------------
DROP TABLE IF EXISTS `krd_departments`;
CREATE TABLE `krd_departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL COMMENT '//部门名字',
  `pid` int(11) DEFAULT NULL COMMENT '//父id',
  `images` varchar(200) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='//部门详情';

-- ----------------------------
-- Records of krd_departments
-- ----------------------------
INSERT INTO `krd_departments` VALUES ('1', null, null, null, '科瑞德', '0', null, '1');
INSERT INTO `krd_departments` VALUES ('2', null, '1519702809', null, '人事行政中心', '1', null, '1');
INSERT INTO `krd_departments` VALUES ('3', null, '1519719700', null, '运营中心', '1', null, '1');
INSERT INTO `krd_departments` VALUES ('4', null, '1519719600', null, '财务中心', '1', null, '1');
INSERT INTO `krd_departments` VALUES ('5', null, null, null, '制造中心', '1', null, '1');
INSERT INTO `krd_departments` VALUES ('6', null, '1519702529', null, '研发中心', '1', null, '1');
INSERT INTO `krd_departments` VALUES ('7', null, null, null, '信息技术部', '3', null, '1');
INSERT INTO `krd_departments` VALUES ('19', '1519613239', '1519962840', null, '出纳', '4', null, '1');
INSERT INTO `krd_departments` VALUES ('20', '1519616212', '1519719881', null, '人事部', '5', null, '1');
INSERT INTO `krd_departments` VALUES ('21', '1519616227', '1519962883', null, '财务部', '5', null, '1');
INSERT INTO `krd_departments` VALUES ('37', '1519967524', '1519967647', '1519967647', '测试1', '33', null, '2');
INSERT INTO `krd_departments` VALUES ('25', '1519622738', '1519719876', null, '采购部', '6', null, '1');
INSERT INTO `krd_departments` VALUES ('26', '1519622755', '1519702900', null, '药剂部', '6', null, '1');
INSERT INTO `krd_departments` VALUES ('27', '1519622850', '1519702912', null, '合成部', '6', null, '1');
INSERT INTO `krd_departments` VALUES ('28', '1519624289', '1519871129', null, '会计', '4', null, '1');
INSERT INTO `krd_departments` VALUES ('29', '1519624759', '1519702919', null, '采购部', '5', null, '1');
INSERT INTO `krd_departments` VALUES ('32', '1519626597', '1519871219', null, '采购部', '3', null, '1');
INSERT INTO `krd_departments` VALUES ('33', '1519630240', '1519871061', null, '销售中心', '1', null, '1');
INSERT INTO `krd_departments` VALUES ('34', '1519630254', '1519703200', null, '销售服务部', '33', null, '1');
INSERT INTO `krd_departments` VALUES ('36', '1519630281', '1519703140', null, '人事部', '2', null, '1');

-- ----------------------------
-- Table structure for krd_left_list
-- ----------------------------
DROP TABLE IF EXISTS `krd_left_list`;
CREATE TABLE `krd_left_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL COMMENT '//导航列表',
  `pid` tinyint(5) DEFAULT NULL COMMENT '//父id',
  `url` varchar(50) DEFAULT NULL COMMENT '//连接地址',
  `iconCls` varchar(20) DEFAULT NULL COMMENT '//小图标',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COMMENT='//系统左侧导航';

-- ----------------------------
-- Records of krd_left_list
-- ----------------------------
INSERT INTO `krd_left_list` VALUES ('1', null, null, null, '办公管理', '0', null, 'icon-system');
INSERT INTO `krd_left_list` VALUES ('2', null, null, null, '办公流程', '0', null, 'icon-system');
INSERT INTO `krd_left_list` VALUES ('3', null, null, null, '仓库管理', '0', null, 'icon-system');
INSERT INTO `krd_left_list` VALUES ('4', null, null, null, '财务管理', '0', null, 'icon-system');
INSERT INTO `krd_left_list` VALUES ('5', null, null, null, '人事管理', '0', null, 'icon-system');
INSERT INTO `krd_left_list` VALUES ('6', null, null, null, '数据统计', '0', null, 'icon-system');
INSERT INTO `krd_left_list` VALUES ('7', null, null, null, '系统管理', '0', null, 'icon-system');
INSERT INTO `krd_left_list` VALUES ('8', null, null, null, '工作计划', '1', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('9', null, null, null, '分配任务', '1', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('10', null, null, null, '通知管理', '1', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('11', null, null, null, '私信收发', '1', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('12', null, null, null, '事务管理', '2', '/work', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('13', null, null, null, '流程管理', '2', '/task', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('14', null, null, null, '事务流程', '2', '/worktask', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('15', null, null, null, '申请列表', '3', '/purchase/record', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('16', null, null, null, '类型管理', '3', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('17', null, null, null, '出库记录', '3', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('18', null, null, null, '库存警报', '3', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('19', null, null, null, '采购记录', '3', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('20', null, null, null, '收款记录', '4', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('21', null, null, null, '支出记录', '4', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('22', null, null, null, '登录帐号', '5', '/users', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('23', null, null, null, '员工档案', '5', '/staffs', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('24', null, null, null, '部门管理', '5', '/departments', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('25', null, null, null, '产品销量', '6', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('26', null, null, null, '人员分布', '6', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('27', null, null, null, '客户分析', '6', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('28', null, null, null, '权限管理', '7', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('29', null, null, null, '操作日志', '7', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('30', null, null, null, '空管理', '0', null, 'icon-system');
INSERT INTO `krd_left_list` VALUES ('31', null, null, null, '职位管理', '5', '/positions', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('34', null, null, null, '固定资产', '3', '/assets', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('35', null, null, null, '办公耗材', '3', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('36', null, null, null, '流程判断', '2', '/worktaskjudge', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('37', null, null, null, '执行管理', '2', '/taskperson', 'icon-book');
INSERT INTO `krd_left_list` VALUES ('38', null, null, null, '任务流程表', '2', null, 'icon-book');
INSERT INTO `krd_left_list` VALUES ('39', null, null, null, '流程事务表', '2', null, 'icon-book');

-- ----------------------------
-- Table structure for krd_positions
-- ----------------------------
DROP TABLE IF EXISTS `krd_positions`;
CREATE TABLE `krd_positions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `images` varchar(200) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='//部门职位表';

-- ----------------------------
-- Records of krd_positions
-- ----------------------------
INSERT INTO `krd_positions` VALUES ('1', null, '1519967417', null, '总经理', null, '1');
INSERT INTO `krd_positions` VALUES ('2', null, '1519967419', null, '采购', null, '1');
INSERT INTO `krd_positions` VALUES ('3', '1519960953', '1519967416', null, '财务', null, '1');
INSERT INTO `krd_positions` VALUES ('4', '1519960969', '1519967410', '1519967410', '出纳', null, '1');
INSERT INTO `krd_positions` VALUES ('5', '1519960982', '1519960982', null, '董事长', null, '1');
INSERT INTO `krd_positions` VALUES ('6', '1521699570', '1521699585', null, '网络管理员', null, '1');
INSERT INTO `krd_positions` VALUES ('7', '1522046825', '1522046825', null, '会计', null, '1');
INSERT INTO `krd_positions` VALUES ('8', '1522046853', '1522046853', null, '部门主管', null, '1');

-- ----------------------------
-- Table structure for krd_staffs
-- ----------------------------
DROP TABLE IF EXISTS `krd_staffs`;
CREATE TABLE `krd_staffs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT '//关联账户表字段',
  `number` char(4) DEFAULT NULL COMMENT '//员工编号',
  `name` char(12) DEFAULT NULL COMMENT '//员工姓名',
  `gender` char(1) DEFAULT NULL COMMENT '//1男2女',
  `id_card` char(18) DEFAULT NULL COMMENT '//身份证号码',
  `position` char(20) DEFAULT NULL COMMENT '//职位名称',
  `group_id` varchar(45) DEFAULT NULL COMMENT '//权限id',
  `tel` char(11) DEFAULT NULL COMMENT '//电话号码',
  `type` char(4) DEFAULT NULL COMMENT '//员工类型',
  `nation` char(5) DEFAULT NULL COMMENT '//名族',
  `marital_status` char(4) DEFAULT NULL COMMENT '//婚姻状况',
  `entry_status` char(2) DEFAULT NULL COMMENT '//在职状态',
  `entry_date` bigint(20) DEFAULT NULL COMMENT '//入职时间',
  `dimission_date` bigint(20) DEFAULT NULL COMMENT '//离职时间',
  `politics_status` char(4) DEFAULT NULL COMMENT '//政治面貌',
  `education` char(4) DEFAULT NULL COMMENT '//学历',
  `department` char(8) DEFAULT NULL COMMENT '//部门名称',
  `department_id` int(11) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COMMENT='//员工档案';

-- ----------------------------
-- Records of krd_staffs
-- ----------------------------
INSERT INTO `krd_staffs` VALUES ('23', '1521699906', '1523019229', null, '23', '0128', '周文俊', '男', '513826199012274211', '网络管理员', '6', '19982666200', '正式员工', '汉族', '未婚', '在职', '1513526400', null, '群众', '大专', '信息技术部', '7', '6');
INSERT INTO `krd_staffs` VALUES ('24', '1522031725', '1523848042', null, '26', '0123', '苏雄', '男', '513826199012283214', '网络管理员', '6', null, null, null, null, null, null, null, null, null, '信息技术部', '7', '6');
INSERT INTO `krd_staffs` VALUES ('25', '1522033637', '1523516839', null, '25', '0023', '测试1', '男', '513826199011304321', '部门主管', '8', '19982666200', '正式员工', '汉族', '未婚', '在职', '1521388800', null, '团员', '硕士', '信息技术部', '7', '8');
INSERT INTO `krd_staffs` VALUES ('26', '1522047995', '1523589117', null, null, '3241', '测试3', '男', '513274193212124211', '总经理', '1', null, null, null, null, null, null, null, null, null, '运营中心', '3', '1');
INSERT INTO `krd_staffs` VALUES ('27', '1522068623', '1523518049', null, '24', '2312', '测试10', '男', '513826199512242331', '网络管理员', '6', null, null, null, null, null, null, null, null, null, '信息技术部', '7', '6');
INSERT INTO `krd_staffs` VALUES ('28', '1522209724', '1523589149', null, null, '7621', '陈刚', '男', '513826198712274211', '董事长', '5', '18002731117', '正式员工', null, '未婚', '在职', '1520265600', null, '群众', '大专', '科瑞德', '1', '5');
INSERT INTO `krd_staffs` VALUES ('29', '1523860778', '1523860792', null, '27', '0122', '吴梦玥', '女', '513826199012231652', '部门主管', '8', null, null, null, null, null, null, null, null, null, '信息技术部', '7', '8');

-- ----------------------------
-- Table structure for krd_staff_extend
-- ----------------------------
DROP TABLE IF EXISTS `krd_staff_extend`;
CREATE TABLE `krd_staff_extend` (
  `staff_id` int(11) DEFAULT NULL,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `health` varchar(30) DEFAULT NULL COMMENT '//健康状态',
  `specialty` varchar(20) DEFAULT NULL COMMENT '//专业',
  `registered` varchar(10) DEFAULT NULL COMMENT '户口类型\n',
  `registered_address` varchar(50) DEFAULT NULL COMMENT '//户口所在地',
  `graduate_date` bigint(20) DEFAULT NULL COMMENT '//毕业时间',
  `graduate_colleges` varchar(20) DEFAULT NULL COMMENT '//毕业学校',
  `details` text COMMENT '//详情',
  `intro` varchar(255) DEFAULT NULL COMMENT '//个人简介'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of krd_staff_extend
-- ----------------------------
INSERT INTO `krd_staff_extend` VALUES ('23', null, null, null, '良好', '计算机网络技术', '外地户口', '四川眉山', '1372176000', '四川科技职业学院', '无', '一般般');
INSERT INTO `krd_staff_extend` VALUES ('24', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `krd_staff_extend` VALUES ('25', null, null, null, null, null, '本地城市户口', '四川', '1521475200', null, '一样哈', '测试唯一');
INSERT INTO `krd_staff_extend` VALUES ('26', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `krd_staff_extend` VALUES ('27', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `krd_staff_extend` VALUES ('28', null, null, null, null, '会计', '本地城市户口', null, '1521475200', '家里蹲', '撒地方地方撒都是撒地方撒地方', '没有哦');
INSERT INTO `krd_staff_extend` VALUES ('29', null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for krd_users
-- ----------------------------
DROP TABLE IF EXISTS `krd_users`;
CREATE TABLE `krd_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '//主键',
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `accounts` char(20) DEFAULT NULL COMMENT '//账号名称',
  `password` char(60) DEFAULT NULL COMMENT '//账号密码',
  `remember_token` char(100) DEFAULT NULL COMMENT '//记住我令牌',
  `last_login_time` bigint(20) DEFAULT NULL COMMENT '//最后一次登录时间',
  `last_login_ip` char(15) DEFAULT NULL COMMENT '//最后一次登录ip',
  `login_count` mediumint(8) DEFAULT NULL COMMENT '//登录次数',
  `status` tinyint(1) DEFAULT '0' COMMENT '//状态',
  `staff_id` int(11) DEFAULT NULL COMMENT '//关联员工档案',
  `department_id` int(11) DEFAULT NULL COMMENT '//关联部门id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of krd_users
-- ----------------------------
INSERT INTO `krd_users` VALUES ('23', '1521619709', '1523019229', null, 'admin', '$2y$10$knVnZgw/R3ihiNAGQ9F/GuGwAvh09VmlyMwKuOqcSRQWQA5QWeCpS', 'GoyJLRfA42tI6Lyb9HMmzG65LesrY6jdKDMoaciazWLms6nYOz8ji3v5w6d7', '1522209747', null, null, '1', '23', null);
INSERT INTO `krd_users` VALUES ('24', '1521619788', '1522209557', null, 'admin2', '$2y$10$beE.UTEOERkwZQ6es75Qu.fAo.pJHrZzTwkl07Q4qTAEwEF5DpF5.', null, null, null, null, '2', '27', null);
INSERT INTO `krd_users` VALUES ('25', '1521619825', '1522208389', null, 'admin3', '$2y$10$SkdhZXQuw.IfPUwknQgEnusgA41OrX5tizS.ooHLlkH7EnYKj/g1q', null, null, null, null, '2', '25', null);
INSERT INTO `krd_users` VALUES ('26', '1521619894', '1523848042', null, 'admin4', '$2y$10$uJDRu36A9QDKOztTaVMvw.YZr7362FAxS7wZtSDHsZ7linggnvpLu', 'rwvI6faAzL9LZPAPei5ep3KfrR6uk2qOVEqekjLq1Vcf6ddGPBxSkMTW2OW0', null, null, null, '1', '24', null);
INSERT INTO `krd_users` VALUES ('27', '1523860736', '1523860792', null, 'wumy', '$2y$10$nVrRZIny3XHksThRVxc5pe6WTiaN4JTxHZtZcpmIOSGtOHuQrtYMS', 'oVCt76Uitov74aYOZitCJ9dMijPugnJVpmljblVhKntBYX56U2cr4EG5A5pl', null, null, null, '1', '29', null);

-- ----------------------------
-- Table structure for purchase_record
-- ----------------------------
DROP TABLE IF EXISTS `purchase_record`;
CREATE TABLE `purchase_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `sn` varchar(50) DEFAULT NULL COMMENT '//采购申请的编号',
  `department_id` int(11) DEFAULT NULL COMMENT '//申请的部门id\n',
  `department_name` varchar(45) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL COMMENT '//申请人id',
  `person_name` varchar(45) DEFAULT NULL,
  `ask_date` bigint(20) DEFAULT NULL COMMENT '//申请时间',
  `budget` int(11) DEFAULT NULL COMMENT '//预算判断',
  `type` int(11) DEFAULT NULL COMMENT '申请类型,it资产非it资产',
  `remarks` text,
  `status` int(11) DEFAULT NULL COMMENT '//状态',
  `type_name` varchar(45) DEFAULT NULL COMMENT '//采购类型',
  `budget_name` varchar(45) DEFAULT NULL COMMENT '//有无预算',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//采购表';

-- ----------------------------
-- Records of purchase_record
-- ----------------------------

-- ----------------------------
-- Table structure for purchase_record_extend
-- ----------------------------
DROP TABLE IF EXISTS `purchase_record_extend`;
CREATE TABLE `purchase_record_extend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `version` varchar(100) DEFAULT NULL,
  `number` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `reach_date` bigint(20) DEFAULT NULL,
  `purchase_record_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of purchase_record_extend
-- ----------------------------

-- ----------------------------
-- Table structure for purchase_record_it_extend
-- ----------------------------
DROP TABLE IF EXISTS `purchase_record_it_extend`;
CREATE TABLE `purchase_record_it_extend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `purchase_type` varchar(45) DEFAULT NULL COMMENT '//类型',
  `cause` varchar(255) DEFAULT NULL COMMENT '//申请理由',
  `quantity` decimal(10,2) DEFAULT NULL COMMENT '//数量',
  `unit` varchar(5) DEFAULT NULL COMMENT '//计量单位',
  `purchase_record_id` int(11) DEFAULT NULL COMMENT '//关联主表id',
  `other_need` varchar(255) DEFAULT NULL COMMENT '//其他需求',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of purchase_record_it_extend
-- ----------------------------

-- ----------------------------
-- Table structure for purchase_type
-- ----------------------------
DROP TABLE IF EXISTS `purchase_type`;
CREATE TABLE `purchase_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL COMMENT '//类型名',
  `assets_tab` varchar(45) DEFAULT NULL COMMENT '//资产sn前缀',
  `department_id` int(11) DEFAULT NULL COMMENT '//部门id',
  `number` int(11) DEFAULT NULL COMMENT '//编号计数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of purchase_type
-- ----------------------------

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//任务名表';

-- ----------------------------
-- Records of task
-- ----------------------------

-- ----------------------------
-- Table structure for tasking
-- ----------------------------
DROP TABLE IF EXISTS `tasking`;
CREATE TABLE `tasking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `task_work_id` int(11) DEFAULT NULL COMMENT 'task_work_id关联',
  `task_work_name` varchar(45) DEFAULT NULL COMMENT '//task_work_id对应的name',
  `status` int(11) DEFAULT '1' COMMENT '//1进行,2完成,3驳回',
  `task_info_id` varchar(45) DEFAULT NULL COMMENT '//执行任务表',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//记录所有执行的任务流程表';

-- ----------------------------
-- Records of tasking
-- ----------------------------

-- ----------------------------
-- Table structure for task_info
-- ----------------------------
DROP TABLE IF EXISTS `task_info`;
CREATE TABLE `task_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `work_id` int(11) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `staff_name` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT '1' COMMENT '//1进行,2通过,3驳回',
  `pid` int(11) DEFAULT NULL,
  `tasking_id` int(11) DEFAULT NULL COMMENT '//任务流程id',
  `krd_task_id` int(11) DEFAULT NULL COMMENT '//当前任务的id(采购,请假)',
  `tasking_name` varchar(45) DEFAULT NULL COMMENT '//当前进度标题',
  `sn` int(11) DEFAULT NULL COMMENT '//流程编号',
  `table_type` varchar(45) DEFAULT NULL COMMENT '//相关联的表名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//一条流程的整体状态';

-- ----------------------------
-- Records of task_info
-- ----------------------------

-- ----------------------------
-- Table structure for task_work
-- ----------------------------
DROP TABLE IF EXISTS `task_work`;
CREATE TABLE `task_work` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL COMMENT '//关联流程表id',
  `work_id` int(11) DEFAULT NULL COMMENT '//关联具体任务id',
  `next_id` int(11) DEFAULT NULL COMMENT '//指向下一任务id',
  `remarks` varchar(255) DEFAULT NULL COMMENT '//备注',
  `child_work_id` int(11) DEFAULT NULL COMMENT '//子程序id',
  `child_after` int(11) DEFAULT NULL COMMENT '//子流程结束后 1.同时结束父流程 2.返回父流程',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//具体流程执行顺序表';

-- ----------------------------
-- Records of task_work
-- ----------------------------

-- ----------------------------
-- Table structure for task_work_extend
-- ----------------------------
DROP TABLE IF EXISTS `task_work_extend`;
CREATE TABLE `task_work_extend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `task_work_id` int(11) DEFAULT NULL COMMENT '//关联task_work_id',
  `judge` varchar(100) DEFAULT NULL COMMENT '//判断方法',
  `other` varchar(45) DEFAULT NULL COMMENT '//子程序判断',
  `execute` varchar(45) DEFAULT NULL COMMENT '//执行的类型0代表.子程序完成后主程序自动完成,1子程序完成后主程序需要自行确认',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//任务流程执行判断表';

-- ----------------------------
-- Records of task_work_extend
-- ----------------------------

-- ----------------------------
-- Table structure for task_work_person
-- ----------------------------
DROP TABLE IF EXISTS `task_work_person`;
CREATE TABLE `task_work_person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `task_work_id` int(11) DEFAULT NULL COMMENT '//任务流程表id',
  `person_id` int(11) DEFAULT '0' COMMENT '//部门或职员id',
  `person_type` char(4) DEFAULT NULL COMMENT '//执行人类型/部门职员',
  `execute` int(11) DEFAULT NULL COMMENT '//执行类型,0同时确认,1一人确认则ok',
  `remarks` varchar(255) DEFAULT NULL COMMENT '//备注',
  `position_id` int(11) DEFAULT '0' COMMENT '/职位id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//默认执行人和部门判断表';

-- ----------------------------
-- Records of task_work_person
-- ----------------------------

-- ----------------------------
-- Table structure for text
-- ----------------------------
DROP TABLE IF EXISTS `text`;
CREATE TABLE `text` (
  `c1` text,
  `c2` text,
  `C3` text,
  `c4` text,
  `c5` text,
  `c6` text,
  `c7` text,
  `c8` text,
  `c9` text,
  `c10` text,
  `c11` text,
  `c12` text,
  `c13` text,
  `c14` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of text
-- ----------------------------

-- ----------------------------
-- Table structure for waiting
-- ----------------------------
DROP TABLE IF EXISTS `waiting`;
CREATE TABLE `waiting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL COMMENT '//姓名',
  `passd` varchar(60) DEFAULT NULL COMMENT '//密码',
  `username` varchar(45) DEFAULT NULL COMMENT '//账号',
  `dep_id` tinyint(4) DEFAULT NULL COMMENT '//部门id',
  `sex` tinyint(4) DEFAULT NULL COMMENT '//性别',
  `phone` tinyint(4) DEFAULT NULL COMMENT '//手机号码',
  `telephone` tinyint(4) DEFAULT NULL COMMENT '//座机号码',
  `status` tinyint(4) DEFAULT NULL COMMENT '//状态激活停用',
  `email` varchar(80) DEFAULT NULL COMMENT '//邮箱',
  `nikename` varchar(45) DEFAULT NULL COMMENT '//昵称默认为姓名',
  `images` varchar(100) DEFAULT NULL COMMENT '//人员相片',
  `rank_id` tinyint(4) DEFAULT NULL COMMENT '//人员职称id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='//人员信息表';

-- ----------------------------
-- Records of waiting
-- ----------------------------

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL COMMENT '//任务名',
  `pid` int(11) DEFAULT NULL COMMENT '//关联父id',
  `table_name` varchar(45) DEFAULT NULL COMMENT '//相关联的表明',
  `url` varchar(45) DEFAULT NULL,
  `iconCls` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL COMMENT '//类型,目录或者是流程',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//存储具体流程表(采购申请/预算追加)';

-- ----------------------------
-- Records of work
-- ----------------------------

-- ----------------------------
-- Table structure for work_person
-- ----------------------------
DROP TABLE IF EXISTS `work_person`;
CREATE TABLE `work_person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL COMMENT '//执行人id',
  `person_name` varchar(10) DEFAULT NULL COMMENT '//执行人',
  `execute` varchar(45) DEFAULT NULL COMMENT '//执行的方式类型,全部确认或单个确认0是所有人,1是一个人',
  `tasking_id` int(11) DEFAULT NULL COMMENT '//执行记录id',
  `contents` text COMMENT '//审批内容',
  `status` int(11) DEFAULT '1' COMMENT '//状态1进行,2通过,3驳回',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='//执行当前任务流程的职员id';

-- ----------------------------
-- Records of work_person
-- ----------------------------
