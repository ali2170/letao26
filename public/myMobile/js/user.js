$(function(){


// 获取用户信息
$.ajax({
  type:"get",
  url:"/user/queryUserMessage",
  success:function(data){
    console.log(data);
    if(data.error === 400){
      location.href = "login.html?lastUrl=user.html";
      return;
    }
    $(".user").html(template("tpl",data))
  }
})


// 退出按钮
  $(".btn").on("click",function(){
  mui.confirm("您确定要退出登录吗","温馨提示",["是","否"],function(e){
    if(e.index === 1){
      mui.toast("操作取消");
    }
    if(e.index === 0){
      $.ajax({
        type:"get",
        url:"/user/logout",
        success:function(data){
          if(data.success){
            location.href = "login.html";
          }
        }
      })
    }
    })
  })


})