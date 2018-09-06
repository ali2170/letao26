$(function(){
  
  // 渲染用户列表
  var currentPage = 1;
  var pageSize = 8;
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(data){
        console.log(data);
        $("tbody").html(template("tpl",data))

        // 分页
        $(".paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(data.total/data.size),
          size:"small",
          onPageClicked:function(event,originalEvent,type,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  render();


  // 禁止功能
  var id;
  var isDelete;
  $("tbody").on("click",".btn_stop",function(){
    // console.log("禁止按钮")
    $("#updateModal").modal("show");
    id = $(this).parent().attr("data-id");
    isDelete = $(this).parent().data("isDelete") === 1?0:1;
    
  })
  $("tbody").on("click",".btn_start",function(){
    // console.log("禁止按钮")
    $("#updateModal").modal("show");
    id = $(this).parent().attr("data-id");
    isDelete = $(this).parent().data("isDelete") === 1?0:1;
    
  })

  $(".btn_update").on("click",function(){
    // console.log(id);
    // console.log(isDelete);
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function(data){
        if(data.success){
          render();
          $("#updateModal").modal("hide");
        }
      }
    })
  })

  

  // $("")




  // 开启功能
  // $("tbody").on("click",".btn_stop",function(){
  //   console.log("开启按钮")
  // })


})