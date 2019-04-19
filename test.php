<?php
/**
 * Created by PhpStorm.
 * User: chenn
 * Date: 2019/4/17
 * Time: 13:02
 */
$sql = mysqli_connect('localhost','root',"");
if($sql){
    echo '111';
}
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "message";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
if($conn){
    echo '222';
}