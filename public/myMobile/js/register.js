$(function(){

  var num ;

  // 获取验证码功能

$(".get").on("tap",function(){
  num = 100000+Math.ceil(Math.random()*900000);
  console.log(num);
  $(this).prop("disabled","true");
  $(this).css("backgroundColor","#666")
  $(this).text("正在发送中...");
  var time = 60;
  var timer = setInterval(function(){
    
    time--;
    
    $(".get").text("请于"+time+"秒后重新发送");

    if(time < 1){
      $(".get").prop("disabled",false);
      $(".get").css("backgroundColor","blue")
      $(".get").text("发送验证码");
      clearInterval(timer);      
    }
  },1000);
})


$(".register").on("tap",function(){
  var name = $("#username").val().trim();
  var pwd1 = $("#password").val().trim();
  var pwd2 = $("#password2").val().trim();
  var mobile = $("#mobile").val().trim();
  var num2 = $("#num").val().trim();

  if(!name){
    mui.toast("请输入用户名");
    return;
  }
  if(!pwd1){
    mui.toast("请输入密码");
    return;
  }
  if(!pwd2){
    mui.toast("请输入确认密码");
    return;
  }
  if(!mobile){
    mui.toast("请输入手机号");
    return;
  }
  if(!num2){
    mui.toast("请输入验证码");
    return;
  }
  if(pwd1 != pwd2){
    mui.toast("两次输入的密码不一致");
    return;
  }
  if(num2 != num){
    mui.toast("请输入正确的验证码");
    return;
  }
  mui.toast("注册成功");
})




})