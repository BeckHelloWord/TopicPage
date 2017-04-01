<?php
define("APP_ROOT",dirname(__FILE__));

function isMobile(){
	$useragent=isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';  
	$useragent_commentsblock=preg_match('|\(.*?\)|',$useragent,$matches)>0?$matches[0]:'';  	  
	function CheckSubstrs($substrs,$text){  
		foreach($substrs as $substr)  
			if(false!==strpos($text,$substr)){  
				return true;  
			}  
			return false;  
	}
	$mobile_os_list=array('Google Wireless Transcoder','Windows CE','WindowsCE','Symbian','Android','armv6l','armv5','Mobile','CentOS','mowser','AvantGo','Opera Mobi','J2ME/MIDP','Smartphone','Go.Web','Palm','iPAQ','iPad');
	$mobile_token_list=array('Profile/MIDP','Configuration/CLDC-','160×160','176×220','240×240','240×320','320×240','UP.Browser','UP.Link','SymbianOS','PalmOS','PocketPC','SonyEricsson','Nokia','BlackBerry','Vodafone','BenQ','Novarra-Vision','Iris','NetFront','HTC_','Xda_','SAMSUNG-SGH','Wapaka','DoCoMo','iPhone','iPod','Mobile');  
		  
	$found_mobile=CheckSubstrs($mobile_os_list,$useragent_commentsblock) ||  
			  CheckSubstrs($mobile_token_list,$useragent);  
		  
	if ($found_mobile){  
		return true;  
	}else{  
		return false;  
	}  
}


//解析网页，并且替换输出
//$parser_array格式为：$array['key'] = value;
function read_file($filename){
    if(!file_exists($filename)){
      echo $filename.'不存在。';
      exit;
    }
    $handle = fopen($filename,'r');
    $buffer = fread($handle,filesize($filename));
    @fclose($buffer);
    return $buffer;
}



//解析网页，并且替换输出
//$parser_array格式为：$array['key'] = value;
function require_template( $filename, $array=array() ){
    if(!$filename) exit(); //第一参数必传
    
    $buffer = read_file($filename); //读取模版
    
    //读取片段
    $parser_array['{header}'] = read_file(APP_ROOT.'/header_2016.php');;
    $parser_array['{copyright}'] = read_file(APP_ROOT.'/copyright_2016.php');
    
    $tags = array_merge($parser_array, $array); //合并tags
    
    //开始查找替换
    while(list($key,$value)=each($tags)) {
            $buffer = str_replace($key,$value,$buffer); //内容替换
    }
    
    echo $buffer;
}


?>