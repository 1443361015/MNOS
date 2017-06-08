$(function(){
    
    main();
});
function main(){
    //右键阻止事件
    document.oncontextmenu = function(event) {
	   event.preventDefault();
    }
    $("#password").bind('keypress',function(event){
        if(event.keyCode == "13"){
            loginFun();
        }  
    });
    $(".login").click(function(){
        loginFun();
    });
    //焦点input
    $("#password").focus();
    $("#password").focus(function(){
        //清除错误
        $(".pwd>p").remove();
    });
}
//登录判断
function loginFun(){
    //清除错误
    $(".pwd>p").remove();
    var pwd = $("#password").val();
    if(pwd == "123456"){
        $("body").fadeOut(300);
        setTimeout("JumpHome();",200);
    }else{
        $(".pwd").append(`
            <p>密码错误</p>
        `);
    }
}
function JumpHome(){
    location.href = "html/main.html";
}



