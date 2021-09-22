import React, { useReducer, useRef } from 'react';
//初始数据
const initialState = { count: 0 };

//一个reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const buttonRef = useRef(null);
  // console.log(buttonRef);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })} ref={buttonRef}>
        +
      </button>
    </>
  );
}

export default Counter;
