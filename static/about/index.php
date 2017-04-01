<?php
include '../../public/fun.php';
if(isMobile()){
	require_once('index_mobile.html');
}else{
	require_template('index_pc2016.html');
}
?>