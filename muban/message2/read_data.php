<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
die("连接失败: " . mysqli_connect_error());
}
$sql = "SELECT id,username,password FROM users";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
// 输出数据
while($row = $result->fetch_assoc()) {
echo "id: " . $row["id"]. " - Name: " . $row["username"]. " " . $row["password"]. "<br>";
}
} else {
echo "0 结果";
}
$conn->close();
?>