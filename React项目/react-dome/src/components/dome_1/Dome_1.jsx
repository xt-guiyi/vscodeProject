import React from 'react';

export default class Dome1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date().toLocaleString(),
    };
    // console.log(this);
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this._updateTime();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _updateTime() {
    this.setState({
      now: new Date().toLocaleString(),
    });
  }
  render() {
    return (
      <div style={{ backgroundColor: 'red' }}>
        <h1>我的第一个组件</h1>
        <div>{this.props.notice}</div>
        <div>时间:{this.state.now}</div>
      </div>
    );
  }
}
