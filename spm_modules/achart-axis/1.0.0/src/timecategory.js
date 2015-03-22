var Util = require('achart-util'),
  CAxis = require('./category');

/**
 * @class Chart.Axis.TimeCategory
 * 时间坐标轴
 */
var TimeCategory = function(cfg){
  TimeCategory.superclass.constructor.call(this,cfg)
};

TimeCategory.ATTRS = {
  type : 'timeCategory',
  /**
     * 是否分类坐标点在2个tick的中间
     * @type {Boolean}
     */
  tickAlignCenter : false
};

Util.extend(TimeCategory,CAxis);

module.exports = TimeCategory;