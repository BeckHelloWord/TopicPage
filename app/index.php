<?php
include '../public/fun.php';
if(isMobile()){
	require_once('index_mobile_new.html');
}else{
	require_once('index_pc_new.html');
}
?>