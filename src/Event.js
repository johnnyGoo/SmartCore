/**
 * Created by johnny on 16/7/11.
 */
import Utils from './Utils'
var Event = {};
Event.bindEvent = function (dom, event, cb, useCapture) {
    function remove() {
        dom.removeEventListener(event, icc, useCapture)
    }

    function icc(e) {
        if (cb(e) == true) {
            remove();
        }
    }

    dom.addEventListener(event, icc, useCapture);
    return remove;
};


Event.keyEvent = function (event, keycode, cb, useCapture) {
    if (!event) {
        event = 'keydown';
    }


    function keyDownSearch(e) {
        // 兼容FF和IE和Opera
        // console.log(event)
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == keycode) {
           return cb(e);
        }
        return false;
    }

    return this.bindEvent(document, event, keyDownSearch, useCapture);
}


Event.documentEvent = function (event, cb, useCapture) {
    return this.bindEvent(document.documentElement, event, cb, useCapture);
};
Event.windowEvent = function (event, cb, useCapture) {
    return this.bindEvent(window, event, cb, useCapture);
};
export default Event;