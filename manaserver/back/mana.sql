# Host: localhost  (Version: 5.5.53)
# Date: 2018-07-18 00:18:22
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "mn_purview"
#

DROP TABLE IF EXISTS `mn_purview`;
CREATE TABLE `mn_purview` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `fun_node_Id` varchar(255) NOT NULL DEFAULT '' COMMENT '函数节点Id',
  `fun_name` varchar(255) NOT NULL DEFAULT '' COMMENT '函数节点名',
  `fun_icon` varchar(255) DEFAULT '' COMMENT '函数节点图标',
  `fun_url` varchar(255) DEFAULT '' COMMENT '函数节点地址',
  `fun_desc` varchar(255) NOT NULL DEFAULT '0' COMMENT '函数节点排序',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='权限函数节点表';

#
# Data for table "mn_purview"
#

/*!40000 ALTER TABLE `mn_purview` DISABLE KEYS */;
/*!40000 ALTER TABLE `mn_purview` ENABLE KEYS */;

#
# Structure for table "mn_record_login"
#

DROP TABLE IF EXISTS `mn_record_login`;
CREATE TABLE `mn_record_login` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户登录记录';

#
# Data for table "mn_record_login"
#

/*!40000 ALTER TABLE `mn_record_login` DISABLE KEYS */;
/*!40000 ALTER TABLE `mn_record_login` ENABLE KEYS */;

#
# Structure for table "mn_role"
#

DROP TABLE IF EXISTS `mn_role`;
CREATE TABLE `mn_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` varchar(255) NOT NULL DEFAULT '' COMMENT '角色Id',
  `role_name` varchar(255) NOT NULL DEFAULT '' COMMENT '角色名字',
  `role_desc` varchar(255) NOT NULL DEFAULT '' COMMENT '角色排序',
  `open_flag` varchar(10) NOT NULL DEFAULT '0' COMMENT '开放状态',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='角色表';

#
# Data for table "mn_role"
#

/*!40000 ALTER TABLE `mn_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `mn_role` ENABLE KEYS */;

#
# Structure for table "mn_role_purview"
#

DROP TABLE IF EXISTS `mn_role_purview`;
CREATE TABLE `mn_role_purview` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` varchar(255) NOT NULL DEFAULT '' COMMENT '角色Id',
  `fun_node_Id` varchar(255) NOT NULL DEFAULT '' COMMENT '函数节点Id',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='角色权限表';

#
# Data for table "mn_role_purview"
#

/*!40000 ALTER TABLE `mn_role_purview` DISABLE KEYS */;
/*!40000 ALTER TABLE `mn_role_purview` ENABLE KEYS */;

#
# Structure for table "mn_user"
#

DROP TABLE IF EXISTS `mn_user`;
CREATE TABLE `mn_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `user_pwd` varchar(255) NOT NULL DEFAULT '' COMMENT '用户密码',
  `user_mobile` varchar(11) NOT NULL DEFAULT '' COMMENT '用户手机号',
  `user_email` varchar(255) NOT NULL DEFAULT '' COMMENT '用户邮箱',
  `manaId` varchar(255) NOT NULL DEFAULT '' COMMENT '用户manaId',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `open_flag` varchar(255) NOT NULL DEFAULT '0' COMMENT '账号状态码',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户表';

#
# Data for table "mn_user"
#

/*!40000 ALTER TABLE `mn_user` DISABLE KEYS */;
INSERT INTO `mn_user` VALUES (1,'123','123','123456','123@qq.com','','2018-07-17 23:39:45','0000-00-00 00:00:00','0');
/*!40000 ALTER TABLE `mn_user` ENABLE KEYS */;

#
# Structure for table "mn_user_role"
#

DROP TABLE IF EXISTS `mn_user_role`;
CREATE TABLE `mn_user_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `manaId` varchar(255) NOT NULL DEFAULT '' COMMENT '用户manaId',
  `roleId` varchar(255) NOT NULL DEFAULT '' COMMENT '对应角色Id',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户角色表';

#
# Data for table "mn_user_role"
#

/*!40000 ALTER TABLE `mn_user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `mn_user_role` ENABLE KEYS */;
