<?php

	function getInput($varName) {
		$res = array_merge($_REQUEST,$_COOKIE,$_FILES);
		return isset($res[$varName]) ? $res[$varName] : "";
	}

$database = '.';
$table = 'qd.csv';


$action = getInput('a');
$cookieName = 'qtxtdb';
$logined = getInput($cookieName);
if (empty($logined) and ($action != 'login')) {
	echo <<<EOF
		<H4>请先登录</H4>
		<form action="?a=login" method="post">
		帐号：<INPUT TYPE="text" NAME="user" value="admin"><BR>
		密码：<INPUT TYPE="text" NAME="pass" value="qtxtdb"><BR>
		<INPUT TYPE="submit" value='提交'>
		</form>
EOF;
	exit;
}
$inc = './qtxtdb.class.php';
include_once($inc);
$t = new QTxtDB($database);
if (!file_exists($database.'/'.$table))
	$t->createTable($table,array('ID'=>5,'username'=>40,'mobile'=>13,'avatar'=>200,'lucky'=>1,'create_time'=>20,'update_time'=>20));
//$t->csvToQtxtdb($table);
$t->selectTable($table);

switch($action) {
	case 'login':
		echo <<<EOF
	<div class="jumpInfo">
	<fieldset>
		<legend>提示</legend>
	<META HTTP-EQUIV=REFRESH CONTENT='1;URL="?"'>
EOF;
		$user = getInput('user');
		$pass = getInput('pass');


		if ($user == 'admin' and $pass=='qtxtdb9') {
			setcookie($cookieName,'rucLogined');
			$goto = "?";
			echo "登录成功！<BR />";
		}
		else {
			$goto = "?a=login";
			echo "密码或帐号错误！<BR />";
		}
		echo <<<EOF
		系统在 1 秒钟后自动跳转。<BR />
		如果无法正常跳转，请点击下面的连接：<BR /><BR />
		<a href=$goto>点击这里</a>
	</fieldset>
	</div>
EOF;

		break;
	case 'down':
		$fp = fopen($table,'r');
		Header("Content-type: application/octet-stream");
		Header("Accept-Ranges: bytes");
		Header("Accept-Length: ".filesize($table));
		Header("Content-Disposition: attachment; filename=".$table);
		$out = fread($fp,filesize($table));
		fclose($fp);
		$pattern = " *\"(,|\n)";
		$out = ereg_replace($pattern,"\"\\1",$out);
		echo $out;
		break;
	case 'del':
		$id = getInput('id');
		$t->delete($id);
		echo <<<EOF
	<div class="jumpInfo">
	<fieldset>
		<legend>提示</legend>
	<META HTTP-EQUIV=REFRESH CONTENT='1;URL="?"'>
		编辑成功！<BR />
		系统在 1 秒钟后自动跳转。<BR />
		如果无法正常跳转，请点击下面的连接：<BR /><BR />
		<a href="?">点击这里</a>
	</fieldset>
	</div>
EOF;
		break;
	case 'add':
		$record = getInput('record');
		if (empty($record)) {
			$record = $t->getFields();
			array_shift($record);
			echo "<form method='post' name='edit' action='?a=add'>\n";
			foreach ($record as $v) {
				echo "$v ：<input name='record[$v]' value=''>\n<BR>";
			}
			echo "<BR><INPUT TYPE='submit' value='提交'>\n";
			echo "</form>\n";
		}
		else {
			$idk = $t->getFields();
			$idk = current($idk);
			$id = $t->getCount()+1;
			$record = array_merge(array($idk=>$id),$record);
			$t->add($record);
			echo <<<EOF
	<div class="jumpInfo">
	<fieldset>
		<legend>提示</legend>
	<META HTTP-EQUIV=REFRESH CONTENT='1;URL="?"'>
		编辑成功！<BR />
		系统在 1 秒钟后自动跳转。<BR />
		如果无法正常跳转，请点击下面的连接：<BR /><BR />
		<a href="?">点击这里</a>
	</fieldset>
	</div>
EOF;
		}
		break;
	case 'edit':
		$id = getInput('id');
		$record = getInput('record');
		$photo = getInput('photo');
		if (empty($record)) {
			$record = $t->find($id);
			$id = array_shift($record);
			echo "<form method='post' name='edit' enctype='multipart/form-data' action='?a=edit'>\n";
			echo "<input type='hidden' name='record[id]' value='$id'>";
			foreach ($record as $k=>$v) {
				echo "$k ：<input name='record[$k]' value='$v'>\n<BR>";
			}
			echo "<BR><INPUT TYPE='submit' value='提交'>\n";
			echo "</form>\n";
		}
		else {
			$id = current($record);
			$t->update($id,$record);
			echo <<<EOF
	<div class="jumpInfo">
	<fieldset>
		<legend>提示</legend>
	<META HTTP-EQUIV=REFRESH CONTENT='1;URL="?"'>
		编辑成功！<BR />
		系统在 1 秒钟后自动跳转。<BR />
		如果无法正常跳转，请点击下面的连接：<BR /><BR />
		<a href="?">点击这里</a>
	</fieldset>
	</div>
EOF;
		}
		break;
	default:
		$list = $t->findAll();
		$fields = $t->getFields();
		echo "<CENTER>";
		echo "<H4>数据表 $table 管理</H4>";
		echo "<H4><B><A HREF='?a=down'>点此下载数据表！</A></B> | <B><A HREF='?a=add'>添加新记录！</A></B></H4>";
		echo "<TABLE border=1 width=70%>";
		foreach($list as $record): 
			$id = array_shift($record);
			echo "<TR>";
			//echo "<TD align=center><A HREF='?a=edit&id={$id}'>编辑</A> <A HREF='?a=del&id={$id}'>删除</A><BR></TD>";
			echo "<TD>";
			foreach ($record as $k=>$v) {
				echo "$k ：$v\n<BR>";
			}
			echo "</TD></TR>";
		endforeach;
		echo "</TABLE>";
		echo "</CENTER>";
		break;
}
//$t->debug();
?>
