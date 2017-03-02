/**
 * Created by johnny on 16/12/16.
 */
import _ from 'underscore'
var Physics = {};

function degree2adian(degree) {
    return degree/ 180 * Math.PI;
}
function adian2degree(adian) {
    return adian/Math.PI*180 ;
}


var Vector = function (x, y) {
    this.__point = new Point(x, y);
    this.__length = Math.sqrt(this.__point.x * this.__point.x + this.__point.y * this.__point.y);
    this.__angle = adian2degree(Math.atan2(this.__point.y, this.__point.x));
    // this.endPoint.y=Math.sin(angle/180*3.1415)*length
    // this.endPoint.x=Math.cos(angle/180*3.1415)*length
    // console.log(  this.endPoint);
    this.__defineGetter__('angle', function () {
        return this.__angle
    })
    this.__defineSetter__('angle', function (angle) {
        this.__angle = angle;
        this.__point.y = Math.sin(degree2adian(this.__angle)) * this.__length
        this.__point.x = Math.cos(degree2adian(this.__angle)) * this.__length
    })
    this.__defineGetter__('point', function () {
        return this.__point
    })
    this.__defineSetter__('point', function (point) {
        this.__point = point.clone();
        this.__length = Math.sqrt(this.__point.x * this.__point.x + this.__point.y * this.__point.y);
        this.__angle = adian2degree(Math.atan2(this.__point.y, this.__point.x));
    })
    this.__defineGetter__('length', function () {
        return this.__length
    })
    this.__defineSetter__('length', function (length) {
        this.__length = length
        this.__point.y = Math.sin(this.__angle / 180 * 3.1415) * this.__length
        this.__point.x = Math.cos(this.__angle / 180 * 3.1415) * this.__length
    })

}

var Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};
Point.prototype.clone = function () {
    return new Point(this.x, this.y);
};

var Rect = function (point, width, height) {
    this.point = point;
    this.width = width || 0;
    this.height = height || 0;
    this._point2 = new Point(point.x + this.width, point.y + this.height);

};
Rect.prototype.clone = function () {
    return new Rect(this.point.clone(), this.width, this.height);
};
var ZERO_point = new Point();
var ZERO_rect = new Rect(ZERO_point, 0, 0);

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
    if (rect.point.y > this._point2.y || rect._point2.y < this.point.y || rect.point.x > this._point2.x || rect._point2.x < this.point.x) {
        return ZERO_rect;
    } else if (rect.point.y >= this.point.y && rect._point2.y <= this._point2.y && rect.point.x >= this.point.x && rect._point2.x <= this._point2.x) {
        return rect;
    }
    var mix = new Rect(new Point());
    mix.updateBy2Point(Math.max(this.point.x, rect.point.x), Math.max(this.point.y, rect.point.y), Math.min(this._point2.x, rect._point2.x), Math.min(this._point2.y, rect._point2.y))
    return mix;
};
Rect.prototype.area = function () {
    return this.width * this.height;
};
Physics.Point = Point;
Physics.Rect = Rect;
Physics.Vector = Vector;
module.exports = Physics;