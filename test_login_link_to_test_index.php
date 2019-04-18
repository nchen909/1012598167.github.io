<!DOCTYPE HTML>

<?php
    session_start();
    if(isset($_SESSION["logged_in"]) && $_SESSION["logged_in"]) {
        header("Location:success.php");
    }
    if(isset($_POST['username'])&& isset($_POST['password'])){

    }

?>
<html>
    <body>
        <form method="post" action="test_index.php">
            Username:<br/><!-- 换行-->
            <input type="test" name="username"><br/>
            Password<br/>
            <input type="password" name="password"><br/>
            <input type="submit" value="Login!">
        </form>
    </body>
</html>
<?php
/**
 * Created by PhpStorm.
 * User: chenn
 * Date: 2019/4/18
 * Time: 13:20
 */