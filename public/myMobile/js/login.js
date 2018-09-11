$(function(){
  $(".btn_register").on("click",function(){
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    if(!username){
      mui.toast("请输入用户名");
      return;
    }
    if(!password){
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      type:"post",
      url:"/user/login",
      data:{
        username:username,
        password:password
      },
      success:function(data){
        console.log(data);
      }
    })

  })
})