<?php
header("content-type:text/html;charset=utf-8");
$mailsubject=$_POST['mailsubject'];
$mailbody=$_POST['mailbody'];

$stm= "主题是:".$mailsubject."内容是:".$mailbody;
require("smtp.php");
$smtpserver = "smtp.mxhichina.com";//SMTP服务器
$smtpserverport = 25;//SMTP服务器端口
$smtpusermail = "AAA@XXX.com";//SMTP服务器的用户邮箱
$smtpemailto = "BBB@XXX.com";//发送给谁
$smtpuser = "chennuo909@163.com";//SMTP服务器的用户帐号
$smtppass = "11111111qQ";//SMTP服务器的用户密码
$mailbody = $stm;//邮件内容
$mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件
$smtp = new smtp($smtpserver,$smtpserverport,false,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.
$smtp->debug = TRUE;//是否显示发送的调试信息
$smtp->sendmail($smtpemailto, $smtpusermail, $mailsubject, $mailbody, $mailtype);
if($smtp){
    echo "<script>alert('邮件发送成功');</script>";
}
else
{
    echo "<script>alert('邮件发送失败');</script>";
}