import React from 'react';
// 列表渲染

export default class Dome3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [
        {
          name: '张三',
          age: 19,
          sex: '男',
        },
        {
          name: '李四',
          age: 18,
          sex: '男',
        },
        {
          name: '王五',
          age: 19,
          sex: '女',
        },
      ],
    };
  }
  render() {
    return (
      <div style={{ backgroundColor: 'green' }}>
        <h1>第三个组件</h1>
        <div className="calculation">
          <ul style={{ listStyle: 'none' }}>
            {this.state.userInfo.map((el, index) => {
              return (
                <li key={index}>
                  <span>{el.name}</span>
                  <span>{el.age}</span>
                  <span>{el.sex}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
