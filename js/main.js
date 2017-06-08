$(function(){
    $("body").css("opacity","1").click(function(){
        locFileBtnReClass();
        delRightClick();
    });
    //获取背景图片
    OSBgFun();
    //获取文件夹以及文件
    LocalFile();
    locFileBtnReClass();
    //右键阻止事件
    document.oncontextmenu = function(event) {
        locFileBtnReClass();
	   event.preventDefault();
    }
    //桌面右键菜单事件
    headerRightClick();
    //桌面底部右键菜单事件
    footerRightClick();
    //时间
    setInterval("timeFun();",20000);
    timeFun();
    //浏览器点击触发事件
    $("footer>.chrome").click(function(){
        chromeFun();
        $(".chromeBrowser").toggleClass("show");
        $(this).toggleClass("chromeSel");
    });
    $(".openMenu i.chrome").click(function(){
        chromeFun();
        $(".chromeBrowser").addClass("show");
    });
    //图标大小
    localIconSizeFun();
    //开始菜单
    openMenuFun();
    //开始菜单内容点击菜单隐藏
    openMenuHide();
    //文件右击菜单
    locFileRightMenu();
});
//文件右击菜单
function locFileRightMenu(){
    $("header").on("contextmenu",".locFile",function(e){
        e.stopPropagation();
        e.preventDefault();
        delRightClick();
        RightClickMenu(e,"locFile");
        //存到本地，当前单击的是哪个文件（获取的是唯一时间）
        localStorage.setItem("locFileRightDate",$(this).attr("datafile"));
        //文件操作
        locFileMenuOper();
    });
}
function headerRightClick(){
    $("header").bind("contextmenu",function(e){
        delRightClick();
        RightClickMenu(e,"header");
    });
}

function footerRightClick(){
    $("footer").bind("contextmenu",function(e){
        delRightClick();
        RightClickMenu(e,"footer");
    });
}
function RightClickMenu(ev,thisCon){
    var Y = ``;
    //获取鼠标位置
    var mouseX = ev.pageX || ev.clientX,
        mouseY = ev.pageY || ev.clientY,
        //获取当前屏幕高度
        winHeight = window.innerHeight,
        
        //获取当前屏幕宽度
        winWidth = window.innerWidth;
        //计算X设置偏移值
        if(winWidth - mouseX < 185){
            mouseX = winWidth - 185;
        }
    
    //菜单内容
    var menu = ``;
    
    //判断为哪里的菜单
    switch(thisCon){
        case "header":
            //header菜单内容
            menu = headerMenu();
            if(mouseY + 285 < winHeight - 52){
                Y = `top:${mouseY}px`;
            }else{
                mouseY = winHeight - mouseY;
                Y = `bottom:${mouseY}px`;
            }
            break;
        case "footer":
            //footer菜单内容
            menu = footerMenu();
            mouseY = winHeight - mouseY;
            Y = `bottom:${mouseY}px`;
            break;
        //文件右击事件  
        case "locFile":
            //locFile右击菜单内容
            menu = locFileMenu();
            if(mouseY + 285 < winHeight - 52){
                Y = `top:${mouseY}px`;
            }else{
                mouseY = winHeight - mouseY;
                Y = `bottom:${mouseY}px`;
            }
            break;
    }
    $("main").append(`<div class="rightClick" style="${Y};left:${mouseX}px">${menu}</div>`);
    rightClickBtn();
    iconSizeFun();
}
//清除已存在的右键菜单
function delRightClick(){
    $(".rightClick").remove();
}

