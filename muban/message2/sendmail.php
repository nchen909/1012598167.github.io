<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "message";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
echo "222";
require_once "Smtp.class.php";
//******************** 配置信息 ********************************
$smtpserver = "smtp.163.com";//SMTP服务器
$smtpserverport =25;//SMTP服务器端口
$smtpusermail = $_POST['toemail'];//SMTP服务器的用户邮箱
$smtpemailto = "chennuo909@163.com";//发送给谁
$smtpuser = $_POST['toemail'];//SMTP服务器的用户帐号，注：部分邮箱只需@前面的用户名
$smtppass = $_POST['pass'];//SMTP服务器的授权码
$mailtitle = $_POST['title'];//邮件主题
$mailcontent = "<h1>".$_POST['content']."</h1>";//邮件内容
$mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件
//******************** 上传数据 ********************************
$sql = "INSERT INTO users (toemail, pass, title, content)
VALUES ($smtpusermail,$smtppass,$mailtitle,$mailcontent)";
if (mysqli_query($conn, $sql)) {
    echo "数据提交成功";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
mysqli_close($conn);
//************************ 配置信息 ****************************
$smtp = new Smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.
$smtp->debug = false;//是否显示发送的调试信息
$state = $smtp->sendmail($smtpemailto, $smtpusermail, $mailtitle, $mailcontent, $mailtype);

echo "<div style='width:300px; margin:36px auto;'>";
if($state==""){
    echo "对不起，邮件发送失败！请检查邮箱或授权码填写是否有误。";
    echo "<a href='index.html'>点此返回</a>";
    exit();
}
echo "恭喜！邮件发送成功！！";
echo "<a href='index.html'>点此返回</a>";
echo "</div>";

?>