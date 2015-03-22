# grid

---

栅格的API

---

## 配置项

 * type 类型，
   *  line 不封闭的线
   *  polygon 封闭的多边形
   *  circle 圆
 * line 线的配置信息，[参考图形](http://spmjs.io/docs/achart-canvas/#shape-基类)
 * minorLine 2个 grid线间的次要线的配置信息，[参考图形](http://spmjs.io/docs/achart-canvas/#shape-基类)
 * minorCount 次要线的数目，默认为0
 * odd 栅格奇数间距的背景,是一个矩形[参考图形](http://spmjs.io/docs/achart-canvas/#shape-基类)
 * even 栅格偶数间距的背景,是一个矩形[参考图形](http://spmjs.io/docs/achart-canvas/#shape-基类)
 * animate 变化时的动画
 * duration 动画的时间间隔
 * items 栅格线的集合，一般由坐标轴自动生成

## API

 * change(items) 坐标轴变化时，自动调用