# Actived 分组管理

---

管理子控件的actived状态

---

## 目录

  * 简介
  * 如何使用


### 简介

  * 管理子控件的actived状态在图表中很多使用场景

    1. 多个折线图的actived状态互斥
    2. 饼图、柱状图的子项actived状态

  * 管理子控件的扩展（Actived.Group）即可单独使用也可跟 Actived扩展一起使用

### 如何使用

  * 单独使用，此时由于子控件未使用Actived 扩展，所以需要做更多的工作：

    1. 覆写 isItemActived(item) 方法，判断子项是否actived
    2. 覆写 setItemActived(item,actived) 方法，并设置子项的actived或者取消actived状态

````html
<p>点击互斥</p>
<div id="c2"></div>

````

````javascript
seajs.use(['index','achart-canvas','achart-util'], function(Actived,Canvas,Util) {

  var canvas = new Canvas({
    id : 'c2',
    width : 500,
    height : 500
  });
  
  /**
   * @class AGroup
   * 管理actived，此处仅仅是个示例
   */
  var AGroup = function(cfg){
    AGroup.superclass.constructor.call(this,cfg);
  };

  Util.extend(AGroup,Canvas.Group);

  Util.mixin(AGroup,[Actived.Group]);

  Util.augment(AGroup,{

    bindUI : function(){
      var _self = this;

      _self.on('click',function(ev){
        var shape = ev.target.shape;
        if(shape){
          if(!_self.isItemActived(shape)){
            _self.setActivedItem(shape);
          }
        }
      });
    },
    //覆写判断 actived状态的方法
    isItemActived : function(item){
      return item.get('actived');
    },
    setItemActived : function(item,actived){
      var attrs = item.get('attrs');
      if(actived){
        item.set('actived',true);
        if(attrs.stroke){
          item.attr('stroke',Util.highlight(attrs.stroke,0.5));
        }
        if(attrs.fill){
          item.attr('fill',Util.highlight(attrs.fill,0.5));
        }
      }else{
        item.set('actived',false);
        item.attr({
          fill : attrs.fill,
          stroke : attrs.stroke
        });
      }
    }
  });

  var group = canvas.addGroup(AGroup);

  for(var i = 50; i <= 450;i = i + 50){
    group.addShape('circle',{
      cx : i,
      cy : i,
      r : 10,
      stroke : 'blue',
      fill : 'red'
    });
  }
});
````

  * 子控件使用了Actived 扩展 ，父控件使用Actived.Group扩展

    1. 此时由于isItemActived和setItemActived方法都是假设子控件使用了 Actived扩展的，所以不需要覆写


````html
<p>点击互斥</p>
<div id="c3"></div>

````

````javascript
seajs.use(['index','achart-canvas','achart-util'], function(Actived,Canvas,Util) {

  var canvas = new Canvas({
    id : 'c3',
    width : 500,
    height : 500
  });

  /**
   * @class AShape
   * 拥有actived状态的圆，此处仅仅是个示例
   */
  var AShape = function(cfg){
    AShape.superclass.constructor.call(this,cfg);
  };

  Util.extend(AShape,Canvas.Shape.Circle);

  Util.mixin(AShape,[Actived]);

  Util.augment(AShape,{
    parseElCfg : function(attrs){
      attrs.type = 'circle';
      return attrs;
    },  
    //actived发生改变的状态变化
    setActiveStatus : function(actived){
      var _self = this,
        attrs = _self.get('attrs'); //初始状态的attrs
      if(actived){
        if(attrs.stroke){
          _self.attr('stroke',Util.highlight(attrs.stroke,0.5));
        }
        if(attrs.fill){
          _self.attr('fill',Util.highlight(attrs.fill,0.5));
        }
      }else{
        _self.attr({
          fill : attrs.fill,
          stroke : attrs.stroke
        });
      }
    }
  });

  Canvas.Shape.AShape = AShape;
  
  /**
   * @class AGroup
   * 管理actived，此处仅仅是个示例
   */
  var AGroup = function(cfg){
    AGroup.superclass.constructor.call(this,cfg);
  };

  Util.extend(AGroup,Canvas.Group);

  Util.mixin(AGroup,[Actived.Group]);

  Util.augment(AGroup,{

    bindUI : function(){
      var _self = this;

      _self.on('click',function(ev){
        var shape = ev.target.shape;
        if(shape){
          if(!_self.isItemActived(shape)){
            _self.setActivedItem(shape);
          }
        }
      });
    }
  });

  var group = canvas.addGroup(AGroup);

  for(var i = 50; i <= 450;i = i + 50){
    group.addShape('aShape',{
      cx : i,
      cy : i,
      r : 10,
      stroke : 'blue',
      fill : 'red'
    });
  }
});
````


## 更多

  * 一个分组可以同时使用Actived扩展和Actived.Group扩展

