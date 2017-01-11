/**
 * Created by johnny on 17/1/11.
 */
import Utils from './Utils'
import Physics from './Physics'
var Way = function (callback) {
    this._states = [];
    this._callback = callback;
    this._viewRect = new Physics.Rect(new Physics.Point(0, 0), 0, 0);
    this._state = null
}
Way.prototype.update = function (states) {
    this._states = states;
    this.updateSize();
    this.updateView();
}
Way.prototype.updateSize = function () {
    var state,domInfo;
    for (var i = 0; i < this._states.length; i++) {
        state = this._states[i];
        if (!state.rect) {
            state.rect=new Physics.Rect(new Physics.Point(0, 0), 0, 0);
        }
        if (state.dom) {
            domInfo = Utils.domInfo(state.dom);
            state.rect.update(domInfo.left,domInfo.top,domInfo.width,domInfo.height);
        }
    }
}
Way.prototype.updateView = function (x, y, width, height) {
    this._viewRect.update(x, y, width, height);

    var state, rec, max, maxpercent = 0, percent;
    for (var i = 0; i < this._states.length; i++) {
        state = this._states[i];
        rec = this._viewRect.containRect(state.rect);
        percent = rec.area() / state.rect.area();
        if (maxpercent < percent) {
            max = state;
            maxpercent = percent;
        }
    }

    this._state = max;
    if (this._callback) {
        this._callback(this._state);
    }
}

export default Way;