function locFileMenu(){
    return `
        <ul>
            <li class="locFileDel"><p>删除</p></li>
        </ul>
    `;
}
//header菜单内容
function headerMenu(){
    return `
        <ul>
            <li class="smIcon"><p>小图标</p></li>
            <li class="inIcon"><p>中图标</p></li>
            <li class="bigIcon"><p>大图标</p></li>
            <li class="Refresh"><p>刷新(F5)</p></li>
            <li class="newly"><p>新建</p></li>
            <li class="replaceBg"><p>更换壁纸</p><input type="file"  title=' '/></li>
        </ul>
    `;
}
//footer菜单内容
function footerMenu(){
    return `
        <ul>
            <li><p>工具栏(未完善)</p></li>
            <li><p>工具栏(未完善)</p></li>
            <li><p>工具栏(未完善)</p></li>
            <li><p>工具栏(未完善)</p></li>
            <li><p>工具栏(未完善)</p></li>
            <li><p>工具栏(未完善)</p></li>
            <li><p>工具栏(未完善)</p></li>
        </ul>
    `;
}
//右键菜单功能
function rightClickBtn(){
    //新建
    newlyFun();
    //更换壁纸
    replaceBgFun();
    //页面刷新
    Refresh();
}
function Refresh(){
    $(".Refresh").click(function(){
        location=location 
    })
}
//桌面背景
function OSBgFun(){
    var imgSrc = localStorage.OSBgSrc;
    if(imgSrc){
        $("main").css({
            "background":`#111 url(${imgSrc}) no-repeat`,
            "background-position": "center",
            "background-repeat": "no-repeat",
            "-webkit-background-size": "100% auto",
            "background-size": "100% auto"
        });
    }
}
//更换壁纸
function replaceBgFun(){
    $(".replaceBg").on(
        {
            "click":function(e){
                e.stopPropagation();
                $(".rightClick").hide();
            },
            "change":function(e){
                //获取文件
                var inp = document.getElementsByClassName("replaceBg")[0].getElementsByTagName("input")[0];
                var file = inp.files[0];
                r = new FileReader();  //本地预览
                r.onload = function(){
                    //获取选择图片的beas64码
                    var src = r.result;
                    //存进本地存储
                    localStorage.setItem("OSBgSrc",src);
                    //调用背景函数
                    OSBgFun();
                    //清除右键菜单
                    delRightClick();
                }
                r.readAsDataURL(file);
            }
        });

}
/** 
* 从 file 域获取 本地图片 url(此方法只要关闭页面重新打开，url就不能生成图片了)
*/ 
function getFileUrl(sourceId) { 
    var url;
    if(navigator.userAgent.indexOf("MSIE")>=1){ // IE 
        url = document.getElementById(sourceId).value;
    }else if(navigator.userAgent.indexOf("Firefox")>0){ // Firefox 
        url = window.URL.createObjectURL(sourceId.files.item(0)); 
    }else if(navigator.userAgent.indexOf("Chrome")>0){ // Chrome 
        url = window.URL.createObjectURL(sourceId.files.item(0)); 
    } 
    return url;
}
//新建按钮功能
function newlyFun(){
    $(".newly").off("click").on("click",function(){
        $("header").append(`
        <div class="newFile">
            <nav>
                <div>
                    <label>类型:</label>
                    <select>
                        <option value="0">文件夹</option>
                        <option value="1">文本文档</option>
                    </select>
                </div>
                <div>
                    <label>名称:</label>
                    <input class="lyName" type="text" value="新建文件夹" />
                </div>
                <div class="file">
                   选择图片
                    <input id="file" type="file" />
                </div>
                <div>
                    <button class="sub">提交</button>
                </div>
            </nav>
            <i class="newFileDel">×</i>
        </div>
        `);
        
        $(".lyName").focus();
        $(".newFileDel").click(function(){
            $(".newFile").remove();
        });
        //新建提交
        newFileFun();
        
    });
}

