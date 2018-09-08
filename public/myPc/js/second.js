$(function(){

  // 获取二级分类数据

  var currentPage = 1;
  var pageSize = 5;
function render(){
  $.ajax({
    type:"get",
    url:"/category/querySecondCategoryPaging",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function(data){
      console.log(data);
      $("tbody").html(template("tpl",data));
      $(".page").bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:data.page,
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


$(".addCat").on("click",function(){
  $("#addModal").modal("show");
})








})