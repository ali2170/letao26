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
})