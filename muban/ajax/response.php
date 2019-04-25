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

$theurl = $_POST['info'];
//******************** 上传数据 ********************************
$sql = "INSERT INTO connect(url) VALUES ('$theurl')";
if (mysqli_query($conn, $sql)) {
    ?><script type="text/javascript">alert("数据提交成功");</script><?php
} else {
    ?><script type="text/javascript">alert( "Error: " . $sql . "<br>" . mysqli_error($conn));</script><?php
}
mysqli_close($conn);