const sleep = (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
const flag = 2;


const fn = async() => {
  if(flag > 1) {
    await sleep(2000);
    console.log('两秒过后')
  }
  if(flag > 1) {
    console.log('eee')
  }
}

fn();