/**
 * Created by johnny on 16/7/11.
 */
var Event = {};
Event.bindEvent = function (dom,event, cb, useCapture) {
    function remove() {
        dom.removeEventListener(event, icc, useCapture)
    }
    function icc(e) {
        if (cb(e) == true) {
            remove();
        }
    }

    dom.addEventListener(event, icc, useCapture)
    return remove;
};
Event.documentEvent = function (event, cb, useCapture) {
   return this.bindEvent(document.documentElement,event,cb,useCapture);
};
Event.windowEvent = function (event, cb, useCapture) {
    return this.bindEvent(window,event,cb,useCapture);
};
export default Event;