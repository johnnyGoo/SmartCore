import _ from 'underscore'
var Utils = {};
Utils.windowSize = function () {
    var dom = window;
    return {
        width: dom.innerWidth,
        height: dom.innerHeight
    }
}

Utils.removeDom=function (dom) {
    if(dom.parentNode){
        dom.parentNode.removeChild(dom)
    }
};

/*
 * 获取js
 * */
Utils.getScript = function (src, callback) {
    var head = document.getElementsByTagName("head")[0] || document.documentElement;
    var script = document.createElement("script");
    script.async = "true";
    script.src = src;
    var done = false;
    // 加载完毕后执行
    script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
            done = true;
            try {
                callback(script);
            } catch (err) {
                throw (new Error('Script load Error:'+src))
            }
            script.onload = script.onreadystatechange = null;
        }
    };

    head.insertBefore(script, head.firstChild);
};
/*
 * 获取css
 * */
Utils.getCss = function (src, callback) {
    var head = document.getElementsByTagName("head")[0] || document.documentElement;
    var script = document.createElement("link");
    script.async = "true";
    script.href = src;
    script.rel = 'stylesheet';
    script.type = 'text/css';

    var done = false;

    // 加载完毕后执行
    script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
            done = true;
            try {
                callback(script);
            } catch (err) {
                throw (new Error('Css load Error:'+src))
            }
            script.onload = script.onreadystatechange = null;
        }
    };

    head.insertBefore(script, head.firstChild);
};
Utils.domInfo = function (dom) {
    if (dom == window || dom == document) {
        dom = document.body
    }
    return {
        left: dom.offsetLeft,
        top: dom.offsetTop,
        width: dom.offsetWidth,
        height: dom.offsetHeight,
        scrollHeight: dom.scrollHeight,
        scrollWidth: dom.scrollWidth,
        scrollLeft: dom.scrollLeft,
        scrollTop: dom.scrollTop,
        clientHeight: dom.clientHeight,
        clientWidth: dom.clientWidth,
        innerWidth: dom.innerWidth,
        innerHeight: dom.innerHeight
    }
}

Utils.deepClone = function (obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
    } else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ?
                clone(obj[i]) : obj[i];
        }
    }
    return newobj;
}
/*
 * 删除对象属性
 * */
Utils.clearKey = function clearKey(obj, key) {
    if (_.has(obj, key)) {
        delete obj[key];
    }
};

/*
 * 删除多个对象属性
 * */
Utils.clearKeys = function (obj, key) {
    var me = this;

    if (me.isString(key)) {
        me.clearKey(obj, key);
    } else if (me.isArray(key)) {
        _.each(key, function (v) {
            me.clearKey(obj, v);
        })
    } else if (me.isObject(key)) {
        _.each(key, function (v, k) {
            me.clearKey(obj, k);
        })
    }
};
//是否数组
Utils.isObject = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
};

//是否数组
Utils.isNumber = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Number]';
};

//是否数组
Utils.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

Utils.isString = function (arg) {
    return Object.prototype.toString.call(arg) === '[object String]';
};

Utils.match = function (str, matchs) {
    var me = this;
    var regStr = '';
    if (me.isArray(matchs)) {
        _.each(matchs, function (v) {
            regStr = regStr + v + '|';
        });
        regStr = regStr.substr(0, regStr.length - 1);
    } else {
        regStr = matchs;
    }
    var reg = new RegExp(regStr);
    return reg.test(str);
};


Utils.replace = function (str, match, replace_str) {
    str = str.replace(new RegExp(match, 'gm'), replace_str);
    return str;
};
Utils.eval = function (v) {
    var eval_str = ('(' + v + ')');
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + eval_str)();
};


/*
 * String 转 vars对象
 * */
Utils.stringToObject = function (str) {
    var obj = {};
    var node;
    var arrSource = decodeURI(str).split("&");
    i = 0;
    while (i < arrSource.length) {
        if (arrSource[i].indexOf("=") > 0) {
            node = arrSource[i].split("=");
            obj[node[0]] = node[1];

        }
        i++;
    }
    return obj;
};
/*
 * vars对象 转 String
 * */
Utils.objectToString = function (obj) {
    var str = '';
    for (var i in obj) {
        str += i + '=' + obj[i + ''] + '&';
    }
    str = str.substr(0, str.length - 1);
    return str;
};

Utils.intToString = function (v, length) {
    var str = v.toString();
    while (str.length < length) {
        str = '0' + str;
    }
    return str;

};
/* Nano Templates - https://github.com/trix/nano
 *  nano("<p>Hello {user.first_name} {user.last_name}! Your account is <strong>{user.account.status}</strong></p>", data)
 * */


Utils.nano = function (template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
        var keys = key.split("."), v = data[keys.shift()];
        for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
        return (typeof v !== "undefined" && v !== null) ? v : "";
    });
};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Utils.formatDate = function (date, fmt) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


export default Utils;
