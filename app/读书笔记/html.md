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
*  文本格式化标签
    
       <b>标签 粗体显示
       <big> 大号显示字体
       <em> 着重字体
       <i> 斜体字
       <small> 小号字体
       <strong> 字体加重
       <sub> 下标字
       <sup> 上标字
       <ins> 插入字

## 元素类型（块元素， 内联元素）

*  块级元素在浏览器显示时，通常会以新行来开始（和结束）
*  内联元素在显示时通常不会以新行开始
*  div是最常见的块级元素，无特定含义，多用于文档布局
*  span是最常见的内联元素，无特定含义，用于组合文档中的行内元素

## HTML5的布局标签

*  header 头部
*  nav 导航
*  section 文章单元
*  article 文章
*  aside 侧边栏
*  footer 页脚
*  details 定义额外的细节
*  summary 定义details元素的标题

> frameset、frame标签已经被废弃，不赞成使用，这东西原先是用来做布局的

## 毫无头绪 随便乱写

*  base 标签为页面上的所有链接规定默认地址或默认目标（target）
  
        <head>
          <base href="http://www.w3school.com.cn/images/" />
          <base target="_blank" />
        </head>
*  html实体
   
   * 空格 `&nbsp;`

*  URL（统一资源定位器）

    scheme://host.domain:port/path/filename
    *  scheme 定义因特网服务的类型。最常见的类型是 http
    *  host - 定义域主机（http 的默认主机是 www）
    *  domain 定义域名，如baidu.com
    *  prot 定义主机上的端口号 http默认端口是80 https默认端口是443
    *  path 服务器上的路径（如果省略，则文档必须位于网站的根目录中）。
    *  filename 定义文档/资源的名称

*  URL scheme
  <table>
    <tr>
      <th>Scheme</th>
      <th>访问</th>
      <th>用途</th>
    </tr>
    <tr>
      <td>http</td>
      <td>超文本传输协议</td>
      <td>普通网页，不加密</td>
    </tr>
    <tr>
      <td>https</td>
      <td>安全超文本传输协议</td>
      <td>安全的网页，加密所有的信息交换</td>
    </tr>
    <tr>
      <td>ftp</td>
      <td>文件传输协议</td>
      <td>用于将文件上传和下载至网站</td>
    </tr>
    <tr>
      <td>sftp</td>
      <td>安全的文件传输协议</td>
      <td>安全的上传和下载文件至网站</td>
    </tr>
    <tr>
      <td>file</td>
      <td></td>
      <td>计算机上的文件</td>
    </tr>
  </table>


* `<!DOCTYPE>` 声明 


Web 世界中存在许多不同的文档。只有了解文档的类型，浏览器才能正确地显示文档。
HTML 也有多个不同的版本，只有完全明白页面中使用的确切 HTML 版本，浏览器才能完全正确地显示出 HTML 页面。这就是 <!DOCTYPE> 的用处。<!DOCTYPE> 不是 HTML 标签。它为浏览器提供一项信息（声明），即 HTML 是用什么版本编写的。

## HTML5
  
### 新的语义标签
*  `<article>`
*  `<aside>`
*  `<details>`
*  `<figcaption>`
*  `<figure>`
*  `<footer>`
*  `<header>`
*  `<main>`
*  `<mark>`
*  `<nav>`
*  `<section>`
*  `<summary>`
*  `<time>`