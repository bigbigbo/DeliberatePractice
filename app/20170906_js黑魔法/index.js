// =============== 黑魔法1 =============
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

const actionReducer = async (promise, action) => {
  const res = await promise;
  return action(res)
}

const actionTask = async (i) => {
  await sleep(1000);
  // console.log('啊啊啊==>', i)
  return ++i;
}

[actionTask, actionTask, actionTask].reduce(actionReducer, 0);

// ============= 黑魔法2 ==============
async function reducer(promise, action){
  let res = await promise;
  return action(res);
}

function tick(i){
  console.log(i);
  return new Promise(resolve => setTimeout(()=>resolve(++i), 1000));
}

function continuous(...functors){
  console.log('这是什么鬼啊==>', functors)
  return async function(input){
    return await functors.reduce(reducer, input)
  }
}

function * timing(count = 5){
  for(let i = 0; i < count; i++){
    yield tick;
  }
}

// continuous(...timing(10))(0);
// ？？？
// const times = timing(10)
// console.log('times===>', times);

const talk = (i) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('当前计数：', i);
      resolve()
    }, 1000)
  })
}

const task1 = () => {
  [1,2,3,4,5].forEach(async(i) => {
    await talk(i)
  })
  console.log('task1')
}

const task2 = async () => {
  for(let i = 1; i < 6; i++) {
    await talk(i);
  }
  console.log('task2')
}

const task3 = async () => {
  [1,2,3,4,5].map(async(i) => {
    await talk(i)
  })
  console.log('task3')
}

// task1()
task2()
// task3()