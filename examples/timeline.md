# 时间轴

---

## 时间轴
````html
<div id="c1"></div>
````

````javascript
seajs.use(['achart-canvas','achart-util','../src/timeline.js'], function(Canvas,Util,Timeline) {
  var 
    colors = [ '#ff6600','#ff6600','#ff6600','#ff6600','#ff6600','#7bab12','#c25e5e','#a6c96a','#133960','#2586e7'];

  var canvas = new Canvas({
    id : 'c1',
    elCls : 'bordered',
    width : 500,
    height : 400
  });

  //圆形
  var group = canvas.addGroup();

  var timeline = canvas.addGroup(Timeline,{
    x : 50,
    y : 100
  });
/*
  timeline.on('itemover',function(ev){
    var timelineItem = ev.item,
      circle = timelineItem.get('item'),
      stroke = circle.attr('stroke');
    circle.attr('fill',Util.highlight(stroke,0.5));
  });

  timeline.on('itemout',function(ev){
    var timelineItem = ev.item,
      circle = timelineItem.get('item');
    circle.attr('fill','none');
  });

  timeline.on('itemchecked',function(ev){
    var timelineItem = ev.item,
      circle = timelineItem.get('item');
    circle.show();
  });

  timeline.on('itemunchecked',function(ev){
    var timelineItem = ev.item,
      circle = timelineItem.get('item');
    circle.hide();
  });
*/
});
````