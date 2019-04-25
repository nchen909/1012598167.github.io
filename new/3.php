<?php 
//    header('Content-Type: text/html; charset=utf-8');
//	$_conn=@mysql_connect('localhost','root','') or die('数据库连接失败'); //连接数据库
//mysql_select_db('test',$_conn) or die('数据库不存在');  //选择数据库
//mysql_query('SET NAMES UTF8') or die('字符集错误');   //选择字符集
//	
//	mysql_query("INSERT INTO ceshi (
//						 liuyan_username
//						 ) VALUES (
//						 '{$_GET['text']}'
//						 )");
//	
//$query=mysql_query("SELECT * FROM ceshi");
//
//while($rows = mysql_fetch_row($query)){//有多少行数据就循环多少行
//	echo "<p>";
//	    for($i = 0; $i < 1; $i++){
//		echo $rows[1]."<br>";
//		}
//    echo "</p>";
//    }

$m2_10=$_GET['text'];
$php2=10;
echo $m2_10+$php2."<-----JS赋值给php，可以在PHP中进行编程";
?>
