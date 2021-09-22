import React, { useState, useEffect } from 'react';

let Dome1 = () => {
  let [count, setCount] = useState(0); //声明一个state属性
  // 相当于三个生命周期函数 componentDidMount,componentDidUpdate,componentWillUnmount
  //[] 表示只在componentDidMount中执行, [count] 表示只有count更新了才执行
  //，return 返回的是componentWillUnmount里要执行的函数
  useEffect(() => {
    document.title = `you click ${count} times!`;
    return () => {
      document.title = `you click ${0} times!`;
    };
  }, [count]);
  return (
    <div>
      <p>you click {count} times!</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};

export default Dome1;
