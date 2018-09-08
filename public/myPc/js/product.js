$(function(){

// 渲染商品列表

var currentPage = 1;
var pageSize = 5;
function render(){
  $.ajax({
    type:"get",
    url:"/product/queryProductDetailList",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function(data){
      console.log(data);
      $("tbody").html(template("tpl",data));

      $(".page").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:data.page,//当前页
        totalPages:Math.ceil(data.total/data.size),//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage = page;
          render();
        }
      });
      
    }

  })
}

render();










// 添加商品模态框
  $(".btn_add").on("click",function(){
    $("#addModal").modal("show");
  })


})