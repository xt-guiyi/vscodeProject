import React, { Fragment } from 'react';

export default class Dome3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handlePropsMoney = (e) => {
    if (this.props.title === '人民币') {
      this.props.handleMoney(e.target.value);
    } else {
      this.props.handleMoney(e.target.value / 7);
    }
  };

  render() {
    return (
      <Fragment>
        <label>{this.props.title}</label>
        <input
          type="text"
          value={
            this.props.title === '人民币'
              ? this.props.money * 1
              : this.props.money * 7.0136
          }
          onChange={this.handlePropsMoney}
          maxLength="15"
        />
      </Fragment>
    );
  }
}
