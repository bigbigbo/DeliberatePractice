'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = function () {
  function EventEmitter() {
    (0, _classCallCheck3.default)(this, EventEmitter);

    this.listeners = [];
  }

  // 事件监听


  (0, _createClass3.default)(EventEmitter, [{
    key: 'on',
    value: function on(eventName, func) {
      this.listeners.push({
        eventName: eventName,
        func: func
      });
    }

    // 派发事件

  }, {
    key: 'emit',
    value: function emit(eventName) {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var eventListeners = this.listeners.filter(function (listener) {
        return listener.eventName === eventName;
      });
      eventListeners.forEach(function (listener) {
        var eventFunc = listener.func;
        if (eventFunc) {
          eventFunc.call.apply(eventFunc, [_this].concat(args));
        }
      });
    }

    // 移除事件监听

  }, {
    key: 'off',
    value: function off(eventName, func) {
      var offIndex = this.listeners.findIndex(function (listener) {
        return listener.eventName === eventName && listener.func.name === func.name;
      });
      this.listeners.splice(offIndex, 1);
    }
  }]);
  return EventEmitter;
}();

var emitter = new EventEmitter();
// const sayHi = (name) => console.log(`Hello ${name}`, this);
var sayHi2 = function sayHi2(name) {
  return console.log('Good night, ' + name);
};

function sayHi(name) {
  console.log('我的this', this);
  console.log('Hello ' + name);
}
emitter.on('hi', sayHi);
emitter.on('hi', sayHi2);
emitter.emit('hi', 'ScriptOJ');
// => Hello ScriptOJ
// => Good night, ScriptOJ

emitter.off('hi', sayHi);
emitter.emit('hi', 'ScriptOJ');
// => Good night, ScriptOJ

var emitter2 = new EventEmitter();
emitter2.on('hi', function (name, age) {
  console.log('I am ' + name + ', and I am ' + age + ' years old');
});
emitter2.emit('hi', 'Jerry', 12);

// => I am Jerry, and I am 12 years old