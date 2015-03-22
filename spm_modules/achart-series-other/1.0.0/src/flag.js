/*
 *
 * @line图的tag
 *
 * */

var Cartesian = require('achart-series').Cartesian,
    Flags = require('achart-flags'),
    Util = require('achart-util');

/**
 * @class Chart.Series.Flag
 * 图列上面的标识
 * @extends Chart.Series.Cartesian
 */
function Flag(cfg){
    Flag.superclass.constructor.call(this,cfg);
}

Util.extend(Flag,Cartesian);

Flag.ATTRS = {
    type : 'flag',

    elCls : 'x-chart-flag-series',
    /**
     * flag 配置项
     * @type {Object}
     */
    flags : null,

    zIndex: 6
};

Util.augment(Flag,{
    /**
     *  @private
     *  重写获取point函数
     */
    _getPoints : function(){
        var _self = this,
            data = _self.get('data'),
            xField = _self.get('xField'),
            yField = _self.get('yField'),
            onSeries = _self.get('onSeries') || '',
            parent = _self.get('parent'),
            series = parent.find(onSeries),
            flagAttrs = _self.get('flag'),
            lineAttrs = _self.get('line'),
            xAxis = _self.get('xAxis'),
            yAxis = _self.get('yAxis'),
            points = [];

        cfg = Util.mix({},flagAttrs,lineAttrs);
        Util.each(data,function(item,index){
            var point,sameNum = 0;
            if(Util.isObject(item)){
                var xValue = item[xField];

                //不存在落点线条 则落到坐标轴上面
                if(!series || !series.get('visible')){
                    var _x = xAxis.getOffset(xValue),
                        _y = yAxis.getStartOffset();

                    point = {
                        x: _x,
                        y: _y,
                        xValue: xValue
                    }
                }
                else{
                    point = series.findPointByValue(xValue);
                }

                if(!point) return true;

                //若存在坐标轴一样的flag  往上堆叠
                Util.each(data,function(newItem,newIndex){
                    if(newIndex < index && item[xField] == newItem[xField]){
                        sameNum ++;
                    }
                });

                point = Util.mix({},point,{
                    y: point.y,
                    index: sameNum
                });

                item.tooltip = (item.flag && item.flag.text) ? item.flag.text : _self.get('flags').flag.text;

                point.obj = item;

            }
            _self.processPoint(point,index);
            points.push(point);
        });

        return points;
    },
    /**
     *  @private
     *  重写legend导致的画面变动
     */
    changeShapes : function(points,animate){
        var _self = this,
            flagAttrs = _self.get('flag'),
            lineAttrs = _self.get('line'),
            cfg = Util.mix({},flagAttrs,lineAttrs),
            flagGroup = _self.get('flagGroup');

        animate = animate || _self.get('animate');

        points = points || this._getPoints();

        var newItems = [];

        Util.each(points, function (item, index) {
            var cfg = _self.__getShapeCfg(item, index)
            newItems.push(cfg);

            //if(flagGroup.get('flagGroups') && flagGroup.get('flagGroups')[index]){
                //flagGroup.get('flagGroups')[index].changeStackCfg(cfg);
                flagGroup.changeStackCfg(index,cfg);
            //}

        });

        flagGroup.change(newItems,animate);
    },
    /**
     * 获取提示信息
     * @return {*} 返回显示在上面的文本
     */
    getTipItem : function(point){
        return point.obj.tooltip ? point.obj.tooltip : point.value;
    },
    //根据points画出标记
    draw : function(points,callback){
        var _self = this,
            animate = _self.get('animate'),
            duration = _self.get('duration');

        //添加Flags
        _self.set('flagGroup',_self.addGroup(Flags,_self.get('flags')))

        if(!animate) {
            Util.each(points, function (item, index) {
                _self._drawShape(item, index);
            });
            _after();
        }else{
            var onSeries = _self.get('onSeries'),
                parent = _self.get('parent');

            var seriesPoints = _self._getPoints();

            var cur = 0,
                sub = [],
                count = seriesPoints.length;

            //动画生成线和对应的点
            Util.animStep(duration,function(factor){
                var pre = cur;
                cur = parseInt((factor) * count,10);
                if(cur > count - 1){
                    cur = count - 1;
                }

                if(cur != pre){
                    sub = points.slice(0,cur + 1);
                    for(var i = pre; i< cur; i++){
                        _findFlagToDraw(seriesPoints[i]);
                    }
                }
                if(factor == 1){
                    _findFlagToDraw(seriesPoints[cur]);
                }
            },_after);
        }

        function _after(){
            callback && callback();
        }

        function _findFlagToDraw(currPoint){
            Util.each(points, function (item, index) {
                if(item.x == currPoint.x && !item.isDraw){
                    _self._drawShape(item, index);
                    item.isDraw = true; //防止堆叠时候x值相同而重复画
                }
            });
        }

    },
    /**
     *  @private
     *  根据点绘制
     */
    _drawShape: function(point,index){
        var _self = this,
            flagGroup = _self.get('flagGroup');

        var cfg = _self.__getShapeCfg(point,index);

        var flag = flagGroup.addFlag(cfg);
        return flag
    },
    __getShapeCfg: function(point,index){
        var _self = this,
            data = _self.get('data'),
            flagGroup = _self.get('flagGroup'),
            flagCfg = _self.get('flags');

        flagCfg.flag.point = point;
        var cfg = Util.mix({},{},{point: point});

        //合并data内容到cfg
        if(data && data[index] && data[index].flag){
            Util.mix(cfg,data[index].flag);
        }

        //向上堆叠
        if(point.index > 0){
            Util.each(flagGroup.get('children'),function(item,index){
                var lastPoint = item.get('point');
                if(lastPoint.x == point.x && (lastPoint.index + 1) == point.index){
                    var newY = cfg.distance || item.get('distance') <=0 ? item.get('topY') : item.get('bottomY');
                    if(newY){
                        cfg.point.y = newY;
                    }
                }
            });
        }

        return cfg;
    }
});

module.exports = Flag;