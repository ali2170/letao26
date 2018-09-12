$(function(){
  mui.init({
    pullRefresh : {
      container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
      auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback :function(){
          $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function(data){
              console.log(data);
              if(data.error == 400){
                location.href = "login.html?lastUrl=cart.html";
                return;
              }
              
                setTimeout(function(){
                $("#refreshContainer .mui-table-view").html(template("tpl",{data:data}))
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                
                



              },1000)
              
              
              
              

            }
          })
          
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  // console.log('哈哈')
  // 计算总金额
  $("#OA_task_2").on("change","input",function(){
    var total = 0;
    $("input:checked").each(function(i,v){
      total+=$(v).data("price");
    })
    // console.log(total)
    total = total.toFixed(2)
    $(".total span").html(total );
  })

  // 编辑

  $("#refreshContainer").on("tap",".edit",function(){
    var id = $(this).data("id");
    var size = $(this).data("size");
    var num = $(this).data("num");
    var html = template("tpl2",this.dataset);
    console.log(html)
    // mui(".mui-numbox").numbox();
    mui.confirm(html,"温馨提示")
  })

  $("#refreshContainer").on("tap",".del",function(){
    var id = $(this).data("id");
    mui.confirm("您确定要删除该购物信息吗?","温馨提示",["是","否"],function(e){
      if(e.index === 1){
        mui.toast("操作取消");
      }
      if(e.index === 0){
        $.ajax({
          type:"get",
          url:'/cart/deleteCart',
          data:{
            id:id
          },
          success:function(data){
            console.log(data);
            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();            
          }
        })
      }
    })
  })

})