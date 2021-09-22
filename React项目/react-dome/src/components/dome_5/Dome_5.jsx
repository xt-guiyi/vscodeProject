import React from 'react';
import BaseInput from './baseInput/BaseInput';

//状态提升
export default class Dome3 extends React.Component {
  constructor(props) {
    super(props);
    // console.log(React);
    this.state = {
      money: 1,
      title: ['人民币', '美元'],
    };
  }
  handleMoney = (newMoney) => {
    this.setState({
      money: newMoney,
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: 'green' }}>
        <h1>第五个组件</h1>
        <form action="#">
          <BaseInput
            title={this.state.title[0]}
            money={this.state.money}
            handleMoney={this.handleMoney}
          />
          <br />
          <BaseInput
            title={this.state.title[1]}
            money={this.state.money}
            handleMoney={this.handleMoney}
          />
        </form>
      </div>
    );
  }
}
