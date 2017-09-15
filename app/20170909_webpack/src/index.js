import styles from './index.css';
import { cube } from './utils';
import _ from 'lodash';
import './anthor_modules'

// console.log(
//   _.join(['appp', 'module', 'loaded!'], ' ')
// );

// import 和 require 是一样的
// 所有的资源都是可以import进来的，字体文件、图片啊、json、xml啊都可以

// function component() {
//   var element = document.createElement('div');

//   element.innerHTML = ['hello webpack', '4的立方是' + cube(3)].join('\n\n');
//   element.classList.add(styles.hello);

//   return element;
// }

// var element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
// document.body.appendChild(element);

// if (module.hot) {
//   module.hot.accept()
// }

// 动态导入
// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */ 'lodash')
//   .then(_ => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['hello', 'webpack'], ' ')
//     return element
//   })
//   .catch(error => 'An error occurred while loading the component')
// }

// getComponent()
// .then(component => {
//   document.body.appendChild(component)
// })

// 懒加载
function component() {
  var element = document.createElement('div');
  var button = document.createElement('button');
  var br = document.createElement('br');

  button.innerHTML = '点击才会加载哦';
  element.innerHTML = 'hello'
  element.appendChild(br);
  element.appendChild(button);

  button.onclick = e => import(/* webpackChunkName: "print" */ './print.js')
  .then(module => {
    var print = module.default;
    print()
  })

  return element
}

document.body.appendChild(component())