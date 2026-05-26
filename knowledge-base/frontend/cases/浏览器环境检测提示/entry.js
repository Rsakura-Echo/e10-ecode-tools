



let httpsStatus = false; //检测https访问 设置为true
// let httpsURI='https://www.baidu.com/';  //配置自己系统https访问地址 

const wrap = window.document.createElement('div');
let titlevar = '';

var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
if (isIE || isIE11) {
    if (isIE11) {
        titlevar = "当前浏览器版本为：IE11";
        window.document.body.insertBefore(wrap, document.body.firstChild);
        
        let shtml = '<div class="ietip" id="ietip"><div class="wf-req-topprompt"><div class="wf-reject-msg"><span title=' + titlevar + '><i class="icon-coms02-Warning-01"></i></span>' +
            '<span>检测到您当前的浏览器版本过低，存在安全风险，且部分功能已不再支持。为了给您带来更好的用户体验，强烈建议使用谷歌浏览器（<a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">下载</a>）、Edge浏览器（<a href="https://www.microsoft.com/zh-cn/edge" target="_blank">下载</a>）、360极速浏览器（<a href="https://browser.360.cn/ee/" target="_blank">下载</a>）访问本系统。</span>' +
            '<a id="weavertipClose" class="ant-alert-close-icon"><i class="anticon anticon-cross"></i></a></div></div></div>';
        if (httpsStatus) {

            if (!window.location.href.startsWith('https')) {
                shtml += '<div class="ietip" id="httptip"><div class="wf-req-topprompt"><div class="wf-reject-msg"><span title=' + titlevar + '><i class="icon-coms02-Warning-01"></i></span>' +
                    '<span>检测到您当前的访问使用的HTTP协议，存在安全风险。建议升级HTTPS协议（<a href="' + httpsURI + '" target="_self">访问</a>）本系统。</span>' +
                    '<a id="weaverhttpClose" class="ant-alert-close-icon"><i class="anticon anticon-cross"></i></a></div></div></div>';
            }
        }
        wrap.innerHTML = shtml;


        const close = window.document.getElementById('weavertipClose');
        close.onclick = () => {
            document.getElementById('ietip').style.display = 'none';//show的display属性设置为block（显示）
        }
        const weaverhttpClose = window.document.getElementById('weaverhttpClose');
        weaverhttpClose.onclick = () => {
            document.getElementById('httptip').style.display = 'none';//show的display属性设置为block（显示）
        }
    } else {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            titlevar = "当前浏览器版本为：IE7";
            window.document.body.insertBefore(wrap, document.body.firstChild);
        } else if (fIEVersion == 8) {
            titlevar = "当前浏览器版本为：IE8";
            window.document.body.insertBefore(wrap, document.body.firstChild);
        } else if (fIEVersion == 9) {
            titlevar = "当前浏览器版本为：IE9";
            window.document.body.insertBefore(wrap, document.body.firstChild);
        } else if (fIEVersion == 10) {
            titlevar = "当前浏览器版本为：IE10";
            window.document.body.insertBefore(wrap, document.body.firstChild);
        } else {
            titlevar = "当前浏览器版本为：IE6及以下";
            window.document.body.insertBefore(wrap, document.body.firstChild);
        }
        let shtml = '<div class="ietip" id="ietip"><div class="wf-req-topprompt"><div class="wf-reject-msg"><span title=' + titlevar + '><i class="icon-coms02-Warning-01"></i></span>' +
            '<span>检测到您当前的浏览器版本过低，存在安全风险，且部分功能已不再支持。为了给您带来更好的用户体验，强烈建议使用谷歌浏览器（<a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">下载</a>）、Edge浏览器（<a href="https://www.microsoft.com/zh-cn/edge" target="_blank">下载</a>）、360极速浏览器（<a href="https://browser.360.cn/ee/" target="_blank">下载</a>）访问本系统。</span>' +
            '<a id="weavertipClose" class="ant-alert-close-icon"><i class="anticon anticon-cross"></i></a></div></div></div>';
        if (httpsStatus) {

            if (!window.location.href.startsWith('https')) {
                shtml += '<div class="ietip" id="httptip"><div class="wf-req-topprompt"><div class="wf-reject-msg"><span title=' + titlevar + '><i class="icon-coms02-Warning-01"></i></span>' +
                    '<span>检测到您当前的访问使用的HTTP协议，存在安全风险。建议升级HTTPS协议（<a href="' + httpsURI + '" target="_self">访问</a>）本系统。</span>' +
                    '<a id="weaverhttpClose" class="ant-alert-close-icon"><i class="anticon anticon-cross"></i></a></div></div></div>';
            }
        }
        wrap.innerHTML = shtml;


        const close = window.document.getElementById('weavertipClose');
        close.onclick = () => {
            document.getElementById('ietip').style.display = 'none';//show的display属性设置为block（显示）
        }
        const weaverhttpClose = window.document.getElementById('weaverhttpClose');
        weaverhttpClose.onclick = () => {
            document.getElementById('httptip').style.display = 'none';//show的display属性设置为block（显示）
        }
    }
} else if (isEdge) {
    console.log("hs:788====true",); //2020/6/11 下午3:32 hs    end 

} else if (isIE11) {
    console.log("hs:788====true",); //2020/6/11 下午3:32 hs    end 
} else {
    console.log("hs:788====true",); //2020/6/11 下午3:32 hs    end 
}









