$(function(){

  
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
  // getSearch();

  var obj = getSearch();
  var key = obj.key;
  // console.log(key);
  $("#search_txt").val(key);
  var option = {
    proName:key,
    page:1,
    pageSize:10,
    price:0,
    num:0
  }

  function getHistory(){
    var str = localStorage.getItem("lt_search_history") || "[]";
    var arr = JSON.parse(str);
    return arr;
  }
  $(".btn_search").on("click",function(){
    var txt = $("#search_txt").val().trim();
    if(!txt){
      mui.toast("亲,你想买啥");
      return;
    }
    var arr = getHistory();
    var index = arr.indexOf(txt);
    // console.log(index);

    if(index != -1){
      // alert("呵呵")
      arr.splice(index,1);
    }
    
    if(arr.length >= 10){
      arr.pop();
    }
    arr.unshift(txt);    
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    // render(option);

    location.href = "searchList.html?key="+txt;
  })
  

  function render(option){
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:option,
      success:function(data){
        // console.log(data);
        setTimeout(function(){
          if(data.data.length == 0){
            $(".lt_product ul").html("<p>没有更多数据了</p>");
          }else{
            $(".lt_product ul").html(template("tpl",data));          
          }
        },2000)
      }
    })
  }

  render(option);
  
  $("#price").on("tap",function(){
    $(this).toggleClass("now");
    // console.log($("#price").hasClass("now"))
    if($("#price").hasClass("now")){
      // console.log("呵呵")
      // console.log($(this).children())
      
      // console.log(option);
      option.price = 1;
      render(option);
      $(this).find("span").removeClass("fa-angle-down");
      $(this).find("span").addClass("fa-angle-up");

      
    }else{
      // console.log("哈哈")
      option.price = 2;
      render(option);
      $(this).find("span").addClass("fa-angle-down");
      $(this).find("span").removeClass("fa-angle-up");
    }
  })



  $("#stock").on("click",function(){
    $(this).toggleClass("now");
    // console.log($("#price").hasClass("now"))
    if($(this).hasClass("now")){
      // console.log("呵呵")
      // console.log($(this).children())
      option.num = 1;
      render(option);
      $(this).find("span").removeClass("fa-angle-down");
      $(this).find("span").addClass("fa-angle-up");
    }else{
      option.num = 2;
      render(option);
      
      // console.log("哈哈")
      $(this).find("span").addClass("fa-angle-down");
      $(this).find("span").removeClass("fa-angle-up");
    }
  })

})