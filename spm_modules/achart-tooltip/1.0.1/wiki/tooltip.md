# tooltip 详情

----

详细介绍tooltip的细节

----


## 目录

  * 简介
  * Tooltip的构成
  * 位置
  * 瞄准线(crosshairs)
  * 自定义HTML
  * 更多

### 简介

  * Tooltip 用来动态的标示图形元素的信息，一般通过鼠标事件进行响应
  * Tooltip 继承自[Plot.Item](http://spmjs.io/docs/achart-plot/wiki/item.html)，所以可以直接通过addGroup(Tooltip,cfg)
  * 为了能够灵活的适应各种场景，所以Tooltip提供了自定义HTML的功能，在下面详细介绍

### Tooltip的构成

  * title tooltip的标题，可以通过setTitle 设置，配置项中的title是其配置项，也可以直接在title的text属性上设置
    * 注意： title是[label类型](http://spmjs.io/docs/achart-canvas/#text),此处 'text-anchor:start',但是由于文本是垂直方向是居中对齐于(0,0),所以需要设置x,y
  * border 边框，是一个矩形，可以配置其边框和背景
  * items Tooltip显示的具体的内容用列表的形式表示，有3个字段：

    * name 名称
    * value 值
    * color 对应的颜色
  * crossLine 瞄准线，当设置crosshairs=true时生效，暂时仅有垂直于x轴的线

### 位置

  * Tooltip 默认右下角跟指定的点对齐，所以位置需要减去其宽高，这个过程自动计算。在后面的版本中会提供对齐位置可以指定的功能
  * Tooltip 通过setPosition(x,y) 方法指定位置
  * 对于使用HTML的场景，会减去其padding,border进行定位
  * 提供一个offset的属性来确定指定点和Tooltip的间距

````html
<p>鼠标滑动显示tooltip</p>

<div id="c1"></div>

````

````javascript
seajs.use(['index','achart-canvas'], function(Tooltip,Canvas) {
  var canvas = new Canvas({
    id : 'c1',
    elCls : 'bordered',
    width : 500,
    height : 500
  });

  var tooltip = canvas.addGroup(Tooltip,{
    title : {
      text : 'init title',
      x : 5,
      y : 15
    },
    crosshairs : true,
    offset : 10,
    items : [
      {color : 'red',name : 'name1',value : '1222333'},
      {color : 'blue',name : 'n2',value : '1233'},
      {color : 'yellow',name : 'name3',value : 'swww - afas'}
    ],
    visible : false
  });
  

  canvas.on('mouseover',function(){
    tooltip.show();
  });
  
  canvas.on('mouseout',function(){
    tooltip.hide();
  });
  
  canvas.on('mousemove',function(ev){

    var point = canvas.getPoint(ev.clientX,ev.clientY);

    tooltip.setTitle('('+ point.x + ',' + point.y+')');
    tooltip.setPosition(point.x,point.y);
  });

});
````

### 自定义使用HTML
  
  * Tooltip 使用`custom = true`标示使用自定义的html
  * 当使用自定义的html时，属性`html`标示Tooltip的外层模板，默认的模板：

  ```html
    <div class="ac-tooltip" style="position:absolute;visibility: hidden;"><h4 class="ac-title"></h4><ul class="ac-list"></ul></div>
  ```
    1. 通过 `ac-title`确定title的位置
    2. 通过 `ac-list`确定添加items的位置

  * 当使用自定义html时，属性`itemTpl`标示单个项的模板，默认为：

  ```html
    '<li><span style="color:{color}">{name}</span> : {value}</li>'
  ```

    1. 可以使用name,value,color 和index 属性

  * 如果自定义的html位置固定，不想移动，则使用属性 `customFollow=false`

````html
<div id="c4"></div>

````

````javascript
seajs.use(['index','achart-canvas'], function(Tooltip,Canvas) {
  var canvas = new Canvas({
    id : 'c4',
    elCls : 'bordered',
    width : 500,
    height : 500
  });

  var tooltip = canvas.addGroup(Tooltip,{
    title : {
      text : 'init title'
    },
    crosshairs : true,
    custom : true,
    offset : 10,
    itemTpl : '<li>{index} - <strong style="color:{color}">name</strong>:<span>{value}</span></li>',
    items : [
      {color : 'red',name : 'name1',value : '1222333'},
      {color : 'blue',name : 'n2',value : '1233'},
      {color : 'yellow',name : 'name3',value : 'swww - afas'}
    ],
    visible : false
  });
  

  canvas.on('mouseover',function(){
    tooltip.show();
  });
  
  canvas.on('mouseout',function(){
    tooltip.hide();
  });
  
  canvas.on('mousemove',function(ev){

    var point = canvas.getPoint(ev.clientX,ev.clientY);

    tooltip.setTitle('('+ point.x + ',' + point.y+')');
    tooltip.setPosition(point.x,point.y);
  });

});
````

## 更多

  * Tooltip在图表中主要用于显示图表序列在坐标轴上的信息。







