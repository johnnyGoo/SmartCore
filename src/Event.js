/**
 * Created by johnny on 16/7/11.
 */
var Event = {};

Event.documentEvent = function (event, cb, useCapture) {
    function remove() {
        document.documentElement.removeEventListener(event, icc, useCapture)
    }

    function icc(e) {
        if (cb(e) == true) {
            remove();
        }
    }

    document.documentElement.addEventListener(event, icc, useCapture)
};
export default Event;