//时间功能
function timeFun(){
    var date = new Date();
    //年
    var year = date.getFullYear(),
        //月
        month = date.getMonth()+1,
        //日
        day = date.getDate(),
        //时
        h = date.getHours(),
        //分
        min = date.getMinutes();
    if(min < 10){
        min = '0'+min;
    }
    var dateStr = `${h}:${min} ${year}/${month}/${day}`;
    $("footer>time").text(dateStr);
}
//新建提交
function newFileFun(){
    $(".sub").click(function(){
        //文件类型 0为文件夹 1为文本类型
        var type = $(".newFile select").val(),
            //文件名称
            lyName = $(".lyName").val(),
            //建立时间
            date = new Date();
        //图片路径
        var inp = document.getElementsByClassName("file")[0].getElementsByTagName("input")[0];
        if(inp.value){
            var fileSuffix = PictureVFun(inp);
            if(fileSuffix){
                //获取当前图片的base64编码（由于图片比较大，本地存储比较小，所有多了会报js错误，更好的方法是用本地数据库【indexedDB】，在我另一个项目中用到了次技术）
                var imgSrc = getFileUrl(inp);
            }
        }
        //文件对象
        var objLy = {};
        objLy.name = lyName;
        objLy.type = type;
        objLy.imgSrc = imgSrc;
        objLy.date = date;
        var objLyJSON = [];
        if(localStorage.objLy){
            var oldObjLy = localStorage.objLy;
            objLyJSON = JSON.parse(oldObjLy);
        }
        objLyJSON.push(objLy);
        localStorage.setItem("objLy",JSON.stringify(objLyJSON));
        //移除新建框
        $(".newFile").remove();
        LocalFile();
        //图标大小
        localIconSizeFun();
    });
}
//判断选择文件是否为图片(图片验证)
function PictureVFun(input){
    var inpVal = input.value,
        //文件后缀
        fileSuffix = inpVal.slice(inpVal.lastIndexOf("."));
    if(fileSuffix == '.jpg' || fileSuffix == '.jif' || fileSuffix == '.png' || fileSuffix == '.jpeg' || fileSuffix == '.svg'){
        return true;
    }
    return false;
}
//获取本地存储的文件
function LocalFile(){
    var objLyJSON = [];
    if(localStorage.objLy){
        var oldObjLy = localStorage.objLy;
        objLyJSON = JSON.parse(oldObjLy);
    }
    let leng = objLyJSON.length;
    var str = '';
    for(let i = 0; i < leng; i++){
        var src = '';
        if(objLyJSON[i].imgSrc){
            src = `${objLyJSON[i].imgSrc}`;
        }else if(objLyJSON[i].type == 0){
            src = `../img/folder/folder.svg`;
        }else{
            src = `../img/folder/txt.svg`;
        }
        str += `
            <div class="locFile" type="${objLyJSON[i].type}" dataFile="${objLyJSON[i].date}">
                <div><img src="${src}" /></div>
                <p>
                    <span>${objLyJSON[i].name}</span>
                </p>
            </div>
        `;
    }
    $("header").html(str);
    locFileBtn();
}
//文件点击后的效果事件
function locFileBtn(){
    $(".locFile").click(function(e){
        e.stopPropagation();
        $(this).addClass("locFileClick").siblings().removeClass("locFileClick");
    });
}
//清除点击事件
function locFileBtnReClass(){
    $(".locFile").removeClass("locFileClick");
}
//打开谷歌浏览器
function chromeFun(){
    if(!document.getElementsByClassName("chromeBrowser")[0]){
        $("main").append(`
            <div class="chromeBrowser">
                <ul>
                    <li><a>新标签页</a></li>
                    <i class="chromeDel">×</i>
                </ul>
                <section>
                    <brow_header>
                        <i class="backoff"></i>
                        <i class="forward"></i>
                        <i class="refresh"></i>
                        <input type="search" />
                    </brow_header>
                    <brow_footer>
                        <iframe name="box"></iframe>
                    </brow_footer>
                </section>
            </div>
        `);
        chromeSearch();
        chromeDelFun();
    }
}
//浏览器搜索
function chromeSearch(){
    //回车事件
    $('brow_header>input[type="search"]').bind('keypress',function(event){  
        if(event.keyCode == "13")
        {
            let url = $(this).val();
            $(this).parent().siblings().children("iframe").href = url;
            box.location.href = 'https:\/\/'+url;
        }  
    });
}
//浏览器关闭
function chromeDelFun(){
    $(".chromeDel").click(function(){
        $(".chromeBrowser").remove();
        $(".chrome").removeClass("chromeSel");
    });
}

//桌面图标大小
function iconSizeFun(){
    //小图标
    $(".smIcon").click(function(){
        let iconSizeName = "locFileSmIcon";
        localIconSizeFun(iconSizeName);
                                  
    });
    //中图标
    $(".inIcon").click(function(){
        let iconSizeName = "locFileInIcon";
        localIconSizeFun(iconSizeName);
    });
    //大图标
    $(".bigIcon").click(function(){
        let iconSizeName = "locFileBigIcon";
        localIconSizeFun(iconSizeName);
    });
}
function localIconSizeFun(iconSizeName){
    if(iconSizeName){
        localStorage.setItem("iconSize",iconSizeName);
    }
    if(localStorage.iconSize){
        var iconSize = localStorage.iconSize;
    }else{
        var iconSize= "locFileInIcon";
    }
    $(".locFile").removeClass("locFileSmIcon")
        .removeClass("locFileInIcon")
        .removeClass("locFileBigIcon")
        .addClass(iconSize);
}

function openMenuFun(){
    $(".bc").click(function(){
        //$(".openMenu").fadeToggle("slow","linear",30000);
        $(".openMenu").animate({
            width: 'toggle',
            height: 'toggle',
            opacity: 'toggle'
        }, 200);
    });
}
function openMenuHide(){
    $(".openMenu>ul>li").click(function(){
        $(".openMenu").animate({
            width: 'toggle',
            height: 'toggle',
            opacity: 'toggle'
        }, 200);
    });
}
//文件操作
function locFileMenuOper(){
    var datafile = localStorage.locFileRightDate;
    //删除文件
    $(".locFileDel").click(function(){
        let objFileStr = localStorage.objLy;
        let objFile = JSON.parse(objFileStr);
        var delObj = objFile.find(function(e){
            return e.date == datafile;
        });
        objFile = removeByValue(objFile,delObj);
        localStorage.setItem("objLy",JSON.stringify(objFile));
        LocalFile();
    });
}
//删除数组中指定元素
function removeByValue(arr,val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
    return arr;
}


