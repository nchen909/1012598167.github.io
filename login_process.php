<?php
/**
 * Created by PhpStorm.
 * User: chenn
 * Date: 2019/4/18
 * Time: 19:56
 */
//get value
    $username=$_POST["username"];
    $password=$_POST["password"];
//prevent mysql injection
    $username=stripcslashes($username);
    $password=stripcslashes($password);
    $username=mysqli_real_escape_string($username);
    $password=mysqli_real_escape_string($password);
    //connect to the server and select database
mysqli_connect("localhost","root","");
mysqli_select_db("login_");
$result=mysqli_query("select * from users where username ='$username' and password = '$password'")
    or die("Failed to query database " .mysqli_error());
$row = mysqli_fetch_array($result);
if($row['username']==$username && $row['$password']==$password){
    echo "login success!!! welcome". $row['username'];
}
else{
    echo "failed to login!";
}
?>