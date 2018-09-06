$(function(){
  // 进度条功能
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxComplete(function(){
    NProgress.done();
  })


  // 判断是否登录(登录页除外)
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


  // 分类切换显示
  $(".son").parent().on("click",function(){
    $(".son").slideToggle();
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