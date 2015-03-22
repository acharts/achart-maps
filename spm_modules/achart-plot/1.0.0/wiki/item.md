# 图表内部基类

---

图表内部基类

---

## 目录

  * 简介
  * 默认属性
  * 事件注册和冒泡

### 简介
  
  * 图表内部所有控件的基类
  * 静态属性ATTRS 自动转换成默认值
  * 将mixin的代码片段的静态属性ATTRS 也合并进默认值
  * 通过events属性传入事件，事件冒泡到图表最外层

### 默认属性
  
  * 类的静态属性 `ATTRS` 在控件初始化时作为默认值传入
  * 类mixin进入的代码片段上的 `ATTRS` 也会作为默认值传入
  * 类的父类的属性会跟当前类的属性进行合并

````html

<div id="c1"></div>


````
<h2>默认属性</h2>
<div id="log"></div>

````javascript
seajs.use(['achart-canvas','index','achart-util','jquery'], function(Canvas,Plot,Util,$) {

  var canvas = new Canvas({
    id : 'c1',
    width : 50,
    height : 50
  });
  
  //声明类A
  var  A = function(cfg){
    A.superclass.constructor.call(this,cfg);
  };

  A.ATTRS = {
    a : 'a1'
  };

  //继承自Plot.Item
  Util.extend(A,Plot.Item);
  
  //类B继承类A
  var B = function(cfg){
     B.superclass.constructor.call(this,cfg);
  };

  B.ATTRS = {
    a : 'a2',
    b : {
      c : {
        d : 1
      },
      c2 : [1,2]
    }
  };

  Util.extend(B,A);
  
  //mixin的代码片段
  var AMix = function(){

  };

  AMix.ATTRS = {
    am : 'am'
  }

  var C = function(cfg){
     C.superclass.constructor.call(this,cfg);
  };

  C.ATTRS = {
    a : 'a2',
    b : {
      c : {
        d : 2,
        d1 : 3
      },
      c2 : [2],
      c3 : 'c3'
    }
  };

  Util.extend(C,B);

  Util.mixin(C,[AMix]);

  var c = canvas.addGroup(C,{
    a : 'c'
  });

  $('#log').html(JSON.stringify({
    a : c.get('a'),
    b : c.get('b'),
    am : c.get('am')
  }));

});

````

### 事件注册和冒泡

  * 除了可以用on绑定事件外，可以通过events事件传入事件注册
  * 可以将事件冒泡到顶层的Chart上



````html

<div id="c3"></div>

````

````javascript

seajs.use(['index','achart-canvas','achart-util'], function(Plot,Canvas,Util) {
  var C = function(cfg){  //声明构造函数
    C.superclass.constructor.call(this,cfg); //调用父类构造函数
  };

  C.ATTRS = {
    circle : {cx : 150,cy : 150,r : 50},
    rect : {x : 100,y : 100,width : 50,height :50}
  };

  Util.extend(C,Plot.Item); //继承自Plot.Item

  Util.augment(C,{  //在C类的prototype上附加方法
    
    //获取默认属性
    getDefaultCfg : function(){
      return Util.mix({},C.ATTRS);
    },
    //覆写入口函数
    renderUI : function(){
      C.superclass.renderUI.call(this);
      //TODO
      this._initC();
    },
    // 初始化
    _initC : function(){

      var _self = this,
        circle = _self.get('circle'),
        rect = _self.get('rect');

      if(circle){
        var c = _self.addShape('circle',circle);
        _self.set('circleShape',c);
      }

      if(rect){
        var r = _self.addShape('rect',rect);
        _self.set('rectShape',r);
      }

      if(circle && rect){
        _self.addShape('line',{
          x1 : circle.cx,
          y1 : circle.cy,
          x2 : rect.x,
          y2 : rect.y,
          stroke : 'green'
        });
      }
      _self.fire('renderend');
    },
    //覆写remove函数
    remove : function(){
      C.superclass.remove.call(this);
    }
  });
  
  var canvas = new Canvas({
    id : 'c3',
    width : 500,
    height : 200
  });

  var group = canvas.addGroup(C,{
    circle : {
      cx : 10,
      cy : 10,
      r : 40,
      stroke : 'red'
    },
    rect : {
      x : 40,
      y : 40,
      width : 40,
      height : 40,
      stroke : 'blue'
    }
  });

  var group1 = canvas.addGroup(C,{ //读取默认值
    events : { //注册事件
      renderend : function(){
        console.log('end');
      }
    }
  }); 

  canvas.on('click',function(ev){

    var point = canvas.getPoint(ev.clientX,ev.clientY);

    group.move(point.x,point.y);
  });
});

````


