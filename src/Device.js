/**
 * 设备信息
 */
var Device = {
    uc: RegExp("Android").test(navigator.userAgent) && RegExp("UC").test(navigator.userAgent) ? true : false,
    wechat: RegExp("MicroMessenger").test(navigator.userAgent) ? true : false,
    iphone: RegExp("iPhone").test(navigator.userAgent) || RegExp("iPod").test(navigator.userAgent) || RegExp("iPad").test(navigator.userAgent) ? true : false,
    android: RegExp("Android").test(navigator.userAgent) ? true : false,
    pc: function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
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
        $(dom).attr('ontouchmove', 'event.preventDefault();');
    }
};


export default  Device;
