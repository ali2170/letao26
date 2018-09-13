$(function(){

  // 获取地址栏参数
  function getSearch(){
    var str = decodeURI(location.search);

    str = str.replace("?","");
    // console.log(str);

    var arr = str.split("&");

    var obj = {};
    arr.forEach(function(v,i){
      var newArr = v.split("=");
      obj[newArr[0]]=newArr[1];
    })
    // var arr = str.split("=");
    // var obj = {};
    // obj[arr[0]]=arr[1];
    return obj;
  }

  var obj = getSearch();
  var id = obj.id;
  // console.log(id);

  // console.log("呵呵")
  
// 渲染页面

  function render(id){

    $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:id
    },
    success:function(data){
      // console.log("呵呵")
      console.log(data);
      var arr = data.size.split("-");
      var newArr = [];
      for(var i = arr[0]; i < arr[1]; i++){
        newArr.push(i);
      }
      // console.log(newArr);
      data.newArr = newArr;
      $(".lt_content .mui-scroll").html(template("tpl",data));

      $(".lt_content .size span").on("click",function(){
        $(this).addClass("now").siblings().removeClass("now");
      })
      // mui(".num").numbox();
      mui(".mui-numbox").numbox();
      mui(".mui-slider").slider({
        interval:2000
      })
    }
    })

  }

  render(id);
  

$(".add").on("click",function(){
  var size = "";
  $(".size span").each(function(i,v){
    if($(v).hasClass("now")){
      size = $(this).text(); 
    }
  })
  if(!size){
    mui.toast("请选择尺码");
    return;
  }
  // console.log(size);
  var id = $(".num-input").data("id");
  var num = $(".num-input").val();
  // console.log(num);
  $.ajax({
    type:"post",
    url:"/cart/addCart",
    data:{
      productId:id,
      num:num,
      size:size
    },
    success:function(data){
      if(data.success){
        mui.toast("添加成功了");
        return;
      }else{
        // var url = "product.html?"
        // location.href="login.html?lastUrl="+location.href;
        location.href="login.html?lastUrl="+location.href;        
        // mui.toast("请先登录");
      }
    }
  })
})



})