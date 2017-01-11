/**
 * Created by johnny on 16/12/16.
 */
import _ from 'underscore'
var Physics = {};




var Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};
Point.prototype.clone=function () {
    return new Point(this.x,this.y);
};

var Rect = function (point, width, height) {
    this.point = point;
    this.width = width || 0;
    this.height = height || 0;
    this._point2 = new Point(point.x + this.width, point.y + this.height);

};
Rect.prototype.clone=function () {
    return new Rect(this.point.clone(),this.width,this.height);
};
var ZERO_point=new Point();
var ZERO_rect=new Rect(ZERO_point,0,0);

Rect.prototype.update = function (x, y, width, height) {
    if (_.isNumber(x)) {
        this.point.x = x;
    }
    if (_.isNumber(y)) {
        this.point.y = y;
    }
    if (_.isNumber(width)) {
        this.width = width;
    }
    if (_.isNumber(height)) {
        this.height = height;
    }
    this._point2.x = this.point.x + this.width
    this._point2.y = this.point.y + this.height
};

Rect.prototype.updateBy2Point = function (x, y, x2, y2) {
    if (_.isNumber(x)) {
        this.point.x = x;
    }
    if (_.isNumber(y)) {
        this.point.y = y;
    }
    if (_.isNumber(x2)) {
        this._point2.x = x2;
    }
    if (_.isNumber(y2)) {
        this._point2.y = y2;
    }
    this.width = this._point2.x - this.point.x;
    this.height = this._point2.y - this.point.y;
};

Rect.prototype.contain = function (point) {
    return point.x >= this.point.x && point.x <= this._point2.x && point.y >= this.point.y && point.y <= this._point2.y
}
Rect.prototype.containRect = function (rect) {
    if (rect.point.y > this._point2.y || rect._point2.y< this.point.y || rect.point.x > this._point2.x || rect._point2.x < this.point.x) {
        return ZERO_rect;
    } else if (rect.point.y >= this.point.y && rect._point2.y <= this._point2.y && rect.point.x >= this.point.x && rect._point2.x <= this._point2.x) {
        return rect;
    }
    var mix = new Rect(new Point());
    mix.updateBy2Point(Math.max(this.point.x, rect.point.x), Math.max(this.point.y, rect.point.y), Math.min(this._point2.x, rect._point2.x), Math.min(this._point2.y, rect._point2.y))
    return mix;
};
Rect.prototype.area=function () {
    return this.width*this.height;
};
Physics.Point = Point;
Physics.Rect = Rect;
module.exports = Physics;