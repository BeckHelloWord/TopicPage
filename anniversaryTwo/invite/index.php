<?php
include '../../public/fun.php';
if(isMobile()){
	require_once('index_mobile.html');
}else{
	require_template('index_pc.html');
}
?>