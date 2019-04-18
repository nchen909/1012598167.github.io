<!DOCTYPE HTML>

<?php
//session_start();
//if(isset($_SESSION["logged_in"]) && $_SESSION["logged_in"]) {
//    header("Location:success.php");
//}
//if(isset($_POST['username'])&& isset($_POST['password'])){
//
//}
//
//?>
<html>
<head>
    <title>Login Page</title>
    <link rel="stylesheet" type="test/css" href="login_style.css">
</head>
<body>
    <div id="form">
        <form method="POST" action="login_process.php">
            <p>
                <label>Username:</label>
                <input type="text" id="user" name="user" />
            </p>
            <p>
                <label>Password:</label>
                <input type="password" id="pass" name="pass" />
            </p>
            <p>
                <input type="submit" id="btn" name="Login" />
            </p>
        </form>
    </div>

</body>
</html>
<?php
/**
 * Created by PhpStorm.
 * User: chenn
 * Date: 2019/4/18
 * Time: 17:19
 */