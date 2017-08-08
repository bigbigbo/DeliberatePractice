'use strict';

// 设置html 的meta标签
;
(function () {
    var _html = document.getElementsByTagName('html')[0];
    var _head = _html.getElementsByTagName('head')[0];
    var dpr = parseInt(window.devicePixelRatio);
    var windowWidth = screen.width * dpr;
    var defaultDpr = 1;
    var _meta = document.createElement('meta');
    var diff = dpr / defaultDpr;
    console.log('windowWidth===>', window.document.documentElement.getBoundingClientRect().width);
    console.log('screenWidth===>', screen.width);
    console.log('dpr===>', dpr);
    _meta.name = 'viewport';
    _meta.content = "width=device-width, user-scalable=no, maximum-scale=" + 1 / diff + ", minimum-scale=" + 1 / diff + ",initial-scale=" + 1 / diff;
    _head.appendChild(_meta);
    _html.style.fontSize = windowWidth / 10 + 'px';
})();