import React from 'react';

// 受控组件写法
export default class Dome3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  showUserInfo = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div style={{ backgroundColor: 'brown' }}>
        <h1>第四个组件</h1>
        <div className="calculation">
          <form action="#">
            <label>name:</label>
            <input
              type="text"
              value={this.state.name}
              placeholder="请输入姓名"
              onChange={this.handleName}
            />
            <label>密码:</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <input type="submit" value="提交" onClick={this.showUserInfo} />
          </form>
        </div>
      </div>
    );
  }
}
