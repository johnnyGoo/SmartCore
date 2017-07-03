/**
 * Created by johnny on 16/7/11.
 */
import Utils from './Utils'
import _ from 'underscore'
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
Event.resize_obj={size:Utils.windowSize(),resize_listener:[]};
Event.dispatchWindowResize=function () {
    _.each(Event.resize_obj.resize_listener,function (obj) {
        obj(Event.resize_obj.size);
    })
    return Event.resize_obj.size;
}
Event.unbindWindowSize=function (callback) {
    Event.resize_obj.resize_listener=_.without(Event.resize_obj.resize_listener,callback)
    return callback;
}
Event.bindWindowSize = function (callback, time) {
    if (!time) {
        time = 500
    }
    Event.resize_obj.resize_listener.push(callback);
    callback(Event.resize_obj.size);
    if(!Event.resize_obj.iv){
        Event.resize_obj.iv = setInterval(function () {
            var newsize = Utils.windowSize();
            if (newsize.width != Event.resize_obj.size.width || newsize.height != Event.resize_obj.size.height) {
                Event.resize_obj.size = newsize;
                Event.dispatchWindowResize();
            }
        }, time);
    }
    return callback;

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