$(function(){



function getHistory(){
  var str = localStorage.getItem("lt_search_history") || "[]";
  var arr = JSON.parse(str);
  return arr;
}
function render(){
  var arr = getHistory();
  $(".lt_history").html(template("tpl",{arr:arr}));  
}

render();



// 清空记录

$(".lt_history").on("click",".empty",function(){
  mui.confirm("您确定要清空查询记录吗","温馨提示",["是","否"],function(e){
    console.log(e.index);

    var arr = getHistory();

    if(e.index ===1){
      mui.toast("操作取消");
    }
    if(e.index === 0){
      arr = [];
      localStorage.setItem("lt_search_history",JSON.stringify(arr));
      render();
    }
  });
  var arr = getHistory();

})


// 删除单条记录

$(".lt_history").on("click",".del",function(){
  var index = $(this).data("index");

  var arr = getHistory();

  mui.confirm("您确定要删除该条记录吗","温馨提示",["是","否"],function(e){
    if(e.index===1){
      mui.toast("操作取消");
    }
    if(e.index === 0){
      arr.splice(index,1);
      // console.log(arr);
      localStorage.setItem("lt_search_history",JSON.stringify(arr));
      render();
    }
  })


})



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



})