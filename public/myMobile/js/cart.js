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
                $(".total span").html("0.00");
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

  // 选择尺码

  
  
  // 编辑功能


  $("#refreshContainer").on("tap",".edit",function(){
    var id = $(this).data("id");
    var size = $(this).data("size");
    var num = $(this).data("num");
    var data = this.dataset;
    var html = template("tpl2",data);
    // console.log(this.dataset)
    // console.log(html)
    html = html.replace(/\n/g, "");    
    // html = html.replace(/n\g,"");
    mui.confirm(html,"编辑商品",["确定","取消"],function(e){
      // mui(".mui-numbox").numbox()
      if(e.index === 1){
        mui.toast("操作取消");
      }
      if(e.index === 0){
        var size = $(".size span.now").text();
        var num = $(".mui-numbox-input").val();
        var id = $(".mui-numbox-input").data("id");
        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data:{
            id:id,
            num:num,
            size:size
          },
          success:function(data){
            if(data.success){
              mui.toast("编辑成功");
              mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();            
            }
          }

        })
      }

    })
    mui(".mui-numbox").numbox();
    $(".size span").on("tap",function(){
      $(this).addClass("now").siblings().removeClass("now");
    })

  })


  


  // 删除功能

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