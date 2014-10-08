#Actived 状态

----

提供actived状态的扩展

----

## 目录

  * 简介
  * 如何使用

### 简介

  * Actived扩展主要解决了大量存在的需要设置actived状态的类，可以无耦合的将actived状态的代码附加到类上
  * 使用Actived扩展的类需要覆写setActiveStatus(actived) 方法

### 如何使用

  * 使用 Util.mixin(C,[Actived]) 将此扩展 复制到原型链上
  * 覆写 setActiveStatus(actived) 方法

````html
<p>点击非互斥</p>
<div id="c1"></div>

````

````javascript
seajs.use(['index','achart-canvas','achart-util'], function(Actived,Canvas,Util) {

  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var group = canvas.addGroup();
  
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

  for(var i = 50; i <= 450;i = i + 50){
    group.addShape('aShape',{
      cx : i,
      cy : i,
      r : 10,
      stroke : 'blue',
      fill : 'red'
    });
  }
  
  //点击激活，再点击取消
  group.on('click',function(ev){
    var shape = ev.target.shape;
    if(shape){
      if(shape.isActived()){
        shape.clearActived();
      }else{
        shape.setActived();
      }
      
    }
  });

});
````

#### 几点说明
  
  * 本示例仅仅用于说明此扩展的用法，真正图表中这个扩展一般来扩展分组（Group）而不是扩展(Shape)
  * 如果Shape需要实现actived状态，不需要使用这个扩展，仅需要增加个函数 _onRenderActived 来处理，通过set('actived',true)来设置即可

### 更多

  * Actived 和 Actived.Group一起使用的场景在[下一章](group.md)有介绍



