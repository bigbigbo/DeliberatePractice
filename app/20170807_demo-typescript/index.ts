const foo = (year) => (address) => {
    console.log(year + '年', '我在' + address)
}

foo(2017)('T社')
foo(2017)('快乐学习')
foo(2017)('厦门')