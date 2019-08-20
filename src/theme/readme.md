## ionic自带全局样式
> ionic4给定义的全局样式不多，官方组件采用了web component，一些样式都是定义到web组件。比如全局的字体大小ionic并没有给我们定义，的需要我们自己定义

- ios font family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Roboto", sans-serif,

- android font family:"Roboto", "Helvetica Neue", sans-serif

- padding,默认16px,用法如`class="ion-padding"`，支持属性写法，如`<div padding></div>`

- margin,默认16px,用法如`class="ion-marging"`，支持属性写法，如`<div marging></div>`

- float,用法如`class="ion-float-right"`，支持属性写法，如`<div float-right></div>`

- 字体的align,用法如`class="ion-text-center"`，支持属性写法，如`<div text-center></div>`

- 字体的大小写控制,用法如`class="ion-text-uppercase"`，支持属性写法，如`<div text-uppercase></div>`

- flex布局,用法如`class="ion-align-self-center"`，支持属性写法，如`<div align-self-center></div>`


## 修改ionic4样式
> 尽可采用修改全局或者组件曝漏出的css变量来调整样式

修改组件样式，如ion-item，打开ionic文档，找到ion-item组件，找到`CSS Custom Properties`,找到需要自定义的变量，然后如下修改
```
./variables.scss  

ion-item{
  --background:red;
}

:root {
  /* These examples use the same color: sienna. */
  --ion-text-color:             #a0522d;
  --ion-text-color-rgb:         160, 82, 45;

  /* These examples use the same color: lightsteelblue. */
  --ion-background-color:       #b0c4de;
  --ion-background-color-rgb:   176, 196, 222;
}

```

## ionic的单位PX
ionic4中没有修改rem的默认值，1rem=16px，组件中很少很少用了rem单位，多是px，px我们可以理解为手机的逻辑分辨率，css中的1px就等于一个设备的逻辑像素。

计算手机的逻辑像素（叫法很多） 逻辑像素 = DDI(物理像素)/DPR(设备像素比)，DPR和我们在设备上用的几倍图`@X.`是一样的,我们通过js
 window.innerHeight 获取的也是这个逻辑分辨率。

下面列举一下一些机型的逻辑分辨率

机型 | 宽(px) | 高(px) | DPR
:------| ------: |------:|------:
iPhone5|320|568|2
iPhone6/7/8|375|667|2
iPhone6/7/8Plus|414|736|3
iPhone X|375|812|3
iPhone XR|414|896|2
iPhone XS|375|812|3
iPhone XS max|414|896|3
中密度（mdpi）|320|480|1
高密度（hdpi）|320|534|1.5
超高密度（xhdpi）|360|640|2
超超高密度（xxhdpi）|360|640|3

http://www.cnblogs.com/libin-1/p/7148377.html  

## ionic android和ios平台字体差异   
> 这里列举一些字体差异，方便理解android和ios两个平台的不同，在实际开发中能更好的运营这种差异


组件或元素|ios(px)|android(px)
:---| ---: |---:
header title字体大小|17|20|
按钮字体大小|16|14|
list header字体大小|12|14|
list下的标签h2|17|16|
list下的标签h3|14|14|
list下的标签p|14|14|
Tabs下的字体|10|12|
Tabs下的图标|30|22|


## 自定义基础样式的命名规范
- 背景：`.bg-`

- 边框：`.border-`

- 展示类型：`.display-`

- 柔性布局：`.flex-`

- 浮动：`.float-`

- 定位：`.position-`

- 宽：`.width-`

- 高：`.height-`

- 外边距：`.margin-`

- 内边距：`.padding-`

- 字体大小：`.font-size-`

- 字体颜色：`.text-color-`

- 字体修饰：`.font-`


## 自定义基础样式的文件目录规范
> 分类存放，分级导入

每类样式在单独的一个文件夹内，每类文件统一导入到各自文件夹内的_export.scss文件，各类的
_export.scss文件再统一导入到global.scss文件。   

```
|theme
    |base               //base文件内放置基础css样式，如padding margin
        _export.scss    //把所有base定义的样式文件导入刀此文件，此文件再有gloabl导入
        marging.scss
        padding.scss
        ...
    |component          //放置自定义组件样式  如果.m2title  m2card等
        _export.scss    //把所有component定义的样式文件导入刀此文件，此文件再有gloabl导入
        layout.scss
        list.scss
        ...
    |element            //放置自定义组件样式  如果button  input
        _export.scss    //把所有element定义的样式文件导入刀此文件，此文件再有gloabl导入
        button.scss
        input.scss
        ...

global.scss             // 把ionic样式和我们自定义的样式文件导入此文件
```