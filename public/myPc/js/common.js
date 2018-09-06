$(function(){
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxComplete(function(){
    NProgress.done();
  })

  if(location.href.indexOf("login.html")==-1){
    // console.log("呵呵")
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function(data){
        console.log(data);
        if(data.error == 400){
          location.href = "login.html";
        }
      }
    })
  }


  // 切换导航栏
  $(".icon-menu").on("click",function(){
    $(".lt_aside").toggleClass("toggle");
    $(".lt_content").toggleClass("toggle");
    $(".lt_content .head").toggleClass("toggle");
  })


  // 退出功能

  $(".icon-logout").on("click",function(){
    $("#logoutModal").modal("show");
  })

  $(".btn_logout").on("click",function(){
    // console.log("哈哈")
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function(data){
        // console.log(data);
        if(data.success){
          location.href="login.html";
        }
      }
    })
  })
})