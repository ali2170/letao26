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
      // mui(".num").numbox();
      mui(".mui-numbox").numbox();
      mui(".mui-slider").slider({
        interval:2000
      })
    }
    })

  }

  render(id);
  





})