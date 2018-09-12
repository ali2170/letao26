$(function(){

  // 获取地址栏参数
  function getSearch(){
    var str = decodeURI(location.search);

    str = str.replace("?","");
    // console.log(str);

    var arr = str.split("&");

    var obj = {};
    arr.forEach(function(v,i){
      var newArr = v.split("=");
      obj[newArr[0]]=newArr[1];
    })
    // var arr = str.split("=");
    // var obj = {};
    // obj[arr[0]]=arr[1];
    return obj;
  }

  var url = getSearch().lastUrl;
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