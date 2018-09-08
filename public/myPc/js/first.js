$(function(){

  var currentPage = 1;
  var pageSize= 8 ;
  // 渲染一级分类表格数据

  function render(){

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(data){
        console.log(data);
        $("tbody").html(template("tpl",data));

        // 一级分类表格分页

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


  // 添加分类模态框

  $(".btn_add").on("click",function(){
    $("#addCatModal").modal("show");
  })

  // 使用表单验证插件
  $("#form").bootstrapValidator({
    excluded:[],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名称"
          }
        }
      }
    }
  })

  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    // console.log($("#form").serialize())
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("#form").serialize(),
      success:function(data){
        console.log(data);
        if(data.success){
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm();
          $("#form")[0].reset();
          $("#addCatModal").modal("hide");
        }
      }
    })
  })
  



})