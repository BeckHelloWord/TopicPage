<?php
date_default_timezone_set ("Asia/Shanghai");

$database = '.';
$table = 'qd.csv';

include_once('./qtxtdb.class.php');
$t = new QTxtDB($database);

if (!file_exists($database.'/'.$table))
	$t->createTable($table,array('ID'=>5,'username'=>40,'mobile'=>13,'avatar'=>200,'lucky'=>5,'create_time'=>20,'update_time'=>20));

$t->selectTable($table);



$action = $_GET['a'];

switch($action) {
  
/*
*用户签到
*/
	case 'checkIn':

    $username=$_POST['username'];
    //echo $username;
    $avatar=$_POST['avatar'];
    //echo $avatar;
    $mobile=$_POST['mobile'];
    //echo $mobile;

    if ((!isset($username)) || (!isset($avatar)) || (!isset($mobile))) {
      echo '{"stat":"error"}';
      exit;
    }
    
    $record = array('username'=>$username, 'mobile'=>$mobile, 'avatar'=>$avatar, 'lucky'=>0, 'create_time'=>date('Y-m-d H:i:s'));
    //print_r($record);

    $list = $t->findAll();
    //print_r($list);
    foreach ($list as $v) {
      //print_r($v);
      if($mobile == $v['mobile']){
        echo '{"stat":0}';
        exit;
        
      }
    }

    $idk = $t->getFields();
    $idk = current($idk);
    $id = $t->getCount()+1;
    $record = array_merge(array($idk=>$id),$record);
    $t->add($record);

    echo '{"stat":1}';
		break;
/*
* 获取抽奖用户
*/
	case 'getAll':
      //获取抽奖用户
      //$list = $t->find(2);
      $list = $t->findAll();//查出所有人
      $json_list = array();

      foreach ($list as $v) { //剔除已中奖
        if ($v['lucky'] == 1) { continue; }
        $json_list[] = $v;
      }

      echo json_encode($json_list);  //返回给前台

		break;

/*
* 确认抽奖结果
*/
	case 'verify':
      //保存抽奖结果
      $id=$_POST['ID'];

      if (!isset($id)) {
        echo '{"stat":"error"}';
        exit;
      }

      $record = $t->find($id);
      $record['lucky'] = 1;
      $record['update_time'] = date('Y-m-d H:i:s');



      $t->update($id,$record);


      //$json_list=array();

      echo json_encode(array('stat'=>'yes'));
		break;

/*
* 获取抽奖结果
*/
	case 'getLucky':
      //获取抽奖用户
      $list = $t->findAll();//查出所有人
      $array = array();

      foreach ($list as $v) { //剔除未中奖
        if ($v['lucky'] == 0) { continue; }
        $array[] = $v;
      }
      //print_r($array);
      
      //按中奖顺序排序
      foreach ($array as $key=>$value){
          $id[$key] = $value['id'];
          $update_time[$key] = $value['update_time'];
      }
      array_multisort($id,SORT_NUMERIC,SORT_DESC,$update_time,SORT_STRING,SORT_ASC,$array);
      
      //print_r($array);
      echo json_encode($array);  //返回给前台

		break;
	default:
		echo "ERROR";
		break;
}


//$t->debug();
?>
