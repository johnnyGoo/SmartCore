/**
 * Created by johnny on 16/12/16.
 */

var Physics = {};
Physics.Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
Physics.Rect = function Rect(point, width, height) {
    this.point = point;
    this.width = width || 0;
    this.height = height || 0;
};
Physics.Rect.prototype.contain = function (point) {
    return point.x >= this.point.x && point.x <= (this.point.x + this.width) && point.y >= this.point.y && point.y <= (this.point.y + this.height)
}
module.exports = Physics;