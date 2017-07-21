# HTML知识点过一遍

## HTML简介

### 名词解释： 什么是HTML？

*  全称 `Hyper Text Markup Language`，超文本标记语言
*  所以HTML不是一种编程语言，而是一种标记语言
*  标记语言又是由一套`标签（markup tag）`组成的
*  HTML用标记标签来描述网页

### HTML文档 = 网页

*  <html></html>标签内的文本描述网页
*  <body></body>之间文本的文本描述的是可见的页面内容

## HTML标签

*  `<h></h>`标签应该谨慎使用，应仅作为标题显示的时候使用，搜索引擎将使用标题为您    的网页的结构和内容编制索引。
*  HTML 代码中的所有连续的空行（换行）也被显示为一个空格。
*  避免在标签内使用`align、bgcolor、color`属性
*  `<pre></pre>`标签将保留你输入的空格和换行，适合放置代码片段
*  还有一个`<address></address>`标签，用来描述地址的
*  感觉没什么卵用的缩写标签
   
        <abbr title="etcetera">etc.</abbr>
        <acronym title="World Wide Web">WWW</acronym>
       
*  改变文字方向的鸡儿标签

        <bdo dir="rtl">
          Here is some Hebrew text
        </bdo>