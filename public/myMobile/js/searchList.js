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
        pageSize:10,
        price:1,
        num:1
      },
      success:function(data){
        console.log(data);
      },
      error:function(){
        console.log("出错了")
      }
    })
  }

  render();
  

})