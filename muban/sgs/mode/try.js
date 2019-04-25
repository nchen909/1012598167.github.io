$('button').click(function(){
    var js2_101=30;
    $.ajax({
        type:'GET',
        url:"connect.php",
        data:{text:js2_101},
        success: function(data){
            alert(data)
        }
    });
    return false;
});