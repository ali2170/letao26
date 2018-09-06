$(function(){

  // alert("呵呵")
  $("#login").bootstrapValidator({
    live:"disabled",
    // excluded:[],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          callback:{
            message:"用户名错误"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"请输入6-12位密码"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  })

  $("#login").on("success.form.bv",function(e){
    e.preventDefault();
    var form = $(e.target);
    $.ajax({
      type:'post',
      url:"/employee/employeeLogin",
      data:form.serialize(),
      success:function(data){
        console.log(data);
        
        if(data.success){
          location.href = "index.html";
        }else{
          // form.data('bootstrapValidator').disableSubmitButtons(false);          
          // form.data('bootstrapValidator').disableSubmitButtons(false);
          
          if(data.error == 1000){
          $("#login").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
          }
          if(data.error == 1001){
            $("#login").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")          
          }
        }
      }

    })
    
  })

  var validator = $("#login").data("bootstrapValidator")
  


$(".btn_reset").on("click",function(){
  $("#login").data("bootstrapValidator").resetForm();
  // $("#form").get(0).reset();
})




})