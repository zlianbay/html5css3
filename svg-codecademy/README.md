特效原始地址：http://www.codecademy.com/zh

本博客(http://www.cnblogs.com/ganiks/)页面在底部将该特效移植过来，可以直接查看。

![](http://images.cnitblog.com/blog/653392/201409/191435242065864.png)

如图所示的漂亮的“会动的的图片”并不是常规的图片和js实现，而是基于SVG和Css的，这样的优势在于加载速度快。

原创文章，转载请注明： http://www.cnblogs.com/ganiks

##1. 什么是SVG

http://www.w3schools.com/svg/default.asp

SVG 意为可缩放矢量图形（Scalable Vector Graphics）。

SVG 使用 XML 格式定义图像。

说白了，就是 路径/图形代码->xml(svg code)->browser 解析->图形

常用的除了有 圆形、方形，还有路径(path); 还支持其他高级特性，如滤镜，渐变等。

http://www.w3schools.com/svg/svg_path.asp
```xml
M = moveto
L = lineto
H = horizontal lineto
V = vertical lineto
C = curveto
S = smooth curveto
Q = quadratic Bézier curve
T = smooth quadratic Bézier curveto
A = elliptical Arc
Z = closepath

<svg height="210" width="400">
  <path d="M150 0 L75 200 L225 200 Z" />
</svg>
```
这个svg解释下：从原点开始，移动到坐标（150， 0）， 画直线到坐标（75， 200）， 继续画到坐标（225， 200）， 闭合到圆点。

应该是个 三角形。

> 今天，所有浏览器均支持 SVG 文件，不过需要安装插件的 Internet Explorer 除外。插件是免费的，比如 Adobe SVG Viewer。

##2. 如何快速的绘制复杂的SVG图形
但是如果要绘制复杂的图形，难道要一个线段一个线段来写路径吗？满脑子都是点点在飞？肯定不可能。

开发SVG 标准的人肯定会设计各种工具的，google一下svg editor，就是一款方便的工具（有点类似font制作的工具）

![](http://images.cnitblog.com/blog/653392/201409/191454268317885.png)

![](http://images.cnitblog.com/blog/653392/201409/191454210189160.png)

##3. 本例中的闪闪的动画是如何实现的
本例中的动画中，只有一个svg path元素会一直不停的闪动，其实现是基于 css 的 @keyframes定义：
```css
.blink {
  animation: blink 1.5s infinite;
  -webkit-animation: blink 1.5s infinite;
  -moz-animation: blink 1.5s infinite;
  -o-animation: blink 1.5s infinite;
}

@keyframes blink {
  0 {
    opacity: 0;
  }

  40% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-webkit-keyframes blink {
 ... ...
}

@-moz-keyframes blink {
  ... ...
}

@-o-keyframes blink {
 ... ...
}
```
先定义元素的动画为 `animation: blink 1.5s infinite;` 永久1.5s重复规则`blink`
再定义blink动画规则：按照 opacity从0到1变化。

目前浏览器都不支持 @keyframes 规则。
Firefox 支持替代的 @-moz-keyframes 规则。
Opera 支持替代的 @-o-keyframes 规则。
Safari 和 Chrome 支持替代的 @-webkit-keyframes 规则。

定义和用法
通过 @keyframes 规则，您能够创建动画。
创建动画的原理是，将一套 CSS 样式逐渐变化为另一套样式。
在动画过程中，您能够多次改变这套 CSS 样式。
以百分比来规定改变发生的时间，或者通过关键词 "from" 和 "to"，等价于 0% 和 100%。
0% 是动画的开始时间，100% 动画的结束时间。
为了获得最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。
注释：请使用动画属性来控制动画的外观，同时将动画与选择器绑定。

语法
`@keyframes animationname {keyframes-selector {css-styles;}}`

+ animationname	必需。定义动画的名称。
+ keyframes-selector  必需。动画时长的百分比。
+ 合法的值：
    + 0-100%
    + from（与 0% 相同）
    + to（与 100% 相同）
+ css-styles	必需。一个或多个合法的 CSS 样式属性。

##4. 分析本例中的SVG

先看看本例中SVG的源码，由于源码是压缩过的，可以通过工具 CodeBeautify.org 来解压缩，更容易阅读

因为 svg其实是用 xml代码来表示的，故用 xml editor

#![](http://images.cnitblog.com/blog/653392/201409/191443000346639.png)

最终得到源码如下（部分）：
```xml
 <svg style="width:60%;"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 620 338" enable-background="new 0 0 620 338" xml:space="preserve">
    <rect fill="none" width="620" height="338"/>
   。。。 。。。
   。。。 。。。
    <g>
        <path fill="#939598" d="M286.1 167.2c0.7-0.3 1-0.4 1.4-0.4c0.9 0 1.5 0.8 1.5 1.6c0 0.9-0.7 1.3-1.5 1.7l-10.3 5.2l10.3 5.2 c0.8 0.4 1.5 0.8 1.5 1.7c0 0.8-0.6 1.6-1.5 1.6c-0.4 0-0.8-0.1-1.4-0.4l-11.1-5.6c-1.2-0.6-2.3-1.2-2.3-2.5s1-1.9 2.3-2.5 L286.1 167.2z"/>
        <path fill="#939598" d="M333.3 190.3c-0.3 0.9-0.7 1.7-1.7 1.7c-0.7 0-1.4-0.4-1.6-1c-0.2-0.5-0.1-1 0.1-1.7l12.4-37.3 c0.3-0.9 0.7-1.7 1.7-1.7c0.7 0 1.4 0.4 1.6 1c0.2 0.5 0.1 1-0.1 1.7L333.3 190.3z"/>
        <path fill="#939598" d="M365 172.8c1.2 0.6 2.3 1.2 2.3 2.5s-1 1.9-2.3 2.5l-11.1 5.6c-0.7 0.3-1 0.4-1.4 0.4 c-0.9 0-1.5-0.8-1.5-1.6c0-0.9 0.7-1.3 1.5-1.7l10.3-5.2l-10.3-5.2c-0.8-0.4-1.5-0.8-1.5-1.7c0-0.8 0.6-1.6 1.5-1.6 c0.4 0 0.8 0.1 1.4 0.4L365 172.8z"/>
    </g>
    <path id="cursor" class="blink" fill="#F65A5B" d="M300.7 185.6v4.7c0 0.3 0.2 0.5 0.5 0.5h17.5c0.3 0 0.5-0.2 0.5-0.5v-4.7c0-0.3-0.2-0.5-0.5-0.5h-17.5 C300.9 185.1 300.7 185.3 300.7 185.6"/>
</svg>
```

如果说想要修改本例中的svg图形，就可以将源码粘贴到 SVG Editor 中进行编辑：

![](http://images.cnitblog.com/blog/653392/201409/191444537845554.png)

> 本文只是记录下svg绘图的原理机制，至于细节svg editor的使用技巧以及更复杂的css特效以后讨论。
