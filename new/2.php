<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
<script src="js/jquery-1.8.3.min.js"></script>
<script>
$(function(){

  
             $('button').click(function(){
				    var js2_101=30;
					$.ajax({
					   type:'GET',
					   url:"3.php",
                       data:"text=js2_101",
					   success: function(data){
						 windows.alert(data);
					   }
					}); 
					return false;
			 });
			
  
});
</script>
</head>

<body>

<form method="post" action="3.php">
<button>测试</button>
</form>






<!--
没阻止默认行为的时候：(服务器默认接受2次数据，一个是data传递的参数即使没有写也会传递一个空值，一个是表单提交的信息)
data参数  和  input数据 如果提交的不一样  服务器接受2次不同的数据先接受data数据在接受input数据
data参数  和  input数据 如果提交的一样  服务器接受2次同样的数据先接受data数据在接受input数据


阻止默认行为时候：(服务器只接受一次数据，就是data传递的参数)
input提交的信息只能传递给data,data才能发送给服务器，服务器也只能接收到data的数据


-->








</body>
</html>