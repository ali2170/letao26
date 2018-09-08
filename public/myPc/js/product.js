$(function(){

// 渲染商品列表及分页

var currentPage = 1;
var pageSize = 5;

var imgArr = [];


function render(){
  $.ajax({
    type:"get",
    url:"/product/queryProductDetailList",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function(data){
      // console.log(data);
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


// 表单验证初始化

$("#form").bootstrapValidator({
  excluded:[],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    proName:{
      validators:{
        notEmpty:{
          message:"商品名称不能为空"
        }
      }
    },
    proDesc:{
      validators:{
        notEmpty:{
          message:"商品描述不能为空"
        }
      }
    },
    num:{
      validators:{
        notEmpty:{
          message:"用户库存不能为空"
        },
        regexp: {
          regexp: /^[1-9]\d*$/,
          message: "请输入大于0的库存"
        }
      }
    },
    oldPrice:{
      validators:{
        notEmpty:{
          message:"商品原价不能为空"
        }
      }
    },
    price:{
      validators:{
        notEmpty:{
          message:"商品价格不能为空"
        }
      }
    },
    size:{
      validators:{
        notEmpty:{
          message:"商品尺码不能为空"
        },
        regexp: {
          regexp: /^\d{2}[-]\d{2}$/,
          message: "请输入30-55之间的尺码"
        }
      }
    },
    pic:{
      validators:{
        notEmpty:{
          message:"请选择三张商品图片"
        }
      }
    }


  }

})









// 图片预览并将三张图片的信息存放到数组imgArr中

  $("#fileUpload").fileupload({
    dataType:'json',
    done:function(e,data){
      // console.log(data.result.picName);
      // console.log(data.result.picAddr);
      $(".imgBox").append(
        "<img  class='upImg mr' src="+data.result.picAddr+" width='100' height='100' alt=''>"        
      )
      imgArr.push(data.result);
      // console.log(imgArr);
      if(imgArr.length === 3){
        $("#form").data("bootstrapValidator").updateStatus("pic","VALID");
      }else{
        $("#form").data("bootstrapValidator").updateStatus("pic","INVALID")
      }
    }
  })


  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    var info = $("#form").serialize();
    info+="&picName1="+imgArr[0].picName+"&picAddr1="+imgArr[0].picAddr;
    info+="&picName1="+imgArr[1].picName+"&picAddr1="+imgArr[1].picAddr;
    info+="&picName1="+imgArr[2].picName+"&picAddr1="+imgArr[2].picAddr;
    // console.log(info);

    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:info,
      success:function(data){
        if(data.success){
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm();
          $(".imgBox").empty();
          $("#form")[0].reset();
          $("#addModal").modal("hide");
          imgArr = [];
        }
      }
    })
  })





})