/**
 * @fileOverview 图形标记，包含文本和连接线
 * @ignore
 */

var Util = require('achart-util'),
    Flag = require('./flag'),
    Group = require('achart-actived').Group,
    PlotItem = require('achart-plot').Item;

/**
 * @class Chart.Group.Flags
 * 图形标记，包含文本和连接线
 * @extends Chart.PlotItem
 */
var Flags = function(cfg){
    Flags.superclass.constructor.call(this,cfg);
};

Util.extend(Flags,PlotItem);
Util.mixin(Flags,[Group]);

Flags.ATTRS = {
    elCls : 'x-chart-flags',
    zIndex : 6,
    /**
     * 标记的配置项
     * @type {Object}
     */
    flag : null,
    /**
     *  初始的flag集合配置信息
     *  @type {Array}
     */
    items : null,
    /**
     * @private
     */
    flagGroups : null
};

Util.augment(Flags,{
    //渲染控件
    renderUI : function(){
        var _self = this;
        Flags.superclass.renderUI.call(_self);
        _self._drawFlags();
    },
    bindUI :function(){
        var _self =this;
        _self.on('click',function(ev){
            var flag = _self.findBy(function(item){
                return item.containsElement && item.containsElement(ev.target)
            });
            _self.fire('flagclick',{flag : flag});
        });

        _self.on('mouseover',function(ev){
            var flag = _self.findBy(function(item){
                return item.containsElement && item.containsElement(ev.target)
            });
            _self.fire('flagover',{flag : flag});
        });

        _self.on('mouseout',function(ev){
            var flag = _self.findBy(function(item){
                return item.containsElement && item.containsElement(ev.target)
            });
            _self.fire('flagout',{flag : flag});
        })
    },
    //画flag
    _drawFlags: function(){
        var _self = this,
            items = _self.get('items'),
            flagGroups = [];

        Util.each(items,function(item){
            flagGroups.push(_self._addFlag(item));
        });

        _self.set('flagGroups',flagGroups);
    },
    /**
     * 添加单个flag
     * @param {Object} item marker`的配置信息
     */
    addFlag: function(item){
        var _self = this,
            flagGroups = _self.get('flagGroups'),
            items = _self.get('items');

        if(!items) {
            items = [];
            _self.set('items',items);
        }

        items.push(item);
        var flag = this._addFlag(item);

        flagGroups.push(flag)
        return flag;
    },
    //添加flag
    _addFlag: function(item){
        var _self = this,
            flag = _self.get('flag'),
            items = _self.get('items');

        var cfg = Util.mix({},flag,item);
        return _self.addGroup(Flag,cfg);
    },
    /**
     * 删除所有flag
     *
     */
    removeAll: function(){
        var _self = this,
            flagGroups = _self.get('flagGroups');

        Util.each(flagGroups,function(item,index){
            item.removeFlag();
        });

        _self.set('flagGroups',[]);
        _self.set('items',[]);
    },
    //根据索引删除flag
    removeByIndex: function(index){
        var _self = this,
            flagGroups = _self.get('flagGroups'),
            items = _self.get('items');

        var flag = flagGroups[index];

        if(flag){
            flag.remove();
            flagGroups.splice(index,1);
            items.splice(index,1);
        }
    },
    /**
     * 修改flag
     * @param {Array} items 新的配置信息
     * @param {Boolen} animate 进行动画
     */
    change: function(items,animate){
        var _self = this,
            selfItems = _self.get('items'),
            flagGroups = _self.get('flagGroups');

        if(animate){
            var eachItem = items.length > flagGroups.length ? items : flagGroups;
            var delIndexs = [];
            Util.each(eachItem,function(model,index){
                var flag = flagGroups[index],
                    selfItem = selfItems[index],
                    item = items[index];

                //flag && flag.show();
                //传入的比原先多
                if(items.length > flagGroups.length && !flag){
                    flag = _self.addFlag(item);
                }else if(items.length < flagGroups.length && !item) {
                    delIndexs.push(index);
                }else {
                    var point = flag.get('point'),
                        originX = point.x,
                        originY = point.y,
                        currX = item.point.x,
                        currY = item.point.y;

                    flag.animate({x: currX - originX,y: currY - originY},400,function(){
                        flag.animate({x: 0,y: 0});
                        flag.change(item);
                    });
                    selfItem = item;
                }
            });

            Util.each(delIndexs,function(item,index){
                _self.removeByIndex(index);
            })
        }else{
            _self.removeAll();
            _self.set('items',items);
            _self._drawFlags();
        }
    },
    //为了堆叠，根据配置获取topY和bottomY
    changeStackCfg: function(index,point){
        var _self = this,
            flag = _self.get('flag'),
            flagGroups = _self.get('flagGroups'),
            items = _self.get('items');

        var cfg = Util.mix({},flag,point);

        if(flagGroups[index]){
            flagGroups[index].changeStackCfg(cfg);
        }
    }
});

module.exports = Flags;