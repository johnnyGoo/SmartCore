/**
 * 设备信息
 */
import _ from 'underscore'
var userAgent = navigator.userAgent.toLowerCase();
var Device = {
    uc: RegExp("android").test(userAgent) && RegExp("UC").test(userAgent) ? true : false,
    wechat: RegExp("micromessenger").test(userAgent) ? true : false,
    iphone: RegExp("iphone").test(userAgent) || RegExp("ipod").test(userAgent) || RegExp("ipad").test(userAgent) ? true : false,
    android: RegExp("android").test(userAgent) ? true : false,
    pc: function () {
        var Agents = new Array("android", "iphone", "symbianos", "windows phone", "ipad", "ipod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgent.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    removeSafariDefaultMove: function (dom) {
        if (!dom) {
            dom = 'body';
        }
        dom = document.querySelectorAll(dom);
        if (dom.length) {
            _.each(dom, function (v) {
                v.setAttribute('ontouchmove', 'event.preventDefault();');
            })
        }


    },
    ie: (/msie/.test(userAgent)) && (!/opera/.test(userAgent))

};


export default  Device;
