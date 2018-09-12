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
  console.log(key);
  $("#search_txt").val(key);


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
    render();

    location.href = "searchList.html?key="+txt;
  })
  // var option = {
  //   proName:key,
  //   page:1,
  //   pageSize:10
  // }

  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:{
        proName:key,
        page:1,
        pageSize:10
      },
      success:function(data){
        console.log(data);
        setInterval(function(){
          if(data.data.length == 0){
            $(".lt_product ul").html("<p>没有更多数据了</p>");
          }else{

            $(".lt_product ul").html(template("tpl",data));          

          }
        },2000)
      },
      error:function(){
        console.log("出错了")
      }
    })
  }

  render();
  

})