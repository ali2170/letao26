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
      // console.log(data);
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

// 获取一级分类渲染下拉框
  
  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    data:{
      page:1,
      pageSize:100000000
    },
    success:function(data){
      console.log(data);
      $(".dropdown-menu").html(template("tpl2",data));
    }
  })
})


// 初始化表单验证

$("#form").bootstrapValidator({
  excluded:[],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    brandName:{
      validators:{
        notEmpty:{
          message:"请选择一级分类名称"
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:"请选择二级分类图片Logo"
        }
      }
    },
    categoryId:{
      validators:{
        notEmpty:{
          message:"请选择一级分类名称"
        }
      }
    }
  }
});

// fileupload插件上传图片

$("#fileUpload").fileupload({
  dataType:"json",
  done:function(e,data){
    // result:{picAddr: "/upload/brand/e1db2270-b33a-11e8-97a3-6fe06a374081.jpg"}
    // console.log(data.result.picAddr)
    // 图片预览
    $(".upImg").attr("src",data.result.picAddr);

    // 将图片地址绑定给brandLogo
    $("#brandLogo").val(data.result.picAddr);

    $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");


  }
})


// 下拉框与categoryId的处理
$(".dropdown-menu").on("click","a",function(){
  // console.log($(this).text());
  // console.log($(this).attr("data-id"));
  $("#dropdownMenu1").text($(this).text());
  $("input[name='categoryId']").val($(this).attr("data-id"));

  $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  
})




$("#form").on("success.form.bv",function(e){
  e.preventDefault();


  $.ajax({
    type:"post",
    url:"/category/addSecondCategory",
    data:$("#form").serialize(),
    success:function(data){
      if(data.success){
        render();
        $("#form").data("bootstrapValidator").resetForm();
        $("#form")[0].reset();
        $(".upImg").attr("src","./img/default.png");
        $("#dropdownMenu1").text("请选择");
        $("#addModal").modal("hide");
      }
    }
  })
})













})