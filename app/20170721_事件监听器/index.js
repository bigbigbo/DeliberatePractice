class EventEmitter {
  
  constructor() {
    this.listeners = [];
  }

  // 事件监听
  on(eventName, func) {
    this.listeners.push({
      eventName,
      func,
    });
  }

  // 派发事件
  emit(eventName, ...args) {
    const eventListeners = this.listeners.filter(listener => listener.eventName === eventName);
    eventListeners.forEach(listener => {
      const eventFunc = listener.func;
      if (eventFunc) {
        eventFunc(...args);
      }
    });
  }

  // 移除事件监听
  off(eventName, func) {
    const offIndex = this.listeners.findIndex((listener) => {
      return listener.eventName === eventName && listener.func.name === func.name;
    });
    this.listeners.splice(offIndex, 1);
  }
}


const emitter = new EventEmitter();
const sayHi = (name) => console.log(`Hello ${name}`);
const sayHi2 = (name) => console.log(`Good night, ${name}`);

emitter.on('hi', sayHi);
emitter.on('hi', sayHi2);
emitter.emit('hi', 'ScriptOJ');
// => Hello ScriptOJ
// => Good night, ScriptOJ

emitter.off('hi', sayHi);
emitter.emit('hi', 'ScriptOJ');
// => Good night, ScriptOJ

const emitter2 = new EventEmitter();
emitter2.on('hi', (name, age) => {
  console.log(`I am ${name}, and I am ${age} years old`);
});
emitter2.emit('hi', 'Jerry', 12);
// => I am Jerry, and I am 12 years old
