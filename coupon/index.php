<?php
$topicName = '新客红包兑换活动';
$btnName = '立即兑换奖品';
$PC_pic1 = '//bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/6005a124-b0ea-4e8a-b65e-3492f21a169d.jpg';
$Mob_pic1 = '//bxwd-img.oss-cn-hangzhou.aliyuncs.com/upload/image/5952807b-03f6-4468-b018-a3242ff73efd.jpg';

//=========以下为系统参数=========

$hostBase = '/';

include '../public/fun.php';
if(isMobile()){
	require_once('index_mobile.html');
}else{
	require_once('index_pc.html');
}
?>
