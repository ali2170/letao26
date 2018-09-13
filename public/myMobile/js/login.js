$(function(){

  // 获取地址栏参数
  function getUrl(){
    var str = decodeURI(location.search);

    str = str.replace("?lastUrl=","");
    // console.log(str);

    return str;

    // var arr = str.split("=");
    // var obj = {};
    // obj[arr[0]]=arr[1];
    // return obj;
  }

  var url = getUrl();
  console.log(url);

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
        if(data.error){
          mui.toast(data.message);
          return;
        }
        if(data.success){
          location.href = url;
        }
      }
    })

  })
})