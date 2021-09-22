import React from 'react';

// 创建context
const globalContext = React.createContext('correct');
// console.log(globalContext);

export default class Dome6 extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: 'blue' }}>
        <h1>第六个组件</h1>
        <globalContext.Provider value={{ color: 'red', index: 1 }}>
          <Toolbar />
        </globalContext.Provider>
      </div>
    );
  }
}

// 组件一
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// 组件二
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  static contextType = globalContext;

  render() {
    // console.log(this);

    return <button value={this.context.color}>{this.context.color}</button>;
  }
}
// ThemedButton.contextType = globalContext;
