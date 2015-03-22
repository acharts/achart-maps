# Flags 使用

---

使用flag

---

## 目录

  * flag的类型和配置
  * 使用flags管理flag
  * flag 事件

### flag 的类型

  * flag 是Canvas.Group.Flag类，通过 shapeType来标示类型,通过shapeCfg配置图形相关属性,以及一些别的配置信息。

````html

<div id="f1"></div>

````

````javascript
seajs.use(['../src/flag','achart-canvas'], function(Flag,Canvas) {
    var canvas = new Canvas({
        id : 'f1',
        width : 500,
        height : 200
      });

    //矩形flag
    var flag = canvas.addGroup(Flag,{
        point:{
            x: 100,
            y: 100
        },
        distance: -5,
        line: {
            'stroke': '#000000',
            'stroke-width': 1
        },
        shapeType: 'rect',
        shapeCfg: {
            stock: '#ccc'
        },
        title: 'A',
        titleCfg: {
            rotate : 90,
            fill : 'blue',
            'font-size':16,
            'font-weight' : 'bold'
        }
    });
    //图片
    var flag1 = canvas.addGroup(Flag,{
        point:{
            x: 200,
            y: 100
        },
        distance: 0,
        line: {
            'stroke': '#000000',
            'stroke-width': 1
        },
        shapeType: 'image',
        shapeCfg: {
            width: 16,
            height: 20,
            src: 'https://i.alipayobjects.com/i/ecmng/png/201408/3Ds9p7HMph_src.png'
        },
        title: '',
        titleCfg: {
        }
    })
    //圆形flag 方向朝下 通过distance配置
    var flag2 = canvas.addGroup(Flag,{
        point:{
            x: 300,
            y: 100
        },
        distance: 5,
        line: {
            'stroke': '#000000',
            'stroke-width': 1
        },
        shapeType: 'circle',
        shapeCfg: {
            stock: '#ccc',
            r: 12
        },
        title: 'A',
        titleCfg: {
            rotate : 90,
            fill : 'blue',
            'font-size':16,
            'font-weight' : 'bold'
        }
    })
});

````

### 使用flags管理flag

  * 页面有多个flags一起使用，如果单个使用flag，逻辑非常分散，抽出来flags做一个flag的管理


````html

<div id="f2"></div>

````

````javascript
seajs.use(['index','achart-canvas'], function(Flags,Canvas) {
    var canvas = new Canvas({
        id : 'f2',
        width : 500,
        height : 200
      });

    var flags = canvas.addGroup(Flags,{
        events: {
          flagclick: function(ev){
              console.log(ev.flag);
          },
          flagover: function(ev){
              console.log(ev.flag.get('title'));
          },
          flagout: function(ev){
              console.log(ev.flag.get('shapeType'));
          },
        },
        items : [
          {
              point: {
                  x: 50,
                  y: 50
              },
              distance: -5,
              line: {
                  'stroke': '#000000',
                  'stroke-width': 1
              },
              shapeType: 'rect',
              shapeCfg: {
                  stock: '#ccc',
                  fill: '#fff'
              },
              title: 'A',
              titleCfg: {
                  x : 150,
                  y : 100,
                  rotate : 90,
                  fill : 'blue',
                  'font-size':16,
                  'font-weight' : 'bold'
              }

          },
          {
              point: {
                  x: 20,
                  y: 40
              },
              distance: 0,
              line: {
                  'stroke': '#000000',
                  'stroke-width': 0
              },
              shapeType: 'image',
              shapeCfg: {
                  width: 16,
                  height: 20,
                  src: 'https://i.alipayobjects.com/i/ecmng/png/201408/3Ds9p7HMph_src.png'
              }
          },
          {
              point: {
                  x: 30,
                  y: 80
              },
              distance: -5,
              line: {
                  'stroke': '#000000',
                  'stroke-width': 1
              },
              shapeCfg:{
                  stock: '#ccc',
                  r: 12
              },
              title: 'B',
              titleCfg: {
                  x : 150,
                  y : 100,
                  rotate : 90,
                  fill : 'blue',
                  'font-size':16,
                  'font-weight' : 'bold'
              }
          }
      ]
  });
});

````

### flag 事件

* flags提供了 flagclick 事件，鼠标点击触发，通过ev.flag获取到flag对象
* flags提供了 flagover 事件，鼠标移入触发，通过ev.flag获取到flag对象
* flags提供了 flagout 事件，鼠标移出触发，通过ev.flag获取到flag对象