import React from 'react';
// 样式
let mStyle = {
  backgroundColor: 'yellow',
};
export default class Dome2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {}
  // 增加
  increase = () => {
    this.setState((state) => {
      return {
        count: state.count++,
      };
    });
  };
  // 减少
  reduce = () => {
    this.setState((state) => {
      if (state.count >= 0) {
        return {
          count: state.count--,
        };
      }
    });
  };
  render() {
    return (
      <div style={mStyle}>
        <h1>第二个组件</h1>
        <div className="calculation">
          <div>{this.state.count}</div>
          <button value="+" onClick={this.increase}>
            +
          </button>
          <button value="-" onClick={this.reduce}>
            -
          </button>
        </div>
      </div>
    );
  }
}
