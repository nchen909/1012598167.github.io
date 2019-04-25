
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "url_";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}

$theurl = $_POST['fname'];
//******************** 上传数据 ********************************
$sql = "INSERT INTO connect(url) VALUES ('$theurl')";
if (mysqli_query($conn, $sql)) {
    echo $theurl;
} else {
    ?><script type="text/javascript">alert( "Error: " . $sql . "<br>" . mysqli_error($conn));</script><?php
}
mysqli_close($conn);
//<?php
///**
// * Created by PhpStorm.
// * User: chenn
// * Date: 2019/4/25
// * Time: 21:06
// */
//$m2=$_POST['fname'];
//echo $m2;