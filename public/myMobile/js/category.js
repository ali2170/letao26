$(function(){

  function renderOne(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategory",
      success:function(data){
        console.log(data);
        $(".lt_content .left .mui-scroll").html(template("tpl",data));
      }
    })
  }

  renderOne();



  function renderTwo(id){
    $.ajax({
      type:'get',
      url:"/category/querySecondCategory",
      data:{
        id:id || 1
      },
      success:function(data){
        console.log(data);
        $(".lt_content .right .mui-scroll").html(template("tpl2",data));
      }
    })
  }
  
  renderTwo();

  $(".lt_content .left .mui-scroll ").on("click","a",function(){
    var id = $(this).data('id');

    $(this).addClass("now").siblings().removeClass("now");
    renderTwo(id);
  })
})