/**
 * 设备信息
 */
import Utils from './Utils'
import _ from 'underscore'
import Physics from './Physics'
var Css = {};

Css.style = function () {
    if (!Css.styleDom) {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);
        Css.styleDom = style;
    }
    return Css.styleDom;
};
function fixValue(value, ext) {
    if (Utils.isString(value)) {
        if (Utils.match(value, 'px$|%$|cm$|em$|rem$|pt$|ms$|s$')) {
            return value;
        }
    }
    if (!ext) {
        ext = 'px';
    }
    value = parseFloat(value);
    return value + ext;
}

function withExt(key, value, ext) {

    if (Utils.match(key, 'width|height|top|left|right|bottom|margin|padding|size')) {
        return fixValue(value, ext);
    } else {
        return value;
    }

}

/*
 * 为css加入浏览器前缀
 * */
function fixCss(name, attr) {
    var cssObj = {};
    if (!attr || attr == '') {
        return cssObj;
    }

    cssObj[name] = attr;
    cssObj['-webkit-' + name] = attr;
    cssObj['-moz-' + name] = attr;
    cssObj['-ms-' + name] = attr;
    cssObj['-o-' + name] = attr;
    return cssObj;
}


function formatScaleInObject(obj) {
    var scale = {scaleX: 1, scaleY: 1};
    if (_.has(obj, 'scale')) {
        scale.scaleX = obj.scale;
        scale.scaleY = obj.scale;
        delete obj.scale;
    }
    if (_.has(obj, 'scaleX')) {
        scale.scaleX = obj.scaleX;
        delete obj.scaleX;
    }
    if (_.has(obj, 'scaleY')) {
        scale.scaleY = obj.scaleY;
        delete obj.scaleY;
    }
    if (scale.scaleX != 1 || scale.scaleY != 1) {

        obj.scaleString = 'scale(' + scale.scaleX + ',' + scale.scaleY + ') ';
    }

}

function transformString(obj, ext) {

    if (_.has(obj, 'transform')) {
        return obj.transform;
    }

    var string = '';
    obj = _.clone(obj);
    formatScaleInObject(obj);

    // if(!_.has(obj,'x')){
    //     obj.x=0;
    // }
    // if(!_.has(obj,'y')){
    //     obj.y=0;
    // }

    _.each(obj, function (value, key) {
        switch (key) {
            case 'x':
                string += 'translateX(' + fixValue(value, ext) + ') ';
                break;
            case 'y':
                string += 'translateY(' + fixValue(value, ext) + ') ';
                break;
            case 'scaleString':
                string += value;
                break;
            case 'rotate':
                string += 'rotate(' + fixValue(value, 'deg') + ') ';
                break;
            case 'rotateX':
                string += 'rotateX(' + fixValue(value, 'deg') + ') ';
                break;
            case 'rotateY':
                string += 'rotateY(' + fixValue(value, 'deg') + ') ';
                break;
            case 'rotateZ':
                string += 'rotateZ(' + fixValue(value, 'deg') + ') ';
                break;
        }
    });
    return string;
}

function transformObject(obj, ext) {
    return fixCss('transform', transformString(obj, ext))
}


/**
 * 添加css样式到文档
 */
Css.createCssString = function (cssString) {
    var style = this.style();

    // style.insertRule(cssString, 0);

    if (style.styleSheet) {// IE
        style.styleSheet.cssText = cssString;
    } else {// w3c
        var doc = document;
        var cssText = doc.createTextNode(cssString);
        style.appendChild(cssText);
    }
};
Css.smartObject = function (obj, ext) {
    obj = _.clone(obj);
    if (obj.vector) {
        var value = obj.vector;
        var v = new Physics.Vector(0, 0);
        if (value.point) {
            v.point = new Physics.Point(value.point.x, value.point.y);
        } else {
            if (value.length) {
                v.length = value.length
            }
            if (value.angle) {
                v.angle = value.angle
            }
        }
        obj.x = v.point.x.toFixed(0);
        obj.y = v.point.y.toFixed(0)


    }
    var transform = transformObject(obj, ext);
    Utils.clearKeys(obj, ['x', 'y', 'scale', 'scaleX', 'scaleY', 'rotate', 'rotateX', 'rotateY']);
    var cssObj = {};
    _.each(obj, function (value, key) {
        // cssObj[key] = withExt(key, value, ext);


        if (Utils.match(key, '^transition|^animation|^transform-|^perspective|^backface-visibility|^filter')) {
            _.extend(cssObj, fixCss(key, withExt(key, value, ext)))
        } else {
            cssObj[key] = withExt(key, value, ext);
        }
    });
    return _.extend(transform, cssObj);
};
/**
 * 添加css样式到文档
 */
Css.createCssStyle = function (mark, obj) {
    var me = this;
    var str = '';
    _.each(obj, function (v, k) {
        str += k + ':' + v + ';';
    });
    var cssString = mark + '{' + str + '}';
    me.createCssString(cssString);
};
Css.createSmartCssStyle = function (mark, smartObj, ext) {
    var cssObj = this.smartObject(smartObj, ext);
    this.createCssStyle(mark, cssObj);
};
/**
 * 添加css样式到dom
 */

Css._cssToDom = function (el, obj) {
    _.each(obj, function (v, k) {
        el.style[k] = v;
        // if (v) {
        //     el.style[k] = v;
        // } else {
        //     el.style[k] = '';
        // }
    });
};
Css.css = function (els, obj) {
    var me = this;
    if (els.length) {
        _.each(els, function (el) {
            me._cssToDom(el, obj)
        })
    } else {
        me._cssToDom(els, obj)
    }


};
/**
 * 添加smartObject css样式到dom
 */
Css.smartCss = function (els, obj, ext) {
    var me = this;
    me.css(els, me.smartObject(obj, ext));


};
export default  Css;
