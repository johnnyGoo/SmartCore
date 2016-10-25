/**
 * Created by johnny on 16/8/24.
 */
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function getsec(str) {
    var str1 = str.substring(0, str.length - 1) * 1;
    var str2 = str.substring(str.length - 1,str.length );
    if (str2 == "s") {
        return str1 * 1000;
    }

    else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
var Cookie = {};
Cookie.setCookie = setCookie;
Cookie.getCookie = getCookie;
Cookie.delCookie = delCookie;


export default Cookie;