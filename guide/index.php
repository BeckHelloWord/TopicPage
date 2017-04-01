<?php
include '../public/fun.php';
if(isMobile()){
	require_once('index_mobile2017.html');
}else{
	require_template('index_pc2017.html');
}
?>